Ext.define('ioExamples.controller.Main', {
    extend: 'Ext.app.Controller',
    
    appId: "5wKqVkiRrwS0zH8rr1otGcFmOiQ",
    groupId: "H2CP1N3mZst4IqZuEHytuUyepp0",
    

    config: {
        control: {
            loginButton: {
                tap: 'doLogin'
            },
            logoutButton: {
                tap: 'doLogout'
            }
        },

        refs: {
            loginButton: 'button[action=login]',
            logoutButton: 'button[action=logout]'
            
        }
    },
    
    init: function() {

      console.log("controller init.");
      Ext.io.Io.setup({appId: this.appId, url:"http://msg.sencha-dev.io"});
      Ext.io.Io.init();
      var self = this;
      Ext.io.Io.getGroup({id: this.groupId, callback: function(options, success, group){console.log("got group", group);
        self.group = group;
      }});
      
    },

    doLogin: function() {
        // called whenever the Login button is tapped
      var self = this;
      console.log("foo?", this);
      Ext.io.Io.getCurrentUser({callback: function(cb, isAuth, user){
          console.log("getcurrentuser", arguments);
          if(!isAuth) {
            console.log("no user, we need to auth.", user);
            self.group.authenticate({
                    params: {username:'joebob', password:'test123'},
                    callback: function(opts, isAuth, user){
                        console.log("user authed?",arguments);
                        if(isAuth){
                          self.onAuth(user);  
                        }
                    }
              });
          } else {
            console.log("User authenticated already", user);
            self.onAuth(user);  
          }
          
          
      }});
   
    },
    
    onAuth: function(user){
      
        console.log("after auth, syncstore");
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
       /* this.store.add({
          name: 'Jason' + new Date().getTime()
        });*/
globalStore = this.store;

        console.log("after add", this.store);
        this.store.sync(function(r){
          console.log("sync callback", arguments);
  // done...
        },this);
        console.log("after sync");
    },

    doLogout: function() {
       console.log("doloutout");
        Ext.io.Io.getCurrentUser({callback: function(cb, isAuth, user){
          console.log("have user to logout", isAuth, user);
          if(isAuth && user) {
            user.logout();
          }
        }});
    }
});