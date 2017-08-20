'use strict'

class Base {
    constructor() {
        this.handler = {};
    }

    on(type, handler) {
        if (typeof this.handler[type] === 'undefined') {
            this.handler[type] = [];
        }
        this.handler[type].push(handler);
    }

    trigger() {
        var args = Array.prototype.slice.call(arguments),
            type = args.shift(); // 去掉第一个参数type

        if (this.handler[type] instanceof Array) {
            var handlers = this.handler[type];
            for (var i = 0; i < handlers.length; i++) {
                handlers[i].apply(this, args);
            }
        }
    }
}

module.exports = Base