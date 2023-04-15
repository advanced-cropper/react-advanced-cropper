"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8771],{3905:function(t,e,i){i.d(e,{Zo:function(){return p},kt:function(){return m}});var o=i(7378);function r(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function n(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,o)}return i}function h(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?n(Object(i),!0).forEach((function(e){r(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function f(t,e){if(null==t)return{};var i,o,r=function(t,e){if(null==t)return{};var i,o,r={},n=Object.keys(t);for(o=0;o<n.length;o++)i=n[o],e.indexOf(i)>=0||(r[i]=t[i]);return r}(t,e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);for(o=0;o<n.length;o++)i=n[o],e.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(t,i)&&(r[i]=t[i])}return r}var a=o.createContext({}),c=function(t){var e=o.useContext(a),i=e;return t&&(i="function"==typeof t?t(e):h(h({},e),t)),i},p=function(t){var e=c(t.components);return o.createElement(a.Provider,{value:e},t.children)},l={inlineCode:"code",wrapper:function(t){var e=t.children;return o.createElement(o.Fragment,{},e)}},s=o.forwardRef((function(t,e){var i=t.components,r=t.mdxType,n=t.originalType,a=t.parentName,p=f(t,["components","mdxType","originalType","parentName"]),s=c(i),m=r,u=s["".concat(a,".").concat(m)]||s[m]||l[m]||n;return i?o.createElement(u,h(h({ref:e},p),{},{components:i})):o.createElement(u,h({ref:e},p))}));function m(t,e){var i=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var n=i.length,h=new Array(n);h[0]=s;var f={};for(var a in e)hasOwnProperty.call(e,a)&&(f[a]=e[a]);f.originalType=t,f.mdxType="string"==typeof t?t:r,h[1]=f;for(var c=2;c<n;c++)h[c]=i[c];return o.createElement.apply(null,h)}return o.createElement.apply(null,i)}s.displayName="MDXCreateElement"},2851:function(t,e,i){i.d(e,{fX:function(){return s},sE:function(){return m}});var o=i(2674),r=i(9639),n=i(5608),h=i(5583);function f(t){var e=t.coordinates,i=t.directions,f=t.positionRestrictions,a=t.sizeRestrictions,c=t.preserveRatio,p=t.allowedDirections,l=t.compensate,s=void 0===l||l,m=(0,o.pi)({},i),u=(0,h.v7)(e,m).width,g=(0,h.v7)(e,m).height;u<0&&(m.left<0&&m.right<0?(m.left=-(e.width-a.minWidth)/(m.left/m.right),m.right=-(e.width-a.minWidth)/(m.right/m.left)):m.left<0?m.left=-(e.width-a.minWidth):m.right<0&&(m.right=-(e.width-a.minWidth))),g<0&&(m.top<0&&m.bottom<0?(m.top=-(e.height-a.minHeight)/(m.top/m.bottom),m.bottom=-(e.height-a.minHeight)/(m.bottom/m.top)):m.top<0?m.top=-(e.height-a.minHeight):m.bottom<0&&(m.bottom=-(e.height-a.minHeight)));var d=(0,h.Q8)((0,h.v7)(e,m),f),b=r.OD.every((function(t){return!(0,n.Vy)(d[(0,h.aT)(t)],0)||p[t]}));s&&b&&(d.left&&d.left>0&&0===d.right?(m.right+=d.left,m.left-=d.left):d.right&&d.right>0&&0===d.left&&(m.left+=d.right,m.right-=d.right),d.top&&d.top>0&&0===d.bottom?(m.bottom+=d.top,m.top-=d.top):d.bottom&&d.bottom>0&&0===d.top&&(m.top+=d.bottom,m.bottom-=d.bottom),d=(0,h.Q8)((0,h.v7)(e,m),f));var v={width:1/0,height:1/0,left:1/0,right:1/0,top:1/0,bottom:1/0};if(r.OD.forEach((function(t){var e=d[t];e&&m[t]&&(v[t]=Math.max(0,1-e/m[t]))})),c){var w=Math.min.apply(Math,r.OD.map((function(t){return v[t]})));w!==1/0&&r.OD.forEach((function(t){m[t]*=w}))}else r.OD.forEach((function(t){v[t]!==1/0&&(m[t]*=v[t])}));if(u=(0,h.v7)(e,m).width,g=(0,h.v7)(e,m).height,m.right+m.left&&(u>a.maxWidth?v.width=(a.maxWidth-e.width)/(m.right+m.left):u<a.minWidth&&(v.width=(a.minWidth-e.width)/(m.right+m.left))),m.bottom+m.top&&(g>a.maxHeight?v.height=(a.maxHeight-e.height)/(m.bottom+m.top):g<a.minHeight&&(v.height=(a.minHeight-e.height)/(m.bottom+m.top))),c){var O=Math.min(v.width,v.height);O!==1/0&&r.OD.forEach((function(t){m[t]*=O}))}else v.width!==1/0&&r.tx.forEach((function(t){m[t]*=v.width})),v.height!==1/0&&r.bb.forEach((function(t){m[t]*=v.height}));return m}function a(t,e,i){return(0,n.l7)(e+i,0)?t/2:(0,n.l7)(e,0)?0:(0,n.l7)(i,0)?t:t*Math.abs(e/(e+i))}function c(t,e,i,c){var p=c.aspectRatio,l=c.positionRestrictions,s=c.sizeRestrictions,m=(0,o.pi)({},t);e=(0,o.pi)({},e);var u=i.allowedDirections||{left:!0,right:!0,bottom:!0,top:!0};t.width<s.minWidth&&(e.left=0,e.right=0),t.height<s.minHeight&&(e.top=0,e.bottom=0),r.OD.forEach((function(t){u[t]||(e[t]=0)})),e=f({coordinates:m,directions:e,sizeRestrictions:s,positionRestrictions:l,allowedDirections:u});var g=(0,h.v7)(m,e).width,d=(0,h.v7)(m,e).height,b=i.preserveAspectRatio?(0,h.bC)(m):(0,h.fJ)(g/d,p);if(b){var v=i.respectDirection;if("width"!==v&&"height"!==v&&(v=m.width>=m.height||1===b?"width":"height"),"width"===v){var w=g/b-m.height;if(u.top&&u.bottom){var O=e.top,y=e.bottom;e.bottom=a(w,y,O),e.top=a(w,O,y)}else u.bottom?e.bottom=w:u.top?e.top=w:u.right?e.right=0:u.left&&(e.left=0)}else if("height"===v){var x=m.width-d*b;if(u.left&&u.right){var D=e.left,E=e.right;e.left=-a(x,D,E),e.right=-a(x,E,D)}else u.left?e.left=-x:u.right?e.right=-x:u.top?e.top=0:u.bottom&&(e.bottom=0)}e=f({directions:e,coordinates:m,sizeRestrictions:s,positionRestrictions:l,preserveRatio:!0,compensate:i.compensate,allowedDirections:u})}return g=(0,h.v7)(m,e).width,d=(0,h.v7)(m,e).height,(b=i.preserveAspectRatio?(0,h.bC)(m):(0,h.fJ)(g/d,p))&&(0,n.Vy)(Math.abs(b-g/d),0)&&r.OD.forEach((function(t){e[t]=0})),function(t,e,i){var o=(0,h.PL)(t,e);return i?(0,h.$2)(o,i):o}({width:t.width+e.right+e.left,height:t.height+e.top+e.bottom,left:t.left,top:t.top},{left:-e.left,top:-e.top},l)}function p(t,e){var i=e.toLowerCase();return{left:t.left+t.width*(-1!==i.indexOf("west")?1:-1!==i.indexOf("east")?0:.5),top:t.top+t.height*(-1!==i.indexOf("north")?1:-1!==i.indexOf("south")?0:.5)}}function l(t){var e=t.toLowerCase();return{left:-1===e.indexOf("east"),top:-1===e.indexOf("south"),right:-1===e.indexOf("west"),bottom:-1===e.indexOf("north")}}function s(t,e){var i=t.toLowerCase(),o={left:-1===i.indexOf("west")?e.left:-e.left,top:-e.top,right:e.left,bottom:e.top};["north","south","center"].every((function(t){return-1===i.indexOf(t)}))&&(o.top=0,o.bottom=0),["west","east","center"].every((function(t){return-1===i.indexOf(t)}))&&(o.left=0,o.right=0);var n=l(t);return r.OD.forEach((function(t){n[t]||(o[t]=0)})),o}function m(t,e,i,r,n){var f=r.reference,a=s(e,i),m=l(e),u=c(t,a,(0,o.pi)((0,o.pi)({},r),{allowedDirections:m}),n);return f&&(u=(0,h.PL)(u,(0,h.Hg)(p(f,e),p(u,e)))),(0,h.$2)(u,n.positionRestrictions)}},1057:function(t,e,i){i.d(e,{K:function(){return r}});var o=i(5583);function r(t){var e=t.width,i=t.height,r=t.sizeRestrictions||{minWidth:0,minHeight:0,maxWidth:1/0,maxHeight:1/0},n=(0,o.D9)(t.aspectRatio),h={width:Math.max(r.minWidth,Math.min(r.maxWidth,e)),height:Math.max(r.minHeight,Math.min(r.maxHeight,i))},f=[h];return n&&[n.minimum,n.maximum].forEach((function(t){t&&f.push({width:h.width,height:h.width/t},{width:h.height*t,height:h.height})})),f=f.map((function(t){return(0,o.Ly)(t,r)})),(0,o.$r)(f,{width:e,height:i},r,n)}}}]);