import client from './client'

const VERSION = '0.0.1'

let existingFetch

if (typeof window !== 'undefined' && 'fetch' in window) {
  existingFetch = window.fetch
}

if (typeof require !== 'undefined') {
  existingFetch = require('node-fetch')
}

export const createClient = client(existingFetch, VERSION)
export default createClient