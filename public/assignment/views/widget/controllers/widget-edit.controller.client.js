(function(){
  angular
    .module("WebAppMaker")
    .controller("WidgetEditController", WidgetEditController);

  function WidgetEditController($routeParams, $location, WidgetService) {
    var vm = this;
    vm.userId = $routeParams.uid;
    vm.websiteId = $routeParams.wid;
    vm.pageId = $routeParams.pid;
    vm.widgetId = $routeParams.wgid;
    vm.callbackUrl = "/assignment/#/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId;
    vm.deleteWidget = deleteWidget;
    vm.updateWidget = updateWidget;
    vm.searchImage = searchImage;

    function init() {
      WidgetService
        .findWidgetById(vm.widgetId)
        .success(renderWidget);
    }
    init();

    function renderWidget(widget) {
      vm.widget = widget;
    }

    function deleteWidget() {
      WidgetService.deleteWidget(vm.widgetId);
      $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
    }

    function updateWidget() {
      WidgetService.updateWidget(vm.widgetId, vm.widget);
      $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
    }

    function searchImage() {
      $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId+"/search");
    }
    
  }
})();
