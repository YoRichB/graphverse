/* GraphVerse v2 · MIT © 2026 Richard Balint */
(function () {
'use strict';
const DATASETS = {
    tech: {
        name: "Tech Ecosystem",
        nodes: [
            { id: "React", group: "Frontend", val: 28, desc: "A JS library for building user interfaces." },
            { id: "Vue.js", group: "Frontend", val: 20, desc: "Progressive JavaScript Framework." },
            { id: "TypeScript", group: "Languages", val: 32, desc: "Strongly typed programming language that builds on JavaScript." },
            { id: "JavaScript", group: "Languages", val: 35, desc: "High-level programming language of the Web." },
            { id: "Python", group: "Languages", val: 30, desc: "Interpreted high-level general-purpose programming language." },
            { id: "Node.js", group: "Backend", val: 26, desc: "JavaScript runtime built on Chrome's V8 engine." },
            { id: "FastAPI", group: "Backend", val: 18, desc: "Modern, fast Web framework for Python." },
            { id: "PostgreSQL", group: "Database", val: 24, desc: "Powerful open source object-relational database." },
            { id: "Redis", group: "Database", val: 18, desc: "In-memory data structure store used as key-value database." },
            { id: "Docker", group: "DevOps", val: 25, desc: "OS-level virtualization to deliver software in packages." },
            { id: "Kubernetes", group: "DevOps", val: 22, desc: "Container orchestration platform." },
            { id: "TailwindCSS", group: "Frontend", val: 16, desc: "Utility-first CSS framework." },
            { id: "GraphQL", group: "API", val: 18, desc: "Query language for APIs." },
            { id: "REST API", group: "API", val: 22, desc: "Architectural style for web services." },
            { id: "AWS", group: "Cloud", val: 24, desc: "Comprehensive cloud computing platform." }
        ],
        links: [
            { source: "React", target: "TypeScript", label: "written in" },
            { source: "Vue.js", target: "JavaScript", label: "uses" },
            { source: "TypeScript", target: "JavaScript", label: "superset of" },
            { source: "Node.js", target: "JavaScript", label: "runs" },
            { source: "React", target: "TailwindCSS", label: "styled with" },
            { source: "FastAPI", target: "Python", label: "built with" },
            { source: "Node.js", target: "GraphQL", label: "serves" },
            { source: "Node.js", target: "PostgreSQL", label: "connects to" },
            { source: "FastAPI", target: "PostgreSQL", label: "queries" },
            { source: "FastAPI", target: "Redis", label: "caches with" },
            { source: "Docker", target: "Node.js", label: "containerizes" },
            { source: "Docker", target: "FastAPI", label: "containerizes" },
            { source: "Kubernetes", target: "Docker", label: "orchestrates" },
            { source: "AWS", target: "Kubernetes", label: "hosts" },
            { source: "GraphQL", target: "REST API", label: "alternative to" }
        ]
    },
    social: {
        name: "Social Network",
        nodes: [
            { id: "Alice (Lead)", group: "Core Team", val: 30, desc: "Product Manager and strategy lead." },
            { id: "Bob (Dev)", group: "Engineering", val: 24, desc: "Full Stack Engineer working on API integrations." },
            { id: "Charlie (UX)", group: "Design", val: 20, desc: "UI/UX Designer creating design tokens." },
            { id: "Diana (Data)", group: "Data Science", val: 22, desc: "Data Engineer working on analytics pipelines." },
            { id: "Evan (Dev)", group: "Engineering", val: 18, desc: "Frontend React Developer." },
            { id: "Fiona (QA)", group: "QA", val: 16, desc: "Quality Assurance Specialist." },
            { id: "George (Ops)", group: "DevOps", val: 20, desc: "Site Reliability Engineer." },
            { id: "Hannah (Marketing)", group: "Growth", val: 18, desc: "Growth Marketer." }
        ],
        links: [
            { source: "Alice (Lead)", target: "Bob (Dev)", label: "manages" },
            { source: "Alice (Lead)", target: "Charlie (UX)", label: "directs" },
            { source: "Alice (Lead)", target: "Hannah (Marketing)", label: "syncs with" },
            { source: "Bob (Dev)", target: "Evan (Dev)", label: "pairs with" },
            { source: "Bob (Dev)", target: "Diana (Data)", label: "integrates" },
            { source: "Charlie (UX)", target: "Evan (Dev)", label: "provides specs" },
            { source: "Evan (Dev)", target: "Fiona (QA)", label: "submits code" },
            { source: "George (Ops)", target: "Bob (Dev)", label: "supports" },
            { source: "Diana (Data)", target: "Hannah (Marketing)", label: "reports to" }
        ]
    },
    bio: {
        name: "Biological Signaling",
        nodes: [
            { id: "EGFR", group: "Receptor", val: 28, desc: "Epidermal Growth Factor Receptor." },
            { id: "GRB2", group: "Adaptor", val: 18, desc: "Growth Factor Receptor-Bound Protein 2." },
            { id: "SOS1", group: "GEF Factor", val: 16, desc: "Son of Sevenless Homolog 1." },
            { id: "KRAS", group: "GTPase", val: 26, desc: "Kirsten Rat Sarcoma Virus Oncogene." },
            { id: "BRAF", group: "Kinase", val: 22, desc: "Serine/threonine-protein kinase B-Raf." },
            { id: "MEK1", group: "Kinase", val: 20, desc: "Mitogen-activated protein kinase kinase 1." },
            { id: "ERK2", group: "Kinase", val: 24, desc: "Extracellular Signal-Regulated Kinase 2." },
            { id: "MYC", group: "TF", val: 20, desc: "Nuclear Transcription Factor." }
        ],
        links: [
            { source: "EGFR", target: "GRB2", label: "binds" },
            { source: "GRB2", target: "SOS1", label: "recruits" },
            { source: "SOS1", target: "KRAS", label: "activates" },
            { source: "KRAS", target: "BRAF", label: "stimulates" },
            { source: "BRAF", target: "MEK1", label: "phosphorylates" },
            { source: "MEK1", target: "ERK2", label: "phosphorylates" },
            { source: "ERK2", target: "MYC", label: "induces" }
        ]
    }
};

const GROUP_COLORS = {
    "Frontend": "#38bdf8",
    "Backend": "#818cf8",
    "Languages": "#f43f5e",
    "Database": "#fbbf24",
    "DevOps": "#34d399",
    "API": "#a78bfa",
    "Cloud": "#fb923c",
    "Core Team": "#38bdf8",
    "Engineering": "#818cf8",
    "Design": "#f472b6",
    "Data Science": "#a78bfa",
    "QA": "#fbbf24",
    "Growth": "#34d399",
    "Receptor": "#f43f5e",
    "Adaptor": "#fb923c",
    "GEF Factor": "#fbbf24",
    "GTPase": "#34d399",
    "Kinase": "#38bdf8",
    "TF": "#a78bfa"
};

// Categories outside the presets (imports, live trends) get Neon Pulse colors in order of appearance.
const PALETTE = ["#22E4FF", "#FF3DCB", "#B55BF0", "#3DDC97", "#FFC857", "#fb923c", "#38bdf8", "#f472b6", "#a78bfa", "#34d399"];
const dynColors = new Map();
function getGroupColor(group) {
    if (GROUP_COLORS[group]) return GROUP_COLORS[group];
    if (!dynColors.has(group)) dynColors.set(group, PALETTE[dynColors.size % PALETTE.length]);
    return dynColors.get(group);
}
const MAX_NAME = 40, MAX_GROUP = 30, MAX_EDGE = 30;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileMQ = window.matchMedia('(max-width: 767px)');
const $ = (id) => document.getElementById(id);
const isFiniteXY = (n) => n && Number.isFinite(n.x) && Number.isFinite(n.y);
const radiusOf = (n) => (n.val || 20) / 2 + 6;
const labelOf = (n) => n.label || n.id;
const isPinned = (n) => n.fx != null;
const idOf = (end) => (end && typeof end === 'object') ? end.id : end;
const calm = () => state.reduceMotion;

function cloneDataset(key) {
    const d = DATASETS[key];
    return {
        nodes: d.nodes.map(n => ({ ...n, label: n.label || n.id })),
        links: d.links.map(l => ({ ...l }))
    };
}

const state = {
    presetKey: 'tech',
    graphData: cloneDataset('tech'),
    simulation: null,
    transform: d3.zoomIdentity,
    selectedNode: null,
    neighbors: new Set(),
    hoveredNode: null,
    searchQuery: '',
    matchingNodeIds: new Set(),
    searchMatches: [],
    activeIndex: -1,
    isPaused: false,
    showNodeLabels: true, showEdgeLabels: true, showArrows: true, isCurved: false,
    charge: -240, linkDistance: 80, collisionRadius: 30, gravity: 0.15,
    dragging: null,
    needsFit: true,
    graphName: 'Tech Ecosystem',
    kbdNode: null,
    reduceMotion: reducedMotion.matches,
    loadToken: 0
};
window.GraphVerse = { state, DATASETS };

const canvas = $('graph-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth, height = window.innerHeight, dpr = 1;

/* ---------- Canvas sizing ---------- */
function resizeCanvas() {
    width = window.innerWidth; height = window.innerHeight;
    dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    if (state.simulation) {
        state.simulation.force('x').x(width / 2);
        state.simulation.force('y').y(height / 2);
        state.simulation.force('center').x(width / 2).y(height / 2);
    }
    requestRender();
}
let resizeTimer = 0;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { resizeCanvas(); syncControlsLayout(); }, 120); });

