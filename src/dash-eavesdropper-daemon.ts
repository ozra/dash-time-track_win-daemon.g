import { JsonHash } from "./core-lib/basic-types"
import { FullIntell, LogRecord, Rs } from "./core-lib/record-types"
import { WriteStream } from "fs-extra"
import { say, sh, now, openfstream } from "./core-lib/utils"
import awin from "active-win"
import { dissector } from "./core-lib/winfo-dissector"
import { load_conf } from "./core-lib/conf-loader"

// TODO check if we can use x11 along for spying — INCLUDING keypresses (activity stats)
import { do_x11inator } from "./X11inator"

const conf = load_conf()
const CHECK_INTERVAL = 1000
const PING_INTERVAL = conf.ping_interval || 5 * 60 * 1000

const state = {
    last_emit: 0,
    last_base: { app: "", win_title: "" },
    log_stream: (undefined as any) as WriteStream
}

// // // // //

/**

# TODO

- events-sources
    - Win-Info
    - "activity"
        - keypresses, mouse-movement!??
    - "events/" - dump-dir
        - for dumping hints into that decent-dash can pick up and use
            as signals
        - SIMPLY DROP file named as _TIMESTAMP_ _or sequentially numbered named_
            - With JSON!
            - or SIMPLER to PRODUCE from different platforms:
                - `key: val\n`...

- detectives (seeks up additional info)
    - "clues dump dir" ?
    - project dir (in general)
    - git repo (specifically - when applicable)
    - change of filesizes
*/

// // // // //
// // // // //
main()

// TODO PoC
do_x11inator()
// // // // //
// // // // //

// // // // //
async function main() {
    init(conf)
    setInterval(poll_win_info, CHECK_INTERVAL)
}

function init(conf: JsonHash) {
    init__ensure_paths()
    init__open_log_stream()
}

function init__ensure_paths() {
    const paths = conf.paths
    say("Ensures working-directories in", conf.app_home)
    // TODO: we should just iterate all the paths in "paths":
    sh(`mkdir -p "${paths.event_records}/ "${paths.fs_tags}/"`)
}

function init__open_log_stream() {
    const paths = conf.paths
    // TODO should roll every hour or whatever
    const ts = now()
    state.log_stream = openfstream(`${paths.event_records}/at_${ts}`)
}

// // // // //
async function poll_win_info() {
    const winfo = await awin()

    const base = {
        app: winfo.owner.name,
        win_title: winfo.title
    }

    if (
        base.app === state.last_base.app &&
        base.win_title === state.last_base.win_title
    ) {
        if (now() - state.last_emit >= PING_INTERVAL) {
            write_ping_record()
        }
        return
    }

    state.last_base = { ...base }

    const data = {
        ...base,
        ...dissector(base)
    }

    write_event_record(data)
}

function write_ping_record() {
    write_record([Rs.Kind.DaemonAlivePing, Rs.Version.v1, now()])
}

function write_event_record(data: FullIntell) {
    // Seriously - just make a specific property for "assorted k-v's" and add
    // those — deleting _all_ properties.. Wtf! 'tis ridiciluous

    const remaining_props = { ...data }
    delete remaining_props.app
    delete remaining_props.win_title
    delete remaining_props.detail
    delete remaining_props.type

    write_record([
        Rs.Kind.EventPoint,
        Rs.Version.v1,
        now(),
        Rs.EventId.WorkSubject,
        data.app,
        Rs.DetailType[data.type],
        data.detail || data.win_title,
        remaining_props
    ])
}

function write_record(record_data: LogRecord) {
    record_data[1] = Math.round(record_data[1])
    const rec = JSON.stringify(record_data)
    say(rec)
    // if passing-log-rotate-timepoint => open new file so older can be purged
    // Or just simply after some time, like that, y'ä'know
    state.log_stream.write(rec + "\n")
    state.last_emit = now()
}
