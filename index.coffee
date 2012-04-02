doctype 5
html ->
  head ->
    meta charset: 'utf-8'
    title 'Espresso try'
    #link rel: 'stylesheet', href: 'lib/bootstrap-2.0.2/css/slate-bootstrap.min.css'
    link rel: 'stylesheet', href: 'lib/bootstrap-2.0.2/css/cerulan-bootstrap.min.css'
    #link rel: 'stylesheet', href: 'lib/bootstrap-2.0.2/css/bootstrap.min.css'
    script src: 'lib/bootstrap-2.0.2/js/bootstrap.min.js'
    #script src: 'models.js'

    
  body '.container', ->
    h1 -> "Everybody loves header."
    p -> "This is the first paragraph of this website, to play around and have fun."
