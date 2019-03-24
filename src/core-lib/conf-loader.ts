import { say, read_struct_file } from "./utils"
import { homedir } from "os"
import { JsonHash } from "./basic-types"

export type DecentDisDashConf = {
    app_home: string
    paths: {
        event_records: string
        fs_tags: string
    }
} & JsonHash

export function load_conf(): DecentDisDashConf {
    const conf = load_raw_conf()
    return decorate_conf(conf)
}

function load_raw_conf() {
    const std_conf_path = homedir() + "/.config/decent-dash/decent-dash.cfg"
    say("looks for conf at std-conf-path:", std_conf_path)

    let conf = read_struct_file(std_conf_path)

    if (Object.keys(conf).length === 1 && conf.hasOwnProperty("app_home")) {
        say("only found redirection conf", conf)
        const second_conf = read_struct_file(conf.app_home + "/decent-dash.cfg")
        conf = { ...conf, ...second_conf }
    } else {
        conf = { ...conf, app_home: homedir() + "/.config/decent-dash/" }
    }
    say("found app home and full conf", conf)
    return conf as Partial<DecentDisDashConf>
}

/// Add some commonly used confs, so they're defined in one place and not all
/// over the programs
function decorate_conf(conf: Partial<DecentDisDashConf>): DecentDisDashConf {
    const mine = conf.app_home

    const decorations = {
        paths: {
            event_records: `${mine}/record_log/`,
            fs_tags: `${mine}/fs_tags_log.d/`
        }
    }

    return {
        ...conf,
        ...decorations
    } as DecentDisDashConf
}
