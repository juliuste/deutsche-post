'use strict'

const tape = require('tape')
const post = require('./index')

tape('deutsche-post.municipalities', (t) => {
	post.municipalities('14057').then((m) => {
		t.plan(4)
		t.ok(m.length>0, 'municipalities count')
		t.ok(m[0].municipality==='Berlin', 'municipality municipality')
		t.ok(m[0].district==='Charlottenburg', 'municipality discrict')
		t.ok(m[0]['postal-code']==='14057', 'municipality postal-code')
	})
})