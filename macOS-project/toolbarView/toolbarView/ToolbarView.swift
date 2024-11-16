//
//  ToolbarView.swift
//  toolbarView
//
//  Created by Falsy on 11/16/24.
//

import SwiftUI

struct CustomToolbarView: View {
   var body: some View {
    VStack {
      Text("Toolbar")
        .foregroundStyle(.white)
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(.black)
  }
}
