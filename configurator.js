"use strict"

const menu = document.querySelector('#mobile_menu');
const menuLinks = document.querySelector('.nav_menu');
 
menu.addEventListener('click', function() {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
})

document.addEventListener("DOMContentLoaded", start);
console.log("DOMContentLoaded");

let elementToPaint; 

async function start() {
  let response = await fetch("svg/bathtub-01.svg");
  let mySvgData = await response.text();
  document.querySelector("#bathtub_basic").innerHTML = mySvgData;
  // register toggle-clicks
  document
    .querySelectorAll(".option")
    .forEach(option => option.addEventListener("click", toggleOption));
    startManipulatingTheSvg(); 
}

function startManipulatingTheSvg(){
  document.querySelectorAll(".g_to_interact_with").forEach(eachG => {
    console.log(eachG);
    eachG.addEventListener("click", the_click);
    eachG.addEventListener("mouseover", the_mouseover);
    eachG.addEventListener("mouseout", the_mouseout);
  });
  document.querySelector("input[type='color']").addEventListener("input", clickColorInput);;
}

function the_click() {
  elementToPaint = this;
  this.style.fill = "grey";
}

function the_mouseover() {
  console.log(this);

  this.style.stroke = "orange";
}

function the_mouseout() {
  this.style.stroke = "none";
}

function clickColorInput() {
  if (elementToPaint !== undefined) {
    elementToPaint.style.fill = this.value;
    elementToPaint.style.stroke = "";
  }
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // TODO: Toggle feature in "model"
  features[feature] = !features[feature];

  // If feature is (now) turned on:
  if (features[feature] === true) {
    // - mark target as chosen (add class "chosen")
    target.classList.add("chosen");
    // - un-hide the feature-layer(s) in the #product-preview;
    document
      .querySelector(`[data-feature="${feature}"`)
      .classList.remove("hide");
    // - create featureElement and append to #selected ul
    const newElm = createFeatureElement(feature);
    document.querySelector("#selected ul").appendChild(newElm);
    // feature added

    // - create FLIP-animation to animate featureElement from img in target, to
    //   its intended position. Do it with normal animation or transition class!

    // Else - if the feature (became) turned off:
    // - find the existing featureElement in #selected ul
    // - create FLIP-animation to animate featureElement to img in target
    // - when animation is complete, remove featureElement from the DOM

    const start = target.getBoundingClientRect();
    const end = newElm.getBoundingClientRect();

    const diffx = start.x - end.x + "px";
    const diffy = start.y - end.y + "px";

    newElm.style.setProperty("--diffx", diffx);
    newElm.style.setProperty("--diffy", diffy);

    newElm.classList = "animate-feature-in";
  }
  // TODO: More code
  else {
    target.classList.remove("chosen");
    const theElm = document.querySelector(
      `#selected [data-feature="${feature}"]`
    );

    const end = theElm.getBoundingClientRect();
    const start = target.getBoundingClientRect();

    const diffx = start.x - end.x + "px";
    const diffy = start.y - end.y + "px";

    theElm.style.setProperty("--diffx", diffx);
    theElm.style.setProperty("--diffy", diffy);

    theElm.offsetHeight;

    theElm.classList = "animate-feature-out";

    theElm.addEventListener("animationend", function () {
      theElm.remove();
      document.querySelector(`[data-feature=${feature}`).classList.add("hide");
      console.log(`Feature ${feature} is turned off!`);
    });
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `svg/${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}