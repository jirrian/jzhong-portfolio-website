//setup
var works;

function setUp(){
	var mediums = document.getElementsByClassName("medium");

	for(var i = 0; i < mediums.length; i++){
		mediums[i].addEventListener("click", showMedium ,false);
	}

		// call to load json file with card info
    var requesturl = '';
    var request = new XMLHttpRequest();
    request.open('GET', requesturl);
    request.responseType = 'json';
	request.send();

	request.onload = function() {
  		works = request.response;
  		console.log(works);
  	}
}

function showMedium(){
	//turn this button red
	this.parentNode.style.backgroundColor = "red";
	this.style.color = "white";

	//turn all others back to default white
	var mediums = document.getElementsByClassName("medium");
	for(var i = 0; i < mediums.length; i++){
		if(mediums[i].id != this.id){
			mediums[i].parentNode.style.backgroundColor = "white";
			mediums[i].style.color = "black";
		}
	}

	//display relevant works based on medium

}

function showAbout(){
	document.getElementById("about").style.display = "block";
	document.getElementById("contact").style.display = "none";
	document.getElementById("press").style.display = "none";
}

function showContact(){
	document.getElementById("contact").style.display = "block";
	document.getElementById("about").style.display = "none";
	document.getElementById("press").style.display = "none";
}


function showPress(){
	document.getElementById("press").style.display = "block";
	document.getElementById("about").style.display = "none";
	document.getElementById("contact").style.display = "none";
}

function showWorks(button, medium){
	

	if (medium == "interactive"){
	}
	else if(medium == "media"){
	}
	else if(medium == "appareldesign"){
	}
	else if(medium == "web"){
	}
	else if(medium == "installation"){
	}
	else if(medium == "creativedirection"){

	}
}