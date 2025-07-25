import { prisma } from '@/config/prisma'
import { afterAll, beforeAll } from 'vitest'

beforeAll(async () => {
    await prisma.$connect()
})

afterAll(() => {
    prisma.$disconnect()
})