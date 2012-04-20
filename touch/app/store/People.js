/**
 * The Runs store. Contains a list of all Runs the user and their friends have made.
 */
Ext.define('ioExamples.store.People', {
    extend  : 'Ext.data.Store',

    config: {
        model: 'ioExamples.model.Person',
        autoLoad: false
      /*, data:[
            {id:"1",
            name:"blob"},
            {id:"12",
            name:"blob"},
            {id:"13",
            name:"blob"},
            {id:"14",
            name:"blob"},{id:"15",
            name:"blob"},{id:"16",
            name:"blob"},{id:"17",
            name:"blob"},{id:"18",
            name:"blob"},{id:"19",
            name:"blob"},{id:"10",
            name:"blob"},
        ]*/
    }
});
