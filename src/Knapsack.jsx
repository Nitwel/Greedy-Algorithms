import Section from "./Section";
import Koffer from "./assets/koffer.svg";
import KofferTop from "./assets/koffer-top.svg";
import deck from ".";

import "./Knapsack.css";

function Knapsack(props) {
    const maxWeight = 20;

    const itemsRaw = [
        { weight: 13, priority: 4, name: "Alkohol" },
        { weight: 5, priority: 3, name: "Sonnencreme" },
        { weight: 7, priority: 6, name: "Hut" },
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

        return optimal
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

    function sum(items) {
        return items.reduce((acc, val) => acc + val.weight, 0)
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

    function renderItems(steps) {
        return (
            <For each={steps}>
                {(step) => (
                    <Section header={props.header}>
                        <h3>Kofferpacken</h3>
                        <div class="parallel">
                            <div class="koffer-container">
                                <Koffer class="koffer" />
                                <KofferTop id="koffer-top" class="koffer kofferTop open" />
                                <div class="max-weight">$max.\\ {maxWeight}kg$</div>
                                <div class="koffer-space">
                                    <For each={step.used}>
                                        {(item) => (
                                            <div class="item" data-id={`item-${item.name}`} style={`height: ${(1 / (maxWeight / item.weight)) * 300}px`}>
                                                <div>
                                                    {item.name} {item.weight}kg
                                                </div>
                                                <div>Wichtigkeit: {item.priority}</div>
                                            </div>
                                        )}
                                    </For>
                                </div>
                            </div>
                            <div class="items">
                                <For each={step.unused}>
                                    {(item) => (
                                        <div
                                            class="item"
                                            data-id={`item-${item.name}`}
                                            style={`height: ${(1 / (maxWeight / item.weight)) * 300}px; transform: translate()`}
                                        >
                                            <div>
                                                {item.name} {item.weight}kg
                                            </div>
                                            <div>Wichtigkeit: {item.priority}</div>
                                        </div>
                                    )}
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
            <div class="fragment open-koffer max-weight">$max.\\ 20kg$</div>
        </div>
    </div>
</Section>
<Section header={props.header}>
    <h3>Kofferpacken</h3>
    <div class="parallel">
        <div class="koffer-container">
            <Koffer class="koffer" />
            <KofferTop id="koffer-top" class="koffer kofferTop open" />
            <div class="max-weight">$max.\\ {maxWeight}kg$</div>
        </div>
        <div class="items">
            <For each={items()}>
                {(item) => (
                    <div class="item" style={`height: ${(1 / (maxWeight / item.weight)) * 300}px`}>
                        <div>
                            {item.name} {item.weight}kg
                        </div>
                        <div>Wichtigkeit: {item.priority}</div>
                    </div>
                )}
            </For>
        </div>
    </div>
</Section>
{renderItems(greedy())}
{renderItems([{used: [], unused: items()}, {used: optimal(), unused: []}])}
        </>
    );
}

export default Knapsack;
