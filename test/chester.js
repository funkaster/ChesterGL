var vec2 = {create:function(g) {
  var a = new Float32Array(2);
  g && (a[0] = g[0], a[1] = g[1]);
  return a
}};
HTMLCanvasElement._canvas_tmp_mouse = vec3.create();
HTMLCanvasElement.prototype.relativePosition = function(g) {
  var a = HTMLCanvasElement._canvas_tmp_mouse;
  a[0] = 0;
  a[1] = 0;
  g.x != void 0 && g.y != void 0 ? (a[0] = g.x, a[1] = g.y) : (a[0] = g.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, a[1] = g.clientY + document.body.scrollTop + document.documentElement.scrollTop);
  a[0] -= this.offsetLeft;
  a[1] = this.height - (a[1] - this.offsetTop);
  return a
};
window.requestAnimFrame = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(g) {
    window.setTimeout(g, 1E3 / 60)
  }
}();
function throwOnGLError(g, a) {
  console.log(WebGLDebugUtils.glEnumToString(g) + " was caused by call to " + a)
}
window.requestAnimFrame = window.requestAnimFrame;
(function(g) {
  var a = {exportProperty:function(a, b, c) {
    a[b] = c
  }, gl:null, _paused:false, useGoogleAnalytics:false, programs:{}, currentProgram:null, pMatrix:null, runningScene:null, canvas:null, projection:"3d", webglMode:true, usesOffscreenBuffer:false, assets:{}, assetsHandlers:{}, assetsLoaders:{}, assetsLoadedListeners:{}};
  a.lastTime = (new Date).getTime();
  a.delta = 0;
  a.fps = 0;
  a.debugSpan = null;
  a.debugSpanId = "debug-info";
  a.update = null;
  a.mouseEvents = {DOWN:0, MOVE:1, UP:2};
  a.mouseHandlers = [];
  a.selectProgram = function(a) {
    var b = this.programs[a], c = this.gl;
    if(a != this.currentProgram) {
      console.log("selecting program " + a);
      this.currentProgram = a;
      c.validateProgram(b);
      c.useProgram(b);
      for(var e in b.attribs) {
        c.enableVertexAttribArray(b.attribs[e])
      }
    }
    return b
  };
  a.setup = function(a) {
    this.initGraphics(document.getElementById(a));
    this.webglMode && this.initDefaultShaders();
    this.debugSpan = document.getElementById("debug-info");
    this.registerAssetHandler("texture", this.defaultTextureHandler);
    this.registerAssetLoader("texture", this.defaultTextureLoader);
    this.registerAssetLoader("default", this.defaultAssetLoader)
  };
  a.initGraphics = function(a) {
    try {
      if(this.canvas = a, this.webglMode && (this.gl = a.getContext("experimental-webgl", {alpha:false, antialias:false})) && g.WebGLDebugUtils) {
        console.log("installing debug context"), this.gl = WebGLDebugUtils.makeDebugContext(this.gl, throwOnGLError)
      }
    }catch(b) {
      console.log("ERROR: " + b)
    }
    if(!this.gl) {
      this.gl = a.getContext("2d");
      this.usesOffscreenBuffer ? (this.offCanvas = document.createElement("canvas"), this.offCanvas.width = a.width, this.offCanvas.height = a.height, this.offContext = this.offCanvas.getContext("2d"), this.offContext.viewportWidth = a.width, this.offContext.viewportHeight = a.height, this.exportProperty(this, "offContext", this.offContext), this.exportProperty(this.offContext, "viewportWidth", this.offContext.viewportWidth), this.exportProperty(this.offContext, "viewportHeight", this.offContext.viewportHeight)) : 
      this.offContext = this.gl;
      if(!this.gl || !this.offContext) {
        throw"Error initializing graphic context!";
      }
      this.webglMode = false
    }
    this.exportProperty(this, "gl", this.gl);
    this.canvasResized();
    this.installMouseHandlers()
  };
  a.canvasResized = function() {
    var a = this.canvas;
    this.gl.viewportWidth = a.width;
    this.gl.viewportHeight = a.height;
    this.exportProperty(this.gl, "viewportWidth", this.gl.viewportWidth);
    this.exportProperty(this.gl, "viewportHeight", this.gl.viewportHeight)
  };
  a.initDefaultShaders = function() {
    var d = this.gl;
    this.initShader("default", function(b) {
      b.mvpMatrixUniform = d.getUniformLocation(b, "uMVPMatrix");
      b.attribs = {vertexPositionAttribute:d.getAttribLocation(b, "aVertexPosition"), vertexColorAttribute:d.getAttribLocation(b, "aVertexColor")};
      a.exportProperty(b, "mvpMatrixUniform", b.mvpMatrixUniform);
      a.exportProperty(b, "attribs", b.attribs)
    });
    this.initShader("texture", function(b) {
      b.mvpMatrixUniform = d.getUniformLocation(b, "uMVPMatrix");
      b.samplerUniform = d.getUniformLocation(b, "uSampler");
      b.attribs = {vertexColorAttribute:d.getAttribLocation(b, "aVertexColor"), textureCoordAttribute:d.getAttribLocation(b, "aTextureCoord"), vertexPositionAttribute:d.getAttribLocation(b, "aVertexPosition")};
      a.exportProperty(b, "mvpMatrixUniform", b.mvpMatrixUniform);
      a.exportProperty(b, "samplerUniform", b.samplerUniform);
      a.exportProperty(b, "attribs", b.attribs)
    })
  };
  a.initShader = function(a, b) {
    var c = this.gl, e = this.loadShader(a, "frag"), f = this.loadShader(a, "vert"), i = c.createShader(c.FRAGMENT_SHADER);
    c.shaderSource(i, e);
    c.compileShader(i);
    c.getShaderParameter(i, c.COMPILE_STATUS) ? (e = c.createShader(c.VERTEX_SHADER), c.shaderSource(e, f), c.compileShader(e), c.getShaderParameter(e, c.COMPILE_STATUS) ? (c = this.createShader(a, i, e), b && b(c)) : console.log("problem compiling vertex shader " + a + "(" + c.getShaderInfoLog(e) + "):\n" + f)) : console.log("problem compiling fragment shader " + a + "(" + c.getShaderInfoLog(i) + "):\n" + e)
  };
  a.loadShader = function(a, b) {
    var c = null;
    $.ajax({url:"shaders/" + a + "." + b, async:false, type:"GET", success:function(a, b) {
      b == "success" ? c = a : console.log("error getting the shader data")
    }});
    return c
  };
  a.createShader = function(a, b, c) {
    var e = this.gl, f = e.createProgram();
    e.attachShader(f, b);
    e.attachShader(f, c);
    e.linkProgram(f);
    e.getProgramParameter(f, e.LINK_STATUS) || console.log("problem linking shader");
    return this.programs[a] = f
  };
  a.registerAssetHandler = function(a, b) {
    this.assetsHandlers[a] = b
  };
  a.registerAssetLoader = function(a, b) {
    this.assetsLoaders[a] = b
  };
  a.loadAsset = function(a, b, c) {
    var e = void 0;
    if(typeof b == "object") {
      e = b.dataType, b = b.path
    }
    this.assets[a] || (this.assets[a] = {});
    var f = this.assets[a];
    if(f[b]) {
      if(f[b].status == "loading") {
        c && f[b].listeners.push(c)
      }else {
        if(f[b].status == "loaded") {
          c && c(f[b].data)
        }else {
          if(f[b].status == "try") {
            f[b].status = "loading";
            if(this.assetsLoaders[a]) {
              this.assetsLoaders[a](a, {url:b, dataType:e})
            }else {
              this.assetsLoaders["default"](a, {url:b, dataType:e})
            }
            c && f[b].listeners.push(c)
          }
        }
      }
    }else {
      f[b] = {data:null, status:"try", listeners:[]}, c && f[b].listeners.push(c), this.loadAsset(a, {path:b, dataType:e})
    }
  };
  a.assetsLoaded = function(a, b) {
    var c = this.assetsLoadedListeners[a];
    c || (this.assetsLoadedListeners[a] = [], c = this.assetsLoadedListeners[a]);
    b && c.push(b);
    var e = true;
    if(a == "all") {
      for(var f in this.assets) {
        var i = this.assets[f], h;
        for(h in i) {
          if(i[h].status != "loaded") {
            e = false;
            break
          }
        }
        if(!e) {
          break
        }
      }
    }else {
      for(h in i = this.assets[a], i) {
        if(i[h].status != "loaded") {
          e = false;
          break
        }
      }
    }
    if(e) {
      for(;e = c.shift();) {
        e()
      }
    }
  };
  a.getAsset = function(a, b) {
    return this.assets[a][b].data
  };
  a.prepareWebGLTexture = function(a) {
    var b = this.gl, c = true;
    try {
      var e = 0;
      b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, 1);
      b.bindTexture(b.TEXTURE_2D, a.tex);
      b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a);
      e = b.getError();
      e != 0 && (console.log("gl error " + e), c = false);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
      b.bindTexture(b.TEXTURE_2D, null)
    }catch(f) {
      console.log("got some error: " + f), c = false
    }
    return c
  };
  a.defaultTextureHandler = function(d, b) {
    if(a.webglMode) {
      b.tex = a.gl.createTexture()
    }
    a.assets.texture[d].data = b;
    return a.webglMode ? a.prepareWebGLTexture(b) : true
  };
  a.defaultTextureLoader = function(d, b) {
    var c = new Image, e = b.url;
    c.addEventListener("load", function() {
      var b = a.assets.texture[e];
      if(a.assetsHandlers[d](e, c)) {
        b.status = "loaded";
        for(var i;i = b.listeners.shift();) {
          i(b.data)
        }
        a.assetsLoaded(d);
        a.assetsLoaded("all")
      }else {
        b.status = "try", a.loadAsset(d, e)
      }
    }, false);
    c.src = e
  };
  a.defaultAssetLoader = function(d, b) {
    var c = b.url;
    $.ajax({url:c, dataType:b.dataType, success:function(b, f) {
      var i = a.assets[d][c];
      if(f == "success") {
        if(a.assetsHandlers[d](c, b)) {
          i.status = "loaded";
          for(var h;h = i.listeners.shift();) {
            h(i.data)
          }
          a.assetsLoaded(d);
          a.assetsLoaded("all")
        }else {
          i.status = "try", a.loadAsset(d, c)
        }
      }else {
        console.log("Error loading asset " + c)
      }
    }})
  };
  a.setupPerspective = function() {
    var a = this.gl;
    if(this.webglMode) {
      a.clearColor(0, 0, 0, 1);
      a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA);
      a.enable(a.BLEND);
      a.disable(a.DEPTH_TEST);
      var b = a.viewportWidth, c = a.viewportHeight;
      a.viewport(0, 0, b, c);
      this.pMatrix = mat4.create();
      if(this.projection == "2d") {
        console.log("setting up 2d projection (" + b + "," + c + ")"), mat4.ortho(0, b, 0, c, -1024, 1024, this.pMatrix)
      }else {
        if(this.projection == "3d") {
          console.log("setting up 3d projection (" + b + "," + c + ")");
          var e = c / 1.1566, a = mat4.perspective(60, b / c, 0.5, 1500), e = vec3.create([b / 2, c / 2, e]), b = vec3.create([b / 2, c / 2, 0]), c = vec3.create([0, 1, 0]), b = mat4.lookAt(e, b, c);
          mat4.multiply(a, b, this.pMatrix)
        }else {
          throw"Invalid projection: " + this.projection;
        }
      }
    }
  };
  a.setRunningScene = function(a) {
    this.runningScene = a
  };
  a.drawScene = function() {
    var a = void 0;
    this.webglMode ? (a = this.gl, a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)) : (a = this.offContext, a.setTransform(1, 0, 0, 1, 0, 0), a.fillRect(0, 0, a.viewportWidth, a.viewportHeight));
    this.runningScene && this.runningScene.visit();
    !this.webglMode && this.usesOffscreenBuffer && (a.fillRect(0, 0, a.viewportWidth, a.viewportHeight), a.drawImage(this.offCanvas, 0, 0));
    a = (new Date).getTime();
    this.delta = a - this.lastTime;
    this.lastTime = a
  };
  a.lastDebugSecond_ = Date.now();
  a.elapsed_ = 0;
  a.frames_ = 0;
  a.sampledAvg = 0;
  a.sumAvg = 0;
  a.updateDebugTime = function() {
    var d = Date.now();
    this.elapsed_ += this.delta;
    this.frames_++;
    if(d - this.lastDebugSecond_ > 1E3) {
      var b = this.elapsed_ / this.frames_;
      this.sumAvg += b;
      this.sampledAvg++;
      if(this.debugSpan) {
        this.debugSpan.textContent = b.toFixed(2)
      }
      if(this.useGoogleAnalytics && this.sampledAvg > 5) {
        _gaq.push(["_trackEvent", "ChesterGL", "renderTime-" + this.webglMode, a.runningScene.title, Math.floor(this.sumAvg / this.sampledAvg)]), this.sumAvg = this.sampledAvg = 0
      }
      this.elapsed_ = this.frames_ = 0;
      this.lastDebugSecond_ = d
    }
  };
  a.installMouseHandlers = function() {
    $(this.canvas).mousedown(a.mouseDownHandler);
    $(this.canvas).mousemove(a.mouseMoveHandler);
    $(this.canvas).mouseup(a.mouseUpHandler)
  };
  a.mouseDownHandler = function(d) {
    for(var d = a.canvas.relativePosition(d), b = 0, c = a.mouseHandlers.length;b < c;b++) {
      a.mouseHandlers[b](d, a.mouseEvents.DOWN)
    }
  };
  a.mouseMoveHandler = function(d) {
    for(var d = a.canvas.relativePosition(d), b = 0, c = a.mouseHandlers.length;b < c;b++) {
      a.mouseHandlers[b](d, a.mouseEvents.MOVE)
    }
  };
  a.mouseUpHandler = function(d) {
    for(var d = a.canvas.relativePosition(d), b = 0, c = a.mouseHandlers.length;b < c;b++) {
      a.mouseHandlers[b](d, a.mouseEvents.UP)
    }
  };
  a.addMouseHandler = function(a) {
    this.mouseHandlers.indexOf(a) == -1 && this.mouseHandlers.push(a)
  };
  a.removeMouseHandler = function(a) {
    a = this.mouseHandlers.indexOf(a);
    a > 0 && this.mouseHandlers.splice(a, 1)
  };
  a.run = function() {
    a._paused || (g.requestAnimFrame(a.run, a.canvas), a.drawScene(), a.ActionManager.tick(a.delta), a.updateDebugTime())
  };
  a.togglePause = function() {
    a._paused ? (a._paused = false, a.run()) : a._paused = true
  };
  g.ChesterGL = a;
  a.exportProperty(a, "useGoogleAnalytics", a.useGoogleAnalytics);
  a.exportProperty(a, "projection", a.projection);
  a.exportProperty(a, "webglMode", a.webglMode);
  a.exportProperty(a, "usesOffscreenBuffer", a.usesOffscreenBuffer);
  a.exportProperty(a, "debugSpanId", a.debugSpanId);
  a.exportProperty(a, "update", a.update);
  a.exportProperty(a, "mouseEvents", a.mouseEvents);
  a.exportProperty(a.mouseEvents, "DOWN", a.mouseEvents.DOWN);
  a.exportProperty(a.mouseEvents, "MOVE", a.mouseEvents.MOVE);
  a.exportProperty(a.mouseEvents, "UP", a.mouseEvents.UP);
  a.exportProperty(a, "setup", a.setup);
  a.exportProperty(a, "canvasResized", a.canvasResized);
  a.exportProperty(a, "initShader", a.initShader);
  a.exportProperty(a, "registerAssetHandler", a.registerAssetHandler);
  a.exportProperty(a, "loadAsset", a.loadAsset);
  a.exportProperty(a, "assetsLoaded", a.assetsLoaded);
  a.exportProperty(a, "getAsset", a.getAsset);
  a.exportProperty(a, "setupPerspective", a.setupPerspective);
  a.exportProperty(a, "setRunningScene", a.setRunningScene);
  a.exportProperty(a, "drawScene", a.drawScene);
  a.exportProperty(a, "run", a.run);
  a.exportProperty(a, "togglePause", a.togglePause)
})(window);
(function(g) {
  var a = g.ChesterGL;
  a.Block = function(d, b, c) {
    this.type = b || a.Block.TYPE.STANDALONE;
    if(c) {
      this.parent = c
    }
    this.children = [];
    this.program = a.Block.PROGRAM.DEFAULT;
    d && (typeof d === "string" ? (d = a.BlockFrames.getFrame(d), this.setTexture(d.texture), this.setFrame(d.frame)) : this.setFrame(d));
    this.type == a.Block.TYPE.STANDALONE && this.setColor([1, 1, 1, 1]);
    if(a.webglMode && this.type == a.Block.TYPE.STANDALONE && (!c || c.type != a.Block.TYPE.BLOCKGROUP)) {
      this.glBuffer = a.gl.createBuffer(), this.glBufferData = new Float32Array(a.Block.BUFFER_SIZE)
    }
    this.mvMatrix = mat4.create();
    this.mvpMatrix = mat4.create();
    mat4.identity(this.mvMatrix);
    this._scheduledAdd = [];
    this._scheduledRemove = []
  };
  a.Block.PROGRAM = {DEFAULT:0, TEXTURE:1};
  a.Block.PROGRAM_NAME = ["default", "texture"];
  a.Block.TYPE = {STANDALONE:0, BLOCKGROUP:1, SCENE:2, TMXBLOCK:3, PARTICLE:4};
  a.Block.QUAD_SIZE = 36;
  a.Block.BUFFER_SIZE = 36;
  a.Block.DEG_TO_RAD = Math.PI / 180;
  a.Block.RAD_TO_DEG = 180 / Math.PI;
  a.Block.FullFrame = quat4.create([0, 0, 1, 1]);
  a.Block.SizeZero = vec2.create([0, 0]);
  a.Block.prototype.title = "";
  a.Block.prototype.mvMatrix = null;
  a.Block.prototype.mvpMatrix = null;
  a.Block.prototype.visible = true;
  a.Block.prototype.isTransformDirty = false;
  a.Block.prototype.isColorDirty = false;
  a.Block.prototype.isFrameDirty = false;
  a.Block.prototype.baseBufferIndex = 0;
  a.Block.prototype.glBuffer = null;
  a.Block.prototype.glBufferData = null;
  a.Block.prototype.position = vec3.create();
  a.Block.prototype.contentSize = null;
  a.Block.prototype.color = quat4.create([1, 1, 1, 1]);
  a.Block.prototype.texture = null;
  a.Block.prototype.opacity = 1;
  a.Block.prototype.rotation = 0;
  a.Block.prototype.scale = 1;
  a.Block.prototype.update = null;
  a.Block.prototype.frame = null;
  a.Block.prototype.parent = null;
  a.Block.prototype.children = null;
  a.Block.prototype._scheduledAdd = null;
  a.Block.prototype._scheduledRemove = null;
  a.Block.prototype._inVisit = false;
  a.Block.prototype.setFrame = function(a) {
    this.frame = quat4.create(a);
    this.setContentSize([a[2], a[3]]);
    this.isFrameDirty = true
  };
  a.Block.prototype.setContentSize = function(a) {
    this.contentSize = vec2.create(a);
    this.isFrameDirty = true
  };
  a.Block.prototype.setScale = function(a) {
    this.scale = a;
    this.isTransformDirty = true
  };
  a.Block.prototype.setColor = function(a) {
    this.color = quat4.create(a);
    this.isColorDirty = true
  };
  a.Block.prototype.setTexture = function(d) {
    this.texture = d;
    this.program = a.Block.PROGRAM.TEXTURE;
    var b = this;
    a.loadAsset("texture", d, function(a) {
      b.contentSize || b.setContentSize([a.width, a.height]);
      b.frame || b.setFrame([0, 0, a.width, a.height])
    })
  };
  a.Block.prototype.moveTo = function(d, b) {
    if(b) {
      var c = new a.MoveToAction(this, b, d);
      a.ActionManager.scheduleAction(c)
    }else {
      this.position = vec3.create(d), this.isTransformDirty = true
    }
  };
  a.Block.prototype.moveBy = function(a) {
    vec3.add(this.position, a);
    this.isTransformDirty = true
  };
  a.Block.prototype.rotateTo = function(d) {
    this.rotation = (a.webglMode ? -1 : 1) * d * a.Block.DEG_TO_RAD;
    this.isTransformDirty = true
  };
  a.Block.prototype.rotateBy = function(d) {
    this.rotation += (a.webglMode ? -1 : 1) * d * a.Block.DEG_TO_RAD;
    this.isTransformDirty = true
  };
  a.Block.prototype.addChild = function(a) {
    if(a.parent) {
      throw"can't add a block twice!";
    }
    this._inVisit ? this._scheduledAdd.push(a) : (this.children.push(a), a.parent = this)
  };
  a.Block.prototype.removeChild = function(a) {
    if(!a.parent || a.parent != this) {
      throw"not our child!";
    }
    this._inVisit ? this._scheduledRemove.push(a) : (a = this.children.indexOf(a), a >= 0 && this.children.splice(a, 1))
  };
  a.Block.prototype.transform = function() {
    var d = a.gl;
    if(this.isTransformDirty || this.parent && this.parent.isTransformDirty) {
      mat4.identity(this.mvMatrix);
      mat4.translate(this.mvMatrix, this.position);
      mat4.rotate(this.mvMatrix, this.rotation, [0, 0, 1]);
      mat4.scale(this.mvMatrix, [this.scale, this.scale, 1]);
      var b = this.parent ? this.parent.mvMatrix : null;
      b && mat4.multiply(b, this.mvMatrix, this.mvMatrix)
    }
    if(this.type != a.Block.TYPE.BLOCKGROUP) {
      var b = this.glBufferData, c = this.parent && this.parent.type == a.Block.TYPE.BLOCKGROUP;
      if(a.webglMode) {
        !c && (this.isFrameDirty || this.isColorDirty) && d.bindBuffer(d.ARRAY_BUFFER, this.glBuffer);
        if(this.isFrameDirty || c && this.isTransformDirty) {
          var e = 9, f = this.contentSize[0] * 0.5, i = this.contentSize[1] * 0.5, h = this.baseBufferIndex * a.Block.BUFFER_SIZE, g = this.position[2];
          if(c) {
            var l = [f, i, 0], k = [-f, i, 0], j = [f, -i, 0], f = [-f, -i, 0];
            mat4.multiplyVec3(this.mvMatrix, l);
            mat4.multiplyVec3(this.mvMatrix, k);
            mat4.multiplyVec3(this.mvMatrix, f);
            mat4.multiplyVec3(this.mvMatrix, j);
            b[h] = f[0];
            b[h + 1] = f[1];
            b[h + 2] = g;
            b[h + e] = k[0];
            b[h + 1 + e] = k[1];
            b[h + 2 + e] = g;
            b[h + 2 * e] = j[0];
            b[h + 1 + 2 * e] = j[1];
            b[h + 2 + 2 * e] = g;
            b[h + 3 * e] = l[0];
            b[h + 1 + 3 * e] = l[1];
            b[h + 2 + 3 * e] = g
          }else {
            b[h] = -f, b[h + 1] = -i, b[h + 2] = 0, b[h + e] = -f, b[h + 1 + e] = i, b[h + 2 + e] = 0, b[h + 2 * e] = f, b[h + 1 + 2 * e] = -i, b[h + 2 + 2 * e] = 0, b[h + 3 * e] = f, b[h + 1 + 3 * e] = i, b[h + 2 + 3 * e] = 0
          }
          if(this.program == a.Block.PROGRAM.TEXTURE) {
            g = a.getAsset("texture", this.texture), k = g.width, j = g.height, g = this.frame[0] / k, l = this.frame[1] / j, k = this.frame[2] / k, j = this.frame[3] / j, h += 3, b[h] = g, b[h + 1] = l, b[h + e] = g, b[h + 1 + e] = l + j, b[h + 2 * e] = g + k, b[h + 1 + 2 * e] = l, b[h + 3 * e] = g + k, b[h + 1 + 3 * e] = l + j
          }
        }
        if(this.isColorDirty) {
          h = 5 + this.baseBufferIndex * a.Block.BUFFER_SIZE;
          g = this.color;
          l = this.opacity;
          for(k = 0;k < 4;k++) {
            b[h + e * k] = g[0] * l, b[h + 1 + e * k] = g[1] * l, b[h + 2 + e * k] = g[2] * l, b[h + 3 + e * k] = g[3] * l
          }
        }
        a.webglMode && !c && (this.isFrameDirty || this.isColorDirty) && d.bufferData(d.ARRAY_BUFFER, this.glBufferData, d.STATIC_DRAW)
      }
    }
  };
  a.Block.prototype.visit = function() {
    this._inVisit = true;
    this.update && this.update(a.delta);
    if(this.visible) {
      this.transform();
      for(var d = this.children, b = d.length, c = 0;c < b;c++) {
        d[c].visit()
      }
      (!this.parent || this.parent.type != a.Block.TYPE.BLOCKGROUP) && this.render();
      for(this._inVisit = this.isFrameDirty = this.isColorDirty = this.isTransformDirty = false;d = this._scheduledAdd.shift();) {
        this.addChild(d)
      }
      for(;d = this._scheduledRemove.shift();) {
        this.removeChild(d)
      }
    }else {
      this._inVisit = false
    }
  };
  a.Block.prototype.render = function() {
    if(this.type == a.Block.TYPE.BLOCKGROUP) {
      throw"Cannot call render on a BlockGroup block!";
    }
    if(this.type != a.Block.TYPE.SCENE) {
      if(a.webglMode) {
        var d = a.gl, b = a.selectProgram(a.Block.PROGRAM_NAME[this.program]);
        d.bindBuffer(d.ARRAY_BUFFER, this.glBuffer);
        var c = a.Block.QUAD_SIZE;
        d.vertexAttribPointer(b.attribs.vertexPositionAttribute, 3, d.FLOAT, false, c, 0);
        d.vertexAttribPointer(b.attribs.vertexColorAttribute, 4, d.FLOAT, false, c, 20);
        if(this.program != a.Block.PROGRAM.DEFAULT && this.program == a.Block.PROGRAM.TEXTURE) {
          var e = a.getAsset("texture", this.texture);
          d.vertexAttribPointer(b.attribs.textureCoordAttribute, 2, d.FLOAT, false, c, 12);
          d.activeTexture(d.TEXTURE0);
          d.bindTexture(d.TEXTURE_2D, e.tex);
          d.uniform1i(b.samplerUniform, 0)
        }
        (this.isTransformDirty || this.parent && this.parent.isTransformDirty) && mat4.multiply(a.pMatrix, this.mvMatrix, this.mvpMatrix);
        d.uniformMatrix4fv(b.mvpMatrixUniform, false, this.mvpMatrix);
        d.drawArrays(d.TRIANGLE_STRIP, 0, 4)
      }else {
        if(d = a.offContext, this.program == a.Block.PROGRAM.TEXTURE) {
          b = this.mvMatrix;
          e = a.getAsset("texture", this.texture);
          d.globalAlpha = this.opacity;
          d.setTransform(b[0], b[1], b[4], b[5], b[12], d.viewportHeight - b[13]);
          var b = this.contentSize[0], c = this.contentSize[1], f = this.frame;
          d.drawImage(e, f[0], e.height - (f[1] + c), f[2], f[3], -b / 2, -c / 2, b, c)
        }
      }
    }
  };
  a.Block = a.Block;
  a.exportProperty(a.Block, "FullFrame", a.Block.FullFrame);
  a.exportProperty(a.Block, "SizeZero", a.Block.SizeZero);
  a.exportProperty(a.Block, "TYPE", a.Block.TYPE);
  a.exportProperty(a.Block, "PROGRAM", a.Block.PROGRAM);
  a.exportProperty(a.Block, "PROGRAM_NAME", a.Block.PROGRAM_NAME);
  a.exportProperty(a.Block, "create", a.Block.create);
  a.exportProperty(a.Block.prototype, "visible", a.Block.prototype.visible);
  a.exportProperty(a.Block.prototype, "position", a.Block.prototype.position);
  a.exportProperty(a.Block.prototype, "contentSize", a.Block.prototype.contentSize);
  a.exportProperty(a.Block.prototype, "color", a.Block.prototype.color);
  a.exportProperty(a.Block.prototype, "texture", a.Block.prototype.texture);
  a.exportProperty(a.Block.prototype, "opacity", a.Block.prototype.opacity);
  a.exportProperty(a.Block.prototype, "rotation", a.Block.prototype.rotation);
  a.exportProperty(a.Block.prototype, "scale", a.Block.prototype.scale);
  a.exportProperty(a.Block.prototype, "update", a.Block.prototype.update);
  a.exportProperty(a.Block.prototype, "frame", a.Block.prototype.frame);
  a.exportProperty(a.Block.prototype, "parent", a.Block.prototype.parent);
  a.exportProperty(a.Block.prototype, "children", a.Block.prototype.children);
  a.exportProperty(a.Block.prototype, "setFrame", a.Block.prototype.setFrame);
  a.exportProperty(a.Block.prototype, "setContentSize", a.Block.prototype.setContentSize);
  a.exportProperty(a.Block.prototype, "setScale", a.Block.prototype.setScale);
  a.exportProperty(a.Block.prototype, "setColor", a.Block.prototype.setColor);
  a.exportProperty(a.Block.prototype, "setTexture", a.Block.prototype.setTexture);
  a.exportProperty(a.Block.prototype, "moveTo", a.Block.prototype.moveTo);
  a.exportProperty(a.Block.prototype, "moveBy", a.Block.prototype.moveBy);
  a.exportProperty(a.Block.prototype, "rotateTo", a.Block.prototype.rotateTo);
  a.exportProperty(a.Block.prototype, "rotateBy", a.Block.prototype.rotateBy);
  a.exportProperty(a.Block.prototype, "addChild", a.Block.prototype.addChild);
  a.exportProperty(a.Block.prototype, "removeChild", a.Block.prototype.removeChild)
})(window);
(function(g) {
  var a = g.ChesterGL;
  a.BlockGroup = function(d, b) {
    if(!a.webglMode) {
      throw"BlockGroup only works on WebGL mode";
    }
    a.Block.call(this, null, a.Block.TYPE.BLOCKGROUP);
    d ? (this.texture = d, this.program = a.Block.PROGRAM.TEXTURE) : this.program = a.Block.PROGRAM.DEFAULT;
    this.maxChildren = b || 10;
    this.createBuffers()
  };
  a.BlockGroup.prototype = Object.create(a.Block.prototype);
  a.BlockGroup.prototype.maxChildren = 0;
  a.BlockGroup.prototype.isChildDirty = false;
  a.BlockGroup.prototype.indexBuffer = null;
  a.BlockGroup.prototype.indexBufferData = null;
  a.BlockGroup.prototype.createBuffers = function() {
    var d = a.gl;
    this.glBuffer = d.createBuffer();
    this.glBufferData = new Float32Array(a.Block.QUAD_SIZE * this.maxChildren);
    this.indexBuffer = d.createBuffer();
    this.indexBufferData = new Uint16Array(6 * this.maxChildren)
  };
  a.BlockGroup.prototype.createBlock = function(d) {
    d = new a.Block(d, a.Block.TYPE.STANDALONE, this);
    this.texture && d.setTexture(this.texture);
    return d
  };
  a.BlockGroup.prototype.addChild = function(a) {
    if(this.children.length >= this.maxChildren) {
      throw"Error: too many children - Make the initial size of the BlockGroup larger";
    }
    if(a.parent != this) {
      throw"Invalid child: can only add children created with BlockGroup.create";
    }
    if(this.texture) {
      if(this.texture != a.texture) {
        throw"Invalid child: only can add child with the same texture";
      }
    }else {
      this.texture = a.texture
    }
    this.children.push(a);
    a.baseBufferIndex = this.children.length - 1;
    a.glBufferData = this.glBufferData;
    this.isChildDirty = true
  };
  a.BlockGroup.prototype.recreateIndices = function(d) {
    for(var b = (this.indexBufferData[d * 6 - 1] || -1) + 1, c = Math.max(this.children.length, 1);d < c;d++) {
      var e = d * 6;
      this.indexBufferData[e + 0] = b;
      this.indexBufferData[e + 1] = b + 1;
      this.indexBufferData[e + 2] = b + 2;
      this.indexBufferData[e + 3] = b + 2;
      this.indexBufferData[e + 4] = b + 1;
      this.indexBufferData[e + 5] = b + 3;
      b += 4
    }
    b = a.gl;
    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    b.bufferData(b.ELEMENT_ARRAY_BUFFER, this.indexBufferData, b.STATIC_DRAW)
  };
  a.BlockGroup.prototype.removeBlock = function() {
    throw"not implemented";
  };
  a.BlockGroup.prototype.visit = function() {
    this.update && this.update(a.delta);
    if(this.visible) {
      this.transform();
      for(var d = this.children, b = d.length, c = 0;c < b;c++) {
        d[c].visit()
      }
      d = a.gl;
      d.bindBuffer(d.ARRAY_BUFFER, this.glBuffer);
      d.bufferData(d.ARRAY_BUFFER, this.glBufferData, d.STATIC_DRAW);
      if(this.isChildDirty) {
        this.recreateIndices(0), this.isChildDirty = false
      }
      this.render();
      this.isFrameDirty = this.isColorDirty = this.isTransformDirty = false
    }
  };
  a.BlockGroup.prototype.render = function() {
    var d = a.gl, b = a.selectProgram(a.Block.PROGRAM_NAME[this.program]), c = this.children.length, e = a.Block.QUAD_SIZE;
    d.bindBuffer(d.ARRAY_BUFFER, this.glBuffer);
    d.vertexAttribPointer(b.attribs.vertexPositionAttribute, 3, d.FLOAT, false, e, 0);
    if(this.program != a.Block.PROGRAM.DEFAULT && this.program == a.Block.PROGRAM.TEXTURE) {
      var f = a.getAsset("texture", this.texture);
      d.vertexAttribPointer(b.attribs.textureCoordAttribute, 2, d.FLOAT, false, e, 12);
      d.activeTexture(d.TEXTURE0);
      d.bindTexture(d.TEXTURE_2D, f.tex);
      d.uniform1i(b.samplerUniform, 0)
    }
    d.vertexAttribPointer(b.attribs.vertexColorAttribute, 4, d.FLOAT, false, e, 20);
    d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    mat4.multiply(a.pMatrix, this.mvMatrix, this.mvpMatrix);
    d.uniformMatrix4fv(b.mvpMatrixUniform, false, this.mvpMatrix);
    d.drawElements(d.TRIANGLES, c * 6, d.UNSIGNED_SHORT, 0)
  };
  a.BlockGroup = a.BlockGroup;
  a.exportProperty(a.BlockGroup.prototype, "createBlock", a.BlockGroup.prototype.createBlock)
})(window);
(function(g) {
  var a = g.ChesterGL, d = {frames:{}};
  d.loadJSON = function(b) {
    if(b.meta && b.meta.version == "1.0") {
      var c = b.meta.image;
      a.loadAsset("texture", c, function(a) {
        var a = a.height, f = b.frames, g;
        for(g in f) {
          var h = f[g], u = {frame:{}, texture:""};
          u.frame = quat4.create([h.frame.x, a - (h.frame.y + h.frame.h), h.frame.w, h.frame.h]);
          u.texture = c;
          d.frames[g] = u
        }
      })
    }else {
      throw"Unkown json data";
    }
  };
  d.getFrame = function(a) {
    return d.frames[a]
  };
  d.loadFrames = function(a) {
    console.log("loadFrames: will fetch " + a);
    $.ajax({url:a, async:false, dataType:"json", success:function(a, b) {
      b == "success" && d.loadJSON(a)
    }})
  };
  a.BlockFrames = d;
  a.exportProperty(d, "getFrame", d.getFrame);
  a.exportProperty(d, "loadFrames", d.loadFrames)
})(window);
(function(g) {
  var a = g.ChesterGL;
  a.TMXBlock = function(d) {
    d = a.TMXBlock.maps[d];
    if(!d) {
      throw"Invalid map - make sure you call loadTMX first";
    }
    a.Block.call(this, null, a.Block.TYPE.TMXBLOCK);
    for(var b = 0;b < d.layers.length;b++) {
      for(var c = d.layers[b], e = a.webglMode ? new a.BlockGroup(d.texture, c.blocks.length) : new a.Block, f = 0;f < c.blocks.length;f++) {
        var g = c.blocks[f], h = void 0;
        a.webglMode ? h = e.createBlock(g.frame) : (h = new a.Block(g.frame), h.setTexture(d.texture));
        h.moveTo(g.position);
        e.addChild(h)
      }
      this.addChild(e)
    }
  };
  a.TMXBlock.prototype = Object.create(a.Block.prototype);
  a.TMXBlock.prototype.render = function() {
  };
  a.TMXBlock.prototype.tileSize = null;
  a.TMXBlock.prototype.mapTileSize = null;
  a.TMXBlock.prototype.totalTiles = 0;
  a.TMXBlock.prototype.spacing = 0;
  a.TMXBlock.prototype.margin = 0;
  a.TMXBlock.maps = {};
  a.TMXBlock.loadTMX = function(d) {
    a.loadAsset("tmx", {path:d, dataType:"xml"}, function(b) {
      var c = {}, b = $(b).find("map"), e = b.find("tileset").first(), f = b.attr("orientation");
      if(e) {
        c.tileSize = vec2.create([parseInt(e.attr("tilewidth"), 10), parseInt(e.attr("tileheight"), 10)]);
        c.mapTileSize = vec2.create([parseInt(b.attr("tilewidth"), 10), parseInt(b.attr("tileheight"), 10)]);
        e.attr("spacing") && (c.spacing = parseInt(e.attr("spacing"), 10));
        e.attr("margin") && (c.margin = parseInt(e.attr("margin"), 10));
        var e = e.find("image").first(), g = vec2.create([parseInt(e.attr("width"), 10), parseInt(e.attr("height"), 10)]);
        c.texture = e.attr("source");
        a.loadAsset("texture", c.texture);
        c.layers = [];
        b.find("layer").each(function(a, b) {
          var d = {blocks:[]}, e = vec2.create([parseInt($(b).attr("width"), 10), parseInt($(b).attr("height"), 10)]), j = $(b).find("data").first();
          if(j) {
            if(j.attr("encoding") != "base64" || j.attr("compression")) {
              throw"Invalid TMX Data";
            }
            for(var j = j.text().trim(), j = base64.decode(j), o = 0, p = 0;p < e[1];p++) {
              for(var q = 0;q < e[0];q++) {
                var n = ((j.charCodeAt(o + 3) & 255) << 24 | (j.charCodeAt(o + 2) & 255) << 16 | (j.charCodeAt(o + 1) & 255) << 8 | j.charCodeAt(o + 0) & 255) - 1, v = {}, s = c.margin || 0, r = c.spacing || 0, m = c.tileSize, t = c.mapTileSize, w = parseInt((g[0] - s * 2 + r) / (m[0] + r), 10), n = quat4.create([n % w * (m[0] + r) + s, g[1] - m[1] - s - r - parseInt(n / w, 10) * (m[1] + r) + s, m[0], m[1]]);
                v.frame = n;
                if(f == "orthogonal") {
                  n = q * t[0] + m[0] / 2, m = (e[1] - p - 1) * t[1] + m[1] / 2
                }else {
                  if(f == "isometric") {
                    n = t[0] / 2 * (e[0] + q - p - 1) + m[0] / 2, m = t[1] / 2 * (e[1] * 2 - q - p - 2) + m[1] / 2
                  }else {
                    throw"Invalid orientation";
                  }
                }
                v.position = [n, m, 0];
                d.blocks.push(v);
                o += 4
              }
            }
          }else {
            throw"No data for layer!";
          }
          c.layers.push(d)
        })
      }
      a.TMXBlock.maps[d] = c
    })
  };
  a.registerAssetHandler("tmx", function(d, b) {
    console.log("tmx loaded: " + d);
    a.assets.tmx[d].data = b;
    return true
  });
  a.TMXBlock = a.TMXBlock;
  a.exportProperty(a.TMXBlock, "loadTMX", a.TMXBlock.loadTMX)
})(window);
(function(g) {
  var a = g.ChesterGL;
  a.Action = function(a, b) {
    this.block = a;
    this.totalTime = b * 1E3;
    this.elapsed = 0
  };
  a.Action.prototype.block = null;
  a.Action.prototype.totalTime = 0;
  a.Action.prototype.elapsed = 0;
  a.Action.prototype.currentTime = 0;
  a.Action.prototype.finished = false;
  a.Action.prototype.update = function(a) {
    this.elapsed += a;
    if(this.elapsed >= this.totalTime) {
      this.finished = true
    }
  };
  a.MoveToAction = function(d, b, c) {
    a.Action.call(this, d, b);
    this.finalPosition = vec3.create(c);
    this.startPosition = vec3.create(d.position)
  };
  a.MoveToAction.prototype = Object.create(a.Action.prototype);
  a.MoveToAction.prototype.finalPosition = null;
  a.MoveToAction.prototype.startPosition = null;
  a.MoveToAction.prototype.update = function(d) {
    a.Action.prototype.update.call(this, d);
    d = this.block;
    if(this.finished) {
      d.moveTo(this.finalPosition)
    }else {
      var b = Math.min(1, this.elapsed / this.totalTime);
      vec3.lerp(this.startPosition, this.finalPosition, b, d.position);
      d.isTransformDirty = true
    }
  };
  a.ActionManager = {};
  a.ActionManager.scheduledActions_ = [];
  a.ActionManager.scheduleAction = function(a) {
    this.scheduledActions_.push(a)
  };
  a.ActionManager.tick = function(a) {
    for(var b = 0, c = this.scheduledActions_.length, b = 0;b < c;b++) {
      var e = this.scheduledActions_[b];
      !e.finished && e.update(a)
    }
  };
  a.exportProperty(a.ActionManager, "scheduleAction", a.ActionManager.scheduleAction)
})(window);
(function(g) {
  var a = g.ChesterGL;
  a.ParticleSystem = function(b) {
    a.Block.call(this, null, a.Block.TYPE.PARTICLE);
    var c = this;
    a.loadAsset("texture", b.texture, function() {
      c.loadProperties(b)
    })
  };
  a.ParticleSystem._shadersLoaded = false;
  a.ParticleSystem.loadShaders = function() {
    a.initShader("particles", function(b) {
      var c = a.gl;
      b.mvpMatrixUniform = c.getUniformLocation(b, "uMVPMatrix");
      b.uSampler = c.getUniformLocation(b, "uSampler");
      b.u_time = c.getUniformLocation(b, "u_time");
      b.u_startColor = c.getUniformLocation(b, "u_startColor");
      b.u_endColor = c.getUniformLocation(b, "u_endColor");
      b.attribs = {a_startPosition:c.getAttribLocation(b, "a_startPosition"), a_lifetime:c.getAttribLocation(b, "a_lifetime"), a_startTime:c.getAttribLocation(b, "a_startTime"), a_startSize:c.getAttribLocation(b, "a_startSize"), a_endSize:c.getAttribLocation(b, "a_endSize"), a_speed:c.getAttribLocation(b, "a_speed")};
      b = c.getError();
      b != 0 && console.log("gl error: " + b)
    });
    a.ParticleSystem._shadersLoaded = true
  };
  a.ParticleSystem.prototype = Object.create(a.Block.prototype);
  a.ParticleSystem.prototype.running = true;
  a.ParticleSystem.prototype.particleTexture = null;
  a.ParticleSystem.prototype.emissionRate = 0;
  a.ParticleSystem.prototype.emissionCounter = 0;
  a.ParticleSystem.prototype.particleCount = 0;
  a.ParticleSystem.prototype.maxParticles = 0;
  a.ParticleSystem.prototype.duration = 0;
  a.ParticleSystem.prototype.lifetime = 0;
  a.ParticleSystem.prototype.lifetimeVariance = 0;
  a.ParticleSystem.prototype.startColor = null;
  a.ParticleSystem.prototype.positionVariance = null;
  a.ParticleSystem.prototype.endColor = null;
  a.ParticleSystem.prototype.particleSpeed = null;
  a.ParticleSystem.prototype.particleSpeedVariance = null;
  a.ParticleSystem.prototype.startSize = 0;
  a.ParticleSystem.prototype.startSizeVariance = 0;
  a.ParticleSystem.prototype.endSize = 0;
  a.ParticleSystem.prototype.endSizeVariance = 0;
  a.ParticleSystem.prototype.particleAdded = false;
  a.ParticleSystem.prototype.elapsedTime = 0;
  a.ParticleSystem.prototype.blendOptions = ["SRC_ALPHA", "ONE_MINUS_SRC_ALPHA"];
  a.ParticleSystem.prototype.loadProperties = function(b) {
    this.program = -1;
    a.ParticleSystem._shadersLoaded || a.ParticleSystem.loadShaders();
    this.particleTexture = b.texture;
    this.maxParticles = b.maxParticles;
    this.duration = parseFloat(b.duration) * 1E3;
    this.lifetime = parseFloat(b.lifetime) * 1E3;
    this.lifetimeVariance = parseFloat(b.lifetimeVariance) * 1E3;
    this.startColor = quat4.create(b.startColor);
    this.positionVariance = vec3.create(b.positionVariance);
    this.endColor = quat4.create(b.endColor);
    this.particleSpeed = vec3.create(b.speed);
    this.particleSpeedVariance = vec3.create(b.speedVariance);
    this.startSize = parseFloat(b.startSize);
    this.startSizeVariance = parseFloat(b.startSizeVariance);
    this.endSize = parseFloat(b.endSize);
    this.endSizeVariance = parseFloat(b.endSizeVariance);
    this.elapsedTime = 0;
    this.blendOptions = b.blendOptions.slice(0);
    this.running = true;
    this.glBuffer = a.gl.createBuffer();
    this.glBufferData = new Float32Array(this.maxParticles * 10);
    this.resetParticles()
  };
  a.ParticleSystem.prototype.addParticle = function() {
    this.initParticle(this.particleCount, Math.abs(this.lifetime + this.lifetimeVariance * (Math.random() * 2 - 1)), this.elapsedTime);
    this.particleCount++;
    this.particleAdded = true
  };
  a.ParticleSystem.prototype.initParticle = function(a, c, d) {
    var f = this.glBufferData;
    f[a * 10 + 0] = c || -1;
    f[a * 10 + 1] = d || 0;
    f[a * 10 + 2] = this.startSize + this.startSizeVariance * (Math.random() * 2 - 1);
    f[a * 10 + 3] = this.endSize + this.endSizeVariance * (Math.random() * 2 - 1);
    f[a * 10 + 4] = this.particleSpeed[0] + this.particleSpeedVariance[0] * (Math.random() * 2 - 1);
    f[a * 10 + 5] = this.particleSpeed[1] + this.particleSpeedVariance[1] * (Math.random() * 2 - 1);
    f[a * 10 + 6] = this.particleSpeed[2] + this.particleSpeedVariance[2] * (Math.random() * 2 - 1);
    f[a * 10 + 7] = (Math.random() * 2 - 1) * this.positionVariance[0];
    f[a * 10 + 8] = (Math.random() * 2 - 1) * this.positionVariance[1];
    f[a * 10 + 9] = (Math.random() * 2 - 1) * this.positionVariance[2]
  };
  a.ParticleSystem.prototype.resetParticles = function() {
    for(var b = a.selectProgram("particles"), c = a.gl, d = 0;d < this.maxParticles;d++) {
      this.initParticle(d)
    }
    c.uniform4fv(b.u_startColor, this.startColor);
    c.uniform4fv(b.u_endColor, this.endColor);
    c.uniform1i(b.uSampler, 0);
    this.sendParticleData(b);
    this.particleCount = this.emissionCounter = 0;
    this.emissionRate = this.maxParticles / Math.abs(this.lifetime)
  };
  a.ParticleSystem.prototype.sendParticleData = function() {
    var b = a.gl;
    b.bindBuffer(b.ARRAY_BUFFER, this.glBuffer);
    b.bufferData(b.ARRAY_BUFFER, this.glBufferData, b.STATIC_DRAW)
  };
  var d = new Float32Array(10);
  a.ParticleSystem.prototype.update = function(b) {
    if(a.selectProgram("particles")) {
      this.elapsedTime += b;
      var c = 1 / this.emissionRate;
      for(this.emissionCounter += b;this.particleCount < this.maxParticles && this.emissionCounter > c && this.running;) {
        this.addParticle(), this.emissionCounter -= c
      }
      for(b = 0;b < this.maxParticles;b++) {
        var c = this.glBufferData, e = b * 10;
        if(c[e] > 0 && c[e] + c[e + 1] <= this.elapsedTime && b != this.particleCount - 1) {
          var f = c.subarray(e, e + 10);
          d.set(f);
          d[0] = -1;
          f = c.subarray(e + 10, this.particleCount * 10);
          c.set(f, e);
          c.set(d, (this.particleCount - 1) * 10);
          this.particleCount--
        }
      }
      if(this.duration > 0 && this.elapsedTime > this.duration) {
        this.running = false
      }
    }
  };
  a.ParticleSystem.prototype.render = function() {
    var b = a.selectProgram("particles");
    if(b) {
      var c = a.gl, d = a.getAsset("texture", this.particleTexture);
      c.enable(c.BLEND);
      c.blendFunc(c[this.blendOptions[0]], c[this.blendOptions[1]]);
      if(this.particleAdded) {
        this.sendParticleData(b), this.particleAdded = false
      }
      c.uniform1f(b.u_time, this.elapsedTime);
      c.activeTexture(c.TEXTURE0);
      c.bindTexture(c.TEXTURE_2D, d.tex);
      c.bindBuffer(c.ARRAY_BUFFER, this.glBuffer);
      c.vertexAttribPointer(b.attribs.a_lifetime, 3, c.FLOAT, false, 40, 0);
      c.vertexAttribPointer(b.attribs.a_startTime, 3, c.FLOAT, false, 40, 4);
      c.vertexAttribPointer(b.attribs.a_startSize, 3, c.FLOAT, false, 40, 8);
      c.vertexAttribPointer(b.attribs.a_endSize, 3, c.FLOAT, false, 40, 12);
      c.vertexAttribPointer(b.attribs.a_speed, 3, c.FLOAT, false, 40, 16);
      c.vertexAttribPointer(b.attribs.a_startPosition, 3, c.FLOAT, false, 40, 28);
      (this.isTransformDirty || this.parent && this.parent.isTransformDirty) && mat4.multiply(a.pMatrix, this.mvMatrix, this.mvpMatrix);
      c.uniformMatrix4fv(b.mvpMatrixUniform, false, this.mvpMatrix);
      c.drawArrays(c.POINTS, 0, this.maxParticles)
    }
  }
})(window);

