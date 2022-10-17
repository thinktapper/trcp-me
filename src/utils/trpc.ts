import { createReactQueryHooks } from '@trpc/react'
import { AppRouter } from '../server/route/app.router'

export const trcp = createReactQueryHooks<AppRouter>()
