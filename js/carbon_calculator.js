//Link to SCU's original code: https://docs.google.com/file/d/0B66G3LFpAvamc1RwQ29HLWg2dms/edit?usp=sharing

var graph_trans_total;
var graph_recreation_total;
var graph_cons_total;
var graph_energy_total;
var graph_food_total;
var graph_waste_total;
var graph_water_total;
var data = new Array(6);
var graph_carbon_num_total = new Array(6);
window.myPie1;
window.myPie2;


window.onload = function() {
  draw_user_result();
  draw_us_result();
  draw_world_avg();
}

function showResult() {
  var trans_total = parseFloat(trans_car_conv('year')) + parseFloat(trans_short_bus_conv('year')) + parseFloat(trans_long_bus_conv('year'))+ parseFloat(trans_train_conv('year')) + parseFloat(trans_airplane_conv('year'));
  var cons_total = parseFloat(consumption_textbook_conv('year')) + parseFloat(consumption_clothing_conv('year')) + parseFloat(consumption_cellphone_conv('year')) + parseFloat(consumption_eReader_conv('year')) + parseFloat(consumption_plastic_bottle_conv('year'));// + parseFloat(consumption_ipod_conv('year'));
  var energy_total= parseFloat(energy_audit_dorm_conv('year')) + parseFloat(energy_gas_baseline_conv('year')) +parseFloat(energy_baseline_conv('year'));
  var food_total = parseFloat(food_conv('year'))+parseFloat(consumption_coffee_conv('year'));
  var waste_total = parseFloat(waste_conv('year'));
  var water_total = parseFloat(water_conv('year'));

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


  var carbon_num_total = trans_total + cons_total + energy_total + food_total + waste_total + water_total;
  for (var i = 0; i < 6; i++) {
    graph_carbon_num_total[i] = trans_total + cons_total + energy_total + food_total + waste_total + water_total;
  }
  var graph_carbon_total = parseFloat(carbon_num_total.toFixed(2));


  $("#transportation_tab_total").html(trans_total.toFixed(2));
  $("#consumption_tab_total").html(cons_total.toFixed(2));
  $("#energy_tab_total").html(energy_total.toFixed(2));
  $("#food_tab_total").html(food_total.toFixed(2));
  $("#waste_tab_total").html(waste_total.toFixed(2));
  $("#water_tab_total").html(water_total.toFixed(2));
  $("#carbon_total").html(carbon_num_total.toFixed(2));

  $("#transportation_tab_percentage").html((trans_total/carbon_num_total*100).toFixed(2));
  $("#consumption_tab_percentage").html((cons_total/carbon_num_total*100).toFixed(2));
  $("#energy_tab_percentage").html((energy_total/carbon_num_total*100).toFixed(2));
  $("#food_tab_percentage").html((food_total/carbon_num_total*100).toFixed(2));
  $("#waste_tab_percentage").html((waste_total/carbon_num_total*100).toFixed(2));
  $("#water_tab_percentage").html((water_total/carbon_num_total*100).toFixed(2));
  $("#carbon_total_percentage").html((1*100).toFixed(2));
  update_graphs();
};

/*******************************************
  TRANSPORTATION
*******************************************/

function trans_car_select_handler()
{
  var car_type = $("#trans_select_car").val();
  if (car_type == "no_car") {
    $('#trans_input_car_miles_q').collapse('hide');
  } else {
    $('#trans_input_car_miles_q').collapse('show');
  }
}

function trans_car_conv(input)                 //source: http://shrinkthatfootprint.com/calculate-your-driving-emissions
{
  var car40_plusMPG=0.2652; //in kg C02e/mi
  var car30_40MPG=0.3547;  //in kg C02e/mi
  var car20_30MPG=0.4817; //in kg C02e/mi
  var carhybrid_electric=0.202; //in kg C02e/mi source: http://shrinkthatfootprint.com/wp-content/uploads/2013/02/Shades-of-Green-Full-Report.pdf
  var result=0;
  var year_or_day=0;
  var car_type= $("#trans_select_car").val();
  if (input=='year') {year_or_day=52;} else {year_or_day = 1/7;}
  if (car_type == "no_car") {result = 0;}
  if(car_type=="car_40plusMPG")     {  result = $("#trans_input_car_miles").val() * car40_plusMPG / 4 * year_or_day; }
  else if (car_type=="car30_40MPG"){  result = $("#trans_input_car_miles").val() * car30_40MPG / 4 * year_or_day; }
  else if (car_type=="car20_30MPG")    {  result = $("#trans_input_car_miles").val() * car20_30MPG / 4 * year_or_day; }
  else if (car_type=="carhybrid_electric") {  result = $("#trans_input_car_miles").val() * carhybrid_electric / 4 * year_or_day; }
  return result;
}

