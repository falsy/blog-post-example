//
//  ToolbarArea.swift
//  toolbarView
//
//  Created by Falsy on 11/16/24.
//

import SwiftUI

class ToolbarViewController: NSTitlebarAccessoryViewController {
  init() {
    super.init(nibName: nil, bundle: nil)
    self.setupView()
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  private func setupView() {
    let hostingView = NSHostingView(rootView: CustomToolbarView())
    self.view = hostingView
  }
}
