Ext.define('ioExamples.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires:["ioExamples.view.Login", "ioExamples.store.Chats"], 

    /**
    * Enter app and group id from dev console.
    */
    appId: "5wKqVkiRrwS0zH8rr1otGcFmOiQ",
    groupId: "H2CP1N3mZst4IqZuEHytuUyepp0",


    config: {
        control: {
            loginButton: {
                tap: 'checkLogin'
            },
            logoutButton: {
                tap: 'doLogout'
            },
            siologinBtn: {
                tap: "doAuth"
            }
        },

        refs: {
            loginButton: 'button[action=login]',
            logoutButton: 'button[action=logout]',
            usernamePanel: '#usernamePanel',
            siologinBtn: 'button[action=siologin]',
            siologinForm: '#siologinform',
            chatList: "#chatList"
        }
    },

    init: function() {

        console.log("controller init.");
        Ext.io.Io.setup({
            appId: this.appId,
            url: "http://msg.sencha-dev.io"
           //, transportName:"socket"
        });
        Ext.io.Io.init();
        var self = this;
        Ext.io.Io.getGroup({
            id: this.groupId,
            callback: function(options, success, group) {
                console.log("got group", group);
                self.group = group;
                self.checkUser();
            }
        });

    },

    checkUser: function() {
        var self = this;
        Ext.io.Io.getCurrentUser({
            callback: function(cb, isAuth, user) {

                console.log("getcurrentuser", arguments);

                if (!isAuth) {
                    console.log("no user, we need to auth.", user);
                    self.showLogin();
                  
                } else {
                    console.log("User authenticated already", user);
                    self.onAuth(user);
                }
            }
        });
    },
    
    showLogin: function(){
      console.log("showLogin", this.loginPanel);
      if(!this.loginPanel){
          this.loginPanel = Ext.create("ioExamples.view.Login");
          console.log("showLogin2", this.loginPanel);
          
          var panel = this.loginPanel.query(".formpanel")[0];
          console.log("panel", panel);
          panel.on("action", function(){
            console.log("hello", arguments);
            
          });
          
          Ext.Viewport.add(this.loginPanel);  
      }
      Ext.Viewport.setActiveItem(this.loginPanel);  
      
    },
    
    checkLogin: function() {
        // called whenever the Login button is tapped
        console.log("check?", this);
        this.getUsernamePanel().setHtml("<h3>checking login...</h3>");
        this.checkUser();

    },
    
    
     doAuth: function() {
          // called whenever the Login button is tapped
        var self = this;
        var form = self.getSiologinForm();
        var values = form.getValues();
        console.log("doAuth", form, form.getValues(), this);

  
        self.group.authenticate({
            params: {
                username: values.username,
                password: values.password
            },
            callback: function(opts, isAuth, user) {
                console.log("user authed?", arguments);
                
                if (isAuth) {
                    self.onAuth(user);
                } else {
                  //TODO login errors!
                }
            }
        });

      },


    loadGroupMemebers: function(currentUser) {
        var store = ioExamples.app.getStores("people")[0];
        /*
      *TODO Move this into the store....
      */
        console.log("loadGroupMemebers", store);
        this.group.findUsers({
            query: 'username:[aaa TO zzz]',
            //is this the correct way to list all of the users in a group??
            success: function(users) {
                console.log("users", users);
                for (i in users) {
                    var user = users[i];
                    console.log('User Id:', user.key, user);
                    if(currentUser.key != user.key){
                      store.add({
                          id: user.key,
                          name: user.data.username,
                          userObj: user
                      });  
                    }
                }

            },
            failure: function() {
                console.log("failed to fetch group members");
            }
        });

    },

    onAuth: function(user) {
        var usernamePanel = this.getUsernamePanel();
        this.getLoginButton().setDisabled(true);
        this.getLogoutButton().setDisabled(false);
        
         Ext.Viewport.setActiveItem(0);  
        
        

        this.loadGroupMemebers(user);
        usernamePanel.setHtml("<h3>" + user.data.username + "</h3>");
        
        
        var chats =  Ext.create("ioExamples.store.Chats", {storeId: 'chats'});
        
        chats.load();
        var self = this;
        
        this.getChatList().setStore(chats);
        
        chats.sync(function(){
          console.log("chat sync callback", arguments);
        });
        
       
        
        var chatList =  this.getChatList();
        
        user.receive({callback: function(cb, bool, from, message){
          console.log("user got a message!", arguments);
          var record = {
            message: message,
            userID: from,
            from: from,
            date: new Date().getTime()
          };
          console.log("saving message", record);
          chats.add(record);
          chats.sync();
          setTimeout(function() {chatList.getScrollable().getScroller().scrollToEnd();}, 300);
        }})
        
        
        
/*
        console.log("after auth, syncstore");
        Ext.define('Friends', {
            extend: 'Ext.data.Model',
            config: {
                fields: [
                {
                    name: 'name',
                    type: 'string'
                }
                ]
            }
        });



        this.store = Ext.create('Ext.data.Store', {
            model: 'Friends',
            proxy: {
                type: 'syncstorage',
                id: 'friendlist'
            },
            autoLoad:true
        });
*/
        console.log("to add", this.store);
        /* this.store.add({
          name: 'Jason' + new Date().getTime()
        });*/
        // globalStore = this.store;
        // 
        //      console.log("after add", this.store);
        //      this.store.sync(function(r) {
        //          console.log("sync callback", arguments);
        //            
        //          // done...
        //      },
        //      this);
        //      console.log("after sync");
        //      
        
    },

    doLogout: function() {
        console.log("doloutout");
        //TODO example of global login/logout events
        // Need to clear all local data and stores for the user.
        // Lazy thing to do would be to reload the app in the browser but that probably isn't a good idea.
        var self = this;
        
        var chats = Ext.data.StoreManager.lookup('chats');
        console.log("chats", chats);
        if(chats) {
       //   chats.removeAll();
            chats.getProxy().clear();
        }
        
        var people = ioExamples.app.getStores("people")[0];
        if(people){
          people.removeAll();
        }
        
        Ext.io.Io.getCurrentUser({
            callback: function(cb, isAuth, user) {
                console.log("have user to logout", isAuth, user);
                if (isAuth && user) {
                    user.logout();

                    self.getLoginButton().setDisabled(false);
                    self.getLogoutButton().setDisabled(true);
                    self.getUsernamePanel().setHtml("<h3>Please login</h3>");
                }
            }
        });
    }
    
});