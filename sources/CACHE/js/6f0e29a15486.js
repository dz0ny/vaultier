var CryptoJS=CryptoJS||(function(Math,undefined){var C={};var C_lib=C.lib={};var Base=C_lib.Base=(function(){function F(){}
return{extend:function(overrides){F.prototype=this;var subtype=new F();if(overrides){subtype.mixIn(overrides);}
if(!subtype.hasOwnProperty('init')){subtype.init=function(){subtype.$super.init.apply(this,arguments);};}
subtype.init.prototype=subtype;subtype.$super=this;return subtype;},create:function(){var instance=this.extend();instance.init.apply(instance,arguments);return instance;},init:function(){},mixIn:function(properties){for(var propertyName in properties){if(properties.hasOwnProperty(propertyName)){this[propertyName]=properties[propertyName];}}
if(properties.hasOwnProperty('toString')){this.toString=properties.toString;}},clone:function(){return this.init.prototype.extend(this);}};}());var WordArray=C_lib.WordArray=Base.extend({init:function(words,sigBytes){words=this.words=words||[];if(sigBytes!=undefined){this.sigBytes=sigBytes;}else{this.sigBytes=words.length*4;}},toString:function(encoder){return(encoder||Hex).stringify(this);},concat:function(wordArray){var thisWords=this.words;var thatWords=wordArray.words;var thisSigBytes=this.sigBytes;var thatSigBytes=wordArray.sigBytes;this.clamp();if(thisSigBytes%4){for(var i=0;i<thatSigBytes;i++){var thatByte=(thatWords[i>>>2]>>>(24-(i%4)*8))&0xff;thisWords[(thisSigBytes+i)>>>2]|=thatByte<<(24-((thisSigBytes+i)%4)*8);}}else if(thatWords.length>0xffff){for(var i=0;i<thatSigBytes;i+=4){thisWords[(thisSigBytes+i)>>>2]=thatWords[i>>>2];}}else{thisWords.push.apply(thisWords,thatWords);}
this.sigBytes+=thatSigBytes;return this;},clamp:function(){var words=this.words;var sigBytes=this.sigBytes;words[sigBytes>>>2]&=0xffffffff<<(32-(sigBytes%4)*8);words.length=Math.ceil(sigBytes/4);},clone:function(){var clone=Base.clone.call(this);clone.words=this.words.slice(0);return clone;},random:function(nBytes){var words=[];for(var i=0;i<nBytes;i+=4){words.push((Math.random()*0x100000000)|0);}
return new WordArray.init(words,nBytes);}});var C_enc=C.enc={};var Hex=C_enc.Hex={stringify:function(wordArray){var words=wordArray.words;var sigBytes=wordArray.sigBytes;var hexChars=[];for(var i=0;i<sigBytes;i++){var bite=(words[i>>>2]>>>(24-(i%4)*8))&0xff;hexChars.push((bite>>>4).toString(16));hexChars.push((bite&0x0f).toString(16));}
return hexChars.join('');},parse:function(hexStr){var hexStrLength=hexStr.length;var words=[];for(var i=0;i<hexStrLength;i+=2){words[i>>>3]|=parseInt(hexStr.substr(i,2),16)<<(24-(i%8)*4);}
return new WordArray.init(words,hexStrLength/2);}};var Latin1=C_enc.Latin1={stringify:function(wordArray){var words=wordArray.words;var sigBytes=wordArray.sigBytes;var latin1Chars=[];for(var i=0;i<sigBytes;i++){var bite=(words[i>>>2]>>>(24-(i%4)*8))&0xff;latin1Chars.push(String.fromCharCode(bite));}
return latin1Chars.join('');},parse:function(latin1Str){var latin1StrLength=latin1Str.length;var words=[];for(var i=0;i<latin1StrLength;i++){words[i>>>2]|=(latin1Str.charCodeAt(i)&0xff)<<(24-(i%4)*8);}
return new WordArray.init(words,latin1StrLength);}};var Utf8=C_enc.Utf8={stringify:function(wordArray){try{return decodeURIComponent(escape(Latin1.stringify(wordArray)));}catch(e){throw new Error('Malformed UTF-8 data');}},parse:function(utf8Str){return Latin1.parse(unescape(encodeURIComponent(utf8Str)));}};var BufferedBlockAlgorithm=C_lib.BufferedBlockAlgorithm=Base.extend({reset:function(){this._data=new WordArray.init();this._nDataBytes=0;},_append:function(data){if(typeof data=='string'){data=Utf8.parse(data);}
this._data.concat(data);this._nDataBytes+=data.sigBytes;},_process:function(doFlush){var data=this._data;var dataWords=data.words;var dataSigBytes=data.sigBytes;var blockSize=this.blockSize;var blockSizeBytes=blockSize*4;var nBlocksReady=dataSigBytes/blockSizeBytes;if(doFlush){nBlocksReady=Math.ceil(nBlocksReady);}else{nBlocksReady=Math.max((nBlocksReady|0)-this._minBufferSize,0);}
var nWordsReady=nBlocksReady*blockSize;var nBytesReady=Math.min(nWordsReady*4,dataSigBytes);if(nWordsReady){for(var offset=0;offset<nWordsReady;offset+=blockSize){this._doProcessBlock(dataWords,offset);}
var processedWords=dataWords.splice(0,nWordsReady);data.sigBytes-=nBytesReady;}
return new WordArray.init(processedWords,nBytesReady);},clone:function(){var clone=Base.clone.call(this);clone._data=this._data.clone();return clone;},_minBufferSize:0});var Hasher=C_lib.Hasher=BufferedBlockAlgorithm.extend({cfg:Base.extend(),init:function(cfg){this.cfg=this.cfg.extend(cfg);this.reset();},reset:function(){BufferedBlockAlgorithm.reset.call(this);this._doReset();},update:function(messageUpdate){this._append(messageUpdate);this._process();return this;},finalize:function(messageUpdate){if(messageUpdate){this._append(messageUpdate);}
var hash=this._doFinalize();return hash;},blockSize:512/32,_createHelper:function(hasher){return function(message,cfg){return new hasher.init(cfg).finalize(message);};},_createHmacHelper:function(hasher){return function(message,key){return new C_algo.HMAC.init(hasher,key).finalize(message);};}});var C_algo=C.algo={};return C;}(Math));(function(){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var C_enc=C.enc;var Base64=C_enc.Base64={stringify:function(wordArray){var words=wordArray.words;var sigBytes=wordArray.sigBytes;var map=this._map;wordArray.clamp();var base64Chars=[];for(var i=0;i<sigBytes;i+=3){var byte1=(words[i>>>2]>>>(24-(i%4)*8))&0xff;var byte2=(words[(i+1)>>>2]>>>(24-((i+1)%4)*8))&0xff;var byte3=(words[(i+2)>>>2]>>>(24-((i+2)%4)*8))&0xff;var triplet=(byte1<<16)|(byte2<<8)|byte3;for(var j=0;(j<4)&&(i+j*0.75<sigBytes);j++){base64Chars.push(map.charAt((triplet>>>(6*(3-j)))&0x3f));}}
var paddingChar=map.charAt(64);if(paddingChar){while(base64Chars.length%4){base64Chars.push(paddingChar);}}
return base64Chars.join('');},parse:function(base64Str){var base64StrLength=base64Str.length;var map=this._map;var paddingChar=map.charAt(64);if(paddingChar){var paddingIndex=base64Str.indexOf(paddingChar);if(paddingIndex!=-1){base64StrLength=paddingIndex;}}
var words=[];var nBytes=0;for(var i=0;i<base64StrLength;i++){if(i%4){var bits1=map.indexOf(base64Str.charAt(i-1))<<((i%4)*2);var bits2=map.indexOf(base64Str.charAt(i))>>>(6-(i%4)*2);words[nBytes>>>2]|=(bits1|bits2)<<(24-(nBytes%4)*8);nBytes++;}}
return WordArray.create(words,nBytes);},_map:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='};}());(function(Math){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var Hasher=C_lib.Hasher;var C_algo=C.algo;var T=[];(function(){for(var i=0;i<64;i++){T[i]=(Math.abs(Math.sin(i+1))*0x100000000)|0;}}());var MD5=C_algo.MD5=Hasher.extend({_doReset:function(){this._hash=new WordArray.init([0x67452301,0xefcdab89,0x98badcfe,0x10325476]);},_doProcessBlock:function(M,offset){for(var i=0;i<16;i++){var offset_i=offset+i;var M_offset_i=M[offset_i];M[offset_i]=((((M_offset_i<<8)|(M_offset_i>>>24))&0x00ff00ff)|(((M_offset_i<<24)|(M_offset_i>>>8))&0xff00ff00));}
var H=this._hash.words;var M_offset_0=M[offset+0];var M_offset_1=M[offset+1];var M_offset_2=M[offset+2];var M_offset_3=M[offset+3];var M_offset_4=M[offset+4];var M_offset_5=M[offset+5];var M_offset_6=M[offset+6];var M_offset_7=M[offset+7];var M_offset_8=M[offset+8];var M_offset_9=M[offset+9];var M_offset_10=M[offset+10];var M_offset_11=M[offset+11];var M_offset_12=M[offset+12];var M_offset_13=M[offset+13];var M_offset_14=M[offset+14];var M_offset_15=M[offset+15];var a=H[0];var b=H[1];var c=H[2];var d=H[3];a=FF(a,b,c,d,M_offset_0,7,T[0]);d=FF(d,a,b,c,M_offset_1,12,T[1]);c=FF(c,d,a,b,M_offset_2,17,T[2]);b=FF(b,c,d,a,M_offset_3,22,T[3]);a=FF(a,b,c,d,M_offset_4,7,T[4]);d=FF(d,a,b,c,M_offset_5,12,T[5]);c=FF(c,d,a,b,M_offset_6,17,T[6]);b=FF(b,c,d,a,M_offset_7,22,T[7]);a=FF(a,b,c,d,M_offset_8,7,T[8]);d=FF(d,a,b,c,M_offset_9,12,T[9]);c=FF(c,d,a,b,M_offset_10,17,T[10]);b=FF(b,c,d,a,M_offset_11,22,T[11]);a=FF(a,b,c,d,M_offset_12,7,T[12]);d=FF(d,a,b,c,M_offset_13,12,T[13]);c=FF(c,d,a,b,M_offset_14,17,T[14]);b=FF(b,c,d,a,M_offset_15,22,T[15]);a=GG(a,b,c,d,M_offset_1,5,T[16]);d=GG(d,a,b,c,M_offset_6,9,T[17]);c=GG(c,d,a,b,M_offset_11,14,T[18]);b=GG(b,c,d,a,M_offset_0,20,T[19]);a=GG(a,b,c,d,M_offset_5,5,T[20]);d=GG(d,a,b,c,M_offset_10,9,T[21]);c=GG(c,d,a,b,M_offset_15,14,T[22]);b=GG(b,c,d,a,M_offset_4,20,T[23]);a=GG(a,b,c,d,M_offset_9,5,T[24]);d=GG(d,a,b,c,M_offset_14,9,T[25]);c=GG(c,d,a,b,M_offset_3,14,T[26]);b=GG(b,c,d,a,M_offset_8,20,T[27]);a=GG(a,b,c,d,M_offset_13,5,T[28]);d=GG(d,a,b,c,M_offset_2,9,T[29]);c=GG(c,d,a,b,M_offset_7,14,T[30]);b=GG(b,c,d,a,M_offset_12,20,T[31]);a=HH(a,b,c,d,M_offset_5,4,T[32]);d=HH(d,a,b,c,M_offset_8,11,T[33]);c=HH(c,d,a,b,M_offset_11,16,T[34]);b=HH(b,c,d,a,M_offset_14,23,T[35]);a=HH(a,b,c,d,M_offset_1,4,T[36]);d=HH(d,a,b,c,M_offset_4,11,T[37]);c=HH(c,d,a,b,M_offset_7,16,T[38]);b=HH(b,c,d,a,M_offset_10,23,T[39]);a=HH(a,b,c,d,M_offset_13,4,T[40]);d=HH(d,a,b,c,M_offset_0,11,T[41]);c=HH(c,d,a,b,M_offset_3,16,T[42]);b=HH(b,c,d,a,M_offset_6,23,T[43]);a=HH(a,b,c,d,M_offset_9,4,T[44]);d=HH(d,a,b,c,M_offset_12,11,T[45]);c=HH(c,d,a,b,M_offset_15,16,T[46]);b=HH(b,c,d,a,M_offset_2,23,T[47]);a=II(a,b,c,d,M_offset_0,6,T[48]);d=II(d,a,b,c,M_offset_7,10,T[49]);c=II(c,d,a,b,M_offset_14,15,T[50]);b=II(b,c,d,a,M_offset_5,21,T[51]);a=II(a,b,c,d,M_offset_12,6,T[52]);d=II(d,a,b,c,M_offset_3,10,T[53]);c=II(c,d,a,b,M_offset_10,15,T[54]);b=II(b,c,d,a,M_offset_1,21,T[55]);a=II(a,b,c,d,M_offset_8,6,T[56]);d=II(d,a,b,c,M_offset_15,10,T[57]);c=II(c,d,a,b,M_offset_6,15,T[58]);b=II(b,c,d,a,M_offset_13,21,T[59]);a=II(a,b,c,d,M_offset_4,6,T[60]);d=II(d,a,b,c,M_offset_11,10,T[61]);c=II(c,d,a,b,M_offset_2,15,T[62]);b=II(b,c,d,a,M_offset_9,21,T[63]);H[0]=(H[0]+a)|0;H[1]=(H[1]+b)|0;H[2]=(H[2]+c)|0;H[3]=(H[3]+d)|0;},_doFinalize:function(){var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;dataWords[nBitsLeft>>>5]|=0x80<<(24-nBitsLeft%32);var nBitsTotalH=Math.floor(nBitsTotal/0x100000000);var nBitsTotalL=nBitsTotal;dataWords[(((nBitsLeft+64)>>>9)<<4)+15]=((((nBitsTotalH<<8)|(nBitsTotalH>>>24))&0x00ff00ff)|(((nBitsTotalH<<24)|(nBitsTotalH>>>8))&0xff00ff00));dataWords[(((nBitsLeft+64)>>>9)<<4)+14]=((((nBitsTotalL<<8)|(nBitsTotalL>>>24))&0x00ff00ff)|(((nBitsTotalL<<24)|(nBitsTotalL>>>8))&0xff00ff00));data.sigBytes=(dataWords.length+1)*4;this._process();var hash=this._hash;var H=hash.words;for(var i=0;i<4;i++){var H_i=H[i];H[i]=(((H_i<<8)|(H_i>>>24))&0x00ff00ff)|(((H_i<<24)|(H_i>>>8))&0xff00ff00);}
return hash;},clone:function(){var clone=Hasher.clone.call(this);clone._hash=this._hash.clone();return clone;}});function FF(a,b,c,d,x,s,t){var n=a+((b&c)|(~b&d))+x+t;return((n<<s)|(n>>>(32-s)))+b;}
function GG(a,b,c,d,x,s,t){var n=a+((b&d)|(c&~d))+x+t;return((n<<s)|(n>>>(32-s)))+b;}
function HH(a,b,c,d,x,s,t){var n=a+(b^c^d)+x+t;return((n<<s)|(n>>>(32-s)))+b;}
function II(a,b,c,d,x,s,t){var n=a+(c^(b|~d))+x+t;return((n<<s)|(n>>>(32-s)))+b;}
C.MD5=Hasher._createHelper(MD5);C.HmacMD5=Hasher._createHmacHelper(MD5);}(Math));(function(){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var Hasher=C_lib.Hasher;var C_algo=C.algo;var W=[];var SHA1=C_algo.SHA1=Hasher.extend({_doReset:function(){this._hash=new WordArray.init([0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0]);},_doProcessBlock:function(M,offset){var H=this._hash.words;var a=H[0];var b=H[1];var c=H[2];var d=H[3];var e=H[4];for(var i=0;i<80;i++){if(i<16){W[i]=M[offset+i]|0;}else{var n=W[i-3]^W[i-8]^W[i-14]^W[i-16];W[i]=(n<<1)|(n>>>31);}
var t=((a<<5)|(a>>>27))+e+W[i];if(i<20){t+=((b&c)|(~b&d))+0x5a827999;}else if(i<40){t+=(b^c^d)+0x6ed9eba1;}else if(i<60){t+=((b&c)|(b&d)|(c&d))-0x70e44324;}else{t+=(b^c^d)-0x359d3e2a;}
e=d;d=c;c=(b<<30)|(b>>>2);b=a;a=t;}
H[0]=(H[0]+a)|0;H[1]=(H[1]+b)|0;H[2]=(H[2]+c)|0;H[3]=(H[3]+d)|0;H[4]=(H[4]+e)|0;},_doFinalize:function(){var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;dataWords[nBitsLeft>>>5]|=0x80<<(24-nBitsLeft%32);dataWords[(((nBitsLeft+64)>>>9)<<4)+14]=Math.floor(nBitsTotal/0x100000000);dataWords[(((nBitsLeft+64)>>>9)<<4)+15]=nBitsTotal;data.sigBytes=dataWords.length*4;this._process();return this._hash;},clone:function(){var clone=Hasher.clone.call(this);clone._hash=this._hash.clone();return clone;}});C.SHA1=Hasher._createHelper(SHA1);C.HmacSHA1=Hasher._createHmacHelper(SHA1);}());(function(Math){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var Hasher=C_lib.Hasher;var C_algo=C.algo;var H=[];var K=[];(function(){function isPrime(n){var sqrtN=Math.sqrt(n);for(var factor=2;factor<=sqrtN;factor++){if(!(n%factor)){return false;}}
return true;}
function getFractionalBits(n){return((n-(n|0))*0x100000000)|0;}
var n=2;var nPrime=0;while(nPrime<64){if(isPrime(n)){if(nPrime<8){H[nPrime]=getFractionalBits(Math.pow(n,1/2));}
K[nPrime]=getFractionalBits(Math.pow(n,1/3));nPrime++;}
n++;}}());var W=[];var SHA256=C_algo.SHA256=Hasher.extend({_doReset:function(){this._hash=new WordArray.init(H.slice(0));},_doProcessBlock:function(M,offset){var H=this._hash.words;var a=H[0];var b=H[1];var c=H[2];var d=H[3];var e=H[4];var f=H[5];var g=H[6];var h=H[7];for(var i=0;i<64;i++){if(i<16){W[i]=M[offset+i]|0;}else{var gamma0x=W[i-15];var gamma0=((gamma0x<<25)|(gamma0x>>>7))^((gamma0x<<14)|(gamma0x>>>18))^(gamma0x>>>3);var gamma1x=W[i-2];var gamma1=((gamma1x<<15)|(gamma1x>>>17))^((gamma1x<<13)|(gamma1x>>>19))^(gamma1x>>>10);W[i]=gamma0+W[i-7]+gamma1+W[i-16];}
var ch=(e&f)^(~e&g);var maj=(a&b)^(a&c)^(b&c);var sigma0=((a<<30)|(a>>>2))^((a<<19)|(a>>>13))^((a<<10)|(a>>>22));var sigma1=((e<<26)|(e>>>6))^((e<<21)|(e>>>11))^((e<<7)|(e>>>25));var t1=h+sigma1+ch+K[i]+W[i];var t2=sigma0+maj;h=g;g=f;f=e;e=(d+t1)|0;d=c;c=b;b=a;a=(t1+t2)|0;}
H[0]=(H[0]+a)|0;H[1]=(H[1]+b)|0;H[2]=(H[2]+c)|0;H[3]=(H[3]+d)|0;H[4]=(H[4]+e)|0;H[5]=(H[5]+f)|0;H[6]=(H[6]+g)|0;H[7]=(H[7]+h)|0;},_doFinalize:function(){var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;dataWords[nBitsLeft>>>5]|=0x80<<(24-nBitsLeft%32);dataWords[(((nBitsLeft+64)>>>9)<<4)+14]=Math.floor(nBitsTotal/0x100000000);dataWords[(((nBitsLeft+64)>>>9)<<4)+15]=nBitsTotal;data.sigBytes=dataWords.length*4;this._process();return this._hash;},clone:function(){var clone=Hasher.clone.call(this);clone._hash=this._hash.clone();return clone;}});C.SHA256=Hasher._createHelper(SHA256);C.HmacSHA256=Hasher._createHmacHelper(SHA256);}(Math));(function(Math){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var Hasher=C_lib.Hasher;var C_algo=C.algo;var _zl=WordArray.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]);var _zr=WordArray.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]);var _sl=WordArray.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]);var _sr=WordArray.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]);var _hl=WordArray.create([0x00000000,0x5A827999,0x6ED9EBA1,0x8F1BBCDC,0xA953FD4E]);var _hr=WordArray.create([0x50A28BE6,0x5C4DD124,0x6D703EF3,0x7A6D76E9,0x00000000]);var RIPEMD160=C_algo.RIPEMD160=Hasher.extend({_doReset:function(){this._hash=WordArray.create([0x67452301,0xEFCDAB89,0x98BADCFE,0x10325476,0xC3D2E1F0]);},_doProcessBlock:function(M,offset){for(var i=0;i<16;i++){var offset_i=offset+i;var M_offset_i=M[offset_i];M[offset_i]=((((M_offset_i<<8)|(M_offset_i>>>24))&0x00ff00ff)|(((M_offset_i<<24)|(M_offset_i>>>8))&0xff00ff00));}
var H=this._hash.words;var hl=_hl.words;var hr=_hr.words;var zl=_zl.words;var zr=_zr.words;var sl=_sl.words;var sr=_sr.words;var al,bl,cl,dl,el;var ar,br,cr,dr,er;ar=al=H[0];br=bl=H[1];cr=cl=H[2];dr=dl=H[3];er=el=H[4];var t;for(var i=0;i<80;i+=1){t=(al+M[offset+zl[i]])|0;if(i<16){t+=f1(bl,cl,dl)+hl[0];}else if(i<32){t+=f2(bl,cl,dl)+hl[1];}else if(i<48){t+=f3(bl,cl,dl)+hl[2];}else if(i<64){t+=f4(bl,cl,dl)+hl[3];}else{t+=f5(bl,cl,dl)+hl[4];}
t=t|0;t=rotl(t,sl[i]);t=(t+el)|0;al=el;el=dl;dl=rotl(cl,10);cl=bl;bl=t;t=(ar+M[offset+zr[i]])|0;if(i<16){t+=f5(br,cr,dr)+hr[0];}else if(i<32){t+=f4(br,cr,dr)+hr[1];}else if(i<48){t+=f3(br,cr,dr)+hr[2];}else if(i<64){t+=f2(br,cr,dr)+hr[3];}else{t+=f1(br,cr,dr)+hr[4];}
t=t|0;t=rotl(t,sr[i]);t=(t+er)|0;ar=er;er=dr;dr=rotl(cr,10);cr=br;br=t;}
t=(H[1]+cl+dr)|0;H[1]=(H[2]+dl+er)|0;H[2]=(H[3]+el+ar)|0;H[3]=(H[4]+al+br)|0;H[4]=(H[0]+bl+cr)|0;H[0]=t;},_doFinalize:function(){var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;dataWords[nBitsLeft>>>5]|=0x80<<(24-nBitsLeft%32);dataWords[(((nBitsLeft+64)>>>9)<<4)+14]=((((nBitsTotal<<8)|(nBitsTotal>>>24))&0x00ff00ff)|(((nBitsTotal<<24)|(nBitsTotal>>>8))&0xff00ff00));data.sigBytes=(dataWords.length+1)*4;this._process();var hash=this._hash;var H=hash.words;for(var i=0;i<5;i++){var H_i=H[i];H[i]=(((H_i<<8)|(H_i>>>24))&0x00ff00ff)|(((H_i<<24)|(H_i>>>8))&0xff00ff00);}
return hash;},clone:function(){var clone=Hasher.clone.call(this);clone._hash=this._hash.clone();return clone;}});function f1(x,y,z){return((x)^(y)^(z));}
function f2(x,y,z){return(((x)&(y))|((~x)&(z)));}
function f3(x,y,z){return(((x)|(~(y)))^(z));}
function f4(x,y,z){return(((x)&(z))|((y)&(~(z))));}
function f5(x,y,z){return((x)^((y)|(~(z))));}
function rotl(x,n){return(x<<n)|(x>>>(32-n));}
C.RIPEMD160=Hasher._createHelper(RIPEMD160);C.HmacRIPEMD160=Hasher._createHmacHelper(RIPEMD160);}(Math));(function(undefined){var C=CryptoJS;var C_lib=C.lib;var Base=C_lib.Base;var X32WordArray=C_lib.WordArray;var C_x64=C.x64={};var X64Word=C_x64.Word=Base.extend({init:function(high,low){this.high=high;this.low=low;}});var X64WordArray=C_x64.WordArray=Base.extend({init:function(words,sigBytes){words=this.words=words||[];if(sigBytes!=undefined){this.sigBytes=sigBytes;}else{this.sigBytes=words.length*8;}},toX32:function(){var x64Words=this.words;var x64WordsLength=x64Words.length;var x32Words=[];for(var i=0;i<x64WordsLength;i++){var x64Word=x64Words[i];x32Words.push(x64Word.high);x32Words.push(x64Word.low);}
return X32WordArray.create(x32Words,this.sigBytes);},clone:function(){var clone=Base.clone.call(this);var words=clone.words=this.words.slice(0);var wordsLength=words.length;for(var i=0;i<wordsLength;i++){words[i]=words[i].clone();}
return clone;}});}());(function(){var C=CryptoJS;var C_lib=C.lib;var Hasher=C_lib.Hasher;var C_x64=C.x64;var X64Word=C_x64.Word;var X64WordArray=C_x64.WordArray;var C_algo=C.algo;function X64Word_create(){return X64Word.create.apply(X64Word,arguments);}
var K=[X64Word_create(0x428a2f98,0xd728ae22),X64Word_create(0x71374491,0x23ef65cd),X64Word_create(0xb5c0fbcf,0xec4d3b2f),X64Word_create(0xe9b5dba5,0x8189dbbc),X64Word_create(0x3956c25b,0xf348b538),X64Word_create(0x59f111f1,0xb605d019),X64Word_create(0x923f82a4,0xaf194f9b),X64Word_create(0xab1c5ed5,0xda6d8118),X64Word_create(0xd807aa98,0xa3030242),X64Word_create(0x12835b01,0x45706fbe),X64Word_create(0x243185be,0x4ee4b28c),X64Word_create(0x550c7dc3,0xd5ffb4e2),X64Word_create(0x72be5d74,0xf27b896f),X64Word_create(0x80deb1fe,0x3b1696b1),X64Word_create(0x9bdc06a7,0x25c71235),X64Word_create(0xc19bf174,0xcf692694),X64Word_create(0xe49b69c1,0x9ef14ad2),X64Word_create(0xefbe4786,0x384f25e3),X64Word_create(0x0fc19dc6,0x8b8cd5b5),X64Word_create(0x240ca1cc,0x77ac9c65),X64Word_create(0x2de92c6f,0x592b0275),X64Word_create(0x4a7484aa,0x6ea6e483),X64Word_create(0x5cb0a9dc,0xbd41fbd4),X64Word_create(0x76f988da,0x831153b5),X64Word_create(0x983e5152,0xee66dfab),X64Word_create(0xa831c66d,0x2db43210),X64Word_create(0xb00327c8,0x98fb213f),X64Word_create(0xbf597fc7,0xbeef0ee4),X64Word_create(0xc6e00bf3,0x3da88fc2),X64Word_create(0xd5a79147,0x930aa725),X64Word_create(0x06ca6351,0xe003826f),X64Word_create(0x14292967,0x0a0e6e70),X64Word_create(0x27b70a85,0x46d22ffc),X64Word_create(0x2e1b2138,0x5c26c926),X64Word_create(0x4d2c6dfc,0x5ac42aed),X64Word_create(0x53380d13,0x9d95b3df),X64Word_create(0x650a7354,0x8baf63de),X64Word_create(0x766a0abb,0x3c77b2a8),X64Word_create(0x81c2c92e,0x47edaee6),X64Word_create(0x92722c85,0x1482353b),X64Word_create(0xa2bfe8a1,0x4cf10364),X64Word_create(0xa81a664b,0xbc423001),X64Word_create(0xc24b8b70,0xd0f89791),X64Word_create(0xc76c51a3,0x0654be30),X64Word_create(0xd192e819,0xd6ef5218),X64Word_create(0xd6990624,0x5565a910),X64Word_create(0xf40e3585,0x5771202a),X64Word_create(0x106aa070,0x32bbd1b8),X64Word_create(0x19a4c116,0xb8d2d0c8),X64Word_create(0x1e376c08,0x5141ab53),X64Word_create(0x2748774c,0xdf8eeb99),X64Word_create(0x34b0bcb5,0xe19b48a8),X64Word_create(0x391c0cb3,0xc5c95a63),X64Word_create(0x4ed8aa4a,0xe3418acb),X64Word_create(0x5b9cca4f,0x7763e373),X64Word_create(0x682e6ff3,0xd6b2b8a3),X64Word_create(0x748f82ee,0x5defb2fc),X64Word_create(0x78a5636f,0x43172f60),X64Word_create(0x84c87814,0xa1f0ab72),X64Word_create(0x8cc70208,0x1a6439ec),X64Word_create(0x90befffa,0x23631e28),X64Word_create(0xa4506ceb,0xde82bde9),X64Word_create(0xbef9a3f7,0xb2c67915),X64Word_create(0xc67178f2,0xe372532b),X64Word_create(0xca273ece,0xea26619c),X64Word_create(0xd186b8c7,0x21c0c207),X64Word_create(0xeada7dd6,0xcde0eb1e),X64Word_create(0xf57d4f7f,0xee6ed178),X64Word_create(0x06f067aa,0x72176fba),X64Word_create(0x0a637dc5,0xa2c898a6),X64Word_create(0x113f9804,0xbef90dae),X64Word_create(0x1b710b35,0x131c471b),X64Word_create(0x28db77f5,0x23047d84),X64Word_create(0x32caab7b,0x40c72493),X64Word_create(0x3c9ebe0a,0x15c9bebc),X64Word_create(0x431d67c4,0x9c100d4c),X64Word_create(0x4cc5d4be,0xcb3e42b6),X64Word_create(0x597f299c,0xfc657e2a),X64Word_create(0x5fcb6fab,0x3ad6faec),X64Word_create(0x6c44198c,0x4a475817)];var W=[];(function(){for(var i=0;i<80;i++){W[i]=X64Word_create();}}());var SHA512=C_algo.SHA512=Hasher.extend({_doReset:function(){this._hash=new X64WordArray.init([new X64Word.init(0x6a09e667,0xf3bcc908),new X64Word.init(0xbb67ae85,0x84caa73b),new X64Word.init(0x3c6ef372,0xfe94f82b),new X64Word.init(0xa54ff53a,0x5f1d36f1),new X64Word.init(0x510e527f,0xade682d1),new X64Word.init(0x9b05688c,0x2b3e6c1f),new X64Word.init(0x1f83d9ab,0xfb41bd6b),new X64Word.init(0x5be0cd19,0x137e2179)]);},_doProcessBlock:function(M,offset){var H=this._hash.words;var H0=H[0];var H1=H[1];var H2=H[2];var H3=H[3];var H4=H[4];var H5=H[5];var H6=H[6];var H7=H[7];var H0h=H0.high;var H0l=H0.low;var H1h=H1.high;var H1l=H1.low;var H2h=H2.high;var H2l=H2.low;var H3h=H3.high;var H3l=H3.low;var H4h=H4.high;var H4l=H4.low;var H5h=H5.high;var H5l=H5.low;var H6h=H6.high;var H6l=H6.low;var H7h=H7.high;var H7l=H7.low;var ah=H0h;var al=H0l;var bh=H1h;var bl=H1l;var ch=H2h;var cl=H2l;var dh=H3h;var dl=H3l;var eh=H4h;var el=H4l;var fh=H5h;var fl=H5l;var gh=H6h;var gl=H6l;var hh=H7h;var hl=H7l;for(var i=0;i<80;i++){var Wi=W[i];if(i<16){var Wih=Wi.high=M[offset+i*2]|0;var Wil=Wi.low=M[offset+i*2+1]|0;}else{var gamma0x=W[i-15];var gamma0xh=gamma0x.high;var gamma0xl=gamma0x.low;var gamma0h=((gamma0xh>>>1)|(gamma0xl<<31))^((gamma0xh>>>8)|(gamma0xl<<24))^(gamma0xh>>>7);var gamma0l=((gamma0xl>>>1)|(gamma0xh<<31))^((gamma0xl>>>8)|(gamma0xh<<24))^((gamma0xl>>>7)|(gamma0xh<<25));var gamma1x=W[i-2];var gamma1xh=gamma1x.high;var gamma1xl=gamma1x.low;var gamma1h=((gamma1xh>>>19)|(gamma1xl<<13))^((gamma1xh<<3)|(gamma1xl>>>29))^(gamma1xh>>>6);var gamma1l=((gamma1xl>>>19)|(gamma1xh<<13))^((gamma1xl<<3)|(gamma1xh>>>29))^((gamma1xl>>>6)|(gamma1xh<<26));var Wi7=W[i-7];var Wi7h=Wi7.high;var Wi7l=Wi7.low;var Wi16=W[i-16];var Wi16h=Wi16.high;var Wi16l=Wi16.low;var Wil=gamma0l+Wi7l;var Wih=gamma0h+Wi7h+((Wil>>>0)<(gamma0l>>>0)?1:0);var Wil=Wil+gamma1l;var Wih=Wih+gamma1h+((Wil>>>0)<(gamma1l>>>0)?1:0);var Wil=Wil+Wi16l;var Wih=Wih+Wi16h+((Wil>>>0)<(Wi16l>>>0)?1:0);Wi.high=Wih;Wi.low=Wil;}
var chh=(eh&fh)^(~eh&gh);var chl=(el&fl)^(~el&gl);var majh=(ah&bh)^(ah&ch)^(bh&ch);var majl=(al&bl)^(al&cl)^(bl&cl);var sigma0h=((ah>>>28)|(al<<4))^((ah<<30)|(al>>>2))^((ah<<25)|(al>>>7));var sigma0l=((al>>>28)|(ah<<4))^((al<<30)|(ah>>>2))^((al<<25)|(ah>>>7));var sigma1h=((eh>>>14)|(el<<18))^((eh>>>18)|(el<<14))^((eh<<23)|(el>>>9));var sigma1l=((el>>>14)|(eh<<18))^((el>>>18)|(eh<<14))^((el<<23)|(eh>>>9));var Ki=K[i];var Kih=Ki.high;var Kil=Ki.low;var t1l=hl+sigma1l;var t1h=hh+sigma1h+((t1l>>>0)<(hl>>>0)?1:0);var t1l=t1l+chl;var t1h=t1h+chh+((t1l>>>0)<(chl>>>0)?1:0);var t1l=t1l+Kil;var t1h=t1h+Kih+((t1l>>>0)<(Kil>>>0)?1:0);var t1l=t1l+Wil;var t1h=t1h+Wih+((t1l>>>0)<(Wil>>>0)?1:0);var t2l=sigma0l+majl;var t2h=sigma0h+majh+((t2l>>>0)<(sigma0l>>>0)?1:0);hh=gh;hl=gl;gh=fh;gl=fl;fh=eh;fl=el;el=(dl+t1l)|0;eh=(dh+t1h+((el>>>0)<(dl>>>0)?1:0))|0;dh=ch;dl=cl;ch=bh;cl=bl;bh=ah;bl=al;al=(t1l+t2l)|0;ah=(t1h+t2h+((al>>>0)<(t1l>>>0)?1:0))|0;}
H0l=H0.low=(H0l+al);H0.high=(H0h+ah+((H0l>>>0)<(al>>>0)?1:0));H1l=H1.low=(H1l+bl);H1.high=(H1h+bh+((H1l>>>0)<(bl>>>0)?1:0));H2l=H2.low=(H2l+cl);H2.high=(H2h+ch+((H2l>>>0)<(cl>>>0)?1:0));H3l=H3.low=(H3l+dl);H3.high=(H3h+dh+((H3l>>>0)<(dl>>>0)?1:0));H4l=H4.low=(H4l+el);H4.high=(H4h+eh+((H4l>>>0)<(el>>>0)?1:0));H5l=H5.low=(H5l+fl);H5.high=(H5h+fh+((H5l>>>0)<(fl>>>0)?1:0));H6l=H6.low=(H6l+gl);H6.high=(H6h+gh+((H6l>>>0)<(gl>>>0)?1:0));H7l=H7.low=(H7l+hl);H7.high=(H7h+hh+((H7l>>>0)<(hl>>>0)?1:0));},_doFinalize:function(){var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;dataWords[nBitsLeft>>>5]|=0x80<<(24-nBitsLeft%32);dataWords[(((nBitsLeft+128)>>>10)<<5)+30]=Math.floor(nBitsTotal/0x100000000);dataWords[(((nBitsLeft+128)>>>10)<<5)+31]=nBitsTotal;data.sigBytes=dataWords.length*4;this._process();var hash=this._hash.toX32();return hash;},clone:function(){var clone=Hasher.clone.call(this);clone._hash=this._hash.clone();return clone;},blockSize:1024/32});C.SHA512=Hasher._createHelper(SHA512);C.HmacSHA512=Hasher._createHmacHelper(SHA512);}());var dbits;var canary=0xdeadbeefcafe;var j_lm=((canary&0xffffff)==0xefcafe);function BigInteger(a,b,c){if(a!=null)
if("number"==typeof a)this.fromNumber(a,b,c);else if(b==null&&"string"!=typeof a)this.fromString(a,256);else this.fromString(a,b);}
function nbi(){return new BigInteger(null);}
function am1(i,x,w,j,c,n){while(--n>=0){var v=x*this[i++]+w[j]+c;c=Math.floor(v/0x4000000);w[j++]=v&0x3ffffff;}
return c;}
function am2(i,x,w,j,c,n){var xl=x&0x7fff,xh=x>>15;while(--n>=0){var l=this[i]&0x7fff;var h=this[i++]>>15;var m=xh*l+h*xl;l=xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);c=(l>>>30)+(m>>>15)+xh*h+(c>>>30);w[j++]=l&0x3fffffff;}
return c;}
function am3(i,x,w,j,c,n){var xl=x&0x3fff,xh=x>>14;while(--n>=0){var l=this[i]&0x3fff;var h=this[i++]>>14;var m=xh*l+h*xl;l=xl*l+((m&0x3fff)<<14)+w[j]+c;c=(l>>28)+(m>>14)+xh*h;w[j++]=l&0xfffffff;}
return c;}
if(j_lm&&(navigator.appName=="Microsoft Internet Explorer")){BigInteger.prototype.am=am2;dbits=30;}
else if(j_lm&&(navigator.appName!="Netscape")){BigInteger.prototype.am=am1;dbits=26;}
else{BigInteger.prototype.am=am3;dbits=28;}
BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=((1<<dbits)-1);BigInteger.prototype.DV=(1<<dbits);var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC=new Array();var rr,vv;rr="0".charCodeAt(0);for(vv=0;vv<=9;++vv)BI_RC[rr++]=vv;rr="a".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;rr="A".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;function int2char(n){return BI_RM.charAt(n);}
function intAt(s,i){var c=BI_RC[s.charCodeAt(i)];return(c==null)?-1:c;}
function bnpCopyTo(r){for(var i=this.t-1;i>=0;--i)r[i]=this[i];r.t=this.t;r.s=this.s;}
function bnpFromInt(x){this.t=1;this.s=(x<0)?-1:0;if(x>0)this[0]=x;else if(x<-1)this[0]=x+this.DV;else this.t=0;}
function nbv(i){var r=nbi();r.fromInt(i);return r;}
function bnpFromString(s,b){var k;if(b==16)k=4;else if(b==8)k=3;else if(b==256)k=8;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else{this.fromRadix(s,b);return;}
this.t=0;this.s=0;var i=s.length,mi=false,sh=0;while(--i>=0){var x=(k==8)?s[i]&0xff:intAt(s,i);if(x<0){if(s.charAt(i)=="-")mi=true;continue;}
mi=false;if(sh==0)
this[this.t++]=x;else if(sh+k>this.DB){this[this.t-1]|=(x&((1<<(this.DB-sh))-1))<<sh;this[this.t++]=(x>>(this.DB-sh));}
else
this[this.t-1]|=x<<sh;sh+=k;if(sh>=this.DB)sh-=this.DB;}
if(k==8&&(s[0]&0x80)!=0){this.s=-1;if(sh>0)this[this.t-1]|=((1<<(this.DB-sh))-1)<<sh;}
this.clamp();if(mi)BigInteger.ZERO.subTo(this,this);}
function bnpClamp(){var c=this.s&this.DM;while(this.t>0&&this[this.t-1]==c)--this.t;}
function bnToString(b){if(this.s<0)return"-"+this.negate().toString(b);var k;if(b==16)k=4;else if(b==8)k=3;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else return this.toRadix(b);var km=(1<<k)-1,d,m=false,r="",i=this.t;var p=this.DB-(i*this.DB)%k;if(i-->0){if(p<this.DB&&(d=this[i]>>p)>0){m=true;r=int2char(d);}
while(i>=0){if(p<k){d=(this[i]&((1<<p)-1))<<(k-p);d|=this[--i]>>(p+=this.DB-k);}
else{d=(this[i]>>(p-=k))&km;if(p<=0){p+=this.DB;--i;}}
if(d>0)m=true;if(m)r+=int2char(d);}}
return m?r:"0";}
function bnNegate(){var r=nbi();BigInteger.ZERO.subTo(this,r);return r;}
function bnAbs(){return(this.s<0)?this.negate():this;}
function bnCompareTo(a){var r=this.s-a.s;if(r!=0)return r;var i=this.t;r=i-a.t;if(r!=0)return(this.s<0)?-r:r;while(--i>=0)if((r=this[i]-a[i])!=0)return r;return 0;}
function nbits(x){var r=1,t;if((t=x>>>16)!=0){x=t;r+=16;}
if((t=x>>8)!=0){x=t;r+=8;}
if((t=x>>4)!=0){x=t;r+=4;}
if((t=x>>2)!=0){x=t;r+=2;}
if((t=x>>1)!=0){x=t;r+=1;}
return r;}
function bnBitLength(){if(this.t<=0)return 0;return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));}
function bnpDLShiftTo(n,r){var i;for(i=this.t-1;i>=0;--i)r[i+n]=this[i];for(i=n-1;i>=0;--i)r[i]=0;r.t=this.t+n;r.s=this.s;}
function bnpDRShiftTo(n,r){for(var i=n;i<this.t;++i)r[i-n]=this[i];r.t=Math.max(this.t-n,0);r.s=this.s;}
function bnpLShiftTo(n,r){var bs=n%this.DB;var cbs=this.DB-bs;var bm=(1<<cbs)-1;var ds=Math.floor(n/this.DB),c=(this.s<<bs)&this.DM,i;for(i=this.t-1;i>=0;--i){r[i+ds+1]=(this[i]>>cbs)|c;c=(this[i]&bm)<<bs;}
for(i=ds-1;i>=0;--i)r[i]=0;r[ds]=c;r.t=this.t+ds+1;r.s=this.s;r.clamp();}
function bnpRShiftTo(n,r){r.s=this.s;var ds=Math.floor(n/this.DB);if(ds>=this.t){r.t=0;return;}
var bs=n%this.DB;var cbs=this.DB-bs;var bm=(1<<bs)-1;r[0]=this[ds]>>bs;for(var i=ds+1;i<this.t;++i){r[i-ds-1]|=(this[i]&bm)<<cbs;r[i-ds]=this[i]>>bs;}
if(bs>0)r[this.t-ds-1]|=(this.s&bm)<<cbs;r.t=this.t-ds;r.clamp();}
function bnpSubTo(a,r){var i=0,c=0,m=Math.min(a.t,this.t);while(i<m){c+=this[i]-a[i];r[i++]=c&this.DM;c>>=this.DB;}
if(a.t<this.t){c-=a.s;while(i<this.t){c+=this[i];r[i++]=c&this.DM;c>>=this.DB;}
c+=this.s;}
else{c+=this.s;while(i<a.t){c-=a[i];r[i++]=c&this.DM;c>>=this.DB;}
c-=a.s;}
r.s=(c<0)?-1:0;if(c<-1)r[i++]=this.DV+c;else if(c>0)r[i++]=c;r.t=i;r.clamp();}
function bnpMultiplyTo(a,r){var x=this.abs(),y=a.abs();var i=x.t;r.t=i+y.t;while(--i>=0)r[i]=0;for(i=0;i<y.t;++i)r[i+x.t]=x.am(0,y[i],r,i,0,x.t);r.s=0;r.clamp();if(this.s!=a.s)BigInteger.ZERO.subTo(r,r);}
function bnpSquareTo(r){var x=this.abs();var i=r.t=2*x.t;while(--i>=0)r[i]=0;for(i=0;i<x.t-1;++i){var c=x.am(i,x[i],r,2*i,0,1);if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.DV){r[i+x.t]-=x.DV;r[i+x.t+1]=1;}}
if(r.t>0)r[r.t-1]+=x.am(i,x[i],r,2*i,0,1);r.s=0;r.clamp();}
function bnpDivRemTo(m,q,r){var pm=m.abs();if(pm.t<=0)return;var pt=this.abs();if(pt.t<pm.t){if(q!=null)q.fromInt(0);if(r!=null)this.copyTo(r);return;}
if(r==null)r=nbi();var y=nbi(),ts=this.s,ms=m.s;var nsh=this.DB-nbits(pm[pm.t-1]);if(nsh>0){pm.lShiftTo(nsh,y);pt.lShiftTo(nsh,r);}
else{pm.copyTo(y);pt.copyTo(r);}
var ys=y.t;var y0=y[ys-1];if(y0==0)return;var yt=y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);var d1=this.FV/yt,d2=(1<<this.F1)/yt,e=1<<this.F2;var i=r.t,j=i-ys,t=(q==null)?nbi():q;y.dlShiftTo(j,t);if(r.compareTo(t)>=0){r[r.t++]=1;r.subTo(t,r);}
BigInteger.ONE.dlShiftTo(ys,t);t.subTo(y,y);while(y.t<ys)y[y.t++]=0;while(--j>=0){var qd=(r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);if((r[i]+=y.am(0,qd,r,j,0,ys))<qd){y.dlShiftTo(j,t);r.subTo(t,r);while(r[i]<--qd)r.subTo(t,r);}}
if(q!=null){r.drShiftTo(ys,q);if(ts!=ms)BigInteger.ZERO.subTo(q,q);}
r.t=ys;r.clamp();if(nsh>0)r.rShiftTo(nsh,r);if(ts<0)BigInteger.ZERO.subTo(r,r);}
function bnMod(a){var r=nbi();this.abs().divRemTo(a,null,r);if(this.s<0&&r.compareTo(BigInteger.ZERO)>0)a.subTo(r,r);return r;}
function Classic(m){this.m=m;}
function cConvert(x){if(x.s<0||x.compareTo(this.m)>=0)return x.mod(this.m);else return x;}
function cRevert(x){return x;}
function cReduce(x){x.divRemTo(this.m,null,x);}
function cMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r);}
function cSqrTo(x,r){x.squareTo(r);this.reduce(r);}
Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;function bnpInvDigit(){if(this.t<1)return 0;var x=this[0];if((x&1)==0)return 0;var y=x&3;y=(y*(2-(x&0xf)*y))&0xf;y=(y*(2-(x&0xff)*y))&0xff;y=(y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;y=(y*(2-x*y%this.DV))%this.DV;return(y>0)?this.DV-y:-y;}
function Montgomery(m){this.m=m;this.mp=m.invDigit();this.mpl=this.mp&0x7fff;this.mph=this.mp>>15;this.um=(1<<(m.DB-15))-1;this.mt2=2*m.t;}
function montConvert(x){var r=nbi();x.abs().dlShiftTo(this.m.t,r);r.divRemTo(this.m,null,r);if(x.s<0&&r.compareTo(BigInteger.ZERO)>0)this.m.subTo(r,r);return r;}
function montRevert(x){var r=nbi();x.copyTo(r);this.reduce(r);return r;}
function montReduce(x){while(x.t<=this.mt2)
x[x.t++]=0;for(var i=0;i<this.m.t;++i){var j=x[i]&0x7fff;var u0=(j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;j=i+this.m.t;x[j]+=this.m.am(0,u0,x,i,0,this.m.t);while(x[j]>=x.DV){x[j]-=x.DV;x[++j]++;}}
x.clamp();x.drShiftTo(this.m.t,x);if(x.compareTo(this.m)>=0)x.subTo(this.m,x);}
function montSqrTo(x,r){x.squareTo(r);this.reduce(r);}
function montMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r);}
Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){return((this.t>0)?(this[0]&1):this.s)==0;}
function bnpExp(e,z){if(e>0xffffffff||e<1)return BigInteger.ONE;var r=nbi(),r2=nbi(),g=z.convert(this),i=nbits(e)-1;g.copyTo(r);while(--i>=0){z.sqrTo(r,r2);if((e&(1<<i))>0)z.mulTo(r2,g,r);else{var t=r;r=r2;r2=t;}}
return z.revert(r);}
function bnModPowInt(e,m){var z;if(e<256||m.isEven())z=new Classic(m);else z=new Montgomery(m);return this.exp(e,z);}
BigInteger.prototype.copyTo=bnpCopyTo;BigInteger.prototype.fromInt=bnpFromInt;BigInteger.prototype.fromString=bnpFromString;BigInteger.prototype.clamp=bnpClamp;BigInteger.prototype.dlShiftTo=bnpDLShiftTo;BigInteger.prototype.drShiftTo=bnpDRShiftTo;BigInteger.prototype.lShiftTo=bnpLShiftTo;BigInteger.prototype.rShiftTo=bnpRShiftTo;BigInteger.prototype.subTo=bnpSubTo;BigInteger.prototype.multiplyTo=bnpMultiplyTo;BigInteger.prototype.squareTo=bnpSquareTo;BigInteger.prototype.divRemTo=bnpDivRemTo;BigInteger.prototype.invDigit=bnpInvDigit;BigInteger.prototype.isEven=bnpIsEven;BigInteger.prototype.exp=bnpExp;BigInteger.prototype.toString=bnToString;BigInteger.prototype.negate=bnNegate;BigInteger.prototype.abs=bnAbs;BigInteger.prototype.compareTo=bnCompareTo;BigInteger.prototype.bitLength=bnBitLength;BigInteger.prototype.mod=bnMod;BigInteger.prototype.modPowInt=bnModPowInt;BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);function bnClone(){var r=nbi();this.copyTo(r);return r;}
function bnIntValue(){if(this.s<0){if(this.t==1)return this[0]-this.DV;else if(this.t==0)return-1;}
else if(this.t==1)return this[0];else if(this.t==0)return 0;return((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];}
function bnByteValue(){return(this.t==0)?this.s:(this[0]<<24)>>24;}
function bnShortValue(){return(this.t==0)?this.s:(this[0]<<16)>>16;}
function bnpChunkSize(r){return Math.floor(Math.LN2*this.DB/Math.log(r));}
function bnSigNum(){if(this.s<0)return-1;else if(this.t<=0||(this.t==1&&this[0]<=0))return 0;else return 1;}
function bnpToRadix(b){if(b==null)b=10;if(this.signum()==0||b<2||b>36)return"0";var cs=this.chunkSize(b);var a=Math.pow(b,cs);var d=nbv(a),y=nbi(),z=nbi(),r="";this.divRemTo(d,y,z);while(y.signum()>0){r=(a+z.intValue()).toString(b).substr(1)+r;y.divRemTo(d,y,z);}
return z.intValue().toString(b)+r;}
function bnpFromRadix(s,b){this.fromInt(0);if(b==null)b=10;var cs=this.chunkSize(b);var d=Math.pow(b,cs),mi=false,j=0,w=0;for(var i=0;i<s.length;++i){var x=intAt(s,i);if(x<0){if(s.charAt(i)=="-"&&this.signum()==0)mi=true;continue;}
w=b*w+x;if(++j>=cs){this.dMultiply(d);this.dAddOffset(w,0);j=0;w=0;}}
if(j>0){this.dMultiply(Math.pow(b,j));this.dAddOffset(w,0);}
if(mi)BigInteger.ZERO.subTo(this,this);}
function bnpFromNumber(a,b,c){if("number"==typeof b){if(a<2)this.fromInt(1);else{this.fromNumber(a,c);if(!this.testBit(a-1))
this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);if(this.isEven())this.dAddOffset(1,0);while(!this.isProbablePrime(b)){this.dAddOffset(2,0);if(this.bitLength()>a)this.subTo(BigInteger.ONE.shiftLeft(a-1),this);}}}
else{var x=new Array(),t=a&7;x.length=(a>>3)+1;b.nextBytes(x);if(t>0)x[0]&=((1<<t)-1);else x[0]=0;this.fromString(x,256);}}
function bnToByteArray(){var i=this.t,r=new Array();r[0]=this.s;var p=this.DB-(i*this.DB)%8,d,k=0;if(i-->0){if(p<this.DB&&(d=this[i]>>p)!=(this.s&this.DM)>>p)
r[k++]=d|(this.s<<(this.DB-p));while(i>=0){if(p<8){d=(this[i]&((1<<p)-1))<<(8-p);d|=this[--i]>>(p+=this.DB-8);}
else{d=(this[i]>>(p-=8))&0xff;if(p<=0){p+=this.DB;--i;}}
if((d&0x80)!=0)d|=-256;if(k==0&&(this.s&0x80)!=(d&0x80))++k;if(k>0||d!=this.s)r[k++]=d;}}
return r;}
function bnEquals(a){return(this.compareTo(a)==0);}
function bnMin(a){return(this.compareTo(a)<0)?this:a;}
function bnMax(a){return(this.compareTo(a)>0)?this:a;}
function bnpBitwiseTo(a,op,r){var i,f,m=Math.min(a.t,this.t);for(i=0;i<m;++i)r[i]=op(this[i],a[i]);if(a.t<this.t){f=a.s&this.DM;for(i=m;i<this.t;++i)r[i]=op(this[i],f);r.t=this.t;}
else{f=this.s&this.DM;for(i=m;i<a.t;++i)r[i]=op(f,a[i]);r.t=a.t;}
r.s=op(this.s,a.s);r.clamp();}
function op_and(x,y){return x&y;}
function bnAnd(a){var r=nbi();this.bitwiseTo(a,op_and,r);return r;}
function op_or(x,y){return x|y;}
function bnOr(a){var r=nbi();this.bitwiseTo(a,op_or,r);return r;}
function op_xor(x,y){return x^y;}
function bnXor(a){var r=nbi();this.bitwiseTo(a,op_xor,r);return r;}
function op_andnot(x,y){return x&~y;}
function bnAndNot(a){var r=nbi();this.bitwiseTo(a,op_andnot,r);return r;}
function bnNot(){var r=nbi();for(var i=0;i<this.t;++i)r[i]=this.DM&~this[i];r.t=this.t;r.s=~this.s;return r;}
function bnShiftLeft(n){var r=nbi();if(n<0)this.rShiftTo(-n,r);else this.lShiftTo(n,r);return r;}
function bnShiftRight(n){var r=nbi();if(n<0)this.lShiftTo(-n,r);else this.rShiftTo(n,r);return r;}
function lbit(x){if(x==0)return-1;var r=0;if((x&0xffff)==0){x>>=16;r+=16;}
if((x&0xff)==0){x>>=8;r+=8;}
if((x&0xf)==0){x>>=4;r+=4;}
if((x&3)==0){x>>=2;r+=2;}
if((x&1)==0)++r;return r;}
function bnGetLowestSetBit(){for(var i=0;i<this.t;++i)
if(this[i]!=0)return i*this.DB+lbit(this[i]);if(this.s<0)return this.t*this.DB;return-1;}
function cbit(x){var r=0;while(x!=0){x&=x-1;++r;}
return r;}
function bnBitCount(){var r=0,x=this.s&this.DM;for(var i=0;i<this.t;++i)r+=cbit(this[i]^x);return r;}
function bnTestBit(n){var j=Math.floor(n/this.DB);if(j>=this.t)return(this.s!=0);return((this[j]&(1<<(n%this.DB)))!=0);}
function bnpChangeBit(n,op){var r=BigInteger.ONE.shiftLeft(n);this.bitwiseTo(r,op,r);return r;}
function bnSetBit(n){return this.changeBit(n,op_or);}
function bnClearBit(n){return this.changeBit(n,op_andnot);}
function bnFlipBit(n){return this.changeBit(n,op_xor);}
function bnpAddTo(a,r){var i=0,c=0,m=Math.min(a.t,this.t);while(i<m){c+=this[i]+a[i];r[i++]=c&this.DM;c>>=this.DB;}
if(a.t<this.t){c+=a.s;while(i<this.t){c+=this[i];r[i++]=c&this.DM;c>>=this.DB;}
c+=this.s;}
else{c+=this.s;while(i<a.t){c+=a[i];r[i++]=c&this.DM;c>>=this.DB;}
c+=a.s;}
r.s=(c<0)?-1:0;if(c>0)r[i++]=c;else if(c<-1)r[i++]=this.DV+c;r.t=i;r.clamp();}
function bnAdd(a){var r=nbi();this.addTo(a,r);return r;}
function bnSubtract(a){var r=nbi();this.subTo(a,r);return r;}
function bnMultiply(a){var r=nbi();this.multiplyTo(a,r);return r;}
function bnSquare(){var r=nbi();this.squareTo(r);return r;}
function bnDivide(a){var r=nbi();this.divRemTo(a,r,null);return r;}
function bnRemainder(a){var r=nbi();this.divRemTo(a,null,r);return r;}
function bnDivideAndRemainder(a){var q=nbi(),r=nbi();this.divRemTo(a,q,r);return new Array(q,r);}
function bnpDMultiply(n){this[this.t]=this.am(0,n-1,this,0,0,this.t);++this.t;this.clamp();}
function bnpDAddOffset(n,w){if(n==0)return;while(this.t<=w)this[this.t++]=0;this[w]+=n;while(this[w]>=this.DV){this[w]-=this.DV;if(++w>=this.t)this[this.t++]=0;++this[w];}}
function NullExp(){}
function nNop(x){return x;}
function nMulTo(x,y,r){x.multiplyTo(y,r);}
function nSqrTo(x,r){x.squareTo(r);}
NullExp.prototype.convert=nNop;NullExp.prototype.revert=nNop;NullExp.prototype.mulTo=nMulTo;NullExp.prototype.sqrTo=nSqrTo;function bnPow(e){return this.exp(e,new NullExp());}
function bnpMultiplyLowerTo(a,n,r){var i=Math.min(this.t+a.t,n);r.s=0;r.t=i;while(i>0)r[--i]=0;var j;for(j=r.t-this.t;i<j;++i)r[i+this.t]=this.am(0,a[i],r,i,0,this.t);for(j=Math.min(a.t,n);i<j;++i)this.am(0,a[i],r,i,0,n-i);r.clamp();}
function bnpMultiplyUpperTo(a,n,r){--n;var i=r.t=this.t+a.t-n;r.s=0;while(--i>=0)r[i]=0;for(i=Math.max(n-this.t,0);i<a.t;++i)
r[this.t+i-n]=this.am(n-i,a[i],r,0,0,this.t+i-n);r.clamp();r.drShiftTo(1,r);}
function Barrett(m){this.r2=nbi();this.q3=nbi();BigInteger.ONE.dlShiftTo(2*m.t,this.r2);this.mu=this.r2.divide(m);this.m=m;}
function barrettConvert(x){if(x.s<0||x.t>2*this.m.t)return x.mod(this.m);else if(x.compareTo(this.m)<0)return x;else{var r=nbi();x.copyTo(r);this.reduce(r);return r;}}
function barrettRevert(x){return x;}
function barrettReduce(x){x.drShiftTo(this.m.t-1,this.r2);if(x.t>this.m.t+1){x.t=this.m.t+1;x.clamp();}
this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);while(x.compareTo(this.r2)<0)x.dAddOffset(1,this.m.t+1);x.subTo(this.r2,x);while(x.compareTo(this.m)>=0)x.subTo(this.m,x);}
function barrettSqrTo(x,r){x.squareTo(r);this.reduce(r);}
function barrettMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r);}
Barrett.prototype.convert=barrettConvert;Barrett.prototype.revert=barrettRevert;Barrett.prototype.reduce=barrettReduce;Barrett.prototype.mulTo=barrettMulTo;Barrett.prototype.sqrTo=barrettSqrTo;function bnModPow(e,m){var i=e.bitLength(),k,r=nbv(1),z;if(i<=0)return r;else if(i<18)k=1;else if(i<48)k=3;else if(i<144)k=4;else if(i<768)k=5;else k=6;if(i<8)
z=new Classic(m);else if(m.isEven())
z=new Barrett(m);else
z=new Montgomery(m);var g=new Array(),n=3,k1=k-1,km=(1<<k)-1;g[1]=z.convert(this);if(k>1){var g2=nbi();z.sqrTo(g[1],g2);while(n<=km){g[n]=nbi();z.mulTo(g2,g[n-2],g[n]);n+=2;}}
var j=e.t-1,w,is1=true,r2=nbi(),t;i=nbits(e[j])-1;while(j>=0){if(i>=k1)w=(e[j]>>(i-k1))&km;else{w=(e[j]&((1<<(i+1))-1))<<(k1-i);if(j>0)w|=e[j-1]>>(this.DB+i-k1);}
n=k;while((w&1)==0){w>>=1;--n;}
if((i-=n)<0){i+=this.DB;--j;}
if(is1){g[w].copyTo(r);is1=false;}
else{while(n>1){z.sqrTo(r,r2);z.sqrTo(r2,r);n-=2;}
if(n>0)z.sqrTo(r,r2);else{t=r;r=r2;r2=t;}
z.mulTo(r2,g[w],r);}
while(j>=0&&(e[j]&(1<<i))==0){z.sqrTo(r,r2);t=r;r=r2;r2=t;if(--i<0){i=this.DB-1;--j;}}}
return z.revert(r);}
function bnGCD(a){var x=(this.s<0)?this.negate():this.clone();var y=(a.s<0)?a.negate():a.clone();if(x.compareTo(y)<0){var t=x;x=y;y=t;}
var i=x.getLowestSetBit(),g=y.getLowestSetBit();if(g<0)return x;if(i<g)g=i;if(g>0){x.rShiftTo(g,x);y.rShiftTo(g,y);}
while(x.signum()>0){if((i=x.getLowestSetBit())>0)x.rShiftTo(i,x);if((i=y.getLowestSetBit())>0)y.rShiftTo(i,y);if(x.compareTo(y)>=0){x.subTo(y,x);x.rShiftTo(1,x);}
else{y.subTo(x,y);y.rShiftTo(1,y);}}
if(g>0)y.lShiftTo(g,y);return y;}
function bnpModInt(n){if(n<=0)return 0;var d=this.DV%n,r=(this.s<0)?n-1:0;if(this.t>0)
if(d==0)r=this[0]%n;else for(var i=this.t-1;i>=0;--i)r=(d*r+this[i])%n;return r;}
function bnModInverse(m){var ac=m.isEven();if((this.isEven()&&ac)||m.signum()==0)return BigInteger.ZERO;var u=m.clone(),v=this.clone();var a=nbv(1),b=nbv(0),c=nbv(0),d=nbv(1);while(u.signum()!=0){while(u.isEven()){u.rShiftTo(1,u);if(ac){if(!a.isEven()||!b.isEven()){a.addTo(this,a);b.subTo(m,b);}
a.rShiftTo(1,a);}
else if(!b.isEven())b.subTo(m,b);b.rShiftTo(1,b);}
while(v.isEven()){v.rShiftTo(1,v);if(ac){if(!c.isEven()||!d.isEven()){c.addTo(this,c);d.subTo(m,d);}
c.rShiftTo(1,c);}
else if(!d.isEven())d.subTo(m,d);d.rShiftTo(1,d);}
if(u.compareTo(v)>=0){u.subTo(v,u);if(ac)a.subTo(c,a);b.subTo(d,b);}
else{v.subTo(u,v);if(ac)c.subTo(a,c);d.subTo(b,d);}}
if(v.compareTo(BigInteger.ONE)!=0)return BigInteger.ZERO;if(d.compareTo(m)>=0)return d.subtract(m);if(d.signum()<0)d.addTo(m,d);else return d;if(d.signum()<0)return d.add(m);else return d;}
var lowprimes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];var lplim=(1<<26)/lowprimes[lowprimes.length-1];function bnIsProbablePrime(t){var i,x=this.abs();if(x.t==1&&x[0]<=lowprimes[lowprimes.length-1]){for(i=0;i<lowprimes.length;++i)
if(x[0]==lowprimes[i])return true;return false;}
if(x.isEven())return false;i=1;while(i<lowprimes.length){var m=lowprimes[i],j=i+1;while(j<lowprimes.length&&m<lplim)m*=lowprimes[j++];m=x.modInt(m);while(i<j)if(m%lowprimes[i++]==0)return false;}
return x.millerRabin(t);}
function bnpMillerRabin(t){var n1=this.subtract(BigInteger.ONE);var k=n1.getLowestSetBit();if(k<=0)return false;var r=n1.shiftRight(k);t=(t+1)>>1;if(t>lowprimes.length)t=lowprimes.length;var a=nbi();for(var i=0;i<t;++i){a.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]);var y=a.modPow(r,this);if(y.compareTo(BigInteger.ONE)!=0&&y.compareTo(n1)!=0){var j=1;while(j++<k&&y.compareTo(n1)!=0){y=y.modPowInt(2,this);if(y.compareTo(BigInteger.ONE)==0)return false;}
if(y.compareTo(n1)!=0)return false;}}
return true;}
BigInteger.prototype.chunkSize=bnpChunkSize;BigInteger.prototype.toRadix=bnpToRadix;BigInteger.prototype.fromRadix=bnpFromRadix;BigInteger.prototype.fromNumber=bnpFromNumber;BigInteger.prototype.bitwiseTo=bnpBitwiseTo;BigInteger.prototype.changeBit=bnpChangeBit;BigInteger.prototype.addTo=bnpAddTo;BigInteger.prototype.dMultiply=bnpDMultiply;BigInteger.prototype.dAddOffset=bnpDAddOffset;BigInteger.prototype.multiplyLowerTo=bnpMultiplyLowerTo;BigInteger.prototype.multiplyUpperTo=bnpMultiplyUpperTo;BigInteger.prototype.modInt=bnpModInt;BigInteger.prototype.millerRabin=bnpMillerRabin;BigInteger.prototype.clone=bnClone;BigInteger.prototype.intValue=bnIntValue;BigInteger.prototype.byteValue=bnByteValue;BigInteger.prototype.shortValue=bnShortValue;BigInteger.prototype.signum=bnSigNum;BigInteger.prototype.toByteArray=bnToByteArray;BigInteger.prototype.equals=bnEquals;BigInteger.prototype.min=bnMin;BigInteger.prototype.max=bnMax;BigInteger.prototype.and=bnAnd;BigInteger.prototype.or=bnOr;BigInteger.prototype.xor=bnXor;BigInteger.prototype.andNot=bnAndNot;BigInteger.prototype.not=bnNot;BigInteger.prototype.shiftLeft=bnShiftLeft;BigInteger.prototype.shiftRight=bnShiftRight;BigInteger.prototype.getLowestSetBit=bnGetLowestSetBit;BigInteger.prototype.bitCount=bnBitCount;BigInteger.prototype.testBit=bnTestBit;BigInteger.prototype.setBit=bnSetBit;BigInteger.prototype.clearBit=bnClearBit;BigInteger.prototype.flipBit=bnFlipBit;BigInteger.prototype.add=bnAdd;BigInteger.prototype.subtract=bnSubtract;BigInteger.prototype.multiply=bnMultiply;BigInteger.prototype.divide=bnDivide;BigInteger.prototype.remainder=bnRemainder;BigInteger.prototype.divideAndRemainder=bnDivideAndRemainder;BigInteger.prototype.modPow=bnModPow;BigInteger.prototype.modInverse=bnModInverse;BigInteger.prototype.pow=bnPow;BigInteger.prototype.gcd=bnGCD;BigInteger.prototype.isProbablePrime=bnIsProbablePrime;BigInteger.prototype.square=bnSquare;function parseBigInt(str,r){return new BigInteger(str,r);}
function linebrk(s,n){var ret="";var i=0;while(i+n<s.length){ret+=s.substring(i,i+n)+"\n";i+=n;}
return ret+s.substring(i,s.length);}
function byte2Hex(b){if(b<0x10)
return"0"+b.toString(16);else
return b.toString(16);}
function pkcs1pad2(s,n){if(n<s.length+11){alert("Message too long for RSA");return null;}
var ba=new Array();var i=s.length-1;while(i>=0&&n>0){var c=s.charCodeAt(i--);if(c<128){ba[--n]=c;}
else if((c>127)&&(c<2048)){ba[--n]=(c&63)|128;ba[--n]=(c>>6)|192;}
else{ba[--n]=(c&63)|128;ba[--n]=((c>>6)&63)|128;ba[--n]=(c>>12)|224;}}
ba[--n]=0;var rng=new SecureRandom();var x=new Array();while(n>2){x[0]=0;while(x[0]==0)rng.nextBytes(x);ba[--n]=x[0];}
ba[--n]=2;ba[--n]=0;return new BigInteger(ba);}
function oaep_mgf1_arr(seed,len,hash)
{var mask='',i=0;while(mask.length<len)
{mask+=hash(String.fromCharCode.apply(String,seed.concat([(i&0xff000000)>>24,(i&0x00ff0000)>>16,(i&0x0000ff00)>>8,i&0x000000ff])));i+=1;}
return mask;}
var SHA1_SIZE=20;function oaep_pad(s,n,hash)
{if(s.length+2*SHA1_SIZE+2>n)
{throw"Message too long for RSA";}
var PS='',i;for(i=0;i<n-s.length-2*SHA1_SIZE-2;i+=1)
{PS+='\x00';}
var DB=rstr_sha1('')+PS+'\x01'+s;var seed=new Array(SHA1_SIZE);new SecureRandom().nextBytes(seed);var dbMask=oaep_mgf1_arr(seed,DB.length,hash||rstr_sha1);var maskedDB=[];for(i=0;i<DB.length;i+=1)
{maskedDB[i]=DB.charCodeAt(i)^dbMask.charCodeAt(i);}
var seedMask=oaep_mgf1_arr(maskedDB,seed.length,rstr_sha1);var maskedSeed=[0];for(i=0;i<seed.length;i+=1)
{maskedSeed[i+1]=seed[i]^seedMask.charCodeAt(i);}
return new BigInteger(maskedSeed.concat(maskedDB));}
function RSAKey(){this.n=null;this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null;}
function RSASetPublic(N,E){this.isPublic=true;if(typeof N!=="string")
{this.n=N;this.e=E;}
else if(N!=null&&E!=null&&N.length>0&&E.length>0){this.n=parseBigInt(N,16);this.e=parseInt(E,16);}
else
alert("Invalid RSA public key");}
function RSADoPublic(x){return x.modPowInt(this.e,this.n);}
function RSAEncrypt(text){var m=pkcs1pad2(text,(this.n.bitLength()+7)>>3);if(m==null)return null;var c=this.doPublic(m);if(c==null)return null;var h=c.toString(16);if((h.length&1)==0)return h;else return"0"+h;}
function RSAEncryptOAEP(text,hash){var m=oaep_pad(text,(this.n.bitLength()+7)>>3,hash);if(m==null)return null;var c=this.doPublic(m);if(c==null)return null;var h=c.toString(16);if((h.length&1)==0)return h;else return"0"+h;}
RSAKey.prototype.doPublic=RSADoPublic;RSAKey.prototype.setPublic=RSASetPublic;RSAKey.prototype.encrypt=RSAEncrypt;RSAKey.prototype.encryptOAEP=RSAEncryptOAEP;RSAKey.prototype.type="RSA";function pkcs1unpad2(d,n){var b=d.toByteArray();var i=0;while(i<b.length&&b[i]==0)++i;if(b.length-i!=n-1||b[i]!=2)
return null;++i;while(b[i]!=0)
if(++i>=b.length)return null;var ret="";while(++i<b.length){var c=b[i]&255;if(c<128){ret+=String.fromCharCode(c);}
else if((c>191)&&(c<224)){ret+=String.fromCharCode(((c&31)<<6)|(b[i+1]&63));++i;}
else{ret+=String.fromCharCode(((c&15)<<12)|((b[i+1]&63)<<6)|(b[i+2]&63));i+=2;}}
return ret;}
function oaep_mgf1_str(seed,len,hash)
{var mask='',i=0;while(mask.length<len)
{mask+=hash(seed+String.fromCharCode.apply(String,[(i&0xff000000)>>24,(i&0x00ff0000)>>16,(i&0x0000ff00)>>8,i&0x000000ff]));i+=1;}
return mask;}
var SHA1_SIZE=20;function oaep_unpad(d,n,hash)
{d=d.toByteArray();var i;for(i=0;i<d.length;i+=1)
{d[i]&=0xff;}
while(d.length<n)
{d.unshift(0);}
d=String.fromCharCode.apply(String,d);if(d.length<2*SHA1_SIZE+2)
{throw"Cipher too short";}
var maskedSeed=d.substr(1,SHA1_SIZE)
var maskedDB=d.substr(SHA1_SIZE+1);var seedMask=oaep_mgf1_str(maskedDB,SHA1_SIZE,hash||rstr_sha1);var seed=[],i;for(i=0;i<maskedSeed.length;i+=1)
{seed[i]=maskedSeed.charCodeAt(i)^seedMask.charCodeAt(i);}
var dbMask=oaep_mgf1_str(String.fromCharCode.apply(String,seed),d.length-SHA1_SIZE,rstr_sha1);var DB=[];for(i=0;i<maskedDB.length;i+=1)
{DB[i]=maskedDB.charCodeAt(i)^dbMask.charCodeAt(i);}
DB=String.fromCharCode.apply(String,DB);if(DB.substr(0,SHA1_SIZE)!==rstr_sha1(''))
{throw"Hash mismatch";}
DB=DB.substr(SHA1_SIZE);var first_one=DB.indexOf('\x01');var last_zero=(first_one!=-1)?DB.substr(0,first_one).lastIndexOf('\x00'):-1;if(last_zero+1!=first_one)
{throw"Malformed data";}
return DB.substr(first_one+1);}
function RSASetPrivate(N,E,D){this.isPrivate=true;if(typeof N!=="string")
{this.n=N;this.e=E;this.d=D;}
else if(N!=null&&E!=null&&N.length>0&&E.length>0){this.n=parseBigInt(N,16);this.e=parseInt(E,16);this.d=parseBigInt(D,16);}
else
alert("Invalid RSA private key");}
function RSASetPrivateEx(N,E,D,P,Q,DP,DQ,C){this.isPrivate=true;if(N==null)throw"RSASetPrivateEx N == null";if(E==null)throw"RSASetPrivateEx E == null";if(N.length==0)throw"RSASetPrivateEx N.length == 0";if(E.length==0)throw"RSASetPrivateEx E.length == 0";if(N!=null&&E!=null&&N.length>0&&E.length>0){this.n=parseBigInt(N,16);this.e=parseInt(E,16);this.d=parseBigInt(D,16);this.p=parseBigInt(P,16);this.q=parseBigInt(Q,16);this.dmp1=parseBigInt(DP,16);this.dmq1=parseBigInt(DQ,16);this.coeff=parseBigInt(C,16);}else{alert("Invalid RSA private key in RSASetPrivateEx");}}
function RSAGenerate(B,E){var rng=new SecureRandom();var qs=B>>1;this.e=parseInt(E,16);var ee=new BigInteger(E,16);for(;;){for(;;){this.p=new BigInteger(B-qs,1,rng);if(this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE)==0&&this.p.isProbablePrime(10))break;}
for(;;){this.q=new BigInteger(qs,1,rng);if(this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE)==0&&this.q.isProbablePrime(10))break;}
if(this.p.compareTo(this.q)<=0){var t=this.p;this.p=this.q;this.q=t;}
var p1=this.p.subtract(BigInteger.ONE);var q1=this.q.subtract(BigInteger.ONE);var phi=p1.multiply(q1);if(phi.gcd(ee).compareTo(BigInteger.ONE)==0){this.n=this.p.multiply(this.q);this.d=ee.modInverse(phi);this.dmp1=this.d.mod(p1);this.dmq1=this.d.mod(q1);this.coeff=this.q.modInverse(this.p);break;}}}
function RSADoPrivate(x){if(this.p==null||this.q==null)
return x.modPow(this.d,this.n);var xp=x.mod(this.p).modPow(this.dmp1,this.p);var xq=x.mod(this.q).modPow(this.dmq1,this.q);while(xp.compareTo(xq)<0)
xp=xp.add(this.p);return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);}
function RSADecrypt(ctext){var c=parseBigInt(ctext,16);var m=this.doPrivate(c);if(m==null)return null;return pkcs1unpad2(m,(this.n.bitLength()+7)>>3);}
function RSADecryptOAEP(ctext,hash){var c=parseBigInt(ctext,16);var m=this.doPrivate(c);if(m==null)return null;return oaep_unpad(m,(this.n.bitLength()+7)>>3,hash);}
RSAKey.prototype.doPrivate=RSADoPrivate;RSAKey.prototype.setPrivate=RSASetPrivate;RSAKey.prototype.setPrivateEx=RSASetPrivateEx;RSAKey.prototype.generate=RSAGenerate;RSAKey.prototype.decrypt=RSADecrypt;RSAKey.prototype.decryptOAEP=RSADecryptOAEP;var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64pad="=";function hex2b64(h){var i;var c;var ret="";for(i=0;i+3<=h.length;i+=3){c=parseInt(h.substring(i,i+3),16);ret+=b64map.charAt(c>>6)+b64map.charAt(c&63);}
if(i+1==h.length){c=parseInt(h.substring(i,i+1),16);ret+=b64map.charAt(c<<2);}
else if(i+2==h.length){c=parseInt(h.substring(i,i+2),16);ret+=b64map.charAt(c>>2)+b64map.charAt((c&3)<<4);}
if(b64pad)while((ret.length&3)>0)ret+=b64pad;return ret;}
function b64tohex(s){var ret=""
var i;var k=0;var slop;var v;for(i=0;i<s.length;++i){if(s.charAt(i)==b64pad)break;v=b64map.indexOf(s.charAt(i));if(v<0)continue;if(k==0){ret+=int2char(v>>2);slop=v&3;k=1;}
else if(k==1){ret+=int2char((slop<<2)|(v>>4));slop=v&0xf;k=2;}
else if(k==2){ret+=int2char(slop);ret+=int2char(v>>2);slop=v&3;k=3;}
else{ret+=int2char((slop<<2)|(v>>4));ret+=int2char(v&0xf);k=0;}}
if(k==1)
ret+=int2char(slop<<2);return ret;}
function b64toBA(s){var h=b64tohex(s);var i;var a=new Array();for(i=0;2*i<h.length;++i){a[i]=parseInt(h.substring(2*i,2*i+2),16);}
return a;}
function _rsapem_pemToBase64(sPEMPrivateKey){var s=sPEMPrivateKey;s=s.replace("-----BEGIN RSA PRIVATE KEY-----","");s=s.replace("-----END RSA PRIVATE KEY-----","");s=s.replace(/[ \n]+/g,"");return s;}
function _rsapem_getPosArrayOfChildrenFromHex(hPrivateKey){var a=new Array();var v1=ASN1HEX.getStartPosOfV_AtObj(hPrivateKey,0);var n1=ASN1HEX.getPosOfNextSibling_AtObj(hPrivateKey,v1);var e1=ASN1HEX.getPosOfNextSibling_AtObj(hPrivateKey,n1);var d1=ASN1HEX.getPosOfNextSibling_AtObj(hPrivateKey,e1);var p1=ASN1HEX.getPosOfNextSibling_AtObj(hPrivateKey,d1);var q1=ASN1HEX.getPosOfNextSibling_AtObj(hPrivateKey,p1);var dp1=ASN1HEX.getPosOfNextSibling_AtObj(hPrivateKey,q1);var dq1=ASN1HEX.getPosOfNextSibling_AtObj(hPrivateKey,dp1);var co1=ASN1HEX.getPosOfNextSibling_AtObj(hPrivateKey,dq1);a.push(v1,n1,e1,d1,p1,q1,dp1,dq1,co1);return a;}
function _rsapem_getHexValueArrayOfChildrenFromHex(hPrivateKey){var posArray=_rsapem_getPosArrayOfChildrenFromHex(hPrivateKey);var v=ASN1HEX.getHexOfV_AtObj(hPrivateKey,posArray[0]);var n=ASN1HEX.getHexOfV_AtObj(hPrivateKey,posArray[1]);var e=ASN1HEX.getHexOfV_AtObj(hPrivateKey,posArray[2]);var d=ASN1HEX.getHexOfV_AtObj(hPrivateKey,posArray[3]);var p=ASN1HEX.getHexOfV_AtObj(hPrivateKey,posArray[4]);var q=ASN1HEX.getHexOfV_AtObj(hPrivateKey,posArray[5]);var dp=ASN1HEX.getHexOfV_AtObj(hPrivateKey,posArray[6]);var dq=ASN1HEX.getHexOfV_AtObj(hPrivateKey,posArray[7]);var co=ASN1HEX.getHexOfV_AtObj(hPrivateKey,posArray[8]);var a=new Array();a.push(v,n,e,d,p,q,dp,dq,co);return a;}
function _rsapem_readPrivateKeyFromASN1HexString(keyHex){var a=_rsapem_getHexValueArrayOfChildrenFromHex(keyHex);this.setPrivateEx(a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8]);}
function _rsapem_readPrivateKeyFromPEMString(keyPEM){var keyB64=_rsapem_pemToBase64(keyPEM);var keyHex=b64tohex(keyB64)
var a=_rsapem_getHexValueArrayOfChildrenFromHex(keyHex);this.setPrivateEx(a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8]);}
RSAKey.prototype.readPrivateKeyFromPEMString=_rsapem_readPrivateKeyFromPEMString;RSAKey.prototype.readPrivateKeyFromASN1HexString=_rsapem_readPrivateKeyFromASN1HexString;var _RE_HEXDECONLY=new RegExp("");_RE_HEXDECONLY.compile("[^0-9a-f]","gi");function _rsasign_getHexPaddedDigestInfoForString(s,keySize,hashAlg){var hashFunc=function(s){return KJUR.crypto.Util.hashString(s,hashAlg);};var sHashHex=hashFunc(s);return KJUR.crypto.Util.getPaddedDigestInfoHex(sHashHex,hashAlg,keySize);}
function _zeroPaddingOfSignature(hex,bitLength){var s="";var nZero=bitLength/4-hex.length;for(var i=0;i<nZero;i++){s=s+"0";}
return s+hex;}
function _rsasign_signString(s,hashAlg){var hashFunc=function(s){return KJUR.crypto.Util.hashString(s,hashAlg);};var sHashHex=hashFunc(s);return this.signWithMessageHash(sHashHex,hashAlg);}
function _rsasign_signWithMessageHash(sHashHex,hashAlg){var hPM=KJUR.crypto.Util.getPaddedDigestInfoHex(sHashHex,hashAlg,this.n.bitLength());var biPaddedMessage=parseBigInt(hPM,16);var biSign=this.doPrivate(biPaddedMessage);var hexSign=biSign.toString(16);return _zeroPaddingOfSignature(hexSign,this.n.bitLength());}
function _rsasign_signStringWithSHA1(s){return _rsasign_signString.call(this,s,'sha1');}
function _rsasign_signStringWithSHA256(s){return _rsasign_signString.call(this,s,'sha256');}
function pss_mgf1_str(seed,len,hash){var mask='',i=0;while(mask.length<len){mask+=hextorstr(hash(rstrtohex(seed+String.fromCharCode.apply(String,[(i&0xff000000)>>24,(i&0x00ff0000)>>16,(i&0x0000ff00)>>8,i&0x000000ff]))));i+=1;}
return mask;}
function _rsasign_signStringPSS(s,hashAlg,sLen){var hashFunc=function(sHex){return KJUR.crypto.Util.hashHex(sHex,hashAlg);}
var hHash=hashFunc(rstrtohex(s));if(sLen===undefined)sLen=-1;return this.signWithMessageHashPSS(hHash,hashAlg,sLen);}
function _rsasign_signWithMessageHashPSS(hHash,hashAlg,sLen){var mHash=hextorstr(hHash);var hLen=mHash.length;var emBits=this.n.bitLength()-1;var emLen=Math.ceil(emBits/8);var i;var hashFunc=function(sHex){return KJUR.crypto.Util.hashHex(sHex,hashAlg);}
if(sLen===-1||sLen===undefined){sLen=hLen;}else if(sLen===-2){sLen=emLen-hLen-2;}else if(sLen<-2){throw"invalid salt length";}
if(emLen<(hLen+sLen+2)){throw"data too long";}
var salt='';if(sLen>0){salt=new Array(sLen);new SecureRandom().nextBytes(salt);salt=String.fromCharCode.apply(String,salt);}
var H=hextorstr(hashFunc(rstrtohex('\x00\x00\x00\x00\x00\x00\x00\x00'+mHash+salt)));var PS=[];for(i=0;i<emLen-sLen-hLen-2;i+=1){PS[i]=0x00;}
var DB=String.fromCharCode.apply(String,PS)+'\x01'+salt;var dbMask=pss_mgf1_str(H,DB.length,hashFunc);var maskedDB=[];for(i=0;i<DB.length;i+=1){maskedDB[i]=DB.charCodeAt(i)^dbMask.charCodeAt(i);}
var mask=(0xff00>>(8*emLen-emBits))&0xff;maskedDB[0]&=~mask;for(i=0;i<hLen;i++){maskedDB.push(H.charCodeAt(i));}
maskedDB.push(0xbc);return _zeroPaddingOfSignature(this.doPrivate(new BigInteger(maskedDB)).toString(16),this.n.bitLength());}
function _rsasign_getDecryptSignatureBI(biSig,hN,hE){var rsa=new RSAKey();rsa.setPublic(hN,hE);var biDecryptedSig=rsa.doPublic(biSig);return biDecryptedSig;}
function _rsasign_getHexDigestInfoFromSig(biSig,hN,hE){var biDecryptedSig=_rsasign_getDecryptSignatureBI(biSig,hN,hE);var hDigestInfo=biDecryptedSig.toString(16).replace(/^1f+00/,'');return hDigestInfo;}
function _rsasign_getAlgNameAndHashFromHexDisgestInfo(hDigestInfo){for(var algName in KJUR.crypto.Util.DIGESTINFOHEAD){var head=KJUR.crypto.Util.DIGESTINFOHEAD[algName];var len=head.length;if(hDigestInfo.substring(0,len)==head){var a=[algName,hDigestInfo.substring(len)];return a;}}
return[];}
function _rsasign_verifySignatureWithArgs(sMsg,biSig,hN,hE){var hDigestInfo=_rsasign_getHexDigestInfoFromSig(biSig,hN,hE);var digestInfoAry=_rsasign_getAlgNameAndHashFromHexDisgestInfo(hDigestInfo);if(digestInfoAry.length==0)return false;var algName=digestInfoAry[0];var diHashValue=digestInfoAry[1];var ff=function(s){return KJUR.crypto.Util.hashString(s,algName);};var msgHashValue=ff(sMsg);return(diHashValue==msgHashValue);}
function _rsasign_verifyHexSignatureForMessage(hSig,sMsg){var biSig=parseBigInt(hSig,16);var result=_rsasign_verifySignatureWithArgs(sMsg,biSig,this.n.toString(16),this.e.toString(16));return result;}
function _rsasign_verifyString(sMsg,hSig){hSig=hSig.replace(_RE_HEXDECONLY,'');hSig=hSig.replace(/[ \n]+/g,"");var biSig=parseBigInt(hSig,16);if(biSig.bitLength()>this.n.bitLength())return 0;var biDecryptedSig=this.doPublic(biSig);var hDigestInfo=biDecryptedSig.toString(16).replace(/^1f+00/,'');var digestInfoAry=_rsasign_getAlgNameAndHashFromHexDisgestInfo(hDigestInfo);if(digestInfoAry.length==0)return false;var algName=digestInfoAry[0];var diHashValue=digestInfoAry[1];var ff=function(s){return KJUR.crypto.Util.hashString(s,algName);};var msgHashValue=ff(sMsg);return(diHashValue==msgHashValue);}
function _rsasign_verifyWithMessageHash(sHashHex,hSig){hSig=hSig.replace(_RE_HEXDECONLY,'');hSig=hSig.replace(/[ \n]+/g,"");var biSig=parseBigInt(hSig,16);if(biSig.bitLength()>this.n.bitLength())return 0;var biDecryptedSig=this.doPublic(biSig);var hDigestInfo=biDecryptedSig.toString(16).replace(/^1f+00/,'');var digestInfoAry=_rsasign_getAlgNameAndHashFromHexDisgestInfo(hDigestInfo);if(digestInfoAry.length==0)return false;var algName=digestInfoAry[0];var diHashValue=digestInfoAry[1];return(diHashValue==sHashHex);}
function _rsasign_verifyStringPSS(sMsg,hSig,hashAlg,sLen){var hashFunc=function(sHex){return KJUR.crypto.Util.hashHex(sHex,hashAlg);};var hHash=hashFunc(rstrtohex(sMsg));if(sLen===undefined)sLen=-1;return this.verifyWithMessageHashPSS(hHash,hSig,hashAlg,sLen);}
function _rsasign_verifyWithMessageHashPSS(hHash,hSig,hashAlg,sLen){var biSig=new BigInteger(hSig,16);if(biSig.bitLength()>this.n.bitLength()){return false;}
var hashFunc=function(sHex){return KJUR.crypto.Util.hashHex(sHex,hashAlg);};var mHash=hextorstr(hHash);var hLen=mHash.length;var emBits=this.n.bitLength()-1;var emLen=Math.ceil(emBits/8);var i;if(sLen===-1||sLen===undefined){sLen=hLen;}else if(sLen===-2){sLen=emLen-hLen-2;}else if(sLen<-2){throw"invalid salt length";}
if(emLen<(hLen+sLen+2)){throw"data too long";}
var em=this.doPublic(biSig).toByteArray();for(i=0;i<em.length;i+=1){em[i]&=0xff;}
while(em.length<emLen){em.unshift(0);}
if(em[emLen-1]!==0xbc){throw"encoded message does not end in 0xbc";}
em=String.fromCharCode.apply(String,em);var maskedDB=em.substr(0,emLen-hLen-1);var H=em.substr(maskedDB.length,hLen);var mask=(0xff00>>(8*emLen-emBits))&0xff;if((maskedDB.charCodeAt(0)&mask)!==0){throw"bits beyond keysize not zero";}
var dbMask=pss_mgf1_str(H,maskedDB.length,hashFunc);var DB=[];for(i=0;i<maskedDB.length;i+=1){DB[i]=maskedDB.charCodeAt(i)^dbMask.charCodeAt(i);}
DB[0]&=~mask;var checkLen=emLen-hLen-sLen-2;for(i=0;i<checkLen;i+=1){if(DB[i]!==0x00){throw"leftmost octets not zero";}}
if(DB[checkLen]!==0x01){throw"0x01 marker not found";}
return H===hextorstr(hashFunc(rstrtohex('\x00\x00\x00\x00\x00\x00\x00\x00'+mHash+
String.fromCharCode.apply(String,DB.slice(-sLen)))));}
RSAKey.prototype.signWithMessageHash=_rsasign_signWithMessageHash;RSAKey.prototype.signString=_rsasign_signString;RSAKey.prototype.signStringWithSHA1=_rsasign_signStringWithSHA1;RSAKey.prototype.signStringWithSHA256=_rsasign_signStringWithSHA256;RSAKey.prototype.sign=_rsasign_signString;RSAKey.prototype.signWithSHA1=_rsasign_signStringWithSHA1;RSAKey.prototype.signWithSHA256=_rsasign_signStringWithSHA256;RSAKey.prototype.signWithMessageHashPSS=_rsasign_signWithMessageHashPSS;RSAKey.prototype.signStringPSS=_rsasign_signStringPSS;RSAKey.prototype.signPSS=_rsasign_signStringPSS;RSAKey.SALT_LEN_HLEN=-1;RSAKey.SALT_LEN_MAX=-2;RSAKey.prototype.verifyWithMessageHash=_rsasign_verifyWithMessageHash;RSAKey.prototype.verifyString=_rsasign_verifyString;RSAKey.prototype.verifyHexSignatureForMessage=_rsasign_verifyHexSignatureForMessage;RSAKey.prototype.verify=_rsasign_verifyString;RSAKey.prototype.verifyHexSignatureForByteArrayMessage=_rsasign_verifyHexSignatureForMessage;RSAKey.prototype.verifyWithMessageHashPSS=_rsasign_verifyWithMessageHashPSS;RSAKey.prototype.verifyStringPSS=_rsasign_verifyStringPSS;RSAKey.prototype.verifyPSS=_rsasign_verifyStringPSS;RSAKey.SALT_LEN_RECOVER=-2;var ASN1HEX=new function(){this.getByteLengthOfL_AtObj=function(s,pos){if(s.substring(pos+2,pos+3)!='8')return 1;var i=parseInt(s.substring(pos+3,pos+4));if(i==0)return-1;if(0<i&&i<10)return i+1;return-2;};this.getHexOfL_AtObj=function(s,pos){var len=this.getByteLengthOfL_AtObj(s,pos);if(len<1)return'';return s.substring(pos+2,pos+2+len*2);};this.getIntOfL_AtObj=function(s,pos){var hLength=this.getHexOfL_AtObj(s,pos);if(hLength=='')return-1;var bi;if(parseInt(hLength.substring(0,1))<8){bi=new BigInteger(hLength,16);}else{bi=new BigInteger(hLength.substring(2),16);}
return bi.intValue();};this.getStartPosOfV_AtObj=function(s,pos){var l_len=this.getByteLengthOfL_AtObj(s,pos);if(l_len<0)return l_len;return pos+(l_len+1)*2;};this.getHexOfV_AtObj=function(s,pos){var pos1=this.getStartPosOfV_AtObj(s,pos);var len=this.getIntOfL_AtObj(s,pos);return s.substring(pos1,pos1+len*2);};this.getHexOfTLV_AtObj=function(s,pos){var hT=s.substr(pos,2);var hL=this.getHexOfL_AtObj(s,pos);var hV=this.getHexOfV_AtObj(s,pos);return hT+hL+hV;};this.getPosOfNextSibling_AtObj=function(s,pos){var pos1=this.getStartPosOfV_AtObj(s,pos);var len=this.getIntOfL_AtObj(s,pos);return pos1+len*2;};this.getPosArrayOfChildren_AtObj=function(h,pos){var a=new Array();var p0=this.getStartPosOfV_AtObj(h,pos);a.push(p0);var len=this.getIntOfL_AtObj(h,pos);var p=p0;var k=0;while(1){var pNext=this.getPosOfNextSibling_AtObj(h,p);if(pNext==null||(pNext-p0>=(len*2)))break;if(k>=200)break;a.push(pNext);p=pNext;k++;}
return a;};this.getNthChildIndex_AtObj=function(h,idx,nth){var a=this.getPosArrayOfChildren_AtObj(h,idx);return a[nth];};this.getDecendantIndexByNthList=function(h,currentIndex,nthList){if(nthList.length==0){return currentIndex;}
var firstNth=nthList.shift();var a=this.getPosArrayOfChildren_AtObj(h,currentIndex);return this.getDecendantIndexByNthList(h,a[firstNth],nthList);};this.getDecendantHexTLVByNthList=function(h,currentIndex,nthList){var idx=this.getDecendantIndexByNthList(h,currentIndex,nthList);return this.getHexOfTLV_AtObj(h,idx);};this.getDecendantHexVByNthList=function(h,currentIndex,nthList){var idx=this.getDecendantIndexByNthList(h,currentIndex,nthList);return this.getHexOfV_AtObj(h,idx);};};ASN1HEX.getVbyList=function(h,currentIndex,nthList,checkingTag){var idx=this.getDecendantIndexByNthList(h,currentIndex,nthList);if(idx===undefined){throw"can't find nthList object";}
if(checkingTag!==undefined){if(h.substr(idx,2)!=checkingTag){throw"checking tag doesn't match: "+h.substr(idx,2)+"!="+checkingTag;}}
return this.getHexOfV_AtObj(h,idx);};function X509(){this.subjectPublicKeyRSA=null;this.subjectPublicKeyRSA_hN=null;this.subjectPublicKeyRSA_hE=null;this.hex=null;this.getSerialNumberHex=function(){return ASN1HEX.getDecendantHexVByNthList(this.hex,0,[0,1]);};this.getIssuerHex=function(){return ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,3]);};this.getIssuerString=function(){return X509.hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,3]));};this.getSubjectHex=function(){return ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,5]);};this.getSubjectString=function(){return X509.hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,5]));};this.getNotBefore=function(){var s=ASN1HEX.getDecendantHexVByNthList(this.hex,0,[0,4,0]);s=s.replace(/(..)/g,"%$1");s=decodeURIComponent(s);return s;};this.getNotAfter=function(){var s=ASN1HEX.getDecendantHexVByNthList(this.hex,0,[0,4,1]);s=s.replace(/(..)/g,"%$1");s=decodeURIComponent(s);return s;};this.readCertPEM=function(sCertPEM){var hCert=X509.pemToHex(sCertPEM);var a=X509.getPublicKeyHexArrayFromCertHex(hCert);var rsa=new RSAKey();rsa.setPublic(a[0],a[1]);this.subjectPublicKeyRSA=rsa;this.subjectPublicKeyRSA_hN=a[0];this.subjectPublicKeyRSA_hE=a[1];this.hex=hCert;};this.readCertPEMWithoutRSAInit=function(sCertPEM){var hCert=X509.pemToHex(sCertPEM);var a=X509.getPublicKeyHexArrayFromCertHex(hCert);this.subjectPublicKeyRSA.setPublic(a[0],a[1]);this.subjectPublicKeyRSA_hN=a[0];this.subjectPublicKeyRSA_hE=a[1];this.hex=hCert;};};X509.pemToBase64=function(sCertPEM){var s=sCertPEM;s=s.replace("-----BEGIN CERTIFICATE-----","");s=s.replace("-----END CERTIFICATE-----","");s=s.replace(/[ \n]+/g,"");return s;};X509.pemToHex=function(sCertPEM){var b64Cert=X509.pemToBase64(sCertPEM);var hCert=b64tohex(b64Cert);return hCert;};X509.getSubjectPublicKeyPosFromCertHex=function(hCert){var pInfo=X509.getSubjectPublicKeyInfoPosFromCertHex(hCert);if(pInfo==-1)return-1;var a=ASN1HEX.getPosArrayOfChildren_AtObj(hCert,pInfo);if(a.length!=2)return-1;var pBitString=a[1];if(hCert.substring(pBitString,pBitString+2)!='03')return-1;var pBitStringV=ASN1HEX.getStartPosOfV_AtObj(hCert,pBitString);if(hCert.substring(pBitStringV,pBitStringV+2)!='00')return-1;return pBitStringV+2;};X509.getSubjectPublicKeyInfoPosFromCertHex=function(hCert){var pTbsCert=ASN1HEX.getStartPosOfV_AtObj(hCert,0);var a=ASN1HEX.getPosArrayOfChildren_AtObj(hCert,pTbsCert);if(a.length<1)return-1;if(hCert.substring(a[0],a[0]+10)=="a003020102"){if(a.length<6)return-1;return a[6];}else{if(a.length<5)return-1;return a[5];}};X509.getPublicKeyHexArrayFromCertHex=function(hCert){var p=X509.getSubjectPublicKeyPosFromCertHex(hCert);var a=ASN1HEX.getPosArrayOfChildren_AtObj(hCert,p);if(a.length!=2)return[];var hN=ASN1HEX.getHexOfV_AtObj(hCert,a[0]);var hE=ASN1HEX.getHexOfV_AtObj(hCert,a[1]);if(hN!=null&&hE!=null){return[hN,hE];}else{return[];}};X509.getHexTbsCertificateFromCert=function(hCert){var pTbsCert=ASN1HEX.getStartPosOfV_AtObj(hCert,0);return pTbsCert;};X509.getPublicKeyHexArrayFromCertPEM=function(sCertPEM){var hCert=X509.pemToHex(sCertPEM);var a=X509.getPublicKeyHexArrayFromCertHex(hCert);return a;};X509.hex2dn=function(hDN){var s="";var a=ASN1HEX.getPosArrayOfChildren_AtObj(hDN,0);for(var i=0;i<a.length;i++){var hRDN=ASN1HEX.getHexOfTLV_AtObj(hDN,a[i]);s=s+"/"+X509.hex2rdn(hRDN);}
return s;};X509.hex2rdn=function(hRDN){var hType=ASN1HEX.getDecendantHexTLVByNthList(hRDN,0,[0,0]);var hValue=ASN1HEX.getDecendantHexVByNthList(hRDN,0,[0,1]);var type="";try{type=X509.DN_ATTRHEX[hType];}catch(ex){type=hType;}
hValue=hValue.replace(/(..)/g,"%$1");var value=decodeURIComponent(hValue);return type+"="+value;};X509.DN_ATTRHEX={"0603550406":"C","060355040a":"O","060355040b":"OU","0603550403":"CN","0603550405":"SN","0603550408":"ST","0603550407":"L",};X509.getPublicKeyFromCertPEM=function(sCertPEM){var info=X509.getPublicKeyInfoPropOfCertPEM(sCertPEM);if(info.algoid=="2a864886f70d010101"){var aRSA=KEYUTIL.parsePublicRawRSAKeyHex(info.keyhex);var key=new RSAKey();key.setPublic(aRSA.n,aRSA.e);return key;}else if(info.algoid=="2a8648ce3d0201"){var curveName=KJUR.crypto.OID.oidhex2name[info.algparam];var key=new KJUR.crypto.ECDSA({'curve':curveName,'info':info.keyhex});key.setPublicKeyHex(info.keyhex);return key;}else if(info.algoid=="2a8648ce380401"){var p=ASN1HEX.getVbyList(info.algparam,0,[0],"02");var q=ASN1HEX.getVbyList(info.algparam,0,[1],"02");var g=ASN1HEX.getVbyList(info.algparam,0,[2],"02");var y=ASN1HEX.getHexOfV_AtObj(info.keyhex,0);y=y.substr(2);var key=new KJUR.crypto.DSA();key.setPublic(new BigInteger(p,16),new BigInteger(q,16),new BigInteger(g,16),new BigInteger(y,16));return key;}else{throw"unsupported key";}};X509.getPublicKeyInfoPropOfCertPEM=function(sCertPEM){var result={};result.algparam=null;var hCert=X509.pemToHex(sCertPEM);var a1=ASN1HEX.getPosArrayOfChildren_AtObj(hCert,0);if(a1.length!=3)
throw"malformed X.509 certificate PEM (code:001)";if(hCert.substr(a1[0],2)!="30")
throw"malformed X.509 certificate PEM (code:002)";var a2=ASN1HEX.getPosArrayOfChildren_AtObj(hCert,a1[0]);if(a2.length<7)
throw"malformed X.509 certificate PEM (code:003)";var a3=ASN1HEX.getPosArrayOfChildren_AtObj(hCert,a2[6]);if(a3.length!=2)
throw"malformed X.509 certificate PEM (code:004)";var a4=ASN1HEX.getPosArrayOfChildren_AtObj(hCert,a3[0]);if(a4.length!=2)
throw"malformed X.509 certificate PEM (code:005)";result.algoid=ASN1HEX.getHexOfV_AtObj(hCert,a4[0]);if(hCert.substr(a4[1],2)=="06"){result.algparam=ASN1HEX.getHexOfV_AtObj(hCert,a4[1]);}else if(hCert.substr(a4[1],2)=="30"){result.algparam=ASN1HEX.getHexOfTLV_AtObj(hCert,a4[1]);}
if(hCert.substr(a3[1],02)!="03")
throw"malformed X.509 certificate PEM (code:006)";var unusedBitAndKeyHex=ASN1HEX.getHexOfV_AtObj(hCert,a3[1]);result.keyhex=unusedBitAndKeyHex.substr(2);return result;};if(typeof KJUR=="undefined"||!KJUR)KJUR={};if(typeof KJUR.crypto=="undefined"||!KJUR.crypto)KJUR.crypto={};KJUR.crypto.Util=new function(){this.DIGESTINFOHEAD={'sha1':"3021300906052b0e03021a05000414",'sha224':"302d300d06096086480165030402040500041c",'sha256':"3031300d060960864801650304020105000420",'sha384':"3041300d060960864801650304020205000430",'sha512':"3051300d060960864801650304020305000440",'md2':"3020300c06082a864886f70d020205000410",'md5':"3020300c06082a864886f70d020505000410",'ripemd160':"3021300906052b2403020105000414",};this.DEFAULTPROVIDER={'md5':'cryptojs','sha1':'cryptojs','sha224':'cryptojs','sha256':'cryptojs','sha384':'cryptojs','sha512':'cryptojs','ripemd160':'cryptojs','hmacmd5':'cryptojs','hmacsha1':'cryptojs','hmacsha224':'cryptojs','hmacsha256':'cryptojs','hmacsha384':'cryptojs','hmacsha512':'cryptojs','hmacripemd160':'cryptojs','MD5withRSA':'cryptojs/jsrsa','SHA1withRSA':'cryptojs/jsrsa','SHA224withRSA':'cryptojs/jsrsa','SHA256withRSA':'cryptojs/jsrsa','SHA384withRSA':'cryptojs/jsrsa','SHA512withRSA':'cryptojs/jsrsa','RIPEMD160withRSA':'cryptojs/jsrsa','MD5withECDSA':'cryptojs/jsrsa','SHA1withECDSA':'cryptojs/jsrsa','SHA224withECDSA':'cryptojs/jsrsa','SHA256withECDSA':'cryptojs/jsrsa','SHA384withECDSA':'cryptojs/jsrsa','SHA512withECDSA':'cryptojs/jsrsa','RIPEMD160withECDSA':'cryptojs/jsrsa','SHA1withDSA':'cryptojs/jsrsa','SHA224withDSA':'cryptojs/jsrsa','SHA256withDSA':'cryptojs/jsrsa','MD5withRSAandMGF1':'cryptojs/jsrsa','SHA1withRSAandMGF1':'cryptojs/jsrsa','SHA224withRSAandMGF1':'cryptojs/jsrsa','SHA256withRSAandMGF1':'cryptojs/jsrsa','SHA384withRSAandMGF1':'cryptojs/jsrsa','SHA512withRSAandMGF1':'cryptojs/jsrsa','RIPEMD160withRSAandMGF1':'cryptojs/jsrsa',};this.CRYPTOJSMESSAGEDIGESTNAME={'md5':'CryptoJS.algo.MD5','sha1':'CryptoJS.algo.SHA1','sha224':'CryptoJS.algo.SHA224','sha256':'CryptoJS.algo.SHA256','sha384':'CryptoJS.algo.SHA384','sha512':'CryptoJS.algo.SHA512','ripemd160':'CryptoJS.algo.RIPEMD160'};this.getDigestInfoHex=function(hHash,alg){if(typeof this.DIGESTINFOHEAD[alg]=="undefined")
throw"alg not supported in Util.DIGESTINFOHEAD: "+alg;return this.DIGESTINFOHEAD[alg]+hHash;};this.getPaddedDigestInfoHex=function(hHash,alg,keySize){var hDigestInfo=this.getDigestInfoHex(hHash,alg);var pmStrLen=keySize/4;if(hDigestInfo.length+22>pmStrLen)
throw"key is too short for SigAlg: keylen="+keySize+","+alg;var hHead="0001";var hTail="00"+hDigestInfo;var hMid="";var fLen=pmStrLen-hHead.length-hTail.length;for(var i=0;i<fLen;i+=2){hMid+="ff";}
var hPaddedMessage=hHead+hMid+hTail;return hPaddedMessage;};this.hashString=function(s,alg){var md=new KJUR.crypto.MessageDigest({'alg':alg});return md.digestString(s);};this.hashHex=function(sHex,alg){var md=new KJUR.crypto.MessageDigest({'alg':alg});return md.digestHex(sHex);};this.sha1=function(s){var md=new KJUR.crypto.MessageDigest({'alg':'sha1','prov':'cryptojs'});return md.digestString(s);};this.sha256=function(s){var md=new KJUR.crypto.MessageDigest({'alg':'sha256','prov':'cryptojs'});return md.digestString(s);};this.sha256Hex=function(s){var md=new KJUR.crypto.MessageDigest({'alg':'sha256','prov':'cryptojs'});return md.digestHex(s);};this.sha512=function(s){var md=new KJUR.crypto.MessageDigest({'alg':'sha512','prov':'cryptojs'});return md.digestString(s);};this.sha512Hex=function(s){var md=new KJUR.crypto.MessageDigest({'alg':'sha512','prov':'cryptojs'});return md.digestHex(s);};this.md5=function(s){var md=new KJUR.crypto.MessageDigest({'alg':'md5','prov':'cryptojs'});return md.digestString(s);};this.ripemd160=function(s){var md=new KJUR.crypto.MessageDigest({'alg':'ripemd160','prov':'cryptojs'});return md.digestString(s);};this.getCryptoJSMDByName=function(s){};};KJUR.crypto.MessageDigest=function(params){var md=null;var algName=null;var provName=null;this.setAlgAndProvider=function(alg,prov){if(alg!=null&&prov===undefined)prov=KJUR.crypto.Util.DEFAULTPROVIDER[alg];if(':md5:sha1:sha224:sha256:sha384:sha512:ripemd160:'.indexOf(alg)!=-1&&prov=='cryptojs'){try{this.md=eval(KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[alg]).create();}catch(ex){throw"setAlgAndProvider hash alg set fail alg="+alg+"/"+ex;}
this.updateString=function(str){this.md.update(str);};this.updateHex=function(hex){var wHex=CryptoJS.enc.Hex.parse(hex);this.md.update(wHex);};this.digest=function(){var hash=this.md.finalize();return hash.toString(CryptoJS.enc.Hex);};this.digestString=function(str){this.updateString(str);return this.digest();};this.digestHex=function(hex){this.updateHex(hex);return this.digest();};}
if(':sha256:'.indexOf(alg)!=-1&&prov=='sjcl'){try{this.md=new sjcl.hash.sha256();}catch(ex){throw"setAlgAndProvider hash alg set fail alg="+alg+"/"+ex;}
this.updateString=function(str){this.md.update(str);};this.updateHex=function(hex){var baHex=sjcl.codec.hex.toBits(hex);this.md.update(baHex);};this.digest=function(){var hash=this.md.finalize();return sjcl.codec.hex.fromBits(hash);};this.digestString=function(str){this.updateString(str);return this.digest();};this.digestHex=function(hex){this.updateHex(hex);return this.digest();};}};this.updateString=function(str){throw"updateString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName;};this.updateHex=function(hex){throw"updateHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName;};this.digest=function(){throw"digest() not supported for this alg/prov: "+this.algName+"/"+this.provName;};this.digestString=function(str){throw"digestString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName;};this.digestHex=function(hex){throw"digestHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName;};if(params!==undefined){if(params['alg']!==undefined){this.algName=params['alg'];if(params['prov']===undefined)
this.provName=KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];this.setAlgAndProvider(this.algName,this.provName);}}};KJUR.crypto.Mac=function(params){var mac=null;var pass=null;var algName=null;var provName=null;var algProv=null;this.setAlgAndProvider=function(alg,prov){if(alg==null)alg="hmacsha1";alg=alg.toLowerCase();if(alg.substr(0,4)!="hmac"){throw"setAlgAndProvider unsupported HMAC alg: "+alg;}
if(prov===undefined)prov=KJUR.crypto.Util.DEFAULTPROVIDER[alg];this.algProv=alg+"/"+prov;var hashAlg=alg.substr(4);if(':md5:sha1:sha224:sha256:sha384:sha512:ripemd160:'.indexOf(hashAlg)!=-1&&prov=='cryptojs'){try{var mdObj=eval(KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[hashAlg]);this.mac=CryptoJS.algo.HMAC.create(mdObj,this.pass);}catch(ex){throw"setAlgAndProvider hash alg set fail hashAlg="+hashAlg+"/"+ex;}
this.updateString=function(str){this.mac.update(str);};this.updateHex=function(hex){var wHex=CryptoJS.enc.Hex.parse(hex);this.mac.update(wHex);};this.doFinal=function(){var hash=this.mac.finalize();return hash.toString(CryptoJS.enc.Hex);};this.doFinalString=function(str){this.updateString(str);return this.doFinal();};this.doFinalHex=function(hex){this.updateHex(hex);return this.doFinal();};}};this.updateString=function(str){throw"updateString(str) not supported for this alg/prov: "+this.algProv;};this.updateHex=function(hex){throw"updateHex(hex) not supported for this alg/prov: "+this.algProv;};this.doFinal=function(){throw"digest() not supported for this alg/prov: "+this.algProv;};this.doFinalString=function(str){throw"digestString(str) not supported for this alg/prov: "+this.algProv;};this.doFinalHex=function(hex){throw"digestHex(hex) not supported for this alg/prov: "+this.algProv;};if(params!==undefined){if(params['pass']!==undefined){this.pass=params['pass'];}
if(params['alg']!==undefined){this.algName=params['alg'];if(params['prov']===undefined)
this.provName=KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];this.setAlgAndProvider(this.algName,this.provName);}}};KJUR.crypto.Signature=function(params){var prvKey=null;var pubKey=null;var md=null;var sig=null;var algName=null;var provName=null;var algProvName=null;var mdAlgName=null;var pubkeyAlgName=null;var state=null;var pssSaltLen=-1;var initParams=null;var sHashHex=null;var hDigestInfo=null;var hPaddedDigestInfo=null;var hSign=null;this._setAlgNames=function(){if(this.algName.match(/^(.+)with(.+)$/)){this.mdAlgName=RegExp.$1.toLowerCase();this.pubkeyAlgName=RegExp.$2.toLowerCase();}};this._zeroPaddingOfSignature=function(hex,bitLength){var s="";var nZero=bitLength/4-hex.length;for(var i=0;i<nZero;i++){s=s+"0";}
return s+hex;};this.setAlgAndProvider=function(alg,prov){this._setAlgNames();if(prov!='cryptojs/jsrsa')
throw"provider not supported: "+prov;if(':md5:sha1:sha224:sha256:sha384:sha512:ripemd160:'.indexOf(this.mdAlgName)!=-1){try{this.md=new KJUR.crypto.MessageDigest({'alg':this.mdAlgName});}catch(ex){throw"setAlgAndProvider hash alg set fail alg="+
this.mdAlgName+"/"+ex;}
this.init=function(keyparam,pass){var keyObj=null;try{if(pass===undefined){keyObj=KEYUTIL.getKey(keyparam);}else{keyObj=KEYUTIL.getKey(keyparam,pass);}}catch(ex){throw"init failed:"+ex;}
if(keyObj.isPrivate===true){this.prvKey=keyObj;this.state="SIGN";}else if(keyObj.isPublic===true){this.pubKey=keyObj;this.state="VERIFY";}else{throw"init failed.:"+keyObj;}};this.initSign=function(params){if(typeof params['ecprvhex']=='string'&&typeof params['eccurvename']=='string'){this.ecprvhex=params['ecprvhex'];this.eccurvename=params['eccurvename'];}else{this.prvKey=params;}
this.state="SIGN";};this.initVerifyByPublicKey=function(params){if(typeof params['ecpubhex']=='string'&&typeof params['eccurvename']=='string'){this.ecpubhex=params['ecpubhex'];this.eccurvename=params['eccurvename'];}else if(params instanceof KJUR.crypto.ECDSA){this.pubKey=params;}else if(params instanceof RSAKey){this.pubKey=params;}
this.state="VERIFY";};this.initVerifyByCertificatePEM=function(certPEM){var x509=new X509();x509.readCertPEM(certPEM);this.pubKey=x509.subjectPublicKeyRSA;this.state="VERIFY";};this.updateString=function(str){this.md.updateString(str);};this.updateHex=function(hex){this.md.updateHex(hex);};this.sign=function(){this.sHashHex=this.md.digest();if(typeof this.ecprvhex!="undefined"&&typeof this.eccurvename!="undefined"){var ec=new KJUR.crypto.ECDSA({'curve':this.eccurvename});this.hSign=ec.signHex(this.sHashHex,this.ecprvhex);}else if(this.pubkeyAlgName=="rsaandmgf1"){this.hSign=this.prvKey.signWithMessageHashPSS(this.sHashHex,this.mdAlgName,this.pssSaltLen);}else if(this.pubkeyAlgName=="rsa"){this.hSign=this.prvKey.signWithMessageHash(this.sHashHex,this.mdAlgName);}else if(this.prvKey instanceof KJUR.crypto.ECDSA){this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);}else if(this.prvKey instanceof KJUR.crypto.DSA){this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);}else{throw"Signature: unsupported public key alg: "+this.pubkeyAlgName;}
return this.hSign;};this.signString=function(str){this.updateString(str);this.sign();};this.signHex=function(hex){this.updateHex(hex);this.sign();};this.verify=function(hSigVal){this.sHashHex=this.md.digest();if(typeof this.ecpubhex!="undefined"&&typeof this.eccurvename!="undefined"){var ec=new KJUR.crypto.ECDSA({curve:this.eccurvename});return ec.verifyHex(this.sHashHex,hSigVal,this.ecpubhex);}else if(this.pubkeyAlgName=="rsaandmgf1"){return this.pubKey.verifyWithMessageHashPSS(this.sHashHex,hSigVal,this.mdAlgName,this.pssSaltLen);}else if(this.pubkeyAlgName=="rsa"){return this.pubKey.verifyWithMessageHash(this.sHashHex,hSigVal);}else if(this.pubKey instanceof KJUR.crypto.ECDSA){return this.pubKey.verifyWithMessageHash(this.sHashHex,hSigVal);}else if(this.pubKey instanceof KJUR.crypto.DSA){return this.pubKey.verifyWithMessageHash(this.sHashHex,hSigVal);}else{throw"Signature: unsupported public key alg: "+this.pubkeyAlgName;}};}};this.init=function(key,pass){throw"init(key, pass) not supported for this alg:prov="+
this.algProvName;};this.initVerifyByPublicKey=function(rsaPubKey){throw"initVerifyByPublicKey(rsaPubKeyy) not supported for this alg:prov="+
this.algProvName;};this.initVerifyByCertificatePEM=function(certPEM){throw"initVerifyByCertificatePEM(certPEM) not supported for this alg:prov="+
this.algProvName;};this.initSign=function(prvKey){throw"initSign(prvKey) not supported for this alg:prov="+this.algProvName;};this.updateString=function(str){throw"updateString(str) not supported for this alg:prov="+this.algProvName;};this.updateHex=function(hex){throw"updateHex(hex) not supported for this alg:prov="+this.algProvName;};this.sign=function(){throw"sign() not supported for this alg:prov="+this.algProvName;};this.signString=function(str){throw"digestString(str) not supported for this alg:prov="+this.algProvName;};this.signHex=function(hex){throw"digestHex(hex) not supported for this alg:prov="+this.algProvName;};this.verify=function(hSigVal){throw"verify(hSigVal) not supported for this alg:prov="+this.algProvName;};this.initParams=params;if(params!==undefined){if(params['alg']!==undefined){this.algName=params['alg'];if(params['prov']===undefined){this.provName=KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];}else{this.provName=params['prov'];}
this.algProvName=this.algName+":"+this.provName;this.setAlgAndProvider(this.algName,this.provName);this._setAlgNames();}
if(params['psssaltlen']!==undefined)this.pssSaltLen=params['psssaltlen'];if(params['prvkeypem']!==undefined){if(params['prvkeypas']!==undefined){throw"both prvkeypem and prvkeypas parameters not supported";}else{try{var prvKey=new RSAKey();prvKey.readPrivateKeyFromPEMString(params['prvkeypem']);this.initSign(prvKey);}catch(ex){throw"fatal error to load pem private key: "+ex;}}}}};KJUR.crypto.OID=new function(){this.oidhex2name={'2a864886f70d010101':'rsaEncryption','2a8648ce3d0201':'ecPublicKey','2a8648ce380401':'dsa','2a8648ce3d030107':'secp256r1','2b8104001f':'secp192k1','2b81040021':'secp224r1','2b8104000a':'secp256k1','2b81040023':'secp521r1','2b81040022':'secp384r1','2a8648ce380403':'SHA1withDSA','608648016503040301':'SHA224withDSA','608648016503040302':'SHA256withDSA',};};var JSEncryptExports={};(function(exports){var dbits;var canary=0xdeadbeefcafe;var j_lm=((canary&0xffffff)==0xefcafe);function BigInteger(a,b,c){if(a!=null)
if("number"==typeof a)this.fromNumber(a,b,c);else if(b==null&&"string"!=typeof a)this.fromString(a,256);else this.fromString(a,b);}
function nbi(){return new BigInteger(null);}
function am1(i,x,w,j,c,n){while(--n>=0){var v=x*this[i++]+w[j]+c;c=Math.floor(v/0x4000000);w[j++]=v&0x3ffffff;}
return c;}
function am2(i,x,w,j,c,n){var xl=x&0x7fff,xh=x>>15;while(--n>=0){var l=this[i]&0x7fff;var h=this[i++]>>15;var m=xh*l+h*xl;l=xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);c=(l>>>30)+(m>>>15)+xh*h+(c>>>30);w[j++]=l&0x3fffffff;}
return c;}
function am3(i,x,w,j,c,n){var xl=x&0x3fff,xh=x>>14;while(--n>=0){var l=this[i]&0x3fff;var h=this[i++]>>14;var m=xh*l+h*xl;l=xl*l+((m&0x3fff)<<14)+w[j]+c;c=(l>>28)+(m>>14)+xh*h;w[j++]=l&0xfffffff;}
return c;}
if(j_lm&&(navigator.appName=="Microsoft Internet Explorer")){BigInteger.prototype.am=am2;dbits=30;}
else if(j_lm&&(navigator.appName!="Netscape")){BigInteger.prototype.am=am1;dbits=26;}
else{BigInteger.prototype.am=am3;dbits=28;}
BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=((1<<dbits)-1);BigInteger.prototype.DV=(1<<dbits);var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC=new Array();var rr,vv;rr="0".charCodeAt(0);for(vv=0;vv<=9;++vv)BI_RC[rr++]=vv;rr="a".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;rr="A".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;function int2char(n){return BI_RM.charAt(n);}
function intAt(s,i){var c=BI_RC[s.charCodeAt(i)];return(c==null)?-1:c;}
function bnpCopyTo(r){for(var i=this.t-1;i>=0;--i)r[i]=this[i];r.t=this.t;r.s=this.s;}
function bnpFromInt(x){this.t=1;this.s=(x<0)?-1:0;if(x>0)this[0]=x;else if(x<-1)this[0]=x+DV;else this.t=0;}
function nbv(i){var r=nbi();r.fromInt(i);return r;}
function bnpFromString(s,b){var k;if(b==16)k=4;else if(b==8)k=3;else if(b==256)k=8;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else{this.fromRadix(s,b);return;}
this.t=0;this.s=0;var i=s.length,mi=false,sh=0;while(--i>=0){var x=(k==8)?s[i]&0xff:intAt(s,i);if(x<0){if(s.charAt(i)=="-")mi=true;continue;}
mi=false;if(sh==0)
this[this.t++]=x;else if(sh+k>this.DB){this[this.t-1]|=(x&((1<<(this.DB-sh))-1))<<sh;this[this.t++]=(x>>(this.DB-sh));}
else
this[this.t-1]|=x<<sh;sh+=k;if(sh>=this.DB)sh-=this.DB;}
if(k==8&&(s[0]&0x80)!=0){this.s=-1;if(sh>0)this[this.t-1]|=((1<<(this.DB-sh))-1)<<sh;}
this.clamp();if(mi)BigInteger.ZERO.subTo(this,this);}
function bnpClamp(){var c=this.s&this.DM;while(this.t>0&&this[this.t-1]==c)--this.t;}
function bnToString(b){if(this.s<0)return"-"+this.negate().toString(b);var k;if(b==16)k=4;else if(b==8)k=3;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else return this.toRadix(b);var km=(1<<k)-1,d,m=false,r="",i=this.t;var p=this.DB-(i*this.DB)%k;if(i-->0){if(p<this.DB&&(d=this[i]>>p)>0){m=true;r=int2char(d);}
while(i>=0){if(p<k){d=(this[i]&((1<<p)-1))<<(k-p);d|=this[--i]>>(p+=this.DB-k);}
else{d=(this[i]>>(p-=k))&km;if(p<=0){p+=this.DB;--i;}}
if(d>0)m=true;if(m)r+=int2char(d);}}
return m?r:"0";}
function bnNegate(){var r=nbi();BigInteger.ZERO.subTo(this,r);return r;}
function bnAbs(){return(this.s<0)?this.negate():this;}
function bnCompareTo(a){var r=this.s-a.s;if(r!=0)return r;var i=this.t;r=i-a.t;if(r!=0)return(this.s<0)?-r:r;while(--i>=0)if((r=this[i]-a[i])!=0)return r;return 0;}
function nbits(x){var r=1,t;if((t=x>>>16)!=0){x=t;r+=16;}
if((t=x>>8)!=0){x=t;r+=8;}
if((t=x>>4)!=0){x=t;r+=4;}
if((t=x>>2)!=0){x=t;r+=2;}
if((t=x>>1)!=0){x=t;r+=1;}
return r;}
function bnBitLength(){if(this.t<=0)return 0;return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));}
function bnpDLShiftTo(n,r){var i;for(i=this.t-1;i>=0;--i)r[i+n]=this[i];for(i=n-1;i>=0;--i)r[i]=0;r.t=this.t+n;r.s=this.s;}
function bnpDRShiftTo(n,r){for(var i=n;i<this.t;++i)r[i-n]=this[i];r.t=Math.max(this.t-n,0);r.s=this.s;}
function bnpLShiftTo(n,r){var bs=n%this.DB;var cbs=this.DB-bs;var bm=(1<<cbs)-1;var ds=Math.floor(n/this.DB),c=(this.s<<bs)&this.DM,i;for(i=this.t-1;i>=0;--i){r[i+ds+1]=(this[i]>>cbs)|c;c=(this[i]&bm)<<bs;}
for(i=ds-1;i>=0;--i)r[i]=0;r[ds]=c;r.t=this.t+ds+1;r.s=this.s;r.clamp();}
function bnpRShiftTo(n,r){r.s=this.s;var ds=Math.floor(n/this.DB);if(ds>=this.t){r.t=0;return;}
var bs=n%this.DB;var cbs=this.DB-bs;var bm=(1<<bs)-1;r[0]=this[ds]>>bs;for(var i=ds+1;i<this.t;++i){r[i-ds-1]|=(this[i]&bm)<<cbs;r[i-ds]=this[i]>>bs;}
if(bs>0)r[this.t-ds-1]|=(this.s&bm)<<cbs;r.t=this.t-ds;r.clamp();}
function bnpSubTo(a,r){var i=0,c=0,m=Math.min(a.t,this.t);while(i<m){c+=this[i]-a[i];r[i++]=c&this.DM;c>>=this.DB;}
if(a.t<this.t){c-=a.s;while(i<this.t){c+=this[i];r[i++]=c&this.DM;c>>=this.DB;}
c+=this.s;}
else{c+=this.s;while(i<a.t){c-=a[i];r[i++]=c&this.DM;c>>=this.DB;}
c-=a.s;}
r.s=(c<0)?-1:0;if(c<-1)r[i++]=this.DV+c;else if(c>0)r[i++]=c;r.t=i;r.clamp();}
function bnpMultiplyTo(a,r){var x=this.abs(),y=a.abs();var i=x.t;r.t=i+y.t;while(--i>=0)r[i]=0;for(i=0;i<y.t;++i)r[i+x.t]=x.am(0,y[i],r,i,0,x.t);r.s=0;r.clamp();if(this.s!=a.s)BigInteger.ZERO.subTo(r,r);}
function bnpSquareTo(r){var x=this.abs();var i=r.t=2*x.t;while(--i>=0)r[i]=0;for(i=0;i<x.t-1;++i){var c=x.am(i,x[i],r,2*i,0,1);if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.DV){r[i+x.t]-=x.DV;r[i+x.t+1]=1;}}
if(r.t>0)r[r.t-1]+=x.am(i,x[i],r,2*i,0,1);r.s=0;r.clamp();}
function bnpDivRemTo(m,q,r){var pm=m.abs();if(pm.t<=0)return;var pt=this.abs();if(pt.t<pm.t){if(q!=null)q.fromInt(0);if(r!=null)this.copyTo(r);return;}
if(r==null)r=nbi();var y=nbi(),ts=this.s,ms=m.s;var nsh=this.DB-nbits(pm[pm.t-1]);if(nsh>0){pm.lShiftTo(nsh,y);pt.lShiftTo(nsh,r);}
else{pm.copyTo(y);pt.copyTo(r);}
var ys=y.t;var y0=y[ys-1];if(y0==0)return;var yt=y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);var d1=this.FV/yt,d2=(1<<this.F1)/yt,e=1<<this.F2;var i=r.t,j=i-ys,t=(q==null)?nbi():q;y.dlShiftTo(j,t);if(r.compareTo(t)>=0){r[r.t++]=1;r.subTo(t,r);}
BigInteger.ONE.dlShiftTo(ys,t);t.subTo(y,y);while(y.t<ys)y[y.t++]=0;while(--j>=0){var qd=(r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);if((r[i]+=y.am(0,qd,r,j,0,ys))<qd){y.dlShiftTo(j,t);r.subTo(t,r);while(r[i]<--qd)r.subTo(t,r);}}
if(q!=null){r.drShiftTo(ys,q);if(ts!=ms)BigInteger.ZERO.subTo(q,q);}
r.t=ys;r.clamp();if(nsh>0)r.rShiftTo(nsh,r);if(ts<0)BigInteger.ZERO.subTo(r,r);}
function bnMod(a){var r=nbi();this.abs().divRemTo(a,null,r);if(this.s<0&&r.compareTo(BigInteger.ZERO)>0)a.subTo(r,r);return r;}
function Classic(m){this.m=m;}
function cConvert(x){if(x.s<0||x.compareTo(this.m)>=0)return x.mod(this.m);else return x;}
function cRevert(x){return x;}
function cReduce(x){x.divRemTo(this.m,null,x);}
function cMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r);}
function cSqrTo(x,r){x.squareTo(r);this.reduce(r);}
Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;function bnpInvDigit(){if(this.t<1)return 0;var x=this[0];if((x&1)==0)return 0;var y=x&3;y=(y*(2-(x&0xf)*y))&0xf;y=(y*(2-(x&0xff)*y))&0xff;y=(y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;y=(y*(2-x*y%this.DV))%this.DV;return(y>0)?this.DV-y:-y;}
function Montgomery(m){this.m=m;this.mp=m.invDigit();this.mpl=this.mp&0x7fff;this.mph=this.mp>>15;this.um=(1<<(m.DB-15))-1;this.mt2=2*m.t;}
function montConvert(x){var r=nbi();x.abs().dlShiftTo(this.m.t,r);r.divRemTo(this.m,null,r);if(x.s<0&&r.compareTo(BigInteger.ZERO)>0)this.m.subTo(r,r);return r;}
function montRevert(x){var r=nbi();x.copyTo(r);this.reduce(r);return r;}
function montReduce(x){while(x.t<=this.mt2)
x[x.t++]=0;for(var i=0;i<this.m.t;++i){var j=x[i]&0x7fff;var u0=(j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;j=i+this.m.t;x[j]+=this.m.am(0,u0,x,i,0,this.m.t);while(x[j]>=x.DV){x[j]-=x.DV;x[++j]++;}}
x.clamp();x.drShiftTo(this.m.t,x);if(x.compareTo(this.m)>=0)x.subTo(this.m,x);}
function montSqrTo(x,r){x.squareTo(r);this.reduce(r);}
function montMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r);}
Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){return((this.t>0)?(this[0]&1):this.s)==0;}
function bnpExp(e,z){if(e>0xffffffff||e<1)return BigInteger.ONE;var r=nbi(),r2=nbi(),g=z.convert(this),i=nbits(e)-1;g.copyTo(r);while(--i>=0){z.sqrTo(r,r2);if((e&(1<<i))>0)z.mulTo(r2,g,r);else{var t=r;r=r2;r2=t;}}
return z.revert(r);}
function bnModPowInt(e,m){var z;if(e<256||m.isEven())z=new Classic(m);else z=new Montgomery(m);return this.exp(e,z);}
BigInteger.prototype.copyTo=bnpCopyTo;BigInteger.prototype.fromInt=bnpFromInt;BigInteger.prototype.fromString=bnpFromString;BigInteger.prototype.clamp=bnpClamp;BigInteger.prototype.dlShiftTo=bnpDLShiftTo;BigInteger.prototype.drShiftTo=bnpDRShiftTo;BigInteger.prototype.lShiftTo=bnpLShiftTo;BigInteger.prototype.rShiftTo=bnpRShiftTo;BigInteger.prototype.subTo=bnpSubTo;BigInteger.prototype.multiplyTo=bnpMultiplyTo;BigInteger.prototype.squareTo=bnpSquareTo;BigInteger.prototype.divRemTo=bnpDivRemTo;BigInteger.prototype.invDigit=bnpInvDigit;BigInteger.prototype.isEven=bnpIsEven;BigInteger.prototype.exp=bnpExp;BigInteger.prototype.toString=bnToString;BigInteger.prototype.negate=bnNegate;BigInteger.prototype.abs=bnAbs;BigInteger.prototype.compareTo=bnCompareTo;BigInteger.prototype.bitLength=bnBitLength;BigInteger.prototype.mod=bnMod;BigInteger.prototype.modPowInt=bnModPowInt;BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);function bnClone(){var r=nbi();this.copyTo(r);return r;}
function bnIntValue(){if(this.s<0){if(this.t==1)return this[0]-this.DV;else if(this.t==0)return-1;}
else if(this.t==1)return this[0];else if(this.t==0)return 0;return((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];}
function bnByteValue(){return(this.t==0)?this.s:(this[0]<<24)>>24;}
function bnShortValue(){return(this.t==0)?this.s:(this[0]<<16)>>16;}
function bnpChunkSize(r){return Math.floor(Math.LN2*this.DB/Math.log(r));}
function bnSigNum(){if(this.s<0)return-1;else if(this.t<=0||(this.t==1&&this[0]<=0))return 0;else return 1;}
function bnpToRadix(b){if(b==null)b=10;if(this.signum()==0||b<2||b>36)return"0";var cs=this.chunkSize(b);var a=Math.pow(b,cs);var d=nbv(a),y=nbi(),z=nbi(),r="";this.divRemTo(d,y,z);while(y.signum()>0){r=(a+z.intValue()).toString(b).substr(1)+r;y.divRemTo(d,y,z);}
return z.intValue().toString(b)+r;}
function bnpFromRadix(s,b){this.fromInt(0);if(b==null)b=10;var cs=this.chunkSize(b);var d=Math.pow(b,cs),mi=false,j=0,w=0;for(var i=0;i<s.length;++i){var x=intAt(s,i);if(x<0){if(s.charAt(i)=="-"&&this.signum()==0)mi=true;continue;}
w=b*w+x;if(++j>=cs){this.dMultiply(d);this.dAddOffset(w,0);j=0;w=0;}}
if(j>0){this.dMultiply(Math.pow(b,j));this.dAddOffset(w,0);}
if(mi)BigInteger.ZERO.subTo(this,this);}
function bnpFromNumber(a,b,c){if("number"==typeof b){if(a<2)this.fromInt(1);else{this.fromNumber(a,c);if(!this.testBit(a-1))
this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);if(this.isEven())this.dAddOffset(1,0);while(!this.isProbablePrime(b)){this.dAddOffset(2,0);if(this.bitLength()>a)this.subTo(BigInteger.ONE.shiftLeft(a-1),this);}}}
else{var x=new Array(),t=a&7;x.length=(a>>3)+1;b.nextBytes(x);if(t>0)x[0]&=((1<<t)-1);else x[0]=0;this.fromString(x,256);}}
function bnToByteArray(){var i=this.t,r=new Array();r[0]=this.s;var p=this.DB-(i*this.DB)%8,d,k=0;if(i-->0){if(p<this.DB&&(d=this[i]>>p)!=(this.s&this.DM)>>p)
r[k++]=d|(this.s<<(this.DB-p));while(i>=0){if(p<8){d=(this[i]&((1<<p)-1))<<(8-p);d|=this[--i]>>(p+=this.DB-8);}
else{d=(this[i]>>(p-=8))&0xff;if(p<=0){p+=this.DB;--i;}}
if((d&0x80)!=0)d|=-256;if(k==0&&(this.s&0x80)!=(d&0x80))++k;if(k>0||d!=this.s)r[k++]=d;}}
return r;}
function bnEquals(a){return(this.compareTo(a)==0);}
function bnMin(a){return(this.compareTo(a)<0)?this:a;}
function bnMax(a){return(this.compareTo(a)>0)?this:a;}
function bnpBitwiseTo(a,op,r){var i,f,m=Math.min(a.t,this.t);for(i=0;i<m;++i)r[i]=op(this[i],a[i]);if(a.t<this.t){f=a.s&this.DM;for(i=m;i<this.t;++i)r[i]=op(this[i],f);r.t=this.t;}
else{f=this.s&this.DM;for(i=m;i<a.t;++i)r[i]=op(f,a[i]);r.t=a.t;}
r.s=op(this.s,a.s);r.clamp();}
function op_and(x,y){return x&y;}
function bnAnd(a){var r=nbi();this.bitwiseTo(a,op_and,r);return r;}
function op_or(x,y){return x|y;}
function bnOr(a){var r=nbi();this.bitwiseTo(a,op_or,r);return r;}
function op_xor(x,y){return x^y;}
function bnXor(a){var r=nbi();this.bitwiseTo(a,op_xor,r);return r;}
function op_andnot(x,y){return x&~y;}
function bnAndNot(a){var r=nbi();this.bitwiseTo(a,op_andnot,r);return r;}
function bnNot(){var r=nbi();for(var i=0;i<this.t;++i)r[i]=this.DM&~this[i];r.t=this.t;r.s=~this.s;return r;}
function bnShiftLeft(n){var r=nbi();if(n<0)this.rShiftTo(-n,r);else this.lShiftTo(n,r);return r;}
function bnShiftRight(n){var r=nbi();if(n<0)this.lShiftTo(-n,r);else this.rShiftTo(n,r);return r;}
function lbit(x){if(x==0)return-1;var r=0;if((x&0xffff)==0){x>>=16;r+=16;}
if((x&0xff)==0){x>>=8;r+=8;}
if((x&0xf)==0){x>>=4;r+=4;}
if((x&3)==0){x>>=2;r+=2;}
if((x&1)==0)++r;return r;}
function bnGetLowestSetBit(){for(var i=0;i<this.t;++i)
if(this[i]!=0)return i*this.DB+lbit(this[i]);if(this.s<0)return this.t*this.DB;return-1;}
function cbit(x){var r=0;while(x!=0){x&=x-1;++r;}
return r;}
function bnBitCount(){var r=0,x=this.s&this.DM;for(var i=0;i<this.t;++i)r+=cbit(this[i]^x);return r;}
function bnTestBit(n){var j=Math.floor(n/this.DB);if(j>=this.t)return(this.s!=0);return((this[j]&(1<<(n%this.DB)))!=0);}
function bnpChangeBit(n,op){var r=BigInteger.ONE.shiftLeft(n);this.bitwiseTo(r,op,r);return r;}
function bnSetBit(n){return this.changeBit(n,op_or);}
function bnClearBit(n){return this.changeBit(n,op_andnot);}
function bnFlipBit(n){return this.changeBit(n,op_xor);}
function bnpAddTo(a,r){var i=0,c=0,m=Math.min(a.t,this.t);while(i<m){c+=this[i]+a[i];r[i++]=c&this.DM;c>>=this.DB;}
if(a.t<this.t){c+=a.s;while(i<this.t){c+=this[i];r[i++]=c&this.DM;c>>=this.DB;}
c+=this.s;}
else{c+=this.s;while(i<a.t){c+=a[i];r[i++]=c&this.DM;c>>=this.DB;}
c+=a.s;}
r.s=(c<0)?-1:0;if(c>0)r[i++]=c;else if(c<-1)r[i++]=this.DV+c;r.t=i;r.clamp();}
function bnAdd(a){var r=nbi();this.addTo(a,r);return r;}
function bnSubtract(a){var r=nbi();this.subTo(a,r);return r;}
function bnMultiply(a){var r=nbi();this.multiplyTo(a,r);return r;}
function bnSquare(){var r=nbi();this.squareTo(r);return r;}
function bnDivide(a){var r=nbi();this.divRemTo(a,r,null);return r;}
function bnRemainder(a){var r=nbi();this.divRemTo(a,null,r);return r;}
function bnDivideAndRemainder(a){var q=nbi(),r=nbi();this.divRemTo(a,q,r);return new Array(q,r);}
function bnpDMultiply(n){this[this.t]=this.am(0,n-1,this,0,0,this.t);++this.t;this.clamp();}
function bnpDAddOffset(n,w){if(n==0)return;while(this.t<=w)this[this.t++]=0;this[w]+=n;while(this[w]>=this.DV){this[w]-=this.DV;if(++w>=this.t)this[this.t++]=0;++this[w];}}
function NullExp(){}
function nNop(x){return x;}
function nMulTo(x,y,r){x.multiplyTo(y,r);}
function nSqrTo(x,r){x.squareTo(r);}
NullExp.prototype.convert=nNop;NullExp.prototype.revert=nNop;NullExp.prototype.mulTo=nMulTo;NullExp.prototype.sqrTo=nSqrTo;function bnPow(e){return this.exp(e,new NullExp());}
function bnpMultiplyLowerTo(a,n,r){var i=Math.min(this.t+a.t,n);r.s=0;r.t=i;while(i>0)r[--i]=0;var j;for(j=r.t-this.t;i<j;++i)r[i+this.t]=this.am(0,a[i],r,i,0,this.t);for(j=Math.min(a.t,n);i<j;++i)this.am(0,a[i],r,i,0,n-i);r.clamp();}
function bnpMultiplyUpperTo(a,n,r){--n;var i=r.t=this.t+a.t-n;r.s=0;while(--i>=0)r[i]=0;for(i=Math.max(n-this.t,0);i<a.t;++i)
r[this.t+i-n]=this.am(n-i,a[i],r,0,0,this.t+i-n);r.clamp();r.drShiftTo(1,r);}
function Barrett(m){this.r2=nbi();this.q3=nbi();BigInteger.ONE.dlShiftTo(2*m.t,this.r2);this.mu=this.r2.divide(m);this.m=m;}
function barrettConvert(x){if(x.s<0||x.t>2*this.m.t)return x.mod(this.m);else if(x.compareTo(this.m)<0)return x;else{var r=nbi();x.copyTo(r);this.reduce(r);return r;}}
function barrettRevert(x){return x;}
function barrettReduce(x){x.drShiftTo(this.m.t-1,this.r2);if(x.t>this.m.t+1){x.t=this.m.t+1;x.clamp();}
this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);while(x.compareTo(this.r2)<0)x.dAddOffset(1,this.m.t+1);x.subTo(this.r2,x);while(x.compareTo(this.m)>=0)x.subTo(this.m,x);}
function barrettSqrTo(x,r){x.squareTo(r);this.reduce(r);}
function barrettMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r);}
Barrett.prototype.convert=barrettConvert;Barrett.prototype.revert=barrettRevert;Barrett.prototype.reduce=barrettReduce;Barrett.prototype.mulTo=barrettMulTo;Barrett.prototype.sqrTo=barrettSqrTo;function bnModPow(e,m){var i=e.bitLength(),k,r=nbv(1),z;if(i<=0)return r;else if(i<18)k=1;else if(i<48)k=3;else if(i<144)k=4;else if(i<768)k=5;else k=6;if(i<8)
z=new Classic(m);else if(m.isEven())
z=new Barrett(m);else
z=new Montgomery(m);var g=new Array(),n=3,k1=k-1,km=(1<<k)-1;g[1]=z.convert(this);if(k>1){var g2=nbi();z.sqrTo(g[1],g2);while(n<=km){g[n]=nbi();z.mulTo(g2,g[n-2],g[n]);n+=2;}}
var j=e.t-1,w,is1=true,r2=nbi(),t;i=nbits(e[j])-1;while(j>=0){if(i>=k1)w=(e[j]>>(i-k1))&km;else{w=(e[j]&((1<<(i+1))-1))<<(k1-i);if(j>0)w|=e[j-1]>>(this.DB+i-k1);}
n=k;while((w&1)==0){w>>=1;--n;}
if((i-=n)<0){i+=this.DB;--j;}
if(is1){g[w].copyTo(r);is1=false;}
else{while(n>1){z.sqrTo(r,r2);z.sqrTo(r2,r);n-=2;}
if(n>0)z.sqrTo(r,r2);else{t=r;r=r2;r2=t;}
z.mulTo(r2,g[w],r);}
while(j>=0&&(e[j]&(1<<i))==0){z.sqrTo(r,r2);t=r;r=r2;r2=t;if(--i<0){i=this.DB-1;--j;}}}
return z.revert(r);}
function bnGCD(a){var x=(this.s<0)?this.negate():this.clone();var y=(a.s<0)?a.negate():a.clone();if(x.compareTo(y)<0){var t=x;x=y;y=t;}
var i=x.getLowestSetBit(),g=y.getLowestSetBit();if(g<0)return x;if(i<g)g=i;if(g>0){x.rShiftTo(g,x);y.rShiftTo(g,y);}
while(x.signum()>0){if((i=x.getLowestSetBit())>0)x.rShiftTo(i,x);if((i=y.getLowestSetBit())>0)y.rShiftTo(i,y);if(x.compareTo(y)>=0){x.subTo(y,x);x.rShiftTo(1,x);}
else{y.subTo(x,y);y.rShiftTo(1,y);}}
if(g>0)y.lShiftTo(g,y);return y;}
function bnpModInt(n){if(n<=0)return 0;var d=this.DV%n,r=(this.s<0)?n-1:0;if(this.t>0)
if(d==0)r=this[0]%n;else for(var i=this.t-1;i>=0;--i)r=(d*r+this[i])%n;return r;}
function bnModInverse(m){var ac=m.isEven();if((this.isEven()&&ac)||m.signum()==0)return BigInteger.ZERO;var u=m.clone(),v=this.clone();var a=nbv(1),b=nbv(0),c=nbv(0),d=nbv(1);while(u.signum()!=0){while(u.isEven()){u.rShiftTo(1,u);if(ac){if(!a.isEven()||!b.isEven()){a.addTo(this,a);b.subTo(m,b);}
a.rShiftTo(1,a);}
else if(!b.isEven())b.subTo(m,b);b.rShiftTo(1,b);}
while(v.isEven()){v.rShiftTo(1,v);if(ac){if(!c.isEven()||!d.isEven()){c.addTo(this,c);d.subTo(m,d);}
c.rShiftTo(1,c);}
else if(!d.isEven())d.subTo(m,d);d.rShiftTo(1,d);}
if(u.compareTo(v)>=0){u.subTo(v,u);if(ac)a.subTo(c,a);b.subTo(d,b);}
else{v.subTo(u,v);if(ac)c.subTo(a,c);d.subTo(b,d);}}
if(v.compareTo(BigInteger.ONE)!=0)return BigInteger.ZERO;if(d.compareTo(m)>=0)return d.subtract(m);if(d.signum()<0)d.addTo(m,d);else return d;if(d.signum()<0)return d.add(m);else return d;}
var lowprimes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];var lplim=(1<<26)/lowprimes[lowprimes.length-1];function bnIsProbablePrime(t){var i,x=this.abs();if(x.t==1&&x[0]<=lowprimes[lowprimes.length-1]){for(i=0;i<lowprimes.length;++i)
if(x[0]==lowprimes[i])return true;return false;}
if(x.isEven())return false;i=1;while(i<lowprimes.length){var m=lowprimes[i],j=i+1;while(j<lowprimes.length&&m<lplim)m*=lowprimes[j++];m=x.modInt(m);while(i<j)if(m%lowprimes[i++]==0)return false;}
return x.millerRabin(t);}
function bnpMillerRabin(t){var n1=this.subtract(BigInteger.ONE);var k=n1.getLowestSetBit();if(k<=0)return false;var r=n1.shiftRight(k);t=(t+1)>>1;if(t>lowprimes.length)t=lowprimes.length;var a=nbi();for(var i=0;i<t;++i){a.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]);var y=a.modPow(r,this);if(y.compareTo(BigInteger.ONE)!=0&&y.compareTo(n1)!=0){var j=1;while(j++<k&&y.compareTo(n1)!=0){y=y.modPowInt(2,this);if(y.compareTo(BigInteger.ONE)==0)return false;}
if(y.compareTo(n1)!=0)return false;}}
return true;}
BigInteger.prototype.chunkSize=bnpChunkSize;BigInteger.prototype.toRadix=bnpToRadix;BigInteger.prototype.fromRadix=bnpFromRadix;BigInteger.prototype.fromNumber=bnpFromNumber;BigInteger.prototype.bitwiseTo=bnpBitwiseTo;BigInteger.prototype.changeBit=bnpChangeBit;BigInteger.prototype.addTo=bnpAddTo;BigInteger.prototype.dMultiply=bnpDMultiply;BigInteger.prototype.dAddOffset=bnpDAddOffset;BigInteger.prototype.multiplyLowerTo=bnpMultiplyLowerTo;BigInteger.prototype.multiplyUpperTo=bnpMultiplyUpperTo;BigInteger.prototype.modInt=bnpModInt;BigInteger.prototype.millerRabin=bnpMillerRabin;BigInteger.prototype.clone=bnClone;BigInteger.prototype.intValue=bnIntValue;BigInteger.prototype.byteValue=bnByteValue;BigInteger.prototype.shortValue=bnShortValue;BigInteger.prototype.signum=bnSigNum;BigInteger.prototype.toByteArray=bnToByteArray;BigInteger.prototype.equals=bnEquals;BigInteger.prototype.min=bnMin;BigInteger.prototype.max=bnMax;BigInteger.prototype.and=bnAnd;BigInteger.prototype.or=bnOr;BigInteger.prototype.xor=bnXor;BigInteger.prototype.andNot=bnAndNot;BigInteger.prototype.not=bnNot;BigInteger.prototype.shiftLeft=bnShiftLeft;BigInteger.prototype.shiftRight=bnShiftRight;BigInteger.prototype.getLowestSetBit=bnGetLowestSetBit;BigInteger.prototype.bitCount=bnBitCount;BigInteger.prototype.testBit=bnTestBit;BigInteger.prototype.setBit=bnSetBit;BigInteger.prototype.clearBit=bnClearBit;BigInteger.prototype.flipBit=bnFlipBit;BigInteger.prototype.add=bnAdd;BigInteger.prototype.subtract=bnSubtract;BigInteger.prototype.multiply=bnMultiply;BigInteger.prototype.divide=bnDivide;BigInteger.prototype.remainder=bnRemainder;BigInteger.prototype.divideAndRemainder=bnDivideAndRemainder;BigInteger.prototype.modPow=bnModPow;BigInteger.prototype.modInverse=bnModInverse;BigInteger.prototype.pow=bnPow;BigInteger.prototype.gcd=bnGCD;BigInteger.prototype.isProbablePrime=bnIsProbablePrime;BigInteger.prototype.square=bnSquare;function Arcfour(){this.i=0;this.j=0;this.S=new Array();}
function ARC4init(key){var i,j,t;for(i=0;i<256;++i)
this.S[i]=i;j=0;for(i=0;i<256;++i){j=(j+this.S[i]+key[i%key.length])&255;t=this.S[i];this.S[i]=this.S[j];this.S[j]=t;}
this.i=0;this.j=0;}
function ARC4next(){var t;this.i=(this.i+1)&255;this.j=(this.j+this.S[this.i])&255;t=this.S[this.i];this.S[this.i]=this.S[this.j];this.S[this.j]=t;return this.S[(t+this.S[this.i])&255];}
Arcfour.prototype.init=ARC4init;Arcfour.prototype.next=ARC4next;function prng_newstate(){return new Arcfour();}
var rng_psize=256;var rng_state;var rng_pool;var rng_pptr;function rng_seed_int(x){rng_pool[rng_pptr++]^=x&255;rng_pool[rng_pptr++]^=(x>>8)&255;rng_pool[rng_pptr++]^=(x>>16)&255;rng_pool[rng_pptr++]^=(x>>24)&255;if(rng_pptr>=rng_psize)rng_pptr-=rng_psize;}
function rng_seed_time(){rng_seed_int(new Date().getTime());}
if(rng_pool==null){rng_pool=new Array();rng_pptr=0;var t;if(navigator.appName=="Netscape"&&navigator.appVersion<"5"&&window.crypto){var z=window.crypto.random(32);for(t=0;t<z.length;++t)
rng_pool[rng_pptr++]=z.charCodeAt(t)&255;}
while(rng_pptr<rng_psize){t=Math.floor(65536*Math.random());rng_pool[rng_pptr++]=t>>>8;rng_pool[rng_pptr++]=t&255;}
rng_pptr=0;rng_seed_time();}
function rng_get_byte(){if(rng_state==null){rng_seed_time();rng_state=prng_newstate();rng_state.init(rng_pool);for(rng_pptr=0;rng_pptr<rng_pool.length;++rng_pptr)
rng_pool[rng_pptr]=0;rng_pptr=0;}
return rng_state.next();}
function rng_get_bytes(ba){var i;for(i=0;i<ba.length;++i)ba[i]=rng_get_byte();}
function SecureRandom(){}
SecureRandom.prototype.nextBytes=rng_get_bytes;function parseBigInt(str,r){return new BigInteger(str,r);}
function linebrk(s,n){var ret="";var i=0;while(i+n<s.length){ret+=s.substring(i,i+n)+"\n";i+=n;}
return ret+s.substring(i,s.length);}
function byte2Hex(b){if(b<0x10)
return"0"+b.toString(16);else
return b.toString(16);}
function pkcs1pad2(s,n){if(n<s.length+11){console.error("Message too long for RSA");return null;}
var ba=new Array();var i=s.length-1;while(i>=0&&n>0){var c=s.charCodeAt(i--);if(c<128){ba[--n]=c;}
else if((c>127)&&(c<2048)){ba[--n]=(c&63)|128;ba[--n]=(c>>6)|192;}
else{ba[--n]=(c&63)|128;ba[--n]=((c>>6)&63)|128;ba[--n]=(c>>12)|224;}}
ba[--n]=0;var rng=new SecureRandom();var x=new Array();while(n>2){x[0]=0;while(x[0]==0)rng.nextBytes(x);ba[--n]=x[0];}
ba[--n]=2;ba[--n]=0;return new BigInteger(ba);}
function RSAKey(){this.n=null;this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null;}
function RSASetPublic(N,E){if(N!=null&&E!=null&&N.length>0&&E.length>0){this.n=parseBigInt(N,16);this.e=parseInt(E,16);}
else
console.error("Invalid RSA public key");}
function RSADoPublic(x){return x.modPowInt(this.e,this.n);}
function RSAEncrypt(text){var m=pkcs1pad2(text,(this.n.bitLength()+7)>>3);if(m==null)return null;var c=this.doPublic(m);if(c==null)return null;var h=c.toString(16);if((h.length&1)==0)return h;else return"0"+h;}
RSAKey.prototype.doPublic=RSADoPublic;RSAKey.prototype.setPublic=RSASetPublic;RSAKey.prototype.encrypt=RSAEncrypt;function pkcs1unpad2(d,n){var b=d.toByteArray();var i=0;while(i<b.length&&b[i]==0)++i;if(b.length-i!=n-1||b[i]!=2)
return null;++i;while(b[i]!=0)
if(++i>=b.length)return null;var ret="";while(++i<b.length){var c=b[i]&255;if(c<128){ret+=String.fromCharCode(c);}
else if((c>191)&&(c<224)){ret+=String.fromCharCode(((c&31)<<6)|(b[i+1]&63));++i;}
else{ret+=String.fromCharCode(((c&15)<<12)|((b[i+1]&63)<<6)|(b[i+2]&63));i+=2;}}
return ret;}
function RSASetPrivate(N,E,D){if(N!=null&&E!=null&&N.length>0&&E.length>0){this.n=parseBigInt(N,16);this.e=parseInt(E,16);this.d=parseBigInt(D,16);}
else
console.error("Invalid RSA private key");}
function RSASetPrivateEx(N,E,D,P,Q,DP,DQ,C){if(N!=null&&E!=null&&N.length>0&&E.length>0){this.n=parseBigInt(N,16);this.e=parseInt(E,16);this.d=parseBigInt(D,16);this.p=parseBigInt(P,16);this.q=parseBigInt(Q,16);this.dmp1=parseBigInt(DP,16);this.dmq1=parseBigInt(DQ,16);this.coeff=parseBigInt(C,16);}
else
console.error("Invalid RSA private key");}
function RSAGenerate(B,E){var rng=new SecureRandom();var qs=B>>1;this.e=parseInt(E,16);var ee=new BigInteger(E,16);for(;;){for(;;){this.p=new BigInteger(B-qs,1,rng);if(this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE)==0&&this.p.isProbablePrime(10))break;}
for(;;){this.q=new BigInteger(qs,1,rng);if(this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE)==0&&this.q.isProbablePrime(10))break;}
if(this.p.compareTo(this.q)<=0){var t=this.p;this.p=this.q;this.q=t;}
var p1=this.p.subtract(BigInteger.ONE);var q1=this.q.subtract(BigInteger.ONE);var phi=p1.multiply(q1);if(phi.gcd(ee).compareTo(BigInteger.ONE)==0){this.n=this.p.multiply(this.q);this.d=ee.modInverse(phi);this.dmp1=this.d.mod(p1);this.dmq1=this.d.mod(q1);this.coeff=this.q.modInverse(this.p);break;}}}
function RSADoPrivate(x){if(this.p==null||this.q==null)
return x.modPow(this.d,this.n);var xp=x.mod(this.p).modPow(this.dmp1,this.p);var xq=x.mod(this.q).modPow(this.dmq1,this.q);while(xp.compareTo(xq)<0)
xp=xp.add(this.p);return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);}
function RSADecrypt(ctext){var c=parseBigInt(ctext,16);var m=this.doPrivate(c);if(m==null)return null;return pkcs1unpad2(m,(this.n.bitLength()+7)>>3);}
RSAKey.prototype.doPrivate=RSADoPrivate;RSAKey.prototype.setPrivate=RSASetPrivate;RSAKey.prototype.setPrivateEx=RSASetPrivateEx;RSAKey.prototype.generate=RSAGenerate;RSAKey.prototype.decrypt=RSADecrypt;(function(){var RSAGenerateAsync=function(B,E,callback){var rng=new SecureRandom();var qs=B>>1;this.e=parseInt(E,16);var ee=new BigInteger(E,16);var rsa=this;var loop1=function(){var loop4=function(){if(rsa.p.compareTo(rsa.q)<=0){var t=rsa.p;rsa.p=rsa.q;rsa.q=t;}
var p1=rsa.p.subtract(BigInteger.ONE);var q1=rsa.q.subtract(BigInteger.ONE);var phi=p1.multiply(q1);if(phi.gcd(ee).compareTo(BigInteger.ONE)==0){rsa.n=rsa.p.multiply(rsa.q);rsa.d=ee.modInverse(phi);rsa.dmp1=rsa.d.mod(p1);rsa.dmq1=rsa.d.mod(q1);rsa.coeff=rsa.q.modInverse(rsa.p);setTimeout(function(){callback()},0);}else{setTimeout(loop1,0);}};var loop3=function(){rsa.q=nbi();rsa.q.fromNumberAsync(qs,1,rng,function(){rsa.q.subtract(BigInteger.ONE).gcda(ee,function(r){if(r.compareTo(BigInteger.ONE)==0&&rsa.q.isProbablePrime(10)){setTimeout(loop4,0);}else{setTimeout(loop3,0);}});});};var loop2=function(){rsa.p=nbi();rsa.p.fromNumberAsync(B-qs,1,rng,function(){rsa.p.subtract(BigInteger.ONE).gcda(ee,function(r){if(r.compareTo(BigInteger.ONE)==0&&rsa.p.isProbablePrime(10)){setTimeout(loop3,0);}else{setTimeout(loop2,0);}});});};setTimeout(loop2,0);};setTimeout(loop1,0);};RSAKey.prototype.generateAsync=RSAGenerateAsync;var bnGCDAsync=function(a,callback){var x=(this.s<0)?this.negate():this.clone();var y=(a.s<0)?a.negate():a.clone();if(x.compareTo(y)<0){var t=x;x=y;y=t;}
var i=x.getLowestSetBit(),g=y.getLowestSetBit();if(g<0){callback(x);return;}
if(i<g)g=i;if(g>0){x.rShiftTo(g,x);y.rShiftTo(g,y);}
var gcda1=function(){if((i=x.getLowestSetBit())>0){x.rShiftTo(i,x);}
if((i=y.getLowestSetBit())>0){y.rShiftTo(i,y);}
if(x.compareTo(y)>=0){x.subTo(y,x);x.rShiftTo(1,x);}else{y.subTo(x,y);y.rShiftTo(1,y);}
if(!(x.signum()>0)){if(g>0)y.lShiftTo(g,y);setTimeout(function(){callback(y)},0);}else{setTimeout(gcda1,0);}};setTimeout(gcda1,10);};BigInteger.prototype.gcda=bnGCDAsync;var bnpFromNumberAsync=function(a,b,c,callback){if("number"==typeof b){if(a<2){this.fromInt(1);}else{this.fromNumber(a,c);if(!this.testBit(a-1)){this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);}
if(this.isEven()){this.dAddOffset(1,0);}
var bnp=this;var bnpfn1=function(){bnp.dAddOffset(2,0);if(bnp.bitLength()>a)bnp.subTo(BigInteger.ONE.shiftLeft(a-1),bnp);if(bnp.isProbablePrime(b)){setTimeout(function(){callback()},0);}else{setTimeout(bnpfn1,0);}};setTimeout(bnpfn1,0);}}else{var x=new Array(),t=a&7;x.length=(a>>3)+1;b.nextBytes(x);if(t>0)x[0]&=((1<<t)-1);else x[0]=0;this.fromString(x,256);}};BigInteger.prototype.fromNumberAsync=bnpFromNumberAsync;})();var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64pad="=";function hex2b64(h){var i;var c;var ret="";for(i=0;i+3<=h.length;i+=3){c=parseInt(h.substring(i,i+3),16);ret+=b64map.charAt(c>>6)+b64map.charAt(c&63);}
if(i+1==h.length){c=parseInt(h.substring(i,i+1),16);ret+=b64map.charAt(c<<2);}
else if(i+2==h.length){c=parseInt(h.substring(i,i+2),16);ret+=b64map.charAt(c>>2)+b64map.charAt((c&3)<<4);}
while((ret.length&3)>0)ret+=b64pad;return ret;}
function b64tohex(s){var ret=""
var i;var k=0;var slop;for(i=0;i<s.length;++i){if(s.charAt(i)==b64pad)break;v=b64map.indexOf(s.charAt(i));if(v<0)continue;if(k==0){ret+=int2char(v>>2);slop=v&3;k=1;}
else if(k==1){ret+=int2char((slop<<2)|(v>>4));slop=v&0xf;k=2;}
else if(k==2){ret+=int2char(slop);ret+=int2char(v>>2);slop=v&3;k=3;}
else{ret+=int2char((slop<<2)|(v>>4));ret+=int2char(v&0xf);k=0;}}
if(k==1)
ret+=int2char(slop<<2);return ret;}
function b64toBA(s){var h=b64tohex(s);var i;var a=new Array();for(i=0;2*i<h.length;++i){a[i]=parseInt(h.substring(2*i,2*i+2),16);}
return a;}
var JSX=JSX||{};JSX.env=JSX.env||{};var L=JSX,OP=Object.prototype,FUNCTION_TOSTRING='[object Function]',ADD=["toString","valueOf"];JSX.env.parseUA=function(agent){var numberify=function(s){var c=0;return parseFloat(s.replace(/\./g,function(){return(c++==1)?'':'.';}));},nav=navigator,o={ie:0,opera:0,gecko:0,webkit:0,chrome:0,mobile:null,air:0,ipad:0,iphone:0,ipod:0,ios:null,android:0,webos:0,caja:nav&&nav.cajaVersion,secure:false,os:null},ua=agent||(navigator&&navigator.userAgent),loc=window&&window.location,href=loc&&loc.href,m;o.secure=href&&(href.toLowerCase().indexOf("https")===0);if(ua){if((/windows|win32/i).test(ua)){o.os='windows';}else if((/macintosh/i).test(ua)){o.os='macintosh';}else if((/rhino/i).test(ua)){o.os='rhino';}
if((/KHTML/).test(ua)){o.webkit=1;}
m=ua.match(/AppleWebKit\/([^\s]*)/);if(m&&m[1]){o.webkit=numberify(m[1]);if(/ Mobile\//.test(ua)){o.mobile='Apple';m=ua.match(/OS ([^\s]*)/);if(m&&m[1]){m=numberify(m[1].replace('_','.'));}
o.ios=m;o.ipad=o.ipod=o.iphone=0;m=ua.match(/iPad|iPod|iPhone/);if(m&&m[0]){o[m[0].toLowerCase()]=o.ios;}}else{m=ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);if(m){o.mobile=m[0];}
if(/webOS/.test(ua)){o.mobile='WebOS';m=ua.match(/webOS\/([^\s]*);/);if(m&&m[1]){o.webos=numberify(m[1]);}}
if(/ Android/.test(ua)){o.mobile='Android';m=ua.match(/Android ([^\s]*);/);if(m&&m[1]){o.android=numberify(m[1]);}}}
m=ua.match(/Chrome\/([^\s]*)/);if(m&&m[1]){o.chrome=numberify(m[1]);}else{m=ua.match(/AdobeAIR\/([^\s]*)/);if(m){o.air=m[0];}}}
if(!o.webkit){m=ua.match(/Opera[\s\/]([^\s]*)/);if(m&&m[1]){o.opera=numberify(m[1]);m=ua.match(/Version\/([^\s]*)/);if(m&&m[1]){o.opera=numberify(m[1]);}
m=ua.match(/Opera Mini[^;]*/);if(m){o.mobile=m[0];}}else{m=ua.match(/MSIE\s([^;]*)/);if(m&&m[1]){o.ie=numberify(m[1]);}else{m=ua.match(/Gecko\/([^\s]*)/);if(m){o.gecko=1;m=ua.match(/rv:([^\s\)]*)/);if(m&&m[1]){o.gecko=numberify(m[1]);}}}}}}
return o;};JSX.env.ua=JSX.env.parseUA();JSX.isFunction=function(o){return(typeof o==='function')||OP.toString.apply(o)===FUNCTION_TOSTRING;};JSX._IEEnumFix=(JSX.env.ua.ie)?function(r,s){var i,fname,f;for(i=0;i<ADD.length;i=i+1){fname=ADD[i];f=s[fname];if(L.isFunction(f)&&f!=OP[fname]){r[fname]=f;}}}:function(){};JSX.extend=function(subc,superc,overrides){if(!superc||!subc){throw new Error("extend failed, please check that "+"all dependencies are included.");}
var F=function(){},i;F.prototype=superc.prototype;subc.prototype=new F();subc.prototype.constructor=subc;subc.superclass=superc.prototype;if(superc.prototype.constructor==OP.constructor){superc.prototype.constructor=superc;}
if(overrides){for(i in overrides){if(L.hasOwnProperty(overrides,i)){subc.prototype[i]=overrides[i];}}
L._IEEnumFix(subc.prototype,overrides);}};if(typeof KJUR=="undefined"||!KJUR)KJUR={};if(typeof KJUR.asn1=="undefined"||!KJUR.asn1)KJUR.asn1={};KJUR.asn1.ASN1Util=new function(){this.integerToByteHex=function(i){var h=i.toString(16);if((h.length%2)==1)h='0'+h;return h;};this.bigIntToMinTwosComplementsHex=function(bigIntegerValue){var h=bigIntegerValue.toString(16);if(h.substr(0,1)!='-'){if(h.length%2==1){h='0'+h;}else{if(!h.match(/^[0-7]/)){h='00'+h;}}}else{var hPos=h.substr(1);var xorLen=hPos.length;if(xorLen%2==1){xorLen+=1;}else{if(!h.match(/^[0-7]/)){xorLen+=2;}}
var hMask='';for(var i=0;i<xorLen;i++){hMask+='f';}
var biMask=new BigInteger(hMask,16);var biNeg=biMask.xor(bigIntegerValue).add(BigInteger.ONE);h=biNeg.toString(16).replace(/^-/,'');}
return h;};this.getPEMStringFromHex=function(dataHex,pemHeader){var dataWA=CryptoJS.enc.Hex.parse(dataHex);var dataB64=CryptoJS.enc.Base64.stringify(dataWA);var pemBody=dataB64.replace(/(.{64})/g,"$1\r\n");pemBody=pemBody.replace(/\r\n$/,'');return"-----BEGIN "+pemHeader+"-----\r\n"+
pemBody+"\r\n-----END "+pemHeader+"-----\r\n";};};KJUR.asn1.ASN1Object=function(){var isModified=true;var hTLV=null;var hT='00'
var hL='00';var hV='';this.getLengthHexFromValue=function(){if(typeof this.hV=="undefined"||this.hV==null){throw"this.hV is null or undefined.";}
if(this.hV.length%2==1){throw"value hex must be even length: n="+hV.length+",v="+this.hV;}
var n=this.hV.length/2;var hN=n.toString(16);if(hN.length%2==1){hN="0"+hN;}
if(n<128){return hN;}else{var hNlen=hN.length/2;if(hNlen>15){throw"ASN.1 length too long to represent by 8x: n = "+n.toString(16);}
var head=128+hNlen;return head.toString(16)+hN;}};this.getEncodedHex=function(){if(this.hTLV==null||this.isModified){this.hV=this.getFreshValueHex();this.hL=this.getLengthHexFromValue();this.hTLV=this.hT+this.hL+this.hV;this.isModified=false;}
return this.hTLV;};this.getValueHex=function(){this.getEncodedHex();return this.hV;}
this.getFreshValueHex=function(){return'';};};KJUR.asn1.DERAbstractString=function(params){KJUR.asn1.DERAbstractString.superclass.constructor.call(this);var s=null;var hV=null;this.getString=function(){return this.s;};this.setString=function(newS){this.hTLV=null;this.isModified=true;this.s=newS;this.hV=stohex(this.s);};this.setStringHex=function(newHexString){this.hTLV=null;this.isModified=true;this.s=null;this.hV=newHexString;};this.getFreshValueHex=function(){return this.hV;};if(typeof params!="undefined"){if(typeof params['str']!="undefined"){this.setString(params['str']);}else if(typeof params['hex']!="undefined"){this.setStringHex(params['hex']);}}};JSX.extend(KJUR.asn1.DERAbstractString,KJUR.asn1.ASN1Object);KJUR.asn1.DERAbstractTime=function(params){KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);var s=null;var date=null;this.localDateToUTC=function(d){utc=d.getTime()+(d.getTimezoneOffset()*60000);var utcDate=new Date(utc);return utcDate;};this.formatDate=function(dateObject,type){var pad=this.zeroPadding;var d=this.localDateToUTC(dateObject);var year=String(d.getFullYear());if(type=='utc')year=year.substr(2,2);var month=pad(String(d.getMonth()+1),2);var day=pad(String(d.getDate()),2);var hour=pad(String(d.getHours()),2);var min=pad(String(d.getMinutes()),2);var sec=pad(String(d.getSeconds()),2);return year+month+day+hour+min+sec+'Z';};this.zeroPadding=function(s,len){if(s.length>=len)return s;return new Array(len-s.length+1).join('0')+s;};this.getString=function(){return this.s;};this.setString=function(newS){this.hTLV=null;this.isModified=true;this.s=newS;this.hV=stohex(this.s);};this.setByDateValue=function(year,month,day,hour,min,sec){var dateObject=new Date(Date.UTC(year,month-1,day,hour,min,sec,0));this.setByDate(dateObject);};this.getFreshValueHex=function(){return this.hV;};};JSX.extend(KJUR.asn1.DERAbstractTime,KJUR.asn1.ASN1Object);KJUR.asn1.DERAbstractStructured=function(params){KJUR.asn1.DERAbstractString.superclass.constructor.call(this);var asn1Array=null;this.setByASN1ObjectArray=function(asn1ObjectArray){this.hTLV=null;this.isModified=true;this.asn1Array=asn1ObjectArray;};this.appendASN1Object=function(asn1Object){this.hTLV=null;this.isModified=true;this.asn1Array.push(asn1Object);};this.asn1Array=new Array();if(typeof params!="undefined"){if(typeof params['array']!="undefined"){this.asn1Array=params['array'];}}};JSX.extend(KJUR.asn1.DERAbstractStructured,KJUR.asn1.ASN1Object);KJUR.asn1.DERBoolean=function(){KJUR.asn1.DERBoolean.superclass.constructor.call(this);this.hT="01";this.hTLV="0101ff";};JSX.extend(KJUR.asn1.DERBoolean,KJUR.asn1.ASN1Object);KJUR.asn1.DERInteger=function(params){KJUR.asn1.DERInteger.superclass.constructor.call(this);this.hT="02";this.setByBigInteger=function(bigIntegerValue){this.hTLV=null;this.isModified=true;this.hV=KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);};this.setByInteger=function(intValue){var bi=new BigInteger(String(intValue),10);this.setByBigInteger(bi);};this.setValueHex=function(newHexString){this.hV=newHexString;};this.getFreshValueHex=function(){return this.hV;};if(typeof params!="undefined"){if(typeof params['bigint']!="undefined"){this.setByBigInteger(params['bigint']);}else if(typeof params['int']!="undefined"){this.setByInteger(params['int']);}else if(typeof params['hex']!="undefined"){this.setValueHex(params['hex']);}}};JSX.extend(KJUR.asn1.DERInteger,KJUR.asn1.ASN1Object);KJUR.asn1.DERBitString=function(params){KJUR.asn1.DERBitString.superclass.constructor.call(this);this.hT="03";this.setHexValueIncludingUnusedBits=function(newHexStringIncludingUnusedBits){this.hTLV=null;this.isModified=true;this.hV=newHexStringIncludingUnusedBits;};this.setUnusedBitsAndHexValue=function(unusedBits,hValue){if(unusedBits<0||7<unusedBits){throw"unused bits shall be from 0 to 7: u = "+unusedBits;}
var hUnusedBits="0"+unusedBits;this.hTLV=null;this.isModified=true;this.hV=hUnusedBits+hValue;};this.setByBinaryString=function(binaryString){binaryString=binaryString.replace(/0+$/,'');var unusedBits=8-binaryString.length%8;if(unusedBits==8)unusedBits=0;for(var i=0;i<=unusedBits;i++){binaryString+='0';}
var h='';for(var i=0;i<binaryString.length-1;i+=8){var b=binaryString.substr(i,8);var x=parseInt(b,2).toString(16);if(x.length==1)x='0'+x;h+=x;}
this.hTLV=null;this.isModified=true;this.hV='0'+unusedBits+h;};this.setByBooleanArray=function(booleanArray){var s='';for(var i=0;i<booleanArray.length;i++){if(booleanArray[i]==true){s+='1';}else{s+='0';}}
this.setByBinaryString(s);};this.newFalseArray=function(nLength){var a=new Array(nLength);for(var i=0;i<nLength;i++){a[i]=false;}
return a;};this.getFreshValueHex=function(){return this.hV;};if(typeof params!="undefined"){if(typeof params['hex']!="undefined"){this.setHexValueIncludingUnusedBits(params['hex']);}else if(typeof params['bin']!="undefined"){this.setByBinaryString(params['bin']);}else if(typeof params['array']!="undefined"){this.setByBooleanArray(params['array']);}}};JSX.extend(KJUR.asn1.DERBitString,KJUR.asn1.ASN1Object);KJUR.asn1.DEROctetString=function(params){KJUR.asn1.DEROctetString.superclass.constructor.call(this,params);this.hT="04";};JSX.extend(KJUR.asn1.DEROctetString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERNull=function(){KJUR.asn1.DERNull.superclass.constructor.call(this);this.hT="05";this.hTLV="0500";};JSX.extend(KJUR.asn1.DERNull,KJUR.asn1.ASN1Object);KJUR.asn1.DERObjectIdentifier=function(params){var itox=function(i){var h=i.toString(16);if(h.length==1)h='0'+h;return h;};var roidtox=function(roid){var h='';var bi=new BigInteger(roid,10);var b=bi.toString(2);var padLen=7-b.length%7;if(padLen==7)padLen=0;var bPad='';for(var i=0;i<padLen;i++)bPad+='0';b=bPad+b;for(var i=0;i<b.length-1;i+=7){var b8=b.substr(i,7);if(i!=b.length-7)b8='1'+b8;h+=itox(parseInt(b8,2));}
return h;}
KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);this.hT="06";this.setValueHex=function(newHexString){this.hTLV=null;this.isModified=true;this.s=null;this.hV=newHexString;};this.setValueOidString=function(oidString){if(!oidString.match(/^[0-9.]+$/)){throw"malformed oid string: "+oidString;}
var h='';var a=oidString.split('.');var i0=parseInt(a[0])*40+parseInt(a[1]);h+=itox(i0);a.splice(0,2);for(var i=0;i<a.length;i++){h+=roidtox(a[i]);}
this.hTLV=null;this.isModified=true;this.s=null;this.hV=h;};this.setValueName=function(oidName){if(typeof KJUR.asn1.x509.OID.name2oidList[oidName]!="undefined"){var oid=KJUR.asn1.x509.OID.name2oidList[oidName];this.setValueOidString(oid);}else{throw"DERObjectIdentifier oidName undefined: "+oidName;}};this.getFreshValueHex=function(){return this.hV;};if(typeof params!="undefined"){if(typeof params['oid']!="undefined"){this.setValueOidString(params['oid']);}else if(typeof params['hex']!="undefined"){this.setValueHex(params['hex']);}else if(typeof params['name']!="undefined"){this.setValueName(params['name']);}}};JSX.extend(KJUR.asn1.DERObjectIdentifier,KJUR.asn1.ASN1Object);KJUR.asn1.DERUTF8String=function(params){KJUR.asn1.DERUTF8String.superclass.constructor.call(this,params);this.hT="0c";};JSX.extend(KJUR.asn1.DERUTF8String,KJUR.asn1.DERAbstractString);KJUR.asn1.DERNumericString=function(params){KJUR.asn1.DERNumericString.superclass.constructor.call(this,params);this.hT="12";};JSX.extend(KJUR.asn1.DERNumericString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERPrintableString=function(params){KJUR.asn1.DERPrintableString.superclass.constructor.call(this,params);this.hT="13";};JSX.extend(KJUR.asn1.DERPrintableString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERTeletexString=function(params){KJUR.asn1.DERTeletexString.superclass.constructor.call(this,params);this.hT="14";};JSX.extend(KJUR.asn1.DERTeletexString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERIA5String=function(params){KJUR.asn1.DERIA5String.superclass.constructor.call(this,params);this.hT="16";};JSX.extend(KJUR.asn1.DERIA5String,KJUR.asn1.DERAbstractString);KJUR.asn1.DERUTCTime=function(params){KJUR.asn1.DERUTCTime.superclass.constructor.call(this,params);this.hT="17";this.setByDate=function(dateObject){this.hTLV=null;this.isModified=true;this.date=dateObject;this.s=this.formatDate(this.date,'utc');this.hV=stohex(this.s);};if(typeof params!="undefined"){if(typeof params['str']!="undefined"){this.setString(params['str']);}else if(typeof params['hex']!="undefined"){this.setStringHex(params['hex']);}else if(typeof params['date']!="undefined"){this.setByDate(params['date']);}}};JSX.extend(KJUR.asn1.DERUTCTime,KJUR.asn1.DERAbstractTime);KJUR.asn1.DERGeneralizedTime=function(params){KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this,params);this.hT="18";this.setByDate=function(dateObject){this.hTLV=null;this.isModified=true;this.date=dateObject;this.s=this.formatDate(this.date,'gen');this.hV=stohex(this.s);};if(typeof params!="undefined"){if(typeof params['str']!="undefined"){this.setString(params['str']);}else if(typeof params['hex']!="undefined"){this.setStringHex(params['hex']);}else if(typeof params['date']!="undefined"){this.setByDate(params['date']);}}};JSX.extend(KJUR.asn1.DERGeneralizedTime,KJUR.asn1.DERAbstractTime);KJUR.asn1.DERSequence=function(params){KJUR.asn1.DERSequence.superclass.constructor.call(this,params);this.hT="30";this.getFreshValueHex=function(){var h='';for(var i=0;i<this.asn1Array.length;i++){var asn1Obj=this.asn1Array[i];h+=asn1Obj.getEncodedHex();}
this.hV=h;return this.hV;};};JSX.extend(KJUR.asn1.DERSequence,KJUR.asn1.DERAbstractStructured);KJUR.asn1.DERSet=function(params){KJUR.asn1.DERSet.superclass.constructor.call(this,params);this.hT="31";this.getFreshValueHex=function(){var a=new Array();for(var i=0;i<this.asn1Array.length;i++){var asn1Obj=this.asn1Array[i];a.push(asn1Obj.getEncodedHex());}
a.sort();this.hV=a.join('');return this.hV;};};JSX.extend(KJUR.asn1.DERSet,KJUR.asn1.DERAbstractStructured);KJUR.asn1.DERTaggedObject=function(params){KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);this.hT="a0";this.hV='';this.isExplicit=true;this.asn1Object=null;this.setASN1Object=function(isExplicitFlag,tagNoHex,asn1Object){this.hT=tagNoHex;this.isExplicit=isExplicitFlag;this.asn1Object=asn1Object;if(this.isExplicit){this.hV=this.asn1Object.getEncodedHex();this.hTLV=null;this.isModified=true;}else{this.hV=null;this.hTLV=asn1Object.getEncodedHex();this.hTLV=this.hTLV.replace(/^../,tagNoHex);this.isModified=false;}};this.getFreshValueHex=function(){return this.hV;};if(typeof params!="undefined"){if(typeof params['tag']!="undefined"){this.hT=params['tag'];}
if(typeof params['explicit']!="undefined"){this.isExplicit=params['explicit'];}
if(typeof params['obj']!="undefined"){this.asn1Object=params['obj'];this.setASN1Object(this.isExplicit,this.hT,this.asn1Object);}}};JSX.extend(KJUR.asn1.DERTaggedObject,KJUR.asn1.ASN1Object);(function(undefined){"use strict";var Hex={},decoder;Hex.decode=function(a){var i;if(decoder===undefined){var hex="0123456789ABCDEF",ignore=" \f\n\r\t\u00A0\u2028\u2029";decoder=[];for(i=0;i<16;++i)
decoder[hex.charAt(i)]=i;hex=hex.toLowerCase();for(i=10;i<16;++i)
decoder[hex.charAt(i)]=i;for(i=0;i<ignore.length;++i)
decoder[ignore.charAt(i)]=-1;}
var out=[],bits=0,char_count=0;for(i=0;i<a.length;++i){var c=a.charAt(i);if(c=='=')
break;c=decoder[c];if(c==-1)
continue;if(c===undefined)
throw'Illegal character at offset '+i;bits|=c;if(++char_count>=2){out[out.length]=bits;bits=0;char_count=0;}else{bits<<=4;}}
if(char_count)
throw"Hex encoding incomplete: 4 bits missing";return out;};window.Hex=Hex;})();(function(undefined){"use strict";var Base64={},decoder;Base64.decode=function(a){var i;if(decoder===undefined){var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ignore="= \f\n\r\t\u00A0\u2028\u2029";decoder=[];for(i=0;i<64;++i)
decoder[b64.charAt(i)]=i;for(i=0;i<ignore.length;++i)
decoder[ignore.charAt(i)]=-1;}
var out=[];var bits=0,char_count=0;for(i=0;i<a.length;++i){var c=a.charAt(i);if(c=='=')
break;c=decoder[c];if(c==-1)
continue;if(c===undefined)
throw'Illegal character at offset '+i;bits|=c;if(++char_count>=4){out[out.length]=(bits>>16);out[out.length]=(bits>>8)&0xFF;out[out.length]=bits&0xFF;bits=0;char_count=0;}else{bits<<=6;}}
switch(char_count){case 1:throw"Base64 encoding incomplete: at least 2 bits missing";case 2:out[out.length]=(bits>>10);break;case 3:out[out.length]=(bits>>16);out[out.length]=(bits>>8)&0xFF;break;}
return out;};Base64.re=/-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;Base64.unarmor=function(a){var m=Base64.re.exec(a);if(m){if(m[1])
a=m[1];else if(m[2])
a=m[2];else
throw"RegExp out of sync";}
return Base64.decode(a);};window.Base64=Base64;})();(function(undefined){"use strict";var hardLimit=100,ellipsis="\u2026",DOM={tag:function(tagName,className){var t=document.createElement(tagName);t.className=className;return t;},text:function(str){return document.createTextNode(str);}};function Stream(enc,pos){if(enc instanceof Stream){this.enc=enc.enc;this.pos=enc.pos;}else{this.enc=enc;this.pos=pos;}}
Stream.prototype.get=function(pos){if(pos===undefined)
pos=this.pos++;if(pos>=this.enc.length)
throw'Requesting byte offset '+pos+' on a stream of length '+this.enc.length;return this.enc[pos];};Stream.prototype.hexDigits="0123456789ABCDEF";Stream.prototype.hexByte=function(b){return this.hexDigits.charAt((b>>4)&0xF)+this.hexDigits.charAt(b&0xF);};Stream.prototype.hexDump=function(start,end,raw){var s="";for(var i=start;i<end;++i){s+=this.hexByte(this.get(i));if(raw!==true)
switch(i&0xF){case 0x7:s+="  ";break;case 0xF:s+="\n";break;default:s+=" ";}}
return s;};Stream.prototype.parseStringISO=function(start,end){var s="";for(var i=start;i<end;++i)
s+=String.fromCharCode(this.get(i));return s;};Stream.prototype.parseStringUTF=function(start,end){var s="";for(var i=start;i<end;){var c=this.get(i++);if(c<128)
s+=String.fromCharCode(c);else if((c>191)&&(c<224))
s+=String.fromCharCode(((c&0x1F)<<6)|(this.get(i++)&0x3F));else
s+=String.fromCharCode(((c&0x0F)<<12)|((this.get(i++)&0x3F)<<6)|(this.get(i++)&0x3F));}
return s;};Stream.prototype.parseStringBMP=function(start,end){var str=""
for(var i=start;i<end;i+=2){var high_byte=this.get(i);var low_byte=this.get(i+1);str+=String.fromCharCode((high_byte<<8)+low_byte);}
return str;};Stream.prototype.reTime=/^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;Stream.prototype.parseTime=function(start,end){var s=this.parseStringISO(start,end),m=this.reTime.exec(s);if(!m)
return"Unrecognized time: "+s;s=m[1]+"-"+m[2]+"-"+m[3]+" "+m[4];if(m[5]){s+=":"+m[5];if(m[6]){s+=":"+m[6];if(m[7])
s+="."+m[7];}}
if(m[8]){s+=" UTC";if(m[8]!='Z'){s+=m[8];if(m[9])
s+=":"+m[9];}}
return s;};Stream.prototype.parseInteger=function(start,end){var len=end-start;if(len>4){len<<=3;var s=this.get(start);if(s===0)
len-=8;else
while(s<128){s<<=1;--len;}
return"("+len+" bit)";}
var n=0;for(var i=start;i<end;++i)
n=(n<<8)|this.get(i);return n;};Stream.prototype.parseBitString=function(start,end){var unusedBit=this.get(start),lenBit=((end-start-1)<<3)-unusedBit,s="("+lenBit+" bit)";if(lenBit<=20){var skip=unusedBit;s+=" ";for(var i=end-1;i>start;--i){var b=this.get(i);for(var j=skip;j<8;++j)
s+=(b>>j)&1?"1":"0";skip=0;}}
return s;};Stream.prototype.parseOctetString=function(start,end){var len=end-start,s="("+len+" byte) ";if(len>hardLimit)
end=start+hardLimit;for(var i=start;i<end;++i)
s+=this.hexByte(this.get(i));if(len>hardLimit)
s+=ellipsis;return s;};Stream.prototype.parseOID=function(start,end){var s='',n=0,bits=0;for(var i=start;i<end;++i){var v=this.get(i);n=(n<<7)|(v&0x7F);bits+=7;if(!(v&0x80)){if(s===''){var m=n<80?n<40?0:1:2;s=m+"."+(n-m*40);}else
s+="."+((bits>=31)?"bigint":n);n=bits=0;}}
return s;};function ASN1(stream,header,length,tag,sub){this.stream=stream;this.header=header;this.length=length;this.tag=tag;this.sub=sub;}
ASN1.prototype.typeName=function(){if(this.tag===undefined)
return"unknown";var tagClass=this.tag>>6,tagConstructed=(this.tag>>5)&1,tagNumber=this.tag&0x1F;switch(tagClass){case 0:switch(tagNumber){case 0x00:return"EOC";case 0x01:return"BOOLEAN";case 0x02:return"INTEGER";case 0x03:return"BIT_STRING";case 0x04:return"OCTET_STRING";case 0x05:return"NULL";case 0x06:return"OBJECT_IDENTIFIER";case 0x07:return"ObjectDescriptor";case 0x08:return"EXTERNAL";case 0x09:return"REAL";case 0x0A:return"ENUMERATED";case 0x0B:return"EMBEDDED_PDV";case 0x0C:return"UTF8String";case 0x10:return"SEQUENCE";case 0x11:return"SET";case 0x12:return"NumericString";case 0x13:return"PrintableString";case 0x14:return"TeletexString";case 0x15:return"VideotexString";case 0x16:return"IA5String";case 0x17:return"UTCTime";case 0x18:return"GeneralizedTime";case 0x19:return"GraphicString";case 0x1A:return"VisibleString";case 0x1B:return"GeneralString";case 0x1C:return"UniversalString";case 0x1E:return"BMPString";default:return"Universal_"+tagNumber.toString(16);}
case 1:return"Application_"+tagNumber.toString(16);case 2:return"["+tagNumber+"]";case 3:return"Private_"+tagNumber.toString(16);}};ASN1.prototype.reSeemsASCII=/^[ -~]+$/;ASN1.prototype.content=function(){if(this.tag===undefined)
return null;var tagClass=this.tag>>6,tagNumber=this.tag&0x1F,content=this.posContent(),len=Math.abs(this.length);if(tagClass!==0){if(this.sub!==null)
return"("+this.sub.length+" elem)";var s=this.stream.parseStringISO(content,content+Math.min(len,hardLimit));if(this.reSeemsASCII.test(s))
return s.substring(0,2*hardLimit)+((s.length>2*hardLimit)?ellipsis:"");else
return this.stream.parseOctetString(content,content+len);}
switch(tagNumber){case 0x01:return(this.stream.get(content)===0)?"false":"true";case 0x02:return this.stream.parseInteger(content,content+len);case 0x03:return this.sub?"("+this.sub.length+" elem)":this.stream.parseBitString(content,content+len);case 0x04:return this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(content,content+len);case 0x06:return this.stream.parseOID(content,content+len);case 0x10:case 0x11:return"("+this.sub.length+" elem)";case 0x0C:return this.stream.parseStringUTF(content,content+len);case 0x12:case 0x13:case 0x14:case 0x15:case 0x16:case 0x1A:return this.stream.parseStringISO(content,content+len);case 0x1E:return this.stream.parseStringBMP(content,content+len);case 0x17:case 0x18:return this.stream.parseTime(content,content+len);}
return null;};ASN1.prototype.toString=function(){return this.typeName()+"@"+this.stream.pos+"[header:"+this.header+",length:"+this.length+",sub:"+((this.sub===null)?'null':this.sub.length)+"]";};ASN1.prototype.print=function(indent){if(indent===undefined)indent='';document.writeln(indent+this);if(this.sub!==null){indent+='  ';for(var i=0,max=this.sub.length;i<max;++i)
this.sub[i].print(indent);}};ASN1.prototype.toPrettyString=function(indent){if(indent===undefined)indent='';var s=indent+this.typeName()+" @"+this.stream.pos;if(this.length>=0)
s+="+";s+=this.length;if(this.tag&0x20)
s+=" (constructed)";else if(((this.tag==0x03)||(this.tag==0x04))&&(this.sub!==null))
s+=" (encapsulates)";s+="\n";if(this.sub!==null){indent+='  ';for(var i=0,max=this.sub.length;i<max;++i)
s+=this.sub[i].toPrettyString(indent);}
return s;};ASN1.prototype.toDOM=function(){var node=DOM.tag("div","node");node.asn1=this;var head=DOM.tag("div","head");var s=this.typeName().replace(/_/g," ");head.innerHTML=s;var content=this.content();if(content!==null){content=String(content).replace(/</g,"&lt;");var preview=DOM.tag("span","preview");preview.appendChild(DOM.text(content));head.appendChild(preview);}
node.appendChild(head);this.node=node;this.head=head;var value=DOM.tag("div","value");s="Offset: "+this.stream.pos+"<br/>";s+="Length: "+this.header+"+";if(this.length>=0)
s+=this.length;else
s+=(-this.length)+" (undefined)";if(this.tag&0x20)
s+="<br/>(constructed)";else if(((this.tag==0x03)||(this.tag==0x04))&&(this.sub!==null))
s+="<br/>(encapsulates)";if(content!==null){s+="<br/>Value:<br/><b>"+content+"</b>";if((typeof oids==='object')&&(this.tag==0x06)){var oid=oids[content];if(oid){if(oid.d)s+="<br/>"+oid.d;if(oid.c)s+="<br/>"+oid.c;if(oid.w)s+="<br/>(warning!)";}}}
value.innerHTML=s;node.appendChild(value);var sub=DOM.tag("div","sub");if(this.sub!==null){for(var i=0,max=this.sub.length;i<max;++i)
sub.appendChild(this.sub[i].toDOM());}
node.appendChild(sub);head.onclick=function(){node.className=(node.className=="node collapsed")?"node":"node collapsed";};return node;};ASN1.prototype.posStart=function(){return this.stream.pos;};ASN1.prototype.posContent=function(){return this.stream.pos+this.header;};ASN1.prototype.posEnd=function(){return this.stream.pos+this.header+Math.abs(this.length);};ASN1.prototype.fakeHover=function(current){this.node.className+=" hover";if(current)
this.head.className+=" hover";};ASN1.prototype.fakeOut=function(current){var re=/ ?hover/;this.node.className=this.node.className.replace(re,"");if(current)
this.head.className=this.head.className.replace(re,"");};ASN1.prototype.toHexDOM_sub=function(node,className,stream,start,end){if(start>=end)
return;var sub=DOM.tag("span",className);sub.appendChild(DOM.text(stream.hexDump(start,end)));node.appendChild(sub);};ASN1.prototype.toHexDOM=function(root){var node=DOM.tag("span","hex");if(root===undefined)root=node;this.head.hexNode=node;this.head.onmouseover=function(){this.hexNode.className="hexCurrent";};this.head.onmouseout=function(){this.hexNode.className="hex";};node.asn1=this;node.onmouseover=function(){var current=!root.selected;if(current){root.selected=this.asn1;this.className="hexCurrent";}
this.asn1.fakeHover(current);};node.onmouseout=function(){var current=(root.selected==this.asn1);this.asn1.fakeOut(current);if(current){root.selected=null;this.className="hex";}};this.toHexDOM_sub(node,"tag",this.stream,this.posStart(),this.posStart()+1);this.toHexDOM_sub(node,(this.length>=0)?"dlen":"ulen",this.stream,this.posStart()+1,this.posContent());if(this.sub===null)
node.appendChild(DOM.text(this.stream.hexDump(this.posContent(),this.posEnd())));else if(this.sub.length>0){var first=this.sub[0];var last=this.sub[this.sub.length-1];this.toHexDOM_sub(node,"intro",this.stream,this.posContent(),first.posStart());for(var i=0,max=this.sub.length;i<max;++i)
node.appendChild(this.sub[i].toHexDOM(root));this.toHexDOM_sub(node,"outro",this.stream,last.posEnd(),this.posEnd());}
return node;};ASN1.prototype.toHexString=function(root){return this.stream.hexDump(this.posStart(),this.posEnd(),true);};ASN1.decodeLength=function(stream){var buf=stream.get(),len=buf&0x7F;if(len==buf)
return len;if(len>3)
throw"Length over 24 bits not supported at position "+(stream.pos-1);if(len===0)
return-1;buf=0;for(var i=0;i<len;++i)
buf=(buf<<8)|stream.get();return buf;};ASN1.hasContent=function(tag,len,stream){if(tag&0x20)
return true;if((tag<0x03)||(tag>0x04))
return false;var p=new Stream(stream);if(tag==0x03)p.get();var subTag=p.get();if((subTag>>6)&0x01)
return false;try{var subLength=ASN1.decodeLength(p);return((p.pos-stream.pos)+subLength==len);}catch(exception){return false;}};ASN1.decode=function(stream){if(!(stream instanceof Stream))
stream=new Stream(stream,0);var streamStart=new Stream(stream),tag=stream.get(),len=ASN1.decodeLength(stream),header=stream.pos-streamStart.pos,sub=null;if(ASN1.hasContent(tag,len,stream)){var start=stream.pos;if(tag==0x03)stream.get();sub=[];if(len>=0){var end=start+len;while(stream.pos<end)
sub[sub.length]=ASN1.decode(stream);if(stream.pos!=end)
throw"Content size is not correct for container starting at offset "+start;}else{try{for(;;){var s=ASN1.decode(stream);if(s.tag===0)
break;sub[sub.length]=s;}
len=start-stream.pos;}catch(e){throw"Exception while decoding undefined length content: "+e;}}}else
stream.pos+=len;return new ASN1(streamStart,header,len,tag,sub);};ASN1.test=function(){var test=[{value:[0x27],expected:0x27},{value:[0x81,0xC9],expected:0xC9},{value:[0x83,0xFE,0xDC,0xBA],expected:0xFEDCBA}];for(var i=0,max=test.length;i<max;++i){var pos=0,stream=new Stream(test[i].value,0),res=ASN1.decodeLength(stream);if(res!=test[i].expected)
document.write("In test["+i+"] expected "+test[i].expected+" got "+res+"\n");}};window.ASN1=ASN1;})();ASN1.prototype.getHexStringValue=function(){var hexString=this.toHexString();var offset=this.header*2;var length=this.length*2;return hexString.substr(offset,length);};RSAKey.prototype.parseKey=function(pem){try{var reHex=/^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;var der=reHex.test(pem)?Hex.decode(pem):Base64.unarmor(pem);var asn1=ASN1.decode(der);if(asn1.sub.length===9){var modulus=asn1.sub[1].getHexStringValue();this.n=parseBigInt(modulus,16);var public_exponent=asn1.sub[2].getHexStringValue();this.e=parseInt(public_exponent,16);var private_exponent=asn1.sub[3].getHexStringValue();this.d=parseBigInt(private_exponent,16);var prime1=asn1.sub[4].getHexStringValue();this.p=parseBigInt(prime1,16);var prime2=asn1.sub[5].getHexStringValue();this.q=parseBigInt(prime2,16);var exponent1=asn1.sub[6].getHexStringValue();this.dmp1=parseBigInt(exponent1,16);var exponent2=asn1.sub[7].getHexStringValue();this.dmq1=parseBigInt(exponent2,16);var coefficient=asn1.sub[8].getHexStringValue();this.coeff=parseBigInt(coefficient,16);}else if(asn1.sub.length===2){var bit_string=asn1.sub[1];var sequence=bit_string.sub[0];var modulus=sequence.sub[0].getHexStringValue();this.n=parseBigInt(modulus,16);var public_exponent=sequence.sub[1].getHexStringValue();this.e=parseInt(public_exponent,16);}else{return false;}
return true;}catch(ex){return false;}};RSAKey.prototype.getPrivateBaseKey=function(){var options={'array':[new KJUR.asn1.DERInteger({'int':0}),new KJUR.asn1.DERInteger({'bigint':this.n}),new KJUR.asn1.DERInteger({'int':this.e}),new KJUR.asn1.DERInteger({'bigint':this.d}),new KJUR.asn1.DERInteger({'bigint':this.p}),new KJUR.asn1.DERInteger({'bigint':this.q}),new KJUR.asn1.DERInteger({'bigint':this.dmp1}),new KJUR.asn1.DERInteger({'bigint':this.dmq1}),new KJUR.asn1.DERInteger({'bigint':this.coeff})]};var seq=new KJUR.asn1.DERSequence(options);return seq.getEncodedHex();};RSAKey.prototype.getPrivateBaseKeyB64=function(){return hex2b64(this.getPrivateBaseKey());};RSAKey.prototype.getPublicBaseKey=function(){var options={'array':[new KJUR.asn1.DERObjectIdentifier({'oid':'1.2.840.113549.1.1.1'}),new KJUR.asn1.DERNull()]};var first_sequence=new KJUR.asn1.DERSequence(options);options={'array':[new KJUR.asn1.DERInteger({'bigint':this.n}),new KJUR.asn1.DERInteger({'int':this.e})]};var second_sequence=new KJUR.asn1.DERSequence(options);options={'hex':'00'+second_sequence.getEncodedHex()};var bit_string=new KJUR.asn1.DERBitString(options);options={'array':[first_sequence,bit_string]};var seq=new KJUR.asn1.DERSequence(options);return seq.getEncodedHex();};RSAKey.prototype.getPublicBaseKeyB64=function(){return hex2b64(this.getPublicBaseKey());};RSAKey.prototype.wordwrap=function(str,width){width=width||64;if(!str)
return str;var regex='(.{1,'+width+'})( +|$\n?)|(.{1,'+width+'})';return str.match(RegExp(regex,'g')).join('\n');};RSAKey.prototype.getPrivateKey=function(){var key="-----BEGIN RSA PRIVATE KEY-----\n";key+=this.wordwrap(this.getPrivateBaseKeyB64())+"\n";key+="-----END RSA PRIVATE KEY-----";return key;};RSAKey.prototype.getPublicKey=function(){var key="-----BEGIN PUBLIC KEY-----\n";key+=this.wordwrap(this.getPublicBaseKeyB64())+"\n";key+="-----END PUBLIC KEY-----";return key;};RSAKey.prototype.hasPublicKeyProperty=function(obj){obj=obj||{};return obj.hasOwnProperty('n')&&obj.hasOwnProperty('e');};RSAKey.prototype.hasPrivateKeyProperty=function(obj){obj=obj||{};return obj.hasOwnProperty('n')&&obj.hasOwnProperty('e')&&obj.hasOwnProperty('d')&&obj.hasOwnProperty('p')&&obj.hasOwnProperty('q')&&obj.hasOwnProperty('dmp1')&&obj.hasOwnProperty('dmq1')&&obj.hasOwnProperty('coeff');};RSAKey.prototype.parsePropertiesFrom=function(obj){this.n=obj.n;this.e=obj.e;if(obj.hasOwnProperty('d')){this.d=obj.d;this.p=obj.p;this.q=obj.q;this.dmp1=obj.dmp1;this.dmq1=obj.dmq1;this.coeff=obj.coeff;}};var JSEncryptRSAKey=function(key){RSAKey.call(this);if(key){if(typeof key==='string'){this.parseKey(key);}else if(this.hasPrivateKeyProperty(key)||this.hasPublicKeyProperty(key)){this.parsePropertiesFrom(key);}}};JSEncryptRSAKey.prototype=new RSAKey();JSEncryptRSAKey.prototype.constructor=JSEncryptRSAKey;var JSEncrypt=function(options){options=options||{};this.default_key_size=parseInt(options.default_key_size)||1024;this.default_public_exponent=options.default_public_exponent||'010001';this.log=options.log||false;this.key=null;};JSEncrypt.prototype.setKey=function(key){if(this.log&&this.key)
console.warn('A key was already set, overriding existing.');this.key=new JSEncryptRSAKey(key);};JSEncrypt.prototype.setPrivateKey=function(privkey){this.setKey(privkey);};JSEncrypt.prototype.setPublicKey=function(pubkey){this.setKey(pubkey);};JSEncrypt.prototype.decrypt=function(string){try{return this.getKey().decrypt(b64tohex(string));}catch(ex){return false;}};JSEncrypt.prototype.encrypt=function(string){try{return hex2b64(this.getKey().encrypt(string));}catch(ex){return false;}};JSEncrypt.prototype.getKey=function(cb){if(!this.key){this.key=new JSEncryptRSAKey();if(cb&&{}.toString.call(cb)==='[object Function]'){this.key.generateAsync(this.default_key_size,this.default_public_exponent,cb);return;}
this.key.generate(this.default_key_size,this.default_public_exponent);}
return this.key;};JSEncrypt.prototype.getPrivateKey=function(){return this.getKey().getPrivateKey();};JSEncrypt.prototype.getPrivateKeyB64=function(){return this.getKey().getPrivateBaseKeyB64();};JSEncrypt.prototype.getPublicKey=function(){return this.getKey().getPublicKey();};JSEncrypt.prototype.getPublicKeyB64=function(){return this.getKey().getPublicBaseKeyB64();};exports.JSEncrypt=JSEncrypt;})(JSEncryptExports);var JSEncrypt=JSEncryptExports.JSEncrypt;var saveAs=saveAs||(navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator))||(function(view){"use strict";var
doc=view.document,get_URL=function(){return view.URL||view.webkitURL||view;},URL=view.URL||view.webkitURL||view,save_link=doc.createElementNS("http://www.w3.org/1999/xhtml","a"),can_use_save_link=!view.externalHost&&"download"in save_link,click=function(node){var event=doc.createEvent("MouseEvents");event.initMouseEvent("click",true,false,view,0,0,0,0,0,false,false,false,false,0,null);node.dispatchEvent(event);},webkit_req_fs=view.webkitRequestFileSystem,req_fs=view.requestFileSystem||webkit_req_fs||view.mozRequestFileSystem,throw_outside=function(ex){(view.setImmediate||view.setTimeout)(function(){throw ex;},0);},force_saveable_type="application/octet-stream",fs_min_size=0,deletion_queue=[],process_deletion_queue=function(){var i=deletion_queue.length;while(i--){var file=deletion_queue[i];if(typeof file==="string"){URL.revokeObjectURL(file);}else{file.remove();}}
deletion_queue.length=0;},dispatch=function(filesaver,event_types,event){event_types=[].concat(event_types);var i=event_types.length;while(i--){var listener=filesaver["on"+event_types[i]];if(typeof listener==="function"){try{listener.call(filesaver,event||filesaver);}catch(ex){throw_outside(ex);}}}},FileSaver=function(blob,name){var
filesaver=this,type=blob.type,blob_changed=false,object_url,target_view,get_object_url=function(){var object_url=get_URL().createObjectURL(blob);deletion_queue.push(object_url);return object_url;},dispatch_all=function(){dispatch(filesaver,"writestart progress write writeend".split(" "));},fs_error=function(){if(blob_changed||!object_url){object_url=get_object_url(blob);}
if(target_view){target_view.location.href=object_url;}else{window.open(object_url,"_blank");}
filesaver.readyState=filesaver.DONE;dispatch_all();},abortable=function(func){return function(){if(filesaver.readyState!==filesaver.DONE){return func.apply(this,arguments);}};},create_if_not_found={create:true,exclusive:false},slice;filesaver.readyState=filesaver.INIT;if(!name){name="download";}
if(can_use_save_link){object_url=get_object_url(blob);save_link.href=object_url;save_link.download=name;click(save_link);filesaver.readyState=filesaver.DONE;dispatch_all();return;}
if(view.chrome&&type&&type!==force_saveable_type){slice=blob.slice||blob.webkitSlice;blob=slice.call(blob,0,blob.size,force_saveable_type);blob_changed=true;}
if(webkit_req_fs&&name!=="download"){name+=".download";}
if(type===force_saveable_type||webkit_req_fs){target_view=view;}
if(!req_fs){fs_error();return;}
fs_min_size+=blob.size;req_fs(view.TEMPORARY,fs_min_size,abortable(function(fs){fs.root.getDirectory("saved",create_if_not_found,abortable(function(dir){var save=function(){dir.getFile(name,create_if_not_found,abortable(function(file){file.createWriter(abortable(function(writer){writer.onwriteend=function(event){target_view.location.href=file.toURL();deletion_queue.push(file);filesaver.readyState=filesaver.DONE;dispatch(filesaver,"writeend",event);};writer.onerror=function(){var error=writer.error;if(error.code!==error.ABORT_ERR){fs_error();}};"writestart progress write abort".split(" ").forEach(function(event){writer["on"+event]=filesaver["on"+event];});writer.write(blob);filesaver.abort=function(){writer.abort();filesaver.readyState=filesaver.DONE;};filesaver.readyState=filesaver.WRITING;}),fs_error);}),fs_error);};dir.getFile(name,{create:false},abortable(function(file){file.remove();save();}),abortable(function(ex){if(ex.code===ex.NOT_FOUND_ERR){save();}else{fs_error();}}));}),fs_error);}),fs_error);},FS_proto=FileSaver.prototype,saveAs=function(blob,name){return new FileSaver(blob,name);};FS_proto.abort=function(){var filesaver=this;filesaver.readyState=filesaver.DONE;dispatch(filesaver,"abort");};FS_proto.readyState=FS_proto.INIT=0;FS_proto.WRITING=1;FS_proto.DONE=2;FS_proto.error=FS_proto.onwritestart=FS_proto.onprogress=FS_proto.onwrite=FS_proto.onabort=FS_proto.onerror=FS_proto.onwriteend=null;view.addEventListener("unload",process_deletion_queue,false);return saveAs;}(self));if(typeof module!=='undefined')module.exports=saveAs;(function(window,undef){'use strict';var
gid=1,noop=function(){},document=window.document,doctype=document.doctype||{},userAgent=window.navigator.userAgent,apiURL=(window.createObjectURL&&window)||(window.URL&&URL.revokeObjectURL&&URL)||(window.webkitURL&&webkitURL),Blob=window.Blob,File=window.File,FileReader=window.FileReader,FormData=window.FormData,XMLHttpRequest=window.XMLHttpRequest,jQuery=window.jQuery,html5=!!(File&&(FileReader&&(window.Uint8Array||FormData||XMLHttpRequest.prototype.sendAsBinary)))&&!(/safari\//i.test(userAgent)&&!/chrome\//i.test(userAgent)&&/windows/i.test(userAgent)),cors=html5&&('withCredentials'in(new XMLHttpRequest)),chunked=html5&&!!Blob&&!!(Blob.prototype.webkitSlice||Blob.prototype.mozSlice||Blob.prototype.slice),dataURLtoBlob=window.dataURLtoBlob,_rimg=/img/i,_rcanvas=/canvas/i,_rimgcanvas=/img|canvas/i,_rinput=/input/i,_rdata=/^data:[^,]+,/,Math=window.Math,_SIZE_CONST=function(pow){pow=new window.Number(Math.pow(1024,pow));pow.from=function(sz){return Math.round(sz*this);};return pow;},_elEvents={},_infoReader=[],_readerEvents='abort progress error load loadend',_xhrPropsExport='status statusText readyState response responseXML responseText responseBody'.split(' '),currentTarget='currentTarget',preventDefault='preventDefault',_isArray=function(ar){return ar&&('length'in ar);},_each=function(obj,fn,ctx){if(obj){if(_isArray(obj)){for(var i=0,n=obj.length;i<n;i++){if(i in obj){fn.call(ctx,obj[i],i,obj);}}}
else{for(var key in obj){if(obj.hasOwnProperty(key)){fn.call(ctx,obj[key],key,obj);}}}}},_extend=function(dst){var args=arguments,i=1,_ext=function(val,key){dst[key]=val;};for(;i<args.length;i++){_each(args[i],_ext);}
return dst;},_on=function(el,type,fn){if(el){var uid=api.uid(el);if(!_elEvents[uid]){_elEvents[uid]={};}
_each(type.split(/\s+/),function(type){if(jQuery){jQuery.event.add(el,type,fn);}
else{if(!_elEvents[uid][type]){_elEvents[uid][type]=[];}
_elEvents[uid][type].push(fn);if(el.addEventListener){el.addEventListener(type,fn,false);}
else if(el.attachEvent){el.attachEvent('on'+type,fn);}
else{el['on'+type]=fn;}}});}},_off=function(el,type,fn){if(el){var uid=api.uid(el),events=_elEvents[uid]||{};_each(type.split(/\s+/),function(type){if(jQuery){jQuery.event.remove(el,type,fn);}
else{var fns=events[type]||[],i=fns.length;while(i--){if(fns[i]===fn){fns.splice(i,1);break;}}
if(el.addEventListener){el.removeEventListener(type,fn,false);}
else if(el.detachEvent){el.detachEvent('on'+type,fn);}
else{el['on'+type]=null;}}});}},_one=function(el,type,fn){_on(el,type,function _(evt){_off(el,type,_);fn(evt);});},_fixEvent=function(evt){if(!evt.target){evt.target=window.event&&window.event.srcElement||document;}
if(evt.target.nodeType===3){evt.target=evt.target.parentNode;}
return evt;},_supportInputAttr=function(attr){var input=document.createElement('input');input.setAttribute('type',"file");return attr in input;},api={version:'2.0.0',cors:false,html5:true,media:false,debug:false,pingUrl:false,multiFlash:false,flashAbortTimeout:0,withCredentials:true,staticPath:'./dist/',flashUrl:0,flashImageUrl:0,postNameConcat:function(name,idx){return name+(idx!=null?'['+idx+']':'');},ext2mime:{jpg:'image/jpeg',tif:'image/tiff',txt:'text/plain'},accept:{'image/*':'art bm bmp dwg dxf cbr cbz fif fpx gif ico iefs jfif jpe jpeg jpg jps jut mcf nap nif pbm pcx pgm pict pm png pnm qif qtif ras rast rf rp svf tga tif tiff xbm xbm xpm xwd','audio/*':'m4a flac aac rm mpa wav wma ogg mp3 mp2 m3u mod amf dmf dsm far gdm imf it m15 med okt s3m stm sfx ult uni xm sid ac3 dts cue aif aiff wpl ape mac mpc mpp shn wv nsf spc gym adplug adx dsp adp ymf ast afc hps xs','video/*':'m4v 3gp nsv ts ty strm rm rmvb m3u ifo mov qt divx xvid bivx vob nrg img iso pva wmv asf asx ogm m2v avi bin dat dvr-ms mpg mpeg mp4 mkv avc vp3 svq3 nuv viv dv fli flv wpl'},chunkSize:0,chunkUploadRetry:0,chunkNetworkDownRetryTimeout:2000,KB:_SIZE_CONST(1),MB:_SIZE_CONST(2),GB:_SIZE_CONST(3),TB:_SIZE_CONST(4),expando:'fileapi'+(new Date).getTime(),uid:function(obj){return obj?(obj[api.expando]=obj[api.expando]||api.uid()):(++gid,api.expando+gid);},log:function(){if(api.debug&&window.console&&console.log){if(console.log.apply){console.log.apply(console,arguments);}
else{console.log([].join.call(arguments,' '));}}},newImage:function(src,fn){var img=document.createElement('img');if(fn){api.event.one(img,'error load',function(evt){fn(evt.type=='error',img);img=null;});}
img.src=src;return img;},getXHR:function(){var xhr;if(XMLHttpRequest){xhr=new XMLHttpRequest;}
else if(window.ActiveXObject){try{xhr=new ActiveXObject('MSXML2.XMLHttp.3.0');}catch(e){xhr=new ActiveXObject('Microsoft.XMLHTTP');}}
return xhr;},isArray:_isArray,support:{dnd:cors&&('ondrop'in document.createElement('div')),cors:cors,html5:html5,chunked:chunked,dataURI:true,accept:_supportInputAttr('accept'),multiple:_supportInputAttr('multiple')},event:{on:_on,off:_off,one:_one,fix:_fixEvent},throttle:function(fn,delay){var id,args;return function _throttle(){args=arguments;if(!id){fn.apply(window,args);id=setTimeout(function(){id=0;fn.apply(window,args);},delay);}};},F:function(){},parseJSON:function(str){var json;if(window.JSON&&JSON.parse){json=JSON.parse(str);}
else{json=(new Function('return ('+str.replace(/([\r\n])/g,'\\$1')+');'))();}
return json;},trim:function(str){str=String(str);return str.trim?str.trim():str.replace(/^\s+|\s+$/g,'');},defer:function(){var
list=[],result,error,defer={resolve:function(err,res){defer.resolve=noop;error=err||false;result=res;while(res=list.shift()){res(error,result);}},then:function(fn){if(error!==undef){fn(error,result);}else{list.push(fn);}}};return defer;},queue:function(fn){var
_idx=0,_length=0,_fail=false,_end=false,queue={inc:function(){_length++;},next:function(){_idx++;setTimeout(queue.check,0);},check:function(){(_idx>=_length)&&!_fail&&queue.end();},isFail:function(){return _fail;},fail:function(){!_fail&&fn(_fail=true);},end:function(){if(!_end){_end=true;fn();}}};return queue;},each:_each,afor:function(array,callback){var i=0,n=array.length;if(_isArray(array)&&n--){(function _next(){callback(n!=i&&_next,array[i],i++);})();}
else{callback(false);}},extend:_extend,isFile:function(file){return html5&&file&&(file instanceof File);},isCanvas:function(el){return el&&_rcanvas.test(el.nodeName);},getFilesFilter:function(filter){filter=typeof filter=='string'?filter:(filter.getAttribute&&filter.getAttribute('accept')||'');return filter?new RegExp('('+filter.replace(/\./g,'\\.').replace(/,/g,'|')+')$','i'):/./;},readAsDataURL:function(file,fn){if(api.isCanvas(file)){_emit(file,fn,'load',api.toDataURL(file));}
else{_readAs(file,fn,'DataURL');}},readAsBinaryString:function(file,fn){if(_hasSupportReadAs('BinaryString')){_readAs(file,fn,'BinaryString');}else{_readAs(file,function(evt){if(evt.type=='load'){try{evt.result=api.toBinaryString(evt.result);}catch(e){evt.type='error';evt.message=e.toString();}}
fn(evt);},'DataURL');}},readAsArrayBuffer:function(file,fn){_readAs(file,fn,'ArrayBuffer');},readAsText:function(file,encoding,fn){if(!fn){fn=encoding;encoding='utf-8';}
_readAs(file,fn,'Text',encoding);},toDataURL:function(el,type){if(typeof el=='string'){return el;}
else if(el.toDataURL){return el.toDataURL(type||'image/png');}},toBinaryString:function(val){return window.atob(api.toDataURL(val).replace(_rdata,''));},readAsImage:function(file,fn,progress){if(api.isFile(file)){if(apiURL){var data=apiURL.createObjectURL(file);if(data===undef){_emit(file,fn,'error');}
else{api.readAsImage(data,fn,progress);}}
else{api.readAsDataURL(file,function(evt){if(evt.type=='load'){api.readAsImage(evt.result,fn,progress);}
else if(progress||evt.type=='error'){_emit(file,fn,evt,null,{loaded:evt.loaded,total:evt.total});}});}}
else if(api.isCanvas(file)){_emit(file,fn,'load',file);}
else if(_rimg.test(file.nodeName)){if(file.complete){_emit(file,fn,'load',file);}
else{var events='error abort load';_one(file,events,function _fn(evt){if(evt.type=='load'&&apiURL){apiURL.revokeObjectURL(file.src);}
_off(file,events,_fn);_emit(file,fn,evt,file);});}}
else if(file.iframe){_emit(file,fn,{type:'error'});}
else{var img=api.newImage(file.dataURL||file);api.readAsImage(img,fn,progress);}},checkFileObj:function(name){var file={},accept=api.accept;if(typeof name=='object'){file=name;}
else{file.name=(name+'').split(/\\|\//g).pop();}
if(file.type==null){file.type=file.name.split('.').pop();}
_each(accept,function(ext,type){ext=new RegExp(ext.replace(/\s/g,'|'),'i');if(ext.test(file.type)||api.ext2mime[file.type]){file.type=api.ext2mime[file.type]||(type.split('/')[0]+'/'+file.type);}});return file;},getDropFiles:function(evt,callback){var
files=[],dataTransfer=_getDataTransfer(evt),entrySupport=_isArray(dataTransfer.items)&&dataTransfer.items[0]&&_getAsEntry(dataTransfer.items[0]),queue=api.queue(function(){callback(files);});_each((entrySupport?dataTransfer.items:dataTransfer.files)||[],function(item){queue.inc();try{if(entrySupport){_readEntryAsFiles(item,function(err,entryFiles){if(err){api.log('[err] getDropFiles:',err);}else{files.push.apply(files,entryFiles);}
queue.next();});}
else{_isRegularFile(item,function(yes){yes&&files.push(item);queue.next();});}}
catch(err){queue.next();api.log('[err] getDropFiles: ',err);}});queue.check();},getFiles:function(input,filter,callback){var files=[];if(callback){api.filterFiles(api.getFiles(input),filter,callback);return null;}
if(input.jquery){input.each(function(){files=files.concat(api.getFiles(this));});input=files;files=[];}
if(typeof filter=='string'){filter=api.getFilesFilter(filter);}
if(input.originalEvent){input=_fixEvent(input.originalEvent);}
else if(input.srcElement){input=_fixEvent(input);}
if(input.dataTransfer){input=input.dataTransfer;}
else if(input.target){input=input.target;}
if(input.files){files=input.files;if(!html5){files[0].blob=input;files[0].iframe=true;}}
else if(!html5&&isInputFile(input)){if(api.trim(input.value)){files=[api.checkFileObj(input.value)];files[0].blob=input;files[0].iframe=true;}}
else if(_isArray(input)){files=input;}
return api.filter(files,function(file){return!filter||filter.test(file.name);});},getTotalSize:function(files){var size=0,i=files&&files.length;while(i--){size+=files[i].size;}
return size;},getInfo:function(file,fn){var info={},readers=_infoReader.concat();if(api.isFile(file)){(function _next(){var reader=readers.shift();if(reader){if(reader.test(file.type)){reader(file,function(err,res){if(err){fn(err);}
else{_extend(info,res);_next();}});}
else{_next();}}
else{fn(false,info);}})();}
else{fn('not_support_info',info);}},addInfoReader:function(mime,fn){fn.test=function(type){return mime.test(type);};_infoReader.push(fn);},filter:function(input,fn){var result=[],i=0,n=input.length,val;for(;i<n;i++){if(i in input){val=input[i];if(fn.call(val,val,i,input)){result.push(val);}}}
return result;},filterFiles:function(files,eachFn,resultFn){if(files.length){var queue=files.concat(),file,result=[],deleted=[];(function _next(){if(queue.length){file=queue.shift();api.getInfo(file,function(err,info){(eachFn(file,err?false:info)?result:deleted).push(file);_next();});}
else{resultFn(result,deleted);}})();}
else{resultFn([],files);}},upload:function(options){options=_extend({prepare:api.F,beforeupload:api.F,upload:api.F,fileupload:api.F,fileprogress:api.F,filecomplete:api.F,progress:api.F,complete:api.F,pause:api.F,imageOriginal:true,chunkSize:api.chunkSize,chunkUpoloadRetry:api.chunkUploadRetry},options);if(options.imageAutoOrientation&&!options.imageTransform){options.imageTransform={rotate:'auto'};}
var
proxyXHR=new api.XHR(options),dataArray=this._getFilesDataArray(options.files),_this=this,_total=0,_loaded=0,_nextFile,_complete=false;_each(dataArray,function(data){_total+=data.size;});proxyXHR.files=[];_each(dataArray,function(data){proxyXHR.files.push(data.file);});proxyXHR.total=_total;proxyXHR.loaded=0;proxyXHR.filesLeft=dataArray.length;options.beforeupload(proxyXHR,options);_nextFile=function(){var
data=dataArray.shift(),_file=data&&data.file,_fileLoaded=false,_fileOptions=_simpleClone(options);proxyXHR.filesLeft=dataArray.length;if(_file&&_file.name===api.expando){_file=null;api.log('[warn] FileAPI.upload() — called without files');}
if((proxyXHR.statusText!='abort'||proxyXHR.current)&&data){_complete=false;proxyXHR.currentFile=_file;_file&&options.prepare(_file,_fileOptions);_this._getFormData(_fileOptions,data,function(form){if(!_loaded){options.upload(proxyXHR,options);}
var xhr=new api.XHR(_extend({},_fileOptions,{upload:_file?function(){options.fileupload(_file,xhr,_fileOptions);}:noop,progress:_file?function(evt){if(!_fileLoaded){options.fileprogress({type:'progress',total:data.total=evt.total,loaded:data.loaded=evt.loaded},_file,xhr,_fileOptions);options.progress({type:'progress',total:_total,loaded:proxyXHR.loaded=(_loaded+data.size*(evt.loaded/evt.total))|0},_file,xhr,_fileOptions);}}:noop,complete:function(err){_fileLoaded=true;_each(_xhrPropsExport,function(name){proxyXHR[name]=xhr[name];});if(_file){data.loaded=data.total;this.progress(data);_loaded+=data.size;proxyXHR.loaded=_loaded;options.filecomplete(err,xhr,_file,_fileOptions);}
_nextFile.call(_this);}}));proxyXHR.abort=function(current){if(!current){dataArray.length=0;}
this.current=current;xhr.abort();};xhr.send(form);});}
else{options.complete(proxyXHR.status==200||proxyXHR.status==201?false:(proxyXHR.statusText||'error'),proxyXHR,options);_complete=true;}};setTimeout(_nextFile,0);proxyXHR.append=function(files,first){files=api._getFilesDataArray([].concat(files));_each(files,function(data){_total+=data.size;proxyXHR.files.push(data.file);if(first){dataArray.unshift(data);}else{dataArray.push(data);}});proxyXHR.statusText="";if(_complete){_nextFile.call(_this);}};proxyXHR.remove=function(file){var i=dataArray.length,_file;while(i--){if(dataArray[i].file==file){_file=dataArray.splice(i,1);_total-=_file.size;}}
return _file;};return proxyXHR;},_getFilesDataArray:function(data){var files=[],oFiles={};if(isInputFile(data)){var tmp=api.getFiles(data);oFiles[data.name||'file']=data.getAttribute('multiple')!==null?tmp:tmp[0];}
else if(_isArray(data)&&isInputFile(data[0])){_each(data,function(input){oFiles[input.name||'file']=api.getFiles(input);});}
else{oFiles=data;}
_each(oFiles,function add(file,name){if(_isArray(file)){_each(file,function(file){add(file,name);});}
else if(file&&(file.name||file.image)){files.push({name:name,file:file,size:file.size,total:file.size,loaded:0});}});if(!files.length){files.push({file:{name:api.expando}});}
return files;},_getFormData:function(options,data,fn){var
file=data.file,name=data.name,filename=file.name,filetype=file.type,trans=api.support.transform&&options.imageTransform,Form=new api.Form,queue=api.queue(function(){fn(Form);}),isOrignTrans=trans&&_isOriginTransform(trans),postNameConcat=api.postNameConcat;(function _addFile(file){if(file.image){queue.inc();file.toData(function(err,image){filename=filename||(new Date).getTime()+'.png';_addFile(image);queue.next();});}
else if(api.Image&&trans&&(/^image/.test(file.type)||_rimgcanvas.test(file.nodeName))){queue.inc();if(isOrignTrans){trans=[trans];}
api.Image.transform(file,trans,options.imageAutoOrientation,function(err,images){if(isOrignTrans&&!err){if(!dataURLtoBlob&&!api.flashEngine){Form.multipart=true;}
Form.append(name,images[0],filename,trans[0].type||filetype);}
else{var addOrigin=0;if(!err){_each(images,function(image,idx){if(!dataURLtoBlob&&!api.flashEngine){Form.multipart=true;}
if(!trans[idx].postName){addOrigin=1;}
Form.append(trans[idx].postName||postNameConcat(name,idx),image,filename,trans[idx].type||filetype);});}
if(err||options.imageOriginal){Form.append(postNameConcat(name,(addOrigin?'original':null)),file,filename,filetype);}}
queue.next();});}
else if(filename!==api.expando){Form.append(name,file,filename);}})(file);_each(options.data,function add(val,name){if(typeof val=='object'){_each(val,function(v,i){add(v,postNameConcat(name,i));});}
else{Form.append(name,val);}});queue.check();},reset:function(inp,notRemove){var parent,clone;if(jQuery){clone=jQuery(inp).clone(true).insertBefore(inp).val('')[0];if(!notRemove){jQuery(inp).remove();}}else{parent=inp.parentNode;clone=parent.insertBefore(inp.cloneNode(true),inp);clone.value='';if(!notRemove){parent.removeChild(inp);}
_each(_elEvents[api.uid(inp)],function(fns,type){_each(fns,function(fn){_off(inp,type,fn);_on(clone,type,fn);});});}
return clone;},load:function(url,fn){var xhr=api.getXHR();if(xhr){xhr.open('GET',url,true);if(xhr.overrideMimeType){xhr.overrideMimeType('text/plain; charset=x-user-defined');}
_on(xhr,'progress',function(evt){if(evt.lengthComputable){fn({type:evt.type,loaded:evt.loaded,total:evt.total},xhr);}});xhr.onreadystatechange=function(){if(xhr.readyState==4){xhr.onreadystatechange=null;if(xhr.status==200){url=url.split('/');var file={name:url[url.length-1],size:xhr.getResponseHeader('Content-Length'),type:xhr.getResponseHeader('Content-Type')};file.dataURL='data:'+file.type+';base64,'+api.encode64(xhr.responseBody||xhr.responseText);fn({type:'load',result:file},xhr);}
else{fn({type:'error'},xhr);}}};xhr.send(null);}else{fn({type:'error'});}
return xhr;},encode64:function(str){var b64='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',outStr='',i=0;if(typeof str!=='string'){str=String(str);}
while(i<str.length){var
byte1=str.charCodeAt(i++)&0xff,byte2=str.charCodeAt(i++)&0xff,byte3=str.charCodeAt(i++)&0xff,enc1=byte1>>2,enc2=((byte1&3)<<4)|(byte2>>4),enc3,enc4;if(isNaN(byte2)){enc3=enc4=64;}else{enc3=((byte2&15)<<2)|(byte3>>6);enc4=isNaN(byte3)?64:byte3&63;}
outStr+=b64.charAt(enc1)+b64.charAt(enc2)+b64.charAt(enc3)+b64.charAt(enc4);}
return outStr;}};function _emit(target,fn,name,res,ext){var evt={type:name.type||name,target:target,result:res};_extend(evt,ext);fn(evt);}
function _hasSupportReadAs(as){return FileReader&&!!FileReader.prototype['readAs'+as];}
function _readAs(file,fn,as,encoding){if(api.isFile(file)&&_hasSupportReadAs(as)){var Reader=new FileReader;_on(Reader,_readerEvents,function _fn(evt){var type=evt.type;if(type=='progress'){_emit(file,fn,evt,evt.target.result,{loaded:evt.loaded,total:evt.total});}
else if(type=='loadend'){_off(Reader,_readerEvents,_fn);Reader=null;}
else{_emit(file,fn,evt,evt.target.result);}});try{if(encoding){Reader['readAs'+as](file,encoding);}
else{Reader['readAs'+as](file);}}
catch(err){_emit(file,fn,'error',undef,{error:err.toString()});}}
else{_emit(file,fn,'error',undef,{error:'filreader_not_support_'+as});}}
function _isRegularFile(file,callback){if(!file.type&&(file.size%4096)===0&&(file.size<=102400)){if(FileReader){try{var Reader=new FileReader();_one(Reader,_readerEvents,function(evt){var isFile=evt.type!='error';callback(isFile);if(isFile){Reader.abort();}});Reader.readAsDataURL(file);}catch(err){callback(false);}}
else{callback(null);}}
else{callback(true);}}
function _getAsEntry(item){var entry;if(item.getAsEntry){entry=item.getAsEntry();}
else if(item.webkitGetAsEntry){entry=item.webkitGetAsEntry();}
return entry;}
function _readEntryAsFiles(entry,callback){if(!entry){callback('invalid entry');}
else if(entry.isFile){entry.file(function(file){file.fullPath=entry.fullPath;callback(false,[file]);},function(err){callback('FileError.code: '+err.code);});}
else if(entry.isDirectory){var reader=entry.createReader(),result=[];reader.readEntries(function(entries){api.afor(entries,function(next,entry){_readEntryAsFiles(entry,function(err,files){if(err){api.log(err);}
else{result=result.concat(files);}
if(next){next();}
else{callback(false,result);}});});},function(err){callback('directory_reader: '+err);});}
else{_readEntryAsFiles(_getAsEntry(entry),callback);}}
function _simpleClone(obj){var copy={};_each(obj,function(val,key){if(val&&(typeof val==='object')&&(val.nodeType===void 0)){val=_extend({},val);}
copy[key]=val;});return copy;}
function isInputFile(el){return _rinput.test(el&&el.tagName);}
function _getDataTransfer(evt){return(evt.originalEvent||evt||'').dataTransfer||{};}
function _isOriginTransform(trans){var key;for(key in trans){if(trans.hasOwnProperty(key)){if(!(trans[key]instanceof Object||key==='overlay')){return true;}}}
return false;}
api.addInfoReader(/^image/,function(file,callback){if(!file.__dimensions){var defer=file.__dimensions=api.defer();api.readAsImage(file,function(evt){var img=evt.target;defer.resolve(evt.type=='load'?false:'error',{width:img.width,height:img.height});img=null;});}
file.__dimensions.then(callback);});api.event.dnd=function(el,onHover,onDrop){var _id,_type;if(!onDrop){onDrop=onHover;onHover=api.F;}
if(FileReader){_on(el,'dragenter dragleave dragover',function(evt){var
types=_getDataTransfer(evt).types,i=types&&types.length,debounceTrigger=false;while(i--){if(~types[i].indexOf('File')){evt[preventDefault]();if(_type!==evt.type){_type=evt.type;if(_type!='dragleave'){onHover.call(evt[currentTarget],true,evt);}
debounceTrigger=true;}
break;}}
if(debounceTrigger){clearTimeout(_id);_id=setTimeout(function(){onHover.call(evt[currentTarget],_type!='dragleave',evt);},50);}});_on(el,'drop',function(evt){evt[preventDefault]();_type=0;onHover.call(evt[currentTarget],false,evt);api.getDropFiles(evt,function(files){onDrop.call(evt[currentTarget],files,evt);});});}
else{api.log("Drag'n'Drop -- not supported");}};api.event.dnd.off=function(el,onHover,onDrop){_off(el,'dragenter dragleave dragover',onHover);_off(el,'drop',onDrop);};if(jQuery&&!jQuery.fn.dnd){jQuery.fn.dnd=function(onHover,onDrop){return this.each(function(){api.event.dnd(this,onHover,onDrop);});};jQuery.fn.offdnd=function(onHover,onDrop){return this.each(function(){api.event.dnd.off(this,onHover,onDrop);});};}
window.FileAPI=_extend(api,window.FileAPI);api.log('FileAPI: '+api.version);api.log('protocol: '+window.location.protocol);api.log('doctype: ['+doctype.name+'] '+doctype.publicId+' '+doctype.systemId);_each(document.getElementsByTagName('meta'),function(meta){if(/x-ua-compatible/i.test(meta.getAttribute('http-equiv'))){api.log('meta.http-equiv: '+meta.getAttribute('content'));}});if(!api.flashUrl){api.flashUrl=api.staticPath+'FileAPI.flash.swf';}
if(!api.flashImageUrl){api.flashImageUrl=api.staticPath+'FileAPI.flash.image.swf';}})(window,void 0);(function(api,document,undef){'use strict';var
min=Math.min,round=Math.round,getCanvas=function(){return document.createElement('canvas');},support=false,exifOrientation={8:270,3:180,6:90};try{support=getCanvas().toDataURL('image/png').indexOf('data:image/png')>-1;}
catch(e){}
function Image(file){if(file instanceof Image){var img=new Image(file.file);api.extend(img.matrix,file.matrix);return img;}
else if(!(this instanceof Image)){return new Image(file);}
this.file=file;this.matrix={sx:0,sy:0,sw:0,sh:0,dx:0,dy:0,dw:0,dh:0,resize:0,deg:0,quality:1,filter:0};}
Image.prototype={image:true,constructor:Image,set:function(attrs){api.extend(this.matrix,attrs);return this;},crop:function(x,y,w,h){if(w===undef){w=x;h=y;x=y=0;}
return this.set({sx:x,sy:y,sw:w,sh:h||w});},resize:function(w,h,type){if(typeof h=='string'){type=h;h=w;}
return this.set({dw:w,dh:h,resize:type});},preview:function(w,h){return this.resize(w,h||w,'preview');},rotate:function(deg){return this.set({deg:deg});},filter:function(filter){return this.set({filter:filter});},overlay:function(images){return this.set({overlay:images});},clone:function(){return new Image(this);},_load:function(image,fn){var self=this;if(/img|video/i.test(image.nodeName)){fn.call(self,null,image);}
else{api.readAsImage(image,function(evt){fn.call(self,evt.type!='load',evt.result);});}},_apply:function(image,fn){var
canvas=getCanvas(),m=this.getMatrix(image),ctx=canvas.getContext('2d'),width=image.videoWidth||image.width,height=image.videoHeight||image.height,deg=m.deg,dw=m.dw,dh=m.dh,w=width,h=height,filter=m.filter,copy,buffer=image,overlay=m.overlay,queue=api.queue(function(){fn(false,canvas);}),renderImageToCanvas=api.renderImageToCanvas;image._type=this.file.type;while(min(w/dw,h/dh)>2){w=(w/2+0.5)|0;h=(h/2+0.5)|0;copy=getCanvas();copy.width=w;copy.height=h;if(buffer!==image){renderImageToCanvas(copy,buffer,0,0,buffer.width,buffer.height,0,0,w,h);buffer=copy;}
else{buffer=copy;renderImageToCanvas(buffer,image,m.sx,m.sy,m.sw,m.sh,0,0,w,h);m.sx=m.sy=m.sw=m.sh=0;}}
canvas.width=(deg%180)?dh:dw;canvas.height=(deg%180)?dw:dh;canvas.type=m.type;canvas.quality=m.quality;ctx.rotate(deg*Math.PI/180);renderImageToCanvas(canvas,buffer,m.sx,m.sy,m.sw||buffer.width,m.sh||buffer.height,(deg==180||deg==270?-dw:0),(deg==90||deg==180?-dh:0),dw,dh);dw=canvas.width;dh=canvas.height;overlay&&api.each([].concat(overlay),function(over){queue.inc();var img=new window.Image,fn=function(){var
x=over.x|0,y=over.y|0,w=over.w||img.width,h=over.h||img.height,rel=over.rel;x=(rel==1||rel==4||rel==7)?(dw-w+x)/2:(rel==2||rel==5||rel==8?dw-(w+x):x);y=(rel==3||rel==4||rel==5)?(dh-h+y)/2:(rel>=6?dh-(h+y):y);api.event.off(img,'error load abort',fn);try{ctx.globalAlpha=over.opacity||1;ctx.drawImage(img,x,y,w,h);}
catch(er){}
queue.next();};api.event.on(img,'error load abort',fn);img.src=over.src;if(img.complete){fn();}});if(filter){queue.inc();Image.applyFilter(canvas,filter,queue.next);}
queue.check();},getMatrix:function(image){var
m=api.extend({},this.matrix),sw=m.sw=m.sw||image.videoWidth||image.naturalWidth||image.width,sh=m.sh=m.sh||image.videoHeight||image.naturalHeight||image.height,dw=m.dw=m.dw||sw,dh=m.dh=m.dh||sh,sf=sw/sh,df=dw/dh,type=m.resize;if(type=='preview'){if(dw!=sw||dh!=sh){var w,h;if(df>=sf){w=sw;h=w/df;}else{h=sh;w=h*df;}
if(w!=sw||h!=sh){m.sx=~~((sw-w)/2);m.sy=~~((sh-h)/2);sw=w;sh=h;}}}
else if(type){if(!(sw>dw||sh>dh)){dw=sw;dh=sh;}
else if(type=='min'){dw=round(sf<df?min(sw,dw):dh*sf);dh=round(sf<df?dw/sf:min(sh,dh));}
else{dw=round(sf>=df?min(sw,dw):dh*sf);dh=round(sf>=df?dw/sf:min(sh,dh));}}
m.sw=sw;m.sh=sh;m.dw=dw;m.dh=dh;return m;},_trans:function(fn){this._load(this.file,function(err,image){if(err){fn(err);}
else{this._apply(image,fn);}});},get:function(fn){if(api.support.transform){var _this=this,matrix=_this.matrix;if(matrix.deg=='auto'){api.getInfo(_this.file,function(err,info){matrix.deg=exifOrientation[info&&info.exif&&info.exif.Orientation]||0;_this._trans(fn);});}
else{_this._trans(fn);}}
else{fn('not_support_transform');}},toData:function(fn){this.get(fn);}};Image.exifOrientation=exifOrientation;Image.transform=function(file,transform,autoOrientation,fn){function _transform(err,img){var
images={},queue=api.queue(function(err){fn(err,images);});if(!err){api.each(transform,function(params,name){if(!queue.isFail()){var ImgTrans=new Image(img.nodeType?img:file);if(typeof params=='function'){params(img,ImgTrans);}
else if(params.width){ImgTrans[params.preview?'preview':'resize'](params.width,params.height,params.type);}
else{if(params.maxWidth&&(img.width>params.maxWidth||img.height>params.maxHeight)){ImgTrans.resize(params.maxWidth,params.maxHeight,'max');}}
if(params.crop){var crop=params.crop;ImgTrans.crop(crop.x|0,crop.y|0,crop.w||crop.width,crop.h||crop.height);}
if(params.rotate===undef&&autoOrientation){params.rotate='auto';}
ImgTrans.set({deg:params.rotate,type:params.type||file.type||'image/png',quality:params.quality||1,overlay:params.overlay});queue.inc();ImgTrans.toData(function(err,image){if(err){queue.fail();}
else{images[name]=image;queue.next();}});}});}
else{queue.fail();}}
if(file.width){_transform(false,file);}else{api.getInfo(file,_transform);}};api.each(['TOP','CENTER','BOTTOM'],function(x,i){api.each(['LEFT','CENTER','RIGHT'],function(y,j){Image[x+'_'+y]=i*3+j;Image[y+'_'+x]=i*3+j;});});Image.toCanvas=function(el){var canvas=document.createElement('canvas');canvas.width=el.videoWidth||el.width;canvas.height=el.videoHeight||el.height;canvas.getContext('2d').drawImage(el,0,0);return canvas;};Image.fromDataURL=function(dataURL,size,callback){var img=api.newImage(dataURL);api.extend(img,size);callback(img);};Image.applyFilter=function(canvas,filter,doneFn){if(typeof filter=='function'){filter(canvas,doneFn);}
else if(window.Caman){window.Caman(canvas.tagName=='IMG'?Image.toCanvas(canvas):canvas,function(){if(typeof filter=='string'){this[filter]();}
else{api.each(filter,function(val,method){this[method](val);},this);}
this.render(doneFn);});}};api.renderImageToCanvas=function(canvas,img,sx,sy,sw,sh,dx,dy,dw,dh){canvas.getContext('2d').drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);return canvas;};api.support.canvas=api.support.transform=support;api.Image=Image;})(FileAPI,document);(function(api,window){"use strict";var
document=window.document,FormData=window.FormData,Form=function(){this.items=[];},encodeURIComponent=window.encodeURIComponent,isPhantomJS=/phantomjs/i.test(navigator.userAgent);Form.prototype={append:function(name,blob,file,type){this.items.push({name:name,blob:blob&&blob.blob||(blob==void 0?'':blob),file:blob&&(file||blob.name),type:blob&&(type||blob.type)});},each:function(fn){var i=0,n=this.items.length;for(;i<n;i++){fn.call(this,this.items[i]);}},toData:function(fn,options){options._chunked=api.support.chunked&&options.chunkSize>0&&api.filter(this.items,function(item){return item.file;}).length==1;if(!api.support.html5){api.log('FileAPI.Form.toHtmlData');this.toHtmlData(fn);}
else if(isPhantomJS||this.multipart||!FormData){api.log('FileAPI.Form.toMultipartData');this.toMultipartData(fn);}
else if(options._chunked){api.log('FileAPI.Form.toPlainData');this.toPlainData(fn);}
else{api.log('FileAPI.Form.toFormData');this.toFormData(fn);}},_to:function(data,complete,next,arg){var queue=api.queue(function(){complete(data);});this.each(function(file){next(file,data,queue,arg);});queue.check();},toHtmlData:function(fn){this._to(document.createDocumentFragment(),fn,function(file,data){var blob=file.blob,hidden;if(file.file){api.reset(blob,true);blob.name=file.name;data.appendChild(blob);}
else{hidden=document.createElement('input');hidden.name=file.name;hidden.type='hidden';hidden.value=blob;data.appendChild(hidden);}});},toPlainData:function(fn){this._to({},fn,function(file,data,queue){if(file.file){data.type=file.file;}
if(file.blob.toBlob){queue.inc();_convertFile(file,function(file,blob){data.name=file.name;data.file=blob;data.size=blob.length;data.type=file.type;queue.next();});}
else if(file.file){data.name=file.blob.name;data.file=file.blob;data.size=file.blob.size;data.type=file.type;}
else{if(!data.params){data.params=[];}
data.params.push(encodeURIComponent(file.name)+"="+encodeURIComponent(file.blob));}
data.start=-1;data.end=data.file&&data.file.FileAPIReadPosition||-1;data.retry=0;});},toFormData:function(fn){this._to(new FormData,fn,function(file,data,queue){if(file.blob&&file.blob.toBlob){queue.inc();_convertFile(file,function(file,blob){data.append(file.name,blob,file.file);queue.next();});}
else if(file.file){data.append(file.name,file.blob,file.file);}
else{data.append(file.name,file.blob);}
if(file.file){data.append('_'+file.name,file.file);}});},toMultipartData:function(fn){this._to([],fn,function(file,data,queue,boundary){queue.inc();_convertFile(file,function(file,blob){data.push('--_'+boundary+('\r\nContent-Disposition: form-data; name="'+file.name+'"'+(file.file?'; filename="'+encodeURIComponent(file.file)+'"':'')
+(file.file?'\r\nContent-Type: '+(file.type||'application/octet-stream'):'')
+'\r\n'
+'\r\n'+(file.file?blob:encodeURIComponent(blob))
+'\r\n'));queue.next();},true);},api.expando);}};function _convertFile(file,fn,useBinaryString){var blob=file.blob,filename=file.file;if(filename){if(!blob.toDataURL){api.readAsBinaryString(blob,function(evt){if(evt.type=='load'){fn(file,evt.result);}});return;}
var
mime={'image/jpeg':'.jpe?g','image/png':'.png'},type=mime[file.type]?file.type:'image/png',ext=mime[type]||'.png',quality=blob.quality||1;if(!filename.match(new RegExp(ext+'$','i'))){filename+=ext.replace('?','');}
file.file=filename;file.type=type;if(!useBinaryString&&blob.toBlob){blob.toBlob(function(blob){fn(file,blob);},type,quality);}
else{fn(file,api.toBinaryString(blob.toDataURL(type,quality)));}}
else{fn(file,blob);}}
api.Form=Form;})(FileAPI,window);(function(window,api){"use strict";var
noop=function(){},document=window.document,XHR=function(options){this.uid=api.uid();this.xhr={abort:noop,getResponseHeader:noop,getAllResponseHeaders:noop};this.options=options;},_xhrResponsePostfix={'':1,XML:1,Text:1,Body:1};XHR.prototype={status:0,statusText:'',constructor:XHR,getResponseHeader:function(name){return this.xhr.getResponseHeader(name);},getAllResponseHeaders:function(){return this.xhr.getAllResponseHeaders()||{};},end:function(status,statusText){var _this=this,options=_this.options;_this.end=_this.abort=noop;_this.status=status;if(statusText){_this.statusText=statusText;}
api.log('xhr.end:',status,statusText);options.complete(status==200||status==201?false:_this.statusText||'unknown',_this);if(_this.xhr&&_this.xhr.node){setTimeout(function(){var node=_this.xhr.node;try{node.parentNode.removeChild(node);}catch(e){}
try{delete window[_this.uid];}catch(e){}
window[_this.uid]=_this.xhr.node=null;},9);}},abort:function(){this.end(0,'abort');if(this.xhr){this.xhr.aborted=true;this.xhr.abort();}},send:function(FormData){var _this=this,options=this.options;FormData.toData(function(data){options.upload(options,_this);_this._send.call(_this,options,data);},options);},_send:function(options,data){var _this=this,xhr,uid=_this.uid,url=options.url;api.log('XHR._send:',data);if(!options.cache){url+=(~url.indexOf('?')?'&':'?')+api.uid();}
if(data.nodeName){options.upload(options,_this);xhr=document.createElement('div');xhr.innerHTML='<form target="'+uid+'" action="'+url+'" method="POST" enctype="multipart/form-data" style="position: absolute; top: -1000px; overflow: hidden; width: 1px; height: 1px;">'
+'<iframe name="'+uid+'" src="javascript:false;"></iframe>'
+'<input value="'+uid+'" name="callback" type="hidden"/>'
+'</form>';_this.xhr.abort=function(){var transport=xhr.getElementsByTagName('iframe')[0];if(transport){try{if(transport.stop){transport.stop();}
else if(transport.contentWindow.stop){transport.contentWindow.stop();}
else{transport.contentWindow.document.execCommand('Stop');}}
catch(er){}}
xhr=null;};var form=xhr.getElementsByTagName('form')[0];form.appendChild(data);api.log(form.parentNode.innerHTML);document.body.appendChild(xhr);_this.xhr.node=xhr;window[uid]=function(status,statusText,response){_this.readyState=4;_this.responseText=response;_this.end(status,statusText);xhr=null;};_this.readyState=2;form.submit();form=null;}
else{if(this.xhr&&this.xhr.aborted){api.log("Error: already aborted");return;}
xhr=_this.xhr=api.getXHR();if(data.params){url+=(url.indexOf('?')<0?"?":"&")+data.params.join("&");}
xhr.open('POST',url,true);if(api.withCredentials){xhr.withCredentials="true";}
if(!options.headers||!options.headers['X-Requested-With']){xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');}
api.each(options.headers,function(val,key){xhr.setRequestHeader(key,val);});if(options._chunked){if(xhr.upload){xhr.upload.addEventListener('progress',function(evt){if(!data.retry){options.progress({type:evt.type,total:data.size,loaded:data.start+evt.loaded,totalSize:data.size},_this,options);}},false);}
xhr.onreadystatechange=function(){var lkb=parseInt(xhr.getResponseHeader('X-Last-Known-Byte'),10);_this.status=xhr.status;_this.statusText=xhr.statusText;_this.readyState=xhr.readyState;if(xhr.readyState==4){for(var k in _xhrResponsePostfix){_this['response'+k]=xhr['response'+k];}
xhr.onreadystatechange=null;if(!xhr.status||xhr.status-201>0){api.log("Error: "+xhr.status);if(((!xhr.status&&!xhr.aborted)||500==xhr.status||416==xhr.status)&&++data.retry<=options.chunkUploadRetry){var delay=xhr.status?0:api.chunkNetworkDownRetryTimeout;options.pause(data.file,options);api.log("X-Last-Known-Byte: "+lkb);if(lkb){data.end=lkb;}else{data.end=data.start-1;}
setTimeout(function(){_this._send(options,data);},delay);}else{_this.end(xhr.status);}}else{data.retry=0;if(data.end==data.size-1){_this.end(xhr.status);}else{api.log("X-Last-Known-Byte: "+lkb);if(lkb){data.end=lkb;}
data.file.FileAPIReadPosition=data.end;setTimeout(function(){_this._send(options,data);},0);}}
xhr=null;}};data.start=data.end+1;data.end=Math.max(Math.min(data.start+options.chunkSize,data.size)-1,data.start);var slice;(slice='slice')in data.file||(slice='mozSlice')in data.file||(slice='webkitSlice')in data.file;xhr.setRequestHeader("Content-Range","bytes "+data.start+"-"+data.end+"/"+data.size);xhr.setRequestHeader("Content-Disposition",'attachment; filename='+encodeURIComponent(data.name));xhr.setRequestHeader("Content-Type",data.type||"application/octet-stream");slice=data.file[slice](data.start,data.end+1);xhr.send(slice);slice=null;}else{if(xhr.upload){xhr.upload.addEventListener('progress',api.throttle(function(evt){options.progress(evt,_this,options);},100),false);}
xhr.onreadystatechange=function(){_this.status=xhr.status;_this.statusText=xhr.statusText;_this.readyState=xhr.readyState;if(xhr.readyState==4){for(var k in _xhrResponsePostfix){_this['response'+k]=xhr['response'+k];}
xhr.onreadystatechange=null;_this.end(xhr.status);xhr=null;}};if(api.isArray(data)){xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=_'+api.expando);data=data.join('')+'--_'+api.expando+'--';if(xhr.sendAsBinary){xhr.sendAsBinary(data);}
else{var bytes=Array.prototype.map.call(data,function(c){return c.charCodeAt(0)&0xff;});xhr.send(new Uint8Array(bytes).buffer);}}else{xhr.send(data);}}}}};api.XHR=XHR;})(window,FileAPI);(function(window,api){"use strict";var
URL=window.URL||window.webkitURL,document=window.document,navigator=window.navigator,getMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,html5=!!getMedia;api.support.media=html5;var Camera=function(video){this.video=video;};Camera.prototype={isActive:function(){return!!this._active;},start:function(callback){var
_this=this,video=_this.video,_successId,_failId,_complete=function(err){_this._active=!err;clearTimeout(_failId);clearTimeout(_successId);callback&&callback(err,_this);};getMedia.call(navigator,{video:true},function(stream){_this.stream=stream;video.src=URL.createObjectURL(stream);_successId=setInterval(function(){if(_detectVideoSignal(video)){_complete(null);}},1000);_failId=setTimeout(function(){_complete('timeout');},5000);video.play();},_complete);},stop:function(){try{this._active=false;this.video.pause();this.stream.stop();}catch(err){}},shot:function(){return new Shot(this.video);}};Camera.get=function(el){return new Camera(el.firstChild);};Camera.publish=function(el,options,callback){if(typeof options=='function'){callback=options;options={};}
options=api.extend({},{width:'100%',height:'100%',start:true},options);if(el.jquery){el=el[0];}
var doneFn=function(err){if(err){callback(err);}
else{var cam=Camera.get(el);if(options.start){cam.start(callback);}
else{callback(null,cam);}}};if(api.html5&&html5){var video=document.createElement('video');video.style.width=_px(options.width);video.style.height=_px(options.height);if(window.jQuery){jQuery(el).empty();}else{el.innerHTML='';}
el.appendChild(video);doneFn();}
else{Camera.fallback(el,options,doneFn);}};Camera.fallback=function(el,options,callback){callback('not_support_camera');};var Shot=function(video){var canvas=video.nodeName?api.Image.toCanvas(video):video;var shot=api.Image(canvas);shot.type='image/png';shot.width=canvas.width;shot.height=canvas.height;shot.size=canvas.width*canvas.height*4;return shot;};function _px(val){return val>=0?val+'px':val;}
function _detectVideoSignal(video){var canvas=document.createElement('canvas'),ctx,res=false;try{ctx=canvas.getContext('2d');ctx.drawImage(video,0,0,1,1);res=ctx.getImageData(0,0,1,1).data[4]!=255;}
catch(e){}
return res;}
Camera.Shot=Shot;api.Camera=Camera;})(window,FileAPI);(function(window,jQuery,api){"use strict";var
document=window.document,location=window.location,navigator=window.navigator;api.support.flash=(function(){var mime=navigator.mimeTypes,has=false;if(navigator.plugins&&typeof navigator.plugins['Shockwave Flash']=='object'){has=navigator.plugins['Shockwave Flash'].description&&!(mime&&mime['application/x-shockwave-flash']&&!mime['application/x-shockwave-flash'].enabledPlugin);}
else{try{has=!!(window.ActiveXObject&&new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));}
catch(er){api.log('Flash -- does not supported.');}}
if(has&&/^file:/i.test(location)){api.log('[warn] Flash does not work on `file:` protocol.');}
return has;})();api.support.flash&&(0||!api.html5||!api.support.html5||(api.cors&&!api.support.cors)||(api.media&&!api.support.media))&&(function(){var
_attr=api.uid(),_retry=0,_files={},_rhttp=/^https?:/i,flash={_fn:{},init:function(){var child=document.body&&document.body.firstChild;if(child){do{if(child.nodeType==1){api.log('FlashAPI.state: awaiting');var dummy=document.createElement('div');dummy.id='_'+_attr;_css(dummy,{top:1,right:1,width:5,height:5,position:'absolute',zIndex:1e6+''});child.parentNode.insertBefore(dummy,child);flash.publish(dummy,_attr);return;}}
while(child=child.nextSibling);}
if(_retry<10){setTimeout(flash.init,++_retry*50);}},publish:function(el,id,opts){opts=opts||{};el.innerHTML=_makeFlashHTML({id:id,src:_getUrl(api.flashUrl,'r='+api.version),wmode:opts.camera?'':'transparent',flashvars:'callback='+(opts.onEvent||'FileAPI.Flash.onEvent')
+'&flashId='+id
+'&storeKey='+navigator.userAgent.match(/\d/ig).join('')+'_'+api.version
+(flash.isReady||(api.pingUrl?'&ping='+api.pingUrl:''))
+'&timeout='+api.flashAbortTimeout
+(opts.camera?'&useCamera=1':'')},opts);},ready:function(){api.log('FlashAPI.state: ready');flash.ready=api.F;flash.isReady=true;flash.patch();api.event.on(document,'mouseover',flash.mouseover);api.event.on(document,'click',function(evt){if(flash.mouseover(evt)){evt.preventDefault?evt.preventDefault():(evt.returnValue=true);}});},getEl:function(){return document.getElementById('_'+_attr);},getWrapper:function(node){do{if(/js-fileapi-wrapper/.test(node.className)){return node;}}
while((node=node.parentNode)&&(node!==document.body));},mouseover:function(evt){var target=api.event.fix(evt).target;if(/input/i.test(target.nodeName)&&target.type=='file'){var
state=target.getAttribute(_attr),wrapper=flash.getWrapper(target);if(api.multiFlash){if(state=='i'||state=='r'){return false;}
else if(state!='p'){target.setAttribute(_attr,'i');var dummy=document.createElement('div');if(!wrapper){api.log('[err] FlashAPI.mouseover: js-fileapi-wrapper not found');return;}
_css(dummy,{top:0,left:0,width:target.offsetWidth+100,height:target.offsetHeight+100,zIndex:1e6+'',position:'absolute'});wrapper.appendChild(dummy);flash.publish(dummy,api.uid());target.setAttribute(_attr,'p');}
return true;}
else if(wrapper){var box=_getDimensions(wrapper);_css(flash.getEl(),box);flash.curInp=target;}}
else if(!/object|embed/i.test(target.nodeName)){_css(flash.getEl(),{top:1,left:1,width:5,height:5});}},onEvent:function(evt){var type=evt.type;if(type=='ready'){try{flash.getInput(evt.flashId).setAttribute(_attr,'r');}catch(e){}
flash.ready();setTimeout(function(){flash.mouseenter(evt);},50);return true;}
else if(type==='ping'){api.log('(flash -> js).ping:',[evt.status,evt.savedStatus],evt.error);}
else if(type==='log'){api.log('(flash -> js).log:',evt.target);}
else if(type in flash){setTimeout(function(){api.log('FlashAPI.event.'+evt.type+':',evt);flash[type](evt);},1);}},mouseenter:function(evt){var node=flash.getInput(evt.flashId);if(node){flash.cmd(evt,'multiple',node.getAttribute('multiple')!=null);var accept=[],exts={};api.each((node.getAttribute('accept')||'').split(/,\s*/),function(mime){api.accept[mime]&&api.each(api.accept[mime].split(' '),function(ext){exts[ext]=1;});});api.each(exts,function(i,ext){accept.push(ext);});flash.cmd(evt,'accept',accept.length?accept.join(',')+','+accept.join(',').toUpperCase():'*');}},get:function(id){return document[id]||window[id]||document.embeds[id];},getInput:function(id){if(api.multiFlash){try{var node=flash.getWrapper(flash.get(id));if(node){return node.getElementsByTagName('input')[0];}}catch(e){api.log('[err] Can not find "input" by flashId:',id,e);}}else{return flash.curInp;}},select:function(evt){var
inp=flash.getInput(evt.flashId),uid=api.uid(inp),files=evt.target.files,event;api.each(files,function(file){api.checkFileObj(file);});_files[uid]=files;if(document.createEvent){event=document.createEvent('Event');event.files=files;event.initEvent('change',true,true);inp.dispatchEvent(event);}
else if(jQuery){jQuery(inp).trigger({type:'change',files:files});}
else{event=document.createEventObject();event.files=files;inp.fireEvent('onchange',event);}},cmd:function(id,name,data,last){try{api.log('(js -> flash).'+name+':',data);return flash.get(id.flashId||id).cmd(name,data);}catch(e){api.log('(js -> flash).onError:',e);if(!last){setTimeout(function(){flash.cmd(id,name,data,true);},50);}}},patch:function(){api.flashEngine=api.support.transform=true;_inherit(api,{getFiles:function(input,filter,callback){if(callback){api.filterFiles(api.getFiles(input),filter,callback);return null;}
var files=api.isArray(input)?input:_files[api.uid(input.target||input.srcElement||input)];if(!files){return this.parent.apply(this,arguments);}
if(filter){filter=api.getFilesFilter(filter);files=api.filter(files,function(file){return filter.test(file.name);});}
return files;},getInfo:function(file,fn){if(_isHtmlFile(file)){this.parent.apply(this,arguments);}
else if(file.isShot){fn(null,file.info={width:file.width,height:file.height});}
else{if(!file.__info){var defer=file.__info=api.defer();flash.cmd(file,'getFileInfo',{id:file.id,callback:_wrap(function _(err,info){_unwrap(_);defer.resolve(err,file.info=info);})});}
file.__info.then(fn);}}});api.support.transform=true;api.Image&&_inherit(api.Image.prototype,{get:function(fn,scaleMode){this.set({scaleMode:scaleMode||'noScale'});this.parent(fn);},_load:function(file,fn){api.log('FlashAPI.Image._load:',file);if(_isHtmlFile(file)){this.parent.apply(this,arguments);}
else{var _this=this;api.getInfo(file,function(err){fn.call(_this,err,file);});}},_apply:function(file,fn){api.log('FlashAPI.Image._apply:',file);if(_isHtmlFile(file)){this.parent.apply(this,arguments);}
else{var m=this.getMatrix(file.info),doneFn=fn;flash.cmd(file,'imageTransform',{id:file.id,matrix:m,callback:_wrap(function _(err,base64){api.log('FlashAPI.Image._apply.callback:',err);_unwrap(_);if(err){doneFn(err);}
else if(!api.support.html5&&(!api.support.dataURI||base64.length>3e4)){_makeFlashImage({width:(m.deg%180)?m.dh:m.dw,height:(m.deg%180)?m.dw:m.dh,scale:m.scaleMode},base64,doneFn);}
else{if(m.filter){doneFn=function(err,img){if(err){fn(err);}
else{api.Image.applyFilter(img,m.filter,function(){fn(err,this.canvas);});}};}
api.newImage('data:'+file.type+';base64,'+base64,doneFn);}})});}},toData:function(fn){var
file=this.file,info=file.info,matrix=this.getMatrix(info);if(_isHtmlFile(file)){this.parent.apply(this,arguments);}
else{if(matrix.deg=='auto'){matrix.deg=api.Image.exifOrientation[info&&info.exif&&info.exif.Orientation]||0;}
fn.call(this,!file.info,{id:file.id,flashId:file.flashId,name:file.name,type:file.type,matrix:matrix});}}});api.Image&&_inherit(api.Image,{fromDataURL:function(dataURL,size,callback){if(!api.support.dataURI||dataURL.length>3e4){_makeFlashImage(api.extend({scale:'exactFit'},size),dataURL.replace(/^data:[^,]+,/,''),function(err,el){callback(el);});}
else{this.parent(dataURL,size,callback);}}});api.Camera.fallback=function(el,options,callback){var camId=api.uid();api.log('FlashAPI.Camera.publish: '+camId);flash.publish(el,camId,api.extend(options,{camera:true,onEvent:_wrap(function _(evt){if(evt.type=='camera'){_unwrap(_);if(evt.error){api.log('FlashAPI.Camera.publish.error: '+evt.error);callback(evt.error);}
else{api.log('FlashAPI.Camera.publish.success: '+camId);callback(null);}}})}));};_inherit(api.Camera.prototype,{_id:function(){return this.video.id;},start:function(callback){var _this=this;flash.cmd(this._id(),'camera.on',{callback:_wrap(function _(evt){_unwrap(_);if(evt.error){api.log('FlashAPI.camera.on.error: '+evt.error);callback(evt.error,_this);}
else{api.log('FlashAPI.camera.on.success: '+_this._id());_this.active=true;callback(null,_this);}})});},stop:function(){this.active=false;flash.cmd(this._id(),'camera.off');},shot:function(){api.log('FlashAPI.Camera.shot:',this._id());var shot=flash.cmd(this._id(),'shot',{});shot.type='image/png';shot.flashId=this._id();shot.isShot=true;return new api.Camera.Shot(shot);}});_inherit(api.Form.prototype,{toData:function(fn){var items=this.items,i=items.length;for(;i--;){if(items[i].file&&_isHtmlFile(items[i].blob)){return this.parent.apply(this,arguments);}}
api.log('FlashAPI.Form.toData');fn(items);}});_inherit(api.XHR.prototype,{_send:function(options,formData){if(formData.nodeName||formData.append&&api.support.html5||api.isArray(formData)&&(typeof formData[0]==='string')){return this.parent.apply(this,arguments);}
var
data={},files={},_this=this,flashId,fileId;api.each(formData,function(item){if(item.file){files[item.name]=item=_getFileDescr(item.blob);fileId=item.id;flashId=item.flashId;}
else{data[item.name]=item.blob;}});if(!fileId){flashId=_attr;}
if(!flashId){api.log('[err] FlashAPI._send: flashId -- undefined');return this.parent.apply(this,arguments);}
else{api.log('FlashAPI.XHR._send: '+flashId+' -> '+fileId,files);}
_this.xhr={headers:{},abort:function(){flash.cmd(flashId,'abort',{id:fileId});},getResponseHeader:function(name){return this.headers[name];},getAllResponseHeaders:function(){return this.headers;}};var queue=api.queue(function(){flash.cmd(flashId,'upload',{url:_getUrl(options.url),data:data,files:fileId?files:null,headers:options.headers||{},callback:_wrap(function upload(evt){var type=evt.type,result=evt.result;api.log('FlashAPI.upload.'+type+':',evt);if(type=='progress'){evt.loaded=Math.min(evt.loaded,evt.total);evt.lengthComputable=true;options.progress(evt);}
else if(type=='complete'){_unwrap(upload);if(typeof result=='string'){_this.responseText=result.replace(/%22/g,"\"").replace(/%5c/g,"\\").replace(/%26/g,"&").replace(/%25/g,"%");}
_this.end(evt.status||200);}
else if(type=='abort'||type=='error'){_this.end(evt.status||0,evt.message);_unwrap(upload);}})});});api.each(files,function(file){queue.inc();api.getInfo(file,queue.next);});queue.check();}});}};function _makeFlashHTML(opts){return('<object id="#id#" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+(opts.width||'100%')+'" height="'+(opts.height||'100%')+'">'
+'<param name="movie" value="#src#" />'
+'<param name="flashvars" value="#flashvars#" />'
+'<param name="swliveconnect" value="true" />'
+'<param name="allowscriptaccess" value="always" />'
+'<param name="allownetworking" value="all" />'
+'<param name="menu" value="false" />'
+'<param name="wmode" value="#wmode#" />'
+'<embed flashvars="#flashvars#" swliveconnect="true" allownetworking="all" allowscriptaccess="always" name="#id#" src="#src#" width="'+(opts.width||'100%')+'" height="'+(opts.height||'100%')+'" menu="false" wmode="transparent" type="application/x-shockwave-flash"></embed>'
+'</object>').replace(/#(\w+)#/ig,function(a,name){return opts[name];});}
function _css(el,css){if(el&&el.style){var key,val;for(key in css){val=css[key];if(typeof val=='number'){val+='px';}
try{el.style[key]=val;}catch(e){}}}}
function _inherit(obj,methods){api.each(methods,function(fn,name){var prev=obj[name];obj[name]=function(){this.parent=prev;return fn.apply(this,arguments);};});}
function _isHtmlFile(file){return file&&!file.flashId;}
function _wrap(fn){var id=fn.wid=api.uid();flash._fn[id]=fn;return'FileAPI.Flash._fn.'+id;}
function _unwrap(fn){try{flash._fn[fn.wid]=null;delete flash._fn[fn.wid];}
catch(e){}}
function _getUrl(url,params){if(!_rhttp.test(url)){if(/^\.\//.test(url)||'/'!=url.charAt(0)){var path=location.pathname;path=path.substr(0,path.lastIndexOf('/'));url=(path+'/'+url).replace('/./','/');}
if('//'!=url.substr(0,2)){url='//'+location.host+url;}
if(!_rhttp.test(url)){url=location.protocol+url;}}
if(params){url+=(/\?/.test(url)?'&':'?')+params;}
return url;}
function _makeFlashImage(opts,base64,fn){var
key,flashId=api.uid(),el=document.createElement('div'),attempts=10;for(key in opts){el.setAttribute(key,opts[key]);el[key]=opts[key];}
_css(el,opts);opts.width='100%';opts.height='100%';el.innerHTML=_makeFlashHTML(api.extend({id:flashId,src:_getUrl(api.flashImageUrl,'r='+api.uid()),wmode:'opaque',flashvars:'scale='+opts.scale+'&callback='+_wrap(function _(){_unwrap(_);if(--attempts>0){_setImage();}
return true;})},opts));function _setImage(){try{var img=flash.get(flashId);img.setImage(base64);}catch(e){api.log('[err] FlashAPI.Preview.setImage -- can not set "base64":',e);}}
fn(false,el);el=null;}
function _getFileDescr(file){return{id:file.id,name:file.name,matrix:file.matrix,flashId:file.flashId};}
function _getDimensions(el){var
box=el.getBoundingClientRect(),body=document.body,docEl=(el&&el.ownerDocument).documentElement;return{top:box.top+(window.pageYOffset||docEl.scrollTop)-(docEl.clientTop||body.clientTop||0),left:box.left+(window.pageXOffset||docEl.scrollLeft)-(docEl.clientLeft||body.clientLeft||0),width:box.right-box.left,height:box.bottom-box.top};}
api.Flash=flash;api.newImage('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',function(err,img){api.support.dataURI=!(img.width!=1||img.height!=1);flash.init();});})();})(window,window.jQuery,FileAPI);(function(factory){'use strict';factory(FileAPI);}(function(loadImage){'use strict';if(!window.navigator||!window.navigator.platform||!(/iP(hone|od|ad)/).test(window.navigator.platform)){return;}
var originalRenderMethod=loadImage.renderImageToCanvas;loadImage.detectSubsampling=function(img){var canvas,context;if(img.width*img.height>1024*1024){canvas=document.createElement('canvas');canvas.width=canvas.height=1;context=canvas.getContext('2d');context.drawImage(img,-img.width+1,0);return context.getImageData(0,0,1,1).data[3]===0;}
return false;};loadImage.detectVerticalSquash=function(img,subsampled){var naturalHeight=img.naturalHeight||img.height,canvas=document.createElement('canvas'),context=canvas.getContext('2d'),data,sy,ey,py,alpha;if(subsampled){naturalHeight/=2;}
canvas.width=1;canvas.height=naturalHeight;context.drawImage(img,0,0);data=context.getImageData(0,0,1,naturalHeight).data;sy=0;ey=naturalHeight;py=naturalHeight;while(py>sy){alpha=data[(py-1)*4+3];if(alpha===0){ey=py;}else{sy=py;}
py=(ey+sy)>>1;}
return(py/naturalHeight)||1;};loadImage.renderImageToCanvas=function(canvas,img,sourceX,sourceY,sourceWidth,sourceHeight,destX,destY,destWidth,destHeight){if(img._type==='image/jpeg'){var context=canvas.getContext('2d'),tmpCanvas=document.createElement('canvas'),tileSize=1024,tmpContext=tmpCanvas.getContext('2d'),subsampled,vertSquashRatio,tileX,tileY;tmpCanvas.width=tileSize;tmpCanvas.height=tileSize;context.save();subsampled=loadImage.detectSubsampling(img);if(subsampled){sourceX/=2;sourceY/=2;sourceWidth/=2;sourceHeight/=2;}
vertSquashRatio=loadImage.detectVerticalSquash(img,subsampled);if(subsampled||vertSquashRatio!==1){sourceY*=vertSquashRatio;destWidth=Math.ceil(tileSize*destWidth/sourceWidth);destHeight=Math.ceil(tileSize*destHeight/sourceHeight/vertSquashRatio);destY=0;tileY=0;while(tileY<sourceHeight){destX=0;tileX=0;while(tileX<sourceWidth){tmpContext.clearRect(0,0,tileSize,tileSize);tmpContext.drawImage(img,sourceX,sourceY,sourceWidth,sourceHeight,-tileX,-tileY,sourceWidth,sourceHeight);context.drawImage(tmpCanvas,0,0,tileSize,tileSize,destX,destY,destWidth,destHeight);tileX+=tileSize;destX+=destWidth;}
tileY+=tileSize;destY+=destHeight;}
context.restore();return canvas;}}
return originalRenderMethod(canvas,img,sourceX,sourceY,sourceWidth,sourceHeight,destX,destY,destWidth,destHeight);};}));(function(window){'use strict';var CanvasPrototype=window.HTMLCanvasElement&&window.HTMLCanvasElement.prototype,hasBlobConstructor=window.Blob&&(function(){try{return Boolean(new Blob());}catch(e){return false;}}()),hasArrayBufferViewSupport=hasBlobConstructor&&window.Uint8Array&&(function(){try{return new Blob([new Uint8Array(100)]).size===100;}catch(e){return false;}}()),BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,dataURLtoBlob=(hasBlobConstructor||BlobBuilder)&&window.atob&&window.ArrayBuffer&&window.Uint8Array&&function(dataURI){var byteString,arrayBuffer,intArray,i,mimeString,bb;if(dataURI.split(',')[0].indexOf('base64')>=0){byteString=atob(dataURI.split(',')[1]);}else{byteString=decodeURIComponent(dataURI.split(',')[1]);}
arrayBuffer=new ArrayBuffer(byteString.length);intArray=new Uint8Array(arrayBuffer);for(i=0;i<byteString.length;i+=1){intArray[i]=byteString.charCodeAt(i);}
mimeString=dataURI.split(',')[0].split(':')[1].split(';')[0];if(hasBlobConstructor){return new Blob([hasArrayBufferViewSupport?intArray:arrayBuffer],{type:mimeString});}
bb=new BlobBuilder();bb.append(arrayBuffer);return bb.getBlob(mimeString);};if(window.HTMLCanvasElement&&!CanvasPrototype.toBlob){if(CanvasPrototype.mozGetAsFile){CanvasPrototype.toBlob=function(callback,type,quality){if(quality&&CanvasPrototype.toDataURL&&dataURLtoBlob){callback(dataURLtoBlob(this.toDataURL(type,quality)));}else{callback(this.mozGetAsFile('blob',type));}};}else if(CanvasPrototype.toDataURL&&dataURLtoBlob){CanvasPrototype.toBlob=function(callback,type,quality){callback(dataURLtoBlob(this.toDataURL(type,quality)));};}}
window.dataURLtoBlob=dataURLtoBlob;})(window);if(typeof define==="function"&&define.amd){define("FileAPI",[],function(){return FileAPI;});}
(function(e){if("function"==typeof bootstrap)bootstrap("lgtm",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeLGTM=e}else"undefined"!=typeof window?window.LGTM=e():global.LGTM=e()})(function(){var define,ses,bootstrap,module,exports;return(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";var __dependency1__=require("./lgtm");var configure=__dependency1__.configure;var validator=__dependency1__.validator;var helpers=__dependency1__.helpers;var ObjectValidator=__dependency1__.ObjectValidator;var defer=require("rsvp").defer;configure('defer',defer);exports.configure=configure;exports.validator=validator;exports.helpers=helpers;exports.ObjectValidator=ObjectValidator;},{"./lgtm":2,"rsvp":9}],2:[function(require,module,exports){"use strict";var ValidatorBuilder=require("./lgtm/validator_builder");var ObjectValidator=require("./lgtm/object_validator");var core=require("./lgtm/helpers/core");var config=require("./lgtm/config");core.register();function validator(){return new ValidatorBuilder();}
function register(){ValidatorBuilder.registerHelper.apply(ValidatorBuilder,arguments);}
function unregister(){ValidatorBuilder.unregisterHelper.apply(ValidatorBuilder,arguments);}
var helpers={core:core,register:register,unregister:unregister};function configure(key,value){config[key]=value;}
if(typeof RSVP!=='undefined'){configure('defer',RSVP.defer);}else if(typeof require==='function'){try{configure('defer',require('rsvp').defer);}catch(e){}}
exports.configure=configure;exports.validator=validator;exports.helpers=helpers;exports.ObjectValidator=ObjectValidator;},{"./lgtm/config":3,"./lgtm/helpers/core":4,"./lgtm/object_validator":5,"./lgtm/validator_builder":7,"rsvp":9}],3:[function(require,module,exports){"use strict";var config={};module.exports=config;},{}],4:[function(require,module,exports){"use strict";var ValidatorBuilder=require("../validator_builder");function present(value){if(typeof value==='string'){value=value.trim();}
return value!==''&&value!==null&&value!==undefined;}
function checkEmail(value){if(typeof value==='string'){value=value.trim();}
var regexp='/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
return regexp.test(value);}
function checkMinLength(minLength){if(minLength===null||minLength===undefined){throw new Error('must specify a min length')}
return function(value){if(value!==null&&value!==undefined){return value.length>=minLength;}else{return false;}};}
function checkMaxLength(maxLength){if(maxLength===null||maxLength===undefined){throw new Error('must specify a max length')}
return function(value){if(value!==null&&value!==undefined){return value.length<=maxLength;}else{return false;}};}
function register(){ValidatorBuilder.registerHelper('required',function(message){this.using(present,message);});ValidatorBuilder.registerHelper('optional',function(){this.when(present);});ValidatorBuilder.registerHelper('email',function(message){this.using(checkEmail,message);});ValidatorBuilder.registerHelper('minLength',function(minLength,message){this.using(checkMinLength(minLength),message);});ValidatorBuilder.registerHelper('maxLength',function(maxLength,message){this.using(checkMaxLength(maxLength),message);});}
exports.present=present;exports.checkEmail=checkEmail;exports.checkMinLength=checkMinLength;exports.checkMaxLength=checkMaxLength;exports.register=register;},{"../validator_builder":7}],5:[function(require,module,exports){"use strict";var config=require("./config");var __dependency1__=require("./utils");var all=__dependency1__.all;var resolve=__dependency1__.resolve;var contains=__dependency1__.contains;var keys=__dependency1__.keys;var forEach=__dependency1__.forEach;var get=__dependency1__.get;var uniq=__dependency1__.uniq;function ObjectValidator(){this._validations={};this._dependencies={};}
ObjectValidator.prototype={_validations:null,_dependencies:null,addValidation:function(attr,fn,message){var list=this._validations[attr];if(!list){list=this._validations[attr]=[];}
list.push([fn,message]);},addDependentsFor:function(){var dependentAttributes=[].slice.apply(arguments);var parentAttribute=dependentAttributes.shift();var dependentsForParent=this._dependencies[parentAttribute];if(!dependentsForParent){dependentsForParent=this._dependencies[parentAttribute]=[];}
for(var i=0;i<dependentAttributes.length;i++){var attr=dependentAttributes[i];if(!contains(dependentsForParent,attr)){dependentsForParent.push(attr)}}},attributes:function(){return uniq(keys(this._validations).concat(keys(this._dependencies)));},validate:function(){var attributes=[].slice.apply(arguments);var object=attributes.shift();var callback=attributes.pop();var self=this;if(typeof callback==='string'){attributes.push(callback);callback=null;}
if(attributes.length===0){attributes=keys(this._validations);}
var validationPromises=[];for(var i=0;i<attributes.length;i++){var attr=attributes[i];validationPromises=validationPromises.concat(this._validateAttribute(object,attr));}
var promise=all(validationPromises).then(function(results){results=self._collectResults(results);if(callback){callback(null,results);}
return results;},function(err){if(callback){callback(err);}
throw err;});if(!callback){return promise;}},_validateAttribute:function(object,attr){var value=get(object,attr);var validations=this._validations[attr];var results=[];if(validations){validations.forEach(function(pair){var fn=pair[0];var message=pair[1];var promise=resolve().then(function(){return fn(value,attr,object);}).then(function(isValid){return[attr,isValid?null:message];});results.push(promise);});}else if(contains(this.attributes(),attr)){results.push([attr,null]);}
var dependents=this._getDependentsFor(attr);for(var i=0;i<dependents.length;i++){var dependent=dependents[i];results=results.concat(this._validateAttribute(object,dependent));}
return results;},_collectResults:function(results){var result={valid:true,errors:{}};for(var i=0;i<results.length;i++){if(!results[i]){continue;}
var attr=results[i][0];var message=results[i][1];var messages=result.errors[attr];if(!messages){messages=result.errors[attr]=[];}
if(message){messages.push(message);result.valid=false;}}
return result;},_getDependentsFor:function(parentAttribute){return(this._dependencies[parentAttribute]||[]).slice();}};module.exports=ObjectValidator;},{"./config":3,"./utils":6}],6:[function(require,module,exports){"use strict";var config=require("./config");function forEach(iterable,iterator){if(typeof iterable.forEach==='function'){iterable.forEach(iterator);}else if({}.toString.call(iterable)==='[object Object]'){var hasOwnProp={}.hasOwnProperty;for(var key in iterable){if(hasOwnProp.call(iterable,key)){iterator(iterable[key],key);}}}else{for(var i=0;i<iterable.length;i++){iterator(iterable[i],i);}}}
function keys(object){if(Object.getOwnPropertyNames){return Object.getOwnPropertyNames(object);}else{var result=[];forEach(object,function(key){result.push(key);});return result;}}
function get(object,property){if(object===null||object===undefined){return;}else if(typeof object.get==='function'){return object.get(property);}else{return object[property];}}
function getProperties(object,properties){return properties.map(function(prop){return get(object,prop);});}
function contains(array,object){return array.indexOf(object)>-1;}
function uniq(array){var result=[];for(var i=0;i<array.length;i++){var item=array[i];if(!contains(result,item)){result.push(item);}}
return result;}
function resolve(thenable){var deferred=config.defer();deferred.resolve(thenable);return deferred.promise;}
function all(thenables){if(thenables.length===0){return resolve([]);}
var results=[];var remaining=thenables.length;var deferred=config.defer();function resolver(index){return function(value){results[index]=value;if(--remaining===0){deferred.resolve(results);}};}
for(var i=0;i<thenables.length;i++){var thenable=thenables[i];resolve(thenable).then(resolver(i),deferred.reject);}
return deferred.promise;}
exports.forEach=forEach;exports.keys=keys;exports.get=get;exports.getProperties=getProperties;exports.contains=contains;exports.uniq=uniq;exports.resolve=resolve;exports.all=all;},{"./config":3}],7:[function(require,module,exports){"use strict";var ObjectValidator=require("./object_validator");var __dependency1__=require("./utils");var getProperties=__dependency1__.getProperties;var resolve=__dependency1__.resolve;function ValidatorBuilder(){this._validator=new ObjectValidator();}
ValidatorBuilder.prototype={_attr:null,_condition:null,_validator:null,validates:function(attr){this._attr=attr;this._condition=null;return this;},when:function(){var dependencies=[].slice.apply(arguments);var condition=dependencies.pop();if(dependencies.length===0){dependencies=[this._attr];}
for(var i=0;i<dependencies.length;i++){var dependency=dependencies[i];if(dependency!==this._attr){this._validator.addDependentsFor(dependency,this._attr);}}
this._condition=condition;this._conditionDependencies=dependencies;return this;},using:function(){var dependencies=[].slice.apply(arguments);var message=dependencies.pop();var predicate=dependencies.pop();if(dependencies.length===0){dependencies=[this._attr];}
for(var i=0;i<dependencies.length;i++){var dependency=dependencies[i];if(dependency!==this._attr){this._validator.addDependentsFor(dependency,this._attr);}}
function validation(value,attr,object){var properties=getProperties(object,dependencies);return predicate.apply(null,properties.concat([attr,object]));}
var condition=this._condition;var conditionDependencies=this._conditionDependencies;function validationWithCondition(value,attr,object){var properties=getProperties(object,conditionDependencies);var conditionResult=condition.apply(null,properties.concat([attr,object]));return resolve(conditionResult).then(function(result){if(result){return validation(value,attr,object);}else{return true;}});}
this._validator.addValidation(this._attr,condition?validationWithCondition:validation,message);return this;},build:function(){return this._validator;}};ValidatorBuilder.registerHelper=function(name,fn){this.prototype[name]=function(){fn.apply(this,arguments);return this;};return null;};ValidatorBuilder.unregisterHelper=function(name){delete this.prototype[name];return null;};module.exports=ValidatorBuilder;},{"./object_validator":5,"./utils":6}],8:[function(require,module,exports){var process=module.exports={};process.nextTick=(function(){var canSetImmediate=typeof window!=='undefined'&&window.setImmediate;var canPost=typeof window!=='undefined'&&window.postMessage&&window.addEventListener;if(canSetImmediate){return function(f){return window.setImmediate(f)};}
if(canPost){var queue=[];window.addEventListener('message',function(ev){if(ev.source===window&&ev.data==='process-tick'){ev.stopPropagation();if(queue.length>0){var fn=queue.shift();fn();}}},true);return function nextTick(fn){queue.push(fn);window.postMessage('process-tick','*');};}
return function nextTick(fn){setTimeout(fn,0);};})();process.title='browser';process.browser=true;process.env={};process.argv=[];process.binding=function(name){throw new Error('process.binding is not supported');}
process.cwd=function(){return'/'};process.chdir=function(dir){throw new Error('process.chdir is not supported');};},{}],9:[function(require,module,exports){"use strict";var EventTarget=require("./rsvp/events").EventTarget;var Promise=require("./rsvp/promise").Promise;var denodeify=require("./rsvp/node").denodeify;var all=require("./rsvp/all").all;var hash=require("./rsvp/hash").hash;var defer=require("./rsvp/defer").defer;var config=require("./rsvp/config").config;var resolve=require("./rsvp/resolve").resolve;var reject=require("./rsvp/reject").reject;function configure(name,value){config[name]=value;}
exports.Promise=Promise;exports.EventTarget=EventTarget;exports.all=all;exports.hash=hash;exports.defer=defer;exports.denodeify=denodeify;exports.configure=configure;exports.resolve=resolve;exports.reject=reject;},{"./rsvp/all":10,"./rsvp/config":12,"./rsvp/defer":13,"./rsvp/events":14,"./rsvp/hash":15,"./rsvp/node":16,"./rsvp/promise":17,"./rsvp/reject":18,"./rsvp/resolve":19}],10:[function(require,module,exports){"use strict";var Promise=require("./promise").Promise;function all(promises){if(Object.prototype.toString.call(promises)!=="[object Array]"){throw new TypeError('You must pass an array to all.');}
return new Promise(function(resolve,reject){var results=[],remaining=promises.length,promise;if(remaining===0){resolve([]);}
function resolver(index){return function(value){resolveAll(index,value);};}
function resolveAll(index,value){results[index]=value;if(--remaining===0){resolve(results);}}
for(var i=0;i<promises.length;i++){promise=promises[i];if(promise&&typeof promise.then==='function'){promise.then(resolver(i),reject);}else{resolveAll(i,promise);}}});}
exports.all=all;},{"./promise":17}],11:[function(require,module,exports){var process=require("__browserify_process");"use strict";var browserGlobal=(typeof window!=='undefined')?window:{};var BrowserMutationObserver=browserGlobal.MutationObserver||browserGlobal.WebKitMutationObserver;var async;function useNextTick(){return function(callback,arg){process.nextTick(function(){callback(arg);});};}
function useSetImmediate(){return function(callback,arg){setImmediate(function(){callback(arg);});};}
function useMutationObserver(){var queue=[];var observer=new BrowserMutationObserver(function(){var toProcess=queue.slice();queue=[];toProcess.forEach(function(tuple){var callback=tuple[0],arg=tuple[1];callback(arg);});});var element=document.createElement('div');observer.observe(element,{attributes:true});window.addEventListener('unload',function(){observer.disconnect();observer=null;},false);return function(callback,arg){queue.push([callback,arg]);element.setAttribute('drainQueue','drainQueue');};}
function useSetTimeout(){return function(callback,arg){setTimeout(function(){callback(arg);},1);};}
if(typeof setImmediate==='function'){async=useSetImmediate();}else if(typeof process!=='undefined'&&{}.toString.call(process)==='[object process]'){async=useNextTick();}else if(BrowserMutationObserver){async=useMutationObserver();}else{async=useSetTimeout();}
exports.async=async;},{"__browserify_process":8}],12:[function(require,module,exports){"use strict";var async=require("./async").async;var config={};config.async=async;exports.config=config;},{"./async":11}],13:[function(require,module,exports){"use strict";var Promise=require("./promise").Promise;function defer(){var deferred={resolve:undefined,reject:undefined,promise:undefined};deferred.promise=new Promise(function(resolve,reject){deferred.resolve=resolve;deferred.reject=reject;});return deferred;}
exports.defer=defer;},{"./promise":17}],14:[function(require,module,exports){"use strict";var Event=function(type,options){this.type=type;for(var option in options){if(!options.hasOwnProperty(option)){continue;}
this[option]=options[option];}};var indexOf=function(callbacks,callback){for(var i=0,l=callbacks.length;i<l;i++){if(callbacks[i][0]===callback){return i;}}
return-1;};var callbacksFor=function(object){var callbacks=object._promiseCallbacks;if(!callbacks){callbacks=object._promiseCallbacks={};}
return callbacks;};var EventTarget={mixin:function(object){object.on=this.on;object.off=this.off;object.trigger=this.trigger;return object;},on:function(eventNames,callback,binding){var allCallbacks=callbacksFor(this),callbacks,eventName;eventNames=eventNames.split(/\s+/);binding=binding||this;while(eventName=eventNames.shift()){callbacks=allCallbacks[eventName];if(!callbacks){callbacks=allCallbacks[eventName]=[];}
if(indexOf(callbacks,callback)===-1){callbacks.push([callback,binding]);}}},off:function(eventNames,callback){var allCallbacks=callbacksFor(this),callbacks,eventName,index;eventNames=eventNames.split(/\s+/);while(eventName=eventNames.shift()){if(!callback){allCallbacks[eventName]=[];continue;}
callbacks=allCallbacks[eventName];index=indexOf(callbacks,callback);if(index!==-1){callbacks.splice(index,1);}}},trigger:function(eventName,options){var allCallbacks=callbacksFor(this),callbacks,callbackTuple,callback,binding,event;if(callbacks=allCallbacks[eventName]){for(var i=0;i<callbacks.length;i++){callbackTuple=callbacks[i];callback=callbackTuple[0];binding=callbackTuple[1];if(typeof options!=='object'){options={detail:options};}
event=new Event(eventName,options);callback.call(binding,event);}}}};exports.EventTarget=EventTarget;},{}],15:[function(require,module,exports){"use strict";var defer=require("./defer").defer;function size(object){var s=0;for(var prop in object){s++;}
return s;}
function hash(promises){var results={},deferred=defer(),remaining=size(promises);if(remaining===0){deferred.resolve({});}
var resolver=function(prop){return function(value){resolveAll(prop,value);};};var resolveAll=function(prop,value){results[prop]=value;if(--remaining===0){deferred.resolve(results);}};var rejectAll=function(error){deferred.reject(error);};for(var prop in promises){if(promises[prop]&&typeof promises[prop].then==='function'){promises[prop].then(resolver(prop),rejectAll);}else{resolveAll(prop,promises[prop]);}}
return deferred.promise;}
exports.hash=hash;},{"./defer":13}],16:[function(require,module,exports){"use strict";var Promise=require("./promise").Promise;var all=require("./all").all;function makeNodeCallbackFor(resolve,reject){return function(error,value){if(error){reject(error);}else if(arguments.length>2){resolve(Array.prototype.slice.call(arguments,1));}else{resolve(value);}};}
function denodeify(nodeFunc){return function(){var nodeArgs=Array.prototype.slice.call(arguments),resolve,reject;var thisArg=this;var promise=new Promise(function(nodeResolve,nodeReject){resolve=nodeResolve;reject=nodeReject;});all(nodeArgs).then(function(nodeArgs){nodeArgs.push(makeNodeCallbackFor(resolve,reject));try{nodeFunc.apply(thisArg,nodeArgs);}catch(e){reject(e);}});return promise;};}
exports.denodeify=denodeify;},{"./all":10,"./promise":17}],17:[function(require,module,exports){"use strict";var config=require("./config").config;var EventTarget=require("./events").EventTarget;function objectOrFunction(x){return isFunction(x)||(typeof x==="object"&&x!==null);}
function isFunction(x){return typeof x==="function";}
var Promise=function(resolver){var promise=this,resolved=false;if(typeof resolver!=='function'){throw new TypeError('You must pass a resolver function as the sole argument to the promise constructor');}
if(!(promise instanceof Promise)){return new Promise(resolver);}
var resolvePromise=function(value){if(resolved){return;}
resolved=true;resolve(promise,value);};var rejectPromise=function(value){if(resolved){return;}
resolved=true;reject(promise,value);};this.on('promise:resolved',function(event){this.trigger('success',{detail:event.detail});},this);this.on('promise:failed',function(event){this.trigger('error',{detail:event.detail});},this);this.on('error',onerror);try{resolver(resolvePromise,rejectPromise);}catch(e){rejectPromise(e);}};function onerror(event){if(config.onerror){config.onerror(event.detail);}}
var invokeCallback=function(type,promise,callback,event){var hasCallback=isFunction(callback),value,error,succeeded,failed;if(hasCallback){try{value=callback(event.detail);succeeded=true;}catch(e){failed=true;error=e;}}else{value=event.detail;succeeded=true;}
if(handleThenable(promise,value)){return;}else if(hasCallback&&succeeded){resolve(promise,value);}else if(failed){reject(promise,error);}else if(type==='resolve'){resolve(promise,value);}else if(type==='reject'){reject(promise,value);}};Promise.prototype={constructor:Promise,isRejected:undefined,isFulfilled:undefined,rejectedReason:undefined,fulfillmentValue:undefined,then:function(done,fail){this.off('error',onerror);var thenPromise=new this.constructor(function(){});if(this.isFulfilled){config.async(function(promise){invokeCallback('resolve',thenPromise,done,{detail:promise.fulfillmentValue});},this);}
if(this.isRejected){config.async(function(promise){invokeCallback('reject',thenPromise,fail,{detail:promise.rejectedReason});},this);}
this.on('promise:resolved',function(event){invokeCallback('resolve',thenPromise,done,event);});this.on('promise:failed',function(event){invokeCallback('reject',thenPromise,fail,event);});return thenPromise;}};EventTarget.mixin(Promise.prototype);function resolve(promise,value){if(promise===value){fulfill(promise,value);}else if(!handleThenable(promise,value)){fulfill(promise,value);}}
function handleThenable(promise,value){var then=null,resolved;try{if(promise===value){throw new TypeError("A promises callback cannot return that same promise.");}
if(objectOrFunction(value)){then=value.then;if(isFunction(then)){then.call(value,function(val){if(resolved){return true;}
resolved=true;if(value!==val){resolve(promise,val);}else{fulfill(promise,val);}},function(val){if(resolved){return true;}
resolved=true;reject(promise,val);});return true;}}}catch(error){reject(promise,error);return true;}
return false;}
function fulfill(promise,value){config.async(function(){promise.trigger('promise:resolved',{detail:value});promise.isFulfilled=true;promise.fulfillmentValue=value;});}
function reject(promise,value){config.async(function(){promise.trigger('promise:failed',{detail:value});promise.isRejected=true;promise.rejectedReason=value;});}
exports.Promise=Promise;},{"./config":12,"./events":14}],18:[function(require,module,exports){"use strict";var Promise=require("./promise").Promise;function reject(reason){return new Promise(function(resolve,reject){reject(reason);});}
exports.reject=reject;},{"./promise":17}],19:[function(require,module,exports){"use strict";var Promise=require("./promise").Promise;function resolve(thenable){return new Promise(function(resolve,reject){resolve(thenable);});}
exports.resolve=resolve;},{"./promise":17}]},{},[1])(1)});;