/**
 * Configure geography and table selection on index.php page
 * Katie Taylor and Peggy Gill
 * 8/5/2021
 */

/** Accordion JS */
const acc = document.getElementsByClassName("accordionHeader");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
	this.classList.toggle("openPanel");
	let accordionContent = this.nextElementSibling;
	// console.log("accordionContent: ", accordionContent);
	if (accordionContent.style.display === "block") {
	  accordionContent.style.display = "none";
	  this.firstElementChild.classList.remove("o-angle-down-1");
	  this.firstElementChild.classList.add("o-angle-up-1");
	}
	else {
	  accordionContent.style.display = "block";
	  this.firstElementChild.classList.remove("o-angle-up-1");
	  this.firstElementChild.classList.add("o-angle-down-1");
	}
  }
						 );
}

// Accordion JS: close all & open all buttons
let closeAcc = document.getElementById("closeAccordions");
closeAcc.addEventListener("click", function() {
  const accContent = document.getElementsByClassName("accordionContent");
  for (var i = 0; i < accContent.length; i++) {
	accContent[i].style.display = "none";
	// console.log("hiding ", accContent[i]);
  }
}
						 );
let openAcc = document.getElementById("openAccordions");
openAcc.addEventListener("click", function() {
  const accContent = document.getElementsByClassName("accordionContent");
  for (var i = 0; i < accContent.length; i++) {
	accContent[i].style.display = "block";
	// console.log("showing ", accContent[i]);
  }
}
						);

function openEEOTable() {
  var hostname = window.location.origin
  var url = hostname + "/acs/www/data/eeo-data/eeo-tables-2018/tableview.php?";
  var fileType = eeo_filetype;
  if( (geo_RadioValue) === "nation") {
	url += 'geotype=nation&usVal=us' + "&filetype=" + fileType + "&geoName=United States";
	window.open(url, "_blank");
	return;
  }
  if( (geo_RadioValue) === "state") {
	stVal = $("#firstLevelGeoList").val();
	url += "geotype=state&state="  + stVal + "&filetype=" + fileType + "&geoName=" + geoString;
	window.open(url, "_blank");
	return;
  }
  if( (geo_RadioValue) === "place") {
	plVal = $("#secondLevelGeoList").val();
	url += "geotype=place&place=" + plVal + "&filetype=" + fileType + "&geoName=" + geoString;
	window.open(url, "_blank");
	return;
  }
  if( (geo_RadioValue) === "county") {
	coVal = $("#secondLevelGeoList").val();
	url += "geotype=county&county=" + coVal + "&filetype=" + fileType + "&geoName=" + geoString;
	window.open(url, "_blank");
	return;
  }
  if( (geo_RadioValue) === "countyset") {
	cosetVal = $("#secondLevelGeoList").val();
	url += "geotype=countyset&countyset=" + cosetVal + "&filetype=" + fileType + "&geoName=" + geoString;
	window.open(url, "_blank");
	return;
  }
  if( (geo_RadioValue) === "msa") {
	msaVal = $("[name='msaList']").val();
	url += "geotype=msa&msa=" + msaVal + "&filetype=" + fileType + "&geoName=" + geoString;
	window.open(url, "_blank");
	return;
  }
}
// openEEOTable
$("#get_EEO_data").click(function() {
  // assumes element with id='button'
  openEEOTable();
}
						);
