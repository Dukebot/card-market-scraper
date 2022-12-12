/**
 * Base class for all entities of the application.
 * Entities are usefull to structure and format data.
 */
class Entity {
    constructor(properties, values) {
        // Initialize entity properties
        for (const property in properties) {
            this[property] = properties[property]
        }

        this.fill(values)
    }

    fill(values) {
        if (!values) values = {}

        for (const property in this) {            
            if (values[property] !== undefined) {
                this[property] = values[property]
            }
        }
    }
}

module.exports = Entity