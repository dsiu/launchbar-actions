include('utils.js');

var log = LaunchBar.debugLog;

var Weather = function () {

};

Weather.prototype.getForecast = function () {


  try {
    var location = '/q/zmw:00000.7.45007';
    var unit = 'C';
    var key = "67350ed2995fb73f";

    var result = [];

    var url = stringFormat('http://api.wunderground.com/api/{0}/forecast/{1}' + '.json', key, location);
    LaunchBar.debugLog(url);

    var res = HTTP.getJSON(url);

    var fcs = res.data.forecast.simpleforecast.forecastday;
    var forecasts = [];

    fcs.forEach(function ( fc ) {
      forecasts.push(new Forecast(fc));
    });

    forecasts.forEach(function ( f ) {
      result.push({
        title: f.getTitle(),
        subtitle: f.getSubtitle(),
        icon: f.getIcon()
      })
    });

    LaunchBar.debugLog(JSON.stringify(result));
    return result;
  }
  catch ( e ) {
    LaunchBar.debugLog(e);
  }

};

var Forecast = function (forecast) {
  this._forecast = forecast;
  LaunchBar.debugLog(JSON.stringify(this._forecast));
};

Forecast.prototype.getTimeOfDate = function () {
  var hr = new Date(this._forecast.date.epoch).getHours();
  LaunchBar.debugLog(hr);
  var tod = ( hr > 18 ) ? 'night' : 'day';
  LaunchBar.debugLog(tod);
  return tod;
};

Forecast.prototype.getTitle = function() {
  var d = this._forecast.date.weekday;
  var c = this._forecast.conditions;
  return d + ": " + c;
};

Forecast.prototype.getSubtitle = function (  ) {
  return "High: " + this._forecast.high.celsius + " Low: " + this._forecast.low.celsius;
};

