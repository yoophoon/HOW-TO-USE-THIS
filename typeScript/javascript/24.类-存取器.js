"use strict";
var Name = /** @class */ (function () {
    function Name(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Object.defineProperty(Name.prototype, "fullName", {
        get: function () {
            return this.firstName + this.lastName;
        },
        set: function (fullName) {
            var names = fullName.split('-');
            this.firstName = names[0];
            this.lastName = names[1];
        },
        enumerable: false,
        configurable: true
    });
    return Name;
}());
var zhangsanfeng = new Name('张', '三丰');
zhangsanfeng.fullName = '张-三';
console.log(zhangsanfeng);
