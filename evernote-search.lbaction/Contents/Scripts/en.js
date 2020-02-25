/**
 * Created with IntelliJ IDEA.
 * User: Danny Siu <danny.siu@gmail.com>
 * Date: 5/14/15
 * Time: 18:27
 */



// JXA script

// argv
ObjC.import('stdio');

function evernoteTags() {
  var en = Application('Evernote');


  var tags = en.tags();

  var sortedTags = tags.map(
    function ( o ) { return o.name(); }
  ).sort();

  return sortedTags;
}

module.exports = evernoteTags;

// $.printf('%s', JSON.stringify(evernoteTags()));
