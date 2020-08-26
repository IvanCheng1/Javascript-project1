let dinosJson;
fetch("http://localhost:3000/Dinos")
  .then((response) => response.json())
  .then((json) => {
    dinosJson = json;
  });

const factsGenre = ["fact", "weight", "height", "diet", "where", "when"];

// object with categories of facts as keys and functions as values
const factsGen = {
  fact: (human, dino) => {
    return dino.fact;
  },
  weight: (human, dino) => {
    if (human.weight > dino.weight) {
      // human heavier
      const diff = human.weight - dino.weight;
      return `You weigh ${diff}lb more than the ${dino.species}!`;
    }
    const ratio = Math.ceil(dino.weight / human.weight);
    return `The ${dino.species} weighs ${ratio}x times more than you!`;
  },
  height: (human, dino) => {
    if (dino.height > human.height) {
      // dino taller
      const ratio = Math.ceil(dino.height / human.height);
      return `The ${dino.species} is ${ratio}x times taller than you!`;
    }
    const diff = human.height - dino.height;
    return `You're taller than a ${dino.species} by ${diff} inches!`;
  },
  diet: (human, dino) => {
    if (human.diet.toLowerCase() === dino.diet.toLowerCase()) {
      return `You and ${dino.species} are both ${dino.diet}s!`;
    }
    return `This ${dino.species} is a ${dino.diet} whereas you're a ${human.diet}`;
  },
  where: (human, dino) => {
    return `This ${dino.species} comes from ${dino.where}.`;
  },
  when: (human, dino) => {
    return `This ${dino.species} lived during the ${dino.when} period!`;
  },
};

const main = (form) => {
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
    return new Dino(d);
  });

  // Create Human Object

  const human = (function Human() {
    return {
      name: form.name,
      height: parseInt(form.inches) + parseInt(form.feet) * 12,
      weight: form.weight,
      diet: form.diet,
    };
  })();

  // Generate Tiles for each Dino in Array
  dinos
    .sort(() => Math.random() - 0.5)
    .forEach((d) => {
      if (d.species === "Pigeon") {
        d.displayFact = factsGen["fact"](human, d);
      } else {
        const factGenre = factsGenre[d.randomNumber];
        d.displayFact = factsGen[factGenre](human, d);
      }
    });

  // Add tiles to DOM

  for (i = 0; i < 8; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    const title = document.createElement("h3");
    const img = document.createElement("img");
    const fact = document.createElement("p");

    if (i === 4) {
      // human
      const humanGridItem = document.createElement("div");
      humanGridItem.classList.add("grid-item");
      const humanTitle = document.createElement("h3");
      const humanImg = document.createElement("img");
      humanTitle.innerHTML = human.name;
      humanImg.src = "./images/human.png";
      humanGridItem.appendChild(humanTitle);
      humanGridItem.appendChild(humanImg);
      document.getElementById("grid").appendChild(humanGridItem);
    }

    title.innerHTML = dinos[i].species;
    fact.innerHTML = dinos[i].displayFact;
    img.src = `./images/${dinos[i].species}.png`;

    gridItem.appendChild(title);
    gridItem.appendChild(img);
    gridItem.appendChild(fact);

    document.getElementById("grid").appendChild(gridItem);
  }

  // Remove form from screen
  document.getElementById("dino-compare").style.display = "none";
};

// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault;
  // alert("clicked")

  const form = {
    name: document.getElementById("name").value,
    inches: document.getElementById("inches").value,
    feet: document.getElementById("feet").value,
    weight: document.getElementById("weight").value,
    diet: document.getElementById("diet").value,
  };

  if (
    form.name === "" ||
    form.inches === "" ||
    form.feet === "" ||
    form.weight === ""
  ) {
    alert("Please fill in the form");
  } else {
    main(form);
  }
});
