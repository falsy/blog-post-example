//
//  Item.swift
//  dockmenutest
//
//  Created by Falsy on 10/6/24.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
