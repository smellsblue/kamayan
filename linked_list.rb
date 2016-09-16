class LinkedList
  attr_reader :size

  def initialize
    @head = nil
    @size = 0
  end

  # Use this nested class for storing the values of the LinkedList. Each
  # LinkedList::Node contains the value at its index, and a link to the
  # LinkedList::Node at the next index (caled the "child" here). If the child is
  # nil, that denotes the last element of the LinkedList.
  class Node
    attr_accessor :value, :child

    def initialize(value, child = nil)
      @value = value
      @child = child
    end
  end

  def >>(value)
    if @head
      new_head = LinkedList::Node.new(value, @head)
      @head = new_head
    else
      @head = LinkedList::Node.new(value)
    end

    @size += 1
    self
  end

  def <<(value)
    if @head
      find_node(size - 1).child = LinkedList::Node.new(value)
    else
      @head = LinkedList::Node.new(value)
    end

    @size += 1
    self
  end

  def delete(index)
    check_bounds(index)

    if index == 0
      result = @head.value
      @head = @head.child
    else
      prev = find_node(index - 1)
      result = prev.child.value
      prev.child = prev.child.child
    end

    @size -= 1
    result
  end

  def [](index)
    check_bounds(index)
    find_node(index).value
  end

  def []=(index, value)
    check_lower_bound(index)
    self << nil if @head.nil?

    if index >= size
      last_node = find_node(size - 1)

      while index >= size
        last_node.child = LinkedList::Node.new(nil)
        last_node = last_node.child
        @size += 1
      end

      last_node.value = value
    else
      find_node(index).value = value
    end
  end

  private

  def find_node(index)
    node = @head
    0.upto(index - 1) { node = node.child }
    node
  end

  def check_bounds(index)
    check_lower_bound(index)
    check_upper_bound(index)
  end

  def check_lower_bound(index)
    raise IndexError, "Invalid index: #{index}" if index < 0
  end

  def check_upper_bound(index)
    raise IndexError, "Invalid index: #{index}" if index >= size
  end
end
