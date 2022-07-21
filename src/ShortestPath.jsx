import Section from "./Section"
import './ShortestPath.css'
import SVG from './assets/europe.svg'
import { createSignal } from "solid-js"
import deck from './index'

function ShortestPath(props) {

    const airports = [
        {key: 'rey', x: 105, y: 178, name: 'Reykjavik'},
        {key: 'ale', x: 420, y: 179, name: 'Alesund'},
        {key: 'edi', x: 278, y: 299, name: 'Edinburgh'},
        {key: 'osl', x: 449, y: 230, name: 'Oslo'},
        {key: 'hel', x: 598, y: 220, name: 'Helsinki'},
        {key: 'lon', x: 290, y: 388, name: 'London'},
        {key: 'ham', x: 437, y: 371, name: 'Hamburg'},
        {key: 'dre', x: 493, y: 410, name: 'Dresden'},
        {key: 'war', x: 577, y: 381, name: 'Warschau'},
        {key: 'par', x: 334, y: 456, name: 'Paris'},
        {key: 'wie', x: 533, y: 468, name: 'Wien'},
        {key: 'gen', x: 381, y: 513, name: 'Genf'},
        {key: 'bar', x: 314, y: 600, name: 'Barcelona'},
        {key: 'lis', x: 116, y: 626, name: 'Lissabon'},
        {key: 'rom', x: 475, y: 595, name: 'Rom'},
        {key: 'sof', x: 654, y: 563, name: 'Sofia'},
        {key: 'ist', x: 753, y: 579, name: 'Istanbul'}
    ].map((airport, i) => ({i: i + 1, ...airport}))

    function getAirport(key) {
        if(typeof key === 'number')  return airports.find(a => a.i === key)
        return airports.find(a => a.key === key)
    }

    const connections = [
        [ 'rey', 'edi' ], [ 'rey', 'lon' ],
        [ 'edi', 'lon' ], [ 'edi', 'ale' ],
        [ 'ale', 'osl' ], [ 'ale', 'hel' ],
        [ 'osl', 'ham' ], [ 'hel', 'dre' ],
        [ 'ham', 'dre' ], [ 'lon', 'par' ],
        [ 'par', 'lis' ], [ 'par', 'bar' ],
        [ 'gen', 'rom' ], [ 'gen', 'bar' ],
        [ 'dre', 'wie' ], [ 'dre', 'war' ],
        [ 'wie', 'sof' ], [ 'wie', 'rom' ],
        [ 'sof', 'ist' ], [ 'gen', 'dre' ],
        [ 'edi', 'ham' ], [ 'war', 'hel' ],
        [ 'war', 'wie' ], [ 'lis', 'bar' ],
        [ 'gen', 'wie' ], [ 'lon', 'osl' ],
        [ 'ist', 'war' ], [ 'war', 'sof' ],
        [ 'par', 'gen' ], [ 'lon', 'ham' ],
        [ 'par', 'dre' ], [ 'gen', 'ham' ],
        [ 'rom', 'sof' ]
      ].map(conn => {
        const fromAirport = getAirport(conn[0])
        const toAirport = getAirport(conn[1])

        return {
            from: fromAirport,
            to: toAirport,
            x1: fromAirport.x,
            y1: fromAirport.y,
            x2: toAirport.x,
            y2: toAirport.y,
            length: distance(fromAirport, toAirport)
        }
    })

    function distance(airport1, airport2) {
        return Math.sqrt(Math.pow(airport2.x - airport1.x, 2) + Math.pow(airport2.y - airport1.y, 2))
    }

    function flightsFrom(airport) {
        return connections.filter(conn => conn.from.key === airport.key || conn.to.key === airport.key)
    }

    // dre - ale
    // osl - sof
    const [from, setFrom] = createSignal('osl')
    const [to, setTo] = createSignal('sof')

    const [edit, setEdit] = createSignal(null)

    function toggleEdit(airport) {
        if(edit() === null) {
            if(airport.key === from()) {
                setFrom(null)
                setEdit('from')
                
            } else if(airport.key === to()) {
                setTo(null)
                setEdit('to')
            }
            return
        }
        if(edit() === 'to') {
            setTo(airport.key)
            window.localStorage.setItem('to', airport.key)
        } else {
            setFrom(airport.key)
            window.localStorage.setItem('from', airport.key)
        }
        deck.getPlugins().katex.init(deck)
        setEdit(null)
    }

    window.addEventListener('storage', (event) => {
        if(event.key === 'from') {
            setFrom(event.newValue)
            deck.getPlugins().katex.init(deck)
        }
        if(event.key === 'to') {
            setTo(event.newValue)
            deck.getPlugins().katex.init(deck)
        }
    })

    const title = () => <h3 class="path-title">
        Was ist der kürzeste Weg von 
        <span class="from">{from() ? getAirport(from()).name : '?'}</span> nach 
        <span class="to"> {to() ? getAirport(to()).name : '?'}</span>
        ?
    </h3>

    const greedyPath = () => {

        const connections = [[]]
        let nextFrom = getAirport(from())
        let toAirport = getAirport(to())
        
        while(nextFrom.key !== to()) {
            const flights = flightsFrom(nextFrom).map(f => {
                if(f.from.key === nextFrom.key) return {h: distance(toAirport, f.to), ...f}
                return {h: distance(toAirport, f.from), ...f}
            })
        
            let closestFlight = flights[0]
            for(let flight of flights) {
                if(flight.h < closestFlight.h) {
                    closestFlight = flight
                }
            }

            if(closestFlight.to.key === nextFrom.key) {
                nextFrom = closestFlight.from
            } else {
                nextFrom = closestFlight.to
            }
            connections.push([...connections.at(-1), closestFlight])
        }

        return connections
    }

    const aStar = () => {

        let toAirport = getAirport(to())

        const g = {[from()]: 0}
        const reversed = {}
        const visited = []
        
        while(Object.keys(g).filter((key) => !visited.includes(key)).length > 0) {
            const fScores = Object.entries(g).filter(([key]) => !visited.includes(key)).map(([key, val]) => [key, val + distance(getAirport(key), toAirport)])
            let nextAirport = fScores[0]
            for(let [key, val] of fScores) {
                if(val < nextAirport[1]) nextAirport = [key, val]
            }

            

            if(nextAirport[0] === toAirport.key) break;

            visited.push(nextAirport[0])

            const flights = flightsFrom(getAirport(nextAirport[0]))
            for(let flight of flights) {
                let key = flight.from.key === nextAirport[0] ? flight.to.key : flight.from.key
                const newDistance = g[nextAirport[0]] + distance(getAirport(nextAirport[0]), getAirport(key))

                if(key in g) {
                    if(g[key] > newDistance) {
                        g[key] = newDistance
                        reversed[key] = nextAirport[0]
                    }
                } else {
                    g[key] = newDistance
                    reversed[key] = nextAirport[0]
                }
            }
        }

        const path = []
        let rev = to()

        while(rev !== from()) {
            path.push([rev, reversed[rev]])
            rev = reversed[rev]
        }

        const mappedPath = path.map(p => connections.find(c => p[0] === c.from.key && p[1] === c.to.key || p[1] === c.from.key && p[0] === c.to.key ))
        const steps = []
        for(let i = 0; i <= mappedPath.length; i++) {
            steps.push(mappedPath.slice(mappedPath.length - i))
        }

        return steps
    }

    function colorPath(line, greedy, astar = null) {
        let s = ''
        if(greedy.findIndex(p => p.from.key === line.from.key && p.to.key === line.to.key) !== -1) {
            s += 'greedy '
        }
        if(astar && astar.findIndex(p => p.from.key === line.from.key && p.to.key === line.to.key) !== -1) {
            s += 'astar '
        }
        return s
    }

    function trim(s) {
        return s.substr(0, 3).toLowerCase()
    }

    function generateExample(from, to) {
        const fromN = trim(from.name)
        const toN = trim(to.name)
        return <div>
            {`$$
            \\begin{split} d(z_{${fromN}}, z_{${toN}})  &= \\sqrt{(x_{${toN}} - x_{${fromN}})^2 + (y_{${toN}} - y_{${fromN}})^2} \\\\
            &= \\sqrt{(${to.x} - ${from.x})^2 + (${to.y} - ${from.y})^2} \\\\ &\\approx ${Math.round(Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)))}
            \\end{split}
            $$`}
        </div>
    }

    function generateMap(showLines = true, mapNames = (airport) => `$z_{${trim(airport.name)}}$`, mapLines = (line) => ``) {
        
        return <>
            <Show when={showLines}>
                <svg class="lines" width="960" height="700">
                    <For each={connections}>{(connection) => 
                        <line class={`line ${mapLines(connection)}`} x1={connection.x1} y1={connection.y1} x2={connection.x2} y2={connection.y2} />
                    }</For>
                </svg>
            </Show> 
            <div class="data">
                <For each={airports}>{(airport) => <>
                    <div onClick={[toggleEdit, airport]} class={`circle ${from() === airport.key ? 'from' : ''} ${to() === airport.key ? 'to' : ''}`} style={`left: ${airport.x}px; top: ${airport.y}px`}/>
                    <div onClick={[toggleEdit, airport]} class="text" style={`left: ${airport.x + 8}px; top: ${airport.y + 0}px`}>{mapNames(airport)}</div>
                </>}</For>
            </div>
        </>
    }

    return <>
<Section header={props.header} data-auto-animate>
    <SVG class="map"/>
    {title}
</Section>
<Section id="map-names" header={props.header} top data-auto-animate>
    <SVG class="map"/>
    {generateMap(false, (airport) => airport.name)}
    {title}
    <aside class="notes">
        Oslo oben mitte<br/>
        Sofia unten rechts<br/><br/>
    </aside>
</Section>
<Section header={props.header} top data-auto-animate>
    <SVG class="map"/>
    {generateMap(false)}
    {title}
    <aside class="notes">
        Vergeben von kürzeln
    </aside>
</Section>
<Section header={props.header} top data-auto-animate>
    <SVG class="map"/>
    {generateMap()}
    {title}
    <aside class="notes">
        Flugverbindungen sind benötigt.<br/>
        Brauchen nun Entscheidungsfaktor<br/>
    </aside>
</Section>
<Section header={props.header} top>
    {title}
    Gesucht: Entscheidungsfaktor um Greedy Entscheidungen zu treffen.<br/><br/>
    <panel class="fragment">
        <panel-title>Heuristik (Luftlinie)</panel-title>
        Koordinaten von Flughafen $z_i$ : $(x_i, y_i) \\in \\N \\times \\N$ <br/>
        Luftlinie von $z_i$ nach $z_j$ : {`$ d(z_i, z_j) = \\\\sqrt{(x_j - x_i)^2 + (y_j - y_i)^2} $`}
    </panel>
    <br/>
    <div class="fragment">
        Beispiel:
        {!!from() && !!to() ?generateExample(getAirport(from()), getAirport(to())) : ''}
    </div>
    <aside class="notes">
        mit hilfe der Distanz zwischen zwei Flughäfen durch Satz des Pytagoras<br/>
    </aside>
</Section>
<Section id="reset-map" header={props.header} top data-auto-animate>
    <SVG class="map"/>
    {generateMap()}
    {title}
    <aside class="notes">
        Wollen jetzt distanz von jedem Flughafen nach Sofia
    </aside>
</Section>
<Show when={from() != null && to() !== null}>
    <Section header={props.header} top data-auto-animate>
        <SVG class="map"/>
        {generateMap(true, (airport) => `${Math.round(distance(airport, getAirport(to())))}`)}
        {title}
        <aside class="notes">
            Nun von Oslo aus kleinste Zahl finden.<br/>
            Ausgewählte Stecke zusammenrechnen<br/>
        </aside>
    </Section>
    <For each={greedyPath()}>{(path) => 
        <Section header={props.header} top>
            <SVG class="map"/>
            {generateMap(
                true,
                (airport) => `${Math.round(distance(airport, getAirport(to())))}`,
                (line) => colorPath(line, path)
            )}
            {title}
            <div class="stats">
                <div>Strecke Greedy:</div><div>{Math.round(path.reduce((acc, p) => acc + p.length, 0))}</div>
            </div>
            <a href="#reset-map" class="back"><button class="bottom"><span class="material-icons">arrow_back</span></button></a>
        </Section>
    }</For>
    <For each={aStar()}>{(path) => 
        <Section header={props.header} top>
            <SVG class="map"/>
            {generateMap(
                true,
                (airport) => `${Math.round(distance(airport, getAirport(to())))}`,
                (line) => colorPath(line, greedyPath().at(-1), path)
            )}
            {title}
            <div class="stats">
                <div>Strecke Greedy:</div><div>{Math.round(greedyPath().at(-1).reduce((acc, p) => acc + p.length, 0))}</div>
                <div>Strecke Optimal:</div><div>{Math.round(path.reduce((acc, p) => acc + p.length, 0))}</div>
            </div>
            <a href="#reset-map" class="back"><button class="bottom"><span class="material-icons">arrow_back</span></button></a>
            <aside class="notes">
                Man konnte sehen Greedy findet eine optimale Lösung<br/>
                Jetzt andere Verbindung betrachten - dazu Zuschauer fragen<br/><br/>

                Wie kann man vorzeitig erkennen ob immer optimal lösbar?
            </aside>
        </Section>
    }</For>
</Show>
    </>
}

export default ShortestPath