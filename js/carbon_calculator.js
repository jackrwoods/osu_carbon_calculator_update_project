/*******************************************************************************
                          Begin Variable Declaration
 ******************************************************************************/

// Totals for Each Category
var trans_total;
var cons_total;
var energy_total;
var food_total;
var waste_total;
var water_total;
var graph_carbon_num_total;

// Old Totals for Each Category
var old_trans_total;
var old_cons_total;
var old_energy_total;
var old_food_total;
var old_waste_total;
var old_water_total;
var old_data = new Array(5);

// ONID Variables
var uid;
var firstName;
var primaryAffiliation;

// Charts.JS requires that data be placed into an array.
var data = new Array(6);

// This array is for the bar graph, comparing the user's result to the avg
// person from other countries. The array contains 6 copies of the data because
// Charts.JS requires a new entry in the array for each bar drawn.
var graph_carbon_total = new Array(6);

var user_type = "on_campus";
var user_num = 1;

// Charts.JS pie chart declaration.
window.myPie1;
window.myPie2;


/*******************************************************************************
                               TRANSPORTATION
 All of the conversions in the transportation category are calculated
 seperately, and then combined in showResult().var old_trans_total;
var old_cons_total;
var old_energy_total;
var old_food_total;
var old_waste_total;
var old_water_total;
var old_graph_carbon_num_total;
*******************************************************************************/

// This performs no calcuation. It just shows/hides a question.
function trans_car_select_handler() {
  var car_type = $("#trans_select_car").val();
  if (car_type == "no_car") {
    $('#trans_input_car_miles_q').collapse('hide');
  } else {
    $('#trans_input_car_miles_q').collapse('show');
  }
}


// Source: http://shrinkthatfootprint.com/calculate-your-driving-emissions
function trans_car_conv() {
  var car40_plusMPG = 0.2652; //in kg C02e/mi
  var car30_40MPG = 0.3547; //in kg C02e/mi
  var car20_30MPG = 0.4817; //in kg C02e/mi
  // Source: http://shrinkthatfootprint.com/wp-content/uploads/2013/02/Shades-of-Green-Full-Report.pdf
  var carhybrid_electric = 0.202; //in kg C02e/mi
  var motorcycle = 0.197 //in kg C02e/mi
  var result = 0;
  var car_type = $("#trans_select_car").val();
  if (car_type == "no_car") {
    result = 0;
  }
  if (car_type == "car40_plusMPG") {
    result = $("#trans_input_car_miles").val() * car40_plusMPG / 4;
  } else if (car_type == "car30_40MPG") {
    result = $("#trans_input_car_miles").val() * car30_40MPG / 4;
  } else if (car_type == "car20_30MPG") {
    result = $("#trans_input_car_miles").val() * car20_30MPG / 4;
  } else if (car_type == "carhybrid_electric") {
    result = $("#trans_input_car_miles").val() * carhybrid_electric / 4;
  } else if (car_type == "motorcycle") {
    result = $("#trans_input_car_miles").val() * motorcycle / 4;
  }
  return result;
}

// Source: https://www.buses.org/assets/images/uploads/general/Report%20-%20Energy%20Use%20and%20Emissions.pdf
function trans_short_bus_conv() {
  var shortbus = 0.136 //in kg C02e/(passenger mile)
  return $("#trans_input_short_bus_miles").val() * shortbus;
}

// Source: https://www.buses.org/assets/images/uploads/general/Report%20-%20Energy%20Use%20and%20Emissions.pdf
function trans_long_bus_conv() {
  var longbus = 0.043 //in kg C02e/(passenger mile)
  return $("#trans_input_long_bus_miles").val() * longbus;
}

// Source: https://www.buses.org/assets/images/uploads/general/Report%20-%20Energy%20Use%20and%20Emissions.pdf
function trans_train_conv() {
  var train = 0.147 //in kg C02e/(passenger mile)
  return $("#trans_input_train_miles").val() * train;
}

// Source: https://www.epa.gov/sites/production/files/2015-07/documents/emission-factors_2014.pdf
function trans_airplane_conv() {
  var airtravel = 0.20933; //in kg C02e/(passenger mile)
  return $("#trans_input_plane_miles").val() * 1.09 * airtravel;
  // KC: Used amount of CO2e/passenger kilometer, multiplied by a factor of 1.09
  // to account for uplift (for non direct flights, delays, and circling).
}


/*******************************************************************************
                                  CONSUMPTION
*******************************************************************************/

