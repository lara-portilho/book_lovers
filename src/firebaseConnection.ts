import firebase from 'firebase/app'
import 'firebase/firestore'

let firebaseConfig = {
	apiKey: 'AIzaSyAFuJK9Kd7DPa8MqtkeBVaswzbo2P8BVjQ',
	authDomain: 'book-lovers-5949b.firebaseapp.com',
	projectId: 'book-lovers-5949b',
	storageBucket: 'book-lovers-5949b.appspot.com',
	messagingSenderId: '653153608464',
	appId: '1:653153608464:web:f568666884cc7adf757b95',
	measurementId: 'G-3BG7RWPN0Y',
}

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

export default firebase
