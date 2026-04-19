/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'show_posts': {
    methods: ["GET","HEAD"],
    pattern: '/blog',
    tokens: [{"old":"/blog","type":0,"val":"blog","end":""}],
    types: placeholder as Registry['show_posts']['types'],
  },
  'show_post': {
    methods: ["GET","HEAD"],
    pattern: '/blog/:slug',
    tokens: [{"old":"/blog/:slug","type":0,"val":"blog","end":""},{"old":"/blog/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['show_post']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
