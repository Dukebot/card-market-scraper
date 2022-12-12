const Entity = require('../entity')
const Article = require('./article')

class Card extends Entity {
    constructor(values) {
        super({
            url: '',
            collection: '',
            name: '',
            edition: '',
            articles: []
        }, values)

        this.articles = this.articles.map(article => new Article(article))
    }
}

module.exports = Card