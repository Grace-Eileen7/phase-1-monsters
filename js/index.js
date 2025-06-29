let currentPage = 1;
const limit = 50;

const monsterContainer = document.getElementById("monster-container");
const form = document.getElementById("monster-form");
const backBtn = document.getElementById("back");
const forwardBtn = document.getElementById("forward");

function fetchMonsters(page) {
  fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
    .then((res) => res.json())
    .then((monsters) => {
      monsterContainer.innerHTML = "";
      monsters.forEach(renderMonster);
    });
}

function renderMonster(monster) {
  const div = document.createElement("div");
  div.className = "monster";
  div.innerHTML = `
    <h3>${monster.name}</h3>
    <p>Age: ${monster.age}</p>
    <p>${monster.description}</p>
  `;
  monsterContainer.appendChild(div);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = parseFloat(document.getElementById("age").value);
  const description = document.getElementById("description").value;

  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, age, description }),
  })
    .then((res) => res.json())
    .then((monster) => {
      renderMonster(monster);
      form.reset();
    });
});

backBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchMonsters(currentPage);
  }
});

forwardBtn.addEventListener("click", () => {
  currentPage++;
  fetchMonsters(currentPage);
});

document.addEventListener("DOMContentLoaded", () => {
  fetchMonsters(currentPage);
});
