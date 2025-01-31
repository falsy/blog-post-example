//
//  AppDelegate.swift
//  toolbarView
//
//  Created by Falsy on 11/16/24.
//

import SwiftUI

class AppDelegate: NSObject, NSApplicationDelegate {
  func applicationDidFinishLaunching(_ aNotification: Notification) {
    let windowRect = NSRect(x: 0, y: 0, width: 800, height: 400)
    let newWindow = NSWindow(contentRect: windowRect,
                             styleMask: [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView],
                             backing: .buffered, defer: false)
    let contentView = ContentView()
      .frame(minWidth: 400, maxWidth: .infinity, minHeight: 200, maxHeight: .infinity)
    
    newWindow.contentView = NSHostingController(rootView: contentView).view
    newWindow.makeKeyAndOrderFront(nil)
    
    let accessoryViewController = ToolbarViewController()
    accessoryViewController.layoutAttribute = .top
    newWindow.addTitlebarAccessoryViewController(accessoryViewController)
    
    newWindow.center()
    
    let windowController = NSWindowController(window: newWindow)
    windowController.showWindow(self)
    
    // 기본 타이틀바 숨김
    newWindow.titlebarAppearsTransparent = true
    newWindow.titleVisibility = .hidden
    
    // 닫기, 최소화, 최대화 버튼의 여백을 키움
    newWindow.toolbar = NSToolbar()
  }
}
