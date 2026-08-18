package com.example.wordbook

import android.os.Bundle
import android.util.Log
import android.webkit.WebSettings
import android.webkit.WebView
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback

class MainActivity : ComponentActivity() {
    private lateinit var webView: WebView
    private var lastBackPressTime = 0L

    @Suppress("DEPRECATION")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this)
        setContentView(webView)

        val webSettings = webView.settings
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true
        webSettings.allowFileAccess = true
        webSettings.allowContentAccess = true
        webSettings.setSupportZoom(true)
        webSettings.builtInZoomControls = true
        webSettings.displayZoomControls = false
        webSettings.allowUniversalAccessFromFileURLs = true
        webSettings.allowFileAccessFromFileURLs = true
        // 禁用缓存，避免改 assets 后 WebView 仍用旧 CSS/JS
        webSettings.cacheMode = WebSettings.LOAD_NO_CACHE

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                webView.evaluateJavascript("app.onBackPressed()") { result ->
                    Log.d("Wordbook", "app.onBackPressed() → $result")
                    when {
                        result == "\"root\"" || result == "\"error\"" || result == "null" ->
                            handleRootBackPress()
                        else ->
                            Log.d("Wordbook", "JS 已处理，Android 不做操作")
                    }
                }
            }
        })

        webView.loadUrl("file:///android_asset/index.html")
    }

    private fun handleRootBackPress() {
        val now = System.currentTimeMillis()
        val elapsed = now - lastBackPressTime
        Log.d("Wordbook", "handleRootBackPress elapsed=${elapsed}ms")
        if (elapsed > 2000) {
            Toast.makeText(this, "再按一次返回键退出应用", Toast.LENGTH_SHORT).show()
            lastBackPressTime = now
        } else {
            Log.d("Wordbook", "finish()")
            finish()
        }
    }
}
