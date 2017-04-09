'use strict'

const request = require('got')
const omit = require('lodash.omit')
const renameKey = require('rename-key')
const isNumeric = require('isnumeric')

const checkPostalCode = (postalCode) => {
	if(typeof postalCode!=='string' || postalCode.length!==5 || !isNumeric(postalCode)) throw new Error(`Invalid postal code: ${postalCode}`)
	else return postalCode
}

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

const municipalities = (postalCode) => 
	request.post('https://www.postdirekt.de/plzserver/PlzAjaxServlet', {
		json: true,
		body: {
			finda: 'city', // sic!
			city: checkPostalCode(postalCode)
		}
	}).then((res) => res.body)
	.then(parseResultList)

module.exports = municipalities