# Christmas List Generator

A simple and interactive web application designed to help you create and manage your Christmas wish list.

## Features

- **Add Items**: Easily add items by entering a URL. The tool fetches metadata such as the title, description, and image from the URL.
- **Customizable Appearance**: Each item is displayed with a white background and a border color matching the website's hex color. If no color is available, a default black border is used.
- **Manage List**: View and remove items from your list as needed.
- **Export List**: Copy your entire list as JSON data to your clipboard.
- **Import List**: Import list data by either pasting JSON text into a provided text area or uploading a JSON file.
- **Responsive Design**: The tool is designed to work smoothly on various devices and screen sizes.

## Usage

1. **Add Items to Your List**:
    - Enter the URL of the item in the input field and click "Add Item."
    - The item’s title, description, and image will be fetched and displayed.

2. **Export Your List**:
    - Click "Copy List to Clipboard" to copy the current list data in JSON format to your clipboard.

3. **Import Your List**:
    - **From JSON File**: Click "Import File" to upload a JSON file containing your list data.
    - **From Pasted JSON**: Paste JSON data into the provided text area and click "Import List."

4. **Remove Items**:
    - Click the "Remove" button next to any item in the list to remove it.

## Technology Stack

- **HTML**: Provides the structure of the web application.
- **CSS**: Ensures a modern and user-friendly design.
- **JavaScript**: Handles fetching metadata, managing the list, and importing/exporting data.

## Contributing

If you want to contribute to this project, please fork the repository and submit a pull request. For bug reports or feature requests, open an issue on the GitHub repository.
