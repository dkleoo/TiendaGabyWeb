This is a Kotlin Multiplatform project targeting Web, Server.

* [/app/shared](./app/shared/src) is for code that will be shared across your Compose Multiplatform applications.
  It contains several subfolders:
    - [commonMain](./app/shared/src/commonMain/kotlin) is for code that’s common for all targets.
    - Other folders are for Kotlin code that will be compiled for only the platform indicated in the folder name.
      For example, if you want to use Apple’s CoreCrypto for the iOS part of your Kotlin app,
      the [iosMain](./app/shared/src/iosMain/kotlin) folder would be the right place for such calls.
      Similarly, if you want to edit the Desktop (JVM) specific part, the [jvmMain](./app/shared/src/jvmMain/kotlin)
      folder is the appropriate location.

* [/core](./core/src) is for the code that will be shared between all targets in the project.
  The most important subfolder is [commonMain](./core/src/commonMain/kotlin). If preferred, you
  can add code to the platform-specific folders here too.

* [/server](./server/src/main/kotlin) is for the Ktor server application.

### Running the apps

Use the run configurations provided by the run widget in your IDE's toolbar. You can also use these commands and
options:

- Server: `./gradlew :server:run`
- Web app:
    - Wasm target (faster, modern browsers): `./gradlew :app:webApp:wasmJsBrowserDevelopmentRun`
    - JS target (slower, supports older browsers): `./gradlew :app:webApp:jsBrowserDevelopmentRun`

### Catálogo Dropi

El servidor actúa como proxy: la UI nunca recibe el token. El flujo es `Dropi -> :server -> :app:shared -> web`.

1. Crea/edita `local.properties` en la raíz (está ignorado por git):

   ```properties
   dropi.token=TU_TOKEN_DE_API_DROPI
   ```

   También puedes usar la variable de entorno `DROPI_TOKEN`. La URL base es `https://api.dropi.co/api` y se puede cambiar con `dropi.baseUrl` o `DROPI_BASE_URL`.

2. Levanta el servidor:

   ```bash
   ./gradlew :server:run
   ```

3. Abre http://localhost:8080. El servidor sirve `web/` y expone:

   - `GET /api/catalog/products?page=1&limit=40`
   - `GET /api/hello`

El token debe ser un **token de API de Dropi**. Si Dropi responde `Token not issued to this api`, el token pertenece a otra integración (por ejemplo Cubiko) y hay que generar uno nuevo en la configuración de API de Dropi.

Arquitectura:

- `core`: contrato `CatalogProduct`/`CatalogResponse` compartido.
- `app/shared`: `CatalogApi` (Ktor client), `CatalogRepository`, `GetCatalogUseCase`.
- `server`: `DropiCatalogClient`, DTOs, mapper, `DropiConfig` y `catalogRoutes`.
- `web`: `loadCatalog()` consume el endpoint; si falla, conserva el catálogo de demostración como fallback.

---

Learn more about [Kotlin Multiplatform](https://www.jetbrains.com/help/kotlin-multiplatform-dev/get-started.html),
[Compose Multiplatform](https://kotlinlang.org/compose-multiplatform/),
[Kotlin/Wasm](https://kotl.in/wasm/)…

We would appreciate your feedback on Compose/Web and Kotlin/Wasm in the public Slack
channel [#compose-web](https://slack-chats.kotlinlang.org/c/compose-web).
If you face any issues, please report them on [YouTrack](https://youtrack.jetbrains.com/newIssue?project=CMP).# TiendaGabyWeb
