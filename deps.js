/**
 * ChesterGL - Simple 2D WebGL demo/library
 *
 * Copyright (c) 2010-2011 Rolando Abarca
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
 */

/**
 * @fileoverview Externs for ChesterGL
 *
 * @see https://github.com/funkaster/ChesterGL
 * @externs
 */

// external - request animation frame for different browsers and window.WebGLDebugUtils

/**
 * @param {function()} callback
 * @param {Element=} element
 */
window.requestAnimationFrame = function (callback, element) {};

/**
 * @param {function()} callback
 * @param {Element=} element
 */
window.webkitRequestAnimationFrame = function (callback, element) {};

/**
 * @param {function()} callback
 * @param {Element=} element
 */
window.mozRequestAnimationFrame = function (callback, element) {};

/**
 * @param {function()} callback
 * @param {Element=} element
 */
window.oRequestAnimationFrame = function (callback, element) {};

/**
 * @param {function()} callback
 * @param {Element=} element
 */
window.msRequestAnimationFrame = function (callback, element) {};

/**
 * @namespace
 */
var WebGLDebugUtils;

/**
 * @param {WebGLRenderingContext} ctx
 * @param {function(Object, string, Object)=} callback
 * @return {WebGLRenderingContext}
 */
WebGLDebugUtils.makeDebugContext = function (ctx, callback) {};

/**
 * @param {number} err
 * @return {string}
 */
WebGLDebugUtils.glEnumToString = function (err) {};
