import fs, { WriteStream } from "fs-extra"
import { execSync as exec_sync } from "child_process"
import { JsonHash } from "./basic-types"

export const now = Date.now

export function sh(cmd: string) {
    return exec_sync(cmd)
}

export const say = console.log

export function writef(path: string, data: string): void {
    fs.writeFileSync(path, data)
}

export function readf(path: string, data_type = "utf8"): string {
    return fs.readFileSync(path, data_type)
}

export function readdir(path: string): Array<string> {
    return fs.readdirSync(path)
}

export function readstruct(path: string): JsonHash {
    const doc = readf(path)
    let out = {}

    try {
        return JSON.parse(doc)
    } catch {}

    const rows = doc.split(/\n/)

    // Try some form of "^ key :|= value $" rows parsing
    return (
        rows
            .map((row, ix) => {
                if (row.match(/^\s*$/)) return undefined
                const mkv = row.match(/^([\w_-]+)[\s=:]+(.+)$/)
                if (mkv) {
                    const kv = mkv.slice(1)
                    const key = kv[0].replace(/-/g, "_")
                    return { [key]: kv[1] }
                }
                return { ["row_" + ix]: row }
            })
            // .filter(v => typeof v !== "undefined")
            .reduce((acc, v) => (v && { ...acc, ...v }) || acc, {} as JsonHash)
    )
}

export function openfstream(path: string): WriteStream {
    return fs.createWriteStream(path, { flags: "a" })
}
