import {build as build_js} from './esbuild.js'
import {build as build_css} from './twcss.js'
const {remove, watchFs, mkdirSync, osRelease} = Deno

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
await build_css()
await build_js()

Deno.exit()