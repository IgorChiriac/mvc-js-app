describe("Dom tests", function () {
    describe("contains the container div", function () {
        it("should contains container div", function () {
            var element = document.getElementById('container');
            expect(element).not.toBe(null);
        });
    })
});
