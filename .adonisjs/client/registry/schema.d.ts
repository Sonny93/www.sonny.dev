/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/home_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/home_controller').default['render']>>>
    }
  }
  'show_posts': {
    methods: ["GET","HEAD"]
    pattern: '/blog'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/show_posts_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/show_posts_controller').default['render']>>>
    }
  }
  'show_post': {
    methods: ["GET","HEAD"]
    pattern: '/blog/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/show_post_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/show_post_controller').default['render']>>>
    }
  }
}
