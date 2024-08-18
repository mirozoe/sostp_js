// 
// Lesson 2
//
// Introduction to DOM (Document object model)
//
// * Receiving part of DOM
// * Traversing DOM elements 
// * Creating new DOM elements and add them to DOM
//

"use strict";

function logExamples() {
  // 1. Selecting from already existing DOM
  //    Older methods: 
  //
  //  A. getElementById()
  //    returns single HTMLElement

  console.log( nextSection( "LESSON 2" ) );
  console.log( nextSection( "getElementById" ) );
  
  console.log( document.getElementById( "placeholder" ) );
  console.log( nextSection( "getElementsByClassName" ) );
  
  //  B. getElementsByClassName()
  //    returns iterable HTMLCollection (contains only HTML elements not text elements and so)
  //    Similar method is getElementsByName, getElementsByTagName
  
  console.log( document.getElementsByClassName( "col" ) );
  console.log( nextSection("querySelector") );
  
  //  Recent methods:
  //  A. querySelector
  //    use CSS selectors to select element, if more than one element coresponds only first one is returned
  //
  console.log( document.querySelector( ".col" ) );
  console.log( nextSection( "querySelectorAll") );
  
  //  B. querySelectorAll
  //    returns iterable NodeList (contains HTML, text, attributes elements and so)
  
  console.log( document.querySelectorAll( ".col" ));
  console.log( nextSection( "Traversing DOM with childNodes" ) );

  // 2. Traversing DOM
  // 
  //  A. with childNodes property
  //    be aware that you can see in output text elements around div, those are "\n" after both <div> tags
  const divs = document.querySelector( "#mainContainer" )
  console.log( divs.childNodes );

  //  B. with children property
  //    as difference to childNodes, text elements are not included
  console.log( divs.children );
  console.log( nextSection( "Get sibling elements" ) );

  // you can also use properties firstElementChild, lastElementChild
  // as HTMLCollection is iterable you can access elements in forEach loop or directly by index
  //
  //  C. siblings with nextSibling/nextElementSibling or previousSibling/previousElementSibling
  //
  console.log( `This is a "center element" and get sibglings around it` );
  console.log( divs.children[1] );
  console.log( divs.children[1].nextElementSibling );
  console.log( divs.children[1].previousElementSibling );
  console.log( nextSection( "Get parent element" ) );

  //  D. get parent with parentElement
  //
  console.log( divs.parentElement );
}

function displayContent( parent ) {
  const desc = document.createElement( "div" );
  desc.innerHTML = `
    <div class="row">
      <div class="col">
        <p>Big strength of JS is possibility to manipulate with DOM (Document Object Model). It is tree based model
          what represents HTML page. JS can walk through the tree and can modify it (add/delete/edit). To do such
          there are planty of functions what can be used. There is <b><i>window</i></b> object what represents browser
          opened window. Child is <b><i>document</i></b> object, what represents DOM.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <h5>Window</h5>
        <b><i>Window</i></b> object describes browser window and allows you to manipulate with it. API description available <a href="https://www.w3schools.com/jsref/obj_window.asp">here</a>.
      </div>
      <div class="col-8">
        <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">
// properties
window.history  // holds history of window
window.innerHeight, window.innerWidth // height, width with scrollbars
window.location // holds URL
                
// methods
window.open(), window.close() // opens, close new window
window.resizeBy(), window.scrollBy()  // resize window, scroll in window
window.alert(), window.confirm(), window.prompt()  // opens a dialog
                                                   
// child objects
document  // DOM
navigator // info about browser
history   // history of browser session
location   // info about URL
        </code></pre>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
      </div>
    </div>
  `

  // 3. Creating new elements
  //
  // Oldfashion way to manipulate a DOM
  //

  const newDiv = document.createElement( "div" );
  newDiv.setAttribute( "id", "lesson2" );
  const container = document.createElement( "div" );
  container.className = "container my-4";
  const row = document.createElement( "div" );
  row.className = "row";
  const col = document.createElement( "div" );
  col.className = "col";
  const header = document.createElement( "h4" );
  const par = document.createElement( "p" );
  par.innerText = "Please open code and walk through.";

  // TextNode is distinguishable in NodeList, but not in HTMLElements
  const headerText = document.createTextNode( "Lesson 2 content" );
  header.appendChild( headerText );
  col.appendChild( par );
  row.appendChild( col );
  container.appendChild( row );
  newDiv.appendChild( header );
  newDiv.appendChild( desc );
  newDiv.appendChild( container );

  // Alternatively you can update innerHTML property

//  newDiv.innerHTML = `
//   <div class="container my-4">
//     <div class="row">
//       <div class="col">
//         <h5>Lesson 2 content</h5>
//         <p>Please open code and walk through.</p>
//       </div>
//     </div>
//   </div>
//  `
  parent.appendChild( newDiv );
  console.log( nextSection( "Update element attributes" ) );

  // 4. Get/Set attributes
  //
  console.log( `paragraph has attributes: ${par.hasAttributes()}` );
  par.setAttribute( "id", "newlySetAttribute" );
  console.log( `after setting attribute paragraph has attributes: ${par.hasAttributes()}` );
  console.log( `and those attributes are: ${par.getAttribute( "id" )}`);
  console.log( `also you can check if attribute "id" is set: ${par.hasAttribute( "id" )}` );
  console.log( nextSection( "Get and set classes on element" ) );

  // 5. Get/Set classes
  //
  console.log( container.className );
  console.log( container.classList );

  const par2 = document.createElement( "p" );
  par2.innerText = "This is text on what are classes changed via JS.";
  col.appendChild( par2 );

  par2.className = "h5";
  console.log( `now par2 has this class: ${par2.className}` );
  par2.classList.add( "display-6" );
  console.log( `and now par2 has this classes: ${par2.className}` );
  par2.classList.add("display-1");
  par2.classList.remove("display-1");
  console.log(`classes applied on par2: ${par2.className}`);

  // 6. Remove/Replace elements in DOM
  //
  //  A. Replace is used to switch one element with another with replaceChild
  //      it needs to be used on parent element and syntax is replaceChild( newOne, oldOne )
  //
//  const par3 = document.createElement( "p" );
//  par3.innerText = "This par3 replaced previously used par2.";
//  col.replaceChild( par3, par2 );

  //  B. Remove child with removeChild()
  //
//  col.removeChild( par2 );
  Prism.highlightAll();
}

function runLesson2( parent ) {
  logExamples();
  displayContent( parent );
}
