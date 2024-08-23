package com.raspberry.service_resolver

import android.net.nsd.NsdManager
import android.net.nsd.NsdServiceInfo
import com.raspberry.LocalLogger

abstract class ServiceResolver(
    private val nsdManager: NsdManager,
    private val serviceInfo: NsdServiceInfo,
    private val Log: LocalLogger,
    private val onIpAddressResolved: (String) -> Unit
) {
    abstract fun resolve()
    abstract fun stop()
}