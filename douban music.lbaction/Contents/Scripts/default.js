// The 'run' function is called by LaunchBar when the user opens the action.
include('music.js');

function run( argument ) {

  if ( argument != undefined ) {
    var musics = new Musics(argument);
    return musics.getSuggestions();
  }
  else {
    // No argument passed, just open the website:
    return LaunchBar.openURL('http://movie.douban.com/');
  }

}
