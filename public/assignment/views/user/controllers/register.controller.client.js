(function(){
  angular
    .module("WebAppMaker")
    .controller("registerController", registerController);

  function registerController(UserService, $location) {
    var vm = this;
    vm.createUser = function(user) {
      var registerUser = UserService.createUser(user);
      if(registerUser != null) {
        
        $location.url('/user/' + registerUser._id);
      } else {
        vm.error = 'user not found';
      }
    }
  }
})();