// Source: http://www.carbonfootprint.com/calculatorfaqs.html
function consumption_clothing_conv() {
  var amount_spent = $("#clothing_per_month").val();
  // Dollars * 0.3kg/english pound * conversion rate (updated 5.5.17) * 12 months.
  return amount_spent * .30 * 0.77 * 12;
}

// Source: Carbon Calculator Spreadsheet:
// https://docs.google.com/spreadsheets/d/1FbkcWkPXmCwyWeBAtjH0eaR_kPtbDcLa3SFdK2iswAY/edit#gid=1428571633
function furniture_appliance_per_year() {
  var money_spent = $('#furniture_appliance_per_year').val();
  return 0.614 * money_spent;
}

// Source: Carbon Calculator Spreadsheet:
// https://docs.google.com/spreadsheets/d/1FbkcWkPXmCwyWeBAtjH0eaR_kPtbDcLa3SFdK2iswAY/edit#gid=1428571633
function paper_products_per_month() {
  var money_spent = $('#paper_products_per_month').val();
  return 2.1 * money_spent;
}

// Source: Carbon Calculator Spreadsheet:
// https://docs.google.com/spreadsheets/d/1FbkcWkPXmCwyWeBAtjH0eaR_kPtbDcLa3SFdK2iswAY/edit#gid=1428571633
function personal_care_per_month() {
  var money_spent = $('#personal_care_per_month').val();
  return 0.954 * money_spent;
}

// Source: Carbon Calculator Spreadsheet:
// https://docs.google.com/spreadsheets/d/1FbkcWkPXmCwyWeBAtjH0eaR_kPtbDcLa3SFdK2iswAY/edit#gid=1428571633
function electronics_per_year() {
  var money_spent = $('#electronics_per_year').val();
  return 0.396 * money_spent;
}

// Source: http://www.carbonfootprint.com/calculatorfaqs.html
function consumption_recreation_conv() {
  var amount_spent = $("#hotels_per_month").val();
  var amount_spent_activities = $("#recreation_per_month").val();
  // No description for this calculation. KC provided source.
  return (amount_spent * .2212 / 4 * 52) + (amount_spent_activities * .3871 / 4 * 52);
}

// http://www.co2list.org/files/carbon.htm
function consumption_plastic_bottle_conv() {
  var total_bottles = $("#consumption_plastic_bottle").val();

  // Total bottles drank in a week, carbon emissions from bottle + from water in
  // bottle, all multiplied by the number of weeks in a year.
  return (total_bottles * 0.068 + total_bottles * 0.09375 * 0.00284) * 52;
}

// Originally from SCU.
function consumption_coffee_conv() {
  var coffee_frequency = $("#food_coffee_frequency").val();
  var coffee_type = $("#food_coffee_type").val();

  var coffee_type_num = 0;
  if (coffee_type == 'black_coffee') {
    coffee_type_num = 21;
  } else if (coffee_type == 'cream_sugar') {
    coffee_type_num = 71;
  } else if (coffee_type == 'latte') {
    coffee_type_num = 340;
  }

  return coffee_type_num * coffee_frequency * 1 / 1000 * 52; // Calculation is per
}

/*******************************************
  ENERGY
*******************************************/
//TODO: fix this one. Iteration not working.
function energy_audit_dorm_conv() //kwh to kg source: https://www.epa.gov/sites/production/files/2015-07/documents/emission-factors_2014.pdf
{
  var result = 0;
  var total_appliance = 14;
  var complex = 0;
  var simple_complex = $("#simple_complex_complex").val();
  if (simple_complex == 'complex') {
    complex = 1;
  } else {
    complex = 0;
  }

  var iteration = 1;
  while (iteration < (total_appliance + 1)) { // JW: This was already written, so I'm keeping it as-is.
    var appliance_total = $("#appliance_" + iteration + "_total").val();
    if (appliance_total < 0.1) {
      appliance_total = 0;
    }
    var appliance_watts = $("#appliance_" + iteration + "_watts").val();
    var appliance_active_usage = $("#appliance_" + iteration + "_active_usage").val();
    var appliance_passive_usage = $("#appliance_" + iteration + "_passive_usage").val();
    if (appliance_active_usage < 0.1) {
      appliance_active_usage = 0;
    }

    result += ((appliance_total * appliance_watts * 0.001 * appliance_active_usage * 0.3821) + (appliance_total * appliance_watts * 0.001 * appliance_passive_usage * 0.10 * 0.3821)) * complex;
    iteration++;
  }
  return result;

}


