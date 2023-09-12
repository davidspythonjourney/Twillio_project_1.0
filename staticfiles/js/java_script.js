// If on main.html and user is not logged in, redirect to index.html
if (window.location.pathname.endsWith('main.HTML') && !localStorage.getItem('userEmail')) {
    window.location.href = "index.HTML";
}

document.addEventListener("DOMContentLoaded", function() {
    let citiesConfirmed = true;


    // Logic for Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const users = JSON.parse(localStorage.getItem('users') || "[]");

            const userExists = users.some(user => user.email === email && user.password === password);

            if (userExists) {
                localStorage.setItem('userEmail', email);  // Store the current user's email
                window.location.href = "main.HTML";
            } else {
                alert('Invalid email or password.');
            }
        });
    }

    // Logic for Signup
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;
            const users = JSON.parse(localStorage.getItem('users') || "[]");

            const emailExists = users.some(user => user.email === email);

            if (emailExists) {
                alert('User already exists.');
            } else {
                users.push({ email, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Signup successful!');
            }
        });
    }

    // Logic for saving user info and redirecting to campaign.html on main.html
    const userInfoForm = document.getElementById("userInfoForm");
    if (userInfoForm) {
        userInfoForm.addEventListener('submit', function(event) {
            const fullname = document.getElementById('fullname').value;
            const phone = document.getElementById('phone').value;
    
            // Full name validation (should contain only letters and spaces)
            if (!/^[a-zA-Z\s]*$/.test(fullname)) {
                alert("Full name should only contain letters and spaces.");
                event.preventDefault();  // Prevent the form from submitting
                return;
            }
    
            // Phone number validation (should be exactly 10 digits)
            if (!/^\d{10}$/.test(phone)) {
                alert("Phone number should be exactly 10 digits.");
                event.preventDefault();  // Prevent the form from submitting
                return;
            }
    
            // Existing code for saving user info and redirecting
            const company = document.getElementById('company').value;
            console.log('Full Name:', fullname);
            console.log('Company:', company);
            console.log('Phone:', phone);
            console.log("Redirecting to campaign page...");
    
            window.location.href = "pages/campaign.html";
        });
    }

    // Handling region-city selection and summary
    const locationCheckboxes = document.querySelectorAll('input[name="location"]');
    const citiesDiv = document.getElementById('cities');
    const summaryContainer = document.getElementById("summaryContainer");
    const cityConfirmDiv = document.getElementById('cityConfirm');

    const summaryElement = document.getElementById("summary");
    const changeSelectionsButton = document.getElementById("changeSelections");

    locationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked){
            displayCityOptions();
            citiesDiv.style.display = 'block';
            }
        });
    });

    function displayCityOptions() {
        let selectedRegions = Array.from(locationCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        citiesDiv.innerHTML = ''; // Clear current city checkboxes

        const cityOptions = {
            North: ['Kiryat Shemona', 'Krayot', 'Haifa', 'Acre', 'Tiberias'],
            South: ['Beer Sheva', 'Kiryat Gat', 'Sderot', 'Ashdod', 'Ashkelon'],
            Central: ['Rishon Lezion', 'Tel Aviv', 'Ramat Gan', 'Ranana', 'Petah Tikva', 'Netanya', 'Holon']
        
        };

        selectedRegions.forEach(region => {
            let regionDiv = document.createElement('div'); // Create a container for each region
            regionDiv.className = 'region-container';
        
            cityOptions[region].forEach(city => {
                let cityLabel = document.createElement('label');
                let cityCheckbox = document.createElement('input');
                cityCheckbox.type = 'checkbox';
                cityCheckbox.name = `${region.toLowerCase()}City`;
                cityCheckbox.value = city;
                cityLabel.appendChild(cityCheckbox);
                cityLabel.appendChild(document.createTextNode(` ${city}`));
                regionDiv.appendChild(cityLabel); // Append cities to the region container
            });
        
            citiesDiv.appendChild(regionDiv); // Append the region container to the main citiesDiv
        });
        
    }

    const submitLocationButton = document.getElementById("submitLocation");
    if (submitLocationButton) {
        submitLocationButton.addEventListener("click", function() {
            const selectedRegions = Array.from(locationCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
            const selectedCities = Array.from(citiesDiv.querySelectorAll('input[type="checkbox"]')).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
            const ageSelectionContainer = document.getElementById('ageSelectionContainer');

            if (selectedRegions.length < 1) {
                alert('Please select at least one location.');
                return;
            }
            if (selectedCities.length < 1) {
                alert('Please select at least one city.');
                return;
            }
            citiesDiv.style.display = 'none';  // Hide the cities
            ageSelectionContainer.style.display = 'block';  // Display the age selection
            
            
            cityConfirmDiv.style.display = 'block';  // Display the confirmation for cities.

            
            changeCityNoButton.addEventListener("click", function() {
                citiesDiv.style.display = 'none';  // Hide the cities
                ageSelectionContainer.style.display = 'block';  // Display the age selection
            });
            
            const ageSelectionSubmitButton = document.querySelector("#yourAgeSubmitButtonID");
            if (ageSelectionSubmitButton) {
                ageSelectionSubmitButton.addEventListener('click', function() {
                    const selectedAgeGroup = Array.from(document.querySelectorAll('input[name="ageGroup"]:checked')).map(input => input.value);
                    if (selectedAgeGroup.length) {
                        ageSelectionContainer.style.display = 'none';  // Hide the age selection
                        document.getElementById('audienceSizeContainer').style.display = 'block';  // Display the audience size selection
                    } else {
                        alert('Please select an age group.');
                    }
                });
            }

            document.getElementById("audienceSizeSubmit").addEventListener("click", function() {
                const selectedAudienceSize = Array.from(document.querySelectorAll('input[name="audienceSize"]:checked')).map(input => input.value);
                if (selectedAudienceSize.length) {
                    // You can handle the selection here, perhaps saving to local storage or moving to a new page
                    alert(`You selected ${selectedAudienceSize[0]} audience size.`);
                } else {
                    alert('Please select an audience size.');
                }
            });


            // Display the summary
            summaryElement.textContent = `Regions: ${selectedRegions.join(', ')} | Cities: ${selectedCities.join(', ')}`;
            // summaryContainer.style.display = 'block';
            const ageCheckboxes = document.querySelectorAll('input[name="ageGroup"]');
    let selectedAge = null;

    ageCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            selectedAge = this.value; // Get selected age range
            summaryElement.textContent = `Regions: ${selectedRegions.join(', ')} | Cities: ${selectedCities.join(', ')} | Age: ${selectedAge}`;
            summaryContainer.style.display = 'block'; // Now display the summary
        });
    });

        });
    }


    document.getElementById("confirmSelections").addEventListener("click", function() {
        alert("Your selections have been confirmed.");

        document.getElementById("summaryContainer").style.display = 'none';
        document.getElementById("advertisementInput").style.display = 'block';
    });
    changeSelectionsButton.addEventListener("click", function() {
        // Hide the summary
        document.getElementById("summaryContainer").style.display = 'none';
    
        // Reset and show location radio buttons
        locationCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.disabled = false;
        });
    
        // Hide cities, age group, and audience size containers
        citiesDiv.innerHTML = ''; // Clear cities
        ageSelectionContainer.style.display = 'none'; 
        audienceSizeContainer.style.display = 'none';
    
        // Re-enable the submit location button
        submitLocationButton.disabled = false;
    });
    

    // Feedback logic for contact.html
    if (window.location.pathname.endsWith('contact.html') || window.location.pathname.endsWith('/contact.html')) {
        const feedbackList = document.getElementById("feedbackList");
        const submitFeedbackButton = document.getElementById("submitFeedback");
        const feedbackText = document.getElementById("feedbackText");
        const starElements = document.querySelectorAll(".star-rating .star");
        let selectedStarValue = 0;

        if (feedbackList && submitFeedbackButton && feedbackText && starElements) {
            
            const savedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || "[]");
            savedFeedbacks.forEach(feedback => {
                const li = document.createElement("li");
                li.innerHTML = `${feedback.text} <strong>Rating:</strong> ${'★'.repeat(feedback.rating)}`;
                feedbackList.appendChild(li);
            });
            
            starElements.forEach(star => {
                star.addEventListener("mouseover", function() {
                    let hoverValue = parseInt(this.getAttribute('data-value'));
                    highlightStars(hoverValue);
                });
            
                star.addEventListener("mouseout", resetStarColors);
            
                star.addEventListener("click", function() {
                    selectedStarValue = parseInt(this.getAttribute('data-value'));
                    highlightStars(selectedStarValue);
                    
                });
            });
            
            function highlightStars(value) {
                starElements.forEach((star, index) => {
                    star.style.color = index < value ? 'gold' : 'lightgray';
                });
            }
            
            function resetStarColors() {
                starElements.forEach((star, index) => {
                    star.style.color = index < selectedStarValue ? 'gold' : 'lightgray';
                });
            }
            
            

            submitFeedbackButton.addEventListener("click", function() {
                if (feedbackText.value.trim() !== "" && selectedStarValue > 0) {
                    const feedback = {
                        text: feedbackText.value,
                        rating: selectedStarValue
                    };
                    const savedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || "[]");
                    savedFeedbacks.push(feedback);
                    localStorage.setItem('feedbacks', JSON.stringify(savedFeedbacks));
                    const li = document.createElement("li");
                    li.innerHTML = `${feedback.text} <strong>Rating:</strong> ${'★'.repeat(feedback.rating)}`;
                    feedbackList.appendChild(li);
                    feedbackText.value = '';
                } else {
                    alert("Please select a rating and write something in the feedback.");
                }
            }); 
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const locationCheckboxes = document.querySelectorAll('input[name="location"]');
    const ageContainer = document.getElementById('ageSelectionContainer');
    const audienceSizeContainer = document.getElementById('audienceSizeContainer');
    const summaryContainer = document.getElementById('summaryContainer');
    const submitLocationButton = document.getElementById('submitLocation');
    const audienceSizeSubmitButton = document.getElementById('audienceSizeSubmit');
    const summary = document.getElementById('summary');
    const changeSelectionsButton = document.getElementById('changeSelections');

    function getSelectedValues(name) {
        return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value);
    }

    submitLocationButton.addEventListener('click', function() {
        const locations = getSelectedValues('location');
        if (locations.length > 0) {
            ageContainer.style.display = 'block';
            locationCheckboxes.forEach(checkbox => checkbox.disabled = true);
            submitLocationButton.disabled = true;
        }
    });

    document.getElementById('ageSelectionContainer').addEventListener('change', function() {
        const ages = getSelectedValues('ageGroup');
        if (ages.length > 0) {
            audienceSizeContainer.style.display = 'block';
        }
    });

    audienceSizeSubmitButton.addEventListener('click', function() {
        const audienceSize = getSelectedValues('audienceSize');
        if (audienceSize.length === 1) {
            const locations = getSelectedValues('location');
            const ages = getSelectedValues('ageGroup');
            const selectedCities = Array.from(document.querySelectorAll('#cities input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
            summary.innerHTML = `
                Locations: ${locations.join(', ')}<br>
                Cities: ${selectedCities.join(', ')}<br>
                Age Groups: ${ages.join(', ')}<br>
                Audience Size: ${audienceSize[0]}
            `;
            summaryContainer.style.display = 'block';
            audienceSizeContainer.style.display = 'none';
        }
    });
    
    changeSelectionsButton.addEventListener('click', function() {
        summaryContainer.style.display = 'none';
        locationCheckboxes.forEach(checkbox => checkbox.disabled = false);
        submitLocationButton.disabled = false;
        ageContainer.style.display = 'none';
        audienceSizeContainer.style.display = 'none';
    });
});

// Use this block for all common functionality shared across pages

// For submitAd - this code block will only run if submitAd exists on the page
    const submitAdButton = document.getElementById("submitAd");
    if (submitAdButton) { 
        submitAdButton.addEventListener("click", function() {
            const adTitle = document.getElementById("adTitle").value;
            const adContent = document.getElementById("adContent").value;

            // Display ad details
            console.log("Ad Title:", adTitle);
            console.log("Ad Content:", adContent);

            // TODO: Handle the advertisement content (e.g., save to local storage, send to a server, etc.)

            // Clear input fields
            document.getElementById("adTitle").value = "";
            document.getElementById("adContent").value = "";

            // Optionally, you can display a confirmation message to the user
            alert("Ad submitted successfully!");

            window.location.href = "/main/upload/"; 
        });
    }

// Continue with other common functionalities and similar checks for other unique elements
