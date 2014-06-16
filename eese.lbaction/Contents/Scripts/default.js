// The 'run' function is called by LaunchBar when the user opens the action.
include('stackexchange.js');

function run( argument ) {

  if ( argument != undefined ) {
    var search = new StackExchange('expressionengine', argument);
    return search.getSuggestions();
  }
  else {
    // No argument passed, just open the website:
    return LaunchBar.openURL('http://stackexchange.com/');
  }

}

