!function(){function e(e,t,n){var r=new XMLHttpRequest,a;return r.open(e,t,!1),r.send(),200===r.status&&(a=r.responseText),{respond:function(){return a},custom:n||function(){return this}}}function t(e,t){var n=document.createDocumentFragment(),r=document.createElement("div"),a=document.createElement("a"),o=document.createElement("p"),i;e.setAttribute("data-collected","true"),e=e.parentNode.parentNode.parentNode,t=JSON.parse(t),i=t.data.results[0].urls[0].url,a.innerHTML="Check out More on Marvel",r.classList.add("hide","description"),null!=t.data.results[0].description&&(o.innerHTML=t.data.results[0].description),a.setAttribute("href",i),r.appendChild(o),r.appendChild(a),n.appendChild(r),e.appendChild(n)}function n(n){var r,a;n.preventDefault(),this.getAttribute("data-collected")||(a=new e("GET","/comic/"+this.getAttribute("data-id")),t(this,a.respond())),this.parentNode.parentNode.parentNode.classList.toggle("active"),this.parentNode.parentNode.parentNode.classList.contains("active")?history.pushState(null,null,"/comics/"+this.getAttribute("data-id")):history.pushState(null,null,"/"),r=this.parentNode.parentNode.offsetTop,window.scrollTo(0,r)}var r=document.querySelectorAll(".comic a"),a;for(a=0;a<r.length;a++)r[a].addEventListener("click",n,!1)}();