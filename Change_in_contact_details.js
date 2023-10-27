/**
 * Adds an event listener to the "updateForm" element, preventing the default form submission
 * and submitting the form data via a fetch request.
 *
 * @param {Event} event - The form submission event.
 */
document.getElementById("updateForm").addEventListener("submit", function (event) {
    // Prevent the default form submission behavior.
    event.preventDefault();

    // Get the form data from the "updateForm" element.
    const formData = new FormData(this);

    // Send a POST request to the server with the form data.
    fetch('/submitForm2', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.status === 200) {
            // Successful update; handle as needed.
            console.log('Record updated successfully.');
        } else {
            // Handle errors and display an error message if the response status is not 200.
            console.error('Error updating record.');
        }
    })
    .catch(error => {
        // Handle network errors and display an error message.
        console.error('Network error:', error);
    });
});
