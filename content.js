console.log('🚀 WEBSCRAPING INTELLIGENCE SUITE: v3.4.0 - MULTI-AGENT FRAMEWORK ENHANCED');

// ===================================================================
// CONFIGURACIÓN DUAL AI CON MEJORAS v3.4.0
// ===================================================================
const AI_CONFIG = {
    deepseek: {
        apiKey: 'sk-1d25dab8ef4b4a36936189b25712e078',
        baseUrl: 'https://api.deepseek.com/v1/chat/completions',
        model: 'deepseek-chat'
    },
    gemini: {
        apiKey: 'AIzaSyB6hLW1DHlpDEZviszXECxNWu4i7MaxH2o',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
        models: {
            pro: 'gemini-1.5-pro-latest',
            flash: 'gemini-1.5-flash-latest'
        },
        currentModel: 'pro',
        fallbackAttempted: false
    }
};

// ===================================================================
// CONFIGURACIÓN AVANZADA v3.4.0 - FRAMEWORK MULTI-AGENTE
// ===================================================================

/**
 * Configuración de pesos por agente basada en criticidad y especialización
 * @const {Object} AGENT_WEIGHTS - Pesos ponderados para métricas de confianza
 */
const AGENT_WEIGHTS = {
    // Agentes críticos para seguridad (55% del peso total)
    securityExpert: 0.20,        // 20% - Análisis de seguridad más importante
    authenticationHunter: 0.18,  // 18% - Autenticación crítica  
    vulnerabilityScanner: 0.17,  // 17% - Vulnerabilidades críticas
    
    // Agentes de análisis técnico (35% del peso total)
    apiDiscoveryAgent: 0.15,     // 15% - APIs importantes para conectividad
    networkAnalyzer: 0.12,       // 12% - Análisis de red
    domAnalyst: 0.10,           // 10% - DOM menos crítico que seguridad
    
    // Agentes de síntesis (10% del peso total)
    dataAnalyst: 0.05,          // 5% - Análisis de datos
    synthesisCoordinator: 0.03  // 3% - Coordinación
};

/**
 * Umbrales de consenso adaptativos por tipo de análisis
 * @const {Object} CONSENSUS_THRESHOLDS - Configuración de consenso inteligente
 */
const CONSENSUS_THRESHOLDS = {
    security_critical: {
        high: 0.85,    // Seguridad requiere alta certeza
        medium: 0.65,
        low: 0.45
    },
    functional_analysis: {
        high: 0.70,    // Funcionalidad puede ser más flexible
        medium: 0.50,
        low: 0.30
    },
    data_discovery: {
        high: 0.60,    // Descubrimiento puede ser más exploratorio
        medium: 0.40,
        low: 0.20
    }
};

/**
 * Configuración de especialización por agente para consensus bonuses
 * @const {Object} AGENT_EXPERTISE - Áreas de especialización
 */
const AGENT_EXPERTISE = {
    securityExpert: ['security', 'vulnerability', 'auth', 'risk'],
    authenticationHunter: ['auth', 'login', 'session', 'token'],
    vulnerabilityScanner: ['security', 'vulnerability', 'risk', 'exploit'],
    apiDiscoveryAgent: ['api', 'endpoint', 'service', 'rest'],
    networkAnalyzer: ['network', 'connection', 'traffic', 'protocol'],
    domAnalyst: ['dom', 'element', 'structure', 'html'],
    dataAnalyst: ['data', 'analysis', 'metrics', 'stats'],
    synthesisCoordinator: ['synthesis', 'coordination', 'integration']
};

/**
 * Patrones de detección de plataformas web AI
 * @const {Object} PLATFORM_PATTERNS - Patrones regex para detección
 */
const PLATFORM_PATTERNS = {
    gemini: /gemini\.google|generativelanguage\.googleapis|bard\.google/i,
    openai: /openai\.com|chat\.openai/i,
    anthropic: /anthropic\.com|claude\.ai/i,
    deepseek: /deepseek\.com/i,
    qwen: /qwen.*\.com/i,
    google: /google\.com|googleapis\.com|gstatic\.com/i,
    microsoft: /microsoft\.com|bing\.com/i
};

/**
 * Patrones críticos de seguridad para análisis avanzado
 * @const {Array} SECURITY_PATTERNS - Patrones de detección de seguridad
 */
const SECURITY_PATTERNS = [
    // APIs REST genéricas
    /\/api\//i, /\/v\d+\//i, /\.json$/i, /\/graphql/i, /\/rest\//i,
    
    // APIs específicas de plataformas AI
    /generativelanguage\.googleapis\.com/i,  // Gemini
    /api\.openai\.com/i, /chat\.openai\.com\/backend-api/i,  // OpenAI
    /api\.anthropic\.com/i, /claude\.ai\/api/i,  // Anthropic
    /api\.deepseek\.com/i,  // DeepSeek
    /qwen.*\.com\/api/i,  // Qwen
    
    // Servicios de autenticación
    /signaler-pa\.clients6\.google\.com/i,  // Google Auth service
    /content-push\.googleapis\.com/i,  // Push notifications  
    /oauth2\.googleapis\.com/i,  // OAuth
    
    // Patrones de autenticación
    /auth/i, /login/i, /token/i, /refresh/i, /session/i,
    /oauth/i, /saml/i, /sso/i,
    
    // WebSockets y realtime
    /\.websocket/i, /socket\.io/i, /ws\//i, /wss\//i
];

// ===================================================================
// 🔥 PARSER JSON COMPLETAMENTE CORREGIDO v3.4.0 - ENTERPRISE LEVEL
// ===================================================================

/**
 * Parser JSON avanzado con recovery automático y validación exhaustiva
 * @param {string} textResponse - Respuesta de texto a parsear
 * @param {string} source - Fuente del parser para logging
 * @returns {Object} - Resultado de parsing con éxito/datos/error
 */
function safeJsonParseImproved(textResponse, source = 'unknown') {
    console.log(`🔧 SUPER PARSER v3.4.0: Procesando ${source}...`);
    
    // VALIDACIÓN CRÍTICA DE ENTRADA
    if (!textResponse) {
        console.error(`❌ SUPER PARSER: Respuesta vacía de ${source}`);
        return createSafeFallback(source, 'Empty response');
    }
    
    // VALIDACIÓN DE TIPO DE DATO
    if (typeof textResponse !== 'string') {
        console.warn(`⚠️ SUPER PARSER: Tipo inválido (${typeof textResponse}) de ${source}`);
        try {
            textResponse = String(textResponse);
        } catch (conversionError) {
            return createSafeFallback(source, `Type conversion failed: ${conversionError.message}`);
        }
    }
    
    try {
        console.log(`🔍 SUPER PARSER: Analizando respuesta de ${textResponse.length} caracteres...`);
        
        // PASO 1: Limpieza inteligente de respuesta
        let cleanedResponse = textResponse.trim();
        
        // Remover prefijos comunes de AI
        const aiPrefixes = [
            /^```json\s*/i, /^```\s*/i, /^`json\s*/i, /^`\s*/i,
            /^json\s*:?\s*/i, /^response\s*:?\s*/i,
            /^aquí está el análisis\s*:?\s*/i, /^el análisis es\s*:?\s*/i
        ];
        
        aiPrefixes.forEach(prefix => {
            cleanedResponse = cleanedResponse.replace(prefix, '');
        });
        
        // Remover sufijos comunes
        const aiSufixes = [/\s*```\s*$/i, /\s*`\s*$/i];
        aiSufixes.forEach(suffix => {
            cleanedResponse = cleanedResponse.replace(suffix, '');
        });
        
        console.log(`🧹 SUPER PARSER: Respuesta limpiada, ${cleanedResponse.length} caracteres restantes`);
        
        // PASO 2: Encontrar JSON válido usando múltiples estrategias
        let validJsonString = null;
        const jsonStrategies = [
            // Estrategia 1: JSON directo
            () => cleanedResponse,
            
            // Estrategia 2: Buscar entre llaves principales
            () => {
                const startIndex = cleanedResponse.indexOf('{');
                const lastIndex = cleanedResponse.lastIndexOf('}');
                if (startIndex !== -1 && lastIndex !== -1 && lastIndex > startIndex) {
                    return cleanedResponse.substring(startIndex, lastIndex + 1);
                }
                return null;
            },
            
            // Estrategia 3: Buscar entre llaves balanceadas
            () => {
                let braceCount = 0;
                let startIndex = -1;
                let endIndex = -1;
                
                for (let i = 0; i < cleanedResponse.length; i++) {
                    if (cleanedResponse[i] === '{') {
                        if (braceCount === 0) startIndex = i;
                        braceCount++;
                    } else if (cleanedResponse[i] === '}') {
                        braceCount--;
                        if (braceCount === 0 && startIndex !== -1) {
                            endIndex = i;
                            break;
                        }
                    }
                }
                
                if (startIndex !== -1 && endIndex !== -1) {
                    return cleanedResponse.substring(startIndex, endIndex + 1);
                }
                return null;
            },
            
            // Estrategia 4: Regex para JSON object
            () => {
                const jsonMatch = cleanedResponse.match(/\{[^{}]*\}/s) || 
                                cleanedResponse.match(/\{[\s\S]*\}/s);
                return jsonMatch ? jsonMatch[0] : null;
            }
        ];
        
        // PASO 3: Intentar parsing con cada estrategia
        for (let i = 0; i < jsonStrategies.length; i++) {
            try {
                validJsonString = jsonStrategies[i]();
                if (validJsonString) {
                    console.log(`🎯 SUPER PARSER: Intentando estrategia ${i + 1}...`);
                    const parsedResult = JSON.parse(validJsonString);
                    
                    // VALIDACIÓN DEL RESULTADO
                    if (parsedResult && typeof parsedResult === 'object') {
                        console.log(`✅ SUPER PARSER: Éxito con estrategia ${i + 1} de ${source}`);
                        return {
                            success: true,
                            data: parsedResult,
                            strategy: i + 1,
                            recovered: i > 0
                        };
                    }
                }
            } catch (strategyError) {
                console.warn(`⚠️ SUPER PARSER: Estrategia ${i + 1} falló: ${strategyError.message}`);
                continue;
            }
        }
        
        // PASO 4: Recovery con fallback inteligente si todo falla
        console.warn(`🔄 SUPER PARSER: Todas las estrategias fallaron, activando recovery avanzado...`);
        return createIntelligentFallback(cleanedResponse, source);
        
    } catch (criticalError) {
        console.error(`💥 SUPER PARSER: Error crítico en ${source}:`, criticalError);
        return createSafeFallback(source, criticalError.message);
    }
}

/**
 * Crear fallback inteligente basado en el contenido
 * @param {string} content - Contenido original
 * @param {string} source - Fuente para contexto
 * @returns {Object} - Resultado con datos de fallback
 */
function createIntelligentFallback(content, source) {
    console.log(`🤖 INTELLIGENT FALLBACK: Creando análisis de respaldo para ${source}...`);
    
    try {
        // Análisis inteligente del contenido
        const analysisHints = {
            hasSecurityContent: /security|vulnerability|auth|login|token/i.test(content),
            hasAPIContent: /api|endpoint|url|request|response/i.test(content),
            hasDOMContent: /element|dom|html|css|selector/i.test(content),
            hasNetworkContent: /network|connection|http|https|request/i.test(content),
            confidence: 0.3 // Confianza baja pero válida
        };
        
        const fallbackData = {
            analysis: `Análisis de fallback inteligente para ${source}`,
            source_content: content.substring(0, 500), // Primeros 500 chars
            content_analysis: analysisHints,
            fallback_generated: true,
            quality_score: 30,
            platform_detected: detectPlatformFromContent(content),
            security_indicators: extractSecurityIndicators(content),
            timestamp: Date.now()
        };
        
        console.log(`✅ INTELLIGENT FALLBACK: Generado para ${source}`, fallbackData);
        
        return {
            success: true,
            data: fallbackData,
            recovered: true,
            strategy: 'intelligent_fallback'
        };
        
    } catch (fallbackError) {
        console.error(`💥 INTELLIGENT FALLBACK: Error generando fallback:`, fallbackError);
        return createSafeFallback(source, fallbackError.message);
    }
}

/**
 * Detectar plataforma desde contenido de texto
 * @param {string} content - Contenido a analizar
 * @returns {string} - Plataforma detectada
 */
function detectPlatformFromContent(content) {
    if (!content) return 'unknown';
    
    for (const [platform, pattern] of Object.entries(PLATFORM_PATTERNS)) {
        if (pattern.test(content)) return platform;
    }
    
    return 'generic';
}

/**
 * Extraer indicadores de seguridad del contenido
 * @param {string} content - Contenido a analizar
 * @returns {Array} - Indicadores encontrados
 */
function extractSecurityIndicators(content) {
    const indicators = [];
    
    SECURITY_PATTERNS.forEach((pattern, index) => {
        if (pattern.test(content)) {
            indicators.push({
                pattern_id: index,
                type: 'security_pattern_match',
                confidence: 0.7
            });
        }
    });
    
    return indicators;
}

/**
 * Crear fallback seguro básico
 * @param {string} source - Fuente del error
 * @param {string} errorMessage - Mensaje de error
 * @returns {Object} - Resultado de fallback básico
 */
