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
const PRECACHE = ["assets/AdminPage-BotoLnXM.css","assets/AdminPage-m-4BlnXX.js","assets/AdminSignIn-CgQJ8wrX.css","assets/AdminSignIn-DJcQzIZk.js","assets/AgentPage-3TLn_2AL.css","assets/AgentPage-DaEUVTH5.js","assets/AnalyticsPage-D8VcbwI_.css","assets/AnalyticsPage-DLzw2kkw.js","assets/AuditPage-DPiMwtbC.css","assets/AuditPage-DdmVN3XV.js","assets/AuditReportPage-D-fN8RZV.js","assets/AuditReportPage-DAGe0eA8.css","assets/AuditTool-B5_GqZqd.js","assets/AutomationsPage-cWR3hGsB.js","assets/AutomationsPage-foQfXn88.css","assets/BatchDialog-D3NUbiUk.js","assets/BetaCodeForm-DCMzp_c_.js","assets/BuildPage-8gOa6eyc.js","assets/BuildPage-PZ9XQLX_.css","assets/BuilderHome-C9V9vGC6.css","assets/BuilderHome-DkqwTB3d.js","assets/BusinessDrawer-BzCh3NZR.js","assets/BusinessDrawer-CHC1KmOx.css","assets/BusinessList-Bf8RiOKn.js","assets/BusinessList-DKebMk8d.css","assets/BusinessTable-CkCuo0fb.js","assets/BusinessTable-PnoOdMsm.css","assets/BusinessesPage-4MWDjqQr.js","assets/BusinessesPage-CTAnZjOs.css","assets/CallModePage-Bwu7pF3T.js","assets/CallModePage-Lm3MFJXN.css","assets/ClientsPage-1-tRzAMv.js","assets/ClientsPage-BEvJSJ6Z.css","assets/ColoursTool-BIi1zwAt.css","assets/ColoursTool-CmbcayJg.js","assets/CommandPalette-CxNitRfS.js","assets/CommandPalette-_fvbvLCJ.css","assets/CompetitorsPage-BjbijcEP.js","assets/CompetitorsPage-VduJx32L.css","assets/ComposeHost-BpfMUzkK.js","assets/ComposeHost-CAJFi7xk.css","assets/Composer-BrGe8Bnh.css","assets/Composer-CljLxPtC.js","assets/ContactsTool-Bt959CaR.css","assets/ContactsTool-DeitDYvK.js","assets/DiagnosisDoc-DcjI7Bd0.js","assets/DiagnosisDoc-Dw1J9T5g.css","assets/DiagnosisPanel-C7F9w4L8.js","assets/DiagnosisPanel-Cu_8G16W.css","assets/DuePicker-B365aIaa.css","assets/DuePicker-U_L7kFEJ.js","assets/EmailBuilderPage-C03iopEn.css","assets/EmailBuilderPage-pjoUYMhQ.js","assets/EmailTemplatesPage-8amQRxnl.js","assets/EmailTemplatesPage-BYNe0RWJ.css","assets/EmailTool-Bvx8NoMg.css","assets/EmailTool-O3Ga5JGM.js","assets/GoalEditor-DKJd2WIm.js","assets/GoalEditor-DNgOGpld.css","assets/GoogleAttribution-Dd7vt8M-.js","assets/GoogleAttribution-aklh_XQb.css","assets/GoogleScopeMap-CBqP3ECh.js","assets/GoogleScopeMap-D_4Tk6Hb.css","assets/HelpPage-BszEQroO.js","assets/HelpPage-DlOOeme0.css","assets/HistoryTool-f7CTy5KH.css","assets/HistoryTool-qWvNQ05n.js","assets/InsightPanel-CU1qUXAM.css","assets/InsightPanel-DfzanEUv.js","assets/Inter-Bold-CwK0yBq9.woff","assets/Inter-Medium-CRBLXpIG.woff","assets/Inter-Regular-CHNwvmI_.woff","assets/Inter-SemiBold-BWnLE2Zz.woff","assets/InterDisplay-Bold-DDOf113W.woff","assets/InterDisplay-Medium-BIdvIqw4.woff","assets/InterDisplay-SemiBold-zxE28j0h.woff","assets/Lora-Italic-DRD9C382.woff","assets/Lora-Regular-BM_tvNoN.woff","assets/MailPage-Bkl0_2Sr.js","assets/MailPage-CemXpPfT.css","assets/MapPage-B15v-HaZ.js","assets/MapPage-Dqh7mtdr.css","assets/MonthWidget-BiczDUHm.js","assets/NewScanPage-C3ZV-Law.js","assets/NewScanPage-Ul3lpMZp.css","assets/NotFoundPage-BbpVp7Mb.js","assets/NotificationsPage-D0a86l-N.js","assets/NotificationsPage-kQqoETY9.css","assets/OffersPage-CtwzIKVA.css","assets/OffersPage-grAXXaJO.js","assets/OutOfCredits-DefPCWWc.js","assets/PageSpeedKey-CgcWViBi.css","assets/PageSpeedKey-xEB20H1Q.js","assets/PipelinePage-B5N6L26L.js","assets/PipelinePage-CbrTKpEu.css","assets/PitchDeck-CQ3eJqT9.css","assets/PitchDeck-DTymIRiX.js","assets/PostsTool-Cm4GwDz6.css","assets/PostsTool-D4OHpLpz.js","assets/ProjectPage-B5IyhZJZ.js","assets/ProjectPage-C2c1vfU7.css","assets/ProposalPage-D4MWJbtj.css","assets/ProposalPage-hrt_377E.js","assets/ProposalsPage-B7Y-d0fR.js","assets/ProposalsPage-BbguE_8k.css","assets/QrTool-Bnze4xWG.js","assets/QrTool-Teiw78k0.css","assets/QuebecTool-Bgy50Ydx.js","assets/QuebecTool-D0o5zYGH.css","assets/RealScan-CmPLeZJp.css","assets/RealScan.module-BPB7IWXO.js","assets/ReportBuilderPage-B1lqUFhk.css","assets/ReportBuilderPage-DTjIvdZS.js","assets/RichText-B_IpFyaY.css","assets/RichText-DW2k8GMT.js","assets/ScanPage-CbPTIFwu.css","assets/ScanPage-DPb3JKrz.js","assets/ScansPage-Bgan-1q6.js","assets/ScansPage-DWavz1HJ.css","assets/ScopeMap-BdcJktCG.js","assets/ScopeMap-Cad2dRHB.css","assets/SequencePage-B7Ha9rJ_.css","assets/SequencePage-DEdXNBhK.js","assets/SettingsPage-B3oMw-92.css","assets/SettingsPage-xuzbLqbT.js","assets/SpeedTool-CZ-29-G_.js","assets/SpeedTool-Cezbwk0j.css","assets/StartPage-C7MMzy73.css","assets/StartPage-bK8u7Qlf.js","assets/StatusChip-Du_iyJNE.js","assets/TechTool-DF2Rtlui.css","assets/TechTool-rEtivdAD.js","assets/TodayPage-B6IQDV67.css","assets/TodayPage-SXGE9-pl.js","assets/ToolsHome-B157aR9y.js","assets/ToolsHome-I5KqhUY0.css","assets/WebsiteAuditDoc-BIcEqX9W.css","assets/WebsiteAuditDoc-BsJWmyTF.js","assets/WelcomeClientDialog-DmFexzPr.js","assets/WelcomeClientDialog-uG0ZRoAL.css","assets/WorkflowPage-BoXguz3o.css","assets/WorkflowPage-Ckzu3B9S.js","assets/analyzer-DheWezFN.js","assets/bits-3acaSpQ5.css","assets/bits-BDBYfNKr.js","assets/brandKit-_ClJJzZr.js","assets/businessMenu-BuNAZ7xY.js","assets/catalog-B-mlZnVJ.js","assets/categoryIcons-BuxDvB1r.js","assets/charts-C-kjzlkJ.js","assets/charts-DMab6nrJ.css","assets/controls-_r8FuRD8.js","assets/data-DIYnFP8J.js","assets/engine-BRS-ITaH.js","assets/externalUrl-DPLo9SIf.js","assets/facts-BtzQbIGf.js","assets/index-BIC8U-p8.js","assets/insights-BMnRVNbq.js","assets/mailUtil-CTSWgm6U.css","assets/mailUtil-vUbHyIWT.js","assets/motion-z3R2V-gh.js","assets/open-BzjVvcVM.js","assets/osm-DJEJBaB0.js","assets/overlays-TJHUASYu.js","assets/photon-BCF5h6a-.js","assets/pi-7qYSxXfz.js","assets/printCopy-0k9wIh9u.js","assets/queue-CvtizJ9M.js","assets/runStep-BHze00uS.js","assets/runs-DToQrjFG.js","assets/scheduler-CqYQucVm.js","assets/sectionFacts-Cy7wR0Zl.js","assets/sort-DWVuh10G.css","assets/sort-DsyJ-Qs7.js","assets/store-BFxvdNxQ.js","assets/store-DFasZ5Cb.js","assets/styles-DZqw2BGi.js","assets/styles-X0ousYfF.css","assets/toast-BHq3b6Xe.js","assets/useFitLevel-Dh38qcrf.js","assets/useMedia-BX1gNV6Y.js","assets/useMedia-BhoTFXXC.js","assets/useSequenceSync-BkNX3yCr.js"];

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
