package com.example.tiendagabyweb.data.remote

import com.example.tiendagabyweb.catalog.CatalogResponse
import com.example.tiendagabyweb.utils.ApiConfig
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.get
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json

class CatalogApi(
    private val baseUrl: String = ApiConfig.BASE_URL,
    private val client: HttpClient = defaultHttpClient()
) {
    suspend fun getCatalog(): CatalogResponse =
        client.get("$baseUrl/api/catalog/products").body()
}

private fun defaultHttpClient(): HttpClient = HttpClient {
    install(ContentNegotiation) {
        json(Json {
            ignoreUnknownKeys = true
            isLenient = true
        })
    }
}
