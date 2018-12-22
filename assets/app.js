$(document).ready(function(){

//firebase config
var config = {
    apiKey: "AIzaSyD8B1Ucw6MwgoYpsEYkzBTa6rvWiMB_P9I",
    authDomain: "train-scheduler-9d77a.firebaseapp.com",
    databaseURL: "https://train-scheduler-9d77a.firebaseio.com",
    projectId: "train-scheduler-9d77a",
    storageBucket: "",
    messagingSenderId: "426150004799"
};
firebase.initializeApp(config);

//global variable setup
var database = firebase.database();

var trainName = "";
var newDestination = "";
var newFirstTrain = "";
var newFrequency = 0;

//when new train info is submitted, capture values entered and push to db
$("#submitBtn").on("click", function(event) {
    event.preventDefault();
    trainName = $("#trainName-input").val().trim();
    newDestination = $("#destination-input").val().trim();
    newFirstTrain = moment($("#firstTrain-input").val().trim(),"HH:mm").format("HH mm");
    newFrequency = $("#frequency-input").val().trim();

    console.log(trainName);
    console.log(newDestination);
    console.log(newFirstTrain);
    console.log(newFrequency);

    var newTrain = {
        train: trainName,
        destination: newDestination,
        timeStart: newFirstTrain,
        frequency: newFrequency
    };

    //push data to firebase
    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.timeStart);
    console.log(newTrain.frequency);

    $("#trainName-input").val("");
    $("#tdestination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");

    

});

//when data is updated in firebase:
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().timeStart);
    console.log(childSnapshot.val().frequency);


//calculations for times added here

    var tFrequency = childSnapshot.val().frequency;
    var firstTime = childSnapshot.val().timeStart;
    
    var firstTimeConverted = moment(firstTime, "HH.mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log(moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var minutesTilTrain = tFrequency = tRemainder;
    console.log(minutesTilTrain);

    var nextTrain = moment().add(minutesTilTrain, "minutes").format("HH:mm");
    console.log(nextTrain);

//display calc'd items and db items to the html  

    $(".table").append("<tr>" + "<th scope='row'>" + childSnapshot.val().train + "</th>" + "<td>" + childSnapshot.val().destination + "</td>" + "<td>" + childSnapshot.val().frequency + "</td>" + "<td>" + nextTrain + "</td>" + "<td>" + minutesTilTrain + "</td>" + "</tr>");

});







 












































})