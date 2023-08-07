document.addEventListener('alpine:init', () => {
  Alpine.data('tickets', () => ({
      date: null,
      totalPrice: 0,
      guestTypes: [
          {
              name: 'Sri Lankan Adult',
              peak: 6,
              offPeak: 4,
              count: 0,
              total: 0
          },
          {
              name: 'Sri Lankan Child',
              peak: 3,
              offPeak: 2,
              count: 0,
              total: 0
          },
          {
              name: 'Foreign Adult',
              peak: 13,
              offPeak: 10,
              duration: 0,
              count: 0,
              total: 0
          },
          {
              name: 'Foreign Child',
              peak: 8,
              offPeak: 5,
              count: 0,
              total: 0
          },
          {
              name: 'Infant',
              peak: 0,
              offPeak: 0,
              count: 0,
              total: 0
          },
      ],
      timeSlots: [
          {
              title: '7AM to 8AM',
              isPeak: false
          },
          {
              title: '8AM to 9AM',
              isPeak: false
          },
          {
              title: '9AM to 10AM',
              isPeak: false
          },
          {
              title: '10AM to 11AM (Peak)',
              isPeak: true
          },
          {
              title: '11AM to 12PM (Peak)',
              isPeak: true
          },
          {
              title: '12PM to 1PM (Peak)',
              isPeak: true
          },
          {
              title: '1PM to 2PM ',
              isPeak: false
          },
          {
              title: '2PM to 3PM',
              isPeak: false
          },
          {
              title: '3PM to 4PM (Peak)',
              isPeak: true
          },
          {
              title: '4PM to 5PM (Peak)',
              isPeak: true
          },
          {
              title: '5PM to 6PM (Peak)',
              isPeak: true
          },
      ],

      selectedTimeSlots: [],

      showTimes: false,
      //------- Functions -------

      selectTimeSlot(index) {

          // check if the index is already in the array
          if (this.selectedTimeSlots.includes(index)) {

              // remove the index from the array
              this.selectedTimeSlots = this.selectedTimeSlots.filter(item => item !== index);

          } else {

              // Todo - you should be able to select time slots in the past !!!

              // get the last element of the array
              let lastElement = this.selectedTimeSlots[this.selectedTimeSlots.length - 1];

              // add 1 to the last element and check if the value is equals to the index
              if (!this.selectedTimeSlots.length || index - 1 == lastElement) {

                  // add the index to the array
                  this.selectedTimeSlots.push(index);

              } else {
                  alert('Invalid selection. Please select consecutive time slots');
              }
          }

          // sort the array
          this.selectedTimeSlots = this.selectedTimeSlots.sort();
          this.duration=this.selectedTimeSlots.length;


          console.log(this.selectedTimeSlots);
      },

      cal(ticketType) {

          let total = 0;

          this.selectedTimeSlots.forEach((timeSlotIndex) => {

              // calculate the total
              total += parseInt(ticketType.count * (this.timeSlots[timeSlotIndex].isPeak ? ticketType.peak : ticketType.offPeak));
          });

          ticketType.total = total;
          this.calculateTotal();
      
      },

      calculateTotal(ticketType) {

        let totalPrice = 0;

        this.guestTypes.forEach((guestType) => { //here instead of total (key) we use the singular term of array name
            
            // calculate the total
            totalPrice += guestType.total;// can't directly access JSON objects inside the array
        });

        this.totalPrice = totalPrice;
        

        console.log("Total price equal ", totalPrice);
        },


      ContinueToDetails(){
          // store the data in the local storage
          localStorage.setItem('guestTypes', JSON.stringify(this.guestTypes));
          localStorage.setItem('selectedTimeSlots',JSON.stringify(this.selectedTimeSlots));
          localStorage.setItem('timeSlots', JSON.stringify(this.timeSlots));

          localStorage.setItem('date',this.date);
          localStorage.setItem('totalPrice', this.totalPrice);

          localStorage.setItem('duration',this.duration);
            

          if(this.totalPrice!=0){
          // redirect to the checkout page
          window.location.href = 'details.html';
          }
      },
      
      getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        let month = now.getMonth() + 1;
        if (month < 10) {
          month = `0${month}`;
        }
        let day = now.getDate();
        if (day < 10) {
          day = `0${day}`;
        }
        return `${year}-${month}-${day}`;
      }
      

  }));
})