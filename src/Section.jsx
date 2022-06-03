import { counter } from "./counter"

function Section(props) {
    return <section data-auto-animate={props['data-auto-animate']} id={props.id}>
        <header data-id="header">{props.header}</header>
        <div class="content">{props.children}</div>
        <footer data-id="header">
            <span>Nils Twelker</span>
            <span>TU Dresden 2022 | Proseminar Theoretische Informatik</span>
            <span>{counter(!props['skip-counter'])}</span>
        </footer>
    </section>
}

export default Section