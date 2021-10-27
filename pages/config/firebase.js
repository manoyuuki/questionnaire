import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBzsFf8HhsiTtj7jgxsVncsYsYzXE2ytCE",
    authDomain: "questionnaire-be0d4.firebaseapp.com",
    projectId: "questionnaire-be0d4",
    storageBucket: "questionnaire-be0d4.appspot.com",
    messagingSenderId: "1060809237953",
    appId: "1:1060809237953:web:4d05f69f089bdf7ba2fb40",
    measurementId: "G-P83N29GRTS"
}

firebase.initializeApp(firebaseConfig)

export default firebase;