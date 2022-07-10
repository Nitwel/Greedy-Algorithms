import Section from "./Section"

function Motivation(props) {
    return <>

<Section id="h1" header={props.header}>
<h3>Effizientes Lösen von Optimierungsproblemen</h3>

    <panel>
        <panel-title>Optimierungsproblem</panel-title>
        Menge an möglichen Lösungen: $ \\Omega $<br/>
        Fitnessfunktion: {String.raw`$ f: \\Omega \\rightarrow \\mathbb{R}  $`}<br/>
        Ziel: {String.raw`$ min\\{f(x) | x \\in \\Omega\\} $`} oder {String.raw`$ max\\{f(x) | x \\in \\Omega\\} $`}
    </panel>
    <span>Beispiel:</span><br/>
    <h5>Koche ein günstiges Gericht das dich Satt macht mit den Zutaten, die du Zuhause hast.</h5>

    <table style="font-size: 24px">
        <tbody>
            <tr>
                <td>Zutat</td>
                <td>$z_i$ mit Preis $p_i$</td>
            </tr>
            <tr>
                <td>Gericht</td>
                <td>{String.raw`$G = \\{z_1, z_2, ..., z_n\\}$`}</td>
            </tr>
            <tr>
                <td>Mögliche Gerichte</td>
                <td>{String.raw`$\\Omega = \\{G_1, G_2, ...\\}$`}</td>
            </tr>
            <tr>
                <td>Fitnessfunktion</td>
                <td>{String.raw`$f(G_i) = \\sum_{j=1}^n p_j $`}</td>
            </tr>
            <tr>
                <td>Ziel</td>
                <td>{String.raw`$min\\{f(G_i)\\}$`}</td>
            </tr>
        </tbody>
    </table>


    
</Section>

<Section header={props.header}>
    <h3>Was für Lösungsansätze könnten wir wählen?</h3>
    <ul>
        <li>Greedy Algorithmen</li>
        <li>Dynamische Algorithmen</li>
        <li>Approximationsalgorithmen</li>
        <li>Evolutionäre Algorithmen</li>
        <li>Neuronales Netzwerk</li>
    </ul>
</Section>
    </>
}

export default Motivation