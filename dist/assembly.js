/*!
 * @overview AssemblyJS - a small javascript framework.
 * @copyright Copyright (c) 2014 Ivan Saorin and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/ivan-saorin/AssemblyJS/master/LICENSE
 * @version   0.0.2
 *
*/
"use strict";define(["scripts/assemblyjs/promises.js","scripts/assemblyjs/sandbox.js"],function(e,n){function r(e){return e.id&&e.source}function t(e){return e.resolved}function o(e){return r(e)?t(e):e}var s=function(){function r(){}function t(){return d[f]}function i(r){console.warn("assembly install",r),0!==f&&e.reject("Invalid operation requested for the current status: "+t());var i=[].concat(r),a=new e.Promise(function(r,t){for(var a=[],l=0;l<i.length;l++)console.info("Should load plugin:",i[l]),a.push(i[l].source);curl(a).then(function(){console.info("assembly [2nd then enter] ",arguments);var a=Array.prototype.slice.call(arguments);if(i.length!==a.length)return t("Could not resolve all the plugins ["+a.length+" of "+i.length+"] loaded");for(var l,u={},d={},c=0;c<i.length;c++){if("plugin"===i[c].type)l=u;else{if("module"!==i[c].type)return t("Invalid module type: "+i[c].type+" for module.id: "+i[c].id+".");l=d}var p={id:i[c].id,type:i[c].type,source:i[c].source,resolved:a[c],exportToSandbox:i[c].exportToSandbox,config:i[c].config||{},autostart:"undefined"==typeof i[c].autostart?!0:i[c].autostart,privileged:"undefined"==typeof i[c].privileged?!1:i[c].privileged};l[i[c].id]=p}s.plugins=u,s.modules=d;var v=["promises"];for(var g in u)if(u.hasOwnProperty(g)){var h=u[g];h.exportToSandbox&&v.push(h.id)}s.sandbox=new n(s,v);var m=[];for(var y in d)if(d.hasOwnProperty(y)){var b=d[y],w=o(b);console.info("Working module:",b);var x=new w(b.id,{},s.sandbox);b.resolved=x,m.push(b.privileged?x.install(d,b.config):x.install(b.config))}e.all(m).then(function(){r(s)},function(e){t(e)}),f++})});return a}function a(n,r){var i=new e.Promise(function(i,a){1!==f&&a("Invalid operation requested for the current status: "+t());{var l=n.logger.resolved;n.utils.resolved}l.warn("assembly start",r);var u=[];for(var d in r)if(r.hasOwnProperty(d)){var c=o(r[d]);l.info("Working module:",d,c,"autostart:",r[d].autostart),r[d].autostart&&u.push(c.start())}e.all(u).then(function(){i(s)},function(e){a(e)})});return f++,i}function l(n){2!==f&&e.reject("Invalid operation requested for the current status: "+t());{var r=s.plugins.logger.resolved;s.plugins.utils.resolved}"undefined"==typeof n&&(n=s.modules),r.warn("assembly stop",n);for(var i in n)if(n.hasOwnProperty(i)){var a=o(n[i]);r.info("Stopping module:",a)}return f--,s}function u(){return 1!==f&&e.reject("Invalid operation requested for the current status: "+t()),console.warn("assembly uninstall",arguments),s.plugins=null,s.modules=null,f--,s}var d=["uninstalled","installed","active"],f=0;return{promises:e,state:t,install:i,uninstall:u,start:a,stop:l,noop:r}}();return s});
