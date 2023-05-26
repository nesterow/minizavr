/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { render, h } from 'preact';
import App from './App.tsx';

render(h(App, {}), document.body as HTMLElement)