console.info("Pay store loaded!");

// payment.js
document.addEventListener('alpine:init', () => {
  Alpine.data('carddetails', () => ({
    cardNum: '',
    ExpireDate: '',
    cvc: '',
    nameOnCard: '',
    invalidExpiryDate: false,

    // Function to save payment details to local storage

    savePayDetails() {

       // Remove any non-letter characters from the nameOnCard

      this.nameOnCard = this.nameOnCard.replace(/[^A-Za-z\s]/g, '');
      localStorage.setItem('cardNum', this.cardNum);
      localStorage.setItem('ExpireDate', this.ExpireDate);
      localStorage.setItem('cvc', this.cvc);
      localStorage.setItem('nameOnCard', this.nameOnCard);
    },

    
    // to load payment details from local storage

    loadPayDetails() {
      const storedCardNum = localStorage.getItem('cardNum');
      if (storedCardNum) {
        this.cardNum = storedCardNum;
      }

      const storedExpireDate = localStorage.getItem('ExpireDate');
      if (storedExpireDate) {
        this.ExpireDate = storedExpireDate;
      }

      const storedCvc = localStorage.getItem('cvc');
      if (storedCvc) {
        this.cvc = storedCvc;
      }

      const storedNameOnCard = localStorage.getItem('nameOnCard');
      if (storedNameOnCard) {
        this.nameOnCard = storedNameOnCard;
      }
    },

    // to validate and save the expiry date
    validateAndSaveExpireDate() {
      const datePattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY format
      if (this.ExpireDate.match(datePattern)) {
        const [month, year] = this.ExpireDate.split('/');
        const today = new Date();
        const currentYear = today.getFullYear() % 100; // Extract the last two digits of the current year

        // Check if the year is in the future or if the year is the current year and the month is not expired yet
        if (parseInt(year, 10) > currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) >= today.getMonth() + 1)) {
          // Valid expiry date, save it to local storage
          localStorage.setItem('ExpireDate', this.ExpireDate);
          this.invalidExpiryDate = false;
         return;
        }
      }
      
    // Invalid expiry date, clear the local storage key
    localStorage.removeItem('ExpireDate');
      this.invalidExpiryDate = true;
    },

continueToConfirmation(){
  window.location.href = 'confirmation.html';
}

}));

})