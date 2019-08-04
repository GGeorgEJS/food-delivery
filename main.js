		let res = data;
		let menu = JSON.parse(sessionStorage.getItem("day"));
		let con = document.getElementById("cont");
		let arr = JSON.parse(sessionStorage.getItem("zakaz")) || [];
		let basket_container = document.querySelector(".basket_container");
		let basket = document.getElementById("basket");
		let basket_products = document.querySelector(".products");
		let basket_price = document.getElementById("price");
		let mod = document.querySelector(".module");
		let form = document.forms["search"];
		let inputText = form.elements["ser"];
		let pag = document.getElementById("pag");
		let leftMenu = document.getElementById("left_menu");
		let orderBtn = document.querySelector(".btn_order");
		let formAdres = document.forms["adres"];
		let inputAdres = formAdres[0];
		



		
		function getDay(){
			let date = new Date();
			let day = date.getDay();
				if(res.hasOwnProperty(day)){
					sessionStorage.setItem("day", JSON.stringify(res[day]));
					main(res[day], 1);
				}
		}

		function event(event, fn, el){
			if(el.addEventListener){
				el.addEventListener(event, fn);
			}
			else{
				el.attachEvent("on" + event, fn);
			}
		}

		function div_delete(){
			let div = document.createElement("div");
			let span = document.createElement("span");
			span.textContent = "X";
			div.className = "delete"; 
			span.className = "delete";
			div.appendChild(span)

			return div;
		}

		function clear(selector){
			selector.innerHTML = "";
		}

		function get_Price(){
			let total = arr.map(item => item.price_local * item.count).reduce((a,b) => a + b, 0);
			basket_price.innerHTML = total;
			
		}

		function minus(name){
			arr.forEach((item, i) => {
				if(item.name_local === name){
					if(item.count === 1){
						arr.splice(i, 1)
					}
					else{
						item.count -= 1;
					}	
				}
				
			});
			return arr;
		}

		function choose(data, func){
			let name = "";
			for(let i = 0; i < data.length; ++i){
				if(data[i].classList.value === "name_local"){
					name = data[i].innerHTML;
					break;
				}
			}
			let arr = func(name);
			sessionStorage.setItem("zakaz", JSON.stringify(arr));
			basket_content();
		}

		function plus(name){
			arr.forEach((item, i) => {
				if(item.name_local === name){
					item.count += 1;
				}
			});
			return arr;
		}

		function delet(name){
			arr.forEach((item, i) => {
				if(item.name_local === name){
					arr.splice(i, 1);
				}
			});
			return arr;
		}

		function div_minus(key, value){
			let div = document.createElement("div");
			div.className = key;
			let span_minus = document.createElement("span");
			span_minus.innerHTML = "-";
			span_minus.className = "minus";
			let span_plus = document.createElement("span")
			span_plus.innerHTML = "+";
			span_plus.className = "plus";
			let span_count = document.createElement("span")
			span_count.innerHTML = value;
			span_count.className = key;
			div.appendChild(span_minus);
			div.appendChild(span_count);
			div.appendChild(span_plus);
			return div;
		}


		function picture(value, key){
			let picture = document.createElement("img");
			picture.setAttribute("src", value);
			picture.className = key + "_pic";

			return picture;
		}

		function createDiv(key, value){
			let div = document.createElement("div");
			let reg = /src/;
			if(key.match(reg)){
				let img = picture(value, key);
				div.className = key;
				div.appendChild(img);
			} else {
				div.className = key;
				div.textContent = value;
			}
			return div;
		}

		function div_mainInfo(content){
			let info_div = document.createElement("div");
			for(let key in content){
				let div;
					if(key === "price_local"){
						div = div_delete();
					}
					else if(key === "count"){
						div = div_minus(key, content[key]);
					}
					else{
						div = createDiv(key, content[key]);
					}
					info_div.appendChild(div);
				}

			info_div.className = "main_info";
			return info_div;
		}



		function divTempleate(content){
			
			let main_food = document.createElement("div");
			main_food.className = "main_food";
			let info = div_mainInfo(content);
			main_food.appendChild(info);

			return main_food;
			
		}

		function pagination(length, el){
			clear(pag);
			count = 1;
			while(length  > 0){
				let span = document.createElement("span");
				span.textContent = count;
				span.setAttribute("id", count);
				span.className = "pag_count";
				if(span.id == el){
					span.className = "pag_active";
				}
				pag.appendChild(span);
				count += 1;
				length -= 6;
			}
		}

		function main(contents, el){
			clear(con);
			pagination(contents.length, el)
			for(let i = (el * 6) - 6, j = el * 6; i < j; ++i){
				if(!contents[i]){
					break;
				}
				let main_food = divTempleate(contents[i]);
				con.appendChild(main_food);
			}
		}

		function basket_content(){
			clear(basket_products);
			if(!arr.length){
				document.querySelector(".module_info").style.display = "none";
			}
			arr.forEach(item => {
				let div = div_mainInfo(item);
				basket_products.insertAdjacentElement("afterbegin", div);
			})
			get_Price();
		}

		function session(data){
			let info = {};
			for(let i = 0; i < data.length; ++i){
				if(data[i].classList.value === "src") info[data[i].classList.value + "_local"] = data[i].firstChild.getAttribute("src");
				else if(data[i].classList.value === "name") info[data[i].classList.value + "_local"] = data[i].innerHTML;
				else if(data[i].classList.value === "price") info[data[i].classList.value + "_local"] = data[i].innerHTML;

			}
			info.count = 1;
			for(let i = 0; i < arr.length; ++i){
				if(arr[i].name_local === info.name_local){
					arr[i].count += 1;
					info = arr[i];
					arr.splice(i, 1);
				}
			}
			arr.push(info);
			sessionStorage.setItem("zakaz", JSON.stringify(arr));
			basket_content();
		}

		function module(inner){
			clear(mod);
			mod.style.display = "flex";
			let span = document.createElement("span");
			span.className = "close";
			span.textContent = "X";
			mod.appendChild(span);
			inner.forEach(item => {
				if(item.classList.contains("src") || item.classList.contains("name") || item.classList.contains("description")){
					let div = document.createElement("div");
				div.className = item.classList.value + "_mod";
				div.insertAdjacentHTML("afterbegin", item.innerHTML);
				mod.appendChild(div);
				}
				
			});
		}

		function filters(pattern){
			let pat = new RegExp(pattern);
			let arr = JSON.parse(sessionStorage.getItem("day"));
			arr = arr.filter(item => {
				return (item.name.match(pat) || item.type.match(pat));
				
			});
			main(arr, 1);		
		}



		event("click", function(e){
			if(e.target.classList.contains("btn")){
				let parent = e.target.parentNode;
				session(parent.childNodes);
			} else if(e.target.classList.contains("name")){
				let parent = e.target.parentNode;
				module(parent.childNodes);
			}
		}, con);

		event("change", function(e){
			if(this.checked){
				basket_content();
			}
		},basket);

		event("click", function(e){
			let child = e.target.parentNode;
			let parent = child.parentNode;
			if(e.target.classList.contains("minus")){
				choose(parent.childNodes, minus);
			} 
			else if(e.target.classList.contains("plus")){
				choose(parent.childNodes, plus);
			} 
			else if(e.target.classList.contains("delete")){
				choose(parent.childNodes, delet);
			}
		}, basket_products)

		event("click", function(e){
			if(e.target.classList.contains("close")){
				mod.style.display = "none";
			}
		}, mod)

		event("submit", function(e){
			e.preventDefault();

			if(!inputText.value){
				inputText.classList.add('is_invalid');
			}
			else {
				inputText.classList.remove('is_invalid');
				filters(inputText.value);
				form.reset();
			}
		}, form);

		event("click", function(e){
			if(e.target.classList.contains("pag_count")){
				let number = Number(e.target.getAttribute("id"));
				main(menu , number);
			}
		}, pag);

		event("click", function(e){
			if(e.target.id === "all"){
				getDay();
			}
			else{
				filters(e.target.id);
			}
			
		}, leftMenu)
		event("click", function(e){
			if(arr.length){
				document.querySelector(".module_info").style.display = 'block';
			}
		}, orderBtn)

		event("submit", function(e){
			e.preventDefault();

			if(!inputAdres.value){
				inputAdres.classList.add("is_invalid");
			}
			else{
				inputText.classList.remove('is_invalid');
				arr = [];
				basket_content();
				form.reset();
			}
		}, formAdres);

		getDay();