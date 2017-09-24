 
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAD3ZSeSJ0t8H2GRA_VPNy6-BxpihXAeXQ",
    authDomain: "train-time-6799f.firebaseapp.com",
    databaseURL: "https://train-time-6799f.firebaseio.com",
    projectId: "train-time-6799f",
    storageBucket: "train-time-6799f.appspot.com",
    messagingSenderId: "744709922769"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

 

// Database Directory
var trainRef = database.ref("/Train-time");

// Create Variables
var name = null;
var destination = null;
var time = null;
var frequency = null;

// Listen for Button Click
$("#user-add-train").on("click", function() {
  event.preventDefault();
  var nameOfTrain = $("#user-input-name").val().trim();
  var Destination = $("#user-input-dest").val().trim();
  var Time = moment($("#user-input-first").val().trim(), "HH:mm").format();
  var Freq = parseInt($("#user-input-freq").val().trim());

  var newTrn = {
    name: nameOfTrain,
    destination: Destination,
    time: Time,
    frequency: Freq
  }

  // Save to Firebase
  database.ref("/Train-time").push(newTrn);

  // Make Input Boxes Blank After Firebase Push
  $("#user-input-name").val(null);
  $("#user-input-dest").val(null);
  $("#user-input-first").val(null);
  $("#user-input-freq").val(null);

});

// Add New Train to Firebase
database.ref("/Train").on("child_added", function( x, y) {

  // Store everything into a variable.
  var nameOfTrain = x.val().name;
  var Destination = x.val().destination;
  var Time = x.val().time;
  var Freq = x.val().frequency;
  var timeConvert = moment(Time, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(timeConvert), "minutes");
  var Remainder = diffTime % Freq;
  var minutesUntil = Freq - Remainder;
  var nextTrain = moment().add(minutesUntil, "minutes");

  // Add New Train to Table
  $("#sched-for-trains").append("<tr><td>" + nameOfTrain + "</td><td>" + Destination + "</td><td>" + Freq + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minutesUntil + "</td><td>" + "" + "</td></tr>");

});