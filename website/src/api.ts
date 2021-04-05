/**
 * Connect to an web socket server
 * Takes an optional callback
 * @param url string
 */
export const connect = (url: string, callback?: (conn: WebSocket) => void) => {
  const connection = new WebSocket(url)
	console.log('aahhh')

  if(callback != undefined) {
    // connection.addEventListener('open', () => callback(connection))
  }

  return connection
}