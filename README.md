# PitchPath

PitchPath is a pitch sequencer that you program by drawing a line or curve.

![How it Looks](images/device.gif)

You specify the time duration the line represents, as well as the lowest and highest notes (absolute or relative).

<iframe width="100%" style="border: 20px solid black; aspect-ratio: 16 / 9" src="https://www.youtube.com/embed/2k_Yz8-ukYg?si=4bahzoA_1mXxI-eu" title="Pitch Path Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Note that PitchPath *only* deals in note pitch, and is completely decoupled from the rhythmic element of a musical phrase. This lets you treat pitch and timing independently. For instance, you could have a short looping clip of notes representing the rhythmic element of a melody. PitchPath receives each note, and depending on where it is in its own timing cycle (controlled by the `Rate` knob) will modify the pitch of the note it received before sending it out. PitchPath can be running at a different cycle length than the clip with notes, so you can get interesting variations or phasing effects between the two.

In `Absolute` mode, the pitch of those notes is completely disregarded, and the note value from the graph is used instead.

In `Relative` mode, the graph describes an offset to apply to the incoming note value before outputting it.

<iframe width="100%" style="border: 20px solid black; aspect-ratio: 16 / 9" src="https://www.youtube.com/embed/Fn-wUfJkEwE?si=BAGnZF2Re63iLusp" title="Pitch Path Relative Mode" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

In both cases, the note that is output may be optionally aligned to the Global Scale in Live 12.


## Installation

[Download the newest .amxd file from the latest release](https://github.com/zsteinkamp/m4l-PitchPath/releases) or clone this repository, and drag the `PitchPath.amxd` device into a track in Ableton Live.

## Changelog

* 2025-10-01 [v6](https://github.com/zsteinkamp/m4l-PitchPath/releases/download/v6/PitchPath-v6.amxd) - Version update checks; Helpful help.
* 2025-03-19 [v5](https://github.com/zsteinkamp/m4l-PitchPath/releases/download/v5/PitchPath-v5.amxd) - Fix problem with inconsistency around the end of the path; Thanks Rob Schoen for helping me to find a solution! Lock on to transport if added to a set and the transport is running. Thanks @louiswarynski9039 for highlighting this bug from the video. :)
* 2025-03-17 [v4](https://github.com/zsteinkamp/m4l-PitchPath/releases/download/v4/PitchPath-v4.amxd) - Improve Phase implementation. Set to 0.5% if you want more consistent MIDI results.
* 2025-03-17 [v3](https://github.com/zsteinkamp/m4l-PitchPath/releases/download/v3/PitchPath-v3.amxd) - Add Phase dial, Stop mode, instructions, and shape presets.
* 2025-02-05 [v2](https://github.com/zsteinkamp/m4l-PitchPath/releases/download/v2/PitchPath-v2.amxd) - Allowed to run free when the transport is not running; Fixed a bug around relative pitch mode and incoming note pitch lag.
* 2025-01-12 [v1](https://github.com/zsteinkamp/m4l-PitchPath/releases/download/v1/PitchPath-v1.amxd) - Initial release.

## Usage

### Setup
* Use the `Highest` and `Lowest` textboxes to set your output note range.
* Choose `Absolute` or `Relative` pitch mode.
  * `Absolute` mode will ignore the pitch of the incoming note, and only output notes in the range you specify.
  * `Relative` mode will adjust the pitch of the incoming note within the constraints of the `Highest` and `Lowest` values.
* Enable or disable `Scale Awareness`
* Adjust the `Phase` of the time cursor. 0% will start at the left edge when the transport starts, 50% will start in the middle. Changing this value during playback immediately sets the cursor to that position.
* Select a `Rate`, which is the time interval that the graph represents. Note that changing the rate will not cause a "jump" in value, and hence not necessarily be time-aligned with Live's transport. I chose that behavior on purpose to open more possibilities. If you need to stay grid-aligned, perhaps you can use precisely-placed automation breakpoints?

### Usage
* Send notes to PitchPath with MIDI notes, an arpeggiator, or another device like [LenStepper](https://plugins.steinkamp.us/m4l-LenStepper).
* PROTIP: You can set `Rate` to `Stop`, then use the `Phase` dial to scrub around the path manually or modulate it with a different device.

## TODO

* Non-note time values (?)

## Contributing

I'd love it if others extended this device. If you would like to contribute, simply fork this repo, make your changes, and open a pull request and I'll have a look.
