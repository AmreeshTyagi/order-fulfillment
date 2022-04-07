export function Notifier() {
  this.handlers = []; // observers
}

Notifier.prototype = {
  subscribe: function (fn) {
    this.handlers.push(fn);
  },

  unsubscribe: function (fn) {
    this.handlers = this.handlers.filter(function (item) {
      if (item !== fn) {
        return item;
      }
    });
  },

  notify: function (o, thisObj) {
    var scope = thisObj ;
    this.handlers.forEach(function (item) {
      item.call(scope, o);
    });
  },
};
