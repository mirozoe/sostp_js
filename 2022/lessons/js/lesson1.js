// JavaScript fundamentals
//

// 1. Data types
//
//  A. Primitive data types
//    * String
//    * Number
//    * Boolean
//    * Null
//    * Undefined
//    * Symbols
//
//  B. Reference data types
//    * Arrays
//    * Objects
//    * Functions
//    * Dates
//    * everything else
//
// Reference: Math object https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
//            Strings https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String

"use strict";

function runLogs() {
  console.log( nextSection( "LESSON 1" ) );
  
  let str = 'Hello World';
  console.log( `str: ${str} type: ${typeof str}` );
  let num = 5;
  console.log( `num ${num} type: ${typeof num}` );
  
  const arr = [1, 2, 3];
  console.log( `arr: ${arr} type: ${typeof arr}` );
  const empty = null;
  console.log( `null: ${empty} type ${typeof empty}` );
  let undef;
  console.log( `undefined: ${undef} type ${typeof undef}` );
  console.log( nextSection("Type conversion") );
  
  
  
  // 2. Type conversion
  //  A. Number to string
  //
  
  str = String(89);
  console.log( `Converted number 89 to ${str} with String()` );
  str = (89).toString()
  console.log( `Converted number 89 to ${str} with toString()` );
  console.log( nextSection("String to number conversion") );
  
  //  B. String to number
  //
  
  num = Number("89");
  console.log( `Converted string 89 to ${num} with Number()` );
  num = parseInt("89");
  console.log( `Converted string 89 to ${num} with parseInt()` );
  console.log( nextSection("Some type to number conversion") );
  
  // Number() method converts false, null to 0 and everything else to NaN
  
  num = Number(false);
  console.log( `False to number conversion: ${num}` );
  num = Number(true);
  console.log( `True to number conversion: ${num}` );
  num = Number( "Hello World" );
  console.log( `Real string conversion: ${num}` );
  console.log( nextSection("Date conversion") );
  
  //  C. Implicit date conversion
  //
  
  num = 10 + 2;
  console.log( `Implicit conversion result: ${num} type ${typeof num}` );
  str = "10" + 2;
  console.log( `Implicit conversion result: ${str} type ${typeof str}` );
  str = "10" + "2";
  console.log( `Implicit conversion result: ${str} type ${typeof str}` );
  console.log( nextSection("Number operations") );
  
  // 3. Number operations
  //
  
  num = 10 + 2;
  console.log( `10 + 2 = ${num}` );
  num = 10 - 2;
  console.log( `10 - 2 = ${num}` );
  num = 10 * 2;
  console.log( `10 * 2 = ${num}` );
  num = 10 / 3;
  console.log( `10 / 3 = ${num}` );
  console.log( `10 / 3 = ${Math.floor(num)}` );
  console.log( `10 / 3 = ${Math.floor(num * 100) / 100}` );
  num += 10;
  console.log( `Result of adding: ${num}` );
  console.log( nextSection("String operations") );
  
  
  // 4. String operations
  //
  
  const hello = "hello";
  const world = "world";
  
  str = hello + " " + world;
  console.log( str );
  console.log( `${hello} ${world}` );     // template literal
  console.log( hello.concat(" ", world) );
  
  console.log( `String length: ${str.length}` );
  
  const spacePosition = str.indexOf(" ");
  console.log( `Character position: ${spacePosition}` );
  console.log( `Substring: ${str.slice(0,spacePosition)}` );
  
  console.log( `Split string: ${str.split(" ")}`);
  console.log( `String includes world: ${str.includes(world)}` );
  console.log( nextSection("Arrays") );
  
  
  // Arrays
  // 1. Array construction
  //  
  
  const arr1 = [1, 8, 56, 5];
  const arr2 = new Array(1, 8, 56, 5);
  
  // JS supports inconsistent data type array
  const inconsitentArr = [2, 5, "Hello", {a: "a", b: 3}, true, 96];
  console.log( inconsitentArr );
  
  // 2. Array operations
  //
  
  console.log( `4th element of arr1: ${arr1[3]}` );
  console.log( `index of 56 element of arr1: ${arr1.indexOf(56)}` );
  console.log( `lenght of arr1: ${arr1.length}` );
  console.log( `isArray result: ${Array.isArray(arr1)} and result: ${Array.isArray(inconsitentArr)}` );
  
  // Manipulation with const arrays is possible only in case you change content, but you cannot assign different array
  arr1.push( 100 );     // append 100 to the end of array
  console.log( `Append 100 to the end: ${arr1}` );
  arr1.unshift( 200 );  //append 200 to the begining of array
  console.log( `Append 200 to the begining: ${arr1}` );
  arr1.pop();         // delete 100 from the end
  console.log( `Delete 100 from the end: ${arr1}` );
  arr1.shift();       // delete 200 from the begining
  console.log( `Delete 200 from the begining: ${arr1}` );
  arr1.splice( 1, 2 );  // deletes two elements begining on index 1
  console.log( `Splice of arr: ${arr1}` );
  const concat = arr1.concat( arr2 );  // join arrays together
  console.log( `Array concatenation: ${concat}` );
  console.log( `Alphabetical sort array: ${concat.sort()}` );    // This is alphabetical order not number one !!!
  
  // For sorting numbers array you want to use this
  const sorted = concat.sort( (x,y) => x - y );
  console.log( `Number sorted array: ${sorted}` );
  console.log( nextSection("Objects") );
  
  // Object literals
  // 1. Definition
  //
  
  const obj = {
    name: "Petr",
    surname: "Novák",
    age: 45,
    male: true,
    address: {
      city: "Ústí nad Labem",
      street: "Masarykova 89"
    },
    getSummary: function () { return `${this.name}-${this.age}` },
  }
  
  console.log( `Name: ${obj.name}, Surname: ${obj.surname}, Age: ${obj.age}, Male: ${obj.male}` );
  console.log( obj.getSummary() );
  
  //  2. Operations
  //
  
  obj.name = "Petra";
  obj.surname = "Nováková";
  obj.age = 20;
  obj.male = false;
  
  console.log( `Name: ${obj.name}, Surname: ${obj.surname}, Age: ${obj.age}, Male: ${obj.male}` );
  console.log( nextSection("IF statements") );
  
  
  // Flow control aka decision what part of code will be executed
  //
  // 1. IF statements
  //
  
  if ( obj.age == 20 ) {
    console.log( "Use == : Object age is 20" );
  }
  
  if ( obj.age == "20" ) {
    console.log( "Use == : Object age is \"20\"" );
  } else {
    console.log( "Use == : Object age is NOT \"20\"" );
  }
  
  // == operator compares content but not type, most of time you want to use === what checks content and type of variables
  // similarly it works with != and !==
  if ( obj.age === 20 ) {
    console.log( "Use === : Object age is 20" );
  }
  
  if ( obj.age === "20" ) {
    console.log( "Use === : Object age is \"20\"" );
  } else {
    console.log( "Use === : Object age is NOT \"20\"" );
  }
  console.log( nextSection() );
  
  if ( obj.age === 25 ) {
    console.log( "Age 25" );
  } else if ( obj.age < 25 ) {
    console.log( "Age is under 25" );
  } else {
    console.log( "Age is above 25" );
  }
  
  // false, 0, null and undefined resolves as false !!!
  if ( obj.profession ) {
    console.log( "Profession is defined" );
  } else {
    console.log( "Profession is not defined" );
  }
  console.log( nextSection("Ternary operator") );
  
  
  //  2. Ternary operator
  //
  
  const sex = obj.male ? "muž" : "žena";
  console.log( sex );
  console.log( nextSection("Switch") );
  
  //  3. Switch statement
  //
  
  obj.profession = "teacher"
  switch (obj.profession) {
    case "teacher":
      console.log( "He/She is a teacher" );
      break;
    case "student":
      console.log( "He/She is a student" );
      break;
    default:
      console.log( `Profession is some different: ${obj.profession}` );
  }
  
  // Special technique is chaining operator what checks if object contains attribute/method and if not returns undefined
  if (obj?.address?.street) {
    console.log( `Street is ${obj.address.street}` );
  }
  console.log( `ZIP code on object exist: ${obj.address?.zip}` );
}

