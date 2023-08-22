console.info("Time store loaded!");
/*
function loadSelectedTimes() {
  const storedTimes = localStorage.getItem('selectedTimes');

  if (storedTimes) {
    this.selectedTimes = JSON.parse(storedTimes);
  }
}

function saveSelectedTimes() {
  localStorage.setItem('selectedTimes', JSON.stringify(this.selectedTimes));
}

const app = {
  selectedTimes: [], // Initialize as an empty array
  loadSelectedTimes,
  saveSelectedTimes,
};

Alpine.data('selectedTimes', () => app);

*/
/*



document.addEventListener('alpine:init', () => {
  Alpine.data('slots', () => ({
      selectedSlots: [],
      init() {
          if (localStorage.getItem('slots')) {
            this.selectedSlots = JSON.parse(localStorage.getItem('slots'));
          }
      },
      saveSlots() {
          localStorage.setItem('slots', JSON.stringify(this.selectedSlots));
      }
  }))
})




//time.js file

console.info("Time store loaded!");


works but the drop down options only display {{timeslot}} and the selected part is not highlight after refreshed

document.addEventListener('alpine:init', () => {
  Alpine.store('timeSlots', {
    times: [
      "07.00am - 08.00am",
      "08.00am - 09.00am",
      "09.00am - 10.00am",
      "10.00am - 11.00am (Peak)",
      "11.00am - 12.00pm (Peak)",
      "12.00pm - 13.00pm (Peak)",
      "13.00pm - 14.00pm",
      "14.00pm - 15.00pm",
      "15.00pm - 16.00pm (Peak)",
      "16.00pm - 17.00pm (Peak)",
      "17.00pm - 18.00pm (Peak)",
    ]
  });

  function loadSelectedTimes() {
    const storedTimes = localStorage.getItem('selectedTimes');
    if (storedTimes) {
      this.selectedTimes = JSON.parse(storedTimes);
    }
  }

  function saveSelectedTimes() {
    localStorage.setItem('selectedTimes', JSON.stringify(this.selectedTimes));
  }


  Alpine.data('selectedTimes', () => ({
    selectedTimes: [],
    saveSelectedTimes() {
      localStorage.setItem('selectedTimes', JSON.stringify(this.selectedTimes));
    },

    loadSelectedTimes() {
      const storedTimes = localStorage.getItem('selectedTimes');
      if (storedTimes) {
        this.selectedTimes = JSON.parse(storedTimes);
      }
    }
  }));
});

the above code before the summary table 
*/


document.addEventListener('alpine:init', () => {
  function updateTableHead() {
    const tableHead = document.getElementById('selectedTimesHeader');
    tableHead.innerText = this.selectedTimes.length > 0 ? this.selectedTimes.join(', ') : '-';
  }

  function loadSelectedTimes() {
    const storedTimes = localStorage.getItem('selectedTimes');
    if (storedTimes) {
      this.selectedTimes = JSON.parse(storedTimes);
      updateTableHead.call(this);
    }
  }

  function saveSelectedTimes() {
    localStorage.setItem('selectedTimes', JSON.stringify(this.selectedTimes));
    updateTableHead.call(this);
  }

  Alpine.data('selectedTimes', () => ({
    selectedTimes: [],
    saveSelectedTimes,
    loadSelectedTimes,
  }));
});
