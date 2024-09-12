let itemList = [];

function addItem() {
    const url = document.getElementById('itemUrl').value;
    if (url) {
        itemList.push(url);
        document.getElementById('itemUrl').value = '';
        updateList();
    }
}

function updateList() {
    const listElement = document.getElementById('list');
    listElement.innerHTML = '';
    itemList.forEach((url, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
        listElement.appendChild(listItem);
    });
}

function exportList() {
    const blob = new Blob([JSON.stringify(itemList)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'list.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importList(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            itemList = JSON.parse(e.target.result);
            updateList();
        };
        reader.readAsText(file);
    }
}
