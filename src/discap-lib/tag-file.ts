#!/usr/bin/node

import { Qid, base62 } from "qid"
import { Li, Str } from "../core-lib/basic-types"
import { DecentDisDashConf } from "../core-lib/conf-loader"

export function handling_score(args: Li<Str>, conf: DecentDisDashConf) {
    const cmd = args.pop()
    return cmd && ["tag", "#!"].includes(cmd) ? 1 : 0
    // TODO is filename enough - will a filename first signify anything else in discap?
}

export function handle(args: Li<Str>, conf: DecentDisDashConf) {
    const META_DATA_HOME = conf.paths.fs_tags
    // TODO
}
