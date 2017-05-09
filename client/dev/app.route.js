;(function(ng) {
  "use strict";

  ng.module("project-timeline")
    .config([
      "$routeProvider",
      function($routeProvider) {
        $routeProvider
          .when("/", {
            templateUrl: "todo/templates/dashboard.html",
            controller: "DashboardController",
            controllerAs: "dashboardCtrl"
          })
          .otherwise({
            redirectTo: "/"
          });
      }
    ]);
}(window.angular));
