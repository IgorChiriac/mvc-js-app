define(['Models/Blog'], function (Blog) {

    describe("model", function () {
        describe("set url", function () {
            it("should set url", function () {
                var model = new Blog('data.json');
                expect(model.url).toEqual('data.json');
            });
            it("should return default url", function () {
                var model = new Blog();
                expect(model.url).toEqual('default url');
            })
        })
    })

});