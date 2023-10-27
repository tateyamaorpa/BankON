/**
 * Function to handle the DOM content load event.
 * Initializes the homepage functionality.
 */
document.addEventListener("DOMContentLoaded", function () {
    // Get references to elements on the page
    /**
     * The container that holds the logo and options.
     * @type {HTMLElement}
     */
    const container = document.querySelector('.container');

    /**
     * The list of options on the right side.
     * @type {HTMLElement}
     */
    const options = document.querySelector('.options');

    /**
     * The logo on the left side.
     * @type {HTMLElement}
     */
    const logo = document.querySelector('.logo');

    // Add event listener to adjust container width on window resize
    window.addEventListener('resize', function () {
        adjustContainerWidth();
    });

    /**
     * Function to adjust the container width based on the window size.
     */
    function adjustContainerWidth() {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1200) {
            container.style.width = '100%';
        } else {
            container.style.width = 'auto';
        }
    }

    // Initial adjustment of container width
    adjustContainerWidth();
});
