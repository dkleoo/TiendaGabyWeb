package com.example.tiendagabyweb.domain.repository

import com.example.tiendagabyweb.catalog.CatalogResponse

interface CatalogRepository {
    suspend fun getCatalog(): Result<CatalogResponse>
}
