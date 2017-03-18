(function() {
  angular
    .module("WebAppMaker")
    .factory("FlickrService", FlickrService)

  function FlickrService($http) {

    var key = "4c2dc44247a8aa4c8d0fab93450ae564";
    var secret = "ae215afcc1656505";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
    
    var api = {
      "searchPhotos": searchPhotos
    };
    return api;

    function searchPhotos(searchTerm) {
      var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
      return $http.get(url);
    }


  }
})();