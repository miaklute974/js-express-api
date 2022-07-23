// database.js
// docker run -it -e "POSTGRES_HOST_AUTH_METHOD=trust" -p 5432:5432 postgres
// docker volume rm $(docker volume ls -q) to clean and start over
const Sequelize = require('sequelize');
require('dotenv').config();

sequelize = new Sequelize(
  "database",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "0.0.0.0",
    dialect: "sqlite",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    storage: "./src/db/database.sqlite3"
  }
);

// TODO: create models dir, import sequelize as db where needed.                               
const Story = sequelize.define('story', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    story_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});


const oAuthToken = sequelize.define('oAuthToken', {
    access_token: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    scope: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    token_type: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    expiry_date: {
        type: Sequelize.BIGINT,
        allowNull: true,
    }
});



module.exports = {
    sequelize: sequelize,
    Story: Story,
    oAuthToken: oAuthToken
};