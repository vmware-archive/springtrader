/**
* The TweetList component is a simple dataview which is used to display the
* tweets returned by the twitter search. It also has a toolbar docked at the
* top which is used in phones to display a back button.
*
* The {@link #defaultType} is a tweetlistitem.
*/
Ext.define('Twitter.view.TweetList', {
    extend: 'Ext.dataview.List',
    xtype: 'tweetlist',
    requires: [
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging'
    ],

    config: {
        ui           : 'timeline',
        allowDeselect: false,
        useSimpleItems: true,
        variableHeights: true,
        infinite: true,
        emptyText: 'No tweets found.',

        itemTpl: [
            '<div class="tweet <tpl if=\'metadata && metadata.result_type && metadata.result_type == \"popular\"\'>popular</tpl>">',
                '<img class="avatar" src="{profile_image_url}" width="48px" height="48px" />',
                '<div class="username">{from_user}</div>',
                '<div class="text">{text}</div>',
                '<tpl if="metadata && metadata.recent_retweets">',
                    '<div class="retweets">{metadata.recent_retweets} recent retweets</div>',
                '</tpl>',
            '</div>'
        ],

        plugins: [
            'pullrefresh',
            {
                type: 'listpaging',
                autoPaging: true
            }
        ],

        items: [
            {
                docked: 'top',
                xtype : 'toolbar',
                hidden: true,
                ui    : 'searchbar',
                items: [
                    {
                        xtype: 'button',
                        ui   : 'back',
                        text : 'Searches'
                    }
                ]
            }
        ]
    }
});
