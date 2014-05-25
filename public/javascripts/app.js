//Needs a lot of refactoring

(function(){

var a = document.querySelectorAll('.comic a');

function connect(method, location, callback){

		var request = new XMLHttpRequest(),
			response;

		request.open(method, location, false);
		request.send();

		if (request.status === 200) {

			response = request.responseText;

		}

		return {

			respond: function() {

				return response;

			},

			custom: callback || function() {

				return this;

			}

		};

	}

function createDescription(el, data){

	var sparse = document.createDocumentFragment(),
		descripHolder = document.createElement('div'),
		marvelLink = document.createElement('a'),
		description = document.createElement('p'),
		linkHref;

		el.setAttribute('data-collected', 'true');

		el = el.parentNode.parentNode.parentNode;

		data = JSON.parse(data);
		linkHref= data.data.results[0].urls[0].url;
		marvelLink.innerHTML = "Check out More on Marvel";

		descripHolder.classList.add('hide', 'description');


		if (data.data.results[0].description != null) {
			description.innerHTML = data.data.results[0].description;
		}
		marvelLink.setAttribute('href', linkHref);
		descripHolder.appendChild(description);
		descripHolder.appendChild(marvelLink);
		sparse.appendChild(descripHolder);
		el.appendChild(sparse);


}

//var i;

	function setWidth(e) {
		var height,
			data,
			topLevel;

		e.preventDefault();

		topLevel = this.parentNode.parentNode.parentNode;


		//console.log(data.respond());
		if (!this.getAttribute('data-collected')){

			data = new connect('GET', '/comic/' + this.getAttribute('data-id'));

			createDescription(this, data.respond());
		}

			topLevel.classList.toggle('active');

			if (topLevel.classList.contains('active')){


				history.pushState(null, null, this.href);//'/comics/' + this.getAttribute('data-id'));
			

			} else {


				history.pushState(null, null, '/');
			

			}

			//console.log (this.parentNode.parentNode.parentNode.classList);

			//set last toggle, change if click another
			//top bar with loading indicator

			height = topLevel.offsetTop;
			//console.log(this);
			//console.log(height);

			window.scrollTo(0, height);


	}

	for (var i = 0; i < a.length; i++){

		a[i].addEventListener('click', setWidth, false);


	}


})();