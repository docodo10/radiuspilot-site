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
const PRECACHE = ["assets/AgentPage-3TLn_2AL.css","assets/AgentPage-BXmxGqnm.js","assets/AnalyticsPage-D8VcbwI_.css","assets/AnalyticsPage-D8_p4pbx.js","assets/AuditPage-BCz5Yke2.js","assets/AuditPage-DPiMwtbC.css","assets/AuditReportPage-C-aegG-s.js","assets/AuditReportPage-DAGe0eA8.css","assets/AuditTool-CPKqwxRE.js","assets/AutomationsPage-Cpp5-hjX.js","assets/AutomationsPage-foQfXn88.css","assets/BatchDialog-Blp6cV3t.js","assets/BuildPage-D1g0n9qO.js","assets/BuildPage-PZ9XQLX_.css","assets/BuilderHome-0QtynH_U.js","assets/BuilderHome-C9V9vGC6.css","assets/BusinessDrawer-CJ2R1D5U.css","assets/BusinessDrawer-PCcaLBIh.js","assets/BusinessList-AiPMVdcT.js","assets/BusinessList-Bd-_Vlpl.css","assets/BusinessTable-Dv4SHC_i.css","assets/BusinessTable-psoyedSY.js","assets/BusinessesPage-CTAnZjOs.css","assets/BusinessesPage-DkPkvHih.js","assets/CallModePage-Bdmj_BXn.js","assets/CallModePage-Lm3MFJXN.css","assets/ClientsPage-BEvJSJ6Z.css","assets/ClientsPage-DOV9t3NR.js","assets/ColoursTool-BIi1zwAt.css","assets/ColoursTool-DoCxNq-J.js","assets/CommandPalette-CQJu6zx6.js","assets/CommandPalette-_fvbvLCJ.css","assets/CompetitorsPage-Cktf77sT.js","assets/CompetitorsPage-VduJx32L.css","assets/ComposeHost-Bs2R7kn8.js","assets/ComposeHost-CAJFi7xk.css","assets/Composer-D4m3ODJq.css","assets/Composer-PgVMFm-I.js","assets/ContactsTool-Bt959CaR.css","assets/ContactsTool-TaJFMWAr.js","assets/DiagnosisDoc-DDR8aoO1.js","assets/DiagnosisDoc-Dw1J9T5g.css","assets/DiagnosisPanel-DF4NP10H.js","assets/DuePicker-B365aIaa.css","assets/DuePicker-BGBqx0aw.js","assets/EmailBuilderPage-C03iopEn.css","assets/EmailBuilderPage-DbOHnRzE.js","assets/EmailTemplatesPage-BYNe0RWJ.css","assets/EmailTemplatesPage-CDlEFHnc.js","assets/EmailTool-Bvx8NoMg.css","assets/EmailTool-C--1mSv3.js","assets/GoalEditor-DNgOGpld.css","assets/GoalEditor-DZ9d266e.js","assets/GooglePanel-A20MLEpE.css","assets/GooglePanel-Csg5In1r.js","assets/GoogleScopeMap-B40k9k42.css","assets/GoogleScopeMap-C7yd1Mp3.js","assets/HelpPage-BGyxczCH.js","assets/HelpPage-DiFF7iB5.css","assets/HistoryTool-BTAEWnJK.js","assets/HistoryTool-f7CTy5KH.css","assets/InsightPanel-BGtSsR7I.js","assets/InsightPanel-ILrvDOGQ.css","assets/Inter-Bold-CwK0yBq9.woff","assets/Inter-Medium-CRBLXpIG.woff","assets/Inter-Regular-CHNwvmI_.woff","assets/Inter-SemiBold-BWnLE2Zz.woff","assets/InterDisplay-Bold-DDOf113W.woff","assets/InterDisplay-Medium-BIdvIqw4.woff","assets/InterDisplay-SemiBold-zxE28j0h.woff","assets/Lora-Italic-DRD9C382.woff","assets/Lora-Regular-BM_tvNoN.woff","assets/MailPage-CemXpPfT.css","assets/MailPage-_VvT-Xua.js","assets/MapPage-DGne9Yyx.js","assets/MapPage-aRrvZUou.css","assets/MonthWidget-DkJmAI1a.js","assets/NewScanPage-Bl1mJFhV.css","assets/NewScanPage-zhsSQuw_.js","assets/NotFoundPage-CHubrqEy.js","assets/NotificationsPage-E_F08lnJ.js","assets/NotificationsPage-kQqoETY9.css","assets/OffersPage-CtwzIKVA.css","assets/OffersPage-rsZntL86.js","assets/PageSpeedKey-CgcWViBi.css","assets/PageSpeedKey-GkCQO2-t.js","assets/PipelinePage-CBczCHnU.js","assets/PipelinePage-CbrTKpEu.css","assets/PitchDeck-9F7xbInS.css","assets/PitchDeck-CL-mM8hf.js","assets/PostsTool-BHpQxTP0.js","assets/PostsTool-Cm4GwDz6.css","assets/ProjectPage-BBeD_PxN.js","assets/ProjectPage-C2c1vfU7.css","assets/ProposalPage-D3MYmQJ1.js","assets/ProposalPage-D4MWJbtj.css","assets/ProposalsPage-BbguE_8k.css","assets/ProposalsPage-D0Ho8Rrl.js","assets/QrTool-BVe0rHt-.js","assets/QrTool-Teiw78k0.css","assets/RealScan-nBFK9l58.css","assets/RealScan.module-BiDWBPvX.js","assets/ReportBuilderPage-B1lqUFhk.css","assets/ReportBuilderPage-CXL4KSWo.js","assets/RichText-B_IpFyaY.css","assets/RichText-DQARxAbA.js","assets/ScanPage-CRtGvH2U.css","assets/ScanPage-znLK-O7n.js","assets/ScansPage-BI_VR2_M.js","assets/ScansPage-DWavz1HJ.css","assets/ScopeMap-BThmdlLI.js","assets/ScopeMap-CDvOVwSs.css","assets/SequencePage-B7Ha9rJ_.css","assets/SequencePage-DYXzxYmf.js","assets/SettingsPage-DQ6HT3pO.js","assets/SettingsPage-Vpz1ll6r.css","assets/SpeedTool-Cezbwk0j.css","assets/SpeedTool-DxYq1VIY.js","assets/StartPage-C5u4ft83.js","assets/StartPage-C7MMzy73.css","assets/StatusChip-BmQvEx9S.js","assets/TechTool-BLacJPe2.js","assets/TechTool-DF2Rtlui.css","assets/TodayPage-B6IQDV67.css","assets/TodayPage-BhYKMR_P.js","assets/ToolsHome-DoncBk2U.js","assets/ToolsHome-I5KqhUY0.css","assets/WebsiteAuditDoc-BIcEqX9W.css","assets/WebsiteAuditDoc-CXYWoynf.js","assets/WelcomeClientDialog-0iwrIbm6.js","assets/WelcomeClientDialog-uG0ZRoAL.css","assets/WorkflowPage-BoXguz3o.css","assets/WorkflowPage-BudZ8WmE.js","assets/analyzer-Crnu_-dS.js","assets/bits-3acaSpQ5.css","assets/bits-C_YGM_Ml.js","assets/brandKit-Cvo8kFbQ.js","assets/charts-DMab6nrJ.css","assets/charts-Dm1NZor7.js","assets/controls-DSbBpNep.js","assets/engine-Cp_-MXYD.js","assets/index-DYQkQIPA.js","assets/insights-GdNOjh1a.js","assets/mailUtil-CTSWgm6U.css","assets/mailUtil-DXWdyEj9.js","assets/motion-CpLZCl0M.js","assets/open-DRjqkPYW.js","assets/osm-kO4tjKwx.js","assets/overlays-Cjy-UyAu.js","assets/photon-B5NclJ-l.js","assets/pi-C8c64aYZ.js","assets/places-CfhCVFZY.js","assets/printCopy-CDtVmQwk.js","assets/queue-tNgSRLfr.js","assets/runStep-Df6ydlzs.js","assets/runs-BRteXRQh.js","assets/scheduler-B-NZ2aDm.js","assets/sort-BfaWosnZ.js","assets/sort-DWVuh10G.css","assets/store-BorwPmFU.js","assets/store-zIox4Gfk.js","assets/styles-BQQVp8bH.js","assets/styles-DAHdWAOy.css","assets/toast-NsHHUhsa.js","assets/useFitLevel-BPgHD51L.js","assets/useMedia-Df0YHW1R.js","assets/useMedia-e2QUW724.js","assets/useSequenceSync-C4P4IiuR.js"];

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
