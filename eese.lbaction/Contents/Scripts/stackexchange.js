include('utils.js');

var StackExchange = function ( site, userQuery ) {
  // If there is an argument, search for it:
  this._query = encodeURIComponent(userQuery);
  this._site = encodeURIComponent(site);
  var u = stringFormat(StackExchange.searchURL, this._site, this._query);
  this._apiResult = HTTP.getJSON(u).data;
};

StackExchange.searchURL = 'https://api.stackexchange.com/2.1/search/advanced?order=desc&sort=votes&site={0}&q={1}';


StackExchange.prototype.getSuggestions = function () {

  if ( this._apiResult.items.length ) {

    var items = this._apiResult.items;
    var suggestions = [];

    for ( var i in items ) {
      var item = new Item(items[i]);
      suggestions.push(item.getSuggestion());
    }

    return suggestions;
  }
  else {

    var emptyResult = [
      {
        'title' : 'No questions found. Search Google for ' + this._query + '?',
        'action' : 'searchGoogle',
        'actionArgument' : this._query,
        'icon' : 'icon.png'
      }
    ];

    return emptyResult;
  }
};


var Item = function ( m ) {
  this._item = m;
};


Item.prototype.getTitle = function () {
  return this._item.title;
};

Item.prototype.getSubtitle = function () {
  var s = 'Score: ' + this._item.score;
  var a = 'Answers: ' + this._item.answer_count;
  var v = 'Views: ' + this._item.view_count;
  return [s, a, v].join(' ');
};

Item.prototype.getURL = function () {
  return this._item.link;
};

Item.prototype.getIcon = function () {
  return 'icon.png';
};


Item.prototype.getSuggestion = function () {
  return {
    'title' : this.getTitle(),
    'subtitle' : this.getSubtitle(),
    'url' : this.getURL(),
    'icon' : this.getIcon()
  }
};
