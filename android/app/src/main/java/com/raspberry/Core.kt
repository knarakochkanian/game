package com.raspberry

import android.app.Application

class Core : Application() {

    override fun onCreate() {
        super.onCreate()
        instance = this
    }

    companion object {
        lateinit var instance: Core
            private set
    }
}