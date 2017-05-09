;(function(ng) {
  "use strict";

  ng.module("project-timeline")
    .factory("TodoResource", [
      "$resource",
      function($resource) {
        const _url = "/api/todos/:id";
        const _params = {};
        const _methods = {};

        return $resource(_url, _params, _methods);
      }
    ]);
}(window.angular));
