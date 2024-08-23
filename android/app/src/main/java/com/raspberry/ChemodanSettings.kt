package com.raspberry

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin


@CapacitorPlugin(name = "ChemodanSettings")
class ChemodanSettings : Plugin() {

    @PluginMethod
    fun getSettings(call: PluginCall) {
        val ret = JSObject()

        val settings = Settings(context)
        ret.put("chemodan_ip", settings.chemodanIp)
        ret.put("volna_ip", settings.volnaIp)

        call.resolve(ret)
    }
}