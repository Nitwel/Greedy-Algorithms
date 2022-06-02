function Section(props) {
    return <section>
        <header>{props.header}</header>
        <div class="content">{props.children}</div>
    </section>
}

export default Section