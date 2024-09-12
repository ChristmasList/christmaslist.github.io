const apiKey = '50fcd22bd9234e05bfc6d6cbe0fc5e46'; // Replace with your LinkPreview API key
const apiUrl = 'https://api.linkpreview.net/';

let itemList = [];

// Database for hex colors of different websites
const colorDatabase = {
    'lego.com': '#ffd502',
    'amazon.com': '#ff9900',
    'example.com': '#cccccc',
    'isthereanydeal.com': '#3090ce',
    // Add more entries as needed
};

function getMainDomain(url) {
    try {
        const hostname = new URL(url).hostname;
        const parts = hostname.split('.');
        if (parts.length > 2) {
            return parts.slice(-2).join('.'); // Handles subdomains, e.g., 'www.lego.com' -> 'lego.com'
        }
        return hostname; // For domains without subdomains
    } catch (error) {
        console.error('Error extracting domain:', error);
        return '';
    }
}

function addItem(url) {
    if (url) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'X-Linkpreview-Api-Key': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'q': url,
                'fields': 'title,description,image,url'
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // Log the data to debug

                const mainDomain = getMainDomain(url);
                const color = colorDatabase[mainDomain] || '#000000'; // Default to black if not in database

                if (data) {
                    itemList.push({
                        title: data.title || 'No title',
                        description: data.description || 'No description',
                        image: data.image || 'https://via.placeholder.com/100', // Placeholder if no image
                        url: url,
                        color: color
                    });
                    updateList();
                } else {
                    console.error('No metadata found for this URL.');
                }
            })
            .catch(error => console.error('Error fetching metadata:', error));
    }
}

function updateList() {
    const listElement = document.getElementById('list');
    listElement.innerHTML = '';
    itemList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.style.borderColor = item.color; // Apply the color from the database or default to black
        listItem.innerHTML = `
            <div>
                <h3>${item.title}</h3>
                <img src="${item.image}" alt="${item.title}">
                <p>${item.description}</p>
                <a href="${item.url}" class="website-button" target="_blank">Visit Website</a>
                <button class="remove-button" onclick="removeItem(${index})">Remove Item</button>
            </div>
        `;
        listElement.appendChild(listItem);
    });
}

function removeItem(index) {
    if (index >= 0 && index < itemList.length) {
        itemList.splice(index, 1);
        updateList();
    }
}

function exportList() {
    const json = JSON.stringify(itemList, null, 2); // Format JSON with indentation
    navigator.clipboard.writeText(json).then(() => {
        alert('List copied to clipboard!');
    }).catch(err => {
        console.error('Error copying to clipboard:', err);
    });
}


function importList(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                itemList = JSON.parse(e.target.result);
                updateList();
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };
        reader.readAsText(file);
    }
}

document.getElementById('importInput').addEventListener('change', importList);

function generateShareableUrl() {
    const baseUrl = 'https://christmaslist.github.io/';
    const shareParam = itemList.map(item => encodeURIComponent(item.url)).join('&');
    return `${baseUrl}?share=${shareParam}`;
}

window.onload = function() {
    // Optional: Initialize the list from URL parameters if available
};

