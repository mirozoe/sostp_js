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
    }
  }
  
  console.log( `Name: ${obj.name}, Surname: ${obj.surname}, Age: ${obj.age}, Male: ${obj.male}` );
  
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
          <h5>Lesson 1 content</h5>
          <p>Please open code and walk through.</p>
        </div>
      </div>
    </div>
  `;
  parent.appendChild( element );
  runLogs();

  console.log( nextSection( "calling functions" ) );
  console.log( greet() );
  console.log( greet("Petra", "Nováková") );
  console.log( greet_arrow() );
  console.log( greet_arrow("Adéla", "Nováková") );
  variadic_fn( "arg1", 2, true );
}
