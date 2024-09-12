const apiKey = '50fcd22bd9234e05bfc6d6cbe0fc5e46'; // Replace with your LinkPreview API key
const apiUrl = 'https://api.linkpreview.net/?q=';

let itemList = []; // Initialize itemList

function addItem() {
    const url = document.getElementById('itemUrl').value;
    if (url) {
        fetch(apiUrl + encodeURIComponent(url), {
            headers: {
                'X-Linkpreview-Api-Key': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.image) {
                    itemList.push({
                        title: data.title,
                        description: data.description,
                        image: data.image,
                        price: 'Price not available', // Manual entry or additional parsing needed
                        url: url
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
        listItem.innerHTML = `
            <div>
                <h3>${item.title || 'No title'}</h3>
                <img src="${item.image}" alt="${item.title}" style="width: 100px; height: auto;">
                <p>${item.description || 'No description'}</p>
                <p>Price: ${item.price || 'Not available'}</p>
                <a href="${item.url}" target="_blank">${item.url}</a>
            </div>
        `;
        listElement.appendChild(listItem);
    });
}