function trans_short_bus_conv(input)         //source: https://www.buses.org/assets/images/uploads/general/Report%20-%20Energy%20Use%20and%20Emissions.pdf
{
  var shortbus = 0.136 //in kg C02e/(passenger mile)
  var result=0;
  var year_or_day=0;
  if (input=='year') {year_or_day=52;} else {year_or_day = 1/7;}
  result = $("#trans_input_long_bus_miles").val() * (1 / 0.62137) * shortbus * (1/4) * year_or_day;
  return result;
}

function trans_long_bus_conv(input)       //source: https://www.buses.org/assets/images/uploads/general/Report%20-%20Energy%20Use%20and%20Emissions.pdf
{
  var longbus=0.043 //in kg C02e/(passenger mile)
  var result=0;
  var year_or_day=0;
  if (input=='year') {year_or_day=52;} else {year_or_day = 1/7;}
  result = $("#trans_input_long_bus_miles").val() * (1 / 0.62137) * longbus * (1/4) * year_or_day;
  return result;
}

function trans_train_conv(input)          //source: https://www.buses.org/assets/images/uploads/general/Report%20-%20Energy%20Use%20and%20Emissions.pdf
{
  var train=0.147 //in kg C02e/(passenger mile)
  var result=0;
  var year_or_day=0;
  if (input=='year') {year_or_day=1;} else {year_or_day = 1/365;}
  result = $("#trans_input_train_miles").val() * (1 / 0.62137) * train  * year_or_day;
  return result;
}

function trans_airplane_conv(input)      //source: https://www.epa.gov/sites/production/files/2015-07/documents/emission-factors_2014.pdf
{
  var airtravel=0.20933; //in kg C02e/(passenger mile)
  var result=0;
  var year_or_day=0;
  if (input=='year') {year_or_day=1;} else {year_or_day = 1/365;}
  result = $("#trans_input_plane_miles").val() * (1 / 0.62137) * 1.09 * airtravel * year_or_day;
  return result;
}


/*******************************************
  CONSUMPTION
*******************************************/
function consumption_textbook_conv(input)       //source: http://www.tkearth.com/downloads/thoughts_ereaders.pdf
{
  var result=0;
  var year_or_day=0;
  var reading_book = $("#reading_book_per_year").val();
  var text_book = $("#text_book_per_year").val();
  if (input=='year') {year_or_day=3;} else {year_or_day = 1/7 * 1/52;}
  result = ((reading_book* 7.46)+(text_book* 10.9)) * year_or_day;
  return result;
}

function consumption_clothing_conv(input)        //source: http://www.carbonfootprint.com/calculatorfaqs.html
{
  var result=0;
  var year_or_day=0;
  var amount_spent = $("#clothing_per_month").val();
  if (input=='year') {year_or_day=52;} else {year_or_day = 1/7;}
  result = amount_spent * .30 * 0.79 / 4 * year_or_day;
  return result;
}

function consumption_cellphone_conv(input)
{
  var year_or_day = 0;
  var which_cell;
  if (document.getElementById("smart_phone_q").checked) {
    which_cell = "smart_phone";
  } else if (document.getElementById("mobile_phone_q").checked) {
      which_cell = "mobile_phone"
  } else {
    which_cell = "no";
  }
  var result = 0;
  var years_owned = $("#duration_owning_cell_phone").val();
  if (input=='year') {year_or_day=1/52;} else {year_or_day = 1/7 * 1/52;}
  if (which_cell == "smart_phone"){result = ( 49 / years_owned * year_or_day);}     //source:  https://www.fairphone.com/wp-content/uploads/2014/06/FULLTEXT01.pdf
  else if (which_cell =="mobile_phone"){result = ( 112 * year_or_day);} else {
    result = 0;
  }
  if (result == Infinity ) {
    result = 0;
  }
  return result;
}

