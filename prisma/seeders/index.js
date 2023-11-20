const { PrismaClient } = require("@prisma/client");

const Client = new PrismaClient();

async function main() {

  await Client.user.create({
    data: {
      email: 'dev@examiner.com',
      password: bcrypt.hashSync('Exam!', process.env.SALT_ROUNDS)
    }
  })
}



main()
  .then(function() {
    console.log('User seeder successfuly executed!')
  })
  .catch(function() {
    console.error('Error seeding user!')
  })
  .finally(async function() {
    await Client.$disconnect()
  })



