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
const PRECACHE = ["assets/AdminPage-BotoLnXM.css","assets/AdminPage-CqQrZYV9.js","assets/AdminSignIn-CGX4_FEb.js","assets/AdminSignIn-CgQJ8wrX.css","assets/AgentPage-3TLn_2AL.css","assets/AgentPage-DJV0GAYK.js","assets/AnalyticsPage-BhlO5pst.js","assets/AnalyticsPage-D8VcbwI_.css","assets/AuditPage-DPiMwtbC.css","assets/AuditPage-RYT844N5.js","assets/AuditReportPage-CcbqoBYY.js","assets/AuditReportPage-DAGe0eA8.css","assets/AuditTool-Bw-EFp9-.js","assets/AutomationsPage-CnUcoyt-.js","assets/AutomationsPage-foQfXn88.css","assets/BatchDialog-Blc0nAF-.js","assets/BetaCodeForm-Bx_rPfqy.js","assets/BuildPage-DV9qdlHn.js","assets/BuildPage-PZ9XQLX_.css","assets/BuilderHome-BH4ESPly.js","assets/BuilderHome-C9V9vGC6.css","assets/BusinessDrawer-D2aWGTxb.js","assets/BusinessDrawer-DmHtDzcy.css","assets/BusinessList-CuAc9G7I.js","assets/BusinessList-Jx7dKfVK.css","assets/BusinessTable-B1FK7w_b.js","assets/BusinessTable-DG-JWNAo.css","assets/BusinessesPage-CLWWGcV9.js","assets/BusinessesPage-CTAnZjOs.css","assets/CallModePage-D07trLtP.js","assets/CallModePage-Lm3MFJXN.css","assets/ClientsPage-BEvJSJ6Z.css","assets/ClientsPage-Dm501MbO.js","assets/ColoursTool-BIi1zwAt.css","assets/ColoursTool-DCp2Ixye.js","assets/CommandPalette-DwXOCf4n.js","assets/CommandPalette-_fvbvLCJ.css","assets/CompetitorsPage-C_VkEBwZ.js","assets/CompetitorsPage-VduJx32L.css","assets/ComposeHost-AXzxyOSD.js","assets/ComposeHost-CAJFi7xk.css","assets/Composer-BrGe8Bnh.css","assets/Composer-DnLZzST5.js","assets/ContactsTool-BQo-duN9.js","assets/ContactsTool-Bt959CaR.css","assets/DiagnosisDoc-Dw1J9T5g.css","assets/DiagnosisDoc-EsvFImqV.js","assets/DiagnosisPanel-cGFglMTN.js","assets/DuePicker-B365aIaa.css","assets/DuePicker-PWxwEkWK.js","assets/EmailBuilderPage-C03iopEn.css","assets/EmailBuilderPage-Fm0bLNuU.js","assets/EmailTemplatesPage-BWthQUq5.js","assets/EmailTemplatesPage-BYNe0RWJ.css","assets/EmailTool-Bvx8NoMg.css","assets/EmailTool-S4e59DIw.js","assets/GoalEditor-DNgOGpld.css","assets/GoalEditor-jlK6S9zi.js","assets/GoogleAttribution-C7Uc7V8T.js","assets/GoogleAttribution-aklh_XQb.css","assets/GooglePanel-A20MLEpE.css","assets/GooglePanel-BkKcU--j.js","assets/GoogleScopeMap-B40k9k42.css","assets/GoogleScopeMap-BrBCou_B.js","assets/HelpPage-CRwtSuUI.js","assets/HelpPage-DlOOeme0.css","assets/HistoryTool-LwuMerPJ.js","assets/HistoryTool-f7CTy5KH.css","assets/InsightPanel-CgvICr10.js","assets/InsightPanel-ILrvDOGQ.css","assets/Inter-Bold-CwK0yBq9.woff","assets/Inter-Medium-CRBLXpIG.woff","assets/Inter-Regular-CHNwvmI_.woff","assets/Inter-SemiBold-BWnLE2Zz.woff","assets/InterDisplay-Bold-DDOf113W.woff","assets/InterDisplay-Medium-BIdvIqw4.woff","assets/InterDisplay-SemiBold-zxE28j0h.woff","assets/Lora-Italic-DRD9C382.woff","assets/Lora-Regular-BM_tvNoN.woff","assets/MailPage-BrazUXgu.js","assets/MailPage-CemXpPfT.css","assets/MapPage-BVYY1grH.js","assets/MapPage-aRrvZUou.css","assets/MonthWidget-CZhgRNwx.js","assets/NewScanPage-Ul3lpMZp.css","assets/NewScanPage-qtCzJbu1.js","assets/NotFoundPage-Tx_crMpE.js","assets/NotificationsPage-BcRe_v5H.js","assets/NotificationsPage-kQqoETY9.css","assets/OffersPage-CtwzIKVA.css","assets/OffersPage-D9TFO9OL.js","assets/OutOfCredits-DEFPGi_k.js","assets/PageSpeedKey-CgcWViBi.css","assets/PageSpeedKey-LIKyptoT.js","assets/PipelinePage-CbrTKpEu.css","assets/PipelinePage-DIpfgEpK.js","assets/PitchDeck-CQ3eJqT9.css","assets/PitchDeck-jVjnZbkI.js","assets/PostsTool-72Y6h7Ir.js","assets/PostsTool-Cm4GwDz6.css","assets/ProjectPage-BGojZtVT.js","assets/ProjectPage-C2c1vfU7.css","assets/ProposalPage-C-sMiOGr.js","assets/ProposalPage-D4MWJbtj.css","assets/ProposalsPage-BbguE_8k.css","assets/ProposalsPage-DfzfVz7i.js","assets/QrTool-CRhBvvVM.js","assets/QrTool-Teiw78k0.css","assets/RealScan-CmPLeZJp.css","assets/RealScan.module-BPB7IWXO.js","assets/ReportBuilderPage-B1lqUFhk.css","assets/ReportBuilderPage-B6KymLjw.js","assets/RichText-B_IpFyaY.css","assets/RichText-Bok9pHdb.js","assets/ScanPage-Bp06i2Kw.js","assets/ScanPage-Ey4pIMqN.css","assets/ScansPage-DWavz1HJ.css","assets/ScansPage-R4U7KOWe.js","assets/ScopeMap-BWKc6QdU.js","assets/ScopeMap-Ih7WaSs0.css","assets/SequencePage-B7Ha9rJ_.css","assets/SequencePage-CdvOKPux.js","assets/SettingsPage-B3oMw-92.css","assets/SettingsPage-Csutzm3y.js","assets/SpeedTool-Cezbwk0j.css","assets/SpeedTool-GNQMNbam.js","assets/StartPage-C7MMzy73.css","assets/StartPage-Dt23E9DP.js","assets/StatusChip-D0AOy5xE.js","assets/TechTool-D7Aw0qVj.js","assets/TechTool-DF2Rtlui.css","assets/TodayPage-B6IQDV67.css","assets/TodayPage-CaT5DuKN.js","assets/ToolsHome-CiPMSqJ5.js","assets/ToolsHome-I5KqhUY0.css","assets/WebsiteAuditDoc-BIcEqX9W.css","assets/WebsiteAuditDoc-DSfbASb4.js","assets/WelcomeClientDialog-BPwUL3qm.js","assets/WelcomeClientDialog-uG0ZRoAL.css","assets/WorkflowPage-BoXguz3o.css","assets/WorkflowPage-CMRweKcf.js","assets/analyzer-CWjMVP--.js","assets/bits-3acaSpQ5.css","assets/bits-D38Xytev.js","assets/brandKit-DGDduV3O.js","assets/categoryIcons-CmETwrYD.js","assets/charts-DMab6nrJ.css","assets/charts-JjovUv0T.js","assets/controls-FZ1WiTB7.js","assets/data-B7vQvoWN.js","assets/engine-Ckfa8gRJ.js","assets/externalUrl-DPLo9SIf.js","assets/index-m_VNxlht.js","assets/insights-DCi8yfTk.js","assets/mailUtil-B5zXE46J.js","assets/mailUtil-CTSWgm6U.css","assets/motion-C9-0E2Vn.js","assets/open-1S5TxACG.js","assets/osm-DQyt-bK8.js","assets/overlays-uA_VhxC8.js","assets/photon-DkPJA0Ii.js","assets/pi-CoQkdmVP.js","assets/printCopy-zq3_Vsos.js","assets/queue-CGTQcJq0.js","assets/runStep-Dhg8lzRm.js","assets/runs-D6TUiNjj.js","assets/scheduler-C6Jz4vly.js","assets/sort-DWVuh10G.css","assets/sort-nMQ5iZb1.js","assets/store-DpD3Y8B-.js","assets/store-EL0RuJbR.js","assets/styles-DOoJ54UQ.css","assets/styles-DTaHpCDu.js","assets/toast-Biql2g6T.js","assets/useFitLevel-DImz6MS1.js","assets/useMedia-DJFDoG7r.js","assets/useMedia-lhvqqUKJ.js","assets/useSequenceSync-_PJoIu5b.js"];

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
