/* eslint-disable no-await-in-loop */
const when = require('when');
const Promise = when.promise;
const sql = require('mysql2/promise');

const MysqlHandler = class MysqlHandler {
  constructor(sqlConfig) {
    this.sqlConfig = sqlConfig;
    this.sqlConfig.multipleStatements = true;
  }

  connect() {
    return Promise((resolve, reject) => {
      try {
        this.pool = sql.createPool(this.sqlConfig);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  findAll(tableName) {
    return Promise(async (resolve, reject) => {
      try {
        const [rows] = await this.pool.query(
          `SELECT JsonData FROM ${tableName}`
        );
        if (rows[0]) {
          resolve(JSON.parse(rows[0].JsonData));
        } else {
          resolve([]);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  saveAll(tableName, objects) {
    return Promise(async (resolve, reject) => {
      try {
        await this.pool.query(`DELETE FROM ${tableName}`);
        await this.pool.query(
          `INSERT INTO ${tableName} (JsonData) VALUES (?)`,
          [JSON.stringify(objects)]
        );
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  findLibraryEntry(tableName, type, path) {
    return Promise(async (resolve, reject) => {
      try {
        const [
          rows
        ] = await this.pool.query(
          `SELECT * FROM ${tableName} WHERE Type = ? AND Path = ?`,
          [type, path]
        );
        if (rows[0]) {
          const returnStructure = [];
          for (let i = 0; i < rows.length; i += 1) {
            const entry = rows[i];
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
      } catch (err) {
        reject(err);
      }
    });
  }

  saveLibraryEntry(tableName, type, path, meta, body) {
    return Promise((resolve, reject) => {
      this.pool.query(
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