function electricity_dorms_kwh() {
  var dorms = $("#energy_campus_resident").val();
  var dorms_electricity = 0;
  var result = 0;

  // Baseline for dorms needs to only count heating and lighting of building.
  // Data updated on 1/28/17 to reflect FY16 school year. KC.
  // Data provided by OSU Sustainability Office.
  if (dorms == "bloss") {
    dorms_electricity = 1154.00;
  } else if (dorms == "buxton") {
    dorms_electricity = 1343.37;
  } else if (dorms == "callahan") {
    dorms_electricity = 576.00;
  } else if (dorms == "cauthorn") {
    dorms_electricity = 703.2;
  } else if (dorms == "finley") {
    dorms_electricity = 1448.00;
  } else if (dorms == "halsell") {
    dorms_electricity = 1345.87;
  } else if (dorms == "hawley") {
    dorms_electricity = 1394.51;
  } else if (dorms == "ILLC") {
    dorms_electricity = 4525.11;
  } else if (dorms == "mcnary") {
    dorms_electricity = 3759.93;
  } else if (dorms == "poling") {
    dorms_electricity = 225.43;
  } else if (dorms == "sackett") {
    dorms_electricity = 1097.95;
  } else if (dorms == "weatherford") {
    dorms_electricity = 2297.60;
  } else if (dorms == "west") {
    dorms_electricity = 2096.40;
  } else if (dorms == "wilson") {
    dorms_electricity = 568.80;
  } else if (dorms == "tebeau") {
    dorms_electricity = 1745.24;
  } else if (dorms == "none") {
    dorms_electricity = 0;
  }
  result = dorms_electricity;
  return result;
}

function heat_dorms_lbs() {
  var dorms = $("#energy_campus_resident").val();
  var dorms_heat = 0;
  var result = 0;
  // dorms at OSU are not currently heated with gas. 0 for all values.
  result = dorms_heat;
  return result;
}

function simple_option() {
  var result = 0;
  var complex = 0;
  var electricity = $("#electricity_usage").val();
  var gas = $("#heat_usage").val();
  var simple_complex = $("input[name='simple_complex']:checked").val();
  if (simple_complex == 'complex') {
    complex = 0;
  } else {
    complex = 1;
  }

  result = (complex * ((electricity * .3821 / .1078) + (gas * 6.103 / 1.08)));

  return result;
}

function energy_baseline_conv() {
  var result = 0;
  if (user_type == "on_campus") {
    user_num = 1;
  } else if (user_type == "full_commuter") {
    user_num = 0.75;
  } else if (user_type == "part_commuter") {
    user_num = 0.5;
  }

  //New, simpler baseline calculation
  var totalInKWH = 332010527.1; // 1/28/17 updated by KC
  var totalDormInKWH = 11059974;
  var popOfOSU = 36059;
  var conversionFromKWHtoKgCO2e = 0.3821;

  result = (((totalInKWH - totalDormInKWH) * user_num / popOfOSU + electricity_dorms_kwh()) +simple_option()) * conversionFromKWHtoKgCO2e;
  return result;
}

function energy_gas_baseline_conv() {


  var result = 0;
  var popOfOSU = 36059;
  var totalOSUGasTherms = 562929.30;
  var convertFromThermToKgCO2e = 6.103

  result = (totalOSUGasTherms / popOfOSU) * user_num * convertFromThermToKgCO2e;
  return result;
}

/*******************************************
  FOOD
*******************************************/
function food_coffee_select_handler() {
  var coffee_type = $("#food_coffee_type").val();
  if (coffee_type == "none") {
    $('#food_coffee_frequency_q').collapse('hide');
  } else {
    $('#food_coffee_frequency_q').collapse('show');
  }
}

function food_conv() {
  var processed_food_input = $("input[name='radio_processed_food']:checked").val(); //source for kg: https://www.eatforhealth.gov.au/food-essentials/how-much-do-we-need-each-day/serve-sizes
  var processed_food_num = 0;
  var result = 0;
  var year_or_day = 52;
  var redmeat = $("#meat_serv").val();
  var eggs_dairy = $("#dairy_serv").val();
  var fruits_vegetables = $("#fruits_vegetables_serv").val();
  var grains = $("#grains_serv").val();
  var poultry = $("#poultry_serv").val();
  var pork = $("#pork_serv").val();
  var seafood = $("#seafood_serv").val();
  var nuts = $("#nuts_serv").val();

  //if (processed_food_input =="below_avg_processed"){processed_food_num = .015;}    //need conversion factor for how much more processed food vs fresh
  // else if (processed_food_input =="avg_processed"){processed_food_num = .05;}    //dummy question for now
  // else{processed_food_num = -0.05;}

  result = year_or_day * ((redmeat * 0.125 * 27.91) + (eggs_dairy * 0.200 * 6.096) + (fruits_vegetables * 0.125 * 0.778) + (grains * .100 * 1.595) + (poultry * 0.125 * 4.12) + (pork * 0.125 * 5.85) + (seafood * 0.125 * 4.41) + (nuts * 0.03 * 1.42)); //source for emissions: http://www.sciencedirect.com/science/article/pii/S0959652616303584
  return result;
}

