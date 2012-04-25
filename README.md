Simple touch 2 example application demonstrates: users, messaging and sync etc.

Running
===

client-framework is included as a submodule so pull it down before running:

	git submodule init
	git submodule update

Customize the configuration:

`touch/app/controller/Main.js`

Change the app/groupId to match your app on dev con:

		appId: "5wKqVkiRrwS0zH8rr1otGcFmOiQ",
		groupId: "H2CP1N3mZst4IqZuEHytuUyepp0",

Make sure that the msg server url matches your environment

		Ext.io.Io.setup({
        appId: this.appId,
        url: "http://msg.sencha-dev.io"
       //, transportName:"socket"
    });

You will need at least two users in your apps user group for this application to be useful.

Run locally
---
Serve the project root directory from any web server you have handy.