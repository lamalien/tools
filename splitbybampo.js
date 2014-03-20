/*
	Split volume-xml into bampo xml
	yapcheahshen@gmail.com 2013/8/20

	create a subfolder name xml
	copy 001~010.xml to that folder
	node splitbybampo
	generated file will be in xml
	modify jiankangyur.lst for more files.
*/
var fs=require('fs');
var list=fs.readFileSync('jiankangyur.lst','utf8').replace(/\r\n/g,'\n').split('\n');
var lastbampo='';
var bampotext='';
var volno='';
var savebampo=function() {
	//console.log(lastbampo)
	var no=lastbampo.match(/(\d+)\.(\d+)/);
	var sutrano='000'+no[1]; sutrano=sutrano.substring(sutrano.length-4);
	var bampono='00'+no[2]; bampono=bampono.substring(bampono.length-3);
	
	volno='000'+volno;volno=volno.substring(volno.length-3);
	var fn='lj'+sutrano+'_'+bampono+'.xml';
	console.log('saving '+fn)
	bampotext.unshift('<xml src="'+fn+'">');
	bampotext.push('</xml>');
	if (!fs.existsSync('xml/'+volno)) fs.mkdirSync('xml/'+volno);
	var newfilename='xml/'+volno+'/'+fn;
	if (fs.existsSync(newfilename)) {
		throw 'file exists '+newfilename;
	} else {
		fs.writeFileSync(newfilename, bampotext.join('\r\n'),'utf8');	
	}
	
	bampotext=[];
}
var bampotext=[]
var splitfile=function(fn) {
	var arr=fs.readFileSync('xml/'+fn,'ucs2').replace(/\r\n/g,'\n').split('\n');
	for (var i in arr) {
		var b=arr[i].indexOf('<bampo ');
		if (b>-1) {
			if (lastbampo) 	savebampo();
			lastbampo=arr[i].match(/<bampo n="(.*?)"/)[1];
		}
		volno=parseInt(fn,10);	
		bampotext.push(arr[i]);
	}
	//if (lastbampo) savebampo();
}
xml=process.argv[2];
if (xml) {
  splitfile(xml);
} else {
	for (var i in list) splitfile(list[i]);
}
if (lastbampo) savebampo();
