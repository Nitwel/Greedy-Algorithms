import counter from "./counter"

function Section(props) {
    return <section data-auto-animate={props['data-auto-animate']} data-auto-animate-duration={props['data-auto-animate-duration']} id={props.id}>
        <header>{props.header}</header>
        <div class="content">{props.children}</div>
        <footer>
            <span>Nils Twelker</span>
            <span>TU Dresden 2022 | Proseminar Theoretische Informatik</span>
            <span style="min-width: 20px;">{counter(!props['skip-counter'])}</span>
        </footer>
    </section>
}

export default Section