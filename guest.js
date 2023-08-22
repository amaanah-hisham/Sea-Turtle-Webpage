
/*before the summary table binding




console.info("guest store loaded!");

document.addEventListener("alpine:init", () => {
  Alpine.data("guest", () => ({
    guests: {
      'Local Adult': 0,
      'Local Child': 0,
      'Foreign Adult': 0,
      'Foreign Child': 0,
      'Infant': 0,
    },
    addGuest(guestType) {
      this.guests[guestType]++;
      this.saveToLocalStorage();
    },
    deleteGuest(guestType) {
      if (this.guests[guestType] > 0) {
        this.guests[guestType]--;
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("guests", JSON.stringify(this.guests));
    },
    initFromLocalStorage() {
        const storedGuests = localStorage.getItem('guests');
        if (storedGuests) {
          this.guests = JSON.parse(storedGuests);
        }
      }
  }));
});








*/

console.info("guest store loaded!");

document.addEventListener("alpine:init", () => {
  Alpine.data("guest", () => ({
    guests: {
      'Local Adult': 0,
      'Local Child': 0,
      'Foreign Adult': 0,
      'Foreign Child': 0,
      'Infant': 0,
    },
    addGuest(guestType) {
      this.guests[guestType]++;
      this.saveToLocalStorage(); console.log(this.guests)
    },
    deleteGuest(guestType) {
      if (this.guests[guestType] > 0) {
        this.guests[guestType]--;
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("guests", JSON.stringify(this.guests));
    },
    initFromLocalStorage() {
        const storedGuests = localStorage.getItem('guests');
        if (storedGuests) {
          this.guests = JSON.parse(storedGuests);
          this.updateTotalGuests();
          this.updateTableHead();
        }
      },
      updateTotalGuests() {
        this.totalGuests = Object.values(this.guests).reduce((acc, curr) => acc + curr, 0);console.log(this.totalGuests)
      },
      updateTableHead() {
        const tableRow = document.querySelector('[x-text="Local Adult"]');
        if (tableRow) {
          tableRow.textContent = this.guests["Local Adult"];console.log(this.updateTableHead)
        }}
  }));
});



