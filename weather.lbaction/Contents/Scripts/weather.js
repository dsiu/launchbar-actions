include('utils.js');
include('underscore.js');


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
      forecasts.push(new Forecast(fc, unit));
    });

    forecasts.forEach(function ( f ) {
      result.push({
        title: f.getTitle(),
        subtitle: f.getSubtitle(),
        icon: f.getIcon(),
        time: f.getDate().getTime()
      })
    });

    result = _.sortBy(result, function (e) { e.time });
    LaunchBar.debugLog(JSON.stringify(result));
    return result;
  }
  catch ( e ) {
    LaunchBar.debugLog(e);
  }

};

var Forecast = function (forecast, unit) {
  this._forecast = forecast;
  this._unit = unit || 'C';
};

Forecast.prototype.getDate = function () {
  return new Date(this._forecast.date.epoch * 1000);
};

Forecast.prototype.getTimeOfDate = function () {
  var hr = this.getDate().getHours();
  var tod = ( hr > 18 ) ? 'night' : 'day';
  return tod;
};

Forecast.prototype.getTitle = function() {
  var d = this._forecast.date.weekday;
  var c = this._forecast.conditions;
  return d + ": " + c;
};


Forecast.prototype.getSubtitle = function () {
  var hf = this._forecast.high.fahrenheit;
  var lf = this._forecast.low.fahrenheit;
  var hc = this._forecast.high.celsius;
  var lc = this._forecast.low.celsius;
  var pre = this._forecast.pop;
  var temp;

  if ( this._unit == 'F' ) {
    temp = "High: " + hf + "°F (" + hc + "°C)" + " Low: " + lf + "°F (" + lc + "°C)";
  }
  else {
    temp = "High: " + hc + "°C (" + hf + "°F)" + " Low: " + lc + "°C (" + lf + "°F)";
  }

  return temp + 'Precipitation: ' + pre + '%';
};

