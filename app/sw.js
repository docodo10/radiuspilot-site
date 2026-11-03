/*
 * RadiusPilot's offline copy (the installable web build only; src/app/pwa.ts registers it).
 * - The app's built files (assets/*, their names change with every build): all of them are kept when this
 *   worker installs (the list below is written in by the web build), so after one visit the app opens
 *   offline, every screen included. Served from the copy kept here first, the network otherwise.
 * - The page itself (index.html): the network first, so an update shows on the next start; the kept
 *   copy only when offline.
 * - Requests to any other site (the free services the Tools and scans call, fonts, pictures) are never
 *   touched: the browser handles them as if this file didn't exist. So is anything that isn't a GET.
 * Nothing about the person's work is ever stored here (that is IndexedDB's job).
 */
const PRECACHE = ["assets/AdminPage-C1-4QNYz.js","assets/AdminPage-qUe5DxPZ.css","assets/AgentPage-3TLn_2AL.css","assets/AgentPage-BSMrN4iM.js","assets/AnalyticsPage-D8VcbwI_.css","assets/AnalyticsPage-DYxGg1NH.js","assets/AuditPage-DPiMwtbC.css","assets/AuditPage-up3WGRnD.js","assets/AuditReportPage-Cg33I-4X.js","assets/AuditReportPage-DAGe0eA8.css","assets/AuditTool-B8shPn8N.js","assets/AutomationsPage-Dh9x_Grq.js","assets/AutomationsPage-foQfXn88.css","assets/BatchDialog-y7aJfRjV.js","assets/BuildPage-B-AXCaal.js","assets/BuildPage-PZ9XQLX_.css","assets/BuilderHome-C9V9vGC6.css","assets/BuilderHome-D087P7yE.js","assets/BusinessDrawer-DjzyaCgj.js","assets/BusinessDrawer-DmHtDzcy.css","assets/BusinessList-BZGoeyKi.js","assets/BusinessList-Jx7dKfVK.css","assets/BusinessTable-CVYw33nY.js","assets/BusinessTable-DG-JWNAo.css","assets/BusinessesPage-CTAnZjOs.css","assets/BusinessesPage-DI58uxOa.js","assets/CallModePage-DeasOPIz.js","assets/CallModePage-Lm3MFJXN.css","assets/ClientsPage-BEvJSJ6Z.css","assets/ClientsPage-BQz7HVMF.js","assets/ColoursTool-BIi1zwAt.css","assets/ColoursTool-MLcpw_pv.js","assets/CommandPalette-MrD8UJZv.js","assets/CommandPalette-_fvbvLCJ.css","assets/CompetitorsPage-Dgebu-9G.js","assets/CompetitorsPage-VduJx32L.css","assets/ComposeHost-BAMW-biT.js","assets/ComposeHost-CAJFi7xk.css","assets/Composer-BrGe8Bnh.css","assets/Composer-C6Jq_9Mk.js","assets/ContactsTool-Bt959CaR.css","assets/ContactsTool-DHADTt7v.js","assets/DiagnosisDoc-Dw1J9T5g.css","assets/DiagnosisDoc-qtBj2QbP.js","assets/DiagnosisPanel-auV0VSOT.js","assets/DuePicker-B365aIaa.css","assets/DuePicker-BMcFyU77.js","assets/EmailBuilderPage-C03iopEn.css","assets/EmailBuilderPage-XlEk6xKW.js","assets/EmailTemplatesPage-BYNe0RWJ.css","assets/EmailTemplatesPage-DUDhP-Tg.js","assets/EmailTool-BH9040Mc.js","assets/EmailTool-Bvx8NoMg.css","assets/GoalEditor-BIuGgesx.js","assets/GoalEditor-DNgOGpld.css","assets/GoogleAttribution-BE0y1sK4.js","assets/GoogleAttribution-aklh_XQb.css","assets/GooglePanel-A20MLEpE.css","assets/GooglePanel-apSCJF_Y.js","assets/GoogleScopeMap-B40k9k42.css","assets/GoogleScopeMap-Bd0LQR82.js","assets/HelpPage-BWv5lisi.js","assets/HelpPage-DiFF7iB5.css","assets/HistoryTool-Bq9JkCkO.js","assets/HistoryTool-f7CTy5KH.css","assets/InsightPanel-Bjc6fvg2.js","assets/InsightPanel-ILrvDOGQ.css","assets/Inter-Bold-CwK0yBq9.woff","assets/Inter-Medium-CRBLXpIG.woff","assets/Inter-Regular-CHNwvmI_.woff","assets/Inter-SemiBold-BWnLE2Zz.woff","assets/InterDisplay-Bold-DDOf113W.woff","assets/InterDisplay-Medium-BIdvIqw4.woff","assets/InterDisplay-SemiBold-zxE28j0h.woff","assets/Lora-Italic-DRD9C382.woff","assets/Lora-Regular-BM_tvNoN.woff","assets/MailPage-CemXpPfT.css","assets/MailPage-c3DBnyE0.js","assets/MapPage-aRrvZUou.css","assets/MapPage-ohp9-YJz.js","assets/MonthWidget-Bz03wvV4.js","assets/NewScanPage-CmRQcljv.js","assets/NewScanPage-DCPTW0Hq.css","assets/NotFoundPage-CgARB447.js","assets/NotificationsPage-WlxE2ZkC.js","assets/NotificationsPage-kQqoETY9.css","assets/OffersPage-CtwzIKVA.css","assets/OffersPage-MpLBmtd4.js","assets/OutOfCredits-B1h-uzcC.js","assets/PageSpeedKey-CALPE9jA.js","assets/PageSpeedKey-CgcWViBi.css","assets/PipelinePage-CbrTKpEu.css","assets/PipelinePage-_-ayjhBC.js","assets/PitchDeck-9F7xbInS.css","assets/PitchDeck-Db-AJo3r.js","assets/PostsTool-BVLGEZCr.js","assets/PostsTool-Cm4GwDz6.css","assets/ProjectPage-C2c1vfU7.css","assets/ProjectPage-f2JbKjol.js","assets/ProposalPage-BHOyYv5P.js","assets/ProposalPage-D4MWJbtj.css","assets/ProposalsPage-BbguE_8k.css","assets/ProposalsPage-TR2MS9MW.js","assets/QrTool-CEDFFlEJ.js","assets/QrTool-Teiw78k0.css","assets/RealScan-CmPLeZJp.css","assets/RealScan.module-BPB7IWXO.js","assets/ReportBuilderPage-B1lqUFhk.css","assets/ReportBuilderPage-CGMkS2iV.js","assets/RichText-B_IpFyaY.css","assets/RichText-yhv1F2KO.js","assets/ScanPage-Ba2tb73x.js","assets/ScanPage-CRtGvH2U.css","assets/ScansPage-C7Dcqssh.js","assets/ScansPage-DWavz1HJ.css","assets/ScopeMap-DA2O9QoE.js","assets/ScopeMap-Ih7WaSs0.css","assets/SequencePage-B0VCv8Tj.js","assets/SequencePage-B7Ha9rJ_.css","assets/SettingsPage-DLOBYaHN.js","assets/SettingsPage-Vpz1ll6r.css","assets/SpeedTool-Cezbwk0j.css","assets/SpeedTool-DY4QfNwe.js","assets/StartPage-BFHVu6eG.js","assets/StartPage-C7MMzy73.css","assets/StatusChip-ferzKnvu.js","assets/TechTool-1sj04yEj.js","assets/TechTool-DF2Rtlui.css","assets/TodayPage-B6IQDV67.css","assets/TodayPage-CuQwR5mn.js","assets/ToolsHome-I5KqhUY0.css","assets/ToolsHome-sMGZSKGP.js","assets/WebsiteAuditDoc-BIcEqX9W.css","assets/WebsiteAuditDoc-CQ5wiHzz.js","assets/WelcomeClientDialog-CimvtReH.js","assets/WelcomeClientDialog-uG0ZRoAL.css","assets/WorkflowPage-BoXguz3o.css","assets/WorkflowPage-tF5J_DeW.js","assets/analyzer-DBgTRCkh.js","assets/bits-3acaSpQ5.css","assets/bits-Bc-t_HS3.js","assets/brandKit-BWuLXfyg.js","assets/charts-CRp9zQB6.js","assets/charts-DMab6nrJ.css","assets/controls-Dp9gq8tg.js","assets/data-C60shFwF.js","assets/engine-DwkAAX4b.js","assets/index-wHNdpB6n.js","assets/insights-B_m1r3fV.js","assets/mailUtil-CTSWgm6U.css","assets/mailUtil-DTCf0cN6.js","assets/motion-DiEo2LM2.js","assets/open-pCXMc5p_.js","assets/osm-xxDM1ByI.js","assets/overlays-BgSLQXBB.js","assets/photon-Dzp4vfmy.js","assets/pi-BO7x-1yT.js","assets/printCopy-myh5T7fs.js","assets/queue-ClyYxgIK.js","assets/runStep-BS2CGymz.js","assets/runs-B7rup9PX.js","assets/scheduler-Ppr6W52y.js","assets/sort-B19Yq6Bu.js","assets/sort-DWVuh10G.css","assets/store-9wJeNGal.js","assets/store-BQkiZVJn.js","assets/styles-979Zsi_b.js","assets/styles-CasE67T8.css","assets/toast-DX1aGR4s.js","assets/useFitLevel-DRWA1-Ci.js","assets/useMedia-C_7hqExM.js","assets/useMedia-DQpL0EKE.js","assets/useSequenceSync-Dei7Y4aM.js"];

