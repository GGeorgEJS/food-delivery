let slider = document.querySelector(".slider_slide");
let sliderImages = document.querySelectorAll(".slider_slide img");

let prevBtn = document.querySelector("#prevBtn");
let nextBtn = document.querySelector("#nextBtn");

let counter = 1;
let size = sliderImages[0].clientWidth;

slider.style.transform = 'translateX(' + (-size * counter) + "px)";

slider.style.webkitTransform = 'translateX(' + (-size * counter) + "px)";

function event(event, fn, el){
			console.log(el.addEventListener);
			if(!!el.addEventListener){
				el.addEventListener(event, fn);
			}
			else{
				el.attachEvent("on" + event, fn);
			}
		}


event("click", function(){
	if(counter >= sliderImages.length - 1) return;
	slider.style.transition = "transform 0.4s ease";
	counter += 1;
	slider.style.transform = 'translateX(' + (-size * counter) + "px)";
}, nextBtn);

event("click", function(){
	if(counter <= 0) return;
	slider.style.transition = "transform 0.4s ease";
	counter -= 1;
	slider.style.transform = 'translateX(' + (-size * counter) + "px)";
},prevBtn);

event("transitionend",function() {
	if(sliderImages[counter].id === "lastSlide"){
		slider.style.transition = "none";
		counter = sliderImages.length - 2;
		slider.style.transform = 'translateX(' + (-size * counter) + "px)";
	}
	if(sliderImages[counter].id === "firstSlide"){
		slider.style.transition = "none";
		counter = sliderImages.length - counter;
		slider.style.transform = 'translateX(' + (-size * counter) + "px)";
	}
}, slider)