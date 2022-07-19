import Knapsack from "./Knapsack";
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
                <center>
                    <h2>Greedy Algorithmen</h2>
                    Nils Twelker<br/>

                    <a href="https://nitwel.de" target="_blank" style="display: inline-flex; align-items: center;"><span class="material-icons">language</span>nitwel.de</a><br/>
                    <br/>
                    Proseminar Theoretische Informatik<br/>
                    TU Dresden 2022
                </center>
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

            <Section header={headers[2]}>
                <h2>Planung eines Urlaubstags</h2>
                <h4>Activity Selection Problem</h4>
            </Section>

            <SelectionProblem header={headers[2]}/>

            <Section header={headers[3]}>
                <h2>Kürzester Weg zwischen zwei Orten</h2>
                <h4>Shortest Path Problem</h4>
            </Section>

            <ShortestPath header={headers[3]}/>

            <Section header={headers[3]}>
                Wie erkennt man, wann Greedy Algorithmen optimale Lösungen zu Problemen bieten?
                <panel class="fragment">
                    <panel-title>Optimale Substruktur</panel-title>
                    Sublösungen müssen Teil der optimalen Gesamtlösung sein.
                </panel>

                <panel class="fragment">
                    <panel-title>Gierige Entscheidung</panel-title>
                    Die momentan beste Entscheidung muss zu einer global optimalen Lösung führen.
                </panel>

                <panel class="fragment" danger>
                    <panel-title>Achtung</panel-title>
                    Zusammen zwar hinreichend, aber nicht notwendig.
                </panel>
            </Section>

            <Section header={headers[3]}>
                <h2>Packen eines Koffers</h2>
                <h4>Knapsack Problem</h4>
            </Section> 

            <Knapsack header={headers[3]}/>

            <Section header={headers[4]}>
                <h3>Vor und Nachteile von Greedy Algorithmen</h3>
                <div class="parallel">
                    <div class="fragment">
                        <h4>Pro</h4>
                        <ul>
                            <li>Schnell auszuführen</li>
                            <li class="fragment">Einfach zu entwickeln</li>
                            <li class="fragment">ausreichent guten Lösungen bei komplexen Problemen</li>
                        </ul>
                    </div>
                    <div class="fragment">
                        <h4>Contra</h4>
                        <ul>
                            <li>Nicht immer anwendbar</li>
                        </ul>
                    </div>
                </div>
            </Section>       
        </div>
    );
}

export default App;