function createSafeFallback(source, errorMessage) {
    return {
        success: false,
        data: {
            error: `Parser failed for ${source}`,
            details: errorMessage,
            fallback_generated: true,
            analysis: 'Safe fallback data',
            confidence: 0.1,
            quality_score: 10,
            timestamp: Date.now()
        },
        recovered: false,
        error: errorMessage
    };
}

// ===================================================================
// 🌐 CONNECTION MONITOR AVANZADO v3.4.0 - CAPTURA COMPLETA
// ===================================================================

/**
 * Monitor de conexiones avanzado con captura multi-protocolo
 * Implementa el Decorator pattern para mejoras progresivas
 */
class AdvancedConnectionMonitor {
    constructor() {
        this.isActive = false;
        this.connections = [];
        this.networkRequests = [];
        this.sessionId = null;
        this.startTime = null;
        this.tabId = null;
        this.listenersSetup = false;
        
        // NUEVOS ATRIBUTOS v3.4.0
        this.securityAnalysis = {};
        this.platformDetection = {};
        this.criticalHeaders = [];
        this.authenticationEvents = [];
        
        // Listeners mejorados
        this.onBeforeRequestListener = null;
        this.onCompletedListener = null;
        this.onAuthRequiredListener = null;
        this.onHeadersReceivedListener = null;
    }
    
    /**
     * Configurar listeners de red con captura completa
     * @returns {Promise<void>}
     */
    async setupEnhancedNetworkListeners() {
        if (this.listenersSetup) return;
        
        try {
            console.log('🌐 CONNECTION MONITOR v3.4.0: Configurando captura completa...');
            
            // LISTENER 1: Captura de TODOS los requests (MEJORADO)
            this.onBeforeRequestListener = (details) => {
                if (!this.isActive || !details) return;
                
                this.recordEnhancedNetworkRequest({
                    type: 'request',
                    url: details.url || 'unknown',
                    method: details.method || 'GET',
                    timestamp: Date.now(),
                    requestId: details.requestId || `req_${Date.now()}`,
                    tabId: details.tabId,
                    frameId: details.frameId || 0,
                    initiator: details.initiator || 'unknown',
                    // NUEVOS CAMPOS PARA ANÁLISIS COMPLETO:
                    resourceType: details.type || 'other',
                    requestHeaders: details.requestHeaders || [],
                    requestBody: details.requestBody || null,
                    parentFrameId: details.parentFrameId || -1,
                    documentUrl: details.documentUrl,
                    frameUrl: details.frameUrl
                });
            };
            
            // LISTENER 2: Captura de responses completas (MEJORADO)
            this.onCompletedListener = (details) => {
                if (!this.isActive || !details) return;
                
                this.recordEnhancedNetworkRequest({
                    type: 'response',
                    url: details.url || 'unknown',
                    statusCode: details.statusCode || 0,
                    timestamp: Date.now(),
                    requestId: details.requestId || `res_${Date.now()}`,
                    tabId: details.tabId,
                    // NUEVOS CAMPOS:
                    responseHeaders: details.responseHeaders || [],
                    fromCache: details.fromCache || false,
                    method: details.method || 'GET',
                    resourceType: details.type || 'other',
                    ip: details.ip || 'unknown',
                    statusLine: details.statusLine
                });
            };
            
            // LISTENER 3: Eventos de autenticación (NUEVO)
            this.onAuthRequiredListener = (details) => {
                if (!this.isActive || !details) return;
                
                console.log('🔐 CONNECTION MONITOR: Autenticación requerida detectada');
                this.recordAuthenticationEvent({
                    type: 'auth_required',
                    url: details.url,
                    challenger: details.challenger || {},
                    isProxy: details.isProxy || false,
                    scheme: details.scheme || 'unknown',
                    realm: details.realm || 'unknown',
                    timestamp: Date.now(),
                    requestId: details.requestId
                });
            };
            
            // LISTENER 4: Análisis de headers críticos (NUEVO)
            this.onHeadersReceivedListener = (details) => {
                if (!this.isActive || !details) return;
                
                const criticalHeaders = [
                    'set-cookie', 'authorization', 'x-api-key', 'x-auth-token',
                    'access-control-allow-origin', 'content-security-policy',
                    'x-frame-options', 'strict-transport-security'
                ];
                
                const foundCritical = (details.responseHeaders || []).filter(header => 
                    criticalHeaders.includes(header.name.toLowerCase())
                );
                
                if (foundCritical.length > 0) {
                    console.log('🚨 CONNECTION MONITOR: Headers críticos detectados');
                    this.recordCriticalHeaders({
                        type: 'critical_headers',
                        url: details.url,
                        criticalHeaders: foundCritical,
                        statusCode: details.statusCode,
                        timestamp: Date.now(),
                        securityImplications: this.analyzeHeaderSecurity(foundCritical)
                    });
                }
            };
            
            // CONFIGURAR LISTENERS CON FILTROS AMPLIADOS
            if (chrome.webRequest?.onBeforeRequest) {
                chrome.webRequest.onBeforeRequest.addListener(
                    this.onBeforeRequestListener,
                    { 
                        urls: ["<all_urls>"],
                        types: ["main_frame", "sub_frame", "script", "xmlhttprequest", "fetch", "other"]
                    },
                    ["requestBody"]
                );
                console.log('✅ CONNECTION MONITOR: onBeforeRequest configurado');
            }
            
            if (chrome.webRequest?.onCompleted) {
                chrome.webRequest.onCompleted.addListener(
                    this.onCompletedListener,
                    { urls: ["<all_urls>"] },
                    ["responseHeaders"]
                );
                console.log('✅ CONNECTION MONITOR: onCompleted configurado');
            }
            
            if (chrome.webRequest?.onAuthRequired) {
                chrome.webRequest.onAuthRequired.addListener(
                    this.onAuthRequiredListener,
                    { urls: ["<all_urls>"] }
                );
                console.log('✅ CONNECTION MONITOR: onAuthRequired configurado');
            }
            
            if (chrome.webRequest?.onHeadersReceived) {
                chrome.webRequest.onHeadersReceived.addListener(
                    this.onHeadersReceivedListener,
                    { urls: ["<all_urls>"] },
                    ["responseHeaders"]
                );
                console.log('✅ CONNECTION MONITOR: onHeadersReceived configurado');
            }
            
            this.listenersSetup = true;
            console.log('✅ CONNECTION MONITOR v3.4.0: Captura completa configurada');
            
        } catch (error) {
            console.error('❌ CONNECTION MONITOR: Error en setup completo:', error);
            throw error;
        }
    }
    
    /**
     * Verificar si una URL es una llamada API crítica
     * @param {string} url - URL a verificar
     * @returns {boolean} - True si es API call
     */
    isAdvancedAPICall(url) {
        if (!url || typeof url !== 'string') return false;
        
        // Verificar contra patrones de seguridad
        const isPatternMatch = SECURITY_PATTERNS.some(pattern => pattern.test(url));
        
        if (isPatternMatch) return true;
        
        // Análisis adicional por estructura de URL
        try {
            const urlObj = new URL(url);
            
            // Detectar APIs por query parameters
            if (urlObj.searchParams.has('key') || 
                urlObj.searchParams.has('token') || 
                urlObj.searchParams.has('apikey') ||
                urlObj.searchParams.has('access_token')) {
                return true;
            }
            
            // Detectar por path structure
            if (urlObj.pathname.includes('/v') || 
                urlObj.pathname.includes('/api') ||
                urlObj.pathname.includes('/endpoint') ||
                urlObj.pathname.includes('/graphql')) {
                return true;
            }
            
            // Detectar servicios conocidos por hostname
            const criticalHosts = [
                'googleapis.com', 'openai.com', 'anthropic.com', 
                'deepseek.com', 'api.', 'auth.', 'oauth.'
            ];
            
            if (criticalHosts.some(host => urlObj.hostname.includes(host))) {
                return true;
            }
            
        } catch (urlError) {
            // URL inválida, skip
        }
        
        return false;
    }
    
    /**
     * Detectar plataforma específica desde URL
     * @param {string} url - URL a analizar
     * @returns {string} - Plataforma detectada
     */
    detectPlatformFromURL(url) {
        if (!url) return 'unknown';
        
        for (const [platform, pattern] of Object.entries(PLATFORM_PATTERNS)) {
            if (pattern.test(url)) return platform;
        }
        
        return 'generic';
    }
    
    /**
     * Analizar flags de seguridad de una request
     * @param {Object} requestData - Datos de la request
     * @returns {Object} - Análisis de seguridad
     */
    analyzeSecurityFlags(requestData) {
        const flags = {
            hasAuth: false,
            hasApiKey: false,
            hasSession: false,
            isSecure: false,
            hasCORS: false,
            hasCSP: false,
            riskLevel: 'low'
        };
        
        if (requestData.url) {
            flags.isSecure = requestData.url.startsWith('https://');
            flags.hasApiKey = /key=|apikey=|token=|access_token=/i.test(requestData.url);
        }
        
        if (requestData.requestHeaders) {
            flags.hasAuth = requestData.requestHeaders.some(h => 
                h.name.toLowerCase().includes('authorization') || 
                h.name.toLowerCase().includes('auth')
            );
        }
        
        if (requestData.responseHeaders) {
            flags.hasSession = requestData.responseHeaders.some(h => 
                h.name.toLowerCase() === 'set-cookie'
            );
            flags.hasCORS = requestData.responseHeaders.some(h => 
                h.name.toLowerCase().includes('access-control')
            );
            flags.hasCSP = requestData.responseHeaders.some(h => 
                h.name.toLowerCase() === 'content-security-policy'
            );
        }
        
        // Determinar nivel de riesgo
        if (flags.hasAuth || flags.hasApiKey) flags.riskLevel = 'high';
        else if (flags.hasSession || flags.hasCORS) flags.riskLevel = 'medium';
        
        return flags;
    }
    
    /**
     * Analizar seguridad de headers críticos
     * @param {Array} headers - Headers a analizar
     * @returns {Object} - Análisis de seguridad
     */
    analyzeHeaderSecurity(headers) {
        const analysis = {
            securityScore: 50, // Base score
            vulnerabilities: [],
            recommendations: []
        };
        
        headers.forEach(header => {
            const name = header.name.toLowerCase();
            const value = header.value;
            
            switch (name) {
                case 'set-cookie':
                    if (!value.includes('Secure')) {
                        analysis.vulnerabilities.push('Cookie sin flag Secure');
                        analysis.securityScore -= 10;
                    }
                    if (!value.includes('HttpOnly')) {
                        analysis.vulnerabilities.push('Cookie sin flag HttpOnly');  
                        analysis.securityScore -= 10;
                    }
                    break;
                    
                case 'access-control-allow-origin':
                    if (value === '*') {
                        analysis.vulnerabilities.push('CORS muy permisivo (*)');
                        analysis.securityScore -= 15;
                    }
                    break;
                    
                case 'content-security-policy':
                    analysis.securityScore += 20; // Bonus por tener CSP
                    break;
            }
        });
        
        return analysis;
    }
    
    /**
     * Registrar request de red con análisis avanzado
     * @param {Object} requestData - Datos de la request
     */
    recordEnhancedNetworkRequest(requestData) {
        if (!requestData || typeof requestData !== 'object') {
            console.warn('⚠️ CONNECTION MONITOR: Datos inválidos');
            return;
        }
        
        try {
            // Clasificación inteligente
            let importance = 'low';
            let classification = 'generic';
            let platform = 'unknown';
            
            if (requestData.url) {
                platform = this.detectPlatformFromURL(requestData.url);
                
                if (this.isAdvancedAPICall(requestData.url)) {
                    importance = 'high';
                    classification = 'api_call';
                } else if (requestData.url.includes('auth') || requestData.url.includes('login')) {
                    importance = 'critical';
                    classification = 'authentication';
                } else if (requestData.responseHeaders?.some(h => h.name.toLowerCase() === 'set-cookie')) {
                    importance = 'medium';
                    classification = 'session_management';
                }
            }
            
            const enrichedData = {
                ...requestData,
                sessionId: this.sessionId,
                captureTime: Date.now(),
                importance: importance,
                classification: classification,
                platform: platform,
                security_flags: this.analyzeSecurityFlags(requestData),
                risk_assessment: this.assessRiskLevel(requestData, classification)
            };
            
            this.networkRequests.push(enrichedData);
            
            // Solo agregar a connections si es importante
            if (importance !== 'low') {
                this.connections.push({
                    type: classification,
                    url: requestData.url,
                    method: requestData.method || 'GET',
                    timestamp: requestData.timestamp || Date.now(),
                    importance: importance,
                    sessionId: this.sessionId,
                    platform: platform,
                    security_analysis: enrichedData.security_flags,
                    risk_level: enrichedData.risk_assessment.level
                });
                
                console.log(`🔗 CONNECTION MONITOR v3.4.0: ${classification} capturado - ${importance} (${platform})`);
            }
            
        } catch (error) {
            console.error('❌ CONNECTION MONITOR: Error registrando request:', error);
        }
    }
    
