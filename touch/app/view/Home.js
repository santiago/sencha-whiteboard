Ext.define("ioExamples.view.Home", {
    extend: 'Ext.Panel',
    xtype: "exmapleshome",

    config: {
        title: 'Home',
        iconCls: 'home',

        styleHtmlContent: true,
        scrollable: true,

        items: [
        {
            xtype: "panel",
            styleHtmlContent: true,
            id: "usernamePanel",
            html: "logging in...",
        },
        {
            xtype: "button",
            text: "login",
            action: "login",
            disabled: true
        },
        {
            xtype: "button",
            text: "logout",
            action: "logout",
            disabled: true
        }

        ]
    }
});