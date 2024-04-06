//
//  CustomTextField.swift
//  macOSProject
//
//  Created by Falsy on 4/6/24.
//

import SwiftUI

struct CustomTextField: NSViewRepresentable {
  
  @Binding var isDisableBackSpace: Bool
  
  class Coordinator: NSObject, NSTextFieldDelegate {
    var parent: CustomTextField
    
    init(_ parent: CustomTextField) {
      self.parent = parent
    }
    
    func control(_ control: NSControl, textView: NSTextView, doCommandBy commandSelector: Selector) -> Bool {
      if commandSelector == #selector(NSResponder.deleteBackward(_:)) {
        if self.parent.isDisableBackSpace {
          return true
        }
      }
      return false
    }
  }
  
  func makeCoordinator() -> Coordinator {
    Coordinator(self)
  }
  
  func makeNSView(context: Context) -> NSTextField {
    let textField = NSTextField()
    textField.delegate = context.coordinator
    return textField
  }
  
  func updateNSView(_ nsView: NSTextField, context: Context) {
    
  }
}
