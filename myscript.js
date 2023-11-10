const rows = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
];

var reservedSeats = {
  record1: {
    seat: "b19",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
  record2: {
    seat: "b20",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
  record3: {
    seat: "b21",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
  record4: {
    seat: "b22",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
};

// function makeRows
function makeRows(sectionLength, rowLength, placement) {
  let html = "";
  let counter = 1;

  rows.forEach(function (row) {
    switch (placement) {
      case "left":
        html += `<div class="label">${row}</div>`;
        break;
      case "right":
        counter += rowLength - sectionLength;
        break;
      default:
        counter += (rowLength - sectionLength) / 2;
        break;
    }
    // loop in here
    for (let i = 0; i < sectionLength; i++) {
      html += `<div class="a" id="${row + counter}">${counter}</div>`;
      counter++;
    }

    switch (placement) {
      case "left":
        counter += rowLength - sectionLength;
        break;
      case "right":
        html += `<div class="label">${row}</div>`;
        break;
      default:
        counter += (rowLength - sectionLength) / 2;
        break;
    }
  });
  document.getElementById(placement).innerHTML = html;
}

makeRows(3, 15, "left");
makeRows(3, 15, "right");
makeRows(9, 15, "middle");
// reserved seats
(function () {
  "use strict";
  for (const key in reservedSeats) {
    if (reservedSeats.hasOwnProperty(key)) {
      let obj = reservedSeats[key];
      document.getElementById(obj.seat).className = "r";
      document.getElementById(obj.seat).innerHTML = "R";
    }
  }

  // selected seats

  let selectedSeats = [];
  let seats = document.querySelectorAll(".a");
  seats.forEach(function (seat) {
    seat.addEventListener("click", function (event) {
      seatSelectionProcess(seat.id);
    });
  });
  // function seat Selection Process
  function seatSelectionProcess(thisSeat) {
    if (!document.getElementById(thisSeat).classList.contains("r")) {
      let index = selectedSeats.indexOf(thisSeat);
      if (index > -1) {
        selectedSeats.splice(index, 1);
        document.getElementById(thisSeat).className = "a";
      } else {
        selectedSeats.push(thisSeat);
        document.getElementById(thisSeat).className = "s";
      }
      manageConfirmForm();
    }
  }

  //  Event listener for reserve link
  document
    .getElementById("reserve")
    .addEventListener("click", function (event) {
      document.getElementById("resform").style.display = "block";
      event.preventDefault();
    });
  // Event listener for cancel button
  document.getElementById("cancel").addEventListener("click", function (event) {
    document.getElementById("resform").style.display = "none";
    event.preventDefault();
  });

  function manageConfirmForm() {
    if (selectedSeats.length > 0) {
      document.getElementById("confirmres").style.display = "block";
      if (selectedSeats.length === 1) {
        document.getElementById(
          "selectedseats"
        ).innerHTML = `You have selected seat ${selectedSeats[0]}`;
      } else {
        let seatString = selectedSeats.toString();
        seatString = seatString.replace(/,/g, ", ");
        seatString = seatString.replace(/,(?=[^,]*$)/, " and");
        document.getElementById(
          "selectedseats"
        ).innerHTML = `You have selected seats  ${seatString}`;
      }
    } else {
      document.getElementById("confirmres").style.display = "none";
      document.getElementById(
        "selectedseats"
      ).innerHTML = `You need to select some seats to reserve. <br> <a href="" id="error">close</a>this dialogue box and pick atleast one seat.`;

      document.getElementById("error").addEventListener("click", function () {
        document.getElementById("resform").style.display = "none";
      });
    }
  }
  // run  manageConfirmForm function
  manageConfirmForm();

  // Event listener for Reservation
  document
    .getElementById("confirmres")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      processReservation();
    });
  // function processReservation
  function processReservation() {
    const hardCordRecords = Object.keys(reservedSeats).length;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    let counter = 1;
    let nextRecord = "";

    selectedSeats.forEach(function (thisSeat) {
      document.getElementById(thisSeat).className = "r";
      document.getElementById(thisSeat).innerHTML = "R";
      // add to the object
      nextRecord = `Record${hardCordRecords + counter}`;
      reservedSeats[nextRecord] = {
        seat: thisSeat,
        owner: {
          fname: fname,
          lname: lname,
        },
      };
      counter++;
    });
    document.getElementById("resform").style.display = "none";
    selectedSeats = [];
    manageConfirmForm();
  }
})();
