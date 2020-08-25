let dinosJson;
fetch("http://localhost:3000/Dinos")
  .then((response) => response.json())
  .then((json) => {
    dinosJson = json;
    // console.log(dinosJson)
  });

const factsGenre = ["fact", "weight", "height", "diet", "where", "when"];

const factsGen = {
  fact: (human, dino) => {
    return `This ${dino.species} weighs  ${dino.weight} and you weight  ${human.weight}`;
  },
  weight: (human, dino) => {
    return `This ${dino.species} weighs  ${dino.weight} and you weight  ${human.weight}`;
  },
  height: (human, dino) => {
    return `This ${dino.species} weighs  ${dino.weight} and you weight  ${human.weight}`;
  },
  diet: (human, dino) => {
    return `This ${dino.species} weighs  ${dino.weight} and you weight  ${human.weight}`;
  },
  where: (human, dino) => {
    return `This ${dino.species} weighs  ${dino.weight} and you weight  ${human.weight}`;
  },
  when: (human, dino) => {
    return `This ${dino.species} weighs  ${dino.weight} and you weight  ${human.weight}`;
  },
};

const main = () => {
  // Create Dino Constructor
  function Dino(d) {
    this.species = d.species;
    this.fact = d.fact;
    this.weight = d.weight;
    this.height = d.height;
    this.diet = d.diet;
    this.where = d.where;
    this.when = d.when;

    this.randomNumber = Math.floor(Math.random() * 6);
    this.displayFact = "";
  }

  // Create Dino Objects

  const dinos = dinosJson.map((d) => {
    // console.log(d)
    return new Dino(d);
  });

  // Create Human Object

  // Use IIFE to get human data from form

  const human = (function Human() {
    return {
      name: document.getElementById("name").value,
      height:
        document.getElementById("inches").value * 12 +
        document.getElementById("feet").value,
      weight: document.getElementById("weight").value,
      diet: document.getElementById("diet").value,
    };
  })();

  // console.log(human)

  // Create Dino Compare Method 1
  // NOTE: Weight in JSON file is in lbs, height in inches.

  // Create Dino Compare Method 2
  // NOTE: Weight in JSON file is in lbs, height in inches.

  // Create Dino Compare Method 3
  // NOTE: Weight in JSON file is in lbs, height in inches.

  // Generate Tiles for each Dino in Array

  dinos.forEach((d) => {
    const factGenre = factsGenre[d.randomNumber];

    d.displayFact = factsGen[factGenre](human, d);
    console.log(d.displayFact);
  });

  // Add tiles to DOM
  const gridItem = document.createElement("div");
  const textnode = document.createTextNode("Water");
  gridItem.appendChild(textnode);
  gridItem.classList.add("grid-item");

  document.getElementById("grid").appendChild(gridItem);

  // Remove form from screen

  document.getElementById("dino-compare").style.display = "none";
};

// On button click, prepare and display infographic

document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault;
  // alert("clicked")
  main();
});
