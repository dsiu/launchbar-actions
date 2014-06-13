// The 'run' function is called by LaunchBar when the user opens the action.
include('movie.js');

function run( argument ) {

  if ( argument != undefined ) {
    var movies = new Movies(argument);
    return movies.getSuggestions();
  }
  else {
    // No argument passed, just open the website:
    return LaunchBar.openURL('http://music.douban.com/');
  }

}