/*******************************************
  WASTE
*******************************************/
// the waste and composting section gets a little screwey, and I don't know what's happening here.
//The numbers in the code disagree with the numbers in the doc, both of which are distinct from the
//numbers SCU is using in the original.  The "need composting factor" comment was left by JP circa 2013.
//No effort was made to change it by PK circa 2014.

//PK suggests starting fresh. Look up new total waste values, calculate new %recycled and %composted.
// Methods doc should be updated at that time.

//PK changed the recycling below = avg*.75 and avg = .75*above
function waste_conv()

//KC waste numbers updated (1/27/16). Compost calculation changed to follow same process as recycling. Waste total in kg per day.
{
  var year_or_day = 365;
  var commuter_input = $("input[name='radio_commuter']:checked").val();
  var recycle_input = $("input[name='radio_recycle']:checked").val();
  var compost_input = $("input[name='radio_compost']:checked").val();
  var trash_input = $("input[name='radio_trash']:checked").val();

  var commuter_num = 1;
  var recycle_num = 0;
  var trash_num = 0;
  var compost_num = 0;
  var result1 = 0;
  var result2 = 0;
  var result3 = 0;
  var result4 = 0;
  var result = 0;
  var osuPopulation = 36059;


  if (commuter_input == "on_campus") {
    commuter_num = 1;
  } else if (commuter_input == "full_commuter") {
    commuter_num = 0.75;
  } else if (commuter_input == "part_commuter") {
    commuter_num = 0.5;
  }

  if (recycle_input == "below_avg") {
    recycle_num = 0.15;
  } else if (recycle_input == "avg") {
    recycle_num = 0.25;
  } else {
    recycle_num = 0.35;
  }

  if (compost_input == "below_avg") {
    compost_num = 0.25;
  } else if (recycle_input == "avg") {
    compost_num = 0.35;
  } else {
    compost_num = 0.45;
  }

  result1 = 10296.75 / osuPopulation * recycle_num * commuter_num * year_or_day * 2.79; //left as original coefficient, needs fact checking
  result2 = 10296.75 / osuPopulation * compost_num * commuter_num * year_or_day * 0.4443; //source: https://www3.epa.gov/ttnchie1/efpac/ghg/GHG_Biogenic_Report_draft_Dec1410.pdf
  result3 = 10296.75 / osuPopulation * (1 - recycle_num - compost_num) * commuter_num * year_or_day * 1.22; //source: http://www.lms.com.au/assets/Media-Resources/Fact-Sheet-on-Emissions.pdf
  result4 = 10296.75 / osuPopulation * commuter_num * 0.1 * year_or_day * 1.22;
  result = result1 + result2 + result3;

  if (trash_input == "less_4lbs") {
    result = result - result4;
  } else if (trash_input == "more_4lbs") {
    result = result + result4;
  }

  return result;
}

/*******************************************
  WATER
*******************************************/
function water_conv() {
  var year_or_day = 365;
  var baseline = user_num;
  var multiplier = 1;
  var gallonsperdayperperson = 21.402;
  var result = 1;

  var shower_duration = $("#water_showers_duration").val();
  var total_shower = $("#water_showers_times").val();
  var total_laundry = $("#water_laundry").val();
  var total_flush = $("#water_flush").val();
  var total_cups = $("#water_cups").val();

  if (user_type == "on_campus") {
    baseline = gallonsperdayperperson;
  } else if (user_type == "full_commuter") {
    baseline = 0.75 * gallonsperdayperperson;
  } else if (user_type == "part_commuter") {
    baseline = 0.5 * gallonsperdayperperson;
  }

  result = (baseline * year_or_day) +  ((total_shower * shower_duration * 2.1 ) / 7 )* year_or_day + (30 * total_laundry / 30 * year_or_day) + (3.6 * total_flush * year_or_day) + (total_cups * 0.0625 * year_or_day);
  result = (result * 0.00284); //soruce: UK Environment Agency

  return result;
}
//Link to SCU's original code: https://docs.google.com/file/d/0B66G3LFpAvamc1RwQ29HLWg2dms/edit?usp=sharing//


