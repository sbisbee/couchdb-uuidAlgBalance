var fs = require('fs');

var IDS_DIR = './ids';

function proc(file, mod) {
  console.log('processing ' + file);

  var ids = JSON.parse(fs.readFileSync(file)).uuids;

  var res = {};

  for(var i in ids) {
    /*
     * Yes, this could just be one line to calculate rem. But this is more
     * readable and it makes debugging easier: you can easily print out these
     * values for each _id you loop over.
     */
    var hex = ids[i].substr(28); //only use the last 4 chars
    var dec = parseInt(hex, 16); //hex to dec
    var rem = dec % mod; //find the remainder 

    if(res[rem] !== undefined) {
      res[rem]++;
    }
    else {
      res[rem] = 1;
    }
  }

  for(var i in res) {
    res[i] = (res[i] / ids.length * 100) + '%'
  }

  console.log(res);
  console.log();
}

var files = fs.readdirSync(IDS_DIR);

for(var i in files) {
  proc(IDS_DIR + '/' + files[i], process.argv[2]);
}
