document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const locationsContainer = document.getElementById('locations-container');
    const hoursContainer = document.getElementById('hours-container');
    const productsContainer = document.getElementById('products-container');
    const addLocationButton = document.getElementById('add-location');
    const addHoursButton = document.getElementById('add-hours');
    const addProductButton = document.getElementById('add-product');
    const saveButton = document.getElementById('save-button');
    const resetButton = document.getElementById('reset-button');
    
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
        
        // Add button for new image URL
        const addImageButton = document.createElement('button');
        addImageButton.textContent = '+ Add Image URL';
        addImageButton.classList.add('add-button', 'small');
        addImageButton.addEventListener('click', () => {
            addImageUrlField(imageUrlsSection);
        });
        imageUrlsSection.appendChild(addImageButton);
        
        // Specifications section
        const specificationsSection = document.createElement('div');
        specificationsSection.classList.add('product-specifications');
        
        const specsTitle = document.createElement('p');
        specsTitle.textContent = 'Specifications:';
        specificationsSection.appendChild(specsTitle);
        
        // Add existing specifications
        const specs = product.specifications || {};
        for (const [key, value] of Object.entries(specs)) {
            addSpecificationField(specificationsSection, key, value);
        }
        
        // Add button for new specification
        const addSpecButton = document.createElement('button');
        addSpecButton.textContent = '+ Add Specification';
        addSpecButton.classList.add('add-button', 'small');
        addSpecButton.addEventListener('click', () => {
            addSpecificationField(specificationsSection);
        });
        specificationsSection.appendChild(addSpecButton);
        
        // Features section
        const featuresSection = document.createElement('div');
        featuresSection.classList.add('product-features');
        
        const featuresTitle = document.createElement('p');
        featuresTitle.textContent = 'Features:';
        featuresSection.appendChild(featuresTitle);
        
        // Add existing features
        const features = product.features || [];
        features.forEach(feature => {
            addFeatureField(featuresSection, feature);
        });
        
        // Add button for new feature
        const addFeatureButton = document.createElement('button');
        addFeatureButton.textContent = '+ Add Feature';
        addFeatureButton.classList.add('add-button', 'small');
        addFeatureButton.addEventListener('click', () => {
            addFeatureField(featuresSection);
        });
        featuresSection.appendChild(addFeatureButton);
        
        // Image previews
        if (imageUrls && imageUrls.length > 0) {
            const imagePreviewsContainer = document.createElement('div');
            imagePreviewsContainer.classList.add('image-previews-container');
            
            const previewsTitle = document.createElement('p');
            previewsTitle.textContent = 'Image Previews:';
            imagePreviewsContainer.appendChild(previewsTitle);
            
            imageUrls.forEach(url => {
                const imagePreview = document.createElement('div');
                imagePreview.classList.add('image-preview');
                
                const image = document.createElement('img');
                image.src = url;
                image.alt = product.name || 'Product Image';
                image.onerror = function() {
                    this.onerror = null;
                    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
                };
                
                imagePreview.appendChild(image);
                imagePreviewsContainer.appendChild(imagePreview);
            });
            
            productItem.appendChild(imagePreviewsContainer);
        }
        
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'x';
        removeButton.addEventListener('click', () => {
            productItem.remove();
        });
        
        productItem.appendChild(document.createElement('p')).textContent = 'Product Name:';
        productItem.appendChild(nameInput);
        productItem.appendChild(document.createElement('p')).textContent = 'Description:';
        productItem.appendChild(descriptionTextarea);
        productItem.appendChild(document.createElement('p')).textContent = 'Price:';
        productItem.appendChild(priceInput);
        productItem.appendChild(imageUrlsSection);
        productItem.appendChild(specificationsSection);
        productItem.appendChild(featuresSection);
        productItem.appendChild(removeButton);
        
        productsContainer.appendChild(productItem);
    }
    
    // Function to add an image URL field
    function addImageUrlField(container, value = '') {
        const imageUrlItem = document.createElement('div');
        imageUrlItem.classList.add('image-url-item');
        
        const valueInput = document.createElement('input');
        valueInput.type = 'text';
        valueInput.placeholder = 'Image URL (e.g., images/product-name.jpg)';
        valueInput.value = value;
        valueInput.classList.add('image-url-value');
        
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = 'x';
        removeButton.classList.add('remove-button', 'small');
        removeButton.addEventListener('click', () => {
            imageUrlItem.remove();
        });
        
        imageUrlItem.appendChild(valueInput);
        imageUrlItem.appendChild(removeButton);
        
        // Insert before the add button
        container.insertBefore(imageUrlItem, container.lastChild);
    }
    
    // Function to add a specification field
    function addSpecificationField(container, key = '', value = '') {
        const specItem = document.createElement('div');
        specItem.classList.add('specification-item');
        
        const keyInput = document.createElement('input');
        keyInput.type = 'text';
        keyInput.placeholder = 'Specification Name';
        keyInput.value = key;
        keyInput.classList.add('spec-key');
        
        const valueInput = document.createElement('input');
        valueInput.type = 'text';
        valueInput.placeholder = 'Value';
        valueInput.value = value;
        valueInput.classList.add('spec-value');
        
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = 'x';
        removeButton.classList.add('remove-button', 'small');
        removeButton.addEventListener('click', () => {
            specItem.remove();
        });
        
        specItem.appendChild(keyInput);
        specItem.appendChild(valueInput);
        specItem.appendChild(removeButton);
        
        // Insert before the add button
        container.insertBefore(specItem, container.lastChild);
    }
    
    // Function to add a feature field
    function addFeatureField(container, value = '') {
        const featureItem = document.createElement('div');
        featureItem.classList.add('feature-item');
        
        const valueInput = document.createElement('input');
        valueInput.type = 'text';
        valueInput.placeholder = 'Feature';
        valueInput.value = value;
        valueInput.classList.add('feature-value');
        
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = 'x';
        removeButton.classList.add('remove-button', 'small');
        removeButton.addEventListener('click', () => {
            featureItem.remove();
        });
        
        featureItem.appendChild(valueInput);
        featureItem.appendChild(removeButton);
        
        // Insert before the add button
        container.insertBefore(featureItem, container.lastChild);
    }
    
    // Function to load data from localStorage or use defaults
    function loadData() {
        const savedData = localStorage.getItem('abcLightingAdminData');
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error('Error parsing saved data:', e);
            }
        }
        
        // Use the default data from data.js
        return {
            companyData,
            products,
            defaultResponses
        };
    }
    
    // Function to save data to localStorage
    function saveData() {
        const newData = {
            companyData: {
                name: document.getElementById('company-name').value,
                description: document.getElementById('company-description').value,
                generalInfo: document.getElementById('company-general-info').value,
                locations: [],
                businessHours: []
            },
            products: [],
            defaultResponses: {
                greeting: document.getElementById('greeting-response').value,
                fallback: document.getElementById('fallback-response').value,
                followUp: document.getElementById('followup-response').value,
                contactRequest: document.getElementById('contact-request-response').value,
                thankYou: document.getElementById('thank-you-response').value
            }
        };
        
        // Get locations
        const locationItems = locationsContainer.querySelectorAll('.location-item');
        locationItems.forEach(item => {
            const name = item.querySelector('.location-name').value;
            const address = item.querySelector('.location-address').value;
            const phone = item.querySelector('.location-phone').value;
            
            newData.companyData.locations.push({
                name,
                address,
                phone
            });
        });
        
        // Get business hours
        const hoursItems = hoursContainer.querySelectorAll('.hours-item');
        hoursItems.forEach(item => {
            const hours = item.querySelector('.hours-input').value;
            newData.companyData.businessHours.push(hours);
        });
        
        // Get products
        const productItems = productsContainer.querySelectorAll('.product-item');
        productItems.forEach(item => {
            const id = item.dataset.productId;
            const name = item.querySelector('.product-name').value;
            const description = item.querySelector('.product-description').value;
            const price = item.querySelector('.product-price').value;
            
            // Get image URLs
            const imageUrls = [];
            const imageUrlItems = item.querySelectorAll('.image-url-item');
            imageUrlItems.forEach(imageUrlItem => {
                const url = imageUrlItem.querySelector('.image-url-value').value;
                if (url) {
                    imageUrls.push(url);
                }
            });
            
            // Get specifications
            const specifications = {};
            const specItems = item.querySelectorAll('.specification-item');
            specItems.forEach(spec => {
                const key = spec.querySelector('.spec-key').value;
                const value = spec.querySelector('.spec-value').value;
                if (key && value) {
                    specifications[key] = value;
                }
            });
            
            // Get features
            const features = [];
            const featureItems = item.querySelectorAll('.feature-item');
            featureItems.forEach(feature => {
                const value = feature.querySelector('.feature-value').value;
                if (value) {
                    features.push(value);
                }
            });
            
            newData.products.push({
                id,
                name,
                description,
                specifications,
                price,
                imageUrls,
                features
            });
        });
        
        // Save to localStorage
        localStorage.setItem('abcLightingAdminData', JSON.stringify(newData));
        
        // Update the global data
        adminData = newData;
        
        alert('Changes saved successfully!');
    }
    
    // Function to reset data to defaults
    function resetData() {
        if (confirm('Are you sure you want to reset all data to default values? This cannot be undone.')) {
            localStorage.removeItem('abcLightingAdminData');
            adminData = {
                companyData,
                products,
                defaultResponses
            };
            initializeAdminPanel();
            alert('Data has been reset to defaults.');
        }
    }
}); 