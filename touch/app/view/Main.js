Ext.define("ioExamples.view.Main", {
    extend: 'Ext.tab.Panel',
    requires: ['Ext.TitleBar'],
    
    config: {
        tabBarPosition: 'bottom',
        
        items: [
        {
            docked: 'top',
            xtype: 'titlebar',
            title: 'Sencha.io Examples'
        },
           {xtype:"exmapleshome"},
           {xtype:"exmaplespeople"}
        ]
    }
});