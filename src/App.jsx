import Section from "./Section";

function App() {
    return (
        <div class="slides">
            <Section header="Header 1">
                Section 1
            </Section>
            <Section header="Header 2">
                Section 2
            </Section>
            <Section>
                Section 2
            </Section>
            <Section>
                Section 2
            </Section>
            <Section header="Header 3">
                <h1>Hello Math</h1>
                <p>{"$J(\theta_0,\theta_1) = sum_{i=0}$"}</p>
            </Section>
        </div>
    );
}

export default App;
