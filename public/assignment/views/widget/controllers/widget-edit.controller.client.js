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
    vm.deleteWidget = deleteWidget;
    vm.updateWidget = updateWidget;

    function init() {
      vm.widget = WidgetService.findWidgetById(vm.widgetId);
    }
    init();

    function deleteWidget() {
      WidgetService.deleteWidget(vm.widgetId);
      $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
    };

    function updateWidget() {
      WidgetService.updateWidget(vm.widgetId, vm.widget);
      $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
    };
    
  }
})();
