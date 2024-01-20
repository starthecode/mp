// import { PrismaClient } from '@prisma/client';

// declare global {
//   var prisma: PrismaClient;
// }

// const client = global.prisma || new PrismaClient();

// if (process.env.NODE_env !=== 'production') global.prisma = client;

// export default client;

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;




