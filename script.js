// Global itemList array
let itemList = [];

// URL to Hex Color Map
const colorMap = {
    'lego.com': '#ffd502',
    'isthereanydeal.com': '#3090ce',
    // Add more domains and their colors here
};

// Function to determine the color based on the URL
function getColorForUrl(url) {
    const hostname = new URL(url).hostname;
    const domain = hostname.replace('www.', '');
    return colorMap[domain] || '#000000'; // Default to black if not found
}

function addItem(url) {
    if (!url) return;
    
    fetch(`https://api.linkpreview.net/?q=${encodeURIComponent(url)}`, {
        headers: {
            'X-Linkpreview-Api-Key': '50fcd22bd9234e05bfc6d6cbe0fc5e46'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.title) {
            itemList.push({
                title: data.title,
                description: data.description || 'No description',
                image: data.image || 'https://via.placeholder.com/100',
                url: url,
                color: getColorForUrl(url)
            });
            updateList();
        } else {
            console.error('No metadata found for this URL.');
        }
    })
    .catch(error => console.error('Error fetching metadata:', error));
}

function updateList() {
    const listElement = document.getElementById('list');
    listElement.innerHTML = '';
    itemList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.style.borderColor = item.color; // Set border color based on URL
        listItem.innerHTML = `
            <h3>${item.title}</h3>
            <img src="${item.image}" alt="${item.title}">
            <p>${item.description}</p>
            <a href="${item.url}" target="_blank" class="website-button">Visit Website</a>
            <button class="remove-button" onclick="removeItem(${index})">Remove</button>
        `;
        listElement.appendChild(listItem);
    });
}

function removeItem(index) {
    itemList.splice(index, 1);
    updateList();
}

function exportList() {
    const json = JSON.stringify(itemList, null, 2); // Format JSON with indentation
    navigator.clipboard.writeText(json).then(() => {
        alert('List copied to clipboard!');
    }).catch(err => {
        console.error('Error copying to clipboard:', err);
    });
}

function importFromFile(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            itemList = JSON.parse(event.target.result);
            updateList();
        } catch (error) {
            alert('Error parsing JSON data.');
            console.error('Error parsing JSON:', error);
        }
    };
    reader.readAsText(file);
}

function importFromText() {
    const textArea = document.getElementById('importTextArea');
    try {
        itemList = JSON.parse(textArea.value);
        updateList();
    } catch (error) {
        alert('Error parsing JSON data.');
        console.error('Error parsing JSON:', error);
    }
}

document.getElementById('importInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        importFromFile(file);
    }
});
