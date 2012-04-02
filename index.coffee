doctype 5
html ->
  head ->
    meta charset: 'utf-8'
    title 'Espresso try'
    script src: "lib/jquery-1.7.2.js"
    #script src: 'lib/bootstrap-2.0.2/js/bootstrap.js'
    script src: 'src/search-client.js'
    #link rel: 'stylesheet', href: 'lib/bootstrap-2.0.2/css/slate-bootstrap.min.css'
    link rel: 'stylesheet', href: 'lib/bootstrap-2.0.2/css/cerulan-bootstrap.min.css'
    #link rel: 'stylesheet', href: 'lib/bootstrap-2.0.2/css/bootstrap.min.css'

  body '.container', ->
    h1 -> "Everybody loves header."
    p -> "This is the first paragraph of this website, to play around and have fun."
    div -> 
        form class: 'well, form-search', -> 
            fieldset ->
                label for: "searchQuery", -> "Keyword:"
                
                input id: 'searchQuery', type: 'text', class: 'input-medium search-query', 
                placeholder: 'e.g.: foobar',
                
                input id: 'StackOverflow1370021', value:'Fix the lonely form', style: 'display:none',
                
                input id: 'searchButton', type: 'button', class: 'btn', value: "Search", 
                onclick: "doSearch()"

    div class: 'goog', id: 'gr', -> 
    div class: 'twit', id: 'tr', ->
        
        
