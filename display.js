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
  		var jsonObj = request.response;
  		
  		//sort works with most recent first
  		works = jsonObj['works'].sort(function(a, b) {
    		return b.year.end - a.year.end;
		});

		console.log(works);
  		showAll();
  	}
  	
}

function showAll(){
	toggleButtons(document.getElementById("all"));

	//display all works
	for(var i = 0; i < works.length; i++){
		makePreviewDivs(works[i]);
	}
}

function showMedium(){
	toggleButtons(this);

	clearDivs();

	if(this.id == "all"){
		showAll();
	}
	else{	//display relevant works based on medium
		for(var i = 0; i < works.length; i++){
			if (works[i]['mediums'].includes(this.id)){
				makePreviewDivs(works[i]);
			}
		}
	}

}

function makePreviewDivs(work){
	// get wrapper div
	var wrapper = document.getElementById("wrapper");

	// create content div for work
	var work_div = document.createElement("div");
	work_div.classList.add("content");


	// create title text
	var work_title = document.createElement("span");
	if(work["year"]["start"] == work["year"]["end"]){
		work_title.innerText = work["name"] + " (" + work["year"]["start"] + ")";
	}
	else{
		work_title.innerText = work["name"] + " (" + work["year"]["start"] + "-" + work["year"]["end"] + ")";
	}
	work_title.classList.add("name");
	work_div.appendChild(work_title);

		// create first image
	if(work['photos'] != null){
		var work_image = document.createElement("img");
		work_image.src = 'portfolio_images/' + work['photos'][0];
		work_div.appendChild(work_image);
	}
	else{
		//embed video
	}

	// div to hold details
	var work_detail_div = document.createElement("div");

	// create description
	var work_description = document.createElement("p");
	if(work["description"]["concept"] != null){
		work_description.innerText = work["description"]["medium"] + "\n" + work["description"]["concept"];
	}
	else{
		work_description.innerText = work["description"]["medium"];
	}
	work_detail_div.appendChild(work_description);

	// create rest of photos
	if(work['photos'].length > 0){
		for(var i = 1; i < work['photos'].length; i++){
			var image = document.createElement("img");
			image.src = 'portfolio_images/' + work['photos'][i];
			work_detail_div.appendChild(image);
		}
	}

	// create links
	if(work['links']['video'] != null){
		//embed video
	}

	if(work['links']['blog'] != null){
		var blog_heading = document.createElement("p");
		blog_heading.innerText = "Documentation: \n"
		work_detail_div.appendChild(blog_heading);

		//list blog links
		for(var i = 0; i < work['links']['blog'].length; i++){
			var link = document.createElement("a");
			link.setAttribute('href', work['links']['blog'][i]);
			link.setAttribute('target', "_blank");

			fetch(work['links']['blog'][i]).then((response) => response.text()).then((html) => {
		      const doc = new DOMParser().parseFromString(html, "text/html");
		      const title = doc.querySelectorAll('title')[0];
		      link.innerText =  title.innerText;
    		});

    		blog_heading.appendChild(link);
		}
	}

	if(work['links']['demo'] != null){
		var demo_link = document.createElement("a");
		demo_link.setAttribute('href', work['links']['demo']);
		demo_link.setAttribute('target', "_blank");
		demo_link.innerText = "View Live";
		demo_link.classList.add("demo_link");

		work_detail_div.appendChild(demo_link);
	}

	//make detail hidden by default
	work_detail_div.style.display = "none";

	// add eventlistner to show work details if div is clicked 
	work_div.addEventListener("click", function(){
		showDetailDiv(work_detail_div);
	}, false);

	work_div.appendChild(work_detail_div);

	wrapper.appendChild(work_div);

}

// toggle details
function showDetailDiv(work_detail_div){
	if(work_detail_div.style.display == "block"){
		work_detail_div.style.display = "none";
	}
	else{
		work_detail_div.style.display = "block";
	}
}

function clearDivs(){
	//clear all divs
	var wrapper = document.getElementById("wrapper");
  	while (wrapper.firstChild) {
    	wrapper.removeChild(wrapper.firstChild);
  	}
}

function toggleButtons(medium_linkelem){
	//turn this button red w white text
	medium_linkelem.parentNode.classList.add("navi-medium-selected");

	//turn all others back to default white
	var mediums = document.getElementsByClassName("medium");
	for(var i = 0; i < mediums.length; i++){
		if(mediums[i].id != medium_linkelem.id){
			mediums[i].parentNode.classList.remove("navi-medium-selected");
		}
	}
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
