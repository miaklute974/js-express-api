var db = require('../db/database');
require('dotenv').config();
db.sequelize.sync();