// Draw Pie/Bar Charts

var data = [{
    value: 11,
    color: "#DD6600",
    highlight: "#DD6600",
    label: "You"
  },
  {
    value: 30,
    color: "#555",
    highlight: "#555",
    label: "You"
  },
  {
    value: 11,
    percent: "22%",
    color: "#777",
    highlight: "#777",
    label: "You"
  },
  {
    value: 48,
    percent: "22%",
    color: "#999",
    highlight: "#999",
    label: "You"
  }
]

var user_config = {
  type: 'pie',
  data: {
    datasets: [{
      data: data,
      backgroundColor: [
        window.chartColors.red,
        window.chartColors.orange,
        window.chartColors.yellow,
        window.chartColors.green,
        window.chartColors.blue,
      ],
      label: 'Your Result'
    }],
    labels: [
      "Transportation",
      "Consumption",
      "Energy and Heating",
      "Food",
      "Waste and Water",
    ]
  },
  options: {
    responsive: true,
    tooltips: {

      callbacks: { // HERE YOU CUSTOMIZE THE LABELS
        label: function(tooltipItem, data) {
          return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + " KgCO2";
        },
      }
    }
  }
};


function draw_user_result() {
  var ctx = document.getElementById("chart_area_user").getContext("2d");
  window.myPie = new Chart(ctx, user_config);
  window.myPie.update();
}


var us_avg_config = {
  type: 'pie',
  data: {
    datasets: [{
      data: [
        4808.4,
        4979.9,
        3692.1,
        2404.2,
        515.2
      ],
      backgroundColor: [
        window.chartColors.red,
        window.chartColors.orange,
        window.chartColors.yellow,
        window.chartColors.green,
        window.chartColors.blue,
      ],
      label: 'Your Result'
    }],
    labels: [
      "Transportation",
      "Consumption",
      "Energy and Heating",
      "Food",
      "Waste and Water",
    ]
  },
  options: {
    responsive: true,
    tooltips: {

      callbacks: { // HERE YOU CUSTOMIZE THE LABELS
        label: function(tooltipItem, data) {
          return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + " KgCO2";
        },
      }
    }
  }
};

//Bar graph - You vs. US Average
var horizontalBarChartData2 = {
  labels: ["Transportation",
    "Consumption",
    "Energy and Heating",
    "Food",
    "Waste and Water"
  ],
  datasets: [{
    label: 'Average',
    backgroundColor: window.chartColors.yellow,
    borderColor: window.chartColors.yellow,
    borderWidth: 1,
    data: [
      4808.4,
      4979.9,
      3692.1,
      2404.2,
      515.2
    ]
  }, {
    label: "Your Result",
    backgroundColor: window.chartColors.green,
    borderColor: window.chartColors.green,
    borderWidth: 1,
    data: data
  }]

};

//Bar graph - You vs US Average
function draw_you_vs_us_avg() {
  var ctx3 = document.getElementById("you_vs_us_avg").getContext("2d");
  window.myHorizontalBar2 = new Chart(ctx3, {
    type: 'horizontalBar',
    data: horizontalBarChartData2,
    options: {
      // Elements optBar graph - Youions apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      responsive: true,
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: ''
      },
      tooltips: {

        callbacks: {
          label: function(tooltipItem, data) {
            return data.datasets[tooltipItem.datasetIndex].label + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + " KgCO2";
          },
        }
      }
    }
  });
}

//Bar graph - World Averages
var horizontalBarChartData = {
  labels: ["Brazil", "Burkina Faso", "China", "United States", "France", "Oregon"],
  datasets: [{
    label: 'Average',
    backgroundColor: window.chartColors.yellow,
    borderColor: window.chartColors.yellow,
    borderWidth: 1,
    data: [
      2500,
      200,
      7600,
      16400,
      5100,
      10000
    ]
  }, {
    label: 'You',
    backgroundColor: window.chartColors.green,
    borderColor: window.chartColors.green,
    data: graph_carbon_total
  }]

};

