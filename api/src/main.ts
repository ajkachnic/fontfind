import Raccoon from '@maruware/raccoon'
import fastify from 'fastify'
import websocket, { SocketStream } from 'fastify-websocket'
import fetch from 'node-fetch'

import type { ClientMessage, Font } from '@fontfind/core'

require('dotenv').config()

const FONTS_KEY = process.env.FONTS_KEY

// Cache the font listing
const main = async () => {
  let fonts: Font[] = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${FONTS_KEY}`)
  .then(res => res.json())
  .then(json => {
    return json.items
  })

  const fontMap: Record<string, Font> = fonts.map(font => {
    const record: Record<string, Font> = {}

    record[font.family] = font
    return record
  }).reduce((a, b) => ({...a, ...b}), {})
  
  const randomChoice = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
  
  const server = fastify()
  
  server.register(websocket)
  
  const raccoon = new Raccoon({
    redisUrl: process.env.REDIS_URL,
    nearestNeighbors: 5,
    className: 'fonts'
  })
  
  server.get('/fonts', async (request, reply) => {
    return fonts
  })
  
  server.get('/socket', { websocket: true }, (connection, req) => {
    console.log('handling socket')
    handleSocket(connection)
  })
  
  server.get('/lookup/:font', async (request, reply) => {
    // @ts-expect-error
    const font = fontMap[request.params.font]

    console.log(font, request.params)

    reply.status(200)
    return font
  })
  
  const handleSocket = async (connection: SocketStream) => {
  connection.socket.on('message', async data => {
    const message = JSON.parse(data.toString()) as ClientMessage;

    switch(message.type) {
      case 'like':
        await raccoon.liked(message.data.user, message.data.id)
        break
        case 'dislike':
          await raccoon.disliked(message.data.user, message.data.id)
          break
          case 'recommend':
            let recommendation = await raccoon.recommendFor(message.data.user, 5)
            if(recommendation.length === 0) {
              console.log('giving random output')
              // @ts-ignore
              recommendation = [randomChoice(await fonts).family]
            }

            const actualFont = fontMap[recommendation[0]]
            
            console.log(recommendation)
            await connection.socket.send(JSON.stringify({
              type: 'recommendation',
              data: actualFont
            }))
          }
        })
      }
      
      server.listen(3000, (err, address) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
        console.log(`Server listening at ${address}`)
      })
}

main()