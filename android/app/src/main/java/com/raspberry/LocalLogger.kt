package com.raspberry

import android.util.Log
import java.util.Observable

class LocalLogger : Observable() {
    var log = ""
        private set

    fun d(tag: String, message: String) {
        Log.d(tag, message)
        log += "$tag: $message\n"
        setChanged()
        notifyObservers()
    }

    fun e(tag: String, message: String) {
        Log.e(tag, message)
        log += "! $tag: $message\n"
        setChanged()
        notifyObservers()
    }
}