function draw_world_avg() {
  var ctx3 = document.getElementById("world_avg_graph").getContext("2d");
  window.myHorizontalBar = new Chart(ctx3, {
    type: 'horizontalBar',
    data: horizontalBarChartData,
    options: {
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      responsive: true,
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: ''
      },
      tooltips: {

        callbacks: {
          label: function(tooltipItem, data) {
            return data.datasets[tooltipItem.datasetIndex].label + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + " KgCO2";
          },
        }
      }
    }
  });
}

//Bar graph - Comparison
var horizontalBarChartData3 = {
  labels: ["Transportation",
    "Consumption",
    "Energy and Heating",
    "Food",
    "Waste and Water"
  ],
  datasets: [{
    label: 'Previous',
    backgroundColor: window.chartColors.yellow,
    borderColor: window.chartColors.yellow,
    borderWidth: 1,
    data: old_data
  }, {
    label: 'Current',
    backgroundColor: window.chartColors.green,
    borderColor: window.chartColors.green,
    data: data
  }]

};

function draw_comparison_graph() {
  var ctx3 = document.getElementById("comparisongraph").getContext("2d");
  window.myHorizontalBar2 = new Chart(ctx3, {
    type: 'horizontalBar',
    data: horizontalBarChartData3,
    options: {
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      responsive: true,
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: ''
      },
      tooltips: {

        callbacks: {
          label: function(tooltipItem, data) {
            return data.datasets[tooltipItem.datasetIndex].label + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + " KgCO2";
          },
        }
      }
    }
  });
}


function draw_us_result() {
  var ctx2 = document.getElementById("chart_area_us_avg").getContext("2d");
  window.myPie2 = new Chart(ctx2, us_avg_config);
  window.myPie2.update();
};

function update_graphs() {
  window.myPie.update();
  window.myPie2.update();
  window.myHorizontalBar.update();
  window.myHorizontalBar2.update();
}

/*******************************************
  Display questions that depend on the results
  of other questions.
*******************************************/

function display_question(action, field_name) {
  if (action == "show") {
    $("#" + field_name + "_q").show(500);
  } else if (action == "hide") {
    $("#" + field_name + "_q").hide(500);
    $("#" + field_name).val('');
  }
}

/*******************************************************************************
                      Miscellaneous Function Definitions
                      ----------------------------------
                      NOTE: This remains as a backup ONLY.
                      Data is now stored in a DynamoDB.
 ******************************************************************************/

 // Save Anonymous User Data. This data is used for sustainability-focused outreach
 // efforts and other metrics. No specific user information is saved.
 // Data is saved into a CSV file in this format:
function save_anonymous_data() {
  // Save results to csv/text file
  // Ajax request to php script
  $.ajax({
    data: {
      trans_total: trans_total.toString(),
      trans_car_conv: parseFloat(trans_car_conv()).toString(),
      trans_short_bus_conv: parseFloat(trans_short_bus_conv()).toString(),
      trans_long_bus_conv: parseFloat(trans_long_bus_conv()).toString(),
      trans_train_conv: parseFloat(trans_train_conv()).toString(),
      trans_airplane_conv: parseFloat(trans_airplane_conv()).toString(),
      cons_total: cons_total.toString(),
      consumption_textbook_conv: "Textbook question was removed.",
      consumption_clothing_conv: parseFloat(consumption_clothing_conv()).toString(),
      consumption_cellphone_conv: "Cell phone question was removed.",
      consumption_eReader_conv: "E-Reader question was removed.",
      consumption_plastic_bottle_conv: parseFloat(consumption_plastic_bottle_conv()).toString(),
      energy_total: energy_total.toString(),
      energy_audit_dorm_conv: parseFloat(energy_audit_dorm_conv()).toString(),
      energy_gas_baseline_conv: parseFloat(energy_gas_baseline_conv()).toString(),
      energy_baseline_conv: parseFloat(energy_baseline_conv()).toString(),
      food_total: food_total.toString(),
      food_conv: parseFloat(food_conv()).toString(),
      consumption_coffee_conv: parseFloat(consumption_coffee_conv()).toString(),
      waste_total: waste_total.toString(),
      water_total: water_total.toString(),
    },
    url: "../php/save_anonymous_input.php",
    type: "POST"
  });
}


// Determines whether the user is an on-campus student, full-commuter, or
// part-commuter. These values are used for the final carbon footprint
// calculation.
function set_user_type(type) {
  user_type = type;
  if (user_type == "on_campus") {
    user_num = 1;
  } else if (user_type == "full_commuter") {
    user_num = 0.75;
  } else if (user_type == "part_commuter") {
    user_num = 0.5;
  }
}

