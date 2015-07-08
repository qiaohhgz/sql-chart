function SqlChart(options, flotopt) {
    var opt = {section: null, apiUrl: null, sql: null};
    var other = {plotId: null, debug: false};
    opt = $.extend(opt, other);
    opt = $.extend(opt, options);
    log(opt);
    var dataSet = [], timer, plot, apiUrl = opt.apiUrl, container, closeSection;

    var plotId = opt.plotId;
    if (!plotId) {
        var i = 1;
        plotId = "placeholder" + i++;
        while ($("#" + plotId).attr("id")) {
            plotId = "placeholder" + i++;
        }

        lunchLayout();
    } else {
        container = $("#" + plotId).find(".demo-container");
        closeSection = $("#" + plotId).find(".demo-container.close");
    }
    log(plotId);

    function lunchLayout(){
        closeSection = $("<div class='glyphicon glyphicon-remove close chart-close'></div>").hide();
        container = $("<div class='demo-container'></div>")
            .append($("<div class='demo-placeholder'></div>").attr({id: plotId}))
            .append(closeSection);

        $(opt.section).append(container);
        bindEvent();
    }

    function bindEvent() {
        closeSection.click(function () {
            destroy();
        });

        container.on("mouseover", function () {
            closeSection.show();
        }).on("mouseout", function () {
            closeSection.hide();
        });
    }

    function buildPlot(list) {
        log("build plot");
        var options = {
            xaxis: {
                mode: "time",
                tickFormatter: function (val, axis) {
                    var d = new Date(val);
                    return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                }
            },
            yaxis: {
                min: 0
            },
            series: {
                lines: {show: true},
                points: {show: true}
            },
            grid: {
                timezone: "browser",
                hoverable: true,
                autoHighlight: true
            },
            legend: {
                position: "ne",  //"ne" or "nw" or "se" or "sw"
                labelFormatter: function (label, series) {
                    var index = series.datapoints.points.length - 1;
                    if (index < 0)index = 0;
                    return label + " " + series.datapoints.points[index];
                }
            }
        };
        options = $.extend(options, flotopt);
        log(options);
        return $.plot("#" + plotId, getData(list), options);
    }

    function putNum(data, number) {
        while (data.length >= totalPoints) {
            data = data.slice(1);
        }

        var time = new Date().getTime();
        data.push([time, number]);

        log(time + " + " + number + " + " + data.length);
        return data;
    }

    function getData(list) {
        var category = [];
        $.each(list, function (i, o) {
            if (!dataSet[i]) {
                dataSet.push([]);
            }
            dataSet[i] = putNum(dataSet[i], o["NUM"]);
            category.push({label: o["NAME"], data: dataSet[i]});
        });
        log(category);
        return category;
    }

    function update(list) {
        plot.setData(getData(list));
        plot.getOptions().series.points.show = eval(showPoint);
        plot.setupGrid();
        plot.draw();
    }

    function destroy() {
        log(plotId + " destroy");
        window.clearTimeout(timer);
        container.remove();
        plot = null;
    }

    function start() {
        ajaxData();
    }

    function ajaxData() {
        $.ajax({
            url: apiUrl,
            method: "post",
            data: opt.sql
        }).success(function (list) {
            if (!plot) {
                plot = buildPlot(list);
            }
            if (plot) {
                update(list);
                timer = setTimeout(ajaxData, updateInterval);
            }
        }).error(function (e) {
            log("API连接失败");
        });
    }

    this.plotId = plotId;
    this.start = start;
    this.destroy = destroy;
}