const Dispatch = require('./dispatch.js')
const Delivery = require('./delivery.js')

module.exports = class Drone {

    constructor(name, weightCapacity) {
        this.name = name
        this.weightCapacity = weightCapacity
        this.deliveries = []
        this.trips = 0
        this.log = `${this.name}`
    }

    getName() {
        return this.name
    }

    resetCargo() {
        this.deliveries = []
    }

    resetTrips() {
        this.trips = 0
    }

    reset() {
        this.resetCargo()
        this.resetTrips()
    }

    getDeliveries() {
        return this.deliveries
    }

    logTrip() {
        if (this.deliveries.length > 0) {
            let logData = ''
            this.log += `\n\nTrip #${this.trips}\n`
            this.deliveries.forEach(function (del) {
                logData += `${del.getDelivery()}, `
            })
            this.log += logData
        }
    }

    getTripLog() {
        return this.log
    }

    deliverCargo() {
        this.trips++
        this.logTrip()
        this.resetCargo()
    }

    getNumTrips() {
        return this.trips
    }

    getUnloadedWeightCapacity() {
        return this.weightCapacity
    }

    getAvailableWeightCapacity() {
        var totalWeight = 0
        for (const l in this.deliveries) {
            totalWeight += this.deliveries[l].getWeight()
        }
        return this.weightCapacity - totalWeight
    }

    loadDelivery(delivery, smallestDelivery) {
        if (delivery.getWeight() <= this.getAvailableWeightCapacity()) {
            this.deliveries.push(delivery)
        } 
        if (this.getAvailableWeightCapacity() === 0 || this.getAvailableWeightCapacity() < smallestDelivery) {
            this.deliverCargo()
        }
    }

}