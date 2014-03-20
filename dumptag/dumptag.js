var tags={"stitle":"ST",
					"ttitle":"TT",
					"bampo":"BM", 
					"lewu":"LW"
				};
var regex=/<(stitle|ttitle|bampo|lewu) n="(.*?)" [^>]*?>/g;
var lst='dumptag.lst';

var targetroot='xml.ok';
///////////////////////////////////////
mkdirp=require('./mkdirp'); //recursive folder creation mkdir -p
fs=require('fs');
path=require('path');
var arr=fs.readFileSync(lst,'utf8').replace(/\r\n/g,'\n').split('\n')
var oldtag=[],out="";
writeOutput=function(fn,out) {
	var targetfn=path.resolve(fn);
	var folders=path.resolve(process.cwd()).split(path.sep);
	var targetfolder=folders[folders.length-1];
	//replace xml to xml.ok
	targetfn=targetfn.replace(targetfolder,targetroot);
	var targetpath=path.resolve(targetfn,'..');
	mkdirp.sync(targetpath);
	if (targetfn==fn) {
		console.log("wrong path, cannot overwrite original file")
		return;
	}
	console.log(targetfn)
	fs.writeFileSync(targetfn,out,'utf8')
}
processfile=function(fn) {
	file=fs.readFileSync(fn.trim(),'utf8');
	out=file.replace( regex,function(m,m1,m2){
			oldtag.push(m);
			return "<"+tags[m1]+m2.replace(/\./g,'_')+"/>";
	})
	writeOutput(fn,out);
}
for (var i in arr) {
	processfile(arr[i]);
}
fs.writeFileSync('tags.txt',oldtag.join('\n'),'utf8')