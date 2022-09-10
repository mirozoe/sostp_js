// JavaScript events
//

// Events are usually triggered by user interaction with web/DOM. Events are necessary
// for SPA (Single page application). 
// There are plenty of events https://developer.mozilla.org/en-US/docs/Web/API/Event
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
    </div>
  `;
  parent.appendChild( element );

  const inputText = document.querySelector( "input#freeTextLesson3" );
  inputText.addEventListener( "keyup", updateInputedTextLesson3 );

  const buttonClick = document.querySelector( "div#lesson3 button");
  buttonClick.addEventListener( "click", ( event ) => {
    const red = generateColor();
    const green = generateColor();
    const blue = generateColor();
    console.log(`rgb( ${red}, ${green}, ${blue})`);
    document.querySelector( "p#inputedTextLesson3" ).style.color = `rgb( ${red}, ${green}, ${blue})`;
  } );
}
