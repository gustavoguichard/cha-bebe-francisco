import { router } from '../dist/app/router.js'

export default {
  fetch(request) {
    return router.fetch(request)
  },
}
