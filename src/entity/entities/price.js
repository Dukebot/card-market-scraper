const Entity = require('../entity')

class Price extends Entity {
    constructor(values) {
        values = Price.format(values)
        super({
            value: 0,
            currency: '',
        }, values)
    }

    static format(price) {
        if (typeof price === 'string') {
            if (price.includes(' ')) {
                const priceSplit = price.split(' ')

                let value = priceSplit[0]
                if (value.includes('.')) value = value.split('.').join('')
                if (value.includes(',')) value = value.replace(',', '.')

                price = {
                    value: +value,
                    currency: priceSplit[1]
                }
            }
        }

        return price
    }
}

module.exports = Price