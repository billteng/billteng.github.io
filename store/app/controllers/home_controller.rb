class HomeController < ApplicationController
  layout "my_layouts"

  def index
    @name = "Bill"
    @items = ["Apple", "Orange", "Banana"]
  end
end
