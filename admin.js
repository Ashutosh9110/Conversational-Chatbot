document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const locationsContainer = document.getElementById('locations-container');
    const hoursContainer = document.getElementById('hours-container');
    const productsContainer = document.getElementById('products-container');

    
    // Load data from localStorage or use defaults
    let adminData = loadData();
    
    // Initialize the admin panel
    initializeAdminPanel();
    
    // Event listeners
    addLocationButton.addEventListener('click', addLocation);
    addHoursButton.addEventListener('click', addHours);
    addProductButton.addEventListener('click', addProduct);
    saveButton.addEventListener('click', saveData);
    resetButton.addEventListener('click', resetData);
    
    // Function to initialize the admin panel with data
    function initializeAdminPanel() {
        // Set company information
        document.getElementById('company-name').value = adminData.companyData.name;
        document.getElementById('company-description').value = adminData.companyData.description;
        document.getElementById('company-general-info').value = adminData.companyData.generalInfo;
        
        // Set locations
        locationsContainer.innerHTML = '';
        adminData.companyData.locations.forEach((location, index) => {
            addLocation(location);
        });
        
        // Set business hours
        hoursContainer.innerHTML = '';
        adminData.companyData.businessHours.forEach((hours) => {
            addHours(hours);
        });
        
        // Set products
        productsContainer.innerHTML = '';
        adminData.products.forEach((product) => {
            addProduct(product);
        });
        
        // Set bot responses
        document.getElementById('greeting-response').value = adminData.defaultResponses.greeting;
        document.getElementById('fallback-response').value = adminData.defaultResponses.fallback;
        document.getElementById('followup-response').value = adminData.defaultResponses.followUp;
        document.getElementById('contact-request-response').value = adminData.defaultResponses.contactRequest;
        document.getElementById('thank-you-response').value = adminData.defaultResponses.thankYou;
    }
    
    // Function to add a location field
    function addLocation(locationData) {
        const locationItem = document.createElement('div');
        locationItem.classList.add('location-item');
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Location Name';
        nameInput.value = locationData?.name || '';
        nameInput.classList.add('location-name');
        
        const addressInput = document.createElement('input');
        addressInput.type = 'text';
        addressInput.placeholder = 'Address';
        addressInput.value = locationData?.address || '';
        addressInput.classList.add('location-address');
        
        const phoneInput = document.createElement('input');
        phoneInput.type = 'text';
        phoneInput.placeholder = 'Phone Number';
        phoneInput.value = locationData?.phone || '';
        phoneInput.classList.add('location-phone');
        
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'x';
        removeButton.addEventListener('click', () => {
            locationItem.remove();
        });
        
        locationItem.appendChild(document.createElement('p')).textContent = 'Location Name:';
        locationItem.appendChild(nameInput);
        locationItem.appendChild(document.createElement('p')).textContent = 'Address:';
        locationItem.appendChild(addressInput);
        locationItem.appendChild(document.createElement('p')).textContent = 'Phone:';
        locationItem.appendChild(phoneInput);
        locationItem.appendChild(removeButton);
        
        locationsContainer.appendChild(locationItem);
    }
    
    // Function to add a business hours field
    function addHours(hoursData) {
        const hoursItem = document.createElement('div');
        hoursItem.classList.add('hours-item');
        
        const hoursInput = document.createElement('input');
        hoursInput.type = 'text';
        hoursInput.placeholder = 'Business Hours (e.g., Monday - Friday: 9 AM - 5 PM)';
        hoursInput.value = hoursData || '';
        hoursInput.classList.add('hours-input');
        
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'x';
        removeButton.addEventListener('click', () => {
            hoursItem.remove();
        });
        
        hoursItem.appendChild(hoursInput);
        hoursItem.appendChild(removeButton);
        
        hoursContainer.appendChild(hoursItem);
    }
    
    // Function to add a product field
    function addProduct(productData) {
        const product = productData || {
            id: `product-${Date.now()}`,
            name: '',
            description: '',
            specifications: {},
            price: '',
            imageUrls: [],
            features: []
        };
        
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.dataset.productId = product.id;
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Product Name';
        nameInput.value = product.name;
        nameInput.classList.add('product-name');
        
        const descriptionTextarea = document.createElement('textarea');
        descriptionTextarea.placeholder = 'Product Description';
        descriptionTextarea.value = product.description;
        descriptionTextarea.rows = 2;
        descriptionTextarea.classList.add('product-description');
        
        const priceInput = document.createElement('input');
        priceInput.type = 'text';
        priceInput.placeholder = 'Price';
        priceInput.value = product.price;
        priceInput.classList.add('product-price');
        
        // Image URLs section
        const imageUrlsSection = document.createElement('div');
        imageUrlsSection.classList.add('product-image-urls');
        
        const imagesTitle = document.createElement('p');
        imagesTitle.textContent = 'Product Images:';
        imageUrlsSection.appendChild(imagesTitle);
        
        // Add existing image URLs
        const imageUrls = product.imageUrls || [];
        if (imageUrls.length === 0) {
            // Add at least one empty field if no images
            addImageUrlField(imageUrlsSection);
            addImageUrlField(imageUrlsSection);
        } else {
            imageUrls.forEach(url => {
                addImageUrlField(imageUrlsSection, url);
            });
        }
        
