define(['Views/ListView'], function (ListView) {
    function loadData(model) {
        return fetch(model.url).then(function (response) {
            return response.json();
        }).catch(function (err) {
            console.log(err);
        });
    }

    function renderView(data) {
        ListView.render(data);
    }

    return {
        loadData: loadData,
        renderView: renderView
    };
});