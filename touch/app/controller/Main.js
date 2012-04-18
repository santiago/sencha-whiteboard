Ext.define('ioExamples.controller.Main', {
    extend: 'Ext.app.Controller',

    /**
    * Enter app and group id from dev console.
    */
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
            logoutButton: 'button[action=logout]',
            usernamePanel: '#usernamePanel'
        }
    },

    init: function() {

        console.log("controller init.");
        Ext.io.Io.setup({
            appId: this.appId,
            url: "http://msg.sencha-dev.io"
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
                    self.group.authenticate({
                        params: {
                            username: 'joebob',
                            password: 'test123'
                        },
                        callback: function(opts, isAuth, user) {
                            console.log("user authed?", arguments);
                            if (isAuth) {
                                self.onAuth(user);
                            }
                        }
                    });
                } else {
                    console.log("User authenticated already", user);
                    self.onAuth(user);
                }
            }
        });
    },

    doLogin: function() {
        // called whenever the Login button is tapped

        console.log("doLogin?", this);
        this.getUsernamePanel().setHtml("<h3>checking login...</h3>");
        this.checkUser();


    },


    loadGroupMemebers: function() {
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
                    store.add({
                        id: user.key,
                        name: user.data.username
                    });
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

        this.loadGroupMemebers();
        usernamePanel.setHtml("<h3>" + user.data.username + "</h3>");

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
        this.store.sync(function(r) {
            console.log("sync callback", arguments);
            // done...
        },
        this);
        console.log("after sync");
    },

    doLogout: function() {
        console.log("doloutout");
        //TODO example of global login/logout events
        // Need to clear all local data and stores for the user.
        // Lazy thing to do would be to reload the app in the browser but that probably isn't a good idea.
        var self = this;
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