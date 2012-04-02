(function() {
  var GoogleSearchResult, SearchResult, TwitterSearchResult,
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

}).call(this);
