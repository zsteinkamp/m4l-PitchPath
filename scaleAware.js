inlets = 1
outlets = 1
autowatch = true

var state = {
  scaleAware: 1,
  rootNote: 0, // default C
  scaleIntervals: [0, 2, 4, 5, 7, 9, 11], // default major
}

var scaleMeta = {
  notes: [],
  watchers: {
    root: null,
    int: null,
    mode: null,
  },
}

function updateScales() {
  scaleMeta.notes = []

  var root_note = state.rootNote - 12
  var note = root_note

  // fill scaleMeta.notes with valid note numbers
  while (note <= 127) {
    for (var i = 0; i < state.scaleIntervals.length; i++) {
      var interval = state.scaleIntervals[i]
      note = root_note + interval
      if (note >= 0 && note <= 127) {
        scaleMeta.notes.push(note)
      }
    }
    root_note += 12
    note = root_note
  }
  //post('SCALE ' + JSON.stringify(scaleMeta.notes) + '\n')
}

function quantizeNote(tag, noteNum) {
  if (!state.scaleAware) {
    outlet(0, tag, noteNum)
    return
  }
  var i = 12
  for (var i = 0; i < 12; i++) {
    var tryNote = noteNum - i
    if (scaleMeta.notes.indexOf(tryNote) > -1) {
      //post('QUANTIZE: ' + noteNum + ' => ' + tryNote + '\n');
      outlet(0, tag, tryNote)
      return
    }
  }
}

function scaleIntervals() {
  var intervals = []
  for (var i = 0; i < arguments.length; i++) {
    intervals.push(arguments[i])
  }
  state.scaleIntervals = intervals
  //post('INTS ' + state.scaleIntervals.join(',') + '\n')
  updateScales()
}
function rootNote(val) {
  state.rootNote = val
  updateScales()
}

function scaleAware(val) {
  state.scaleAware = val
  updateScales()
}

post('Reloaded scaleAware.js\n')
