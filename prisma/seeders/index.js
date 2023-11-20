const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt')

const Client = new PrismaClient();

async function main() {

  await Client.user.create({
    data: {
      email: 'dev@examiner.com',
      password: bcrypt.hashSync('Exam!', parseInt(process.env.SALT_ROUNDS))
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



