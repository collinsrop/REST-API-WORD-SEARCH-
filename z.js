"use strict";
document.addEventListener("DOMContentLoaded", ()=>{//run this block of code when all DOM content is downloaded
  //search button event handler
 document.querySelector("button").addEventListener("click", ()=>{
let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let word = document.querySelector("input").value;
let finalURL = url + word; //url with a word to be searched
fetch(finalURL) //concatenated url with word
.then((res)=>res.json())
.then((data)=>{
try{
    //phonetic
    data[0].phonetics.forEach(p=>{
      document.querySelector("#phonetic").innerHTML = p.text;
    });

    //correction
    let oldButton = document.querySelector("#voice");
    let newButton = oldButton.cloneNode(true);
    oldButton.parentNode.replaceChild(newButton, oldButton);
    //audio
          let audioSource = data[0].phonetics.find((p) => p.audio);
          if (audioSource) {
            newButton.addEventListener("click", () => {
              let au = new Audio(audioSource.audio);
              au.play();
            });
          } else {
            alert("No audio pronunciation available");
          }

  //meanings
    let definitions = [];
    if (data[0].meanings && data[0].meanings.length > 0) {
      data[0].meanings.forEach((m) => {
        if (m.definitions && m.definitions.length > 0) {
          m.definitions.forEach((d) => {
            let pof = m.partOfSpeech;
            definitions.push(`${pof}: ${d.definition}`);
          });
        }
      });
    }else{
      document.querySelector("#meaning").innerHTML = "Check the spelling!"
    }  

	  document.querySelector("#meaning").innerHTML = definitions;

}
catch(e) {
  console.error(e);
}
	});
 
});
});