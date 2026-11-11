package com.example.tiendagabyweb.catalog

import kotlinx.serialization.Serializable

@Serializable
data class CatalogProduct(
    val id: String,
    val name: String,
    val description: String = "",
    val price: Long = 0,
    val compareAtPrice: Long? = null,
    val imageUrl: String = "",
    val category: String = "Dropi",
    val stock: Int = 0,
    val sku: String? = null,
    val supplier: String? = null,
    val sizes: List<String> = emptyList(),
    val colors: List<CatalogColor> = emptyList()
)

@Serializable
data class CatalogColor(
    val name: String,
    val hex: String
)

@Serializable
data class CatalogResponse(
    val products: List<CatalogProduct> = emptyList(),
    val total: Int = 0
)
