import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDOqklptL32HGOPxM0R21CYeP83kiVgErE",
    authDomain: "testfirebaseproject1-14fb5.firebaseapp.com",
    databaseURL: "https://testfirebaseproject1-14fb5.firebaseio.com",
    projectId: "testfirebaseproject1-14fb5",
    storageBucket: "testfirebaseproject1-14fb5.appspot.com",
    messagingSenderId: "466855065954"
};

export const firebaseApp = firebase.initializeApp(config);
export const goalRef = firebase.database().ref('goals');
export const completeGoalRef = firebase.database().ref('completeGoals');