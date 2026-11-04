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
const PRECACHE = ["assets/AdminPage-DJXJg8O-.js","assets/AdminPage-qUe5DxPZ.css","assets/AgentPage-3TLn_2AL.css","assets/AgentPage-Dke6fhXq.js","assets/AnalyticsPage-BCcgvU0o.js","assets/AnalyticsPage-D8VcbwI_.css","assets/AuditPage-D0oyQUDY.js","assets/AuditPage-DPiMwtbC.css","assets/AuditReportPage-Bl6XEnvS.js","assets/AuditReportPage-DAGe0eA8.css","assets/AuditTool-DGypDcZ0.js","assets/AutomationsPage-CA8_kd98.js","assets/AutomationsPage-foQfXn88.css","assets/BatchDialog-BiPSlp3l.js","assets/BetaCodeForm-CHb_muXQ.js","assets/BuildPage-C4CSr9MR.js","assets/BuildPage-PZ9XQLX_.css","assets/BuilderHome-C9V9vGC6.css","assets/BuilderHome-DBJ6lZcD.js","assets/BusinessDrawer-DJAZsG9P.js","assets/BusinessDrawer-DmHtDzcy.css","assets/BusinessList-DIzRBprQ.js","assets/BusinessList-Jx7dKfVK.css","assets/BusinessTable-CsO8OtXO.js","assets/BusinessTable-DG-JWNAo.css","assets/BusinessesPage-C4iLKeCx.js","assets/BusinessesPage-CTAnZjOs.css","assets/CallModePage-DKE8zU0m.js","assets/CallModePage-Lm3MFJXN.css","assets/ClientsPage-BEvJSJ6Z.css","assets/ClientsPage-Cr1nu16h.js","assets/ColoursTool-BIi1zwAt.css","assets/ColoursTool-vmjr4ncC.js","assets/CommandPalette-DN2_8T7s.js","assets/CommandPalette-_fvbvLCJ.css","assets/CompetitorsPage-D38VlpgW.js","assets/CompetitorsPage-VduJx32L.css","assets/ComposeHost-B7RoB_Ok.js","assets/ComposeHost-CAJFi7xk.css","assets/Composer-B7n4U2aQ.js","assets/Composer-BrGe8Bnh.css","assets/ContactsTool-Bt959CaR.css","assets/ContactsTool-CKnT0V2N.js","assets/DiagnosisDoc-CLbYdd7N.js","assets/DiagnosisDoc-Dw1J9T5g.css","assets/DiagnosisPanel-CiBF_gD2.js","assets/DuePicker-B365aIaa.css","assets/DuePicker-oeshaiXi.js","assets/EmailBuilderPage-C03iopEn.css","assets/EmailBuilderPage-IT6gsYL1.js","assets/EmailTemplatesPage-BW9LbluS.js","assets/EmailTemplatesPage-BYNe0RWJ.css","assets/EmailTool-Bvx8NoMg.css","assets/EmailTool-_Yjb7HGv.js","assets/GoalEditor-BUgpWQLn.js","assets/GoalEditor-DNgOGpld.css","assets/GoogleAttribution-CMleTcUx.js","assets/GoogleAttribution-aklh_XQb.css","assets/GooglePanel-A20MLEpE.css","assets/GooglePanel-BxumzymE.js","assets/GoogleScopeMap-B40k9k42.css","assets/GoogleScopeMap-CepnOdz_.js","assets/HelpPage-DlOOeme0.css","assets/HelpPage-Hdy5cNoc.js","assets/HistoryTool-CoDpmX9l.js","assets/HistoryTool-f7CTy5KH.css","assets/InsightPanel-BlY4elj6.js","assets/InsightPanel-ILrvDOGQ.css","assets/Inter-Bold-CwK0yBq9.woff","assets/Inter-Medium-CRBLXpIG.woff","assets/Inter-Regular-CHNwvmI_.woff","assets/Inter-SemiBold-BWnLE2Zz.woff","assets/InterDisplay-Bold-DDOf113W.woff","assets/InterDisplay-Medium-BIdvIqw4.woff","assets/InterDisplay-SemiBold-zxE28j0h.woff","assets/Lora-Italic-DRD9C382.woff","assets/Lora-Regular-BM_tvNoN.woff","assets/MailPage-C7-TyZ8O.js","assets/MailPage-CemXpPfT.css","assets/MapPage-BH9tLfb2.js","assets/MapPage-aRrvZUou.css","assets/MonthWidget-B28XlaBY.js","assets/NewScanPage-DvkWN1cE.js","assets/NewScanPage-Ul3lpMZp.css","assets/NotFoundPage-CUxPbufV.js","assets/NotificationsPage-CQSAU7w3.js","assets/NotificationsPage-kQqoETY9.css","assets/OffersPage-BdR9gUb_.js","assets/OffersPage-CtwzIKVA.css","assets/OutOfCredits-CbqcJkli.js","assets/PageSpeedKey-CgcWViBi.css","assets/PageSpeedKey-dxOSVceX.js","assets/PipelinePage-Bd-Hq7np.js","assets/PipelinePage-CbrTKpEu.css","assets/PitchDeck-BpdpSX78.js","assets/PitchDeck-CQ3eJqT9.css","assets/PostsTool-Cm4GwDz6.css","assets/PostsTool-DxwEB7e_.js","assets/ProjectPage-BSl7Gn0v.js","assets/ProjectPage-C2c1vfU7.css","assets/ProposalPage-BVCYzOOA.js","assets/ProposalPage-D4MWJbtj.css","assets/ProposalsPage-BbguE_8k.css","assets/ProposalsPage-CbDPI-LL.js","assets/QrTool-Teiw78k0.css","assets/QrTool-flKZMmSM.js","assets/RealScan-CmPLeZJp.css","assets/RealScan.module-BPB7IWXO.js","assets/ReportBuilderPage-B1lqUFhk.css","assets/ReportBuilderPage-YBTwJyXX.js","assets/RichText-B_IpFyaY.css","assets/RichText-DUdJOw5Z.js","assets/ScanPage-CGuqymkp.js","assets/ScanPage-Ey4pIMqN.css","assets/ScansPage-C4_1y7XQ.js","assets/ScansPage-DWavz1HJ.css","assets/ScopeMap-CizB916A.js","assets/ScopeMap-Ih7WaSs0.css","assets/SequencePage-B7Ha9rJ_.css","assets/SequencePage-B8JkRa01.js","assets/SettingsPage-B3oMw-92.css","assets/SettingsPage-aXIpWChC.js","assets/SpeedTool-C_J9whO0.js","assets/SpeedTool-Cezbwk0j.css","assets/StartPage-7PaZ8ROg.js","assets/StartPage-C7MMzy73.css","assets/StatusChip-DyW_1zY_.js","assets/TechTool-DF2Rtlui.css","assets/TechTool-xtHNB2R5.js","assets/TodayPage-B6IQDV67.css","assets/TodayPage-CLHnlnRo.js","assets/ToolsHome-Ct1gvCha.js","assets/ToolsHome-I5KqhUY0.css","assets/WebsiteAuditDoc-BIcEqX9W.css","assets/WebsiteAuditDoc-Ddfa16RL.js","assets/WelcomeClientDialog-CwKYYDs6.js","assets/WelcomeClientDialog-uG0ZRoAL.css","assets/WorkflowPage-BLDB1_Hm.js","assets/WorkflowPage-BoXguz3o.css","assets/analyzer-rCxqr4GX.js","assets/bits-3acaSpQ5.css","assets/bits-DGPhR5rf.js","assets/brandKit-CvGwfaLj.js","assets/categoryIcons-BZI1akUG.js","assets/charts-CadTm7VS.js","assets/charts-DMab6nrJ.css","assets/controls-BMxRgZbb.js","assets/data-DsBuCt2_.js","assets/engine-C40c2D0L.js","assets/externalUrl-DPLo9SIf.js","assets/index-OBx2iodn.js","assets/insights-B6SCNd5o.js","assets/mailUtil-CTSWgm6U.css","assets/mailUtil-Cti2EGEw.js","assets/motion-DqeFmkTH.js","assets/open-DoNy9WIM.js","assets/osm-Bkd_uZ8t.js","assets/overlays-vphofuYt.js","assets/photon-D_kh3A8-.js","assets/pi-DUYx2vUe.js","assets/printCopy-BaY7hbZl.js","assets/queue-Bm3Km31B.js","assets/runStep-BnPqQIa1.js","assets/runs-WIDihUod.js","assets/scheduler-Dy3VBedu.js","assets/sort-DWVuh10G.css","assets/sort-sfHTMKsI.js","assets/store-DXd9QZI2.js","assets/store-cdBJ4M-z.js","assets/styles-ROpo45Df.css","assets/styles-tvvjRTjv.js","assets/toast-DxPs8fD_.js","assets/useFitLevel-CIGr97Rb.js","assets/useMedia-B4PhIbV0.js","assets/useMedia-Y7PWtnn9.js","assets/useSequenceSync-BkHgqGqk.js"];

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
