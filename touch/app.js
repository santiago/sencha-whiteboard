//<debug>
Ext.Loader.setPath({
    'Ext': 'sdk/src',
    'Ext.io': 'lib/io/src/io',
    'Ext.cf': 'lib/io/src/cf'
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
        Ext.io.Io.setup({appId:"5wKqVkiRrwS0zH8rr1otGcFmOiQ", deviceId:"foobar", url:"http://msg.sencha-dev.io"});
        Ext.io.Io.init();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('ioExamples.view.Main'));
        
        
        Ext.io.Io.getGroup({id: "H2CP1N3mZst4IqZuEHytuUyepp0", callback: function(options, success, group){console.log("args", group);
        
        ioExamples.group = group;
        
        }});
        
        
        
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
