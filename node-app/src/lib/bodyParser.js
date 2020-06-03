import { json, urlencoded } from 'body-parser'

const handleBodyRequestParsing = (app) => {
  app.use(urlencoded({ extended: true }))
  app.use(json())
}

export { handleBodyRequestParsing }
