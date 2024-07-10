package com.raspberry;

import android.util.Log;
import android.webkit.ValueCallback;

import com.getcapacitor.Bridge;

public class JSBridge {
    private final Bridge bridge;

    public JSBridge(Bridge bridge) {
        this.bridge = bridge;
    }

    public void clearPassword() {
        bridge.eval(CLEAR_PASS_JS_REQUEST, result -> {
            Log.v(TAG, "clearPassword(): " + result);
        });
    }

    public void sendNTPTime(String rawDate, ValueCallback<String> callback) {
        bridge.eval("window.onNTPDateReceived(\"" + rawDate + "\");", callback);
    }

    private static final String CLEAR_PASS_JS_REQUEST = "window.localStorage.removeItem('isPasswordPassed')";
    private static final String TAG = "JSBridge";
}
