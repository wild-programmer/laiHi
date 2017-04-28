 (function(doc, win) {
     var docEl = doc.documentElement,
         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
         recalc = function() {
             var clientWidth = docEl.clientWidth;
             // window.innerWidth>max ? window.innerWidth : max; 
             if (!clientWidth) return;
             docEl.style.fontSize = clientWidth / 25 + 'px';
         };
     addEvent(win, resizeEvt, recalc);
     addEvent(doc, 'DOMContentLoaded', recalc);

     function addEvent(obj, type, fn) {
         if (obj.addEventListener) {
             obj.addEventListener(type, fn, false);
         } else if (obj.attachEvent) {
             obj.attachEvent("on" + type, fn);
         } else {
             obj["on" + type] = fn;
         }
     }
 })(document, window);