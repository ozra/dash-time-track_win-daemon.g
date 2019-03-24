#!/usr/bin/node

import os from "os"
import { load_conf } from "./core-lib/conf-loader"
import * as TagFile from "./discap-lib/tag-file"

const say = console.log

say("discap — distributed capture thoughts")

const conf = load_conf()

const arg_handlers = [TagFile]

function main() {
    const args = process.argv.slice(2)
    // TODO filter out initial / global flags from args
    const scored = arg_handlers
        .map(v => [v.handling_score(args, conf), v])
        // .sort()
        // .filter(Boolean)
        .filter(v => v[0] > 0)

    if (scored.length === 0) {
        throw Error("don't understand the args, sorry!")
    } else if (scored.length > 1) {
        // TODO only if all same weighting?)
        throw Error("match more than one handler!!: ")
    }

    ;(scored[0]![1]! as any).handle(args, conf)
}
/**


-- -- -- -- -- -- --
-- -- -- -- -- -- --

# For simply capturing notes, ideas

- is highly contextual (follow up actions shortly after in time can modify /
    amend prev input)

    - perhaps explicitly `dash-note ... amendment stuff / follow-up`


-- -- -- -- -- -- --
-- -- -- -- -- -- --

## Usage ideas

- text => immediately at cmd

     - `#random #tags`
     - `#meat #meal`

- https://foo.bar.qwo ## backend devops streaming stack

- ... !make-preset

- enter => open editor w. temp-file and take it upon save-close

- `--metrics`
    - --mood 3 complementary comment

    - -- foo = 47
        - any key = any value

        - do levenshtein and show "did you mean..."

            - `dash-note y` | `dash-note n` | no answer (= undecided, might come up in !ls later)

- @specifically-tied-to-the-time-line-kind-of-things

- @proj=add-a-project-tag because perhaps the work was in a random space with no ties...

- !qid / !ref
    - generate a random qid for referncing (is also stored w timestamp and any additional text)

- !tag
    - tag a file with a mini-qid put into a fs-tags log for reference, it can be used for indexing, hash-tagging, associating with other files, url-bookmarks and objects

- !ls
    - list "issues" (entries that heuristically might be this or that, allow corrections simply)

- !afk til: ~1700, @some-work-target / centric

- !dr
    - "how are you man?"
        - "can you rephrase that in _other_ words that make it better?"
        - "can you be more specific?"

- !mood
    - questionare for mood, instead of just metric as above

*/
