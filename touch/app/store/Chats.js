Ext.define('ioExamples.store.Chats', {
    extend: 'Ext.data.Store',
    config: {
        model: 'ioExamples.model.ChatMessage',
        proxy: {
            type: 'syncstorage',
            id: 'chats'
        },
        sorters: ['date'],
        autoload: true
    }
});