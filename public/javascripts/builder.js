var App = (function() {

	return {

		checkData : function(data, subData){

				if (data || data[subData]){

					return true;

				}else{

					return false;

				}

		},

		cloneItem : function(element, tags, data){

			function duplicateItem(elem, increment, data){
				var dupe = elem.cloneNode(true),
					dataElements = dupe.querySelectorAll("[data-data]"),
					dupeTags = [],
					tempName = "";

					for(var i = 0, l = dataElements.length; i < l; i++) {

						if (dataElements[i].tagName != tempName){

							tempName = dataElements[i].tagName;
							dupeTags.push(dataElements[i].tagName);

						}

					}

				App.populateItem("all", data[increment], dupe, dupeTags);

				return dupe;

			}

			function setEach(tag){

				var innerElements = element.querySelectorAll(tag),
					dupe,
					number,
					toAppend = document.createDocumentFragment();

				for (var i = 0, l = innerElements.length; i < l; i++) {

					if (innerElements[i].getAttribute("data-multiple") && App.checkData(data)){

						App.populateItem("all", data[0], innerElements[i], ["[data-data]"]);//change from div

						number = innerElements[i].getAttribute("data-multiple")|0;

						for (var j = 1; j < number; j++) {
							console.log(data);

							toAppend.appendChild(duplicateItem(innerElements[i], j, data));

						}


						element.appendChild(toAppend);

					}


				}

			}

			for (var i = 0, l = tags.length; i < l; i++) {

				setEach(tags[i]);

			}

		},

		populateItem :  function(type, data, element, tags){

			function populateAll(data, item, tags){
				var eachType = [];
				var ArrConv;

				function convert(nodelist, type){
					var array = [];
					var finishedArray = [];
					for (var i = 0, l = nodelist.length; i < l; i++) {

						array.push(nodelist[i]);

					}
					finishedArray.push(type);
					finishedArray.push(array);

					return finishedArray;

				}

				function setEach(ofEach){
					var exists;

					for (var i = 0, l = ofEach.length; i < l; i++) {

						if (ofEach[i].getAttribute("data-data") && App.checkData(data, ofEach[i].getAttribute("data-data"))){

							exists = data[ofEach[i].getAttribute("data-data")] ? true : false;

							if (!exists) {

								ofEach[i].innerHTML = '';

							} else{

								ofEach[i].innerHTML = data[ofEach[i].getAttribute("data-data")]; 

							}
						}

					}

				}

				for (var i = 0, l = tags.length; i < l; i++){

					eachType.push(convert(element.querySelectorAll(tags[i]), tags[i]));

					//making search through types, get data attributes

				}

				for (i = 0, l = eachType.length; i < l; i++) {

					setEach(eachType[i][1]);

				}

			}

			switch(type){

				case "all" :
					populateAll(data, element, tags);

					break;
				/*case "default" :
					generateDefault(data, element, types);
					break;*/

			}

		}

	};

	//loop();

})();
