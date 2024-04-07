//
//  SortSwiftData.swift
//  SwiftDataEx
//
//  Created by Falsy on 4/7/24.
//

import SwiftUI
import SwiftData

struct SortSwiftData: View {
  @Query(sort: \Post.createdAt, order: .reverse) private var posts: [Post]
  
  var body: some View {
    VStack {
      Text("내림차순 정렬")
      ForEach(posts) { post in
        VStack {
          HStack {
            Text("\(post.title) / \(post.content) / \(post.createdAt) /")
            Button("댓글 추가") {
              post.comments.append(Comment(content: "Comment-\(post.comments.count)"))
            }
          }
          if post.comments.count > 0 {
            Divider()
            ForEach(post.comments.sorted { $0.createdAt > $1.createdAt }) {comment in
              HStack {
                Text("\(comment.content) / \(comment.createdAt)")
              }
            }
          }
        }
      }
    }
  }
}
