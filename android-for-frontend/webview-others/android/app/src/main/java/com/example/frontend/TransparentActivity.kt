package com.example.frontend

import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient

class MyWebViewClient : WebViewClient() {
    override fun shouldOverrideUrlLoading(
        view: WebView?,
        request: WebResourceRequest?
    ): Boolean {
        view?.loadUrl(request?.url.toString())
        return super.shouldOverrideUrlLoading(view, request)
    }
}

class TransparentActivity : AppCompatActivity() {

    private lateinit var myWebView: WebView;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_transparent)

        myWebView = findViewById(R.id.webView1)
        myWebView.settings.javaScriptEnabled = true
        myWebView.webViewClient = MyWebViewClient()
        myWebView.loadUrl("http://10.0.2.2:8080")
    }

    override fun onBackPressed() {
        if (myWebView.canGoBack()) {
            myWebView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}