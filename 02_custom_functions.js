// Here, you can define all custom functions, you want to use and initialize some variables

/* Variables
*
*
*/
const coin = _.sample(["head", "tail"]); // You can determine global (random) parameters here
// Declare your variables here

/*
const arr_dim = 3;
var array_2D = new Array(arr_dim);

for (i = 0; i <= arr_dim; i++) {
	array_2D[i] = new Array(arr_dim);  
}

for (i = 0; i <= arr_dim; i++) {
	for (j = 0; j <= arr_dim; j++) {
  	array[i][j] = Math.floor(Math.random() * 100 ) + 1;
} 
*/



/* Helper functions
*
*
*/

// This is a function that creates a 2-dim array with random numbers, does not work right now :/ 
/*
function createGRID(width, height){
	var GRID_array = [];
	for(var i = 0;i < width*height;i++){
  	GRID_array[i] = i;
  }
  return GRID_array;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}*/

function createGRID(width, height){
	var GRID_array = [];
	for(var i = 0;i< width*height;i++){
  	GRID_array[i] = Math.floor(Math.random() * 100) +1;
  }
  return GRID_array;
}


/*
// GridWorld with numbers
var lastClicked;
var grid = clickableGrid(11,11,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

    el.className='clicked';
    if (lastClicked) lastClicked.className='';
    lastClicked = el;
});

document.body.appendChild(grid);
 
 */




/* For generating random participant IDs */
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
const dec2hex = function(dec) {
    return ("0" + dec.toString(16)).substr(-2);
};
// generateId :: Integer -> String
const generateID = function(len) {
    let arr = new Uint8Array((len || 40) /2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join("");
};
// Declare your helper functions here



/* Hooks  
*
*
*/

// Error feedback if participants exceeds the time for responding
const time_limit = function(data, next) {
    if (typeof window.timeout === 'undefined'){
        window.timeout = [];
    }
    // Add timeouts to the timeoutarray
    // Reminds the participant to respond after 5 seconds
    window.timeout.push(setTimeout(function(){
          $('#reminder').text('Please answer more quickly!');
    }, 5000));
    next();
};

// compares the chosen answer to the value of `option1`
check_response = function(data, next) {
    $('input[name=answer]').on('change', function(e) {
        if (e.target.value === data.correct) {
            alert('Your answer is correct! Yey!');
        } else {
            alert('Sorry, this answer is incorrect :( The correct answer was ' + data.correct);
        }
        next();
    })
}

// Declare your hooks here


/* Generators for custom view templates, answer container elements and enable response functions
*
*
*/