/* ---------- Simulation ---------- */
function initSimulation() {
    if (state.simulation) state.simulation.stop();
    const { nodes, links } = state.graphData;
    state.simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(state.linkDistance))
        .force('charge', d3.forceManyBody().strength(state.charge))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collide', d3.forceCollide().radius(d => (d.val || 20) + state.collisionRadius - 15))
        .force('x', d3.forceX(width / 2).strength(state.gravity))
        .force('y', d3.forceY(height / 2).strength(state.gravity))
        .on('tick', onTick);
    if (calm()) settleNow(1);
    if (state.isPaused) state.simulation.stop();
    refreshUI();
}
// Reduced motion: run the layout to rest off-screen and draw once, instead of animating it.
function settleNow(alpha) {
    const sim = state.simulation;
    sim.stop(); sim.alpha(alpha);
    for (let i = 0; i < 300 && sim.alpha() > sim.alphaMin(); i++) sim.tick();
    requestRender();
}
function onTick() {
    if (state.needsFit && state.simulation.alpha() < 0.12) { state.needsFit = false; fitToView(true); }
    requestRender();
}
// Push node/link changes into the running simulation without rebuilding it.
function syncSimulation(alpha) {
    const sim = state.simulation;
    sim.nodes(state.graphData.nodes);
    sim.force('link').links(state.graphData.links);
    if (!state.isPaused) { if (calm()) settleNow(alpha == null ? 0.3 : alpha); else sim.alpha(alpha == null ? 0.3 : alpha).restart(); }
    refreshUI();
    requestRender();
}
function kick(alpha) {
    if (state.isPaused) setPaused(false);
    if (calm()) settleNow(alpha); else state.simulation.alpha(alpha).restart();
}
function setPaused(paused) {
    state.isPaused = paused;
    const btn = $('toggle-play-btn');
    btn.setAttribute('aria-pressed', String(paused));
    btn.setAttribute('aria-label', paused ? 'Resume simulation' : 'Pause simulation');
    const old = btn.querySelector('svg');
    const icon = lucide.icon(paused ? 'play' : 'pause');
    if (old && icon) old.replaceWith(icon);
    if (paused) state.simulation.stop();
    else if (calm()) settleNow(Math.max(state.simulation.alpha(), 0.3));
    else state.simulation.alpha(Math.max(state.simulation.alpha(), 0.3)).restart();
}

/* ---------- Rendering ---------- */
let renderQueued = false;
function requestRender() {
    if (renderQueued) return;
    renderQueued = true;
    requestAnimationFrame(() => { renderQueued = false; render(); });
}

