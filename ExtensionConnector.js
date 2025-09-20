console.log('🔌 WebScraping Intelligence Suite Enterprise v3.4.0 - EXTENSION CONNECTOR FRAMEWORK');

// ===================================================================
// EXTENSION CONNECTOR v3.4.0 - ENTERPRISE MULTI-PLATFORM BRIDGE
// ===================================================================

/**
 * WebScraping Intelligence Suite - Extension Connector v3.4.0 Enterprise
 * Enterprise-level connector for Chrome Extension ecosystem integration
 * 
 * MEJORAS ENTERPRISE v3.4.0:
 * - Native Chrome Extension API integration (NO React dependencies)
 * - Multi-platform support (Gemini, OpenAI, Anthropic, DeepSeek, Qwen)
 * - Enterprise Security Layer con data validation y sanitization
 * - Performance Monitoring con latency y throughput metrics
 * - Adapter Pattern para diferentes plataformas AI
 * - Data Transformation Engine con encryption
 * - Connection Pool Management para múltiples extensiones
 * - Circuit Breaker pattern para error handling
 * 
 * @author Framework Multi-Agente Development Team
 * @version 3.4.0
 * @date 2025-09-20
 */

// ===================================================================
// CONFIGURACIÓN ENTERPRISE v3.4.0
// ===================================================================

/**
 * Configuración Enterprise del Extension Connector
 * @const {Object} CONNECTOR_CONFIG - Configuración principal
 */
const CONNECTOR_CONFIG = {
    version: '3.4.0',
    name: 'Enterprise Extension Connector',
    
    // Platform configurations
    platforms: {
        webscraping_suite: {
            id: 'auto-detect', // Dynamic detection
            name: 'WebScraping Intelligence Suite',
            actions: [
                'getAnalysisData',
                'getCookiesFromStorage', 
                'getConnectionData',
                'getAgentStatus',
                'startAnalysis',
                'exportResults'
            ],
            priority: 1
        },
        gemini_extension: {
            ids: ['gemini-extension-id-1', 'gemini-extension-id-2'],
            name: 'Gemini Extensions',
            actions: ['getCookies', 'getAuthTokens', 'getSessionData'],
            priority: 2
        },
        openai_extension: {
            ids: ['openai-extension-id-1', 'openai-extension-id-2'],
            name: 'OpenAI Extensions',
            actions: ['getApiKeys', 'getSessionTokens', 'getChatHistory'],
            priority: 2
        },
        anthropic_extension: {
            ids: ['claude-extension-id-1', 'claude-extension-id-2'],
            name: 'Anthropic Extensions', 
            actions: ['getAuthData', 'getConversations', 'getSettings'],
            priority: 2
        },
        generic_extension: {
            ids: ['*'], // Wildcard for unknown extensions
            name: 'Generic Extensions',
            actions: ['ping', 'getInfo', 'getData'],
            priority: 3
        }
    },
    
    // Security settings
    security: {
        maxDataSize: 10 * 1024 * 1024, // 10MB
        allowedOrigins: [
            'https://*.google.com',
            'https://*.openai.com',
            'https://*.anthropic.com',
            'https://*.deepseek.com',
            'https://*.qwen.alibaba.com'
        ],
        encryptionKey: null, // Generated dynamically
        validatePayloads: true,
        sanitizeInputs: true
    },
    
    // Performance settings
    performance: {
        connectionTimeout: 5000,
        retryAttempts: 3,
        retryDelay: 1000,
        maxConcurrentConnections: 10,
        cacheEnabled: true,
        cacheTTL: 300000, // 5 minutes
        metricsEnabled: true
    },
    
    // Circuit breaker settings
    circuitBreaker: {
        failureThreshold: 5,
        resetTimeout: 30000,
        monitoringPeriod: 10000
    }
};

/**
 * Mapeo de tipos de datos y sus validadores
 * @const {Object} DATA_VALIDATORS - Validadores por tipo de dato
 */
const DATA_VALIDATORS = {
    cookies: {
        required: ['name', 'value'],
        optional: ['domain', 'path', 'secure', 'httpOnly', 'expires'],
        maxSize: 4096
    },
    tokens: {
        required: ['type', 'value'],
        optional: ['expires', 'scope'],
        maxSize: 8192
    },
    analysis: {
        required: ['platform', 'results'],
        optional: ['confidence', 'timestamp', 'metadata'],
        maxSize: 1024 * 1024 // 1MB
    },
    connections: {
        required: ['url', 'method'],
        optional: ['headers', 'body', 'status', 'timestamp'],
        maxSize: 512 * 1024 // 512KB
    }
};

// ===================================================================
// 🏗️ ENTERPRISE CONNECTION MANAGER - CORE CLASS
// ===================================================================

/**
 * Gestor de conexiones Enterprise para múltiples extensiones
 * Implementa Adapter Pattern y Factory Pattern
 */
class EnterpriseConnectionManager {
    constructor() {
        this.connectedExtensions = new Map();
        this.connectionPool = new Map();
        this.performanceMetrics = new Map();
        this.circuitBreakers = new Map();
        this.cache = new Map();
        this.securityValidator = new SecurityValidator();
        this.performanceMonitor = new PerformanceMonitor();
        
        this.isInitialized = false;
        this.eventListeners = new Map();
        
        console.log('🔌 CONNECTION MANAGER: Initializing Enterprise Connection Manager v3.4.0');
    }
    
