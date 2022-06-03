import Section from "./Section";

function App() {
    const headers = [
        'Übersicht',
        'Motivation',
        'Was macht ein Greedy Algorithmus?',
        'Was sind die Grenzen von Greedy Algorithmen?',
        'Zusammenfassung'
    ]

    return (
        <div class="slides">
            <Section>
                <h2>Greedy Algorithmen</h2>
            </Section>
            <Section id="h0" header={headers[0]}>
                <ul>
                    <For each={headers}>{(header, i) => 
                        <a href={"#/h" + i()}>
                            <li>{header}</li>
                        </a>
                    }</For>
                </ul>
            </Section>
            <Section id="h1" header={headers[1]}>
                Effizientes lösen von Optimierungsproblemen<br/>
                Beispiele:<br/>
                <ul>
                    <li>Planung von Aktivitäten an einem Tag</li>
                    <li>Planung der effizientesten Flugroute</li>
                    <li>Optimale packen eines Koffers</li>
                </ul>
            </Section>

            <Section header={headers[1]}>
                Was für Lösungsansätze könnten wir wählen?<br/>
                <ul>
                    <li>Greedy Algorithmen</li>
                    <li>Dynamische Algorithmen</li>
                </ul>
            </Section>

            <Section header={headers[1]} skip-counter>
                Section 2
            </Section>
            <Section id="h2" header={headers[1]}>
                Section 2
            </Section>
            <Section header={headers[2]} data-auto-animate>
                <h1>Hello Math</h1>
                <div inline>{"$J(\theta_0,\theta_1) = $"}</div>
                <div inline data-id="1">{"$ sum_{i=0}$"}</div>
            </Section>

            <Section header={headers[2]} skip-counter data-auto-animate>
                <h1>Hello Math</h1>
                <div inline data-id="1">{"$sum_{i=0}$"}</div>
                <div inline>{"$ = 3$"}</div>
            </Section>
        </div>
    );
}

export default App;
