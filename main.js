const Dispatch = require('./dispatch.js')
const Drone = require('./drone.js')
const Delivery = require('./delivery.js')

const fs = require('fs')

const inputFile = process.argv[2]

console.log(`Reading input from file: ${inputFile}`) 

let data = fs.readFileSync(inputFile, 'utf8').trim()
let lines = data.split('\n')

let d = new Dispatch()

let droneInputRawArray = lines[0].split(',')
for (let i = 0; i < droneInputRawArray.length - 1; i+=2) {
    d.addDrone(new Drone(droneInputRawArray[i].trim(), droneInputRawArray[i + 1].trim()))
}

for (let i = 1; i < lines.length; i++) {
    let deliveryInputRawArray = lines[i].split(',')
    if (deliveryInputRawArray.length > 0) {
        d.addDelivery(new Delivery(deliveryInputRawArray[0].trim(), parseInt(deliveryInputRawArray[1].trim())))
    }
}

while (d.deliveries.length != 0) {

    let hd = d.getHighestCapcityDrone()
    let fd = d.getDroneWithFewestTrips()
    let del = d.peekNextHeaviestDelivery()

    if (hd.getNumTrips() > fd.getNumTrips()) {
        hd = fd
    }

    if (hd.getAvailableWeightCapacity() < d.peekLightestDelivery()) {
        hd.deliverCargo()
    }

    if (hd.getAvailableWeightCapacity() >= del.getWeight()) {
        hd.loadDelivery(d.getNextHeaviestDelivery(), d.peekLightestDelivery())
        // let deliveriesLoaded = ' '
        // hd.getDeliveries().forEach(element => {
        //     deliveriesLoaded += `(${element.getDelivery()} ${element.getWeight()}) `
        // })
    } else {
        for (let i = 1; i < d.deliveries.length; i++) {
            if (hd.getAvailableWeightCapacity() >= d.deliveries[i].getWeight()) {
                del = d.deliveries.splice(i, 1)[0]
                hd.loadDelivery(del, d.peekLightestDelivery())
                // let deliveriesLoaded = ' '
                // hd.getDeliveries().forEach(element => {
                //     deliveriesLoaded += `(${element.getDelivery()} ${element.getWeight()}) `
                // })
            } else {
                i++
            }   

        }        
    }

    d.getDrones().forEach(drone => {
        if (drone.getAvailableWeightCapacity() < d.peekLightestDelivery()) {
            drone.deliverCargo()
        }
    })
    
}

d.getDrones().forEach(drone => {
    drone.deliverCargo()
})

console.log("Delivery Schedule:\n\n")
for (const drone in d.getDrones()) {
    console.log(`${d.drones[drone].getTripLog()}`)
    console.log(`\n\n`)
}