function render() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    const t = state.transform;
    ctx.translate(t.x, t.y);
    ctx.scale(t.k, t.k);

    const isSearching = state.searchQuery.length > 0;
    const sel = state.selectedNode;

    for (const link of state.graphData.links) {
        const s = link.source, tg = link.target;
        if (!isFiniteXY(s) || !isFiniteXY(tg)) continue;
        const onSel = sel && (s === sel || tg === sel);
        let alpha = 0.3;
        if (isSearching) alpha = (state.matchingNodeIds.has(s.id) && state.matchingNodeIds.has(tg.id)) ? 0.7 : 0.05;
        else if (sel) alpha = onSel ? 0.9 : 0.08;
        const color = onSel ? '#22E4FF' : `rgba(138,147,184,${alpha})`;
        ctx.strokeStyle = color;
        ctx.lineWidth = onSel ? 2.5 : 1.2;
        ctx.beginPath();
        let lx, ly, fromX = s.x, fromY = s.y;
        if (state.isCurved) {
            const dx = tg.x - s.x, dy = tg.y - s.y;
            const mx = (s.x + tg.x) / 2 + dy * 0.15, my = (s.y + tg.y) / 2 - dx * 0.15;
            ctx.moveTo(s.x, s.y); ctx.quadraticCurveTo(mx, my, tg.x, tg.y);
            lx = mx; ly = my; fromX = mx; fromY = my;
        } else {
            ctx.moveTo(s.x, s.y); ctx.lineTo(tg.x, tg.y);
            lx = (s.x + tg.x) / 2; ly = (s.y + tg.y) / 2;
        }
        ctx.stroke();
        if (state.showArrows) drawArrowHead(fromX, fromY, tg.x, tg.y, radiusOf(tg) + 2, color);
        if (state.showEdgeLabels && link.label) drawEdgeLabel(link.label, lx, ly, alpha);
    }

    for (const node of state.graphData.nodes) {
        if (!isFiniteXY(node)) continue;
        const r = radiusOf(node);
        const isSel = sel === node;
        const isHover = state.hoveredNode === node;
        const isMatch = !isSearching || state.matchingNodeIds.has(node.id);
        let a = isMatch ? 1 : 0.15;
        if (!isSearching && sel && !isSel && !state.neighbors.has(node.id)) a = 0.15;
        ctx.globalAlpha = a;
        if (isSel || isHover) {
            ctx.beginPath(); ctx.arc(node.x, node.y, r + 6, 0, 2 * Math.PI);
            ctx.fillStyle = isSel ? 'rgba(34,228,255,0.22)' : 'rgba(255,255,255,0.14)'; ctx.fill();
            ctx.strokeStyle = isSel ? '#22E4FF' : 'rgba(255,255,255,0.45)'; ctx.lineWidth = 2; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
        ctx.fillStyle = getGroupColor(node.group); ctx.fill();
        ctx.strokeStyle = 'rgba(10,11,20,0.85)'; ctx.lineWidth = 2; ctx.stroke();
        if (isPinned(node)) {
            ctx.beginPath(); ctx.arc(node.x, node.y, r + 3, 0, 2 * Math.PI);
            ctx.strokeStyle = '#FFC857'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);
            ctx.beginPath(); ctx.arc(node.x + r * 0.7, node.y - r * 0.7, 4, 0, 2 * Math.PI);
            ctx.fillStyle = '#FFC857'; ctx.fill();
        }
        if (node === state.kbdNode && canvasHasKbdFocus) {
            ctx.globalAlpha = 1;
            ctx.beginPath(); ctx.arc(node.x, node.y, r + 10, 0, 2 * Math.PI);
            ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 3; ctx.stroke();
            ctx.beginPath(); ctx.arc(node.x, node.y, r + 13, 0, 2 * Math.PI);
            ctx.strokeStyle = '#FF3DCB'; ctx.lineWidth = 2; ctx.stroke();
        }
        if (state.showNodeLabels) {
            const text = labelOf(node);
            ctx.font = `${isSel ? 600 : 500} 11px Inter, system-ui, sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            const w = ctx.measureText(text).width;
            ctx.fillStyle = 'rgba(10,11,20,0.78)';
            ctx.beginPath(); ctx.roundRect(node.x - w / 2 - 4, node.y + r + 4, w + 8, 16, 4); ctx.fill();
            ctx.fillStyle = isMatch ? '#EAF0FF' : '#8A93B8';
            ctx.fillText(text, node.x, node.y + r + 12);
        }
        ctx.globalAlpha = 1;
    }
    $('zoom-level').textContent = `${Math.round(t.k * 100)}%`;
}

function drawGrid() {
    const step = 40 * state.transform.k;
    if (step < 6) return;
    const ox = state.transform.x % step, oy = state.transform.y % step;
    ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = ox; x < width; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
    for (let y = oy; y < height; y += step) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
    ctx.stroke();
}
function drawArrowHead(fx, fy, tx, ty, off, color) {
    const ang = Math.atan2(ty - fy, tx - fx), L = 7;
    const ex = tx - off * Math.cos(ang), ey = ty - off * Math.sin(ang);
    ctx.beginPath(); ctx.fillStyle = color;
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex - L * Math.cos(ang - Math.PI / 6), ey - L * Math.sin(ang - Math.PI / 6));
    ctx.lineTo(ex - L * Math.cos(ang + Math.PI / 6), ey - L * Math.sin(ang + Math.PI / 6));
    ctx.closePath(); ctx.fill();
}
function drawEdgeLabel(text, x, y, alpha) {
    ctx.font = '9px Inter, system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const w = ctx.measureText(text).width;
    ctx.fillStyle = `rgba(10,11,20,${alpha * 0.9})`;
    ctx.beginPath(); ctx.roundRect(x - w / 2 - 3, y - 6, w + 6, 12, 3); ctx.fill();
    ctx.fillStyle = `rgba(169,177,214,${Math.max(alpha, 0.75)})`;
    ctx.fillText(text, x, y);
}

/* ---------- Hit testing ---------- */
function toGraph(sx, sy) { const t = state.transform; return [(sx - t.x) / t.k, (sy - t.y) / t.k]; }
function nodeAtScreen(sx, sy) {
    const [x, y] = toGraph(sx, sy);
    const slop = (window.matchMedia('(pointer: coarse)').matches ? 10 : 2) / state.transform.k;
    const nodes = state.graphData.nodes;
    for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        if (!isFiniteXY(n)) continue;
        const r = radiusOf(n) + slop;
        const dx = x - n.x, dy = y - n.y;
        if (dx * dx + dy * dy <= r * r) return n;
    }
    return null;
}
function eventPoint(e) {
    const src = e.touches && e.touches.length ? e.touches[0] : (e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e);
    const rect = canvas.getBoundingClientRect();
    return [src.clientX - rect.left, src.clientY - rect.top];
}

/* ---------- Zoom / pan (ignores gestures that start on a node) ---------- */
const zoomBehavior = d3.zoom()
    .scaleExtent([0.15, 6])
    .filter((event) => {
        if (event.type === 'wheel') return true;
        if (event.touches && event.touches.length > 1) return true;
        if (event.ctrlKey || event.button) return false;
        const [sx, sy] = eventPoint(event);
        return !nodeAtScreen(sx, sy);
    })
    .on('zoom', (event) => { state.transform = event.transform; requestRender(); });

/* ---------- Node drag (mouse + touch via d3.drag) ---------- */
const dragBehavior = d3.drag()
    .container(canvas)
    .filter((event) => !event.ctrlKey && !event.button && !(event.touches && event.touches.length > 1))
    .subject((event) => {
        const n = nodeAtScreen(event.x, event.y);
        return n ? { node: n, x: event.x, y: event.y } : null;
    })
    .on('start', (event) => {
        const n = event.subject.node;
        event.subject.wasPinned = isPinned(n);
        state.dragging = n;
        n.fx = n.x; n.fy = n.y;
        canvas.classList.add('dragging');
        if (!state.isPaused) state.simulation.alphaTarget(0.3).restart();
    })
    .on('drag', (event) => {
        const n = event.subject.node;
        const [x, y] = toGraph(event.x, event.y);
        n.fx = x; n.fy = y;
        if (state.isPaused) { n.x = x; n.y = y; }
        requestRender();
    })
    .on('end', (event) => {
        const n = event.subject.node;
        state.dragging = null;
        canvas.classList.remove('dragging');
        if (!event.subject.wasPinned && !(event.sourceEvent && event.sourceEvent.shiftKey)) { n.fx = null; n.fy = null; }
        if (!state.isPaused) state.simulation.alphaTarget(0);
        if (state.selectedNode === n) updateInspectorData();
        requestRender();
    });

d3.select(canvas).call(dragBehavior).call(zoomBehavior).on('dblclick.zoom', null);

/* ---------- Click / tap: select; double-click / double-tap: pin ---------- */
let lastTap = { node: null, time: 0 };
let pendingSelect = 0;
canvas.addEventListener('click', (e) => {
    const [sx, sy] = eventPoint(e);
    const node = nodeAtScreen(sx, sy);
    const now = performance.now();
    clearTimeout(pendingSelect);
    if (node && lastTap.node === node && now - lastTap.time < 350) {
        // double-click / double-tap: pin or unpin, never anything else
        togglePin(node);
        lastTap = { node: null, time: 0 };
        return;
    }
    lastTap = { node, time: now };
    if (node) state.kbdNode = node;
    // On phones the inspector is a bottom sheet: open it only after the double-tap
    // window so a second tap can't land on the sheet.
    if (node && mobileMQ.matches) pendingSelect = setTimeout(() => selectNode(node), 360);
    else selectNode(node);
});
canvas.addEventListener('pointermove', (e) => {
    if (state.dragging || e.pointerType === 'touch') return;
    const [sx, sy] = eventPoint(e);
    const n = nodeAtScreen(sx, sy);
    if (n !== state.hoveredNode) {
        state.hoveredNode = n;
        canvas.classList.toggle('node-hover', !!n);
        requestRender();
    }
});
canvas.addEventListener('pointerleave', () => { if (state.hoveredNode) { state.hoveredNode = null; requestRender(); } });

function togglePin(node) {
    if (isPinned(node)) { node.fx = null; node.fy = null; if (!state.isPaused) state.simulation.alpha(0.1).restart(); }
    else { node.fx = node.x; node.fy = node.y; }
    if (state.selectedNode === node) updateInspectorData();
    showToast(`${isPinned(node) ? 'Pinned' : 'Unpinned'} ${labelOf(node)}`);
    requestRender();
}

/* ---------- View helpers ---------- */
function visibleRect() {
    const top = $('search-wrap').getBoundingClientRect().bottom + 12;
    let left = 12, right = width - 12, bottom = height - 64;
    const controls = $('controls-panel');
    if (!mobileMQ.matches && !controls.classList.contains('collapsed')) left = controls.getBoundingClientRect().right + 12;
    const insp = $('inspector-drawer');
    if (!insp.hidden) {
        const r = insp.getBoundingClientRect();
        if (mobileMQ.matches) bottom = Math.min(bottom, r.top - 8); else right = r.left - 12;
    }
    return { left, top, right: Math.max(right, left + 80), bottom: Math.max(bottom, top + 80) };
}
function animateTo(transform, ms) {
    const sel = d3.select(canvas);
    if (calm() || !ms) sel.call(zoomBehavior.transform, transform);
    else sel.transition().duration(ms).call(zoomBehavior.transform, transform);
}
function fitToView(animate) {
    const ns = state.graphData.nodes.filter(isFiniteXY);
    if (!ns.length) return;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const n of ns) {
        const r = radiusOf(n) + 18;
        const hw = state.showNodeLabels ? Math.max(r, labelOf(n).length * 3.2 + 8) : r; // keep labels on screen too
        x0 = Math.min(x0, n.x - hw); y0 = Math.min(y0, n.y - r); x1 = Math.max(x1, n.x + hw); y1 = Math.max(y1, n.y + r + (state.showNodeLabels ? 12 : 0));
    }
    const v = visibleRect();
    const k = Math.max(0.15, Math.min(2.2, 0.92 * Math.min((v.right - v.left) / (x1 - x0), (v.bottom - v.top) / (y1 - y0))));
    const cx = (v.left + v.right) / 2, cy = (v.top + v.bottom) / 2;
    animateTo(d3.zoomIdentity.translate(cx - k * (x0 + x1) / 2, cy - k * (y0 + y1) / 2).scale(k), animate ? 600 : 0);
}
function focusNode(node, scale) {
    if (!node || !isFiniteXY(node)) return;
    const v = visibleRect();
    const k = scale || Math.max(state.transform.k, 1.6);
    const cx = (v.left + v.right) / 2, cy = (v.top + v.bottom) / 2;
    animateTo(d3.zoomIdentity.translate(cx - node.x * k, cy - node.y * k).scale(k), 700);
}
// On mobile the inspector is a bottom sheet: keep the selected node visible above it.
function keepNodeVisible(node) {
    if (!node || !isFiniteXY(node)) return;
    const t = state.transform, v = visibleRect();
    const sx = t.applyX(node.x), sy = t.applyY(node.y), r = radiusOf(node) * t.k + 24;
    if (sx - r >= v.left && sx + r <= v.right && sy - r >= v.top && sy + r <= v.bottom) return;
    const cx = (v.left + v.right) / 2, cy = (v.top + v.bottom) / 2;
    animateTo(d3.zoomIdentity.translate(t.x + (cx - sx), t.y + (cy - sy)).scale(t.k), 400);
}

/* ---------- Selection & inspector ---------- */
function computeNeighbors(node) {
    const set = new Set();
    if (node) for (const l of state.graphData.links) {
        if (l.source === node) set.add(l.target.id);
        else if (l.target === node) set.add(l.source.id);
    }
    return set;
}
function selectNode(node) {
    state.selectedNode = node || null;
    state.neighbors = computeNeighbors(state.selectedNode);
    hideDeleteConfirm();
    const insp = $('inspector-drawer');
    if (node) {
        if (mobileMQ.matches) setControlsOpen(false);
        insp.hidden = false;
        updateInspectorData();
        insp.querySelector('.inspector-body').scrollTop = 0;
        requestAnimationFrame(() => keepNodeVisible(node));
        announce(`Details open: ${describeNode(node)} ${node.desc || ''}`.trim());
    } else {
        insp.hidden = true;
    }
    requestRender();
}
function updateInspectorData() {
    const node = state.selectedNode;
    if (!node) return;
    $('inspector-title').textContent = labelOf(node);
    $('inspector-category').textContent = node.group;
    const dot = $('inspector-color-dot');
    dot.style.backgroundColor = getGroupColor(node.group); dot.style.color = getGroupColor(node.group);
    $('inspector-description').textContent = node.desc || `Node in the ${node.group} group.`;
    const url = safeUrl(node.url);
    $('inspector-extra').hidden = !(url || node.idea || node.meta);
    $('inspector-meta').textContent = node.meta || '';
    $('inspector-meta').hidden = !node.meta;
    $('inspector-idea').textContent = node.idea || '';
    $('inspector-idea-wrap').hidden = !node.idea;
    const a = $('inspector-link');
    a.hidden = !url;
    if (url) a.href = url; else a.removeAttribute('href');
    const links = state.graphData.links.filter(l => l.source === node || l.target === node);
    $('inspector-degree').textContent = `${links.length} link${links.length === 1 ? '' : 's'}`;
    const pinned = isPinned(node);
    const pinBtn = $('pin-node-btn');
    pinBtn.setAttribute('aria-pressed', String(pinned));
    pinBtn.setAttribute('aria-label', pinned ? 'Unpin node' : 'Pin node');
    const box = $('inspector-neighbors');
    box.replaceChildren();
    if (!links.length) { const p = document.createElement('span'); p.className = 'muted small'; p.textContent = 'No connections yet.'; box.append(p); }
    for (const l of links) {
        const nb = l.source === node ? l.target : l.source;
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'chip';
        const d = document.createElement('span'); d.className = 'dot'; d.style.backgroundColor = getGroupColor(nb.group);
        const name = document.createElement('span'); name.textContent = labelOf(nb);
        b.append(d, name);
        if (l.label) { const rel = document.createElement('span'); rel.className = 'rel'; rel.textContent = l.label; b.append(rel); }
        b.setAttribute('aria-label', `${labelOf(nb)}${l.label ? `, ${l.label}` : ''}. Open details`);
        b.addEventListener('click', () => { selectNode(nb); focusNode(nb); });
        box.append(b);
    }
}
$('close-inspector').addEventListener('click', () => selectNode(null));
$('focus-node-btn').addEventListener('click', () => focusNode(state.selectedNode));
$('pin-node-btn').addEventListener('click', () => { if (state.selectedNode) togglePin(state.selectedNode); });

/* ---------- Delete with confirm + undo ---------- */
function hideDeleteConfirm() { $('delete-confirm').hidden = true; $('delete-node-btn').hidden = false; }
$('delete-node-btn').addEventListener('click', () => {
    $('delete-node-btn').hidden = true; $('delete-confirm').hidden = false; $('delete-cancel').focus();
});
$('delete-cancel').addEventListener('click', () => { hideDeleteConfirm(); $('delete-node-btn').focus(); });
$('delete-yes').addEventListener('click', () => { if (state.selectedNode) deleteNode(state.selectedNode); });

function deleteNode(node) {
    const g = state.graphData;
    const index = g.nodes.indexOf(node);
    const removedLinks = g.links.filter(l => l.source === node || l.target === node)
        .map(l => ({ link: l, source: l.source.id, target: l.target.id }));
    g.nodes = g.nodes.filter(n => n !== node);
    g.links = g.links.filter(l => l.source !== node && l.target !== node);
    selectNode(null);
    syncSimulation(0.2);
    showToast(`Removed ${labelOf(node)}`, 'Undo', () => {
        if (g !== state.graphData || g.nodes.some(n => n.id === node.id)) return;
        g.nodes.splice(Math.min(index, g.nodes.length), 0, node);
        for (const r of removedLinks) {
            if (!g.nodes.some(n => n.id === r.source) || !g.nodes.some(n => n.id === r.target)) continue;
            r.link.source = r.source; r.link.target = r.target; g.links.push(r.link);
        }
        syncSimulation(0.2);
        selectNode(node);
        showToast(`Restored ${labelOf(node)}`);
    });
}

/* ---------- Toast ---------- */
let toastTimer = 0;
function showToast(text, actionLabel, action) {
    const t = $('toast'), btn = $('toast-action');
    $('toast-text').textContent = text;
    btn.hidden = !action;
    btn.onclick = action ? () => { t.hidden = true; action(); } : null;
    if (actionLabel) btn.textContent = actionLabel;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, action ? 8000 : 2200);
}

/* ---------- Search (combobox: arrows, Enter, Esc) ---------- */
const searchInput = $('search-input');
const searchResults = $('search-results');
const clearSearchBtn = $('clear-search');

function setResultsOpen(open) {
    searchResults.hidden = !open;
    searchInput.setAttribute('aria-expanded', String(open));
    if (!open) searchInput.removeAttribute('aria-activedescendant');
}
function runSearch() {
    const q = searchInput.value.trim().toLowerCase().slice(0, 80);
    state.searchQuery = q;
    state.matchingNodeIds.clear();
    state.activeIndex = -1;
    clearSearchBtn.hidden = !searchInput.value;
    searchResults.replaceChildren();
    if (!q) { state.searchMatches = []; setResultsOpen(false); requestRender(); return; }
    const matches = state.graphData.nodes.filter(n => labelOf(n).toLowerCase().includes(q) || String(n.group).toLowerCase().includes(q));
    state.searchMatches = matches;
    matches.forEach((n, i) => {
        state.matchingNodeIds.add(n.id);
        const li = document.createElement('li');
        li.id = `search-opt-${i}`; li.setAttribute('role', 'option'); li.setAttribute('aria-selected', 'false');
        const left = document.createElement('span');
        const d = document.createElement('span'); d.className = 'dot'; d.style.backgroundColor = getGroupColor(n.group);
        const name = document.createElement('span'); name.textContent = labelOf(n);
        left.append(d, name);
        const grp = document.createElement('span'); grp.className = 'grp'; grp.textContent = n.group;
        li.append(left, grp);
        li.addEventListener('mousedown', (e) => e.preventDefault());
        li.addEventListener('click', () => pickResult(n));
        searchResults.append(li);
    });
    if (!matches.length) {
        const li = document.createElement('li'); li.className = 'empty';
        li.textContent = `No nodes match "${searchInput.value.trim()}"`;
        searchResults.append(li);
    }
    setResultsOpen(true);
    requestRender();
}
function setActive(i) {
    const items = searchResults.querySelectorAll('[role=option]');
    if (!items.length) return;
    state.activeIndex = (i + items.length) % items.length;
    items.forEach((el, j) => el.setAttribute('aria-selected', String(j === state.activeIndex)));
    const el = items[state.activeIndex];
    searchInput.setAttribute('aria-activedescendant', el.id);
    el.scrollIntoView({ block: 'nearest' });
}
function clearSearch() {
    searchInput.value = '';
    runSearch();
}
function pickResult(node) {
    clearSearch();
    searchInput.blur();
    selectNode(node);
    focusNode(node);
}
searchInput.addEventListener('input', runSearch);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (searchResults.hidden && searchInput.value) runSearch(); setActive(state.activeIndex + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(state.activeIndex - 1); }
    else if (e.key === 'Enter') {
        e.preventDefault();
        const n = state.searchMatches[state.activeIndex >= 0 ? state.activeIndex : 0];
        if (n) pickResult(n);
    } else if (e.key === 'Escape') {
        e.preventDefault(); e.stopPropagation();
        if (!searchResults.hidden) setResultsOpen(false); else clearSearch();
    }
});
searchInput.addEventListener('blur', () => setTimeout(() => { if (document.activeElement !== searchInput) setResultsOpen(false); }, 150));
searchInput.addEventListener('focus', () => { if (searchInput.value.trim()) runSearch(); });
clearSearchBtn.addEventListener('click', () => { clearSearch(); searchInput.focus(); });

/* ---------- Physics sliders & toggles ---------- */
function bindSlider(id, outId, apply) {
    $(id).addEventListener('input', (e) => {
        const v = +e.target.value;
        $(outId).textContent = v;
        apply(v);
        kick(0.3);
    });
}
bindSlider('charge-slider', 'charge-val', v => { state.charge = v; state.simulation.force('charge').strength(v); });
bindSlider('distance-slider', 'distance-val', v => { state.linkDistance = v; state.simulation.force('link').distance(v); });
bindSlider('collide-slider', 'collide-val', v => { state.collisionRadius = v; state.simulation.force('collide').radius(d => (d.val || 20) + v - 15); });
bindSlider('gravity-slider', 'gravity-val', v => { state.gravity = v; state.simulation.force('x').strength(v); state.simulation.force('y').strength(v); });
[['toggle-node-labels', 'showNodeLabels'], ['toggle-edge-labels', 'showEdgeLabels'], ['toggle-arrows', 'showArrows'], ['toggle-curved', 'isCurved']]
    .forEach(([id, key]) => $(id).addEventListener('change', (e) => { state[key] = e.target.checked; requestRender(); }));

$('toggle-play-btn').addEventListener('click', () => setPaused(!state.isPaused));
$('reheat-btn').addEventListener('click', () => kick(1));

function zoomBy(f) { d3.select(canvas).transition().duration(calm() ? 0 : 250).call(zoomBehavior.scaleBy, f); }
$('zoom-in').addEventListener('click', () => zoomBy(1.3));
$('zoom-out').addEventListener('click', () => zoomBy(1 / 1.3));
$('zoom-reset').addEventListener('click', () => fitToView(true));

/* ---------- Controls panel: side panel on desktop, bottom sheet on mobile ---------- */
const controls = $('controls-panel');
const controlsToggle = $('controls-toggle');
function setControlsOpen(open) {
    if (mobileMQ.matches) {
        controls.classList.toggle('open', open);
        controls.classList.remove('collapsed');
        if (open && state.selectedNode) selectNode(null);
    } else {
        controls.classList.toggle('collapsed', !open);
        controls.classList.remove('open');
    }
    controls.toggleAttribute('inert', !open);
    controlsToggle.setAttribute('aria-expanded', String(open));
}
function syncControlsLayout() {
    setControlsOpen(!mobileMQ.matches);
}
controlsToggle.addEventListener('click', () => {
    const open = controlsToggle.getAttribute('aria-expanded') !== 'true';
    setControlsOpen(open);
    if (open && mobileMQ.matches) $('close-controls').focus();
});
$('close-controls').addEventListener('click', () => { setControlsOpen(false); controlsToggle.focus(); });
mobileMQ.addEventListener('change', syncControlsLayout);

/* ---------- Dialogs (native <dialog>: focus trap, Esc, focus return) ---------- */
let dialogOpener = null;
function openDialog(dlg, focusEl) {
    dialogOpener = document.activeElement;
    dlg.showModal();
    if (focusEl) focusEl.focus();
}
document.querySelectorAll('dialog').forEach(dlg => {
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('[data-close]')) dlg.close(); });
    dlg.addEventListener('close', () => { if (dialogOpener && document.contains(dialogOpener)) dialogOpener.focus(); dialogOpener = null; });
});

/* ---------- Presets ---------- */
const presetModal = $('preset-modal');
$('preset-select-toggle').addEventListener('click', () => {
    openDialog(presetModal, presetModal.querySelector(`[data-preset="${state.presetKey}"]`));
});
presetModal.querySelectorAll('.preset-option').forEach(btn => {
    btn.addEventListener('click', () => { loadPreset(btn.dataset.preset); presetModal.close(); });
});
function loadPreset(key) {
    if (key === 'trends') return loadTrends();
    if (!DATASETS[key]) return;
    loadGraph(cloneDataset(key), key, DATASETS[key].name);
}
// Swap in a new graph: reset search, selection and zoom, then start the layout.
function loadGraph(graph, key, name, opts = {}) {
    state.loadToken++;
    state.presetKey = key;
    state.graphName = name;
    state.graphData = graph;
    clearSearch();
    setResultsOpen(false);
    state.hoveredNode = null;
    state.kbdNode = null;
    selectNode(null);
    if (opts.settings) applySettings(opts.settings);
    d3.select(canvas).interrupt().call(zoomBehavior.transform, d3.zoomIdentity);
    state.needsFit = true;
    $('preset-badge').textContent = name;
    $('preset-badge').title = name;
    presetModal.querySelectorAll('.preset-option').forEach(b => b.setAttribute('aria-current', String(b.dataset.preset === key)));
    initSimulation();
    if (opts.positioned && !calm()) state.simulation.alpha(0.3);
    if (state.isPaused) setPaused(false);
    if (calm()) { state.needsFit = false; fitToView(false); }
    announce(`${name} loaded: ${graph.nodes.length} nodes, ${graph.links.length} links.`);
}

/* ---------- Add node ---------- */
const addNodeModal = $('add-node-modal');
const addError = $('add-error');
$('add-node-btn').addEventListener('click', () => {
    populateAddNodeTargets();
    addError.textContent = '';
    ['new-node-id', 'new-node-group'].forEach(id => $(id).removeAttribute('aria-invalid'));
    openDialog(addNodeModal, $('new-node-id'));
});
function populateAddNodeTargets() {
    const select = $('new-node-target');
    select.replaceChildren(new Option('None (standalone node)', ''));
    [...state.graphData.nodes].sort((a, b) => labelOf(a).localeCompare(labelOf(b)))
        .forEach(n => select.append(new Option(`${labelOf(n)} (${n.group})`, n.id)));
    if (state.selectedNode) select.value = state.selectedNode.id;
    const dl = $('group-options');
    dl.replaceChildren(...[...new Set(state.graphData.nodes.map(n => n.group))].map(g => new Option(g)));
}
function cleanText(v, max) { return v.replace(/\s+/g, ' ').trim().slice(0, max); }
function uniqueId(base) {
    const ids = new Set(state.graphData.nodes.map(n => n.id));
    if (!ids.has(base)) return base;
    let i = 2; while (ids.has(`${base}-${i}`)) i++;
    return `${base}-${i}`;
}
$('add-node-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = $('new-node-id'), groupEl = $('new-node-group');
    const label = cleanText(nameEl.value, MAX_NAME);
    const group = cleanText(groupEl.value, MAX_GROUP);
    const targetId = $('new-node-target').value;
    const edgeLabel = cleanText($('new-node-edge-label').value, MAX_EDGE);
    nameEl.removeAttribute('aria-invalid'); groupEl.removeAttribute('aria-invalid');
    let err = '', bad = null;
    if (!label) { err = "Name can't be blank."; bad = nameEl; }
    else if (state.graphData.nodes.some(n => labelOf(n).toLowerCase() === label.toLowerCase())) { err = `A node named "${label}" already exists.`; bad = nameEl; }
    else if (!group) { err = "Category can't be blank."; bad = groupEl; }
    if (err) { addError.textContent = err; bad.setAttribute('aria-invalid', 'true'); bad.focus(); return; }

    const target = targetId ? state.graphData.nodes.find(n => n.id === targetId) : null;
    const v = visibleRect();
    const [cx, cy] = target && isFiniteXY(target) ? [target.x, target.y] : toGraph((v.left + v.right) / 2, (v.top + v.bottom) / 2);
    const node = { id: uniqueId(label), label, group, val: 20, desc: `Custom node in the ${group} group.`,
        x: cx + (Math.random() - 0.5) * 60, y: cy + (Math.random() - 0.5) * 60 };
    state.graphData.nodes.push(node);
    if (target) state.graphData.links.push({ source: node.id, target: target.id, label: edgeLabel || 'connected' });
    e.target.reset();
    addNodeModal.close();
    syncSimulation(0.3);
    selectNode(node);
    focusNode(node);
    showToast(`Added ${label}`);
});

/* ---------- Global keys: Esc closes the topmost layer; / searches; ? shows shortcuts ---------- */
document.addEventListener('keydown', (e) => {
    const typing = e.target.closest && e.target.closest('input, textarea, select, [contenteditable="true"]');
    if (!typing && !e.ctrlKey && !e.metaKey && !e.altKey && !document.querySelector('dialog[open]')) {
        if (e.key === '/') { e.preventDefault(); searchInput.focus(); return; }
        if (e.key === '?') { e.preventDefault(); openDialog(shortcutsModal); return; }
    }
    if (e.key !== 'Escape' || e.defaultPrevented) return;
    if (document.querySelector('dialog[open]')) return; // native dialog handles Esc
    if (!$('delete-confirm').hidden) { hideDeleteConfirm(); $('delete-node-btn').focus(); return; }
    if (state.selectedNode) {
        const fromInspector = $('inspector-drawer').contains(document.activeElement);
        selectNode(null);
        if (fromInspector || document.activeElement === canvas) canvas.focus();
        return;
    }
    if (mobileMQ.matches && controls.classList.contains('open')) { setControlsOpen(false); controlsToggle.focus(); return; }
    if (state.searchQuery) clearSearch();
});

/* ---------- Legend & stats ---------- */
function refreshUI() {
    const legend = $('category-legend');
    legend.replaceChildren();
    const counts = new Map();
    state.graphData.nodes.forEach(n => counts.set(n.group, (counts.get(n.group) || 0) + 1));
    counts.forEach((c, g) => {
        const li = document.createElement('li');
        const left = document.createElement('span');
        const d = document.createElement('span'); d.className = 'dot'; d.style.backgroundColor = getGroupColor(g);
        const name = document.createElement('span'); name.textContent = g;
        left.append(d, name);
        const cnt = document.createElement('span'); cnt.className = 'cnt'; cnt.textContent = c;
        li.append(left, cnt);
        legend.append(li);
    });
    const nn = state.graphData.nodes.length, nl = state.graphData.links.length;
    $('graph-stats').textContent = `${nn} node${nn === 1 ? '' : 's'} · ${nl} link${nl === 1 ? '' : 's'}`;
}

/* ---------- Screen reader announcements ---------- */
const liveRegion = $('gv-live');
let announceTimer = 0;
function announce(text) {
    clearTimeout(announceTimer);
    liveRegion.textContent = '';
    announceTimer = setTimeout(() => { liveRegion.textContent = text; }, 60);
}
function degreeOf(node) { let d = 0; for (const l of state.graphData.links) if (l.source === node || l.target === node) d++; return d; }
function describeNode(node) {
    const d = degreeOf(node);
    return `${labelOf(node)}, ${node.group}, ${d} link${d === 1 ? '' : 's'}${isPinned(node) ? ', pinned' : ''}.`;
}

/* ---------- Keyboard navigation on the canvas ---------- */
let canvasHasKbdFocus = false;
function nodesInView() { return state.graphData.nodes.filter(isFiniteXY); }
function nodeNearestCenter() {
    const v = visibleRect(), [cx, cy] = toGraph((v.left + v.right) / 2, (v.top + v.bottom) / 2);
    let best = null, bd = Infinity;
    for (const n of nodesInView()) { const d = (n.x - cx) ** 2 + (n.y - cy) ** 2; if (d < bd) { bd = d; best = n; } }
    return best;
}
// Nearest node within a 90-degree cone in the arrow's direction; sideways distance costs double.
function nodeInDirection(from, dx, dy) {
    let best = null, bs = Infinity;
    for (const n of nodesInView()) {
        if (n === from) continue;
        const vx = n.x - from.x, vy = n.y - from.y;
        const along = vx * dx + vy * dy, side = Math.abs(vx * dy - vy * dx);
        if (along <= 0 || side > along) continue;
        const score = along + side * 2;
        if (score < bs) { bs = score; best = n; }
    }
    return best;
}
function setKbdNode(node) {
    if (!node) return;
    state.kbdNode = node;
    keepNodeVisible(node);
    announce(describeNode(node));
    requestRender();
}
canvas.addEventListener('focus', () => {
    canvasHasKbdFocus = canvas.matches(':focus-visible');
    if (canvasHasKbdFocus) {
        if (!state.kbdNode || !state.graphData.nodes.includes(state.kbdNode)) state.kbdNode = state.selectedNode || nodeNearestCenter();
        if (state.kbdNode) announce(`${state.graphName} graph, ${state.graphData.nodes.length} nodes. ${describeNode(state.kbdNode)}`);
    }
    requestRender();
});
canvas.addEventListener('blur', () => { canvasHasKbdFocus = false; requestRender(); });
canvas.addEventListener('pointerdown', () => { canvasHasKbdFocus = false; });
const ARROWS = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
canvas.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    canvasHasKbdFocus = true;
    const nodes = state.graphData.nodes;
    if (!nodes.length) return;
    let cur = nodes.includes(state.kbdNode) ? state.kbdNode : null;
    if (ARROWS[e.key]) {
        e.preventDefault();
        if (!cur) return setKbdNode(state.selectedNode || nodeNearestCenter());
        const next = nodeInDirection(cur, ...ARROWS[e.key]);
        if (next) setKbdNode(next); else announce(`No node further ${e.key.slice(5).toLowerCase()}. ${describeNode(cur)}`);
        return;
    }
    if (e.key === ']' || e.key === '[') {
        e.preventDefault();
        const i = cur ? nodes.indexOf(cur) : -1;
        setKbdNode(nodes[(i + (e.key === ']' ? 1 : -1) + nodes.length) % nodes.length]);
        return;
    }
    if (e.key === '+' || e.key === '=') { e.preventDefault(); zoomBy(1.3); return; }
    if (e.key === '-' || e.key === '_') { e.preventDefault(); zoomBy(1 / 1.3); return; }
    if (e.key === '0') { e.preventDefault(); fitToView(true); return; }
    if (!cur) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectNode(cur); }
    else if (e.key === 'p' || e.key === 'P') { e.preventDefault(); togglePin(cur); announce(describeNode(cur)); }
    else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); focusNode(cur); }
});

/* ---------- Reduce motion (follows the OS setting, can be switched in Controls) ---------- */
const motionToggle = $('toggle-reduce-motion');
function setReduceMotion(on) {
    state.reduceMotion = on;
    motionToggle.checked = on;
    document.body.classList.toggle('calm', on);
    if (on && state.simulation && !state.isPaused) settleNow(state.simulation.alpha());
}
motionToggle.addEventListener('change', (e) => setReduceMotion(e.target.checked));
reducedMotion.addEventListener('change', (e) => setReduceMotion(e.matches));

/* ---------- Settings (sliders and display toggles) ---------- */
const SLIDERS = { charge: ['charge-slider', 'charge-val'], linkDistance: ['distance-slider', 'distance-val'], collisionRadius: ['collide-slider', 'collide-val'], gravity: ['gravity-slider', 'gravity-val'] };
const TOGGLES = { showNodeLabels: 'toggle-node-labels', showEdgeLabels: 'toggle-edge-labels', showArrows: 'toggle-arrows', isCurved: 'toggle-curved' };
function readSettings() {
    const o = {};
    for (const k of Object.keys(SLIDERS)) o[k] = state[k];
    for (const k of Object.keys(TOGGLES)) o[k] = state[k];
    return o;
}
// Only known keys, numbers clamped to each slider's own range.
function applySettings(s) {
    if (!s || typeof s !== 'object') return;
    for (const [k, [id, outId]] of Object.entries(SLIDERS)) {
        const el = $(id), v = Number(s[k]);
        if (!Number.isFinite(v)) continue;
        el.value = String(Math.min(+el.max, Math.max(+el.min, v)));
        state[k] = +el.value; $(outId).textContent = el.value;
    }
    for (const [k, id] of Object.entries(TOGGLES)) if (typeof s[k] === 'boolean') { state[k] = s[k]; $(id).checked = s[k]; }
}

/* ---------- Save / import / export ---------- */
const STORE_KEY = 'graphverse:saved:v1';
const MAX_NODES = 1500, MAX_LINKS = 5000, MAX_FILE = 2 * 1024 * 1024;
const fileModal = $('file-modal'), fileError = $('file-error'), shortcutsModal = $('shortcuts-modal');
function serializeGraph() {
    const r = (v) => Math.round(v * 10) / 10;
    return {
        app: 'GraphVerse', format: 1, name: state.graphName, source: state.presetKey, savedAt: new Date().toISOString(),
        settings: readSettings(),
        nodes: state.graphData.nodes.map(n => {
            const o = { id: n.id, label: labelOf(n), group: n.group, val: n.val || 20 };
            if (n.desc) o.desc = n.desc;
            if (n.url) o.url = n.url;
            if (n.idea) o.idea = n.idea;
            if (n.meta) o.meta = n.meta;
            if (isFiniteXY(n)) { o.x = r(n.x); o.y = r(n.y); }
            if (isPinned(n)) o.pinned = true;
            return o;
        }),
        links: state.graphData.links.map(l => ({ source: idOf(l.source), target: idOf(l.target), label: l.label || '' }))
    };
}
function safeUrl(u) {
    if (typeof u !== 'string') return '';
    try { const x = new URL(u); return x.protocol === 'https:' ? x.href : ''; } catch { return ''; }
}
const str = (v, max) => (typeof v === 'string' || typeof v === 'number') ? cleanText(String(v), max) : '';
// Validate untrusted JSON (imports and localStorage) into a clean graph. Throws a readable Error.
function parseGraph(obj) {
    if (!obj || typeof obj !== 'object' || !Array.isArray(obj.nodes)) throw new Error('This file has no "nodes" list, so it isn\'t a GraphVerse graph.');
    if (!obj.nodes.length) throw new Error('This graph has no nodes.');
    if (obj.nodes.length > MAX_NODES) throw new Error(`This graph has ${obj.nodes.length} nodes; the limit is ${MAX_NODES}.`);
    const links = Array.isArray(obj.links) ? obj.links : [];
    if (links.length > MAX_LINKS) throw new Error(`This graph has ${links.length} links; the limit is ${MAX_LINKS}.`);
    const nodes = [], ids = new Set();
    for (const raw of obj.nodes) {
        if (!raw || typeof raw !== 'object') continue;
        const id = str(raw.id, 120);
        if (!id || ids.has(id)) continue;
        ids.add(id);
        const val = Number(raw.val);
        const n = { id, label: str(raw.label, 80) || id.slice(0, 80), group: str(raw.group, MAX_GROUP) || 'Imported', val: Number.isFinite(val) ? Math.min(60, Math.max(6, val)) : 20 };
        const desc = str(raw.desc, 600); if (desc) n.desc = desc;
        const url = safeUrl(raw.url); if (url) n.url = url;
        const idea = str(raw.idea, 400); if (idea) n.idea = idea;
        const meta = str(raw.meta, 120); if (meta) n.meta = meta;
        const x = Number(raw.x), y = Number(raw.y);
        if (Number.isFinite(x) && Number.isFinite(y) && Math.abs(x) < 1e6 && Math.abs(y) < 1e6) {
            n.x = x; n.y = y;
            if (raw.pinned === true) { n.fx = x; n.fy = y; }
        }
        nodes.push(n);
    }
    if (!nodes.length) throw new Error('None of the nodes in this file have a usable id.');
    const out = [];
    for (const raw of links) {
        if (!raw || typeof raw !== 'object') continue;
        const s = str(idOf(raw.source), 120), t = str(idOf(raw.target), 120);
        if (!ids.has(s) || !ids.has(t) || s === t) continue;
        out.push({ source: s, target: t, label: str(raw.label, 40) });
    }
    return { name: str(obj.name, 60) || 'Imported graph', source: str(obj.source, 20), settings: obj.settings, positioned: nodes.some(isFiniteXY), graph: { nodes, links: out } };
}
function loadParsed(p, fallbackName) {
    const key = p.source === 'trends' ? 'trends' : 'custom';
    loadGraph(p.graph, key, p.name || fallbackName, { settings: p.settings, positioned: p.positioned });
}
function readSaved() {
    try { const raw = localStorage.getItem(STORE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
function fmtDate(iso) {
    const d = new Date(iso);
    return isNaN(d) ? 'an earlier visit' : d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}
function refreshSavedInfo() {
    const s = readSaved();
    $('saved-info').textContent = s && Array.isArray(s.nodes)
        ? `Saved: "${str(s.name, 60) || 'Graph'}", ${s.nodes.length} nodes, ${fmtDate(s.savedAt)}.`
        : 'Nothing saved yet. Saving keeps a copy in this browser only.';
    $('load-local').disabled = !s; $('clear-local').disabled = !s;
}
function slug(t) { return String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'graph'; }
function downloadBlob(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
const fileName = (ext) => `graphverse-${slug(state.graphName)}-${new Date().toISOString().slice(0, 10)}.${ext}`;

$('file-btn').addEventListener('click', () => { fileError.textContent = ''; refreshSavedInfo(); openDialog(fileModal, $('save-local')); });
$('shortcuts-btn').addEventListener('click', () => openDialog(shortcutsModal));
$('save-local').addEventListener('click', () => {
    try {
        localStorage.setItem(STORE_KEY, JSON.stringify(serializeGraph()));
        fileModal.close(); showToast(`Saved "${state.graphName}" in this browser`);
    } catch { fileError.textContent = 'This browser blocked saving (private mode or storage full). Try Export JSON instead.'; }
});
$('load-local').addEventListener('click', () => {
    const s = readSaved();
    if (!s) { refreshSavedInfo(); return; }
    try { loadParsed(parseGraph(s), 'Saved graph'); fileModal.close(); showToast(`Loaded your saved graph`); }
    catch (err) { fileError.textContent = `The saved graph couldn't be loaded: ${err.message}`; }
});
$('clear-local').addEventListener('click', () => {
    try { localStorage.removeItem(STORE_KEY); } catch { /* ignore */ }
    refreshSavedInfo(); $('save-local').focus(); announce('Saved graph deleted.');
});
$('export-json').addEventListener('click', () => {
    downloadBlob(new Blob([JSON.stringify(serializeGraph(), null, 2)], { type: 'application/json' }), fileName('json'));
    fileModal.close(); showToast('Exported JSON');
});
$('import-json').addEventListener('click', () => { $('import-file').value = ''; $('import-file').click(); });
$('import-file').addEventListener('change', async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    fileError.textContent = '';
    if (f.size > MAX_FILE) { fileError.textContent = 'That file is over 2 MB, which is too big to import.'; return; }
    try {
        let obj;
        try { obj = JSON.parse(await f.text()); } catch { throw new Error('That file isn\'t valid JSON.'); }
        const p = parseGraph(obj);
        loadParsed(p, f.name.replace(/\.json$/i, ''));
        fileModal.close(); showToast(`Imported "${state.graphName}"`);
    } catch (err) { fileError.textContent = err.message; }
});
$('export-png').addEventListener('click', () => {
    render();
    const out = document.createElement('canvas');
    out.width = canvas.width; out.height = canvas.height;
    const o = out.getContext('2d');
    o.fillStyle = '#0A0B14'; o.fillRect(0, 0, out.width, out.height);
    o.drawImage(canvas, 0, 0);
    o.font = `600 ${13 * dpr}px Inter, system-ui, sans-serif`; o.textAlign = 'right'; o.textBaseline = 'bottom';
    o.fillStyle = 'rgba(169,177,214,0.85)';
    o.fillText(`GraphVerse · ${state.graphName} · aitrendz.org`, out.width - 16 * dpr, out.height - 14 * dpr);
    out.toBlob((b) => { if (b) downloadBlob(b, fileName('png')); }, 'image/png');
    fileModal.close(); showToast('Exported PNG');
});

