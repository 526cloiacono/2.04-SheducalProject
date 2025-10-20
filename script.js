var display = document.getElementById("json-display");
var dropdown = document.getElementsByClassName("dropdown-content")[0];
var links = dropdown.getElementsByTagName("a");

// Function to display classes using insertAdjacentHTML
function showClasses(data) {
  display.innerHTML = ""; // Clear old cards

  // Sort by period 
  data.sort(function(a, b) {
    return a.period.localeCompare(b.period);
  });

  for (var i = 0; i < data.length; i++) {
    var c = data[i];
   // insert html using back ticks 
    display.insertAdjacentHTML("beforeend", `
      <div class="card">
        <h3>${c.period}</h3>
        <p><strong>${c.className}</strong></p>
        <p>${c.teacher}</p>
        <p>Room: ${c.roomNumber}</p>
        <p>${c.subjectArea}</p>
      </div>
    `);
  }
}

async function loadFriend(link) {
  // Highlight current friend
  for (var j = 0; j < links.length; j++) links[j].classList.remove("selected");
  link.classList.add("selected");

  var file = link.getAttribute("data-file");
  try {
    var response = await fetch(file);       // go get JSON
    var data = await response.json();       
    showClasses(data);                      // Display schedule
  } catch (err) {
    display.innerHTML = '<p style="color:red;">Error loading ' + file + '</p>';
    console.error(err);
  }
}

// changes class when click event 
for (var i = 0; i < links.length; i++) {
  links[i].onclick = (function(link) {
    return function() {
      loadFriend(link); // Call async function on click
    };
  })(links[i]);
}

// auto load
window.onload = function() {
  if (links.length > 0) loadFriend(links[0]);
};
