import { say, readstruct } from "./utils"
import { homedir } from "os"
import { JsonHash } from "./basic-types"

export function load_conf(): JsonHash {
    const std_conf_path = homedir() + "/.config/decent-dash/decent-dash.cfg"
    say("looks for conf at std-conf-path:", std_conf_path)

    let conf = readstruct(std_conf_path)

    if (Object.keys(conf).length === 1 && conf.hasOwnProperty("app_home")) {
        say("only found redirection conf", conf)
        const second_conf = readstruct(conf.app_home + "/decent-dash.cfg")
        conf = { ...conf, ...second_conf }
    } else {
        conf = { ...conf, app_home: homedir() + "/.config/decent-dash/" }
    }
    say("found app home and full conf", conf)
    return conf
}
