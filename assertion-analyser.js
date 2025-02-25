function objParser(str, init) {
  // finds objects, arrays, strings, and function arguments
  // between parens, because they may contain commas
  const openSym = ['[', '{', '"', "'", '('];
  const closeSym = [']', '}', '"', "'", ')'];
  let type;
  let i;
  for(i = (init || 0); i < str.length; i++ ) {
    type = openSym.indexOf(str[i]);
    if( type !== -1)  break;
  }
  if (type === -1) return null;
  const open = openSym[type];
  const close = closeSym[type];
  let count = 1;
  let k;
  for(k = i+1; k < str.length; k++) {
    if(open === str[k]) count++;
    else if(close === str[k]) count--;
    if(count === 0) break;
  }
  if(count !== 0) return null;
  const obj = str.slice(i, k+1);
  return {
    start : i,
    end: k,
    obj: obj
  };
}

function replacer(str) {
  // replace objects with a symbol ( __#n)
  let obj;
  let cnt = 0;
  const data = [];
  while(obj = objParser(str)) {
    data[cnt] = obj.obj;
    str = str.substring(0, obj.start) + '__#' + cnt++ + str.substring(obj.end+1)
  }
  return {
    str : str,
    dictionary : data
  }
}

function splitter(str) {
  // split on commas, then restore the objects
  const strObj = replacer(str);
  const args = strObj.str.split(',');
  args.forEach(function(a,i) {
    const m = a.match(/__#(\d+)/);
    while (m) {
      args[i] = args[i].replace(/__#(\d+)/,strObj.dictionary[m[1]]);
      m = args[i].match(/__#(\d+)/);
    }
  });
  return args;
}

function assertionAnalyser(body) {
  // already filtered in the test runner
  // // remove comments
  // body = body.replace(/\/\/.*\r?\n|\/\*.*\*\//g, '');
  // // get test function body
  // body = body.match(/\{([^\}]*)\}/)[1];
  
  if(!body) return "invalid assertion";
  // replace assertions bodies, so that they cannot
  // contain the word 'assertion'
  const cleanedBody = body.match(/(?:browser\s*\.)?assert\s*\.\s*(\w+)\s*\((.*?)\s*\)/g);
  if(cleanedBody && Array.isArray(cleanedBody)) {
    body = cleanedBody.map(function(m){
      const params = splitter(m.match(/\s*\.\s*(\w+)\s*\((.*?)\s*\)/)[2]);
      const fct = m.match(/\s*\.\s*(\w+)\s*\(/)[1];
      return `assert.${fct}(${params.join(", ")})`;
    }).join(', ');
  }
  
  return body;
}

module.exports = assertionAnalyser;