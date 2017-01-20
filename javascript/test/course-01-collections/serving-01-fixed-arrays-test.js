"use strict";

// In JavaScript, the Array class represents a collection of items. However, an
// Array in JavaScript is not like the arrays in other languages. Typically, an
// array in another language represents a fixed block of memory for storing
// multiple copies of a certain type of object. The size of the array cannot
// change once it has been created.
//
// The JavaScript Array is much more like the Java ArrayList. The size of an
// ArrayList is malleable just like a JavaScript Array; items can be added and
// removed at any time.
//
// The FixedArray class represents the raw array you would find in languages
// like Java. It is implemented in lib/fixed-array.js. These tests are to help
// familiarize you with the concept. Take a look at how it is implemented once
// you have finished this serving of the Kamayan. You will be using it in
// further servings to implement other familiar data sets.
suite("FixedArray");

test("a fixed array has a size specified when it is created", function() {
    assert.equal(0, new FixedArray(0).size());
    assert.equal(1, new FixedArray(1).size());
    assert.equal(42, new FixedArray(42).size());
});

test("values can be set and retrieved", function() {
    var array = new FixedArray(3);

    array.set(0, 1);
    array.set(1, 2);
    array.set(2, 42);

    assert.equal(1, array.get(0));
    assert.equal(2, array.get(1));
    assert.equal(42, array.get(2));
});

test("initial values are null", function() {
    var array = new FixedArray(3);
    assert.equal(null, array.get(0));
    assert.equal(null, array.get(1));
    assert.equal(null, array.get(2));
});

test("getting and setting at an index must be within the bounds of the initial size", function() {
    var array = new FixedArray(5);
    assert.throws(() => { array.get(-1); }, IndexError);
    assert.throws(() => { array.get(5); }, IndexError);
    assert.throws(() => { array.set(-1, 1); }, IndexError);
    assert.throws(() => { array.set(5, 42); }, IndexError);
});
