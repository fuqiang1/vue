const path = require('path');

module.exports = {
  db: {
    mysql: {
      host: '127.0.0.1',
      user: 'root',
      password: '5840345FU',
      database: 'test',
      connectionLimit: 10
    },
    // redis: {
    //   port: 6379,
    //   host: '127.0.0.1',
    //   db: 3,
    //   options: {
    //     return_buffers: false,
    //     auth_pass: ''
    //   }
    // }
  },
  oAuth: {
    github: {
      client_id: '36a5dfe0a4764064068d',
      client_secret: '4c8c04f95cf8eded637fcf0b784e796f9e03e7ec'
    }
  },
  root: path.normalize(__dirname + '/..'),
  appPath: 'src',
  tempUploads: 'tempUploads',
  uploads: 'uploads',
  port: 9000,
  tokenSecret: 'test',
  isUpdateAdmin: true,
  accessControlAllowOrigin: 'http://localhost:3000',
  adminName: 'admin',
  adminPassword: '123456',
  socketioPath: '/testsocketiopath',
  draftPostRedisKey: 'DRAFTPSOTKEY'
};
