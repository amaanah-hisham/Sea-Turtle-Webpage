/*
console.info("Ticket store loaded!");


  function selectedDateComponent() {
    return {
      selectedDate: '',

      loadDate() {
        this.selectedDate = localStorage.getItem('selectedDate') || '';
      },

      saveDate() {
        localStorage.setItem('selectedDate', this.selectedDate);
      }
    }
  }

The below code was without saving in the summary table
console.info("Date store loaded!");

function selectedDate() {
  return {
    selectedDate: '',

    loadDate() {
      this.selectedDate = localStorage.getItem('selectedDate') || '';

      // Get the current date in 'YYYY-MM-DD' format
      const currentDate = new Date().toISOString().split('T')[0];

      // Set the min attribute of the date input to the current date
      document.getElementById('ticket-date').min = currentDate;
    },

    saveDate() {
      localStorage.setItem('selectedDate', this.selectedDate);
    }
  };
}

*/

console.info("Date store loaded!");

function selectedDate() {
  return {
    selectedDate: '',

    loadDate() {
      this.selectedDate = localStorage.getItem('selectedDate') || '';

      // Get the current date in 'YYYY-MM-DD' format
      const currentDate = new Date().toISOString().split('T')[0];

      // Set the min attribute of the date input to the current date
      document.getElementById('ticket-date').min = currentDate;

      this.updateTableHead();
    },

    saveDate() {
      localStorage.setItem('selectedDate', this.selectedDate);
    },

    updateTableHead() {
      const tableHead = document.querySelector('th[x-text="selectedDate"]');
      if (tableHead) {
        tableHead.textContent = this.selectedDate;
      }
    },

    saveDateAndRefreshTable() {
      this.saveDate();
      this.updateTableHead();
    },
  };
}





