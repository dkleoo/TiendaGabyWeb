package com.example.tiendagabyweb.dto.dropi

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement

@Serializable
data class DropiProductsRequest(
    val page: Int = 1,
    val limit: Int = 40
)

@Serializable
data class DropiProductsResponse(
    val isSuccess: Boolean = false,
    val objects: List<DropiProduct> = emptyList(),
    val count: Int? = null,
    val message: String? = null,
    val status: Int? = null,
    @SerialName("is_successful") val isSuccessful: Boolean? = null,
    val data: DropiProductsData? = null
) {
    val success: Boolean
        get() = isSuccess || isSuccessful == true || objects.isNotEmpty() || data != null

    val items: List<DropiProduct>
        get() = objects.ifEmpty { data?.objects.orEmpty() }

    val total: Int?
        get() = count ?: data?.count
}

@Serializable
data class DropiProductsData(
    val objects: List<DropiProduct> = emptyList(),
    val count: Int? = null
)

@Serializable
data class DropiProduct(
    val id: JsonElement? = null,
    val name: String? = null,
    val sku: String? = null,
    val type: String? = null,
    @SerialName("sale_price") val salePrice: JsonElement? = null,
    @SerialName("suggested_price") val suggestedPrice: JsonElement? = null,
    val price: JsonElement? = null,
    @SerialName("stock_simple") val stockSimple: JsonElement? = null,
    @SerialName("variation_stock") val variationStock: JsonElement? = null,
    val image: String? = null,
    @SerialName("image_url") val imageUrl: String? = null,
    val gallery: List<DropiGallery> = emptyList(),
    val categories: List<DropiCategory> = emptyList(),
    val description: String? = null,
    val variations: List<DropiVariation> = emptyList(),
    val supplier: JsonElement? = null
)

@Serializable
data class DropiGallery(
    @SerialName("urlS3") val urlS3: String? = null,
    val url: String? = null,
    val main: Boolean = false
)

@Serializable
data class DropiCategory(
    val name: String? = null
)

@Serializable
data class DropiVariation(
    val id: JsonElement? = null,
    @SerialName("sale_price") val salePrice: JsonElement? = null,
    @SerialName("suggested_price") val suggestedPrice: JsonElement? = null,
    val stock: JsonElement? = null,
    val sku: String? = null,
    @SerialName("attribute_values") val attributeValues: List<DropiAttributeValue> = emptyList()
)

@Serializable
data class DropiAttributeValue(
    @SerialName("attribute_name") val attributeName: String? = null,
    @SerialName("attribute_value") val attributeValue: String? = null
)
