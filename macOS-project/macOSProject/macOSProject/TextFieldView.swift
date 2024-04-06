//
//  TextFieldView.swift
//  macOSProject
//
//  Created by Falsy on 4/6/24.
//

import SwiftUI

struct TextFieldView: View {
  
  @State var isDisableBackSpace: Bool = false
  
  var body: some View {
    VStack {
      Text(isDisableBackSpace ? "백스페이스 비활성화 상태" : "백스페이스 활성화 상태")
      CustomTextField(isDisableBackSpace: $isDisableBackSpace)
        .padding(50)
      Button {
        isDisableBackSpace.toggle()
      } label: {
        Text(isDisableBackSpace ? "활성화" : "비활성화")
      }
    }
  }
}