// onclick get_EEO_data	
// var fileSubstr = eeo_filetype.substring(3,4);
//console.log(fileSubstr);
function loadStates(selobj, url, extra, SecondGeoSelection=null) {

	// table sets fall into 2 groups for the sets of states w/ suppression of places & tables, most likely based on data threshold
	const group1Tables = ["1", "3", "4", "5", "6"];
	const group2Tables = ["2", "7", "8", "9", "10", "11", "12"]; // not confirmed

    const group1StatesNoPlaces = [
      "04000us30","04000us46","04000us50","04000us54","04000us56","04000us72"
    ]; // these states have no places for the tables in group1Tables
    const group2StatesNoPlaces = [
      "04000us10","04000us23","04000us28","04000us30","04000us31","04000us35","04000us38","04000us46","04000us50","04000us54","04000us56","04000us72"
    ]; // these states have no places for the tablesets in group2Tables

    const group2StatesNoCounties = ["04000us56"]; // these states have no counties for tables in group2Tables

	let tableSetNum = eeo_filetype.match(/\d+/).join(""); // get tableSetNum from table type

  select = $(selobj).empty();
  $.getJSON(url, {}, function (data) {

	if (data[0][0] === "01000us" || data[0][1] === "United States") { // remove 'United States' entry from state data
		data = data.slice(1);
	}
	data = data.sort(function alphabetizeStates(a, b) {
      a = a[1];
      b = b[1];
      if (a > b) {
        return 1;
      } else if (b > a) {
        return -1;
      } else {
        return 0;
      }
    });

    // console.log('data:');
    // console.log(data);

    $.each(data, function (i, obj) {
      if (i != 0) {
        let optionVal = obj[0];
        let optionText = obj[1];
        let newOption = $('<option></option>');
        //.attr('disabled', true).addClass('eeo_red').text(`${option} (no ${geoSelection} available)`)
        if (
            (SecondGeoSelection === 'counties' && group2Tables.includes(tableSetNum) && group2StatesNoCounties.includes(optionVal)) || // formerly #firstLevelGeoListAlt3
            (SecondGeoSelection === 'places' && group1StatesNoPlaces.includes(optionVal)) || // formerly #firstLevelGeoListAlt2
            (group2Tables.includes(tableSetNum) && SecondGeoSelection === 'places' && group2StatesNoPlaces.includes(optionVal)) // formerly #firstLevelGeoListAlt
        ) {
            optionText = optionText + ` (no ${SecondGeoSelection} available)`;
            $(newOption).attr('disabled', true).addClass('eeo_red');
            // console.log(`adding new DISABLED option for ${optionText} (${optionVal}):`);
        } else {
            // console.log(`adding new enabled option for ${optionText} (${optionVal})`);
        }
        $(newOption).val(optionVal).html(optionText);
        select.append(newOption);
      }
    });
    
    $('#firstLevelGeoList :nth-child(1)').before("<option selected>Select a State" + extra +"</option>");
  });
  let has2DDs = true;
  if (SecondGeoSelection === null) { // no 2nd dropdown
	has2DDs = false;
  }
  $.fn.dropdownCh(has2DDs);
}
// loadStates		 
function loadPlace(selobj, url, stValsubstr) {
  select = $(selobj).empty();
  $.getJSON(url, {
  }
			, function (data) {
	$("#secondLevelGeoList").empty();
	$.each(data, function (i, obj)  {
	  if(obj[0].substring(7,9) === stValsubstr) {
		$("#secondLevelGeoList").slideDown();
		select.append(
		  $('<option></option>').val(obj[0]).html(obj[1]));
	  }
	}
		  );
	$("#secondLevelGeoList").sortSelect();
	{
	  $('#secondLevelGeoList :nth-child(1)').before("<option selected>Select a Place</option>");
	}
  }
		   );
	let has2DDs = true;
	$.fn.dropdownCh(has2DDs);
}
// loadPlace
function loadCounty(selobj, url, stValsubstr) {
  select = $(selobj).empty();
  $.getJSON(url, {
  }
			, function (data) {
	$("#secondLevelGeoList").empty();
	$.each(data, function (i, obj) {
	  if(obj[0].substring(7,9) === stValsubstr) {
		select.append(
		  $('<option></option>').val(obj[0]).html(obj[1]));
	  }
	}
		  );
	$("#secondLevelGeoList").sortSelect();
	$('#secondLevelGeoList :nth-child(1)').before("<option selected>Select a County </option>");
  }
		   );
	let has2DDs = true;
	$.fn.dropdownCh(has2DDs);
}
// loadCounty
function loadCountySet(selobj, url, stValsubstr) {
  select = $(selobj).empty();
  $.getJSON(url, {
  }
			, function (data) {
	$("#secondLevelGeoList").empty();
	$.each(data, function (i, obj) {
	  if(obj[0].substring(7,9) === stValsubstr) {
		select.append(
		  $('<option></option>').val(obj[0]).html(obj[1]));
	  }
	}
		  );
	$("#secondLevelGeoList").sortSelect();
	$('#secondLevelGeoList :nth-child(1)').before("<option selected>Select County Set (1R)</option>");
  }
		   );
	let has2DDs = true;
	$.fn.dropdownCh(has2DDs);
}
// loadCountySet
async function loadMSA(msaListName, url) { // msaListName = str used to set up / select msa list (currently "msaList")
  /** Renew msaSelection contents (work around bootstrap-combobox repopulation bugs) */
  $('#msaSelection').empty();
  $('#msaSelection').append(
	`<select name="${msaListName}" id="${msaListName}" class="combobox input-large form-control form-inline" size="1"> </select>`
  );
  $(`#${msaListName}`).change(respondToFirstDD) // necessary to rebind function to new element

  /** Get suppressed MSAs (100k only for now) */
  let suppressedMsasFile = '';
  let tableSetNum = tabletype.match(/\d+/).join("");
  const tables100k = ["2", "7", "8", "9", "10", "11", "12"]; // not confirmed

  if (tables100k.includes(tableSetNum)) { // edit when table sets 7+ added
    suppressedMsasFile = './geos/suppressed-msas-100k.json';
  } else {
    suppressedMsasFile = './geos/suppressed-msas-50k.json';
  }
  const suppressedMsasRaw = await $.ajax({
    url: suppressedMsasFile,
    dataType: 'json',
    error: function() { console.log(`cannot get data from ${suppressedMsasFile}`) }
  });
  
  let suppressedMsas = [];
  suppressedMsasRaw.forEach(function(msaObj, i) {
    suppressedMsas.push(['suppressed'+i, msaObj['CBSA description']]); // keyword 'suppressed' is geo selection trigger for suppression msg b/c it doesn't start w/ a num
  });

  /** Assemble list of all MSAs for this table's dropdown */
  select = $(`#${msaListName}`).empty();
  $.getJSON(url, {}, function (data) {

    // concat suppressed msas (100k) w/ available msas before alphabetizing
    data = data.concat(suppressedMsas);

    data = data.sort(function alphabetizeData(a, b) {
      a = a[1];
      b = b[1];
      if (a > b) {
        return 1;
      } else if (b > a) {
        return -1;
      } else {
        return 0;
      }
    });

    // console.log('data:');
    // console.log(data);
    $.each(data, function (i, obj) {
        let optionVal = obj[0];
        let optionText = obj[1];
        let newOption = $('<option></option>');
        $(newOption).val(optionVal).html(optionText);
        select.append(newOption);
    });
    
	$(`#${msaListName} :nth-child(1)`).before("<option value='' selected>Type/Select an MSA</option>"); // transforms into placeholder w/ no option initially selected
    // $('#msaList :nth-child(1)').before("<option selected>Select an MSA</option>");
	// if (!($('#viewMsaGeo .combobox-container').length)) { // if hasn't been converted to combobox already
		console.log('initing msa dropdown as combobox');
		$('.combobox').combobox({bsVersion:'3'}); // convert reg dropdown to combobox
	//}
  });
  let has2DDs = false;
  $.fn.dropdownCh(has2DDs);
}
// loadMSA
$.fn.extend({
  sortSelect: function sortSelect() {
	var options = this.find("option"),
		arr = options.map(function (_, o) {
		  return {
			t: $(o).text(), v: o.value };
		}
						 ).get();
	arr.sort(function (o1, o2) {
	  // sort select
	  var t1 = o1.t.toLowerCase(),
		  t2 = o2.t.toLowerCase();
	  return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
	}
			);
	options.each(function (i, o) {
	  o.value = arr[i].v;
	  $(o).text(arr[i].t);
	}
				);
  }
}
		   );
