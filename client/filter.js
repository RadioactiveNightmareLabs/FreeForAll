angular.module('freeFilter', []).
filter('byType', function () {
    return function (free, type) {
        var items = {
            type: type,
            out: []
        };
        angular.forEach(free, function (value, key) {
            if (this.type[value.type] === true) {
                this.out.push(value);
            }
        }, items);
        return items.out;
    };
});

angular.bootstrap(document, ['freeFilter']);