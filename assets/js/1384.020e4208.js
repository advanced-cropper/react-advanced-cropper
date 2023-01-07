/*! For license information please see 1384.020e4208.js.LICENSE.txt */
(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1384],{3905:function(t,e,n){"use strict";n.d(e,{Zo:function(){return l},kt:function(){return m}});var i=n(7378);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e){if(null==t)return{};var n,i,r=function(t,e){if(null==t)return{};var n,i,r={},o=Object.keys(t);for(i=0;i<o.length;i++)n=o[i],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(i=0;i<o.length;i++)n=o[i],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var c=i.createContext({}),s=function(t){var e=i.useContext(c),n=e;return t&&(n="function"==typeof t?t(e):a(a({},e),t)),n},l=function(t){var e=s(t.components);return i.createElement(c.Provider,{value:e},t.children)},f={inlineCode:"code",wrapper:function(t){var e=t.children;return i.createElement(i.Fragment,{},e)}},h=i.forwardRef((function(t,e){var n=t.components,r=t.mdxType,o=t.originalType,c=t.parentName,l=u(t,["components","mdxType","originalType","parentName"]),h=s(n),m=r,d=h["".concat(c,".").concat(m)]||h[m]||f[m]||o;return n?i.createElement(d,a(a({ref:e},l),{},{components:n})):i.createElement(d,a({ref:e},l))}));function m(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var o=n.length,a=new Array(o);a[0]=h;var u={};for(var c in e)hasOwnProperty.call(e,c)&&(u[c]=e[c]);u.originalType=t,u.mdxType="string"==typeof t?t:r,a[1]=u;for(var s=2;s<o;s++)a[s]=n[s];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}h.displayName="MDXCreateElement"},7809:function(t,e,n){"use strict";n.d(e,{Im:function(){return c},JX:function(){return s},kD:function(){return a}});var i=n(2674),r=n(5583),o=n(5632);function a(t){var e=t.rotate,n=void 0===e?0:e,i=t.flip,r=void 0===i?{horizontal:!1,vertical:!1}:i,o=t.scale,a=void 0===o?1:o;return" rotate("+n+"deg) scaleX("+a*(r.horizontal?-1:1)+") scaleY("+a*(r.vertical?-1:1)+")"}function u(t,e,n,r,u){void 0===u&&(u=null);var c=t.width>t.height?{width:Math.min(512,t.width),height:Math.min(512,t.width)/(t.width/t.height)}:{height:Math.min(512,t.height),width:Math.min(512,t.height)*(t.width/t.height)},s=(0,o.t9)(e),l={rotate:e.transforms.rotate,flip:{horizontal:e.transforms.flip.horizontal,vertical:e.transforms.flip.vertical},translateX:n.left/r,translateY:n.top/r,scale:1/r},f={left:(c.width-s.width)/(2*r),top:(c.height-s.height)/(2*r)},h={left:(1-1/r)*c.width/2,top:(1-1/r)*c.height/2},m=(0,i.pi)((0,i.pi)({},l),{scale:l.scale*(t.width/c.width)}),d={width:c.width+"px",height:c.height+"px",left:"0px",top:"0px",transition:"none",transform:"translate3d("+(-f.left-h.left-l.translateX)+"px, "+(-f.top-h.top-l.translateY)+"px, 0px)"+a(m),willChange:"none"};return u&&u.active&&(d.willChange="transform",d.transition=u.duration+"ms "+u.timingFunction),d}function c(t,e,n){return void 0===n&&(n=null),t&&e&&e.visibleArea?u(t,e,e.visibleArea,(0,o.wl)(e),n):{}}function s(t,e,n,i){return void 0===i&&(i=null),t&&e&&e.visibleArea&&e.coordinates?u(t,e,e.coordinates,(0,r.bC)(e.coordinates)>(0,r.bC)(n)?e.coordinates.width/n.width:e.coordinates.height/n.height,i):{}}},5632:function(t,e,n){"use strict";n.d(e,{Zy:function(){return c},if:function(){return u},n3:function(){return h},wl:function(){return f},an:function(){return d},y9:function(){return l},CY:function(){return s},t9:function(){return m},$g:function(){return a}});var i=n(5608),r=n(5583),o=n(8972);function a(t){return Boolean(t&&t.visibleArea&&t.coordinates)}function u(t,e){return(0,o.ev)(t,e)}function c(t,e){return(0,i.mf)(e.areaPositionRestrictions)?e.areaPositionRestrictions(t,e):e.areaPositionRestrictions}function s(t,e){return(0,o.Zz)(t,e)}function l(t,e){return(0,i.mf)(e.positionRestrictions)?e.positionRestrictions(t,e):e.positionRestrictions}function f(t){return t.visibleArea?t.visibleArea.width/t.boundary.width:0}function h(t,e){return(0,r.D9)((0,i.mf)(e.aspectRatio)?e.aspectRatio(t,e):e.aspectRatio)}function m(t){return t.imageSize&&t.imageSize.width&&t.imageSize.height?(0,r.Nw)(t.imageSize,t.transforms.rotate):{width:0,height:0}}function d(t){return t.coordinates?Math.min(t.coordinates.width,t.coordinates.height,20*f(t)):1}},8972:function(t,e,n){"use strict";n.d(e,{ev:function(){return l},Zz:function(){return s},Lo:function(){return c}});var i=n(2674),r=n(5608),o=n(5583),a=n(5632);function u(t){var e=(0,i.pi)({},t);return e.minWidth>e.maxWidth&&(e.minWidth=e.maxWidth),e.minHeight>e.maxHeight&&(e.minHeight=e.maxHeight),e}function c(t,e){var n=t,r=(0,i.pi)({minWidth:0,minHeight:0,maxWidth:1/0,maxHeight:1/0},e);return u({maxHeight:Math.min(n.maxHeight,r.maxHeight),minHeight:Math.max(n.minHeight,r.minHeight),maxWidth:Math.min(n.maxWidth,r.maxWidth),minWidth:Math.max(n.minWidth,r.minWidth)})}function s(t,e){var n=(0,r.mf)(e.sizeRestrictions)?e.sizeRestrictions(t,e):e.sizeRestrictions,i=(0,a.y9)(t,e),o={minWidth:(0,r.kE)(n.minWidth)?(0,r.p3)(n.minWidth):0,minHeight:(0,r.kE)(n.minHeight)?(0,r.p3)(n.minHeight):0,maxWidth:(0,r.kE)(n.maxWidth)?(0,r.p3)(n.maxWidth):1/0,maxHeight:(0,r.kE)(n.maxHeight)?(0,r.p3)(n.maxHeight):1/0};return void 0!==i.left&&void 0!==i.right&&(o.maxWidth=Math.min(o.maxWidth,i.right-i.left)),void 0!==i.bottom&&void 0!==i.top&&(o.maxHeight=Math.min(o.maxHeight,i.bottom-i.top)),u(o)}function l(t,e){var n=(0,r.mf)(e.areaSizeRestrictions)?e.areaSizeRestrictions(t,e):e.areaSizeRestrictions;return n.maxWidth<1/0&&n.maxHeight<1/0&&((0,o.bC)(t.boundary)>n.maxWidth/n.maxHeight?n.maxHeight=n.maxWidth/(0,o.bC)(t.boundary):n.maxWidth=n.maxHeight*(0,o.bC)(t.boundary)),u(n)}},8215:function(t,e,n){"use strict";var i=n(7378);e.Z=function(t){var e=t.children,n=t.hidden,r=t.className;return i.createElement("div",{role:"tabpanel",hidden:n,className:r},e)}},5064:function(t,e,n){"use strict";n.d(e,{Z:function(){return s}});var i=n(7378),r=n(9443);var o=function(){var t=(0,i.useContext)(r.Z);if(null==t)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return t},a=n(6010),u="tabItem_1uMI",c="tabItemActive_2DSg";var s=function(t){var e,n=t.lazy,r=t.block,s=t.defaultValue,l=t.values,f=t.groupId,h=t.className,m=i.Children.toArray(t.children),d=null!=l?l:m.map((function(t){return{value:t.props.value,label:t.props.label}})),p=null!=s?s:null==(e=m.find((function(t){return t.props.default})))?void 0:e.props.value,v=o(),g=v.tabGroupChoices,b=v.setTabGroupChoices,y=(0,i.useState)(p),x=y[0],w=y[1],O=[];if(null!=f){var H=g[f];null!=H&&H!==x&&d.some((function(t){return t.value===H}))&&w(H)}var W=function(t){var e=t.currentTarget,n=O.indexOf(e),i=d[n].value;w(i),null!=f&&(b(f,i),setTimeout((function(){var t,n,i,r,o,a,u,s;(t=e.getBoundingClientRect(),n=t.top,i=t.left,r=t.bottom,o=t.right,a=window,u=a.innerHeight,s=a.innerWidth,n>=0&&o<=s&&r<=u&&i>=0)||(e.scrollIntoView({block:"center",behavior:"smooth"}),e.classList.add(c),setTimeout((function(){return e.classList.remove(c)}),2e3))}),150))},C=function(t){var e,n=null;switch(t.key){case"ArrowRight":var i=O.indexOf(t.target)+1;n=O[i]||O[0];break;case"ArrowLeft":var r=O.indexOf(t.target)-1;n=O[r]||O[O.length-1]}null==(e=n)||e.focus()};return i.createElement("div",{className:"tabs-container"},i.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":r},h)},d.map((function(t){var e=t.value,n=t.label;return i.createElement("li",{role:"tab",tabIndex:x===e?0:-1,"aria-selected":x===e,className:(0,a.Z)("tabs__item",u,{"tabs__item--active":x===e}),key:e,ref:function(t){return O.push(t)},onKeyDown:C,onFocus:W,onClick:W},null!=n?n:e)}))),n?(0,i.cloneElement)(m.filter((function(t){return t.props.value===x}))[0],{className:"margin-vert--md"}):i.createElement("div",{className:"margin-vert--md"},m.map((function(t,e){return(0,i.cloneElement)(t,{key:e,hidden:t.props.value!==x})}))))}},9443:function(t,e,n){"use strict";var i=(0,n(7378).createContext)(void 0);e.Z=i},4184:function(t,e){var n;!function(){"use strict";var i={}.hasOwnProperty;function r(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var o=typeof n;if("string"===o||"number"===o)t.push(n);else if(Array.isArray(n)){if(n.length){var a=r.apply(null,n);a&&t.push(a)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var u in n)i.call(n,u)&&n[u]&&t.push(u);else t.push(n.toString())}}return t.join(" ")}t.exports?(r.default=r,t.exports=r):void 0===(n=function(){return r}.apply(e,[]))||(t.exports=n)}()},6010:function(t,e,n){"use strict";function i(t){var e,n,r="";if("string"==typeof t||"number"==typeof t)r+=t;else if("object"==typeof t)if(Array.isArray(t))for(e=0;e<t.length;e++)t[e]&&(n=i(t[e]))&&(r&&(r+=" "),r+=n);else for(e in t)t[e]&&(r&&(r+=" "),r+=e);return r}function r(){for(var t,e,n=0,r="";n<arguments.length;)(t=arguments[n++])&&(e=i(t))&&(r&&(r+=" "),r+=e);return r}n.d(e,{Z:function(){return r}})}}]);