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
            layout:"vbox",
            items:[
              {
                  xtype: "list",
                  id: "chatList",

                  styleHtmlContent: true,
                  scrollable: true,
                  itemTpl: " {from} : {message}",
                  emptyText: 'No Messages',
                  flex:"6"
              },
              {
                xtype:"formpanel",
                flex:"1",
                scrollable: "none",
                items: [
                        {
                            xtype: 'fieldset',
                            items: [
                                {
                                    id: "messagefield",
                                    xtype: 'textfield',
                                    name: 'message',
                                    placeHolder: 'Send a message'
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