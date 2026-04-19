import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'show_posts': { paramsTuple?: []; params?: {} }
    'show_post': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'show_posts': { paramsTuple?: []; params?: {} }
    'show_post': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'show_posts': { paramsTuple?: []; params?: {} }
    'show_post': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}