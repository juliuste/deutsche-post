'use strict'

const request = require('got')
const omit = require('lodash.omit')
const renameKey = require('rename-key')
const isNumeric = require('isnumeric')

const {assertValidPostalCode} = require('./util')

const parseResult = (result) =>
	renameKey(
		renameKey(
			renameKey(
				renameKey(
					omit(result, ['map', 'streetlink', 'districtlink']),
					'plz',
					'postal-code'
				),
				'districtaddition',
				'district-addition'
			),
			'cityaddition',
			'municipality-addition'
		),
		'city',
		'municipality'
	)

const parseResultList = (resultList) => {
	if(resultList.count<=0 || !resultList.success) return []
	return resultList.rows.map(parseResult)
}

const municipalities = (postalCode) => {
	assertValidPostalCode(postalCode)

	return request.post('https://www.postdirekt.de/plzserver/PlzAjaxServlet', {
		json: true,
		body: {
			finda: 'city', // sic!
			city: postalCode
		}
	})
	.then((res) => res.body)
	.then(parseResultList)
}

module.exports = municipalities
