import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { 
    getFirestore, 
    collection, 
    setDoc, 
    getDoc, 
    getDocs, 
    addDoc,
    updateDoc,
    arrayUnion,
    doc,
    query
} 
from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCJZ5MW_Q6aT4HkBHwAZRvzHf6c_1nLGGI",
    authDomain: "swecomp-b8ca0.firebaseapp.com",
    projectId: "swecomp-b8ca0",
    storageBucket: "swecomp-b8ca0.appspot.com",
    messagingSenderId: "158584169401",
    appId: "1:158584169401:web:171cba7ef37111afb58c68",
    measurementId: "G-RX5589JM91"
};

const firebaseapp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)
setPersistence(getAuth(), browserLocalPersistence)

export const getAllOffers = async (uid) => {
    try {
        let offerData = [] // eslint-disable-line no-console
        const offers = await getDocs(collection(db, uid))
        offers.forEach( offer => {
            offerData.push(offer.data())
        })

        return offerData
    } catch(e) {
        console.log("couldn't get offers due to: ", e)
    }
}

export const postOffer = async (offerInfo, uid) => {
    try {
        await addDoc(collection(db, uid), offerInfo)
    } catch(e) {
        console.log("couldn't post offer because: ", e)
    }
}