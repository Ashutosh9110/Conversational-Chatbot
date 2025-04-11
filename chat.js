document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userMessageInput = document.getElementById('user-message');
    const sendButton = document.getElementById('send-button');
    
    let conversationState = 'greeting';
    let contactInfo = {};
    
    // Initialize the chat
    function initChat() {
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
        console.log('Attempting to display image:', imageUrl);
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message', 'image-message');
        
        const image = document.createElement('img');
        
        // Set up event handlers before setting src
        image.onerror = function() {
            console.error('Image failed to load:', imageUrl);
            this.onerror = null;
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
        };
        
        image.onload = function() {
            console.log('Image loaded successfully:', imageUrl);
        };
        
        // Now set src and alt
        image.src = imageUrl;
        image.alt = 'Product Image';
        
        messageElement.appendChild(image);
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Display multiple images in the chat
    function displayImages(imageUrls) {
        console.log('Attempting to display images:', imageUrls);
        if (!imageUrls || imageUrls.length === 0) {
            displayBotMessage("I'm sorry, but I don't have any images for this product at the moment.");
            return;
        }
        
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
        
        // First check for specific product image requests as top priority
        if (message.includes('image') || message.includes('picture') || message.includes('photo') || message.includes('show me')) {
            console.log("Image request detected:", message);
            
            // Check if the message mentions a specific product type
            let foundProduct = null;
            for (const product of products) {
                if ((product.id === 'street-light' && (message.includes('street') || message.includes('streetlight'))) ||
                    (product.id === 'driveway-light' && (message.includes('driveway') || message.includes('path'))) ||
                    (product.id === 'wall-light' && (message.includes('wall') || message.includes('outdoor')))) {
                    
                    foundProduct = product;
                    break;
                }
            }
            
            if (foundProduct) {
                console.log("Found specific product for image request:", foundProduct.name);
                displayBotMessage(`Here are the images of our ${foundProduct.name}:`);
                displayImages(foundProduct.imageUrls);
                responded = true;
            } else {
                // Generic image request
                displayBotMessage("We offer several solar lighting products. Which product would you like to see images of? We have street lights, driveway lights, and wall lights.");
                responded = true;
            }
        }
        
        // Check for company information queries
        else if (message.includes('about') || message.includes('company info') || message.includes('abc lighting') || message.includes("tell me about yourself")) {
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
        
        // Check for business hours queries
        else if (message.includes('hours') || message.includes('open') || message.includes('when')) {
            let hoursText = 'Our business hours are:';
            companyData.businessHours.forEach(hours => {
                hoursText += `\n${hours}`;
            });
            displayBotMessage(hoursText);
            responded = true;
        }
        
        // Check for product queries
        else if (message.includes('product') || message.includes('lights') || message.includes('lighting')) {
            let productText = 'We offer the following solar lighting products:';
            products.forEach(product => {
                productText += `\n- ${product.name}: ${product.description}`;
            });
            displayBotMessage(productText);
            responded = true;
        }
        
        // Check for specific product queries (without image requests)
        else {
            for (const product of products) {
                if (message.includes(product.id) || 
                    message.includes(product.name.toLowerCase()) || 
                    (product.id === 'street-light' && (message.includes('street') || message.includes('streetlight'))) ||
                    (product.id === 'driveway-light' && (message.includes('driveway') || message.includes('path'))) ||
                    (product.id === 'wall-light' && (message.includes('wall') || message.includes('outdoor')))) {
                    
                    let productInfo = `${product.name}: ${product.description}\n\nSpecifications:`;
                    for (const [key, value] of Object.entries(product.specifications)) {
                        productInfo += `\n- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
                    }
                    
                    productInfo += `\n\nPrice: ${product.price}`;
                    
                    productInfo += `\n\nFeatures:`;
                    product.features.forEach(feature => {
                        productInfo += `\n- ${feature}`;
                    });
                    
                    displayBotMessage(productInfo);
                    responded = true;
                    break;
                }
            }
        }
        
        // If no specific response was generated, use fallback
        if (!responded) {
            displayBotMessage(defaultResponses.fallback);
        }
        
        // Always ask follow-up question
        setTimeout(() => {
            displayBotMessage(defaultResponses.followUp);
            conversationState = 'followUp';
        }, 1000);
    }
    
    // Handle the follow-up state of the conversation
    function handleFollowUpState(message) {
        if (message.includes('no') || message.includes('that') || message.includes('all') || message.includes('thanks') || message.includes('thank you')) {
            displayBotMessage(defaultResponses.contactRequest);
            conversationState = 'contactRequest';
        } else {
            conversationState = 'greeting';
            handleGreetingState(message);
        }
    }
    
    // Handle the contact request state of the conversation
    function handleContactRequestState(message) {
        // Simple logic to capture contact info
        // In a real application, this would be more sophisticated
        contactInfo.raw = message;
        
        displayBotMessage(defaultResponses.thankYou);
        conversationState = 'greeting';
        
        // In a real application, this would be sent to a server
        console.log('Contact info captured:', contactInfo);
    }
    
    // Handle send button click
    sendButton.addEventListener('click', () => {
        const message = userMessageInput.value.trim();
        if (message !== '') {
            processUserMessage(message);
            userMessageInput.value = '';
        }
    });
    
    // Handle Enter key press
    userMessageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const message = userMessageInput.value.trim();
            if (message !== '') {
                processUserMessage(message);
                userMessageInput.value = '';
            }
        }
    });
    
    // Initialize the chat
    initChat();
});
                    
