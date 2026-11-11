package com.example.tiendagabyweb.data.dropi

import com.example.tiendagabyweb.dto.dropi.DropiProductsRequest
import com.example.tiendagabyweb.dto.dropi.DropiProductsResponse
import com.example.tiendagabyweb.utils.DropiConfig
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.header
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json

class DropiCatalogClient(
    private val config: DropiConfig,
    private val httpClient: HttpClient = defaultHttpClient()
) {
    suspend fun fetchProducts(page: Int = 1, limit: Int = 40): DropiProductsResponse {
        if (!config.isConfigured) throw DropiNotConfiguredException()
        return httpClient.post("${config.baseUrl}/products") {
            header(HttpHeaders.Authorization, "Bearer ${config.token}")
            contentType(ContentType.Application.Json)
            setBody(DropiProductsRequest(page = page, limit = limit))
        }.body()
    }

    companion object {
        private fun defaultHttpClient(): HttpClient = HttpClient(CIO) {
            install(ContentNegotiation) {
                json(Json {
                    ignoreUnknownKeys = true
                    isLenient = true
                })
            }
        }
    }
}

class DropiNotConfiguredException : IllegalStateException("DROPI_TOKEN no está configurado")

class DropiApiException(message: String) : IllegalStateException(message)
