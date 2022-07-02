const conn = `rey-edi
rey-lon
edi-lon
edi-ale
ale-osl
ale-hel
osl-ham
hel-dre
ham-dre
lon-par
par-lis
par-bar
gen-rom
gen-bar
dre-wie
dre-war
wie-sof
wie-rom
sof-ist
gen-dre
edi-ham
war-hel
war-wie
lis-bar
gen-wie
lon-osl
ist-war
war-sof
par-gen
lon-ham
par-dre
gen-ham
rom-sof`.split(/\n/g).map(s => s.split('-'))

console.log(conn)