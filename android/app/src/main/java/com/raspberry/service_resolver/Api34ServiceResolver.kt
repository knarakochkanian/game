package com.raspberry.service_resolver

import android.net.nsd.NsdManager
import android.net.nsd.NsdServiceInfo
import android.os.Build
import android.os.Handler
import android.os.Looper
import androidx.annotation.RequiresApi
import com.raspberry.LocalLogger
import java.util.concurrent.Executors

@RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
class Api34ServiceResolver(
    val nsdManager: NsdManager,
    val serviceInfo: NsdServiceInfo,
    val Log: LocalLogger,
    val onIpAddressResolved: (String) -> Unit
) : ServiceResolver(nsdManager, serviceInfo, Log, onIpAddressResolved),
    NsdManager.ServiceInfoCallback {

    override fun resolve() {
        nsdManager.registerServiceInfoCallback(
            serviceInfo,
            Executors.newSingleThreadExecutor(),
            this
        )
    }

    override fun stop() {
        nsdManager.unregisterServiceInfoCallback(this)
    }

    override fun onServiceInfoCallbackRegistrationFailed(errorCode: Int) {
        Log.e(TAG, "Not registered: $errorCode")
    }

    override fun onServiceUpdated(serviceInfo: NsdServiceInfo) {
        Log.d(TAG, "Service updated: $serviceInfo")
        serviceInfo.hostAddresses.map {
            Log.d(TAG, "Service found: ${it.hostAddress}")
            it.hostAddress
        }.find {
            it != null && it.contains(".") && !it.contains(":")
        }?.let {
            Log.d(TAG, "Service ip: $it")
            Handler(Looper.getMainLooper()).post {
                onIpAddressResolved(it)
            }
            Log.d(TAG, "Unregistering callback")
            nsdManager.unregisterServiceInfoCallback(this)
        } ?: run {
            Log.e(TAG, "Failed to find ip: $serviceInfo")
        }
    }

    override fun onServiceLost() {
        Log.e(TAG, "Service lost")
    }

    override fun onServiceInfoCallbackUnregistered() {
        Log.e(TAG, "Callback unregistered")
    }

    companion object {
        private const val TAG = "Api34ServiceResolver"
    }
}