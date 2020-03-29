module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.createTable('deliveries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recipients',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      deliveryman_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'deliverymans',
          key: 'id',
        },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      signature_id: {
        type: Sequelize.INTEGER,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      canceled_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.dropTable('deliveries');
  },
};
