(function(){
  angular
    .module("WebAppMaker")
    .controller("WidgetNewController", WidgetNewController);

  function WidgetNewController($routeParams, $location, WidgetService) {
    var vm = this;
    vm.userId = $routeParams.uid;
    vm.websiteId = $routeParams.wid;
    vm.pageId = $routeParams.pid;
    vm.createAndEdit = createAndEdit;

    function createAndEdit(widgetType) {
      var widget = {};
      widget.widgetType = widgetType;
      widgetId = WidgetService.createWidget(vm.pageId, widget)._id;
      $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widgetId);
    };

  }
})();