// sortSelect
$.fn.extend({
  sortSelectI: function sortSelectI() {
	var options = this.find("option"),
		arr = options.map(function (_, o) {
		  return {
			t: $(o).text(), v: o.value };
		}
						 ).get();
	arr.sort(function (o1, o2) {
	  // sort select
	  var v1 = o1.v.toLowerCase(),
		  v2 = o2.v.toLowerCase();
	  return v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
	}
			);
	options.each(function (i, o) {
	  o.value = arr[i].v;
	  $(o).text(arr[i].t);
	}
				);
  }
}
		   );
// sortSelectI
(function($) {
  $.fn.invisible = function() {
	return this.each(function() {
	  $(this).css("visibility", "hidden");
	}
					);
  };
  $.fn.visible = function() {
	return this.each(function() {
	  $(this).css("visibility", "visible");
	}
					);
  };
}
 (jQuery));
//$("#someElem").invisible();
//$("#someOther").visible();
var sumLevel = "";
var st_val = "";
var geoString = "";
var url_state = "/acs/www/data/eeo-data/eeo-tables-2018/geos/state.json";
$(document).ready(function(){
  var geoNation = "United States";
  $(".geo_selected").empty();
  $('input[type="radio"]').prop('checked', false);
  //$("[name='filegroup2018']").removeAttr("checked");
  //$("[name='geoSumLevel']".removeAttr("checked");
}
				 );