const ASSETS = 'radiuspilot-assets-v1';
const PAGES = 'radiuspilot-pages-v1';
const KEEP = [ASSETS, PAGES];
/** Copies this worker cleans up: its own older ones, and the ones made from Oct 28 to Nov 1, when the app was called Pitchable. */
const OURS = /^(radiuspilot|pitchable)-/;

const scope = new URL(self.registration.scope);
const assetsPath = new URL('assets/', scope).pathname;
const indexUrl = new URL('./', scope).href;
const CURRENT = new Set(PRECACHE.map((p) => new URL(p, scope).href));
/**
 * Built files kept at most. Files of earlier builds stay a while (a tab still open on an older build may
 * load one of its screens), the oldest go first; this build's files are never dropped.
 */
const MAX_ASSETS = Math.max(400, CURRENT.size * 2);

/** Keeps every file of this build that isn't kept yet. Files that fail now are fetched on a later start. */
async function precache() {
  const c = await caches.open(ASSETS);
  const have = new Set((await c.keys()).map((r) => r.url));
  const missing = [...CURRENT].filter((u) => !have.has(u));
  // A few at a time, so the app's own requests aren't queued behind them.
  let next = 0;
  const worker = async () => {
    while (next < missing.length) {
      const url = missing[next++];
      try {
        const res = await fetch(url);
        if (res.ok && res.type === 'basic') await c.put(url, res);
      } catch {
        /* offline or gone: tried again on the next start */
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(6, missing.length) }, worker));
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // The page, so the app opens offline after its first visit…
      caches
        .open(PAGES)
        .then((c) => c.add(new Request(indexUrl, { cache: 'reload' })))
        .catch(() => undefined),
      // …and every built file it may need.
      precache().catch(() => undefined),
    ]).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((n) => OURS.test(n) && !KEEP.includes(n)).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  );
});