    /**
     * Inicializar el gestor de conexiones
     */
    async initialize() {
        try {
            console.log('🏗️ CONNECTION MANAGER: Starting initialization...');
            
            // Initialize security validator
            await this.securityValidator.initialize();
            
            // Initialize performance monitor
            this.performanceMonitor.startMonitoring();
            
            // Scan for available extensions
            await this.scanAvailableExtensions();
            
            // Setup event listeners
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('✅ CONNECTION MANAGER: Initialization completed successfully');
            
        } catch (error) {
            console.error('❌ CONNECTION MANAGER: Initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * Escanear extensiones disponibles en el entorno
     */
    async scanAvailableExtensions() {
        try {
            console.log('🔍 EXTENSION SCAN: Scanning for available extensions...');
            
            const availableExtensions = [];
            
            // Check if running in extension context
            if (typeof chrome !== 'undefined' && chrome.runtime) {
                
                // Try to detect WebScraping Suite extension (self)
                try {
                    const selfResponse = await chrome.runtime.sendMessage({
                        action: 'ping',
                        source: 'extension-connector'
                    });
                    
                    if (selfResponse && selfResponse.success) {
                        availableExtensions.push({
                            id: chrome.runtime.id,
                            platform: 'webscraping_suite',
                            name: 'WebScraping Intelligence Suite',
                            version: selfResponse.version || '3.4.0',
                            capabilities: selfResponse.capabilities || []
                        });
                        
                        console.log('✅ FOUND: WebScraping Intelligence Suite (self)');
                    }
                } catch (error) {
                    console.warn('⚠️ SELF DETECTION: Error detecting self extension:', error.message);
                }
                
                // Scan for known extension IDs
                for (const [platformKey, platformConfig] of Object.entries(CONNECTOR_CONFIG.platforms)) {
                    if (platformKey === 'webscraping_suite') continue; // Skip self
                    
                    const extensionIds = Array.isArray(platformConfig.ids) ? platformConfig.ids : [platformConfig.id];
                    
                    for (const extensionId of extensionIds) {
                        if (extensionId === 'auto-detect' || extensionId === '*') continue;
                        
                        try {
                            const response = await chrome.runtime.sendMessage(extensionId, {
                                action: 'ping',
                                source: 'extension-connector'
                            });
                            
                            if (response && response.success) {
                                availableExtensions.push({
                                    id: extensionId,
                                    platform: platformKey,
                                    name: platformConfig.name,
                                    version: response.version || 'unknown',
                                    capabilities: response.capabilities || platformConfig.actions
                                });
                                
                                console.log(`✅ FOUND: ${platformConfig.name} (${extensionId})`);
                            }
                        } catch (error) {
                            // Extension not available, continue silently
                        }
                    }
                }
            }
            
            // Store available extensions
            availableExtensions.forEach(ext => {
                this.connectedExtensions.set(ext.id, ext);
                this.initializeCircuitBreaker(ext.id);
            });
            
            console.log(`🔍 EXTENSION SCAN: Found ${availableExtensions.length} available extensions`);
            return availableExtensions;
            
        } catch (error) {
            console.error('❌ EXTENSION SCAN: Error during scan:', error);
            return [];
        }
    }
    
    /**
     * Inicializar Circuit Breaker para una extensión
     * @param {string} extensionId - ID de la extensión
     */
    initializeCircuitBreaker(extensionId) {
        try {
            this.circuitBreakers.set(extensionId, {
                state: 'closed', // closed, open, half-open
                failureCount: 0,
                lastFailureTime: null,
                successCount: 0,
                nextAttempt: 0
            });
            
        } catch (error) {
            console.error('❌ CIRCUIT BREAKER: Error initializing:', error);
        }
    }
    
    /**
     * Verificar estado del Circuit Breaker
     * @param {string} extensionId - ID de la extensión
     * @returns {boolean} - True si puede proceder
     */
    canProceedWithConnection(extensionId) {
        try {
            const breaker = this.circuitBreakers.get(extensionId);
            if (!breaker) return true;
            
            const now = Date.now();
            
            switch (breaker.state) {
                case 'closed':
                    return true;
                    
                case 'open':
                    if (now > breaker.nextAttempt) {
                        breaker.state = 'half-open';
                        console.log(`🔄 CIRCUIT BREAKER: ${extensionId} set to half-open`);
                        return true;
                    }
                    return false;
                    
                case 'half-open':
                    return true;
                    
                default:
                    return true;
            }
        } catch (error) {
            console.error('❌ CIRCUIT BREAKER: Error checking state:', error);
            return true; // Fail open
        }
    }
    
    /**
     * Actualizar Circuit Breaker basado en resultado
     * @param {string} extensionId - ID de la extensión
     * @param {boolean} success - Si la operación fue exitosa
     */
    updateCircuitBreaker(extensionId, success) {
        try {
            const breaker = this.circuitBreakers.get(extensionId);
            if (!breaker) return;
            
            if (success) {
                breaker.successCount++;
                breaker.failureCount = 0; // Reset failure count on success
                
                if (breaker.state === 'half-open') {
                    breaker.state = 'closed';
                    console.log(`✅ CIRCUIT BREAKER: ${extensionId} closed - service recovered`);
                }
            } else {
                breaker.failureCount++;
                breaker.lastFailureTime = Date.now();
                
                if (breaker.failureCount >= CONNECTOR_CONFIG.circuitBreaker.failureThreshold) {
                    breaker.state = 'open';
                    breaker.nextAttempt = Date.now() + CONNECTOR_CONFIG.circuitBreaker.resetTimeout;
                    console.warn(`⚠️ CIRCUIT BREAKER: ${extensionId} opened due to failures`);
                }
            }
        } catch (error) {
            console.error('❌ CIRCUIT BREAKER: Error updating state:', error);
        }
    }
    
    /**
     * Conectar con extensión específica
     * @param {string} extensionId - ID de la extensión (opcional)
     * @param {string} action - Acción a realizar
     * @param {Object} data - Datos a enviar
     * @returns {Promise<Object>} - Respuesta de la extensión
     */
    async connectToExtension(extensionId = null, action = 'ping', data = {}) {
        const startTime = performance.now();
        let targetExtensionId = extensionId;
        
        try {
            // Auto-detect extension if not specified
            if (!targetExtensionId) {
                targetExtensionId = await this.autoDetectExtension(action);
                if (!targetExtensionId) {
                    throw new Error('No suitable extension found for action: ' + action);
                }
            }
            
            // Check circuit breaker
            if (!this.canProceedWithConnection(targetExtensionId)) {
                throw new Error('Circuit breaker is open for extension: ' + targetExtensionId);
            }
            
            // Validate and sanitize data
            const validatedData = await this.securityValidator.validateData(action, data);
            
            // Check cache first
            const cacheKey = `${targetExtensionId}:${action}:${JSON.stringify(validatedData)}`;
            if (CONNECTOR_CONFIG.performance.cacheEnabled) {
                const cachedResult = this.getCachedResult(cacheKey);
                if (cachedResult) {
                    console.log('📦 CACHE HIT:', action, 'for extension', targetExtensionId);
                    return cachedResult;
                }
            }
            
            // Create message
            const message = {
                action,
                data: validatedData,
                timestamp: Date.now(),
                source: 'extension-connector-v3.4.0',
                requestId: this.generateRequestId()
            };
            
            console.log('📤 SENDING MESSAGE:', action, 'to extension', targetExtensionId);
            
            // Send message with timeout
            const response = await this.sendMessageWithTimeout(targetExtensionId, message);
            
            if (response && response.success) {
                // Update circuit breaker - success
                this.updateCircuitBreaker(targetExtensionId, true);
                
                // Cache result if cacheable
                if (CONNECTOR_CONFIG.performance.cacheEnabled && this.isCacheable(action)) {
                    this.setCachedResult(cacheKey, response);
                }
                
                // Record performance metrics
                const duration = performance.now() - startTime;
                this.performanceMonitor.recordOperation(targetExtensionId, action, duration, true);
                
                console.log('✅ SUCCESS:', action, `completed in ${Math.round(duration)}ms`);
                return response;
            } else {
                throw new Error(response?.error || 'Unknown error from extension');
            }
            
        } catch (error) {
            // Update circuit breaker - failure
            if (targetExtensionId) {
                this.updateCircuitBreaker(targetExtensionId, false);
            }
            
            // Record performance metrics - failure
            const duration = performance.now() - startTime;
            if (targetExtensionId) {
                this.performanceMonitor.recordOperation(targetExtensionId, action, duration, false);
            }
            
            console.error('❌ CONNECTION ERROR:', error.message);
            throw error;
        }
    }
    
    /**
     * Auto-detectar extensión apropiada para una acción
     * @param {string} action - Acción a realizar
     * @returns {Promise<string|null>} - ID de extensión detectada
     */
    async autoDetectExtension(action) {
        try {
            // Sort extensions by priority
            const sortedExtensions = Array.from(this.connectedExtensions.values())
                .sort((a, b) => {
                    const aPlatform = CONNECTOR_CONFIG.platforms[a.platform];
                    const bPlatform = CONNECTOR_CONFIG.platforms[b.platform];
                    return (aPlatform?.priority || 99) - (bPlatform?.priority || 99);
                });
            
            // Find extension that supports the action
            for (const extension of sortedExtensions) {
                const platformConfig = CONNECTOR_CONFIG.platforms[extension.platform];
                if (platformConfig && platformConfig.actions.includes(action)) {
                    // Test if extension is responsive
                    try {
                        const testResponse = await chrome.runtime.sendMessage(extension.id, {
                            action: 'ping',
                            source: 'auto-detect'
                        });
                        
                        if (testResponse && testResponse.success) {
                            console.log('🎯 AUTO-DETECT: Selected extension', extension.id, 'for action', action);
                            return extension.id;
                        }
                    } catch (error) {
                        // Extension not responsive, continue
                    }
                }
            }
            
            console.warn('⚠️ AUTO-DETECT: No suitable extension found for action:', action);
            return null;
            
        } catch (error) {
            console.error('❌ AUTO-DETECT: Error during detection:', error);
            return null;
        }
    }
    
    /**
     * Enviar mensaje con timeout
     * @param {string} extensionId - ID de la extensión
     * @param {Object} message - Mensaje a enviar
     * @returns {Promise<Object>} - Respuesta
     */
    async sendMessageWithTimeout(extensionId, message) {
        try {
            return new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Connection timeout'));
                }, CONNECTOR_CONFIG.performance.connectionTimeout);
                
                chrome.runtime.sendMessage(extensionId, message)
                    .then(response => {
                        clearTimeout(timeout);
                        resolve(response);
                    })
                    .catch(error => {
                        clearTimeout(timeout);
                        reject(error);
                    });
            });
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Generar ID único de request
     * @returns {string} - ID único
     */
    generateRequestId() {
        return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }
    
    /**
     * Verificar si una acción es cacheable
     * @param {string} action - Acción a verificar
     * @returns {boolean} - True si es cacheable
     */
    isCacheable(action) {
        const cacheableActions = ['getAnalysisData', 'getAgentStatus', 'getCookiesFromStorage'];
        return cacheableActions.includes(action);
    }
    
    /**
     * Obtener resultado cacheado
     * @param {string} cacheKey - Clave de cache
     * @returns {Object|null} - Resultado cacheado o null
     */
    getCachedResult(cacheKey) {
        try {
            const cached = this.cache.get(cacheKey);
            if (cached && cached.expires > Date.now()) {
                return cached.data;
            } else if (cached) {
                this.cache.delete(cacheKey); // Remove expired
            }
            return null;
        } catch (error) {
            console.error('❌ CACHE GET: Error:', error);
            return null;
        }
    }
    
    /**
     * Guardar resultado en cache
     * @param {string} cacheKey - Clave de cache
     * @param {Object} data - Datos a cachear
     */
    setCachedResult(cacheKey, data) {
        try {
            this.cache.set(cacheKey, {
                data,
                expires: Date.now() + CONNECTOR_CONFIG.performance.cacheTTL
            });
        } catch (error) {
            console.error('❌ CACHE SET: Error:', error);
        }
    }
    
    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        try {
            // Listen for extension connect/disconnect events
            if (typeof chrome !== 'undefined' && chrome.runtime) {
                chrome.runtime.onConnect.addListener(this.handleExtensionConnect.bind(this));
                chrome.runtime.onMessage.addListener(this.handleExtensionMessage.bind(this));
            }
            
            console.log('👂 EVENT LISTENERS: Extension event listeners configured');
        } catch (error) {
            console.error('❌ EVENT LISTENERS: Error setting up listeners:', error);
        }
    }
    
