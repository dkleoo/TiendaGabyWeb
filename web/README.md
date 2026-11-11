# TiendaGaby — diseño web

Versión web autónoma del diseño de la tienda (HTML + CSS + JavaScript), sin frameworks ni build.

## Ver la tienda

Abre `index.html` directamente en el navegador o sirve la carpeta:

```bash
cd web
python3 -m http.server 4321
```

Luego visita http://localhost:4321

> Se recomienda servirla por HTTP: `localStorage` y la geolocalización no funcionan igual con `file://`.

La página también la sirve el backend en http://localhost:8080 (misma ruta `/`, API en `/api/catalog/products`). Si usas otro puerto, `app.js` apunta a `http://localhost:8080`; puedes sobreescribirlo con `window.TIENDA_API_BASE`.

## Qué incluye

- Catalogo de 12 productos cargado desde `app.js`.
- Filtros por categoría y precio, búsqueda y orden (destacados, precio, nombre).
- Tarjetas con badges, tallas y colores; el carrito guarda la variante elegida.
- Carrito lateral persistente (`localStorage`) con cantidades y eliminación.
- Checkout en 3 columnas: cliente, transportadora y resumen.
- Cotización de envío simulada por ciudad y recaudo, comisión y ganancias.
- Validación de formulario, geolocalización (Nominatim) y pantalla de orden creada.
- Responsive: filtros plegables en móvil y carrito a pantalla completa.

## Notas

- Los precios están en COP y el envío/cotización es de demostración.
- Crear la orden no llama a un backend: es una simulación local del flujo.
- Tailwind se carga desde su CDN. Para producción conviene compilarlo con la CLI/PostCSS y sustituir el script.
