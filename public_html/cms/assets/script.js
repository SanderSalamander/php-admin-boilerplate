"use strict";var _createClass=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Counter=function(){function r(e){_classCallCheck(this,r),this.counters=document.querySelectorAll(e);for(var t=0;t<this.counters.length;t++){var n=this.counters[t];n.initialized||(this.init(n),n.initialized=!0)}}return _createClass(r,[{key:"init",value:function(e){var t=this,n=e;n.next=n.querySelector(".counter__button--next"),n.prev=n.querySelector(".counter__button--prev"),n.input=n.querySelector("input[type=number]"),n.initial=parseInt(n.input.value),n.next.addEventListener("click",function(){return t.update(n,"next")}),n.prev.addEventListener("click",function(){return t.update(n,"prev")})}},{key:"update",value:function(e,t){var n=e,r=new Event("changed"),i="next"===t,u=parseInt(n.input.value);i?u++:1<u&&u--,n.input.setAttribute("value",u.toString()),n.input.dispatchEvent(r)}}]),r}();
"use strict";var _createClass=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Dialog=function(){function t(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};_classCallCheck(this,t),this.title=e.title||null,this.body=e.body,this.actions=e.actions||{close:"Dialog.close(this)"}}return _createClass(t,null,[{key:"open",value:function(e){var t=findDialog(e);t&&(t.classList.add("active"),document.body.style.overflowY="none")}},{key:"close",value:function(e){var t=findDialog(e);t.classList.contains("active")&&(t.classList.remove("active"),t.classList.add("closing"),t.addEventListener("animationend",function(){return t.remove()}),document.body.removeAttribute("style"))}}]),t}(),findDialog=function(e){return e.classList.contains("dialog")?e:e.closest(".dialog")};
"use strict";var _createClass=function(){function i(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,r){return t&&i(e.prototype,t),r&&i(e,r),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Form=function(){function i(e,t){var r=this;_classCallCheck(this,i),t=t||{},this.validate=t.validate||!0,this.customStyles=t.customStyles||!1,this.regex=t.regex||{name:/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,email:/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i},this.errors=t.errors||{errorEmpty:"Field is empty",errorIncorrect:"Input is incorrect"},this.form=document.getElementById(e),this.inputs=this.form.querySelectorAll("input, textarea, select"),this.initForm(),this.form.addEventListener("submit",function(e){e.preventDefault(),r.validateForm()})}return _createClass(i,[{key:"initForm",value:function(){for(var i=this,e=function(e){var t=i.inputs[e],r=i.inputs[e].type;"INPUT"===t.tagName?"text"!==r&&"email"!==r&&"password"!==r&&"number"!==r&&"datetime"!==r&&"tel"!==r||i.initField(i.inputs[e]):"TEXTAREA"===t.tagName&&(i.initField(i.inputs[e]),t.addEventListener("input",function(){return scaleTextArea(t)}),t.addEventListener("change",function(){return scaleTextArea(t)}))},t=0;t<this.inputs.length;t++)e(t)}},{key:"initField",value:function(t){var r=this;t.container=t.parentNode,this.customStyles||(t.label=findSibling(t,"label")),!this.customStyles&&0<t.value.length&&t.label.classList.add("hovering"),this.customStyles||(t.updateState=function(){var e=t.value.length;t.label&&!r.customStyles&&(0<e?t.label.classList.add("hovering"):t.label.classList.remove("hovering"))}),this.customStyles||t.addEventListener("focusin",function(){t.label&&(t.label.classList.add("hovering"),t.label.classList.add("focus"))}),t.addEventListener("focusout",function(){t.updateState(),r.validate&&t.required&&r.validateField(t,!1)}),t.addEventListener("change",function(){return t.updateState()})}},{key:"validateForm",value:function(){for(var e=0;e<this.inputs.length;e++){var t=this.inputs[e],r=t.type;if(t.required)if("text"===r||"email"===r||"password"===r||"number"===r||"datetime"===r||r){if(!this.validateField(t))return!1}else if("TEXTAREA"===t.tagName&&!this.validateField(t))return!1}this.form.submit()}},{key:"validateField",value:function(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],r=e.dataset.validateType;if(0===e.value.length&&t){var i=this.errors.errorEmpty;return e.dataset.errorEmpty&&(i=e.dataset.errorEmpty),this.fieldError(e,i),!1}if(!r)return!0;if(r){var a=e.value;if(this.regex[r].exec(a))return!0;var n=this.errors.errorIncorrect;e.dataset.errorIncorrect&&(n=e.dataset.errorIncorrect),this.fieldError(e,n)}}},{key:"fieldError",value:function(e,t){e.container.classList.contains("error")||e.container.classList.add("error"),findSibling(e,"small")||(e.messageContainer=document.createElement("small"),e.messageContainer.innerText=t,e.container.appendChild(e.messageContainer)),e.addEventListener("keydown",function(){e.container.classList.remove("error"),e.messageContainer.remove()})}}]),i}();function findSibling(e,t){return e.parentNode.querySelector(t)}function scaleTextArea(e){e.style.height="inherit";window.getComputedStyle(e);var t=e.scrollHeight+2;e.style.height=t+"px"}
"use strict";var _createClass=function(){function o(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var FormItems=function(){function e(){var n=this;_classCallCheck(this,e),document.querySelectorAll(".form_items").forEach(function(e){e.initialized||n.init(e)})}return _createClass(e,[{key:"init",value:function(e){var n=this,t=e.querySelector(".form_items_model");(e.model=t).remove(),e.form=e.closest("form");var o=this.buildButton();e.appendChild(o),o.addEventListener("click",function(){n.insertComponent(e,n.buildComponent(e.model)),new Form(e.form.id),new Select}),this.insertComponent(e,this.buildComponent(e.model)),e.initialized=!0}},{key:"buildButton",value:function(){var e=document.createElement("button");return e.classList.add("form__group-items-new"),e.innerHTML="Add <i class='material-icons'>add</i>",e.type="button",e}},{key:"buildComponent",value:function(e){var n=e.cloneNode(!0),t=document.createElement("div");return t.classList.add("form__group-items-group"),1<n.childNodes.length?t.innerHTML=n.innerHTML:t=n.childNodes[0],t}},{key:"insertComponent",value:function(e,n){var t=e.querySelector(".form__group-items-new");e.insertBefore(n,t)}}]),e}();new FormItems;
"use strict";var imageInputs=document.querySelectorAll(".file__image");imageInputs&&imageInputs.forEach(function(e){var i=e.querySelector(".file__label"),l=i.innerHTML,n=e.querySelector("input[type=file]");n.addEventListener("change",function(e){var t="";t=n.files&&1<n.files.length?n.files.length+" files selected":e.target.value.split("\\").pop(),i.innerHTML=t||l})});
"use strict";var _createClass=function(){function l(t,e){for(var i=0;i<e.length;i++){var l=e[i];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(t,l.key,l)}}return function(t,e,i){return e&&l(t.prototype,e),i&&l(t,i),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var Menu=function(){function i(t){var e=this;_classCallCheck(this,i),this.query=t,this.menus=document.querySelectorAll(this.query),this.menus.forEach(function(t){t.initialized||e.initMenu(t)})}return _createClass(i,[{key:"initMenu",value:function(l){var e=this;l.button=l.querySelector("button"),l.list=l.querySelector("ul"),l.setAttribute("data-collapsed","true"),l.list.style.width="0px",l.list.style.height="0px",l.show=function(){l.classList.add("active");var t=l.list.scrollWidth;t<112?t=112:280<t&&(t=280);var e=l.list.scrollHeight;l.list.style.width=t+"px",l.list.style.height=e+"px",l.list.addEventListener("transitionend",function(t){l.list.removeEventListener("transitionend",t.callee)}),this.setAttribute("data-collapsed","false")},l.hide=function(){l.classList.remove("active");var t=l.list.scrollWidth,e=l.list.scrollHeight,i=l.list.style.transition;l.list.style.transition="",setTimeout(function(){l.list.style.width="0px",l.list.style.height="0px"},300),requestAnimationFrame(function(){l.list.style.width=t+"px",l.list.style.height=e+"px",l.list.style.transition=i,requestAnimationFrame(function(){t-=16,e-=16,l.list.style.width=t+"px",l.list.style.height=e+"px"})}),l.setAttribute("data-collapsed","true")},l.button.addEventListener("click",function(t){t.stopPropagation(),e.closeAll(l),collapsed(l)?l.show():l.hide()}),window.addEventListener("click",function(){return e.closeAll()}),l.initialized=!0}},{key:"closeAll",value:function(t){for(var e=document.querySelectorAll(this.query),i=[],l=[],n=0;n<e.length;n++)l.push(e[n].list),t===e[n]&&i.push(n);for(var s=0;s<l.length;s++)i.indexOf(s)&&!collapsed(l[s].parentNode)&&l[s].parentNode.hide()}}]),i}(),collapsed=function(t){return"true"===t.getAttribute("data-collapsed")};new Menu("*[class^=menu]");
"use strict";var _createClass=function(){function l(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Select=function(){function i(){var t=this;_classCallCheck(this,i),document.querySelectorAll("select").forEach(function(e){e.initialized||t.initSelectBox(e)})}return _createClass(i,[{key:"initSelectBox",value:function(t){var n=i.buildSelectBox(t),l=this.buildSelectList(t,n);l.setAttribute("data-collapsed","true"),l.style.height="0px";var e=t.parentNode;e.classList.replace("form__group","form__group--select"),e.appendChild(n),e.appendChild(l),n.addEventListener("click",function(e){e.stopPropagation(),i.closeAll(n),t.classList.toggle("select-hide"),n.classList.toggle("active"),"true"===l.getAttribute("data-collapsed")?(expandSection(l),l.setAttribute("data-collapsed","false")):collapseSection(l)}),window.addEventListener("click",i.closeAll),t.initialized=!0}},{key:"buildSelectList",value:function(n,l){var i=document.createElement("ul");i.classList.add("select__list");for(var e=function(e){var t=document.createElement("li");t.innerHTML=n.options[e].innerHTML,t.addEventListener("click",function(){for(var e=0;e<n.length;e++)if(n.options[e].innerHTML===t.innerHTML){n.selectedIndex=e,l.innerHTML=t.innerHTML,i.querySelectorAll(".same-as-selected").forEach(function(e){e.classList.remove("same-as-selected")}),t.classList.add("same-as-selected"),collapseSection(i);break}l.click()}),i.appendChild(t)},t=0;t<n.length;t++)e(t);return i}}],[{key:"buildSelectBox",value:function(e){var t=document.createElement("div");return t.classList.add("select__selected"),t.innerHTML=e.options[e.selectedIndex].innerHTML,t}},{key:"closeAll",value:function(e){for(var t=document.querySelectorAll(".select__selected"),n=document.querySelectorAll(".select__list"),l=[],i=0;i<t.length;i++)e===t[i]?l.push(i):t[i].classList.remove("active");for(var a=0;a<n.length;a++)l.indexOf(a)&&collapseSection(n[a])}}]),i}();function collapseSection(e){var t=e.scrollHeight,n=e.style.transition;e.style.transition="",requestAnimationFrame(function(){e.style.height=t+"px",e.style.transition=n,requestAnimationFrame(function(){e.style.height="0px"})}),e.setAttribute("data-collapsed","true")}function expandSection(t){var e=t.scrollHeight,n=parseInt(window.getComputedStyle(t,null).getPropertyValue("--animate-padding-top"))+parseInt(window.getComputedStyle(t,null).getPropertyValue("--animate-padding-bottom"));t.style.height=e+n+"px",t.addEventListener("transitionend",function(e){t.removeEventListener("transitionend",e.callee)}),t.setAttribute("data-collapsed","false")}new Select;
"use strict";var _createClass=function(){function c(e,t){for(var s=0;s<t.length;s++){var c=t[s];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}return function(e,t,s){return t&&c(e.prototype,t),s&&c(e,s),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Table=function(){function a(e,t){_classCallCheck(this,a),t=t||{},this.checkboxesQuery=t.checkboxesQuery||".table__checkbox",this.checkboxesMaster=t.checkboxesMaster||"master",this.messageDefault=t.contextualDefault||"items selected",this.messageOne=t.contextualOne||"item selected",this.masterQuery="."+this.checkboxesMaster,this.table=document.getElementById(e),this.checkboxes=this.table.querySelectorAll(this.checkboxesQuery),this.contextual=new Contextual(this.table.dataset.contextual,{messageDefault:this.messageDefault,messageOne:this.messageOne});for(var s=0;s<this.checkboxes.length;s++){var c=this.checkboxes[s];c.classList.contains(this.checkboxesMaster)?this.initCheckbox(c,{master:!0}):this.initCheckbox(c)}}return _createClass(a,[{key:"update",value:function(){for(var e=this.table.checked=[],t=this.checkboxes.length-1,s=this.table.querySelector(this.masterQuery),c=0;c<this.checkboxes.length;c++){var a=this.checkboxes[c];!a.master&&a.checked&&e.push(a.value)}s.checked=t===e.length,0<e.length?(this.contextual.update(e.length),this.contextual.show()):this.contextual.hide()}},{key:"toggleRow",value:function(e){e.classList.toggle("selected")}},{key:"removeRows",value:function(e){for(var t=0;t<this.checkboxes.length;t++)for(var s=this.checkboxes[t],c=0;c<e.length;c++)s.value===e[c]&&s.row.remove()}},{key:"initCheckbox",value:function(a,e){var n=this;e=e||{},a.master=e.master||!1,a.row=a.closest("tr"),a.addEventListener("click",function(e){if(a.master)if(1<n.checkboxes.length)for(var t=a.checked,s=0;s<n.checkboxes.length;s++){var c=n.checkboxes[s];c.master||c.checked===t||(c.checked=t,n.toggleRow(c.row))}else n.checkboxes[0].master&&e.preventDefault;else n.toggleRow(a.row);n.update()})}}]),a}(),TableActions={delete:function(e,t){var s=document.getElementById(t);xhr.post(e,s.checked,function(e){new Toast({message:e,position:"right",timeout:3500})});var c=new Table(t);c.removeRows(s.checked),Select.closeAll(),c.update()}},Contextual=function(){function s(e,t){_classCallCheck(this,s),t=t||{},this.messageDefault=t.messageDefault||"items selected",this.messageOne=t.messageOne||"item selected",this.contextual=document.getElementById(e)}return _createClass(s,[{key:"update",value:function(e){var t=this.contextual.querySelector(".contextualAmount"),s="0 "+this.messageDefault;1===e?s=e+" "+this.messageOne:1<e&&(s=e+" "+this.messageDefault),t.innerHTML=s}},{key:"show",value:function(){this.contextual.classList.contains("open")||this.contextual.classList.add("open")}},{key:"hide",value:function(){var e=this;this.contextual.classList.contains("open")&&(this.contextual.classList.remove("open"),this.contextual.classList.add("closing"),this.contextual.addEventListener("animationend",function(){return e.contextual.classList.remove("closing")}))}}]),s}();
"use strict";var _createClass=function(){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Toast=function(){function i(e,t){_classCallCheck(this,i),t=t||{},this.position=t.position||"center",this.timeout=t.timeout||3e3,this.message=e,this.create()}return _createClass(i,[{key:"create",value:function(){var e=this,t=document.createElement("div");t.classList.add("toast__container--"+this.position),t.innerHTML="<div class='toast'><p>"+this.message+"</p></div>",document.body.appendChild(t),t.show=function(){t.clear(),t.childNodes[0].classList.add("active"),setTimeout(function(){t.hide()},e.timeout)},t.hide=function(){t.childNodes[0].classList.replace("active","closing"),t.childNodes[0].addEventListener("animationend",function(){t.remove()})},t.clear=function(){for(var e=document.querySelectorAll("div[class^=toast__container]"),t=0;t<e.length;t++)e[t].childNodes[0].classList.contains("active")&&e[t].hide()},t.show()}}]),i}();
"use strict";var _createClass=function(){function t(e,i){for(var n=0;n<i.length;n++){var t=i[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();function _classCallCheck(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}var Views=function(){function t(e,i){var n=this;_classCallCheck(this,t),i=i||{},this.linkQuery=i.linkQuery||".views",this.container=document.getElementById(e),this.links=document.querySelectorAll(this.linkQuery),this.links[0].classList.add("active"),this.links.forEach(function(e){e.initialized||n.viewsLink(e)})}return _createClass(t,[{key:"viewsLink",value:function(i){var n=this;i.addEventListener("click",function(e){e.preventDefault(),n.loadView(i.href),activeElem(i,n.links)}),i.initialized=!0}},{key:"loadView",value:function(e,i){var n=this;i=i||{},xhr.request({method:"GET",url:e,success:function(e){n.container.innerHTML=e}})}}]),t}(),activeElem=function(i,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"active";e.forEach(function(e){e===i?i.classList.contains(n)||i.classList.add(n):e.classList.contains(n)&&e.classList.remove(n)})};
"use strict";var xhr={request:function(e){e.data=e.data||{};var t="GET"===e.method.toUpperCase(),a="POST"===e.method.toUpperCase(),n="string"==typeof e.data?e.data:Object.keys(e.data).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(data[k])}).join("&"),o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),s=t?e.url+"?"+n:e.url;if(t||a)var r=e.method.toUpperCase();o.open(r,s),o.onreadystatechange=function(){3<o.readyState&&200===o.status&&e.success(o.responseText)},o.setRequestHeader("X-Requested-With","XMLHttpRequest"),a?(o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.send(n)):o.send()}};