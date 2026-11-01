/*
 * Pitchable's offline copy (the installable web build only; src/app/pwa.ts registers it).
 * - The app's built files (assets/*, their names change with every build): all of them are kept when this
 *   worker installs (the list below is written in by the web build), so after one visit the app opens
 *   offline, every screen included. Served from the copy kept here first, the network otherwise.
 * - The page itself (index.html): the network first, so an update shows on the next start; the kept
 *   copy only when offline.
 * - Requests to any other site (the free services the Tools and scans call, fonts, pictures) are never
 *   touched: the browser handles them as if this file didn't exist. So is anything that isn't a GET.
 * Nothing about the person's work is ever stored here (that is IndexedDB's job).
 */
const PRECACHE = ["assets/AgentPage-C5RsCZS2.css","assets/AgentPage-bByi89fe.js","assets/AnalyticsPage-D8VcbwI_.css","assets/AnalyticsPage-DDxLmrq_.js","assets/AuditPage-DPiMwtbC.css","assets/AuditPage-dP49vmrO.js","assets/AuditReportPage-CEUExcFN.js","assets/AuditReportPage-DAGe0eA8.css","assets/AuditTool-BNHzxsy9.js","assets/AutomationsPage-CNKv-anf.js","assets/AutomationsPage-foQfXn88.css","assets/BatchDialog-CII9UiNs.js","assets/BuildPage-PZ9XQLX_.css","assets/BuildPage-RiZSokDo.js","assets/BuilderHome-C9V9vGC6.css","assets/BuilderHome-sm2f0_jx.js","assets/BusinessDrawer-C-SNmbrb.css","assets/BusinessDrawer-D3jYscc-.js","assets/BusinessList-Bd-_Vlpl.css","assets/BusinessList-C0qsacEE.js","assets/BusinessTable-BBQbSZVT.js","assets/BusinessTable-Dv4SHC_i.css","assets/BusinessesPage-3jwfj-U8.css","assets/BusinessesPage-fG3jLuKf.js","assets/CallModePage-Lm3MFJXN.css","assets/CallModePage-t4MApB6E.js","assets/ClientsPage-BEvJSJ6Z.css","assets/ClientsPage-CH09hOkN.js","assets/ColoursTool-B1pSpe6X.js","assets/ColoursTool-BIi1zwAt.css","assets/CommandPalette-_C3hRLrL.js","assets/CommandPalette-_fvbvLCJ.css","assets/CompetitorsPage-BtkJqtEt.js","assets/CompetitorsPage-VduJx32L.css","assets/ComposeHost-CAJFi7xk.css","assets/ComposeHost-DZdE51gM.js","assets/Composer-D4m3ODJq.css","assets/Composer-DEtO7PRN.js","assets/ContactsTool-Bt959CaR.css","assets/ContactsTool-CxiQy3aY.js","assets/DiagnosisDoc-BleC5T0z.js","assets/DiagnosisDoc-Dw1J9T5g.css","assets/DiagnosisPanel-Bq-D8WQc.js","assets/DuePicker-B365aIaa.css","assets/DuePicker-DAI9Qg0C.js","assets/EmailBuilderPage-C03iopEn.css","assets/EmailBuilderPage-RwB2l3iu.js","assets/EmailTemplatesPage-BYNe0RWJ.css","assets/EmailTemplatesPage-CgYZiDEy.js","assets/EmailTool-Bvx8NoMg.css","assets/EmailTool-Dhaat7GU.js","assets/GoalEditor-CPLAZgt0.js","assets/GoalEditor-DNgOGpld.css","assets/HelpPage-C1UtcEQh.js","assets/HelpPage-CbZLzIDy.css","assets/HistoryTool-f7CTy5KH.css","assets/HistoryTool-jLC3PnhU.js","assets/InsightPanel-DDUFkRmt.js","assets/InsightPanel-ILrvDOGQ.css","assets/Inter-Bold-CwK0yBq9.woff","assets/Inter-Medium-CRBLXpIG.woff","assets/Inter-Regular-CHNwvmI_.woff","assets/Inter-SemiBold-BWnLE2Zz.woff","assets/InterDisplay-Bold-DDOf113W.woff","assets/InterDisplay-Medium-BIdvIqw4.woff","assets/InterDisplay-SemiBold-zxE28j0h.woff","assets/Lora-Italic-DRD9C382.woff","assets/Lora-Regular-BM_tvNoN.woff","assets/MailPage-CemXpPfT.css","assets/MailPage-gcfrzAww.js","assets/MapPage-BrOYxUUy.js","assets/MapPage-aRrvZUou.css","assets/MonthWidget-Ctmg49u2.js","assets/NewScanPage-BpgfCUsm.css","assets/NewScanPage-zEdl5gDH.js","assets/NotFoundPage-Cf9WKn-K.js","assets/NotificationsPage-D81Oqk4S.js","assets/NotificationsPage-kQqoETY9.css","assets/OffersPage-BkNEB79Y.js","assets/OffersPage-CtwzIKVA.css","assets/PageSpeedKey-Bl3E4uA1.js","assets/PageSpeedKey-CgcWViBi.css","assets/PipelinePage-CbrTKpEu.css","assets/PipelinePage-DoFni0jG.js","assets/PitchDeck-BTv53bJV.js","assets/PitchDeck-D7Vqsn-0.css","assets/PostsTool-C952buK9.js","assets/PostsTool-Cm4GwDz6.css","assets/ProjectPage-C2c1vfU7.css","assets/ProjectPage-Dwh9dFG4.js","assets/ProposalPage-D4MWJbtj.css","assets/ProposalPage-Jm-UqiEg.js","assets/ProposalsPage-BbguE_8k.css","assets/ProposalsPage-DaBGplG5.js","assets/QrTool-3LQxywED.js","assets/QrTool-Teiw78k0.css","assets/RealScan-Cq2jgR3M.css","assets/RealScan.module-T60kfcLV.js","assets/ReportBuilderPage-B1lqUFhk.css","assets/ReportBuilderPage-DMD6zrQ9.js","assets/RichText-B_IpFyaY.css","assets/RichText-DVo7VTKQ.js","assets/ScanPage-CRtGvH2U.css","assets/ScanPage-CzOZaSua.js","assets/ScansPage-CzxYJSo8.css","assets/ScansPage-ZQeIiFpu.js","assets/ScopeMap-BfYkU1E6.css","assets/ScopeMap-C3XtqmaH.js","assets/SequencePage-B7Ha9rJ_.css","assets/SequencePage-D8paagSx.js","assets/SettingsPage-D8cm1j2L.css","assets/SettingsPage-EU5h7lxR.js","assets/SpeedTool-Cezbwk0j.css","assets/SpeedTool-Ut4bD-_z.js","assets/StartPage-HS8fNCR8.css","assets/StartPage-eKmPrBty.js","assets/StatusChip-DcgMZ8dc.js","assets/TechTool-DF2Rtlui.css","assets/TechTool-uav43yua.js","assets/TodayPage-CT_bUdIX.js","assets/TodayPage-WgyVvYSs.css","assets/ToolsHome-BFJorZ5C.js","assets/ToolsHome-DLBfrCJe.css","assets/WebsiteAuditDoc-BCpFSrTt.js","assets/WebsiteAuditDoc-BIcEqX9W.css","assets/WelcomeClientDialog-BPSxp_s8.js","assets/WelcomeClientDialog-uG0ZRoAL.css","assets/WorkflowPage-BoXguz3o.css","assets/WorkflowPage-T-jc99nI.js","assets/analyzer-CUdTrxxh.js","assets/bits-3acaSpQ5.css","assets/bits-nWe-VDhw.js","assets/brandKit-BkFEFtTv.js","assets/charts-DMab6nrJ.css","assets/charts-Uymhjw5D.js","assets/controls-CNzz0z6N.js","assets/engine-DyKe7Q5H.js","assets/index-WWkuuLoN.js","assets/insights-DQDigrd3.js","assets/mailUtil-CTSWgm6U.css","assets/mailUtil-DzKLM7br.js","assets/motion-BM4wSPw6.js","assets/open-BDLYjKpc.js","assets/osm-PWpUAzNu.js","assets/overlays-CyQKEQop.js","assets/photon-BiH2He5t.js","assets/pi-DmR3UP9a.js","assets/printCopy-CvxVWZLy.js","assets/queue-7UAF2M-r.js","assets/runStep-Dw-Rars_.js","assets/runs-b_0zw0Xn.js","assets/scheduler-D3POji36.js","assets/sort-CfGAQ6Fe.js","assets/sort-D_J6P6wz.css","assets/store-DWIqM1-S.js","assets/store-DntQfGWD.js","assets/styles-CcScFmU1.css","assets/styles-bEkTTZ4t.js","assets/toast-ChfiH4I0.js","assets/useFitLevel-DvmdgsER.js","assets/useMedia-7FpG6OyS.js","assets/useMedia-Crw5wanU.js","assets/useSequenceSync-BRBrP-Y7.js"];

const ASSETS = 'pitchable-assets-v1';
const PAGES = 'pitchable-pages-v1';
const KEEP = [ASSETS, PAGES];

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
      .then((names) => Promise.all(names.filter((n) => n.startsWith('pitchable-') && !KEEP.includes(n)).map((n) => caches.delete(n))))
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