// Initially draws the graphs when the webpage loads.
window.onload = function() {
  draw_user_result();
  draw_us_result();
  draw_world_avg();
  draw_you_vs_us_avg();

  // Verify ONID Login
  var ticket = location.search.substring(8);
  if (ticket.length > 0) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "../php/CASValidate.php?ticket="+ticket, false); // false for synchronous request
    xmlHttp.send(null);
    var res = xmlHttp.responseText;
    if (res.includes("Success")) {
      updateUserVariables(res);
      closeONIDWindow();
      showOldData();
    }
  }

  // Add event listeners for updating graphs
  document.getElementById("last-next-button").addEventListener("click", showResult);
  document.getElementById("results-accordion").addEventListener("click", showResult);
}

// Computes and shows the result to the user.
var showResult = function showResult() {

  // Compute Result
  trans_total = parseFloat(trans_car_conv()) + parseFloat(trans_short_bus_conv()) + parseFloat(trans_long_bus_conv()) + parseFloat(trans_train_conv()) + parseFloat(trans_airplane_conv());
  cons_total = parseFloat(electronics_per_year()) + parseFloat(personal_care_per_month()) + parseFloat(paper_products_per_month()) + parseFloat(furniture_appliance_per_year()) + parseFloat(consumption_clothing_conv()) + parseFloat(consumption_recreation_conv()) + parseFloat(consumption_plastic_bottle_conv());
  energy_total = parseFloat(energy_audit_dorm_conv()) + parseFloat(energy_gas_baseline_conv()) + parseFloat(energy_baseline_conv());
  food_total = parseFloat(food_conv()) + parseFloat(consumption_coffee_conv());
  waste_total = parseFloat(waste_conv());
  water_total = parseFloat(water_conv());
  carbon_num_total = trans_total + cons_total + energy_total + food_total + waste_total + water_total;
  for (var i = 0; i < 6; i++) {
    graph_carbon_total[i] = parseFloat(carbon_num_total.toFixed(2));
    //graph_carbon_num_total[i] = trans_total + cons_total + energy_total + food_total + waste_total + water_total;
  }

  graph_trans_total = parseFloat(trans_total.toFixed(1));
  data[0] = parseFloat(trans_total.toFixed(1));
  graph_cons_total = parseFloat(cons_total.toFixed(1));
  data[1] = 1 + parseFloat(cons_total.toFixed(1));
  graph_energy_total = parseFloat(energy_total.toFixed(1));
  data[2] = parseFloat(energy_total.toFixed(1));
  graph_food_total = parseFloat(food_total.toFixed(1));
  data[3] = parseFloat(food_total.toFixed(1));
  graph_waste_total = parseFloat(waste_total.toFixed(1));
  //data[4] = parseFloat(waste_total.toFixed(1));
  graph_water_total = parseFloat(water_total.toFixed(1));
  //data[5] = parseFloat(water_total.toFixed(1));
  data[4] = (parseFloat(waste_total.toFixed(1)) + parseFloat(water_total.toFixed(1))); // Waste and Water
  data[4] = data[4].toFixed(1);

  // Show Result
  $("#transportation_tab_total").html(trans_total.toFixed(2));
  $("#consumption_tab_total").html(cons_total.toFixed(2));
  $("#energy_tab_total").html(energy_total.toFixed(2));
  $("#food_tab_total").html(food_total.toFixed(2));
  $("#water_tab_total").html(water_total.toFixed(2));
  $("#carbon_total").html(carbon_num_total.toFixed(2));

  $("#transportation_tab_percentage").html((trans_total / carbon_num_total * 100).toFixed(2));
  $("#consumption_tab_percentage").html((cons_total / carbon_num_total * 100).toFixed(2));
  $("#energy_tab_percentage").html((energy_total / carbon_num_total * 100).toFixed(2));
  $("#food_tab_percentage").html((food_total / carbon_num_total * 100).toFixed(2));
  $("#waste_tab_percentage").html((waste_total / carbon_num_total * 100).toFixed(2));
  $("#water_tab_percentage").html((water_total / carbon_num_total * 100).toFixed(2));
  $("#carbon_total_percentage").html((1 * 100).toFixed(2));

  // Redraw graphs with updated information
  update_graphs();

  // Update the user's information in the CSV file
  save_anonymous_data();

  // Update the user's information in the database.
  updateDB();

  // Save cookies on user's computer
  saveData();
  showOldData();
}

