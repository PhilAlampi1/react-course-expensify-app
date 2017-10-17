import * as firebase from 'firebase'

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

const database = firebase.database()

export { firebase, database as default }



// DB TRIGGERS
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })




// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = []
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             })
//         })
//         console.log(expenses)
//     })
// k

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = []
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })
//     console.log(expenses)
// })

// database.ref('expenses').push({
//     description: 'good stuff',
//     note: 'heres a note',
//     amount: 100,
//     createdAt: 1234
// })


// database.ref('notes/-Kw6vwYayFN1UfgrOApk').remove()

// database.ref('notes').push({
//     title: 'Course Topics',
//     body: 'REact Native, Angular, Firebase'
// })

// const firebaseNotes = {
//     notes: {
//         abc123: {
//             title: 'first note',
//             body: 'Body for first note'
//         },
//         casd123: {
//             title: 'second note',
//             body: 'Body for second note'
//         }
//     }
// }

// const notes = [{
//     id: '12',
//     title: 'First Note',
//     body: 'This is a note'
// }, {
//     id: '123ab',
//     title: 'Second Note',
//     body: 'This is another note'
// }]

// database.ref('notes').set(notes)

// const dataSub = database.ref().on('value', (snapshot) => {
//     const item = snapshot.val()
//     console.log(`${item.name} is a ${item.job.title} at ${item.job.company}`)
// })

// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val())
// }, (e) => {
//     console.log('Error with data fetching: ', e)
// })

// setTimeout(() => {
//     database.ref('age').set(19)
// }, 3500)

// setTimeout(() => {
//     database.ref().off('value', onValueChange)
// }, 7000)

// setTimeout(() => {
//     database.ref('age').set(100)
// }, 10500)

// database.ref('location/city')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val()
//         console.log(val)
//     })
//     .catch((e) => {
//         console.log('Error fetching: ', e)
//     })


//   database.ref().set({
//       name: 'Phil Alampi',
//       age: 37, 
//       stressLevel: 6,
//       job: {
//           title: 'Software Developer',
//           company: 'Google'
//       },
//       location: {
//           city: 'Elgin',
//           state: 'IL',
//           country: 'United States' 
//       }
//   }).then(() => {
//       console.log('Data is saved')
//   }).catch((e) => { 
//       console.log('error: ', e)
//   })

//   database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
//   })

// database.ref()
// .remove()
// .then(() => {
//     console.log('Remove succeeded')
// }).catch((e) => {
//     console.log('ERROR!!!: ', e)
// })