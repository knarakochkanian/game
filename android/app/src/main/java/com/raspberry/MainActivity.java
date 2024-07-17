package com.raspberry;

import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.ActionBar;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private JSBridge jsBridge = null;
    private NTPManager ntpManager = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN);
        setTheme(R.style.AppTheme_NoActionBar);
        super.onCreate(savedInstanceState);
        hideActionBars();

        jsBridge = new JSBridge(getBridge());
        jsBridge.clearPassword();

        ntpManager = new NTPManager(jsBridge,
                "time.google.com"// -- replace for volna environment
                //"time.google.com" "10.99.13.10"
        );
        ntpManager.start();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        jsBridge = null;
        ntpManager.stop();
        ntpManager = null;
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
