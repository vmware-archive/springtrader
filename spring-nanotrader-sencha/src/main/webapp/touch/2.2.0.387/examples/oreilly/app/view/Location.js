Ext.define('Oreilly.view.Location', {

	extend: 'Ext.Container',
	requires: 'Ext.BingMap',

	xtype: 'location',

	config: {

		title: 'Location',
		iconCls: 'locate',

		layout: 'fit',

		items: [
			{
				docked: 'top',
				xtype: 'toolbar',
				title: 'Location'
			}
		]
	},

	initialize: function() {
		var position = new Microsoft.Maps.Location(Oreilly.app.mapCenter[0], Oreilly.app.mapCenter[1]),
			map;

		this.callParent();

        var mapCallback = function(){
            map = map.getMap();
            var infobox = new Microsoft.Maps.Infobox(position, {
                description: Oreilly.app.mapText, visible: true, offset: new Microsoft.Maps.Point(0, 10), height: 100,width:180
            });
            map.entities.clear();
            var pushpin= new Microsoft.Maps.Pushpin(map.getCenter(), null);
            pushpinClick= Microsoft.Maps.Events.addHandler(pushpin, 'click', function() {
                map.entities.push(infobox);
                infobox.setOptions({visible:true});
            });
            map.entities.push(pushpin);
        }

		map = this.add({
			xtype: 'map',
			mapOptions: {
				center: position,
		        mapTypeId: Microsoft.Maps.MapTypeId.ROADMAP,
                callback: mapCallback
			}
	    });
	}
});