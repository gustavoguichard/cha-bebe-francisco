import { router } from '../dist/app/router.js'

export default {
  fetch(request) {
    let url = new URL(request.url)
    let path = url.searchParams.get('__path')
    if (path === null) return router.fetch(request)

    url.searchParams.delete('__path')
    url.pathname = '/' + path.replace(/^\/+/, '')
    return router.fetch(new Request(url, request))
  },
}
