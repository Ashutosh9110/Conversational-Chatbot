document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userMessageInput = document.getElementById('user-message');
    const sendButton = document.getElementById('send-button');
    
    let conversationState = 'greeting';
    let contactInfo = {};
    
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
    
    function displayImage(imageUrl) {
        console.log('Attempting to display image:', imageUrl);
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message', 'image-message');
        
        const image = document.createElement('img');
        
        image.onerror = function() {
            console.error('Image failed to load:', imageUrl);
            this.onerror = null;
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
        };
        
        image.onload = function() {
            console.log('Image loaded successfully:', imageUrl);
        };
        
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
    
    // Handle the greetings
    function handleGreetingState(message) {
        let responded = false;
        let skipFollowUp = false;
        
        // Check for greetings first
        if (message.includes('hello') || message.includes('hey') || message.includes('hi') || message.includes('greetings') || message.includes('howdy')) {
            displayBotMessage(defaultResponses.niceties);
            responded = true;
            skipFollowUp = true;
        }
        // Handle product image requests - prioritize specific product images
        else if (message.includes('street') && (message.includes('image') || message.includes('picture') || message.includes('photo') || message.includes('show'))) {
            console.log("Street light image request detected");
            // Find the street light product
            const streetLightProduct = products.find(product => product.id === 'street-light');
            if (streetLightProduct) {
                displayBotMessage(`Here are the images of our ${streetLightProduct.name}:`);
                displayImages(streetLightProduct.imageUrls);
                responded = true;
            }
        }
        else if (message.includes('driveway') && (message.includes('image') || message.includes('picture') || message.includes('photo') || message.includes('show'))) {
            console.log("Driveway light image request detected");
            const drivewayLightProduct = products.find(product => product.id === 'driveway-light');
            if (drivewayLightProduct) {
                displayBotMessage(`Here are the images of our ${drivewayLightProduct.name}:`);
                displayImages(drivewayLightProduct.imageUrls);
                responded = true;
            }
        }
        else if (message.includes('wall') && (message.includes('image') || message.includes('picture') || message.includes('photo') || message.includes('show'))) {
            console.log("Wall light image request detected");
            const wallLightProduct = products.find(product => product.id === 'wall-light');
            if (wallLightProduct) {
                displayBotMessage(`Here are the images of our ${wallLightProduct.name}:`);
                displayImages(wallLightProduct.imageUrls);
                responded = true;
            }
        }
        // Handle generic image requests
        else if (message.includes('image') || message.includes('picture') || message.includes('photo') || message.includes('show me')) {
            console.log("Generic image request detected:", message);
            displayBotMessage("We offer several solar lighting products. Which product would you like to see images of? We have street lights, driveway lights, and wall lights.");
            responded = true;
        }
        
        // company information 
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
        
        // business hours queries
        else if (message.includes('hours') || message.includes('open') || message.includes('when')) {
            let hoursText = 'Our business hours are:';
            companyData.businessHours.forEach(hours => {
                hoursText += `\n${hours}`;
            });
            displayBotMessage(hoursText);
            responded = true;
        }
        
        // product queries
        else if (message.includes('product') || message.includes('lights') || message.includes('lighting')) {
            let productText = 'We offer the following solar lighting products:';
            products.forEach(product => {
                productText += `\n- ${product.name}: ${product.description}`;
            });
            displayBotMessage(productText);
            responded = true;
        }
        
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
        
        if (!responded) {
            displayBotMessage(defaultResponses.fallback);
        }
        
        // Only ask follow-up if not a greeting
        if (!skipFollowUp) {
            setTimeout(() => {
                displayBotMessage(defaultResponses.followUp);
                conversationState = 'followUp';
            }, 1000);
        }
    }
    
    // Handle the follow-up state of the conversation
    function handleFollowUpState(message) {
        // Check for ending conversation first
        if (message.includes('no') || message.includes('that') || message.includes('all') || message.includes('thanks') || message.includes('thank you')) {
            displayBotMessage(defaultResponses.contactRequest);
            conversationState = 'contactRequest';
        } 
        // Check for product image requests first - these should always work regardless of state
        else if (message.includes('street') && (message.includes('image') || message.includes('picture') || message.includes('photo') || message.includes('show'))) {
            console.log("Street light image request detected in follow-up");
            // Find the street light product
            const streetLightProduct = products.find(product => product.id === 'street-light');
            if (streetLightProduct) {
                displayBotMessage(`Here are the images of our ${streetLightProduct.name}:`);
                displayImages(streetLightProduct.imageUrls);
            }
        }
        else if (message.includes('driveway') && (message.includes('image') || message.includes('picture') || message.includes('photo') || message.includes('show'))) {
            console.log("Driveway light image request detected in follow-up");
            const drivewayLightProduct = products.find(product => product.id === 'driveway-light');
            if (drivewayLightProduct) {
                displayBotMessage(`Here are the images of our ${drivewayLightProduct.name}:`);
                displayImages(drivewayLightProduct.imageUrls);
            }
        }
        else if (message.includes('wall') && (message.includes('image') || message.includes('picture') || message.includes('photo') || message.includes('show'))) {
            console.log("Wall light image request detected in follow-up");
            const wallLightProduct = products.find(product => product.id === 'wall-light');
            if (wallLightProduct) {
                displayBotMessage(`Here are the images of our ${wallLightProduct.name}:`);
                displayImages(wallLightProduct.imageUrls);
            }
        }
        else {
            // For all other queries, go back to greeting state handling
            conversationState = 'greeting';
            handleGreetingState(message);
        }
        
        // If we handled an image request directly, ask follow-up after showing image
        if (message.includes('image') || message.includes('picture') || message.includes('photo') || message.includes('show')) {
            setTimeout(() => {
                displayBotMessage(defaultResponses.followUp);
            }, 1000);
        }
    }
    
    // Handle the contact request state of the conversation
    function handleContactRequestState(message) {
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
    
    // Initializing the chat
    initChat();
});
                    