Forecast.prototype.getIcon = function () {
  var cond = this._forecast.conditions.trim();
  var icon;
  var tod = this.getTimeOfDate();

  switch(cond) {
    case 'Chance of Rain': icon = '007.png'; break;
    case 'Chance of Snow': icon = '014.png'; break;
    case 'Chance of a Thunderstorm': icon = '010.png'; break;
    case 'Light Drizzle': icon = '007.png'; break;
    case 'Light Rain': icon = '007.png'; break;
    case 'Light Snow': icon = '014.png'; break;
    case 'Light Snow Grains': icon = '014.png'; break;
    case 'Light Ice Crystals': icon = '014.png'; break;
    case 'Light Ice Pellets': icon = '014.png'; break;
    case 'Light Hail': icon = '011.png'; break;
    case 'Light Mist': icon = '007.png'; break;
    case 'Light Fog': icon = '003-' + tod + '.png'; break;
    case 'Light Fog Patches': icon = '003-' + tod + '.png'; break;
    case 'Light Smoke': icon = '003-' + tod + '.png'; break;
    case 'Light Volcanic Ash': icon = '003-' + tod + '.png'; break;
    case 'Light Widespread Dust': icon = '003-' + tod + '.png'; break;
    case 'Light Sand': icon = '003-' + tod + '.png'; break;
    case 'Light Haze': icon = '003-' + tod + '.png'; break;
    case 'Light Spray': icon = '003-' + tod + '.png'; break;
    case 'Light Dust Whirls': icon = '003-' + tod + '.png'; break;
    case 'Light Sandstorm': icon = '003-' + tod + '.png'; break;
    case 'Light Low Drifting Snow': icon = '014.png'; break;
    case 'Light Low Drifting Widespread Dust': icon = '003-' + tod + '.png'; break;
    case 'Light Low Drifting Sand': icon = '003-' + tod + '.png'; break;
    case 'Light Blowing Snow': icon = '011.png'; break;
    case 'Light Blowing Widespread Dust': icon = '003-' + tod + '.png'; break;
    case 'Light Blowing Sand': icon = '003-' + tod + '.png'; break;
    case 'Light Rain Mist': icon = '007.png'; break;
    case 'Light Rain Showers': icon = '007.png'; break;
    case 'Light Snow Showers': icon = '014.png'; break;
    case 'Light Snow Blowing Snow Mist': icon = '014.png'; break;
    case 'Light Ice Pellet Showers': icon = '010.png'; break;
    case 'Light Hail Showers': icon = '010.png'; break;
    case 'Light Small Hail Showers': icon = '010.png'; break;
    case 'Light Thunderstorm': icon = '010.png'; break;
    case 'Light Thunderstorms and Rain': icon = '010.png'; break;
    case 'Light Thunderstorms and Snow': icon = '010.png'; break;
    case 'Light Thunderstorms and Ice Pellets': icon = '010.png'; break;
    case 'Light Thunderstorms with Hail': icon = '010.png'; break;
    case 'Light Thunderstorms with Small Hail': icon = '010.png'; break;
    case 'Light Freezing Drizzle': icon = '010.png'; break;
    case 'Light Freezing Rain': icon = '010.png'; break;
    case 'Light Freezing Fog': icon = '' + tod + '/003.png'; break;
    case 'Heavy Drizzle': icon = '009.png'; break;
    case 'Heavy Rain': icon = '009.png'; break;
    case 'Heavy Snow': icon = '014.png'; break;
    case 'Heavy Snow Grains': icon = '014.png'; break;
    case 'Heavy Ice Crystals': icon = '014.png'; break;
    case 'Heavy Ice Pellets': icon = '014.png'; break;
    case 'Heavy Hail': icon = '011.png'; break;
    case 'Heavy Mist': icon = '009.png'; break;
    case 'Heavy Fog': icon = '003-' + tod + '.png'; break;
    case 'Heavy Fog Patches': icon = '003-' + tod + '.png'; break;
    case 'Heavy Smoke': icon = '003-' + tod + '.png'; break;
    case 'Heavy Volcanic Ash': icon = '003-' + tod + '.png'; break;
    case 'Heavy Widespread Dust': icon = '003-' + tod + '.png'; break;
    case 'Heavy Sand': icon = '003-' + tod + '.png'; break;
    case 'Heavy Haze': icon = '003-' + tod + '.png'; break;
    case 'Heavy Spray': icon = '003-' + tod + '.png'; break;
    case 'Heavy Dust Whirls': icon = '003-' + tod + '.png'; break;
    case 'Heavy Sandstorm': icon = '003-' + tod + '.png'; break;
    case 'Heavy Low Drifting Snow': icon = '014.png'; break;
    case 'Heavy Low Drifting Widespread Dust': icon = '003-' + tod + '.png'; break;
    case 'Heavy Low Drifting Sand': icon = '003-' + tod + '.png'; break;
    case 'Heavy Blowing Snow': icon = '011.png'; break;
    case 'Heavy Blowing Widespread Dust': icon = '003-' + tod + '.png'; break;
    case 'Heavy Blowing Sand': icon = '003-' + tod + '.png'; break;
    case 'Heavy Rain Mist': icon = '007.png'; break;
    case 'Heavy Rain Showers': icon = '007.png'; break;
    case 'Heavy Snow Showers': icon = '014.png'; break;
    case 'Heavy Snow Blowing Snow Mist': icon = '014.png'; break;
    case 'Heavy Ice Pellet Showers': icon = '015.png'; break;
    case 'Heavy Hail Showers': icon = '015.png'; break;
    case 'Heavy Small Hail Showers': icon = '015.png'; break;
    case 'Heavy Thunderstorm': icon = '010.png'; break;
    case 'Heavy Thunderstorms and Rain': icon = '010.png'; break;
    case 'Heavy Thunderstorms and Snow': icon = '010.png'; break;
    case 'Heavy Thunderstorms and Ice Pellets': icon = '010.png'; break;
    case 'Heavy Thunderstorms with Hail': icon = '010.png'; break;
    case 'Heavy Thunderstorms with Small Hail': icon = '010.png'; break;
    case 'Heavy Freezing Drizzle': icon = '010.png'; break;
    case 'Heavy Freezing Rain': icon = '010.png'; break;
    case 'Heavy Freezing Fog': icon = '003-' + tod + '.png'; break;
    case 'Drizzle': icon = '007.png'; break;
    case 'Rain': icon = '007.png'; break;
    case 'Snow': icon = '014.png'; break;
    case 'Snow Grains': icon = '014.png'; break;
    case 'Ice Crystals': icon = '014.png'; break;
    case 'Ice Pellets': icon = '014.png'; break;
    case 'Hail': icon = '011.png'; break;
    case 'Mist': icon = '010.png'; break;
    case 'Fog': icon = '003-' + tod + '.png'; break;
    case 'Fog Patches': icon = '003-' + tod + '.png'; break;
    case 'Smoke': icon = '003-' + tod + '.png'; break;
    case 'Volcanic Ash': icon = '003-' + tod + '.png'; break;
    case 'Widespread Dust': icon = '003-' + tod + '.png'; break;
    case 'Sand': icon = '003-' + tod + '.png'; break;
    case 'Haze': icon = '003-' + tod + '.png'; break;
    case 'Spray': icon = '003-' + tod + '.png'; break;
    case 'Dust Whirls': icon = '003-' + tod + '.png'; break;
    case 'Sandstorm': icon = '003-' + tod + '.png'; break;
    case 'Low Drifting Snow': icon = '014.png'; break;
    case 'Low Drifting Widespread Dust': icon = '003-' + tod + '.png'; break;
    case 'Low Drifting Sand': icon = '003-' + tod + '.png'; break;
    case 'Blowing Snow': icon = '011.png'; break;
    case 'Blowing Widespread Dust': icon = '003-' + tod + '.png'; break;
    case 'Blowing Sand': icon = '003-' + tod + '.png'; break;
    case 'Rain Mist': icon = '010.png'; break;
    case 'Rain Showers': icon = '007.png'; break;
    case 'Snow Showers': icon = '014.png'; break;
    case 'Snow Blowing Snow Mist': icon = '014.png'; break;
    case 'Ice Pellet Showers': icon = '010.png'; break;
    case 'Hail Showers': icon = '010.png'; break;
    case 'Small Hail Showers': icon = '010.png'; break;
    case 'Thunderstorm': icon = '010.png'; break;
    case 'Thunderstorms and Rain': icon = '010.png'; break;
    case 'Thunderstorms and Snow': icon = '010.png'; break;
    case 'Thunderstorms and Ice Pellets': icon = '010.png'; break;
    case 'Thunderstorms with Hail': icon = '010.png'; break;
    case 'Thunderstorms with Small Hail': icon = '010.png'; break;
    case 'Freezing Drizzle': icon = '010.png'; break;
    case 'Freezing Rain': icon = '010.png'; break;
    case 'Freezing Fog': icon = '003-' + tod + '.png'; break;
    case 'Patches of Fog': icon = '003-' + tod + '.png'; break;
    case 'Shallow Fog': icon = '003-' + tod + '.png'; break;
    case 'Partial Fog': icon = '003-' + tod + '.png'; break;
    case 'Overcast': icon = '003-' + tod + '.png'; break;
    case 'Clear': icon = '001.png'; break;
    case 'Partly Cloudy': icon = '001-' + tod + '.png'; break;
    case 'Mostly Cloudy': icon = '002-' + tod + '.png'; break;
    case 'Scattered Clouds': icon = '001-' + tod + '.png'; break;
    case 'Small Hail': icon = '010.png'; break;
    case 'Squals': icon = '009.png'; break;
    case 'Funnel Cloud': icon = 'funnel.png'; break;
    case 'Unknown Precipitation': icon = 'na.png'; break;
    case 'Unknown': icon = 'sun.png'; break;
    default: icon = 'sun.png'; break;
  }
  return icon;
};


