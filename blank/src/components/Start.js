import React from 'react'
import * as Tone from 'tone'



export default function Start() {
    function start() {
        Tone.start()
        // const synth = new Tone.Synth().toDestination();
        // synth.triggerAttackRelease("C4", "32n");
    }
    start()

  return (
    <div>
        {/* <button className="start" onClick={start}>start</button> */}
    </div>
  )
}
