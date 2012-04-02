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
        
class CombinedSearch
    search: (keyword, callback) ->
        xhr = new XMLHttpRequest
        xhr.open "GET", "/doSearch?q=#{encodeURI(keyword)}", true
        xhr.onreadystatechange = ->
            if xhr.readyState is 4
                if xhr.status is 200
                    response = JSON.parse xhr.responseText
                    results = 
                        google: response.google.map (result) -> 
                            new GoogleSearchResult result
                        twitter: response.twitter.map (result) -> 
                            new TwitterSearchResult result
                    callback results
        xhr.send null


root = exports ? this
#NotebookJS = root.NotebookJS = root.NotebookJS ? {}
#NotebookJS.util = NotebookJS.util ? {}

#$ = jQuery

$ ->
    @doSearch = ->

        kw = $("#searchQuery").val()
        console.log("Search launched with keyword: #{ kw }" )
        appender = (id, data) ->
            data.forEach (x) -> 
                identifier = '#' + id
                $("<p>#{x.toHtml()}</p>").appendTo($(identifier))

        cs = new CombinedSearch
        cs.search kw, (results) ->
            appender("gr", results.google)
            appender("tr", results.twitter)
            
    $("#searchQuery").keyup (event) ->
        #console.log(event)
        $('#searchButton').click() if event.keyCode == 13

