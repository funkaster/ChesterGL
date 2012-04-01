/**
 * chesterGL - Simple 2D WebGL demo/library
 *
 * Copyright (c) 2010-2012 Rolando Abarca
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

goog.provide("chesterGL.ParticleSystem");

goog.require("goog.vec.Vec4");
goog.require("chesterGL.Block");

/**
 * @const {number}
 * @ignore
 */
var BUFFER_ELEMENTS = 10;

/**
 * BUFFER_ELEMENTS * 4 (bytes) ~> BUFFER_ELEMENTS floats == 1 (lifetime) + 1 (start time) + 1 (start size) + 1 (end size) + 3 (start pos) + 3 (end pos)
 * @const {number}
 * @ignore
 */
var PARTICLE_SIZE = 40;

/**
 * @param {goog.vec.Vec3.Type} original The original vector
 * @param {goog.vec.Vec3.Type} variance the variance for every coordinate in the original vector
 * @return {goog.vec.Vec3.Type}
 * @ignore
 */
function randomVec3(original, variance) {
	var vec = goog.vec.Vec3.createFloat32();
	if (variance) {
		vec[0] = original[0] + (variance[0] * 2 * Math.random());
		vec[1] = original[1] + (variance[1] * 2 * Math.random());
		vec[2] = original[2] + (variance[2] * 2 * Math.random());
	} else {
		vec[0] = original[0];
		vec[1] = original[1];
		vec[2] = original[2];
	}
	return vec;
}

/**
 * @constructor
 * @param {Object} properties
 * @extends chesterGL.Block
 */
chesterGL.ParticleSystem = function (properties) {
	chesterGL.Block.call(this, null, chesterGL.Block.TYPE.PARTICLE);
	var _this = this;
	chesterGL.loadAsset('texture', properties['texture'], function () {
		_this.loadProperties(properties);
	});
};
goog.inherits(chesterGL.ParticleSystem, chesterGL.Block);

/**
 * @ignore
 * @type {boolean}
 */
chesterGL.ParticleSystem._shadersLoaded = false;

/**
 * Load the shaders for the particle system
 */
chesterGL.ParticleSystem.loadShaders = function () {
	chesterGL.initShader("particles", function (program) {
		var gl = chesterGL.gl;
		program.mvpMatrixUniform = gl.getUniformLocation(program, "uMVPMatrix");
		program.uSampler         = gl.getUniformLocation(program, "uSampler");
		program.u_time           = gl.getUniformLocation(program, "u_time");
		program.u_startColor     = gl.getUniformLocation(program, "u_startColor");
		program.u_endColor       = gl.getUniformLocation(program, "u_endColor");
		program.attribs = {
			'a_startPosition': gl.getAttribLocation(program, 'a_startPosition'),
			'a_lifetime'  : gl.getAttribLocation(program, 'a_lifetime'),
			'a_startTime'  : gl.getAttribLocation(program, 'a_startTime'),
			'a_startSize'  : gl.getAttribLocation(program, 'a_startSize'),
			'a_endSize'  : gl.getAttribLocation(program, 'a_endSize'),
			'a_speed'        : gl.getAttribLocation(program, 'a_speed')
		};
					
		// test for errors on gl
		var error = gl.getError();
		if (error != 0) {
			console.log("gl error: " + error);
		}
	});
	chesterGL.ParticleSystem._shadersLoaded = true;
}

/**
 * Is the system running? (set to false to stop it)
 * @type {boolean}
 */
chesterGL.ParticleSystem.prototype.running = true;
	
/**
 * particle texture
 * @type {?string}
 */
chesterGL.ParticleSystem.prototype.particleTexture = null;

/**
 * The rate of the emission (it is calculated as totalParticles / lifetime)
 * @type {number}
 */
chesterGL.ParticleSystem.prototype.emissionRate = 0;

/**
 * The timer that counts for the next emission
 * @type {number}
 */
chesterGL.ParticleSystem.prototype.emissionCounter = 0;

/**
 * The current number of living particles
 * @type {number}
 */
chesterGL.ParticleSystem.prototype.particleCount = 0;

/**
 * The current number of living particles
 * @type {number}
 */
chesterGL.ParticleSystem.prototype.maxParticles = 0;

/**
 * The duration of the whole system in seconds. Set it to < 0 to be infinte
 * @type {number}
 */
chesterGL.ParticleSystem.prototype.duration = 0;

