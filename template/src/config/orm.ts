import { env } from '@/utils'
import { ConnectionOptions } from 'typeorm'
import { resolve } from 'path'
// import {} from '@/entity'

const entities = []
export default env.switch<ConnectionOptions>({
  dev: {
    type: 'sqlite',
    database: resolve(__dirname, '../database/service.db'),
    entities,
    logging: true,
    // synchronize: true,
    // dropSchema: true,
  },

  default: {
    type: 'mariadb',
    entities,
    host: '',
    port: 3306,
    username: '',
    password: '',
    database: '',
    logging: true,
  },
})
