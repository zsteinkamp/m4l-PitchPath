inlets = 1
outlets = 1
autowatch = true

var state = {
  scaleAware: 1,
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
  //post('UPDATESCALES\n')
  if (!scaleMeta.watchers.root) {
    //post('NOROOTWATERH\n')
    return
  }
  if (!state.scaleAware) {
    //post('NOTSCALEAWARE\n')
    return
  }

  var api = new LiveAPI('live_set')
  var root = api.get('root_note')
  var intervals = api.get('scale_intervals')
  scaleMeta.notes = []

  var root_note = root - 12
  var note = root_note

  // fill scaleMeta.notes with valid note numbers
  while (note <= 127) {
    for (var i = 0; i < intervals.length; i++) {
      var interval = intervals[i]
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

function scaleAware(val) {
  state.scaleAware = val
  updateScales()
}

function init() {
  if (!scaleMeta.watchers.root) {
    scaleMeta.watchers.root = new LiveAPI(updateScales, 'live_set')
    scaleMeta.watchers.root.property = 'root_note'

    scaleMeta.watchers.int = new LiveAPI(updateScales, 'live_set')
    scaleMeta.watchers.int.property = 'scale_intervals'

    scaleMeta.watchers.mode = new LiveAPI(updateScales, 'live_set')
    scaleMeta.watchers.mode.property = 'scale_mode'
  }
}

post('Reloaded scaleAware.js\n')
