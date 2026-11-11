package com.example.tiendagabyweb.utils

import java.io.File

fun webDirectory(): File? {
    var directory = File(System.getProperty("user.dir")).absoluteFile
    repeat(4) {
        val candidate = File(directory, "web")
        if (File(candidate, "index.html").isFile) return candidate
        directory = directory.parentFile ?: return null
    }
    return null
}
