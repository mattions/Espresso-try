(function() {
  var GoogleSearchResult, MockSearch, SearchResult, TwitterSearchResult, mockGoogleData, mockTwitterData,
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

  mockGoogleData = [
    {
      GsearchResultClass: "GwebSearch",
      link: "http://jashkenas.github.com/coffee-script/",
      url: "http://jashkenas.github.com/coffee-script/",
      visibleUrl: "jashkenas.github.com",
      cacheUrl: "http://www.google.com/search?q\u003dcache:nuWrlCK4-v4J:jashkenas.github.com",
      title: "\u003cb\u003eCoffeeScript\u003c/b\u003e",
      titleNoFormatting: "CoffeeScript",
      content: "\u003cb\u003eCoffeeScript\u003c/b\u003e is a little language that compiles into JavaScript. Underneath all of   those embarrassing braces and semicolons, JavaScript has always had a \u003cb\u003e...\u003c/b\u003e"
    }, {
      GsearchResultClass: "GwebSearch",
      link: "http://en.wikipedia.org/wiki/CoffeeScript",
      url: "http://en.wikipedia.org/wiki/CoffeeScript",
      visibleUrl: "en.wikipedia.org",
      cacheUrl: "http://www.google.com/search?q\u003dcache:wshlXQEIrhIJ:en.wikipedia.org",
      title: "\u003cb\u003eCoffeeScript\u003c/b\u003e - Wikipedia, the free encyclopedia",
      titleNoFormatting: "CoffeeScript - Wikipedia, the free encyclopedia",
      content: "\u003cb\u003eCoffeeScript\u003c/b\u003e is a programming language that transcompiles to JavaScript. The   language adds syntactic sugar inspired by Ruby, Python and Haskell to enhance \u003cb\u003e...\u003c/b\u003e"
    }, {
      GsearchResultClass: "GwebSearch",
      link: "http://codelikebozo.com/why-im-switching-to-coffeescript",
      url: "http://codelikebozo.com/why-im-switching-to-coffeescript",
      visibleUrl: "codelikebozo.com",
      cacheUrl: "http://www.google.com/search?q\u003dcache:VDKirttkw30J:codelikebozo.com",
      title: "Why I\u0026#39;m (Finally) Switching to \u003cb\u003eCoffeeScript\u003c/b\u003e - Code Like Bozo",
      titleNoFormatting: "Why I\u0026#39;m (Finally) Switching to CoffeeScript - Code Like Bozo",
      content: "Sep 5, 2011 \u003cb\u003e...\u003c/b\u003e You may have already heardabout \u003cb\u003eCoffeeScript\u003c/b\u003e and some of the hype surrounding itbut you still have found several reasons to not make the \u003cb\u003e...\u003c/b\u003e"
    }
  ];

  mockTwitterData = [
    {
      created_at: "Wed, 09 Nov 2011 04:18:49 +0000",
      from_user: "jashkenas",
      from_user_id: 123323498,
      from_user_id_str: "123323498",
      geo: null,
      id: 134122748057370625,
      id_str: "134122748057370625",
      iso_language_code: "en",
      metadata: {
        recent_retweets: 4,
        result_type: "popular"
      },
      profile_image_url: "http://a3.twimg.com/profile_images/1185870726/gravatar_normal.jpg",
      source: "blah",
      text: "'CoffeeScript [is] the closest I felt to the power I had twenty years ago in Smalltalk' - Ward Cunningham (http://t.co/2Wve2V4l) Nice.",
      to_user_id: null,
      to_user_id_str: null
    }
  ];

  MockSearch = (function() {

    function MockSearch() {}

    MockSearch.prototype.search = function(query, callback) {
      var obj, results;
      results = {
        google: (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = mockGoogleData.length; _i < _len; _i++) {
            obj = mockGoogleData[_i];
            _results.push(new GoogleSearchResult(obj));
          }
          return _results;
        })(),
        twitter: (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = mockTwitterData.length; _i < _len; _i++) {
            obj = mockTwitterData[_i];
            _results.push(new TwitterSearchResult(obj));
          }
          return _results;
        })()
      };
      return callback(results);
    };

    return MockSearch;

  })();

  $(function() {
    return this.doSearch = function() {
      var appender, kw, ms;
      kw = $("#searchQuery").val();
      console.log("Search launched with keyword: " + kw);
      appender = function(id, data) {
        return data.forEach(function(x) {
          var identifier;
          identifier = '#' + id;
          console.log(identifier);
          return $("<p>" + (x.toHtml()) + "</p>").appendTo($(identifier));
        });
      };
      ms = new MockSearch;
      return ms.search(kw, function(results) {
        appender("gr", results.google);
        return appender("tr", results.twitter);
      });
    };
  });

}).call(this);
