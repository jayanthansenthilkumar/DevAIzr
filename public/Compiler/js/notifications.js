/**
 * DevAIzr Notifications System
 * Provides animated toast notifications for user feedback
 */

class NotificationSystem {
    constructor() {
        this.container = null;
        this.initialize();
    }

    initialize() {
        // Create notification container if it doesn't exist
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'notification-container';
            document.body.appendChild(this.container);
            
            // Add styles if not already in the document
            if (!document.getElementById('notification-styles')) {
                const style = document.createElement('style');
                style.id = 'notification-styles';
                style.innerHTML = `
                    .notification-container {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        z-index: 9999;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                    }
                    
                    .notification {
                        margin-bottom: 10px;
                        padding: 15px;
                        border-radius: var(--border-radius);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                        font-family: 'JetBrains Mono', monospace;
                        min-width: 280px;
                        max-width: 400px;
                        transform: translateX(120%);
                        transition: transform 0.3s ease;
                        display: flex;
                        align-items: center;
                    }
                    
                    .notification.success {
                        background-color: var(--darker-bg);
                        border-left: 4px solid var(--success-color);
                        color: var(--success-color);
                    }
                    
                    .notification.error {
                        background-color: var(--darker-bg);
                        border-left: 4px solid var(--error-color);
                        color: var(--error-color);
                    }
                    
                    .notification.info {
                        background-color: var(--darker-bg);
                        border-left: 4px solid var(--accent-color);
                        color: var(--accent-color);
                    }
                    
                    .notification.warning {
                        background-color: var(--darker-bg);
                        border-left: 4px solid var(--warning-color);
                        color: var(--warning-color);
                    }
                    
                    .notification.visible {
                        transform: translateX(0);
                    }
                    
                    .notification-icon {
                        margin-right: 10px;
                        font-size: 18px;
                    }
                    
                    .notification-content {
                        flex: 1;
                    }
                    
                    .notification-title {
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    
                    .notification-message {
                        color: var(--text-color);
                        font-size: 14px;
                    }
                    
                    .notification-close {
                        cursor: pointer;
                        opacity: 0.7;
                        transition: opacity 0.2s;
                        margin-left: 10px;
                    }
                    
                    .notification-close:hover {
                        opacity: 1;
                    }
                    
                    @keyframes notification-progress {
                        0% { width: 100%; }
                        100% { width: 0; }
                    }
                    
                    .notification-progress {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        height: 3px;
                        width: 100%;
                        background-color: rgba(255, 255, 255, 0.2);
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    // Create and show a notification
    show(options) {
        const { type = 'info', title, message, duration = 5000, icon } = options;
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Set icon based on type if not provided
        let iconClass = icon || this.getIconForType(type);
        
        // Create notification content
        notification.innerHTML = `
            <div class="notification-icon"><i class="${iconClass}"></i></div>
            <div class="notification-content">
                ${title ? `<div class="notification-title">${title}</div>` : ''}
                ${message ? `<div class="notification-message">${message}</div>` : ''}
            </div>
            <div class="notification-close"><i class="close icon"></i></div>
            <div class="notification-progress"></div>
        `;
        
        // Add to container
        this.container.appendChild(notification);
        
        // Setup progress animation
        const progress = notification.querySelector('.notification-progress');
        progress.style.animation = `notification-progress ${duration/1000}s linear forwards`;
        progress.style.backgroundColor = this.getColorForType(type);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('visible');
        }, 10);
        
        // Setup close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.close(notification));
        
        // Auto close after duration
        if (duration > 0) {
            setTimeout(() => this.close(notification), duration);
        }
        
        return notification;
    }
    
    // Close a notification
    close(notification) {
        notification.classList.remove('visible');
        setTimeout(() => {
            if (notification.parentNode === this.container) {
                this.container.removeChild(notification);
            }
        }, 300);
    }
    
    // Helper method to get appropriate icon for notification type
    getIconForType(type) {
        switch(type) {
            case 'success': return 'check circle icon';
            case 'error': return 'exclamation circle icon';
            case 'warning': return 'exclamation triangle icon';
            case 'info':
            default: return 'info circle icon';
        }
    }
    
    // Helper method to get color for progress bar
    getColorForType(type) {
        switch(type) {
            case 'success': return 'var(--success-color)';
            case 'error': return 'var(--error-color)';
            case 'warning': return 'var(--warning-color)';
            case 'info':
            default: return 'var(--accent-color)';
        }
    }
    
    // Shorthand methods
    success(message, title = 'Success', duration = 5000) {
        return this.show({ type: 'success', title, message, duration });
    }
    
    error(message, title = 'Error', duration = 7000) {
        return this.show({ type: 'error', title, message, duration });
    }
    
    warning(message, title = 'Warning', duration = 6000) {
        return this.show({ type: 'warning', title, message, duration });
    }
    
    info(message, title = 'Info', duration = 5000) {
        return this.show({ type: 'info', title, message, duration });
    }
}

// Initialize the notification system
const notifications = new NotificationSystem();

// Expose globally
window.notifications = notifications;
