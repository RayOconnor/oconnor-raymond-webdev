(function(){
  angular
    .module("WebAppMaker")
    .controller("WebsiteNewController", WebsiteNewController);

  function WebsiteNewController($routeParams, $location, WebsiteService) {
    var vm = this;
    vm.userId = $routeParams.uid;
    vm.createWebsite = createWebsite;

    function init() {
      WebsiteService
        .findWebsitesByUser(vm.userId)
        .success(renderWebsites);
    }
    init();

    function renderWebsites(websites) {
      vm.websites = websites;
    }

    function createWebsite() {
      vm.website['_user'] = vm.userId;
      WebsiteService.createWebsite(vm.userId, vm.website);
      $location.url("/user/"+vm.userId+"/website");
    };
  }
})();