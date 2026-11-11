package com.example.tiendagabyweb.routes

import com.example.tiendagabyweb.catalog.CatalogResponse
import com.example.tiendagabyweb.data.dropi.DropiApiException
import com.example.tiendagabyweb.data.dropi.DropiCatalogClient
import com.example.tiendagabyweb.data.dropi.DropiNotConfiguredException
import com.example.tiendagabyweb.data.dropi.toCatalogProduct
import com.example.tiendagabyweb.dto.ApiError
import com.example.tiendagabyweb.utils.DropiConfig
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.log
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get

fun Route.catalogRoutes(client: DropiCatalogClient, config: DropiConfig) {
    get("/api/catalog/products") {
        if (!config.isConfigured) {
            call.respond(HttpStatusCode.ServiceUnavailable, ApiError("DROPI_TOKEN no está configurado"))
            return@get
        }

        val page = call.request.queryParameters["page"]?.toIntOrNull()?.coerceAtLeast(1) ?: 1
        val limit = call.request.queryParameters["limit"]?.toIntOrNull()?.coerceIn(1, 100) ?: 40

        try {
            val response = client.fetchProducts(page = page, limit = limit)

            if (response.status == 401) {
                call.application.log.warn("Dropi rechazó el token: {}", response.message)
                call.respond(HttpStatusCode.Unauthorized, ApiError(response.message ?: "Token de Dropi inválido"))
                return@get
            }

            if (!response.success) {
                call.application.log.warn("Dropi rechazó la solicitud: {}", response.message)
                call.respond(HttpStatusCode.BadGateway, ApiError(response.message ?: "Dropi rechazó la solicitud"))
                return@get
            }

            val products = response.items.mapNotNull { it.toCatalogProduct() }
            call.respond(CatalogResponse(products = products, total = response.total ?: products.size))
        } catch (error: DropiNotConfiguredException) {
            call.respond(HttpStatusCode.ServiceUnavailable, ApiError(error.message ?: "Dropi no está configurado"))
        } catch (error: DropiApiException) {
            call.respond(HttpStatusCode.BadGateway, ApiError(error.message ?: "No se pudo consultar Dropi"))
        } catch (error: Exception) {
            call.respond(HttpStatusCode.BadGateway, ApiError(error.message ?: "No se pudo consultar Dropi"))
        }
    }
}
