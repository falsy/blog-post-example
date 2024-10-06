//
//  dockmenutestApp.swift
//  dockmenutest
//
//  Created by Falsy on 10/6/24.
//

import SwiftUI

@main
struct TestApp: App {
  @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

  var body: some Scene {
    WindowGroup {
      Text("Hello, World!")
    }
  }
}

class AppDelegate: NSObject, NSApplicationDelegate {
  func applicationDockMenu(_ sender: NSApplication) -> NSMenu? {
    let dockMenu = NSMenu(title: "MyMenu")
    let myMenuItem = NSMenuItem(title: "My Item 1", action: #selector(self.menuItemAction), keyEquivalent: "")
    dockMenu.addItem(myMenuItem)
      
    return dockMenu
  }

  @objc func menuItemAction() {
    print("Menu item clicked")
  }
}