/**
 * The lifetime of the particle (in seconds)
 * @type {number}
 */
chesterGL.ParticleSystem.prototype.lifetime = 0;

/**
 * The lifetime variance of the particle (in seconds)
 * @type {number}
 */
chesterGL.ParticleSystem.prototype.lifetimeVariance = 0;

/**
 * The starting color
 * @type {?goog.vec.Vec4.Type}
 */
chesterGL.ParticleSystem.prototype.startColor = null;

/**
 * The starting position variance
 * @type {?goog.vec.Vec3.Type}
 */
chesterGL.ParticleSystem.prototype.positionVariance = null;

/**
 * The end color
 * @type {?goog.vec.Vec4.Type}
 */
chesterGL.ParticleSystem.prototype.endColor = null;

/**
 * The particle speed
 * @type {?goog.vec.Vec3.Type}
 */
chesterGL.ParticleSystem.prototype.particleSpeed = null;

/**
 * The particle speed variance
 * @type {?goog.vec.Vec3.Type}
 */
chesterGL.ParticleSystem.prototype.particleSpeedVariance = null;

/**
 * The starting size
 * @type {number}
 */
chesterGL.ParticleSystem.prototype.startSize = 0.0;

/**
 * The starting size variance
 * @type {number}
 */
chesterGL.ParticleSystem.prototype.startSizeVariance = 0.0;

/**
 * The end size
 * @type {number}
 */
chesterGL.ParticleSystem.prototype.endSize = 0.0;

/**
 * The end size variance
 * @type {number}
 */
chesterGL.ParticleSystem.prototype.endSizeVariance = 0.0;

/**
 * @type {boolean}
 */
chesterGL.ParticleSystem.prototype.particleAdded = false;

/**
 * The current time of the system
 * @type {number}
 */
chesterGL.ParticleSystem.prototype.elapsedTime = 0;

/**
 * The blending options [src, dest]
 * @type {Array.<string>}
 */
chesterGL.ParticleSystem.prototype.blendOptions = ["SRC_ALPHA", "ONE_MINUS_SRC_ALPHA"];

/**
 * @param {Object} properties
 */
chesterGL.ParticleSystem.prototype.loadProperties = function (properties) {
	this.program = -1;
	if (!chesterGL.ParticleSystem._shadersLoaded) {
		chesterGL.ParticleSystem.loadShaders();
	}
	this.particleTexture = properties['texture'];
	this.maxParticles = properties['maxParticles'];
	this.duration = parseFloat(properties['duration']) * 1000.0;
	this.lifetime = parseFloat(properties['lifetime']) * 1000.0;
	this.lifetimeVariance = parseFloat(properties['lifetimeVariance']) * 1000.0;
	this.startColor = goog.vec.Vec4.createFloat32FromArray(properties['startColor']);
	this.positionVariance = goog.vec.Vec3.createFloat32FromArray(properties['positionVariance']);
	this.endColor = goog.vec.Vec4.createFloat32FromArray(properties['endColor']);
	this.particleSpeed = goog.vec.Vec3.createFloat32FromArray(properties['speed']);
	this.particleSpeedVariance = goog.vec.Vec3.createFloat32FromArray(properties['speedVariance']);
	this.startSize = parseFloat(properties['startSize']);
	this.startSizeVariance = parseFloat(properties['startSizeVariance']);
	this.endSize = parseFloat(properties['endSize']);
	this.endSizeVariance = parseFloat(properties['endSizeVariance']);
	this.elapsedTime = 0;
	this.blendOptions = properties['blendOptions'].slice(0); // copy the array
	this.running = true;
	
	this.glBuffer = chesterGL.gl.createBuffer();
	this.glBufferData = new Float32Array(this.maxParticles * BUFFER_ELEMENTS);
	this.resetParticles();
}

/**
 * adds a new particle (sets the lifetime in the data sent to the shader)
 */
chesterGL.ParticleSystem.prototype.addParticle = function () {
	var lifespan = Math.abs(this.lifetime + this.lifetimeVariance * (Math.random() * 2 - 1));
	this.initParticle(this.particleCount, lifespan, this.elapsedTime);
	this.particleCount++;
	this.particleAdded = true;
}

/**
 * @param {number} idx
 * @param {number=} lifetime
 * @param {number=} startTime
 */
