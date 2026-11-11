package com.example.tiendagabyweb.data.dropi

import com.example.tiendagabyweb.catalog.CatalogColor
import com.example.tiendagabyweb.catalog.CatalogProduct
import com.example.tiendagabyweb.dto.dropi.DropiProduct
import com.example.tiendagabyweb.dto.dropi.DropiVariation
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.jsonPrimitive
import kotlin.math.roundToLong

fun DropiProduct.toCatalogProduct(): CatalogProduct? {
    val productId = id.asText() ?: return null
    val productName = name?.takeIf { it.isNotBlank() } ?: return null
    val currentPrice = salePrice.asLong() ?: price.asLong() ?: suggestedPrice.asLong() ?: 0L
    val suggested = suggestedPrice.asLong()
    val attributes = variations.flatMap(DropiVariation::attributeValues)

    return CatalogProduct(
        id = productId,
        name = productName,
        description = description.orEmpty(),
        price = currentPrice,
        compareAtPrice = suggested?.takeIf { it > currentPrice },
        imageUrl = resolveImage(),
        category = categories.firstOrNull()?.name?.takeIf { it.isNotBlank() } ?: "Dropi",
        stock = resolveStock(),
        sku = sku,
        supplier = resolveSupplier(),
        sizes = attributes
            .filter { it.attributeName.orEmpty().isSizeAttribute() }
            .mapNotNull { it.attributeValue?.takeIf(String::isNotBlank) }
            .distinct(),
        colors = attributes
            .filter { it.attributeName.orEmpty().isColorAttribute() }
            .mapNotNull { it.attributeValue?.takeIf(String::isNotBlank) }
            .distinctBy { it.lowercase() }
            .map { CatalogColor(name = it, hex = it.toColorHex()) }
    )
}

private fun DropiProduct.resolveImage(): String =
    image?.takeIf(String::isNotBlank)
        ?: imageUrl?.takeIf(String::isNotBlank)
        ?: gallery.firstOrNull { it.main }?.urlS3
        ?: gallery.firstOrNull { it.main }?.url
        ?: gallery.firstOrNull()?.urlS3
        ?: gallery.firstOrNull()?.url
        ?: ""

private fun DropiProduct.resolveStock(): Int =
    stockSimple.asInt()
        ?: variationStock.asInt()
        ?: variations.sumOf { it.stock.asInt() ?: 0 }

private fun DropiProduct.resolveSupplier(): String? {
    val value = supplier ?: return null
    return when (value) {
        is JsonPrimitive -> value.content.takeIf(String::isNotBlank)
        is JsonObject -> value["name"]?.jsonPrimitive?.content?.takeIf(String::isNotBlank)
        else -> null
    }
}

private fun JsonElement?.asText(): String? = when (this) {
    null, JsonNull -> null
    is JsonPrimitive -> content.takeIf(String::isNotBlank)
    else -> null
}

private fun JsonElement?.asLong(): Long? = asText()?.toDoubleOrNull()?.roundToLong()

private fun JsonElement?.asInt(): Int? = asText()?.toDoubleOrNull()?.toInt()

private fun String.normalized(): String = lowercase()
    .replace("á", "a")
    .replace("é", "e")
    .replace("í", "i")
    .replace("ó", "o")
    .replace("ú", "u")
    .replace("ñ", "n")

private fun String.isSizeAttribute(): Boolean {
    val value = normalized()
    return value.contains("talla") || value.contains("size") || value.contains("tamano")
}

private fun String.isColorAttribute(): Boolean {
    val value = normalized()
    return value.contains("color") || value.contains("colour")
}

private fun String.toColorHex(): String {
    val value = trim()
    if (value.startsWith("#")) return value
    return colorPalette[value.normalized()] ?: "#d1d5db"
}

private val colorPalette = mapOf(
    "negro" to "#111111",
    "blanco" to "#f8f8f8",
    "rojo" to "#c0392b",
    "azul" to "#2d6cdf",
    "verde" to "#2e8b57",
    "amarillo" to "#e1b12c",
    "rosa" to "#e88ca4",
    "rosado" to "#e88ca4",
    "morado" to "#7d5ba6",
    "violeta" to "#7d5ba6",
    "naranja" to "#e67e22",
    "gris" to "#9ca3af",
    "beige" to "#d8cfc0",
    "arena" to "#d8cfc0",
    "camel" to "#c0a080",
    "marron" to "#8a5a35",
    "cafe" to "#8a5a35",
    "terracota" to "#b5654a",
    "dorado" to "#c9a227",
    "plateado" to "#c0c0c0",
    "transparente" to "#e8e8e8",
    "cristal" to "#e8e8e8",
    "multicolor" to "#7d5ba6"
)
