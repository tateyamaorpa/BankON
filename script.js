/**
 * Represents a Loan Application Process.
 * @class
 */
class LoanApplicationProcess {
    /**
     * Create a new instance of the LoanApplicationProcess.
     * @constructor
     */
    constructor() {}

    /**
     * Initialize the loan application process.
     * @method
     * @param {string} formId - The HTML form element's ID.
     * @param {string} resultId - The HTML element's ID for displaying the result.
     */
    init(formId, resultId) {
        /**
         * The HTML form element for the loan application.
         * @type {HTMLElement}
         */
        this.form = document.getElementById(formId);

        /**
         * The HTML element for displaying the application result.
         * @type {HTMLElement}
         */
        this.result = document.getElementById(resultId);

        this.form.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const amount = parseFloat(document.getElementById("amount").value);
            const term = parseInt(document.getElementById("term").value);

            /**
             * The loan application data.
             * @typedef {Object} LoanApplicationData
             * @property {string} name - The name of the applicant.
             * @property {string} email - The email of the applicant.
             * @property {number} amount - The requested loan amount.
             * @property {number} term - The loan term in months.
             */

            /**
             * Perform some basic validation.
             * @function
             * @param {LoanApplicationData} data - The application data.
             * @returns {boolean} - Indicates whether the data is valid.
             */
            const validateData = (data) => {
                return data.name && data.email && !isNaN(data.amount) && !isNaN(data.term);
            };

            const applicationData = {
                name,
                email,
                amount,
                term,
            };

            if (validateData(applicationData)) {
                // You can send this data to a server for processing, but for this example, we'll just display it.
                this.result.textContent = `Loan Application Submitted:\nName: ${name}\nEmail: ${email}\nLoan Amount: $${amount}\nLoan Term: ${term} months`;
            } else {
                this.result.textContent = "Please fill out all fields with valid data.";
            }
        });
    }
}

// Usage example:
const loanApplicationProcess = new LoanApplicationProcess();
loanApplicationProcess.init("loanApplicationForm", "result");
