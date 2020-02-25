/**
 * Created with IntelliJ IDEA.
 * User: Danny Siu <danny.siu@gmail.com>
 * Date: 5/13/15
 * Time: 15:59
 */

var stampit = require('stampit');

var obj = stampit().enclose(function ( a, b ) {
  var secretA = a;
  var secretB = b;

  this.getA = function () {
    return secretA;
  };
  this.getB = function () {
    return secretB;
  };
}).create(null, 'a', 'b');

ObjC.import('stdio')

// console.log(obj.getA()); // stderr
// console.log(obj.getB()); // stderr
$.printf('%s', JSON.stringify({resultA: obj.getA(), resultB: obj.getB()}));
//$.printf('%s', obj.getA());
//$.printf('%s', obj.getB());
