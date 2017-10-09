// ***OBJECT DESTRUCTURING***

// const person = {
//     name: 'Phil',
//     age: 37,
//     location: {
//         city: 'Chicago',
//         temp: 70
//     }
// }

// // This is destructuring
// const { name: firstName = 'Unknown', age } = person

// // Old way (prior to destructuring)
// // const name = person.name
// // const age = person.age

// console.log(`${firstName} is ${age}`)

// // More destructuring
// const { city, temp: temperature } = person.location

// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}`)
// }


// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const { name: publisherName = 'Self-Published' } = book.publisher

// console.log(publisherName)


// ***ARRAY DESTRUCTURING***
// const address = [
//     '1299 S Main Street',
//     'Detroit',
//     'MI',
//     '12345'
// ]
// const [address, city, state = 'WI'] = address
// console.log(`You are in ${city} ${state}. ok!!`) 

//CHALLENGE
const item = [
    'Coffee (cold)', '$2.00', '$3.50', '$2.75'
]
const [itemName, , mediumPrice] = item
console.log(`A medium ${itemName} costs ${mediumPrice}`)