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
const PRECACHE = ["assets/AdminPage-DWBKaq-q.js","assets/AdminPage-qUe5DxPZ.css","assets/AgentPage-3TLn_2AL.css","assets/AgentPage-DhZ0rBUy.js","assets/AnalyticsPage-D8VcbwI_.css","assets/AnalyticsPage-D_Ye18G6.js","assets/AuditPage-DPiMwtbC.css","assets/AuditPage-De2QrV73.js","assets/AuditReportPage-DAGe0eA8.css","assets/AuditReportPage-DMyehYaY.js","assets/AuditTool-Cz63xj9p.js","assets/AutomationsPage-CnCMIepW.js","assets/AutomationsPage-foQfXn88.css","assets/BatchDialog-5XKFeOMd.js","assets/BuildPage-CEaVCm7L.js","assets/BuildPage-PZ9XQLX_.css","assets/BuilderHome-C9V9vGC6.css","assets/BuilderHome-F0jl1Oh5.js","assets/BusinessDrawer-B-1-UNh-.js","assets/BusinessDrawer-CJ2R1D5U.css","assets/BusinessList-Bd-_Vlpl.css","assets/BusinessList-CGLyBdQF.js","assets/BusinessTable-CBUxi7st.js","assets/BusinessTable-Dv4SHC_i.css","assets/BusinessesPage-BDVwdf6v.js","assets/BusinessesPage-CTAnZjOs.css","assets/CallModePage-DZlnZr07.js","assets/CallModePage-Lm3MFJXN.css","assets/ClientsPage-BEvJSJ6Z.css","assets/ClientsPage-DozWtNQJ.js","assets/ColoursTool-BIi1zwAt.css","assets/ColoursTool-BIl2P_TH.js","assets/CommandPalette-BJs1BZBF.js","assets/CommandPalette-_fvbvLCJ.css","assets/CompetitorsPage-BoY-Jfgj.js","assets/CompetitorsPage-VduJx32L.css","assets/ComposeHost-CAJFi7xk.css","assets/ComposeHost-l2VzzB3s.js","assets/Composer-CybK5dtC.js","assets/Composer-D4m3ODJq.css","assets/ContactsTool-Bt959CaR.css","assets/ContactsTool-CC0MB_U-.js","assets/DiagnosisDoc-DKCU2qw7.js","assets/DiagnosisDoc-Dw1J9T5g.css","assets/DiagnosisPanel-BubFUYTj.js","assets/DuePicker-B365aIaa.css","assets/DuePicker-CbmiqRdy.js","assets/EmailBuilderPage-1iz-EWMM.js","assets/EmailBuilderPage-C03iopEn.css","assets/EmailTemplatesPage-BFj227Kw.js","assets/EmailTemplatesPage-BYNe0RWJ.css","assets/EmailTool-Bvx8NoMg.css","assets/EmailTool-CCXTg-6F.js","assets/GoalEditor-B4tM_YBY.js","assets/GoalEditor-DNgOGpld.css","assets/GooglePanel-A20MLEpE.css","assets/GooglePanel-DOwGugvL.js","assets/GoogleScopeMap-B40k9k42.css","assets/GoogleScopeMap-Dj0PncO8.js","assets/HelpPage-DPcTjIBT.js","assets/HelpPage-DiFF7iB5.css","assets/HistoryTool-f7CTy5KH.css","assets/HistoryTool-vxS7bz3S.js","assets/InsightPanel-Dysq4IYE.js","assets/InsightPanel-ILrvDOGQ.css","assets/Inter-Bold-CwK0yBq9.woff","assets/Inter-Medium-CRBLXpIG.woff","assets/Inter-Regular-CHNwvmI_.woff","assets/Inter-SemiBold-BWnLE2Zz.woff","assets/InterDisplay-Bold-DDOf113W.woff","assets/InterDisplay-Medium-BIdvIqw4.woff","assets/InterDisplay-SemiBold-zxE28j0h.woff","assets/Lora-Italic-DRD9C382.woff","assets/Lora-Regular-BM_tvNoN.woff","assets/MailPage-CemXpPfT.css","assets/MailPage-Dq91vNaX.js","assets/MapPage-aRrvZUou.css","assets/MapPage-wPtcY7jo.js","assets/MonthWidget-J2ghn92T.js","assets/NewScanPage-B-f6_kEr.js","assets/NewScanPage-Bl1mJFhV.css","assets/NotFoundPage-BeVQKZMp.js","assets/NotificationsPage-LklK9rjY.js","assets/NotificationsPage-kQqoETY9.css","assets/OffersPage-CtwzIKVA.css","assets/OffersPage-DXbYsmE1.js","assets/PageSpeedKey-CgcWViBi.css","assets/PageSpeedKey-W9etf-yA.js","assets/PipelinePage-BfotXnie.js","assets/PipelinePage-CbrTKpEu.css","assets/PitchDeck-9F7xbInS.css","assets/PitchDeck-CNWZ9ptB.js","assets/PostsTool-Cm4GwDz6.css","assets/PostsTool-DKQHmacH.js","assets/ProjectPage-C2c1vfU7.css","assets/ProjectPage-Ca8-tCvI.js","assets/ProposalPage-Cuh3zJCK.js","assets/ProposalPage-D4MWJbtj.css","assets/ProposalsPage-BbguE_8k.css","assets/ProposalsPage-CIPFYqW0.js","assets/QrTool-CVNUDgbF.js","assets/QrTool-Teiw78k0.css","assets/RealScan-nBFK9l58.css","assets/RealScan.module-BiDWBPvX.js","assets/ReportBuilderPage-B1lqUFhk.css","assets/ReportBuilderPage-Dp0eFReJ.js","assets/RichText-B6uvSaR6.js","assets/RichText-B_IpFyaY.css","assets/ScanPage-CRtGvH2U.css","assets/ScanPage-D4pI06bT.js","assets/ScansPage-DWavz1HJ.css","assets/ScansPage-pgHiJG8I.js","assets/ScopeMap-DKOSHgId.css","assets/ScopeMap-q9R3L81o.js","assets/SequencePage-B7Ha9rJ_.css","assets/SequencePage-CE9Igg72.js","assets/SettingsPage-DAFZIQut.js","assets/SettingsPage-Vpz1ll6r.css","assets/SpeedTool-Cezbwk0j.css","assets/SpeedTool-CyAyvA0R.js","assets/StartPage-BDPH6iLy.js","assets/StartPage-C7MMzy73.css","assets/StatusChip-DqWgcO4-.js","assets/TechTool-DF2Rtlui.css","assets/TechTool-Hy0sSNJr.js","assets/TodayPage-B6IQDV67.css","assets/TodayPage-IrTO0-6i.js","assets/ToolsHome-CFFlG6vs.js","assets/ToolsHome-I5KqhUY0.css","assets/WebsiteAuditDoc-BIcEqX9W.css","assets/WebsiteAuditDoc-DSFptDFi.js","assets/WelcomeClientDialog-CfuyYNIf.js","assets/WelcomeClientDialog-uG0ZRoAL.css","assets/WorkflowPage-BoXguz3o.css","assets/WorkflowPage-u0LUbNrb.js","assets/analyzer-CHbZonrY.js","assets/bits-3acaSpQ5.css","assets/bits-CbIg0Wez.js","assets/brandKit-C8iSckbq.js","assets/charts-CBIxGGII.js","assets/charts-DMab6nrJ.css","assets/controls-BMDFNZD5.js","assets/engine-D2SdU5vc.js","assets/index-BsJ1vgmz.js","assets/insights-Dcpot_GU.js","assets/mailUtil-BfNhYVr-.js","assets/mailUtil-CTSWgm6U.css","assets/motion-BAKFiHF4.js","assets/open-DPq98HG2.js","assets/osm-C8UbwZiO.js","assets/overlays-BPFrhZK_.js","assets/photon-RhgKJcrN.js","assets/pi-CTMdx6yg.js","assets/places-C-BNYc2M.js","assets/printCopy-BuZ6yUQN.js","assets/queue-BzbhxAyq.js","assets/runStep-en2DfzUt.js","assets/runs-BitHKQ5W.js","assets/scheduler-DrsQjws2.js","assets/sort-BiOlNxBg.js","assets/sort-DWVuh10G.css","assets/store-B0wZdjoK.js","assets/store-Bfrh1-Av.js","assets/styles-BQQVp8bH.js","assets/styles-DAHdWAOy.css","assets/toast-CKivoejw.js","assets/useFitLevel-BlVHlR99.js","assets/useMedia-BLXQVEW-.js","assets/useMedia-BmmOT4uo.js","assets/useSequenceSync-CocKaXrJ.js"];

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
