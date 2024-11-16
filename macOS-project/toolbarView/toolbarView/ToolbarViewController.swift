//
//  ToolbarArea.swift
//  toolbarView
//
//  Created by Falsy on 11/16/24.
//

import SwiftUI

class ToolbarViewController: NSTitlebarAccessoryViewController {  
  override func loadView() {
    let hostingView = NSHostingView(rootView: CustomToolbarView())
    self.view = hostingView
  }
}
