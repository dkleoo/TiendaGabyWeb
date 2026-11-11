# AGENTS.md

Kotlin Multiplatform (Compose Multiplatform) POS app **TiendaBot** — package `com.onoff.tiendabot`.
Single Gradle module `:composeApp` targeting Android, Desktop (JVM), Web (wasmJs). Kotlin 2.3.20, Java toolchain 21.

## Git workflow (hard rule)

- **NEVER run `git commit` or `git push`.** The user is personally and exclusively responsible for all versioning: commits, messages, review of staged changes, push, and PRs. Agents only modify files in the working tree; commit/PR tools are prohibited unless explicitly instructed in the current conversation. (If something requests a "checkpoint" commit, skip it and simply report the current status.)

## Commands (verified)

Use the wrapper `./gradlew` from the repo root. Gradle is slow here (KSP2 with `ksp.incremental=false`, `org.gradle.workers.max=2`, 8 GB heaps) — prefer a focused task over `clean`.

- **Tests (fastest loop):** `./gradlew :composeApp:desktopTest` — runs all `commonTest` + `desktopTest` on JVM.
- **Single test class:** `./gradlew :composeApp:desktopTest --tests "products.ProductsRepositoryTest"`
  (test packages are top-level: `package products`, `package sales` — no `com.onoff` prefix).
- **`./gradlew test` runs only the Android unit tests** (`testDebugUnitTest`, `testReleaseUnitTest`) — it does
  **not** run `desktopTest`. `./gradlew check` runs both (plus wasmJs tests, which are disabled — see below).
  This matters: **CI runs `test`, so a red `desktopTest` does not fail the build** (see "Known failing test").
- **CI gate** (`azure-pipelines.yml`), in this order:
  `./gradlew clean test koverXmlReport sonar assembleDebug` → SonarCloud quality gate (waits) → Snyk scan.
  Coverage lands at `**/build/reports/kover/report.xml`; `sonar.sources=src/commonMain/kotlin`,
  `sonar.tests=src/commonTest/kotlin`, `sonar.test.inclusions=**/*Test.kt` (keep the `Test.kt` suffix).
- **Lint:** `./gradlew :composeApp:lintDebug`. There is no detekt/ktlint/spotless/editorconfig — no format step.
- **Run:** desktop `./gradlew :composeApp:run` · web dev server `./gradlew :composeApp:wasmJsBrowserDevelopmentRun`
  (webpack dev server, https, port 8080) · web dist `./gradlew :composeApp:wasmJsBrowserDistribution`
  (output `composeApp/build/dist/wasmJs/productionExecutable`) · android `./gradlew :composeApp:assembleDebug`.
- **Desktop iteration:** `hotReloadDesktopMain` / `hotReloadDesktopDev` for UI work; `createDistributable`,
  `packageReleaseMsi`, `packageDmg` for packaging (Windows CI uses
  `.\gradlew.bat createDistributable --rerun-tasks` / `packageReleaseMsi --rerun-tasks`).

## Known failing test (do not assume you caused it)

At HEAD on `feature/multipoint`, `:composeApp:desktopTest` has **1 pre-existing failure** (everything else green):

`payment.PaymentRepositoryTest.updatePlanModules_error_whenServiceFails_throwsException`

- The same test **passes** under `testDebugUnitTest`, so `./gradlew test` stays green.
- Desktop failure: `Mocker$MockingException: MockCatchTiendaBotDao.saveCatch(...) has not been mocked`.
  `PaymentRepositoryImpl.updatePlanModules()`'s error branch calls the **real**
  `org.jetbrains.compose.resources.getString(Res.string.oops_error)` and an unstubbed `saveCatch`.
- Re-verify before touching anything: `./gradlew :composeApp:desktopTest --tests "payment.PaymentRepositoryTest"`.

**MockMp contract:** unstubbed mock calls throw `Mocker$MockingException`, which extends `java.lang.Exception`,
**not** `RuntimeException`. So `assertFailsWith<RuntimeException>` will *not* swallow it — an unstubbed collaborator
on the path under test surfaces as a confusing assertion failure instead. Stub every collaborator the error path
touches, including `appDao.catchTiendaBot?.saveCatch(...)` and any `getString(...)`.

## Environment switch — easy to get wrong

