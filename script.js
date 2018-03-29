$(document).ready(function() {
  $('#number_id').val(22016);
  var cuvinte = faCeva(22016);
  $('#word_id').val(cuvinte);
  $("button").click(function() {
    var numar = $('#number_id').val();
    var cuvinte = faCeva(numar);
    $('#word_id').val(cuvinte);
  });
});

function faCeva(numar) {
  var cifre = ['', 'unu', 'doi', 'trei', 'patru', 'cinci', 'sase', 'sapte', 'opt', 'noua', 'zece'];

  var zeci = ['', '', 'douazeci', 'treizeci', 'patruzeci', 'cincizeci', 'saizeci', 'saptezeci', 'optzeci', 'nouazeci'];

  var sute = ['', 'o', 'doua', 'trei', 'patru', 'cinci', 'sase', 'sapte', 'opt', 'noua', 'zece'];

  var grade = ['', 'mii', 'milioane', 'miliarde'];

  var valori = [];
  valori[10] = 'zece';
  valori[11] = 'unsprezece';
  valori[12] = 'doisprezece';
  valori[13] = 'treisprezece';
  valori[14] = 'paisprezece';
  valori[15] = 'cincisprezece';
  valori[16] = 'saisprezece';
  valori[17] = 'saptesprezece';
  valori[18] = 'optsprezece';
  valori[19] = 'nouasprezece';

  var i = -1;
  if (0 == numar) {
    return 'zero';
  }
  if (0 < numar && numar < 11) {
    return cifre[numar];
  }
  if (valori[numar]) {
    return valori[numar];
  }

  var numar = intoarceNumar(numar);
  var nr = [];
  for (var i = 0; i < numar.length; i++) {
    var rest = i % 3;
    if (rest == 0) {
      nr[i / 3] = numar [i];
    }
    else if(rest == 1) {
      nr[Math.round((i - 1) / 3)] += numar [i];
    }
    else if(rest == 2) {
      nr[Math.round((i - 2) / 3)] += numar [i];
    }
  }
  var output = '';
  for (var i = nr.length -1; i >= 0; i--) {
    nr[i]=intoarceNumar(nr[i]);
    while(nr[i].length <= 2)
    {
       nr[i]='0' + nr[i];
    }

    var aregrad=false;
    if(nr[i][0] && nr[i][0] != '0')
    {
       output = output + ' ' + sute[nr[i][0]]
       if(nr[i][0]>1)
       {
          output +=' sute';
       }
       else if(nr[i][0]==1) {
          output +=' suta';
       }
       aregrad=true;
    }
    if(nr[i][1] && nr[i][1] == 1) {
       /* 11 <> 19 */
       var temp = nr[i][1] + nr[i][2];
       if(valori[temp])
       {
          output = output + ' ' + valori[temp];
          aregrad=true;
       }
    }
    else {
       if(nr[i][1] && nr[i][1]!='0')
       {
          output = output + ' ' + zeci[nr[i][1]];
          aregrad=true;
       }
       if(nr[i][2] && nr[i][2]!='0')
       {
          //console.log(nr[i], i);
          if(nr[i][1] && nr[i][1]!='0')
          {
             output += ' si';
          }
          if (nr[i][2] == '2' && i == 0) {
            output = output + ' doi';
          }
          else if (nr[i][2] == '1' && i == 0) {
            output = output + ' unu';
          }
          else if (nr[i] == '001' && i == 2) {
            output = output + ' un';
          }
          else {
            output = output + ' ' + sute[nr[i][2]];
          }
          aregrad=true;
       }
    }
    if(aregrad)
    {
      if (nr[i] == '001' && i == 1) {
        output = output + ' mie';
      }
      else if (nr[i] == '001' && i == 2) {
        output = output + ' milion';
      }
      else if (i == 1 && (nr[i][0] != 0 || nr[i][1] != [0])) {
        output = output + ' de ' + grade[i];
      }
      else {
        output = output + ' ' + grade[i];
      }
    }
  }
  return output;
}

function intoarceNumar(n) {
  n = n + "";
  return n.split("").reverse().join("");
}
