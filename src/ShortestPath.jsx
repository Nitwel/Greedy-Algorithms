import Section from "./Section"
import './ShortestPath.css'
import SVG from './assets/europe.svg'
import seedrandom from "seedrandom"
import { createSignal } from "solid-js"

function ShortestPath(props) {

    const [seed, setSeed] = createSignal(9)
    let rng = seedrandom(`${seed()}`)

    const airports = [
        {i: 1, key: 'rey', x: 105, y: 178, name: 'Reykjavik'},
        {i: 2, key: 'ale', x: 420, y: 179, name: 'Alesund'},
        {i: 3, key: 'edi', x: 278, y: 299, name: 'Edinburgh'},
        {i: 4, key: 'osl', x: 449, y: 230, name: 'Oslo'},
        {i: 5, key: 'hel', x: 598, y: 220, name: 'Helsinki'},
        // {i: 6, key: 'kop', x: 465, y: 324, name: 'Kopenhagen'},
        {i: 7, key: 'lon', x: 290, y: 388, name: 'London'},
        {i: 8, key: 'ham', x: 437, y: 371, name: 'Hamburg'},
        {i: 9, key: 'due', x: 402, y: 413, name: 'Düsseldorf'},
        {i: 10, key: 'dre', x: 493, y: 410, name: 'Dresden'},
        {i: 11, key: 'war', x: 577, y: 381, name: 'Warschau'},
        {i: 12, key: 'par', x: 334, y: 456, name: 'Paris'},
        {i: 13, key: 'mue', x: 465, y: 471, name: 'München'},
        {i: 14, key: 'wie', x: 533, y: 468, name: 'Wien'},
        {i: 15, key: 'gen', x: 381, y: 513, name: 'Genf'},
        {i: 16, key: 'bar', x: 314, y: 600, name: 'Barcelona'},
        {i: 17, key: 'lis', x: 116, y: 626, name: 'Lissabon'},
        {i: 18, key: 'rom', x: 475, y: 595, name: 'Rom'},
        {i: 19, key: 'sof', x: 654, y: 563, name: 'Sofia'},
        {i: 20, key: 'ist', x: 753, y: 579, name: 'Istanbul'}
    ]

    function getAirport(key) {
        return airports.find(a => a.key = key)
    }

    function getDistances(fromAirport) {
        const dist = airports.reduce((acc, airport) => {
            if(airport.key !== fromAirport.key) {
                acc.push({
                    key: airport.key,
                    distance: Math.sqrt(Math.pow(airport.x - fromAirport.x, 2) + Math.pow(airport.y - fromAirport.y, 2)),
                    x1: fromAirport.x,
                    y1: fromAirport.y,
                    x2: airport.x,
                    y2: airport.y,
                })
            }
            
            return acc
        }, [])
        dist.sort((a, b) => a.distance - b.distance)
        return dist
    }

    const connections = []

    for(let airport of airports) {
        let conCount = Math.floor(rng() * 2 + 2)

        const distances = getDistances(airport)
        
        while(conCount > 0 && distances.length > 0) {
            if(rng() >= 0.15) {
                connections.push(...distances.splice(0,1))
                conCount -= 1
            } else {
                distances.splice(0,1)
            }
        }
    }

    return <>
<Section id="h3" header={props.header} top data-auto-animate>
    <SVG class="map"/>
    <div class="data">
        <For each={airports}>{(airport) => <>
            <div class="circle" style={`left: ${airport.x}px; top: ${airport.y}px`} data-id={'circle'+airport.key}/>
            <div class="text" style={`left: ${airport.x + 8}px; top: ${airport.y + 4}px`} data-id={'text'+airport.key}>{airport.name}</div>
        </>}</For>
    </div>
    <div class="title">Was ist der kürzeste Weg von Dresden nach Alesund?</div>
</Section>
<Section header={props.header} top data-auto-animate>
    <SVG class="map"/>
    <div class="data">
        <For each={airports}>{(airport) => <>
            <div class="circle" style={`left: ${airport.x}px; top: ${airport.y}px`} data-id={'circle'+airport.key}/>
            <div class="text" style={`left: ${airport.x + 8}px; top: ${airport.y + 4}px`} data-id={'text'+airport.key}>{`$a_{${airport.i}}$`}</div>
        </>}</For>
    </div>
    <div class="title">Was ist der kürzeste Weg von Dresden nach Alesund?</div>
</Section>
<Section header={props.header} top data-auto-animate>
    <SVG class="map"/>
    <svg class="lines" width="960" height="700">
        <For each={connections}>{(connection) => 
            <line class="line" x1={connection.x1} y1={connection.y1} x2={connection.x2} y2={connection.y2} />
        }</For>
    </svg>
    <div class="data">
        <For each={airports}>{(airport) => <>
            <div class="circle" style={`left: ${airport.x}px; top: ${airport.y}px`} data-id={'circle'+airport.key}/>
            <div class="text" style={`left: ${airport.x + 8}px; top: ${airport.y + 4}px`} data-id={'text'+airport.key}>{`$a_{${airport.i}}$`}</div>
        </>}</For>
    </div>
    <div class="title">Was ist der kürzeste Weg von Dresden nach Alesund?</div>
</Section>
    </>
}

export default ShortestPath