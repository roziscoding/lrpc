# lRPC client

[![Build Status](https://travis-ci.org/roziscoding/lrpc.svg?branch=master)](https://travis-ci.org/roziscoding/lrpc)
[![License](https://badgen.net/github/license/roziscoding/lrpc)](./LICENSE)
[![Library minified size](https://badgen.net/bundlephobia/min/@lrpc/client)](https://bundlephobia.com/result?p=@lrpc/client)
[![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/@lrpc/client)](https://bundlephobia.com/result?p=@lrpc/client)

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install @lrpc/client --save

# For Yarn, use the command below.
yarn add @lrpc/client
```

### Installation from CDN

This module has an UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<!-- For UNPKG use the code below. -->
<script src="https://unpkg.com/@lrpc/client"></script>

<!-- For JSDelivr use the code below. -->
<script src="https://cdn.jsdelivr.net/npm/@lrpc/client"></script>

<script>
  // UMD module is exposed through the "lrpc" global variable.
  console.log(lrpc);
</script>
```

## Usage

This package exports an async function `createClient`, which accepts the URL of your API and provides you with a javascript Proxy object that will convert your function calls into RPCs.

```typescript
async main () {
  const client = await createClient('http://localhost:3000') // This calls a handshake function on the server

  const { greeting } = client.greet({ name: 'John' }) // 'Hello, John'
}

main()
  .catch(console.error)
```

## License

Released under [MIT License](./LICENSE).
