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
const PRECACHE = ["assets/AgentPage-OC9CPGKq.css","assets/AgentPage-OglnJWH0.js","assets/AnalyticsPage-CRR51b5S.js","assets/AnalyticsPage-D8VcbwI_.css","assets/AuditPage-C8SbBT0v.js","assets/AuditPage-DPiMwtbC.css","assets/AuditReportPage-DAGe0eA8.css","assets/AuditReportPage-_F26RZy7.js","assets/AuditTool-Cv1IaCYY.js","assets/AutomationsPage-BZPQYL8c.js","assets/AutomationsPage-foQfXn88.css","assets/BatchDialog-rLPvSaZY.js","assets/BuildPage-Bn2w83G2.js","assets/BuildPage-PZ9XQLX_.css","assets/BuilderHome-C9V9vGC6.css","assets/BuilderHome-DeTB7Ec3.js","assets/BusinessDrawer-5sRyAZ5W.js","assets/BusinessDrawer-Docu0ZNV.css","assets/BusinessList-B_L0rvP3.js","assets/BusinessList-Bd-_Vlpl.css","assets/BusinessTable-Dv4SHC_i.css","assets/BusinessTable-eNwZ6_5H.js","assets/BusinessesPage-3jwfj-U8.css","assets/BusinessesPage-B9feEXQ1.js","assets/CallModePage-CVXrXwsq.js","assets/CallModePage-Lm3MFJXN.css","assets/ClientsPage-BEvJSJ6Z.css","assets/ClientsPage-DU8ivVjK.js","assets/ColoursTool-BIi1zwAt.css","assets/ColoursTool-DJ1vGClK.js","assets/CommandPalette-DGbaGBAL.js","assets/CommandPalette-_fvbvLCJ.css","assets/CompetitorsPage-Dz7VmiW1.js","assets/CompetitorsPage-VduJx32L.css","assets/ComposeHost-CAJFi7xk.css","assets/ComposeHost-gNFB4ek_.js","assets/Composer-BQ4CplVW.js","assets/Composer-D4m3ODJq.css","assets/ContactsTool-5kRQ5Tut.js","assets/ContactsTool-Bt959CaR.css","assets/DiagnosisDoc-DWRPLgk0.js","assets/DiagnosisDoc-Dw1J9T5g.css","assets/DiagnosisPanel-Mx9x-1zC.js","assets/DuePicker-B365aIaa.css","assets/DuePicker-CKodz973.js","assets/EmailBuilderPage-C03iopEn.css","assets/EmailBuilderPage-CtSF6evu.js","assets/EmailTemplatesPage-BYNe0RWJ.css","assets/EmailTemplatesPage-Duc42Teb.js","assets/EmailTool-Bvx8NoMg.css","assets/EmailTool-C_Ouo1_F.js","assets/GoalEditor-Cih__X2i.js","assets/GoalEditor-DNgOGpld.css","assets/HelpPage-CPO0fEeE.js","assets/HelpPage-CbZLzIDy.css","assets/HistoryTool-f7CTy5KH.css","assets/HistoryTool-kaOAolPF.js","assets/InsightPanel-ILrvDOGQ.css","assets/InsightPanel-TOT-chGn.js","assets/Inter-Bold-CwK0yBq9.woff","assets/Inter-Medium-CRBLXpIG.woff","assets/Inter-Regular-CHNwvmI_.woff","assets/Inter-SemiBold-BWnLE2Zz.woff","assets/InterDisplay-Bold-DDOf113W.woff","assets/InterDisplay-Medium-BIdvIqw4.woff","assets/InterDisplay-SemiBold-zxE28j0h.woff","assets/Lora-Italic-DRD9C382.woff","assets/Lora-Regular-BM_tvNoN.woff","assets/MailPage-BBopbzJP.js","assets/MailPage-CemXpPfT.css","assets/MapPage-DQAU65xf.js","assets/MapPage-aRrvZUou.css","assets/MonthWidget-CUju2PTz.js","assets/NewScanPage-BpgfCUsm.css","assets/NewScanPage-CVFjuPgG.js","assets/NotFoundPage-CeOvj6lD.js","assets/NotificationsPage-QaYFOFwk.js","assets/NotificationsPage-kQqoETY9.css","assets/OffersPage-CtwzIKVA.css","assets/OffersPage-DEW2z9NN.js","assets/PageSpeedKey-CgcWViBi.css","assets/PageSpeedKey-D6ddT5NG.js","assets/PipelinePage-CbrTKpEu.css","assets/PipelinePage-D7MrZXIE.js","assets/PitchDeck-BSTj5L_S.js","assets/PitchDeck-D7Vqsn-0.css","assets/PostsTool-Cm4GwDz6.css","assets/PostsTool-Dk5xSWhm.js","assets/ProjectPage-C2c1vfU7.css","assets/ProjectPage-Do3ISSjP.js","assets/ProposalPage-Ck3Yfpi7.js","assets/ProposalPage-D4MWJbtj.css","assets/ProposalsPage-BbguE_8k.css","assets/ProposalsPage-BtmME_ti.js","assets/QrTool-BdJZrNtt.js","assets/QrTool-Teiw78k0.css","assets/RealScan-Cq2jgR3M.css","assets/RealScan.module-T60kfcLV.js","assets/ReportBuilderPage-B1lqUFhk.css","assets/ReportBuilderPage-OMe6c9l9.js","assets/RichText-B_IpFyaY.css","assets/RichText-D3MWZNKh.js","assets/ScanPage-CRtGvH2U.css","assets/ScanPage-YsH2aM23.js","assets/ScansPage-BzIA4E5J.js","assets/ScansPage-CzxYJSo8.css","assets/ScopeMap-BfYkU1E6.css","assets/ScopeMap-DjzdQ1Cd.js","assets/SequencePage-B7Ha9rJ_.css","assets/SequencePage-fLGlICDF.js","assets/SettingsPage-TpB41HHG.js","assets/SettingsPage-iQyi3Mz7.css","assets/SpeedTool-CQ-x4KU9.js","assets/SpeedTool-Cezbwk0j.css","assets/StartPage-CD-ohpW-.js","assets/StartPage-HS8fNCR8.css","assets/StatusChip-DdqAqgzK.js","assets/TechTool-BJ0KHcGc.js","assets/TechTool-DF2Rtlui.css","assets/TodayPage-4iyDvbHy.js","assets/TodayPage-WgyVvYSs.css","assets/ToolsHome-DLBfrCJe.css","assets/ToolsHome-mekwnvDR.js","assets/WebsiteAuditDoc-BIcEqX9W.css","assets/WebsiteAuditDoc-CaDE_tC7.js","assets/WelcomeClientDialog-WQ18ZO9v.js","assets/WelcomeClientDialog-uG0ZRoAL.css","assets/WorkflowPage-BU9v01u5.js","assets/WorkflowPage-BoXguz3o.css","assets/analyzer--k5lAldm.js","assets/bits-3acaSpQ5.css","assets/bits-DblUPqF8.js","assets/brandKit-DpQbtVXI.js","assets/charts-BiKMBcxE.js","assets/charts-DMab6nrJ.css","assets/controls-PD1AZjqN.js","assets/engine-BcQZlDbz.js","assets/index-gvtEe5K1.js","assets/insights-BdOvwuf7.js","assets/mailUtil-CTSWgm6U.css","assets/mailUtil-D9rJU2n5.js","assets/motion-DETqIIWI.js","assets/open-QblRA0ue.js","assets/osm-B_Ze6FBd.js","assets/overlays-DuUcka6m.js","assets/photon-egeUW9Fv.js","assets/pi-Dd8Qw2O4.js","assets/printCopy-Dp2DypZz.js","assets/queue-DkauwSlz.js","assets/runStep-B1Bauu5O.js","assets/runs-DRBmr_5n.js","assets/scheduler-EcyVh5DU.js","assets/sort-D_J6P6wz.css","assets/sort-Dd6iANSL.js","assets/store-DJhmWLB6.js","assets/store-bVPwSs3l.js","assets/styles-BxA8c_3B.js","assets/styles-CEXq5h4G.css","assets/toast-mLeTUf4M.js","assets/useFitLevel-YXzxdM3l.js","assets/useMedia-B8VMLsuw.js","assets/useMedia-CMJGk32L.js","assets/useSequenceSync-Cokkq8_B.js"];

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