// Function declarations
//  1. Function keyword
//

function greet(firstName = "Petr", lastName = "Novák") {
  return `Hello ${firstName} ${lastName}`;
}

//  2. Arrow function
//
//    Trouble with arrow function is that this pointer is reset and not pointing to document, but to window. It concludes that arrow function cannot be used as constructor and few others.

const greet_arrow = (firstName = "David", lastName = "Novák") => {
  return `Hello ${firstName} ${lastName}`;
}

// 3. Function with variadic arguments
//

function variadic_fn(...args) {
  args.forEach( arg => console.log( `Argument is: ${arg}` ) );
}

// 4. Function expressions
//

const fn = function(firstName, lastName) {
  return `Servus ${firstName} ${lastName}`;
};
console.log( fn("Lenka", "Nováková") );


function nextSection(section) {
  return section ? `------Next section: \n${section}\n------` : "------Next section------";
}

function runLesson1( parent ) {
  const element = document.createElement( "div" );
  element.setAttribute( "id", "lesson1" );
  element.innerHTML = `
    <div class="container my-4">
      <div class="row">
        <div class="col">
          <h4>Lesson 1 content</h4>
          <p>Please open Web Developer Tools -> Console and walk through the logs.</p>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h5>Variables</h5>
          <p>Declaration of variable is possible with <b><i>var, const, let</i></b>. In reality <b><i>var</i></b> has global scope and it behaves "strange" in local scope of function for example. You don't want to use it.
          JavaScript is dynamic-typed language, there is no need to specify a variable type (in TypeScript you have to). Interpreter make type assumption from input.</p>
        </div>
        <div class="col-8">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">let str = 'Hello World'; // string
let num = 5;  // integer
const arr = [1, 2, 3]; //array
const obj = {
    name: "Philip", 
    high: 190, 
    weight: 86.1 
}; //object
const empty = null; // null value
let undef; // undefined value
          </code></pre>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h5>Type conversion</h5>
          <p>Not everytime type is assumed correct, you need to re-type on your own. Here are just few examples, more of them you can find <a href="https://www.w3schools.com/js/js_type_conversion.asp">here</a>. Useful to check the type of variable is <b><i>typeof</i></b>.</p>
        </div>
        <div class="col-8">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">str = String(89);
str = (89).toString()
num = Number("89");
num = parseInt("89");
num = parseFloat("8.9");</code></pre>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h5>Usual number and string operations</h5>
          <p>Like in other languages you can do math operations on numbers and also handle strings. Again more eamples you can find <a href=""https://www.w3schools.com/js/js_string_methods.asp>here</a> and <a href="https://www.w3schools.com/js/js_number_methods.asp">here</a>.</p>
        </div>
        <div class="col-8">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">const hello = "hello";
const world = "world";
str = hello + " " + world; // concatenate two strings
const templateLiteral = \`Template string with variable \${str}\`;
const spacePosition = str.indexOf(" "); // find a spece position
const arr = str.split(" "); // split string by space
num = 10 + 2;
num = 10 - 2;
num = 10 * 2;
num = 10 / 3;
num += 10;</code></pre>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h5>Arrays</h5>
          <p>They are an collection of values, but values doesn't need to be the same type. Creation and usage is very similar to other C-like languages.</p>
        </div>
        <div class="col-8">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">const arr1 = [1, 8, 56, 5];
const arr2 = new Array(1, 8, 56, 5);
const inconsitentArr = [2, 5, "Hello", {a: "a", b: 3}, true, 96];
let element = arr1[3]; // 4th element
let elementPosition = arr1.indexOf(56);
let arrayLength = arr1.length;
let array = Array.isArray(inconsitentArr); // check if variable is array
arr1.push( 100 );     // append 100 to the end of array
arr1.unshift( 200 );  //append 200 to the begining of array
arr1.pop();         // delete 100 from the end
arr1.shift();       // delete 200 from the begining
arr1.splice( 1, 2 );  // deletes two elements begining on index 1
const concat = arr1.concat( arr2 );  // join arrays together
const sorted = concat.sort( (x,y) => x - y );</code></pre>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h5>Objects</h5>
          <p>In JavaScript everything what is not an basic type or array or Symbol is Object. Work with object is also usual as in other C-like languages.</p>
        </div>
        <div class="col-8">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">const obj = {
    name: "Petr",
    age: 45,
    male: true,
    address: {
      city: "Ústí nad Labem",
      street: "Masarykova 89"
    },
    getSummary: function() { return \`\${this.name}-\${this.age}\`},
  }
obj.name = "Petra";
const age = obj.age;

          </code></pre>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h5>Flow control with IF/ternary operator/SWITCH</h5>
          <p>Usually you want to use IF for changing flow of script. In simple cases you can use ternary operator and in specific cases you can use SWITCH. JS beside variable content can also check type of variables. In most case you want this type checking, JS use for that <b><i>===</i></b> operator. Another interesting property is that FALSE, 0, null, undefined and NaN are all evaluated as FALSE.</p>
        </div>
        <div class="col-8">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">  if ( obj.age == "20" ) { // check pass even obj.age is Number and value is String
    // == is called loose equity and JS tries implicit coersion
    console.log( "Use == : Object age is 20" );
  }
  
  if ( obj.age == "20" ) { 
    console.log( "Use == : Object age is \"20\"" );
  } else {
    console.log( "Use == : Object age is NOT \"20\"" );
  }
  if ( obj.age === 20 ) { 
    console.log( "Use === : Object age is 20" );
  }
  
  // === is called strict equity JS doesn't do implicit coersion
  if ( obj.age === 25 ) { 
    console.log( "Age 25" );
  } else if ( obj.age < 25 ) { 
    console.log( "Age is under 25" );
  } else {
    console.log( "Age is above 25" );
  }
  
  // false, 0, null and undefined resolves as false !!!
  if ( obj.profession ) { 
    console.log( "Profession is defined" );
  } else {
    console.log( "Profession is not defined" );
  }

  const sex = obj.male ? "muž" : "žena";

  obj.profession = "teacher"
  switch (obj.profession) {
    case "teacher":
      console.log( "He/She is a teacher" );
      break;
    case "student":
      console.log( "He/She is a student" );
      break;
    default:
      console.log( \`Profession is some different: \${obj.profession}\` );
  };</code></pre>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h5>Function definition</h5>
          <ul>
            <li>Pre ES6 approach is to define function with function keyword. ES6 came with arrow function, what is usually used, because it is shorter to write. But there are use cases where you cannot use arrow function (f.g. arrow func doesn't have binding to this keyword, so it cannot be used as method).</li>
            <li>Primitive types are passed by value. Objects and array are passed by reference, but you cannot change whole object/array what variable points to.</li>
          </ul>
        </div>
        <div class="col-8">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">function greet(firstName = "Petr", lastName = "Novák") {
  return \`Hello \${firstName} \${lastName}\`;
}

const greet_arrow = (firstName = "David", lastName = "Novák") => {
  return \`Hello \${firstName} \${lastName}\`;
}

function variadic_fn(...args) { // rest operator creates array from all the rest args
  args.forEach( arg => console.log( \`Argument is: \${arg}\` ) );
}

const fn = function(firstName, lastName) {
  return \`Servus \${firstName} \${lastName}\`;
};
console.log( fn("Lenka", "Nováková") );</code></pre>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h5>Specialities</h5>
          <ul>
            <li>Chaining operator - checks if object attribute has value in case not it will return <b><i>undefined</i></b>, but doesn't throw an exception.</li>
            <li>Default operator - if variable on left side evaluates as FALSE assigned is right side.</li>
            <li>Nullish coalescing operator - if 1st opperand is null/undefined assign 2nd, otherweis return 1st</li>
            <li>Guard operator - if 1st arg is true, use default value, otherweis 2nd one.</li>
            <li>Spread operator - explode array into separate values</li>
            <li>Rest operator - used in variadic functions</li>
            <li>Implicit coersion - try to avoid it (f.g. https://github.com/denysdovhan/wtfjs)</li>
          </ul>
        </div>
        <div class="col-8">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">if (obj?.address?.street) {
    console.log( \`Street is \${obj.address.street}\` );
  }
  console.log( \`ZIP code on object exist: \${obj.address\?.zip}\` );
};

const truth = "some string";
let value = truth || "default value"; // some string
value = 0 || "default value";         // default value
value = 0 ?? "default value";         // 0
value = null ?? "default value";      // default value
value = truth && "default value";     // default value 
value = 0 && "default value";         // 0
                           
let array = [ 1,2,3 ];
console.log( ...array );
          </code></pre>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h5>Logging to console</h5>
          <p>For debugging purposes there are couple of logging possibilities. Ususally it is recommended to use them in development, but not in production code.</p>
        </div>
        <div class="col-8">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">console.log(\`Somve value \${val}\`);
console.warn("Warning");
console.error("Error");
console.debug("Debug");
console.time("Start"); console.timeEnd("Start"); // Easy profiling
console.assert( val > 10, "Value is higher"); // Conditional logging
console.table(obj);
          </code></pre>
        </div>
      </div>
    </div>
  `;
  parent.appendChild( element );
  runLogs();

  // run code higlighting
  Prism.highlightAll();

  console.log( nextSection( "calling functions" ) );
  console.log( greet() );
  console.log( greet("Petra", "Nováková") );
  console.log( greet_arrow() );
  console.log( greet_arrow("Adéla", "Nováková") );
  variadic_fn( "arg1", 2, true );
}
