"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7937],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var r=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,f=d["".concat(p,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(f,i(i({ref:t},s),{},{components:n})):r.createElement(f,i({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3873:function(e,t,n){n.d(t,{Z:function(){return l}});var r=n(7378),a=n(6010),o="tableOfContentsInline_3fWc";function i(e){var t=e.toc,n=e.isChild;return t.length?r.createElement("ul",{className:n?"":"table-of-contents"},t.map((function(e){return r.createElement("li",{key:e.id},r.createElement("a",{href:"#"+e.id,dangerouslySetInnerHTML:{__html:e.value}}),r.createElement(i,{isChild:!0,toc:e.children}))}))):null}var l=function(e){var t=e.toc;return r.createElement("div",{className:(0,a.Z)(o)},r.createElement(i,{toc:t}))}},8215:function(e,t,n){var r=n(7378);t.Z=function(e){var t=e.children,n=e.hidden,a=e.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:a},t)}},5064:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(7378),a=n(9443);var o=function(){var e=(0,r.useContext)(a.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},i=n(6010),l="tabItem_1uMI",p="tabItemActive_2DSg";var c=function(e){var t,n=e.lazy,a=e.block,c=e.defaultValue,s=e.values,u=e.groupId,d=e.className,m=r.Children.toArray(e.children),f=null!=s?s:m.map((function(e){return{value:e.props.value,label:e.props.label}})),g=null!=c?c:null==(t=m.find((function(e){return e.props.default})))?void 0:t.props.value,h=o(),k=h.tabGroupChoices,v=h.setTabGroupChoices,b=(0,r.useState)(g),y=b[0],C=b[1],w=[];if(null!=u){var N=k[u];null!=N&&N!==y&&f.some((function(e){return e.value===N}))&&C(N)}var x=function(e){var t=e.currentTarget,n=w.indexOf(t),r=f[n].value;C(r),null!=u&&(v(u,r),setTimeout((function(){var e,n,r,a,o,i,l,c;(e=t.getBoundingClientRect(),n=e.top,r=e.left,a=e.bottom,o=e.right,i=window,l=i.innerHeight,c=i.innerWidth,n>=0&&o<=c&&a<=l&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(p),setTimeout((function(){return t.classList.remove(p)}),2e3))}),150))},O=function(e){var t,n=null;switch(e.key){case"ArrowRight":var r=w.indexOf(e.target)+1;n=w[r]||w[0];break;case"ArrowLeft":var a=w.indexOf(e.target)-1;n=w[a]||w[w.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":a},d)},f.map((function(e){var t=e.value,n=e.label;return r.createElement("li",{role:"tab",tabIndex:y===t?0:-1,"aria-selected":y===t,className:(0,i.Z)("tabs__item",l,{"tabs__item--active":y===t}),key:t,ref:function(e){return w.push(e)},onKeyDown:O,onFocus:x,onClick:x},null!=n?n:t)}))),n?(0,r.cloneElement)(m.filter((function(e){return e.props.value===y}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},m.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==y})}))))}},9443:function(e,t,n){var r=(0,n(7378).createContext)(void 0);t.Z=r},510:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return u},metadata:function(){return d},toc:function(){return m},default:function(){return g}});var r=n(7462),a=n(3366),o=(n(7378),n(3905)),i=n(5064),l=n(8215),p=n(3873),c=["components"],s={sidebar_position:6},u="FAQ",d={unversionedId:"faq",id:"faq",isDocsHomePage:!1,title:"FAQ",description:"Contents",source:"@site/docs/faq.mdx",sourceDirName:".",slug:"/faq",permalink:"/react-advanced-cropper/docs/faq",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/faq.mdx",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Utils",permalink:"/react-advanced-cropper/docs/concept/utils"},next:{title:"Resize Algorithm",permalink:"/react-advanced-cropper/docs/algorithms/resize-algorithm"}},m=[{value:"Contents",id:"contents",children:[]},{value:"How to get the default state?",id:"how-to-get-the-default-state",children:[]},{value:"How to check if the cropper is dirty?",id:"how-to-check-if-the-cropper-is-dirty",children:[]},{value:"I want to add an additional property to the cropper. How to do it?",id:"i-want-to-add-an-additional-property-to-the-cropper-how-to-do-it",children:[{value:"Cropper&#39;s parts",id:"croppers-parts",children:[]},{value:"Cropper&#39;s settings",id:"croppers-settings",children:[]}]}],f={toc:m};function g(e){var t=e.components,n=(0,a.Z)(e,c);return(0,o.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"faq"},"FAQ"),(0,o.kt)("h2",{id:"contents"},"Contents"),(0,o.kt)(p.Z,{toc:m,mdxType:"TOCInline"}),(0,o.kt)("h2",{id:"how-to-get-the-default-state"},"How to get the default state?"),(0,o.kt)("p",null,"To get the default state you can use the corresponding cropper method."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"const cropperRef = useRef<CropperRef>(null);\n\nconst getDefaultState = () => {\n    return cropperRef.current?.getDefaultState();\n}\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"<Cropper\n    ref={cropperRef}\n/>\n")),(0,o.kt)("p",null,"If you use transitions, rotate an image a lot, and try to set the default state you can encounter the situation that\nimage begins rolling like a barrel. It's proper behaviour, because angles are accumulating, and ",(0,o.kt)("inlineCode",{parentName:"p"},"state.transforms.rotate")," can become\n",(0,o.kt)("inlineCode",{parentName:"p"},"360"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"720"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"1440"),", etc. degrees."),(0,o.kt)("p",null,"To get more expected behavior you can get the closer angle (i.e. if you resetting angle to ",(0,o.kt)("inlineCode",{parentName:"p"},"0")," from ",(0,o.kt)("inlineCode",{parentName:"p"},"270"),", the angle ",(0,o.kt)("inlineCode",{parentName:"p"},"360")," will be the closer to ",(0,o.kt)("inlineCode",{parentName:"p"},"270")," than ",(0,o.kt)("inlineCode",{parentName:"p"},"0"),",):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import { getCloserAngle } from 'advanced-cropper'\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"const getDefaultState = () => {\n    const currentState = cropperRef.current?.getState();\n    const defaultState = cropperRef.current?.getDefaultState();\n    return currentState && defaultState\n        ? {\n                ...defaultState,\n                transforms: {\n                    ...defaultState.transforms,\n                    rotate: getCloserAngle(currentState.transforms.rotate, defaultState.transforms.rotate),\n                },\n            }\n        : null;\n};\n")),(0,o.kt)("h2",{id:"how-to-check-if-the-cropper-is-dirty"},"How to check if the cropper is dirty?"),(0,o.kt)("p",null,"Get ",(0,o.kt)("a",{parentName:"p",href:"/docs/faq#how-to-get-the-default-state"},"the default state")," and compare this state with\nthe current state:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import { isEqualState } from 'advanced-cropper';\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"const isDirty = !isEqualState(cropper.getState(), defaultState);\n")),(0,o.kt)("h2",{id:"i-want-to-add-an-additional-property-to-the-cropper-how-to-do-it"},"I want to add an additional property to the cropper. How to do it?"),(0,o.kt)("p",null,"It depends on what kind of setting you want to add."),(0,o.kt)("h3",{id:"croppers-parts"},"Cropper's parts"),(0,o.kt)(i.Z,{mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"stencil",label:"Stencil",default:!0,mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"<Cropper\n    stencilComponent={CustomStencil}\n    stencilProps={{\n        color: 'red'\n    }}\n/>\n")),(0,o.kt)("p",null,"The prop ",(0,o.kt)("inlineCode",{parentName:"p"},"color")," will be passed into ",(0,o.kt)("inlineCode",{parentName:"p"},"CustomStencil"),".")),(0,o.kt)(l.Z,{value:"wrapper",label:"Wrapper",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"<Cropper\n    wrapperComponent={CustomWrapper}\n    wrapperProps={{\n        navigation: true\n    }}\n/>\n")),(0,o.kt)("p",null,"The prop ",(0,o.kt)("inlineCode",{parentName:"p"},"navigation")," will be passed into ",(0,o.kt)("inlineCode",{parentName:"p"},"CustomWrapper"),".")),(0,o.kt)(l.Z,{value:"backgroundWrapper",label:"BackgroundWrapper",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"<Cropper\n    backgroundWrapperComponent={CustomBackgroundWrapper}\n    backgroundWrapperProps={{\n        smooth: true\n    }}\n/>\n")),(0,o.kt)("p",null,"The prop ",(0,o.kt)("inlineCode",{parentName:"p"},"smooth")," will be passed into ",(0,o.kt)("inlineCode",{parentName:"p"},"CustomBackgroundWrapper"),"."))),(0,o.kt)("h3",{id:"croppers-settings"},"Cropper's settings"),(0,o.kt)("p",null,"If you want to add the custom cropper's setting field, that will be used in its internal algorithms (such as ",(0,o.kt)("inlineCode",{parentName:"p"},"defaultSize"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"sizeRestrictions"),", etc.)\nyou can use the generic nature of cropper components:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"interface CustomSettings {\n    stencilType: string;\n}\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"<Cropper<CustomSettings>\n    stencilType={'circle'}\n    defaultSize={(state, settings) => {\n        if (settings.stencilType === 'circle') {\n            // something\n        }\n    }}\n/>\n")))}g.isMDXComponent=!0},6010:function(e,t,n){function r(e){var t,n,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}function a(){for(var e,t,n=0,a="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(a&&(a+=" "),a+=t);return a}n.d(t,{Z:function(){return a}})}}]);