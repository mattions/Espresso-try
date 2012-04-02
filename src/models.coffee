class SearchResult
    constructor: (data) ->
        @title = data.title
        @link = data.link
        @extras = data
    
    toHtml: -> "<a href='#{@link}'>#{@title}</a>"
    toJson: -> JSON.stringify @extras
    
class GoogleSearchResult extends SearchResult
    constructor: (data) ->
        super data
        @content = @extras.content
    toHtml: ->
        "#{super} <div class='snippet'>#{@content}</div>"

class TwitterSearchResult extends SearchResult
    constructor: (data) ->
        super data
        @source = @extras.from_user
        @link = "http://twitter.com/#{@source}/status/#{@extras.id_str}"
        @title = @extras.text
    toHtml: ->
        "<a href='http://twitter.com/#{@source}'>@#{@source}</a>: #{super}"
