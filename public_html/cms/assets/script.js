"use strict";var drawerOpen=document.getElementById("drawer-open");if(drawerOpen){var drawer=document.getElementById(drawerOpen.dataset.drawer);drawer.show=function(){drawer.classList.add("active")},drawer.hide=function(){drawer.classList.remove("active")},drawerOpen.addEventListener("click",function(){drawer.classList.contains("active")||drawer.show()}),window.addEventListener("click",function(e){e.target.closest(".drawer")||e.target.closest("#drawer-open")||drawer.classList.contains("active")&&drawer.hide()})}var appbar=document.querySelector(".appbar"),rgbToHex=function(e,r,t){return"#"+[e,r,t].map(function(e){var r=parseInt(e).toString(16);return 1===r.length?"0"+r:r}).join("")};if(appbar){var themeColor=window.getComputedStyle(appbar,null).getPropertyValue("background-color");themeColor=rgbToHex((themeColor=themeColor.substring(4,themeColor.length-1).replace(/ /g,"").split(","))[0],themeColor[1],themeColor[2]);var meta=document.createElement("meta");meta.name="theme-color",meta.content=themeColor,document.getElementsByTagName("head")[0].appendChild(meta)}
"use strict";var _createClass=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Counter=function(){function n(e){var t=this;_classCallCheck(this,n),this.counters=document.querySelectorAll(e),this.counters.forEach(function(e){e.initialized||(t.init(e),e.initialized=!0)})}return _createClass(n,[{key:"init",value:function(e){var t=this,n=e;n.next=n.querySelector(".counter__button--next"),n.prev=n.querySelector(".counter__button--prev"),n.input=n.querySelector("input[type=number]"),n.initial=parseInt(n.input.value),n.next.addEventListener("click",function(){return t.update(n,"next")}),n.prev.addEventListener("click",function(){return t.update(n,"prev")})}},{key:"update",value:function(e,t){var n=e,r=new Event("changed"),i="next"===t,u=parseInt(n.input.value);i?u++:1<u&&u--,n.input.setAttribute("value",u.toString()),n.input.dispatchEvent(r)}}]),n}();
"use strict";var _createClass=function(){function e(t,i){for(var n=0;n<i.length;n++){var e=i[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var Dialog=function(){function i(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};_classCallCheck(this,i),this.title=t.title||!1,this.body=t.body,this.actions=t.actions||{close:"Dialog.close(this)"},this.build()}return _createClass(i,[{key:"build",value:function(){var i=this,t=document.createElement("div");t.classList.add("dialog");var n="<div class='dialog__actions'>";Object.keys(this.actions).forEach(function(t){n+='<button type="button" class="button__flat--primary" onclick="'+i.actions[t]+'">'+t+"</button>"}),n+="</div>";var e=this.title?'<h1 class="dialog__title">'+this.title+"</h1>":"";t.innerHTML='\n      <div class="dialog__card">\n        '+e+'\n        <p class="dialog__body">'+this.body+"</p>\n        "+n+"\n      </div>\n    ",document.body.appendChild(t),this.dialog=t}}],[{key:"open",value:function(t){var i=findDialog(t);i&&(i.classList.add("active"),document.body.style.overflowY="none")}},{key:"close",value:function(t){var i=1<arguments.length&&void 0!==arguments[1]&&arguments[1],n=findDialog(t);n.classList.contains("active")&&(n.classList.remove("active"),n.classList.add("closing"),n.addEventListener("animationend",function(){i?n.remove():n.classList.remove("closing")}),document.body.removeAttribute("style"))}}]),i}(),findDialog=function(t){return t.classList.contains("dialog")?t:t.closest(".dialog")};
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_createClass=function(){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Form=function(){function n(e,t){var r=this;_classCallCheck(this,n),t=t||{},this.validate=t.validate||!0,this.customStyles=t.customStyles||!1,this.regex=t.regex||{name:/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,email:/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i},this.errors=t.errors||{errorEmpty:"Field is empty",errorIncorrect:"Input is incorrect"},this.types=["text","email","password","number","datetime","tel","file"],this.form=document.getElementById(e),this.inputs=this.form.querySelectorAll("input, textarea, select"),this.initForm(),this.form.addEventListener("submit",function(e){e.preventDefault(),r.validateForm()})}return _createClass(n,[{key:"initForm",value:function(){for(var n=this,e=function(e){var t=n.inputs[e],r=n.inputs[e].type;"INPUT"===t.tagName?n.types.find(function(e){return e===r})&&n.initField(n.inputs[e]):"TEXTAREA"===t.tagName&&(n.initField(n.inputs[e]),t.addEventListener("input",function(){return scaleTextArea(t)}),t.addEventListener("change",function(){return scaleTextArea(t)}))},t=0;t<this.inputs.length;t++)e(t)}},{key:"initField",value:function(t){var r=this;t.container=t.parentNode,this.customStyles||(t.label=findSibling(t,"label")),!this.customStyles&&0<t.value.length&&t.label.classList.add("hovering"),this.customStyles||(t.updateState=function(){var e=t.value.length;t.label&&!r.customStyles&&(0<e?t.label.classList.add("hovering"):t.label.classList.remove("hovering"))}),this.customStyles||t.addEventListener("focusin",function(){t.label&&(t.label.classList.add("hovering"),t.label.classList.add("focus"))}),t.addEventListener("focusout",function(){t.label&&!r.customStyles&&t.label.classList.remove("focus"),t.updateState(),r.validate&&t.required&&r.validateField(t,!1)}),t.addEventListener("change",function(){return t.updateState()})}},{key:"validateForm",value:function(){for(var n=this,e=function(e){var t=n.inputs[e],r=t.type;if(t.required)if(n.types.find(function(e){return e===r})){if(!n.validateField(t))return{v:!1}}else if("TEXTAREA"===t.tagName&&!n.validateField(t))return{v:!1}},t=0;t<this.inputs.length;t++){var r=e(t);if("object"===(void 0===r?"undefined":_typeof(r)))return r.v}this.form.submit()}},{key:"validateField",value:function(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],r=e.dataset.validateType;if(0===e.value.length&&t){var n=this.errors.errorEmpty;return e.dataset.errorEmpty&&(n=e.dataset.errorEmpty),this.fieldError(e,n),!1}if(!r)return!0;if(r){var i=e.value;if(this.regex[r].exec(i))return!0;var a=this.errors.errorIncorrect;e.dataset.errorIncorrect&&(a=e.dataset.errorIncorrect),this.fieldError(e,a)}}},{key:"fieldError",value:function(e,t){e.container&&e.container.classList.contains("error")&&e.container.classList.add("error"),findSibling(e,"small")||(e.messageContainer=document.createElement("small"),e.messageContainer.innerText=t,e.container.appendChild(e.messageContainer)),e.addEventListener("keydown",function(){e.container.classList.remove("error"),e.messageContainer.remove()})}}]),n}();function findSibling(e,t){return e.parentNode.querySelector(t)}function scaleTextArea(e){e.style.height="inherit";window.getComputedStyle(e);var t=e.scrollHeight+2;e.style.height=t+"px"}
"use strict";var _createClass=function(){function o(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var FormItems=function(){function e(){var n=this;_classCallCheck(this,e),document.querySelectorAll(".form_items").forEach(function(e){e.initialized||n.init(e)})}return _createClass(e,[{key:"init",value:function(e){var n=this,t=e.querySelector(".form_items_model");(e.model=t).remove(),e.form=e.closest("form");var o=this.buildButton();e.appendChild(o),o.addEventListener("click",function(){n.insertComponent(e,n.buildComponent(e.model)),new Form(e.form.id),new Select}),this.insertComponent(e,this.buildComponent(e.model)),e.initialized=!0}},{key:"buildButton",value:function(){var e=document.createElement("button");return e.classList.add("form__group-items-new"),e.innerHTML="Add <i class='material-icons'>add</i>",e.type="button",e}},{key:"buildComponent",value:function(e){var n=e.cloneNode(!0),t=document.createElement("div");return t.classList.add("form__group-items-group"),1<n.childNodes.length?t.innerHTML=n.innerHTML:t=n.childNodes[0],t}},{key:"insertComponent",value:function(e,n){var t=e.querySelector(".form__group-items-new");e.insertBefore(n,t)}}]),e}();new FormItems;
"use strict";var imageInputs=document.querySelectorAll(".file__image");imageInputs&&imageInputs.forEach(function(e){var i=e.querySelector(".file__label"),l=i.innerHTML,n=e.querySelector("input[type=file]");n.addEventListener("change",function(e){var t="";t=n.files&&1<n.files.length?n.files.length+" files selected":e.target.value.split("\\").pop(),i.innerHTML=t||l})});
"use strict";var _createClass=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var inputSwitch=function(){function e(t){_classCallCheck(this,e),this.container=document.getElementById(t),this.switcher=document.getElementById(this.container.dataset.switch),this.currentIndex=0,this.inputs=this.container.querySelectorAll("[data-switch-index]"),this.init()}return _createClass(e,[{key:"init",value:function(){var t=this;this.inputs.forEach(function(t){t.style.display="none"}),this.switch(),document.querySelector(".select__list").addEventListener("click",function(){t.currentIndex=t.switcher.selectedIndex,t.switch()})}},{key:"switch",value:function(){var e=this;this.inputs.forEach(function(t){parseInt(t.dataset.switchIndex)===e.currentIndex?t.removeAttribute("style"):t.style.display="none"})}}]),e}();
"use strict";var _createClass=function(){function l(t,e){for(var i=0;i<e.length;i++){var l=e[i];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(t,l.key,l)}}return function(t,e,i){return e&&l(t.prototype,e),i&&l(t,i),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var Menu=function(){function i(t){var e=this;_classCallCheck(this,i),this.query=t,this.menus=document.querySelectorAll(this.query),this.menus.forEach(function(t){t.initialized||e.initMenu(t)})}return _createClass(i,[{key:"initMenu",value:function(l){var e=this;l.button=l.querySelector("button"),l.list=l.querySelector("ul"),l.setAttribute("data-collapsed","true"),l.list.style.width="0px",l.list.style.height="0px",l.show=function(){l.classList.add("active");var t=l.list.scrollWidth;t<112?t=112:280<t&&(t=280);var e=l.list.scrollHeight;l.list.style.width=t+"px",l.list.style.height=e+"px",l.list.addEventListener("transitionend",function(t){l.list.removeEventListener("transitionend",t.callee)}),this.setAttribute("data-collapsed","false")},l.hide=function(){l.classList.remove("active");var t=l.list.scrollWidth,e=l.list.scrollHeight,i=l.list.style.transition;l.list.style.transition="",setTimeout(function(){l.list.style.width="0px",l.list.style.height="0px"},300),requestAnimationFrame(function(){l.list.style.width=t+"px",l.list.style.height=e+"px",l.list.style.transition=i,requestAnimationFrame(function(){t-=16,e-=16,l.list.style.width=t+"px",l.list.style.height=e+"px"})}),l.setAttribute("data-collapsed","true")},l.button.addEventListener("click",function(t){t.stopPropagation(),e.closeAll(l),collapsed(l)?l.show():l.hide()}),window.addEventListener("click",function(){return e.closeAll()}),l.initialized=!0}},{key:"closeAll",value:function(t){for(var e=document.querySelectorAll(this.query),i=[],l=[],n=0;n<e.length;n++)l.push(e[n].list),t===e[n]&&i.push(n);for(var s=0;s<l.length;s++)i.indexOf(s)&&!collapsed(l[s].parentNode)&&l[s].parentNode.hide()}}]),i}(),collapsed=function(t){return"true"===t.getAttribute("data-collapsed")};new Menu("*[class^=menu]");
"use strict";var _createClass=function(){function i(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,t){return n&&i(e.prototype,n),t&&i(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var Search=function(){function n(e){_classCallCheck(this,n),this.url=e.url,this.method=e.method,this.inputQuery=e.input||"input[name=q]",this.container=document.getElementById(e.container)||!1,this.containerInitial=this.container.innerHTML,this.init()}return _createClass(n,[{key:"init",value:function(){var n=this,t=document.querySelector(this.inputQuery);t.addEventListener("keyup",function(){var e=t.value;void 0===n.Oq?(n.query(e),n.Oq=e):e!==n.Oq&&n.query(e)})}},{key:"query",value:function(e){var n=this;0<e.length?xhr.request({url:this.url,method:this.method.toUpperCase(),data:{q:e},success:function(e){return n.handleResponse(e)}}):this.handleResponse()}},{key:"handleResponse",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"";""===e?this.container.innerHTML=this.containerInitial:this.container.innerHTML!==e&&(this.container.innerHTML=e)}}]),n}();
"use strict";var _createClass=function(){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var SearchBox=function(){function i(e,t){var n=this;_classCallCheck(this,i),t=t||{},this.placeholder=t.placeholder||"Search",this.createState=t.createState||"<div class='search-box__empty'>No results found.<button type='button' class='button__flat--primary' id='add-new'>Add new</button></div>",this.emptyState=t.emptyState||"<div class='search-box__empty'>No results found.</div>",this.nodeList=document.querySelectorAll(e),this.nodeList.length&&(this.className=this.nodeList[0].classList[0],this.nodeList.forEach(function(e){e.initialized||(n.init(e),e.initialized=!0)}))}return _createClass(i,[{key:"init",value:function(r){var a=this;r.input=r.querySelector(".input"),this.event=new Event("input-changed"),r.input.addEventListener("input-changed",function(){return a.inputState(r.input)}),this.inputState(r.input),r.hiddenInput=r.querySelector("input[type=hidden]"),r.box=r.querySelector(".search-box"),r.list=r.querySelector(".search-box__container"),r.box.enter=function(e){if("Enter"===e.key){var t=r.list.querySelector("button"),n=r.list.querySelector("li");(t||n)&&(t?t.click():n&&n.click(),e.preventDefault())}},r.userAdd="true"===r.box.dataset.userAdd,r.box.removeAttribute("data-user-add"),r.JSON=r.box.getAttribute("data-list"),console.table(JSON.parse(r.JSON)),r.box.removeAttribute("data-list"),r.boxClosedEvent=new Event("box-closed"),r.box.addEventListener("box-closed",function(){}),r.insertList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],t=SearchList.list(r.JSON,e);r.list.innerHTML="",r.list.appendChild(t),t.querySelectorAll("li").forEach(function(i){i.addEventListener("click",function(e){e.stopPropagation();var t=i.dataset.value,n=i.innerHTML;a.updateInput(r.hiddenInput,t),a.updateDummy(r.input,n),a.close(r.box)})})},r.insertList(),r.search=r.querySelector(".search-box__input"),r.search.placeholder=this.placeholder,r.search.addEventListener("keyup",function(){var n=r.search.value;if(n.length){var e=JSON.parse(r.JSON),t=SearchJSON.match(e,n,Object.keys(e[0])[1]);if((t=t.indexes).length)r.insertList(t);else if(r.userAdd)r.list.innerHTML=a.createState,document.querySelector("#add-new").addEventListener("click",function(){var e=n.deStyle();a.updateInput(r.hiddenInput,e);var t=n.style();a.updateDummy(r.input,t),a.close(r.box)});else r.list.innerHTML=a.emptyState}else r.insertList();window.addEventListener("keydown",function(e){r.box.enter(e)})}),r.input.addEventListener("click",function(){r.box.classList.contains("open")||(a.open(r.box),480<Math.max(document.documentElement.clientWidth,window.innerWidth||0)&&r.search.focus())}),window.addEventListener("click",function(e){e.target.closest("."+a.className)||a.nodeList.forEach(function(e){a.close(e.box)})})}},{key:"updateInput",value:function(e,t){e.value=t}},{key:"updateDummy",value:function(e,t){e.innerText=t,e.dispatchEvent(this.event),this.inputState(e)}},{key:"inputState",value:function(e){var t=e.querySibling(".label");0===e.innerHTML.length?t.classList.remove("hovering"):t.classList.add("hovering")}},{key:"open",value:function(e){e.classList.add("open")}},{key:"close",value:function(t){window.removeEventListener("keydown",function(e){t.enter(e)}),t.classList.replace("open","closing"),t.addEventListener("animationend",function(){t.classList.remove("closing")})}}]),i}(),SearchList=function(){function a(){_classCallCheck(this,a)}return _createClass(a,null,[{key:"list",value:function(e){var t=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:[],i=JSON.parse(e),r=document.createElement("ul");return n.length?n.forEach(function(e){r.appendChild(a.item(i[e]))}):i.forEach(function(e){r.appendChild(t.item(e))}),r}},{key:"item",value:function(e){var t=Object.values(e),n=document.createElement("li");return n.innerText=style(""+t[1]),n.setAttribute("data-value",t[0]),n}}]),a}();String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},Object.prototype.querySibling=function(e){return this.parentNode.querySelector(e)},String.prototype.style=function(){return this.replace("_"," ").capitalize()},String.prototype.deStyle=function(){return this.replace(" ","_").toLowerCase()};var style=function(e){return e.replace("_"," ").capitalize()},deStyle=function(e){return e.replace(" ","_").toLowerCase()};new SearchBox(".form__group--searchbox");
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_createClass=function(){function o(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var SearchJSON=function(){function a(){_classCallCheck(this,a)}return _createClass(a,null,[{key:"objects",value:function(e,n,t){var o=[];for(var r in e)e.hasOwnProperty(r)&&("object"==_typeof(e[r])?o=o.concat(a.objects(e[r],n,t)):r==n&&e[r].includes(t)||r==n&&""==t?o.push(e+"found"):e[r]==t&&""==n&&-1==o.lastIndexOf(e)&&o.push(e));return o}},{key:"values",value:function(e,n){var t=[];for(var o in e)e.hasOwnProperty(o)&&("object"==_typeof(e[o])?t=t.concat(a.values(e[o],n)):o==n&&t.push(e[o]));return t}},{key:"keys",value:function(e,n){var t=[];for(var o in e)e.hasOwnProperty(o)&&("object"==_typeof(e[o])?t=t.concat(a.keys(e[o],n)):e[o]==n&&t.push(o));return t}},{key:"match",value:function(e,n){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"",a=[],c=new RegExp(n,"i");return e.forEach(function(t,o){Object.keys(t).forEach(function(e){var n=r.length?r:e;t[n].toString().match(c)&&-1===a.indexOf(o)&&a.push(o)})}),{searched:n,indexes:a}}}]),a}();
"use strict";var _createClass=function(){function l(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Select=function(){function i(){var t=this;_classCallCheck(this,i),document.querySelectorAll("select").forEach(function(e){e.initialized||t.initSelectBox(e)})}return _createClass(i,[{key:"initSelectBox",value:function(t){var n=i.buildSelectBox(t),l=this.buildSelectList(t,n);l.setAttribute("data-collapsed","true"),l.style.height="0px";var e=t.parentNode;e.classList.replace("form__group","form__group--select"),e.appendChild(n),e.appendChild(l),n.addEventListener("click",function(e){e.stopPropagation(),i.closeAll(n),t.classList.toggle("select-hide"),n.classList.toggle("active"),"true"===l.getAttribute("data-collapsed")?(expandSection(l),l.setAttribute("data-collapsed","false")):collapseSection(l)}),window.addEventListener("click",i.closeAll),t.initialized=!0}},{key:"buildSelectList",value:function(n,l){var i=document.createElement("ul");i.classList.add("select__list");for(var e=function(e){var t=document.createElement("li");t.innerHTML=n.options[e].innerHTML,t.addEventListener("click",function(){for(var e=0;e<n.length;e++)if(n.options[e].innerHTML===t.innerHTML){n.selectedIndex=e,l.innerHTML=t.innerHTML,i.querySelectorAll(".same-as-selected").forEach(function(e){e.classList.remove("same-as-selected")}),t.classList.add("same-as-selected"),collapseSection(i);break}l.click()}),i.appendChild(t)},t=0;t<n.length;t++)e(t);return i}}],[{key:"buildSelectBox",value:function(e){var t=document.createElement("div");return t.classList.add("select__selected"),t.innerHTML=e.options[e.selectedIndex].innerHTML,t}},{key:"closeAll",value:function(e){for(var t=document.querySelectorAll(".select__selected"),n=document.querySelectorAll(".select__list"),l=[],i=0;i<t.length;i++)e===t[i]?l.push(i):t[i].classList.remove("active");for(var a=0;a<n.length;a++)l.indexOf(a)&&collapseSection(n[a])}}]),i}();function collapseSection(e){var t=e.scrollHeight,n=e.style.transition;e.style.transition="",requestAnimationFrame(function(){e.style.height=t+"px",e.style.transition=n,requestAnimationFrame(function(){e.style.height="0px"})}),e.setAttribute("data-collapsed","true")}function expandSection(t){var e=t.scrollHeight,n=parseInt(window.getComputedStyle(t,null).getPropertyValue("--animate-padding-top"))+parseInt(window.getComputedStyle(t,null).getPropertyValue("--animate-padding-bottom"));t.style.height=e+n+"px",t.addEventListener("transitionend",function(e){t.removeEventListener("transitionend",e.callee)}),t.setAttribute("data-collapsed","false")}new Select;
"use strict";var _createClass=function(){function i(e,t){for(var s=0;s<t.length;s++){var i=t[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,s){return t&&i(e.prototype,t),s&&i(e,s),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Table=function(){function i(e,t){var s=this;_classCallCheck(this,i),t=t||{},this.checkboxesQuery=t.checkboxesQuery||".table__checkbox",this.checkboxesMaster=t.checkboxesMaster||"master",this.messageDefault=t.contextualDefault||"items selected",this.messageOne=t.contextualOne||"item selected",this.masterQuery="."+this.checkboxesMaster,this.table=document.getElementById(e),this.source=t.source||!1,this.init(function(){s.checkboxes=s.table.querySelectorAll(s.checkboxesQuery),s.checkboxes.forEach(function(e){e.classList.contains(s.checkboxesMaster)?s.initCheckbox(e,{master:!0}):s.initCheckbox(e)})}),this.contextual=new Contextual(this.table.dataset.contextual,{messageDefault:this.messageDefault,messageOne:this.messageOne})}return _createClass(i,[{key:"init",value:function(t){var s=this;if(this.source){this.limit=this.source.limit,this.table.innerHTML="<div class='progress'><div class='progress__indeterminate'></div></div>",xhr.request({url:this.source.url,method:"POST",data:{limit:this.limit,offset:this.source.offset?this.source.offset:0}}).then(function(e){s.table.innerHTML=e,new Menu("*[class^=menu]"),t()});var e=this.table.id;this.next=document.getElementById(e+"-next"),this.prev=document.getElementById(e+"-prev"),this.status=document.getElementById(e+"-status"),this.max=this.source.max,this.updateStatus(1),this.updateNext(),this.updatePrev(),this.next.addEventListener("click",function(){return s.updateSource("next",t)}),this.prev.addEventListener("click",function(){return s.updateSource("prev",t)})}else t()}},{key:"updateNext",value:function(){var e=0===Math.ceil(this.max/this.limit)?1:Math.ceil(this.max/this.limit);this.step===e?this.next.classList.add("disabled"):this.next.classList.remove("disabled")}},{key:"updatePrev",value:function(){1===this.step?this.prev.classList.add("disabled"):this.prev.classList.remove("disabled")}},{key:"updateSource",value:function(e,t){var s=this,i=void 0;"next"===e?(this.offset=this.limit*this.step,i=this.step+1):"prev"===e&&(this.offset=this.offset-this.limit,i=this.step-1),xhr.request({url:this.source.url,method:"POST",data:{limit:this.limit,offset:this.offset}}).then(function(e){s.table.innerHTML=e,s.updateStatus(i),s.updateNext(),s.updatePrev(),s.update(),s.contextual.update(s.table.checked),new Menu("*[class^=menu]"),t()}).then(function(e){return s.handleError(e)})}},{key:"updateStatus",value:function(e){this.step=e;var t=Math.ceil(this.max/this.limit);0===t&&(t=1),this.status.innerText=this.step+" / "+t}},{key:"update",value:function(){var t=this.table.checked=[],e=this.checkboxes.length-1,s=this.table.querySelector(this.masterQuery);this.checkboxes.forEach(function(e){!e.master&&e.checked&&t.push(e.value)}),s.checked=e===t.length,0<t.length?(this.contextual.update(t.length),this.contextual.show()):this.contextual.hide()}},{key:"toggleRow",value:function(e){e.classList.toggle("selected")}},{key:"removeRows",value:function(e){for(var t=0;t<this.checkboxes.length;t++)for(var s=this.checkboxes[t],i=0;i<e.length;i++)s.value===e[i]&&s.row.remove()}},{key:"initCheckbox",value:function(a,e){var n=this;e=e||{},a.master=e.master||!1,a.row=a.closest("tr"),a.addEventListener("click",function(e){if(a.master)if(1<n.checkboxes.length)for(var t=a.checked,s=0;s<n.checkboxes.length;s++){var i=n.checkboxes[s];i.master||i.checked===t||(i.checked=t,n.toggleRow(i.row))}else n.checkboxes[0].master&&e.preventDefault();else n.toggleRow(a.row);n.update()})}}]),i}(),TableActions={delete:function(e,t){var s=document.getElementById(t);xhr.send({method:"POST",url:e,data:{selected:s.checked},success:function(e){return new Toast({message:e,position:"right",timeout:3e6})}});var i=new Table(t);i.removeRows(s.checked),Select.closeAll(),i.update(),i.contextual.update(0)}},Contextual=function(){function s(e,t){_classCallCheck(this,s),t=t||{},this.messageDefault=t.messageDefault||"items selected",this.messageOne=t.messageOne||"item selected",this.contextual=document.getElementById(e)}return _createClass(s,[{key:"update",value:function(e){var t=this.contextual.querySelector(".contextualAmount"),s="0 "+this.messageDefault;1===e?s=e+" "+this.messageOne:1<e?s=e+" "+this.messageDefault:0===e&&this.hide(),t.innerHTML=s}},{key:"show",value:function(){this.contextual.classList.contains("open")||this.contextual.classList.add("open")}},{key:"hide",value:function(){var e=this;this.contextual.classList.contains("open")&&(this.contextual.classList.remove("open"),this.contextual.classList.add("closing"),this.contextual.addEventListener("animationend",function(){return e.contextual.classList.remove("closing")}))}}]),s}();
"use strict";var _createClass=function(){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Toast=function(){function t(e){_classCallCheck(this,t),e=e||{},this.position=e.position||"center",this.timeout=e.timeout||3e3,this.message=e.message,this.create()}return _createClass(t,[{key:"create",value:function(){var e=this,t=document.createElement("div");t.classList.add("toast__container--"+this.position),t.innerHTML="<div class='toast'><p>"+this.message+"</p></div>",document.body.appendChild(t),t.show=function(){t.clear(),t.childNodes[0].classList.add("active"),setTimeout(function(){t.hide()},e.timeout)},t.hide=function(){t.childNodes[0].classList.replace("active","closing"),t.childNodes[0].addEventListener("animationend",function(){t.remove()})},t.clear=function(){document.querySelectorAll("div[class^=toast__container]").forEach(function(e){e.childNodes[0].classList.contains("active")&&e.hide()})},t.show()}}]),t}();
"use strict";var _createClass=function(){function t(e,i){for(var n=0;n<i.length;n++){var t=i[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();function _classCallCheck(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}var Views=function(){function t(e,i){var n=this;_classCallCheck(this,t),i=i||{},this.linkQuery=i.linkQuery||".views",this.container=document.getElementById(e),this.links=document.querySelectorAll(this.linkQuery),this.links[0].classList.add("active"),this.links.forEach(function(e){e.initialized||n.viewsLink(e)})}return _createClass(t,[{key:"viewsLink",value:function(i){var n=this;i.addEventListener("click",function(e){e.preventDefault(),n.loadView(i.href),activeElem(i,n.links)}),i.initialized=!0}},{key:"loadView",value:function(e,i){var n=this;i=i||{},xhr.request({method:"GET",url:e,success:function(e){n.container.innerHTML=e}})}}]),t}(),activeElem=function(i,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"active";e.forEach(function(e){e===i?i.classList.contains(n)||i.classList.add(n):e.classList.contains(n)&&e.classList.remove(n)})};
"use strict";var _createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var xhr=function(){function r(){_classCallCheck(this,r)}return _createClass(r,null,[{key:"config",value:function(t){var e=void 0,n=void 0,o=void 0,a=void 0;return e=t.data?"string"===t.data?t.data:Object.keys(t.data).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t.data[e])}).join("&"):"",t.method?(n="GET"===t.method.toUpperCase(),o="POST"===t.method.toUpperCase()):o=!(n=!0),t.url&&(a=n?t.url+"?"+e:t.url),{url:a,method:n||o?t.method.toUpperCase():"GET",params:e}}},{key:"send",value:function(e){var t=r.config(e),n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");n.open(t.method,t.url),n.onreadystatechange=function(){3<n.readyState&&200===n.status&&e.success(n.responseText)},n.setRequestHeader("X-Requested-With","XMLHttpRequest"),"POST"===t.method?(n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.send(t.params)):n.send()}},{key:"request",value:function(a){return new Promise(function(e,t){var n=r.config(a),o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");o.open(n.method,n.url),o.onload=function(){200<=o.status&&o.status<300?e(o.response):t(o.statusText)},o.setRequestHeader("X-Requested-With","XMLHttpRequest"),"POST"===n.method?(o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.send(n.params)):o.send()})}}]),r}();