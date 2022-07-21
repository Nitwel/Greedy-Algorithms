import Knapsack from "./Knapsack";
import Motivation from "./Motivation";
import Section from "./Section";
import SelectionProblem from "./SelectionProblem";
import ShortestPath from "./ShortestPath";
import Holiday from './assets/holiday.svg'
import Plane from './assets/plane.svg'

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

                    <a href="mailto:uni@nitwel.de" target="_blank" style="display: inline-flex; align-items: center;">uni@nitwel.de</a><br/>
                    <br/>
                    Proseminar Theoretische Informatik<br/>
                    TU Dresden 2022<br/>
                    <a href="https://theo.nitwel.de" target="_blank" style="display: inline-flex; align-items: center;">theo.nitwel.de</a><br/>

                </center>

                <aside class="notes">
                    Intro - Greedy erklären<br/>
                    Wer ich bin<br/>
                    Urlaubsthematik - wetter<br/>
                    Interaktive Folien -später<br/>
                </aside>
            </Section>
            <Section id="h0" header={headers[0]}>
                <ul>
                    <For each={headers.slice(1)}>{(header, i) => 
                        <a href={"#/h" + i()}>
                            <li>{header}</li>
                        </a>
                    }</For>
                </ul>
                <aside class="notes">
                    Zuerst will ich euch motivieren warum es sich lohnt über greedy zu wissen<br/>
                    grob betrachten - was greedy macht<br/>
                    genauer eingehen - wo sind Grenzen<br/>
                    finale übersicht
                </aside>
            </Section>
            
            <Motivation header={headers[1]}/>

            <Section id="h2" header={headers[2]}>
                <h2>Planung eines Urlaubstags</h2>
                <h4>Activity Selection Problem</h4>

                <Holiday class="holiday"/>
            </Section>

            <SelectionProblem header={headers[2]}/>

            <Section id="h3" header={headers[3]}>
                <h2>Kürzester Weg zwischen zwei Orten</h2>
                <h4>Shortest Path Problem</h4>

                <Plane class="plane"/>
            </Section>

            <ShortestPath header={headers[3]}/>

            <Section id="properties" header={headers[3]}>
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

                <aside class="notes">
                    Wenn kürzester Weg von Hamburg nach Sofia über Dresden und Wien<br/>
                    Dann kürzester Weg von Dresden nach Sofia auch über Wien<br/><br/>

                    Selection Problem immer nächste Aktivität nehmen.
                </aside>
            </Section>

            <Section header={headers[3]}>
                <h2>Packen eines Koffers</h2>
                <h4>Knapsack Problem</h4>

                <aside class="notes">
                    Beide Eigenschaften gut am Kofferpacken zu sehen
                </aside>
            </Section> 

            <Knapsack header={headers[3]}/>

            <Section id="h4" header={headers[4]}>
                <h3>Weitere Probleme die Greedy optimal lößt</h3>
                <ul>
                    <li class="fragment">Datenkompession: Huffman Codes</li>
                    <li class="fragment">kürzester Weg von einem Punkt: Dijkstra Algorithmus</li>
                </ul>
            </Section> 

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
            <Section header={headers[4]}>
                <h3>Vielen Dank für eure Aufmerksamkeit!</h3>
                <br/>
                Folien unter 
                <a href="https://theo.nitwel.de" target="_blank" style="display: inline-flex; align-items: center;">theo.nitwel.de</a><br/>

                <aside class="notes">
                    Auf interaktivität hinweisen.
                </aside>
            </Section> 
        </div>
    );
}

export default App;
