/* eslint-disable no-restricted-syntax */
const constants = require('./constants');
const MysqlHandler = require('./MysqlHandler');

let settings;
let mysqlHandler;

const storageModule = {
  init(_settings) {
    settings = _settings;
    if (
      settings.storageModuleOptions == null ||
      settings.storageModuleOptions.sqlConfig == null
    ) {
      throw new Error(
        "MySQL storage module's required parameters are not defined"
      );
    }

    this.tableNames = Object.assign(constants.DefaultTableNames);
    if (settings.storageModuleOptions.tableNames != null) {
      for (const settingsColName of Object.keys(
        settings.storageModuleOptions.tableNames
      )) {
        this.tableNames[settingsColName] =
          settings.storageModuleOptions.tableNames[settingsColName];
      }
    }

    this.collectionNames = Object.assign(constants.DefaultTableNames);
    if (settings.storageModuleOptions.collectionNames != null) {
      for (const settingsColName of Object.keys(
        settings.storageModuleOptions.collectionNames
      )) {
        this.collectionNames[settingsColName] =
          settings.storageModuleOptions.collectionNames[settingsColName];
      }
    }

    mysqlHandler = new MysqlHandler(settings.storageModuleOptions.sqlConfig);
    return mysqlHandler.connect();
  },

  getFlows() {
    return mysqlHandler.findAll(this.tableNames.flows);
  },

  saveFlows(flows) {
    return mysqlHandler.saveAll(this.tableNames.flows, flows);
  },

  getCredentials() {
    return mysqlHandler.findAll(this.tableNames.credentials);
  },

  saveCredentials(credentials) {
    return mysqlHandler.saveAll(this.tableNames.credentials, credentials);
  },

  getSettings() {
    return mysqlHandler.findAll(this.tableNames.settings);
  },
  saveSettings(s) {
    return mysqlHandler.saveAll(this.tableNames.settings, s);
  },
  getSessions() {
    return mysqlHandler.findAll(this.tableNames.sessions);
  },
  saveSessions(sessions) {
    return mysqlHandler.saveAll(this.tableNames.sessions, sessions);
  },

  getLibraryEntry(type, path) {
    return mysqlHandler.findLibraryEntry(this.tableNames.library, type, path);
  },

  saveLibraryEntry(type, path, meta, body) {
    return mysqlHandler.saveLibraryEntry(
      this.tableNames.library,
      type,
      path,
      meta,
      body
    );
  }
};

module.exports = storageModule;
