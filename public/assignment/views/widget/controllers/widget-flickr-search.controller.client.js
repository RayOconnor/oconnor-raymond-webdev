(function() {
  angular
    .module("WebAppMaker")
    .controller("WidgetFlickrSearchController", WidgetFlickrSearchController);

  function WidgetFlickrSearchController($location, $routeParams, FlickrService, WidgetService) {
    var vm = this;
    vm.userId = $routeParams.uid;
    vm.websiteId = $routeParams.wid;
    vm.pageId = $routeParams.pid;
    vm.widgetId = $routeParams.wgid;
    vm.searchPhotos = searchPhotos;
    vm.selectPhoto = selectPhoto;

    function init() {
      WidgetService
        .findWidgetById(vm.widgetId)
        .success(renderWidget);
    }

    init();

    function renderWidget(widget) {
      vm.widget = widget;
    }

    function searchPhotos(searchTerm) {
      FlickrService
        .searchPhotos(searchTerm)
        .then(function (response) {
          data = response.data.replace("jsonFlickrApi(", "");
          data = data.substring(0, data.length - 1);
          data = JSON.parse(data);
          vm.photos = data.photos;
        });
    }

    function selectPhoto(photo) {
      vm.widget.url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg"
      WidgetService
        .updateWidget(vm.widgetId, vm.widget)
        .success(function(widget) {
          $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
        });
    }

  }
})();