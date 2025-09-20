console.log('🚀 WebScraping Intelligence Suite Enterprise v3.4.0 - POPUP FRAMEWORK MULTI-AGENTE');

// ===================================================================
// POPUP.JS v3.4.0 - ENTERPRISE MULTI-AGENT FRAMEWORK COMPLETO
// ===================================================================

/**
 * WebScraping Intelligence Suite - Popup Script v3.4.0 Enterprise
 * ARQUITECTURA ENTERPRISE COMPLETA - Framework Multi-Agente
 * 
 * MEJORAS ENTERPRISE v3.4.0:
 * - State Management persistente con Observer pattern
 * - Real-time Dashboard para 235+ conexiones monitoreadas
 * - Component-based architecture con Web Components
 * - Multi-Agent Status visualization (8 agentes)
 * - Platform-specific UI adaptation (Gemini/OpenAI/Anthropic)
 * - Advanced export system (JSON, CSV, PDF, XLSX)
 * - Circuit breaker pattern para error handling
 * - Performance monitoring con métricas Enterprise
 * - Keyboard shortcuts system avanzado
 * - Theme management con persistencia
 * - Notification system con toast notifications
 * - Modal management system
 * - Connection Monitor con real-time updates
 * - Agent Status con confidence tracking
 * - Tab system con navigation management
 * 
 * @author Framework Multi-Agente Development Team
 * @version 3.4.0
 * @date 2025-09-20
 */

// ===================================================================
// CONFIGURACIÓN ENTERPRISE v3.4.0
// ===================================================================

/**
 * Configuración principal del sistema Enterprise
 */
const ENTERPRISE_CONFIG = {
    version: '3.4.0',
    name: 'WebScraping Intelligence Suite Enterprise',
    
    // UI Configuration
    ui: {
        themes: {
            light: {
                primary: '#2563eb',
                secondary: '#64748b',
                success: '#059669',
                warning: '#d97706',
                error: '#dc2626',
                background: '#ffffff',
                surface: '#f8fafc',
                text: '#1e293b'
            },
            dark: {
                primary: '#3b82f6',
                secondary: '#94a3b8',
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
                background: '#0f172a',
                surface: '#1e293b',
                text: '#f1f5f9'
            }
        },
        animations: {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            stagger: 50
        },
        layout: {
            maxWidth: '800px',
            minHeight: '600px',
            padding: '16px',
            borderRadius: '12px'
        }
    },
    
    // Performance thresholds
    performance: {
        maxRenderTime: 16, // 60fps
        maxMemoryUsage: 50 * 1024 * 1024, // 50MB
        maxConnections: 1000,
        updateInterval: 1000 // 1 second
    },
    
    // Export configurations
    export: {
        formats: ['json', 'csv', 'pdf', 'xlsx'],
        maxFileSize: 10 * 1024 * 1024, // 10MB
        compression: true
    },
    
    // Platform configurations
    platforms: {
        gemini: { color: '#4285f4', icon: '🔷' },
        openai: { color: '#10a37f', icon: '🤖' },
        anthropic: { color: '#d97706', icon: '🧑‍🔬' },
        deepseek: { color: '#7c3aed', icon: '🔮' },
        qwen: { color: '#f59e0b', icon: '🌟' },
        generic: { color: '#6b7280', icon: '⚡' }
    }
};

/**
 * Estado de agentes Multi-AI
 */
const AGENT_DEFINITIONS = [
    { id: 'domAnalyst', name: 'DOM Analyst', specialty: 'DOM Intelligence', icon: '🔍' },
    { id: 'securityExpert', name: 'Security Expert', specialty: 'Security Analysis', icon: '🛡️' },
    { id: 'authenticationHunter', name: 'Authentication Hunter', specialty: 'Auth Detection', icon: '🔐' },
    { id: 'apiDiscoveryAgent', name: 'API Discovery Agent', specialty: 'API Analysis', icon: '🔗' },
    { id: 'networkAnalyzer', name: 'Network Analyzer', specialty: 'Network Monitoring', icon: '📡' },
    { id: 'vulnerabilityScanner', name: 'Vulnerability Scanner', specialty: 'Security Scanning', icon: '🔬' },
    { id: 'dataAnalyst', name: 'Data Analyst', specialty: 'Data Processing', icon: '📊' },
    { id: 'synthesisCoordinator', name: 'Synthesis Coordinator', specialty: 'Result Synthesis', icon: '🧠' }
];

// ===================================================================
// 🏗️ STATE MANAGER - ENTERPRISE PATTERN
// ===================================================================

/**
 * Gestor de estado centralizado con persistencia y Observer pattern
 * Implementa Singleton pattern para gestión global de estado
 */
class EnterpriseStateManager {
    constructor() {
        if (EnterpriseStateManager.instance) {
            return EnterpriseStateManager.instance;
        }

        this.state = {
            // Application state
            isInitialized: false,
            currentView: 'dashboard',
            theme: 'dark',
            
            // Connection Monitor state
            connectionMonitor: {
                isActive: false,
                connectionCount: 0,
                connections: [],
                startTime: null,
                duration: 0
            },
            
            // Multi-Agent state
            agents: this.initializeAgentStates(),
            analysis: {
                isRunning: false,
                results: null,
                confidence: 0,
                platform: 'unknown',
                timestamp: null
            },
            
            // Performance metrics
            performance: {
                memoryUsage: 0,
                renderTime: 0,
                lastUpdate: Date.now()
            },
            
            // UI state
            ui: {
                activeTab: 'dashboard',
                sidebarCollapsed: false,
                notifications: [],
                modal: null
            },
            
            // Persistent data
            history: [],
            preferences: {},
            cache: new Map()
        };

        this.observers = new Map();
        this.persistenceEnabled = true;
        this.storageKey = 'webscraping_suite_state_v3_4_0';

        EnterpriseStateManager.instance = this;
        console.log('🧠 STATE MANAGER: Initialized Enterprise State Manager v3.4.0');
    }

    /**
     * Inicializar estados de agentes
     */
    initializeAgentStates() {
        const agentStates = {};
        AGENT_DEFINITIONS.forEach(agent => {
            agentStates[agent.id] = {
                ...agent,
                status: 'idle',
                confidence: 0,
                lastUpdate: null,
                provider: 'deepseek',
                isActive: false,
                results: null,
                errors: 0
            };
        });
        return agentStates;
    }

    /**
     * Suscribir observer al estado
     */
    subscribe(key, callback) {
        try {
            if (!this.observers.has(key)) {
                this.observers.set(key, new Set());
            }
            
            this.observers.get(key).add(callback);
            
            // Return unsubscribe function
            return () => {
                this.observers.get(key)?.delete(callback);
            };
        } catch (error) {
            console.error('❌ STATE MANAGER: Error subscribing observer:', error);
            return () => {};
        }
    }

    /**
     * Obtener valor del estado
     */
    get(path) {
        try {
            return path.split('.').reduce((obj, key) => obj?.[key], this.state);
        } catch (error) {
            console.warn('⚠️ STATE MANAGER: Error getting state path:', path, error);
            return null;
        }
    }

