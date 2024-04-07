//
//  UpsertSwiftData.swift
//  SwiftDataEx
//
//  Created by Falsy on 4/7/24.
//

import SwiftUI

struct UpsertSwiftData: View {
  @Environment(\.modelContext) private var modelContext
  
  let uuid: UUID = UUID()
  @State var updateCnt: Int = 0
  
  var body: some View {
    Divider()
    Text("\(updateCnt)")
    Button {
      modelContext.insert(Post(id: uuid, title: "Post-\(updateCnt)", content: "Content-\(updateCnt)"))
      updateCnt = updateCnt + 1
    } label: {
      Text("글 추가 - Upsert")
    }
  }
}
