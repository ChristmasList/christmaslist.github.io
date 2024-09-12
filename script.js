const apiKey = '50fcd22bd9234e05bfc6d6cbe0fc5e46'; // Replace with your LinkPreview API key
const apiUrl = 'https://api.linkpreview.net/';

let itemList = []; // Initialize itemList

// Database for hex colors of different websites
const colorDatabase = {
    'lego.com': '#ffd502',
    'amazon.com': '#ff9900',
    'example.com': '#cccccc',
    // Add more entries as needed
};

function addItem() {
    const url = document.getElementById('itemUrl').value;
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

                const domain = new URL(url).hostname;
                const color = colorDatabase[domain] || '#000000'; // Default to black if not in database

                if (data) {
                    itemList.push({
                        title: data.title || 'No title',
                        description: data.description || 'No description',
                        image: data.image || 'https://via.placeholder.com/100', // Placeholder if no image
                        url: url,
                        color: color
                    });
                    document.getElementById('itemUrl').value = '';
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
                <img src="${item.image}" alt="${item.title}" style="width: 100px; height: auto;">
                <p>${item.description}</p>
                <a href="${item.url}" class="website-button" target="_blank">Visit Website</a>
            </div>
        `;
        listElement.appendChild(listItem);
    });
}
