// In this file you can create your own custom view templates


// A view template is a function that returns a view,
// this functions gets some config (e.g. trial_data, name, etc.) information as input
// A view is an object, that has a name, CT (the counter of how many times this view occurred in the experiment),
// trials the maximum number of times this view is repeated
// and a render function, the render function gets CT and the babe-object as input
// and has to call babe.findNextView() eventually to proceed to the next view (or the next trial in this view),
// if it is an trial view it also makes sense to call babe.trial_data.push(trial_data) to save the trial information

const main_exp = function(config) {
  const view = {
    name: config.name,
    CT: 0,
    trials: config.trials,
    // The render functions gets the babe object as well as the current trial in view counter as input
    render: function (CT, babe) {
      // Here, you can do whatever you want, eventually you should call babe.findNextView()
      // to proceed to the next view and if it is an trial type view,
      // you should save the trial information with babe.trial_data.push(trial_data)

      // Normally, you want to display some kind of html, to do this you append your html to the main element
      // You could use one of our predefined html-templates, with (babe.)stimulus_container_generators["<view_name>"](config, CT)
      $("main").html(`<div class='babe-view'>
      <h1 class='babe-view-title'>Click on the grid!</h1>
      <p>You have<strong><div id="divMsg"></div></strong></p>
      <p>clicks left</p>
      <script>document.getElementById("divMsg").innerHTML = (numb_of_trials[CT]-stepper)</script>
      </div>`);

      // This function will handle  the response
      var grid = clickableGrid(length_grid,width_grid,function(el,row,col,i,val){
        document.getElementById("divMsg").innerHTML = (numb_of_trials[CT]-stepper);
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

      stepper = stepper+1;

      /*
      if(stepper>numb_of_trials[stepper]){
        console.log("IT FINALLY WORKED");
        let csvContent = "data:text/csv;charset=utf-8,";
        distance_list.forEach(function(rowArray){
          let row = rowArray.join(".");
          csvContent += row + "\r\n";

          var encodedUri = encodeURI(csvContent);
          window.open(encodedUri);
        });
      } */

      // save data in trial_data
      let trial_data = {
        trial_name: config.name,
        trial_number: CT + 1,
        value: val,
        final_points: final_value,
        x_coordinate: row,
        y_coorinate: col,
        goal: payoff_condition,
      }

      // push the data to the csv
      babe.trial_data.push(trial_data);

    /*if(stepper == 2{
        bul_checker = true;
        return;
        //el.innerHTML = val;
        //setTimeout(3000);
      }*/

      if(stepper ==  numb_of_trials[CT]){
        //el.innerHTML = val;
        //setTimeout(3000);
        babe.findNextView();
        document.body.removeChild(grid);
        stepper = 0;
        final_value = 0;
      }

    });

    /*if(bul_checker == true){
      bul_checker = false;
      babe.findNextView();
      document.body.removeChild(grid);
      stepper = 0;
      final_value = 0;
    }*/

    document.body.appendChild(grid);
    current_exp_number += 1;
  }
};
// We have to return the view, so that it can be used in 05_views.js
return view;
}
