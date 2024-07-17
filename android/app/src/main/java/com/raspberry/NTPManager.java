package com.raspberry;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import java.util.Date;
import java.util.TimeZone;

public class NTPManager {
    private final JSBridge jsBridge;
    private final String host;
    private final TimeZone timeZone;

    private final Handler handler = new Handler(Looper.getMainLooper());

    public NTPManager(JSBridge jsBridge, String host) {
        this(jsBridge, host, DEFAULT_TIME_ZONE);
    }

    public NTPManager(JSBridge jsBridge, String host, TimeZone timeZone) {
        this.jsBridge = jsBridge;
        this.host = host;
        this.timeZone = timeZone;
    }

    void start() {
        syncNTPTime();
    }

    public void stop() {
        handler.removeCallbacksAndMessages(null);
    }

    private void syncNTPTime() {
        Log.v(TAG, "syncNTPTime()");
        SNTPClient.getDate(host,
                timeZone,
                this::onNTPResult
        );
    }

    private void onNTPResult(String rawDate, Date date, Exception ex) {

        if (ex == null) {
            Log.v(TAG, "onNTPResult.raw = " + rawDate);
            Log.v(TAG, "onNTPResult.dat = " + date);
        } else {
            Log.e(TAG, "onNTPResult.dat = " + date, ex);
        }

        if (ex != null || !syncDateWithJS(rawDate)) {
            restart();
        }
    }

    private boolean syncDateWithJS(String raw) {
        JSBridge bridge = this.jsBridge;
        if (bridge == null || raw == null || raw.isEmpty()) return false;

        bridge.sendNTPTime(raw, result -> {
            Log.v(TAG, "sendNTPTime.result = " + result);
            restart();
//            if (!"\"ok\"".equals(result)) {
//
//            }
        });
        return true;
    }

    private void restart() {
        handler.postDelayed(this::syncNTPTime, 1000);
    }

    private static final String TAG = "NTPManager";
    private static final TimeZone DEFAULT_TIME_ZONE = TimeZone.getTimeZone("Europe/Moscow");
}