    /**
     * Establecer valor del estado y notificar observers
     */
    set(path, value, persist = true) {
        try {
            const keys = path.split('.');
            const lastKey = keys.pop();
            const target = keys.reduce((obj, key) => obj[key], this.state);

            if (target && lastKey) {
                const oldValue = target[lastKey];
                target[lastKey] = value;

                // Notify observers
                this.notifyObservers(path, value, oldValue);

                // Persist state if enabled
                if (persist && this.persistenceEnabled) {
                    this.persistState();
                }
                
                console.log(`📊 STATE UPDATE: ${path} =`, value);
            }

        } catch (error) {
            console.error('❌ STATE MANAGER: Error setting state:', path, error);
        }
    }

    /**
     * Actualizar múltiples valores de estado de manera eficiente
     */
    updateMultiple(updates, persist = true) {
        try {
            Object.entries(updates).forEach(([path, value]) => {
                this.set(path, value, false); // Don't persist individual updates
            });

            if (persist && this.persistenceEnabled) {
                this.persistState();
            }

        } catch (error) {
            console.error('❌ STATE MANAGER: Error updating multiple states:', error);
        }
    }

    /**
     * Notificar observers de cambios en el estado
     */
    notifyObservers(path, newValue, oldValue) {
        try {
            // Notify exact path observers
            if (this.observers.has(path)) {
                this.observers.get(path).forEach(callback => {
                    try {
                        callback(newValue, oldValue, path);
                    } catch (error) {
                        console.error('❌ OBSERVER: Error in callback:', error);
                    }
                });
            }

            // Notify parent path observers
            const pathParts = path.split('.');
            for (let i = 1; i < pathParts.length; i++) {
                const parentPath = pathParts.slice(0, i).join('.');
                if (this.observers.has(parentPath)) {
                    const parentValue = this.get(parentPath);
                    this.observers.get(parentPath).forEach(callback => {
                        try {
                            callback(parentValue, undefined, parentPath);
                        } catch (error) {
                            console.error('❌ PARENT OBSERVER: Error in callback:', error);
                        }
                    });
                }
            }
        } catch (error) {
            console.error('❌ STATE MANAGER: Error notifying observers:', error);
        }
    }

    /**
     * Persistir estado en chrome.storage
     */
    async persistState() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage) {
                // Only persist essential data, not cache or temporary state
                const persistentState = {
                    currentView: this.state.currentView,
                    theme: this.state.theme,
                    preferences: this.state.preferences,
                    history: this.state.history.slice(-50), // Keep last 50 entries
                    ui: {
                        activeTab: this.state.ui.activeTab,
                        sidebarCollapsed: this.state.ui.sidebarCollapsed
                    }
                };

                await chrome.storage.local.set({ [this.storageKey]: persistentState });
                console.log('💾 STATE MANAGER: State persisted successfully');
            }
        } catch (error) {
            console.error('❌ STATE MANAGER: Error persisting state:', error);
        }
    }

    /**
     * Restaurar estado desde chrome.storage
     */
    async restoreState() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage) {
                const stored = await chrome.storage.local.get(this.storageKey);
                const persistentState = stored[this.storageKey];

                if (persistentState) {
                    // Merge with current state
                    this.state = {
                        ...this.state,
                        ...persistentState,
                        // Override with current runtime state
                        isInitialized: false,
                        connectionMonitor: { ...this.state.connectionMonitor },
                        analysis: { ...this.state.analysis },
                        performance: { ...this.state.performance }
                    };
                    console.log('📥 STATE MANAGER: State restored from storage');
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('❌ STATE MANAGER: Error restoring state:', error);
            return false;
        }
    }

    /**
     * Obtener información de debug
     */
    getDebugInfo() {
        return {
            state: JSON.parse(JSON.stringify(this.state)),
            observers: Array.from(this.observers.keys()),
            observerCounts: Object.fromEntries(
                Array.from(this.observers.entries()).map(([key, set]) => [key, set.size])
            )
        };
    }

    /**
     * Limpiar estado y observers
     */
    cleanup() {
        try {
            this.observers.clear();
            this.state.cache.clear();
            console.log('🧹 STATE MANAGER: Cleanup completed');
        } catch (error) {
            console.error('❌ STATE MANAGER: Error during cleanup:', error);
        }
    }
}

// ===================================================================
// 🔌 BACKGROUND COMMUNICATOR - ADVANCED MESSAGING
// ===================================================================

/**
 * Comunicador avanzado con background script
 * Implementa Circuit Breaker pattern para error handling
 */
class BackgroundCommunicator {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this.messageQueue = [];
        this.isConnected = false;
        this.connectionAttempts = 0;
        this.maxRetries = 5;
        this.retryDelay = 1000;
        this.circuitBreakerState = 'closed'; // closed, open, half-open
        this.failureCount = 0;
        this.failureThreshold = 3;
        this.recoveryTimeout = 30000;
        
