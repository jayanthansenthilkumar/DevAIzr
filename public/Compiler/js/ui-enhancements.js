// UI enhancement functions for the code editor

// Apply animations to UI elements
function applyAnimations() {
    // Add subtle entrance animations
    $('#site-navigation').css('opacity', '0').animate({opacity: 1}, 300);
    $('#site-content').css('opacity', '0').animate({opacity: 1}, 500);
    
    // Add pulse animation to run button when idle for too long
    let idleTimer;
    const resetIdleTimer = () => {
        clearTimeout(idleTimer);
        $('#run-btn').removeClass('pulse');
        idleTimer = setTimeout(() => {
            $('#run-btn').addClass('pulse');
        }, 60000); // 1 minute of inactivity
    };
    
    // Reset timer on user interaction
    $(document).on('keydown mousemove', resetIdleTimer);
    resetIdleTimer();
    
    // Button click effects
    $('.ui.button').on('click', function() {
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 200);
    });
    
    // Add CSS for button click effect
    if (!$('#button-click-style').length) {
        $('<style id="button-click-style">')
            .text('.ui.button.clicked { transform: scale(0.95); }')
            .appendTo('head');
    }
}

// Save and load theme preference
function initThemePreference() {
    const savedTheme = localStorage.getItem('devAizrTheme');
    if (savedTheme === 'light') {
        $('body').addClass('light-theme');
        $('#theme-toggle i').removeClass('moon').addClass('sun');
    }
    
    $('#theme-toggle').click(function() {
        $('body').toggleClass('light-theme');
        const icon = $(this).find('i');
        let theme = 'dark';
        
        if (icon.hasClass('moon')) {
            icon.removeClass('moon').addClass('sun');
            theme = 'light';
        } else {
            icon.removeClass('sun').addClass('moon');
            theme = 'dark';
        }
        
        // Save preference
        localStorage.setItem('devAizrTheme', theme);
        
        // Show notification
        if (window.notifications) {
            window.notifications.show({
                title: 'Theme Changed',
                message: `Switched to ${theme} theme`,
                type: 'info',
                duration: 3000
            });
        }
    });
}

// Add status indicator functionality
function setupStatusIndicator() {
    // Update connection status indicator
    function updateConnectionStatus(isConnected) {
        const statusIcon = $('#connection-status');
        const statusText = statusIcon.next('span');
        
        if (isConnected) {
            statusIcon.css('color', 'var(--success-color)');
            statusText.text('Ready');
        } else {
            statusIcon.css('color', 'var(--error-color)');
            statusText.text('Offline');
            
            // Show notification
            if (window.notifications) {
                window.notifications.show({
                    title: 'Connection Lost',
                    message: 'Check your internet connection',
                    type: 'error',
                    duration: 0 // persistent until dismissed
                });
            }
        }
    }
    
    // Check connection every 30 seconds
    updateConnectionStatus(navigator.onLine);
    setInterval(() => {
        updateConnectionStatus(navigator.onLine);
    }, 30000);
    
    // Listen for connection changes
    window.addEventListener('online', () => {
        updateConnectionStatus(true);
        if (window.notifications) {
            window.notifications.show({
                title: 'Connected',
                message: 'Internet connection restored',
                type: 'success',
                duration: 3000
            });
        }
    });
    window.addEventListener('offline', () => updateConnectionStatus(false));
}

// Enhance tooltips with better UI
function enhanceTooltips() {
    $('.ui.button[data-tooltip]').each(function() {
        const tooltip = $(this).attr('data-tooltip');
        $(this).attr('data-tooltip', tooltip);
    });
}

// Create a command palette for quick actions
function setupCommandPalette() {
    // Create command palette element
    if (!$('#command-palette').length) {
        const palette = $(`
            <div id="command-palette" class="command-palette">
                <div class="command-input-container">
                    <input type="text" id="command-input" placeholder="Type a command...">
                </div>
                <div class="command-list"></div>
            </div>
        `).appendTo('body');
        
        // Add CSS for command palette
        if (!$('#command-palette-style').length) {
            $('<style id="command-palette-style">')
                .text(`
                    .command-palette {
                        position: fixed;
                        top: -100%;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 600px;
                        max-width: 90%;
                        background-color: var(--dark-secondary);
                        border-radius: var(--border-radius);
                        box-shadow: var(--box-shadow);
                        z-index: 9999;
                        transition: top 0.3s ease;
                    }
                    
                    .command-palette.active {
                        top: 80px;
                    }
                    
                    .command-input-container {
                        padding: 15px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    
                    #command-input {
                        width: 100%;
                        background-color: var(--dark-bg);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: var(--border-radius);
                        padding: 10px 15px;
                        color: var(--text-light);
                        font-family: 'JetBrains Mono', monospace;
                    }
                    
                    .command-list {
                        max-height: 300px;
                        overflow-y: auto;
                    }
                    
                    .command-item {
                        padding: 10px 15px;
                        cursor: pointer;
                        transition: background-color 0.2s;
                        display: flex;
                        align-items: center;
                    }
                    
                    .command-item:hover {
                        background-color: var(--dark-bg);
                    }
                    
                    .command-item i {
                        margin-right: 10px;
                    }
                    
                    .command-item-name {
                        flex: 1;
                    }
                    
                    .command-item-shortcut {
                        opacity: 0.6;
                        font-size: 0.9em;
                    }
                `)
                .appendTo('head');
        }
        
        // Toggle palette with Ctrl+P or Cmd+P
        $(document).on('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                $('#command-palette').toggleClass('active');
                if ($('#command-palette').hasClass('active')) {
                    $('#command-input').focus();
                }
            }
            
            // Close with Escape
            if (e.key === 'Escape' && $('#command-palette').hasClass('active')) {
                $('#command-palette').removeClass('active');
            }
        });
        
        // Close when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('#command-palette').length && $('#command-palette').hasClass('active')) {
                $('#command-palette').removeClass('active');
            }
        });
    }
}

// Add keyboard shortcut hints to buttons
function addKeyboardShortcutHints() {
    $('#run-btn').attr('data-tooltip', 'Run (Ctrl+Enter)');
    $('#save-btn').attr('data-tooltip', 'Save (Ctrl+S)');
    $('#open-btn').attr('data-tooltip', 'Open (Ctrl+O)');
    $('#theme-toggle').attr('data-tooltip', 'Toggle Theme (Alt+T)');
    
    // Add keyboard shortcuts
    $(document).on('keydown', function(e) {
        // Theme toggle: Alt+T
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            $('#theme-toggle').click();
        }
    });
}

// Initialize notifications system
function initNotifications() {
    if (typeof NotificationSystem !== 'undefined') {
        window.notifications = new NotificationSystem();
    }
}

// Initialize all UI enhancements
$(document).ready(function() {
    applyAnimations();
    initThemePreference();
    setupStatusIndicator();
    enhanceTooltips();
    setupCommandPalette();
    addKeyboardShortcutHints();
    initNotifications();
    
    // Additional setup for the editor appearance
    setTimeout(() => {
        // Add subtle border radius to editor containers if they exist
        $('.monaco-editor').css('border-radius', '0 0 var(--border-radius) var(--border-radius)');
    }, 500);
});
