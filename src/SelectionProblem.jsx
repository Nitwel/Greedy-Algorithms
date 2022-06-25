import Section from "./Section"
import seedrandom from "seedrandom"
import { createSignal, createEffect } from "solid-js"
import './SelectionProblem.css'

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
            {events: eventsSorted().slice(1), solutions: [eventsSorted()[0]], type: 'add'}
        ]

        while(steps.at(-1).events.length > 0) {
            const lastEnd = steps.at(-1).solutions.at(-1).end
            const nextStart = steps.at(-1).events.at(0).start
            if(nextStart < lastEnd) {
                steps.push({events: steps.at(-1).events.slice(1), solutions: steps.at(-1).solutions, type: 'remove'})
            } else {
                steps.push({events: steps.at(-1).events.slice(1), solutions: [...steps.at(-1).solutions, steps.at(-1).events.at(0)], type: 'add'})

            }
        }

        return steps
    }

    function random() {
        setEvents(getEvents())
    }

    return <>
<Section id="h2" header={props.header} data-auto-animate>
    Planung eines Tages im Urlaub
    <div class="events">
        <div>Aktivitäten $A$</div>
        <table data-id="table">
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
        Ziele:
        <div class="fragment">Menge aller optimalen Lösungen: $L$</div>
        <div class="fragment">{"$ 1. \\\\ \\\\forall l \\\\subseteq A: \\\\ wenn \\\\ \\\\exists m: \\\\ |m| > |l| \\\\ dann \\\\ l \\\\notin L $"}</div>
        <div class="fragment">{"$ 2. \\\\ \\\\forall  (a_i,a_j): e_i < s_j \\\\vee e_j < s_i $"}</div>
    </div>
    <button onClick={random} class="random"><span class="material-icons">sync</span></button>
</Section>
<For each={steps()}>{(step) => 
    <Section header={props.header} data-auto-animate data-auto-animate-duration="0.5">
        <div class="events">
            <Show when={step.events.length > 0}>
                <div>Aktivitäten $A$</div>
                <table>
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
                            <tr data-id={"aa" +event.i}>
                                <td>{event.i}</td>
                                <td>{event.name}</td>
                                <td>{formatTime(event.start)}</td>
                                <td>{formatTime(event.end)}</td>
                            </tr>
                        }</For>
                    </tbody>
                </table>
            </Show>
            <div>Lösung $L$</div>
            <table>
                <thead>
                    <tr>
                        <td>$i$</td>
                        <td>Aktivität $a_i$</td>
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
</Section>
}</For>
<Section header={props.header}>
    
</Section>
</>}

export default SelectionProblem