async function trim() {
  const c = await caches.open(ASSETS);
  const keys = await c.keys();
  let extra = keys.length - MAX_ASSETS;
  // Cache keys come back in the order they were added: the oldest go first.
  for (const k of keys) {
    if (extra <= 0) break;
    if (CURRENT.has(k.url)) continue;
    await c.delete(k);
    extra--;
  }
}

async function assetFirst(request) {
  const c = await caches.open(ASSETS);
  const hit = await c.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok && res.type === 'basic') {
    await c.put(request, res.clone());
    void trim();
  }
  return res;
}

async function pageFirst(request) {
  const c = await caches.open(PAGES);
  try {
    const res = await fetch(request);
    if (res.ok && res.type === 'basic') await c.put(indexUrl, res.clone());
    return res;
  } catch (e) {
    const kept = (await c.match(indexUrl)) || (await c.match(request));
    if (kept) return kept;
    throw e;
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Other sites: never intercepted.
  if (url.origin !== scope.origin) return;
  if (request.mode === 'navigate') {
    if (url.pathname === scope.pathname || url.pathname === `${scope.pathname}index.html`) {
      event.respondWith(pageFirst(request));
      // Fills in any file the install couldn't fetch (it went offline half-way).
      event.waitUntil(precache().catch(() => undefined));
    }
    return;
  }
  if (url.pathname.startsWith(assetsPath)) event.respondWith(assetFirst(request));
});
