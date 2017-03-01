(function(){
  angular
    .module("WebAppMaker")
    .controller("WebsiteEditController", WebsiteEditController);

  function WebsiteEditController($routeParams, $location, WebsiteService) {
    var vm = this;
    vm.userId = $routeParams.uid;
    vm.websiteId = $routeParams.wid;
    vm.deleteWebsite = deleteWebsite;
    vm.updateWebsite = updateWebsite;

    function init() {
      WebsiteService
        .findWebsitesByUser(vm.userId)
        .success(renderWebsites);
      WebsiteService
        .findWebsiteById(vm.websiteId)
        .success(renderWebsite);
    }
    init();
    
    function renderWebsites(websites) {
      vm.websites = websites;
    }

    function renderWebsite(website) {
      vm.website = website;
    }

    function deleteWebsite() {
      WebsiteService.deleteWebsite(vm.websiteId);
      $location.url("/user/"+vm.userId+"/website");
    };

    function updateWebsite() {
      WebsiteService.updateWebsite(vm.websiteId, vm.website);
      $location.url("/user/"+vm.userId+"/website");
    };
  }
})();