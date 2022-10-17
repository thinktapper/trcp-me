import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import {
  createUserOutputSchema,
  createUserSchema,
} from '../../schema/user.schema'
import * as trcp from '@trpc/server'
import { createRouter } from '../createRouter'

export const userRouter = createRouter().mutation('register-user', {
  input: createUserSchema,
  async resolve({ ctx, input }) {
    const { email, name } = input

    try {
      const user = await ctx.prisma.user.create({
        data: {
          email,
          name,
        },
      })

      return user
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new trcp.TRPCError({
            code: 'CONFLICT',
            message: 'User already exists',
          })
        }
      }

      throw new trcp.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something fuqed up',
      })
    }
  },
})
