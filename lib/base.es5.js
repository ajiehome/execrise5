// 'use strict'

function Base() {
    this.handler = {};
}

var prop = Base.prototype

prop.on = function (type, handler) {
    if (typeof this.handler[type] === 'undefined') {
        this.handler[type] = [];
    }
    this.handler[type].push(handler);
}

prop.trigger = function () {
    var args = Array.prototype.slice.call(arguments),
        type = args.shift(); // 去掉第一个参数type

    if (this.handler[type] instanceof Array) {
        var handlers = this.handler[type];
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].apply(this, args);
        }
    }
}

function merge(a, b) {
    if (!b) return a
    for (key in b) {
        a[key] = b[key]
    }
    return a;
}
Base.extend = function (prototype, static) {
    //     var args = Array.prototype.slice.call(arguments);
    //     for (var i = 0; i < args.length; i++) {
    //         let params = args[i];
    //         for (var key in params) {
    //             Base[key] = params[key];
    //         }
    //     }
    var _this = this
    var newObj = function () {
        _this.call(this);
    };
    var Super = function () { }
    Super.prototype = _this.prototype
    newObj.prototype = merge(new Super, prototype)

    return merge(merge(newObj, Base), static);
}

module.exports = Base