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
const PRECACHE = ["assets/AgentPage-BdlqY4BS.js","assets/AgentPage-OC9CPGKq.css","assets/AnalyticsPage-BsxW9D_-.js","assets/AnalyticsPage-D8VcbwI_.css","assets/AuditPage-BCkNittf.js","assets/AuditPage-DPiMwtbC.css","assets/AuditReportPage-DAGe0eA8.css","assets/AuditReportPage-DVKdRdwk.js","assets/AuditTool-BQK3ap6c.js","assets/AutomationsPage-DIFE29xR.js","assets/AutomationsPage-foQfXn88.css","assets/BatchDialog-CBSCnorY.js","assets/BuildPage-Dy-zFgzr.js","assets/BuildPage-PZ9XQLX_.css","assets/BuilderHome-BSZiJanb.js","assets/BuilderHome-C9V9vGC6.css","assets/BusinessDrawer-CjBvG8HL.js","assets/BusinessDrawer-Docu0ZNV.css","assets/BusinessList-Bd-_Vlpl.css","assets/BusinessList-DP3Dw0As.js","assets/BusinessTable-Ce7Wkr_9.js","assets/BusinessTable-Dv4SHC_i.css","assets/BusinessesPage-3jwfj-U8.css","assets/BusinessesPage-Cw7vr5p0.js","assets/CallModePage-Lm3MFJXN.css","assets/CallModePage-Y0mcLyR8.js","assets/ClientsPage-BEvJSJ6Z.css","assets/ClientsPage-BkQdAp1b.js","assets/ColoursTool-BIi1zwAt.css","assets/ColoursTool-CqD_r3fp.js","assets/CommandPalette-_fvbvLCJ.css","assets/CommandPalette-u1GrrQPW.js","assets/CompetitorsPage-DrgtLSKk.js","assets/CompetitorsPage-VduJx32L.css","assets/ComposeHost-BpDYa_6-.js","assets/ComposeHost-CAJFi7xk.css","assets/Composer-D4m3ODJq.css","assets/Composer-JcTBCmfS.js","assets/ContactsTool-Bt959CaR.css","assets/ContactsTool-CReeKCa6.js","assets/DiagnosisDoc-BCqUyivi.js","assets/DiagnosisDoc-Dw1J9T5g.css","assets/DiagnosisPanel-BzVEWl5n.js","assets/DuePicker-B365aIaa.css","assets/DuePicker-Cz95T_7h.js","assets/EmailBuilderPage-2UURHPhw.js","assets/EmailBuilderPage-C03iopEn.css","assets/EmailTemplatesPage-BYNe0RWJ.css","assets/EmailTemplatesPage-k0eb8kOk.js","assets/EmailTool-Bfi-OaLe.js","assets/EmailTool-Bvx8NoMg.css","assets/GoalEditor-DLB5IBCh.js","assets/GoalEditor-DNgOGpld.css","assets/HelpPage-CbZLzIDy.css","assets/HelpPage-DHeAd3c0.js","assets/HistoryTool-CssSFnvB.js","assets/HistoryTool-f7CTy5KH.css","assets/InsightPanel-BBhZxdx5.js","assets/InsightPanel-ILrvDOGQ.css","assets/Inter-Bold-CwK0yBq9.woff","assets/Inter-Medium-CRBLXpIG.woff","assets/Inter-Regular-CHNwvmI_.woff","assets/Inter-SemiBold-BWnLE2Zz.woff","assets/InterDisplay-Bold-DDOf113W.woff","assets/InterDisplay-Medium-BIdvIqw4.woff","assets/InterDisplay-SemiBold-zxE28j0h.woff","assets/Lora-Italic-DRD9C382.woff","assets/Lora-Regular-BM_tvNoN.woff","assets/MailPage-CemXpPfT.css","assets/MailPage-CwW9vhso.js","assets/MapPage-Bnc_Nr5b.js","assets/MapPage-aRrvZUou.css","assets/MonthWidget-BajM5XfO.js","assets/NewScanPage-BNH1xkhm.js","assets/NewScanPage-BpgfCUsm.css","assets/NotFoundPage-C3l-GLHa.js","assets/NotificationsPage-DfHbKbK-.js","assets/NotificationsPage-kQqoETY9.css","assets/OffersPage-Cgj-b7F9.js","assets/OffersPage-CtwzIKVA.css","assets/PageSpeedKey-CgcWViBi.css","assets/PageSpeedKey-Dvm2Pt6R.js","assets/PipelinePage-6t3b18y7.js","assets/PipelinePage-CbrTKpEu.css","assets/PitchDeck-CArfUJ2m.js","assets/PitchDeck-D7Vqsn-0.css","assets/PostsTool-BlYGoshc.js","assets/PostsTool-Cm4GwDz6.css","assets/ProjectPage-C2c1vfU7.css","assets/ProjectPage-DdTHS7kr.js","assets/ProposalPage-D4MWJbtj.css","assets/ProposalPage-p3-WA4AG.js","assets/ProposalsPage-BbguE_8k.css","assets/ProposalsPage-DUpib42V.js","assets/QrTool-CAvcsDCf.js","assets/QrTool-Teiw78k0.css","assets/RealScan-Cq2jgR3M.css","assets/RealScan.module-T60kfcLV.js","assets/ReportBuilderPage-B1lqUFhk.css","assets/ReportBuilderPage-CdYVD95z.js","assets/RichText-B_IpFyaY.css","assets/RichText-D7yMqCyL.js","assets/ScanPage-BUjuFX-M.js","assets/ScanPage-CRtGvH2U.css","assets/ScansPage-5wHRKTEC.js","assets/ScansPage-CzxYJSo8.css","assets/ScopeMap-BfYkU1E6.css","assets/ScopeMap-DKsezclJ.js","assets/SequencePage-B7Ha9rJ_.css","assets/SequencePage-CPTqgGla.js","assets/SettingsPage-BEWQITkF.js","assets/SettingsPage-iQyi3Mz7.css","assets/SpeedTool-Cezbwk0j.css","assets/SpeedTool-JXi7M1O5.js","assets/StartPage-BV-FtLer.js","assets/StartPage-HS8fNCR8.css","assets/StatusChip-3j_Iwuy3.js","assets/TechTool-DF2Rtlui.css","assets/TechTool-DmpqO4X-.js","assets/TodayPage-Bs6rLKJB.js","assets/TodayPage-WgyVvYSs.css","assets/ToolsHome-DLBfrCJe.css","assets/ToolsHome-thU-56uQ.js","assets/WebsiteAuditDoc-BIcEqX9W.css","assets/WebsiteAuditDoc-BZozh5ng.js","assets/WelcomeClientDialog-cJAjQcaY.js","assets/WelcomeClientDialog-uG0ZRoAL.css","assets/WorkflowPage-Bn-k-k-H.js","assets/WorkflowPage-BoXguz3o.css","assets/analyzer-DU2O6WbU.js","assets/bits-3acaSpQ5.css","assets/bits-KGBQUdfV.js","assets/brandKit-F5N9RFbK.js","assets/charts-BiKMBcxE.js","assets/charts-DMab6nrJ.css","assets/controls-BWYw3tv-.js","assets/engine-BPTF9Qbh.js","assets/index-D7P_uUQu.js","assets/insights-CBbRQLxF.js","assets/mailUtil-CTSWgm6U.css","assets/mailUtil-EPuHQ21K.js","assets/motion-DETqIIWI.js","assets/open-Beek4Ty0.js","assets/osm-DDVDqL8T.js","assets/overlays-BgZSs40u.js","assets/photon-Cb3nNK1w.js","assets/pi-Dd8Qw2O4.js","assets/printCopy-Cpz6ZEct.js","assets/queue-BxXhpfId.js","assets/runStep-3E6KNUF-.js","assets/runs-D6B9FXBy.js","assets/scheduler-BeKfySQ3.js","assets/sort-D_J6P6wz.css","assets/sort-lreiGoXt.js","assets/store-CnTiBCml.js","assets/store-DfVMKlE8.js","assets/styles-BxA8c_3B.js","assets/styles-CEXq5h4G.css","assets/toast-mLeTUf4M.js","assets/useFitLevel-YXzxdM3l.js","assets/useMedia-B8VMLsuw.js","assets/useMedia-CMJGk32L.js","assets/useSequenceSync-D1hm-WBy.js"];

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