        this.setupMessageListener();
        console.log('🔌 BACKGROUND COMMUNICATOR: Initialized with Circuit Breaker');
    }

    /**
     * Configurar listener de mensajes del background
     */
    setupMessageListener() {
        try {
            if (typeof chrome !== 'undefined' && chrome.runtime) {
                chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                    this.handleBackgroundMessage(message, sender, sendResponse);
                    return true; // Keep message channel open
                });
                console.log('✅ MESSAGE LISTENER: Configured for background messages');
            }
        } catch (error) {
            console.error('❌ MESSAGE LISTENER: Setup failed:', error);
        }
    }

    /**
     * Manejar mensajes del background script
     */
    handleBackgroundMessage(message, sender, sendResponse) {
        try {
            console.log('📨 BACKGROUND MESSAGE:', message.action, message);

            switch (message.action) {
                case 'connectionUpdate':
                    this.handleConnectionUpdate(message.data);
                    break;
                case 'analysisComplete':
                    this.handleAnalysisComplete(message.data);
                    break;
                case 'agentStatusUpdate':
                    this.handleAgentStatusUpdate(message.data);
                    break;
                case 'performanceMetrics':
                    this.handlePerformanceMetrics(message.data);
                    break;
                case 'error':
                    this.handleBackgroundError(message.data);
                    break;
                default:
                    console.warn('⚠️ BACKGROUND MESSAGE: Unknown action:', message.action);
            }

            sendResponse({ success: true, timestamp: Date.now() });

        } catch (error) {
            console.error('❌ BACKGROUND MESSAGE: Handler error:', error);
            sendResponse({ success: false, error: error.message });
        }
    }

    /**
     * Manejar actualización de conexiones
     */
    handleConnectionUpdate(data) {
        try {
            this.stateManager.updateMultiple({
                'connectionMonitor.connectionCount': data.count || 0,
                'connectionMonitor.connections': data.connections || [],
                'connectionMonitor.duration': data.duration || 0,
                'connectionMonitor.isActive': data.isActive || false
            });
            console.log('📊 CONNECTION UPDATE: Processed', data.count, 'connections');
        } catch (error) {
            console.error('❌ CONNECTION UPDATE: Error:', error);
        }
    }

    /**
     * Manejar análisis completado
     */
    handleAnalysisComplete(data) {
        try {
            this.stateManager.updateMultiple({
                'analysis.isRunning': false,
                'analysis.results': data.results || null,
                'analysis.confidence': data.confidence || 0,
                'analysis.platform': data.platform || 'unknown',
                'analysis.timestamp': Date.now()
            });

            // Add to history
            const currentHistory = this.stateManager.get('history') || [];
            currentHistory.push({
                id: Date.now(),
                timestamp: Date.now(),
                platform: data.platform,
                confidence: data.confidence,
                results: data.results
            });
            this.stateManager.set('history', currentHistory.slice(-50)); // Keep last 50

            console.log('✅ ANALYSIS COMPLETE: Results processed for', data.platform);
        } catch (error) {
            console.error('❌ ANALYSIS COMPLETE: Error:', error);
        }
    }

    /**
     * Manejar actualización de estado de agentes
     */
    handleAgentStatusUpdate(data) {
        try {
            if (data.agents) {
                Object.entries(data.agents).forEach(([agentId, agentData]) => {
                    this.stateManager.updateMultiple({
                        [`agents.${agentId}.status`]: agentData.status || 'idle',
                        [`agents.${agentId}.confidence`]: agentData.confidence || 0,
                        [`agents.${agentId}.lastUpdate`]: Date.now(),
                        [`agents.${agentId}.provider`]: agentData.provider || 'deepseek',
                        [`agents.${agentId}.isActive`]: agentData.isActive || false,
                        [`agents.${agentId}.results`]: agentData.results || null
                    });
                });
            }
            
            console.log('🤖 AGENT UPDATE: Status updated for', Object.keys(data.agents || {}).length, 'agents');
        } catch (error) {
            console.error('❌ AGENT UPDATE: Error:', error);
        }
    }

    /**
     * Manejar métricas de performance
     */
    handlePerformanceMetrics(data) {
        try {
            this.stateManager.updateMultiple({
                'performance.memoryUsage': data.memoryUsage || 0,
                'performance.renderTime': data.renderTime || 0,
                'performance.lastUpdate': Date.now()
            });
        } catch (error) {
            console.error('❌ PERFORMANCE METRICS: Error:', error);
        }
    }

    /**
     * Manejar errores del background
     */
    handleBackgroundError(data) {
        try {
            console.error('❌ BACKGROUND ERROR:', data);
            this.failureCount++;

            // Update circuit breaker state
            if (this.failureCount >= this.failureThreshold && this.circuitBreakerState === 'closed') {
                this.circuitBreakerState = 'open';
                console.warn('⚠️ CIRCUIT BREAKER: Opened due to failures');

                // Set recovery timer
                setTimeout(() => {
                    this.circuitBreakerState = 'half-open';
                    this.failureCount = 0;
                    console.log('🔄 CIRCUIT BREAKER: Set to half-open');
                }, this.recoveryTimeout);
            }
        } catch (error) {
            console.error('❌ BACKGROUND ERROR HANDLER: Error:', error);
        }
    }

    /**
     * Enviar mensaje al background con Circuit Breaker
     */
    async sendMessage(action, data = {}) {
        try {
            // Check circuit breaker
            if (this.circuitBreakerState === 'open') {
                throw new Error('Circuit breaker is open - service temporarily unavailable');
            }

            if (typeof chrome === 'undefined' || !chrome.runtime) {
                throw new Error('Chrome runtime not available');
            }

            const message = {
                action,
                data,
                timestamp: Date.now(),
                source: 'popup'
            };

            console.log('📤 SENDING MESSAGE:', action, data);
            const response = await chrome.runtime.sendMessage(message);

            if (response && response.success) {
                // Success - reset failure count if circuit breaker is half-open
                if (this.circuitBreakerState === 'half-open') {
                    this.circuitBreakerState = 'closed';
                    this.failureCount = 0;
                    console.log('✅ CIRCUIT BREAKER: Closed - service recovered');
                }

                return response;
            } else {
                throw new Error(response?.error || 'Unknown error from background');
            }

        } catch (error) {
            console.error('❌ SEND MESSAGE: Error:', error);
            this.failureCount++;

            // Implement exponential backoff retry
            if (this.connectionAttempts < this.maxRetries) {
                this.connectionAttempts++;
                const delay = this.retryDelay * Math.pow(2, this.connectionAttempts - 1);
                console.log(`🔄 RETRY: Attempt ${this.connectionAttempts} in ${delay}ms`);

                return new Promise((resolve, reject) => {
                    setTimeout(async () => {
                        try {
                            const result = await this.sendMessage(action, data);
                            this.connectionAttempts = 0; // Reset on success
                            resolve(result);
                        } catch (retryError) {
                            reject(retryError);
                        }
                    }, delay);
                });
            } else {
                this.connectionAttempts = 0;
                throw error;
            }
        }
    }

    /**
     * Verificar estado de conexión con background
     */
    async checkConnection() {
        try {
            const response = await this.sendMessage('ping');
            this.isConnected = response.success;
            return this.isConnected;
        } catch (error) {
            this.isConnected = false;
            return false;
        }
    }

    /**
     * Obtener información de diagnóstico
     */
    getDiagnosticInfo() {
        return {
            isConnected: this.isConnected,
            circuitBreakerState: this.circuitBreakerState,
            failureCount: this.failureCount,
            connectionAttempts: this.connectionAttempts,
            messageQueueLength: this.messageQueue.length
        };
    }
}

// ===================================================================
// 🎨 UI COMPONENTS MANAGER - WEB COMPONENTS SYSTEM
// ===================================================================

/**
 * Gestor de componentes UI con Web Components nativos
 * Implementa Factory pattern para creación de componentes específicos
 */
class UIComponentsManager {
    constructor(stateManager, communicator) {
        this.stateManager = stateManager;
        this.communicator = communicator;
        this.components = new Map();
        this.rootContainer = null;
        
        this.setupEventDelegation();
        console.log('🎨 UI COMPONENTS: Initialized Web Components System');
    }

    /**
     * Configurar delegación de eventos global
     */
    setupEventDelegation() {
        try {
            document.addEventListener('click', this.handleGlobalClick.bind(this));
            document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
            
            // Setup keyboard shortcuts
            this.setupKeyboardShortcuts();
            
            console.log('⌨️ EVENT DELEGATION: Global event handlers setup');
        } catch (error) {
            console.error('❌ EVENT DELEGATION: Setup failed:', error);
        }
    }

    /**
     * Configurar atajos de teclado
     */
    setupKeyboardShortcuts() {
        try {
            const shortcuts = {
                'ctrl+shift+a': () => this.startAnalysis(),
                'ctrl+shift+m': () => this.toggleConnectionMonitor(),
                'ctrl+shift+s': () => this.openSidePanel(),
                'ctrl+shift+e': () => this.quickExport(),
                'escape': () => this.handleEscape()
            };

            document.addEventListener('keydown', (event) => {
                const key = this.getShortcutKey(event);
                if (shortcuts[key]) {
                    event.preventDefault();
                    shortcuts[key]();
                }
            });

            console.log('⌨️ KEYBOARD SHORTCUTS: Configured', Object.keys(shortcuts).length, 'shortcuts');
        } catch (error) {
            console.error('❌ KEYBOARD SHORTCUTS: Setup failed:', error);
        }
    }

