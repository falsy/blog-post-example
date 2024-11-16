//
//  toolbarViewApp.swift
//  toolbarView
//
//  Created by Falsy on 11/16/24.
//

import SwiftUI
import SwiftData

@main
struct toolbarViewApp: App {
  @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
  
  var body: some Scene {
    Settings {
      EmptyView()
    }
  }
}
