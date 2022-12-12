const Entity = require('../entity')
const Price = require('./price')

class Article extends Entity {
    constructor(values) {
        super({
            day: '',
            seller: '',
            price: {
                value: 0,
                currency: ''
            },
            stock: 0,
            location: '',
            language: '',
            status: '',
            signed: false,
            altered: false,
            playset: false,
            foil: false,
        }, values)

        this.price = new Price(this.price)
        this.stock = +this.stock
    }

    static getData(articles) {
        let averagePrice = 0
        let minPrice = 0
        let maxPrice = 0

        let averageStock = 0
        let stock = 0

        for (const article of articles) {
            let articlePrice = article.price.value
            if (article.playset) articlePrice /= 4

            averagePrice += articlePrice
            if (!minPrice || articlePrice < minPrice) minPrice = articlePrice
            if (!maxPrice || articlePrice > maxPrice) maxPrice = articlePrice

            averageStock += article.stock
            stock += article.stock
        }

        averagePrice /= articles.length
        averageStock /= articles.length
        
        return { averagePrice, minPrice, maxPrice, averageStock, stock }
    }
}

module.exports = Article