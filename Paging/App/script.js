var myns = {};
myns.DisplayFields = function (jsondata) {
    function MyViewModel() {
        var self = this;
        self.fields = ko.observableArray(jsondata);
        self.rowSize = ko.observable(5);
        self.pageIndex = ko.observable(0);
        self.previousPage = function () {
            self.pageIndex(self.pageIndex() - 1);
        };
        self.nextPage = function () {
            self.pageIndex(self.pageIndex() + 1);
        };
        self.targetPage = function (targ) {
            //console.log(self.pageIndex());
            self.pageIndex(targ());
        };
        self.maxPageIndex = ko.computed(function () {
            return Math.ceil(self.fields().length / self.rowSize()) - 1;
        });

        self.pagedRows = ko.computed(function () {
            var size = self.rowSize();
            var start = self.pageIndex() * size;
            return self.fields.slice(start, start + size);
        });
        self.numIndex = ko.computed(function () {
            var fields = self.fields();
            var cloneArray = fields.slice();
            var size = self.rowSize();
            var results = [];
            for (var i = size, len = cloneArray.length; i < len; i = i + size) {
                results.push(cloneArray.splice(0, size));
            }

            return results;
        });
    }


    ko.applyBindings(new MyViewModel());
};

$(function () {
    var data = [];
    for (var i = 0; i < 30; i++) {
        data.push({
            FieldId: i,
            Type: "Type" + i,
            Name: "Name" + i,
            Description: "Description" + i
        });
    }
    myns.DisplayFields(data);

});