/* ---------- Live AI Trends dataset (reads aitrendz.org/trends.json in the browser) ---------- */
const TRENDS_URL = 'https://aitrendz.org/trends.json';
const TOPIC_NAMES = { ai: 'AI', si: 'SI', agents: 'Agents', tools: 'Tools' };
const topicName = (t) => TOPIC_NAMES[t] || (t.charAt(0).toUpperCase() + t.slice(1));
function trendsSources() {
    const h = location.hostname;
    const sameOrigin = /(^|\.)aitrendz\.org$/.test(h) || /\.pages\.dev$/.test(h);
    return sameOrigin ? ['/trends.json', TRENDS_URL] : [TRENDS_URL];
}
async function fetchJSON(url, ms) {
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), ms);
    try {
        const res = await fetch(url, { signal: ctl.signal, cache: 'no-cache', credentials: 'omit' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } finally { clearTimeout(t); }
}
async function getTrends() {
    for (const url of trendsSources()) {
        try {
            const d = await fetchJSON(url, 6000);
            if (d && Array.isArray(d.items) && d.items.length) return { data: d, live: true };
        } catch { /* try the next source */ }
    }
    const snap = window.GV_TRENDS_SNAPSHOT;
    if (snap && Array.isArray(snap.items) && snap.items.length) return { data: snap, live: false };
    throw new Error('no trends data');
}
// One hub per topic; each story links to its topic hub, and stories that share a tag link to each other.
function buildTrendsGraph(d) {
    const items = d.items.filter(it => it && typeof it === 'object' && str(it.id, 120) && str(it.title, 200)).slice(0, 80);
    const nodes = [], links = [], hubs = new Map();
    const ed = Number.isFinite(+d.edition) ? +d.edition : null;
    for (const it of items) {
        const topic = str(it.topic, 30).toLowerCase() || 'other';
        const group = topicName(topic);
        if (!hubs.has(topic)) {
            const hub = { id: `topic:${topic}`, label: group, group, val: 34, count: 0, kind: 'topic' };
            hubs.set(topic, hub); nodes.push(hub);
        }
        const hub = hubs.get(topic); hub.count++;
        const title = str(it.title, 200);
        const src = it.source && typeof it.source === 'object' ? it.source : {};
        const node = {
            id: `item:${str(it.id, 120)}`, label: title.length > 30 ? `${title.slice(0, 29).trim()}…` : title, group, val: 16,
            desc: str(it.summary, 600) || title, idea: str(it.build_idea, 400), url: safeUrl(src.url),
            meta: [str(src.name, 60), str(it.date, 20)].filter(Boolean).join(' · '),
            tags: Array.isArray(it.tags) ? it.tags.map(t => str(t, 30).toLowerCase()).filter(Boolean).slice(0, 8) : []
        };
        nodes.push(node);
        links.push({ source: node.id, target: hub.id, label: '' });
    }
    const stories = nodes.filter(n => n.kind !== 'topic');
    const byTag = new Map();
    stories.forEach(n => n.tags.forEach(t => { if (!byTag.has(t)) byTag.set(t, []); byTag.get(t).push(n); }));
    const seen = new Set();
    for (const [tag, list] of byTag) {
        if (list.length < 2 || list.length > 8) continue; // skip one-offs and catch-all tags
        for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
            const key = `${list[i].id}|${list[j].id}`;
            if (seen.has(key)) continue;
            seen.add(key);
            links.push({ source: list[i].id, target: list[j].id, label: `#${tag}` });
        }
    }
    const deg = new Map();
    links.forEach(l => { deg.set(l.source, (deg.get(l.source) || 0) + 1); deg.set(l.target, (deg.get(l.target) || 0) + 1); });
    for (const n of nodes) {
        if (n.kind === 'topic') { n.desc = `${n.count} ${n.count === 1 ? 'story' : 'stories'} in the ${n.label} topic${ed ? ` in Trends edition ${ed}` : ''}.`; delete n.count; delete n.kind; }
        else { n.val = Math.min(28, 14 + 4 * ((deg.get(n.id) || 1) - 1)); delete n.tags; }
    }
    return { graph: { nodes, links }, edition: ed };
}
async function loadTrends() {
    const token = ++state.loadToken;
    showToast('Loading live AI trends…');
    let res;
    try { res = await getTrends(); }
    catch { if (token === state.loadToken) showToast("Couldn't load AI trends right now. Your current graph is unchanged."); return; }
    if (token !== state.loadToken) return; // another dataset was picked meanwhile
    const { graph, edition } = buildTrendsGraph(res.data);
    if (!graph.nodes.length) { showToast("The trends file was empty. Your current graph is unchanged."); return; }
    const name = `AI Trends${edition ? ` · Ed. ${edition}` : ''}`;
    // Story titles are long, so give the layout more room than the small presets.
    loadGraph(graph, 'trends', name, { settings: { charge: -520, linkDistance: 120, collisionRadius: 46 } });
    const stories = graph.nodes.filter(n => !n.id.startsWith('topic:')).length;
    showToast(res.live ? `Live: ${stories} stories from Trends edition ${edition || ''}`.trim()
        : `Live trends unreachable, showing the saved snapshot (edition ${edition || '?'})`);
}

/* ---------- Boot ---------- */
lucide.createIcons();
setReduceMotion(reducedMotion.matches);
syncControlsLayout();
resizeCanvas();
presetModal.querySelector('[data-preset="tech"]').setAttribute('aria-current', 'true');
initSimulation();
if (calm()) { state.needsFit = false; fitToView(false); }
(() => {
    const want = (new URLSearchParams(location.search).get('preset') || location.hash.slice(1)).toLowerCase();
    if (want && want !== 'tech' && (want === 'trends' || DATASETS[want])) { loadPreset(want); return; }
    const saved = readSaved();
    if (saved && Array.isArray(saved.nodes)) {
        showToast(`You have a saved graph from ${fmtDate(saved.savedAt)}`, 'Load', () => {
            try { loadParsed(parseGraph(saved), 'Saved graph'); } catch { showToast("The saved graph couldn't be loaded."); }
        });
    }
})();
Object.assign(window.GraphVerse, { serializeGraph, parseGraph, buildTrendsGraph, loadTrends });
})();
