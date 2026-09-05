import User from '../models/User.js';

export const seedAdminUser = async () => {
  try {
    const adminEmail = 'admin@admin.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        firstName: 'System',
        lastName: 'Admin',
        email: adminEmail,
        password: 'admin',
        role: 'admin',
        phone: '0712554571',
      });
      console.log('Seeded default Admin user (Email: admin@admin.com | Password: admin)');
    } else {
      // Ensure role is admin
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
      }
    }
  } catch (error) {
    console.error('Error checking/seeding admin user:', error.message);
  }
};
