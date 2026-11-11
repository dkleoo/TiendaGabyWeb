package com.example.tiendagabyweb.data.dropi

import com.example.tiendagabyweb.dto.dropi.DropiProduct
import kotlinx.serialization.json.Json
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull

class DropiCatalogMapperTest {
    private val json = Json { ignoreUnknownKeys = true }

    @Test
    fun mapsProductFieldsVariantsAndSupplier() {
        val product = json.decodeFromString<DropiProduct>(
            """
            {
              "id": 1052394,
              "name": "Chaqueta Oversize",
              "sku": "CHA-001",
              "sale_price": "120000.00",
              "suggested_price": 180000,
              "stock_simple": "12",
              "image": "https://cdn.dropi.co/chaqueta.jpg",
              "categories": [{ "name": "Ropa Femenina" }],
              "supplier": { "name": "Proveedor Demo" },
              "variations": [
                { "attribute_values": [{ "attribute_name": "Talla", "attribute_value": "M" }] },
                { "attribute_values": [{ "attribute_name": "Color", "attribute_value": "Negro" }] }
              ]
            }
            """.trimIndent()
        )

        val mapped = assertNotNull(product.toCatalogProduct())

        assertEquals("1052394", mapped.id)
        assertEquals("Chaqueta Oversize", mapped.name)
        assertEquals(120000L, mapped.price)
        assertEquals(180000L, mapped.compareAtPrice)
        assertEquals(12, mapped.stock)
        assertEquals("Ropa Femenina", mapped.category)
        assertEquals("Proveedor Demo", mapped.supplier)
        assertEquals(listOf("M"), mapped.sizes)
        assertEquals(1, mapped.colors.size)
        assertEquals("Negro", mapped.colors.first().name)
        assertEquals("#111111", mapped.colors.first().hex)
    }

    @Test
    fun usesVariationStockWhenSimpleStockIsMissing() {
        val product = json.decodeFromString<DropiProduct>(
            """
            {
              "id": 7,
              "name": "Producto variable",
              "sale_price": 50000,
              "variations": [
                { "stock": 3 },
                { "stock": 4 }
              ]
            }
            """.trimIndent()
        )

        val mapped = assertNotNull(product.toCatalogProduct())

        assertEquals(7, mapped.stock)
        assertEquals(50000L, mapped.price)
        assertNull(mapped.compareAtPrice)
    }

    @Test
    fun discardsProductsWithoutIdOrName() {
        val withoutId = json.decodeFromString<DropiProduct>("""{"name":"Sin id"}""")
        val withoutName = json.decodeFromString<DropiProduct>("""{"id":1}""")

        assertNull(withoutId.toCatalogProduct())
        assertNull(withoutName.toCatalogProduct())
    }
}
