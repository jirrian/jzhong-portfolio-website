document.addEventListener("DOMContentLoaded", function() {
	var linksToLoad = [].slice.call(document.querySelectorAll("a.linkload"));
	console.log(linksToLoad);
	linksToLoad.forEach(async function createBlogListItem(link){
		var blogLink = link.href;
		const response = await fetch(blogLink);

		const html = await response.text();
		const doc = new DOMParser().parseFromString(html, "text/html");

		var title = doc.querySelectorAll('title')[0];

		//remove blog site title
		var titleText = title.innerText.replace(/\u2013|\u2014/g, "-");
		if(titleText.includes('- ITP Blog')){
			link.innerText = titleText.split(' - ')[0];
		}
		else{
			link.innerText = title.innerText;
		}

	});
});