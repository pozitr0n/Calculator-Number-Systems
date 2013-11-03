var posix='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 
function list ( name, selected ) {
  document.writeln ( '<select name="' + name + '">' );
  for ( var i = 2; i < 37; i++ ) {
    document.writeln ( '<option value="' + i + '"' + 
                      ( i == selected ? ' selected' : '' ) + '>' + i + '</option>' );
  }
 document.writeln ( '</select>' );
}
 
function trim( string ) {
 return string.replace ( /(^\s+)|(\s+$)/g, "" );
}
 
function check ( number, radix ) {
 var r = true;
 var l = number.length;
  for ( var i = l - 1; i > -1; i-- ) {
    var c = number.substring ( i, i + 1 );
    var p = posix.indexOf( c );
      if ( p > -1 ) {
        if ( p >= radix ) { 
            r = false; 
            break; 
        }
      } else { 
        r = false; 
        break; 
    }
 }
 return r;
}
 
function fromdec ( ns, radix ) {
 var s = '';
 var n = parseInt( ns ), k;
    do {
      k = n % radix;
      s = posix.substring( k, k + 1 ) + s;
      n = Math.floor( ( n - k ) / radix );
      } while ( n != 0 );
 return s;
}
 
function todec ( n, radix ) {
  var l = n.length, r = 0, st = 1;
    for ( var i = l - 1; i > -1; i-- ) {
      var c = n.substring ( i, i + 1 );
      var p = posix.indexOf( c );
        r += p * st;
        st *= radix;
      }
 return ''+r;
}
 
function go () {
 var n = trim( document.f1.number.value.toUpperCase() );
 var r1 = parseInt ( document.f1.r1.value );
 var r2 = parseInt ( document.f1.r2.value );
 var sign = n.substring ( 0, 1 );
    document.getElementById( 'result' ).innerHTML = '';
      if ( n == '' ) {
        document.getElementById( 'result' ).innerHTML = 'Не введено число';
  return;
 } if ( sign == '-' || sign == '+' ) {
    document.getElementById( 'result' ).innerHTML = sign;
    n = n.substring ( 1 );
 } if ( !check ( n, r1 ) ) {
    document.getElementById( 'result' ).innerHTML += n + ': число неверно записано в системе с основанием ' + r1;
  return;
 }
 
 var s = '';
    if ( r1 == r2 ) {
      document.getElementById( 'result' ).innerHTML += n;
  return;
 } else if ( r1 == 10 ) s = fromdec ( n, r2 );
      else if ( r2 == 10 ) s = todec ( n, r1 );
        else { 
          var s2 = todec ( n, r1 );
              s = fromdec ( s2, r2 );
        }
    document.getElementById( 'result' ).innerHTML += s;
}
