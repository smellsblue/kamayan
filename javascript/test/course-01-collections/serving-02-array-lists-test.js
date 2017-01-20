"use strict";

// For this serving, you will be implementing your own version of the Array
// class. You can find a stub of the class in lib/array-list.js, while the tests
// here will help ensure you have implemented the core features.
//
// You may only use the FixedArray class for storing the contents of the
// ArrayList. Do not be afraid to add new methods as you see fit, but keep any
// new methods private (since JavaScript doesn't have a real private mechanism,
// you can accomplish this with the convention of prefixing the method with an
// underscore, like _privateMethod).
//
// Starting with this serving, all tests are skipped. You must delete the .skip
// call on each test as you are ready to run it.
//
// Further instructions can be found inside the ArrayList class.
//
// Diagram of an array list as it grows:
//
//   @size = 3
//
//   +---+---+---+---+---+---+---+---+---+---+
//   | a | b | c |   |   |   |   |   |   |   |
//   +---+---+---+---+---+---+---+---+---+---+
//
//
//   @size = 9
//
//   +---+---+---+---+---+---+---+---+---+---+
//   | a | b | c | d | e | f | g | h | i |   |
//   +---+---+---+---+---+---+---+---+---+---+
//
//
//   @size = 12
//
//   +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
//   | a | b | c | d | e | f | g | h | i | j | k | l |   |   |   |   |   |   |   |   |
//   +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
suite("ArrayList");

test("add exists", function() {
    assert.methodExists(ArrayList, "add", 1);
});

test("add increases the size", function() {
    var list = new ArrayList();
    list.add(42);
    assert.equal(1, list.size());
    list.add(43);
    assert.equal(2, list.size());
});

test("add adds to the end", function() {
    var list = new ArrayList();
    list.add(42);
    list.add(43);
    assert.equal(42, list.get(0));
    assert.equal(43, list.get(1));
});

test("add returns self so that it is chainable", function() {
    var list = new ArrayList();
    list.add(42).add(43);
    assert.equal(42, list.get(0));
    assert.equal(43, list.get(1));
});

test("prepend exists", function() {
    assert.methodExists(ArrayList, "prepend", 1);
});

test("prepend increases the size", function() {
    var list = new ArrayList();
    list.prepend(42);
    assert.equal(1, list.size());
    list.prepend(43);
    assert.equal(2, list.size());
});

test("prepend adds to the beginning", function() {
    var list = new ArrayList();
    list.prepend(42);
    list.prepend(43);
    assert.equal(43, list.get(0));
    assert.equal(42, list.get(1));
});

test("prepend returns self so that it is chainable", function() {
    var list = new ArrayList();
    list.prepend(42).prepend(43);
    assert.equal(43, list.get(0));
    assert.equal(42, list.get(1));
});

test("add and prepend are chainable together", function() {
    var list = new ArrayList();
    list.add(42).add(43).prepend(2).prepend(1);
    assert.equal(1, list.get(0));
    assert.equal(2, list.get(1));
    assert.equal(42, list.get(2));
    assert.equal(43, list.get(3));
});

test("chained add and prepend increases the size", function() {
    var list = new ArrayList();
    list.add(42).add(43).prepend(2).prepend(1);
    assert.equal(4, list.size());
});

test("add can be called a lot", function() {
    var list = new ArrayList();
    Kamayan.times(100, () => { list.add(42); });
    assert.equal(100, list.size());
    Kamayan.times(100, (i) => { assert.equal(42, list.get(i)); });
});

test("prepend can be called a lot", function() {
    var list = new ArrayList();
    Kamayan.times(100, () => { list.prepend(42); });
    assert.equal(100, list.size());
    Kamayan.times(100, (i) => { assert.equal(42, list.get(i)); });
});

test("index get cannot go outside the bounds of the array", function() {
    var list = new ArrayList();
    assert.throws(() => { list.get(-1); }, IndexError);
    assert.throws(() => { list.get(-42); }, IndexError);
    assert.throws(() => { list.get(0); }, IndexError);
    assert.throws(() => { list.get(1); }, IndexError);
    list.add(1);
    list.get(0); // No error now that the index is valid
    assert.throws(() => { list.get(1); }, IndexError);
});

test("index get can retrieve any element", function() {
    var list = new ArrayList().add(1).add(2).add(42).add(43);
    assert.equal(1, list.get(0));
    assert.equal(2, list.get(1));
    assert.equal(42, list.get(2));
    assert.equal(43, list.get(3));
});

test("index set exists", function() {
    assert.methodExists(ArrayList, "set", 2);
});

test("index set cannot use negative number", function() {
    var list = new ArrayList();
    assert.throws(() => { list.set(-1, 1); }, IndexError);
    assert.throws(() => { list.set(-42, 1); }, IndexError);
    assert.equal(0, list.size());
});

