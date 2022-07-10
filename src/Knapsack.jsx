import Section from "./Section";
import Koffer from "./assets/koffer.svg";
import KofferTop from "./assets/koffer-top.svg";
import deck from ".";

import "./Knapsack.css";

function Knapsack(props) {
    const maxWeight = 20;

    const itemsRaw = [
        { weight: 13, priority: 4, name: "Kleidung" },
        { weight: 5, priority: 3, name: "Angelset" },
        { weight: 7, priority: 6, name: "Essen & Trinken" },
    ];

    const items = () => itemsRaw.map((item, i) => ({ i, f: item.priority / item.weight, ...item }));

    const greedy = () => {
        const itemsWeighted = [...items()];
        itemsWeighted.sort((a, b) => b.f - a.f);
        
        const solution = [];

        for (let i = 0; i <= itemsWeighted.length; i++) {
            solution.push({
                unused: itemsWeighted.slice(i),
                used: filterWeight(itemsWeighted.slice(0, i).map((i) => ({ type: "added", ...i }))),
            });
        }

        return solution;
    };

    const optimal = () => {
        const permutations = permute(items()).map(filterWeight)
        let optimal = permutations[0]
        for(let i = 1; i < permutations.length; i++) {
            if(sum(optimal) < sum(permutations[i])) {
                optimal = permutations[i]
            }
        }

        const itemsWeighted = [...items()];
        itemsWeighted.sort((a, b) => b.f - a.f);
        const used = []
        const solution = [{used: [], unused: itemsWeighted}];
        
        for (let i = 0; i < itemsWeighted.length; i++) {
            const item = itemsWeighted.at(i)

            if(optimal.find(o => o.i === item.i) !== undefined) {
                used.push(item)
            }

            solution.push({used: [...used], unused: itemsWeighted.slice(i + 1)})
        }

        return solution;
    };

    const greedyFrac = () => {
        const itemsWeighted = [...items()];
        itemsWeighted.sort((a, b) => b.f - a.f);

        const parts = []
        let freeWeight = maxWeight
        while(freeWeight > 0 && itemsWeighted.length > 0) {
            if(itemsWeighted[0].weight <= freeWeight) {
                const item = itemsWeighted.splice(0,1)[0]
                parts.push(item)
                freeWeight -= item.weight
            } else {
                const item = itemsWeighted.splice(0,1)[0]
                const factor = freeWeight / item.weight
                parts.push({
                    new: false,
                    ...item
                })
                parts.push({
                    i: item.i,
                    f: item.f,
                    weight: item.weight * factor,
                    priority: item.priority * factor,
                    name: item.name,
                    new: true
                })
            }
        }

        const solution = [];

        for (let i = 0; i < parts.length; i++) {
            solution.push({
                unused: parts.filter(a => !a.new ?? true).slice(i),
                used: parts.filter(a => a.new ?? true).slice(0, i).map((i) => ({ type: "added", ...i })),
            });
        }

        return solution;
    };

    function filterWeight(items) {
        const result = []
        for(let item of items) {
            if(sum(result) + item.weight <= maxWeight) {
                result.push(item)
            }
        }
        return result
    }

    function sum(items, type = 'weight') {
        return items.reduce((acc, val) => acc + val[type], 0)
    }

    function round(val) {
        return Math.round(val * 100) / 100
    }

    function permute(permutation) {
        var length = permutation.length,
            result = [permutation.slice()],
            c = new Array(length).fill(0),
            i = 1,
            k,
            p;

        while (i < length) {
            if (c[i] < i) {
                k = i % 2 && c[i];
                p = permutation[i];
                permutation[i] = permutation[k];
                permutation[k] = p;
                ++c[i];
                i = 1;
                result.push(permutation.slice());
            } else {
                c[i] = 0;
                ++i;
            }
        }
        return result;
    }

    function renderItem(item, showDetail) {
        return <div class={`item ${showDetail? 'large':''}`} style={`height: ${(1 / (maxWeight / item.weight)) * 300}px`}>
            <Show when={!showDetail}>
                <div>{item.name}</div>
                <div>Gewicht: {item.weight}kg</div>
                <div>Wert: {item.priority}</div>
            </Show>
            <Show when={showDetail === 'eff'}>
                <div>{item.name}</div>
                <div>{`$ h(d_{${item.i}}) = ${round(item.priority / item.weight)}$`}</div>
            </Show>
        </div>
    }

    function renderItems(steps, title, showDetail) {
        return (
            <For each={steps}>
                {(step) => (
                    <Section header={props.header} top>
                        <h3>{title} Kofferpacken</h3>
                        <div class="parallel">
                            <div class="koffer-container">
                                <Koffer class="koffer" />
                                <KofferTop id="koffer-top" class="koffer kofferTop open" />
                                <div class="max-weight">{`$G = ${sum(step.used)}$`} / {`$ ${maxWeight}kg \\ W = ${round(sum(step.used, 'priority'))} $`}</div>
                                <div class="koffer-space">
                                    <For each={step.used}>
                                        {(item) => renderItem(item, showDetail)}
                                    </For>
                                </div>
                            </div>
                            <div class="items">
                                <For each={step.unused}>
                                    {(item) => renderItem(item, showDetail)}
                                </For>
                            </div>
                        </div>
                    </Section>
                )}
            </For>
        );
    }

    setTimeout(() => {
        deck.on("fragmentshown", (event) => {
            if (event.fragment.classList.contains("open-koffer")) {
                document.getElementById("koffer-top").classList.add("open");
            }
        });
        deck.on("fragmenthidden", (event) => {
            if (event.fragment.classList.contains("open-koffer")) {
                document.getElementById("koffer-top").classList.remove("open");
            }
        });
    }, 1000);

    return (
        <>
<Section header={props.header}>
    <h3>Kofferpacken</h3>
    <div class="parallel">
        <div class="koffer-container">
            <Koffer class="koffer" />
            <KofferTop id="koffer-top" class="koffer kofferTop" />
            <div class="fragment open-koffer max-weight">Max. 20kg</div>
        </div>
        <div class="items fragment">
            <span>Gegenstände: $D$</span>
            <For each={items()}>
                {(item) => renderItem(item)}
            </For>
        </div>
    </div>
</Section>
<Section header={props.header} top>
    <h3>Kofferpacken</h3>

    <span>Gegenstände: {String.raw`$D = \\{d_1, d_2, ...\\}$`}</span><br/>
    <span>Gegenstand: {String.raw`$d_i = (Name: n_i, Gewicht: g_i, Wert: w_i)$`}</span>

    <panel class="fragment">
        <panel-title>Heuristik</panel-title>
        Wert im Verhältnis zum Gewicht: {String.raw`$h(d_i) = \\frac{w_i}{g_i}$`}
    </panel>

    <div class="fragment">
        <span>Koffer: {String.raw`$K = \\{d_1, d_2, ...\\}$`}</span><br/>
        <span>Maximalgewicht: {String.raw`$ G = \\sum g_i \\leq 20kg$`}</span><br/>
        <span>Gesamtwert: {String.raw`$ W = \\sum w_i$`}</span>
    </div>

</Section>
<Section header={props.header} top>
    <h3>Kofferpacken</h3>

    <panel class="fragment">
        <panel-title>0-1 Kofferpacken</panel-title>
        Es kann ein Gegenstand entwerder in den Koffer gepackt werden oder nicht.
    </panel>

    <panel class="fragment">
        <panel-title>Fractional Kofferpacken</panel-title>
        Es können Teile von Gegenständen in den Koffer gelegt werden.
    </panel>

</Section>
{renderItems([{unused: items(), used: []}], '0-1', 'eff')}
{renderItems(greedy(), '0-1', 'eff')}
{renderItems(optimal(), 'Optimales', 'eff')}
{renderItems(greedyFrac(), 'Fractional', 'eff')}
<Section header={props.header}>
    <h3>Zu beobachtende Eigenschaften</h3>
    <ul>
        <li>Beide Variationen besitzen Optimale Substruktur</li>
        <li>Greedy Entscheidung führt nur beim Fractional Koffer zu einer optimalen Lösung</li>
        <li>Kleine Veränderungen der Problemstellung können große Auswirkungen darauf haben, ob ein Greedy Algorithmus zu einer Optimalen Lösung führt</li>
    </ul>
</Section>
        </>
    );
}

export default Knapsack;
