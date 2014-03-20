# coding: utf_8_sig
import os, re, sys
IN = '..'
OUT = '../output'

hans = os.listdir(IN)
text = ''
for han in hans:
	if re.match(r'\d\d\d', han) is None:
		continue
	print(han)
	folder_in = os.path.join(IN, han)
	files = os.listdir(folder_in)
	text = ''
	for f in files:
		path = os.path.join(folder_in, f)
		fi = open(path, 'r', encoding='utf8')
		if text != '':
			text += '\n'
		text += fi.read()
		fi.close()
	
	path = os.path.join(OUT, han+'.xml')
	fo = open(path, 'w', encoding='utf8')
	fo.write('<root>\n')
	fo.write(text)
	fo.write('\n</root>')
	fo.close()
