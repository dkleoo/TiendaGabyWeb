package com.example.tiendagabyweb.data.repositoryImpl

import com.example.tiendagabyweb.catalog.CatalogResponse
import com.example.tiendagabyweb.data.remote.CatalogApi
import com.example.tiendagabyweb.domain.repository.CatalogRepository

class CatalogRepositoryImpl(
    private val api: CatalogApi
) : CatalogRepository {
    override suspend fun getCatalog(): Result<CatalogResponse> = runCatching { api.getCatalog() }
}
