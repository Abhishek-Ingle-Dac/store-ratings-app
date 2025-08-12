const { sequelize, User } = require('../models');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    await sequelize.sync({ alter: true });

    const password = await bcrypt.hash('Admin@123', 10);

    await User.findOrCreate({
      where: { email: 'admin@local' },
      defaults: {
        name: 'System Administrator',
        email: 'admin@local',
        password,
        address: 'HQ',
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin user seeded');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
}

seed();
