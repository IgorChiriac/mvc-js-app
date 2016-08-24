define(function () {

    function render(parameters) {
        var width = 300,
            height = 200;
        // draw and append the container
        var iDiv = document.createElement('div');
        iDiv.className = 'block';
        document.getElementById('container').appendChild(iDiv);
        var svg = d3.select(".block:last-child").append("svg")
            .attr("width", width).attr("height", height);
        iDiv.insertAdjacentHTML('beforeend',
            '<div class="left">' +
            '<span style="color: ' + parameters.color[1] + '">Tablet</span>' +
            '<div><span>' + parameters.tablet_per + '%' + '</span><span>' + parameters.tablet_value + ' &euro;</span></div></div>' +
            '<div class="right">' +
            '<span style="color: ' + parameters.color[0] + '">Smartphone</span>' +
            '<div><span>' + parameters.smartphone_per + '%' + '</span><span>' + parameters.smartphone_value + '  &euro;</span></div>' +
            '</div>'
        );
        // set the thickness of the inner and outer radii
        var min = Math.min(width, height);
        var oRadius = min / 2 * 0.78;
        var iRadius = min / 2 * 0.85;
        // construct default pie laoyut
        var pie = d3.layout.pie().value(function (d) {
            return d;
        }).sort(null);
        // construct arc generator
        var arc = d3.svg.arc()
            .outerRadius(oRadius)
            .innerRadius(iRadius);
        // creates the pie chart container
        var g = svg.append('g')
            .attr('transform', function () {
                if (window.innerWidth >= 960) var shiftWidth = width / 2;
                if (window.innerWidth < 960) var shiftWidth = width / 3;
                return 'translate(' + shiftWidth + ',' + height / 2 + ')';
            });
        // data for the chart
        var data = [parameters.tablet_per, parameters.smartphone_per];
        var color = d3.scale.ordinal()
            .domain(data)
            .range(parameters.color);
        // enter data and draw pie chart
        var path = g.datum(data).selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("class", "piechart")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", arc)
            .each(function (d) {
                this._current = d;
            });

        //render the text inside the pie chart
        g.append("text")
            .style("fill", "grey")
            .style("font-size", "21px")
            .attr("text-anchor", "middle")
            .text(parameters.title);
        g.append("text")
            .style("fill", "black")
            .style("font-size", "20px")
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .text(parameters.value);

        // add transition to new path
        g.datum(data).selectAll("path").data(pie)
            .transition().duration(1000).attrTween("d", function (d) {
                var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                return function (t) {
                    d.endAngle = i(t);
                    return arc(d);
                }
            });
        // add any new paths
        g.datum(data).selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("class", "piechart")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", arc)
            .each(function (d) {
                this._current = d;
            });
        // remove data not being used
        g.datum(data).selectAll("path")
            .data(pie).exit().remove();
    }

    return {
        render: render
    };
});