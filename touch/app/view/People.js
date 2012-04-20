Ext.define("ioExamples.view.People", {
    extend: 'Ext.Panel',
    xtype: "exmaplespeople",
    requires: ["Ext.dataview.List", "Ext.form.Panel","Ext.form.FieldSet"],
    config: {
        id: "peoplepanel",
        title: 'People',
        iconCls: 'team',
        layout: "card",
        items: [
        {
            docked: 'top',
            xtype: 'titlebar',
            title: 'People',
            items: [
              {text: "back", action:"peopleback", hidden:"true"}
            ]
        },
        {
            xtype: "list",
            id: "userlist",

            styleHtmlContent: true,
            scrollable: true,
            store: "People",
            itemTpl: "{name}",
            emptyText: 'No people yet'
        },
        {
            xtype: "panel",
            layout:"fit",
            items:[
              {
                xtype:"formpanel",
                items: [
                        {
                            xtype: 'fieldset',
                            title: 'Send a message',
                            items: [
                                {
                                    id: "messagefield",
                                    xtype: 'textfield',
                                    name: 'message'
                                }
                            ]
                        }
                    ]
              
              }
            
            ]
        }
        ]
    }

});