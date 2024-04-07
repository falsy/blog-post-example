//
//  Post.swift
//  SwiftDataEx
//
//  Created by Falsy on 4/7/24.
//

import SwiftUI
import SwiftData

@Model
class Post {
  @Attribute(.unique)
  var id: UUID
  var title: String
  var content: String
  @Relationship(deleteRule: .cascade, inverse: \Comment.post)
  var comments: [Comment] = [Comment]()
  var createdAt: Date
  
  @Transient
  var isShowComment: Bool = false
  
  init(id: UUID = UUID(), title: String, content: String) {
    self.id = id
    self.title = title
    self.content = content
    self.createdAt = Date.now
  }
}
