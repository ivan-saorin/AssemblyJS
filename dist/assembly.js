/*!
 * @overview AssemblyJS - a small javascript framework.
 * @copyright Copyright (c) 2014 Ivan Saorin and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/ivan-saorin/AssemblyJS/master/LICENSE
 * @version   0.0.1
 *
*/
"use strict";define(["bower_components/assemblyjs/dist/promises.js","bower_components/assemblyjs/dist/sandbox.js"],function(e,n){function t(e){return e.id&&e.source}function r(e){return e.resolved}function o(e){return t(e)?r(e):e}var s=function(){function t(){}function r(){return d[f]}function i(t){console.warn("assembly install",t),0!==f&&e.reject("Invalid operation requested for the current status: "+r());var i=[].concat(t),a=new e.Promise(function(t,r){for(var a=[],l=0;l<i.length;l++)console.info("Should load plugin:",i[l]),a.push(i[l].source);curl(a).then(function(){console.info("assembly [2nd then enter] ",arguments);var a=Array.prototype.slice.call(arguments);if(i.length!==a.length)return r("Could not resolve all the plugins ["+a.length+" of "+i.length+"] loaded");for(var l,u={},d={},c=0;c<i.length;c++){if("plugin"===i[c].type)l=u;else{if("module"!==i[c].type)return r("Invalid module type: "+i[c].type+" for module.id: "+i[c].id+".");l=d}var p={id:i[c].id,type:i[c].type,source:i[c].source,resolved:a[c],exportToSandbox:i[c].exportToSandbox,config:i[c].config||{},autostart:"undefined"==typeof i[c].autostart?!0:i[c].autostart,privileged:"undefined"==typeof i[c].privileged?!1:i[c].privileged};l[i[c].id]=p}s.plugins=u,s.modules=d;var v=["promises"];for(var g in u)if(u.hasOwnProperty(g)){var m=u[g];m.exportToSandbox&&v.push(m.id)}s.sandbox=new n(s,v);var h=[];for(var y in d)if(d.hasOwnProperty(y)){var b=d[y],w=o(b);console.info("Working module:",b);var x=new w(b.id,{},s.sandbox);b.resolved=x,h.push(b.privileged?x.install(d,b.config):x.install(b.config))}e.all(h).then(function(){t(s)},function(e){r(e)}),f++})});return a}function a(n,t){var i=new e.Promise(function(i,a){1!==f&&a("Invalid operation requested for the current status: "+r());{var l=n.logger.resolved;n.utils.resolved}l.warn("assembly start",t);var u=[];for(var d in t)if(t.hasOwnProperty(d)){var c=o(t[d]);l.info("Working module:",d,c,"autostart:",t[d].autostart),t[d].autostart&&u.push(c.start())}e.all(u).then(function(){i(s)},function(e){a(e)})});return f++,i}function l(n){2!==f&&e.reject("Invalid operation requested for the current status: "+r());{var t=s.plugins.logger.resolved;s.plugins.utils.resolved}"undefined"==typeof n&&(n=s.modules),t.warn("assembly stop",n);for(var i in n)if(n.hasOwnProperty(i)){var a=o(n[i]);t.info("Stopping module:",a)}return f--,s}function u(){return 1!==f&&e.reject("Invalid operation requested for the current status: "+r()),console.warn("assembly uninstall",arguments),s.plugins=null,s.modules=null,f--,s}var d=["uninstalled","installed","active"],f=0;return{promises:e,state:r,install:i,uninstall:u,start:a,stop:l,noop:t}}();return s});