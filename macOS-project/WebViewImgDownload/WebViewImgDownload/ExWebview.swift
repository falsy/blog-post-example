//
//  ExWebview.swift
//  WebViewImgDownload
//
//  Created by Falsy on 4/18/24.
//

import SwiftUI
import WebKit

struct ExWebview: NSViewRepresentable {
  
  func makeCoordinator() -> Coordinator {
    Coordinator(self)
  }
  
  class Coordinator: NSObject, WKUIDelegate {
    var parent: ExWebview
    
    init(_ parent: ExWebview) {
      self.parent = parent
    }
    
    private func downloadImage(from url: URL, completion: @escaping (Data?, Error?) -> Void) {
      let task = URLSession.shared.dataTask(with: url) { data, response, error in
        completion(data, error)
      }
      task.resume()
    }
    
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
      if let customAction = (webView as? ExWKWebView)?.contextualMenuAction, let requestURL = navigationAction.request.url {
        if customAction == .downloadImage {
          downloadImage(from: requestURL) { data, error in
            guard let data = data, error == nil else { return }
            
            DispatchQueue.main.async {
              let savePanel = NSSavePanel()
              savePanel.allowedContentTypes = [.png, .jpeg, .bmp, .gif]
              savePanel.canCreateDirectories = true
              savePanel.isExtensionHidden = false
              savePanel.title = "Save As"
              savePanel.nameFieldLabel = NSLocalizedString("Save As:", comment: "")
              if requestURL.lastPathComponent != "" {
                savePanel.nameFieldStringValue = requestURL.lastPathComponent
              }
              
              if savePanel.runModal() == .OK, let url = savePanel.url {
                do {
                  try data.write(to: url)
                  print("Image saved to \(url)")
                } catch {
                  print("Failed to save image: \(error)")
                }
              }
            }
          }
          
          return nil
        }
      }
      return nil
    }
  }
  
  func makeNSView(context: Context) -> WKWebView {
    let config = WKWebViewConfiguration()
    let prefs = WKWebpagePreferences()
    prefs.allowsContentJavaScript = true
    config.defaultWebpagePreferences = prefs
    
    let webview = ExWKWebView(frame: .zero, configuration: config)
    webview.uiDelegate = context.coordinator
    
    webview.load(URLRequest(url: URL(string: "https://falsy.me")!))
    return webview
  }
  
  func updateNSView(_ webView: WKWebView, context: Context) {
  }
  
}
