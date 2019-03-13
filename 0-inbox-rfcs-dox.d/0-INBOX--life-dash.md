-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
##
#     LIFE-DASH
##


-------------------------------------------------------------------------------
##
## Index
##

- Automated Time Tracking

- Quick Cognitive Performance Tests    <==  THIS - REALLY!

- Health / Mood Questionaire

- Common Doings Event Tracking


-------------------------------------------------------------------------------
##
## Automated Time Tracking
##

- collects "clues"
    - current open window / path / file in computer(s)
- rules to quality filter and classify clues into reasonable time-blocks
- manual "clue" / "hint" / "nudge" and timestamp-records
- "parallell / app-specific records":
    ```
    with (lit`{}` = Std.JsonValue) (
        create-entry {
            $verb: "insert"
            $values:
                domain: "std-invoice-bridge"
                v: "1.0.0"
                status: "invoiced"
                from: some-time
                until: some-later-time
            $where:
                project: "wace"
                article: $ne: "board-meeting"
        }
    )
    ```
    - never mutate auto-logged records - they're _immutable reference data_


-------------------------------------------------------------------------------
##
## Quick Cognitive Performance Tests
##

- mobile based cognitive performance tests for always accessible and consistent
  interface

- figure out which of the _quick_ tests of Lumosity are most representative of
  overall cognitive function

- makes it easy to do cognitive check-up even _hourly_ within a duration of just
  minutes



-------------------------------------------------------------------------------
##
## Health / Mood Questionaire
##

- standardized mood-questionaire
    - experienced stress level
    - experienced energy level
    - experienced mood level
    - etc. — look at the quiz from USÖ / etc.


-------------------------------------------------------------------------------
##
## Common Doings Event Tracking
##

- having-a-shower
- having-a-beat
- having-a-hit-workout
- having-cup-of-coffee
- having-a-smoke
- having-a-toke
- having-a-deep-toke
- having-a-movie-break
- having-a-series-break
- having-a-tube-break
