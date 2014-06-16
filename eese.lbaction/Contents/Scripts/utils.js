var stringFormat = function () {
  var formatted = arguments[0];
  for ( var i = 1; i < arguments.length; i++ ) {
    var ph = i - 1;
    var regexp = new RegExp('\\{' + ph + '\\}', 'gi');
    formatted = formatted.replace(regexp, arguments[i]);
  }
  return formatted;
};

var searchGoogle = function (s) {
  LaunchBar.performAction('Google', s);
};
