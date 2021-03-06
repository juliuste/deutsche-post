'use strict'

const got = require('got')
const boom = require('boom')

const validCode = /^\d{5}$/

const shapes = async (code) => {
	const query = validCode.test(code) ? `code='${code}'` : code

	const res = await got('https://chartesia-api.postdirekt.de/chartesia/xss/m8s43dt/proxy/wfs', {
		query: {
			service: 'wfs',
			version: '2.0.2',
			request: 'getFeature',
			typename: 'ct:plz_5_2015_q1', // todo
			cql_filter: query,
			outputFormat: 'application/json',
			// see also https://tools.ietf.org/html/rfc7946#section-4
			srsName: 'urn:ogc:def:crs:EPSG::4326', // todo
			format_options: 'callback:OpenLayers.Protocol.Script.registry.c1'
		},
		json: true
	})

	if (res.statusCode < 200 || res.statusCode >= 400) {
		throw boom.create(res.statusCode, res.statusMessage)
	}
	return res.body
}

module.exports = shapes
