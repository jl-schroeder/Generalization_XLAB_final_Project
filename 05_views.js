// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://babe-project.github.io/babe-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = babeViews.view_generator("intro",{
    trials: 1,
    name: 'intro',
    // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
    text:   `Introduction:
            <br />
            <br />
            Hello participant.
			<br />
			You are in the <strong>${coin}</strong> group.
			<br />
			Therefore you have <strong>${numb_of_trials}</strong> clicks each trial.
            <br />
            <br />
            This is a experiment where you have to click into a grid in order to fulfill your goal.`,
   buttonText: 'Begin the experiment'
});

// For most tasks, you need instructions views
const instructions = babeViews.view_generator("instructions",{
    trials: 1,
    name: 'instrucions',
    title: 'General Instructions',
    text:  `This is a sample instructions view.
            <br />
            <br />
            Tell your participants what they are to do here.`,
    buttonText: 'go to trials'
});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = babeViews.view_generator("post_test",{
    trials: 1,
    name: 'post_test',
    title: 'Additional information',
    text: 'Answering the following questions is optional, but your answers will help us analyze our results.'

    // You can change much of what appears here, e.g., to present it in a different language, as follows:
    // buttonText: 'Weiter',
    // age_question: 'Alter',
    // gender_question: 'Geschlecht',
    // gender_male: 'männlich',
    // gender_female: 'weiblich',
    // gender_other: 'divers',
    // edu_question: 'Höchster Bildungsabschluss',
    // edu_graduated_high_school: 'Abitur',
    // edu_graduated_college: 'Hochschulabschluss',
    // edu_higher_degree: 'Universitärer Abschluss',
    // languages_question: 'Muttersprache',
    // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
    // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = babeViews.view_generator("thanks", {
    trials: 1,
    name: 'thanks',
    title: 'Thank you for taking part in this experiment!',
    prolificConfirmText: 'Press the button'
});

/** trial (babe's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _babe (e.g. for use with a progress bar)
            and the name of the trial as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
      More about trial life cycle - https://babe-project.github.io/babe-docs/01_designing_experiments/04_lifecycles_hooks/

    - hook: object - option to hook and add custom functions to the view
      More about hooks - https://babe-project.github.io/babe-docs/01_designing_experiments/04_lifecycles_hooks/

* All about the properties of trial views
* https://babe-project.github.io/babe-docs/01_designing_experiments/01_template_views/#trial-views
*/


// Here, we initialize a normal forced_choice view
const forced_choice_2A = babeViews.view_generator("forced_choice", {
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: trial_info.forced_choice.length,
    // name should be identical to the variable name
    name: 'forced_choice_2A',
    data: trial_info.forced_choice,
    // you can add custom functions at different stages through a view's life cycle
    // hook: {
    //     after_response_enabled: check_response
    // }
});

// There are many more templates available:
// forced_choice, slider_rating, dropdown_choice, testbox_input, rating_scale, image_selection, sentence_choice,
// key_press, self_paced_reading and self_paced_reading_rating_scale

/*
const instructions = babeViews.view_generator("gridWorld", {
trials: trial_info.gridWorld.length,
name: 'instructions',
data: trial_info.gridWorld,
}); */



const main_exp = /*babeViews.view_generator*/({
	trials : numb_of_trials,
	name: 'main_exp',
	render : function(CT) {
	var lastClicked;
	var GRID_VALUES = 0;
	var final_value = 0;
	var stepper = 0;
	
	// constants to decide how wide and long the grid should be
	const width_grid = 11;
	const length_grid = 11;

	// 2-dim array to decide how far the clicks are away from each other
	var coordinates = [];
	var row_calc = 0;
	var col_calc = 0;
	var coordinates_distance = 0;
	var distance_list = [];

	var grid = clickableGrid(length_grid,width_grid,function(el,row,col,i,val){
	el.innerHTML = val;
	// console output for further analisation
    console.log("You clicked on element:",el);
	console.log("You clicked on the value:",val);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
	// stuff to analyse:
	final_value = final_value + val;
	coordinates.push([row,col]);

	console.log("Your current value is: ",final_value);
	console.log(coordinates);
	if(stepper==0){
		console.log("You only clicked once.");
	}else if(stepper>0){
		coordinates_distance = (BETRAG(row - row_calc)+BETRAG(col-col_calc));
		console.log("The distance to the previous click is: ",coordinates_distance);
	}
	distance_list.push(coordinates_distance);
	//Test only:
	console.log(distance_list);
	
	row_calc = row;
	col_calc = col;

	// Decide which color the element should get
	if(val < 12){
		el.className='clicked_1';
		if (lastClicked) lastClicked.className='';
		lastClicked = el+lastClicked;
	}
	else if(val > 11 && val < 23){
		el.className='clicked_2';
		if (lastClicked) lastClicked.className='';
		lastClicked = el+lastClicked;
	}
	else if(val > 22 && val < 34){
		el.className='clicked_3';
		if (lastClicked) lastClicked.className='';
		lastClicked = el+lastClicked;
	}
	else if(val > 33 && val < 45) {
		el.className='clicked_4';
		if (lastClicked) lastClicked.className='';
		lastClicked = el+lastClicked;
	}
	else if(val > 44 && val < 56){
		el.className='clicked_5';
		if (lastClicked) lastClicked.className='';
		lastClicked = el+lastClicked;
	}
	else if(val > 55 && val < 67){
		el.className='clicked_6';
		if (lastClicked) lastClicked.className='';
		lastClicked = el+lastClicked;
	}
	else if(val > 66 && val < 78){
		el.className='clicked_7';
		if (lastClicked) lastClicked.className='';
		lastClicked = el+lastClicked;
	}
	else if(val > 77 && val < 90){
		el.className='clicked_8';
		if (lastClicked) lastClicked.className='';
		lastClicked = el+lastClicked;
	}
	else if(val > 89){
		el.className='clicked_9';
		if (lastClicked) lastClicked.className='';
		lastClicked = el+lastClicked;
	}
	/* else if(i==numb_of_trials){
		
	} */
	stepper = stepper+1;
});

document.body.appendChild(grid);

function clickableGrid( rows, cols, callback ){
	var GRID_NUMBERS = createGRID(length_grid,width_grid);
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            GRID_VALUES = GRID_NUMBERS[i];
			//cell.innerHTML = GRID_VALUES
			i= i+1;
            cell.addEventListener('click',(function(el,r,c,i,GRID_VALUES){
				return function(){
                    callback(el,r,c,i,GRID_VALUES);
                }
            })(cell,r,c,i,GRID_VALUES),false);
        }
    }
    return grid;
	}

	}

});