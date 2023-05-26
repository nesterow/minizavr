/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { render, h } from 'preact';
import {setup, cssom, getSheet} from 'twind/core';
import App from './App.tsx';
import { twindConfig } from '../twind.config.ts';


const sheet = cssom(document.styleSheets[0])
sheet.resume = getSheet().resume.bind(sheet)
document.querySelector('[data-twind="claimed"]')?.remove();
setup(twindConfig, sheet);

render(h(App, {}), document.body as HTMLElement)
