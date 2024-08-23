package com.raspberry

import android.content.Context

class Settings(
    private val context: Context
) {
    var chemodanIp
        get() = prefs.getString("chemodan_ip", "").takeIf {
            !it.isNullOrBlank()
        } ?: DefaultConfig.ChemodanAddress
        set(value) {
            prefs.edit().putString("chemodan_ip", value).apply()
        }

    var volnaIp
        get() = prefs.getString("volna_ip", "").takeIf {
            !it.isNullOrBlank()
        } ?: DefaultConfig.VolnaPingAddress
        set(value) {
            prefs.edit().putString("volna_ip", value).apply()
        }

    private val prefs get() = context.getSharedPreferences("settings", Context.MODE_PRIVATE)
}