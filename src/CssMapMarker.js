/**
 * CssMapMarker.js - CSS Driven Markers With Google Maps 
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

function CssMapMarker(opts)
{
    // assign all of the passed in options to the this marker
    // options should be accessible as 'this.optname'
    this.setValues(opts);

    // this will hold the div that gets created in the onAdd function
    this._div = null;
    this._clickEvent = null;

    if (this.marker)
    {
        this.bindTo('position', this.marker, 'position');
    }
}

// this is where the CssMapMarker object inherits everything the overlay view has
CssMapMarker.prototype = new google.maps.OverlayView();

CssMapMarker.prototype.onAdd = function() {
    // create the css marker container
    var div = document.createElement('div');
    this._div = div;

    // apply options to the div
    div.className = (this.className) ? this.className : 'cssmapmarker'; // apply a default class if needed
    if (this.id) div.setAttribute('id', this.id);
    if (this.innerHTML) div.innerHTML = this.innerHTML;

    var self = this;
    this._clickEvent = google.maps.event.addDomListener(div, 'click', function() { 
        google.maps.event.trigger(self, 'click'); 
    });

    // add the map to the display
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);

    // call the onAdded callback if one is available
    if (typeof(this.onAdded) == 'function') 
    {
        this.onAdded();
    }
}

CssMapMarker.prototype.draw = function() {

    // work out a position for the element in here
    // it should be bound to a marker so we can get the position of the marker
    var projection = this.getProjection();
    var position = projection.fromLatLngToDivPixel(this.get('position'));

    // position the element at coordinate of the marker. 0,0 of the element
    var div = this._div;
    div.style.left = position.x + 'px';
    div.style.top = position.y + 'px';
    div.style.display = 'block';

    // call the onDrawn callback if one is available
    if (typeof(this.onDrawn) == 'function') 
    {
        this.onDrawn();
    }
}

CssMapMarker.prototype.onRemove = function() {

    // remove the div and any associated event handlers created along the way

    this._div.parentNode.removeChild(this._div);

    google.maps.event.removeDomListener(this._clickEvent);
}

CssMapMarker.prototype.getContainer = function() {
    // provide external access to the container div
    return this._div;
}