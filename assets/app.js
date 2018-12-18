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

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().timeStart);
    console.log(childSnapshot.val().frequency);


//calculations for times added here
//display calc'd items and db items to the html    

})




















































})