function consumption_eReader_conv(input)         //same as SCU, may need fact checking
{
  var year_or_day = 0;
  var result = 0;
  var years_owned_tablet = $("#duration_owning_tablet").val();
  var years_owned_kindle = $("#duration_owning_kindle").val();
  if (input=='year') {year_or_day=1/52;} else {year_or_day = 1/365;}
  if (document.getElementById('tablet').checked || $("is_ereader_cons_q").is(":checked")) {
    result += ( 270 / years_owned_tablet * year_or_day);;
    display_question('show','duration_owning_tablet');
  } else {
    display_question('hide','duration_owning_tablet');
  }
  if (document.getElementById('kindle').checked || $("is_kindle_cons_q").is(":checked")) {
    result += ( 168 * year_or_day);
    display_question('show','duration_owning_kindle');
  } else {
    display_question('hide','duration_owning_kindle');
  }
  return result;
}

function consumption_ipod_conv(input)                     //source: http://www.apple.com/environment/reports/
{
  var result=0;
  var year_or_day = 0;
  var ipod_duration = 0;
  var owned_ipod =0;

  ipod_duration = $("#consumption_ipod_duration").val();
  if (input=='year') {year_or_day=1;} else {year_or_day=1/365;}
  if ($("input[name='consumption_radio_ipod']:checked").val() =='yes') {owned_ipod=1;}

  result = (47.5 / ipod_duration * year_or_day)*owned_ipod;
  return result;
}

function consumption_plastic_bottle_conv(input)                //source
{
  var result=0;
  var year_or_day = 0;
  var total_bottles = 0;
  total_bottles = $("#consumption_plastic_bottle").val();
  if (input=='year') {year_or_day=52;} else {year_or_day=1/7;}
  result = (total_bottles * 0.068 + total_bottles * 0.09375 * 0.00284) * year_or_day;   //total bottles drank in a week, carbon emissions from bottle + from water in bottle.
  return result;
}

function consumption_coffee_conv(input)                          //same as SCU, may need fact checking
{
  var result=0;
  var year_or_day = 0;
  var coffee_frequency= 0;
  var coffee_type_num = 0;
  var coffee_type=$("#food_coffee_type").val();

  coffee_frequency = $("#food_coffee_frequency").val();
  if (input=='year') {year_or_day=52;} else {year_or_day=1/7;}

  if (coffee_type=='black_coffee'){coffee_type_num = 21;}
    else if (coffee_type=='cream_sugar'){coffee_type_num=71;}
    else if (coffee_type=='latte'){coffee_type_num=340;}

  result = coffee_type_num * coffee_frequency * 1 / 1000 * year_or_day;
  return result;
}


/*******************************************
  ENERGY
*******************************************/

function energy_audit_dorm_conv(input)                        //kwh to kg source: https://www.epa.gov/sites/production/files/2015-07/documents/emission-factors_2014.pdf
{
  var year_or_day=0;
  var result = 0;
  //var total_appliance = 20;
  var total_appliance = 13;
  var iteration = 1;
  var complex=0;
  var simple_complex=$("input[name='simple_complex']:checked").val();
  if (simple_complex=='complex') {complex=1;} else {complex=0;}
  if (input=='year') {year_or_day=365;} else {year_or_day = 1;}
  while (iteration < (total_appliance + 1))
  {
    var appliance_total= $("#appliance_"+iteration+"_total").val();
    if (appliance_total <0.1) {appliance_total = 0;}
    var appliance_watts = $("#appliance_"+iteration+"_watts").val();
    var appliance_active_usage = $("#appliance_"+iteration+"_active_usage").val();
    var appliance_passive_usage = $("#appliance_"+iteration+"_passive_usage").val();
    if (appliance_active_usage <0.1) {appliance_active_usage = 0;}

    result += ((appliance_total * appliance_watts * 0.001 * appliance_active_usage * 0.3821 * year_or_day)+(appliance_total * appliance_watts * 0.001 * appliance_passive_usage * 0.10 *0.3821* year_or_day))*complex;
    iteration ++;
  }
  return result;

}


