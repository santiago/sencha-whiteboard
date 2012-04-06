//<debug>
Ext.Loader.setPath({
    'Ext': 'sdk/src',
    'Ext.io': '../../src/io',
    'Ext.cf': '../../src/cf'
});
//</debug>

Ext.application({
    name: 'ioExamples',

    requires: [
        'Ext.MessageBox',
        'Ext.io.Io' /* requires base Io singlton so that we can call Ext.io.init(); FIXME: simplify for the release. */
    ],

    views: ['Main'],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },
    
    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        Ext.io.setup({appId:"foobar", deviceId:"foobar"});
        Ext.io.init();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('ioExamples.view.Main'));
        
        
        
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});
