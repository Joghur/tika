import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const findNullOrMissing = await prisma.elementProp.findMany({
    where: {
      OR: [
        {
          number: null,
        },
        {
          number: {
            isSet: false,
          },
        },
      ],
      OR: [
        {
          color: null,
        },
        {
          color: {
            isSet: false,
          },
        },
      ],
    },
  });
  console.log("findNullOrMissing", findNullOrMissing);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