function electricity_dorms_kwh()
{
  var dorms = $("#energy_campus_resident").val();
  var dorms_electricity=0;
  var result = 0;

  //Baseline for dorms needs to only count heating and lighting of building.
  //Currently there is double counting with the dorm audit
  // if (dorms =="bloss"){dorms_electricity = 1382.18;}
    // else if (dorms=="buxton"){dorms_electricity =2059.02; }
    // else if (dorms=="callahan"){dorms_electricity =549.00;}
    // else if (dorms=="cauthorn"){dorms_electricity =593.95;}
    // else if (dorms=="finley"){dorms_electricity =1125.42 ;}
    // else if (dorms=="halsell"){dorms_electricity =1739.30;}
    // else if (dorms=="hawley"){dorms_electricity =1974.08;}
    // else if (dorms=="ILLC"){dorms_electricity =4369.71;}
    // else if (dorms=="mcnary"){dorms_electricity =4152.28;}
    // else if (dorms=="poling"){dorms_electricity =243.73;}
    // else if (dorms=="sackett"){dorms_electricity =1165.16;}
	// else if (dorms=="weatherford"){dorms_electricity =2527.20;}
	// else if (dorms=="west"){dorms_electricity =3262.97;}
	// else if (dorms=="wilson"){dorms_electricity =527.26;}
    // else if (dorms=="none") {dorms_electricity =0;}
	// The above values were added by JP ~2013
	// The below values were added by PK 9/27/2014
	// The values are in KWH/day, averaged over 1 year. I think. I hope. Im sorry.
	// 1/28/17 Data updated to reflect FY16 school year. KC. Data pulled from Sustainability Office.
  if (dorms =="bloss"){dorms_electricity = 1154.00;}
    else if (dorms=="buxton"){dorms_electricity =1343.37; }
    else if (dorms=="callahan"){dorms_electricity =576.00;}
    else if (dorms=="cauthorn"){dorms_electricity =703.2;}
    else if (dorms=="finley"){dorms_electricity =1448.00;}
    else if (dorms=="halsell"){dorms_electricity =1345.87;}
    else if (dorms=="hawley"){dorms_electricity =1394.51;}
    else if (dorms=="ILLC"){dorms_electricity =4525.11;}
    else if (dorms=="mcnary"){dorms_electricity =3759.93;}
    else if (dorms=="poling"){dorms_electricity =225.43;}
    else if (dorms=="sackett"){dorms_electricity =1097.95;}
	  else if (dorms=="weatherford"){dorms_electricity =2297.60;}
	  else if (dorms=="west"){dorms_electricity =2096.40;}
	  else if (dorms=="wilson"){dorms_electricity =568.80;}
	  else if (dorms=="tebeau"){dorms_electricity =1745.24;}
    else if (dorms=="none") {dorms_electricity =0;}
  result = dorms_electricity;
  return result;
}

function heat_dorms_lbs()
{
  var dorms = $("#energy_campus_resident").val();
   var dorms_heat=0;
  var result = 0;
  // dorms at OSU are not currently heated with gas. 0 for all values.
  if (dorms =="bloss"){dorms_heat = 0;}
    else if (dorms=="buxton"){dorms_heat=0; }
    else if (dorms=="callahan"){dorms_heat=0;}
    else if (dorms=="cauthorn"){dorms_heat=0;}
    else if (dorms=="finley"){dorms_heat= 0 ;}
    else if (dorms=="halsell"){dorms_heat=0;}
    else if (dorms=="hawley"){dorms_heat=0;}
    else if (dorms=="ILLC"){dorms_heat=0;}
    else if (dorms=="mcnary"){dorms_heat=0;}
    else if (dorms=="poling"){dorms_heat=0;}
    else if (dorms=="sackett"){dorms_heat=0;}
  	else if (dorms=="weatherford"){dorms_heat=0;}
  	else if (dorms=="west"){dorms_heat=0;}
  	else if (dorms=="wilson"){dorms_heat=0;}
  	else if (dorms=="tebeau"){dorms_heat=0;}
    else if (dorms=="none") {dorms_heat=0;}


  result = dorms_heat;
  return result;
}
function simple_option()
{
  var result =0;
  var complex=0;
  var year_or_day=0;
  var electricity= $("#electricity_usage").val();
  var gas=$("#heat_usage").val();
  var simple_complex=$("input[name='simple_complex']:checked").val();
  if (simple_complex=='complex') {complex=0;} else {complex=1;}


  result = (complex*((electricity*.3821/.1078)+(gas*6.103/1.08)));

  return result;
}

