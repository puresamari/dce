// Document create element

type GenericOptions<E extends keyof HTMLElementTagNameMap> = Partial<HTMLElementTagNameMap[E]> & {
  createOptions?: ElementCreationOptions,
  parent?: HTMLElement,
  log?: boolean
};

function domCreateE<E extends keyof HTMLElementTagNameMap>(
  tag: E,
  { createOptions, parent, log, ...attributes }: Partial<GenericOptions<E>> = {}
): HTMLElementTagNameMap[E] {
  const mappedDom = (parent?.ownerDocument || window.document);
  if (!mappedDom) { throw new Error("No dom found"); }
  const element = mappedDom.createElement(tag, createOptions);
  for (var [key, value] of Object.entries(attributes)) {
    switch (key) {
      case 'style':
        for (var [styleAttr, styleValue] of Object.entries(value as { [key: string]: string })) {
          element.style[styleAttr as any] = styleValue;
        }
        break;
      default:
        element[key as keyof HTMLElementTagNameMap[E]] = value;
        break;
    }
  }
  if (parent) {
    parent.appendChild(element);
  }
  return element;
}

export function dce<E extends keyof HTMLElementTagNameMap>(tag: E, options?: Partial<GenericOptions<E>>): HTMLElementTagNameMap[E];
export function dce<E extends keyof HTMLElementTagNameMap>(tag: E, parent: HTMLElement, options?: Partial<GenericOptions<E>>): HTMLElementTagNameMap[E];

export function dce<E extends keyof HTMLElementTagNameMap>(
  tag: E,
  optionsOrParent?: HTMLElement | Partial<GenericOptions<E>> | undefined,
  options?: Partial<GenericOptions<E>> | undefined
): HTMLElementTagNameMap[E] {
  // This can't be done with instanceof since it might have a different dom owner (iframe)
  if (!!(optionsOrParent as HTMLElement)?.ownerDocument) {
    return domCreateE(tag, { parent: optionsOrParent as HTMLElement, ...options! });
  }
  return domCreateE(tag, optionsOrParent as any);
}