package com.on_site.kamayan.collections;

import com.on_site.kamayan.Kamayan;

public class ArrayList {
    private Object[] array;
    private int size;

    public ArrayList() {
        array = new Object[10];
        size = 0;
    }

    public int size() {
        return size;
    }

    public Object get(int index) {
        checkBounds(index);
        return array[index];
    }

    public ArrayList add(Object value) {
        expandIfNeeded();
        array[size()] = value;
        size++;
        return this;
    }

    public ArrayList prepend(Object value) {
        expandIfNeeded();
        shift();
        array[0] = value;
        size++;
        return this;
    }

    public Object delete(int index) {
        checkBounds(index);
        Object originalValue = array[index];
        shiftDown(index);
        size--;
        array[size()] = null;
        return originalValue;
    }

    public Object set(int index, Object value) {
        checkLowerBound(index);
        expandIfNeeded(index + 1);
        Object originalValue = array[index];
        array[index] = value;

        if (index >= size()) {
            size = index + 1;
        }

        return originalValue;
    }

    private void expandIfNeeded() {
        expandIfNeeded(size() + 1);
    }

    private void expandIfNeeded(int newSize) {
        if (newSize <= array.length) {
            return;
        }

        Object[] originalArray = array;
        int newLength = originalArray.length * 2;

        while (newLength < newSize) {
            newLength *= 2;
        }

        array = new Object[newLength];

        for (int i = 0; i < originalArray.length; i++) {
            array[i] = originalArray[i];
        }
    }

    private void shift() {
        for (int i = array.length - 1; i > 0; i--) {
            array[i] = array[i - 1];
        }
    }

    private void shiftDown(int index) {
        for (int i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
    }

    private void checkBounds(int index) {
        checkLowerBound(index);
        checkUpperBound(index);
    }

    private void checkLowerBound(int index) {
        if (index < 0) {
            throw new IndexOutOfBoundsException("Invalid index: " + index);
        }
    }

    private void checkUpperBound(int index) {
        if (index >= size()) {
            throw new IndexOutOfBoundsException("Invalid index: " + index);
        }
    }
}
