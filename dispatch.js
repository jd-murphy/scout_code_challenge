const drone = require('./drone.js')
const delivery = require('./delivery.js')

module.exports = class Dispatch {
    
    constructor() {
        this.drones = []
        this.deliveries = []
    }

    resetDrones() {
        this.drones = []
    }

    resetDeliveries() {
        this.deliveries = []
    }

    reset() {
        this.resetDrones()
        this.resetDeliveries()
    }

    getDrones() {
        return this.drones
    }

    getDeliveries() {
        return this.deliveries
    }

    droneComapre(a, b) {
        if (a.getAvailableWeightCapacity() > b.getAvailableWeightCapacity()) {
            return -1
        } else {
            return 1
        }
    }

    deliveryComapre(a, b) {
        if (a.getWeight() > b.getWeight()) {
            return -1
        } else {
            return 1
        }
    }

    sortDronesDesc() {
        this.drones.sort(this.droneComapre)
    }

    sortDeliveriesDesc() {
        this.deliveries.sort(this.deliveryComapre)
    }

    addDrone(drone) {
        this.drones.push(drone)
        this.sortDronesDesc()
    }

    addDelivery(delivery) {
        this.deliveries.push(delivery)
        this.sortDeliveriesDesc()
    }

    getNextHeaviestDelivery() {
        if (this.deliveries.length > 0) {
            this.sortDeliveriesDesc()
            return this.deliveries.shift()
        } else {
            return null
        }
    }

    peekNextHeaviestDelivery() {
        if (this.deliveries.length > 0) {
            this.sortDeliveriesDesc()
            return this.deliveries[0]
        } else {
            return null
        }
    }

    peekLightestDelivery() {
        if (this.deliveries.length > 0) {
            this.sortDeliveriesDesc()
            return this.deliveries[this.deliveries.length - 1].getWeight()
        } else {
            return null
        }
    }

    getDeliveryByWeight(weight) {
        let l = deliveries.find(p => p.getWeight() === weight)
        if (l === undefined) {
            return null
        } else {
            return this.deliveries.splice(l, 1)
        }
    }

    getDeliveryCount() {
        return this.deliveries.length
    }


    getHighestCapcityDrone() {
        if (this.drones.length > 0) {
            this.sortDronesDesc()
            return this.drones[0]
        } else {
            return null
        }
    }

    getDroneWithFewestTrips() {
        let lowestDrone = this.drones[0]
        for (const drone in this.getDrones()) {
            if (this.drones[drone].getNumTrips() < lowestDrone.getNumTrips()) {
                lowestDrone = this.drones[drone]
            }
        }
        return lowestDrone
    }

    getDroneByAvailableCapcity(weight) {
        let l = drones.find(p => p.getAvailableWeightCapacity() === weight)
        if (l === undefined) {
            return null
        } else {
            return this.drones[l]
        }
    }

    getTotalTripCount() {
        let totalTripCount = 0
        this.drones.forEach (function(d) {
            totalTripCount += d.getNumTrips()
        })
        return totalTripCount
    }

}