// document.ready
var eeo_filetype = "";
var eeo_filetypeL
$("input[name='filegroup2018']").change(function () { // on table selected
  eeo_filetypeL = $("input:radio[name='filegroup2018']:checked").attr('id');
  eeo_filetype = $("input:radio[name='filegroup2018']:checked").attr('value');
  if ((eeo_filetype === "all1r"))
  {
	$('#county_label').addClass('disabled');
	$('#countyset_label').removeClass('disabled');
	$('#county').attr("disabled", true);
	$('#countyset').attr("disabled", false);
  }
  if ((eeo_filetype !== "all1r"))
  {
	$('#county_label').removeClass('disabled');
	$('#countyset_label').addClass('disabled');
	$('#county').attr("disabled", false);
	$('#countyset').attr("disabled", true);
  }
  $("#viewSelectedFile").visible();
  console.log(eeo_filetype);
  $(".file_typeL").text(eeo_filetypeL).change();
  $(".geo_selected").empty();
  $("#Step2Geo").slideDown();
  $('#Step2Geo').removeClass('disabled');
}
									   );
var fileSubstr = eeo_filetype.substring(3,4);
console.log(fileSubstr);
$("#refreshTableSelect").click(function () { // on click: Change Table Selection
  $(".file_typeL").html('<span style="font-style: italic; color: grey; text-transform: lowercase;">pending new selection</span>'); // "Selected Table: pending new selection" displayed
  $("input[name='filegroup2018']").prop('checked',false);
  $('#tableSelectForm').removeClass('disabled');
  $('#Step2Geo').addClass('disabled');
  $("input[name='geoSumLevel']").prop('checked',false);
  $("#viewGeo").slideUp();
  $("#viewResults").slideUp();
  $(".geo_selected").empty();
  $("#viewMsaGeo, #viewFirstLevelGeo, #viewSecondLevelGeo").slideUp();
//   $("#viewMsaGeo, #viewFirstLevelGeo, #viewSecondLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
  $("#msaList, #firstLevelGeoList, #secondLevelGeoList").empty();
}
							  );
