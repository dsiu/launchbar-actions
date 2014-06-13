// The 'run' function is called by LaunchBar when the user opens the action.
include('book.js');

function run( argument ) {

  if ( argument != undefined ) {
    var books = new Books(argument);
    return books.getSuggestions();
  }
  else {
    // No argument passed, just open the website:
    return LaunchBar.openURL('http://book.douban.com/');
  }

}
