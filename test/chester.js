function g(a){throw a;}var i=void 0,j=!0,k=null,m=!1,n,t=this;Math.floor(2147483648*Math.random()).toString(36);function z(a,b){var c=a.split("."),e=t;!(c[0]in e)&&e.execScript&&e.execScript("var "+c[0]);for(var d;c.length&&(d=c.shift());)!c.length&&b!==i?e[d]=b:e=e[d]?e[d]:e[d]={}}function A(a,b){function c(){}c.prototype=b.prototype;a.Ya=b.prototype;a.prototype=new c};function aa(a,b){this.x=a!==i?a:0;this.y=b!==i?b:0}aa.prototype.toString=function(){return"("+this.x+", "+this.y+")"};function ba(a,b){this.x=a;this.y=b}A(ba,aa);ba.prototype.scale=function(a){this.x*=a;this.y*=a;return this};var ca;HTMLCanvasElement.Ea=new ba(0,0);function da(a){var b=C,c=HTMLCanvasElement.Ea;c.x=0;c.y=0;var e=$(b).offset(),b=$(b).height();c.x=a.pageX-e.left;c.y=b-(a.pageY-e.top);return c}window.La=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)};z("requestAnimationFrame",window.requestAnimationFrame);
function ea(a,b){console.log(WebGLDebugUtils.glEnumToString(a)+" was caused by call to "+b)}var F=k,fa=m,ga={},ha=k,ia=k,ja=k,C=k,I=j,ka=m,K={},la={},ma={},na={},oa=Date.now(),pa=0,qa=k,L=[];function ra(a){var b=ga[a],c=F;if(a!=ha){ha=a;c.validateProgram(b);c.useProgram(b);for(var e in b.a)c.enableVertexAttribArray(b.a[e])}return b}function sa(){var a=C;F.ja=a.width;F.T=a.height}
function ta(){var a=F;Ca("default",function(b){b.o=a.getUniformLocation(b,"uMVPMatrix");b.a={vertexPositionAttribute:a.getAttribLocation(b,"aVertexPosition"),vertexColorAttribute:a.getAttribLocation(b,"aVertexColor")};b.mvpMatrixUniform=b.o;b.attribs=b.a});Ca("texture",function(b){b.o=a.getUniformLocation(b,"uMVPMatrix");b.ga=a.getUniformLocation(b,"uSampler");b.a={vertexColorAttribute:a.getAttribLocation(b,"aVertexColor"),textureCoordAttribute:a.getAttribLocation(b,"aTextureCoord"),vertexPositionAttribute:a.getAttribLocation(b,
"aVertexPosition")};b.mvpMatrixUniform=b.o;b.samplerUniform=b.ga;b.attribs=b.a})}
function Ca(a,b){var c=F,e=Da(a,"frag"),d=Da(a,"vert"),f=c.createShader(c.FRAGMENT_SHADER);c.shaderSource(f,e);c.compileShader(f);c.getShaderParameter(f,c.COMPILE_STATUS)?(e=c.createShader(c.VERTEX_SHADER),c.shaderSource(e,d),c.compileShader(e),c.getShaderParameter(e,c.COMPILE_STATUS)?(c=F,d=c.createProgram(),c.attachShader(d,f),c.attachShader(d,e),c.linkProgram(d),c.getProgramParameter(d,c.LINK_STATUS)||console.log("problem linking shader"),ga[a]=d,b&&b(d)):console.log("problem compiling vertex shader "+
a+"("+c.getShaderInfoLog(e)+"):\n"+d)):console.log("problem compiling fragment shader "+a+"("+c.getShaderInfoLog(f)+"):\n"+e)}function Da(a,b){var c="";$.ajax({url:"shaders/"+a+"."+b,async:m,type:"GET",success:function(a,b){"success"==b?c=a:console.log("error getting the shader data")}});return c}
function M(a,b,c){var e=i;"object"==typeof b&&(e=b.dataType,b=b.path);K[a]||(K[a]={});var d=K[a];if(d[b])if("loading"==d[b].status)c&&d[b].J.push(c);else if("loaded"==d[b].status)c&&c(d[b].data);else{if("try"==d[b].status){d[b].status="loading";if(ma[a])ma[a](a,{url:b,dataType:e});else ma["default"](a,{url:b,dataType:e});c&&d[b].J.push(c)}}else d[b]={data:k,status:"try",J:[]},c&&d[b].J.push(c),M(a,{path:b,dataType:e})}
function Ea(a,b){var c=na[a];c||(na[a]=[],c=na[a]);b&&c.push(b);var e=j;if("all"==a)for(var d in K){var f=K[d],h;for(h in f)if("loaded"!=f[h].status){e=m;break}if(!e)break}else for(h in f=K[a],f)if("loaded"!=f[h].status){e=m;break}if(e)for(;e=c.shift();)e()}function Fa(a,b){return b?K[a][b].data:k}
function Ga(a,b){I&&(b.R=F.createTexture());K.texture[a].data=b;var c;if(I){c=F;var e=j;try{var d=0;c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL,1);c.activeTexture(c.TEXTURE0);c.bindTexture(c.TEXTURE_2D,b.R);c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,b);d=c.getError();0!=d&&(console.log("gl error "+d),e=m);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.LINEAR);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR);c.bindTexture(c.TEXTURE_2D,k)}catch(f){console.log("got some error: "+
f),e=m}c=e}else c=j;return c}function Ha(a,b){var c=new Image,e=b.url;c.addEventListener("load",function(){var b=K.texture[e];if(la[a](e,c)){b.status="loaded";for(var f;f=b.J.shift();)f(b.data);Ea(a);Ea("all")}else b.status="try",M(a,e)},m);c.src=e}
function Ia(a,b){var c=b.url;$.ajax({url:c,dataType:b.dataType,success:function(b,d){var f=K[a][c];if("success"==d){var h=la[a];h||g("No handler for asset of type "+a);if(h(c,b)){for(f.status="loaded";h=f.J.shift();)h(f.data);Ea(a);Ea("all")}else f.status="try",M(a,c)}else console.log("Error loading asset "+c)}})}function Ja(){var a=i;I?(a=F,a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT)):(a=ca,a.setTransform(1,0,0,1,0,0),a.fillRect(0,0,a.ja,a.T));ja&&ja.H();a=Date.now();pa=a-oa;oa=a}
var Ka=Date.now(),Ma=0,Na=0,Oa=0,Pa=new Float32Array(3);function Qa(a){var a=da(a),b=0,c=L.length;for(Pa.set([a.x,a.y,0]);b<c;b++)L[b](Pa,0)}function Ra(a){var a=da(a),b=0,c=L.length;for(Pa.set([a.x,a.y,0]);b<c;b++)L[b](Pa,1)}function Sa(a){var a=da(a),b=0,c=L.length;for(Pa.set([a.x,a.y,0]);b<c;b++)L[b](Pa,2)}function Ta(){if(!fa){window.La(Ta,C);Ja();N.Pa();var a=Date.now();Ma+=pa;Na++;if(1E3<a-Ka){var b=Ma/Na;Oa++;qa&&(qa.textContent=b.toFixed(2));Ma=Na=0;Ka=a}}}z("chesterGL.version","0.2");
z("chesterGL.useGoogleAnalytics",m);z("chesterGL.projection","3d");z("chesterGL.webglMode",I);z("chesterGL.usesOffscreenBuffer",m);z("chesterGL.debugSpanId","debug-info");z("chesterGL.update",k);z("chesterGL.mouseEvents",{Ua:0,Va:1,Wa:2});z("chesterGL.mouseEvents.DOWN",0);z("chesterGL.mouseEvents.MOVE",1);z("chesterGL.mouseEvents.UP",2);z("chesterGL.viewportSize",function(){return new O(F.ja,F.T)});
z("chesterGL.setup",function(a){a=document.getElementById(a);try{if(C=a,I&&(F=a.getContext("experimental-webgl",{alpha:m,antialias:m}))&&window.WebGLDebugUtils)console.log("installing debug context"),F=WebGLDebugUtils.makeDebugContext(F,ea)}catch(b){console.log("ERROR: "+b)}F||(ca=F=a.getContext("2d"),(!F||!ca)&&g("Error initializing graphic context!"),I=m);sa();$(C).mousedown(Qa);$(C).mousemove(Ra);$(C).mouseup(Sa);I&&ta();var a=window.location.search.substring(1).split("&"),c;for(c in a){var e=
a[c].split("=");"_cdbg"==e[0]&&"1"==e[1]&&(ka=j,console.log("debug mode on"))}qa=document.getElementById("debug-info");la.texture=Ga;ma.texture=Ha;ma["default"]=Ia});z("chesterGL.canvasResized",sa);z("chesterGL.initShader",Ca);z("chesterGL.registerAssetHandler",function(a,b){la[a]=b});z("chesterGL.loadAsset",M);z("chesterGL.assetsLoaded",Ea);z("chesterGL.getAsset",Fa);
z("chesterGL.setupPerspective",function(){var a=F;if(I){a.clearColor(0,0,0,1);a.blendFunc(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA);a.enable(a.BLEND);a.disable(a.DEPTH_TEST);var b=a.ja,c=a.T;a.viewport(0,0,b,c);ia=Ua();console.log("setting up 3d projection ("+b+","+c+")");var e=c/1.1566;var a=Ua(),d=b/c,f=60*Math.PI/180/2,h=Math.sin(f);0==h||0==d||(f=Math.cos(f)/h,Va(a,f/d,0,0,0,0,f,0,0,0,0,-1500.5/1499.5,-1,0,0,-1500/1499.5,0));e=[b/2,c/2,e];d=[b/2,c/2,0];b=Ua();c=Wa[0];c[0]=d[0]-e[0];c[1]=d[1]-e[1];c[2]=
d[2]-e[2];Xa(c,c);c[3]=0;d=Wa[1];Ya(c,[0,1,0],d);Xa(d,d);d[3]=0;f=Wa[2];Ya(d,c,f);Xa(f,f);f[3]=0;c[0]=-c[0];c[1]=-c[1];c[2]=-c[2];Za(b,0,d);Za(b,1,f);Za(b,2,c);b[3]=0;b[7]=0;b[11]=0;b[15]=1;$a(b,-e[0],-e[1],-e[2]);ab(a,b,ia)}});z("chesterGL.setRunningScene",function(a){a.type==P.SCENE&&(ja=a)});z("chesterGL.drawScene",Ja);z("chesterGL.run",Ta);z("chesterGL.togglePause",function(){fa?(fa=m,Ta()):fa=j});z("chesterGL.addMouseHandler",function(a){-1==L.indexOf(a)&&L.push(a)});
z("chesterGL.removeMouseHandler",function(a){a=L.indexOf(a);0<a&&L.splice(a,1)});function O(a,b){this.width=a;this.height=b}O.prototype.toString=function(){return"("+this.width+" x "+this.height+")"};O.prototype.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};O.prototype.scale=function(a){this.width*=a;this.height*=a;return this};function Q(a){this.length=a.length||a;for(var b=0;b<this.length;b++)this[b]=a[b]||0}Q.prototype.BYTES_PER_ELEMENT=8;Q.prototype.set=function(a,b){for(var b=b||0,c=0;c<a.length&&b+c<this.length;c++)this[b+c]=a[c]};Q.prototype.toString=Array.prototype.join;"undefined"==typeof Float64Array&&(Q.BYTES_PER_ELEMENT=8,Q.prototype.BYTES_PER_ELEMENT=Q.prototype.BYTES_PER_ELEMENT,Q.prototype.set=Q.prototype.set,Q.prototype.toString=Q.prototype.toString,z("Float64Array",Q));function R(a){this.length=a.length||a;for(var b=0;b<this.length;b++)this[b]=a[b]||0}R.prototype.BYTES_PER_ELEMENT=4;R.prototype.set=function(a,b){for(var b=b||0,c=0;c<a.length&&b+c<this.length;c++)this[b+c]=a[c]};R.prototype.toString=Array.prototype.join;"undefined"==typeof Float32Array&&(R.BYTES_PER_ELEMENT=4,R.prototype.BYTES_PER_ELEMENT=R.prototype.BYTES_PER_ELEMENT,R.prototype.set=R.prototype.set,R.prototype.toString=R.prototype.toString,z("Float32Array",R));function bb(a){var b=new Float32Array(3);b[0]=a[0];b[1]=a[1];b[2]=a[2];return b}function Xa(a,b){var c=a[0],e=a[1],d=a[2],c=1/Math.sqrt(c*c+e*e+d*d);b[0]=a[0]*c;b[1]=a[1]*c;b[2]=a[2]*c}function Ya(a,b,c){var e=a[0],d=a[1],a=a[2],f=b[0],h=b[1],b=b[2];c[0]=d*b-a*h;c[1]=a*f-e*b;c[2]=e*h-d*f};function cb(a){var b=new Float32Array(4);b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];return b}function db(a,b,c,e){var d=new Float32Array(4);d[0]=a;d[1]=b;d[2]=c;d[3]=e;return d};function Ua(){return new Float32Array(16)}function Va(a,b,c,e,d,f,h,r,q,o,l,u,y,v,B,s,w){a[0]=b;a[1]=c;a[2]=e;a[3]=d;a[4]=f;a[5]=h;a[6]=r;a[7]=q;a[8]=o;a[9]=l;a[10]=u;a[11]=y;a[12]=v;a[13]=B;a[14]=s;a[15]=w}function Za(a,b,c){a[b]=c[0];a[b+4]=c[1];a[b+8]=c[2];a[b+12]=c[3]}function eb(a){a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a}
function ab(a,b,c){var e=a[0],d=a[1],f=a[2],h=a[3],r=a[4],q=a[5],o=a[6],l=a[7],u=a[8],y=a[9],v=a[10],B=a[11],s=a[12],w=a[13],x=a[14],a=a[15],E=b[0],D=b[1],J=b[2],G=b[3],H=b[4],T=b[5],p=b[6],ua=b[7],va=b[8],wa=b[9],xa=b[10],ya=b[11],za=b[12],Aa=b[13],Ba=b[14],b=b[15];c[0]=e*E+r*D+u*J+s*G;c[1]=d*E+q*D+y*J+w*G;c[2]=f*E+o*D+v*J+x*G;c[3]=h*E+l*D+B*J+a*G;c[4]=e*H+r*T+u*p+s*ua;c[5]=d*H+q*T+y*p+w*ua;c[6]=f*H+o*T+v*p+x*ua;c[7]=h*H+l*T+B*p+a*ua;c[8]=e*va+r*wa+u*xa+s*ya;c[9]=d*va+q*wa+y*xa+w*ya;c[10]=f*va+o*
wa+v*xa+x*ya;c[11]=h*va+l*wa+B*xa+a*ya;c[12]=e*za+r*Aa+u*Ba+s*b;c[13]=d*za+q*Aa+y*Ba+w*b;c[14]=f*za+o*Aa+v*Ba+x*b;c[15]=h*za+l*Aa+B*Ba+a*b}function fb(a,b,c){var e=b[0],d=b[1],b=b[2];c[0]=e*a[0]+d*a[4]+b*a[8]+a[12];c[1]=e*a[1]+d*a[5]+b*a[9]+a[13];c[2]=e*a[2]+d*a[6]+b*a[10]+a[14]}function $a(a,b,c,e){var d=a[1]*b+a[5]*c+a[9]*e+a[13],f=a[2]*b+a[6]*c+a[10]*e+a[14],h=a[3]*b+a[7]*c+a[11]*e+a[15];a[12]=a[0]*b+a[4]*c+a[8]*e+a[12];a[13]=d;a[14]=f;a[15]=h}new Float64Array(3);new Float64Array(3);
var Wa=[new Float64Array(4),new Float64Array(4),new Float64Array(4)];new Float64Array(16);function S(a,b,c){this.type=b||P.STANDALONE;c&&(this.parent=c);this.children=[];this.e=U.DEFAULT;a&&this.K(a);this.type==P.STANDALONE&&this.wa([1,1,1,1]);if(I&&this.type==P.STANDALONE&&(!c||c.type!=P.BLOCKGROUP))this.i=F.createBuffer(),this.g=new Float32Array(36);this.b=Ua();this.l=Ua();this.b=eb(Ua());this.U=[];this.V=[]}
var U={DEFAULT:0,TEXTURE:1},gb=["default","texture"],P={STANDALONE:0,BLOCKGROUP:1,SCENE:2,TMXBLOCK:3,PARTICLE:4,PRIMITIVE:5},hb=Math.PI/180,ib=180/Math.PI,jb=1*hb,kb=db(0,0,1,1),lb=new O(0,0);n=S.prototype;n.title="";n.b=k;n.l=k;n.Da=j;n.f=m;n.C=m;n.t=m;n.W=0;n.i=k;n.g=k;n.position=new Float32Array(3);n.r=k;n.color=db(1,1,1,1);n.d=k;n.opacity=1;n.rotation=0;n.scale=1;n.update=k;n.frame=k;n.parent=k;n.children=k;n.U=k;n.V=k;n.I=m;
function mb(a){if(a.e==U.TEXTURE){var b=new V(1,1);a.q(b);b.xa(function(){var a=this.parent.r,b=a.width/2,a=a.height/2;this.ma([[-b,-a,0],[-b,a,0],[b,a,0],[b,-a,0]],[1,1,1,1],j)})}}n.K=function(a){if("string"===typeof a){var b=W.ra(a),a=b.frame;this.Q(b.d)}this.frame=cb(a);this.ia(a[2],a[3]);this.t=j};n.ia=function(a,b){this.r=new O(a,b);this.t=j};n.Oa=function(a){this.scale=a;this.f=j};n.wa=function(a){this.color=cb(a);this.C=j};n.P=function(a){this.position=bb(a);this.f=j};
n.Q=function(a){this.d=a;this.e=U.TEXTURE;ka&&mb(this);var b=this;M("texture",a,function(a){b.r||b.ia(a.width,a.height);b.frame||b.K([0,0,a.width,a.height])})};n.Na=function(a){this.rotation=a;this.f=j};n.xa=function(a){this.update=a};n.q=function(a){a.parent&&g("can't add a block twice!");this.I?this.U.push(a):(this.children.push(a),a.parent=this)};
n.removeChild=function(a){(!a.parent||a.parent!=this)&&g("not our child!");this.I?this.V.push(a):(a=this.children.indexOf(a),0<=a&&this.children.splice(a,1))};
n.transform=function(){var a=F;if(this.f||this.parent&&this.parent.f){this.b=eb(this.b);$a(this.b,this.position[0],this.position[1],this.position[2]);var b=this.b,c=this.rotation*(I?-1:1),e=b[0],d=b[1],f=b[2],h=b[3],r=b[4],q=b[5],o=b[6],l=b[7],u=b[8],y=b[9],v=b[10],B=b[11],s=Math.cos(c),w=Math.sin(c),x=1-s,c=0*x+s,E=0*x+1*w,D=0*x-0*w,J=0*x-1*w,G=0*x+s,H=0*x+0*w,T=0*x+0*w,w=0*x-0*w,s=1*x+s;Va(b,e*c+r*E+u*D,d*c+q*E+y*D,f*c+o*E+v*D,h*c+l*E+B*D,e*J+r*G+u*H,d*J+q*G+y*H,f*J+o*G+v*H,h*J+l*G+B*H,e*T+r*w+
u*s,d*T+q*w+y*s,f*T+o*w+v*s,h*T+l*w+B*s,b[12],b[13],b[14],b[15]);b=this.b;d=e=this.scale;Va(b,b[0]*e,b[1]*e,b[2]*e,b[3]*e,b[4]*d,b[5]*d,b[6]*d,b[7]*d,1*b[8],1*b[9],1*b[10],1*b[11],b[12],b[13],b[14],b[15]);(b=this.parent?this.parent.b:k)&&ab(b,this.b,this.b)}if(!(this.type==P.BLOCKGROUP||this.type==P.PRIMITIVE))if(b=this.g,e=this.parent&&this.parent.type==P.BLOCKGROUP,I){!e&&(this.t||this.C)&&a.bindBuffer(a.ARRAY_BUFFER,this.i);if(this.t||e&&this.f){var p=9,o=0.5*this.r.width,l=0.5*this.r.height,d=
36*this.W,f=this.position[2];e?(h=[o,l,0],r=[-o,l,0],q=[o,-l,0],o=[-o,-l,0],fb(this.b,h,h),fb(this.b,r,r),fb(this.b,o,o),fb(this.b,q,q),b[d]=o[0],b[d+1]=o[1],b[d+2]=f,b[d+p]=r[0],b[d+1+p]=r[1],b[d+2+p]=f,b[d+2*p]=q[0],b[d+1+2*p]=q[1],b[d+2+2*p]=f,b[d+3*p]=h[0],b[d+1+3*p]=h[1],b[d+2+3*p]=f):(b[d]=-o,b[d+1]=-l,b[d+2]=0,b[d+p]=-o,b[d+1+p]=l,b[d+2+p]=0,b[d+2*p]=o,b[d+1+2*p]=-l,b[d+2+2*p]=0,b[d+3*p]=o,b[d+1+3*p]=l,b[d+2+3*p]=0);this.e==U.TEXTURE&&(f=Fa("texture",this.d),r=f.width,q=f.height,f=this.frame[0]/
r,h=this.frame[1]/q,r=this.frame[2]/r,q=this.frame[3]/q,d+=3,b[d]=f,b[d+1]=h,b[d+p]=f,b[d+1+p]=h+q,b[d+2*p]=f+r,b[d+1+2*p]=h,b[d+3*p]=f+r,b[d+1+3*p]=h+q)}if(this.C){d=5+36*this.W;f=this.color;h=this.opacity;for(r=0;4>r;r++)b[d+p*r]=f[0]*h,b[d+1+p*r]=f[1]*h,b[d+2+p*r]=f[2]*h,b[d+3+p*r]=f[3]*h}I&&!e&&(this.t||this.C)&&a.bufferData(a.ARRAY_BUFFER,this.g,a.STATIC_DRAW)}};
n.H=function(){this.I=j;this.update&&this.update(pa);if(this.Da){this.transform();for(var a=this.children,b=a.length,c=0;c<b;c++)a[c].H();(!this.parent||this.parent.type!=P.BLOCKGROUP)&&this.F();for(this.I=this.t=this.C=this.f=m;a=this.U.shift();)this.q(a);for(;a=this.V.shift();)this.removeChild(a)}else this.I=m};
n.F=function(){this.type==P.BLOCKGROUP&&g("Cannot call render on a BlockGroup block!");if(this.type!=P.SCENE)if(I){var a=F,b=ra(gb[this.e]);a.bindBuffer(a.ARRAY_BUFFER,this.i);a.vertexAttribPointer(b.a.vertexPositionAttribute,3,a.FLOAT,m,36,0);a.vertexAttribPointer(b.a.vertexColorAttribute,4,a.FLOAT,m,36,20);if(this.e!=U.DEFAULT&&this.e==U.TEXTURE){var c=Fa("texture",this.d);a.vertexAttribPointer(b.a.textureCoordAttribute,2,a.FLOAT,m,36,12);a.activeTexture(a.TEXTURE0);a.bindTexture(a.TEXTURE_2D,c.R);
a.uniform1i(b.ga,0);a.Xa=j}(this.f||this.parent&&this.parent.f)&&ab(ia,this.b,this.l);a.uniformMatrix4fv(b.o,m,this.l);a.drawArrays(a.TRIANGLE_STRIP,0,4)}else if(a=ca,1==this.e){b=this.b;c=Fa("texture",this.d);a.globalAlpha=this.opacity;a.setTransform(b[0],b[1],b[4],b[5],b[12],a.T-b[13]);var b=this.r.width,e=this.r.height,d=this.frame;a.drawImage(c,d[0],c.height-(d[1]+e),d[2],d[3],-b/2,-e/2,b,e)}};z("chesterGL.Block",S);z("chesterGL.Block.FullFrame",kb);z("chesterGL.Block.SizeZero",lb);
z("chesterGL.Block.TYPE",P);z("chesterGL.Block.PROGRAM",U);z("chesterGL.Block.PROGRAM_NAME",gb);z("chesterGL.Block.DEG_TO_RAD",hb);z("chesterGL.Block.RAD_TO_DEG",ib);z("chesterGL.Block.ONE_DEG",jb);S.prototype.title=S.prototype.title;S.prototype.addChild=S.prototype.q;S.prototype.removeChild=S.prototype.removeChild;S.prototype.setPosition=S.prototype.P;S.prototype.setRotation=S.prototype.Na;S.prototype.setColor=S.prototype.wa;S.prototype.setFrame=S.prototype.K;S.prototype.setContentSize=S.prototype.ia;
S.prototype.setTexture=S.prototype.Q;S.prototype.setScale=S.prototype.Oa;S.prototype.setUpdate=S.prototype.xa;function X(a,b){this.S=1E3*a;this.v=b;this.s=0}n=X.prototype;n.v=k;n.S=0;n.s=0;n.B=m;n.G=m;n.update=function(a){this.G||(this.ka(),this.G=j);this.s+=a;0<this.S&&this.s>=this.S&&(this.B=j)};n.ka=function(){};function nb(a,b,c){X.call(this,b,c);this.Y=bb(a)}A(nb,X);nb.prototype.Y=k;nb.prototype.Aa=k;var ob=new Float32Array(3);
nb.prototype.update=function(a){X.prototype.update.call(this,a);a=this.v;if(this.B)a.P(this.Y);else{var b=this.Aa,c=this.Y,e=Math.min(1,this.s/this.S),d=b[0],f=b[1],b=b[2];ob[0]=(c[0]-d)*e+d;ob[1]=(c[1]-f)*e+f;ob[2]=(c[2]-b)*e+b;a.P(ob)}};nb.prototype.ka=function(){this.v||g("invalid move action! - now block");this.Aa=this.v.position};function pb(a,b,c,e){this.delay=1E3*a;a=this.delay*b.length;c===j&&(a=-1);X.call(this,a,e);this.ya=c===j;this.frames=b.slice(0)}A(pb,X);n=pb.prototype;n.z=0;
n.delay=0;n.frames=k;n.ya=m;n.update=function(a){X.prototype.update.call(this,a);a=this.v;this.B?(this.z=this.frames.length-1,this.B=j,a.K(this.frames[this.z])):this.s>=this.delay*this.z&&(a.K(this.frames[this.z++]),this.z==this.frames.length&&(this.ya?this.s=this.z=0:this.B=j))};var N={ha:[]};N.va=function(a){N.ha.push(a)};N.Pa=function(){for(var a=pa,b=0,c=N.ha.length,b=0;b<c;b++){var e=N.ha[b];!e.B&&e.update(a)}};S.prototype.Ma=function(a){a.v=this;N.va(a)};z("chesterGL.ActionManager",N);
z("chesterGL.MoveToAction",nb);z("chesterGL.AnimateAction",pb);N.scheduleAction=N.va;S.prototype.runAction=S.prototype.Ma;var W={frames:{}};W.Ja=function(a){if(a.meta&&"1.0"==a.meta.version){var b=a.meta.image;M("texture",b,function(c){var c=c.height,e=a.frames,d;for(d in e){var f=e[d],h={frame:{},d:""};h.frame=db(f.frame.x,c-(f.frame.y+f.frame.h),f.frame.w,f.frame.h);h.d=b;W.frames[d]=h}})}else g("Unkown json data")};W.Ha=function(a,b){K.frameset[a].data=b;return j};W.ra=function(a){return W.frames[a]};W.Ia=function(a){console.log("loadFrames: will fetch "+a);M("frameset",{path:a,dataType:"json"},function(a){W.Ja(a)})};
la.frameset=W.Ha;z("chesterGL.BlockFrames",W);W.getFrame=W.ra;W.loadFrames=W.Ia;function V(a,b){I||g("PrimitiveBlock only works on WebGL mode");this.ea=a||500;this.da=b||500;S.call(this,k,P.PRIMITIVE);var c=F;this.$=c.createBuffer();this.j=new Float32Array(7*this.ea);this.Z=c.createBuffer();this.c=new Float32Array(14*this.da);this.e=U.DEFAULT}A(V,S);n=V.prototype;n.$=k;n.j=k;n.Z=k;n.c=k;n.da=0;n.m=0;n.ea=0;n.n=0;n.D=[];
n.Ga=function(a,b,c){if(this.n<this.ea){var e=7*this.n,c=c||[1,1,1,1];this.j[e+0]=a;this.j[e+1]=b;this.j[e+2]=0;this.j[e+3]=c[0];this.j[e+4]=c[1];this.j[e+5]=c[2];this.j[e+6]=c[3];this.n++}else g("too many points!")};
n.Fa=function(a,b,c,e,d){if(this.m<this.da){var f=14*this.m,d=d||[1,1,1,1];this.c[f+0]=a;this.c[f+1]=b;this.c[f+2]=0;this.c[f+3]=d[0];this.c[f+4]=d[1];this.c[f+5]=d[2];this.c[f+6]=d[3];this.c[f+7]=c;this.c[f+8]=e;this.c[f+9]=0;this.c[f+10]=d[0];this.c[f+11]=d[1];this.c[f+12]=d[2];this.c[f+13]=d[3];this.m++}else g("too many lines!")};
n.ma=function(a,b,c,e){for(var b=b||[1,1,1,1],c=c||m,e=e||m,d=a.length,f=F,h=new Float32Array(7*a.length),r=f.createBuffer(),q=0;q<d;q++){var o=a[q];h[7*q+0]=o[0];h[7*q+1]=o[1];h[7*q+2]=o[2];h[7*q+3]=b[0];h[7*q+4]=b[1];h[7*q+5]=b[2];h[7*q+6]=b[3]}f.bindBuffer(f.ARRAY_BUFFER,r);f.bufferData(f.ARRAY_BUFFER,h,f.STATIC_DRAW);this.D.unshift([h,r,c,e])};n.H=function(){this.m=this.n=0;0<this.D.length&&(this.D=[]);S.prototype.H.call(this)};
n.F=function(){var a=F,b=ra(gb[this.e]);if(0<this.n||0<this.m||0<this.D.length)ab(ia,this.b,this.l),a.uniformMatrix4fv(b.o,m,this.l);if(0<this.n){var c=F,e=7*this.n;c.bindBuffer(c.ARRAY_BUFFER,this.$);c.bufferData(c.ARRAY_BUFFER,this.j.subarray(0,e),c.STATIC_DRAW);a.bindBuffer(a.ARRAY_BUFFER,this.$);a.vertexAttribPointer(b.a.vertexPositionAttribute,3,a.FLOAT,m,28,0);a.vertexAttribPointer(b.a.vertexColorAttribute,4,a.FLOAT,m,28,12);a.drawArrays(a.POINTS,0,this.n)}0<this.m&&(c=F,e=14*this.m,c.bindBuffer(c.ARRAY_BUFFER,
this.Z),c.bufferData(c.ARRAY_BUFFER,this.c.subarray(0,e),c.STATIC_DRAW),a.bindBuffer(a.ARRAY_BUFFER,this.Z),a.vertexAttribPointer(b.a.vertexPositionAttribute,3,a.FLOAT,m,28,0),a.vertexAttribPointer(b.a.vertexColorAttribute,4,a.FLOAT,m,28,12),a.drawArrays(a.LINES,0,2*this.m));c=this.D.length;if(0<c)for(e=0;e<c;e++){var d=this.D[e];a.bindBuffer(a.ARRAY_BUFFER,d[1]);a.vertexAttribPointer(b.a.vertexPositionAttribute,3,a.FLOAT,m,28,0);a.vertexAttribPointer(b.a.vertexColorAttribute,4,a.FLOAT,m,28,12);d[2]?
a.drawArrays(a.LINE_LOOP,0,d[0].length/7):a.drawArrays(a.LINE_STRIP,0,d[0].length/7)}};z("chesterGL.PrimitiveBlock",V);V.prototype.drawPoint=V.prototype.Ga;V.prototype.drawLine=V.prototype.Fa;V.prototype.drawPolygon=V.prototype.ma;var qb,rb,sb,tb;function ub(){return t.navigator?t.navigator.userAgent:k}tb=sb=rb=qb=m;var vb;if(vb=ub()){var wb=t.navigator;qb=0==vb.indexOf("Opera");rb=!qb&&-1!=vb.indexOf("MSIE");sb=!qb&&-1!=vb.indexOf("WebKit");tb=!qb&&!sb&&"Gecko"==wb.product}var xb=qb,yb=rb,zb=tb,Ab=sb;var Bb;if(xb&&t.opera){var Cb=t.opera.version;"function"==typeof Cb&&Cb()}else zb?Bb=/rv\:([^\);]+)(\)|;)/:yb?Bb=/MSIE\s+([^\);]+)(\)|;)/:Ab&&(Bb=/WebKit\/(\S+)/),Bb&&Bb.exec(ub());var Db=k,Eb=k,Fb=zb||Ab||xb||"function"==typeof t.atob;function Gb(a){(a=Hb[a])||g("Invalid map - make sure you call loadTMX first");S.call(this,k,P.TMXBLOCK);for(var b=0;b<a.layers.length;b++){for(var c=a.layers[b],e=I?new Y(a.texture,c.blocks.length):new S,d=0;d<c.blocks.length;d++){var f=c.blocks[d],h=i;I?h=e.la(f.frame):(h=new S(f.frame),h.Q(a.texture));h.P(f.position);e.q(h)}this.q(e)}}A(Gb,S);Gb.prototype.F=function(){};var Hb={};la.tmx=function(a,b){console.log("tmx loaded: "+a);K.tmx[a].data=b;return j};z("chesterGL.TMXBlock",Gb);
Gb.loadTMX=function(a){M("tmx",{path:a,dataType:"xml"},function(b){var c={},b=$(b).find("map"),e=b.find("tileset").first(),d=b.attr("orientation");if(e){c.tileSize=new O(parseInt(e.attr("tilewidth"),10),parseInt(e.attr("tileheight"),10));c.mapTileSize=new O(parseInt(b.attr("tilewidth"),10),parseInt(b.attr("tileheight"),10));e.attr("spacing")&&(c.spacing=parseInt(e.attr("spacing"),10));e.attr("margin")&&(c.margin=parseInt(e.attr("margin"),10));var e=e.find("image").first(),f=new O(parseInt(e.attr("width"),
10),parseInt(e.attr("height"),10));c.texture=e.attr("source");M("texture",c.texture);c.layers=[];b.find("layer").each(function(a,b){var e={blocks:[]},o=new O(parseInt($(b).attr("width"),10),parseInt($(b).attr("height"),10)),l=$(b).find("data").first();if(l){("base64"!=l.attr("encoding")||l.attr("compression"))&&g("Invalid TMX Data");l=l.text().trim();if(Fb)l=t.atob(l);else{if(!Db){Db={};Eb={};for(var u=0;65>u;u++)Db[u]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(u),
Eb[Db[u]]=u}for(var u=Eb,y=[],v=0;v<l.length;){var B=u[l.charAt(v++)],s=v<l.length?u[l.charAt(v)]:0;++v;var w=v<l.length?u[l.charAt(v)]:0;++v;var x=v<l.length?u[l.charAt(v)]:0;++v;(B==k||s==k||w==k||x==k)&&g(Error());y.push(B<<2|s>>4);64!=w&&(y.push(s<<4&240|w>>2),64!=x&&y.push(w<<6&192|x))}l=String.fromCharCode.apply(k,y)}for(y=u=0;y<o.height;y++)for(v=0;v<o.width;v++){var x=((l.charCodeAt(u+3)&255)<<24|(l.charCodeAt(u+2)&255)<<16|(l.charCodeAt(u+1)&255)<<8|l.charCodeAt(u+0)&255)-1,B={},E=c.margin||
0,D=c.spacing||0,s=c.tileSize,w=c.mapTileSize,J=parseInt((f.width-2*E+D)/(s.width+D),10),x=db(x%J*(s.width+D)+E,f.height-s.height-E-D-parseInt(x/J,10)*(s.height+D)+E,s.width,s.height);B.frame=x;var G,H;"orthogonal"==d?(G=v*w.width+s.width/2,H=(o.height-y-1)*w.height+s.height/2):"isometric"==d?(G=w.width/2*(o.width+v-y-1)+s.width/2,H=w.height/2*(2*o.height-v-y-2)+s.height/2):g("Invalid orientation");B.position=[G,H,0];e.blocks.push(B);u+=4}}else g("No data for layer!");c.layers.push(e)})}Hb[a]=c})};function Z(a){S.call(this,k,4);var b=this;M("texture",a.texture,function(){b.ta(a)})}A(Z,S);var Ib=m;
function Jb(){Ca("particles",function(a){var b=F;a.o=b.getUniformLocation(a,"uMVPMatrix");a.Qa=b.getUniformLocation(a,"uSampler");a.Ta=b.getUniformLocation(a,"u_time");a.Sa=b.getUniformLocation(a,"u_startColor");a.Ra=b.getUniformLocation(a,"u_endColor");a.a={a_startPosition:b.getAttribLocation(a,"a_startPosition"),a_lifetime:b.getAttribLocation(a,"a_lifetime"),a_startTime:b.getAttribLocation(a,"a_startTime"),a_startSize:b.getAttribLocation(a,"a_startSize"),a_endSize:b.getAttribLocation(a,"a_endSize"),
a_speed:b.getAttribLocation(a,"a_speed")};a=b.getError();0!=a&&console.log("gl error: "+a)});Ib=j}n=Z.prototype;n.G=j;n.ua=k;n.na=0;n.A=0;n.p=0;n.u=0;n.duration=0;n.ca=0;n.sa=0;n.za=k;n.O=k;n.oa=k;n.M=k;n.N=k;n.Ba=0;n.Ca=0;n.pa=0;n.qa=0;n.fa=m;n.elapsedTime=0;n.X=["SRC_ALPHA","ONE_MINUS_SRC_ALPHA"];
n.ta=function(a){this.e=-1;Ib||Jb();this.ua=a.texture;this.u=a.maxParticles;this.duration=1E3*parseFloat(a.duration);this.ca=1E3*parseFloat(a.lifetime);this.sa=1E3*parseFloat(a.lifetimeVariance);this.za=cb(a.startColor);this.O=bb(a.positionVariance);this.oa=cb(a.endColor);this.M=bb(a.speed);this.N=bb(a.speedVariance);this.Ba=parseFloat(a.startSize);this.Ca=parseFloat(a.startSizeVariance);this.pa=parseFloat(a.endSize);this.qa=parseFloat(a.endSizeVariance);this.elapsedTime=0;this.X=a.blendOptions.slice(0);
this.G=j;this.i=F.createBuffer();this.g=new Float32Array(10*this.u);for(var a=ra("particles"),b=F,c=0;c<this.u;c++)Kb(this,c);b.uniform4fv(a.Sa,this.za);b.uniform4fv(a.Ra,this.oa);b.uniform1i(a.Qa,0);Lb(this);this.p=this.A=0;this.na=this.u/Math.abs(this.ca)};
function Kb(a,b,c,e){var d=a.g;d[10*b+0]=c||-1;d[10*b+1]=e||0;d[10*b+2]=a.Ba+a.Ca*(2*Math.random()-1);d[10*b+3]=a.pa+a.qa*(2*Math.random()-1);d[10*b+4]=a.M[0]+a.N[0]*(2*Math.random()-1);d[10*b+5]=a.M[1]+a.N[1]*(2*Math.random()-1);d[10*b+6]=a.M[2]+a.N[2]*(2*Math.random()-1);d[10*b+7]=(2*Math.random()-1)*a.O[0];d[10*b+8]=(2*Math.random()-1)*a.O[1];d[10*b+9]=(2*Math.random()-1)*a.O[2]}function Lb(a){var b=F;b.bindBuffer(b.ARRAY_BUFFER,a.i);b.bufferData(b.ARRAY_BUFFER,a.g,b.STATIC_DRAW)}var Mb=new Float32Array(10);
Z.prototype.update=function(a){if(ra("particles")){this.elapsedTime+=a;var b=1/this.na;for(this.A+=a;this.p<this.u&&this.A>b&&this.G;)Kb(this,this.p,Math.abs(this.ca+this.sa*(2*Math.random()-1)),this.elapsedTime),this.p++,this.fa=j,this.A-=b;for(a=0;a<this.u;a++){var b=this.g,c=10*a;if(0<b[c]&&b[c]+b[c+1]<=this.elapsedTime&&a!=this.p-1){var e=b.subarray(c,c+10);Mb.set(e);Mb[0]=-1;e=b.subarray(c+10,10*this.p);b.set(e,c);b.set(Mb,10*(this.p-1));this.p--}}0<this.duration&&this.elapsedTime>this.duration&&
(this.G=m)}};
Z.prototype.F=function(){var a=ra("particles");if(a){var b=F,c=Fa("texture",this.ua);b.enable(b.BLEND);b.blendFunc(b[this.X[0]],b[this.X[1]]);this.fa&&(Lb(this),this.fa=m);b.uniform1f(a.Ta,this.elapsedTime);b.activeTexture(b.TEXTURE0);b.bindTexture(b.TEXTURE_2D,c.R);b.bindBuffer(b.ARRAY_BUFFER,this.i);b.vertexAttribPointer(a.a.a_lifetime,3,b.FLOAT,m,40,0);b.vertexAttribPointer(a.a.a_startTime,3,b.FLOAT,m,40,4);b.vertexAttribPointer(a.a.a_startSize,3,b.FLOAT,m,40,8);b.vertexAttribPointer(a.a.a_endSize,3,
b.FLOAT,m,40,12);b.vertexAttribPointer(a.a.a_speed,3,b.FLOAT,m,40,16);b.vertexAttribPointer(a.a.a_startPosition,3,b.FLOAT,m,40,28);(this.f||this.parent&&this.parent.f)&&ab(ia,this.b,this.l);b.uniformMatrix4fv(a.o,m,this.l);b.drawArrays(b.POINTS,0,this.u)}};z("chesterGL.ParticleSystem",Z);Z.loadShaders=Jb;Z.prototype.loadProperties=Z.prototype.ta;function Y(a,b){I||g("BlockGroup only works on WebGL mode");S.call(this,k,P.BLOCKGROUP);a?(this.d=a,this.e=U.TEXTURE):this.e=U.DEFAULT;this.L=b||10;var c=F;this.i=c.createBuffer();this.g=new Float32Array(36*this.L);this.aa=c.createBuffer();this.k=new Uint16Array(6*this.L)}A(Y,S);n=Y.prototype;n.L=0;n.ba=m;n.aa=k;n.k=k;n.la=function(a){a=new S(a,P.STANDALONE,this);this.d&&a.Q(this.d);return a};
n.q=function(a){this.children.length>=this.L&&g("Error: too many children - Make the initial size of the BlockGroup larger");a.parent!=this&&g("Invalid child: can only add children created with BlockGroup.create");this.d?this.d!=a.d&&g("Invalid child: only can add child with the same texture"):this.d=a.d;this.children.push(a);a.W=this.children.length-1;a.g=this.g;this.ba=j};n.Ka=function(){g("not implemented")};
n.H=function(){this.update&&this.update(pa);if(this.Da){this.transform();for(var a=this.children,b=a.length,c=0;c<b;c++)a[c].H();a=F;a.bindBuffer(a.ARRAY_BUFFER,this.i);a.bufferData(a.ARRAY_BUFFER,this.g,a.STATIC_DRAW);if(this.ba){a=(this.k[-1]||-1)+1;b=Math.max(this.children.length,1);for(c=0;c<b;c++){var e=6*c;this.k[e+0]=a;this.k[e+1]=a+1;this.k[e+2]=a+2;this.k[e+3]=a+2;this.k[e+4]=a+1;this.k[e+5]=a+3;a+=4}a=F;a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.aa);a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.k,
a.STATIC_DRAW);this.ba=m}this.F();this.t=this.C=this.f=m}};
n.F=function(){var a=F,b=ra(gb[this.e]),c=this.children.length;a.bindBuffer(a.ARRAY_BUFFER,this.i);a.vertexAttribPointer(b.a.vertexPositionAttribute,3,a.FLOAT,m,36,0);if(this.e!=U.DEFAULT&&this.e==U.TEXTURE){var e=Fa("texture",this.d);a.vertexAttribPointer(b.a.textureCoordAttribute,2,a.FLOAT,m,36,12);a.activeTexture(a.TEXTURE0);a.bindTexture(a.TEXTURE_2D,e.R);a.uniform1i(b.ga,0)}a.vertexAttribPointer(b.a.vertexColorAttribute,4,a.FLOAT,m,36,20);a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.aa);ab(ia,this.b,
this.l);a.uniformMatrix4fv(b.o,m,this.l);a.drawElements(a.TRIANGLES,6*c,a.UNSIGNED_SHORT,0)};z("chesterGL.BlockGroup",Y);Y.prototype.createBlock=Y.prototype.la;Y.prototype.addChild=Y.prototype.q;Y.prototype.removeBlock=Y.prototype.Ka;
