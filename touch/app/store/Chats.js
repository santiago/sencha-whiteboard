Ext.define('ioExamples.store.Chats', {
    extend: 'Ext.data.Store',
    config: {
        model: 'ioExamples.model.ChatMessage',
        proxy: {
            type: 'syncstorage',
            id: 'mychats'
        },
        sorters: ['date'],
        autoload: true
    }
});