function energy_baseline_conv(input)
{
	var year_or_day = 0;
	var result =0;
	var user_type= $("input[name='radio_commuter']:checked").val();
	var user_num = 0;
  	//var totalInKWH = 0;
	//var totalDormInKWH = 0;
	//var popOfOSU = 0;
	//var conversionFromKWHtoKgCO2e = 0;


	if (input=='year') {year_or_day=1;} else {year_or_day = 1/ (365);}

	if (user_type =="on_campus") {user_num= 1;}
		else if (user_type =="full_commuter") {user_num = 0.75;}
		else if (user_type =="part_commuter") {user_num = 0.5;}

	//I dont know what any of this is. -PK
    //result = ((((53384936 * user_num) / 30492) + 0.5579*electricity_dorms_kwh())* 0.7294 * year_or_day)+((((42311306 * user_num) / 30492) + 0.4421*electricity_dorms_kwh())* 0.1676 * year_or_day) + simple_option();
	//result = ((59170102 - 51831492) * user_num / 31406 + electricity_dorms_kwh()) * 0.7294 * year_or_day + simple_option();
	//result = ((((59170102 * user_num) / 30492) + 0.5579*electricity_dorms_kwh())* 0.7294 * year_or_day) + simple_option();

	//New, simpler baseline calculation
	var totalInKWH = 332010527.1;       // 1/28/17 updated by KC
	var totalDormInKWH = 11059974;
	var popOfOSU = 36059;
	var conversionFromKWHtoKgCO2e = 0.3821;

	result = ((totalInKWH - totalDormInKWH) * user_num / popOfOSU + electricity_dorms_kwh()) * conversionFromKWHtoKgCO2e * year_or_day + simple_option();
	return result;
}

function energy_gas_baseline_conv(input)
{

  var year_or_day = 0;
  var result =0;
  var user_type= $("input[name='radio_commuter']:checked").val();
  var user_num=0;

  if (input=='year') {year_or_day=1;} else {year_or_day = 1/365;}
  if (user_type =="on_campus") {user_num= 1;}
    else if (user_type =="full_commuter") {user_num = 0.75;}
    else if (user_type =="part_commuter") {user_num = 0.5;}
  var popOfOSU = 36059;
  var totalOSUGasTherms =  562929.30;
  var convertFromThermToKgCO2e = 6.103

  result = (totalOSUGasTherms/popOfOSU) * user_num * convertFromThermToKgCO2e ;
  //result = (((300130036 / 30492)* user_num) + heat_dorms_lbs())*970*259/1000000;

  return result;
}




/*******************************************
  FOOD
*******************************************/
function food_coffee_select_handler()
{
  var coffee_type= $("#food_coffee_type").val();
  if (coffee_type=="none"){
    $('#food_coffee_frequency_q').collapse('hide');
  } else {
    $('#food_coffee_frequency_q').collapse('show');
  }
}

