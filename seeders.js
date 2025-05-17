const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user.js'); 

async function generateUsers(count = 100) {
  for (let i = 0; i < count; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email({ firstName: name.split(' ')[0] });
    const plainPassword = 'password123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(`Created user: ${name} - ${email}`);
  }
}

generateUsers(100)
  .then(() => {
    console.log('Dummy users created successfully');
    process.exit();
  })
  .catch((error) => {
    console.error('Error creating dummy users:', error);
    process.exit(1);
  });
