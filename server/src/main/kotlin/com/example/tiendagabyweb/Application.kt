package com.example.tiendagabyweb

import com.example.tiendagabyweb.data.dropi.DropiCatalogClient
import com.example.tiendagabyweb.routes.catalogRoutes
import com.example.tiendagabyweb.utils.DropiConfig
import com.example.tiendagabyweb.utils.webDirectory
import io.ktor.serialization.kotlinx.json.json
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.http.content.default
import io.ktor.server.http.content.staticFiles
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.ContentNegotiation
import io.ktor.server.plugins.cors.routing.CORS
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.json.Json

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    install(ContentNegotiation) {
        json(Json {
            ignoreUnknownKeys = true
            isLenient = true
        })
    }
    install(CORS) {
        allowHost("localhost:4321", schemes = listOf("http"))
        allowHost("127.0.0.1:4321", schemes = listOf("http"))
    }

    val dropiConfig = DropiConfig.fromEnvironment()
    val catalogClient = DropiCatalogClient(dropiConfig)
    val webDir = webDirectory()

    if (!dropiConfig.isConfigured) {
        log.warn("DROPI_TOKEN no está configurado; el catálogo responderá 503")
    } else {
        log.info("Dropi configurado desde {}", dropiConfig.source)
    }

    routing {
        get("/api/hello") {
            call.respondText(sayHello("Ktor"))
        }
        catalogRoutes(catalogClient, dropiConfig)
        if (webDir == null) {
            get("/") {
                call.respondText(sayHello("Ktor"))
            }
        } else {
            staticFiles("/", webDir) {
                default("index.html")
            }
        }
    }
}
