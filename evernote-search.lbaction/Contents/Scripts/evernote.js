/**
 * Created with IntelliJ IDEA.
 * User: Danny Siu <danny.siu@gmail.com>
 * Date: 5/13/15
 * Time: 12:35
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

// $.printf('%s', JSON.stringify(evernoteTags()));
