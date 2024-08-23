package com.raspberry;

import android.content.Context;
import android.net.nsd.NsdManager;
import android.net.nsd.NsdServiceInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;

import com.raspberry.service_resolver.Api34ServiceResolver;
import com.raspberry.service_resolver.PreApi34ServiceResolver;
import com.raspberry.service_resolver.ServiceResolver;

import kotlin.Unit;

public class ServiceDiscovery {
    private static final String TAG = "ServiceDiscovery";
    private static final String SERVICE_TYPE = "_workstation._tcp";
    private final LocalLogger Log;
    private NsdManager nsdManager;
    private NsdManager.DiscoveryListener discoveryListener;
    private WifiManager.MulticastLock multicastLock;

    public boolean started = false;
    private final Listener listener;

    private ServiceResolver serviceResolver = null;

    private ServiceResolver getServiceResolver(NsdServiceInfo serviceInfo) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
            return new Api34ServiceResolver(
                    nsdManager,
                    serviceInfo,
                    Log,
                    ip -> {
                        listener.onIpReceived(ip);
                        return Unit.INSTANCE;
                    });
        } else {
            return new PreApi34ServiceResolver(
                    nsdManager,
                    serviceInfo,
                    Log,
                    ip -> {
                        listener.onIpReceived(ip);
                        return Unit.INSTANCE;
                    });
        }
    }

    public ServiceDiscovery(LocalLogger logger, Listener listener) {
        this.Log = logger;
        this.listener = listener;
    }

    public void start(Context context) {
        started = true;

        new Handler(Looper.getMainLooper()).post(listener::onDiscoveryStarted);
        nsdManager = (NsdManager) context.getSystemService(Context.NSD_SERVICE);

        initializeDiscoveryListener();

        multicastLock = ((WifiManager) context.getSystemService(Context.WIFI_SERVICE))
                .createMulticastLock(TAG);
        multicastLock.setReferenceCounted(true);
        multicastLock.acquire();

        nsdManager.discoverServices(
                SERVICE_TYPE,
                NsdManager.PROTOCOL_DNS_SD,
                discoveryListener
        );

    }

    public void stop() {
        started = false;
        new Handler(Looper.getMainLooper()).post(listener::onDiscoveryStopped);
        nsdManager.stopServiceDiscovery(discoveryListener);
        if (serviceResolver != null) {
            serviceResolver.stop();
        }
    }

    public void initializeDiscoveryListener() {

        // Instantiate a new DiscoveryListener
        discoveryListener = new NsdManager.DiscoveryListener() {

            // Called as soon as service discovery begins.
            @Override
            public void onDiscoveryStarted(String regType) {
                Log.d(TAG, "Service discovery started");
            }

            @Override
            public void onServiceFound(NsdServiceInfo service) {
                // A service was found! Do something with it.
                Log.d(TAG, "Service discovery success: " + service);

                if (service.getServiceName().contains("raspberrypi")) {
                    Log.d(TAG, "Service discovery chemodan found");
                    serviceResolver = getServiceResolver(service);
                    serviceResolver.resolve();
                }
            }

            @Override
            public void onServiceLost(NsdServiceInfo service) {
                // When the network service is no longer available.
                // Internal bookkeeping code goes here.
                Log.e(TAG, "service lost: " + service);
            }

            @Override
            public void onDiscoveryStopped(String serviceType) {
                Log.d(TAG, "Discovery stopped: " + serviceType);
            }

            @Override
            public void onStartDiscoveryFailed(String serviceType, int errorCode) {
                Log.e(TAG, "Discovery failed: Error code:" + errorCode);
                nsdManager.stopServiceDiscovery(this);
            }

            @Override
            public void onStopDiscoveryFailed(String serviceType, int errorCode) {
                Log.e(TAG, "Discovery failed: Error code:" + errorCode);
                nsdManager.stopServiceDiscovery(this);
            }
        };
    }

    public interface Listener {
        void onDiscoveryStarted();

        void onDiscoveryStopped();

        void onIpReceived(String ip);
    }
}
