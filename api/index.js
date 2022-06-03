"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var W=Object.create;var j=Object.defineProperty;var z=Object.getOwnPropertyDescriptor;var F=Object.getOwnPropertyNames;var Q=Object.getPrototypeOf,X=Object.prototype.hasOwnProperty;var O=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),Y=(e,n)=>{for(var t in n)j(e,t,{get:n[t],enumerable:!0})},Z=(e,n,t,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let o of F(n))!X.call(e,o)&&o!==t&&j(e,o,{get:()=>n[o],enumerable:!(a=z(n,o))||a.enumerable});return e};var K=(e,n,t)=>(t=e!=null?W(Q(e)):{},Z(n||!e||!e.__esModule?j(t,"default",{value:e,enumerable:!0}):t,e));var P=O((be,T)=>{"use strict";var S=Object.getOwnPropertySymbols,re=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable;function se(e){if(e==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function ne(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de",Object.getOwnPropertyNames(e)[0]==="5")return!1;for(var n={},t=0;t<10;t++)n["_"+String.fromCharCode(t)]=t;var a=Object.getOwnPropertyNames(n).map(function(d){return n[d]});if(a.join("")!=="0123456789")return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(d){o[d]=d}),Object.keys(Object.assign({},o)).join("")==="abcdefghijklmnopqrst"}catch (e2){return!1}}T.exports=ne()?Object.assign:function(e,n){for(var t,a=se(e),o,d=1;d<arguments.length;d++){t=Object(arguments[d]);for(var f in t)re.call(t,f)&&(a[f]=t[f]);if(S){o=S(t);for(var c=0;c<o.length;c++)te.call(t,o[c])&&(a[o[c]]=t[o[c]])}}return a}});var U=O((we,x)=>{"use strict";x.exports=ae;x.exports.append=R;var oe=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;function R(e,n){if(typeof e!="string")throw new TypeError("header argument is required");if(!n)throw new TypeError("field argument is required");for(var t=Array.isArray(n)?n:N(String(n)),a=0;a<t.length;a++)if(!oe.test(t[a]))throw new TypeError("field argument contains an invalid header name");if(e==="*")return e;var o=e,d=N(e.toLowerCase());if(t.indexOf("*")!==-1||d.indexOf("*")!==-1)return"*";for(var f=0;f<t.length;f++){var c=t[f].toLowerCase();d.indexOf(c)===-1&&(d.push(c),o=o?o+", "+t[f]:t[f])}return o}function N(e){for(var n=0,t=[],a=0,o=0,d=e.length;o<d;o++)switch(e.charCodeAt(o)){case 32:a===n&&(a=n=o+1);break;case 44:t.push(e.substring(a,n)),a=n=o+1;break;default:n=o+1;break}return t.push(e.substring(a,n)),t}function ae(e,n){if(!e||!e.getHeader||!e.setHeader)throw new TypeError("res argument is required");var t=e.getHeader("Vary")||"",a=Array.isArray(t)?t.join(", "):String(t);(t=R(a,n))&&e.setHeader("Vary",t)}});var L=O((Ae,I)=>{(function(){"use strict";var e=P(),n=U(),t={origin:"*",methods:"GET,HEAD,PUT,PATCH,POST,DELETE",preflightContinue:!1,optionsSuccessStatus:204};function a(s){return typeof s=="string"||s instanceof String}function o(s,r){if(Array.isArray(r)){for(var i=0;i<r.length;++i)if(o(s,r[i]))return!0;return!1}else return a(r)?s===r:r instanceof RegExp?r.test(s):!!r}function d(s,r){var i=r.headers.origin,l=[],u;return!s.origin||s.origin==="*"?l.push([{key:"Access-Control-Allow-Origin",value:"*"}]):a(s.origin)?(l.push([{key:"Access-Control-Allow-Origin",value:s.origin}]),l.push([{key:"Vary",value:"Origin"}])):(u=o(i,s.origin),l.push([{key:"Access-Control-Allow-Origin",value:u?i:!1}]),l.push([{key:"Vary",value:"Origin"}])),l}function f(s){var r=s.methods;return r.join&&(r=s.methods.join(",")),{key:"Access-Control-Allow-Methods",value:r}}function c(s){return s.credentials===!0?{key:"Access-Control-Allow-Credentials",value:"true"}:null}function v(s,r){var i=s.allowedHeaders||s.headers,l=[];return i?i.join&&(i=i.join(",")):(i=r.headers["access-control-request-headers"],l.push([{key:"Vary",value:"Access-Control-Request-Headers"}])),i&&i.length&&l.push([{key:"Access-Control-Allow-Headers",value:i}]),l}function p(s){var r=s.exposedHeaders;if(r)r.join&&(r=r.join(","));else return null;return r&&r.length?{key:"Access-Control-Expose-Headers",value:r}:null}function y(s){var r=(typeof s.maxAge=="number"||s.maxAge)&&s.maxAge.toString();return r&&r.length?{key:"Access-Control-Max-Age",value:r}:null}function A(s,r){for(var i=0,l=s.length;i<l;i++){var u=s[i];u&&(Array.isArray(u)?A(u,r):u.key==="Vary"&&u.value?n(r,u.value):u.value&&r.setHeader(u.key,u.value))}}function J(s,r,i,l){var u=[],m=r.method&&r.method.toUpperCase&&r.method.toUpperCase();m==="OPTIONS"?(u.push(d(s,r)),u.push(c(s,r)),u.push(f(s,r)),u.push(v(s,r)),u.push(y(s,r)),u.push(p(s,r)),A(u,i),s.preflightContinue?l():(i.statusCode=s.optionsSuccessStatus,i.setHeader("Content-Length","0"),i.end())):(u.push(d(s,r)),u.push(c(s,r)),u.push(p(s,r)),A(u,i),l())}function $(s){var r=null;return typeof s=="function"?r=s:r=function(i,l){l(null,s)},function(l,u,m){r(l,function(H,B){if(H)m(H);else{var h=e({},t,B),b=null;h.origin&&typeof h.origin=="function"?b=h.origin:h.origin&&(b=function(_,w){w(null,h.origin)}),b?b(l.headers.origin,function(_,w){_||!w?m(_):(h.origin=w,J(h,l,u,m))}):m()}})}}I.exports=$})()});var _express = require('express'); var _express2 = _interopRequireDefault(_express);var k={};var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);_dotenv2.default.config();var C={};Y(C,{default:()=>fe});var V=K(L());var _cookieparser = require('cookie-parser'); var _cookieparser2 = _interopRequireDefault(_cookieparser);var _epact = require('epact');require('helmet');require('morgan');var fe=_epact.boot.call(void 0, ()=>[(0,V.default)(),_cookieparser2.default.call(void 0, ),_express.urlencoded.call(void 0, {extended:!0}),_express.json.call(void 0, )]);var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);function he(e){return!!/https?:\/{2}/.test(e)}function E(e){if(!e)return null;try{return JSON.parse(e)}catch (e3){return null}}var D=_epact.page.call(void 0, {async get(e,n){let t=decodeURIComponent(e.params[0]),a=E(e.query["cs-headers"]),o=E(e.query["cs-inherit-headers"]),d=E(e.query["cs-append-response-headers"]);if(!he(t)){n.status(405).end("Invalid URL: "+t);return}let f=Object.fromEntries(Object.entries(e.query).filter(([p])=>!p.startsWith("cs-"))),c=new Headers(o===!1?void 0:e.headers);if(a)for(let[p,y]of Object.entries(a))c.append(p,y);let v=await _axios2.default.get(t,{params:f,headers:a,responseType:"arraybuffer"});if(d!==!1)for(let[p,y]of Object.entries(v.headers))p.toLowerCase()!=="host"&&n.append(p,y);n.send(Buffer.from(v.data))}});var M=_epact.page.call(void 0, {get(e,n){n.end(`<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title></title>
    </head>
    
    <body>
      <h3 id="-how-to-use-this-">\u3053\u308C\u306F\u3069\u3046\u3044\u3046\u98A8\u306B\u4F7F\u3046\u306E? (How to use this?)</h3>
      <p>
        \u3053\u3053\u306B\u3053\u306E\u3088\u3046\u306Bget\u30EA\u30AF\u30A8\u30B9\u30C8\u3092\u9001\u4FE1\u3057\u307E\u3059: (Send request GET to this:)
      </p>
      <pre><code class="lang-text"><span class="hljs-keyword">http</span>://localhost:<span class="hljs-number">3000</span>/api/blob/&lt;url <span class="hljs-keyword">https</span>? <span class="hljs-built_in">file</span>&gt;
    </code></pre>
      <p>
        <strong><strong>\u30C7\u30D5\u30A9\u30EB\u30C8\u3067Cookie\u304C\u30AA\u30F3\u306B\u306A\u308A\u307E\u3059\u3002</strong></strong>
      </p>
      <h3 id="options">Options</h3>
      <p>\u3053\u308C\u306F\u3042\u306A\u305F\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u306E\u4E00\u90E8\u3092\u53D7\u3051\u5165\u308C\u307E\u3059\u3002:</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>cs-headers</code></td>
            <td>json encoded</td>
            <td>
              \u3069\u306E\u3088\u3046\u306B\u300Cheaders\u300D\u30D5\u30A3\u30FC\u30EB\u30C9\u3092Request\u306B\u6DFB\u4ED8\u3059\u308B\u304B\u3092\u6307\u5B9A\u3067\u304D\u307E\u3059\u3002
              (\u300CHost\u300D\u3001\u300CReferer\u300D\u3001\u300CCookie\u300D\u306A\u3069\u306E\u30D6\u30E9\u30A6\u30B6\u306E\u30C7\u30D5\u30A9\u30EB\u30C8\u3067\u30D6\u30ED\u30C3\u30AF\u3055\u308C\u305F\u30D1\u30E9\u30E1\u30FC\u30BF\u3092\u53D7\u3051\u5165\u308C\u307E\u3059...
            </td>
            <td>
              <code>?cs-headers=\${encodeURIComponent(JSON.stringify({ referer:
                  &quot;https://duckduckgo.com&quot; }))}</code>
            </td>
          </tr>
          <tr>
            <td><code>cs-inherit-headers</code></td>
            <td>boolean</td>
            <td>
              \u3053\u308C\u306B\u9001\u3089\u308C\u305F\u300Cresponse\u300D\u306B\u6DFB\u4ED8\u3055\u308C\u305F\u300Cheaders\u300D\u304C\u53D7\u3051\u7D99\u304C\u308C\u308B\u306E\u304B\u3002\u30C7\u30D5\u30A9\u30EB\u30C8\u306F\u306F\u3044
            </td>
            <td><code>?cs-inherit-headers=false</code></td>
          </tr>
          <tr>
            <td><code>cs-append-response-headers</code></td>
            <td>boolean</td>
            <td>
              \u30EC\u30B9\u30DD\u30F3\u30B9\u306E\u300C\u30D8\u30C3\u30C0\u30FC\u300D\u306F\u9001\u308A\u8FD4\u3059\u306E\u304B\u3002\u30C7\u30D5\u30A9\u30EB\u30C8\u306F\u306F\u3044
            </td>
            <td><code>?cs-append-response-headers=false</code></td>
          </tr>
        </tbody>
      </table>
      <style type="text/css">
        table {
          border-spacing: 0;
        }
    
        table td {
          border-right: 1px solid grey;
          border-bottom: 1px solid grey;
        }
    
        table td:first-child {
          border-left: 1px solid grey;
        }
      </style>
    </body>
    
    </html>`)}});var g=_express2.default.call(void 0, );[..._epact.createBoot.call(void 0, g,k),..._epact.createBoot.call(void 0, g,C)].forEach(e=>{g.use(e)});g.use("/",_epact.createPage.call(void 0, "/api/blob/:url(*)",D).router);g.use("/",_epact.createPage.call(void 0, "/api/blob",M).router);g.use((e,n,t,a)=>{a()});var De=g;exports.default = De;
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
module.exports = module.exports.default