Forecast.prototype.getIcon = function () {
  var cond = this._forecast.conditions.trim();
  var icon;
  var tod = this.getTimeOfDate();

  switch(cond) {
    case 'Chance of Rain': icon = 'icons/007.png'; break;
    case 'Chance of Snow': icon = 'icons/014.png'; break;
    case 'Chance of a Thunderstorm': icon = 'icons/010.png'; break;
    case 'Light Drizzle': icon = 'icons/007.png'; break;
    case 'Light Rain': icon = 'icons/007.png'; break;
    case 'Light Snow': icon = 'icons/014.png'; break;
    case 'Light Snow Grains': icon = 'icons/014.png'; break;
    case 'Light Ice Crystals': icon = 'icons/014.png'; break;
    case 'Light Ice Pellets': icon = 'icons/014.png'; break;
    case 'Light Hail': icon = 'icons/011.png'; break;
    case 'Light Mist': icon = 'icons/007.png'; break;
    case 'Light Fog': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Fog Patches': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Smoke': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Volcanic Ash': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Widespread Dust': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Sand': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Haze': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Spray': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Dust Whirls': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Sandstorm': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Low Drifting Snow': icon = 'icons/014.png'; break;
    case 'Light Low Drifting Widespread Dust': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Low Drifting Sand': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Blowing Snow': icon = 'icons/011.png'; break;
    case 'Light Blowing Widespread Dust': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Blowing Sand': icon = 'icons/' + tod + '/003.png'; break;
    case 'Light Rain Mist': icon = 'icons/007.png'; break;
    case 'Light Rain Showers': icon = 'icons/007.png'; break;
    case 'Light Snow Showers': icon = 'icons/014.png'; break;
    case 'Light Snow Blowing Snow Mist': icon = 'icons/014.png'; break;
    case 'Light Ice Pellet Showers': icon = 'icons/010.png'; break;
    case 'Light Hail Showers': icon = 'icons/010.png'; break;
    case 'Light Small Hail Showers': icon = 'icons/010.png'; break;
    case 'Light Thunderstorm': icon = 'icons/010.png'; break;
    case 'Light Thunderstorms and Rain': icon = 'icons/010.png'; break;
    case 'Light Thunderstorms and Snow': icon = 'icons/010.png'; break;
    case 'Light Thunderstorms and Ice Pellets': icon = 'icons/010.png'; break;
    case 'Light Thunderstorms with Hail': icon = 'icons/010.png'; break;
    case 'Light Thunderstorms with Small Hail': icon = 'icons/010.png'; break;
    case 'Light Freezing Drizzle': icon = 'icons/010.png'; break;
    case 'Light Freezing Rain': icon = 'icons/010.png'; break;
    case 'Light Freezing Fog': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Drizzle': icon = 'icons/009.png'; break;
    case 'Heavy Rain': icon = 'icons/009.png'; break;
    case 'Heavy Snow': icon = 'icons/014.png'; break;
    case 'Heavy Snow Grains': icon = 'icons/014.png'; break;
    case 'Heavy Ice Crystals': icon = 'icons/014.png'; break;
    case 'Heavy Ice Pellets': icon = 'icons/014.png'; break;
    case 'Heavy Hail': icon = 'icons/011.png'; break;
    case 'Heavy Mist': icon = 'icons/009.png'; break;
    case 'Heavy Fog': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Fog Patches': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Smoke': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Volcanic Ash': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Widespread Dust': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Sand': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Haze': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Spray': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Dust Whirls': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Sandstorm': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Low Drifting Snow': icon = 'icons/014.png'; break;
    case 'Heavy Low Drifting Widespread Dust': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Low Drifting Sand': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Blowing Snow': icon = 'icons/011.png'; break;
    case 'Heavy Blowing Widespread Dust': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Blowing Sand': icon = 'icons/' + tod + '/003.png'; break;
    case 'Heavy Rain Mist': icon = 'icons/007.png'; break;
    case 'Heavy Rain Showers': icon = 'icons/007.png'; break;
    case 'Heavy Snow Showers': icon = 'icons/014.png'; break;
    case 'Heavy Snow Blowing Snow Mist': icon = 'icons/014.png'; break;
    case 'Heavy Ice Pellet Showers': icon = 'icons/015.png'; break;
    case 'Heavy Hail Showers': icon = 'icons/015.png'; break;
    case 'Heavy Small Hail Showers': icon = 'icons/015.png'; break;
    case 'Heavy Thunderstorm': icon = 'icons/010.png'; break;
    case 'Heavy Thunderstorms and Rain': icon = 'icons/010.png'; break;
    case 'Heavy Thunderstorms and Snow': icon = 'icons/010.png'; break;
    case 'Heavy Thunderstorms and Ice Pellets': icon = 'icons/010.png'; break;
    case 'Heavy Thunderstorms with Hail': icon = 'icons/010.png'; break;
    case 'Heavy Thunderstorms with Small Hail': icon = 'icons/010.png'; break;
    case 'Heavy Freezing Drizzle': icon = 'icons/010.png'; break;
    case 'Heavy Freezing Rain': icon = 'icons/010.png'; break;
    case 'Heavy Freezing Fog': icon = 'icons/' + tod + '/003.png'; break;
    case 'Drizzle': icon = 'icons/007.png'; break;
    case 'Rain': icon = 'icons/007.png'; break;
    case 'Snow': icon = 'icons/014.png'; break;
    case 'Snow Grains': icon = 'icons/014.png'; break;
    case 'Ice Crystals': icon = 'icons/014.png'; break;
    case 'Ice Pellets': icon = 'icons/014.png'; break;
    case 'Hail': icon = 'icons/011.png'; break;
    case 'Mist': icon = 'icons/010.png'; break;
    case 'Fog': icon = 'icons/' + tod + '/003.png'; break;
    case 'Fog Patches': icon = 'icons/' + tod + '/003.png'; break;
    case 'Smoke': icon = 'icons/' + tod + '/003.png'; break;
    case 'Volcanic Ash': icon = 'icons/' + tod + '/003.png'; break;
    case 'Widespread Dust': icon = 'icons/' + tod + '/003.png'; break;
    case 'Sand': icon = 'icons/' + tod + '/003.png'; break;
    case 'Haze': icon = 'icons/' + tod + '/003.png'; break;
    case 'Spray': icon = 'icons/' + tod + '/003.png'; break;
    case 'Dust Whirls': icon = 'icons/' + tod + '/003.png'; break;
    case 'Sandstorm': icon = 'icons/' + tod + '/003.png'; break;
    case 'Low Drifting Snow': icon = 'icons/014.png'; break;
    case 'Low Drifting Widespread Dust': icon = 'icons/' + tod + '/003.png'; break;
    case 'Low Drifting Sand': icon = 'icons/' + tod + '/003.png'; break;
    case 'Blowing Snow': icon = 'icons/011.png'; break;
    case 'Blowing Widespread Dust': icon = 'icons/' + tod + '/003.png'; break;
    case 'Blowing Sand': icon = 'icons/' + tod + '/003.png'; break;
    case 'Rain Mist': icon = 'icons/010.png'; break;
    case 'Rain Showers': icon = 'icons/007.png'; break;
    case 'Snow Showers': icon = 'icons/014.png'; break;
    case 'Snow Blowing Snow Mist': icon = 'icons/014.png'; break;
    case 'Ice Pellet Showers': icon = 'icons/010.png'; break;
    case 'Hail Showers': icon = 'icons/010.png'; break;
    case 'Small Hail Showers': icon = 'icons/010.png'; break;
    case 'Thunderstorm': icon = 'icons/010.png'; break;
    case 'Thunderstorms and Rain': icon = 'icons/010.png'; break;
    case 'Thunderstorms and Snow': icon = 'icons/010.png'; break;
    case 'Thunderstorms and Ice Pellets': icon = 'icons/010.png'; break;
    case 'Thunderstorms with Hail': icon = 'icons/010.png'; break;
    case 'Thunderstorms with Small Hail': icon = 'icons/010.png'; break;
    case 'Freezing Drizzle': icon = 'icons/010.png'; break;
    case 'Freezing Rain': icon = 'icons/010.png'; break;
    case 'Freezing Fog': icon = 'icons/' + tod + '/003.png'; break;
    case 'Patches of Fog': icon = 'icons/' + tod + '/003.png'; break;
    case 'Shallow Fog': icon = 'icons/' + tod + '/003.png'; break;
    case 'Partial Fog': icon = 'icons/' + tod + '/003.png'; break;
    case 'Overcast': icon = 'icons/' + tod + '/003.png'; break;
    case 'Clear': icon = 'icons/001.png'; break;
    case 'Partly Cloudy': icon = 'icons/' + tod + '/001.png'; break;
    case 'Mostly Cloudy': icon = 'icons/' + tod + '/002.png'; break;
    case 'Scattered Clouds': icon = 'icons/' + tod + '/001.png'; break;
    case 'Small Hail': icon = 'icons/010.png'; break;
    case 'Squals': icon = 'icons/009.png'; break;
    case 'Funnel Cloud': icon = 'icons/funnel.png'; break;
    case 'Unknown Precipitation': icon = 'icons/na.png'; break;
    case 'Unknown': icon = 'icons/sun.png'; break;
    default: icon = 'icons/sun.png'; break;
  }
  return icon;
};


