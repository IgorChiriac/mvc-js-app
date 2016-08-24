define(['Models/Blog', 'Controllers/ListController'], function (Blog, ListController) {

    describe("render a view for each model", function () {
        var blogs = [new Blog('data.json')];

        beforeEach(function (done) {
            ListController.loadData(blogs[0]).then(function (data) {
                ListController.renderView(data);
                done();
            })
        });
        afterEach(function () {
            d3.selectAll('.block').remove();
        });
        describe('the svg', function () {
            it('should be created', function () {
                expect(getSvg()).not.toBeNull();
            });

            it('should have the correct height', function () {
                expect(getSvg().attr('height')).toBe('200');
            });

            it('should have the correct width', function () {
                expect(getSvg().attr('width')).toBe('300');
            });
            it("should render view component", function () {
                var views = document.getElementsByClassName('block');
                expect(views.length).toEqual(blogs.length);
            });
        });
    });
    function getSvg() {
        return d3.select('svg');
    }
});