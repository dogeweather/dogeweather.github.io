var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

$(document).ready(function() {
  getLocation(); 
});

function getWeather(link, pos) {
  $.getJSON(link, function(data){

    //set weather id & icon 
    var id = data.weather[0].id;
    var icon = data.weather[0].icon;

    $('#weather-id').text(id);
    $('#weather-icon').text(icon);

    var doge_img = "url(../img/doge/" + icon + ".png)";
    $('.doge-image').css('background-image', doge_img);

    var sky_img = "url(../img/sky-img/" + icon + ".png)";
    $('.bg').css('background-image', sky_img);


    //get weather description
    var tempCelcius = data.main.temp - 273.15;
    var tempFahrenheit = tempCelcius * 9 / 5 + 32;
    var description = data.weather[0].description;

    $('#weather-desc').text("wow " + description);

    $('#degreesCelsius .number').text(Math.round(tempCelcius));
    $('#degreesCelsius .cel').text("°C ");
    $('#degreesFahrenheit').text(Math.round(tempFahrenheit) + "°F");

    var url = 'https://api.geoapify.com/v1/geocode/reverse';
    url += '?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + '&apiKey=b34d75bd535141198b423e24a6e21234';
    getWeather(url)
  });
}

function getLocation(link) {
  $.getJSON(link, function(data){
    $('#location').text(data.features[0].properties.city);
    $(".suchlikes").show();
    $(".ourinfo").show();
    
    // much initialise such doge
    $($.doge);
  });
}

$("#browser_geo" ).one('click', function(){
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, function(error) {
        $('#browser_geo').text('use my location');	
          getWeather("../weather.php");
      });
  }
  else {
    $("#browser_geo").text("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var url = 'https://api.openweathermap.org/data/2.5/weather';
    url += '?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&APPID=56a0dcfb48891e08fd6efb6a94ad1d1b&callback=?';

    getWeather(url, position);
    $("#browser_geo").text("wow, located!").css("cursor", "auto").css("color", "#FF5CFF");
}

}
