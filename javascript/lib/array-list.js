"use strict";

var FixedArray = require("./fixed-array"),
    IndexError = require("./index-error");

function ArrayList() {
    this._array = new FixedArray(10);
    this._size = 0;
}

ArrayList.prototype.size = function() {
    return this._size;
};

ArrayList.prototype.get = function(index) {
    this._checkBounds(index);
    return this._array.get(index);
};

ArrayList.prototype.add = function(value) {
    this._expandIfRequired(this._size + 1);
    this._array.set(this._size, value);
    this._size++;
    return this;
};

ArrayList.prototype.prepend = function(value) {
    this._expandIfRequired(this._size + 1);
    this._shift();
    this._array.set(0, value);
    this._size++;
    return this;
};

ArrayList.prototype.delete = function(index) {
    this._checkBounds(index);
    var originalValue = this._array.get(index);
    this._shiftDown(index);
    this._size--;
    this._array.set(this._size, null);
    return originalValue;
};

ArrayList.prototype.set = function(index, value) {
    this._checkLowerBound(index);
    this._expandIfRequired(index + 1);
    var originalValue = this._array.get(index);
    this._array.set(index, value);

    if (index >= this._size) {
        this._size = index + 1;
    }

    return originalValue;
};

ArrayList.prototype._shift = function() {
    for (var i = this._size; i > 0; i--) {
        this._array.set(i, this._array.get(i - 1));
    }
};

ArrayList.prototype._shiftDown = function(index) {
    for (var i = index; i < this._array.size() - 1; i++) {
        this._array.set(i, this._array.get(i + 1));
    }
};

ArrayList.prototype._expandIfRequired = function(newSize) {
    while (newSize > this._array.size()) {
        var oldArray = this._array;
        this._array = new FixedArray(oldArray.size() * 2);

        for (var i = 0; i < oldArray.size(); i++) {
            this._array.set(i, oldArray.get(i));
        }
    }
};

ArrayList.prototype._checkBounds = function(index) {
    this._checkLowerBound(index);
    this._checkUpperBound(index);
};

ArrayList.prototype._checkLowerBound = function(index) {
    if (index < 0) {
        throw new IndexError("Invalid index: " + index);
    }
};

ArrayList.prototype._checkUpperBound = function(index) {
    if (index >= this.size()) {
        throw new IndexError("Invalid index: " + index);
    }
};

module.exports = ArrayList;