    /**
     * Evaluar nivel de riesgo de una request
     * @param {Object} requestData - Datos de la request
     * @param {string} classification - Clasificación de la request
     * @returns {Object} - Evaluación de riesgo
     */
    assessRiskLevel(requestData, classification) {
        let riskScore = 0;
        let factors = [];
        
        // Factor por clasificación
        switch (classification) {
            case 'authentication': riskScore += 40; factors.push('auth_endpoint'); break;
            case 'api_call': riskScore += 30; factors.push('api_usage'); break;
            case 'session_management': riskScore += 20; factors.push('session_handling'); break;
        }
        
        // Factor por protocolo
        if (!requestData.url?.startsWith('https://')) {
            riskScore += 20;
            factors.push('insecure_protocol');
        }
        
        // Factor por headers de autenticación
        if (requestData.requestHeaders?.some(h => h.name.toLowerCase().includes('authorization'))) {
            riskScore += 15;
            factors.push('auth_headers');
        }
        
        // Determinar nivel
        let level = 'low';
        if (riskScore >= 50) level = 'critical';
        else if (riskScore >= 30) level = 'high';  
        else if (riskScore >= 15) level = 'medium';
        
        return { level, score: riskScore, factors };
    }
    
    /**
     * Registrar evento de autenticación
     * @param {Object} authData - Datos del evento de auth
     */
    recordAuthenticationEvent(authData) {
        this.authenticationEvents.push({
            ...authData,
            sessionId: this.sessionId,
            platform: this.detectPlatformFromURL(authData.url),
            risk_assessment: this.assessRiskLevel(authData, 'authentication')
        });
        
        console.log('🔐 CONNECTION MONITOR: Evento de autenticación registrado');
    }
    
    /**
     * Registrar headers críticos
     * @param {Object} headerData - Datos de headers críticos
     */
    recordCriticalHeaders(headerData) {
        this.criticalHeaders.push({
            ...headerData,
            sessionId: this.sessionId,
            platform: this.detectPlatformFromURL(headerData.url)
        });
        
        console.log('🚨 CONNECTION MONITOR: Headers críticos registrados');
    }
    
