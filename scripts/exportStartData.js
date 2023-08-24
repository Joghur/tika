import { PrismaClient } from "@prisma/client";

import { startFieldItems } from "./fieldItemObject.js";

const prisma = new PrismaClient();

async function loadIntoDatabase() {
  for (const item of startFieldItems) {
    await prisma.elementProp.create({
      data: {
        type: item.type,
        step: item.step,
        number: item.number || null,
        positionX: item.positionX,
        positionY: item.positionY,
        color: item.color || null,
      },
    });
  }
}

loadIntoDatabase()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
