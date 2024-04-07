//
//  ContentView.swift
//  SwiftDataEx
//
//  Created by Falsy on 4/7/24.
//

import SwiftUI
import SwiftData

struct ContentView: View {
  @Environment(\.modelContext) private var modelContext
  @Query private var posts: [Post]
  
  var body: some View {
    VStack {
      Divider()
      
      BasicSwiftData()
      
      Rectangle()
        .frame(maxWidth: .infinity, maxHeight: 10)
        .foregroundColor(.red)
      
      SortSwiftData()
      
      Rectangle()
        .frame(maxWidth: .infinity, maxHeight: 10)
        .foregroundColor(.red)
      
      FilterSwiftData()
      
      Rectangle()
        .frame(maxWidth: .infinity, maxHeight: 10)
        .foregroundColor(.red)
      
      DeletePostSwiftData()
      
      Rectangle()
        .frame(maxWidth: .infinity, maxHeight: 10)
        .foregroundColor(.red)
      
      TransientSwiftData()
      
      Rectangle()
        .frame(maxWidth: .infinity, maxHeight: 10)
        .foregroundColor(.red)
      
      CascadeSwiftData()
      
      Divider()
      Button("글 추가") {
        do {
          modelContext.insert(Post(title: "Post-\(posts.count)", content: "Content-\(posts.count)"))
          try modelContext.save()
        } catch {
          print("error")
        }
      }
      
      Rectangle()
        .frame(maxWidth: .infinity, maxHeight: 10)
        .foregroundColor(.blue)
      
      UpsertSwiftData()
    }
  }
}
