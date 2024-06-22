
const DEBUG = false;
var fs = document.querySelectorAll(".filter");
var nodelist = document.querySelector(".sectionScroller").querySelectorAll("a.item");

var list = Array();
nodelist.forEach(item => {
	list.push({
		"id"	: item.getAttribute("href").toString().replace(/[^0-9]/gi, ''),
		"title" : item.querySelector(".itemName").innerHTML,
		"price" : item.querySelector(".price").innerHTML.replace(/[^0-9\.]/gi, ''),
		"media" : item.querySelector("img").getAttribute("src")
	});
});
var sortedByPrice = [...list];
sortedByPrice.sort((a, b) => b.price - a.price);
var sw = {
	"isActive" : false,
	"isCascading" : false
}
function Display(array)
{
	document.querySelector(".sectionScroller").innerHTML = ``;
	array.forEach(item => {
		document.querySelector(".sectionScroller").innerHTML += `
			<a class="item" href="/item${item.id}">
				<img src="${item.media}" alt="Picture">
				<p class="price">€${item.price}</p><br>
				<p class="itemName">${item.title}</p>
			</a>`;
	});
}
function ToFilter()
{
	if (sw.isActive)
	{
		if (DEBUG) console.log('changing: price');
		sortedByPrice.reverse();
		Display(sortedByPrice);
	}
	else
	{
		if (DEBUG) console.log('changing: default');
		list.reverse();
		Display(list);
	}
}
function SetMode(type)
{
	switch(type)
	{
	case "default":
		fs[0].className = `filter selected`;
		fs[1].className = `filter`;
		sw.isActive = false;
		ToFilter();
		return;
	case "price":
		fs[0].className = `filter`;
		fs[1].className = `filter selected`;
		if (sw.isActive)
		{
			if (sw.isCascading)
			{
				fs[1].querySelector("p").innerHTML = `📈Price`;
				sw.isCascading = false;
				ToFilter();
			}
			else
			{
				fs[1].querySelector("p").innerHTML = `📉Price`;
				sw.isCascading = true;
				ToFilter();
			}
		}
		else
		{
			sw.isActive = true;
			ToFilter();		//	using variable sw.isCascading
		}
		return;
	}
}