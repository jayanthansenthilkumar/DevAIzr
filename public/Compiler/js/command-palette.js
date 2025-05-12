/**
 * Command Palette for DevAIzr
 * Provides quick access to commands and actions
 */

class CommandPalette {
    constructor() {
        this.commands = [];
        this.active = false;
        this.palette = $('#command-palette');
        this.input = $('#command-input');
        this.commandList = $('#command-palette .command-list');
        
        this.initialize();
    }
    
    initialize() {
        // Register keyboard shortcuts
        $(document).on('keydown', (e) => {
            // Toggle palette with Ctrl+P
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                this.toggle();
            }
            
            // Close with Escape
            if (e.key === 'Escape' && this.active) {
                this.hide();
            }
        });
        
        // Handle input changes
        this.input.on('input', () => {
            this.filterCommands();
        });
        
        // Close when clicking outside
        $(document).on('click', (e) => {
            if (!$(e.target).closest('#command-palette').length && this.active) {
                this.hide();
            }
        });
        
        // Register default commands
        this.registerDefaultCommands();
    }
    
    registerDefaultCommands() {
        // File operations
        this.registerCommand({
            name: 'New File',
            icon: 'file outline',
            shortcut: 'Ctrl+N',
            handler: () => {
                // Placeholder for new file action
                this.hide();
                if (window.notifications) {
                    window.notifications.show({
                        title: 'New File',
                        message: 'Creating a new file',
                        type: 'info',
                        duration: 2000
                    });
                }
            }
        });
        
        this.registerCommand({
            name: 'Open File',
            icon: 'folder open',
            shortcut: 'Ctrl+O',
            handler: () => {
                this.hide();
                $('#open-btn').click();
            }
        });
        
        this.registerCommand({
            name: 'Save File',
            icon: 'save',
            shortcut: 'Ctrl+S',
            handler: () => {
                this.hide();
                $('#save-btn').click();
            }
        });
        
        // Editor actions
        this.registerCommand({
            name: 'Run Code',
            icon: 'play',
            shortcut: 'Ctrl+Enter',
            handler: () => {
                this.hide();
                $('#run-btn').click();
            }
        });
        
        this.registerCommand({
            name: 'Toggle Theme',
            icon: 'adjust',
            shortcut: 'Alt+T',
            handler: () => {
                this.hide();
                $('#theme-toggle').click();
            }
        });
        
        // Help commands
        this.registerCommand({
            name: 'Keyboard Shortcuts',
            icon: 'keyboard',
            handler: () => {
                this.hide();
                this.showKeyboardShortcuts();
            }
        });
        
        this.registerCommand({
            name: 'About DevAIzr',
            icon: 'info circle',
            handler: () => {
                this.hide();
                this.showAboutInfo();
            }
        });
    }
    
    registerCommand(command) {
        this.commands.push(command);
    }
    
    filterCommands() {
        const query = this.input.val().toLowerCase();
        this.commandList.empty();
        
        const filteredCommands = this.commands.filter(command => 
            command.name.toLowerCase().includes(query)
        );
        
        filteredCommands.forEach(command => {
            const item = $(`
                <div class="command-item">
                    <i class="${command.icon} icon"></i>
                    <div class="command-item-name">${command.name}</div>
                    ${command.shortcut ? `<div class="command-item-shortcut">${command.shortcut}</div>` : ''}
                </div>
            `);
            
            item.on('click', () => {
                command.handler();
            });
            
            this.commandList.append(item);
        });
    }
    
    show() {
        this.active = true;
        this.palette.addClass('active');
        this.input.val('').focus();
        this.filterCommands();
    }
    
    hide() {
        this.active = false;
        this.palette.removeClass('active');
    }
    
    toggle() {
        if (this.active) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    showKeyboardShortcuts() {
        const shortcuts = [
            { key: 'Ctrl+Enter', description: 'Run Code' },
            { key: 'Ctrl+S', description: 'Save File' },
            { key: 'Ctrl+O', description: 'Open File' },
            { key: 'Ctrl+P', description: 'Open Command Palette' },
            { key: 'Alt+T', description: 'Toggle Theme' },
            { key: 'Escape', description: 'Close Dialogs' }
        ];
        
        let content = '<div class="ui segment"><table class="ui very basic compact table">';
        content += '<thead><tr><th>Shortcut</th><th>Action</th></tr></thead><tbody>';
        
        shortcuts.forEach(shortcut => {
            content += `<tr><td><code>${shortcut.key}</code></td><td>${shortcut.description}</td></tr>`;
        });
        
        content += '</tbody></table></div>';
        
        // Show in modal
        $('#site-modal #title').html('Keyboard Shortcuts');
        $('#site-modal .content').html(content);
        $('#site-modal').modal('show');
    }
    
    showAboutInfo() {
        const content = `
            <div class="ui basic segment" style="text-align: center;">
                <img src="images/devaizr-logo.svg" alt="DevAIzr Logo" style="width: 80px; margin-bottom: 20px;">
                <h2>DevAIzr Code Editor</h2>
                <p>A modern, feature-rich online code editor and compiler.</p>
                <p>Version 1.0.0</p>
                <div class="ui divider"></div>
                <p>Powered by Judge0 API and Monaco Editor</p>
            </div>
        `;
        
        // Show in modal
        $('#site-modal #title').html('About DevAIzr');
        $('#site-modal .content').html(content);
        $('#site-modal').modal('show');
    }
}

// Initialize on document ready
$(document).ready(function() {
    window.commandPalette = new CommandPalette();
});
