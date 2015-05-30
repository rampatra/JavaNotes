module Jekyll
  class RenderImgTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @url , *@val= text.split(/ /)
      if @val.length > 0
        @width , *@height = @val[0].split(/x/)
      end

      @img_style = "width:#{@width}px;"

      if @height.length > 0
        @img_style = @img_style + "height:#{@height[0]}px;"
      end
    end

    def render(context)
      "<img src=\"#{@url}\" style=\"#{@img_style}\">"
    end
  end
end

Liquid::Template.register_tag('img', Jekyll::RenderImgTag)