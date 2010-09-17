/**
 * CssMapMarker.js - CSS Driven Markers With Google Maps 
 *
 * http://gist.github.com/581678
 *
 * Copyright (c) 2010 Chris Gutierrez
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function CssMapMarker(a){this.setValues(a);this._div=null;this._clickEvent=null;if(this.marker){this.bindTo("position",this.marker,"position")}}CssMapMarker.prototype=new google.maps.OverlayView();CssMapMarker.prototype.onAdd=function(){var c=document.createElement("div");this._div=c;c.className=(this.className)?this.className:"cssmapmarker";if(this.id){c.setAttribute("id",this.id)}if(this.innerHTML){c.innerHTML=this.innerHTML}var a=this;this._clickEvent=google.maps.event.addDomListener(c,"click",function(){google.maps.event.trigger(a,"click")});var b=this.getPanes();b.overlayLayer.appendChild(c);if(typeof(this.onAdded)=="function"){this.onAdded()}};CssMapMarker.prototype.draw=function(){var b=this.getProjection();var a=b.fromLatLngToDivPixel(this.get("position"));var c=this._div;c.style.left=a.x+"px";c.style.top=a.y+"px";c.style.display="block";if(typeof(this.onDrawn)=="function"){this.onDrawn()}};CssMapMarker.prototype.onRemove=function(){this._div.parentNode.removeChild(this._div);google.maps.event.removeDomListener(this._clickEvent)};CssMapMarker.prototype.getContainer=function(){return this._div};