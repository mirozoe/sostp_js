// JavaScript events
//

// Events are usually triggered by user interaction with web/DOM. Events are necessary
// for SPA (Single page application). 
// There are plenty of events https://developer.mozilla.org/en-US/docs/Web/Events
//
// Usually most used ones are: (https://developer.mozilla.org/en-US/docs/Web/API/Element)
// MouseEvent:
//  * click
//  * dbclick
//  * mouseover
//  * mouseout
//  * focus
//
// KeyboardEvent:
//  * focus
//  * keydown
//  * keyup
//  * copy
//  * paste
//
//  Proceedure to handle events is to first register function to handle event (addEventListener). It is possible also to deregister function (removeEventListener) when it is not needed anymore. Usually it is not a case.

"use strict";

function click( event ) {
  window.alert( "You have clicked on button" );
  console.log( event.target );
}

const doubleclick = ( event ) => {
  window.alert( "Now you have doubleclicked" );
}

function updateInputedTextLesson3( event ) {
  const inputedText = document.querySelector( "p#inputedTextLesson3" );
  inputedText.innerText = event.target.value;
}

function generateColor() {
  return Math.floor( (Math.random() * 1000) % 255 );
}

function runLesson3( parent ) {
  const element = document.createElement( "div" );
  element.setAttribute( "id", "lesson3" );
  element.innerHTML = `
    <div class="container my-4">
      <div class="row">
        <div class="col">
          <h4>Lesson 3 content</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <p>To add interaction with end user, you can use addEventListener function. It comes with nonlinear code execution, because part of code is executed only if and after user do something (f.e. clicks on button). This nonlienarity is done due to callback function. Standalone are anonymous function what is run after user action.</p>
        </div>
        <div class="col-8">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">function displayHello( event ) {
  console.log( event.target );
}
document.querySelector("#exampleButton").addEventListener("click", displayHello);
          </code></pre>
        </div>
      </div>
      <div class="row my-3" align="center" >
        <div class="col-4">
          <button class="btn btn-primary" id="exampleButton1" >Click</button>
        </div>
        <div class="col-4">
          <button class="btn btn-primary" id="exampleButton2" >DoubleClick</button>
        </div>
        <div class="col-4">
          <button class="btn btn-primary" id="exampleButton3" >MouseOver</button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p>Following button/input has associated eventListener and is going to change color of the text</p>
          <div>
            <label for="freeTextLesson3" class="form-label">Input some text</label>
            <input id="freeTextLesson3" class="form-control" />
          </div>
          <div class="row my-1">
            <div class="col-sm-2">
              <p>Inserted text: </p>
            </div>
            <div class="col">
              <p id="inputedTextLesson3" />
            </div>
          </div>
          <button class="btn btn-primary">Change color</button>
        </div>
      </div>
      <div class="row my-3">
        <div class="col">
          <h5>Formular validation</h5>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <p>For better user experience it is important to let end user know what is allowed to fill in forms. In case user use some unvalid input to let him/her know this is wrong. Validation usually is done with regular expression (RegEx) or third party libraries (f.e. validate.js).</p>
        </div>
        <div class="col-8">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">
          </code></pre>
        </div>
      </div>
    </div>
  `;
  parent.appendChild( element );

  document.querySelector("#exampleButton1").addEventListener( "click", click );
  document.querySelector("#exampleButton2").addEventListener( "dblclick", doubleclick );
  document.querySelector("#exampleButton3").addEventListener( "mouseover", function( event ) {
    event.target.style = "background-color: green";
  });
  document.querySelector("#exampleButton3").addEventListener( "mouseout", ( event ) => {
    event.target.style = "background-color: #0d6efd";
  });

  const inputText = document.querySelector( "input#freeTextLesson3" );
  inputText.addEventListener( "keyup", updateInputedTextLesson3 );

  const buttonClick = document.querySelector( "div#lesson3 button" );
  buttonClick.addEventListener( "click", ( event ) => {
    const red = generateColor();
    const green = generateColor();
    const blue = generateColor();
    console.log(`rgb( ${red}, ${green}, ${blue} )`);
    document.querySelector( "p#inputedTextLesson3" ).style.color = `rgb( ${red}, ${green}, ${blue} )`;
  } );

  Prism.highlightAll();
}
