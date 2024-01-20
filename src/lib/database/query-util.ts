interface ArrayToParamsOption {
  baseNumber: number
  separator: string
  startsWith: string
  endsWith: string
}

export function arrayToParams<T>(
  arr: T[],
  _option?: Partial<ArrayToParamsOption>
): string {
  const option: ArrayToParamsOption = Object.assign(
    {
      baseNumber: 1,
      separator: ",",
      startsWith: "",
      endsWith: "",
    },
    _option
  )
  return arr
    .map(
      (_, i) =>
        `${option.startsWith}$${i + option.baseNumber}${option.endsWith}`
    )
    .join(option.separator)
}