chesterGL.ParticleSystem.prototype.initParticle = function (idx, lifetime, startTime) {
	var d = this.glBufferData;
	lifetime = lifetime || -1.0;
	startTime = startTime || 0.0;
	
	// lifetime, start time, start size, end size
	d[idx * BUFFER_ELEMENTS + 0] = lifetime;
	d[idx * BUFFER_ELEMENTS + 1] = startTime;
	d[idx * BUFFER_ELEMENTS + 2] = this.startSize + this.startSizeVariance * (Math.random() * 2 - 1);
	d[idx * BUFFER_ELEMENTS + 3] = this.endSize + this.endSizeVariance * (Math.random() * 2 - 1);
	
	// speed
	d[idx * BUFFER_ELEMENTS + 4] = this.particleSpeed[0] + this.particleSpeedVariance[0] * (Math.random() * 2 - 1);
	d[idx * BUFFER_ELEMENTS + 5] = this.particleSpeed[1] + this.particleSpeedVariance[1] * (Math.random() * 2 - 1);
	d[idx * BUFFER_ELEMENTS + 6] = this.particleSpeed[2] + this.particleSpeedVariance[2] * (Math.random() * 2 - 1);
	
	// start position
	d[idx * BUFFER_ELEMENTS + 7] = (Math.random() * 2 - 1) * this.positionVariance[0];
	d[idx * BUFFER_ELEMENTS + 8] = (Math.random() * 2 - 1) * this.positionVariance[1];
	d[idx * BUFFER_ELEMENTS + 9] = (Math.random() * 2 - 1) * this.positionVariance[2];
}

/**
 * reset particle data - this is slow!
 */
chesterGL.ParticleSystem.prototype.resetParticles = function () {
	var program = chesterGL.selectProgram("particles");
	var gl = chesterGL.gl;
	for (var i = 0; i < this.maxParticles; i++) {
		this.initParticle(i);
	}
	gl.uniform4fv(program.u_startColor, /** @type {Float32Array} */(this.startColor));
	gl.uniform4fv(program.u_endColor  , /** @type {Float32Array} */(this.endColor));
	gl.uniform1i(program.uSampler, 0);

	this.sendParticleData(program);
	
	this.particleCount = this.emissionCounter = 0;
	// how many particles are emitted per second
	this.emissionRate = this.maxParticles / Math.abs(this.lifetime);
}

/**
 * will send the particle data to the gpu
 * @param {WebGLProgram} program
 */
chesterGL.ParticleSystem.prototype.sendParticleData = function (program) {
	var gl = chesterGL.gl;
	gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.glBufferData, gl.STATIC_DRAW);
}

/**
 * @type {Float32Array}
 * @ignore
 */
var _ps_tmp = new Float32Array(BUFFER_ELEMENTS);

/**
 * The update loop for the particle system
 * @param {number} delta
 */
chesterGL.ParticleSystem.prototype.update = function (delta) {
	var program = chesterGL.selectProgram("particles");
	if (!program) {
		return;
	}
	this.elapsedTime += delta;

	// how many seconds until the next particle
	var rate = 1.0 / this.emissionRate;
	this.emissionCounter += delta;
	while (this.particleCount < this.maxParticles && this.emissionCounter > rate && this.running) {
		this.addParticle();
		this.emissionCounter -= rate;
	}

	for (var i = 0; i < this.maxParticles; i++) {
		var buffer = this.glBufferData;
		var idx = i * BUFFER_ELEMENTS;
		// if expired, move the (buffer) particle ahead
		if (buffer[idx] > 0 && (buffer[idx] + buffer[idx+1]) <= this.elapsedTime && i != this.particleCount - 1) {
			// copy the particle into the tmp buffer and invalidate
			var tmp = buffer.subarray(idx, idx + BUFFER_ELEMENTS);
			_ps_tmp.set(tmp);
			_ps_tmp[0] = -1.0;
			// shift the array from idx to particleCount
			tmp = buffer.subarray(idx + BUFFER_ELEMENTS, this.particleCount * BUFFER_ELEMENTS);
			buffer.set(tmp, idx);
			// copy the old particle in the last spot
			buffer.set(_ps_tmp, (this.particleCount-1) * BUFFER_ELEMENTS);
			// decrease the particle count
			this.particleCount --;
		}
	}

	if (this.duration > 0 && this.elapsedTime > this.duration) {
		this.running = false;
	}
}

