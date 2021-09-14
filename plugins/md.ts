import * as path from 'path'
import * as fs from 'fs'
import * as marked from 'marked'

const mdToJs = str => {
  const content = JSON.stringify(marked.parse(str))
  return `export default ${content}`
}

export function md() {
  return {
    configureServer: [
      async ({ app }) => {
        app.use(async (ctx, next) => {
          if (ctx.path.endsWith('.md')) {
            ctx.type = 'js'
            const filePath = path.join(process.cwd(), ctx.path)
            const str = fs.readFileSync(filePath).toString()
            ctx.body = mdToJs(str)
          } else {
            await next()
          }
        })
      },
    ],
    transforms: [{
      test: context => context.path.endsWith('.md'),
      transform: ({ code }) => mdToJs(code)
    }]
  }
}