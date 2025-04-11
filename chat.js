document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');

    let conversationState = 'greeting';
    let contactInfo = {};
    
    // Create images directory if it doesn't exist
    function createImagesDirectory() {
        // In a real application, this would be done server-side
        console.log('Images directory would be created server-side');
    }
    
    // Initialize the chat
    function initChat() {
        createImagesDirectory();
        displayBotMessage(defaultResponses.greeting);
    }
    
    // Display user message in the chat
    function displayUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Display bot message in the chat
    function displayBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Display an image in the chat
    function displayImage(imageUrl) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message', 'image-message');
        
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = 'Product Image';
        image.onerror = function() {
            this.onerror = null;
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
        };
        
        messageElement.appendChild(image);
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Display multiple images in the chat
    function displayImages(imageUrls) {
        imageUrls.forEach(imageUrl => {
            displayImage(imageUrl);
        });
    }
    
    // Process user message and generate a response
    function processUserMessage(message) {
        displayUserMessage(message);
        
        const lowerMessage = message.toLowerCase();
        
        // Handle different conversation states
        if (conversationState === 'greeting') {
            handleGreetingState(lowerMessage);
        } else if (conversationState === 'followUp') {
            handleFollowUpState(lowerMessage);
        } else if (conversationState === 'contactRequest') {
            handleContactRequestState(message);
        }
    }
    
    // Handle the greeting state of the conversation
    function handleGreetingState(message) {
        let responded = false;
        
        // Check for company information queries
        if (message.includes('about') || message.includes('company info') || message.includes('abc lighting')) {
            displayBotMessage(`${companyData.name} is ${companyData.description} ${companyData.generalInfo}`);
            responded = true;
        }
        
        // Check for location queries
        else if (message.includes('location') || message.includes('address') || message.includes('where')) {
            let locationText = 'We have the following locations:';
            companyData.locations.forEach(location => {
                locationText += `\n${location.name}: ${location.address}, Phone: ${location.phone}`;
            });
            displayBotMessage(locationText);
            responded = true;
        }