/*******************************************
  Save/Retrieve User Data
*******************************************/
var closeONIDWindow = function closeONIDWindow() {
  document.getElementById("overlay").classList.add("hidden");
}
// Close ONID Login Window listener
document.getElementById("close-btn").addEventListener("click", closeONIDWindow);

// Update user variables, such as UID and name
function updateUserVariables(res) {
  var parser;
  var doc;
  if (window.DOMParser) {
    parser = new DOMParser();
    doc = parser.parseFromString(res, "text/xml");
  } else { // IE uses ActiveX
    parser = new ActiveXObject("Microsoft.XMLDOM");
    doc.async = false;
    doc.loadXML(res);
  }

  // Set global Variables
  firstName = doc.getElementsByTagName("cas:firstname")[0].childNodes[0].nodeValue;
  console.log(firstName);

  primaryAffiliation = doc.getElementsByTagName("cas:eduPersonPrimaryAffiliation")[0].childNodes[0].nodeValue;
  console.log(primaryAffiliation);

  uid = doc.getElementsByTagName("cas:uid")[0].childNodes[0].nodeValue;
  console.log(uid);

  // Update header with user's name.

  var header = document.getElementsByClassName("well-md")[0].getElementsByTagName("h1")[0].innerHTML = "Hello, " + firstName + "! Welcome to your Carbon Calculator.";
}

// Creates a JSON object for the current user and sends a POST request to
// uploadUser.php. We post to the PHP script instead of directly to the Database
// to avoid no-access-control-allow-origin errors.
function updateDB() {
  console.log("Update!");
  // First, create the dataObject
  var d = new Date();

  // Get location information
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "../php/getUserLocation.php", false); // false for synchronous request
  xmlHttp.send(null);
  var res = xmlHttp.responseText; // PHP script responds with a JSON object.
  console.log(res);

  var dataObject = {
    // Uses getMonth(), getDate(), and getYear() from Javascript Date object.
    // The slicing stuff ensures that dates will be saved in 2 digit format.
    // For example, January will be 01 instead of just 1.
    "date": "" + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2) + d.getYear(),
    "totals": data,
    "location": JSON.parse(res)
  };

  // Next, create the JSON object for the user.
  var userObject = {
    "UserID": uid,
    "firstName": firstName,
    "primaryAffiliation": primaryAffiliation,
    "data": [dataObject]
  };

  userObject = JSON.stringify(userObject); // Stringify JSON for HTTP POST body.

  // Lastly, send the request.

  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "../php/uploadUserInfo.php?userObject=" + userObject, false); // False for synchronous request.
  xmlHttp.send(null);
  res = xmlHttp.responseText;
  console.log(res);
}

// User data from previous visits is saved in a cookie on their machine for up to a year.
function setCookie(name, data) {
    var date = new Date(); // Get new Date object
    date.setTime(date.getTime() + (364*24*60*60*1000)); // Save cookie for 1 year.
    var expires = "expires="+ date.toUTCString(); // Convert to UTC for cookie
    document.cookie = name + "=" + data + ";" + expires + ";";
}

function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function saveData() {
  // Save each total into memory for future comparisons.
  setCookie("osu_trans", trans_total.toFixed(2));
  setCookie("osu_cons", cons_total.toFixed(2));
  setCookie("osu_energy",energy_total.toFixed(2));
  setCookie("osu_food",food_total.toFixed(2));
  setCookie("osu_waste",waste_total.toFixed(2));
  setCookie("osu_water",water_total.toFixed(2));
}

function retrieveData() {
  old_trans_total = getCookie("osu_trans");
  old_cons_total = getCookie("osu_cons");
  old_energy_total = getCookie("osu_energy");
  old_food_total = getCookie("osu_food");
  old_waste_total = getCookie("osu_waste");
  old_water_total = getCookie("osu_water");
  old_graph_carbon_num_total = old_trans_total + old_cons_total + old_energy_total + old_food_total + old_water_total + old_waste_total;
}

// Returns a boolean, which determines whether or not the user has used the calculator before.
function showOldData() {
  var cookie = getCookie("osu_trans");
  if (cookie != "") {
    retrieveData();
    old_data[0] = old_trans_total;
    old_data[1] = old_cons_total;
    old_data[2] = old_energy_total;
    old_data[3] = old_food_total;
    old_data[4] = old_waste_total + old_water_total;
    draw_comparison_graph();
  } else {
    var prevRes = document.getElementById("result_table");
    while (prevRes.firstChild) {
      prevRes.removeChild(prevRes.firstChild);
    }
  }
}
