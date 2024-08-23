package com.raspberry.ws

import io.ktor.client.HttpClient
import io.ktor.client.engine.okhttp.OkHttp
import io.ktor.client.plugins.websocket.WebSockets
import io.ktor.client.plugins.websocket.ws
import io.ktor.websocket.Frame
import io.ktor.websocket.readText
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class WebSocketClient(private val url: String) {

    private val client = HttpClient(OkHttp) {
        install(WebSockets)
    }

    fun connect(listener: WebSocketListener) {
        GlobalScope.launch {
            try {
                client.ws(url) {
                    listener.onConnected()

                    try {
                        for (frame in incoming) {
                            if (frame is Frame.Text) {
                                listener.onMessage(frame.readText())
                            }
                        }
                    } catch (e: Exception) {
                        listener.onDisconnected(e)
                    }
                }
            } catch (e: Exception) {
                listener.onDisconnected(e)
            }
        }
    }

    fun disconnect() {
        client.close()
    }
}

interface WebSocketListener {
    fun onConnected()
    fun onMessage(message: String)
    fun onDisconnected(e: Exception?)
}