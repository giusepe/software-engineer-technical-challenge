/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, ResponseToolkit, Server } from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'
import { Task } from '@prisma/client'

const prisma = new PrismaClient()

const init = async () => {
  const server: Server = new Server({
    port: 1984,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
    debug: {
      request: ['error'],
    },
  })

  /* list */
  server.route({
    method: 'GET',
    path: '/tasks',
    handler: async (request: Request, h: ResponseToolkit) => {
      return await prisma.task.findMany()
    },
  })

  /* delete */
  server.route({
    method: 'DELETE',
    path: '/tasks/{id}',
    handler: async (request: Request, h: ResponseToolkit) => {
      return await prisma.task.delete({
        where: { id: Number(request.params.id) },
      })
    },
  })

  /* create */
  server.route({
    method: ['POST'],
    path: '/tasks',
    handler: async (request: Request, h: ResponseToolkit) => {
      console.log(request.payload)
      return await prisma.task.create({
        data: request.payload as Task,
      })
      // TO-DO: missing type checks and validations
      // TO-DO: ignore the id field from the request or throw an error if it's present
    },
  })

  /* update */
  server.route({
    method: ['PUT', 'PATCH'],
    path: '/tasks/{id}',
    handler: async (request: Request, h: ResponseToolkit) => {
      return prisma.task.update({
        where: { id: Number(request.params.id) },
        data: request.payload as Task,
      })
      // TO-DO: check for invalid ids
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
