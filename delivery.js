const Dispatch = require('./dispatch.js')
const Drone = require('./drone.js')

module.exports = class Delivery {
    
    constructor(delivery, weight) {
        this.delivery = delivery
        this.weight = weight    
    }

    getWeight() {
        return this.weight
    }

    getDelivery() {
        return this.delivery
    }

}