//
//  Comment.swift
//  SwiftDataEx
//
//  Created by Falsy on 4/7/24.
//

import SwiftUI
import SwiftData

@Model
class Comment {
  @Attribute(.unique)
  var id: UUID
  var post: Post?
  var content: String
  var createdAt: Date
  
  init(id: UUID = UUID(), content: String) {
    self.id = id
    self.content = content
    self.createdAt = Date.now
  }
}
