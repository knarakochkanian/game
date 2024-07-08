package com.raspberry;

import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final String CLEAR_PASS_JS = "window.localStorage.removeItem('isPasswordPassed')";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getBridge().eval(CLEAR_PASS_JS, value -> {
            Log.v("MainActivity", "Device will be locked");
        });
    }
}