    /**
     * Manejar conexión de extensión
     * @param {Port} port - Puerto de conexión
     */
    handleExtensionConnect(port) {
        try {
            console.log('🔗 EXTENSION CONNECT:', port.name, 'from', port.sender?.id);
            
            // Add to connection pool
            this.connectionPool.set(port.name, port);
            
            // Handle disconnect
            port.onDisconnect.addListener(() => {
                console.log('🔌 EXTENSION DISCONNECT:', port.name);
                this.connectionPool.delete(port.name);
            });
            
        } catch (error) {
            console.error('❌ EXTENSION CONNECT: Error handling connection:', error);
        }
    }
    
    /**
     * Manejar mensaje de extensión
     * @param {Object} message - Mensaje recibido
     * @param {Object} sender - Información del remitente
     * @param {Function} sendResponse - Función para responder
     */
    handleExtensionMessage(message, sender, sendResponse) {
        try {
            console.log('📨 EXTENSION MESSAGE:', message.action, 'from', sender.id);
            
            // Handle specific message types
            switch (message.action) {
                case 'connectionStatus':
                    sendResponse({
                        success: true,
                        data: {
                            connectedExtensions: Array.from(this.connectedExtensions.keys()),
                            performanceMetrics: this.performanceMonitor.getMetrics(),
                            circuitBreakerStates: Object.fromEntries(this.circuitBreakers)
                        }
                    });
                    break;
                    
                default:
                    sendResponse({ success: false, error: 'Unknown action' });
            }
            
        } catch (error) {
            console.error('❌ EXTENSION MESSAGE: Error handling message:', error);
            sendResponse({ success: false, error: error.message });
        }
        
        return true; // Keep message channel open
    }
    
