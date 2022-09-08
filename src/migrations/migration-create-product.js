'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.INTEGER
            },
            total: {
                type: Sequelize.INTEGER
            },
            booked: {
                type: Sequelize.INTEGER
            },
            image: {
                allowNull: true,
                type: Sequelize.STRING
            },
            sellerId: {
                type: Sequelize.INTEGER
            },
            detailsDescription: {
                type: Sequelize.TEXT
            },
            summary: {
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Products');
    }
};