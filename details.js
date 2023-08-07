console.info("customer details store loaded!");

document.addEventListener('alpine:init', () => {
    Alpine.data('details', () => ({
        fullName: '',
        email: '',
        confirmEmail: '',
        gender: '',
        emailError: false,
        phone: '',
        countryCode: '',

        loadDetails() {
            const storedFullName = localStorage.getItem('fullName');
            const storedEmail = localStorage.getItem('email');
            const storedConfirmEmail = localStorage.getItem('confirmEmail');
            const storedEmailError = localStorage.getItem('emailError'); // Get the stored value of emailError
            const storedGender = localStorage.getItem('gender');
            const storedCountryCode = localStorage.getItem('countryCode');
            const storedPhone = localStorage.getItem('phone'); 

            if (storedFullName) {
                this.fullName = storedFullName;
            }
            
            if (storedEmail) {
                this.email = storedEmail;
            }
            if (storedConfirmEmail) { // Set confirmEmail
                this.confirmEmail = storedConfirmEmail;
            }

            // Initialize emailError based on the stored value
            if (storedEmailError) {
                this.emailError = storedEmailError === 'true'; // Convert the string to a boolean
            }

            if (storedGender) {
                this.gender = storedGender;
            }

            if (storedPhone) {
                this.phone = storedPhone;
            }
            if (storedCountryCode) { // Set the country code
                this.countryCode = storedCountryCode;
            }

           
             // Watch for changes in emailError and save it to local storage
            this.$watch('emailError', (newValue) => {
                localStorage.setItem('emailError', newValue.toString()); // Convert boolean to string
            });

            const phoneInput = document.querySelector('.phone-input');
            const iti = window.intlTelInput(phoneInput, {
                initialCountry: storedCountryCode || 'auto',
                separateDialCode: true,
                utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js'
            });

            // Event listener to save phone number and country code as you type
            phoneInput.addEventListener('input', () => {
                this.phone = iti.getNumber();
            });

            // Event listener to save the selected country code on change
            phoneInput.addEventListener('countrychange', () => {
                this.countryCode = iti.getSelectedCountryData().iso2;
                this.saveCountryCodeToStorage(this.countryCode); // Save the selected country code to local storage
            });

            // Set initial values from local storage
            if (storedCountryCode) {
                this.countryCode = storedCountryCode;
                iti.setCountry(storedCountryCode);
            }


        },


        saveCountryCodeToStorage(code) {
            localStorage.setItem('countryCode', code);
        },
        
        saveDetails() {
            this.fullName=this.fullName.replace(/[^A-Za-z\s]/g, '');
            localStorage.setItem('fullName', this.fullName);
            
            localStorage.setItem('email', this.email);
            localStorage.setItem('confirmEmail', this.confirmEmail);
            localStorage.setItem('gender', this.gender);
           // Combine countryCode and phone to phoneWithCountryCode
    this.phoneWithCountryCode = this.countryCode + ' ' + this.phone;
    
    // Save the combined phoneWithCountryCode to the phone key in local storage
    localStorage.setItem('phone', this.phone);
    localStorage.setItem('countryCode', this.countryCode); // Save the selected country code to local storage
         },

        validateEmail() {
            // Display the error only when the user starts typing in the confirm email box
            if (this.confirmEmail && this.email !== this.confirmEmail) {
                this.emailError = true;
            } else {
                this.emailError = false;
            }

            // Save email and confirmEmail to local storage as you type
            localStorage.setItem('email', this.email);
            localStorage.setItem('confirmEmail', this.confirmEmail);
        },

     restrictNonNumeric(event) {
        // Allow only numeric and control keys (e.g., backspace, delete, arrow keys)
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter'];
        const inputValue = event.target.value;

        // Check if the pressed key is a numeric key or an allowed control key
        if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
            // Prevent the default action of the event (e.g., typing the character)
            event.preventDefault();
        }

        // If the input value contains non-numeric characters, remove them
        if (/\D/.test(inputValue)) {
            event.target.value = inputValue.replace(/\D/g, '');
        }
    },

    continueToPayment(){

        window.location.href = 'payment.html';
    },

}));

})