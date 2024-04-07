//
//  TransientSwiftData.swift
//  SwiftDataEx
//
//  Created by Falsy on 4/7/24.
//

import SwiftUI
import SwiftData

struct TransientSwiftData: View {
  @Query private var posts: [Post]
  
  @State var isUpdate: Bool = false
  
  var body: some View {
    VStack {
      Text("Transient 속성에 따른 뷰 설정")
      ForEach(posts) { post in
        VStack {
          HStack {
            Text("\(post.title) / \(post.content) / \(post.createdAt) /")
          }
          if post.isShowComment {
            Divider()
            ForEach(post.comments.sorted { $0.createdAt > $1.createdAt }) {comment in
              HStack {
                Text("\(comment.content) / \(comment.createdAt)")
              }
            }
          }
          Button("댓글 보기 / 숨기기") {
            post.isShowComment.toggle()
            isUpdate.toggle()
          }
        }
      }
    }
    .id(isUpdate)
  }
}
