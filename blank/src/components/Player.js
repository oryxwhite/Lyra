import { useEffect, useState, useMemo } from 'react'
import * as Tone from 'tone'
import './components.css'
import { Donut } from 'react-dial-knob'
// import Sketch from "react-p5"

export default function Player(props) {
    
    const [player, setPlayer] = useState(new Tone.Player(props.url).toDestination())
    const [volume, setVolume] = useState(0)
    const [value, setValue] = useState(100)
    const [fadeIn, setFadeIn] = useState(0)
    const [fadeOut, setFadeOut] = useState(0)
    const [loopStart, setLoopStart] = useState(0)
    const [loopEnd, setLoopEnd] = useState(player.buffer.length)
    
    function playerGen() {
        player.start()
    }

    function loop(e) {
        if (e.target.checked) {
            player.loop = true
        } else {
            player.loop = false
        }
    }

    function reverse(e) {
        if (e.target.checked) {
            player.reverse = true
        } else {
            player.reverse = false
        }
    }

    function mute(e) {
        if (e.target.checked) {
            player.mute = true;
        } else {
            player.mute = false;
        }
    }
   
    useMemo (() => {
        player.volume.value = volume
    }, [volume])

    useMemo(() => {
        player.playbackRate = value/100
    }, [value])
   
    useMemo(() => {
        player.fadeIn = fadeIn/100
    }, [fadeIn])

    useMemo(() => {
        player.fadeOut = fadeOut/50
    }, [fadeOut])

    useMemo(() => {
        player.loopStart = loopStart/100;
       
    }, [loopStart])

    useMemo(() => {
        player.loopEnd = loopEnd / 48000
       
    }, [loopEnd])


  return (
    <div className='player'>
        
        <button onClick={playerGen}>♪</button>

        <div className="checkbox">
            <input type="checkbox" name="loop" id="loop" className="loop" onChange={loop}/>
            <label htmlFor="loop">loop</label>
            <input type="checkbox" name="reverse" id="reverse" className="reverse" onChange={reverse}/>
            <label htmlFor="reverse">reverse</label>
        </div>

        
        <div className='knobs'>
        <input type="checkbox" name="mute" id="mute" className="mute" onChange={mute}/>
            <label htmlFor="mute">mute</label>

        <Donut className="donut"
                diameter={35}
                min={-100}
                max={0}
                step={1}
                value={volume}
                theme={{
                    donutColor: '#34003b'
                }}
                
                onValueChange={setVolume}
                ariaLabelledBy={'my-label'}>
                <label id={'my-label'}>volume</label>
        </Donut>
            
            <Donut className="donut"
                diameter={35}
                min={1}
                max={100}
                step={1}
                value={value}
                theme={{
                    donutColor: '#34003b'
                }}
                
                onValueChange={setValue}
                ariaLabelledBy={'my-label'}>
                <label id={'my-label'}> rate</label>
        </Donut>

        <Donut
                diameter={35}
                min={0}
                max={100}
                step={1}
                value={fadeIn}
                theme={{
                    donutColor: '#34003b'
                }}
                onValueChange={setFadeIn}
                ariaLabelledBy={'my-label'}>
                <label id={'my-label'}>fadeIn</label>
        </Donut>

        <Donut
                diameter={35}
                min={0}
                max={100}
                step={1}
                value={fadeOut}
                theme={{
                    donutColor: '#34003b'
                }}
                onValueChange={setFadeOut}
                ariaLabelledBy={'my-label'}>
                <label id={'my-label'}>fadeOut</label>
        </Donut>
        <div className='donut'>
        <Donut className="donut"
                diameter={35}
                min={0}
                max={player.buffer.length ? (Math.floor(player.buffer.duration) * 100) : 100}
                step={1}
                value={loopStart}
                theme={{
                    donutColor: '#34003b'
                }}
                onValueChange={setLoopStart}
                ariaLabelledBy={'my-label'}>
                <label id={'my-label'}>loopStart</label>
        </Donut></div>
        <Donut
                diameter={35}
                min={0}
                max={player.buffer.length ? player.buffer.length : 100}
                step={1}
                value={loopEnd}
                theme={{
                    donutColor: '#34003b'
                }}
                onValueChange={setLoopEnd}
                ariaLabelledBy={'my-label'}>
                <label id={'my-label'}>loopEnd</label>
        </Donut>

      

       </div>
       {/* <Sketch setup={setup} draw={draw} /> */}
    </div>
  )
}
