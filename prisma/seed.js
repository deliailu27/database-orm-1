const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: "Alice",
    },
  });

  console.log("Customer created", createdCustomer);

  // Add your code here
  const createdContact = await prisma.contact.create({
    data: {
      phone: "0000",
      email: "test@email.com",
      customerId: createdCustomer.id,
    },
  });

  const createdContactAndCustomer = await prisma.customer.create({
    data: {
      name: "Ann",
      contact: { create: { phone: "1111", email: "test@email.com" } },
    },
  });

  console.log("create customer and contact:", createdContactAndCustomer);

  const createdMovie = await prisma.movie.create({
    data: { title: "test", runtimeMins: 120 },
  });

  const createdScreen = await prisma.screen.create({
    data: { number: 1 },
  });

  const date = new Date();
  const Createdscreening = await prisma.screening.create({
    data: {
      startsAt: date,
      movie: { connect: { id: createdMovie.id } },
      screen: { connect: { id: createdScreen.id } },
    },
  });

  console.log(Createdscreening);

  const newTicket = await prisma.ticket.create({
    data: {
      customer: { connect: { id: createdCustomer.id } },
      Screening: { connect: { id: Createdscreening.id } },
    },
  });
  console.log("new ticket:", newTicket);

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
