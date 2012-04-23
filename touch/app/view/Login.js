Ext.define("ioExamples.view.Login", {
    extend: 'Ext.Container',
    xtype: "siologin",
    requires: ["Ext.form.Panel", "Ext.form.FieldSet", "Ext.field.Password"],
    config: {
        id: "loginpanel",
        layout: "fit",
        fullscreen: true,
        
        control: {
           '.formpanel': {
               beforesubmit: 'login'
           }
        },

        login: function() {
            console.log("login!", arguments);
            return false;
        },
  
 
        items: [
        {
            docked: 'top',
            xtype: 'titlebar',
            title: 'Login',
            items: [
            {
                text: "cancel",
                action: "cancellogin"
            }
            ]
        },
        {
            xtype: "panel",
            layout: "fit",
            items: [
            {
                xtype: "formpanel",
                id: "siologinform",
                listeners: {
                  submit:function(){
                    console.log("listeners.submit", arguments);
                    
                  }
                },
                items: [
                {
                    xtype: 'fieldset',
                    title: 'Login with SIO',
                    items: [
                    {
                        xtype: 'textfield',
                        placeHolder: "Username",
                        name: 'username'
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: "Password",
                        name: 'password'
                    },
                     {
                          xtype: 'button',
                          text: 'Login',
                          action: "siologin"
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