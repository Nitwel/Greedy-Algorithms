import Section from "./Section"
import seedrandom from "seedrandom"
import { createSignal, createEffect } from "solid-js"
import './SelectionProblem.css'
import deck from "./index"

function SelectionProblem(props) {
    const [seed, setSeed] = createSignal(0)
    let rng = seedrandom(`${seed()}`)

    let eventNames = [
        'Grillen',
        'Zoobesuch',
        'Baden',
        'Kino',
        'Tauchen',
        'Besichtigung',
        'Wandern',
        'Shoppen',
        'Reittour',
        'Minigolf'
    ]

    function randomTimeRange() {
        const start = Math.floor(rng() * (24 * 4 - 1))
        const end = Math.floor(start + rng() * (24 * 4 - start))
        return [start, end]
    }

    function formatTime(time) {
        return `${Math.floor(time / 4)}:${['00','15','30','45'].at(time % 4)}`
    }

    const getEvents = () => {
        const events = []
        for(let i in eventNames) {
            const times = randomTimeRange()
            events.push({
                i,
                name: eventNames[i],
                start: times[0],
                end: times[1]
            })
        }
        return events
    }

    const [events, setEvents] = createSignal(getEvents())

    const eventsSorted = () => [...events()].sort((a,b) => a.end - b.end)

    const steps = () => {
        const steps = [
            {events: events(), solutions: []},
            {events: eventsSorted(), solutions: []},
        ]

        for(let i = 0; i < eventsSorted().length; i++) {
            const lastEnd = steps.at(-1).solutions.at(-1)?.end ?? 0
            const nextStart = steps.at(-1).events.at(i).start

            if(nextStart < lastEnd) {
                steps.push({events: grayOut(eventsSorted(), i), solutions: steps.at(-1).solutions})
            } else {
                steps.push({events: grayOut(eventsSorted(), i), solutions: [...steps.at(-1).solutions, steps.at(-1).events.at(i)], type: 'add'})

            }
        }

        return steps
    }

    function grayOut(list, n) {
        return list.map((l, i) => {
            if(i <= n) return {...l, gray: true}
            return l
        })
    }

    function random() {
        setEvents(getEvents())
        deck.getPlugins().katex.init(deck)
    }

    return <>
<Section id="h2" header={props.header} data-auto-animate>
    <h3>Planung eines Urlaubstags</h3>
    <div class="flex">
        <div class="events">
            <div>Aktivitäten $A$</div>
            <table data-id="table-0">
                <thead>
                    <tr>
                        <td class="fragment" data-fragment-index="2">$i$</td>
                        <td>Aktivität <span class="fragment" data-fragment-index="2">$a_i$</span></td>
                        <td>Start <span class="fragment" data-fragment-index="2">$s_i$</span></td>
                        <td>Ende <span class="fragment" data-fragment-index="2">$e_i$</span></td>
                    </tr>
                </thead>
                <tbody>
                    <For each={events()}>{(event) =>
                        <tr>
                            <td class="fragment" data-fragment-index="2">{event.i}</td>
                            <td>{event.name}</td>
                            <td>{formatTime(event.start)}</td>
                            <td>{formatTime(event.end)}</td>
                        </tr>
                    }</For>
                </tbody>
            </table>
        </div>
        <div class="targets fragment" data-fragment-index="3">
            Gesucht: <br/>
            
            Menge mit maximaler Anzahl von Aktivitäten $\\Omega_L$.<br/><br/>

            wobei: <br/>
            <div class="fragment">$\\Omega_L \\subseteq A$</div>
            <div class="fragment">$a_i, a_j \\in L \\in \\Omega_L $</div>
            <div class="fragment">{String.raw`$\\forall a_i,a_j: e_i < s_j$`} oder {String.raw`$s_i > e_j$`}</div>
        </div>
    </div>
    <button onClick={random} class="bottom"><span class="material-icons">sync</span></button>
</Section>
<For each={steps()}>{(step, i) => 
    <Section header={props.header} data-auto-animate data-auto-animate-duration="0.5">
        <div class="events flex">
            <div>
                <div>Aktivitäten $A$</div>
                <table data-id={`table-${i()}`}>
                    <thead>
                        <tr>
                            <td>$i$</td>
                            <td>Aktivität $a_i$</td>
                            <td>Start $s_i$</td>
                            <td>Ende $e_i$</td>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={step.events}>{(event) =>
                            <tr data-id={"aa" +event.i} class={'gray' in event ? 'gray' : ''}>
                                <td>{event.i}</td>
                                <td>{event.name}</td>
                                <td>{formatTime(event.start)}</td>
                                <td>{formatTime(event.end)}</td>
                            </tr>
                        }</For>
                    </tbody>
                </table>
            </div>
            <div>
                <div>Lösung $L$</div>
                <table>
                    <thead>
                        <tr>
                            <td style="min-width: 10px">$i$</td>
                            <td style="min-width: 120px">Aktivität $a_i$</td>
                            <td>Start $s_i$</td>
                            <td>Ende $e_i$</td>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={step.solutions}>{(event) =>
                            <tr data-id={"aa" +event.i}>
                                <td>{event.i}</td>
                                <td>{event.name}</td>
                                <td>{formatTime(event.start)}</td>
                                <td>{formatTime(event.end)}</td>
                            </tr>
                        }</For>
                    </tbody>
                </table>
            </div>
        </div>
</Section>
}</For>
<Section header={props.header}>
    <h3>Pseudocode des Algorithmus</h3>
    <pre><code data-line-numbers="1-3|4-8|9-16">{`a = {${events().map(event => event.name).slice(0,6).join(', ') + ', ...'}}
s = {${events().map(event => formatTime(event.start)).join(', ')}}
e = {${events().map(event => formatTime(event.end)).join(', ')}}

function Aktivitätsauswähler(a, s, e) {
    Sortiere Aktivitäten nach ihrem Endzeitpunkt
    k = 1
    L = {a[k]}
    for i = 2 to length(s) {
        if s[i] >= e[k] {
            A = A + {a[i]}
            k = i
        }
    }
    return L
}
    `}</code></pre>
</Section>
<Section header={props.header}>
    <h3>Zu beobachtende Eigenschaften</h3>
    <ul>
        <li class="fragment">Auswahl des nächst besten Wertes</li>
        <li class="fragment">Auswahlstrategie ändert sich nicht</li>
    </ul>
</Section>
</>}

export default SelectionProblem