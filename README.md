![AssemblyJS](/img/assemblyjs_logo_horizontal.png "AssemblyJS")

Minimal Javascript Framework that allow to assemble SPAs using different micro libraries.


## What is AssemblyJS? ##

**AssemblyJS** is a minimal set of libraries trying to honor the framework definition: the scaffolding that surround your product. **AssemblyJS** is modular by nature and It's build from the ground up to give you the freedom to decide swapping a specific implementation at need.

### Sandbox Pattern ###
**AssemblyJS** is based on the *Sandbox Pattern* (*N. Zakas*[1] and *Eric Shepherd*[2]). The main difference from other implementation (e.g. *Maurizio Pedriale*'s Core-Sandbox-Module-JS[3]) rely on the use of a module system: in our case [cujojs](http://cujojs.com "cujojs")/curl[4].

We anyway felt free to take the initial inspiration but go a little bit further building **AssemblyJS**. 

Both the framework life-cycle and the Module life-cycle rely on promises (provided by the [http://www.tilde.io](http://www.tilde.io "tildeio")/rsvp[5] library.

### Single Page Application architecture ###

insert image here!

### Plugins ###

Generally speaking **Plugins** are [AMD](http://en.wikipedia.org/wiki/Asynchronous_module_definition "AMD") modules exposing some utilities or services.

The following example is a **Plugin** that expose a *sum* function to the outside world.
It  return the result of the *sum* of two parameters *a* and *b* in form of a *Promise*. To do that the *Promises* module is imported throug the define statement.
In case the value of the parameter is lower than 10 the *Promise* will be rejected, otherwise the *Promise* will be fullfilled.


```javascript
define(['bower_components/assemblyjs/dist/promises.js'], function( Promises ) {

  function _sum(a, b) {
      var promise = new Promises.Promise(function(resolve, reject) {
        if (a < 10) {
          setTimeout(function () { resolve(a + b) }, 100);
        }
        else {
          reject('a must be  < 10');
        }
      });

      return promise;
  }

  var SumPlugin = {
    sum: _sum,
  }

  return SumPlugin;
});
```

Of course Plugins could expose complex functionalities. In general Service maps very well as a concept with Plugins.

Plugins are exposed to the framework after the install phase (see: Framework Life cycle). It is possible to configure a plugin to be automatically exposed to the **Sandbox**.

### Sandbox ###

As said before AssembyJS allows to work with the Sandbox Pattern. The Sandbox patter is a thin layer existing betwen the Framework Core and each Module, so that a Module is aware only of the functionalities exposed in the Sandbox.

During the install phase of the Framework it is possible decide which Plugins are automatically exposed throug the Sandbox. Remember: each modules will communicate with the outside world only through the Plugins exposed in the Sandbox.

### Modules ###

T.B.D.


### The framework's life cycle ###

The folowing represents the *state diagram* of the framework lifecycle:

![AssemblyJS](/img/AssembleJS-StateDiagram.png "AssemblyJS")

When the application starts the AssemblyJS framework is idle in an uninstall state.

![AssemblyJS](/img/PomisedOperation.png "AssemblyJS")

### Modules' life cycle ###

![AssemblyJS](/img/assemblyjs_logo_horizontal.png "AssemblyJS")

### Framework and Modules life cycles ###
The following diagram illustrates the combined life cycle of the framework and the modules.

![AssemblyJS lifecycle - sequence diagram](AssemblyJSFrameworkModulesLifecycles.png)

Things that worth to be noted:

1. All the operations on the framework and the modules return a promise that can be resolved or rejected;
2. All those promises can be sync (rsvp automatically wrap sync operations inside a Promise) or async without changing the contract;
3. All those promises are chainable together in sequence of operations.
4. After the install phase the plugins are ready to be used by the framework and the hosting application. They are also available to modules if the corresponding flag was set.
5. After the start phase the modules passed to the start command are started accordingly: usually your application is up and running.

### Application bootstrapping ###

T.B.D.

### AssemblyJS public methods ###

T.B.D.

### Sandbox ###

T.B.D.

### Module ###

T.B.D.

REFERENCES
----------

[1] *Nicholas Zakas*' Core-Sandbox-Module
- [http://msdn.microsoft.com/en-us/scriptjunkie/gg314983](http://msdn.microsoft.com/en-us/scriptjunkie/gg314983)
- [http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture](http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture)

[2] Building a JavaScript Module Framework at Gilt
- [http://www.slideshare.net/ericshepherd/building-a-javascript-module-framework-at-gilt](http://www.slideshare.net/ericshepherd/building-a-javascript-module-framework-at-gilt)
 
[3] *Maurizio Pedriale*'s Core Sandbox Module Implementation 
- [https://github.com/mamoo/Core-Sandbox-Module-JS](https://github.com/mamoo/Core-Sandbox-Module-JS)

[4] *cujojs*' curl
- [https://github.com/cujojs/curl](https://github.com/cujojs/curl)

[5] *tilde*' rsvp.js
- [https://github.com/tildeio/rsvp.js](https://github.com/tildeio/rsvp.js "tildeio")

----------------------------------------
