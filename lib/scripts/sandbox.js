'use strict';
define(['scripts/assemblyjs/promises.js'], function( Promises ) {


  Sandbox = function (parent, exposes) {

    var sandbox = {}

    for (var i = 0; i < exposes.length; i++) {
      var name = exposes[i];

      if (parent.hasOwnProperty(name)) {
        sandbox[name] = parent[name];
      } else if (parent.plugins.hasOwnProperty(name)) {
        sandbox[name] = parent.plugins[name].resolved;
      }

    }

    return sandbox;
  };

  return Sandbox;
});
