//
//  FilterSwiftData.swift
//  SwiftDataEx
//
//  Created by Falsy on 4/7/24.
//

import SwiftUI
import SwiftData

struct FilterSwiftData: View {
  @Query(filter: #Predicate<Post> {
    $0.comments.count > 0
  }) private var posts: [Post]
  
  var body: some View {
    VStack {
      Text("댓글이 있는 글만 출력")
      ForEach(posts) { post in
        VStack {
          HStack {
            Text("\(post.title) / \(post.content) / \(post.createdAt) /")
          }
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
