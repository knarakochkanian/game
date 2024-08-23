package com.raspberry.service_resolver

import android.net.nsd.NsdManager
import android.net.nsd.NsdServiceInfo
import android.os.Handler
import android.os.Looper
import com.raspberry.LocalLogger

@Suppress("DEPRECATION")
class PreApi34ServiceResolver(
    private val nsdManager: NsdManager,
    private val serviceInfo: NsdServiceInfo,
    private val Log: LocalLogger,
    private val onIpAddressResolved: (String) -> Unit
) : ServiceResolver(nsdManager, serviceInfo, Log, onIpAddressResolved) {

    private val callback = object : NsdManager.ResolveListener {
        override fun onResolveFailed(serviceInfo: NsdServiceInfo, errorCode: Int) {
            Log.e(TAG, "onResolveFailed: $serviceInfo, code = $errorCode")
        }

        override fun onServiceResolved(serviceInfo: NsdServiceInfo) {
            Log.d(TAG, "Service found: ${serviceInfo.host.hostAddress}")

            val address = serviceInfo.host.hostAddress.takeIf {
                it != null && it.contains(".") && !it.contains(":")
            }
            if (!address.isNullOrBlank()) {
                Log.d(TAG, "Service ip: $address")
                Handler(Looper.getMainLooper()).post {
                    onIpAddressResolved(address)
                }
            } else {
                Log.d(TAG, "Discovery restarted for: $address")
                restart()
            }
        }
    }

    override fun resolve() {
        nsdManager.resolveService(serviceInfo, callback)
    }

    override fun stop() {
        // do nothing
    }

    private fun restart() {
        Handler(Looper.getMainLooper()).postDelayed({
            nsdManager.resolveService(serviceInfo, callback)
        }, 1000)
    }

    companion object {
        private const val TAG = "Api34ServiceResolver"
    }
}