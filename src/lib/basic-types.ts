export type JsonHash = {
    [key: string]:
        | JsonHash
        | Array<JsonHash>
        | string
        | number
        | boolean
        | undefined
}
