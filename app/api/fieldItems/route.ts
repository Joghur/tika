import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

//TODO protection

export async function GET(request: Request) {
  const elements = await prisma.elementProp.findMany();
  return NextResponse.json(elements);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const elements = await prisma.elementProp.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(elements), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    // TODO proper error handling
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const json = await request.json();

    for (const obj of json) {
      const updatedObject = await prisma.elementProp.update({
        where: { id: obj.id },
        data: {
          positionX: obj.positionX,
          positionY: obj.positionY,
        },
      });

      console.log("Updated object:", updatedObject);
    }

    return new NextResponse(JSON.stringify(json), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    // TODO proper error handling
    console.log("error-----------", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
