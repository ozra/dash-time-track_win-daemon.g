// dupe-ref: 2O8H4k6bNyVfcaupfG3hGE
export type JsonHash = {
    [key: string]:
        | JsonHash
        | Li<JsonHash>
        | string
        | number
        | boolean
        | undefined
}

export type Li<T> = Array<T>

export type Str = string

export type Bool = boolean

export type Undef = undefined

export type Num = number
