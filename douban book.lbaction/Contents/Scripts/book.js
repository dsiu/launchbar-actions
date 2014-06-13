include('utils.js');

var Books = function ( userQuery ) {
  // If there is an argument, search for it:
  this._query = encodeURIComponent(userQuery);
  var u = stringFormat(Books.searchURL, Books.apiKey, Books.searchLimit, this._query);
  this._apiResult = HTTP.getJSON(u).data;
};

Books.apiKey = '01068bdd0c3168a70313a397249439f5';

Books.searchURL = "https://api.douban.com/v2/book/search?count={1}&apikey={0}&q={2}";

Books.searchLimit = 20;

Books.prototype.getSuggestions = function () {

  if ( this._apiResult.count ) {

    var books = this._apiResult.books;
    var suggestions = [];

    for ( var i in books ) {
      var book = new Book(books[i]);
      suggestions.push(book.getSuggestion());
    }

    return suggestions;
  }
  else {

    var emptyResult = [
      {
        'title' : '没找到符合条件的书籍, 去豆瓣搜搜看？',
        'url' : 'http://book.douban.com/subject_search?search_text=' + this._query,
        'icon' : 'icon.png'
      }
    ];

    return emptyResult;
  }
};


var Book = function ( b ) {
  this._movie = b;
};

Book.prototype.getTags = function () {
  return this._movie.tags.map(function ( t ) { return t.name; });
};

Book.prototype.getTitle = function () {
  return this._movie.title;
};

Book.prototype.getSubtitle = function () {
  var a = '作者: ' + this._movie.author.join(',');
  var r = '评分: ' + this._movie.rating.average + '/' + this._movie.rating.numRaters;
  var t = '标签: ' + this.getTags().join(',');
  return [a, r, t].join(' ');
};

Book.prototype.getURL = function () {
  return this._movie.alt;
};

Book.prototype.getIcon = function () {
  return 'book.png';
};

Book.prototype.getQuickLookURL = function () {
  return this._movie.image;
};

Book.prototype.getSuggestion = function () {
  return {
    'title' : this.getTitle(),
    'subtitle' : this.getSubtitle(),
    'url' : this.getURL(),
    'icon' : this.getIcon(),
    'quickLookURL' : this.getQuickLookURL()
  }
};
