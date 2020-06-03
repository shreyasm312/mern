import helmet from 'helmet'
import crossdomain from 'helmet-crossdomain'

const security = (app) => {
  app.use(helmet.xssFilter())
  app.use(helmet.noSniff())
  app.use(helmet.frameguard())
  app.use(helmet.ieNoOpen())
  app.use(helmet.hidePoweredBy())
  app.use(crossdomain())
}

export { security }
