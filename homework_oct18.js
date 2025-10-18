
//Getting containers
const waitingArea = document.getElementById("waiting-area");
const ab = document.getElementById("ab-button");

class PersonAir {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let peoplearr = [];
let pplc = 0;

function about(button){
  console.log(ab.value);
  if(ab.value == "hide"){
    ab.value = "show";
  waitingArea.classList.remove("ghost");
    waitingArea.classList.add("aparecium");
  }else if(ab.value =="show"){
    ab.value = "hide";
    waitingArea.classList.remove("aparecium");
    waitingArea.classList.add("ghost");
  }
}

function getSFOResponses(button) {
    button.style.display = "none"; // hide button

  //   The line below will pull the data from the API
  //fetch(
   // "https://data.sfgov.org/api/v3/views/xyey-v962/query.json"
  //)
    //   The line below will pull the data from the locally stored JSON file
    fetch("airport.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      var people = data.people;
      people.forEach(person => {
        getFeeling(person, getCourtesy(person));
      });
    })
    .catch(error => {
      console.error("Error loading JSON:", error);
    });
}

function getFeeling(passenger, clevel) {
  let p = document.createElement("p");
  p.innerHTML = passenger.q3a_verbatim;
  let sc = document.createElement("span");
  sc.innerHTML = "\nScore:"+clevel;
  p.appendChild(sc);
  //console.log(passenger.q3a_verbatim)
  if (passenger.q3a_verbatim != null) {
    if(clevel > 75 && clevel <=100){
        p.classList.add("happy");
    }else if(clevel <=75){
        p.classList.add("angry");
    }else if(clevel > 100){
        p.classList.add("burst");
    }

    waitingArea.appendChild(p);
  }
}

function getCourtesy(passenger) {
    let c1 = passenger.q2a;
    let c2 = passenger.q2b;
    let c3 = passenger.q2c;
    let rescourt = c1 *c2 *c3;
    return rescourt;
}