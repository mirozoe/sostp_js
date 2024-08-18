// Asynchronous JavaScript
//
// Usual use case for asynchronous calls are communication with background
// database. As JS evolves, there are couple of approaches. Original solution 
// is AJAX (Asynchronous JavaScript And XML). Newer approach is to use Fetch API
// with Promises or even Async/Await keywords for writing code like synchronous one.
//

"use strict";

function runLesson5( parent ) {
  const element = document.createElement( "div" );
  element.setAttribute( "id", "lesson5" );
  element.innerHTML = `
    <div class="container my-4">
      <div class="row">
        <div class="col">
          <h4>Lesson 5 content</h4>
          <p>When you click on the button, async call is made and after few seconds timeout it returns the result</p>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <button id="asyncAJAXLesson5" class="btn btn-primary">Make AJAX call</button>
        </div>
        <div class="col">
          <p id="placeholderAJAXLesson5" class="my-auto"></p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">document.querySelector( "#asyncAJAXLesson5" )
    .addEventListener( "click", () => {

      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        if (xhr.status === 200) {
          setTimeout( () => {
            const response = JSON.parse(xhr.responseText);
            document.querySelector( "#placeholderAJAXLesson5" )
             .innerText = response.name;
          }, 2000 );

        } else {
          console.error( "Error calling example async function" );
        };
      };

      xhr.open( "GET", "https://swapi.dev/api/people/2" );
      xhr.send();
  });</code></pre>
        </div>
      </div>
      <div class="row">
        <p>With ES6 came fetch API and Promises, it allows easier way of working with asnycronous calls. Promise needs to be handled by then function with callback inside.</p>
      </div>
      <div class="row">
        <div class="col-2">
          <button id="asyncFetchLesson5" class="btn btn-primary">Make fetch call</button>
        </div>
        <div class="col">
          <p id="placeholderFetchLesson5" class="my-auto"></p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">document.querySelector( "#asyncFetchLesson5" )
    .addEventListener( "click", () => {

      fetch( "https://swapi.dev/api/people/3", {
        method: "GET",
      })
        .then( (response) => response.json() )
        .then( (data) => {
          const placeholder = document.querySelector( "#placeholderFetchLesson5" );
          placeholder.innerText = data.name;
        })
        .catch( (err) => console.error( err ) );
  });</code></pre>
        </div>
      </div>
      <div class="row">
        <p>Next JS release (ES7) came with async/await functionality what can handle Promises in much convenience way. Code write looks like synchronous code. Rule is that await keyword can be used only in async function. Beside that you can use try/catch/finally statement.</p>
      </div>
      <div class="row">
        <div class="col-2">
          <button id="asyncAwaitLesson5" class="btn btn-primary">Make fetch call with await</button>
        </div>
        <div class="col">
          <p id="placeholderAwaitLesson5" class="my-auto"></p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">document.querySelector( "#asyncFetchLesson5" )
    .addEventListener( "click", async () => {

      try {
        const response = await fetch( "https://swapi.dev/api/people/4", {
          method: "GET",
        });
  
        const data = await response.json();
        const placeholder = document.querySelector( "#placeholderAwaitLesson5" );
        placeholder.innerText = data.name;
      } catch( err ) {
        console.error( err );
      };
  });</code></pre>
        </div>
      </div>
      <div class="row>
        <div class="col">
          For better communication between frontend and backend develeopers there is commonly used interface called <a href="https://oai.github.io/Documentation/specification.html">OpenAPI/Swagger</a> what easily and clearly describe REST API interface. OpenAPI format is well known and is supported by cloud providers (AWS, GCP, ...) as well as numerous libraries you can use for development. Another advantage of using formulized API is support for mocking backend reponses. Light example you could find <a href="../src/backend/openapi.yaml">here</a>.
        </div>
      </div>
    </div>`;
  parent.appendChild( element );

  // This is AJAX example
  document.querySelector( "#asyncAJAXLesson5" )
    .addEventListener( "click", () => {

      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          document.querySelector( "#placeholderAJAXLesson5" )
           .innerText = response.name;
        } else {
          console.error( "Error calling example async function" );
        };
      };

      xhr.open( "GET", "https://swapi.dev/api/people/2" );
      xhr.send();
  });

  // This is fetch API call example (comme with ES6)
  document.querySelector( "#asyncFetchLesson5" )
    .addEventListener( "click", () => {

      // fetch returns promise and that can be handled by then
      fetch( "https://swapi.dev/api/people/3", {
        method: "GET",
      })
        .then( (response) => response.json() )
        .then( (data) => {
          const placeholder = document.querySelector( "#placeholderFetchLesson5" );
          placeholder.innerText = data.name;
        })
        .catch( (err) => console.error( err ) );
  });

  // This is fetch API call example await/async (comme with ES7)
  document.querySelector( "#asyncAwaitLesson5" )
    .addEventListener( "click", async () => {

      try {
        // fetch returns promise what is handled by await 
        const response = await fetch( "https://swapi.dev/api/people/4", {
          method: "GET",
        });
  
        const data = await response.json();
        const placeholder = document.querySelector( "#placeholderAwaitLesson5" );
        placeholder.innerText = data.name;
      } catch( err ) {
        console.error( err );
      };
  });

  // run code higlighting
  Prism.highlightAll();

};