    /**
     * Obtener clave de atajo desde evento
     */
    getShortcutKey(event) {
        const parts = [];
        if (event.ctrlKey || event.metaKey) parts.push('ctrl');
        if (event.altKey) parts.push('alt');
        if (event.shiftKey) parts.push('shift');
        parts.push(event.key.toLowerCase());
        return parts.join('+');
    }

    /**
     * Manejar clicks globales
     */
    handleGlobalClick(event) {
        try {
            const actionTarget = event.target.closest('[data-action]');
            if (actionTarget) {
                const action = actionTarget.dataset.action;
                const data = JSON.parse(actionTarget.dataset.data || '{}');
                this.handleAction(action, data, event);
                return;
            }

            const tabTarget = event.target.closest('[data-tab]');
            if (tabTarget) {
                const tabId = tabTarget.dataset.tab;
                this.switchTab(tabId);
                return;
            }

            const modalTarget = event.target.closest('[data-modal]');
            if (modalTarget) {
                const modalId = modalTarget.dataset.modal;
                this.openModal(modalId);
                return;
            }
        } catch (error) {
            console.error('❌ GLOBAL CLICK: Handler error:', error);
        }
    }

    /**
     * Manejar teclas globales
     */
    handleGlobalKeydown(event) {
        try {
            // Handle modal close with Escape
            if (event.key === 'Escape') {
                this.handleEscape();
            }
        } catch (error) {
            console.error('❌ GLOBAL KEYDOWN: Handler error:', error);
        }
    }

    /**
     * Manejar acciones de componentes
     */
    async handleAction(action, data = {}, event = null) {
        try {
            console.log('🎬 ACTION:', action, data);

            switch (action) {
                case 'start-analysis':
                    await this.startAnalysis();
                    break;
                case 'toggle-connection-monitor':
                    await this.toggleConnectionMonitor();
                    break;
                case 'export-results':
                    await this.exportResults(data.format || 'json');
                    break;
                case 'clear-history':
                    this.clearHistory();
                    break;
                case 'toggle-theme':
                    this.toggleTheme();
                    break;
                case 'toggle-sidebar':
                    this.toggleSidebar();
                    break;
                case 'open-sidepanel':
                    this.openSidePanel();
                    break;
                case 'close-modal':
                    this.closeModal();
                    break;
                case 'refresh-connections':
                    await this.refreshConnections();
                    break;
                case 'toggle-auto-analysis':
                    this.toggleAutoAnalysis();
                    break;
                case 'toggle-notifications':
                    this.toggleNotifications();
                    break;
                case 'toggle-debug':
                    this.toggleDebug();
                    break;
                case 'toggle-auto-monitor':
                    this.toggleAutoMonitor();
                    break;
                default:
                    console.warn('⚠️ ACTION: Unknown action:', action);
            }

        } catch (error) {
            console.error('❌ ACTION HANDLER: Error:', error);
            this.showNotification('Error executing action: ' + error.message, 'error');
        }
    }

    /**
     * Cambiar pestaña activa
     */
    switchTab(tabId) {
        try {
            // Hide all tab contents
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Remove active class from all nav items
            const navItems = document.querySelectorAll('[data-tab]');
            navItems.forEach(item => {
                item.classList.remove('active');
            });

            // Show selected tab
            const selectedContent = document.getElementById(`${tabId}-tab`);
            if (selectedContent) {
                selectedContent.classList.remove('hidden');
            }

            // Add active class to selected nav item
            const selectedNav = document.querySelector(`[data-tab="${tabId}"]`);
            if (selectedNav) {
                selectedNav.classList.add('active');
            }

            // Update state
            this.stateManager.set('ui.activeTab', tabId);

            console.log('📑 TAB SWITCH:', tabId);
        } catch (error) {
            console.error('❌ SWITCH TAB: Error:', error);
        }
    }

    /**
     * Iniciar análisis Multi-Agent
     */
    async startAnalysis() {
        try {
            this.stateManager.set('analysis.isRunning', true);
            this.updateAnalysisUI(true);
            this.showNotification('Starting Multi-Agent analysis...', 'info');

            const response = await this.communicator.sendMessage('startAnalysis', {
                includeConnectionMonitor: this.stateManager.get('connectionMonitor.isActive'),
                platform: 'auto-detect'
            });

            if (response.success) {
                this.showNotification('Analysis started successfully', 'success');
            } else {
                throw new Error(response.error || 'Analysis failed to start');
            }

        } catch (error) {
            console.error('❌ START ANALYSIS: Error:', error);
            this.stateManager.set('analysis.isRunning', false);
            this.updateAnalysisUI(false);
            this.showNotification('Failed to start analysis: ' + error.message, 'error');
        }
    }

    /**
     * Alternar Connection Monitor
     */
    async toggleConnectionMonitor() {
        try {
            const isActive = this.stateManager.get('connectionMonitor.isActive');
            const newState = !isActive;

            const response = await this.communicator.sendMessage('toggleConnectionMonitor', {
                enable: newState
            });

            if (response.success) {
                this.stateManager.set('connectionMonitor.isActive', newState);
                this.updateConnectionMonitorUI(newState);
                this.showNotification(
                    `Connection Monitor ${newState ? 'started' : 'stopped'}`,
                    'success'
                );
            } else {
                throw new Error(response.error || 'Failed to toggle Connection Monitor');
            }

        } catch (error) {
            console.error('❌ TOGGLE CONNECTION MONITOR: Error:', error);
            this.showNotification('Failed to toggle Connection Monitor: ' + error.message, 'error');
        }
    }

