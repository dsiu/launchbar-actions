include('utils.js');

var Musics = function ( userQuery ) {
  // If there is an argument, search for it:
  this._query = encodeURIComponent(userQuery);
  var u = stringFormat(Musics.searchURL, Musics.apiKey, Musics.searchLimit, this._query);
  this._apiResult = HTTP.getJSON(u).data;
};

Musics.apiKey = '01068bdd0c3168a70313a397249439f5';

Musics.searchURL = 'https://api.douban.com/v2/music/search?count={1}&apikey={0}&q={2}';

Musics.searchLimit = 20;

Musics.prototype.getSuggestions = function () {

  if ( this._apiResult.count ) {

    var musics = this._apiResult.musics;
    var suggestions = [];

    for ( var i in musics ) {
      var music = new Music(musics[i]);
      suggestions.push(music.getSuggestion());
    }

    return suggestions;
  }
  else {

    var emptyResult = [
      {
        'title' : '没找到符合条件的音樂, 去豆瓣搜搜看？',
        'url' : 'http://music.douban.com/subject_search?search_text=' + this._query,
        'icon' : 'icon.png'
      }
    ];

    return emptyResult;
  }
};


var Music = function ( m ) {
  this._music = m;
};

Music.prototype.getTags = function () {
  return this._music.tags.map(function ( t ) { return t.name; });
};

Music.prototype.getTitle = function () {
  return this._music.title;
};

Music.prototype.getSubtitle = function () {
  var a = '表演者: ' + this._music.attrs.singer.join(',');
  var r = '评分: ' + this._music.rating.average + '/' + this._music.rating.numRaters;
  var t = '标签: ' + this.getTags().join(',');
  return [a, r, t].join(' ');
};

Music.prototype.getURL = function () {
  return this._music.alt;
};

Music.prototype.getIcon = function () {
  return 'music.png';
};

Music.prototype.getQuickLookURL = function () {
  return this._music.image;
};

Music.prototype.getTracks = function () {
  var tracks = this._music.attrs.tracks;

  // if tracks is a string, split it
  if ( tracks.length === 1 ) {
    var splitted = tracks[0].split('\n');
    tracks = splitted;
  }

  return tracks.map(function ( item ) {
    return { title : item };
  });

};

Music.prototype.getSuggestion = function () {
  return {
    'title' : this.getTitle(),
    'subtitle' : this.getSubtitle(),
    'url' : this.getURL(),
    'icon' : this.getIcon(),
    'quickLookURL' : this.getQuickLookURL(),
    'children' : this.getTracks()
  }
};
