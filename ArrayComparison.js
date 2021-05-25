var x = ['IdA', 'idB', 'IdC', 'IdD', 'IdE'];
var y = ['idB', 'IdE', 'IdF'];

var z = x.filter(function(val) {
  return y.indexOf(val) != -1;
});

console.log(z);