const submit = document.querySelector("#submit-button");
const container = document.querySelector(".container");
const noWord = document.querySelector(".not-found");

function keyboardSearch(e) {
  if (e.keyCode === 13) {
    searchMeaning(e);
  }
}

submit.addEventListener("click", searchMeaning);
function searchMeaning(e) {
  e.preventDefault();
  //get word to be searched from html
  let word = document.querySelector("#input-word").value;

  fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word)
    .then((res) => res.json())
    .then((data) => {
      //remove word not found from previous search
      if (noWord.innerHTML === "Word not found, Please enter a valid word.") {
        noWord.innerHTML = "";
      }
      //get word, phonetics, audio, defintion and example from api
      let word = data[0].word;
      let phonetics = data[0].phonetics[0].text;
      let audio = new Audio();
      audio = data[0].phonetics[0].audio;
      let meaning = data[0].meanings[0].definitions[0].definition;
      let example = data[0].meanings[0].definitions[0].example;

      //insert word to html
      const domWord = document.querySelector(".word");
      domWord.setAttribute("autocapitalize", "on");
      domWord.innerHTML = word;
      //insert phonetics and audio to html
      let domSpell = document.querySelector(".spell");
      //phonetics
      document.querySelector(".phonetics").innerHTML = phonetics;

      //audio
      let sound = document.querySelector("audio");
      sound.setAttribute("src", audio);
      sound.classList.add("audio-visible");
      //insert example and meaning into html
      document.querySelector(".word-meaning").innerHTML = meaning;
      document.querySelector(".example").innerHTML = example;

      container.classList.add("result");
    })
    .catch((err) => {
      container.classList.remove("result");
      noWord.innerHTML = "Word not found, Please enter a valid word.";
    });
}
