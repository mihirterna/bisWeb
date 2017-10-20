var provider = new firebase.auth.GoogleAuthProvider();
var config = {
				apiKey: "AIzaSyDuo3-oBvvMdA2mwC59bb1xMTtz-0zcReE",
				authDomain: "bookinshort.firebaseapp.com",
				databaseURL: "https://bookinshort.firebaseio.com",
				projectId: "bookinshort",
				storageBucket: "bookinshort.appspot.com",
			};
			firebase.initializeApp(config);
function signIn(){
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){

		firebase.auth().signInWithPopup(provider).then(function(result) {

		if (result.credential) var token = result.credential.accessToken;

		var user = result.user;
		console.log(user.displayName);
		
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				console.log(user.displayName);
				loadData();
			}
			else console.log("log out");
		});
		}).catch(function(error) {
			console.log(error);
			//error.code error.message error.email error.credential
		});

		}).catch(function(error){
			console.log(error);
	});
}

function addBookLoad(){
	var user = firebase.auth().onAuthStateChanged(function(user){
	if(user){
		document.title =  "Welcome "+ user.displayName;
		alert("Welcome " + user.displayName);
	}
	else{
		console.log("No User");
	}
	})
	
}

function storeDataToFire(){
var lang = ((document.getElementById("lang")||{}).value)||"";
var genre = ((document.getElementById("genre")||{}).value)||"";
var name = ((document.getElementById("name")||{}).value)||"";
var author = ((document.getElementById("author")||{}).value)||"";
var describ = (( document.getElementById("describ")||{}).value)||"";
var tab1 = ((document.getElementById("tab1")||{}).value)||"";
var tab2 = ((document.getElementById("tab2")||{}).value)||"";
window.alert('Data Successfully Added');
var fdb = firebase.database().ref('Books');
fdb.child(lang).child(genre).child(name).set({
'Author':author,
'Content':{
'tab1':tab1,
'tab2':tab2
},
'Describ':describ,
'Name':name
}).catch(function(error){
			
			console.log(error);
	});
}


function signOut(){
	if(firebase.auth().currentUser){
		firebase.auth().signOut().then(function(){
			location.href = "index.html";
			alert("Logged out successfully!");
		}).catch(function(error){
			console.log(error.message);
		});
	}
}

function loadData(){
	var user = firebase.auth().currentUser;
	if(user) location.href = "addBook.html";
	else console.log("error");
}

function fun() {
    var x = document.getElementById("mnav");
    if (x.className === "topnav") x.className += " responsive";
    else x.className = "topnav";
}