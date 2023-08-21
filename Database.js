import { getAuth, signInWithEmailAndPassword ,createUserWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCDaINeIHpJuwjDf_5-XzS2I5HLqdwhA7I",
    authDomain: "dataform-c887b.firebaseapp.com",
    databaseURL: "https://dataform-c887b-default-rtdb.firebaseio.com",
    projectId: "dataform-c887b",
    storageBucket: "dataform-c887b.appspot.com",
    messagingSenderId: "654164159720",
    appId: "1:654164159720:web:ed648eff1fcbc13d8fad5d",
    measurementId: "G-2ZQM91L04T"
  };

// initialize firebase
firebase.initializeApp(firebaseConfig);
import { getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

var DataformDB = firebase.database().ref("Register_Data");

document.getElementById("Register_Data").addEventListener("submit", submitForm);
document.getElementById("login_Data").addEventListener("submit", loginForm);

function submitForm(e){
  e.preventDefault();
  
  var fname = getElementVal("fname");
  var lname = getElementVal("lname");
  var email = getElementVal("email");
  var password = getElementVal("password");

  saveMessages(fname,lname,email,password);
  alert("Message Saved Successfully.");

  document.getElementById("Register_Data").reset();
}

function loginForm(e){
  e.preventDefault();
  const auth = getAuth(app);

  var email = getElementVal("email");
  var password = getElementVal("password");
  console.log("kuch bhi");

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      var user = userCredential.user;
      console.log("User logged in:", user.uid);
    })
    .catch(function(error) {
      console.error("Login error:", error);
      console.log("Error code:", error.code);
      console.log("Error message:", error.message);
    });
};

const saveMessages = (fname,lname,email,password) => {
  var newDataform = DataformDB.push();

  newDataform.set({
    fname: fname,
    lname:lname,
    email: email,
    password: password
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};



const issuesRef = firebase.database().ref('Register_Data');
function readIssues() {
  issuesRef.on("value", function(snapshot) {
    snapshot.forEach(snap => {
      const issue = snap.val();

      document.getElementById("issuesList").innerHTML += `
        <div class="card mb-3" id="${issue.id}" style="width: 25rem">
          <div class="card-body">
            <h3 class="card-title">${issue.desc}</h3>
            <h6>Issue ID: ${issue.id}</h6>
            <p><span class="label label-info">Status: ${issue.status}</span></p>
            <p><span class="glyphicon glyphicon-time">Priority Level: ${issue.priority}</span></p>
            <p><span class="glyphicon glyphicon-user">Assigned to: ${issue.assignedTo}</span></p>
            <button onclick="setStatusClosed('${issue.id}')" id="closeButton" class="btn btn-warning mx-3">Close</button>
            <button onclick="deleteIssue('${issue.id}')" class="btn btn-danger mx-3">Delete</button>
          </div>
        </div>
      `
    })
  }
)}