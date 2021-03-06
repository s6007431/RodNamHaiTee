// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEQ84AUvAdWqS7e7ObQB1JFwf7HKYxw_o",
  authDomain: "rodnamhaitee.firebaseapp.com",
  projectId: "rodnamhaitee",
  storageBucket: "rodnamhaitee.appspot.com",
  messagingSenderId: "134258716580",
  appId: "1:134258716580:web:d997c805d52874f95e1b31",
  measurementId: "G-6BMLETB2N0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    query,
    where,
    getDoc,
    updateDoc, arrayUnion, arrayRemove,deleteField,setDoc,increment  
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const db = getFirestore();
const data_ref = collection(db, "Naotest9");
const water_ref = collection(db, "Water");

//getdata section

// function getStartOfToday() {
//     const now = new Date();
//     now.setHours(5, 0, 0, 0); // +5 hours for Eastern Time
//     const timestamp = db.Timestamp.fromDate(now);
//     return timestamp ;// ex. 1631246400
// }

async function getAllData_FB(_data_ref){
    // var dateTime = getStartOfToday();
    // var dateTime = 0;
    // var s =  query(data_ref, where("temperature", ">=", dateTime));
    const querySnapshot = await getDocs(_data_ref);
    var ret = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log("print  ",doc.id, " => ", doc.data());
        ret.push(doc.data());
    });
    // var s = questions_ref.where('subject', '==', subjname).get()
    return ret;
}
async function getAllData(id = "Naotest8", date = "2022-5-26"){
    // var dateTime = getStartOfToday();
    // var dateTime = 0;
    // var s =  query(data_ref, where("temperature", ">=", dateTime));
    var tmp = await $.getJSON(`https://iz1mjkeoql.execute-api.us-west-1.amazonaws.com/stage/getData?id=${id}&from=${date}`);
    // tmp = tmp.result;
    var ret = [];
    for(var i = 0;i< tmp.result.length;i++){
        var d = tmp.result[i].data;
        // deviceID, Humidity, SoilHumidity, Temperature, light, relayRunning
        
        ret.push({
            id:d[0],
            humidity:parseFloat(d[1]),
            soilHumidity: (4500 - parseFloat(d[2]))/4000*100,
            temperature:parseFloat(d[3]),
            light:parseFloat(d[4]),
            watering:d[5],
            time:tmp.result[i].createTime,

        });
        
        
    }
    // const querySnapshot = await getDocs(_data_ref);
    // var ret = [];
    // querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     //console.log("print  ",doc.id, " => ", doc.data());
    //     ret.push(doc.data());
    // });
    // var s = questions_ref.where('subject', '==', subjname).get()
    return ret;
}
// await getAllData();

async function getAllWaterDataByDate(data){
    // var ret = [];
    //var data = await getAllData(id,date);
    // var start = moment().subtract(days+1, 'days');
    // var stop = moment().add(1, 'days');
    // for(var i =0;i<data.length;i++){
    //     var t = moment(data[i].time.seconds*1000);
    //     if(t.isBefore(stop) && t.isAfter(start)){
    //         ret.push(data[i]);
    //     }
    // }
    var ret = [];
    for(var i = 0;i< data.length;i++){
        var d = data[i];
        if(d.watering>0){
            ret.push(d);
        }
    }
    return ret;
}

async function getAllWaterDataByDate_FB(days=1){
    var ret = [];
    var data = await getAllData(water_ref);
    var start = moment().subtract(days+1, 'days');
    var stop = moment().add(1, 'days');
    for(var i =0;i<data.length;i++){
        var t = moment(data[i].time.seconds*1000);
        if(t.isBefore(stop) && t.isAfter(start)){
            ret.push(data[i]);
        }
    }
    return ret;
}

async function getAllDataByDate_FB(days=1){
    var ret = [];
    var data = await getAllData(data_ref);
    var start = moment().subtract(days+1, 'days');
    var stop = moment().add(1, 'days');
    for(var i =0;i<data.length;i++){
        var t = moment(data[i].time.seconds*1000);
        if(t.isBefore(stop) && t.isAfter(start)){
            ret.push(data[i]);
        }
    }
    return ret;
}

// async function getTemperature(){
//     var s =  query(data_ref, where("subject", "==", subjname));
//     const querySnapshot = await getDocs(s);
//     var ret = {};
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log("getallquestion",doc.id, " => ", doc.data());
//         ret[doc.id] = doc.data();
//     });
//     // var s = questions_ref.where('subject', '==', subjname).get()
//     return ret;
    
// }

// async function getHumidity(){
//     const docRef = doc(db, "NaoTest5", id);
    
// }

// async function getSoilHumidity(){
//     const docRef = doc(db, "NaoTest5", id);
    
// }
// async function getLight(){
//     const docRef = doc(db, "NaoTest5", id);
    
// }

window.getAllData = getAllData;
// window.getTemperature = getTemperature;
// window.getHumidity = getHumidity;
// window.getSoilHumidity = getSoilHumidity;
// window.getLight = getLight;
// window.getAllDataByDate = getAllDataByDate;
window.getAllWaterDataByDate = getAllWaterDataByDate;
