/*
	combine per-bampo file into per-vol file
	run this under xml.ok folder

*/
var fs=require('fs');
var lst=fs.readFileSync('savevol.lst','utf8').replace(/\r\n/g,'\n').split(
'\n');

var output=[];
var savevol=function() {
	var newfilename=lastvol+'.ok.xml';
	fs.writeFileSync(newfilename,output.join('\r\n'),'utf8');
	console.log(newfilename)
	output=[];
}

var vol,lastvol='';
for (var i=0;i<lst.length;i++) {
	vol=lst[i].substring(0,3);
	if (i && lastvol!=vol) savevol();
	output=output.concat(fs.readFileSync(lst[i],'utf8').replace(/\r\n/g,'\n').split('\n'));
	lastvol=vol;
}
savevol(lastvol)
