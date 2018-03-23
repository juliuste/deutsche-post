'use strict'

const request = require('got')
const omit = require('lodash.omit')
const renameKey = require('rename-key')
const isNumeric = require('isnumeric')
const encode = require('querystring').stringify

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

const municipalities = async (postalCode) => {
	assertValidPostalCode(postalCode)

	const res = await (request('https://www.postdirekt.de/plzserver/PlzAjaxServlet', {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: encode({
			finda: 'city', // sic!
			city: postalCode,
			lang: 'de_DE'
		})
	}).then(res => JSON.parse(res.body)))
	return parseResultList(res)
}

module.exports = municipalities
