/*!
 * @overview AssemblyJS - a small javascript framework.
 * @copyright Copyright (c) 2014 Ivan Saorin and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/ivan-saorin/AssemblyJS/master/LICENSE
 * @version   0.0.1
 *
*/

'use strict';
define(['bower_components/assemblyjs/dist/promises.js', 'bower_components/assemblyjs/dist/sandbox.js'], function( Promises, Sandbox ){

  function isModuleDefinition(moduleDef) {
    return (moduleDef.id && moduleDef.source);
  }

  function extractFromModuleDefinition(moduleDef) {
    return moduleDef.resolved;
  }

  function getModule(moduleDef) {
    if (isModuleDefinition(moduleDef)) {
      return extractFromModuleDefinition(moduleDef);
    }
    else {
      return moduleDef;
    }
  }

  var Assembly = (function () {

    var self = this;

    var stateNames = ['uninstalled', 'installed', 'active'];

    var current = 0;

    function _noop() {}

    function _state() {
      return stateNames[current];
    }

    function _install(modules) {
      console.warn('assembly install', modules);

      if (current !== 0) {
        Promises.reject('Invalid operation requested for the current status: ' + _state());
      }

      var plugins = [].concat(modules);

      var promise = new Promises.Promise(function(resolve, reject) {

        var strPlugins = [];
        for (var i = 0; i < plugins.length; i++) {
          console.info('Should load plugin:', plugins[i]);
          strPlugins.push( plugins[i].source );
        }

        curl(strPlugins).then(function () {
          console.info('assembly [2nd then enter] ', arguments);
          var array = Array.prototype.slice.call(arguments);

          if ((plugins.length) !== array.length) {
            return reject('Could not resolve all the plugins [' + array.length + ' of ' + (plugins.length) + '] loaded');
          }

          var _plugins = {};
          var _modules = {};
          var _object;

          for (var i = 0; i < plugins.length; i++) {
            if (plugins[i].type === 'plugin') {
              _object = _plugins;
            } else if (plugins[i].type === 'module') {
              _object = _modules;
            } else {
              return reject('Invalid module type: ' + plugins[i].type + ' for module.id: ' + plugins[i].id + '.');
            }

            var obj = {
              id: plugins[i].id,
              type: plugins[i].type,
              source: plugins[i].source,
              resolved: array[i],
              exportToSandbox: plugins[i].exportToSandbox,
              config: plugins[i].config || {},
              autostart: (typeof plugins[i].autostart === 'undefined') ? true : plugins[i].autostart,
              privileged: (typeof plugins[i].privileged === 'undefined') ? false : plugins[i].privileged,
            };
            _object[plugins[i].id] = obj;
          }

          Assembly.plugins = _plugins;
          Assembly.modules = _modules;

          var exports = ['promises'];

          for (var name in _plugins) {
            if (_plugins.hasOwnProperty(name)) {
              var plugin = _plugins[name];
              if (plugin.exportToSandbox) {
                exports.push(plugin.id);
              }
            }
          }

          Assembly.sandbox = new Sandbox(Assembly, exports);

          var promises = [];
          for (var name2 in _modules) {
            if (_modules.hasOwnProperty(name2)) {
              var moduleDef = _modules[name2];
              var ctor = getModule(moduleDef);
              console.info('Working module:', moduleDef);
              var resolved = new ctor(moduleDef.id, {}, Assembly.sandbox);
              moduleDef.resolved = resolved;
              if (!moduleDef.privileged) {
                promises.push(resolved.install(moduleDef.config));
              }
              else {
                promises.push(resolved.install(_modules, moduleDef.config));
              }
            }
          }

          Promises.all(promises).then(
            function() {
              resolve(Assembly);
            },
            function(reason) {
              reject(reason);
            });

          current++;
        });
      });

      return promise;
    }

    function _start(plugins, modules) {

      var promise = new Promises.Promise(function(resolve, reject) {

        if (current !== 1) {
          reject('Invalid operation requested for the current status: ' + _state());
        }

        var logger = plugins['logger'].resolved;
        var utils = plugins['utils'].resolved;

        logger.warn('assembly start', modules);

        var promises = [];
        for (var name in modules) {
          if (modules.hasOwnProperty(name)) {
            var module = getModule(modules[name]);
            logger.info('Working module:', name, module, 'autostart:', modules[name].autostart);
            if (modules[name].autostart) {
              promises.push(module.start());
            }
          }
        }

        Promises.all(promises).then(
          function() {
            resolve(Assembly);
          },
          function(reason) {
            reject(reason);
          });

      });
      current++;

      return promise;
    }

    function _stop(modules) {
      if (current !== 2) {
        Promises.reject('Invalid operation requested for the current status: ' + _state());
      }

      var logger = Assembly.plugins['logger'].resolved;
      var utils = Assembly.plugins['utils'].resolved;

      if (typeof modules === 'undefined') {
        modules = Assembly.modules;
      }

      logger.warn('assembly stop', modules);

      for (var name in modules) {
        if (modules.hasOwnProperty(name)) {
          var module = getModule(modules[name]);
          logger.info('Stopping module:', module);
        }
      }

      current--;

      return Assembly;
    }

    function _uninstall() {
      if (current !== 1) {
        Promises.reject('Invalid operation requested for the current status: ' + _state());
      }

      console.warn('assembly uninstall', arguments);

      Assembly.plugins = null;
      Assembly.modules = null;

      current--;

      return Assembly;
    }

    return {
      promises: Promises,
      state: _state,
      install: _install,
      uninstall: _uninstall,
      start: _start,
      stop: _stop,
      noop: _noop
    };
  })();

  return Assembly;
});
