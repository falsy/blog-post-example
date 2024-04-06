//
//  CustomHostingView.swift
//  macOSProject
//
//  Created by Falsy on 4/6/24.
//

import SwiftUI

struct CustomHostingView: NSViewRepresentable {
  
  func makeNSView(context: Context) -> NSView {
    let containerView = NSView()
    
    let hostingView = NSHostingView(rootView: HostingContentView())
    hostingView.translatesAutoresizingMaskIntoConstraints = false
    
    containerView.addSubview(hostingView)
    
    NSLayoutConstraint.activate([
      hostingView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
      hostingView.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
      hostingView.topAnchor.constraint(equalTo: containerView.topAnchor),
      hostingView.heightAnchor.constraint(equalTo: containerView.heightAnchor)
    ])
    
    return containerView
  }
  
  func updateNSView(_ nsView: NSView, context: Context) {
    
  }
  
}
