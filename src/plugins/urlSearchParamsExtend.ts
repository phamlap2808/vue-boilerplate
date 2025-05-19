import { useUrlSearchParams } from '@vueuse/core'
import { isString } from 'remeda'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import type { LocationQueryRaw } from 'vue-router'

const params = useUrlSearchParams('history', {
  removeFalsyValues: true,
})

function generateComputedGet<T = string>(
  key: string,
  type: 'string' | 'array' | 'boolean' | 'number' = 'string',
  defaultValue?: unknown,
) {
  const value = params[key]

  if (type === 'array' && isString(value)) {
    return (value ? [value] : defaultValue) as T
  }

  if (type === 'boolean') {
    return (value === 'true') as T
  }

  if (type === 'number') {
    return ((value ? Number(value) : undefined) ?? defaultValue) as T
  }

  return (value ?? defaultValue) as T
}

export function getComputedUrlParam<T = string>(
  key: string,
  type: 'string' | 'array' | 'boolean' | 'number' = 'string',
  defaultValue?: unknown,
) {
  return computed(() => generateComputedGet<T>(key, type, defaultValue))
}

export function getWritableComputedUrlParam<T = string>(
  key: string,
  type: 'string' | 'array' | 'boolean' | 'number' = 'string',
  defaultValue?: unknown,
) {
  return computed({
    get() {
      return generateComputedGet<T>(key, type, defaultValue)
    },
    set(val) {
      let value: unknown = val

      if (type === 'boolean') {
        value = val ? String(val) : undefined
      }
      else if (type === 'number') {
        value = val || val === 0 ? String(val) : undefined
      }

      if (value instanceof Array) {
        params[key] = value
      }
      else {
        params[key] = value ? String(value) : ''
      }
    },
  })
}

/**
 * Forces the update of URL search parameters to reflect the current or provided query state.
 * This function is essential when Vue Router-based navigation causes `useUrlSearchParams` not
 * to respond as expected. It specifically refreshes a single parameter, ensuring that the
 * UI reflects the most current route state without waiting for reactive updates that may not occur.
 *
 * @param {LocationQueryRaw} [q] - An optional query object to force refresh from.
 *                                 If not provided, the current route's query will be used.
 */
export function forceRefreshUrlSearchParams(q?: LocationQueryRaw) {
  const route = useRoute()
  const query = q || route.query
  for (const key in query) {
    if (query[key] !== params[key]) {
      params[key] = query[key] as string | string[]
    }
  }
}

/**
 * Forces the update of a specific URL search parameter by key, based on the current or provided query object.
 * This function is essential when Vue Router-based navigation causes `useUrlSearchParams` not
 * to respond as expected. It specifically refreshes a single parameter, ensuring that the
 * UI reflects the most current route state without waiting for reactive updates that may not occur.
 *
 * @param {string} key - The key of the parameter to update.
 * @param {LocationQueryRaw} [q] - An optional query object to force refresh from.
 *                                 If not provided, the current route's query will be used.
 */
export function forceRefreshUrlSearchParamsByKey(key: string, q?: LocationQueryRaw) {
  const route = useRoute()
  const query = q || route.query
  if (query[key] !== params[key]) {
    params[key] = query[key] as string | string[]
  }
}

export function resetUrlSearchParams(values: Record<string, null | string | (string | null)[]> = {}) {
  Object.keys(params).forEach((key) => {
    params[key] = undefined as unknown as string
  })

  Object.keys(values).forEach((key) => {
    const value = (values[key] instanceof Array ? values[key].filter(i => i) : values[key]) as string | string[]
    if (value) {
      params[key] = value
    }
  })
}

export function removeUrlSearchParams(keys: string[]) {
  keys.forEach((key) => {
    params[key] = undefined as unknown as string
  })
}
