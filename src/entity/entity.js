/**
 * Base class for all entities of the application.
 * Entities are usefull to structure and format data.
 */
class Entity {
    /**
     * Initializes a new instance with the given properties.
     * Then assign to those properties the given values.
     * @param {object} properties 
     * @param {object} values 
     */
    constructor(properties, values) {
        // Initialize entity properties
        for (const property in properties) {
            this[property] = properties[property]
        }
        // Set values to entity properties
        this.fill(values)
    }
    /**
     * Assigns values to the entity properties
     * @param {object} values 
     */
    fill(values) {
        if (!values) values = {}
        // Assign values to properties
        for (const property in this) {            
            if (values[property] !== undefined) {
                this[property] = values[property]
            }
        }
    }
}

module.exports = Entity