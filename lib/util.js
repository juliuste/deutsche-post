'use strict'

const isNumeric = require('isnumeric')

const validPostalCode = /^\d{5}$/

const assertValidPostalCode = (code) => {
	if(!isNumeric(code) || !validPostalCode.test(code)) {
		throw new Error(`Invalid postal code: ${code}`)
	}
}

module.exports = {assertValidPostalCode}
