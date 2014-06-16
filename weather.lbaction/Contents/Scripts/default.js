// The 'run' function is called by LaunchBar when the user opens the action.
include('weather.js');

function run( argument ) {

  if ( argument != undefined ) {
      var weather = new Weather();
      return weather.getForecast();
  }
  else {
    // No argument passed, just open the website:
//    return LaunchBar.openURL('http://movie.douban.com/');
  }

}
