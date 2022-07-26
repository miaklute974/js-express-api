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


const Story = sequelize.define('story', {
    story_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    story_type: {
        type: Sequelize.STRING,
        allowNull: true
    },
    requester_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    owner_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    is_completed: {
        type: Sequelize.STRING,
        allowNull: true
    },
    external_links: {
        type: Sequelize.STRING,
        allowNull: true
    },
    epic_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    epic_name: {
        type: Sequelize.STRING,
        allowNull: true
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