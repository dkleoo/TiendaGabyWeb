package com.example.tiendagabyweb

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform