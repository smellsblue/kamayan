package com.on_site.kamayan.course_01_collections;

import com.on_site.kamayan.TestCase;

import org.junit.Test;

/**
 * The Object[] class in Java represents a fixed block of memory that will let
 * you store any object within the block. The size of these objects cannot be
 * changed once they are created.
 *
 * These tests are to help familiarize you with Object[]. You will be using it
 * in further servings to implement other familiar data sets.
 */
public class Serving_01_FixedArraysTest extends TestCase {
    @Test
    public void aFixedArrayHasASizeSpecifiedWhenItIsCreated() {
        assertEquals(0, new Object[0].length);
        assertEquals(1, new Object[1].length);
        assertEquals(42, new Object[42].length);
    }

    @Test
    public void valuesCanBeSetAndRetrieved() {
        Object[] array = new Object[3];

        array[0] = 1;
        array[1] = 2;
        array[2] = 42;

        assertEquals(1, array[0]);
        assertEquals(2, array[1]);
        assertEquals(42, array[2]);
    }

    @Test
    public void initialValuesAreNull() {
        Object[] array = new Object[3];
        assertEquals(null, array[0]);
        assertEquals(null, array[1]);
        assertEquals(null, array[2]);
    }

    @Test
    public void gettingAndSettingAtAnIndexMustBeWithinTheBoundsOfTheInitialSize() {
        Object[] array = new Object[5];
        assertThrows(ArrayIndexOutOfBoundsException.class, () -> { Object x = array[-1]; });
        assertThrows(ArrayIndexOutOfBoundsException.class, () -> { Object x = array[5]; });
        assertThrows(ArrayIndexOutOfBoundsException.class, () -> array[-1] = 1);
        assertThrows(ArrayIndexOutOfBoundsException.class, () -> array[5] = 42);
    }
}
