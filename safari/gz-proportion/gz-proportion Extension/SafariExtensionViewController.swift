//
//  SafariExtensionViewController.swift
//  gz-proportion Extension
//
//  Created by Tommaso Amici on 29/01/2019.
//  Copyright © 2019 Tommaso Amici. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:320, height:240)
        return shared
    }()

}