    /**
     * Iniciar monitoreo avanzado
     * @param {number} tabId - ID de la pestaña
     * @returns {Promise<Object>} - Resultado de inicio
     */
    async start(tabId) {
        // CORRECCIÓN: Permitir reinicio si ya está activo
        if (this.isActive) {
            console.log('⚠️ CONNECTION MONITOR v3.4.0: Ya activo, reiniciando automáticamente...');
            
            try {
                const stopResult = await this.stop();
                console.log('🔄 CONNECTION MONITOR: Anterior sesión detenida, iniciando nueva...');
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (stopError) {
                console.warn('⚠️ CONNECTION MONITOR: Error al detener sesión anterior:', stopError.message);
                this.forceReset();
            }
        }
        
        try {
            this.tabId = tabId;
            this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            this.startTime = Date.now();
            this.isActive = true;
            
            // Limpiar datos previos
            this.connections = [];
            this.networkRequests = [];
            this.securityAnalysis = {};
            this.platformDetection = {};
            this.criticalHeaders = [];
            this.authenticationEvents = [];
            
            await this.setupEnhancedNetworkListeners();
            
            console.log(`🚀 CONNECTION MONITOR v3.4.0: Iniciado para tab ${tabId}, sesión ${this.sessionId}`);
            
            return {
                success: true,
                message: 'Connection Monitor v3.4.0 iniciado exitosamente',
                sessionId: this.sessionId,
                tabId: this.tabId,
                features: [
                    'multi_protocol_capture',
                    'security_analysis',
                    'platform_detection', 
                    'risk_assessment',
                    'auth_monitoring'
                ]
            };
            
        } catch (error) {
            console.error('❌ CONNECTION MONITOR: Error en inicio:', error);
            this.isActive = false;
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * Detener monitoreo y generar resumen
     * @returns {Promise<Object>} - Datos de la sesión
     */
    async stop() {
        if (!this.isActive) {
            return {
                success: false,
                error: 'Monitor not active'
            };
        }
        
        try {
            const endTime = Date.now();
            const duration = endTime - this.startTime;
            
            // Remover listeners
            if (chrome.webRequest?.onBeforeRequest && this.onBeforeRequestListener) {
                chrome.webRequest.onBeforeRequest.removeListener(this.onBeforeRequestListener);
            }
            if (chrome.webRequest?.onCompleted && this.onCompletedListener) {
                chrome.webRequest.onCompleted.removeListener(this.onCompletedListener);
            }
            if (chrome.webRequest?.onAuthRequired && this.onAuthRequiredListener) {
                chrome.webRequest.onAuthRequired.removeListener(this.onAuthRequiredListener);
            }
            if (chrome.webRequest?.onHeadersReceived && this.onHeadersReceivedListener) {
                chrome.webRequest.onHeadersReceived.removeListener(this.onHeadersReceivedListener);
            }
            
            this.listenersSetup = false;
            this.isActive = false;
            
            // Generar resumen avanzado
            const sessionSummary = {
                sessionId: this.sessionId,
                duration: duration,
                totalConnections: this.connections.length,
                totalRequests: this.networkRequests.length,
                
                // NUEVOS DATOS v3.4.0
                connections: this.connections,
                networkRequests: this.networkRequests.slice(0, 100), // Limitar a 100 para performance
                authenticationEvents: this.authenticationEvents,
                criticalHeaders: this.criticalHeaders,
                
                summary: {
                    unique_domains: [...new Set(this.connections.map(c => {
                        try { return new URL(c.url).hostname; } catch { return 'unknown'; }
                    }))],
                    platforms_detected: [...new Set(this.connections.map(c => c.platform))],
                    risk_levels: this.connections.reduce((acc, c) => {
                        acc[c.risk_level] = (acc[c.risk_level] || 0) + 1;
                        return acc;
                    }, {}),
                    classifications: this.connections.reduce((acc, c) => {
                        acc[c.type] = (acc[c.type] || 0) + 1;
                        return acc;
                    }, {})
                },
                
                security_analysis: this.generateSecuritySummary()
            };
            
            console.log(`✅ CONNECTION MONITOR v3.4.0: Sesión completada - ${this.connections.length} conexiones en ${Math.round(duration/1000)}s`);
            
            return {
                success: true,
                sessionData: sessionSummary
            };
            
        } catch (error) {
            console.error('❌ CONNECTION MONITOR: Error deteniendo:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * Reset forzado del monitor
     */
    forceReset() {
        console.log('🔄 CONNECTION MONITOR v3.4.0: Force reset iniciado...');
        
        try {
            // Limpiar listeners sin validaciones
            if (chrome.webRequest?.onBeforeRequest && this.onBeforeRequestListener) {
                chrome.webRequest.onBeforeRequest.removeListener(this.onBeforeRequestListener);
            }
            if (chrome.webRequest?.onCompleted && this.onCompletedListener) {
                chrome.webRequest.onCompleted.removeListener(this.onCompletedListener);
            }
            if (chrome.webRequest?.onAuthRequired && this.onAuthRequiredListener) {
                chrome.webRequest.onAuthRequired.removeListener(this.onAuthRequiredListener);
            }
            if (chrome.webRequest?.onHeadersReceived && this.onHeadersReceivedListener) {
                chrome.webRequest.onHeadersReceived.removeListener(this.onHeadersReceivedListener);
            }
        } catch (error) {
            console.log('⚠️ CONNECTION MONITOR: Error en force reset listeners:', error.message);
        }
        
        // Reset completo de estado
        this.isActive = false;
        this.connections = [];
        this.networkRequests = [];
        this.sessionId = null;
        this.startTime = null;
        this.tabId = null;
        this.onBeforeRequestListener = null;
        this.onCompletedListener = null;
        this.onAuthRequiredListener = null;
        this.onHeadersReceivedListener = null;
        this.listenersSetup = false;
        
        // Reset nuevos atributos v3.4.0
        this.securityAnalysis = {};
        this.platformDetection = {};
        this.criticalHeaders = [];
        this.authenticationEvents = [];
        
        console.log('✅ CONNECTION MONITOR v3.4.0: Force reset completado');
    }
    
    /**
     * Generar resumen de seguridad
     * @returns {Object} - Resumen de análisis de seguridad
     */
    generateSecuritySummary() {
        return {
            total_auth_events: this.authenticationEvents.length,
            critical_headers_detected: this.criticalHeaders.length,
            high_risk_connections: this.connections.filter(c => c.risk_level === 'critical' || c.risk_level === 'high').length,
            platforms_with_security_issues: this.identifySecurityIssuesByPlatform(),
            security_score: this.calculateSecurityScore(),
            recommendations: this.generateSecurityRecommendations()
        };
    }
    
    /**
     * Identificar issues de seguridad por plataforma
     * @returns {Object} - Issues por plataforma
     */
    identifySecurityIssuesByPlatform() {
        const issues = {};
        
        this.connections.forEach(conn => {
            if (conn.risk_level === 'high' || conn.risk_level === 'critical') {
                if (!issues[conn.platform]) issues[conn.platform] = 0;
                issues[conn.platform]++;
            }
        });
        
        return issues;
    }
    
    /**
     * Calcular score de seguridad de la sesión
     * @returns {number} - Score de 0-100
     */
    calculateSecurityScore() {
        let score = 80; // Base score
        
        // Penalizar conexiones de alto riesgo
        const highRiskCount = this.connections.filter(c => c.risk_level === 'critical' || c.risk_level === 'high').length;
        score -= highRiskCount * 5;
        
        // Bonus por usar HTTPS
        const httpsCount = this.connections.filter(c => c.url.startsWith('https://')).length;
        const httpsRatio = this.connections.length > 0 ? httpsCount / this.connections.length : 0;
        score += httpsRatio * 20;
        
        return Math.max(0, Math.min(100, score));
    }
    
    /**
     * Generar recomendaciones de seguridad
     * @returns {Array} - Lista de recomendaciones
     */
    generateSecurityRecommendations() {
        const recommendations = [];
        
        const insecureConnections = this.connections.filter(c => !c.url.startsWith('https://'));
        if (insecureConnections.length > 0) {
            recommendations.push(`${insecureConnections.length} conexiones inseguras detectadas - usar HTTPS`);
        }
        
        if (this.authenticationEvents.length > 5) {
            recommendations.push('Múltiples eventos de autenticación - revisar flujo de login');
        }
        
        const apiCalls = this.connections.filter(c => c.type === 'api_call');
        if (apiCalls.length > 0) {
            recommendations.push(`${apiCalls.length} llamadas API detectadas - verificar rate limiting y autenticación`);
        }
        
        return recommendations;
    }
    
    /**
     * Obtener estado actual del monitor
     * @returns {Object} - Estado actual
     */
    getStatus() {
        if (!this.isActive) {
            return {
                success: false,
                isActive: false,
                error: 'Monitor not active'
            };
        }
        
        const currentTime = Date.now();
        const duration = currentTime - this.startTime;
        
        return {
            success: true,
            isActive: true,
            status: {
                sessionId: this.sessionId,
                duration: duration,
                connectionsCount: this.connections.length,
                requestsCount: this.networkRequests.length,
                authEventsCount: this.authenticationEvents.length,
                criticalHeadersCount: this.criticalHeaders.length,
                securityScore: this.calculateSecurityScore()
            }
        };
    }
}

// ===================================================================
// 🤖 SISTEMA MULTI-AGENTE INTELIGENTE v3.4.0 - ENTERPRISE ENHANCED
// ===================================================================

/**
 * Sistema Multi-Agente con métricas ponderadas y consenso adaptativo
 * Implementa Strategy pattern para consenso dinámico
 */
class EnhancedMultiAgentIntelligenceSystem {
    constructor() {
        this.analysisResults = {
            agentResults: {},
            metrics: {
                totalApiCalls: 0,
                successfulApiCalls: 0,
                parseSuccesses: 0,
                parseFallbacks: 0,
                realSuccessCount: 0,
                dataValidationPassed: 0
            },
            overallStatus: 'INITIALIZING',
            executionTime: 0
        };
        
        // NUEVOS ATRIBUTOS v3.4.0
        this.consensusStrategy = new AdaptiveConsensusStrategy();
        this.confidenceCalculator = new WeightedConfidenceCalculator();
        this.platformDetector = new PlatformSpecificAnalyzer();
    }
    
    /**
     * Ejecutar análisis multi-agente completo con mejoras v3.4.0
     * @param {Object} analysisData - Datos para análisis
     * @returns {Promise<Object>} - Resultados completos
     */
    async runEnhancedAnalysis(analysisData) {
        const startTime = Date.now();
        console.log('🤖 MULTI-AGENT v3.4.0: Iniciando análisis inteligente...');
        
        try {
            // Validar datos de entrada
            const validationResult = this.validateAnalysisData(analysisData);
            if (!validationResult.isValid) {
                throw new Error(`Invalid analysis data: ${validationResult.errors.join(', ')}`);
            }
            
            // Inicializar resultados
            this.analysisResults = {
                agentResults: {},
                metrics: {
                    totalApiCalls: 0,
                    successfulApiCalls: 0,
                    parseSuccesses: 0,
                    parseFallbacks: 0,
                    realSuccessCount: 0,
                    dataValidationPassed: 3 // cookieData, domData, connectionData
                },
                overallStatus: 'PROCESSING',
                executionTime: 0,
                
                // NUEVOS CAMPOS v3.4.0
                platformAnalysis: await this.platformDetector.analyze(analysisData),
                securityAssessment: {},
                qualityMetrics: {}
            };
            
            // Copiar datos de entrada
            this.analysisResults.cookies = analysisData.cookieData;
            this.analysisResults.domData = analysisData.domData;
            this.analysisResults.connectionData = analysisData.connectionData;
            
            // Definir agentes con especialización v3.4.0
            const agents = [
                {
                    name: 'domAnalyst',
                    specialization: 'dom_analysis',
                    analysisType: 'functional_analysis',
                    prompt: this.buildDOMAnalysisPrompt(analysisData.domData, analysisData.connectionData)
                },
                {
                    name: 'securityExpert',
                    specialization: 'security_analysis',
                    analysisType: 'security_critical',
                    prompt: this.buildSecurityAnalysisPrompt(analysisData.cookieData, analysisData.connectionData)
                },
                {
                    name: 'authenticationHunter',
                    specialization: 'auth_analysis', 
                    analysisType: 'security_critical',
                    prompt: this.buildAuthenticationAnalysisPrompt(analysisData.cookieData, analysisData.domData)
                },
                {
                    name: 'apiDiscoveryAgent',
                    specialization: 'api_analysis',
                    analysisType: 'functional_analysis', 
                    prompt: this.buildAPIAnalysisPrompt(analysisData.connectionData, analysisData.domData)
                },
                {
                    name: 'networkAnalyzer',
                    specialization: 'network_analysis',
                    analysisType: 'functional_analysis',
                    prompt: this.buildNetworkAnalysisPrompt(analysisData.connectionData)
                },
                {
                    name: 'vulnerabilityScanner',
                    specialization: 'vulnerability_analysis',
                    analysisType: 'security_critical',
                    prompt: this.buildVulnerabilityPrompt(analysisData.domData, analysisData.connectionData)
                },
                {
                    name: 'dataAnalyst',
                    specialization: 'data_analysis',
                    analysisType: 'data_discovery',
                    prompt: this.buildDataAnalysisPrompt(analysisData.cookieData, analysisData.domData)
                },
                {
                    name: 'synthesisCoordinator',
                    specialization: 'synthesis',
                    analysisType: 'functional_analysis',
                    prompt: this.buildSynthesisPrompt(analysisData)
                }
            ];
            
            // Ejecutar análisis de agentes en paralelo
            console.log(`🚀 MULTI-AGENT v3.4.0: Ejecutando ${agents.length} agentes especializados...`);
            
            const agentPromises = agents.map(agent => 
                this.executeEnhancedAgent(agent.name, agent.prompt, {
                    specialization: agent.specialization,
                    analysisType: agent.analysisType,
                    platform: this.analysisResults.platformAnalysis.detectedPlatform
                })
            );
            
            const agentResults = await Promise.allSettled(agentPromises);
            
            // Procesar resultados de agentes
            agentResults.forEach((result, index) => {
                const agentName = agents[index].name;
                if (result.status === 'fulfilled') {
                    this.analysisResults.agentResults[agentName] = result.value;
                } else {
                    console.error(`❌ MULTI-AGENT: Error en agente ${agentName}:`, result.reason);
                    this.analysisResults.agentResults[agentName] = this.createFailedAgentResult(agentName, result.reason);
                }
            });
            
            // Generar síntesis inteligente
            this.analysisResults.synthesis = await this.generateIntelligentSynthesis();
            
            // Generar reporte profesional
            this.analysisResults.professionalReport = await this.generateProfessionalReport();
            
            // Calcular métricas finales avanzadas
            const executionTime = Date.now() - startTime;
            this.calculateAdvancedFinalMetrics(executionTime);
            
            console.log(`✅ MULTI-AGENT v3.4.0: Análisis completado en ${Math.round(executionTime/1000)}s - Status: ${this.analysisResults.overallStatus}`);
            
            return {
                success: true,
                data: this.analysisResults
            };
            
        } catch (error) {
            console.error('❌ MULTI-AGENT v3.4.0: Error crítico:', error);
            
            const executionTime = Date.now() - startTime;
            this.analysisResults.executionTime = executionTime;
            this.analysisResults.overallStatus = 'CRITICAL_FAILURE';
            this.analysisResults.error = error.message;
            
            return {
                success: false,
                error: error.message,
                data: this.analysisResults
            };
        }
    }
    
    /**
     * Ejecutar agente con análisis avanzado y consenso adaptativo
     * @param {string} agentName - Nombre del agente
     * @param {string} prompt - Prompt para el análisis  
     * @param {Object} context - Contexto adicional
     * @returns {Promise<Object>} - Resultado del agente
     */
    async executeEnhancedAgent(agentName, prompt, context = {}) {
        console.log(`🤖 AGENT EXECUTOR v3.4.0: Ejecutando ${agentName} (${context.specialization})`);
        
        try {
            // Ejecutar análisis dual con contexto
            const dualResult = await this.analyzeWithEnhancedDualAI(prompt, context);
            
            if (dualResult.success) {
                // Determinar consenso adaptativo
                const consensus = this.consensusStrategy.determineConsensus(
                    agentName, 
                    dualResult.combined.confidence,
                    context.analysisType
                );
                
                // Actualizar resultado con consenso
                dualResult.combined.consensus = consensus;
                dualResult.combined.specialization = context.specialization;
                dualResult.combined.analysisType = context.analysisType;
                
                console.log(`✅ AGENT ${agentName}: Consenso ${consensus} (${Math.round(dualResult.combined.confidence * 100)}%)`);
                
                return dualResult;
            } else {
                throw new Error(`Agent ${agentName} failed: ${dualResult.error || 'Unknown error'}`);
            }
            
        } catch (error) {
            console.error(`❌ AGENT ${agentName}: Error ejecutando:`, error);
            return this.createFailedAgentResult(agentName, error.message);
        }
    }
    
    /**
     * Análisis dual AI con mejoras v3.4.0
     * @param {string} prompt - Prompt para análisis
     * @param {Object} context - Contexto adicional
     * @returns {Promise<Object>} - Resultado del análisis dual
     */
    async analyzeWithEnhancedDualAI(prompt, context = {}) {
        console.log('🤖 ENHANCED DUAL AI v3.4.0: Análisis con contexto especializado...');
        
        let deepseekResult = null;
        let geminiResult = null;
        
        try {
            // Llamadas paralelas a las APIs
            const [deepseekResponse, geminiResponse] = await Promise.allSettled([
                this.callDeepSeekAPI(prompt, context),
                this.callGeminiAPI(prompt, context)
            ]);
            
            // Procesar resultado DeepSeek
            if (deepseekResponse.status === 'fulfilled') {
                deepseekResult = deepseekResponse.value;
                if (deepseekResult.success) {
                    this.analysisResults.metrics.successfulApiCalls++;
                }
            }
            
            // Procesar resultado Gemini
            if (geminiResponse.status === 'fulfilled') {
                geminiResult = geminiResponse.value;
                if (geminiResult.success && !geminiResult.result?.quotaExceeded) {
                    this.analysisResults.metrics.successfulApiCalls++;
                }
            }
            
            this.analysisResults.metrics.totalApiCalls += 2;
            
            // Parsear respuestas con contexto
            const deepseekParsed = this.parseAIResponse(deepseekResult, 'deepseek', context);
            const geminiParsed = this.parseAIResponse(geminiResult, 'gemini', context);
            
            // Contar parseos exitosos
            if (deepseekParsed.success) this.analysisResults.metrics.parseSuccesses++;
            if (geminiParsed.success) this.analysisResults.metrics.parseSuccesses++;
            if (deepseekParsed.recovered || geminiParsed.recovered) this.analysisResults.metrics.parseFallbacks++;
            
            // CONSENSO ADAPTATIVO MEJORADO v3.4.0
            return this.buildEnhancedConsensus(deepseekParsed, geminiParsed, context);
            
        } catch (error) {
            console.error('❌ ENHANCED DUAL AI: Error crítico:', error);
            return {
                success: false,
                error: error.message,
                combined: {
                    confidence: 0.1,
                    consensus: 'none',
                    data: { error: error.message, fallback_generated: true }
                }
            };
        }
    }
    
    /**
     * Construir consenso avanzado entre resultados de IA
     * @param {Object} deepseekParsed - Resultado parseado de DeepSeek
     * @param {Object} geminiParsed - Resultado parseado de Gemini  
     * @param {Object} context - Contexto del análisis
     * @returns {Object} - Consenso construido
     */
    buildEnhancedConsensus(deepseekParsed, geminiParsed, context) {
        let primaryData = null;
        let confidence = 0.1;
        let realSuccessCount = 0;
        
        // Contar éxitos reales (no fallbacks ni recovered)
        if (deepseekParsed.success && !deepseekParsed.recovered) realSuccessCount++;
        if (geminiParsed.success && !geminiParsed.recovered) realSuccessCount++;
        
        this.analysisResults.metrics.realSuccessCount += realSuccessCount;
        
        if (realSuccessCount >= 2) {
            // Ambas IAs exitosas - CONSENSO ALTO
            primaryData = this.mergeIntelligentDualData([deepseekParsed.data, geminiParsed.data], context);
            confidence = Math.min(0.85 + (realSuccessCount * 0.05), 0.95);
            
        } else if (realSuccessCount >= 1) {
            // Una IA exitosa - CONSENSO MEDIO
            primaryData = deepseekParsed.success && !deepseekParsed.recovered ? 
                deepseekParsed.data : geminiParsed.data;
            confidence = 0.60 + (realSuccessCount * 0.15);
            
        } else {
            // Solo fallbacks - CONSENSO BAJO pero válido
            primaryData = deepseekParsed.data || geminiParsed.data || 
                this.createContextualFallback(context);
            confidence = 0.25;
        }
        
        // Ajustes por contexto y especialización
        confidence = this.adjustConfidenceByContext(confidence, context);
        
        return {
            success: confidence > 0.15,
            combined: {
                data: primaryData,
                confidence: confidence,
                realSuccessCount: realSuccessCount,
                quality_score: realSuccessCount / 2 * 100,
                specialization: context.specialization,
                analysisType: context.analysisType,
                platform_specific: context.platform || 'generic',
                context_adjusted: true
            },
            dualAnalysis: {
                deepseek: {
                    apiCall: !!deepseekResult?.success,
                    parsing: deepseekParsed.success,
                    realSuccess: deepseekParsed.success && !deepseekParsed.recovered,
                    data: deepseekParsed.success ? deepseekParsed.data : null,
                    error: !deepseekParsed.success ? deepseekParsed.error : null,
                    recovered: deepseekParsed.recovered || false,
                    fallback: !!deepseekParsed.data?.fallback_generated
                },
                gemini: {
                    apiCall: !!geminiResult?.success && !geminiResult.result?.quotaExceeded,
                    parsing: geminiParsed.success,
                    realSuccess: geminiParsed.success && !geminiParsed.recovered,
                    data: geminiParsed.success ? geminiParsed.data : null,
                    error: !geminiParsed.success ? geminiParsed.error : null,
                    quotaExceeded: geminiResult?.result?.quotaExceeded || false,
                    modelUsed: geminiResult?.result?.model || AI_CONFIG.gemini.currentModel,
                    recovered: geminiParsed.recovered || false,
                    fallback: !!geminiParsed.data?.fallback_generated
                }
            }
        };
    }
    
    /**
     * Ajustar confianza basado en contexto y especialización
     * @param {number} baseConfidence - Confianza base
     * @param {Object} context - Contexto del agente
     * @returns {number} - Confianza ajustada
     */
    adjustConfidenceByContext(baseConfidence, context) {
        let adjustedConfidence = baseConfidence;
        
        // Bonus por especialización en plataforma conocida
        const knownPlatforms = ['gemini', 'openai', 'anthropic'];
        if (knownPlatforms.includes(context.platform)) {
            adjustedConfidence *= 1.1; // +10% bonus
        }
        
        // Ajuste por tipo de análisis
        if (context.analysisType === 'security_critical' && adjustedConfidence < 0.5) {
            adjustedConfidence *= 0.8; // Ser más conservador en seguridad
        } else if (context.analysisType === 'data_discovery' && adjustedConfidence > 0.3) {
            adjustedConfidence *= 1.2; // Ser más optimista en descubrimiento
        }
        
        return Math.min(0.95, Math.max(0.1, adjustedConfidence));
    }
    
    /**
     * Crear fallback contextual para un agente específico
     * @param {Object} context - Contexto del agente
     * @returns {Object} - Datos de fallback contextual
     */
    createContextualFallback(context) {
        const baseData = {
            analysis: `Fallback contextual para ${context.specialization || 'unknown'}`,
            specialization: context.specialization,
            analysisType: context.analysisType,
            platform: context.platform || 'generic',
            fallback_generated: true,
            confidence: 0.2,
            timestamp: Date.now()
        };
        
        // Datos específicos por especialización
        switch (context.specialization) {
            case 'security_analysis':
                baseData.security_assessment = 'Análisis básico de seguridad completado';
                baseData.risk_level = 'medium';
                break;
                
            case 'auth_analysis':
                baseData.authentication_status = 'Elementos de autenticación detectados';
                baseData.auth_mechanisms = ['basic', 'session'];
                break;
                
            case 'api_analysis':
                baseData.api_discovery = 'APIs detectadas mediante análisis de tráfico';
                baseData.endpoint_count = 0;
                break;
                
            case 'network_analysis':
                baseData.network_assessment = 'Análisis de red completado';
                baseData.connection_quality = 'acceptable';
                break;
        }
        
        return baseData;
    }
    
    /**
     * Mergear datos de manera inteligente basado en contexto
     * @param {Array} dataArray - Array de datos a mergear
     * @param {Object} context - Contexto para el merge
     * @returns {Object} - Datos mergeados inteligentemente
     */
    mergeIntelligentDualData(dataArray, context) {
        if (!dataArray || dataArray.length === 0) {
            return this.createContextualFallback(context);
        }
        
        const validData = dataArray.filter(data => data && typeof data === 'object');
        if (validData.length === 0) {
            return this.createContextualFallback(context);
        }
        
        if (validData.length === 1) {
            return {
                ...validData[0],
                merged: false,
                source: 'single_ai',
                context: context.specialization
            };
        }
        
        // Merge inteligente de múltiples fuentes
        const mergedData = {
            merged: true,
            source: 'dual_ai_consensus',
            context: context.specialization,
            merge_quality: 'high',
            timestamp: Date.now()
        };
        
        // Combinar campos comunes
        validData.forEach((data, index) => {
            Object.keys(data).forEach(key => {
                if (key === 'confidence' || key === 'quality_score') {
                    // Promediar métricas numéricas
                    if (!mergedData[key]) mergedData[key] = 0;
                    mergedData[key] += data[key] || 0;
                } else if (Array.isArray(data[key])) {
                    // Combinar arrays
                    if (!mergedData[key]) mergedData[key] = [];
                    mergedData[key] = [...mergedData[key], ...data[key]];
                } else if (typeof data[key] === 'string') {
                    // Combinar strings
                    if (!mergedData[key]) {
                        mergedData[key] = data[key];
                    } else if (mergedData[key] !== data[key]) {
                        mergedData[key] += ` | ${data[key]}`;
                    }
                } else if (typeof data[key] === 'object' && data[key] !== null) {
                    // Merge objetos anidados
                    if (!mergedData[key]) mergedData[key] = {};
                    mergedData[key] = { ...mergedData[key], ...data[key] };
                } else {
                    // Tomar el primer valor válido
                    if (!mergedData[key]) mergedData[key] = data[key];
                }
            });
        });
        
        // Promediar métricas acumuladas
        if (mergedData.confidence) mergedData.confidence /= validData.length;
        if (mergedData.quality_score) mergedData.quality_score /= validData.length;
        
        return mergedData;
    }
    
    /**
     * Calcular métricas finales avanzadas con ponderación v3.4.0
     * @param {number} executionTime - Tiempo de ejecución
     */
    calculateAdvancedFinalMetrics(executionTime) {
        console.log('📊 METRICS v3.4.0: Calculando métricas avanzadas...');
        
        try {
            const totalCalls = this.analysisResults.metrics.totalApiCalls;
            const successfulCalls = this.analysisResults.metrics.successfulApiCalls;
            const parseSuccesses = this.analysisResults.metrics.parseSuccesses;
            const parseFallbacks = this.analysisResults.metrics.parseFallbacks;
            
            // CONFIANZA PONDERADA REAL v3.4.0
            const realAvgConfidence = this.confidenceCalculator.calculateWeightedConfidence(
                this.analysisResults.agentResults
            );
            
            // MÉTRICAS ESPECÍFICAS POR PLATAFORMA v3.4.0
            const platformScore = this.calculatePlatformSpecificMetrics();
            
            // QUALITY SCORE AVANZADO
            const qualityScore = this.calculateAdvancedQualityScore();
            
            this.analysisResults.metrics = {
                ...this.analysisResults.metrics,
                
                // Métricas básicas
                parseSuccessRate: totalCalls > 0 ? parseSuccesses / totalCalls : 0,
                realSuccessRate: totalCalls > 0 ? parseSuccesses / totalCalls : 0,
                fallbackRate: totalCalls > 0 ? parseFallbacks / totalCalls : 0,
                
                // NUEVAS MÉTRICAS AVANZADAS v3.4.0
                avgConfidence: realAvgConfidence,
                platformSpecificScore: platformScore,
                dataQualityScore: this.analysisResults.metrics.dataValidationPassed / 3,
                overallQualityScore: qualityScore,
                
                // Métricas de consenso
                highConsensusAgents: this.countAgentsByConsensus('high'),
                mediumConsensusAgents: this.countAgentsByConsensus('medium'),
                lowConsensusAgents: this.countAgentsByConsensus('low'),
                
                // Métricas de especialización
                securityAgentsSuccess: this.countSuccessfulAgentsByType(['securityExpert', 'authenticationHunter', 'vulnerabilityScanner']),
                functionalAgentsSuccess: this.countSuccessfulAgentsByType(['apiDiscoveryAgent', 'networkAnalyzer', 'domAnalyst']),
                
                // Métricas de ejecución
                executionTime: executionTime,
                performanceGrade: this.calculatePerformanceGrade(executionTime),
                
                // MÉTRICAS DE EFECTIVIDAD v3.4.0
                connectionCapture: this.analysisResults.connectionData?.totalConnections || 0,
                domElementsFound: this.analysisResults.domData?.structure?.totalElements || 0,
                criticalElementsFound: this.calculateCriticalElements(),
                securityIndicatorsFound: this.calculateSecurityIndicators(),
                
                // Nuevas métricas de calidad de datos
                dataCompleteness: this.calculateDataCompleteness(),
                analysisDepth: this.calculateAnalysisDepth()
            };
            
            // Determinar status final mejorado
            this.analysisResults.overallStatus = this.determineAdvancedOverallStatus();
            this.analysisResults.executionTime = executionTime;
            
            console.log('📊 METRICS v3.4.0: Métricas avanzadas calculadas:', {
                avgConfidence: Math.round(realAvgConfidence * 100) + '%',
                platformScore: Math.round(platformScore * 100) + '%',
                qualityScore: Math.round(qualityScore * 100) + '%',
                overallStatus: this.analysisResults.overallStatus
            });
            
        } catch (error) {
            console.error('❌ METRICS: Error calculando métricas avanzadas:', error);
            this.analysisResults.overallStatus = 'CALCULATION_ERROR';
        }
    }
    
    /**
     * Contar agentes por nivel de consenso
     * @param {string} consensusLevel - Nivel de consenso a contar
     * @returns {number} - Número de agentes con ese consenso
     */
    countAgentsByConsensus(consensusLevel) {
        return Object.values(this.analysisResults.agentResults).filter(result => 
            result.combined?.consensus === consensusLevel
        ).length;
    }
    
    /**
     * Contar agentes exitosos por tipo/especialización
     * @param {Array} agentNames - Nombres de agentes a verificar
     * @returns {number} - Número de agentes exitosos
     */
    countSuccessfulAgentsByType(agentNames) {
        return agentNames.filter(agentName => {
            const result = this.analysisResults.agentResults[agentName];
            return result && result.combined?.consensus !== 'none' && result.combined?.confidence > 0.3;
        }).length;
    }
    
    /**
     * Calcular métricas específicas por plataforma
     * @returns {number} - Score específico de plataforma (0-1)
     */
    calculatePlatformSpecificMetrics() {
        const platform = this.analysisResults.platformAnalysis?.detectedPlatform || 'unknown';
        const domData = this.analysisResults.domData;
        const connectionData = this.analysisResults.connectionData;
        
        let platformScore = 0.5; // Base score
        
        switch (platform) {
            case 'gemini':
                if (connectionData?.connections?.some(c => c.url?.includes('googleapis.com'))) {
                    platformScore += 0.3;
                }
                if (domData?.critical_elements?.auth_elements > 0) {
                    platformScore += 0.2;
                }
                break;
                
            case 'openai':
                if (connectionData?.connections?.some(c => c.url?.includes('openai.com/backend-api'))) {
                    platformScore += 0.3;
                }
                if (domData?.security_analysis?.potential_tokens?.length > 0) {
                    platformScore += 0.2;
                }
                break;
                
            case 'anthropic':
                if (connectionData?.connections?.some(c => c.url?.includes('anthropic.com'))) {
                    platformScore += 0.3;
                }
                break;
                
            default:
                // Análisis genérico
                if (domData?.security_analysis?.localStorage_keys?.some(k => k.includes('token'))) {
                    platformScore += 0.2;
                }
                if (connectionData?.connections?.length > 0) {
                    platformScore += 0.1;
                }
        }
        
        return Math.min(platformScore, 1.0);
    }
    
    /**
     * Calcular score de calidad avanzado
     * @returns {number} - Score de calidad general (0-1)
     */
    calculateAdvancedQualityScore() {
        const weights = {
            confidence: 0.3,
            consensus: 0.25,
            dataCompleteness: 0.2,
            realSuccessRate: 0.15,
            platformSpecific: 0.1
        };
        
        const metrics = this.analysisResults.metrics;
        const confidence = this.confidenceCalculator.calculateWeightedConfidence(this.analysisResults.agentResults);
        const consensusScore = (this.countAgentsByConsensus('high') * 1.0 + 
                              this.countAgentsByConsensus('medium') * 0.6 + 
                              this.countAgentsByConsensus('low') * 0.3) / 8; // 8 agentes totales
        
        const qualityScore = 
            (confidence * weights.confidence) +
            (consensusScore * weights.consensus) +
            (this.calculateDataCompleteness() * weights.dataCompleteness) +
            ((metrics.realSuccessRate || 0) * weights.realSuccessRate) +
            (this.calculatePlatformSpecificMetrics() * weights.platformSpecific);
        
        return Math.min(1.0, qualityScore);
    }
    
    /**
     * Calcular completitud de datos
     * @returns {number} - Score de completitud (0-1)
     */
    calculateDataCompleteness() {
        let completeness = 0;
        const maxPoints = 6;
        
        // Datos de cookies
        if (this.analysisResults.cookies?.totalCookies > 0) completeness += 1;
        
        // Datos DOM
        if (this.analysisResults.domData?.structure?.totalElements > 0) completeness += 1;
        
        // Datos de conexión
        if (this.analysisResults.connectionData?.totalConnections > 0) completeness += 1;
        
        // Análisis de seguridad
        if (this.analysisResults.domData?.security_analysis?.potential_tokens?.length > 0) completeness += 1;
        
        // Datos de plataforma
        if (this.analysisResults.platformAnalysis?.detectedPlatform !== 'unknown') completeness += 1;
        
        // Elementos críticos
        if (this.calculateCriticalElements() > 0) completeness += 1;
        
        return completeness / maxPoints;
    }
    
    /**
     * Calcular profundidad de análisis
     * @returns {number} - Score de profundidad (0-1)
     */
    calculateAnalysisDepth() {
        let depth = 0;
        const maxDepth = 5;
        
        // Múltiples agentes exitosos
        const successfulAgents = Object.values(this.analysisResults.agentResults).filter(r => 
            r.combined?.confidence > 0.3
        ).length;
        if (successfulAgents >= 6) depth += 1;
        
        // Análisis de consenso
        if (this.countAgentsByConsensus('high') >= 3) depth += 1;
        
        // Análisis específico de plataforma
        if (this.analysisResults.platformAnalysis?.confidence > 0.7) depth += 1;
        
        // Síntesis inteligente generada
        if (this.analysisResults.synthesis?.combined?.data) depth += 1;
        
        // Reporte profesional generado
        if (this.analysisResults.professionalReport?.success) depth += 1;
        
        return depth / maxDepth;
    }
    
    /**
     * Calcular elementos críticos encontrados
     * @returns {number} - Número de elementos críticos
     */
    calculateCriticalElements() {
        const domData = this.analysisResults.domData;
        if (!domData) return 0;
        
        let criticalCount = 0;
        
        if (domData.critical_elements) {
            criticalCount += domData.critical_elements.auth_elements || 0;
            criticalCount += domData.critical_elements.api_indicators || 0;
            criticalCount += domData.critical_elements.session_elements || 0;
            criticalCount += domData.critical_elements.chat_inputs || 0;
        }
        
        return criticalCount;
    }
    
    /**
     * Calcular indicadores de seguridad encontrados
     * @returns {number} - Número de indicadores de seguridad
     */
    calculateSecurityIndicators() {
        let securityCount = 0;
        
        if (this.analysisResults.connectionData?.connections) {
            securityCount += this.analysisResults.connectionData.connections.filter(c => 
                c.classification === 'authentication' || c.classification === 'api_call'
            ).length;
        }
        
        if (this.analysisResults.domData?.security_analysis) {
            securityCount += this.analysisResults.domData.security_analysis.potential_tokens?.length || 0;
            securityCount += this.analysisResults.domData.security_analysis.localStorage_keys?.length || 0;
        }
        
        return securityCount;
    }
    
    /**
     * Determinar status general avanzado con lógica mejorada v3.4.0
     * @returns {string} - Status final del análisis
     */
    determineAdvancedOverallStatus() {
        const agentResults = this.analysisResults.agentResults;
        if (!agentResults || Object.keys(agentResults).length === 0) {
            return 'CRITICAL_FAILURE';
        }
        
        // Agentes críticos para seguridad
        const securityAgents = ['securityExpert', 'authenticationHunter', 'vulnerabilityScanner'];
        const functionalAgents = ['apiDiscoveryAgent', 'networkAnalyzer', 'domAnalyst'];
        
        const securityConsensus = securityAgents.filter(agent => {
            const result = agentResults[agent];
            return result?.combined?.consensus === 'high' || result?.combined?.consensus === 'medium';
        }).length / securityAgents.length;
        
        const functionalConsensus = functionalAgents.filter(agent => {
            const result = agentResults[agent];
            return result?.combined?.consensus === 'high' || result?.combined?.consensus === 'medium';
        }).length / functionalAgents.length;
        
        // SCORING PONDERADO: Seguridad 60%, Funcional 40%
        let totalScore = (securityConsensus * 0.6) + (functionalConsensus * 0.4);
        
        // BONIFICACIONES POR DATOS DISPONIBLES v3.4.0
        if (this.analysisResults.connectionData?.totalConnections > 5) {
            totalScore += 0.1; // +10% por buena captura de conexiones
        }
        
        if (this.calculateCriticalElements() > 3) {
            totalScore += 0.1; // +10% por elementos críticos
        }
        
        if (this.analysisResults.platformAnalysis?.confidence > 0.7) {
            totalScore += 0.05; // +5% por detección de plataforma confiable
        }
        
        // DETERMINACIÓN FINAL DE STATUS
        if (totalScore >= 0.90) return 'EXCELLENT';
        if (totalScore >= 0.75) return 'GOOD';
        if (totalScore >= 0.60) return 'ACCEPTABLE';
        if (totalScore >= 0.45) return 'BASIC';
        if (totalScore >= 0.30) return 'LIMITED';
        return 'INSUFFICIENT';
    }
    
    /**
     * Crear resultado de agente fallido
     * @param {string} agentName - Nombre del agente
     * @param {string} errorMessage - Mensaje de error
     * @returns {Object} - Resultado de falla
     */
    createFailedAgentResult(agentName, errorMessage) {
        return {
            success: false,
            combined: {
                data: {
                    error: `Agent ${agentName} failed`,
                    details: errorMessage,
                    fallback_generated: true
                },
                confidence: 0.1,
                consensus: 'none',
                realSuccessCount: 0
            },
            dualAnalysis: {
                deepseek: { apiCall: false, parsing: false, realSuccess: false },
                gemini: { apiCall: false, parsing: false, realSuccess: false }
            }
        };
    }
    
    /**
     * Validar datos de análisis
     * @param {Object} data - Datos a validar
     * @returns {Object} - Resultado de validación
     */
    validateAnalysisData(data) {
        const errors = [];
        
        if (!data || typeof data !== 'object') {
            errors.push('Analysis data must be an object');
        } else {
            if (!data.cookieData && !data.domData && !data.connectionData) {
                errors.push('At least one data source (cookies, DOM, or connections) is required');
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
    /**
     * Calcular grade de performance
     * @param {number} executionTime - Tiempo de ejecución en ms
     * @returns {string} - Grade de performance
     */
    calculatePerformanceGrade(executionTime) {
        const seconds = executionTime / 1000;
        
        if (seconds <= 30) return 'EXCELLENT';
        if (seconds <= 60) return 'GOOD';
        if (seconds <= 120) return 'ACCEPTABLE';
        if (seconds <= 180) return 'BASIC';
        return 'SLOW';
    }
    
    // Métodos de construcción de prompts (preservados de la versión anterior)
    buildDOMAnalysisPrompt(domData, connectionData) {
        return `Analiza los siguientes datos DOM y conexiones para identificar elementos críticos de interfaz:

DOM Data: ${JSON.stringify(domData, null, 2)}
Connection Data: ${JSON.stringify(connectionData, null, 2)}

Proporciona análisis en formato JSON con:
- Elementos de interfaz detectados
- Componentes de autenticación
- Formularios y campos críticos
- Scripts y recursos externos
- Evaluación de seguridad de la interfaz`;
    }
    
    buildSecurityAnalysisPrompt(cookieData, connectionData) {
        return `Realiza un análisis exhaustivo de seguridad basado en cookies y conexiones de red:

Cookie Data: ${JSON.stringify(cookieData, null, 2)}
Connection Data: ${JSON.stringify(connectionData, null, 2)}

Analiza y responde en JSON:
- Vulnerabilidades de seguridad identificadas
- Riesgos en cookies (flags de seguridad, exposición)
- Conexiones inseguras detectadas
- Recomendaciones de seguridad específicas
- Score de riesgo general (1-10)`;
    }
    
    buildAuthenticationAnalysisPrompt(cookieData, domData) {
        return `Examina los mecanismos de autenticación presentes en cookies y elementos DOM:

Cookie Data: ${JSON.stringify(cookieData, null, 2)}
DOM Data: ${JSON.stringify(domData, null, 2)}

Respuesta en JSON debe incluir:
- Métodos de autenticación detectados
- Tokens de sesión y su seguridad
- Elementos de login/logout en DOM
- Vulnerabilidades de autenticación
- Recomendaciones para mejora de auth`;
    }
    
    buildAPIAnalysisPrompt(connectionData, domData) {
        return `Analiza las conexiones de red para identificar APIs y endpoints utilizados:

Connection Data: ${JSON.stringify(connectionData, null, 2)}
DOM Data: ${JSON.stringify(domData, null, 2)}

Generar análisis JSON con:
- APIs y endpoints identificados
- Métodos HTTP utilizados
- Parámetros y headers críticos
- Patrones de comunicación
- Oportunidades de optimización`;
    }
    
    buildNetworkAnalysisPrompt(connectionData) {
        return `Evalúa el tráfico de red y patrones de conectividad:

Connection Data: ${JSON.stringify(connectionData, null, 2)}

Análisis en formato JSON:
- Patrones de tráfico identificados
- Dominios y servicios conectados
- Latencia y performance de red
- Anomalías en conectividad
- Optimizaciones recomendadas`;
    }
    
    buildVulnerabilityPrompt(domData, connectionData) {
        return `Busca vulnerabilidades potenciales en DOM y conexiones de red:

DOM Data: ${JSON.stringify(domData, null, 2)}
Connection Data: ${JSON.stringify(connectionData, null, 2)}

Reporte de vulnerabilidades en JSON:
- Vulnerabilidades críticas identificadas
- Vectores de ataque potenciales
- Exposición de datos sensibles
- Configuraciones inseguras
- Plan de mitigación priorizado`;
    }
    
    buildDataAnalysisPrompt(cookieData, domData) {
        return `Analiza la calidad y estructura de los datos capturados:

Cookie Data: ${JSON.stringify(cookieData, null, 2)}
DOM Data: ${JSON.stringify(domData, null, 2)}

Análisis de datos en JSON:
- Calidad y completitud de datos
- Patrones y estructuras identificadas
- Datos sensibles detectados
- Correlaciones importantes
- Insights y recomendaciones`;
    }
    
    buildSynthesisPrompt(analysisData) {
        return `Crea una síntesis integral de todos los datos de análisis:

Analysis Data: ${JSON.stringify(analysisData, null, 2)}

Síntesis comprensiva en JSON:
- Resumen ejecutivo de hallazgos
- Riesgos críticos identificados
- Oportunidades de mejora
- Recomendaciones priorizadas
- Conclusiones y próximos pasos`;
    }
    
    /**
     * Generar síntesis inteligente
     * @returns {Promise<Object>} - Síntesis generada
     */
    async generateIntelligentSynthesis() {
        try {
            const synthesisPrompt = `Basado en los resultados de análisis multi-agente, genera una síntesis integral:

Agent Results: ${JSON.stringify(this.analysisResults.agentResults, null, 2)}

Métricas: ${JSON.stringify(this.analysisResults.metrics, null, 2)}

Genera síntesis JSON con:
- Resumen ejecutivo de hallazgos críticos
- Análisis de consenso entre agentes
- Riesgos de seguridad priorizados
- Recomendaciones específicas por área
- Plan de acción estructurado`;

            return await this.analyzeWithEnhancedDualAI(synthesisPrompt, {
                specialization: 'synthesis',
                analysisType: 'functional_analysis',
                platform: this.analysisResults.platformAnalysis?.detectedPlatform
            });
            
        } catch (error) {
            console.error('❌ SYNTHESIS: Error generando síntesis:', error);
            return {
                success: false,
                error: error.message,
                combined: {
                    data: { synthesis: 'Error generando síntesis inteligente', fallback_generated: true }
                }
            };
        }
    }
    
    /**
     * Generar reporte profesional
     * @returns {Promise<Object>} - Reporte generado
     */
    async generateProfessionalReport() {
        try {
            const reportPrompt = `Genera un reporte técnico profesional basado en el análisis completo:

Resultados completos: ${JSON.stringify({
    agentResults: this.analysisResults.agentResults,
    metrics: this.analysisResults.metrics,
    synthesis: this.analysisResults.synthesis
}, null, 2)}

El reporte debe ser en formato JSON e incluir:
- Executive Summary
- Technical Findings por categoría
- Security Assessment detallado
- Performance Analysis
- Risk Matrix
- Detailed Recommendations
- Implementation Roadmap
- Appendices con datos técnicos`;

            return await this.analyzeWithEnhancedDualAI(reportPrompt, {
                specialization: 'report_generation',
                analysisType: 'functional_analysis',
                platform: this.analysisResults.platformAnalysis?.detectedPlatform
            });
            
        } catch (error) {
            console.error('❌ REPORT: Error generando reporte:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // ===================================================================
    // MÉTODOS DE API (preservados de la versión anterior)
    // ===================================================================
    
    async callDeepSeekAPI(prompt, context = {}) {
        try {
            const response = await fetch(AI_CONFIG.deepseek.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AI_CONFIG.deepseek.apiKey}`
                },
                body: JSON.stringify({
                    model: AI_CONFIG.deepseek.model,
                    messages: [
                        {
                            role: 'system',
                            content: `Eres un experto en ${context.specialization || 'análisis web'} especializado en ${context.analysisType || 'análisis general'}. Responde SIEMPRE en formato JSON válido.`
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 2000
                })
            });

            if (!response.ok) {
                throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const content = data.choices?.[0]?.message?.content;

            if (!content) {
                throw new Error('No content in DeepSeek response');
            }

            return {
                success: true,
                result: {
                    content: content,
                    model: AI_CONFIG.deepseek.model,
                    usage: data.usage
                }
            };

        } catch (error) {
            console.error('❌ DeepSeek API Error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async callGeminiAPI(prompt, context = {}) {
        try {
            const model = AI_CONFIG.gemini.models[AI_CONFIG.gemini.currentModel];
            const response = await fetch(`${AI_CONFIG.gemini.baseUrl}/${model}:generateContent?key=${AI_CONFIG.gemini.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Como experto en ${context.specialization || 'análisis web'} para ${context.analysisType || 'análisis general'}, ${prompt}\n\nIMPORTANTE: Responde ÚNICAMENTE con JSON válido.`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 2000,
                        topP: 0.8,
                        topK: 40
                    }
                })
            });

            if (!response.ok) {
                if (response.status === 429) {
                    console.log('⚠️ Gemini Pro quota exceeded, switching to Flash...');
                    if (!AI_CONFIG.gemini.fallbackAttempted) {
                        AI_CONFIG.gemini.currentModel = 'flash';
                        AI_CONFIG.gemini.fallbackAttempted = true;
                        return await this.callGeminiAPI(prompt, context);
                    }
                    return {
                        success: false,
                        error: 'Gemini quota exceeded',
                        result: { quotaExceeded: true }
                    };
                }
                throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!content) {
                throw new Error('No content in Gemini response');
            }

            return {
                success: true,
                result: {
                    content: content,
                    model: model,
                    usage: data.usageMetadata
                }
            };

        } catch (error) {
            console.error('❌ Gemini API Error:', error);
            return {
                success: false,
                error: error.message,
                result: { quotaExceeded: error.message.includes('quota') }
            };
        }
    }

    parseAIResponse(apiResult, source, context = {}) {
        if (!apiResult || !apiResult.success) {
            console.error(`❌ PARSER: API call failed for ${source}`);
            return createSafeFallback(source, apiResult?.error || 'API call failed');
        }

        const content = apiResult.result?.content;
        if (!content) {
            console.error(`❌ PARSER: No content from ${source}`);
            return createSafeFallback(source, 'No content received');
        }

        return safeJsonParseImproved(content, source);
    }
}

// ===================================================================
// CLASES DE APOYO v3.4.0 - FRAMEWORK MULTI-AGENTE
// ===================================================================

/**
 * Estrategia de consenso adaptativo
 */
class AdaptiveConsensusStrategy {
    determineConsensus(agentName, confidence, analysisType = 'functional_analysis') {
        const thresholds = CONSENSUS_THRESHOLDS[analysisType] || CONSENSUS_THRESHOLDS.functional_analysis;
        
        // Ajustar confianza por especialización
        let adjustedConfidence = confidence;
        
        const agentExpertise = AGENT_EXPERTISE[agentName] || [];
        const isInExpertise = agentExpertise.some(skill => analysisType.includes(skill));
        
        if (isInExpertise) {
            adjustedConfidence *= 1.15; // +15% bonus por expertise
        }
        
        // Determinar consenso
        if (adjustedConfidence >= thresholds.high) return 'high';
        if (adjustedConfidence >= thresholds.medium) return 'medium';
        if (adjustedConfidence >= thresholds.low) return 'low';
        return 'none';
    }
}

/**
 * Calculadora de confianza ponderada
 */
class WeightedConfidenceCalculator {
    calculateWeightedConfidence(agentResults) {
        if (!agentResults) return 0;
        
        let totalWeightedConfidence = 0;
        let totalWeight = 0;
        let realAgentsCount = 0;

        Object.entries(agentResults).forEach(([agentName, result]) => {
            const weight = AGENT_WEIGHTS[agentName] || 0.1;
            const confidence = result.combined?.confidence || 0;
            const hasRealData = result.combined?.realSuccessCount > 0;
            
            // Solo contar agentes con datos reales o confianza aceptable
            if (hasRealData || confidence > 0.3) {
                let adjustedConfidence = confidence;
                
                // Bonus por consenso dual
                if (result.combined?.realSuccessCount >= 2) {
                    adjustedConfidence *= 1.2; // +20% bonus
                }
                
                // Penalty por usar solo fallbacks
                if (result.dualAnalysis?.deepseek?.fallback && result.dualAnalysis?.gemini?.fallback) {
                    adjustedConfidence *= 0.5; // -50% penalty
                }
                
                totalWeightedConfidence += adjustedConfidence * weight;
                totalWeight += weight;
                realAgentsCount++;
            }
        });

        const baseConfidence = totalWeight > 0 ? totalWeightedConfidence / totalWeight : 0;
        
        // Multiplicador por calidad de datos
        let dataQualityMultiplier = 1.0;
        // Este multiplicador se calculará en el contexto principal
        
        return Math.min(baseConfidence * dataQualityMultiplier, 1.0);
    }
}

/**
 * Analizador específico por plataforma
 */
class PlatformSpecificAnalyzer {
    async analyze(analysisData) {
        try {
            let detectedPlatform = 'unknown';
            let confidence = 0.5;
            const indicators = [];
            
            // Análisis de conexiones
            if (analysisData.connectionData?.connections) {
                analysisData.connectionData.connections.forEach(conn => {
                    for (const [platform, pattern] of Object.entries(PLATFORM_PATTERNS)) {
                        if (pattern.test(conn.url)) {
                            detectedPlatform = platform;
                            confidence = Math.min(confidence + 0.2, 0.9);
                            indicators.push({
                                type: 'connection_url',
                                platform: platform,
                                evidence: conn.url
                            });
                        }
                    }
                });
            }
            
            // Análisis de DOM
            if (analysisData.domData?.metadata?.hostname) {
                for (const [platform, pattern] of Object.entries(PLATFORM_PATTERNS)) {
                    if (pattern.test(analysisData.domData.metadata.hostname)) {
                        if (detectedPlatform === 'unknown' || detectedPlatform === platform) {
                            detectedPlatform = platform;
                            confidence = Math.min(confidence + 0.3, 0.95);
                            indicators.push({
                                type: 'hostname',
                                platform: platform,
                                evidence: analysisData.domData.metadata.hostname
                            });
                        }
                    }
                }
            }
            
            return {
                detectedPlatform: detectedPlatform,
                confidence: confidence,
                indicators: indicators,
                analysis_timestamp: Date.now()
            };
            
        } catch (error) {
            console.error('❌ PLATFORM ANALYZER: Error:', error);
            return {
                detectedPlatform: 'unknown',
                confidence: 0.1,
                indicators: [],
                error: error.message
            };
        }
    }
}

// ===================================================================
// INSTANCIAS GLOBALES v3.4.0
// ===================================================================

// Instancia global del Connection Monitor mejorado
const connectionMonitor = new AdvancedConnectionMonitor();

// Instancia global del sistema Multi-Agente
const multiAgentSystem = new EnhancedMultiAgentIntelligenceSystem();

// ===================================================================
// EVENT LISTENERS Y HANDLERS MEJORADOS v3.4.0
// ===================================================================

/**
 * Manejar mensajes del runtime con funcionalidades v3.4.0
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(`📨 BACKGROUND v3.4.0: Mensaje recibido: ${request.action}`);
    
    switch (request.action) {
        // CONNECTION MONITOR MEJORADO
        case 'startConnectionMonitor':
            (async () => {
                try {
                    const result = await connectionMonitor.start(request.tabId);
                    sendResponse(result);
                } catch (error) {
                    console.error('❌ Error starting connection monitor:', error);
                    sendResponse({ success: false, error: error.message });
                }
            })();
            return true;
            
        case 'stopConnectionMonitor':
            (async () => {
                try {
                    const result = await connectionMonitor.stop();
                    sendResponse(result);
                } catch (error) {
                    console.error('❌ Error stopping connection monitor:', error);
                    sendResponse({ success: false, error: error.message });
                }
            })();
            return true;
            
        case 'getConnectionStatus':
            try {
                const status = connectionMonitor.getStatus();
                sendResponse(status);
            } catch (error) {
                sendResponse({ success: false, error: error.message });
            }
            return true;
            
        case 'forceResetMonitor':
            try {
                connectionMonitor.forceReset();
                sendResponse({ success: true });
            } catch (error) {
                sendResponse({ success: false, error: error.message });
            }
            return true;
            
        // MULTI-AGENT INTELLIGENCE SYSTEM MEJORADO
        case 'runAnalysis':
            (async () => {
                try {
                    // Recopilar datos de análisis
                    const analysisData = await gatherEnhancedAnalysisData(request.tabId, request.connectionData);
                    
                    // Ejecutar análisis multi-agente mejorado
                    const result = await multiAgentSystem.runEnhancedAnalysis(analysisData);
                    sendResponse(result);
                } catch (error) {
                    console.error('❌ Error in enhanced analysis:', error);
                    sendResponse({ success: false, error: error.message });
                }
            })();
            return true;
            
        case 'getLastAnalysis':
            try {
                sendResponse({
                    success: true,
                    data: multiAgentSystem.analysisResults
                });
            } catch (error) {
                sendResponse({ success: false, error: error.message });
            }
            return true;
            
        // HANDLERS ADICIONALES
        case 'dynamicElementDetected':
            try {
                console.log('🔍 DYNAMIC ELEMENT: Elemento detectado:', request.element);
                sendResponse({ success: true, acknowledged: true });
            } catch (error) {
                sendResponse({ success: false, error: error.message });
            }
            return true;
            
        default:
            console.warn('⚠️ BACKGROUND v3.4.0: Acción no reconocida:', request.action);
            sendResponse({ success: false, error: 'Unknown action' });
            return true;
    }
});

// ===================================================================
// FUNCIONES DE UTILIDAD MEJORADAS v3.4.0
// ===================================================================

/**
 * Recopilar datos de análisis mejorados con contexto v3.4.0
 * @param {number} tabId - ID de la pestaña
 * @param {Object} connectionData - Datos de conexión opcionales
 * @returns {Promise<Object>} - Datos recopilados para análisis
 */
async function gatherEnhancedAnalysisData(tabId, connectionData = null) {
    console.log('📊 GATHER DATA v3.4.0: Recopilando datos mejorados...');
    
    try {
        // Obtener información de la pestaña
        const tab = await chrome.tabs.get(tabId);
        console.log('📑 TAB INFO:', tab.title, tab.url);
        
        // Obtener cookies mejorado
        const cookieData = await getEnhancedCookieData(tab.url);
        console.log('🍪 ENHANCED COOKIES:', cookieData.totalCookies, 'cookies capturadas');
        
        // Inyectar y ejecutar análisis DOM mejorado
        const domData = await executeEnhancedDOMAnalysis(tabId);
        console.log('🌐 ENHANCED DOM:', domData.structure?.totalElements || 0, 'elementos analizados');
        
        // Usar datos de conexión proporcionados o actuales del monitor
        const finalConnectionData = connectionData || (connectionMonitor.isActive ? {
            totalConnections: connectionMonitor.connections.length,
            connections: connectionMonitor.connections,
            networkRequests: connectionMonitor.networkRequests,
            sessionId: connectionMonitor.sessionId,
            securityAnalysis: connectionMonitor.securityAnalysis,
            authenticationEvents: connectionMonitor.authenticationEvents,
            criticalHeaders: connectionMonitor.criticalHeaders
        } : null);
        
        console.log('🔗 ENHANCED CONNECTION DATA:', finalConnectionData?.totalConnections || 0, 'conexiones');
        
        return {
            cookieData: cookieData,
            domData: domData,
            connectionData: finalConnectionData,
            tabInfo: {
                id: tabId,
                title: tab.title,
                url: tab.url,
                timestamp: Date.now()
            }
        };
        
    } catch (error) {
        console.error('❌ GATHER DATA: Error recopilando datos:', error);
        throw new Error(`Failed to gather analysis data: ${error.message}`);
    }
}

/**
 * Obtener datos de cookies mejorados v3.4.0
 * @param {string} url - URL de la pestaña
 * @returns {Promise<Object>} - Datos de cookies mejorados
 */
async function getEnhancedCookieData(url) {
    try {
        const cookies = await chrome.cookies.getAll({ url: url });
        console.log(`🍪 ENHANCED COOKIES: ${cookies.length} cookies para ${url}`);
        
        // Análisis avanzado de cookies
        const cookieAnalysis = {
            totalCookies: cookies.length,
            securityAnalysis: {
                secureCookies: cookies.filter(c => c.secure).length,
                httpOnlyCookies: cookies.filter(c => c.httpOnly).length,
                sameSiteCookies: cookies.filter(c => c.sameSite && c.sameSite !== 'unspecified').length,
                sessionCookies: cookies.filter(c => c.session).length,
                persistentCookies: cookies.filter(c => !c.session).length
            },
            domains: [...new Set(cookies.map(c => c.domain))],
            cookiesByDomain: cookies.reduce((acc, cookie) => {
                if (!acc[cookie.domain]) acc[cookie.domain] = [];
                acc[cookie.domain].push(cookie);
                return acc;
            }, {}),
            potentialTokens: cookies.filter(c => 
                c.name.toLowerCase().includes('token') || 
                c.name.toLowerCase().includes('auth') ||
                c.name.toLowerCase().includes('session')
            ),
            timestamp: Date.now()
        };
        
        return cookieAnalysis;
        
    } catch (error) {
        console.error('❌ ENHANCED COOKIES: Error obteniendo cookies:', error);
        return {
            totalCookies: 0,
            error: error.message,
            timestamp: Date.now()
        };
    }
}

/**
 * Ejecutar análisis DOM mejorado v3.4.0
 * @param {number} tabId - ID de la pestaña
 * @returns {Promise<Object>} - Datos DOM analizados
 */
async function executeEnhancedDOMAnalysis(tabId) {
    try {
        console.log('🌐 ENHANCED DOM: Inyectando script de análisis avanzado...');
        
        // Inyectar script avanzado que se ejecuta inmediatamente
        const results = await chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: performEnhancedDOMAnalysis
        });
        
        if (results && results[0] && results[0].result) {
            console.log('✅ ENHANCED DOM: Análisis completado exitosamente');
            return results[0].result;
        } else {
            console.warn('⚠️ ENHANCED DOM: No se obtuvieron resultados');
            return createFallbackDOMData();
        }
        
    } catch (error) {
        console.error('❌ ENHANCED DOM: Error en análisis:', error);
        return createFallbackDOMData(error.message);
    }
}

/**
 * Función que se inyecta para análisis DOM avanzado v3.4.0
 * Esta función se ejecuta en el contexto de la página
 */
function performEnhancedDOMAnalysis() {
    try {
        console.log('🌐 ENHANCED DOM ANALYSIS v3.4.0: Iniciando análisis in-page...');
        
        // Detectar plataforma actual
        const hostname = window.location.hostname.toLowerCase();
        let platform = 'generic';
        
        if (hostname.includes('gemini.google') || hostname.includes('bard.google')) platform = 'gemini';
        else if (hostname.includes('openai.com') || hostname.includes('chat.openai')) platform = 'openai';
        else if (hostname.includes('anthropic.com') || hostname.includes('claude.ai')) platform = 'anthropic';
        else if (hostname.includes('deepseek.com')) platform = 'deepseek';
        else if (hostname.includes('qwen')) platform = 'qwen';
        
        console.log(`🎯 PLATFORM DETECTED: ${platform}`);
        
        // Selectores específicos por plataforma v3.4.0
        const PLATFORM_SELECTORS = {
            gemini: {
                chat_input: 'div[contenteditable="true"], textarea[placeholder*="Enter"], .input-container textarea',
                send_button: 'button[aria-label*="Send"], button[data-testid*="send"], .send-button',
                auth_elements: '[data-ved], [jsaction*="auth"], .gb_Fc, .gb_Fc a',
                api_indicators: '[data-api-key], [data-token], script[src*="googleapis"]',
                session_elements: '[data-session], [jsaction*="session"], .session-info'
            },
            openai: {
                chat_input: '#prompt-textarea, [data-id="root"] textarea, .text-base textarea',
                send_button: '[data-testid="send-button"], button[aria-label*="Send message"]',
                auth_elements: '[data-testid*="auth"], .auth-form, .login-button',
                api_indicators: '[data-api*="key"], .api-key, script[src*="openai"]',
                session_elements: '.session-token, [data-session], .user-session'
            },
            anthropic: {
                chat_input: 'div[contenteditable="true"], textarea[placeholder*="Message"]',
                send_button: 'button[type="submit"], .send-button',
                auth_elements: '.auth-form, [data-auth], .login-form',
                api_indicators: '[data-api], .anthropic-key, script[src*="anthropic"]',
                session_elements: '[data-session], .session-info, .user-info'
            },
            generic: {
                chat_input: 'textarea, div[contenteditable="true"], input[type="text"], .chat-input',
                send_button: 'button[type="submit"], button[aria-label*="send"], .send-button',
                auth_elements: 'form[action*="login"], .login-form, [data-auth], .auth-section',
                api_indicators: '[data-api], [data-key], [data-token], script[src*="api"]',
                session_elements: '[data-session], .session, .user-session, .session-info'
            }
        };
        
        const selectors = PLATFORM_SELECTORS[platform] || PLATFORM_SELECTORS.generic;
        
        // ANÁLISIS ESPECÍFICO POR PLATAFORMA v3.4.0
        const results = {
            platform: platform,
            metadata: {
                url: window.location.href,
                title: document.title,
                hostname: window.location.hostname,
                timestamp: Date.now(),
                userAgent: navigator.userAgent
            },
            
            // ELEMENTOS CRÍTICOS DETECTADOS (MEJORADO)
            critical_elements: {
                chat_inputs: document.querySelectorAll(selectors.chat_input).length,
                send_buttons: document.querySelectorAll(selectors.send_button).length,
                auth_elements: document.querySelectorAll(selectors.auth_elements).length,
                api_indicators: document.querySelectorAll(selectors.api_indicators).length,
                session_elements: document.querySelectorAll(selectors.session_elements).length,
                
                // NUEVOS ELEMENTOS v3.4.0
                forms: document.querySelectorAll('form').length,
                inputs: document.querySelectorAll('input').length,
                buttons: document.querySelectorAll('button').length,
                links: document.querySelectorAll('a').length,
                images: document.querySelectorAll('img').length
            },
            
            // ANÁLISIS DE ESTRUCTURA MEJORADO
            structure: {
                totalElements: document.querySelectorAll('*').length,
                divs: document.querySelectorAll('div').length,
                scripts: document.querySelectorAll('script').length,
                styles: document.querySelectorAll('style, link[rel="stylesheet"]').length,
                iframes: document.querySelectorAll('iframe').length,
                canvas: document.querySelectorAll('canvas').length,
                svg: document.querySelectorAll('svg').length
            },
            
            // DETECCIÓN DE TOKENS Y CLAVES MEJORADA v3.4.0
            security_analysis: {
                potential_tokens: extractAdvancedTokens(),
                localStorage_keys: Object.keys(localStorage),
                sessionStorage_keys: Object.keys(sessionStorage),
                cookies_count: document.cookie.split(';').filter(c => c.trim()).length,
                meta_tags: document.querySelectorAll('meta').length,
                data_attributes: document.querySelectorAll('[data-token], [data-key], [data-auth], [data-session]').length
            },
            
            // ANÁLISIS DE SCRIPTS AVANZADO v3.4.0
            scripts_analysis: analyzeAdvancedScripts(),
            
            // DETECCIÓN DE ENDPOINTS MEJORADA
            embedded_endpoints: findAdvancedEmbeddedEndpoints(),
            
            // NUEVO: Análisis de rendimiento y carga
            performance_analysis: getPerformanceMetrics(),
            
            // NUEVO: Análisis de accesibilidad
            accessibility_analysis: getAccessibilityMetrics()
        };
        
        console.log('✅ ENHANCED DOM ANALYSIS: Completado para plataforma', platform, results);
        return results;
        
    } catch (error) {
        console.error('❌ ENHANCED DOM ANALYSIS: Error:', error);
        return {
            platform: 'error',
            error: error.message,
            metadata: {
                url: window.location.href,
                title: document.title,
                timestamp: Date.now()
            },
            structure: {
                totalElements: document.querySelectorAll('*').length || 0
            }
        };
    }
    
    // FUNCIONES AUXILIARES AVANZADAS v3.4.0
    
    function extractAdvancedTokens() {
        const tokens = [];
        
        try {
            // localStorage tokens
            Object.keys(localStorage).forEach(key => {
                const value = localStorage.getItem(key);
                if (value && (key.toLowerCase().includes('token') || 
                             key.toLowerCase().includes('key') || 
                             key.toLowerCase().includes('auth') ||
                             key.toLowerCase().includes('jwt'))) {
                    tokens.push({
                        source: 'localStorage',
                        key: key,
                        hasValue: value.length > 10,
                        length: value.length,
                        type: 'potential_token',
                        isJWT: value.includes('.') && value.split('.').length === 3
                    });
                }
            });
            
            // sessionStorage tokens
            Object.keys(sessionStorage).forEach(key => {
                const value = sessionStorage.getItem(key);
                if (value && (key.toLowerCase().includes('token') || 
                             key.toLowerCase().includes('key') || 
                             key.toLowerCase().includes('auth'))) {
                    tokens.push({
                        source: 'sessionStorage',
                        key: key,
                        hasValue: value.length > 10,
                        length: value.length,
                        type: 'potential_token',
                        isJWT: value.includes('.') && value.split('.').length === 3
                    });
                }
            });
            
            // Data attributes
            document.querySelectorAll('[data-token], [data-key], [data-auth], [data-session], [data-jwt]').forEach(el => {
                Object.keys(el.dataset).forEach(key => {
                    if (key.toLowerCase().includes('token') || 
                        key.toLowerCase().includes('key') || 
                        key.toLowerCase().includes('auth')) {
                        tokens.push({
                            source: 'DOM_data_attribute',
                            key: key,
                            element: el.tagName.toLowerCase(),
                            type: 'dom_attribute'
                        });
                    }
                });
            });
            
            // Cookies con patrones de token
            if (document.cookie) {
                document.cookie.split(';').forEach(cookie => {
                    const [name, value] = cookie.trim().split('=');
                    if (name && value && (name.toLowerCase().includes('token') || 
                                        name.toLowerCase().includes('auth') ||
                                        name.toLowerCase().includes('session'))) {
                        tokens.push({
                            source: 'cookie',
                            key: name,
                            hasValue: value.length > 10,
                            length: value.length,
                            type: 'cookie_token'
                        });
                    }
                });
            }
            
        } catch (error) {
            console.warn('⚠️ TOKEN EXTRACTION: Error:', error.message);
        }
        
        return tokens;
    }
    
    function analyzeAdvancedScripts() {
        const scriptAnalysis = {
            total_scripts: 0,
            inline_scripts: 0,
            external_scripts: 0,
            api_endpoints_found: [],
            suspicious_patterns: [],
            security_issues: []
        };
        
        try {
            const scripts = document.querySelectorAll('script');
            scriptAnalysis.total_scripts = scripts.length;
            
            scripts.forEach((script, index) => {
                if (script.src) {
                    scriptAnalysis.external_scripts++;
                    
                    // Analizar URLs de scripts externos
                    const src = script.src;
                    if (src.includes('googleapis.com') || 
                        src.includes('openai.com') || 
                        src.includes('anthropic.com')) {
                        scriptAnalysis.api_endpoints_found.push({
                            type: 'external_script',
                            url: src,
                            scriptIndex: index
                        });
                    }
                    
                } else {
                    scriptAnalysis.inline_scripts++;
                    
                    const content = script.textContent || script.innerHTML;
                    if (content) {
                        // Buscar endpoints en contenido
                        const endpointPatterns = [
                            /https?:\/\/[^"'\s]+api[^"'\s]*/gi,
                            /['"`]\/api\/[^'"`]+['"`]/gi,
                            /fetch\s*\(\s*['"`]([^'"`]*api[^'"`]*)['"`]/gi,
                            /XMLHttpRequest[^;]*\.open\s*\(\s*['"`]GET['"`]\s*,\s*['"`]([^'"`]*api[^'"`]*)['"`]/gi
                        ];
                        
                        endpointPatterns.forEach(pattern => {
                            let match;
                            while ((match = pattern.exec(content)) !== null) {
                                scriptAnalysis.api_endpoints_found.push({
                                    type: 'inline_script_endpoint',
                                    url: match[1] || match[0],
                                    scriptIndex: index
                                });
                            }
                        });
                        
                        // Buscar patrones sospechosos
                        const suspiciousPatterns = [
                            { pattern: /Authorization['":\s]*Bearer/gi, risk: 'auth_header' },
                            { pattern: /api[_-]?key['":\s]*['"]/gi, risk: 'api_key_exposure' },
                            { pattern: /token['":\s]*['"]/gi, risk: 'token_exposure' },
                            { pattern: /eval\s*\(/gi, risk: 'code_injection' }
                        ];
                        
                        suspiciousPatterns.forEach(({ pattern, risk }) => {
                            if (pattern.test(content)) {
                                scriptAnalysis.suspicious_patterns.push({
                                    pattern: pattern.source,
                                    risk: risk,
                                    scriptIndex: index
                                });
                            }
                        });
                    }
                }
            });
            
        } catch (error) {
            console.warn('⚠️ SCRIPT ANALYSIS: Error:', error.message);
        }
        
        return scriptAnalysis;
    }
    
    function findAdvancedEmbeddedEndpoints() {
        const endpoints = [];
        
        try {
            // Buscar en meta tags
            document.querySelectorAll('meta[name*="api"], meta[property*="api"], meta[name*="endpoint"]').forEach(meta => {
                endpoints.push({
                    type: 'meta_endpoint',
                    name: meta.getAttribute('name') || meta.getAttribute('property'),
                    content: meta.getAttribute('content'),
                    source: 'meta_tag'
                });
            });
            
            // Buscar en links (especialmente preconnect, dns-prefetch)
            document.querySelectorAll('link[rel="preconnect"], link[rel="dns-prefetch"]').forEach(link => {
                const href = link.getAttribute('href');
                if (href && (href.includes('api') || href.includes('googleapis') || href.includes('openai'))) {
                    endpoints.push({
                        type: 'preconnect_endpoint',
                        url: href,
                        rel: link.getAttribute('rel'),
                        source: 'link_tag'
                    });
                }
            });
            
            // Buscar en forms (action URLs)
            document.querySelectorAll('form[action]').forEach(form => {
                const action = form.getAttribute('action');
                if (action && (action.includes('api') || action.includes('auth') || action.includes('login'))) {
                    endpoints.push({
                        type: 'form_endpoint',
                        url: action,
                        method: form.getAttribute('method') || 'GET',
                        source: 'form_action'
                    });
                }
            });
            
            // Buscar patrones en texto visible (menos común pero útil)
            const textContent = document.body.textContent || '';
            const urlPattern = /https?:\/\/[^\s]+api[^\s]*/gi;
            let match;
            while ((match = urlPattern.exec(textContent)) !== null) {
                endpoints.push({
                    type: 'text_endpoint',
                    url: match[0],
                    source: 'page_text'
                });
            }
            
        } catch (error) {
            console.warn('⚠️ ENDPOINT DETECTION: Error:', error.message);
        }
        
        return endpoints;
    }
    
    function getPerformanceMetrics() {
        try {
            const navigation = performance.getEntriesByType('navigation')[0];
            const paint = performance.getEntriesByType('paint');
            
            return {
                dom_content_loaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
                load_complete: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
                first_paint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
                first_contentful_paint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
                resource_count: performance.getEntriesByType('resource').length,
                memory_usage: performance.memory ? {
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    limit: performance.memory.jsHeapSizeLimit
                } : null
            };
        } catch (error) {
            return { error: error.message };
        }
    }
    
    function getAccessibilityMetrics() {
        try {
            return {
                images_without_alt: document.querySelectorAll('img:not([alt])').length,
                links_without_text: document.querySelectorAll('a:empty').length,
                inputs_without_labels: document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])').length,
                headings_structure: {
                    h1: document.querySelectorAll('h1').length,
                    h2: document.querySelectorAll('h2').length,
                    h3: document.querySelectorAll('h3').length,
                    h4: document.querySelectorAll('h4').length,
                    h5: document.querySelectorAll('h5').length,
                    h6: document.querySelectorAll('h6').length
                },
                aria_attributes: document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]').length,
                tabindex_elements: document.querySelectorAll('[tabindex]').length
            };
        } catch (error) {
            return { error: error.message };
        }
    }
}

/**
 * Crear datos DOM de fallback
 * @param {string} errorMessage - Mensaje de error opcional
 * @returns {Object} - Datos DOM básicos
 */
function createFallbackDOMData(errorMessage = null) {
    return {
        platform: 'fallback',
        error: errorMessage,
        metadata: {
            timestamp: Date.now(),
            url: 'unknown',
            title: 'unknown'
        },
        structure: {
            totalElements: 0
        },
        critical_elements: {
            chat_inputs: 0,
            send_buttons: 0,
            auth_elements: 0,
            api_indicators: 0,
            session_elements: 0
        },
        security_analysis: {
            potential_tokens: [],
            localStorage_keys: [],
            sessionStorage_keys: []
        },
        fallback_generated: true
    };
}

// ===================================================================
// INICIALIZACIÓN v3.4.0 
// ===================================================================

console.log('✅ WEBSCRAPING INTELLIGENCE SUITE v3.4.0: Sistema Multi-Agente completamente inicializado');
console.log('🎯 MEJORAS IMPLEMENTADAS:');
console.log('   • Connection Monitor con captura multi-protocolo completa');
console.log('   • Sistema de métricas ponderado por especialización de agentes');
console.log('   • Consenso adaptativo con resolución inteligente de conflictos');
console.log('   • Análisis específico por plataforma (Gemini, OpenAI, Anthropic, etc.)');
console.log('   • Detección avanzada de elementos DOM críticos');
console.log('   • Análisis de seguridad proactivo y scoring de riesgo');
console.log('   • Framework Multi-Agente de nivel Enterprise');

// Performance monitoring
const initEndTime = performance.now();
console.log(`🚀 INIT TIME: Background v3.4.0 inicializado en ${Math.round(initEndTime)}ms`);