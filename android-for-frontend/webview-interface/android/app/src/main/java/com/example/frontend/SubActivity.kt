package com.example.frontend

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView

class SubActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sub)

        val myWebView: WebView = findViewById(R.id.subWebView)
        myWebView.settings.javaScriptEnabled = true

        val url = intent.getStringExtra("URL")
        if (url != null) {
            myWebView.loadUrl(url)
        }
    }
}