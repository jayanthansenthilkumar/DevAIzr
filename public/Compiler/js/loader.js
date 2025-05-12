// Loading screen functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadingBar = document.getElementById('loading-bar');
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        loadingBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Hide loading screen
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.classList.remove('loading');
                    
                    // Initialize AI suggestions after loading completes
                    if (typeof aiSuggestions !== 'undefined') {
                        aiSuggestions.init();
                    }
                }, 500);
            }, 300);
        }
    }, 100);
    
    // Set loading messages
    const messages = [
        "Initializing editor...",
        "Loading language support...",
        "Preparing code environment...",
        "Connecting to Gemini API...",
        "Almost ready..."
    ];
    
    let messageIndex = 0;
    const messageElement = document.querySelector('.loading-message');
    const messageInterval = setInterval(() => {
        messageElement.style.opacity = 0;
        
        setTimeout(() => {
            messageElement.textContent = messages[messageIndex];
            messageElement.style.opacity = 1;
            messageIndex = (messageIndex + 1) % messages.length;
        }, 300);
        
        if (progress >= 100) {
            clearInterval(messageInterval);
        }
    }, 2000);
});
