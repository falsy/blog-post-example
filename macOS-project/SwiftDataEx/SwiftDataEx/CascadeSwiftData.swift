//
//  CaseCase.swift
//  SwiftDataEx
//
//  Created by Falsy on 4/7/24.
//

import SwiftUI
import SwiftData

struct CascadeSwiftData: View {
  @Environment(\.modelContext) private var modelContext
  @Query private var comments: [Comment]
  
  var body: some View {
    VStack {
      Text("모든 댓글")
      ForEach(comments) { comment in
        Text("\(comment.content) / \("") / \(comment.createdAt)")
      }
    }
  }
}
