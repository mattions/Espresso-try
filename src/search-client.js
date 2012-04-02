(function() {
  var CombinedSearch, GoogleSearchResult, SearchResult, TwitterSearchResult, root,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  SearchResult = (function() {

    function SearchResult(data) {
      this.title = data.title;
      this.link = data.link;
      this.extras = data;
    }

    SearchResult.prototype.toHtml = function() {
      return "<a href='" + this.link + "'>" + this.title + "</a>";
    };

    SearchResult.prototype.toJson = function() {
      return JSON.stringify(this.extras);
    };

    return SearchResult;

  })();

  GoogleSearchResult = (function(_super) {

    __extends(GoogleSearchResult, _super);

    function GoogleSearchResult(data) {
      GoogleSearchResult.__super__.constructor.call(this, data);
      this.content = this.extras.content;
    }

    GoogleSearchResult.prototype.toHtml = function() {
      return "" + GoogleSearchResult.__super__.toHtml.apply(this, arguments) + " <div class='snippet'>" + this.content + "</div>";
    };

    return GoogleSearchResult;

  })(SearchResult);

  TwitterSearchResult = (function(_super) {

    __extends(TwitterSearchResult, _super);

    function TwitterSearchResult(data) {
      TwitterSearchResult.__super__.constructor.call(this, data);
      this.source = this.extras.from_user;
      this.link = "http://twitter.com/" + this.source + "/status/" + this.extras.id_str;
      this.title = this.extras.text;
    }

    TwitterSearchResult.prototype.toHtml = function() {
      return "<a href='http://twitter.com/" + this.source + "'>@" + this.source + "</a>: " + TwitterSearchResult.__super__.toHtml.apply(this, arguments);
    };

    return TwitterSearchResult;

  })(SearchResult);

  CombinedSearch = (function() {

    function CombinedSearch() {}

    CombinedSearch.prototype.search = function(keyword, callback) {
      var xhr;
      xhr = new XMLHttpRequest;
      xhr.open("GET", "/doSearch?q=" + (encodeURI(keyword)), true);
      xhr.onreadystatechange = function() {
        var response, results;
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            response = JSON.parse(xhr.responseText);
            results = {
              google: response.google.map(function(result) {
                return new GoogleSearchResult(result);
              }),
              twitter: response.twitter.map(function(result) {
                return new TwitterSearchResult(result);
              })
            };
            return callback(results);
          }
        }
      };
      return xhr.send(null);
    };

    return CombinedSearch;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  $(function() {
    this.doSearch = function() {
      var appender, cs, kw;
      kw = $("#searchQuery").val();
      console.log("Search launched with keyword: " + kw);
      appender = function(id, data) {
        return data.forEach(function(x) {
          var identifier;
          identifier = '#' + id;
          return $("<p>" + (x.toHtml()) + "</p>").appendTo($(identifier));
        });
      };
      cs = new CombinedSearch;
      return cs.search(kw, function(results) {
        appender("gr", results.google);
        return appender("tr", results.twitter);
      });
    };
    return $("#searchQuery").keyup(function(event) {
      if (event.keyCode === 13) return $('#searchButton').click();
    });
  });

}).call(this);
