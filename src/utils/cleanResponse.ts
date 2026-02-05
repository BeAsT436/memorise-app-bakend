type BaseDoc = {
  _id?: unknown
  __v?: unknown
  password?: unknown
  [key: string]: unknown
}

type CleanOptions<K extends string = string> = { whitelist?: K[] }

type CleanedResponse<K extends string = string> = Record<K | 'id', unknown>


function cleanResponse<K extends string = string>(
  input: BaseDoc | BaseDoc[],
  options: CleanOptions<K> = {},
): CleanedResponse<K> | CleanedResponse<K>[] {
  const { whitelist } = options
  const clean = (doc: BaseDoc) => {
    const { _id, __v, password, ...rest } = doc

    const base: Record<string, unknown> = {
      id: typeof _id === 'object' && _id !== null ? _id.toString() : _id,
      ...rest,
    }

    if (whitelist && whitelist.length > 0) {
      return whitelist.reduce(
        (acc, key) => {
          if (key in base) acc[key] = base[key]
          return acc
        },
        { id: base.id } as CleanedResponse<K>,
      )
    }

    return base as CleanedResponse<K>
  }

  return Array.isArray(input) ? input.map(clean) : clean(input)
}
export default cleanResponse