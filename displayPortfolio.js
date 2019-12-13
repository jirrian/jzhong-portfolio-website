//setup
var works;

// setup for portfolio page
async function setUp(){
	var mediumButtons = document.getElementsByClassName("navi-medium");

	for(var i = 0; i < mediumButtons.length; i++){
		mediumButtons[i].addEventListener("click", showMedium ,false);
	}

	// get json file
	const response = await fetch('https://raw.githubusercontent.com/jirrian/jirrian.github.io/master/works.json');
	const jsonObj = await response.json();
	//sort works with most recent first
  	works = jsonObj['works'].sort(function(a, b){
    	return b.year.end - a.year.end;
	});

	console.log(works);
  	showAll();


 //    var requesturl = 'https://raw.githubusercontent.com/jirrian/jirrian.github.io/master/works.json';
 //    var request = new XMLHttpRequest();
 //    request.open('GET', requesturl);
 //    request.responseType = 'json';
	// request.send();

	// request.onload = function() {
 //  		works = request.response;
 //  		//console.log(works);
 //  		var jsonObj = request.response;
  		
 //  		//sort works with most recent first
 //  		works = jsonObj['works'].sort(function(a, b) {
 //    		return b.year.end - a.year.end;
	// 	});

	// 	console.log(works);
 //  		showAll();
 //  	}

  	
}

function lazyLoad(){
	// lazy load
	// https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video

	  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
	  console.log(lazyImages);

	  if ("IntersectionObserver" in window) {
	    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
	      entries.forEach(function(entry) {
	        if (entry.isIntersecting) {
	          let lazyImage = entry.target;
	          lazyImage.src = lazyImage.dataset.src;
	          //lazyImage.srcset = lazyImage.dataset.srcset;
	          lazyImage.classList.remove("lazy");
	          lazyImageObserver.unobserve(lazyImage);
	        }
	      });
	    });

	    lazyImages.forEach(function(lazyImage) {
	      lazyImageObserver.observe(lazyImage);
	    });
	  } else {
	    // Possibly fall back to a more compatible method here
	  }
}

function showAll(){
	toggleButtons(document.getElementById("all"));

	//display all works
	for(var i = 0; i < works.length; i++){
		makeWorkDivs(works[i]);
	}

	lazyLoad();
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
				makeWorkDivs(works[i]);
			}
		}
	}
	lazyLoad();

}

