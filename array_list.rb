class ArrayList
  attr_reader :size

  def initialize
    @array = FixedArray.new(10)
    @size = 0
  end

  def [](index)
    check_bounds(index)
    @array[index]
  end

  def <<(value)
    self[size] = value
    self
  end

  def >>(value)
    resize_array(size + 1)
    (size - 1).downto(0) { |i| @array[i + 1] = @array[i] }
    @array[0] = value
    @size += 1
    self
  end

  def delete(index)
    result = self[index]
    index.upto(size - 1) { |i| @array[i] = @array[i + 1] }
    @size -= 1
    result
  end

  def []=(index, value)
    check_lower_bound(index)
    resize_array(index + 1)
    @array[index] = value
    @size = index + 1 if index >= size
  end

  private

  def resize_array(required_size)
    return if @array.size >= required_size
    new_array = FixedArray.new(required_size + 10)
    0.upto(@array.size - 1) { |i| new_array[i] = @array[i] }
    @array = new_array
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
