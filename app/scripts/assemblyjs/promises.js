'use strict';
define(['bower_components/rsvp/rsvp.js'], function( RSVP ) {

  Promises = {
    Promise: RSVP.Promise,
    defer: RSVP.defer,
    all: RSVP.all,
    resolve: function(reason) {
        var deferred = RSVP.defer();
        deferred.resolve(reason);
        return (deferred.promise);
    },
    reject: function (error) {
        var deferred = RSVP.defer();
        deferred.reject(error);
        return (deferred.promise);
    }
  }

  return Promises;
});