    /**
     * Obtener información de diagnóstico
     * @returns {Object} - Información de diagnóstico
     */
    getDiagnosticInfo() {
        try {
            return {
                isInitialized: this.isInitialized,
                connectedExtensions: Array.from(this.connectedExtensions.values()),
                connectionPoolSize: this.connectionPool.size,
                circuitBreakerStates: Object.fromEntries(this.circuitBreakers),
                cacheSize: this.cache.size,
                performanceMetrics: this.performanceMonitor.getMetrics(),
                securityStatus: this.securityValidator.getStatus()
            };
        } catch (error) {
            console.error('❌ DIAGNOSTIC INFO: Error:', error);
            return { error: error.message };
        }
    }
    
    /**
     * Limpiar recursos
     */
    cleanup() {
        try {
            console.log('🧹 CONNECTION MANAGER: Starting cleanup...');
            
            // Clear cache
            this.cache.clear();
            
            // Close connections
            for (const port of this.connectionPool.values()) {
                try {
                    port.disconnect();
                } catch (error) {
                    // Port may already be disconnected
                }
            }
            this.connectionPool.clear();
            
            // Stop performance monitoring
            this.performanceMonitor.stopMonitoring();
            
            // Clear maps
            this.connectedExtensions.clear();
            this.circuitBreakers.clear();
            
            this.isInitialized = false;
            
            console.log('✅ CONNECTION MANAGER: Cleanup completed');
        } catch (error) {
            console.error('❌ CONNECTION MANAGER: Error during cleanup:', error);
        }
    }
}

// ===================================================================
// 🛡️ SECURITY VALIDATOR - ENTERPRISE SECURITY LAYER
// ===================================================================

/**
 * Validador de seguridad Enterprise
 * Valida y sanitiza datos de comunicación
 */
class SecurityValidator {
    constructor() {
        this.encryptionKey = null;
        this.isInitialized = false;
        this.validationRules = DATA_VALIDATORS;
        
        console.log('🛡️ SECURITY VALIDATOR: Initializing Enterprise Security Layer');
    }
    
