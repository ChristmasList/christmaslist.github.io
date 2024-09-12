const apiKey = '50fcd22bd9234e05bfc6d6cbe0fc5e46'; // Replace with your LinkPreview API key
const apiUrl = 'https://api.linkpreview.net/';

let itemList = []; // Initialize itemList

function addItem() {
    const url = document.getElementById('itemUrl').value;
    const price = document.getElementById('itemPrice').value || 'Price not available'; // Get price from input
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

                if (data) {
                    itemList.push({
                        title: data.title || 'No title',
                        description: data.description || 'No description',
                        image: data.image || 'https://via.placeholder.com/100', // Placeholder if no image
                        price: price, // Use the manual or default price
                        url: url
                    });
                    document.getElementById('itemUrl').value = '';
                    document.getElementById('itemPrice').value = ''; // Clear the price input
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
        listItem.innerHTML = `
            <div>
                <h3>${item.title}</h3>
                <img src="${item.image}" alt="${item.title}" style="width: 100px; height: auto;">
                <p>${item.description}</p>
                <p>Price: ${item.price}</p>
                <a href="${item.url}" target="_blank">${item.url}</a>
            </div>
        `;
        listElement.appendChild(listItem);
    });
}
