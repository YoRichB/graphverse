# GraphVerse

A full-bleed, interactive force-directed network graph app built with HTML5 Canvas and the D3.js force simulation. No build step and no CDN: D3, a Lucide icon subset and the Inter font are bundled in the repo.

![GraphVerse screenshot](docs/screenshot.png)

**Live demo:** https://aitrendz.org/projects/graphverse/

## Features

- **Canvas rendering:** smooth rendering with hover states, zoom and pan (mouse wheel, trackpad and pinch-to-zoom), and a "Fit" button that fits the graph to the space not covered by panels.
- **Node drag and pin:** drag nodes with a mouse or a finger (dragging a node moves the node, never the view). Double-click or double-tap a node, or use the inspector, to pin and unpin it; pinned nodes get a dashed ring.
- **Simulation controls:** pause/resume (the button always shows the real state), reheat, and live sliders for link distance, charge repulsion, collision radius and gravity.
- **Search:** autocomplete search with highlighting and dimming of non-matching nodes. Arrow keys move through results, Enter jumps to a node, Esc closes the list or clears the search.
- **Inspector:** node details, degree, and connected-neighbour chips you can click through. It scrolls, and Esc closes it.
- **Preset datasets:** Tech Ecosystem, Social Network and Biological Signaling. Switching resets search, selection and zoom.
- **Add and remove nodes:** add nodes and links straight into the running simulation (no rebuild). Names are trimmed, capped at 40 characters and checked for duplicates ignoring case, with inline error messages. Removing a node asks for confirmation and can be undone.
- **Mobile layout:** full-width search row, Add and Presets always reachable, controls in a bottom sheet behind a "Controls" button, the inspector as a scrollable bottom sheet that keeps the selected node in view, and 44px touch targets.
- **Keyboard and screen readers:** Tab to the graph, then arrow keys move to the nearest node in that direction (`[` / `]` step through every node), Enter opens details, P pins, F centers, `+` `-` `0` zoom and fit, `/` searches and `?` lists all shortcuts. A live region announces the focused node and the inspector's contents. Native `<dialog>` modals with focus trapping, Esc to close and focus return; visible neon focus rings; labelled icon buttons; no axe-core violations at desktop or phone widths.
- **Reduced motion:** follows the OS "reduce motion" setting (or the Controls toggle): the layout settles instantly and zooms jump instead of animating.
- **Save, import and export:** save the current graph (nodes, links, positions, pins and settings) in this browser, export or import it as JSON, or export a PNG of the view. Imports are validated: size limits, de-duplicated ids, links to missing nodes dropped, numbers clamped, https-only links and all text rendered as plain text.
- **Live AI Trends dataset:** the "Live AI Trends" preset (or `?preset=trends`) reads [aitrendz.org/trends.json](https://aitrendz.org/trends.json) in the browser and links each story to its topic and to stories that share a tag. Story details include the summary, a build idea and a link to the source. If the live file can't be reached it falls back to a bundled snapshot (`trends-snapshot.js`), and if that fails too the current graph stays put.

## Run it

Serve the folder with any static server (for example `python3 -m http.server`) and open `index.html`. Everything it needs is in the repo.

## License

MIT © 2026 Richard Balint. Bundled third-party code: D3 (ISC, `vendor/LICENSE-d3.txt`), Lucide icons (ISC, `vendor/LICENSE-lucide.txt`), Inter font (SIL OFL, `fonts/OFL-Inter.txt`).
