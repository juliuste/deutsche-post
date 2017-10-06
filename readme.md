# deutsche-post

[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/deutsche-post.svg)](https://greenkeeper.io/)

[German post office](https://www.deutschepost.de) postal code utilities.

[![npm version](https://img.shields.io/npm/v/deutsche-post.svg)](https://www.npmjs.com/package/deutsche-post)
[![Build Status](https://travis-ci.org/juliuste/deutsche-post.svg?branch=master)](https://travis-ci.org/juliuste/deutsche-post)
[![dependency status](https://img.shields.io/david/juliuste/deutsche-post.svg)](https://david-dm.org/juliuste/deutsche-post)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/deutsche-post.svg)](https://david-dm.org/juliuste/deutsche-post#info=devDependencies)
[![license](https://img.shields.io/github/license/juliuste/deutsche-post.svg?style=flat)](LICENSE)

## Installation

```bash
npm install --save deutsche-post
```

## Usage

```js
const post = require('deutsche-post')
```

- [`municipalities(postalCode)`](#municipalitiespostalcode) to get municipalities (and subsidiary districts) for a given postal code
- [`postalCodeShapes(postalCode)`](#postalcodeshapespostalcode) to get [GeoJSON](http://geojson.org) for a given postal code
- `postalCode(address)` to get the postal code associated with an address ***(not yet implemented)***

### `municipalities(postalCode)`

`postalCode` must be a valid german postal code `String` like `14050` or `04936`. Returns a `Promise`.

```js
post.municipalities('04936').then(…)
```
```js
[
	{
		'postal-code': '04936',
		municipality: 'Hillmersdorf',
		'municipality-addition': ''
	}
	{
		'postal-code': '04936',
		municipality: 'Naundorf',
		'municipality-addition': 'b Schlieben'
	},
	{
		'postal-code': '04936',
		municipality: 'Proßmarke',
		'municipality-addition': ''
	}
	// …
]
```
or
```js
post.municipalities('14057').then(…)
```
```js
[
	{
		'postal-code': '14057',
		municipality: 'Berlin',
		district: 'Charlottenburg'
	},
	{
		'postal-code': '14057',
		municipality: 'Berlin',
		district: 'Westend'
	}
]
```

### `postalCodeShapes(postalCode)`

`postalCode` must be a valid german postal code, as a number like `10969` or a [ECQL query string](http://docs.geoserver.org/latest/en/user/tutorials/cql/cql_tutorial.html#cql-tutorial) like `strToLowerCase(code) like '109%'`. Returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise).

```js
post.postalCodeShapes(10969)
.then(console.log, console.error)
```
```js
{
	type: 'FeatureCollection',
	totalFeatures: 1,
	features: [
		{
			type: 'Feature',
			id: 'plz_5_2015_q1.10969',
			geometry: {
				type: 'MultiPolygon',
				coordinates: [
					[
						[
							[
								1492252.1342981446,
								6892564.0134655805
							],
							// …
						]
					]
				]
			},
			geometry_name: 'geom',
			properties: {
				code: '10969',
				bbox: [
					1490093.6493716629,
					6890288.36667783,
					1493380.8026152975,
					6892734.658075832
				]
			}
		}
	],
	crs: {
		type: 'name',
		properties: {
			name: 'urn:ogc:def:crs:EPSG::3857'
		}
	},
	bbox: [
		1490093.6493716629,
		6890288.36667783,
		1493380.8026152975,
		6892734.658075832
	]
}
```

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/deutsche-post/issues).
