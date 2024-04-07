//
//  UpsertSwiftData.swift
//  SwiftDataEx
//
//  Created by Falsy on 4/7/24.
//

import SwiftUI
import SwiftData

struct UpsertSwiftData: View {
  @Environment(\.modelContext) private var modelContext
  @Query private var posts: [Post]
  
  let uuid: UUID = UUID()
  @State var updateCnt: Int = 0
  
  var body: some View {
    VStack {
      ForEach(posts) { post in
        VStack {
          HStack {
            Text("\(post.title) / \(post.content) / \(post.createdAt) /")
          }
          if post.comments.count > 0 {
            Divider()
            ForEach(post.comments) {comment in
              HStack {
                Text("\(comment.content) / \(comment.createdAt)")
              }
            }
          }
        }
      }
      Divider()
      Text("\(updateCnt)")
      Button("UPSERT 글 추가") {
        do {
          modelContext.insert(Post(id: uuid, title: "Post-\(updateCnt)", content: "Content-\(updateCnt)"))
          updateCnt = updateCnt + 1
          try modelContext.save()
        } catch {
          print("error")
        }
      }
    }
  }
}