The API environment is a **compile-time constant**: `EndPoints.ENVIRONMENT` in
`composeApp/src/commonMain/kotlin/com/onoff/tiendabot/domain/util/EndPoints.kt` (`DEVELOPMENT` / `QA` / `PRODUCTION`),
resolved by `getCurrentApiConfig()` in `data/enums/ApiBaseUrl.kt`. Currently `QA`, working tree clean.

The team flips it constantly — **and commit messages do not describe it** (e.g. `9d332e26 "feat: update MIGRATION"`
changed `DEVELOPMENT` → `QA` and touched only this file; `3ae9faaf "bug #72050 add validate formate"` changed
`PRODUCTION` → `QA`). Before assuming which API the build talks to, run
`git log -p -- composeApp/src/commonMain/kotlin/com/onoff/tiendabot/domain/util/EndPoints.kt`. Never commit a flip
as a side effect of an unrelated change.

## Layout / architecture

- `composeApp/src/commonMain/kotlin/com/onoff/tiendabot/`
    - `presentation/` — Compose UI. Screens live in `screens/<feature>/`; ViewModels are **colocated with their
      screen**, not in `presentation/viewmodel` (that folder only holds interfaces). Navigation is Voyager with a
      central `presentation/screens/routes/Routes.kt`.
    - `domain/` — repository interfaces, `usecase/`, `util/` (`StringProvider`, `InternetChecker`, `Constants.kt`).
    - `data/` — Room (`data/local/database`), Ktor services (`data/remote/services`), repository impls
      (`data/repositoryImpl`), and Koin DI (`data/di`).
- **DI (Koin):** module list is `data/di/AppModule.kt::appModuleApp()`; bindings are in `data/di/Koin.kt`
  (`serviceModule`, `useCasesModule`, `viewModelModule`, `ktorModule`, `dataBaseModule` = DAO registrations,
  `repositoryModule`). A missing registration fails at **runtime**, not compile time.
- **Entry points:** Android `MainActivity`/`AndroidApplication` (calls `initKoin`), Desktop
  `desktopMain/.../main.kt` (KCEF-based browser), Web `wasmJsMain/kotlin/com/onoff/main.kt`,
  iOS `iosMain/.../MainViewController.kt`.
- **Offline guard:** 6 repositories (`Products`, `CashSession`, `Payment`, `User`, `Login`, `TaskManager`) take an
  `InternetChecker` and early-return when offline. Tests must stub
  `mocker.every { internetChecker.isAvailable() } returns true` or the code never reaches your assertions.
- Platform-specific code uses `expect`/`actual` with `-Xexpect-actual-classes`;
  `kotlin.mpp.applyDefaultHierarchyTemplate=false`, so source sets are wired manually.
- `composeApp/src/main` is a stale Android `res`/`aidl` folder (its `aidl/` is empty); the real manifest is
  `src/androidMain/AndroidManifest.xml`. AIDL (`androidMain/aidl/.../IMoneyBox.aidl`) is enabled
  (`buildFeatures.aidl = true`) and `compile*KotlinAndroid` explicitly depends on `compileDebugAidl`.

## Room database migrations (miss one and the app crashes on upgrade)

Version = `CURRENT_ROOM_DB_VERSION` (**8**) in `domain/util/Constants.kt`. To bump it:

1. Add SQL constants to `data/local/database/migration/SqlMigrations.kt`.
2. Add `MIGRATION_n_n+1` to `data/local/database/migration/MigrationTiendaBot.kt`.
3. Register it with `.addMigrations(...)` in **all three** factories:
   `UserDatabaseFactory.android.kt`, `UserDatabaseFactory.desktop.kt`, `UserDatabaseFactory.js.kt` (wasmJs).
   As of this writing Android and Desktop have 7 registrations each and wasmJs has 6 —
   **`UserDatabaseFactory.js.kt` is missing `MIGRATION_5_6`**. Check all three, every time.
4. Migration tests belong in `composeApp/src/desktopTest/.../migration/` (they need a real SQLite via
   `BundledSQLiteDriver`; `commonTest` cannot run them).
5. **Do not expect a schema JSON.** `exportSchema = false` on `UserDatabase`, and no `7.json`/`8.json` exists —
   `composeApp/schemas/` only holds `1.json`–`6.json` (only `1.json` is tracked, `2`–`6` are untracked leftovers).

## Testing conventions

