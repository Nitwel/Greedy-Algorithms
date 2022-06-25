/* @refresh reload */
import { render } from 'solid-js/web';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import {KaTeX} from 'reveal.js/plugin/math/katex';

import './index.css';
import App from './App';

let deck = new Reveal({
    controls: false,
    progress: false,
    transition: 'none',
    plugins: [ Markdown, KaTeX ]
})

render(() => <App />, document.getElementById('root'));
deck.initialize({
    center: false,
    margin: 0,
    display: 'flex',
    autoAnimateUnmatched: false
})

export default deck