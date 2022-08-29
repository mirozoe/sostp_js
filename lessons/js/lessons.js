const IN = 'in';
const OUT = 'out';

const placeholder = document.querySelector( "#placeholder" )

function lesson_change_bg( element, type ) {
  if (type == IN) {
    element.classList.add("text-bg-info");
  } else {
    element.classList.remove("text-bg-info");
  }
}

let demo = document.querySelector( "#demo" );
demo.addEventListener( "mouseover", function () { lesson_change_bg(demo, IN) } );
demo.addEventListener( "mouseout", function () { lesson_change_bg(demo, OUT) } );
demo.addEventListener( "click", function() {
    if ( placeholder.children.length ) {
      for( child of placeholder.children ) {
        placeholder.removeChild( child )
        child.getAttribute( "id" ) === "demo" ? null : runDemo( placeholder );
      };
      return;
    }
    runDemo( placeholder );
})

let lesson1 = document.querySelector('#lesson1');
lesson1.addEventListener( "mouseover", function () { lesson_change_bg(lesson1, IN) } );
lesson1.addEventListener( "mouseout", function () { lesson_change_bg(lesson1, OUT) } );
lesson1.addEventListener( "click", function () {
  if ( placeholder.children.length ) {
    for( child of placeholder.children ) {
      placeholder.removeChild( child )
      child.getAttribute( "id" ) === "lesson1" ? null : runLesson1( placeholder );
    };
    return;
  }
  runLesson1( placeholder );
});

let lesson2 = document.querySelector('#lesson2');
lesson2.addEventListener( "mouseover", function () { lesson_change_bg(lesson2, IN) } );
lesson2.addEventListener( "mouseout", function () { lesson_change_bg(lesson2, OUT) } );
lesson2.addEventListener( "click", function () {
  if ( placeholder.children.length ) {
    for( child of placeholder.children ) {
      placeholder.removeChild( child )
      child.getAttribute( "id" ) === "lesson2" ? null : runLesson2( placeholder );
    };
    return;
  }
  runLesson2( placeholder );
});

let lesson3 = document.querySelector('#lesson3');
lesson3.addEventListener( "mouseover", function () { lesson_change_bg(lesson3, IN) } );
lesson3.addEventListener( "mouseout", function () { lesson_change_bg(lesson3, OUT) } );
lesson3.addEventListener( "click", function () {
  if ( placeholder.children.length ) {
    for( child of placeholder.children ) {
      placeholder.removeChild( child )
      child.getAttribute( "id" ) === "lesson3" ? null : runLesson3( placeholder );
    };
    return;
  }
  runLesson3( placeholder );
});

let lesson4 = document.querySelector('#lesson4');
lesson4.addEventListener( "mouseover", function () { lesson_change_bg(lesson4, IN) } );
lesson4.addEventListener( "mouseout", function () { lesson_change_bg(lesson4, OUT) } );
lesson4.addEventListener( "click", function () {
  if ( placeholder.children.length ) {
    for( child of placeholder.children ) {
      placeholder.removeChild( child )
      child.getAttribute( "id" ) === "lesson4" ? null : runLesson4( placeholder );
    };
    return;
  }
  runLesson4( placeholder );
});

let lesson5 = document.querySelector('#lesson5');
lesson5.addEventListener( "mouseover", function () { lesson_change_bg(lesson5, IN) } );
lesson5.addEventListener( "mouseout", function () { lesson_change_bg(lesson5, OUT) } );
lesson5.addEventListener( "click", function () {
  if ( placeholder.children.length ) {
    for( child of placeholder.children ) {
      placeholder.removeChild( child )
      child.getAttribute( "id" ) === "lesson5" ? null : runLesson5( placeholder );
    };
    return;
  }
  runLesson5( placeholder );
});
