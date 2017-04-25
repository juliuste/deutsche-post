'use strict'

const tape = require('tape')
const {hint} = require('geojsonhint/lib/object')

const post = require('.')

tape('deutsche-post.municipalities', (t) => {
	post.municipalities('14057').then((m) => {
		t.plan(4)
		t.ok(m.length>0, 'municipalities count')
		t.ok(m[0].municipality==='Berlin', 'municipality municipality')
		t.ok(m[0].district==='Charlottenburg', 'municipality discrict')
		t.ok(m[0]['postal-code']==='14057', 'municipality postal-code')
	}, t.ifError)
})

tape('deutsche-post.postalCodeShape', (t) => {
	post.postalCodeShapes(13353).then((data) => {
		// todo: https://github.com/mapbox/geojsonhint/issues/63
		// const errors = hint(data).filter((e) => e.level !== 'message')
		// for (let error of errors) t.fail(error.message)

		t.equal(data.type, 'FeatureCollection')

		t.end()
	}, t.ifError)
})
