!function(e){var r={};function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var a in e)t.d(n,a,function(r){return e[r]}.bind(null,a));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="/",t(t.s=33)}({33:function(e,r,t){e.exports=t(34)},34:function(e,r){$.ajaxSetup({headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")}});var t=document.getElementById("calculator-sum"),n=document.getElementById("calculator-replenish-sum"),a=document.getElementById("calculator-sum-range"),o=document.getElementById("calculator-replenish-sum-range");t.addEventListener("change",(function(e){a.value=t.value})),a.addEventListener("change",(function(e){t.value=a.value})),n.addEventListener("change",(function(e){o.value=n.value})),o.addEventListener("change",(function(e){n.value=o.value})),$((function(){$("#calculator-date").datepicker()})),$("#calculator-form").submit((function(){try{var e=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;try{if(isNaN(e))throw Error("Неверный формат числа");if(e<r||e>t)throw Error("Значение находится за границами диапазона "+r+":"+t)}catch(e){return e.message}return"no errors"},r=new Date($("#calculator-date")[0].value),t=$("#calculator-sum")[0].value,n=$("#calculator-sum")[0].min,a=$("#calculator-sum")[0].max,o=$("#calculator-time")[0].value,u=$("[name=calculator-replenish]")[0].value,l=$("#calculator-replenish-sum")[0].value,c=$("#calculator-replenish-sum")[0].min,i=$("#calculator-replenish-sum")[0].max,s="";if(!(r instanceof Date)||isNaN(r))throw Error("Неверный формат даты");if("no errors"!=(s=e(t,n,a)))throw Error(s);if("no errors"!=(s=e(o,1,5)))throw Error(s);if("0"!=u&&"1"!=u)throw Error("Неверный формат переключателя");if("no errors"!=(s=e(l,c,i)))throw Error(s)}catch(e){return $("#calculator-result-value").html(e.message),!1}return $.ajax({data:$(this).serialize(),type:"POST",url:$(this).attr("action"),success:function(e){$("#calculator-result-value").html(e+" руб")},error:function(e){if(422===e.status){var r=$.parseJSON(e.responseText);$.each(r,(function(e,r){$("#response").addClass("alert alert-danger"),$.isPlainObject(r)?$.each(r,(function(e,r){console.log(e+" "+r),$("#response").show().append(r+"<br/>")})):$("#response").show().append(r+"<br/>")}))}}}),!1}))}});