function food_conv(input)
{
  var processed_food_input= $("input[name='radio_processed_food']:checked").val(); //source for kg: https://www.eatforhealth.gov.au/food-essentials/how-much-do-we-need-each-day/serve-sizes
  var processed_food_num=0;
  var result=0;
  var year_or_day = 0;
  var redmeat=$("#meat_serv").val();
  var eggs_dairy=$("#dairy_serv").val();
  var fruits_vegetables=$("#fruits_vegetables_serv").val();
  var grains=$("#grains_serv").val();
  var poultry=$("#poultry_serv").val();

  if (input=='year') {year_or_day=52;} else {year_or_day=1/7;}

  //if (processed_food_input =="below_avg_processed"){processed_food_num = .015;}    //need conversion factor for how much more processed food vs fresh
   // else if (processed_food_input =="avg_processed"){processed_food_num = .05;}    //dummy question for now
   // else{processed_food_num = -0.05;}

  result = year_or_day*((redmeat*0.125*27.91)+(eggs_dairy*0.200*6.096)+(fruits_vegetables*0.125*0.778)+(grains*.100*1.595)+(poultry*0.125*4.12))*(1/1000); //source for emissions: http://www.sciencedirect.com/science/article/pii/S0959652616303584


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
function waste_conv(input)

//KC waste numbers updated (1/27/16). Compost calculation changed to follow same process as recycling. Waste total in kg per day.
{
  var year_or_day = 0;
  var commuter_input= $("input[name='radio_commuter']:checked").val();
  var recycle_input= $("input[name='radio_recycle']:checked").val();
  var compost_input= $("input[name='radio_compost']:checked").val();
  var trash_input = $("input[name='radio_trash']:checked").val();

  var commuter_num = 1;
  var recycle_num =0;
  var trash_num=0;
  var compost_num=0;
  var result1 = 0;
  var result2 = 0;
  var result3 = 0;
  var result4 = 0;
  var result = 0;
  var osuPopulation = 36059;

  if (input=='year') {year_or_day=365;} else {year_or_day=1;}

  if (commuter_input =="on_campus")  {commuter_num= 1;}
    else if (commuter_input =="full_commuter") {commuter_num = 0.75;}
    else if (commuter_input =="part_commuter") {commuter_num = 0.5;}

  if (recycle_input =="below_avg"){recycle_num = 0.15;}
    else if (recycle_input =="avg"){recycle_num = 0.25;}
    else{recycle_num = 0.35;}

  if (compost_input =="below_avg"){compost_num = 0.25;}
    else if (recycle_input =="avg"){compost_num = 0.35;}
    else{compost_num = 0.45;}
    console.log(recycle_num);
    console.log(trash_num);
    console.log(compost_num);

  result1 = 10296.75 / osuPopulation * recycle_num * commuter_num * year_or_day * 2.79;                      //left as original coefficient, needs fact checking
  result2 = 10296.75 / osuPopulation * compost_num * commuter_num * year_or_day * 0.4443;                    //source: https://www3.epa.gov/ttnchie1/efpac/ghg/GHG_Biogenic_Report_draft_Dec1410.pdf
  result3 = 10296.75 / osuPopulation * (1 - recycle_num - compost_num) * commuter_num * year_or_day * 1.22;    //source: http://www.lms.com.au/assets/Media-Resources/Fact-Sheet-on-Emissions.pdf
  result4 = 10296.75 / osuPopulation * commuter_num * 0.1 * year_or_day * 1.22;
  result = result1 + result2 + result3;

  if (trash_input =="less_4lbs") {result = result - result4;}
      else if (trash_input =="more_4lbs"){result = result + result4;}


  return result;
}


/*******************************************
  WATER
*******************************************/
function water_conv(input)
{
  var year_or_day = 0;
  var baseline =0;
  var multiplier = 1;
  var gallonsperdayperperson = 21.402;
  result =1;

  var user_type = $("input[name='radio_commuter']:checked").val();
  var shower_duration = $("#water_showers_duration").val();
  var total_shower = $("#water_showers_times").val();
  var total_laundry = $("#water_laundry").val();
  var total_flush = $("#water_flush").val();
  var total_cups = $("#water_cups").val();


  if (input=='year') {year_or_day=365;} else {year_or_day=1;}

  if(user_type =="student"){baseline = gallonsperdayperperson;}
    else if (user_type =="full_commuter") {baseline = 0.75 * gallonsperdayperperson;}
    else if (user_type =="part_commuter") {baseline = 0.5 * gallonsperdayperperson;}

  result = baseline + (total_shower * 1.5 * year_or_day) + (13.1 * total_laundry / 30 * year_or_day) + (1.6*total_flush * year_or_day) + (total_cups * 0.0625 * year_or_day);
  result = (result * 0.00284 ); //soruce: UK Environment Agency

  return result;
}
//Link to SCU's original code: https://docs.google.com/file/d/0B66G3LFpAvamc1RwQ29HLWg2dms/edit?usp=sharing//


// Draw Pie/Bar Charts

var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};

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
        responsive: true
    }
};


function draw_user_result() {
    var ctx = document.getElementById("chart_area_user").getContext("2d");
    window.myPie = new Chart(ctx, user_config);
    window.myPie.update();
};


  var us_avg_config = {
      type: 'pie',
      data: {
          datasets: [{
              data: [
                4165.6,
                4100,
                3181.6,
                3755.6,
                1197.2,
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
          responsive: true
      }
    };

//Bar graph
var horizontalBarChartData = {
    labels: ["Brazil", "Burkina Faso", "China", "United States", "France", "Oregon"],
    datasets: [{
        label: 'Average Carbon Emissions Per Person',
        backgroundColor: window.chartColors.red,
        borderColor: window.chartColors.red,
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
        backgroundColor: window.chartColors.blue,
        borderColor: window.chartColors.blue,
        data: graph_carbon_num_total
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
}

/*******************************************
  Calculator page handler
*******************************************/

function display_question(action, field_name)
{
  if (action=="show"){$("#"+field_name+"_q").show(500);}
  else if (action=="hide")
  {
    $("#"+field_name+"_q").hide(500);
    $("#"+field_name).val('');
  }
}
