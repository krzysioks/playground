!function(e){function t(t){for(var r,s,i=t[0],c=t[1],l=t[2],m=0,d=[];m<i.length;m++)s=i[m],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&d.push(a[s][0]),a[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(u&&u(t);d.length;)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var c=n[i];0!==a[c]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={0:0},o=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=c;o.push([389,1]),n()}({387:function(e,t,n){var r=n(202),a=n(388);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1},s=(r(e.i,a,o),a.locals?a.locals:{});e.exports=s},388:function(e,t,n){(t=n(203)(!1)).push([e.i,"html,\nbody {\n  height: 100%;\n  background-color: #d3d3d3;\n}\n.dark {\n  background-color: rgb(211, 211, 211);\n}\n.app {\n  height: 100%;\n}\n.loginCard {\n  width: 300px;\n  height: 450px;\n}\n.statusContainer {\n  top: 7px;\n  margin: 0px 45px 0px 45px;\n}\n.statusLabel {\n  top: -2px;\n}\n.pointer {\n  cursor: pointer;\n}\n",""]),e.exports=t},389:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r);n(44),n(68),n(69),n(48),n(50),n(51),n(70),n(71),n(72);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var s,i=e[Symbol.iterator]();!(r=(s=i.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var s=function(){Object(r.useEffect)((function(){fetch("./test").then((function(e){return e.json()})).then((function(e){console.log("response",e)}))}),[]);var e=o(Object(r.useState)(0),2),t=e[0],n=e[1];return a.a.createElement("div",null,a.a.createElement("div",null,"Counter: ",t),a.a.createElement("button",{onClick:function(){n(t+1)}},"Count"))},i=(n(73),n(85)),c=n(24),l=n(27),u=(n(153),n(154),n(155),n(390)),m=n(391);function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var f=function(e){var t=e.field,n=e.form,r=n.touched,o=n.errors,s=p(e,["field","form"]);return a.a.createElement("div",null,a.a.createElement(u.a,d({},t,s,{invalid:!(!r[t.name]||!o[t.name])})),r[t.name]&&o[t.name]&&a.a.createElement(m.a,null,o[t.name]))},h=n(392),v=n(393),y=n(394),g=n(395),b=n(10);function E(e,t,n,r,a,o,s){try{var i=e[o](s),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,a)}function w(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function s(e){E(o,r,a,s,i,"next",e)}function i(e){E(o,r,a,s,i,"throw",e)}s(void 0)}))}}function x(e){return k.apply(this,arguments)}function k(){return(k=w(regeneratorRuntime.mark((function e(t){var n,r,a,o,s,i=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=i.length>1&&void 0!==i[1]?i[1]:{},r=i.length>2&&void 0!==i[2]?i[2]:{},a={"Content-Type":"application/json"},Object.keys(r)&&(a=Object.assign(a,r)),e.next=6,fetch(t,{method:"POST",credentials:"include",headers:new Headers(a),body:JSON.stringify(n)});case 6:return o=e.sent,s=P(o),e.abrupt("return",S(s));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(e){return O.apply(this,arguments)}function O(){return(O=w(regeneratorRuntime.mark((function e(t){var n,r,a,o,s=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=s.length>1&&void 0!==s[1]?s[1]:{},r={"Content-Type":"application/json"},Object.keys(n)&&(r=Object.assign(r,n)),e.next=5,fetch(t,{credentials:"include",method:"GET",headers:new Headers(r)});case 5:return a=e.sent,o=P(a),e.abrupt("return",S(o));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){return e.json()}function P(e){if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t}var N=n(16);function R(e,t,n,r,a,o,s){try{var i=e[o](s),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,a)}function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var s,i=e[Symbol.iterator]();!(r=(s=i.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var U=N.object().shape({username:N.string().min(2,"User name is too short").max(50,"User name is too long").required("Username is required"),password:N.string().min(8,"Password too short").matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])/,'Password must have at least one: large and small letter, number, special character "!@#$%^&*())"').required("Password is required")}),A=Object(l.g)((function(e){var t=C(Object(i.a)("token",""),2)[1],n=function(){var n,r=(n=regeneratorRuntime.mark((function n(r,a){var o,s,i,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,x("/task/login",r);case 2:o=n.sent,s=o.isUser,i=o.passwordMatched,c=o.token,s?i?(t(c),e.history.push("/task/mainview")):a.setErrors({password:"Password does not match"}):a.setErrors({username:"User does not exist"}),a.setSubmitting(!1);case 8:case"end":return n.stop()}}),n)})),function(){var e=this,t=arguments;return new Promise((function(r,a){var o=n.apply(e,t);function s(e){R(o,r,a,s,i,"next",e)}function i(e){R(o,r,a,s,i,"throw",e)}s(void 0)}))});return function(e,t){return r.apply(this,arguments)}}();return a.a.createElement("div",{className:"app d-flex justify-content-center align-items-center"},a.a.createElement(h.a,{className:"loginCard"},a.a.createElement(v.a,null,a.a.createElement(y.a,null,"Welcome to Task App"),a.a.createElement(b.c,{initialValues:{username:"",password:""},validationSchema:U,onSubmit:n,component:function(e){var t=e.isValid,n=e.isSubmitting;return a.a.createElement(b.b,null,a.a.createElement(b.a,{component:f,name:"username",className:"mt-1",type:"text",placeholder:"user name"}),a.a.createElement(b.a,{component:f,name:"password",className:"mt-1",type:"password",placeholder:"password"}),a.a.createElement("div",{className:"d-flex flex-row justify-content-between mt-2"},a.a.createElement(g.a,{disabled:!t||n,color:"secondary"},"log in"),a.a.createElement(c.b,{className:"align-self-end",to:"/task/register"},"register")))}}))))}));n(197);function T(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var s,i=e[Symbol.iterator]();!(r=(s=i.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function _(e,t,n,r,a,o,s){try{var i=e[o](s),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,a)}var q=N.object().shape({username:N.string().min(2,"User name is too short").max(50,"User name is too long").required("Username is required"),password:N.string().min(8,"Password too short").matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])/,'Password must have at least one: large and small letter, number, special character "!@#$%^&*())"').required("Password is required"),email:N.string().required("Email is required").email("Email is invalid")}),z=Object(l.g)((function(){var e=function(){var e,t=(e=regeneratorRuntime.mark((function e(t,n){var r,a,o,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.password!==t.retypedpassword){e.next=9;break}return e.next=3,x("/task/register",t);case 3:r=e.sent,a=r.userRegistered,o=r.statusList,a?n.setStatus({msg:"Dear ".concat(t.username,", you signed up successfully.")}):(s={},o.forEach((function(e){var t=T(e,3),n=t[0],r=t[2];s[n]=r})),n.setErrors(s)),e.next=10;break;case 9:n.setErrors({retypedpassword:"Passwords do not match"});case 10:n.setSubmitting(!1);case 11:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function s(e){_(o,r,a,s,i,"next",e)}function i(e){_(o,r,a,s,i,"throw",e)}s(void 0)}))});return function(e,n){return t.apply(this,arguments)}}();return a.a.createElement("div",{className:"app d-flex justify-content-center align-items-center"},a.a.createElement(h.a,{className:"loginCard"},a.a.createElement(v.a,null,a.a.createElement(y.a,null,"Please sign up to use Task App"),a.a.createElement(b.c,{initialValues:{username:"",password:"",email:"",retypedpassword:""},validationSchema:q,onSubmit:e,component:function(e){var t=e.isValid,n=e.isSubmitting,r=e.status;return a.a.createElement(b.b,null,a.a.createElement(b.a,{component:f,name:"username",className:"mt-1",type:"text",placeholder:"user name"}),a.a.createElement(b.a,{component:f,name:"password",className:"mt-1",type:"password",placeholder:"password"}),a.a.createElement(b.a,{component:f,name:"retypedpassword",className:"mt-1",type:"password",placeholder:"retype password"}),a.a.createElement(b.a,{component:f,name:"email",className:"mt-1",type:"text",placeholder:"example@domian.com"}),r&&r.msg?a.a.createElement("div",null,a.a.createElement(u.a,{type:"hidden",valid:!0}),a.a.createElement(m.a,{valid:!0},r.msg)):"",a.a.createElement("div",{className:"d-flex flex-row justify-content-between mt-2"},a.a.createElement(g.a,{type:"submit",disabled:!t||n,color:"secondary"},"sign up"),a.a.createElement(c.b,{className:"align-self-end",to:"/task/login"},"cancel")))}}))))})),L=(n(374),n(396)),V=n(397),I=n(57);function M(e,t,n,r,a,o,s){try{var i=e[o](s),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,a)}function D(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function s(e){M(o,r,a,s,i,"next",e)}function i(e){M(o,r,a,s,i,"throw",e)}s(void 0)}))}}function W(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var s,i=e[Symbol.iterator]();!(r=(s=i.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var $=N.object().shape({name:N.string().min(2,"User name is too short").max(50,"User name is too long").required("Name of the task is required")}),F=Object(l.g)((function(e){var t=W(Object(i.a)("token"),1)[0],n=W(Object(r.useState)([]),2),o=n[0],s=n[1],c=W(Object(r.useState)(!1),2),l=c[0],d=c[1],p=W(Object(r.useState)(null),2),y=p[0],E=p[1];Object(r.useEffect)((function(){N()}),[]);var w=function(){var n=D(regeneratorRuntime.mark((function n(r,a){var o,s,i,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,x("/task/add",r,{"x-auth":t});case 3:if(o=n.sent,s=o.taskAdded,i=o.statusList,!s){n.next=14;break}return a.resetForm(),a.setStatus({msg:"Task added"}),n.next=11,N();case 11:window.setTimeout((function(){a.setStatus({msg:""})}),5e3),n.next=17;break;case 14:c={},i.forEach((function(e){var t=W(e,3),n=t[0],r=t[2];c[n]=r})),a.setErrors(c);case 17:a.setSubmitting(!1),n.next=24;break;case 20:n.prev=20,n.t0=n.catch(0),d(!1),e.history.push("/task/unauthorized");case 24:case"end":return n.stop()}}),n,null,[[0,20]])})));return function(e,t){return n.apply(this,arguments)}}(),k=function(){var e=D(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:E(t===y?null:t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=function(){var n=D(regeneratorRuntime.mark((function n(r,a){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,x(r,a,{"x-auth":t});case 3:N(),n.next=10;break;case 6:n.prev=6,n.t0=n.catch(0),d(!1),e.history.push("/task/unauthorized");case 10:case"end":return n.stop()}}),n,null,[[0,6]])})));return function(e,t){return n.apply(this,arguments)}}(),S=function(){var e=D(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:13===n.keyCode&&O("/task/edit",{_id:t,name:n.target.value});case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),P=function(){var n=D(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,x("task/logout",{},{"x-auth":t});case 3:e.history.push("/task/login"),n.next=10;break;case 6:n.prev=6,n.t0=n.catch(0),d(!1),e.history.push("/task/unauthorized");case 10:case"end":return n.stop()}}),n,null,[[0,6]])})));return function(){return n.apply(this,arguments)}}(),N=function(){var n=D(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,E(null),n.next=4,j("/task/all",{"x-auth":t});case 4:r=n.sent,a=r.tasks,s(a),d(!0),n.next=14;break;case 10:n.prev=10,n.t0=n.catch(0),d(!1),e.history.push("/task/unauthorized");case 14:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(){return n.apply(this,arguments)}}();return l?a.a.createElement("div",null,a.a.createElement(h.a,{className:"dark"},a.a.createElement(v.a,{className:"d-flex flex-row justify-content-between"},a.a.createElement(g.a,{onClick:N,color:"secondary"},"Refresh"),a.a.createElement(g.a,{onClick:P,color:"secondary"},"logout")),a.a.createElement(v.a,null,a.a.createElement(b.c,{initialValues:{name:"",status:!1},validationSchema:$,onSubmit:w,component:function(e){var t=e.isValid,n=e.isSubmitting,r=e.status;return a.a.createElement(b.b,null,a.a.createElement("div",{className:"d-flex flex-row"},a.a.createElement(b.a,{component:f,name:"name",className:"mr-2",type:"text",placeholder:"task name"}),a.a.createElement("div",{className:"position-relative statusContainer"},a.a.createElement(b.a,{component:f,name:"status",type:"checkbox",id:"_taskstatus"}),a.a.createElement(L.a,{className:"position-relative statusLabel",for:"_taskstatus"},"completed")),a.a.createElement(g.a,{disabled:!t||n,color:"secondary"},"Add")),r&&r.msg?a.a.createElement("div",null,a.a.createElement(u.a,{type:"hidden",valid:!0}),a.a.createElement(m.a,{valid:!0},r.msg)):"")}})),a.a.createElement(v.a,null,a.a.createElement(V.a,{striped:!0,dark:!0},a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"Name"),a.a.createElement("th",null,"Created"),a.a.createElement("th",null,"Status"),a.a.createElement("th",null))),a.a.createElement("tbody",null,o.length?o.map((function(e,t){var n=e.name,r=e.status,o=e.creationDate,s=e._id;return a.a.createElement("tr",{key:t},a.a.createElement("td",null,y===t?a.a.createElement(u.a,{onKeyDown:S.bind(null,s),type:"text",defaultValue:n}):n),a.a.createElement("td",null,new Date(o).toLocaleDateString("pl-PL",{hour:"2-digit",minute:"2-digit"})),a.a.createElement("td",null,r?"Completed":"Not Completed"),a.a.createElement("td",null,r?a.a.createElement(I.d,{onClick:O.bind(null,"/task/edit",{_id:s,status:!1})}):a.a.createElement(I.b,{onClick:O.bind(null,"/task/edit",{_id:s,status:!0})})," ",a.a.createElement(I.c,{onClick:k.bind(null,t)})," ",a.a.createElement(I.a,{onClick:O.bind(null,"/task/delete",{_id:s})})," "))})):a.a.createElement("tr",null,a.a.createElement("td",{colSpan:"4"},"No data to display"))))))):a.a.createElement("div",null,"Loading...")})),J=n(398),H=Object(l.g)((function(){return a.a.createElement("div",null,a.a.createElement(J.a,{color:"danger",className:"d-flex justify-content-center"},"You are not authorized to access this page. Please",a.a.createElement(c.b,{className:"ml-1",to:"/task/login"}," log in")))})),Z=function(){return a.a.createElement(c.a,null,a.a.createElement(l.d,null,a.a.createElement(l.b,{path:"/hooks",component:s}),a.a.createElement(l.b,{path:"/task/login",component:A}),a.a.createElement(l.b,{path:"/task/register",component:z}),a.a.createElement(l.b,{path:"/task/mainview",component:F}),a.a.createElement(l.b,{path:"/task/unauthorized",component:H}),a.a.createElement(l.a,{from:"/",to:"/task/login",exact:!0})))},B=n(84),G=n.n(B),K=(n(385),n(387),n(130));K.install({onUpdating:function(){console.log("SW Event:","onUpdating")},onUpdateReady:function(){console.log("SW Event:","onUpdateReady"),K.applyUpdate()},onUpdated:function(){console.log("SW Event:","onUpdated"),window.location.reload()},onUpdateFailed:function(){console.log("SW Event:","onUpdateFailed")}}),G.a.render(a.a.createElement(Z,null),document.getElementById("playground"))}});