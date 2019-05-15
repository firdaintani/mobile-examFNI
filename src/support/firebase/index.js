import Firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDUWRy0VNd3uQOMRfRk-Qe4iiVdRyYdcOg",
    authDomain: "managerapp-47bc6.firebaseapp.com",
    databaseURL: "https://managerapp-47bc6.firebaseio.com",
    projectId: "managerapp-47bc6",
    storageBucket: "managerapp-47bc6.appspot.com",
    messagingSenderId: "674496351181",
    appId: "1:674496351181:web:31c237292ba753a5"
  };

  export const Fire = Firebase.initializeApp(firebaseConfig)