chesterGL.ParticleSystem.prototype.render = function () {
	var program = chesterGL.selectProgram("particles");
	if (!program) {
		return;
	}
	var gl = chesterGL.gl;
	var texture = chesterGL.getAsset('texture', this.particleTexture);
	
	gl.enable(gl.BLEND);
	gl.blendFunc(gl[this.blendOptions[0]], gl[this.blendOptions[1]]);
	
	if (this.particleAdded) {
		this.sendParticleData(program);
		this.particleAdded = false;
	}
	
	// send the elapsed time
	gl.uniform1f(program.u_time, this.elapsedTime);
	
	// activate the texture
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture.tex);
	
	// bind buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer);
	gl.vertexAttribPointer(program.attribs['a_lifetime']     , 3, gl.FLOAT, false, PARTICLE_SIZE, 0);
	gl.vertexAttribPointer(program.attribs['a_startTime']    , 3, gl.FLOAT, false, PARTICLE_SIZE, 4);
	gl.vertexAttribPointer(program.attribs['a_startSize']    , 3, gl.FLOAT, false, PARTICLE_SIZE, 8);
	gl.vertexAttribPointer(program.attribs['a_endSize']      , 3, gl.FLOAT, false, PARTICLE_SIZE, 12);
	gl.vertexAttribPointer(program.attribs['a_speed']        , 3, gl.FLOAT, false, PARTICLE_SIZE, 16);
	gl.vertexAttribPointer(program.attribs['a_startPosition'], 3, gl.FLOAT, false, PARTICLE_SIZE, 28);
	
	// and draw:
	var transformDirty = (this.isTransformDirty || (this.parent && this.parent.isTransformDirty));
	if (transformDirty) {
		goog.vec.Mat4.multMat(chesterGL.pMatrix, this.mvMatrix, this.mvpMatrix);
	}
	gl.uniformMatrix4fv(program.mvpMatrixUniform, false, this.mvpMatrix);
	gl.drawArrays(gl.POINTS, 0, this.maxParticles);
}

goog.exportSymbol('chesterGL.ParticleSystem', chesterGL.ParticleSystem);
// properties
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'visible', chesterGL.ParticleSystem.prototype.visible);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'position', chesterGL.ParticleSystem.prototype.position);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'contentSize', chesterGL.ParticleSystem.prototype.contentSize);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'color', chesterGL.ParticleSystem.prototype.color);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'texture', chesterGL.ParticleSystem.prototype.texture);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'opacity', chesterGL.ParticleSystem.prototype.opacity);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'rotation', chesterGL.ParticleSystem.prototype.rotation);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'scale', chesterGL.ParticleSystem.prototype.scale);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'update', chesterGL.ParticleSystem.prototype.update);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'frame', chesterGL.ParticleSystem.prototype.frame);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'parent', chesterGL.ParticleSystem.prototype.parent);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'children', chesterGL.ParticleSystem.prototype.children);
// // class methods
goog.exportProperty(chesterGL.ParticleSystem, 'loadShaders', chesterGL.ParticleSystem.loadShaders);
// // instance methods
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'setFrame', chesterGL.ParticleSystem.prototype.setFrame);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'setContentSize', chesterGL.ParticleSystem.prototype.setContentSize);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'setScale', chesterGL.ParticleSystem.prototype.setScale);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'setColor', chesterGL.ParticleSystem.prototype.setColor);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'setTexture', chesterGL.ParticleSystem.prototype.setTexture);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'moveTo', chesterGL.ParticleSystem.prototype.moveTo);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'moveBy', chesterGL.ParticleSystem.prototype.moveBy);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'rotateTo', chesterGL.ParticleSystem.prototype.rotateTo);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'rotateBy', chesterGL.ParticleSystem.prototype.rotateBy);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'addChild', chesterGL.ParticleSystem.prototype.addChild);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'removeChild', chesterGL.ParticleSystem.prototype.removeChild);
goog.exportProperty(chesterGL.ParticleSystem.prototype, 'loadProperties', chesterGL.ParticleSystem.prototype.loadProperties);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'addParticle', chesterGL.ParticleSystem.prototype.addParticle);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'initParticle', chesterGL.ParticleSystem.prototype.initParticle);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'resetParticles', chesterGL.ParticleSystem.prototype.resetParticles);
// chesterGL.exportProperty(chesterGL.ParticleSystem.prototype, 'sendParticleData', chesterGL.ParticleSystem.prototype.sendParticleData);
