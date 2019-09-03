//setup
var works;

function setUp(){
	var mediums = document.getElementsByClassName("medium");

	for(var i = 0; i < mediums.length; i++){
		mediums[i].addEventListener("click", showMedium ,false);
	}

		// call to load json file with card info
    var requesturl = 'https://raw.githubusercontent.com/jirrian/jirrian.github.io/master/works.json';
    var request = new XMLHttpRequest();
    request.open('GET', requesturl);
    request.responseType = 'json';
	request.send();

	request.onload = function() {
  		works = request.response;
  		//console.log(works);
  	}
}

function showMedium(){
	//turn this button red
	this.parentNode.style.backgroundColor = "red";
	//this.style.color = "white";
	//this.classList.add("medium-selected");

	//turn all others back to default white
	var mediums = document.getElementsByClassName("medium");
	for(var i = 0; i < mediums.length; i++){
		if(mediums[i].id != this.id){
			mediums[i].parentNode.style.backgroundColor = "white";
			//mediums[i].style.color = "black";
			//this.classList.remove("medium-selected");
		}
	}
	//console.log(works);
	//clear all divs
	var wrapper = document.getElementById("wrapper");
  	while (wrapper.firstChild) {
    	wrapper.removeChild(wrapper.firstChild);
  	}

	//display relevant works based on medium
	for(var i = 0; i < works['works'].length; i++){
		if (works['works'][i]['mediums'].includes(this.id)){
			console.log(works['works'][i]);
			makeDivs(works['works'][i]);
		}
	}

}

function makeDivs(work){
	var work_div = document.createElement("div");
	work_div.classList.add("content");
	
	//work_div.appendChild

	var wrapper = document.getElementById("wrapper");
	wrapper.appendChild(work_div);

	//add content div for each work displayed

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