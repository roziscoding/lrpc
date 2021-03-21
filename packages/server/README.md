lRPC Server
---

Simple server aimed at making rapid back-end prototyping easier. Setup you functions on the server and call tem on the client as if it were the same codebase.

## Installation

This is available as `@lrpc/server` on npm, so just install it as usual:

```shell
npm i @lrpc/server

# Or, with yarn

yarn add @lrpc/server
```

## Usage

This package exports the `createServer` function, which creates an HTTP server using Node's internal `http` module.

`createServer` receives two parameters: and object with the functions you want to be able to call from the front-end (the handlers object), and an object with options.

```typescript
import { createServer } from '@lrpc/server'

const server = createServer({
  greet: ({ name }: { name: string }) => ({
    ok: true,
    data: {
      greeting: `Hello, ${name}`!
    }
  })
})

server.listen(3000, () => { console.log('Listening on port 3000') })
```

Do note that your handlers must return an object containing, at least, the `ok` property, and that all data that you wish to send to the client must be inside `data`.

After that, your server is listening on port 3000, and is ready to be consumed by your client.

## Contributing

There are no automated testes yet, so that's the main contribution I'm looking for, right now, but every contribution is welcome.

Just fork this repo, make sure ESlint and Commitlint are happy with your code and commits, and PR 😄