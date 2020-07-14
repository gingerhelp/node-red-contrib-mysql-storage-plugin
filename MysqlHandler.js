/* eslint-disable no-await-in-loop */
const when = require('when');
const Promise = when.promise;
const sql = require('mysql');

const MysqlHandler = class MysqlHandler {
  constructor(sqlConfig) {
    this.sqlConfig = sqlConfig;
    this.sqlConfig.multipleStatements = true;
  }

  connect() {
    return Promise((resolve, reject) => {
      try {
        this.connectionPool = sql.createPool(this.sqlConfig);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  findAll(tableName) {
    return Promise(async (resolve, reject) => {
      pool.query(`SELECT JsonData FROM ${tableName}`, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(results.JsonData));
        }
      });
    });
  }

  saveAll(tableName, objects) {
    return Promise(async (resolve, reject) => {
      pool.query(
        `DELETE FROM ${tableName};INSERT INTO ${tableName} (JsonData) VALUES (?)`,
        [JSON.stringify(objects)],
        err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  findLibraryEntry(tableName, type, path) {
    return Promise(async (resolve, reject) => {
      pool.query(`SELECT * FROM ${tableName} WHERE Type = ?`, [type], err => {
        if (err) {
          reject(err);
        } else {
          const returnStructure = [];
          for (let i = 0; i < result.length; i += 1) {
            const entry = result[i];

            if (entry.Path.indexOf('/') === -1 && path === '') {
              returnStructure.push({
                fn: entry.Path,
                meta: entry.Meta,
                body: entry.JsonData
              });
            } else if (path === '') {
              returnStructure.push(entry.Path.split('/')[0]);
            } else if (entry.Path.indexOf(path) !== -1) {
              const subpath = entry.Path.split(path)[1];
              if (subpath.indexOf('/') === -1) {
                returnStructure.push({
                  fn: subpath,
                  meta: entry.Meta,
                  body: entry.JsonData
                });
              } else {
                for (let x = 0; x < subpath.split('/').length - 1; x += 1) {
                  returnStructure.push(subpath.split('/')[x]);
                }
              }
            }
          }
          resolve(returnStructure);
        }
      });
    });
  }

  saveLibraryEntry(tableName, type, path, meta, body) {
    return Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM ${tableName} WHERE Type = ? AND Path = ?;INSERT INTO ${tableName} (Type, Path, Meta, JsonData) VALUES (?, ?, ?, ?)`,
        [type, path, type, path, JSON.stringify(meta), body],
        err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
};

module.exports = MysqlHandler;
