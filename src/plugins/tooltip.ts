import 'tippy.js/dist/svg-arrow.css'
import 'tippy.js/dist/tippy.css'

import tippy, { type Instance, type Props, roundArrow } from 'tippy.js'

type VTooltipConfig = Partial<Props> & { wrapperClass?: string }
export type VTooltipBindingType = {
  value: string | { content: string, config: VTooltipConfig }
}

export function getTooltip() {
  const tooltipInstanceMap: WeakMap<object, Instance> = new WeakMap()

  function getCtx(binding: VTooltipBindingType) {
    let content = ''
    let config = {}
    if (typeof binding.value === 'object') {
      ;({ content, config } = binding.value)
    }
    else {
      content = binding.value
    }
    return {
      content,
      config,
    }
  }

  function getContentHtml(content: string, config: VTooltipConfig) {
    const { wrapperClass = '' } = config || {}

    return `<div class="break-word whitespace-pre-wrap text-xs ${wrapperClass}">${content}</div>`
  }

  function createInstance(el: HTMLElement, content: string, config: VTooltipConfig = {}) {
    if (!content) {
      return
    }
    tooltipInstanceMap.get(el)?.destroy()

    const contentHtml = getContentHtml(content, config)
    delete config.wrapperClass

    const instance = tippy(el, {
      content: contentHtml,
      appendTo: () => document.body,
      arrow: roundArrow,
      allowHTML: true,
      placement: 'top',
      theme: 'tippy-tooltip',
      maxWidth: 700,
      ...config,
    })

    tooltipInstanceMap.set(el, instance)

    return instance
  }

  return {
    mounted(el: HTMLElement, binding: VTooltipBindingType) {
      const { content, config } = getCtx(binding)
      if (!content) {
        return
      }
      createInstance(el, content, config)
    },
    updated(el: HTMLElement, binding: VTooltipBindingType) {
      const { content, config } = getCtx(binding)
      if (!content) {
        tooltipInstanceMap.get(el)?.disable()
        return
      }
      const instance
        = tooltipInstanceMap.get(el) || createInstance(el, content, config)

      instance?.setContent(getContentHtml(content, config))
      if (config && Object.keys(config).length > 0) {
        instance?.setProps(config)
      }
      tooltipInstanceMap.get(el)?.enable()
    },
    unmounted(el: HTMLElement) {
      tooltipInstanceMap.get(el)?.destroy()
    },
  }
}
