import { JsonHash } from "./basic-types"

export type DetailType = "file" | "cwd" | "page_title" | "unknown"

export type BaseWinInfo = {
    app: string
    win_title: string
}

export type RefinedInfo = {
    project?: string
    detail?: string
    type: DetailType
}

export type FullIntell = BaseWinInfo &
    RefinedInfo & {
        // foo?: boolean
    }

export namespace Rs {
    export enum Kind {
        Undefined = 0,
        ChapterHeader = 33,
        EventPoint = 42,
        Hint = 47,
        Retroaction = 23,
        DaemonAlivePing = 13
    }

    export enum Version {
        v1 = 1
    }

    export type ChronStamp = number

    export enum EventId {
        Undefined = 0,
        WorkSubject = 1
    }

    export enum DetailType {
        unknown = 0,
        file = 3,
        cwd = 4,
        page_title = 8
    }

    // NOTE: serial or similar, which is added to a lut with jsonhash that is
    // referenced to, instead of output again and again, until deemed time for a
    // new chapter-header - to make some "catch-up" points then and when
    // Make it a LRU with just a few cycling chapter-defs, like x amount of
    // possible backrefs (if one switches between about ten projects - a lot
    // bigger lookback than that can be kept ofc.)
    export type ReferenceIdForChaptedDeffedData = string

    export type AppName = string

    export type Detail = string
}

export type LogRecord = EventRecord | PingRecord

export type EventRecord = [
    Rs.Kind.EventPoint,
    Rs.Version.v1,
    Rs.ChronStamp,
    Rs.EventId,
    Rs.AppName,
    Rs.DetailType,
    Rs.Detail,
    JsonHash
]

export type PingRecord = [Rs.Kind.DaemonAlivePing, Rs.Version.v1, Rs.ChronStamp]

export type ChapterHeaderRecord = [
    Rs.Kind.ChapterHeader,
    Rs.Version.v1,
    Rs.ChronStamp,
    [Rs.ReferenceIdForChaptedDeffedData, JsonHash]
]
