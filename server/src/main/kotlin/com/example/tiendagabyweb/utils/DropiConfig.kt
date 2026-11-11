package com.example.tiendagabyweb.utils

import java.io.File
import java.util.Properties

data class DropiConfig(
    val baseUrl: String,
    val token: String,
    val source: String
) {
    val isConfigured: Boolean
        get() = token.isNotBlank()

    companion object {
        private const val DEFAULT_BASE_URL = "https://api.dropi.co/api"

        fun fromEnvironment(): DropiConfig {
            val properties = loadLocalProperties()
            val envToken = System.getenv("DROPI_TOKEN")
            val systemToken = System.getProperty("dropi.token")
            val localToken = properties.getProperty("dropi.token")
            val token = envToken ?: systemToken ?: localToken ?: ""
            val baseUrl = System.getenv("DROPI_BASE_URL")
                ?: properties.getProperty("dropi.baseUrl")
                ?: DEFAULT_BASE_URL
            val source = when {
                !envToken.isNullOrBlank() -> "env"
                !systemToken.isNullOrBlank() -> "system"
                !localToken.isNullOrBlank() -> "local.properties"
                else -> "none"
            }
            return DropiConfig(baseUrl.trimEnd('/'), token.trim(), source)
        }

        private fun loadLocalProperties(): Properties {
            var directory = File(System.getProperty("user.dir")).absoluteFile
            repeat(3) {
                val file = File(directory, "local.properties")
                if (file.isFile) {
                    return Properties().apply { file.inputStream().use(::load) }
                }
                directory = directory.parentFile ?: return Properties()
            }
            return Properties()
        }
    }
}
