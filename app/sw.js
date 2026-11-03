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
const PRECACHE = ["assets/AgentPage-D9NQsHc3.js","assets/AgentPage-OC9CPGKq.css","assets/AnalyticsPage-D8VcbwI_.css","assets/AnalyticsPage-D8g6vobR.js","assets/AuditPage-CkSceTNJ.js","assets/AuditPage-DPiMwtbC.css","assets/AuditReportPage-DAGe0eA8.css","assets/AuditReportPage-kSaE6z1T.js","assets/AuditTool-B-YxaSmI.js","assets/AutomationsPage-CB90_Tb3.js","assets/AutomationsPage-foQfXn88.css","assets/BatchDialog-tsHcYKk7.js","assets/BuildPage-BIBxF_PQ.js","assets/BuildPage-PZ9XQLX_.css","assets/BuilderHome-BnuNyNQ9.js","assets/BuilderHome-C9V9vGC6.css","assets/BusinessDrawer-D58Jr4R8.js","assets/BusinessDrawer-Docu0ZNV.css","assets/BusinessList-Bd-_Vlpl.css","assets/BusinessList-BndkROgF.js","assets/BusinessTable-Dv4SHC_i.css","assets/BusinessTable-DzUnx8UW.js","assets/BusinessesPage-3jwfj-U8.css","assets/BusinessesPage-DKi264-w.js","assets/CallModePage-D7Ka_rWk.js","assets/CallModePage-Lm3MFJXN.css","assets/ClientsPage-BEvJSJ6Z.css","assets/ClientsPage-DR2Av6ot.js","assets/ColoursTool-7AoWUiBl.js","assets/ColoursTool-BIi1zwAt.css","assets/CommandPalette-CRsIadbb.js","assets/CommandPalette-_fvbvLCJ.css","assets/CompetitorsPage-BFSvGiyn.js","assets/CompetitorsPage-VduJx32L.css","assets/ComposeHost-CAJFi7xk.css","assets/ComposeHost-DUG0T2rB.js","assets/Composer-D4m3ODJq.css","assets/Composer-DZJx8Xuq.js","assets/ContactsTool-BLGPkFlK.js","assets/ContactsTool-Bt959CaR.css","assets/DiagnosisDoc-CIYRzu9X.js","assets/DiagnosisDoc-Dw1J9T5g.css","assets/DiagnosisPanel-DoMscQnV.js","assets/DuePicker-B365aIaa.css","assets/DuePicker-w8Y_H4H2.js","assets/EmailBuilderPage-C03iopEn.css","assets/EmailBuilderPage-Y7JbPCpm.js","assets/EmailTemplatesPage-BYNe0RWJ.css","assets/EmailTemplatesPage-ViJEmEb6.js","assets/EmailTool-Bvx8NoMg.css","assets/EmailTool-C-_czRyU.js","assets/GoalEditor-CbRMZbiF.js","assets/GoalEditor-DNgOGpld.css","assets/HelpPage-C5tO-gsf.js","assets/HelpPage-CbZLzIDy.css","assets/HistoryTool-B6YzlTS7.js","assets/HistoryTool-f7CTy5KH.css","assets/InsightPanel-ILrvDOGQ.css","assets/InsightPanel-LQQi0Ftw.js","assets/Inter-Bold-CwK0yBq9.woff","assets/Inter-Medium-CRBLXpIG.woff","assets/Inter-Regular-CHNwvmI_.woff","assets/Inter-SemiBold-BWnLE2Zz.woff","assets/InterDisplay-Bold-DDOf113W.woff","assets/InterDisplay-Medium-BIdvIqw4.woff","assets/InterDisplay-SemiBold-zxE28j0h.woff","assets/Lora-Italic-DRD9C382.woff","assets/Lora-Regular-BM_tvNoN.woff","assets/MailPage-CemXpPfT.css","assets/MailPage-seMQDDci.js","assets/MapPage-DqedY4mS.js","assets/MapPage-aRrvZUou.css","assets/MonthWidget-y_t0UXgh.js","assets/NewScanPage-BLHXO-4Z.js","assets/NewScanPage-BpgfCUsm.css","assets/NotFoundPage-B2vReeEA.js","assets/NotificationsPage-6cF0Ivk-.js","assets/NotificationsPage-kQqoETY9.css","assets/OffersPage-CtwzIKVA.css","assets/OffersPage-yjEngmkP.js","assets/PageSpeedKey-BWgSZ7Es.js","assets/PageSpeedKey-CgcWViBi.css","assets/PipelinePage-B6PzhVwZ.js","assets/PipelinePage-CbrTKpEu.css","assets/PitchDeck-9F7xbInS.css","assets/PitchDeck-DiQXNFoQ.js","assets/PostsTool-BhWhI1z2.js","assets/PostsTool-Cm4GwDz6.css","assets/ProjectPage-0-jyPRLA.js","assets/ProjectPage-C2c1vfU7.css","assets/ProposalPage-COBE1ONg.js","assets/ProposalPage-D4MWJbtj.css","assets/ProposalsPage-BThFAmqm.js","assets/ProposalsPage-BbguE_8k.css","assets/QrTool-CTmCNLyK.js","assets/QrTool-Teiw78k0.css","assets/RealScan-Cq2jgR3M.css","assets/RealScan.module-T60kfcLV.js","assets/ReportBuilderPage-B1lqUFhk.css","assets/ReportBuilderPage-C6ceyeTu.js","assets/RichText-B_IpFyaY.css","assets/RichText-d47As7u0.js","assets/ScanPage-BFtmC_v9.js","assets/ScanPage-CRtGvH2U.css","assets/ScansPage-CzxYJSo8.css","assets/ScansPage-juMHWaNT.js","assets/ScopeMap-BfYkU1E6.css","assets/ScopeMap-uSIvZwTg.js","assets/SequencePage-B7Ha9rJ_.css","assets/SequencePage-BoLkNflY.js","assets/SettingsPage-112exV0D.css","assets/SettingsPage-xL2aylT3.js","assets/SpeedTool-C1kkXgv-.js","assets/SpeedTool-Cezbwk0j.css","assets/StartPage-HS8fNCR8.css","assets/StartPage-R_clq2ng.js","assets/StatusChip-ClX1hkmU.js","assets/TechTool-DF2Rtlui.css","assets/TechTool-hb94ccx-.js","assets/TodayPage-C_b95H__.js","assets/TodayPage-WgyVvYSs.css","assets/ToolsHome-DLBfrCJe.css","assets/ToolsHome-DRA7gu_I.js","assets/WebsiteAuditDoc-BIcEqX9W.css","assets/WebsiteAuditDoc-CQYnhqDg.js","assets/WelcomeClientDialog-gmaZzmFP.js","assets/WelcomeClientDialog-uG0ZRoAL.css","assets/WorkflowPage-BoXguz3o.css","assets/WorkflowPage-uGQui82B.js","assets/analyzer-fVAoceA6.js","assets/bits-3acaSpQ5.css","assets/bits-CPHbRRev.js","assets/brandKit-6-kK8YYK.js","assets/charts-DMab6nrJ.css","assets/charts-DhtO4FJA.js","assets/controls-DbNaFNJo.js","assets/engine-B4BWdWrU.js","assets/index-B3ICNDa9.js","assets/insights-CUY6Qatw.js","assets/mailUtil-CTSWgm6U.css","assets/mailUtil-DM8jXcq1.js","assets/motion-Bx_Sv045.js","assets/open-BDemiAx1.js","assets/osm-Cv1-sOrN.js","assets/overlays-ByMOU-WS.js","assets/photon-D37HCf9J.js","assets/pi-jkzrOHGV.js","assets/printCopy-B_kisUsg.js","assets/queue-CmkITXGd.js","assets/runStep-DhXKqO_8.js","assets/runs-DywqHfFt.js","assets/scheduler-BUHJDZYE.js","assets/sort-CcWCULF0.js","assets/sort-D_J6P6wz.css","assets/store-BYRsq71t.js","assets/store-Vs2iqneA.js","assets/styles-BxA8c_3B.js","assets/styles-CEXq5h4G.css","assets/toast-DSnLSuOx.js","assets/useFitLevel-CRQyZtxD.js","assets/useMedia-Bb-lnJ43.js","assets/useMedia-DgsGgoDf.js","assets/useSequenceSync-02EQnGqj.js"];

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
