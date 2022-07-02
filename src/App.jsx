import Motivation from "./Motivation";
import Section from "./Section";
import SelectionProblem from "./SelectionProblem";
import ShortestPath from "./ShortestPath";

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
            
            <Motivation header={headers[1]}/>

            <SelectionProblem header={headers[2]}/>

            <ShortestPath header={headers[3]}/>

            <Section header={headers[3]}>
                Wie erkennt man, wann Greedy Algorithmen optimale Lösungen zu Problemen bieten?
                <panel>
                    <panel-title>Optimale Substruktur</panel-title>
                    Sublösungen müssen Teil der optimalen Gesamtlösung sein.
                </panel>

                <panel>
                    <panel-title>Gierige Entscheidungs Eigenschaft</panel-title>
                    Die momentan beste Entscheidung muss zu einer global optimalen Lösung führen.
                </panel>

                <panel danger>
                    <panel-title>Achtung</panel-title>
                    Beide Eigenschaften bieten nicht immer eine Garantie.
                </panel>
            </Section>            
        </div>
    );
}

export default App;
