import Section from "./Section"
import { createSignal } from "solid-js"
import './SelectionProblem.css'
import deck from "./index"

const [events, setEvents] = createSignal([
    { i: 0, name: 'Grillen', start: '18:30', end: '19:00'}, 
    { i: 1, name: 'Zoobesuch', start: '12:30', end: '18:00'}, 
    { i: 2, name: 'Baden', start: '16:15', end: '18:00'}, 
    { i: 3, name: 'Kino', start: '20:45', end: '23:00'}, 
    { i: 4, name: 'Tauchen', start: '16:45', end: '18:30'}, 
    { i: 5, name: 'Besichtigung', start: '11:15', end: '15:30'}, 
    { i: 6, name: 'Wandern', start: '8:30', end: '17:00'}, 
    { i: 7, name: 'Shoppen', start: '11:00', end: '18:45'}, 
    { i: 8, name: 'Reittour', start: '13:30', end: '15:45'}, 
    { i: 9, name: 'Minigolf', start: '14:30', end: '16:45'}
])

function SelectionProblem(props) {

    function parseTime(time) {
        const [hour, minute] = time.split(':').map(Number);
        return hour * 60 + minute;
    }

    const eventsSorted = () => [...events()].sort((a,b) => parseTime(a.end) - parseTime(b.end))

    const steps = () => {
        const steps = [
            {events: events(), solutions: []},
            {events: eventsSorted(), solutions: []},
        ]

        for(let i = 0; i < eventsSorted().length; i++) {
            const lastEnd = steps.at(-1).solutions.at(-1)?.end ?? '00:00'
            const nextStart = steps.at(-1).events.at(i).start

            if(parseTime(nextStart) < parseTime(lastEnd)) {
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

    function saveValues(event) {
        if(event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault()

            const table = readTable(document.getElementById('main-table'))
            window.localStorage.setItem('table', JSON.stringify(table))
            updateValues(table)
            deck.getPlugins().katex.init(deck)
        }
    }

    window.addEventListener('storage', (event) => {
        if(event.key === 'table') {
            updateValues(JSON.parse(event.newValue))
            deck.getPlugins().katex.init(deck)
        }
    })

    function updateValues(data) {
        setEvents(data.map(activity => ({
            i: activity[0],
            name: activity[1],
            start: activity[2],
            end: activity[3]
        })))
    }

    function readTable(table) {
        const rows = table.querySelectorAll('tbody tr')
        const data = [...rows].map(row => {
            const cells = [...row.querySelectorAll('td')]
            const values = cells.map(cell => cell.innerText)
            return values
        })
        return data
    }

    return <>
<Section id="reset-selection" header={props.header} data-auto-animate>
    <h3>Planung eines Urlaubstags</h3>
    <div class="flex">
        <div class="events">
            <div>Aktivitäten $A$</div>
            <table data-id="table-0" id="main-table" onKeyDown={saveValues}>
                <thead>
                    <tr>
                        <td>$i$</td>
                        <td>Aktivität <span>$a_i$</span></td>
                        <td>Start <span>$s_i$</span></td>
                        <td>Ende <span>$e_i$</span></td>
                    </tr>
                </thead>
                <tbody>
                    <For each={events()}>{(event) =>
                        <tr>
                            <td>{event.i}</td>
                            <td contentEditable>{event.name}</td>
                            <td contentEditable>{event.start}</td>
                            <td contentEditable>{event.end}</td>
                        </tr>
                    }</For>
                </tbody>
            </table>
        </div>
        <div class="targets fragment" data-fragment-index="3">
            Gesucht: <br/>
            
            Menge mit maximaler Anzahl von Aktivitäten $\\Omega_L$.<br/><br/>

            <div class="fragment">
                wobei: <br/>
                <div >{String.raw`$\\Omega_L = \\{L\\ |\\ L\\subseteq A\\}$`}</div>
                <div class="fragment">$a_i, a_j \\in L$</div>
                <div class="fragment">{String.raw`$\\forall a_i,a_j: e_i < s_j$`} oder {String.raw`$s_i > e_j$`}</div>
            </div>
        </div>
    </div>

    <aside class="notes">
        Gesucht:<br/>
        Alle lösungen mit maximaler Anzahl von Aktivitäten<br/><br/>

        Einschränkungen:<br/>
        Lösungen dürfen nur existiernde Aktivitäten enthalten<br/>
        Aktivitäten in Lösung dürfen sich nicht überschneiden
    </aside>
</Section>
<For each={steps()}>{(step, i) => 
    <Section header={props.header}>
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
                                <td>{event.start}</td>
                                <td>{event.end}</td>
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
                                <td>{event.start}</td>
                                <td>{event.end}</td>
                            </tr>
                        }</For>
                    </tbody>
                </table>
            </div>
        </div>
        <a href="#reset-selection" class="back"><button class="bottom"><span class="material-icons">arrow_back</span></button></a>
        <aside class="notes">
            Betrachten, wie ein greedy Algo so ein Problem lösen würde<br/>
            1. Sortieren nach Endzeit<br/>
            2. Nehmen was passt
        </aside>
    </Section>
}</For>
<Section header={props.header}>
    <h3>Pseudocode des Algorithmus</h3>
    <pre><code data-line-numbers="1-3|4-8|9-16">{`a = {${events().map(event => event.name).slice(0,6).join(', ') + ', ...'}}
s = {${events().map(event => event.start).join(', ')}}
e = {${events().map(event => event.end).join(', ')}}

function Aktivitätsauswähler(a, s, e) {
    Sortiere Aktivitäten nach ihrem Endzeitpunkt
    k = 1
    L = {a[k]}
    for i = 2 to length(s) {
        if s[i] > e[k] {
            A = A + {a[i]}
            k = i
        }
    }
    return L
}
    `}</code></pre>

    <aside class="notes">
        k ist Hilfsvariable zum merken der letzten Endzeit<br/>
        gehen durch jeden Wert und falls startzeit der neuen Aktivität größer als letzte endzeit:<br/>
        hinzufügen der neuen Aktivität zu L und aktualisieren der Endzeit<br/>
    </aside>
</Section>
<Section header={props.header}>
    <h3>Zu beobachtende Eigenschaften</h3>
    <ul>
        <li class="fragment">Auswahl des nächstbesten Wertes</li>
        <li class="fragment">Auswahlstrategie ändert sich nicht</li>
        <li class="fragment">Berechnet immer eine optimale Lösung</li>
    </ul>
    <aside class="notes">
        Stichpunkte abarbeiten<br/>
        konnten verstehen wie sich greedy verhält<br/>
        Interessant zu wissen was die Grenzen von Greedy algorithmen sind?
    </aside>
</Section>
</>}

export default SelectionProblem