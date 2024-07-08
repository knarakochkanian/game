package com.raspberry;

import android.os.Bundle;
import android.util.Log;
import android.view.View;

import androidx.appcompat.app.ActionBar;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final String CLEAR_PASS_JS = "window.localStorage.removeItem('isPasswordPassed')";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN);
        setTheme(R.style.AppTheme_NoActionBar);
        super.onCreate(savedInstanceState);
        hideActionBars();

        getBridge().eval(CLEAR_PASS_JS, value -> {
            Log.v("MainActivity", "Device will be locked");
        });
    }

    private void hideActionBars() {
        ActionBar sab = getSupportActionBar();
        if (sab != null) {
            sab.hide();
        }
        android.app.ActionBar ab = getActionBar();
        if (ab != null) {
            ab.hide();
        }
    }
}
