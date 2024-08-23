package com.raspberry

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.ScrollView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.raspberry.ws.WebSocketClient
import com.raspberry.ws.WebSocketListener
import java.util.Date
import java.util.Observer


class SettingsActivity : AppCompatActivity(), ServiceDiscovery.Listener {
    private var serviceDiscovery: ServiceDiscovery? = null

    private val logger = LocalLogger()
    private val ipAddress get() = findViewById<EditText>(R.id.ipAddress)
    private val volnaIpAddress get() = findViewById<EditText>(R.id.volnaIpAddress)
    private val save get() = findViewById<Button>(R.id.save)

    private lateinit var settings: Settings

    val onLogChanged = Observer { o, arg ->
        runOnUiThread {
            findViewById<TextView>(R.id.log).text = logger.log
            findViewById<ScrollView>(R.id.logScroll).let { scroll ->
                scroll.post { scroll.fullScroll(View.FOCUS_DOWN) }
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)
        settings = Settings(this)

        logger.addObserver(onLogChanged)
        serviceDiscovery = ServiceDiscovery(logger, this)

        findViewById<TextView>(R.id.version).text = "Chemodan " + BuildConfig.VERSION_NAME
        findViewById<Button>(R.id.discovery).setOnClickListener {
            if (serviceDiscovery?.started == false) {
                serviceDiscovery?.start(this)
            } else if (serviceDiscovery?.started == true) {
                serviceDiscovery?.stop()
            }
        }

        save.setOnClickListener {
            val chemodanIp = ipAddress.text.toString()
            val volnaIp = volnaIpAddress.text.toString()

            if (chemodanIp.isBlank() || volnaIp.isBlank()) {
                Toast.makeText(this, "Please specify ip address", Toast.LENGTH_SHORT).show()
            } else {
                settings.chemodanIp = chemodanIp
                settings.volnaIp = volnaIp
                Toast.makeText(this, "Settings saved", Toast.LENGTH_SHORT).show()

                val ws = WebSocketClient("ws://" + chemodanIp + ":8766")
                ws.connect(object : WebSocketListener {
                    override fun onConnected() {
                        runOnUiThread {
                            AlertDialog.Builder(this@SettingsActivity)
                                .setMessage("Connected!")
                                .show()
                        }
                    }

                    override fun onMessage(message: String) {

                    }

                    override fun onDisconnected(e: Exception?) {
                        logger.e("WS", e?.stackTraceToString() ?: "Error")
                        runOnUiThread {
                            AlertDialog.Builder(this@SettingsActivity)
                                .setMessage("Not connected!")
                                .show()
                        }
                    }

                })
            }
        }

        findViewById<Button>(R.id.checkNtp).setOnClickListener {
            SNTPClient.getDate(
                this,
                ipAddress.text.toString(),
                null,
                NTPManager.DEFAULT_TIME_ZONE
            ) { rawDate: String?, date: Date?, ex: java.lang.Exception? ->
                this.onNTPResult(
                    rawDate, date, ex
                )
            }
        }
        ipAddress.setText(settings.chemodanIp)
        volnaIpAddress.setText(settings.volnaIp)
    }

    override fun onDestroy() {
        super.onDestroy()
        logger.deleteObserver(onLogChanged)
    }

    override fun onDiscoveryStarted() {
        findViewById<Button>(R.id.discovery).text = "Stop Auto Discovery"
    }

    override fun onDiscoveryStopped() {
        findViewById<Button>(R.id.discovery).text = "Start Auto Discovery"
    }

    override fun onIpReceived(ip: String?) {
        Toast.makeText(this, "IP address detected: ${ip}", Toast.LENGTH_SHORT).show()
        ipAddress.setText(ip)
    }

    private fun onNTPResult(rawDate: String?, date: Date?, ex: Exception?) {
        if (ex == null) {
            logger.d("NTP", "onNTPResult.raw = $rawDate")
            logger.d("NTP", "onNTPResult.dat = $date")
        } else {
            logger.e("NTP", ex.stackTraceToString())
        }
    }
}