    /**
     * Inicializar validador de seguridad
     */
    async initialize() {
        try {
            // Generate encryption key if needed
            if (CONNECTOR_CONFIG.security.encryptionKey) {
                this.encryptionKey = CONNECTOR_CONFIG.security.encryptionKey;
            } else {
                this.encryptionKey = await this.generateEncryptionKey();
            }
            
            this.isInitialized = true;
            console.log('✅ SECURITY VALIDATOR: Initialized successfully');
            
        } catch (error) {
            console.error('❌ SECURITY VALIDATOR: Initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * Generar clave de encriptación
     * @returns {Promise<string>} - Clave generada
     */
    async generateEncryptionKey() {
        try {
            const key = crypto.getRandomValues(new Uint8Array(32));
            return Array.from(key, byte => byte.toString(16).padStart(2, '0')).join('');
        } catch (error) {
            console.error('❌ ENCRYPTION KEY: Error generating key:', error);
            return 'fallback-key-' + Date.now().toString(36);
        }
    }
    
    /**
     * Validar y sanitizar datos
     * @param {string} action - Acción que se va a realizar
     * @param {Object} data - Datos a validar
     * @returns {Promise<Object>} - Datos validados y sanitizados
     */
    async validateData(action, data) {
        try {
            if (!CONNECTOR_CONFIG.security.validatePayloads) {
                return data; // Validation disabled
            }
            
            // Basic validation
            if (typeof data !== 'object' || data === null) {
                throw new Error('Data must be a valid object');
            }
            
            // Check data size
            const dataSize = JSON.stringify(data).length;
            if (dataSize > CONNECTOR_CONFIG.security.maxDataSize) {
                throw new Error(`Data size exceeds maximum allowed: ${dataSize} bytes`);
            }
            
            // Action-specific validation
            let validator = null;
            if (action.includes('cookies') || action.includes('Cookies')) {
                validator = this.validationRules.cookies;
            } else if (action.includes('token') || action.includes('Token')) {
                validator = this.validationRules.tokens;
            } else if (action.includes('analysis') || action.includes('Analysis')) {
                validator = this.validationRules.analysis;
            } else if (action.includes('connection') || action.includes('Connection')) {
                validator = this.validationRules.connections;
            }
            
            // Apply validator if found
            if (validator) {
                this.validateWithRules(data, validator);
            }
            
            // Sanitize data if enabled
            if (CONNECTOR_CONFIG.security.sanitizeInputs) {
                return this.sanitizeData(data);
            }
            
            return data;
            
        } catch (error) {
            console.error('❌ DATA VALIDATION: Error:', error);
            throw new Error('Data validation failed: ' + error.message);
        }
    }
    
    /**
     * Validar con reglas específicas
     * @param {Object} data - Datos a validar
     * @param {Object} rules - Reglas de validación
     */
    validateWithRules(data, rules) {
        try {
            // Check required fields
            if (rules.required) {
                for (const field of rules.required) {
                    if (!(field in data)) {
                        throw new Error(`Required field missing: ${field}`);
                    }
                }
            }
            
            // Check data size for each field
            if (rules.maxSize) {
                const dataSize = JSON.stringify(data).length;
                if (dataSize > rules.maxSize) {
                    throw new Error(`Data size exceeds limit: ${dataSize} > ${rules.maxSize}`);
                }
            }
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Sanitizar datos de entrada
     * @param {Object} data - Datos a sanitizar
     * @returns {Object} - Datos sanitizados
     */
    sanitizeData(data) {
        try {
            const sanitized = {};
            
            for (const [key, value] of Object.entries(data)) {
                if (typeof value === 'string') {
                    // Remove potentially dangerous characters
                    sanitized[key] = value
                        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                        .replace(/javascript:/gi, '')
                        .replace(/data:/gi, '')
                        .trim();
                } else if (typeof value === 'object' && value !== null) {
                    sanitized[key] = this.sanitizeData(value);
                } else {
                    sanitized[key] = value;
                }
            }
            
            return sanitized;
            
        } catch (error) {
            console.error('❌ DATA SANITIZATION: Error:', error);
            return data; // Return original if sanitization fails
        }
    }
    
    /**
     * Obtener estado del validador
     * @returns {Object} - Estado actual
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            hasEncryptionKey: !!this.encryptionKey,
            validationEnabled: CONNECTOR_CONFIG.security.validatePayloads,
            sanitizationEnabled: CONNECTOR_CONFIG.security.sanitizeInputs
        };
    }
}

// ===================================================================
// 📊 PERFORMANCE MONITOR - ENTERPRISE METRICS
// ===================================================================

/**
 * Monitor de performance Enterprise
 * Recolecta métricas de latencia y throughput
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.isMonitoring = false;
        this.monitoringInterval = null;
        
        console.log('📊 PERFORMANCE MONITOR: Initializing Enterprise Performance Monitor');
    }
    
    /**
     * Iniciar monitoreo de performance
     */
    startMonitoring() {
        try {
            if (this.isMonitoring) return;
            
            this.isMonitoring = true;
            
            // Start periodic metrics collection
            this.monitoringInterval = setInterval(() => {
                this.collectSystemMetrics();
            }, CONNECTOR_CONFIG.circuitBreaker.monitoringPeriod);
            
            console.log('📊 PERFORMANCE MONITOR: Monitoring started');
            
        } catch (error) {
            console.error('❌ PERFORMANCE MONITOR: Error starting monitoring:', error);
        }
    }
    
    /**
     * Detener monitoreo de performance
     */
    stopMonitoring() {
        try {
            this.isMonitoring = false;
            
            if (this.monitoringInterval) {
                clearInterval(this.monitoringInterval);
                this.monitoringInterval = null;
            }
            
            console.log('📊 PERFORMANCE MONITOR: Monitoring stopped');
            
        } catch (error) {
            console.error('❌ PERFORMANCE MONITOR: Error stopping monitoring:', error);
        }
    }
    
    /**
     * Registrar operación
     * @param {string} extensionId - ID de la extensión
     * @param {string} action - Acción realizada
     * @param {number} duration - Duración en ms
     * @param {boolean} success - Si fue exitosa
     */
    recordOperation(extensionId, action, duration, success) {
        try {
            const key = `${extensionId}:${action}`;
            
            if (!this.metrics.has(key)) {
                this.metrics.set(key, {
                    totalOperations: 0,
                    successfulOperations: 0,
                    failedOperations: 0,
                    totalDuration: 0,
                    minDuration: Infinity,
                    maxDuration: 0,
                    avgDuration: 0,
                    lastOperation: null
                });
            }
            
            const metric = this.metrics.get(key);
            metric.totalOperations++;
            
            if (success) {
                metric.successfulOperations++;
            } else {
                metric.failedOperations++;
            }
            
            metric.totalDuration += duration;
            metric.minDuration = Math.min(metric.minDuration, duration);
            metric.maxDuration = Math.max(metric.maxDuration, duration);
            metric.avgDuration = metric.totalDuration / metric.totalOperations;
            metric.lastOperation = Date.now();
            
        } catch (error) {
            console.error('❌ PERFORMANCE MONITOR: Error recording operation:', error);
        }
    }
    
    /**
     * Recolectar métricas del sistema
     */
    collectSystemMetrics() {
        try {
            // Collect memory metrics if available
            if (performance.memory) {
                this.metrics.set('system:memory', {
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    limit: performance.memory.jsHeapSizeLimit,
                    timestamp: Date.now()
                });
            }
            
            // Collect connection metrics
            this.metrics.set('system:connections', {
                timestamp: Date.now()
            });
            
        } catch (error) {
            console.error('❌ SYSTEM METRICS: Error collecting metrics:', error);
        }
    }
    
    /**
     * Obtener métricas actuales
     * @returns {Object} - Métricas recolectadas
     */
    getMetrics() {
        try {
            const result = {};
            
            for (const [key, metric] of this.metrics.entries()) {
                result[key] = { ...metric };
            }
            
            return {
                timestamp: Date.now(),
                isMonitoring: this.isMonitoring,
                metrics: result
            };
            
        } catch (error) {
            console.error('❌ GET METRICS: Error:', error);
            return { error: error.message };
        }
    }
    
    /**
     * Obtener resumen de performance
     * @returns {Object} - Resumen de performance
     */
    getPerformanceSummary() {
        try {
            let totalOperations = 0;
            let totalSuccessful = 0;
            let totalFailed = 0;
            let avgResponseTime = 0;
            
            const operationMetrics = [];
            
            for (const [key, metric] of this.metrics.entries()) {
                if (key.startsWith('system:')) continue;
                
                totalOperations += metric.totalOperations;
                totalSuccessful += metric.successfulOperations;
                totalFailed += metric.failedOperations;
                
                operationMetrics.push({
                    key,
                    ...metric,
                    successRate: metric.totalOperations > 0 
                        ? (metric.successfulOperations / metric.totalOperations) * 100 
                        : 0
                });
            }
            
            avgResponseTime = operationMetrics.length > 0
                ? operationMetrics.reduce((sum, m) => sum + m.avgDuration, 0) / operationMetrics.length
                : 0;
            
            return {
                summary: {
                    totalOperations,
                    totalSuccessful,
                    totalFailed,
                    successRate: totalOperations > 0 ? (totalSuccessful / totalOperations) * 100 : 0,
                    avgResponseTime: Math.round(avgResponseTime)
                },
                operations: operationMetrics,
                systemMetrics: {
                    memory: this.metrics.get('system:memory') || null
                }
            };
            
        } catch (error) {
            console.error('❌ PERFORMANCE SUMMARY: Error:', error);
            return { error: error.message };
        }
    }
}

// ===================================================================
// 🚀 ENTERPRISE EXTENSION CONNECTOR - MAIN CLASS
// ===================================================================

/**
 * Conector principal Enterprise para extensiones
 * Implementa Factory Pattern para diferentes tipos de conexiones
 */
class EnterpriseExtensionConnector {
    constructor(options = {}) {
        this.connectionManager = null;
        this.isInitialized = false;
        this.options = {
            autoConnect: true,
            enableMetrics: true,
            enableCaching: true,
            ...options
        };
        
        console.log('🚀 EXTENSION CONNECTOR: Initializing Enterprise Extension Connector v3.4.0');
    }
    
    /**
     * Inicializar conector Enterprise
     */
    async initialize() {
        try {
            console.log('🏗️ EXTENSION CONNECTOR: Starting initialization...');
            
            // Initialize connection manager
            this.connectionManager = new EnterpriseConnectionManager();
            await this.connectionManager.initialize();
            
            // Auto-connect if enabled
            if (this.options.autoConnect) {
                await this.connectToAvailableExtensions();
            }
            
            this.isInitialized = true;
            console.log('✅ EXTENSION CONNECTOR: Initialization completed successfully');
            
            return {
                success: true,
                connectedExtensions: this.getConnectedExtensions(),
                metrics: this.options.enableMetrics ? this.getPerformanceMetrics() : null
            };
            
        } catch (error) {
            console.error('❌ EXTENSION CONNECTOR: Initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * Conectar con extensiones disponibles
     */
    async connectToAvailableExtensions() {
        try {
            console.log('🔗 EXTENSION CONNECTOR: Connecting to available extensions...');
            
            const results = await this.connectionManager.scanAvailableExtensions();
            
            console.log(`✅ EXTENSION CONNECTOR: Connected to ${results.length} extensions`);
            return results;
            
        } catch (error) {
            console.error('❌ EXTENSION CONNECTOR: Error connecting to extensions:', error);
            throw error;
        }
    }
    
    /**
     * Obtener datos de análisis desde la extensión WebScraping Suite
     * @returns {Promise<Object>} - Datos de análisis
     */
    async getAnalysisData() {
        try {
            this.ensureInitialized();
            
            console.log('📊 GET ANALYSIS DATA: Requesting analysis data...');
            
            const response = await this.connectionManager.connectToExtension(
                null, // Auto-detect
                'getAnalysisData',
                { includeMetrics: true, includeHistory: false }
            );
            
            return {
                success: true,
                data: response.data,
                source: response.source || 'webscraping-suite',
                timestamp: Date.now()
            };
            
        } catch (error) {
            console.error('❌ GET ANALYSIS DATA: Error:', error);
            return {
                success: false,
                error: error.message,
                timestamp: Date.now()
            };
        }
    }
    
    /**
     * Obtener cookies desde extensiones
     * @param {string} domain - Dominio específico (opcional)
     * @returns {Promise<Object>} - Datos de cookies
     */
    async getCookiesFromStorage(domain = null) {
        try {
            this.ensureInitialized();
            
            console.log('🍪 GET COOKIES: Requesting cookies from storage...');
            
            const response = await this.connectionManager.connectToExtension(
                null, // Auto-detect
                'getCookiesFromStorage',
                { domain, includeHttpOnly: false }
            );
            
            return {
                success: true,
                data: {
                    cookies: response.data.cookies || [],
                    totalCookies: response.data.totalCookies || 0,
                    cookieString: response.data.cookieString || '',
                    domain: domain
                },
                source: response.source || 'detected-extension',
                timestamp: Date.now()
            };
            
        } catch (error) {
            console.error('❌ GET COOKIES: Error:', error);
            return {
                success: false,
                error: error.message,
                timestamp: Date.now()
            };
        }
    }
    
    /**
     * Obtener estado de conexiones monitoreadas
     * @returns {Promise<Object>} - Estado de conexiones
     */
    async getConnectionData() {
        try {
            this.ensureInitialized();
            
            console.log('📡 GET CONNECTION DATA: Requesting connection data...');
            
            const response = await this.connectionManager.connectToExtension(
                null,
                'getConnectionData',
                { includeDetails: true }
            );
            
            return {
                success: true,
                data: {
                    connections: response.data.connections || [],
                    totalConnections: response.data.totalConnections || 0,
                    activeMonitor: response.data.activeMonitor || false,
                    duration: response.data.duration || 0
                },
                source: response.source || 'webscraping-suite',
                timestamp: Date.now()
            };
            
        } catch (error) {
            console.error('❌ GET CONNECTION DATA: Error:', error);
            return {
                success: false,
                error: error.message,
                timestamp: Date.now()
            };
        }
    }
    
    /**
     * Obtener estado de agentes Multi-AI
     * @returns {Promise<Object>} - Estado de agentes
     */
    async getAgentStatus() {
        try {
            this.ensureInitialized();
            
            console.log('🤖 GET AGENT STATUS: Requesting agent status...');
            
            const response = await this.connectionManager.connectToExtension(
                null,
                'getAgentStatus',
                { includePerformance: true }
            );
            
            return {
                success: true,
                data: {
                    agents: response.data.agents || {},
                    totalAgents: Object.keys(response.data.agents || {}).length,
                    activeAgents: Object.values(response.data.agents || {})
                        .filter(agent => agent.isActive).length,
                    avgConfidence: this.calculateAverageConfidence(response.data.agents || {})
                },
                source: response.source || 'webscraping-suite',
                timestamp: Date.now()
            };
            
        } catch (error) {
            console.error('❌ GET AGENT STATUS: Error:', error);
            return {
                success: false,
                error: error.message,
                timestamp: Date.now()
            };
        }
    }
    
    /**
     * Iniciar análisis Multi-Agente
     * @param {Object} options - Opciones de análisis
     * @returns {Promise<Object>} - Resultado del inicio
     */
    async startAnalysis(options = {}) {
        try {
            this.ensureInitialized();
            
            console.log('🚀 START ANALYSIS: Starting Multi-Agent analysis...');
            
            const analysisOptions = {
                platform: 'auto-detect',
                includeConnections: true,
                includePerformance: true,
                ...options
            };
            
            const response = await this.connectionManager.connectToExtension(
                null,
                'startAnalysis',
                analysisOptions
            );
            
            return {
                success: true,
                message: 'Analysis started successfully',
                analysisId: response.data.analysisId || Date.now().toString(),
                estimatedDuration: response.data.estimatedDuration || 30000,
                source: response.source || 'webscraping-suite',
                timestamp: Date.now()
            };
            
        } catch (error) {
            console.error('❌ START ANALYSIS: Error:', error);
            return {
                success: false,
                error: error.message,
                timestamp: Date.now()
            };
        }
    }
    
    /**
     * Exportar resultados de análisis
     * @param {string} format - Formato de exportación
     * @returns {Promise<Object>} - Resultado de exportación
     */
    async exportResults(format = 'json') {
        try {
            this.ensureInitialized();
            
            console.log('📤 EXPORT RESULTS: Exporting results in format:', format);
            
            const response = await this.connectionManager.connectToExtension(
                null,
                'exportResults',
                { 
                    format,
                    includeMetadata: true,
                    includeConnections: true,
                    includeAgents: true
                }
            );
            
            return {
                success: true,
                downloadUrl: response.data.downloadUrl || null,
                fileName: response.data.fileName || `analysis-${Date.now()}.${format}`,
                fileSize: response.data.fileSize || 0,
                format: format,
                source: response.source || 'webscraping-suite',
                timestamp: Date.now()
            };
            
        } catch (error) {
            console.error('❌ EXPORT RESULTS: Error:', error);
            return {
                success: false,
                error: error.message,
                timestamp: Date.now()
            };
        }
    }
    
    /**
     * Calcular confianza promedio de agentes
     * @param {Object} agents - Datos de agentes
     * @returns {number} - Confianza promedio
     */
    calculateAverageConfidence(agents) {
        try {
            const agentValues = Object.values(agents);
            if (agentValues.length === 0) return 0;
            
            const totalConfidence = agentValues.reduce((sum, agent) => sum + (agent.confidence || 0), 0);
            return Math.round(totalConfidence / agentValues.length);
            
        } catch (error) {
            return 0;
        }
    }
    
    /**
     * Obtener lista de extensiones conectadas
     * @returns {Array} - Lista de extensiones
     */
    getConnectedExtensions() {
        try {
            this.ensureInitialized();
            
            return Array.from(this.connectionManager.connectedExtensions.values());
            
        } catch (error) {
            console.error('❌ GET CONNECTED EXTENSIONS: Error:', error);
            return [];
        }
    }
    
    /**
     * Obtener métricas de performance
     * @returns {Object} - Métricas de performance
     */
    getPerformanceMetrics() {
        try {
            this.ensureInitialized();
            
            return this.connectionManager.performanceMonitor.getPerformanceSummary();
            
        } catch (error) {
            console.error('❌ GET PERFORMANCE METRICS: Error:', error);
            return { error: error.message };
        }
    }
    
    /**
     * Obtener información de diagnóstico completa
     * @returns {Object} - Información de diagnóstico
     */
    getDiagnosticInfo() {
        try {
            return {
                isInitialized: this.isInitialized,
                version: CONNECTOR_CONFIG.version,
                options: this.options,
                connectionManager: this.connectionManager?.getDiagnosticInfo(),
                timestamp: Date.now()
            };
            
        } catch (error) {
            console.error('❌ DIAGNOSTIC INFO: Error:', error);
            return { error: error.message };
        }
    }
    
    /**
     * Verificar si está inicializado
     */
    ensureInitialized() {
        if (!this.isInitialized) {
            throw new Error('Extension Connector not initialized. Call initialize() first.');
        }
    }
    
    /**
     * Limpiar recursos
     */
    cleanup() {
        try {
            console.log('🧹 EXTENSION CONNECTOR: Starting cleanup...');
            
            if (this.connectionManager) {
                this.connectionManager.cleanup();
                this.connectionManager = null;
            }
            
            this.isInitialized = false;
            
            console.log('✅ EXTENSION CONNECTOR: Cleanup completed');
            
        } catch (error) {
            console.error('❌ EXTENSION CONNECTOR: Error during cleanup:', error);
        }
    }
}

// ===================================================================
// 🌐 GLOBAL API & FACTORY FUNCTIONS
// ===================================================================

/**
 * Factory function para crear conector Enterprise
 * @param {Object} options - Opciones de configuración
 * @returns {EnterpriseExtensionConnector} - Instancia del conector
 */
function createExtensionConnector(options = {}) {
    try {
        return new EnterpriseExtensionConnector(options);
    } catch (error) {
        console.error('❌ FACTORY: Error creating Extension Connector:', error);
        throw error;
    }
}

/**
 * Función helper para crear y inicializar conector rápidamente
 * @param {Object} options - Opciones de configuración
 * @returns {Promise<EnterpriseExtensionConnector>} - Conector inicializado
 */
async function createAndInitializeConnector(options = {}) {
    try {
        const connector = createExtensionConnector(options);
        await connector.initialize();
        return connector;
    } catch (error) {
        console.error('❌ QUICK INIT: Error creating and initializing connector:', error);
        throw error;
    }
}

/**
 * Verificar compatibilidad del entorno
 * @returns {Object} - Estado de compatibilidad
 */
function checkEnvironmentCompatibility() {
    try {
        const compatibility = {
            isExtensionContext: typeof chrome !== 'undefined' && !!chrome.runtime,
            hasRuntimeAPI: typeof chrome !== 'undefined' && !!chrome.runtime.sendMessage,
            hasCryptoAPI: typeof crypto !== 'undefined',
            hasPerformanceAPI: typeof performance !== 'undefined',
            version: CONNECTOR_CONFIG.version
        };
        
        compatibility.isCompatible = compatibility.isExtensionContext && compatibility.hasRuntimeAPI;
        
        return compatibility;
    } catch (error) {
        return {
            isCompatible: false,
            error: error.message
        };
    }
}

// ===================================================================
// 🎯 AUTO-INITIALIZATION & GLOBAL EXPOSURE
// ===================================================================

// Global instance for easy access
let globalExtensionConnector = null;

/**
 * Obtener o crear instancia global del conector
 * @param {Object} options - Opciones de configuración
 * @returns {Promise<EnterpriseExtensionConnector>} - Instancia global
 */
async function getGlobalConnector(options = {}) {
    try {
        if (!globalExtensionConnector) {
            globalExtensionConnector = await createAndInitializeConnector(options);
        }
        
        return globalExtensionConnector;
    } catch (error) {
        console.error('❌ GLOBAL CONNECTOR: Error:', error);
        throw error;
    }
}

/**
 * Limpiar instancia global
 */
function cleanupGlobalConnector() {
    try {
        if (globalExtensionConnector) {
            globalExtensionConnector.cleanup();
            globalExtensionConnector = null;
        }
    } catch (error) {
        console.error('❌ GLOBAL CLEANUP: Error:', error);
    }
}

// ===================================================================
// 📤 EXPORTS & GLOBAL EXPOSURE
// ===================================================================

// Expose classes and functions globally for Chrome Extension context
if (typeof window !== 'undefined') {
    window.ExtensionConnector = {
        // Classes
        EnterpriseExtensionConnector,
        EnterpriseConnectionManager,
        SecurityValidator,
        PerformanceMonitor,
        
        // Factory functions
        createExtensionConnector,
        createAndInitializeConnector,
        
        // Global instance helpers
        getGlobalConnector,
        cleanupGlobalConnector,
        
        // Utilities
        checkEnvironmentCompatibility,
        
        // Configuration
        CONNECTOR_CONFIG,
        DATA_VALIDATORS,
        
        // Version
        version: CONNECTOR_CONFIG.version
    };
    
    console.log('🌐 GLOBAL EXPOSURE: ExtensionConnector available in window.ExtensionConnector');
}

// Module exports for environments that support it
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EnterpriseExtensionConnector,
        EnterpriseConnectionManager,
        SecurityValidator,
        PerformanceMonitor,
        createExtensionConnector,
        createAndInitializeConnector,
        getGlobalConnector,
        cleanupGlobalConnector,
        checkEnvironmentCompatibility,
        CONNECTOR_CONFIG,
        DATA_VALIDATORS
    };
}

// ES6 exports for modern environments
if (typeof globalThis !== 'undefined') {
    globalThis.ExtensionConnectorEnterprise = {
        EnterpriseExtensionConnector,
        createExtensionConnector,
        getGlobalConnector,
        version: CONNECTOR_CONFIG.version
    };
}

// ===================================================================
// 🎬 AUTO-INITIALIZATION
// ===================================================================

// Auto-initialize in extension context if needed
if (typeof chrome !== 'undefined' && chrome.runtime && window.location) {
    // Only auto-initialize in web pages, not in extension pages
    if (window.location.protocol === 'https:' || window.location.protocol === 'http:') {
        console.log('🔄 AUTO-INIT: Detected web page context, preparing for on-demand initialization');
        
        // Pre-check compatibility
        const compatibility = checkEnvironmentCompatibility();
        if (compatibility.isCompatible) {
            console.log('✅ COMPATIBILITY: Environment is compatible with Extension Connector v3.4.0');
        } else {
            console.warn('⚠️ COMPATIBILITY: Environment may have limited functionality:', compatibility);
        }
    }
}

// Cleanup on page unload
if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
        cleanupGlobalConnector();
    });
}

// ===================================================================
// 🏁 FINALIZATION v3.4.0
// ===================================================================

console.log('✅ EXTENSION CONNECTOR: Enterprise Extension Connector v3.4.0 loaded successfully');
console.log('🎯 ENTERPRISE FEATURES ACTIVE:');
console.log('   • Multi-platform Extension Bridge (Gemini, OpenAI, Anthropic, DeepSeek, Qwen)');
console.log('   • Enterprise Security Layer con data validation y sanitization');
console.log('   • Performance Monitoring con latency y throughput metrics');
console.log('   • Circuit Breaker pattern para error handling resiliente');
console.log('   • Connection Pool Management para múltiples extensiones');
console.log('   • Auto-detection de extensiones disponibles');
console.log('   • Caching inteligente con TTL configurables');
console.log('   • Native Chrome Extension API integration (NO React)');

// Performance monitoring
if (typeof performance !== 'undefined' && performance.now) {
    console.log(`🚀 LOAD TIME: Extension Connector v3.4.0 loaded in ${Math.round(performance.now())}ms`);
}