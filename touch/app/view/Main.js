Ext.define("ioExamples.view.Main", {
    extend: 'Ext.tab.Panel',
    requires: ['Ext.TitleBar'],
    
    config: {
        tabBarPosition: 'bottom',
        
        items: [
            {
                title: 'Welcome',
                iconCls: 'home',
                
                styleHtmlContent: true,
                scrollable: true,

                items: [{
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2'
                },
                
                {
                  xtype:"button",
                  text: "login",
                  action: "login"
                },
                 {
                    xtype:"button",
                    text: "logout",
                    action: "logout"
                  },
                {
                  xtype:"button",
                  text: "send message",
                  action: "sendmessage",
                  disabled: true
                },
                {
                  xtype:"button",
                  text: "add record",
                  action: "addrecord",
                  disabled: true
                }
                
                ]
                
                
            }
        ]
    }
});