test("index set can use existing indexes", function() {
    var list = new ArrayList().add(0).add(1).add(2).add(3);
    list.set(0, 1);
    list.set(1, 2);
    list.set(2, 3);
    list.set(3, 4);
    Kamayan.times(4, (i) => { assert.equal(i + 1, list.get(i)); });
});

test("index set can add elements to the end of the list", function() {
    var list = new ArrayList();
    list.set(0, 1);
    list.set(1, 2);
    list.set(2, 3);
    list.set(3, 4);
    Kamayan.times(4, (i) => { assert.equal(i + 1, list.get(i)); });
});

test("index set can use distant indexes", function() {
    var list = new ArrayList();
    list.set(42, 1);
    list.set(142, 2);
    list.set(1042, 3);
    Kamayan.range(0, 41, (i) => { assert.isNull(list.get(i)); });
    Kamayan.range(43, 141, (i) => { assert.isNull(list.get(i)); });
    Kamayan.range(143, 1041, (i) => { assert.isNull(list.get(i)); });
    assert.equal(1, list.get(42));
    assert.equal(2, list.get(142));
    assert.equal(3, list.get(1042));
});

test("index set with the next available index updates the size", function() {
    var list = new ArrayList();
    list.set(0, 1);
    assert.equal(1, list.size());
    list.set(1, 2);
    assert.equal(2, list.size());
    list.set(2, 3);
    assert.equal(3, list.size());
    list.set(3, 4);
    assert.equal(4, list.size());
});

test("index set with existing indexes doesnt update the size", function() {
    var list = new ArrayList().add(0).add(1).add(2).add(3);
    list.set(0, 1);
    assert.equal(4, list.size());
    list.set(1, 2);
    assert.equal(4, list.size());
    list.set(2, 3);
    assert.equal(4, list.size());
    list.set(3, 4);
    assert.equal(4, list.size());
});

test("index set with distant indexes updates the size", function() {
    var list = new ArrayList();
    list.set(42, 1);
    assert.equal(43, list.size());
    list.set(142, 2);
    assert.equal(143, list.size());
    list.set(1042, 3);
    assert.equal(1043, list.size());
});

test("set returns null if the previous value was null", function() {
    var list = new ArrayList().add(null);
    assert.isNull(list.set(0, 42));
});

test("set returns null if the index is beyond the current size", function() {
    var list = new ArrayList();
    assert.isNull(list.set(0, 42));
    assert.isNull(list.set(42, 43));
});

test("set returns the previous value", function() {
    var list = new ArrayList().add(1).add(2).add(3);
    assert.equal(1, list.set(0, 42));
    assert.equal(42, list.set(0, 43));
    assert.equal(2, list.set(1, 44));
    assert.equal(3, list.set(2, 45));
});

test("delete exists", function() {
    assert.methodExists(ArrayList, "delete", 1);
});

test("delete cannot delete outside the bounds of the array list", function() {
    var list = new ArrayList().add(1).add(2).add(3);
    assert.throws(() => { list.delete(-1); }, IndexError);
    assert.throws(() => { list.delete(-42); }, IndexError);
    assert.throws(() => { list.delete(3); }, IndexError);
    assert.throws(() => { list.delete(42); }, IndexError);
});

test("delete removes the element", function() {
    var list = new ArrayList().add(1).add(2).add(3);
    list.delete(1);
    assert.equal(1, list.get(0));
    assert.equal(3, list.get(1));
});

test("delete updates the size", function() {
    var list = new ArrayList().add(1).add(2).add(3);
    list.delete(1);
    assert.equal(2, list.size());
    list.delete(0);
    assert.equal(1, list.size());
    list.delete(0);
    assert.equal(0, list.size());
});

test("delete returns the element at the index", function() {
    var list = new ArrayList().add(1).add(2).add(3);
    assert.equal(1, list.delete(0));
    assert.equal(3, list.delete(1));
    assert.equal(2, list.delete(0));
});

test("delete can be called a lot", function() {
    var list = new ArrayList();
    Kamayan.times(100, () => { list.add(42); });
    Kamayan.times(100, () => { list.delete(0); });
    assert.equal(0, list.size());
});

test("delete can delete from a full array", function() {
    var list = new ArrayList();
    var internalArray = list._array;
    list._size = internalArray.size();
    Kamayan.times(internalArray.size(), (i) => { internalArray.set(i, 42); });
    assert.equal(42, list.delete(5));
    assert.equal(9, list.size());
});

test("delete doesnt leave deleted elements in the array", function() {
    var list = new ArrayList();
    var internalArray = list._array;
    list._size = internalArray.size();
    Kamayan.times(internalArray.size(), (i) => { internalArray.set(i, 42); });
    assert.equal(42, list.delete(5));
    assert.equal(9, list.size());
    assert.isNull(list._array.get(9));
});
