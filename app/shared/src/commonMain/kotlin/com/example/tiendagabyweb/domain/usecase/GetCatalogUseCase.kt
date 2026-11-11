package com.example.tiendagabyweb.domain.usecase

import com.example.tiendagabyweb.catalog.CatalogResponse
import com.example.tiendagabyweb.domain.repository.CatalogRepository

class GetCatalogUseCase(
    private val repository: CatalogRepository
) {
    suspend operator fun invoke(): Result<CatalogResponse> = repository.getCatalog()
}
