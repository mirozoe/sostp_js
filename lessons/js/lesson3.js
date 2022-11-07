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
//
//  For form validation you can very well use RegExp. It is a complex pattern matching approach to parsing a text. Great tutorial, unfortunately a bit hard is here https://www.regular-expressions.info. 

"use strict";

function click( event ) {
  window.alert( "You have clicked on button" );
  console.log( event.target );
}

const doubleclick = ( event ) => {
  window.alert( "Now you have doubleclicked" );
  console.log( event )
}

function updateInputedTextLesson3( event ) {
  const inputedText = document.querySelector( "p#inputedTextLesson3" );
  inputedText.innerText = event.target.value;
}

function generateColor() {
  return Math.floor( (Math.random() * 1000) % 255 );
}

function validateText( input ) {
  return input.match(/^[a-zA-ZýÝ]+$/);
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
          <button id="button4" class="btn btn-primary">Change color</button>
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
          <p>Usually author needs to provide feedback to enduser if input is incorrect in form of error message, what appears after click on submit button. Bootstrap provides two classes (is-valid/is-invalid) for input, textarea and select elements. Submit button has default behavior and sends form content to backend server. To prevent this behavior we need to call .preventDefault() and .stopPropagation().</p>
        </div>
        <div class="col-8">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">function validateText( input ) {
  return input.match(/^[a-zA-Z]+$/);
}
  document.querySelector( "form button" ).addEventListener( "click", event => {
    const assignClass = ( input, element ) => {
      if ( validateText( input ) ) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
      } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
      }
    }

    const firstName = document.querySelector( "#firstName" );
    assignClass( firstName.value, firstName );

    event.preventDefault();
    event.stopPropagation();
  });
          </code></pre>
        </div>
      </div>
      <div class="row my-3">
        <form novalidate>
          <div class="col">
            <label for="firstName" class="form-label">First name</label>
            <input type="text" class="form-control" id="firstName" required>
            <div class="invalid-feedback">
              You can input only characters
            </div>
          </div>
          <div class="col">
            <label for="lastName" class="form-label">Last name</label>
            <input type="text" class="form-control" id="lastName" required>
            <div class="invalid-feedback">
              You can input only characters
            </div>
          </div>
          <button class="btn btn-primary my-2" type="submit">Submit form</button>
        </form>
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

  const buttonClick = document.querySelector( "#button4" );
  buttonClick.addEventListener( "click", ( event ) => {
    const red = generateColor();
    const green = generateColor();
    const blue = generateColor();
    document.querySelector( "p#inputedTextLesson3" ).style.color = `rgb( ${red}, ${green}, ${blue} )`;
  } );

  // Assign functionality to Submit button
  document.querySelector( "form button" ).addEventListener( "click", event => {

    // To follow DRY principle I have function 
    const assignClass = ( input, element ) => {
      if ( validateText( input ) ) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
      } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
      }
    }

    const firstName = document.querySelector( "#firstName" );
    const lastName = document.querySelector( "#lastName" );

    assignClass( firstName.value, firstName );
    assignClass( lastName.value, lastName );

    event.preventDefault();
    event.stopPropagation();
  });

  Prism.highlightAll();
}
