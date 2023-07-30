package com.example.frontend

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView

class WebActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_web)

        val myWebView: WebView = findViewById(R.id.webView1)
        myWebView.settings.javaScriptEnabled = true
        myWebView.loadUrl("http://10.0.2.2:8080")
    }
}