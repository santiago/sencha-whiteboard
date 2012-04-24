Ext.define('ioExamples.controller.Messaging', {
    extend: 'Ext.app.Controller',


    config: {
        control: {
            userlist: {
                select: 'showUserMessages'
            },     
            messagefield: {
              action:"sendMessage"
            },
            peoplebackBtn: {
                tap: 'doPeopleBack'
            }
        },

        refs: {
            usernamePanel: '#usernamePanel',
            userlist: '#userlist',
            peoplePanel: '#peoplepanel',
            messagefield: "#messagefield",
            peoplebackBtn: 'button[action=peopleback]',
            chatList: "#chatList"
        }
    },

    showUserMessages: function(list, record){
      this.selectedUser = record;
      console.log("showUserMessages", record, this.getPeoplePanel(), this.selectedUser);
      this.getPeoplePanel().setActiveItem(1);

      this.getPeoplePanel().getAt(0).setTitle(this.selectedUser.data.name);
      this.getPeoplebackBtn().show();
    },
    
    sendMessage: function(msgField){
      var message = msgField.getValue();
       console.log("sendMessage",message);
       var user = this.selectedUser.data.userObj;
       var chatList = this.getChatList();
       user.send({message:message, callback: function(){
         console.log("sendMessage callback", arguments);
         
         
         var chats = Ext.data.StoreManager.lookup('chats');
          var record = {
             message: message,
             userID: user.key,
             from: "ME",
             date: new Date().getTime()
           };
           console.log("saving message", record);
           chats.add(record);
           setTimeout(function() {chatList.getScrollable().getScroller().scrollToEnd();}, 300);
           chats.sync();
           msgField.setValue("");
       }});
    },
    
    doPeopleBack: function(){
      this.getPeoplePanel().setTitle("People");
       this.getPeoplePanel().setActiveItem(0);
       
       this.getUserlist().deselectAll();
       this.getPeoplebackBtn().hide();
    }
    
    
});