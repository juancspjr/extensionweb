# Script de Diagnóstico para Extensión Chrome - WebScraping Intelligence Suite

## Instrucciones de Uso:

1. **Abrir DevTools en la Extensión:**
   - Haz clic derecho en el ícono de la extensión
   - Selecciona "Inspeccionar ventana emergente"
   - O ve a `chrome://extensions/`, activa "Modo desarrollador", encuentra tu extensión y haz clic en "Inspeccionar vistas: popup.html"

2. **Ejecutar Scripts en Console:**
   - Copia y pega los scripts de diagnóstico en la consola
   - Ejecuta cada uno por separado para diagnosticar diferentes aspectos

## Scripts de Diagnóstico:

### 1. Test de Inicialización Básica
```javascript
console.log("=== TEST 1: INICIALIZACIÓN BÁSICA ===");
console.log("1. Estado del DOM:", document.readyState);
console.log("2. Popup HTML cargado:", !!document.querySelector('#app'));
console.log("3. Scripts cargados:", {
    popup_js: typeof EnterprisePopupApplication !== 'undefined',
    state_manager: typeof EnterpriseStateManager !== 'undefined',
    ui_components: typeof UIComponentsManager !== 'undefined',
    background_communicator: typeof BackgroundCommunicator !== 'undefined'
});
console.log("4. Chrome APIs:", {
    runtime: typeof chrome !== 'undefined' && !!chrome.runtime,
    tabs: typeof chrome !== 'undefined' && !!chrome.tabs,
    storage: typeof chrome !== 'undefined' && !!chrome.storage
});
console.log("5. Enterprise App Instance:", !!window.enterprisePopupApp);
```

### 2. Test de Conexión con Background
```javascript
console.log("=== TEST 2: CONEXIÓN CON BACKGROUND ===");
// Test directo de mensaje
chrome.runtime.sendMessage({action: 'ping', timestamp: Date.now()}, (response) => {
    if (chrome.runtime.lastError) {
        console.error("Error de conexión:", chrome.runtime.lastError.message);
    } else {
        console.log("Respuesta del background:", response);
    }
});

// Test de estado del service worker
chrome.runtime.getBackgroundPage((backgroundPage) => {
    if (chrome.runtime.lastError) {
        console.error("Background page error:", chrome.runtime.lastError.message);
    } else {
        console.log("Background page disponible:", !!backgroundPage);
    }
});
```

### 3. Test de Carga de Recursos
```javascript
console.log("=== TEST 3: CARGA DE RECURSOS ===");
console.log("CSS cargado:", {
    stylesheets: document.styleSheets.length,
    computed_styles: !!getComputedStyle(document.body)
});
console.log("JavaScript errors:", {
    error_count: window.errorCount || 0,
    last_error: window.lastError || 'none'
});
console.log("Elementos principales:", {
    app_container: !!document.querySelector('#app'),
    tabs: document.querySelectorAll('[data-tab]').length,
    buttons: document.querySelectorAll('button').length,
    inputs: document.querySelectorAll('input').length
});
```

### 4. Test de Estado de la Aplicación
```javascript
console.log("=== TEST 4: ESTADO DE LA APLICACIÓN ===");
if (window.enterprisePopupApp) {
    console.log("App inicializada:", window.enterprisePopupApp.isInitialized);
    console.log("Diagnostic info:", window.enterprisePopupApp.getDiagnosticInfo());
    if (window.enterprisePopupApp.stateManager) {
        console.log("State Manager estado:", window.enterprisePopupApp.stateManager.getDebugInfo());
    }
    if (window.enterprisePopupApp.communicator) {
        console.log("Communicator estado:", window.enterprisePopupApp.communicator.getDiagnosticInfo());
    }
} else {
    console.error("EnterprisePopupApp no está disponible");
}
```

### 5. Test de Errores en Console
```javascript
console.log("=== TEST 5: MONITOREO DE ERRORES ===");
// Configurar listener de errores
window.addEventListener('error', (event) => {
    console.error('Error detectado:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rejection no manejada:', event.reason);
});

console.log("Listeners de error configurados. Recarga la extensión y observa errores.");
```

### 6. Test de Manifest y Permisos
```javascript
console.log("=== TEST 6: MANIFEST Y PERMISOS ===");
// Verificar permisos
chrome.permissions.getAll((permissions) => {
    console.log("Permisos actuales:", permissions);
});

// Verificar manifest
console.log("Manifest info:", {
    id: chrome.runtime.id,
    version: chrome.runtime.getManifest().version,
    name: chrome.runtime.getManifest().name
});
```

### 7. Test de Reinicialización Manual
```javascript
console.log("=== TEST 7: REINICIALIZACIÓN MANUAL ===");
// Limpiar instancia existente
if (window.enterprisePopupApp) {
    try {
        window.enterprisePopupApp.cleanup();
        console.log("App limpiada exitosamente");
    } catch (error) {
        console.error("Error limpiando app:", error);
    }
}

// Crear nueva instancia
setTimeout(() => {
    try {
        console.log("Creando nueva instancia...");
        window.enterprisePopupApp = new EnterprisePopupApplication();
        window.enterprisePopupApp.initialize().then(() => {
            console.log("Reinicialización exitosa");
        }).catch((error) => {
            console.error("Error en reinicialización:", error);
        });
    } catch (error) {
        console.error("Error creando instancia:", error);
    }
}, 1000);
```

## Solución de Problemas Comunes:

### Si el popup no se carga:
1. Verificar en `chrome://extensions/` que la extensión está habilitada
2. Revisar errores en el service worker (background.js)
3. Comprobar que popup.html existe y es accesible

### Si hay errores de comunicación:
1. Verificar que background.js se ejecuta correctamente
2. Revisar permisos en manifest.json
3. Comprobar que los message handlers están configurados

### Si falta funcionalidad:
1. Verificar que todos los archivos JS se cargan
2. Revisar orden de carga en popup.html
3. Comprobar dependencias entre componentes

## Logs Importantes a Buscar:

- `ENTERPRISE POPUP Initializing Application`
- `STATE MANAGER Initialized`
- `UI COMPONENTS Initialized`
- `BACKGROUND COMMUNICATOR Initialized`
- Cualquier error que contenga `CRITICAL`, `ERROR`, o `Failed`

## Archivos a Verificar:

1. **manifest.json** - Configuración y permisos
2. **popup.html** - Estructura del popup
3. **popup.js** - Lógica principal del popup
4. **background.js** - Service worker
5. **content.js** - Script de contenido (si es necesario)

Ejecuta estos tests secuencialmente y reporta los resultados para diagnosticar el problema específico.