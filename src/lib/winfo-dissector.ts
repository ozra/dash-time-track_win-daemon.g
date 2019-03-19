import { RefinedInfo, BaseWinInfo } from "./record-types"

type DissectorMap = { [key: string]: (v: BaseWinInfo) => RefinedInfo }

const dissectors_: DissectorMap = {
    Default: v => {
        return {
            app: v.app,
            detail: v.win_title,
            type: "unknown"
        }
    },
    Atom: v => {
        return {
            app: v.app,
            detail: v.win_title,
            type: "file"
        }
    },
    Code: v => {
        const ret = v.win_title
            .split(/[\s—-]+\./)
            // .join("")
            .map(v =>
                v.replace(/^[^\w/]\s+/, "").replace(/\s*.Unsupported./, "")
            )

        return {
            app: v.app,
            project: ret[0],
            detail: ret[1],
            type: "file"
        }
    },
    Firefox: v => {
        return {
            app: v.app,
            detail: v.win_title.replace(/\s- Mozilla Firefox/, ""),
            type: "page_title"
        }
    },
    "Google-chrome": v => {
        return {
            app: "Chrome",
            detail: v.win_title.replace(/\s- Google Chrome/, ""),
            type: "page_title"
        }
    },
    "Mate-terminal": v => {
        return {
            app: "Mate Term",
            detail: v.win_title,
            type: "cwd"
        }
    }
}

export function dissector(base_info: BaseWinInfo): RefinedInfo {
    const fn = dissectors_[base_info.app] || dissectors_.Default
    try {
        return fn(base_info)
    } catch {
        return dissectors_.Default(base_info)
    }
}
