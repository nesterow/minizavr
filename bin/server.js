import denoliver from "https://deno.land/x/denoliver@2.3.1/mod.ts"
import {build} from './esbuild.js'
import {build as twcss} from './twcss.js'

const {remove, watchFs, mkdirSync, chdir, osRelease} = Deno

async function watch()  {
  const watcher = watchFs("./src")

  for await (const event of watcher) {
    if (event.kind === "access") continue;
    if (event.kind === "any") continue;

    console.log("reload (", event.kind, ")")
    
    build()
    twcss()
  }
}
await remove('./dist/assets', {recursive: true}).catch(() => {})
mkdirSync('./dist', {
  recursive: true
})
if (osRelease().includes('Windows')) {
  new Deno.Command('xcopy', {
    args: [
      './assets',
      './dist/assets',
    ]
  }).outputSync()
} else {
  new Deno.Command('cp', {
    args: [
      '-r',
      './assets',
      './dist/assets',
    ]
  }).outputSync()
}
build()
twcss()
watch()

chdir('./dist')
denoliver({ 
  port: 6060, 
  cors: false,
  disableReload: false,
  before: (req) => {
    return req
  }
})