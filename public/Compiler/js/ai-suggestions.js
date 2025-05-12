const GEMINI_API_KEY = ""; // Replace with your actual Gemini API key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
// AIzaSyDTczs5r8xqbrzCg8P6bI30UXIQS0sAglw
class AISuggestions {
    constructor() {
        this.initialized = false;
        this.panel = null;
        this.trigger = null;
        this.content = null;
        this.refreshBtn = null;
        this.currentSuggestions = [];
        this.currentLanguage = null;
        this.debounceTimer = null;
        this.isLoading = false;
    }

    async init() {
        // Only initialize once
        if (this.initialized) return;
        
        console.log('Initializing AI Suggestions panel...');
        
        try {
            // Load the AI panel component
            await this.loadComponent();
            
            // Cache DOM elements
            this.panel = document.querySelector('.ai-suggestions-panel');
            this.trigger = document.getElementById('ai-suggestions-trigger');
            this.content = document.getElementById('ai-suggestions-content');
            this.refreshBtn = document.getElementById('ai-refresh-btn');
            
            if (!this.panel || !this.trigger || !this.content || !this.refreshBtn) {
                console.error('AI Suggestions: Missing required DOM elements');
                return;
            }
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Mark as initialized
            this.initialized = true;
            
            // Set initial collapsed state
            this.togglePanel(true);
            
            console.log('AI Suggestions initialized successfully');
        } catch (error) {
            console.error('Failed to initialize AI Suggestions:', error);
        }
    }    async loadComponent() {
        try {
            // Create DOM elements directly instead of loading from external file
            // This ensures the components are available immediately
            const panelHTML = `
                <div class="ai-suggestions-panel collapsed">
                    <div class="ai-suggestions-header">
                        <h3><i class="fas fa-robot"></i> Gemini AI Suggestions</h3>
                        <button class="ai-toggle-btn" id="ai-refresh-btn" title="Refresh suggestions">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                    <div class="ai-suggestions-content" id="ai-suggestions-content">
                        <!-- AI suggestions will be dynamically populated here -->
                        <div class="ai-loading">
                            <div class="ai-loading-spinner"></div>
                            <div>Initializing AI...</div>
                        </div>
                    </div>
                </div>
            `;
            
            const triggerHTML = `
                <div class="ai-suggestions-trigger" id="ai-suggestions-trigger">
                    <i class="fas fa-lightbulb"></i>
                </div>
            `;
            
            // Create container and append to body
            const panelContainer = document.createElement('div');
            panelContainer.innerHTML = panelHTML;
            document.body.appendChild(panelContainer.firstElementChild);
            
            const triggerContainer = document.createElement('div');
            triggerContainer.innerHTML = triggerHTML;
            document.body.appendChild(triggerContainer.firstElementChild);
            
            console.log('AI Suggestions component loaded');
        } catch (error) {
            console.error('Failed to load AI suggestions component:', error);
            throw error;
        }
    }    setupEventListeners() {
        if (!this.trigger || !this.refreshBtn) return;
        
        // Toggle panel when clicking the trigger
        this.trigger.addEventListener('click', () => {
            this.togglePanel();
        });
        
        // Refresh suggestions
        this.refreshBtn.addEventListener('click', () => {
            this.generateSuggestions(true);
        });
        
        // Connect to the menu button
        const aiMenuBtn = document.getElementById('ai-menu-btn');
        if (aiMenuBtn) {
            aiMenuBtn.addEventListener('click', () => {
                this.togglePanel();
            });
        }
        
        // Listen for editor content changes to generate suggestions
        if (window.sourceEditor) {
            console.log('Adding editor content change listener');
            window.sourceEditor.onDidChangeModelContent(event => {
                this.onEditorContentChanged();
            });
            
            // Listen for cursor position changes
            window.sourceEditor.onDidChangeCursorPosition(event => {
                // Only update suggestions if the panel is visible
                if (!this.panel.classList.contains('collapsed')) {
                    clearTimeout(this.debounceTimer);
                    this.debounceTimer = setTimeout(() => {
                        this.generateSuggestions();
                    }, 1000);
                }
            });
        } else {
            console.warn('Source editor not available yet, will retry in 2 seconds');
            setTimeout(() => {
                if (window.sourceEditor) {
                    console.log('Adding delayed editor content change listener');
                    window.sourceEditor.onDidChangeModelContent(event => {
                        this.onEditorContentChanged();
                    });
                } else {
                    console.error('Source editor still not available');
                }
            }, 2000);
        }
        
        // Listen for language changes
        const languageSelector = document.getElementById('select-language');
        if (languageSelector) {
            languageSelector.addEventListener('change', () => {
                setTimeout(() => this.generateSuggestions(true), 500);
            });
        }
        
        // Add keyboard shortcut (Alt+A) to toggle AI panel
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'a') {
                this.togglePanel();
            }
        });
    }togglePanel(forceCollapsed) {
        if (!this.panel) return;
        
        const isCurrentlyCollapsed = this.panel.classList.contains('collapsed');
        
        if (forceCollapsed !== undefined) {
            if (forceCollapsed) {
                this.panel.classList.add('collapsed');
            } else {
                this.panel.classList.remove('collapsed');
                // When forcing panel open, generate suggestions
                this.generateSuggestions();
            }
        } else {
            this.panel.classList.toggle('collapsed');
            
            // If panel is being expanded, generate suggestions
            if (isCurrentlyCollapsed) {
                this.generateSuggestions();
            }
        }
        
        // Update the site content layout
        this.adjustLayout();
        
        // Store user preference in localStorage
        try {
            localStorage.setItem('aiPanelCollapsed', this.panel.classList.contains('collapsed') ? 'true' : 'false');
        } catch (e) {
            console.warn('Could not save AI panel state to localStorage', e);
        }
        
        // If the editor layout is available, update it
        if (window.layout && typeof window.layout.updateSize === 'function') {
            setTimeout(() => {
                window.layout.updateSize();
            }, 300);
        }
    }
    
    adjustLayout() {
        // Adjust main content area based on panel visibility
        const siteContent = document.getElementById('site-content');
        if (!siteContent) return;
        
        if (this.panel.classList.contains('collapsed')) {
            siteContent.classList.remove('with-ai-panel');
            siteContent.style.marginRight = '0';
        } else {
            siteContent.classList.add('with-ai-panel');
            siteContent.style.marginRight = '320px';
        }
    }

    onEditorContentChanged() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        
        this.debounceTimer = setTimeout(() => {
            if (!this.panel.classList.contains('collapsed')) {
                this.generateSuggestions();
            }
        }, 2000); // Debounce for 2 seconds
    }

    setLoading(isLoading) {
        this.isLoading = isLoading;
        
        if (isLoading) {
            this.content.innerHTML = `
                <div class="ai-loading">
                    <div class="ai-loading-spinner"></div>
                    <div>Generating suggestions...</div>
                </div>
            `;
        }
    }

    async generateSuggestions(force = false) {
        // Don't generate suggestions if the panel is collapsed
        if (this.panel.classList.contains('collapsed') && !force) {
            return;
        }
        
        // Don't generate suggestions if already loading
        if (this.isLoading) {
            return;
        }
        
        // Get current code and language
        const code = window.sourceEditor.getValue();
        const currentLanguage = document.getElementById('select-language').value;
        
        // If not enough code or same language and code, don't regenerate
        if (code.trim().length < 10) {
            this.content.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <i class="fas fa-code" style="font-size: 24px; margin-bottom: 10px; color: var(--accent-color);"></i>
                    <p>Start coding to get AI suggestions</p>
                </div>
            `;
            return;
        }
        
        // Set loading state
        this.setLoading(true);
        
        // Call the Gemini API
        try {
            const suggestions = await this.callGeminiAPI(code, currentLanguage);
            this.displaySuggestions(suggestions);
        } catch (error) {
            console.error('Error generating AI suggestions:', error);
            this.content.innerHTML = `
                <div style="padding: 20px; text-align: center; color: var(--error-color);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 24px; margin-bottom: 10px;"></i>
                    <p>Failed to generate suggestions.<br>Error: ${error.message || 'Unknown error'}</p>
                    <button class="ai-suggestion-btn" onclick="aiSuggestions.generateSuggestions(true)">
                        <i class="fas fa-sync-alt"></i> Retry
                    </button>
                </div>
            `;
        } finally {
            this.setLoading(false);
        }
    }

    async callGeminiAPI(code, language) {
        // Example implementation - replace with actual API call to Gemini
        // In a real implementation, you would send the code to the Gemini API
        
        // For testing/mocking purposes
        if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
            // Mock suggestions if no API key is provided
            return this.getMockSuggestions(language);
        }
        
        // Prepare the request to the Gemini API
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Generate 3 helpful coding suggestions to improve or extend the following ${language} code. For each suggestion: 1) Provide a brief explanation of what the suggestion does, 2) Provide the code snippet that implements the suggestion, and 3) Make sure the code is correct and properly formatted. Format your response as JSON with an array of objects, each with "title", "explanation", and "code" properties.\n\nCode:\n${code}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.4,
                    topK: 32,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        // Try to parse JSON response
        try {
            // Extract JSON from the response
            const jsonMatch = text.match(/```json\n([\s\S]*?)```/) || 
                             text.match(/```\n([\s\S]*?)```/) || 
                             [null, text];
            
            const jsonText = jsonMatch[1];
            return JSON.parse(jsonText);
        } catch (e) {
            console.error("Failed to parse JSON response:", e);
            console.log("Raw response:", text);
            
            // Try to extract suggestions manually
            const suggestions = [];
            const suggestionMatches = text.match(/(?:Suggestion \d+|Title:)(.*?)(?:Code:|```)([\s\S]*?)(?:```|Suggestion \d+|$)/g);
            
            if (suggestionMatches) {
                for (const match of suggestionMatches) {
                    const titleMatch = match.match(/(?:Suggestion \d+|Title:)(.*?)(?:Code:|```)/);
                    const codeMatch = match.match(/(?:Code:|```)([\s\S]*?)(?:```|$)/);
                    
                    if (titleMatch && codeMatch) {
                        suggestions.push({
                            title: titleMatch[1].trim(),
                            explanation: titleMatch[1].trim(), // Use title as explanation
                            code: codeMatch[1].trim()
                        });
                    }
                }
            }
            
            return suggestions.length > 0 ? suggestions : this.getMockSuggestions(language);
        }
    }    getMockSuggestions(language) {
        // Mock suggestions for testing
        const mockSuggestions = [
            {
                title: "Add input validation",
                explanation: "Validate user input to prevent errors and improve security",
                code: language === "javascript" ? 
                    `function validateInput(input) {\n  if (input === null || input === undefined) {\n    return false;\n  }\n  return true;\n}` : 
                    `def validate_input(input):\n    if input is None or input == "":\n        return False\n    return True`
            },
            {
                title: "Implement error handling",
                explanation: "Add try-catch blocks to handle potential exceptions",
                code: language === "javascript" ? 
                    `try {\n  // risky operation\n  processData(data);\n} catch (error) {\n  console.error("An error occurred:", error.message);\n}` : 
                    `try:\n    # risky operation\n    process_data(data)\nexcept Exception as e:\n    print(f"An error occurred: {str(e)}")`
            },
            {
                title: "Add comments and documentation",
                explanation: "Improve code readability with descriptive comments",
                code: language === "javascript" ? 
                    `/**\n * Calculates the sum of two numbers\n * @param {number} a - First number\n * @param {number} b - Second number\n * @returns {number} The sum of a and b\n */\nfunction add(a, b) {\n  return a + b;\n}` : 
                    `def add(a, b):\n    \"\"\"\n    Calculate the sum of two numbers\n    \n    Args:\n        a: First number\n        b: Second number\n    \n    Returns:\n        The sum of a and b\n    \"\"\"\n    return a + b`
            },
            {
                title: "Implement async/await pattern",
                explanation: "Use modern asynchronous patterns for cleaner code and better error handling",
                code: language === "javascript" ? 
                    `async function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    if (!response.ok) {\n      throw new Error('Network response was not ok');\n    }\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch error:', error);\n    throw error;\n  }\n}` : 
                    `import asyncio\nimport aiohttp\n\nasync def fetch_data():\n    try:\n        async with aiohttp.ClientSession() as session:\n            async with session.get('https://api.example.com/data') as response:\n                if response.status != 200:\n                    raise Exception('Network response was not ok')\n                data = await response.json()\n                return data\n    except Exception as e:\n        print(f"Fetch error: {str(e)}")\n        raise`
            },
            {
                title: "Add a debounce function",
                explanation: "Optimize performance by preventing function overloading with a debounce mechanism",
                code: language === "javascript" ? 
                    `function debounce(func, wait) {\n  let timeout;\n  return function(...args) {\n    const context = this;\n    clearTimeout(timeout);\n    timeout = setTimeout(() => {\n      func.apply(context, args);\n    }, wait);\n  };\n}\n\n// Usage\nconst debouncedSearch = debounce(searchFunction, 300);` : 
                    `import time\nimport threading\n\ndef debounce(wait):\n    def decorator(fn):\n        timer = None\n        def debounced(*args, **kwargs):\n            nonlocal timer\n            if timer is not None:\n                timer.cancel()\n            timer = threading.Timer(wait, lambda: fn(*args, **kwargs))\n            timer.start()\n        return debounced\n    return decorator\n\n# Usage\n@debounce(0.3)\ndef search_function():\n    pass`
            },
            {
                title: "Implement dark mode toggle",
                explanation: "Add a theme switch functionality to support both light and dark themes",
                code: language === "javascript" ? 
                    `function toggleDarkMode() {\n  const body = document.body;\n  body.classList.toggle('dark-mode');\n  \n  // Save preference to localStorage\n  const isDarkMode = body.classList.contains('dark-mode');\n  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');\n}\n\n// Check for saved user preference\nfunction loadThemePreference() {\n  const darkMode = localStorage.getItem('darkMode');\n  if (darkMode === 'enabled') {\n    document.body.classList.add('dark-mode');\n  }\n}\n\n// Initialize\ndocument.addEventListener('DOMContentLoaded', loadThemePreference);` : 
                    `def toggle_dark_mode():\n    """Toggle dark mode in a web application using JavaScript.\n    This Python function would typically be used in a web framework\n    like Flask or Django to inject the JS code.\n    """\n    js_code = """\n    function toggleDarkMode() {\n        const body = document.body;\n        body.classList.toggle('dark-mode');\n        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));\n    }\n    """    \n    return js_code`
            },
            {
                title: "Add cache mechanism",
                explanation: "Implement caching to improve performance and reduce redundant operations",
                code: language === "javascript" ? 
                    `// Simple cache implementation\nconst cache = new Map();\n\nasync function fetchWithCache(url, options = {}) {\n  const cacheKey = options.cacheKey || url;\n  \n  // Check if cached and not expired\n  if (cache.has(cacheKey)) {\n    const cachedData = cache.get(cacheKey);\n    if (Date.now() < cachedData.expiry) {\n      return cachedData.data;\n    }\n  }\n  \n  // Fetch fresh data\n  const response = await fetch(url, options);\n  const data = await response.json();\n  \n  // Cache the response with expiry time (default: 5 minutes)\n  const expiry = Date.now() + (options.cacheTime || 5 * 60 * 1000);\n  cache.set(cacheKey, { data, expiry });\n  \n  return data;\n}` : 
                    `import time\nfrom functools import lru_cache\n\n# Using Python's built-in LRU cache\n@lru_cache(maxsize=128)\ndef expensive_computation(n):\n    # Simulate expensive operation\n    time.sleep(0.1)  \n    return n * n\n\n# Custom cache with expiration\nclass CacheWithExpiry:\n    def __init__(self):\n        self.cache = {}\n        \n    def get(self, key, default=None):\n        if key in self.cache:\n            value, expiry = self.cache[key]\n            if time.time() < expiry:\n                return value\n            # Expired, remove it\n            del self.cache[key]\n        return default\n        \n    def set(self, key, value, expire_seconds=300):\n        expiry = time.time() + expire_seconds\n        self.cache[key] = (value, expiry)`
            },
            {
                title: "Implement a simple state manager",
                explanation: "Create a basic state management system for better data organization",
                code: language === "javascript" ? 
                    `class SimpleState {\n  constructor(initialState = {}) {\n    this.state = initialState;\n    this.listeners = [];\n  }\n  \n  getState() {\n    return { ...this.state };\n  }\n  \n  setState(newState) {\n    this.state = { ...this.state, ...newState };\n    this.notifyListeners();\n  }\n  \n  subscribe(listener) {\n    this.listeners.push(listener);\n    return () => {\n      this.listeners = this.listeners.filter(l => l !== listener);\n    };\n  }\n  \n  notifyListeners() {\n    this.listeners.forEach(listener => listener(this.state));\n  }\n}\n\n// Usage\nconst appState = new SimpleState({ count: 0, theme: 'light' });` : 
                    `class SimpleState:\n    def __init__(self, initial_state=None):\n        self.state = initial_state or {}\n        self.listeners = []\n        \n    def get_state(self):\n        return self.state.copy()\n        \n    def set_state(self, new_state):\n        self.state.update(new_state)\n        self.notify_listeners()\n        \n    def subscribe(self, listener):\n        self.listeners.append(listener)\n        # Return unsubscribe function\n        def unsubscribe():\n            self.listeners.remove(listener)\n        return unsubscribe\n        \n    def notify_listeners(self):\n        for listener in self.listeners:\n            listener(self.state)\n            \n# Usage\napp_state = SimpleState({'count': 0, 'theme': 'light'})`
            }
        ];
        
        return mockSuggestions;
    }

    displaySuggestions(suggestions) {
        if (!suggestions || suggestions.length === 0) {
            this.content.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <i class="fas fa-lightbulb" style="font-size: 24px; margin-bottom: 10px; color: var(--accent-color);"></i>
                    <p>No suggestions available at this time. Try modifying your code.</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        
        suggestions.forEach((suggestion, index) => {
            html += `
                <div class="ai-suggestion-card">
                    <div class="ai-suggestion-title">${suggestion.title}</div>
                    <div>${suggestion.explanation}</div>
                    <pre class="ai-suggestion-code"><code>${this.escapeHtml(suggestion.code)}</code></pre>
                    <div class="ai-suggestion-actions">
                        <button class="ai-suggestion-btn" onclick="aiSuggestions.copyToClipboard(${index})">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                        <button class="ai-suggestion-btn apply" onclick="aiSuggestions.applySuggestion(${index})">
                            <i class="fas fa-check"></i> Apply
                        </button>
                    </div>
                </div>
            `;
        });
        
        this.content.innerHTML = html;
        this.currentSuggestions = suggestions;
    }
    
    escapeHtml(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }
    
    copyToClipboard(index) {
        const suggestion = this.currentSuggestions[index];
        if (!suggestion) return;
        
        navigator.clipboard.writeText(suggestion.code)
            .then(() => {
                // Show a temporary copied message
                const copyBtn = this.content.querySelectorAll('.ai-suggestion-btn')[index * 2];
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }
    
    applySuggestion(index) {
        const suggestion = this.currentSuggestions[index];
        if (!suggestion || !window.sourceEditor) return;
        
        // Get the current position
        const position = window.sourceEditor.getPosition();
        
        // Insert the code at the current position
        window.sourceEditor.executeEdits('ai-suggestion', [{
            range: new monaco.Range(
                position.lineNumber,
                position.column,
                position.lineNumber,
                position.column
            ),
            text: suggestion.code
        }]);
        
        // Show notification
        const applyBtn = this.content.querySelectorAll('.ai-suggestion-btn.apply')[index];
        const originalText = applyBtn.innerHTML;
        applyBtn.innerHTML = '<i class="fas fa-check"></i> Applied!';
        
        setTimeout(() => {
            applyBtn.innerHTML = originalText;
        }, 2000);
    }
}

// Create global instance
const aiSuggestions = new AISuggestions();

// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for the editor to be fully loaded
    setTimeout(() => {
        aiSuggestions.init();
    }, 1000);
});
