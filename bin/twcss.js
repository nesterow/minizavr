
import {tw, setup, stringify} from 'twind/core'
import {twindConfig} from '../twind.config.ts'

const ROOT = Deno.cwd()

setup(twindConfig)

// extract css classes from tsx files

function parse() {
  for (const file of Deno.readDirSync(`${ROOT}/src`)) {
    if (file.name.endsWith('.tsx') || file.name.endsWith('.jsx')) {
      const content = Deno.readTextFileSync(`${ROOT}/src/${file.name}`)
      const regexName = /className="([^"]*)"/g
      let match
      while ((match = regexName.exec(content)) !== null) {
        tw(match[1])
      }
      const regexClass = /class="([^"]*)"/g
      while ((match = regexClass.exec(content)) !== null) {
        tw(match[1])
      }
    }
  }
}

export function build() {
  //tw.snapshot()
  parse()
  Deno.writeTextFileSync(`${ROOT}/dist/main.css`, stringify(tw.target))
}
