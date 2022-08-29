// JavaScript OOP
//

// JS is objective oriented language, but original syntax is different than in other languages.
// This evolved in ES6 into "new" syntax, what corresponds with other languages
// and is more convinient to developers. New syntax hower is still only syntactic sugar
// and behind the scenes it use old way. At the end of chater you will see example of pre ES6
// syntax.
//

class Person {
  constructor( name ) {
    this.name = name;
  };

  getName() {
    return this.name;
  };
};

class Student extends Person {
  constructor( name, grade ) {
    super( name );
    this.grade = grade;
  };
  getGrade() {
    return this.grade;
  };
};

class Teacher extends Person {
  constructor( name, ...subjects ) {
    super( name );
    this.subjects = subjects;
  };
  getSubjects() {
    return this.subjects;
  };
};

// constructor
//function Person( name ) {
//  this.name = name;
//};
//
//function Student( name, grade ) {
//  Person.call( this, name );
//  this.grade = grade;
//};
//
//// prototype functions (object methods)
//Person.prototype.getName = function() {
//  return this.name;
//};
//
//Student.prototype = Object.create( Person.prototype );
//Student.prototype.constructor = Student;
//Student.prototype.getGrade = function() {
//  return this.grade;
//};


const getSelectedValue = () => {
  const select = document.querySelector( "#selectLesson4" );
  return select.value;
};

const generateObjectRepresentation = ( object ) => {
  const element = document.createElement( "div" );
  element.setAttribute( "class", "row" );
  element.innerHTML = `<div class="col-2">
        <p>You've created: </p>
      </div>
      <div class="col-4">
        <pre><code class="language-json">${JSON.stringify( object )}</code></pre>
      </div>
      <div class="col-3">
        and name get by method getName():
      </div>
      <div class="col-3">
        <b>${object.getName()}</b>
      </div>
    `;
  return element;
};

function runLesson4( parent ) {
  const element = document.createElement( "div" );
  element.setAttribute( "id", "lesson4" );
  element.innerHTML = `
    <div class="container my-4">
      <div class="row">
        <div class="col">
          <h5>Lesson 4 content</h5>
          <p>Let's have class Person and than two subclasses (Student/Teacher). All classes are defined as follows:</p>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">class Person {
  constructor( name ) {
    this.name = name;
  };

  getName() {
    return this.name;
  };
};</code></pre>
        </div>
        <div class="col-4">
          <pre data-src="prism.js" class="language-javascript"><code class="language-javascript">class Student extends Person {
  constructor( name, grade ) {
    super( name );
    this.grade = grade;
  };

  getGrade() {
    return this.grade;
  };
};</code></pre>
        </div>
        <div class="col-4">
          <pre><code class="language-js">class Teacher extends Person {
  constructor( name, ...subjects ) {
    super( name );
    this.subjects = subjects;
  };

  getSubjects() {
    return this.subjects;
  };
};</code></pre>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="selectObjectLesson4" class="form-label">Select object</label>
          <select id="selectLesson4" class="form-select">
            <option value="person">Person</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <button id="buttonLesson4" class="btn btn-primary my-3">Create object</button>
        </div>
      </div>
    </div>`;
  parent.appendChild( element );

  const placeholder = document.createElement( "div" );
  placeholder.id = "placeholderLesson4";
  parent.appendChild( element );

  document.querySelector( "#buttonLesson4" ).addEventListener( "click", () => {
    let object = {};
    switch ( getSelectedValue() ) {
      case "student":
        object = new Student( "Antonín", 1 );
        break;
      case "teacher":
        object = new Teacher( "Jan", "Python", "Java" );
        break;
      default:
        object = new Person( "Tomáš" );
    };

    console.log( object );
    const placeholder = document.querySelector( "#placeholderLesson4" );
    placeholder.appendChild( generateObjectRepresentation( object ) );
  });
  
  const preES6classes = document.createElement( "div" );
  preES6classes.setAttribute( "class", "row my-5" );
  preES6classes.innerHTML = `
    <div class="accordion">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Pre ES6 OOP syntax
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <div class="row">
              <div id="prototypes" class="col-6">
                <label for="codeObjectDefLesson4" class="form-label">Object definition</label>
                <pre id="codeObjectDefLesson4"><code class="language-js">// constructor
  function Person( name ) {
    this.name = name;
  };
  
  function Student( name, grade ) {
    Person.call( this, name );
    this.grade = grade;
  };</code></pre>
              </div>
              <div class="col-6">
                <label for="codeMethodsDefLesson4" class="form-label">Methods definition</label>
                  <pre id="codeMethodsDefLesson4"><code class="language-js">// prototype functions (object methods)
  Person.prototype.getName = function() {
    return this.name;
  };
  
  Student.prototype = Object.create( Person.prototype );
  Student.prototype.constructor = Student;
  Student.prototype.getGrade = function() {
    return this.grade;
  };</code></pre>
                </div>
              </div>
            </div>
          </div>
    </div>
  `;

  element.appendChild( preES6classes );

  // run code higlighting
  Prism.highlightAll();

};