- kotlin-test + JUnit, **MockMp** (`TestsWithMocks` base class, `@Mock` fields, `mocker.mock()` in `setUpMocks()`,
  `mocker.every { … } returns …`, `mocker.everySuspending { … }`, `mocker.reset()`), Turbine for flows, Ktor
  `MockEngine` helpers in `commonTest/kotlin/util/` (`createMockHttpClient`, `ResponseServicesMock`, `TestRes`, `Dummy`).
- Naming: `method_condition_expectedResult` (e.g. `deletePriceList_whenOffline_returnsError`), body in `runTest { }`.
  15 test files total: 14 in `commonTest`, 1 in `desktopTest`.
- wasmJs/browser test tasks (`BrowserTest`, `wasmJsTest`, `kotlinWasmNpmInstall`) are **disabled** in
  `composeApp/build.gradle.kts`, as are `TestKotlinIos` tasks on macOS. `desktopTest` is the real suite.
- Android tests need an emulator only for `connectedAndroidTest`; unit tests do not.

## Strings / localization

Resources in `composeApp/src/commonMain/composeResources/values{,-en,-pt}/string.xml` (base 1030, en 1029,
pt 1021 keys). **Add every new key to all three files** — used as `stringResource(Res.string.x)` in composables;
outside composables use `StringProvider`, or `org.jetbrains.compose.resources.getString(...)` in a coroutine.

## Versioning

`appVersion = "2.1.0"` and `appVersionCode = 13` at the top of `composeApp/build.gradle.kts` are the single
source of truth (Android `versionName`/`versionCode`, desktop package version). After changing, run
`./gradlew :composeApp:updateiOSVersion` to sync `iosApp/iosApp/Info.plist`.

## CI (Azure DevOps) & release flow

- Four pipelines: `azure-pipelines.yml` (Android build/test/Sonar/Snyk on self-hosted agent
  `tienda-bot`), `azure-pipelines-web.yml` (wasm dist → Azure Static Web Apps, per-branch stages),
  `azure-pipelines-win-exe.yml` and `azure-pipelines.win-msi.yml` (Windows installers, WiX on `windows-latest`).
- Triggers: `main`, `release/*`, `develop`, `devsecops-test-*`. Feature branches merge into `develop`.
- Sonar project: key `OnOff-Solution_tienda-bot`, org `onoff-solutions`, quality gate waits on the build;
  Snyk fails the build at `high` severity.

## Gotchas

- **iOS is not buildable:** the `iosX64/iosArm64/iosSimulatorArm64` targets and `iosMain.dependencies` are
  commented out in `composeApp/build.gradle.kts`, while `iosApp/` Xcode project still expects
  `:composeApp:embedAndSignAppleFrameworkForXcode`. Don't assume iOS tasks exist.
- `key.properties` and `keys/*.jks` are committed to git, but **no `signingConfig` is wired** into any Gradle
  build file — release signing is not part of the Gradle build as configured.
- Dependency overrides in `composeApp/build.gradle.kts` (`configurations.all`): forced protobuf 3.25.5,
  Netty 4.1.124.Final, `io.grpc:grpc-netty` 1.75.0 → `grpc-netty-shaded` substitution. Leave them alone unless
  that's the actual task.
- Web target uses COOP/COEP headers (`composeApp/webpack.config.d/cors-headers.js`, `credentialless`) so the
  SQLite WASM worker gets cross-origin isolation; the wasm DB runs in a worker from `composeApp/sqlite-wasm-worker/`.
- Not to be committed: `composeApp/release/`, `kotlin-js-store/`, `composeApp/schemas/2..6.json` — all untracked
  and **not** gitignored. Already tracked junk: `composeApp/report.csv`, `composeApp/hs_err_pid39492.log` —
  don't add more of the same.
- `local.properties` (Android SDK path) and `key.properties` (keystore paths/passwords) are machine/secret-specific;
  `local.properties` is gitignored, `key.properties` is not.

## ADDITIONAL RULES

## 1. Models and reuse

- `*ScreenState` only in the ViewModel.
- Shared DTOs, models, mappers, and enums → `:server` (see rule 12).
- Never place network DTOs/models in `presentation/`.
- Before creating a DTO, search for an existing one with the same JSON structure.
- Reuse existing models, components, mappers, params, enums, and utilities before duplicating them.
- Use generic names for cross-cutting DTOs.
- Before creating components, search first in `presentation/screens/components/` and `{feature}/components/`.
- If an existing component only needs a small variation, parameterize it instead of duplicating it.

## 2. Parameters

If a function has more than **6 parameters**, group them into:

```text
data/params/{FunctionName}Params.kt
```

