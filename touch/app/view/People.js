Ext.define("ioExamples.view.People", {
    extend: 'Ext.List',
    xtype: "exmaplespeople",
    config: {
        title: 'People',
        iconCls: 'team',
        styleHtmlContent: true,
        scrollable: true,
        store: "People",
        itemTpl:"{name}",
    }
});