import Section from "./Section"

function Motivation(props) {
    return <>

<Section id="h1" header={props.header}>
    <h3>Effizientes lösen von Optimierungsproblemen</h3>

    <panel>
        <panel-title>Optimierungsproblem</panel-title>
        Menge an möglichen Lösungen: $ \\Omega $<br/>
        Fitnessfunktion: {String.raw`$ f: \\Omega \\rightarrow \\mathbb{R}  $`}<br/>
        Ziel: {String.raw`$ min\\{f(x) | x \\in \\Omega\\} $`} oder {String.raw`$ max\\{f(x) | x \\in \\Omega\\} $`}
    </panel>
    
</Section>

<Section header={props.header}>
    Beispiele:<br/>
    <ul>
        <li>
            Planung von Aktivitäten an einem Tag:<br/>
            {String.raw`$ \\Omega = \\{\\{a_1,a_3, a_4\\}, \\{a_2, a_7\\}, ...\\} \\ f(x) = |x| $`}
        </li>
        <li>
            Planung der effizientesten Flugroute<br/>
            {String.raw`$ \\Omega = \\{\\{r_1,r_3, r_4\\}, \\{r_2, r_7\\}, ...\\}\\ f(x) = \\sum_{i=1}^{|x|}x_i $`}
        </li>
        <li>
            Optimale packen eines Koffers<br/>
            {String.raw`$ \\Omega = \\{\\{g_1,g_3, g_4\\}, \\{g_2, g_7\\}, ...\\}\\ f(x) = \\sum_{i=1}^{|x|}x_i $`}
        </li>
    </ul>
    
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