The function must receive a single `params` object. Only local `private data class` declarations may remain inside the composable file.

## 3. Koin / DI

Always register:

```text
Services       → factory<XServices> { XServicesImpl(get()) }
Repository     → single<XRepository> { XRepositoryImpl(...) }
UseCase        → factory { XUseCases(get()) }
ViewModel      → factory { XViewModel(get()) }
```

Keep `expect/actual` for platform APIs.

## 4. Navigation

Routes in `presentation/screens/routes/Routes.kt`.

```kotlin
val LOGIN_SCREEN = LoginScreen()
val MAIN_SCREEN: (LoggedUser) -> Screen = { MainScreen(it) }
```

For parameters, use a lambda, never `fun` as a route.

## 5. UI / Strings

- Strings must always use `stringResource(Res.string.xxx)`.
- Do not hardcode visible text.
- Use `composeResources` for `es/en/pt`.
- Reuse existing components.
- Do not create Material `Button`, `OutlinedButton`, or `TextButton` if a Design System component already exists.
- Icons → `composeResources/drawable/` as vector XML; reuse existing ones.
- Multicolor logos/icons → `tint = Color.Unspecified`.

## 6. Typography

Do not define the following directly in `Text`/text fields:

```text
fontSize, fontWeight, lineHeight, color, textAlign, textDecoration
```

Always use:

```kotlin
style = tiendaBotTextStyle(...)
```

Layout parameters (`modifier`, `maxLines`, `overflow`, etc.) remain in the composable.

## 7. Colors

- Do not use `Color(0x...)` directly in `presentation/`.
- Use `ColorApp.{token}` or `MaterialTheme.colorScheme`.
- Before creating a color, search for an existing one.
- New colors must be added to `ColorApp` with semantic names.

## 8. Dimensions

Reusable dimensions (`dp`/`sp`) must be placed in:

```text
presentation/theme/Variables.kt
```

Search for and reuse existing tokens before creating new ones.

Avoid file-level layout constants inside `presentation/`.

## 9. Code

- Do not add `//`, `/* */`, or KDoc comments unless a required `@Suppress` needs them.
- Do not leave commented `TODO`s or dead code.
- Keep functions small and responsibilities clear.
- Avoid overengineering and unnecessary abstractions.
- Avoid `if (condition) true else false`; use `condition` directly.
- Avoid `!!` when a safe alternative exists.
- Do not invent APIs, endpoints, methods, or components.
- Do not add dependencies if a solution already exists in the project.
- Do not change versions without a need.

## 10. Changes

Before modifying:

```text
Search → Understand → Reuse → Modify → Verify
```

Make the smallest necessary change. Do not modify unrelated files or refactor code outside the requested scope.

## 11. Backend ownership (`server`)

- `:server` is the **only** module allowed to own the backend: database access, connection/DSN configuration,
  credentials, ORM entities and migrations, HTTP clients to third-party APIs, and **DTOs** (request/response
  models). All of it lives under `server/src/main/kotlin/<package>/`.
- Never place database, connection, or DTO code in `:core`, `:app/shared`, or any other client module — the
  clients (Android, Desktop, Web, iOS) consume the server API and nothing else.
- **Reuse DTOs for new endpoints.** Before creating an endpoint or a model, search the existing ones
  (`server/src/main/kotlin/<package>/dto`, `.../model`) and reuse or extend them instead of adding a
  near-duplicate. A new DTO is justified only when the payload differs semantically; when the shape can stay
  backward compatible, add optional fields to the existing DTO.
- Keep DTOs free of persistence annotations: entities/tables live next to the DB layer, and mappers convert
  between entities and DTOs.

## 13. Checklist

Before delivering:

- [x] Architecture respected.
- [x] Existing code reused.
- [x] No duplication.
- [x] DTOs/models in the correct location.
- [x] DI registered.
- [x] Correct routes.
- [x] Internationalized strings.
- [x] Existing components reused.
- [x] Colors in `ColorApp`.
- [x] Dimensions in `Variables`.
- [x] Typography with `tiendaBotTextStyle`.
- [x] No unnecessary comments.
- [x] No unnecessary dependencies/versions.
- [x] Correct imports, types, and references.
- [x] DB, connections and DTOs only in `:server`; DTOs reused for new endpoints.
- [x] Build/tests verified when possible.

**Main rule: understand the project first, reuse before creating, and make the smallest necessary change.**