// Selected a summary Level Start
var geo_RadioValue = "";
$("input[name='geoSumLevel']").change(function () {
  geo_RadioValue = $("input:radio[name='geoSumLevel']:checked").attr('id');
  $('#tableSelectForm').addClass('disabled');
  $('#refreshTableSelect').slideDown();
  $("#viewGeo").slideUp();
  $("#viewResults").slideUp();
  $(".geo_selected").empty();
  $("#secondLevelGeoList").empty();  //first level geo lists empty?

  $("#viewSecondLevelGeo").slideUp();
  if( (geo_RadioValue) === "nation" ) {
	$("#viewMsaGeo, #viewFirstLevelGeo, #viewSecondLevelGeo").slideUp();
	// $("#viewMsaGeo, #viewFirstLevelGeo, #viewSecondLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
	$("#msaList, #firstLevelGeoList, #secondLevelGeoList").empty();
	var geoNation = "United States";
	$(".geo_selected").text(geoNation);
	$("#suppressionMsg").slideUp();
	$("#get_EEO_data").slideDown('slow');
	$("#viewGeo").slideDown();
	$("#viewResults").slideDown();
	console.log(geo_RadioValue);
	//console.log(geo_RadioID);
  }
  var url_state = "/acs/www/data/eeo-data/eeo-tables-2018/geos/state.json";
  if ( (geo_RadioValue) === "state" ) {
	$("#viewMsaGeo, #viewSecondLevelGeo").slideUp();
	// $("#viewMsaGeo, #viewSecondLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
	console.log("val" + geo_RadioValue);
	$(".sumLevel").text(" a State");
	loadStates('#firstLevelGeoList', url_state, "");
	$("#viewFirstLevelGeo").slideDown();
  }

  // instead of sTableSet# vars for each table set, directly:
  let tableSetNum = eeo_filetype.match(/\d+/).join(""); // get tableSetNum from table type
  console.log(`selected table set number ${tableSetNum}`); 

  if ( (geo_RadioValue) === "msa" ) {
	// $("#viewSecondLevelGeo, #viewFirstLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
	$("#viewFirstLevelGeo, #viewSecondLevelGeo").slideUp();
	loadMSA(
		'msaList', // msaListName, needs to be str, not id selector
		`/acs/www/data/eeo-data/eeo-tables-2018/geos/table${tableSetNum}/t${tableSetNum}_msa.json`, ""
	); // conditional condensing only applied here to avoid introducing bugs
	$("#viewMsaGeo").slideDown();
  }
  if ( (geo_RadioValue) === "place" ) {
	$("#viewMsaGeo, #viewSecondLevelGeo").slideUp();
	loadStates('#firstLevelGeoList', url_state, " to begin", "places");
	$("#viewFirstLevelGeo").slideDown();
	// if (isTableSet1 || isTableSet3 || isTableSet4 || isTableSet5 || isTableSet6) { // no places for any tables
	//   loadStates('#firstLevelGeoListAlt2', url_state, " to begin");
	//   $("#viewFirstLevelGeoAlt2").slideDown();
	//   $("#viewFirstLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt3").slideUp();
	// }
	// else if (isTableSet2) { // no places for 2s
	//   loadStates('#firstLevelGeoListAlt', url_state, " to begin");
	//   $("#viewFirstLevelGeoAlt").slideDown();
	//   $("#viewFirstLevelGeo, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
	// }
  }
  if ( (geo_RadioValue) === "county" ) { // not all1r
	$("#viewMsaGeo, #viewSecondLevelGeo").slideUp();
	loadStates('#firstLevelGeoList', url_state, " to begin", "counties");
	$("#viewFirstLevelGeo").slideDown();
	// if (eeo_filetype === "all1w" || isTableSet3 || isTableSet4 || isTableSet5 || isTableSet6) { // no counties for any tables
	//   loadStates('#firstLevelGeoList', url_state, " to begin");
	//   $("#viewFirstLevelGeo").slideDown();
	//   $("#viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
	// }
	// else if ( isTableSet2 ) { // no counties for 2s
	//   loadStates('#firstLevelGeoListAlt3', url_state, " to begin");
	//   $("#viewFirstLevelGeoAlt3").slideDown();
	//   $("#viewFirstLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2").slideUp();
	// }
  }
  if ( (geo_RadioValue) === "countyset" ) { // all1r only
	console.log("url?" + url_state);
	console.log("url?" + geo_RadioValue);
	$("#viewMsaGeo, #viewSecondLevelGeo").slideUp();
	loadStates('#firstLevelGeoList', url_state, " to begin");
	$("#viewFirstLevelGeo").slideDown();
	// $("#viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
  }
}
									 );
