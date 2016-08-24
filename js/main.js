require(['Models/Blog', 'Controllers/ListController'], function (Blog, ListController) {

    var blogs = [new Blog('data.json'), new Blog('data1.json'), new Blog('data2.json')];

    for (var i = 0; i < blogs.length; i++) {
        ListController.loadData(blogs[i]).then(function (data) {
            ListController.renderView(data);
        })
    }
});