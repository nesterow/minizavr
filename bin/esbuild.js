import * as esbuild from "https://deno.land/x/esbuild@v0.17.18/mod.js";
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.7.0/mod.ts";
import * as dejs from "https://deno.land/x/dejs@0.10.3/mod.ts";

const importMapURL =
  new URL("../import_map.json", import.meta.url).href
const configPath =
  new URL("../deno.jsonc", import.meta.url).href


export async function build () {
  const isBuild = Deno.args.includes('--build')
  const indexInputFile = `${Deno.cwd()}/src/index.html`.replace('/dist', '')

  const index = await dejs.renderFileToString(indexInputFile, {
    title: "My App",
    // ...add more variables here
  })

  const indexOutputFile = `${Deno.cwd()}/dist/index.html`.replace(isBuild ? '' : '/dist', '')
  await Deno.writeTextFile(indexOutputFile, index)

  const entryPoint = Deno.args.includes('--dev') ? "src/dev.ts" :  "src/main.ts"

  await esbuild.build({
    plugins: [...denoPlugins({importMapURL, configPath})],
    entryPoints: [entryPoint],
    outfile: "./dist/main.esm.js",
    bundle: true,
    sourcemap: true,
    minify: isBuild,
    format: "esm",
    jsx: "transform",
    jsxFactory: "h",
    jsxImportSource: "preact",
    jsxFragment: "Fragment",
  })
};

if (Deno.args.includes("--watch")) {
  await Deno.watchFs("./src", { recursive: true }).forEach(async () => {
    await build()
  })
}