var stVal = "";
var stValsubstr = stVal.substring(7);
/** end selection of summary Level and showing drop down. */
function respondToFirstDD() { // gets reattached to msaList everytime it gets reset
  $(".geo_selected").empty();
  $("#secondLevelGeoList").empty();
  $("#viewResults").slideUp();
  $("#viewGeo").slideUp();
  $("#suppressionMsg").slideUp();
  $("#get_EEO_data").slideDown('slow'); // slight overlap w/ #viewGeo sliding up
  //console.log("what is stVal here" + stVal);
  //console.log("what is stVal here" + geo_RadioValue);
  //stValsubstr = stVal.substring(7);
  //console.log(stValsubstr);
  if ( (geo_RadioValue) === "place" ) {
	$(".sumLevel").text(" a Place");
	let stVal = $("#firstLevelGeoList").val();
	let stValSubStr = stVal.substring(7);
	console.log(`in places ${tableSetNum}s ${stVal}`);
	loadPlace('#secondLevelGeoList', `/acs/www/data/eeo-data/eeo-tables-2018/geos/table${tableSetNum}/t${tableSetNum}_place.json`, stValSubStr);

	// if ( isTableSet1 ){
	//   stVal = $("#firstLevelGeoList").val();
	// //   stVal = $("#firstLevelGeoListAlt2").val();
	//   console.log("in places 1s" + stVal);
	//   loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table1/t1_place.json", stVal.substring(7));
	// }
	// else if ( isTableSet2 ) {
	//   stVal = $("#firstLevelGeoList").val();
	// //   stVal = $("#firstLevelGeoListAlt").val();
	//   console.log("in places 2s" + stVal);
	//   loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table2/t2_place.json", stVal.substring(7));
	// }
	// else if ( isTableSet3 ) {
	//   stVal = $("#firstLevelGeoList").val();
	// //   stVal = $("#firstLevelGeoListAlt2").val();
	//   console.log("in places 3s" + stVal);
	//   loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table3/t3_place.json", stVal.substring(7));
	// }
	// else if ( isTableSet4 ) {
	//   stVal = $("#firstLevelGeoList").val();
	// //   stVal = $("#firstLevelGeoListAlt2").val();
	//   console.log("in places 4s" + stVal);
	//   loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table4/t4_place.json", stVal.substring(7));
	// }
	// else if ( isTableSet5 ) {
	//   stVal = $("#firstLevelGeoList").val();
	// //   stVal = $("#firstLevelGeoListAlt2").val();
	//   console.log("in places 5s" + stVal);
	//   loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table5/t5_place.json", stVal.substring(7));
	// }
	// else if ( isTableSet6 ) {
	//   stVal = $("#firstLevelGeoList").val();
	// //   stVal = $("#firstLevelGeoListAlt2").val();
	//   console.log("in places 6s" + stVal);
	//   loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table6/t6_place.json", stVal.substring(7));
	// }
	$("#viewSecondLevelGeo").slideDown();
  }
  else if ( (geo_RadioValue) === "county" ) {
	$(".sumLevel").text(" a County");
	let stVal = $("#firstLevelGeoList").val();
	console.log(`in county ${tableSetNum}s ${stVal}`);
	let stValSubStr = stVal.substring(7);
	if (tableSetNum === "1") { // all1w has special county json file name
		loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table1/t1w_county.json", stValSubStr);
	} else {
		loadCounty('#secondLevelGeoList', `/acs/www/data/eeo-data/eeo-tables-2018/geos/table1/t${tableSetNum}_county.json`, stValSubStr);
	}

	// if (eeo_filetype === "all1w") {
	//   stVal = $("#firstLevelGeoList").val();
	//   console.log("in county 1s" + stVal);
	//   var stValsubstr = stVal.substring(7);
	//   loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table1/t1w_county.json", stValsubstr);
	// }
	// else if ( isTableSet2 ) {
	//   stVal = $("#firstLevelGeoList").val();
	// //   stVal = $("#firstLevelGeoListAlt3").val();
	//   console.log("in county 2s" + stVal);
	//   loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table2/t2_county.json", stVal.substring(7));
	// }
	// else if ( isTableSet3 ) {
	//   stVal = $("#firstLevelGeoList").val();
	//   console.log("in county 3s" + stVal);
	//   loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table3/t3_county.json", stVal.substring(7));
	// }
	// else if ( isTableSet4 ) {
	//   stVal = $("#firstLevelGeoList").val();
	//   console.log("in county 4s" + stVal);
	//   loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table4/t4_county.json", stVal.substring(7));
	// }
	// else if ( isTableSet5 ) {
	//   stVal = $("#firstLevelGeoList").val();
	//   console.log("in county 5s" + stVal);
	//   loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table5/t5_county.json", stVal.substring(7));
	// }
	// else if ( isTableSet6 ) {
	//   stVal = $("#firstLevelGeoList").val();
	//   console.log("in county 6s" + stVal);
	//   loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table6/t6_county.json", stVal.substring(7));
	// }
	$("#viewSecondLevelGeo").slideDown();
  }
  else if ( (geo_RadioValue) === "countyset" ) {
	$(".sumLevel").text(" a County Set");
	stVal = $("#firstLevelGeoList").val();
	var stValSubStr = stVal.substring(7);
	console.log("in county st" + stVal);
	console.log("in county sub" + stValSubStr);
	loadCountySet('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table1/t1r_countyset.json", stValSubStr);
	$("#viewSecondLevelGeo").slideDown();
  }
  else if ( geo_RadioValue === "msa" ) {
	 msaVal = $("[name='msaList']").val();
	// console.log('msa selected');
	if (isNaN(msaVal.charAt(0))) { // if msaVal doesn't start w/ a num (as all msa GEOIDs start w/ nums)
		console.log(`msa selected is suppressed`)
		// replace Get EEO Table button w/ msg about suppression
		$("#get_EEO_data").slideUp();
		$("#suppressionMsg").slideDown();
	}
  }
  else {
	  console.log('Error: no geo radio val selected');
  }
}
$("#firstLevelGeoList").change(respondToFirstDD);
// $("#firstLevelGeoList, #firstLevelGeoListAlt, #firstLevelGeoListAlt2, #firstLevelGeoListAlt3").change(respondToFirstDD);
// on change for file or sumlevel
// var dd_str = "";

function updateResultsDisplayed(dd_str) {
	$(".geo_selected").empty();
	console.log(`geo selected: ${dd_str}`);
	$(".geo_selected").text(dd_str).change();
	$("#viewGeo").slideDown();
	$("#viewResults").slideDown();
	geoString = dd_str;
}

$.fn.dropdownCh = (function (has2DDS) {
	if (has2DDS) { // if has 2nd dropdown
	  $("#secondLevelGeoList").change(function(){
		updateResultsDisplayed( $("#secondLevelGeoList option:selected").text() ); 
	  });
	} else if (geo_RadioValue === 'msa') {
	  $("#msaList").change(function(){
		updateResultsDisplayed( $("#msaList option:selected").text() );
	  });
	} else { // isn't msa & doesn't have 2nd dropdown
	  $("#firstLevelGeoList").change(function(){
		updateResultsDisplayed( $("#firstLevelGeoList option:selected").text() );
	  });
	}
//   $("#secondLevelGeoList, #firstLevelGeoList").change(function(){
// 	$("#secondLevelGeoList option:selected, #firstLevelGeoList option:selected").each(function(){
// 	})
//   })
 });
 
//  $.fn.dropdownChMsa = (function () { // separate from dropdownCh due to bugs
//   $("#msaList").change(function(){
// 	  $(".geo_selected").empty();
// 	  dd_str = $('#msaList option:selected').text();
// 	  // console.log('geo selected: '+dd_str);
// 	  $(".geo_selected").text(dd_str).change();
// 	  $("#viewGeo").slideDown();
// 	  $("#viewResults").slideDown();
// 	  geoString = dd_str;
//   });
//  });
