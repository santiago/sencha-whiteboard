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
      Ext.io.Io.setup({appId: this.appId, deviceId:"foobar"+ new Date().getTime(), url:"http://msg.sencha-dev.io"});
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
                    params: {username:'joebob', password:'test1dd23'},
                    callback: function(opts, result, user){
                        console.log("user authed?",arguments);
                        self.onAuth(user);
                    }
              });
          } else {
            console.log("User authenticated already", user);
          }
          
          
      }});
   
    },
    
    onAuth: function(user){
     
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