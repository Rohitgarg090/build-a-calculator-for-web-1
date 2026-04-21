// -------------------------------------------------------
// No database seed needed for this project.
// This calculator is entirely client-side with no
// database or persistent storage requirements.
//
// This file is intentionally left as a placeholder.
// -------------------------------------------------------

// If you later add a database, here's a starter seed:
//
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
//
// async function main() {
//   console.log('Seeding default user preferences...')
//
//   await prisma.userPreference.upsert({
//     where: { id: 'default' },
//     update: {},
//     create: {
//       id: 'default',
//       theme: 'dark',
//       decimalPlaces: 10,
//       soundEnabled: false,
//     },
//   })
//
//   console.log('Seed complete.')
// }
//
// main()
//   .catch((e) => { console.error(e); process.exit(1) })
//   .finally(async () => { await prisma.$disconnect() })

console.log('No seed required — calculator runs entirely client-side.')
export {}