const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt')

const Client = new PrismaClient();

async function main() {

  await Client.user.create({
    data: {
      name: 'Examiner',
      email: 'exam@examiner.com',
      password: bcrypt.hashSync(process.env.DEFAULT_PASSWORD, parseInt(process.env.SALT_ROUNDS)),
      verified_at: new Date()
    }
  })
  await Client.user.create({
    data: {
      name: 'Developer',
      email: 'dev@examiner.com',
      password: bcrypt.hashSync(process.env.DEFAULT_PASSWORD, parseInt(process.env.SALT_ROUNDS)),
      verified_at: new Date()
    }
  })
}



main()
  .then(function() {
    console.log('User seeder successfuly executed!')
  })
  .catch(function(e) {
    console.error('Error seeding user!')
    throw e
  })
  .finally(async function() {
    await Client.$disconnect()
  })



