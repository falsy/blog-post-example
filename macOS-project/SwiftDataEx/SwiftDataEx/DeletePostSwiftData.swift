//
//  DeletePostSwiftData.swift
//  SwiftDataEx
//
//  Created by Falsy on 4/7/24.
//

import SwiftUI
import SwiftData

struct DeletePostSwiftData: View {
  @Environment(\.modelContext) private var modelContext
  @Query private var posts: [Post]
  
  var body: some View {
    VStack {
      Text("댓글까지 삭제")
      ForEach(posts) { post in
        VStack {
          HStack {
            Text("\(post.title) / \(post.content) / \(post.createdAt) /")
            Button("글 삭제") {
              do {
                if post.comments.count > 0 {
                  for comment in post.comments {
                    modelContext.delete(comment)
                  }
                }
                modelContext.delete(post)
                try modelContext.save()
              } catch {
                print("error")
              }
            }
            Button("댓글 추가") {
              post.comments.append(Comment(content: "Comment-\(post.comments.count)"))
            }
          }
          if post.comments.count > 0 {
            Divider()
            ForEach(post.comments) {comment in
              HStack {
                Text("\(comment.content) / \(comment.createdAt)")
                Button("댓글 삭제") {
                  do {
                    modelContext.delete(comment)
                    try modelContext.save()
                  } catch {
                    print("error")
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
