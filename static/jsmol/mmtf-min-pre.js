var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(g,l,m){g!=Array.prototype&&g!=Object.prototype&&(g[l]=m.value)};$jscomp.getGlobal=function(g){return"undefined"!=typeof window&&window===g?g:"undefined"!=typeof global&&null!=global?global:g};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(g){return $jscomp.SYMBOL_PREFIX+(g||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var g=$jscomp.global.Symbol.iterator;g||(g=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[g]&&$jscomp.defineProperty(Array.prototype,g,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(g){var l=0;return $jscomp.iteratorPrototype(function(){return l<g.length?{done:!1,value:g[l++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(g){$jscomp.initSymbolIterator();g={next:g};g[$jscomp.global.Symbol.iterator]=function(){return this};return g};$jscomp.iteratorFromArray=function(g,l){$jscomp.initSymbolIterator();g instanceof String&&(g+="");var m=0,n={next:function(){if(m<g.length){var q=m++;return{value:l(q,g[q]),done:!1}}n.next=function(){return{done:!0,value:void 0}};return n.next()}};n[Symbol.iterator]=function(){return n};return n};
$jscomp.polyfill=function(g,l,m,n){if(l){m=$jscomp.global;g=g.split(".");for(n=0;n<g.length-1;n++){var q=g[n];q in m||(m[q]={});m=m[q]}g=g[g.length-1];n=m[g];l=l(n);l!=n&&null!=l&&$jscomp.defineProperty(m,g,{configurable:!0,writable:!0,value:l})}};$jscomp.polyfill("Array.prototype.keys",function(g){return g?g:function(){return $jscomp.iteratorFromArray(this,function(g){return g})}},"es6","es3");
(function(g,l){l(g.MMTF=g.MMTF||{})})(this,function(g){function l(a,b,c){for(var d=0,f=c.length;d<f;d++){var e=c.charCodeAt(d);if(128>e)a.setUint8(b++,e>>>0&127|0);else if(2048>e)a.setUint8(b++,e>>>6&31|192),a.setUint8(b++,e>>>0&63|128);else if(65536>e)a.setUint8(b++,e>>>12&15|224),a.setUint8(b++,e>>>6&63|128),a.setUint8(b++,e>>>0&63|128);else if(1114112>e)a.setUint8(b++,e>>>18&7|240),a.setUint8(b++,e>>>12&63|128),a.setUint8(b++,e>>>6&63|128),a.setUint8(b++,e>>>0&63|128);else throw Error("bad codepoint "+
e);}}function m(a){for(var b=0,c=0,d=a.length;c<d;c++){var f=a.charCodeAt(c);if(128>f)b+=1;else if(2048>f)b+=2;else if(65536>f)b+=3;else if(1114112>f)b+=4;else throw Error("bad codepoint "+f);}return b}function n(a,b,c){var d=typeof a;if("string"===d){var f=m(a);if(32>f)return b.setUint8(c,f|160),l(b,c+1,a),1+f;if(256>f)return b.setUint8(c,217),b.setUint8(c+1,f),l(b,c+2,a),2+f;if(65536>f)return b.setUint8(c,218),b.setUint16(c+1,f),l(b,c+3,a),3+f;if(4294967296>f)return b.setUint8(c,219),b.setUint32(c+
1,f),l(b,c+5,a),5+f}if(a instanceof Uint8Array){f=a.byteLength;var e=new Uint8Array(b.buffer);if(256>f)return b.setUint8(c,196),b.setUint8(c+1,f),e.set(a,c+2),2+f;if(65536>f)return b.setUint8(c,197),b.setUint16(c+1,f),e.set(a,c+3),3+f;if(4294967296>f)return b.setUint8(c,198),b.setUint32(c+1,f),e.set(a,c+5),5+f}if("number"===d){if(!isFinite(a))throw Error("Number not finite: "+a);if(Math.floor(a)!==a)return b.setUint8(c,203),b.setFloat64(c+1,a),9;if(0<=a){if(128>a)return b.setUint8(c,a),1;if(256>a)return b.setUint8(c,
204),b.setUint8(c+1,a),2;if(65536>a)return b.setUint8(c,205),b.setUint16(c+1,a),3;if(4294967296>a)return b.setUint8(c,206),b.setUint32(c+1,a),5;throw Error("Number too big 0x"+a.toString(16));}if(-32<=a)return b.setInt8(c,a),1;if(-128<=a)return b.setUint8(c,208),b.setInt8(c+1,a),2;if(-32768<=a)return b.setUint8(c,209),b.setInt16(c+1,a),3;if(-2147483648<=a)return b.setUint8(c,210),b.setInt32(c+1,a),5;throw Error("Number too small -0x"+(-a).toString(16).substr(1));}if(null===a)return b.setUint8(c,192),
1;if("boolean"===d)return b.setUint8(c,a?195:194),1;if("object"===d){d=0;if(e=Array.isArray(a))f=a.length;else{var h=Object.keys(a);f=h.length}16>f?(b.setUint8(c,f|(e?144:128)),d=1):65536>f?(b.setUint8(c,e?220:222),b.setUint16(c+1,f),d=3):4294967296>f&&(b.setUint8(c,e?221:223),b.setUint32(c+1,f),d=5);if(e)for(e=0;e<f;e++)d+=n(a[e],b,c+d);else for(e=0;e<f;e++){var g=h[e];d+=n(g,b,c+d);d+=n(a[g],b,c+d)}return d}throw Error("Unknown type "+d);}function q(a){var b=typeof a;if("string"===b){var c=m(a);
if(32>c)return 1+c;if(256>c)return 2+c;if(65536>c)return 3+c;if(4294967296>c)return 5+c}if(a instanceof Uint8Array){c=a.byteLength;if(256>c)return 2+c;if(65536>c)return 3+c;if(4294967296>c)return 5+c}if("number"===b){if(Math.floor(a)!==a)return 9;if(0<=a){if(128>a)return 1;if(256>a)return 2;if(65536>a)return 3;if(4294967296>a)return 5;throw Error("Number too big 0x"+a.toString(16));}if(-32<=a)return 1;if(-128<=a)return 2;if(-32768<=a)return 3;if(-2147483648<=a)return 5;throw Error("Number too small -0x"+
a.toString(16).substr(1));}if("boolean"===b||null===a)return 1;if("object"===b){b=0;if(Array.isArray(a)){c=a.length;for(var d=0;d<c;d++)b+=q(a[d])}else{var f=Object.keys(a);c=f.length;for(d=0;d<c;d++){var e=f[d];b+=q(e)+q(a[e])}}if(16>c)return 1+b;if(65536>c)return 3+b;if(4294967296>c)return 5+b;throw Error("Array or object too long 0x"+c.toString(16));}throw Error("Unknown type "+b);}function H(a){var b=new ArrayBuffer(q(a)),c=new DataView(b);n(a,c,0);return new Uint8Array(b)}function k(a,b,c){return b?
new a(b.buffer,b.byteOffset,b.byteLength/(c||1)):void 0}function A(a,b){var c=a.length/2;b||(b=new Int16Array(c));for(var d=0,f=0;d<c;++d,f+=2)b[d]=a[f]<<8^a[f+1]<<0;return b}function r(a,b){var c=a.length/4;b||(b=new Int32Array(c));for(var d=0,f=0;d<c;++d,f+=4)b[d]=a[f]<<24^a[f+1]<<16^a[f+2]<<8^a[f+3]<<0;return b}function t(a,b){var c=a.length;b||(b=new Uint8Array(4*c));for(var d=k(DataView,b),f=0;f<c;++f)d.setInt32(4*f,a[f]);return k(Uint8Array,b)}function x(a,b,c){var d=a.length;b=1/b;c||(c=new Float32Array(d));
for(var f=0;f<d;++f)c[f]=a[f]*b;return c}function I(a,b,c){var d=a.length;c||(c=new Int32Array(d));for(var f=0;f<d;++f)c[f]=Math.round(a[f]*b);return c}function B(a,b){var c;if(!b){var d=b=0;for(c=a.length;d<c;d+=2)b+=a[d+1];b=new a.constructor(b)}var f=0;d=0;for(c=a.length;d<c;d+=2)for(var e=a[d],h=a[d+1],g=0;g<h;++g)b[f]=e,++f;return b}function D(a){if(0===a.length)return new Int32Array;var b,c=2;var d=1;for(b=a.length;d<b;++d)a[d-1]!==a[d]&&(c+=2);c=new Int32Array(c);var f=0,e=1;d=1;for(b=a.length;d<
b;++d)a[d-1]!==a[d]?(c[f]=a[d-1],c[f+1]=e,e=1,f+=2):++e;c[f]=a[a.length-1];c[f+1]=e;return c}function J(a,b){var c=a.length;b||(b=new a.constructor(c));c&&(b[0]=a[0]);for(var d=1;d<c;++d)b[d]=a[d]+b[d-1];return b}function K(a,b){var c=a.length;b||(b=new a.constructor(c));b[0]=a[0];for(var d=1;d<c;++d)b[d]=a[d]-a[d-1];return b}function y(a,b){var c=a instanceof Int8Array?127:32767,d=-c-1,f=a.length,e,h;if(!b){for(e=b=0;e<f;++e)a[e]<c&&a[e]>d&&++b;b=new Int32Array(b)}for(h=e=0;e<f;){for(var g=0;a[e]===
c||a[e]===d;)g+=a[e],++e;g+=a[e];++e;b[h]=g;++h}return b}function Y(a){var b=k(DataView,a),c=b.getInt32(0);b=b.getInt32(4);var d=a.subarray(8,12);a=a.subarray(12);return[c,a,b,d]}function u(a,b,c,d){var f=new ArrayBuffer(12+d.byteLength),e=new Uint8Array(f);f=new DataView(f);f.setInt32(0,a);f.setInt32(4,b);c&&e.set(c,8);e.set(d,12);return e}function O(a){var b=a.length;a=k(Uint8Array,a);return u(2,b,void 0,a)}function P(a){var b=a.length;a=t(a);return u(4,b,void 0,a)}function Q(a,b){var c=a.length/
b;b=t([b]);a=k(Uint8Array,a);return u(5,c,b,a)}function R(a){var b=a.length;a=t(D(a));return u(6,b,void 0,a)}function E(a){var b=a.length;a=t(D(K(a)));return u(8,b,void 0,a)}function Z(a,b){var c=a.length,d=t([b]);a=t(D(I(a,b)));return u(9,c,d,a)}function C(a,b){var c=a.length,d=t([b]);b=K(I(a,b),void 0);var f,e=b.length;for(f=a=0;f<e;++f){var h=b[f];0===h?++a:a=32767===h||-32768===h?a+2:0<h?a+Math.ceil(h/32767):a+Math.ceil(h/-32768)}a=new Int16Array(a);var g=0;for(f=0;f<e;++f){h=b[f];if(0<=h)for(;32767<=
h;)a[g]=32767,++g,h-=32767;else for(;-32768>=h;)a[g]=-32768,++g,h-=-32768;a[g]=h;++g}b=void 0;h=a.length;b||(b=new Uint8Array(2*h));f=k(DataView,b);for(e=0;e<h;++e)f.setInt16(2*e,a[e]);a=k(Uint8Array,b);return u(10,c,d,a)}function S(a){var b={};T.forEach(function(c){void 0!==a[c]&&(b[c]=a[c])});a.bondAtomList&&(b.bondAtomList=P(a.bondAtomList));a.bondOrderList&&(b.bondOrderList=O(a.bondOrderList));b.xCoordList=C(a.xCoordList,1E3);b.yCoordList=C(a.yCoordList,1E3);b.zCoordList=C(a.zCoordList,1E3);a.bFactorList&&
(b.bFactorList=C(a.bFactorList,100));a.atomIdList&&(b.atomIdList=E(a.atomIdList));a.altLocList&&(b.altLocList=R(a.altLocList));a.occupancyList&&(b.occupancyList=Z(a.occupancyList,100));b.groupIdList=E(a.groupIdList);b.groupTypeList=P(a.groupTypeList);a.secStructList&&(b.secStructList=O(a.secStructList,1));a.insCodeList&&(b.insCodeList=R(a.insCodeList));a.sequenceIndexList&&(b.sequenceIndexList=E(a.sequenceIndexList));b.chainIdList=Q(a.chainIdList,4);a.chainNameList&&(b.chainNameList=Q(a.chainNameList,
4));return b}function U(a){function b(a){for(var b={},c=0;c<a;c++){var d=e();b[d]=e()}return b}function c(b){var c=a.subarray(h,h+b);h+=b;return c}function d(b){var c=a.subarray(h,h+b);h+=b;if(65535<b){b=[];for(var d=0;d<c.length;d+=65535)b.push(String.fromCharCode.apply(null,c.subarray(d,d+65535)));return b.join("")}return String.fromCharCode.apply(null,c)}function f(a){for(var b=Array(a),c=0;c<a;c++)b[c]=e();return b}function e(){var e=a[h];if(0===(e&128))return h++,e;if(128===(e&240))return h++,
b(e&15);if(144===(e&240))return h++,f(e&15);if(160===(e&224))return h++,d(e&31);if(224===(e&224))return e=g.getInt8(h),h++,e;switch(e){case 192:return h++,null;case 194:return h++,!1;case 195:return h++,!0;case 196:return e=g.getUint8(h+1),h+=2,c(e);case 197:return e=g.getUint16(h+1),h+=3,c(e);case 198:return e=g.getUint32(h+1),h+=5,c(e);case 202:return e=g.getFloat32(h+1),h+=5,e;case 203:return e=g.getFloat64(h+1),h+=9,e;case 204:return e=a[h+1],h+=2,e;case 205:return e=g.getUint16(h+1),h+=3,e;case 206:return e=
g.getUint32(h+1),h+=5,e;case 208:return e=g.getInt8(h+1),h+=2,e;case 209:return e=g.getInt16(h+1),h+=3,e;case 210:return e=g.getInt32(h+1),h+=5,e;case 217:return e=g.getUint8(h+1),h+=2,d(e);case 218:return e=g.getUint16(h+1),h+=3,d(e);case 219:return e=g.getUint32(h+1),h+=5,d(e);case 220:return e=g.getUint16(h+1),h+=3,f(e);case 221:return e=g.getUint32(h+1),h+=5,f(e);case 222:return e=g.getUint16(h+1),h+=3,b(e);case 223:return e=g.getUint32(h+1),h+=5,b(e)}throw Error("Unknown type 0x"+e.toString(16));
}var h=0,g=new DataView(a.buffer);return e()}function aa(a,b,c,d){switch(a){case 1:d=void 0;c=b.length;d||(d=new Float32Array(c/4));a=k(DataView,d);b=k(DataView,b);var f=0,e=0;for(c/=4;f<c;++f,e+=4)a.setFloat32(e,b.getFloat32(e),!0);return d;case 2:return k(Int8Array,b);case 3:return A(b);case 4:return r(b);case 5:return k(Uint8Array,b);case 6:return B(r(b),new Uint8Array(c));case 7:return B(r(b));case 8:return d=r(b),J(B(d),void 0);case 9:return a=r(b),d=r(d)[0],x(B(a,k(Int32Array,void 0,4)),d,void 0);
case 10:return a=A(b),d=r(d)[0],a=y(a,k(Int32Array,void 0,4)),b=k(Float32Array,a,4),x(J(a,k(Int32Array,b,4)),d,b);case 11:return x(A(b),r(d)[0]);case 12:return a=A(b),d=r(d)[0],x(y(a,k(Int32Array,void 0,4)),d,void 0);case 13:return a=k(Int8Array,b),d=r(d)[0],x(y(a,k(Int32Array,void 0,4)),d,void 0);case 14:return y(A(b));case 15:return y(k(Int8Array,b))}}function V(a,b){b=b||{};var c=b.ignoreFields,d={};ba.forEach(function(b){var e=c?-1!==c.indexOf(b):!1,f=a[b];e||void 0===f||(d[b]=f instanceof Uint8Array?
aa.apply(null,Y(f)):f)});return d}function W(a,b){a instanceof ArrayBuffer&&(a=new Uint8Array(a));a=a instanceof Uint8Array?U(a):a;return V(a,b)}function X(a,b,c,d){var f=new XMLHttpRequest;f.addEventListener("load",function(){try{var a=W(f.response);c(a)}catch(h){d(h)}},!0);f.addEventListener("error",d,!0);f.responseType="arraybuffer";f.open("GET",b+a.toUpperCase());f.send()}var T="mmtfVersion mmtfProducer unitCell spaceGroup structureId title depositionDate releaseDate experimentalMethods resolution rFree rWork bioAssemblyList ncsOperatorList entityList groupList numBonds numAtoms numGroups numChains numModels groupsPerChain chainsPerModel".split(" "),
ba=T.concat("xCoordList yCoordList zCoordList groupIdList groupTypeList chainIdList bFactorList atomIdList altLocList occupancyList secStructList insCodeList sequenceIndexList chainNameList bondAtomList bondOrderList".split(" "));g.encode=function(a){return H(S(a))};g.decode=W;g.traverse=function(a,b,c){c=c||{};c=c.firstModelOnly;var d=b.onModel,f=b.onChain,e=b.onGroup,g=b.onAtom;b=b.onBond;var l=0,k=0,n=0,m=0,q,r=-1,t=a.chainNameList,u=a.secStructList,A=a.insCodeList,x=a.sequenceIndexList,y=a.atomIdList,
B=a.bFactorList,C=a.altLocList,D=a.occupancyList,L=a.bondAtomList,E=a.bondOrderList,H;var I=0;for(H=a.chainsPerModel.length;I<H&&!(c&&0<l);++I){var F=a.chainsPerModel[l];d&&d({chainCount:F,modelIndex:l});for(q=0;q<F;++q){var G=a.groupsPerChain[k];if(f){var M=String.fromCharCode.apply(null,a.chainIdList.subarray(4*k,4*k+4)).replace(/\0/g,"");var p=null;t&&(p=String.fromCharCode.apply(null,t.subarray(4*k,4*k+4)).replace(/\0/g,""));f({groupCount:G,chainIndex:k,modelIndex:l,chainId:M,chainName:p})}for(M=
0;M<G;++M){var v=a.groupList[a.groupTypeList[n]],N=v.atomNameList.length;if(e){p=null;u&&(p=u[n]);var w=null;a.insCodeList&&(w=String.fromCharCode(A[n]));var z=null;x&&(z=x[n]);e({atomCount:N,groupIndex:n,chainIndex:k,modelIndex:l,groupId:a.groupIdList[n],groupType:a.groupTypeList[n],groupName:v.groupName,singleLetterCode:v.singleLetterCode,chemCompType:v.chemCompType,secStruct:p,insCode:w,sequenceIndex:z})}for(p=0;p<N;++p){if(g){w=null;y&&(w=y[m]);z=null;B&&(z=B[m]);var J=null;C&&(J=String.fromCharCode(C[m]));
var K=null;D&&(K=D[m]);g({atomIndex:m,groupIndex:n,chainIndex:k,modelIndex:l,atomId:w,element:v.elementList[p],atomName:v.atomNameList[p],formalCharge:v.formalChargeList[p],xCoord:a.xCoordList[m],yCoord:a.yCoordList[m],zCoord:a.zCoordList[m],bFactor:z,altLoc:J,occupancy:K})}m+=1}if(b)for(z=v.bondAtomList,p=0,w=v.bondOrderList.length;p<w;++p)b({atomIndex1:m-N+z[2*p],atomIndex2:m-N+z[2*p+1],bondOrder:v.bondOrderList[p]});n+=1}k+=1}q=r+1;r=m-1;if(b&&L)for(p=0,w=L.length;p<w;p+=2)F=L[p],G=L[p+1],(F>=
q&&F<=r||G>=q&&G<=r)&&b({atomIndex1:F,atomIndex2:G,bondOrder:E?E[p/2]:null});l+=1}};g.fetch=function(a,b,c){X(a,"http://mmtf.rcsb.org/v1.0/full/",b,c)};g.fetchReduced=function(a,b,c){X(a,"http://mmtf.rcsb.org/v1.0/reduced/",b,c)};g.version="v1.0.0";g.fetchUrl="http://mmtf.rcsb.org/v1.0/full/";g.fetchReducedUrl="http://mmtf.rcsb.org/v1.0/reduced/";g.encodeMsgpack=H;g.encodeMmtf=S;g.decodeMsgpack=U;g.decodeMmtf=V;Object.defineProperty(g,"__esModule",{value:!0})});