    /**
     * Exportar resultados en formato específico
     */
    async exportResults(format = 'json') {
        try {
            const results = this.stateManager.get('analysis.results');
            const connections = this.stateManager.get('connectionMonitor.connections');

            if (!results && (!connections || connections.length === 0)) {
                throw new Error('No data available for export');
            }

            this.showNotification(`Exporting results as ${format.toUpperCase()}...`, 'info');

            const exportData = {
                metadata: {
                    timestamp: Date.now(),
                    version: ENTERPRISE_CONFIG.version,
                    format: format
                },
                analysis: results,
                connections: connections,
                agents: this.stateManager.get('agents')
            };

            const response = await this.communicator.sendMessage('exportResults', {
                data: exportData,
                format: format
            });

            if (response.success && response.downloadUrl) {
                // Create download link
                const link = document.createElement('a');
                link.href = response.downloadUrl;
                link.download = `webscraping-analysis-${Date.now()}.${format}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                this.showNotification('Export successful', 'success');
            } else {
                throw new Error(response.error || 'Export failed');
            }

        } catch (error) {
            console.error('❌ EXPORT RESULTS: Error:', error);
            this.showNotification('Export failed: ' + error.message, 'error');
        }
    }

    /**
     * Limpiar historial
     */
    clearHistory() {
        try {
            this.stateManager.set('history', []);
            this.showNotification('History cleared', 'info');
        } catch (error) {
            console.error('❌ CLEAR HISTORY: Error:', error);
        }
    }

    /**
     * Cambiar tema de la aplicación
     */
    toggleTheme() {
        try {
            const currentTheme = this.stateManager.get('theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            this.stateManager.set('theme', newTheme);
            this.applyTheme(newTheme);
            this.showNotification(`Switched to ${newTheme} theme`, 'info');

            console.log('🎨 THEME: Changed to', newTheme);
        } catch (error) {
            console.error('❌ TOGGLE THEME: Error:', error);
        }
    }

    /**
     * Aplicar tema a la interfaz
     */
    applyTheme(theme) {
        try {
            const themeConfig = ENTERPRISE_CONFIG.ui.themes[theme];
            if (!themeConfig) return;

            const root = document.documentElement;
            Object.entries(themeConfig).forEach(([property, value]) => {
                root.style.setProperty(`--color-${property}`, value);
            });

            document.documentElement.className = `theme-${theme}`;
        } catch (error) {
            console.error('❌ APPLY THEME: Error:', error);
        }
    }

    /**
     * Alternar sidebar
     */
    toggleSidebar() {
        try {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
                const isCollapsed = sidebar.classList.contains('collapsed');
                this.stateManager.set('ui.sidebarCollapsed', isCollapsed);
            }
        } catch (error) {
            console.error('❌ TOGGLE SIDEBAR: Error:', error);
        }
    }

    /**
     * Abrir side panel
     */
    openSidePanel() {
        try {
            if (chrome && chrome.sidePanel) {
                chrome.sidePanel.open({ windowId: chrome.windows.WINDOW_ID_CURRENT });
                this.showNotification('Opening side panel...', 'info');
            } else {
                this.showNotification('Side panel not available', 'warning');
            }
        } catch (error) {
            console.error('❌ OPEN SIDE PANEL: Error:', error);
            this.showNotification('Failed to open side panel', 'error');
        }
    }

    /**
     * Abrir modal
     */
    openModal(modalId) {
        try {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                this.stateManager.set('ui.modal', modalId);
                
                // Focus first focusable element
                const focusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusable) {
                    focusable.focus();
                }
            }
        } catch (error) {
            console.error('❌ OPEN MODAL: Error:', error);
        }
    }

    /**
     * Cerrar modal activo
     */
    closeModal() {
        try {
            const activeModalId = this.stateManager.get('ui.modal');
            if (activeModalId) {
                const modal = document.getElementById(activeModalId);
                if (modal) {
                    modal.classList.remove('active');
                }
                this.stateManager.set('ui.modal', null);
            }
        } catch (error) {
            console.error('❌ CLOSE MODAL: Error:', error);
        }
    }

    /**
     * Manejar tecla Escape
     */
    handleEscape() {
        try {
            const activeModal = this.stateManager.get('ui.modal');
            if (activeModal) {
                this.closeModal();
            }
        } catch (error) {
            console.error('❌ HANDLE ESCAPE: Error:', error);
        }
    }

    /**
     * Refrescar conexiones
     */
    async refreshConnections() {
        try {
            this.showNotification('Refreshing connections...', 'info');

            const response = await this.communicator.sendMessage('getConnections');

            if (response.success && response.data) {
                this.stateManager.updateMultiple({
                    'connectionMonitor.connections': response.data.connections || [],
                    'connectionMonitor.connectionCount': response.data.connections?.length || 0
                });
                
                this.updateConnectionsDisplay(response.data);
                this.showNotification('Connections refreshed', 'success');
            } else {
                throw new Error(response.error || 'Failed to refresh connections');
            }
        } catch (error) {
            console.error('❌ REFRESH CONNECTIONS: Error:', error);
            this.showNotification('Failed to refresh connections', 'error');
        }
    }

    /**
     * Exportación rápida (atajo de teclado)
     */
    async quickExport() {
        try {
            await this.exportResults('json');
        } catch (error) {
            console.error('❌ QUICK EXPORT: Error:', error);
        }
    }

    /**
     * Toggle auto-analysis
     */
    toggleAutoAnalysis() {
        try {
            const current = this.stateManager.get('preferences.autoAnalysis') || false;
            const newState = !current;
            this.stateManager.set('preferences.autoAnalysis', newState);
            this.showNotification(`Auto-analysis ${newState ? 'enabled' : 'disabled'}`, 'info');
        } catch (error) {
            console.error('❌ TOGGLE AUTO ANALYSIS: Error:', error);
        }
    }

    /**
     * Toggle notifications
     */
    toggleNotifications() {
        try {
            const current = this.stateManager.get('preferences.notifications') || true;
            const newState = !current;
            this.stateManager.set('preferences.notifications', newState);
            this.showNotification(`Notifications ${newState ? 'enabled' : 'disabled'}`, 'info');
        } catch (error) {
            console.error('❌ TOGGLE NOTIFICATIONS: Error:', error);
        }
    }

    /**
     * Toggle debug mode
     */
    toggleDebug() {
        try {
            const current = this.stateManager.get('preferences.debug') || false;
            const newState = !current;
            this.stateManager.set('preferences.debug', newState);
            this.showNotification(`Debug mode ${newState ? 'enabled' : 'disabled'}`, 'info');
        } catch (error) {
            console.error('❌ TOGGLE DEBUG: Error:', error);
        }
    }

    /**
     * Toggle auto-monitor
     */
    toggleAutoMonitor() {
        try {
            const current = this.stateManager.get('preferences.autoMonitor') || false;
            const newState = !current;
            this.stateManager.set('preferences.autoMonitor', newState);
            this.showNotification(`Auto-monitor ${newState ? 'enabled' : 'disabled'}`, 'info');
        } catch (error) {
            console.error('❌ TOGGLE AUTO MONITOR: Error:', error);
        }
    }

    /**
     * Actualizar UI del análisis
     */
    updateAnalysisUI(isRunning) {
        try {
            const startBtn = document.getElementById('start-analysis-btn');
            if (startBtn) {
                const spinner = startBtn.querySelector('.loading-spinner');
                const text = startBtn.querySelector('.btn-text');
                
                if (isRunning) {
                    if (spinner) spinner.classList.remove('hidden');
                    if (text) text.textContent = '⏳ Analyzing...';
                    startBtn.disabled = true;
                } else {
                    if (spinner) spinner.classList.add('hidden');
                    if (text) text.textContent = '🚀 Start Multi-Agent Analysis';
                    startBtn.disabled = false;
                }
            }
        } catch (error) {
            console.error('❌ UPDATE ANALYSIS UI: Error:', error);
        }
    }

    /**
     * Actualizar UI del Connection Monitor
     */
    updateConnectionMonitorUI(isActive) {
        try {
            const toggleBtn = document.getElementById('toggle-monitor-btn');
            const statusIndicator = document.getElementById('connection-status');

            if (toggleBtn) {
                toggleBtn.innerHTML = isActive ? 
                    '<span>🔴 Stop Monitor</span>' : 
                    '<span>🟢 Start Monitor</span>';
            }

            if (statusIndicator) {
                statusIndicator.innerHTML = `📡 Monitor: ${isActive ? 'Active' : 'Inactive'}`;
                statusIndicator.className = `status-indicator ${isActive ? 'status-online' : ''}`;
            }
        } catch (error) {
            console.error('❌ UPDATE CONNECTION MONITOR UI: Error:', error);
        }
    }

    /**
     * Actualizar display de conexiones
     */
    updateConnectionsDisplay(data) {
        try {
            const container = document.getElementById('connections-list');
            const countDisplay = document.getElementById('connections-total');

            if (countDisplay) {
                countDisplay.textContent = data.connections?.length || 0;
            }

            if (container && data.connections) {
                if (data.connections.length === 0) {
                    container.innerHTML = '<p class="text-center text-secondary">No connections monitored yet. Start Connection Monitor to see network activity.</p>';
                } else {
                    container.innerHTML = data.connections.map(conn => `
                        <div class="card mb-sm">
                            <div class="flex justify-between items-center">
                                <div class="flex-1">
                                    <div class="font-semibold text-sm">${conn.method || 'Unknown'} ${conn.url || 'Unknown URL'}</div>
                                    <div class="text-xs text-secondary">${conn.timestamp ? new Date(conn.timestamp).toLocaleTimeString() : 'No timestamp'}</div>
                                </div>
                                <div class="status-indicator ${this.getConnectionStatusClass(conn.status)}">
                                    ${conn.status || 'Unknown'}
                                </div>
                            </div>
                        </div>
                    `).join('');
                }
            }
        } catch (error) {
            console.error('❌ UPDATE CONNECTIONS DISPLAY: Error:', error);
        }
    }

    /**
     * Obtener clase CSS para estado de conexión
     */
    getConnectionStatusClass(status) {
        switch (status) {
            case 'success':
            case 200:
            case '200':
                return 'status-online';
            case 'error':
            case 'failed':
            case 500:
            case '500':
                return 'status-offline';
            case 'pending':
            case 'loading':
                return 'status-warning';
            default:
                return '';
        }
    }

    /**
     * Mostrar notificación al usuario
     */
    showNotification(message, type = 'info', duration = 5000) {
        try {
            // Check if notifications are enabled
            const notificationsEnabled = this.stateManager.get('preferences.notifications') !== false;
            if (!notificationsEnabled) {
                console.log(`📢 NOTIFICATION [${type.toUpperCase()}]:`, message);
                return;
            }

            const notification = {
                id: Date.now().toString(),
                message,
                type,
                timestamp: Date.now()
            };

            const notifications = this.stateManager.get('ui.notifications') || [];
            notifications.push(notification);
            this.stateManager.set('ui.notifications', notifications);

            // Render notification in UI
            this.renderNotification(notification);

            // Auto-remove notification
            setTimeout(() => {
                this.removeNotification(notification.id);
            }, duration);

            console.log(`📢 NOTIFICATION [${type.toUpperCase()}]:`, message);

        } catch (error) {
            console.error('❌ SHOW NOTIFICATION: Error:', error);
        }
    }

    /**
     * Renderizar notificación en la UI
     */
    renderNotification(notification) {
        try {
            let container = document.getElementById('notifications-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'notifications-container';
                container.className = 'notifications-container';
                document.body.appendChild(container);
            }

            const notificationElement = document.createElement('div');
            notificationElement.id = `notification-${notification.id}`;
            notificationElement.className = `notification notification-${notification.type}`;
            notificationElement.innerHTML = `
                <div class="notification-content">${notification.message}</div>
                <button class="notification-close" onclick="document.getElementById('notification-${notification.id}').remove()">×</button>
            `;

            container.appendChild(notificationElement);

        } catch (error) {
            console.error('❌ RENDER NOTIFICATION: Error:', error);
        }
    }

    /**
     * Eliminar notificación
     */
    removeNotification(notificationId) {
        try {
            const notifications = this.stateManager.get('ui.notifications') || [];
            const filtered = notifications.filter(n => n.id !== notificationId);
            this.stateManager.set('ui.notifications', filtered);

            // Remove from DOM
            const element = document.getElementById(`notification-${notificationId}`);
            if (element) {
                element.remove();
            }

        } catch (error) {
            console.error('❌ REMOVE NOTIFICATION: Error:', error);
        }
    }

    /**
     * Formatear duración en texto legible
     */
    formatDuration(ms) {
        if (ms < 1000) return `${ms}ms`;
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        if (minutes === 0) return `${seconds}s`;
        return `${minutes}m ${seconds % 60}s`;
    }

    /**
     * Formatear bytes en texto legible
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Obtener información de diagnóstico
     */
    getDiagnosticInfo() {
        return {
            components: Array.from(this.components.keys()),
            currentTab: this.stateManager.get('ui.activeTab'),
            theme: this.stateManager.get('theme'),
            notifications: this.stateManager.get('ui.notifications')?.length || 0,
            modal: this.stateManager.get('ui.modal')
        };
    }
}

// ===================================================================
// 🚀 ENTERPRISE POPUP APPLICATION - MAIN CLASS
// ===================================================================

/**
 * Aplicación principal del popup Enterprise
 * Coordina todos los componentes y sistemas
 */
class EnterprisePopupApplication {
    constructor() {
        this.stateManager = null;
        this.communicator = null;
        this.uiManager = null;
        this.isInitialized = false;
        this.updateInterval = null;
        this.lastRenderTime = performance.now();

        console.log('🚀 ENTERPRISE POPUP: Initializing Application v3.4.0');
    }

    /**
     * Inicializar aplicación Enterprise
     */
    async initialize() {
        try {
            console.log('🏗️ ENTERPRISE POPUP: Starting initialization...');

            // Initialize core systems
            await this.initializeCoreSystems();

            // Setup UI
            await this.initializeUserInterface();

            // Start real-time updates
            this.startRealTimeUpdates();

            // Mark as initialized
            this.isInitialized = true;
            this.stateManager.set('isInitialized', true);

            console.log('✅ ENTERPRISE POPUP: Initialization complete');

            // Show welcome notification
            this.uiManager.showNotification(
                'WebScraping Intelligence Suite Enterprise v3.4.0 ready!',
                'success'
            );

        } catch (error) {
            console.error('❌ ENTERPRISE POPUP: Initialization failed:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Inicializar sistemas principales
     */
    async initializeCoreSystems() {
        try {
            // Initialize State Manager
            this.stateManager = new EnterpriseStateManager();

            // Restore persistent state
            await this.stateManager.restoreState();

            // Initialize Background Communicator
            this.communicator = new BackgroundCommunicator(this.stateManager);

            // Initialize UI Components Manager
            this.uiManager = new UIComponentsManager(this.stateManager, this.communicator);

            // Check background connection
            const isConnected = await this.communicator.checkConnection();
            if (!isConnected) {
                console.warn('⚠️ BACKGROUND: Connection failed, operating in offline mode');
            }

            console.log('🔧 CORE SYSTEMS: Initialized successfully');

        } catch (error) {
            console.error('❌ CORE SYSTEMS: Initialization failed:', error);
            throw error;
        }
    }

    /**
     * Inicializar interfaz de usuario
     */
    async initializeUserInterface() {
        try {
            // Apply theme
            const theme = this.stateManager.get('theme') || 'dark';
            this.uiManager.applyTheme(theme);

            // Subscribe to state changes for UI updates
            this.setupUISubscriptions();

            console.log('🎨 USER INTERFACE: Initialized successfully');

        } catch (error) {
            console.error('❌ USER INTERFACE: Initialization failed:', error);
            throw error;
        }
    }

    /**
     * Configurar suscripciones para actualizaciones de UI
     */
    setupUISubscriptions() {
        try {
            // Subscribe to connection monitor changes
            this.stateManager.subscribe('connectionMonitor.isActive', (isActive) => {
                this.uiManager.updateConnectionMonitorUI(isActive);
            });

            // Subscribe to connection count changes
            this.stateManager.subscribe('connectionMonitor.connectionCount', (count) => {
                this.updateConnectionCountUI(count);
            });

            // Subscribe to connection duration changes
            this.stateManager.subscribe('connectionMonitor.duration', (duration) => {
                this.updateConnectionDurationUI(duration);
            });

            // Subscribe to analysis running state changes
            this.stateManager.subscribe('analysis.isRunning', (isRunning) => {
                this.uiManager.updateAnalysisUI(isRunning);
            });

            // Subscribe to theme changes
            this.stateManager.subscribe('theme', (theme) => {
                this.uiManager.applyTheme(theme);
            });

            // Subscribe to notification changes
            this.stateManager.subscribe('ui.notifications', (notifications) => {
                this.updateNotificationsUI(notifications);
            });

            // Subscribe to active tab changes
            this.stateManager.subscribe('ui.activeTab', (tabId) => {
                this.updateActiveTabUI(tabId);
            });

            // Subscribe to agent status changes
            this.stateManager.subscribe('agents', () => {
                this.updateAgentsUI();
            });

            console.log('📡 UI SUBSCRIPTIONS: Configured successfully');

        } catch (error) {
            console.error('❌ UI SUBSCRIPTIONS: Setup failed:', error);
        }
    }

    /**
     * Actualizar UI del contador de conexiones
     */
    updateConnectionCountUI(count) {
        try {
            const element = document.getElementById('connections-count');
            if (element) {
                element.innerHTML = `🔗 Connections: ${count}`;
            }

            const dashboardElement = document.getElementById('dashboard-connection-count');
            if (dashboardElement) {
                dashboardElement.textContent = count;
            }
        } catch (error) {
            console.error('❌ UPDATE CONNECTION COUNT UI: Error:', error);
        }
    }

    /**
     * Actualizar UI de duración de conexiones
     */
    updateConnectionDurationUI(duration) {
        try {
            const element = document.getElementById('analysis-duration');
            if (element) {
                element.innerHTML = `⏱️ Duration: ${this.uiManager.formatDuration(duration)}`;
            }
        } catch (error) {
            console.error('❌ UPDATE CONNECTION DURATION UI: Error:', error);
        }
    }

    /**
     * Actualizar UI de notificaciones
     */
    updateNotificationsUI(notifications) {
        try {
            // This is handled by individual notification rendering
            // Could add aggregate notification UI updates here
        } catch (error) {
            console.error('❌ UPDATE NOTIFICATIONS UI: Error:', error);
        }
    }

    /**
     * Actualizar UI de pestaña activa
     */
    updateActiveTabUI(tabId) {
        try {
            // Update tab indicators or perform tab-specific updates
            console.log('📑 ACTIVE TAB UPDATED:', tabId);
        } catch (error) {
            console.error('❌ UPDATE ACTIVE TAB UI: Error:', error);
        }
    }

    /**
     * Actualizar UI de agentes
     */
    updateAgentsUI() {
        try {
            const agents = this.stateManager.get('agents') || {};
            const container = document.getElementById('agents-grid');
            
            if (container) {
                this.renderAgentsGrid(container, agents);
            }

            // Update dashboard metrics
            const activeCount = Object.values(agents).filter(agent => agent.isActive).length;
            const activeAgentsElement = document.getElementById('dashboard-active-agents');
            if (activeAgentsElement) {
                activeAgentsElement.textContent = activeCount;
            }

            const totalAgentsElement = document.getElementById('total-agents-count');
            if (totalAgentsElement) {
                totalAgentsElement.textContent = Object.keys(agents).length;
            }

            const activeAgentsCountElement = document.getElementById('active-agents-count');
            if (activeAgentsCountElement) {
                activeAgentsCountElement.textContent = activeCount;
            }

        } catch (error) {
            console.error('❌ UPDATE AGENTS UI: Error:', error);
        }
    }

    /**
     * Renderizar grid de agentes
     */
    renderAgentsGrid(container, agents) {
        try {
            const agentCards = Object.values(agents).map(agent => {
                const statusClass = agent.isActive ? 'status-active' : '';
                const confidenceColor = this.getConfidenceColor(agent.confidence);
                
                return `
                    <div class="agent-card ${statusClass}">
                        <div class="agent-header">
                            <div class="agent-icon" style="color: ${confidenceColor};">${agent.icon}</div>
                            <div class="agent-name">${agent.name}</div>
                        </div>
                        <div class="agent-status">
                            <div class="agent-confidence" style="color: ${confidenceColor};">
                                ${Math.round(agent.confidence)}%
                            </div>
                            <div class="status-indicator ${this.getAgentStatusClass(agent.status)}">
                                <div class="status-dot"></div>
                                <span>${agent.status.toUpperCase()}</span>
                            </div>
                        </div>
                        <div class="agent-specialty">${agent.specialty}</div>
                        <div class="agent-provider">Provider: ${agent.provider}</div>
                    </div>
                `;
            }).join('');

            container.innerHTML = agentCards || '<p class="text-center text-secondary">Loading agents...</p>';

        } catch (error) {
            console.error('❌ RENDER AGENTS GRID: Error:', error);
            container.innerHTML = '<p class="text-center text-error">Failed to load agents</p>';
        }
    }

    /**
     * Obtener color de confianza
     */
    getConfidenceColor(confidence) {
        if (confidence >= 0.8) return 'var(--color-success)';
        if (confidence >= 0.6) return 'var(--color-warning)';
        if (confidence >= 0.4) return 'var(--color-primary)';
        return 'var(--color-secondary)';
    }

    /**
     * Obtener clase de estado de agente
     */
    getAgentStatusClass(status) {
        switch (status) {
            case 'active':
            case 'running':
                return 'status-online';
            case 'error':
            case 'failed':
                return 'status-offline';
            case 'idle':
            case 'waiting':
                return 'status-warning';
            default:
                return '';
        }
    }

    /**
     * Iniciar actualizaciones en tiempo real
     */
    startRealTimeUpdates() {
        try {
            // Clear existing interval
            if (this.updateInterval) {
                clearInterval(this.updateInterval);
            }

            // Start new interval
            this.updateInterval = setInterval(async () => {
                await this.performRealTimeUpdate();
            }, ENTERPRISE_CONFIG.performance.updateInterval);

            console.log('🔄 REAL-TIME UPDATES: Started');

        } catch (error) {
            console.error('❌ REAL-TIME UPDATES: Failed to start:', error);
        }
    }

    /**
     * Realizar actualización en tiempo real
     */
    async performRealTimeUpdate() {
        try {
            if (!this.isInitialized) return;

            // Update performance metrics
            const currentTime = performance.now();
            const renderTime = currentTime - this.lastRenderTime;

            this.stateManager.updateMultiple({
                'performance.renderTime': renderTime,
                'performance.lastUpdate': Date.now()
            });

            // Update memory usage if available
            if (performance.memory) {
                this.stateManager.set('performance.memoryUsage', performance.memory.usedJSHeapSize);
            }

            // Request updates from background if connection is active
            if (this.communicator.isConnected) {
                try {
                    const updates = await this.communicator.sendMessage('getRealtimeUpdates');
                    if (updates && updates.success && updates.data) {
                        this.processRealtimeUpdates(updates.data);
                    }
                } catch (error) {
                    // Silent error for real-time updates to avoid spam
                    if (error.message !== 'Circuit breaker is open - service temporarily unavailable') {
                        console.warn('⚠️ REAL-TIME UPDATE: Error:', error.message);
                    }
                }
            }

            this.lastRenderTime = currentTime;

        } catch (error) {
            console.warn('⚠️ REAL-TIME UPDATE: Error:', error.message);
        }
    }

    /**
     * Procesar actualizaciones en tiempo real
     */
    processRealtimeUpdates(data) {
        try {
            // Update connection monitor
            if (data.connectionMonitor) {
                this.stateManager.updateMultiple({
                    'connectionMonitor.connectionCount': data.connectionMonitor.count || 0,
                    'connectionMonitor.duration': data.connectionMonitor.duration || 0
                });
            }

            // Update agent statuses
            if (data.agents) {
                Object.entries(data.agents).forEach(([agentId, agentData]) => {
                    this.stateManager.updateMultiple({
                        [`agents.${agentId}.status`]: agentData.status || 'idle',
                        [`agents.${agentId}.confidence`]: agentData.confidence || 0,
                        [`agents.${agentId}.lastUpdate`]: Date.now(),
                        [`agents.${agentId}.isActive`]: agentData.isActive || false
                    });
                });
            }

        } catch (error) {
            console.error('❌ PROCESS REALTIME UPDATES: Error:', error);
        }
    }

    /**
     * Manejar error de inicialización
     */
    handleInitializationError(error) {
        try {
            console.error('❌ INITIALIZATION ERROR:', error);

            // Show fallback UI
            const container = document.getElementById('app') || document.body;
            container.innerHTML = `
                <div class="error-container">
                    <div class="error-header">
                        <h1 class="error-title">🚨 Initialization Error</h1>
                        <p class="error-message">Failed to initialize WebScraping Intelligence Suite Enterprise.</p>
                    </div>
                    <div class="error-details">
                        <p><strong>Error:</strong> ${error.message}</p>
                        <p><strong>Version:</strong> ${ENTERPRISE_CONFIG.version}</p>
                        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                    </div>
                    <div class="error-actions">
                        <button id="error-retry-btn" class="btn btn-primary">
                            🔄 Retry
                        </button>
                        <button id="error-debug-btn" class="btn btn-secondary">
                            🔍 Debug Info
                        </button>
                    </div>
                </div>
            `;

            // Add event listeners programmatically to comply with CSP
            const retryBtn = document.getElementById('error-retry-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', () => location.reload());
            }

            const debugBtn = document.getElementById('error-debug-btn');
            if (debugBtn) {
                debugBtn.addEventListener('click', () => {
                    console.log('Debug info:', window.enterprisePopupApp?.getDiagnosticInfo());
                    alert('Debug info logged to console.');
                });
            }

        } catch (displayError) {
            console.error('❌ ERROR DISPLAY: Failed:', displayError);
            document.body.innerText = 'A critical error occurred, and the error message could not be displayed.';
        }
    }

    /**
     * Limpiar recursos de la aplicación
     */
    cleanup() {
        try {
            console.log('🧹 CLEANUP: Starting application cleanup...');

            // Clear intervals
            if (this.updateInterval) {
                clearInterval(this.updateInterval);
                this.updateInterval = null;
            }

            // Persist final state
            if (this.stateManager) {
                this.stateManager.persistState();
                this.stateManager.cleanup();
            }

            // Clear components
            this.uiManager = null;
            this.communicator = null;
            this.stateManager = null;
            this.isInitialized = false;

            console.log('✅ CLEANUP: Application cleanup completed');

        } catch (error) {
            console.error('❌ CLEANUP: Error during cleanup:', error);
        }
    }

    /**
     * Obtener información de diagnóstico completa
     */
    getDiagnosticInfo() {
        try {
            return {
                isInitialized: this.isInitialized,
                version: ENTERPRISE_CONFIG.version,
                timestamp: Date.now(),
                state: this.stateManager?.getDebugInfo(),
                communication: this.communicator?.getDiagnosticInfo(),
                ui: this.uiManager?.getDiagnosticInfo(),
                performance: {
                    memory: performance.memory ? {
                        used: performance.memory.usedJSHeapSize,
                        total: performance.memory.totalJSHeapSize,
                        limit: performance.memory.jsHeapSizeLimit
                    } : null,
                    timing: performance.now(),
                    renderTime: this.lastRenderTime
                },
                environment: {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    language: navigator.language,
                    cookieEnabled: navigator.cookieEnabled,
                    onLine: navigator.onLine
                }
            };

        } catch (error) {
            console.error('❌ DIAGNOSTIC INFO: Error:', error);
            return { error: error.message };
        }
    }
}

// ===================================================================
// 🎯 INICIALIZACIÓN AUTOMÁTICA Y GLOBAL
// ===================================================================

// Global application instance
let enterprisePopupApp = null;

/**
 * Inicializar aplicación cuando DOM esté listo
 */
function initializeEnterprisePopup() {
    try {
        console.log('🚀 INITIALIZING: Enterprise Popup Application v3.4.0');

        enterprisePopupApp = new EnterprisePopupApplication();
        enterprisePopupApp.initialize();

        // Make available globally for debugging
        window.enterprisePopupApp = enterprisePopupApp;

    } catch (error) {
        console.error('❌ CRITICAL: Failed to initialize popup application', error);
        // Optionally, display a fallback UI here as well
    }
}

/**
 * Event listener para iniciar la aplicación
 */
document.addEventListener('DOMContentLoaded', initializeEnterprisePopup);

// Cleanup on unload
window.addEventListener('beforeunload', () => {
    if (enterprisePopupApp) {
        enterprisePopupApp.cleanup();
    }
});