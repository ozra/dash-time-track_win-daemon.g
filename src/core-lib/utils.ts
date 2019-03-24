// dupe-ref: 59V3Ms8gpfr1mLdJixghRD
import fs, { WriteStream } from "fs-extra"
import { execSync as exec_sync } from "child_process"
import { JsonHash } from "./basic-types"
import chalk from "chalk"

export const now = Date.now

export function die(...args: any): never {
    console.error(...args)
    process.exit(1)
    throw Error("exited")
}

export function sh(
    cmd: string,
    dry_run: boolean = false,
    silent: boolean = false
) {
    silent || say(chalk.white(cmd))
    if (dry_run) {
        return ""
    } else {
        try {
            const ret = exec_sync(cmd).toString()
            say(chalk.blue(ret))
            return ret
        } catch (e) {
            if (silent) {
                throw e
            } else {
                say(
                    chalk.red(`cmd "${cmd}" failed:`),
                    e.stderr.toString(),
                    e.stdout.toString()
                )
                return e
            }
        }
    }
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

export function read_struct_file(path: string): JsonHash {
    const doc = readf(path)
    let out = {}

    // Try as JSON
    try {
        return JSON.parse(doc)
    } catch {}

    // Try some form of "^ key :|= value $" rows parsing
    try {
        const rows = doc.split(/\n/)

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
                .reduce(
                    (acc, v) => (v && { ...acc, ...v }) || acc,
                    {} as JsonHash
                )
        )
    } catch {}

    throw Error(`Don't know how to go about parsing file: "${path}"`)
}

export function openfstream(path: string): WriteStream {
    return fs.createWriteStream(path, { flags: "a" })
}
