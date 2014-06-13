include('utils.js');

var Movies = function ( userQuery ) {
  // If there is an argument, search for it:
  this._query = encodeURIComponent(userQuery);
  var u = stringFormat(Movies.searchURL, Movies.apiKey, Movies.searchLimit, this._query);
  this._apiResult = HTTP.getJSON(u).data;
};

Movies.apiKey = '01068bdd0c3168a70313a397249439f5';

Movies.searchURL = 'https://api.douban.com/v2/movie/search?count={1}&apikey={0}&q={2}';

Movies.searchLimit = 20;

Movies.prototype.getSuggestions = function () {

  if ( this._apiResult.count ) {

    var movies = this._apiResult.subjects;
    var suggestions = [];

    for ( var i in movies ) {
      var movie = new Movie(movies[i]);
      suggestions.push(movie.getSuggestion());
    }

    return suggestions;
  }
  else {

    var emptyResult = [
      {
        'title' : '没找到符合条件的電影, 去豆瓣搜搜看？',
        'url' : 'http://movie.douban.com/subject_search?search_text=' + this._query,
        'icon' : 'icon.png'
      }
    ];

    return emptyResult;
  }
};


var Movie = function ( m ) {
  this._movie = m;
};


Movie.prototype.getTitle = function () {
  return this._movie.title;
};


Movie.prototype.getSubtitle = function () {
  var y = '年份: ' + this._movie.year;
  var r = '评分: ' + this._movie.rating.average + '/' + this._movie.rating.stars;
  var a = '類型: ' + this._movie.subtype;
  var o = '別名: ' + this._movie.original_title;
  return [y, r, a, o].join(' ');
};


Movie.prototype.getURL = function () {
  return this._movie.alt;
};


Movie.prototype.getIcon = function () {
  return 'movie.png';
};


Movie.prototype.getQuickLookURL = function () {
  return this._movie.images.large;
};


Movie.prototype.getSuggestion = function () {
  return  {
    'title' : this.getTitle(),
    'subtitle' : this.getSubtitle(),
    'url' : this.getURL(),
    'icon' : this.getIcon(),
    'quickLookURL' : this.getQuickLookURL()
  };
};
