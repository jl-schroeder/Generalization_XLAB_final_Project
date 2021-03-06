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
    text:   `Welcome to our experiment.
            <br />
            <br />
            <strong>Please read the following instructions very carefully:</strong> <br />
            In the following pages, you will be presented with a series of <strong>8 different grids to explore.</strong>
            By clicking on tiles in the grid, you unveil points that are associated to the location on the grid. <br />
            On each grid, you will have <strong>30 clicks</strong>, with the number of remaining clicks displayed above the grid. <br />
            When the current number of clicks are over, the next trial begins with an unexplored grid.
            <br />
            <br />
            During each trial you will either have Maximization or Accumulation tasks (further described on the next page).
            <br />
            <br />
            Using your mouse, click on unexplored tiles to reveal a number corresponding to the number of points you gain.
            Note that the revealed tiles are colour-coded to assist you in this task. <br />
            The darker the colour, the higher the reward.
            Points that you may gain are clustered on the grid.
            This means, areas with high value points appear close to each other and areas of low-value points appear close to each other.
`,
   buttonText: 'Begin the experiment'
});

// For most tasks, you need instructions views
const instructions = babeViews.view_generator("instructions",{
    trials: 1,
    name: 'instrucions',
    title: 'Instructions - Reminder',
    text:  `Summarized Instructions:<br />
            <br />
            <strong>1. </strong>     On this grid with 11x11 tiles, points that you gain are revealed upon mouse-click. The tiles are colored corresponding to the gained points.<br />
            <strong>2. </strong>     There are 8 different grids, each with 30 clicks.<br />
            <strong>3. </strong>     Points are clustered and depend on the location of the tile. Neighboring tiles tend to have similar point values.<br />
            <strong>4. </strong>     On this page, you can also see how many clicks are left in the current trial, which task you have to do and a short reminder-description of the task.<br />
            <strong>5. </strong>     Your reward will be based on the total points you earn as you reveal tiles per mouse click.<br />
            <br />
            On the following page you will have the chance to try out 5 clicks in a Test-grid.
            <br />
            <br />
            In order to familiarise with the experiment, please proceed to the next step.
            On the following page you will have the chance to try out 5 clicks in a Test-grid.
            Your data will not be recorded in this trial. <br />
            If you are ready, please click the <strong>“Go to Test Trial button”</strong>.`,
    buttonText: 'go to test-trial'
});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = babeViews.view_generator("post_test",{
    trials: 1,
    name: 'post_test',
    title: 'Additional information',
    text: 'Answering the following questions is optional, but your answers will help us analyze our results. <br /> Do you have any comments?'

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
    title: 'Thank you for taking part in this experiment! We hope you enjoyed it.',
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

const understanding_check = babeViews.view_generator("instructions",{
  trials: 1,
  name: 'understanding_check',
  title: 'Understanding',
  text: `Great! You have a hang of what needs to be done! Please ensure pop-ups are allowed, for a smooth experience and click the Start button to begin the experiment.
  <br />`,
  buttonText: 'start the experiment'
});

const goal_site = babeViews.view_generator("instructions",{
  trials: 1,
  name: 'goal_site',
  title: 'Goals:',
  text: `
  <strong>Accumulation:</strong>
  <br />
  Your goal is to get the largest added up reward, by combining the values of all tiles you click on.<br />
  There will be a counter that shows you your current combined value.
  <br />
  <br />
  <br />
  <strong>Maximization:</strong>
  Your goal is to find the tile with the maximum value.<br />
  Do this by clicking on the grid to reveal the underlying values. <br />
  Maximum points gained are shown on the left in real-time.<br />
  <br />
  <br />
  <br />
  <strong>Note:</strong> The values are normal distributed.`,
  buttonText: 'Continue'
});

const landing_page = babeViews.view_generator("intro",{
  trials: 1,
  name: 'landing_page',
  title: 'Welcome!',
  text: `
  This study is part of a project conducted by Cognitive Science students at the University of Osnabrueck, investigating how people search in an unknown environment. <br />
  As a participant, you shall be asked to perform a simple computer task in which you have to explore areas on a grid and uncover rewards.<br />
  <br />
  In order to proceed with the experiment, please allow Pop-ups on your web browser.
  <br />
  The information requested in the study will be kept confidential, archived and scientifically processed in accordance with the Data Privacy Act. <br />
  Personal data will not be passed on to any third party. <br />
  The data will be used solely for research purposes and solely within University of Osnabrueck. <br />
  Experimental data will be handled with utmost discretion.

  `,
  buttonText: 'Continue'
});



const grid_search_test = test_exp({
      trials: 1,
      name: 'grid_search_test',
      data: trial_info.test_exp,
});

const grid_search = main_exp(  {
    trials: 8,
    name: 'grid_search',
    data: trial_info.main_exp,
  }
);
