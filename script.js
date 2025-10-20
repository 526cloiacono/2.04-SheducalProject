const display = document.getElementById("json-display");
const dropdown = document.getElementsByClassName("dropdown-content")[0];
const links = dropdown.getElementsByTagName("a");


const showClasses = (data) => {
  display.innerHTML = ""; // clear old cards so they dotn stack 

  // Sort by period help of ai 
  data.sort((a, b) => a.period.localeCompare(b.period));

  for (let i = 0; i < data.length; i++) {
    const c = data[i];
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
};

// Load friend JSON and highlight link helo of ai for the selected part 
const loadFriend = async (link) => {
  for (let i = 0; i < links.length; i++) links[i].classList.remove("selected");
  link.classList.add("selected");

  const file = link.getAttribute("data-file");
  try {
    const response = await fetch(file);
    const data = await response.json();
    showClasses(data);
  } catch (err) {
    display.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
    console.error(err);
  }
};

// Click events
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", () => loadFriend(links[i]));
}

// Auto-load first friend helo of online sorce 
window.onload = () => {
  if (links.length > 0) loadFriend(links[0]);
};
