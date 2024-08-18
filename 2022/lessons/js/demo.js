const MI = 0;
const SIGMA = 1;

function generateNormSample() {
  return jStat.normal.sample( MI, SIGMA );
};

function roundToTwo( fn ) {
  return Math.floor( fn * 100 ) / 100;
};

function constructDemoOutput( parent, data ) {
  const content = document.createElement( "div" );
  content.setAttribute( "id", "demo" );
  const innerHtml = `
    <div class="container my-4">
      <div class="row">
        <div class="col">
          <h5>Genereated samples from normal distribution</h5>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-3">
          <div class="container">
            <div class="row my-1">
              <button id="generateNewNormSamples" type="submit" class="btn btn-primary">Generate new</button>
            </div>
            <div class="row my-1">
              <button id="showValues" type="button" class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#normValues">Show samples</button>
            </div>
          </div>
        </div>
        <div class="col-1 text-center">
          Mean:
        </div>
        <div class="col-1">
          ${data.mean} 
        </div>
        <div class="col-1 text-center">
          Std Dev:
        </div>
        <div class="col-1">
          ${data.stdev}
        </div>
        <div class="col-2 text-center">
          ttest p-value:
        </div>
        <div class="col-1">
          ${data.pValue} 
        </div>
      </div>
      <div id="normValues" class="row collapse">
        <div class="col">
        </div>
      </div>
    </div>
  `;

  content.innerHTML = innerHtml;

  if (parent.childNodes.length) {
    parent.removeChild( parent.firstChild );
  }

  parent.appendChild( content );
  document.querySelector( "#generateNewNormSamples" ).addEventListener( "click", function() { runDemo( parent ) } );
  document.querySelector( "#showValues" ).addEventListener( "click", function() { 
    const element = document.querySelector( "#demo #normValues .col" );
    console.log(element);

    if ( document.querySelector( "#demo #normValues .col" ).textContent ) {
      element.textContent = JSON.stringify( data.values );
    } else {
      element.textContent = "";
    }
  });
}

function runDemo( parent ) {
  const rand_x = Array( 100 ).fill( 0 );
  rand_x.forEach( function(val, idx) {
    rand_x[idx] = generateNormSample();
  });

  const data = {
    mean: roundToTwo( jStat.mean( rand_x ) ),
    stdev: roundToTwo( jStat.stdev( rand_x ) ),
    pValue: roundToTwo( jStat.ttest( 0, rand_x ) ),
    values: rand_x
  };

  constructDemoOutput( parent, data );
}
