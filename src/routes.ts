import glob from 'glob'
import path from 'path'
import  _ from 'lodash'
import { IRequest } from './interfaces/request'

// add ping route by default for health check
let routes = [{
  method: 'GET',
  path: '/ping',
  config: {
    handler: function () {
      return 'pong'
    },
    tags: ['api'],
    auth: false
  }
},
{
  method: 'POST',
  path: '/ping',
  config: {
    handler: function (request: IRequest) {
      console.log(request.payload)
      return 'pong'
    },
    tags: ['api'],
    auth: false
  }
}
]

// add all routes from all modules to the routes array manually or write your routes inside a folder inside the src folder
// with suffix as Routes.js e.g weatherRoutes.js
glob.sync('./dist/src/orm/routes/**/*Routes.js').forEach((file) => {
  console.log('object')
  routes.push(require(path.resolve(file)))
})

// export routes
routes = _.flattenDeep(routes)
export default routes