function makeWorkDivs(work){
	// get wrapper div
	var wrapper = document.getElementById("wrapper");

	// create content div for work
	var work_div = document.createElement("div");
	work_div.classList.add("content");

	//animation
	work_div.classList.add("hvr-icon-hang");

	// create first image
	if(work['photos'] != null){
		var work_image = document.createElement("img");
		//lazy loading
		work_image.classList.add("lazy");
		work_image.src = 'portfolio_images/placeholders/' + 'placeholder_' + work['photos'][0];
		work_image.setAttribute("data-src", 'portfolio_images/' + work['photos'][0]);
		work_image.setAttribute("style", "width:100%;");
		work_div.appendChild(work_image);
	}
	else{
		//embed video when there is no images
		work_div.appendChild(embedVideo(work['links']['video']));
	}


	// create div to hold extra photos
	var work_photos_div = document.createElement("div");
	//make extra photos hidden by default
	work_photos_div.style.display = "none";

	if(work['photos'] != null){
		for(var i = 1; i < work['photos'].length; i++){
			var image = document.createElement("img");
			image.classList.add("lazy");
			image.src = 'portfolio_images/placeholders/' + 'placeholder_' + work['photos'][i];
			image.setAttribute("data-src", 'portfolio_images/' + work['photos'][i]);
			image.setAttribute("style", "width:100%;");
			work_photos_div.appendChild(image);
		}
		work_div.appendChild(work_photos_div); 
	}

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

	// create icon for animation
	var icon = document.createElement("i");
	icon.classList.add("fa");
	icon.classList.add("fa-chevron-down");
	icon.classList.add("hvr-icon");
	work_div.appendChild(icon);

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

	// create links
	// embed video when there is also images
	if(work['links']['video'] != null && work['photos'] != null){
		//embed video
		work_detail_div.appendChild(embedVideo(work['links']['video']));
	}

	if(work['links']['blog'] != null){
		var blog_heading = document.createElement("ul");
		blog_heading.innerText = "Documentation: \n"
		work_detail_div.appendChild(blog_heading);

		//list blog links
		for(var i = 0; i < work['links']['blog'].length; i++){
			createBlogListItem(blog_heading, work['links']['blog'][i]);
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

	// add eventlistner to show hidden details if div is clicked 
	work_div.addEventListener("click", function(){
		showDetailDiv(work_detail_div);
		showDetailDiv(work_photos_div);
		toggleAnimation(work_detail_div);
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

// toggle arrow animation and icon
function toggleAnimation(work_detail_div){
	if(work_detail_div.style.display == "block"){
		work_detail_div.parentNode.classList.remove("hvr-icon-hang");
		work_detail_div.parentNode.classList.add("hvr-icon-bob");

		var icon = work_detail_div.parentNode.querySelector(".fa");
		icon.classList.remove("fa-chevron-down");
		icon.classList.add("fa-chevron-up");
	}
	else{
		work_detail_div.parentNode.classList.add("hvr-icon-hang");
		work_detail_div.parentNode.classList.remove("hvr-icon-bob");

		var icon = work_detail_div.parentNode.querySelector(".fa");
		icon.classList.remove("fa-chevron-up");
		icon.classList.add("fa-chevron-down");
	}

}

function clearDivs(){
	//clear all divs
	var wrapper = document.getElementById("wrapper");
  	while (wrapper.firstChild) {
    	wrapper.removeChild(wrapper.firstChild);
  	}
}

function toggleButtons(mediumButton){
	//turn this button red w white text
	mediumButton.classList.add("navi-medium-selected");

	//turn all others back to default white
	var mediumButtons = document.getElementsByClassName("navi-medium");
	for(var i = 0; i < mediumButtons.length; i++){
		if(mediumButtons[i].id != mediumButton.id){
			mediumButtons[i].classList.remove("navi-medium-selected");
		}
	}
}

function embedVideo(videoLink){
	var video = document.createElement("iframe");
	video.src = videoLink;
	video.setAttribute('frameborder', '0');
	video.allow = "autoplay; fullscreen";
	video.setAttribute('allowFullScreen', '');

	// create wrapper div and append video to it
	var videoWrapper = document.createElement("div");
	videoWrapper.className = "video_wrapper";
	videoWrapper.appendChild(video);

	return videoWrapper;
}

async function createBlogListItem(blogHeading, blogLink){
	const response = await fetch(blogLink);

	const html = await response.text();
	const doc = new DOMParser().parseFromString(html, "text/html");

	var title = doc.querySelectorAll('title')[0];

	var blog_listitem = document.createElement("li");
    var link = document.createElement("a");
	link.setAttribute('href', blogLink);
	link.setAttribute('target', "_blank");

	//remove blog site title
	var titleText = title.innerText.replace(/\u2013|\u2014/g, "-");
	if(titleText.includes('- ITP Blog')){
		link.innerText = titleText.split(' - ')[0];
	}
	else{
		link.innerText = title.innerText;
	}

	blog_listitem.appendChild(link);
    blogHeading.appendChild(blog_listitem);


	// fetch(work['links']['blog'][i]).then((response) => response.text()).then((html) => {
 //    	const doc = new DOMParser().parseFromString(html, "text/html");
 //    	var title = doc.querySelectorAll('title')[0];

 //    	var blog_listitem = document.createElement("li");
	//     var link = document.createElement("a");
	// 	link.setAttribute('href', work['links']['blog'][i]);
	// 	link.setAttribute('target', "_blank");
 //  		link.innerText = title.innerText;
 //  		blog_listitem.appendChild(link);
	//     blog_heading.appendChild(blog_listitem);
 // 		});
}

