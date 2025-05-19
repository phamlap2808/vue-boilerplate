function focusInputElement(el: HTMLElement) {
  if (!el) {
    return
  }

  let targetEl = el
  if (!['INPUT', 'TEXTAREA'].includes(el.tagName)) {
    targetEl = el.querySelector('input, textarea') as HTMLElement
  }

  targetEl?.focus?.()
}

export const vFocus = {
  mounted(el: HTMLElement) {
    focusInputElement(el)
  },
}