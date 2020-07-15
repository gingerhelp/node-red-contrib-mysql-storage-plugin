Node Red Microsoft SQL Server Storage Plugin
============================================

This plugin allows you to store your flows and library entries in MySQL.  Thanks to adibenmati whose MongoDb storage plugin served as a template to create this one.

Getting Started
-----

For this one, you'll need a separate script to start your Node Red,
as per the guide for running a custom Node-Red inside your process:

http://nodered.org/docs/embedding.html

Firstly, require the module:

```bash
npm install --save node-red-contrib-mysql-storage-plugin
```

Then, in your settings, add:

```javascript
const storageModule = require('node-red-contrib-mysql-storage-plugin');
const sqlConfig = {
  user: 'sa',
  password: 'myPassword',
  host: 'SQL01',
  database: 'NodeRed',
  port: 3306
};

// Node-RED settings
const settings = {
  ...
  storageModule,
  storageModuleOptions: {
    sqlConfig,
    //optional
    //set the collection name that the module would be using
    tableNames:{
      flows: 'NodeRedFlows',
      sessions: 'NodeRedSessions',
      credentials: 'NodeRedCredentials',
      settings: 'NodeRedSettings',
      library: 'NodeRedLibrary'
    }
  },
  ...
};
```

Note that for sqlConfig I recommend storing all of the values in your .env file instead of hardcoding them like above.  Then your sqlConfig could just look like this:
```
const sqlConfig = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_SERVER,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
};
```

Lastly, you will need to create the tables by running the CreateTables.sql file against your database.

TODO
-----
1. I do not have the library functions working completely yet - you can save library entires but I haven't figured out what I am missing to recall them.  PRs welcome!
