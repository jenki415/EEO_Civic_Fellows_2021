  /* Accordion JS */
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
        // this.style.backgroundColor = "#e7eaed"; // for phone
        // console.log("this: ", this);
        // console.log("firstElementChild: ", this.firstElementChild);
        // this.getElementsByClassName("accordionIcon").classList.toggle("o-angle-up-1");
        // this.getElementsByClassName("accordionIcon").innerText = "+";
        // console.log("accordionIcon: ", this.getElementsByClassName("accordionIcon").innerText, this.getElementsByClassName("accordionIcon"), this.getElementsByClassName("accordionIcon").nextElementSibling);
      }
      else {
        accordionContent.style.display = "block";
        this.firstElementChild.classList.remove("o-angle-up-1");
        this.firstElementChild.classList.add("o-angle-down-1");
        // console.log("this: ", this);
        // console.log("firstElementChild: ", this.firstElementChild);
        // this.getElementsByClassName("accordionIcon").classList.toggle("o-angle-up-1");
        // this.getElementsByClassName("accordionIcon").innerText = "-";
        // console.log("accordionIcon: ", this.getElementsByClassName("accordionIcon").innerText, this.getElementsByClassName("accordionIcon"), this.getElementsByClassName("accordionIcon").nextElementSibling);
      }
    }
                           );
  }
  // Accordion JS: close all & open all buttons
  console.log("here i am");
  let closeAcc = document.getElementById("closeAccordions");
  closeAcc.addEventListener("click", function() {
    const accContent = document.getElementsByClassName("accordionContent");
    for (var i = 0; i < accContent.length; i++) {
      accContent[i].style.display = "none";
      console.log("hiding ", accContent[i]);
    }
  }
                           );
  let openAcc = document.getElementById("openAccordions");
  openAcc.addEventListener("click", function() {
    const accContent = document.getElementsByClassName("accordionContent");
    for (var i = 0; i < accContent.length; i++) {
      accContent[i].style.display = "block";
      console.log("showing ", accContent[i]);
    }
  }
                          );
  var stArr_data = [];
  /* collapsable div */
  /*var coll = document.getElementsByClassName("collapsible");
  var i;
  for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.display === "block") {
              content.style.display = "none";
          } else {
              content.style.display = "block";
          }
      });
  } */
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
      msaVal = $("#firstLevelGeoList").val();
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
  function loadStates(selobj, url, extra) {
    select = $(selobj).empty();
    $.getJSON(url, {
    }
              , function (data) {
      $.each(data, function (i, obj) {
        if (i != 0) {
          select.append(
            $('<option></option>').val(obj[0]).html(obj[1]));
        }
      }
            );
      $("#firstLevelGeoList").sortSelect();
      $('#firstLevelGeoList :nth-child(1)').before("<option selected>Select a State" + extra +"</option>");
    }
             )
    $.fn.dropdownCh();
  };
  function loadStatesSub(selobj, url, extra) {
    select = $(selobj).empty();
    $.getJSON(url, {
    }
              , function (data) {
      $.each(data, function (i, obj) {
        if (i != 0) {
          select.append(
            $('<option></option>').val(obj[0]).html(obj[1]));
        }
      }
            );
      // missing closing brackets parentheses semicolon 
      $("#firstLevelGeoList").sortSelect();
      $('#firstLevelGeoList :nth-child(1)').before("<option selected>Select a State" + extra +"</option>");
    }
             );
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
  }
  // loadCountySet
  function loadMSA(selobj, url) {
    select = $(selobj).empty();
    $.getJSON(url, {
    }
              , function (data) {
      $.each(data, function (i, obj) {
        select.append(
          $('<option></option>').val(obj[0]).html(obj[1]));
      }
            );
      $("#firstLevelGeoList").sortSelect();
      $('#firstLevelGeoList :nth-child(1)').before("<option selected>Select an MSA</option>");
    }
             )
    $.fn.dropdownCh();
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
  $("input[name='filegroup2018']").change(function () {
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
  $("#refreshTableSelect").click(function () {
    $("input[name='filegroup2018']").prop('checked',false);
    $('#tableSelectForm').removeClass('disabled');
    $('#Step2Geo').addClass('disabled');
    $("input[name='geoSumLevel']").prop('checked',false);
    $("#viewGeo").slideUp();
    $("#viewResults").slideUp();
    $(".geo_selected").empty();
    $("#viewFirstLevelGeo, #viewSecondLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
    $("#firstLevelGeoList, #secondLevelGeoList").empty();
  }
                                );
  // Selected a summary Level Start
  var geo_RadioValue = "";
  // Keeping these variables globals a temporary fix for multiple functions below needing to use them
  const numTableSets = 6 // could probably make this not a constant
  let [
    isTableSet1,
    isTableSet2,
    isTableSet3,
    isTableSet4,
    isTableSet5,
    isTableSet6
  ] = Array(numTableSets).fill(false);
  $("input[name='geoSumLevel']").change(function () {
    geo_RadioValue = $("input:radio[name='geoSumLevel']:checked").attr('id');
    $('#tableSelectForm').addClass('disabled');
    $('#refreshTableSelect').slideDown();
    $("#viewGeo").slideUp();
    $("#viewResults").slideUp();
    $(".geo_selected").empty();
    $("#secondLevelGeoList").empty();
    console.log("is dd string full here?" + dd_str);
    $("#viewSecondLevelGeo").slideUp();
    if( (geo_RadioValue) === "nation" ) {
      $("#viewFirstLevelGeo, #viewSecondLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
      $("#firstLevelGeoList, #secondLevelGeoList").empty();
      var geoNation = "United States";
      $(".geo_selected").text(geoNation);
      $("#viewGeo").slideDown();
      $("#viewResults").slideDown();
      console.log(geo_RadioValue);
      //console.log(geo_RadioID);
    }
    var url_state = "/acs/www/data/eeo-data/eeo-tables-2018/geos/state.json";
    if ( (geo_RadioValue) === "state" ) {
      $("#viewSecondLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
      console.log("val" + geo_RadioValue);
      $(".sumLevel").text(" a State");
      loadStates('#firstLevelGeoList', url_state, "");
      $("#viewFirstLevelGeo").slideDown();
    }
    // determine which tableset eeo_filetype is part of
    // removes dedundancy & improves readability in subsequent code that relies on these booleans
    switch (eeo_filetype) {
      case 'all1w': 
      case 'all1r': 
        isTableSet1 = true;
        break;
      case 'all2w':
      case 'all2r':
      case 'cit2w':
      case 'cit2r':
        isTableSet2 = true;
        break;
      case 'all3w':
      case 'all3r':
      case 'cit3w':
      case 'cit3r':
        isTableSet3 = true;
        break;
      case 'all4w':
      case 'all4r':
        isTableSet4 = true;
        break;
      case 'all5w':
      case 'all5r':
      case 'cit5w':
      case 'cit5r':
        isTableSet5 = true;
        break;
      case 'all6w':
      case 'all6r':
      case 'cit6w':
      case 'cit6r':
        isTableSet6 = true;
        break;
    }
    if ( (geo_RadioValue) === "msa" ) {
      $("#viewSecondLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
      if (isTableSet1) {
        loadMSA('#firstLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table1/t1_msa.json", "");
      }
      else if (isTableSet2){
        loadMSA('#firstLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table2/t2_msa.json", "");
        // Katie: I guessed at the URLs for those below based on the established pattern
      }
      else if (isTableSet3){
        loadMSA('#firstLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table3/t3_msa.json", "");
      }
      else if (isTableSet4){
        loadMSA('#firstLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table4/t4_msa.json", "");
      }
      else if (isTableSet5){
        loadMSA('#firstLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table5/t5_msa.json", "");
      }
      else if (isTableSet6){
        loadMSA('#firstLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table6/t6_msa.json", "");
      }
      $("#viewFirstLevelGeo").slideDown();
    }
    if ( (geo_RadioValue) === "place" ) {
      $("#viewSecondLevelGeo").slideUp();
      if (isTableSet1 || isTableSet3 || isTableSet4 || isTableSet5 || isTableSet6)	{
        $("#viewFirstLevelGeoAlt2").slideDown();
        $("#viewFirstLevelGeo").slideUp();
        $("#viewFirstLevelGeoAlt").slideUp();
        $("#viewFirstLevelGeoAlt3").slideUp();
        //empty?
      }
      else if (isTableSet2){
        $("#viewFirstLevelGeoAlt").slideDown();
        $("#viewFirstLevelGeo").slideUp();
        $("#viewFirstLevelGeoAlt2").slideUp();
        $("#viewFirstLevelGeoAlt3").slideUp();
      }
    }
    if ( (geo_RadioValue) === "county" ) {
      $("#viewSecondLevelGeo").slideUp();
      if (eeo_filetype === "all1w" || isTableSet3 || isTableSet4 || isTableSet5 || isTableSet6)	{
        loadStates('#firstLevelGeoList', url_state, " to begin");
        $("#viewFirstLevelGeo").slideDown();
        $("#viewFirstLevelGeoAlt2").slideUp();
        $("#viewFirstLevelGeoAlt").slideUp();
        $("#viewFirstLevelGeoAlt3").slideUp();
        //empty?
      }
      else if ( isTableSet2 ){
        $("#viewFirstLevelGeoAlt3").slideDown();
        $("#viewFirstLevelGeo").slideUp();
        $("#viewFirstLevelGeoAlt2").slideUp();
        $("#viewFirstLevelGeoAlt").slideUp();
      }
    }
    if ( (geo_RadioValue) === "countyset" ) {
      console.log("url?" + url_state);
      console.log("url?" + geo_RadioValue);
      $("#viewSecondLevelGeo").slideUp();
      loadStates('#firstLevelGeoList', url_state, " to begin");
      $("#viewFirstLevelGeo").slideDown();
      $("#viewFirstLevelGeoAlt2").slideUp();
      $("#viewFirstLevelGeoAlt").slideUp();
      $("#viewFirstLevelGeoAlt3").slideUp();
    }
  }
                                       );
  var stVal = "";
  var stValsubstr = stVal.substring(7);
  /** end selection of summary Level and showing drop down. */
  $("#firstLevelGeoList, #firstLevelGeoListAlt, #firstLevelGeoListAlt2, #firstLevelGeoListAlt3").change(function() {
    $(".geo_selected").empty();
    $("#secondLevelGeoList").empty();
    $("#viewResults").slideUp();
    $("#viewGeo").slideUp();
    //console.log("what is stVal here" + stVal);
    //console.log("what is stVal here" + geo_RadioValue);
    //stValsubstr = stVal.substring(7);
    //console.log(stValsubstr);
    if ( (geo_RadioValue) === "place" ) {
      $(".sumLevel").text(" a Place");
      if ( isTableSet1 ){
        stVal = $("#firstLevelGeoListAlt2").val();
        console.log("in places 1s" + stVal);
        loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table1/t1_place.json", stVal.substring(7));
      }
      else if ( isTableSet2 ) {
        stVal = $("#firstLevelGeoListAlt").val();
        console.log("in places 2s" + stVal);
        loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table2/t2_place.json", stVal.substring(7));
      }
      else if ( isTableSet3 ) {
        stVal = $("#firstLevelGeoListAlt2").val();
        console.log("in places 3s" + stVal);
        loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table3/t3_place.json", stVal.substring(7));
      }
      else if ( isTableSet4 ) {
        stVal = $("#firstLevelGeoListAlt2").val();
        console.log("in places 4s" + stVal);
        loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table4/t4_place.json", stVal.substring(7));
      }
      else if ( isTableSet5 ) {
        stVal = $("#firstLevelGeoListAlt2").val();
        console.log("in places 5s" + stVal);
        loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table5/t5_place.json", stVal.substring(7));
      }
      else if ( isTableSet6 ) {
        stVal = $("#firstLevelGeoListAlt2").val();
        console.log("in places 6s" + stVal);
        loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table6/t6_place.json", stVal.substring(7));
      }
      $("#viewSecondLevelGeo").slideDown();
      $.fn.dropdownCh();
    }
    else if ( (geo_RadioValue) === "county" ) {
      $(".sumLevel").text(" a County");
      if (eeo_filetype === "all1w") {
        stVal = $("#firstLevelGeoList").val();
        console.log("in county 1s" + stVal);
        var stValsubstr = stVal.substring(7);
        loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table1/t1w_county.json", stValsubstr);
      }
      else if ( isTableSet2 ) {
        stVal = $("#firstLevelGeoListAlt3").val();
        console.log("in county 2s" + stVal);
        loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table2/t2_county.json", stVal.substring(7));
      }
      else if ( isTableSet3 ) {
        stVal = $("#firstLevelGeoList").val();
        console.log("in county 3s" + stVal);
        loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table3/t3_county.json", stVal.substring(7));
      }
      else if ( isTableSet4 ) {
        stVal = $("#firstLevelGeoList").val();
        console.log("in county 4s" + stVal);
        loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table4/t4_county.json", stVal.substring(7));
      }
      else if ( isTableSet5 ) {
        stVal = $("#firstLevelGeoList").val();
        console.log("in county 5s" + stVal);
        loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table5/t5_county.json", stVal.substring(7));
      }
      else if ( isTableSet6 ) {
        stVal = $("#firstLevelGeoList").val();
        console.log("in county 6s" + stVal);
        loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table6/t6_county.json", stVal.substring(7));
      }
      $("#viewSecondLevelGeo").slideDown();
      $.fn.dropdownCh();
    }
    else if ( (geo_RadioValue) === "countyset" ) {
      $(".sumLevel").text(" a County Set");
      stVal = $("#firstLevelGeoList").val();
      var stValsubstr = stVal.substring(7);
      console.log("in county st" + stVal);
      console.log("in county sub" + stValsubstr);
      loadCountySet('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table1/t1r_countyset.json", stValsubstr);
      $("#viewSecondLevelGeo").slideDown();
      $.fn.dropdownCh();
    }
  }
  );
  // on change for file or sumlevel
  var dd_str = "";
  console.log("did it empty" + dd_str);
  $.fn.dropdownCh = (function () {
    $("#secondLevelGeoList, #firstLevelGeoList").change(function(){
      $("#secondLevelGeoList option:selected, #firstLevelGeoList option:selected").each(function(){
        $(".geo_selected").empty();
        dd_str = $(this).text();
        $(".geo_selected").text(dd_str).change();
        $("#viewGeo").slideDown();
        $("#viewResults").slideDown();
        geoString = dd_str;
      })
    })
  });