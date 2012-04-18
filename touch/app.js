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
        'Ext.MessageBox'
        , 'Ext.io.Io' /* requires base Io singlton so that we can call Ext.io.init(); FIXME: simplify for the release. */
        , 'Ext.io.data.Proxy'
    ],

    views: ['Main', "Home", "People"],
    models: ['Person'],
    stores: ['People'],
    controllers: ['Main'],

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
      
        // Initialize the main view
        Ext.Viewport.add(Ext.create('ioExamples.view.Main'));  
        
    },
    
    onAuth: function() {
      
           /*
      Removing sync code until it works better. 
      Ext.define('Friends', {
          extend: 'Ext.data.Model',
          config: {
              fields: [
                  { name: 'name', type: 'string' }
              ]
          }
      });
      

 
      this.store = Ext.create('Ext.data.Store', {
          model: 'Friends',
          proxy: {
              type: 'syncstorage',
              id: 'myfriends'
          },
          autoLoad: true
      });
      
      console.log("to add", this.store);
      this.store.add({
        name: 'Jason' + new Date().getTime()
      });
      
      
      console.log("after add", this.store);
      this.store.sync(function(r){
        console.log("sync callback", arguments);
// done...
      },this);
      console.log("after sync");
      */
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
