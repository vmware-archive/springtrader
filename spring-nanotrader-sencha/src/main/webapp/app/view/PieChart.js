Ext.define('SpringTrader.view.PieChart',{
    extend: 'Ext.chart.PolarChart',
    config: {
        animate: true,
        innerPadding: 20,
        interactions: ['rotate'],
        legend: {
            position: 'bottom',
            width: '100%',
            scrollable: false,
            toggleable: false
        },
        height: 200,
        colors: [ "#f17961", "#f4b819", "#efe52e", "#7cb940", "#47b7e9", "#4bb2c5", "#c5b47f", "#EAA228", "#579575", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"]
    }

});