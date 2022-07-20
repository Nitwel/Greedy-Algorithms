import Section from "./Section"
import Topf from './assets/topf.svg'

function Motivation(props) {
    return <>

<Section id="h1" header={props.header}>
<h3>Effizientes Lösen von Optimierungsproblemen</h3>

    <panel class="fragment">
        <panel-title>Optimierungsproblem</panel-title>
        <span class="fragment">Menge möglicher Lösungen: $ \\Omega $</span><br/>
        <span class="fragment">Fitnessfunktion: {String.raw`$ f: \\Omega \\rightarrow \\mathbb{R}  $`}</span><br/>
        <span class="fragment">Ziel: {String.raw`$ min\\{f(x)\\ |\\ x \\in \\Omega\\} $`} oder {String.raw`$ max\\{f(x)\\ |\\ x \\in \\Omega\\} $`}</span>
    </panel>
    
    <div class="fragment">
        <span>Beispiel:</span><br/>
        <h5>Koche ein günstiges Gericht das dich satt macht.</h5>

        <Topf style="width: 400px; position: absolute; bottom: 100px; right: 0px"/>

        <table class="fragment" style="font-size: 24px; margin: 0">
            <tbody>
                <tr>
                    <td>Zutat</td>
                    <td>$z_i$ mit Preis $p_i$</td>
                </tr>
                <tr class="fragment">
                    <td>Zutaten</td>
                    <td>{String.raw`$Z = \\{z_1, z_2, ..., z_n \\}$`}</td>
                </tr>
                <tr  class="fragment">
                    <td>Mögliche Gerichte</td>
                    <td>{String.raw`$\\Omega = \\{G_1, G_2, ...\\ |\\ G_j \\subseteq Z\\}$`}</td>
                </tr>
                <tr  class="fragment">
                    <td>Fitnessfunktion</td>
                    <td>{String.raw`$f(G_j) =\\sum\\limits_{z_i \\in G_j} p_i $`}</td>
                </tr>
                <tr  class="fragment">
                    <td>Ziel</td>
                    <td>{String.raw`$min\\{f(G_i)\\}$`}</td>
                </tr>
            </tbody>
        </table>
    </div>
</Section>

<Section header={props.header}>
    <h3>Was für Lösungsansätze könnten wir wählen?</h3>
    <ul>
        <li class="fragment">Greedy Algorithmen</li>
        <li class="fragment">Dynamische Algorithmen</li>
        <li class="fragment">Approximationsalgorithmen</li>
        <li class="fragment">Evolutionäre Algorithmen</li>
        <li class="fragment">Neuronale Netzwerke</li>
    </ul>
</Section>
    </>
}

export default Motivation