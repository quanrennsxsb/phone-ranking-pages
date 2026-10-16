const FALLBACK_IMAGE = 'assets/device-hero.jpg';
const CONTROL_API = 'http://127.0.0.1:4174';
const THEME_KEY = 'socmark-theme';

const rawFieldLabels = {
  id: '记录 ID', phonename: '机型', company: '品牌', socname: '处理器型号', cpu: '处理器规格',
  gpu: 'GPU', typename: '类型', type: '分类代码', price: '参考价格', screen: '屏幕',
  screenm: '屏幕面板', battery: '电池容量 (mAh)', charge: '充电规格', storeage: '存储组合',
  ramfadsf: '运行内存', romagbcz: '闪存规格', backcameradaffbz: '后置摄像头',
  frontcameraewqer: '前置摄像头', sizef11vz: '尺寸和重量', weight9jf1fv: '重量 (g)',
  weight9: '重量 (g)', sensor: '传感器', official: '官网参数页', feature: '手机特点',
  usb: '接口类型代码', earphone: '耳机孔代码', cardslot: '卡槽代码', wifi: 'Wi-Fi',
  bluetooth: '蓝牙', screencolor: '屏幕特性', location: '定位导航', osui: '操作系统',
  gb5s: 'Geekbench 5 单核', gb5m: 'Geekbench 5 多核', gb6s: 'Geekbench 6 单核',
  gb6m: 'Geekbench 6 多核', gb7s: 'Geekbench 7 单核', gb7m: 'Geekbench 7 多核',
  antutu: '安兔兔', antutu8: '安兔兔 8', antutu9: '安兔兔 9', antutu10: '安兔兔 10',
  antutu11: '安兔兔 11', saledate: '开售日期', publishtime: '发布时间', saletime: '开售时间',
  material: '外观材质', remark: '备注', screencal: '屏幕尺寸换算', screenfac: '屏幕参数代码',
  nfc: 'NFC 参数', flash: '闪光灯', gfxnew: 'GFXBench', totalscore: '综合总分',
  totalscore2: '综合总分 2', totalscore3: '综合总分 3', totalscore4: '综合总分 4',
  totalgb7: 'Geekbench 7 总分', percent1: '性能百分比 1', percent2: '性能百分比 2',
  percent3: '性能百分比 3', percent4: '性能百分比 4', percentgb7: '性能百分比 7',
  level1: '性能等级 1', level2: '性能等级 2', level3: '性能等级 3', level4: '性能等级 4',
  level5: '性能等级 5', level6: '性能等级 6', level7: '性能等级 7', level8: '性能等级 8',
  gb7level: '性能等级 (GB7)', gpulevel3: 'GPU 等级 3', gpulevel5: 'GPU 等级 5',
  updateTime: '更新时间', updatehistory: '更新历史', imgurl: '图片链接', jdurl: '商品链接',
  tmallurl: '商品链接', tburl: '商品链接', jd_id: '商品 ID', gblink: 'Geekbench 查询链接',
  gfxlink: 'GPU 查询链接', dxomark: 'DXOMARK 总分', dxophoto: 'DXO 拍照',
  dxovideo: 'DXO 视频', dxozoom: 'DXO 变焦', screensize: '屏幕尺寸代码',
  cpupower: 'CPU 功耗', cpuscore: 'CPU 得分', gpupower: 'GPU 功耗', gpuscore: 'GPU 得分',
  socid: 'SoC 编号', aztech: '体制分', aztecn: '体制分 N', dmwlu: 'DM 单核功耗',
  dmwlue: 'DM 多核能耗', dmbay: 'DM 能效', dmbayex: 'DM 能效扩展', dmplat: 'DM 平台',
  powersrc: '功耗来源', socperform: '其它容量价格', emit: '散热与马达',
  pricefeature: '价格特性', singlescore: '单核成绩', multiscore: '多核成绩',
  graphscore: '图形成绩', man30score: 'Man30 成绩', man31score: 'Man31 成绩',
  cpu1efficiency: 'CPU 单核能效', cpumefficiency: 'CPU 能效', gpuefficiency: 'GPU 能效',
  gb6per: 'GB6 百分比', gb5per: 'GB5 百分比', storetime: '入库时间', storetype: '入库类型',
  downprice: '降价幅度', deliverytype: '发货类型',
  buy: '跳转查看', vendor: '屏幕厂商', body: '尺寸和重量',
};

// Section layout mirrors the app's detail page (see reference screenshots).
const DETAIL_GROUPS = [
  ['主要信息', ['feature', 'price', 'buy']],
  ['外观', ['screen', 'screenm', 'screencolor', 'vendor', 'body', 'screencal', 'material']],
  ['电池充电', ['battery', 'charge']],
  ['拍照摄像', ['backcameradaffbz', 'frontcameraewqer', 'flash']],
  ['其它', ['sensor', 'emit']],
  ['网络与连接', ['wifi', 'bluetooth', 'location', 'cardslot', 'usb', 'earphone', 'nfc']],
  ['处理器规格', ['socname', 'cpu', 'gpu']],
  ['性能', ['gb6s', 'gb6m', 'gb5s', 'gb5m', 'gb7s', 'gb7m',
    'totalscore2', 'totalscore3', 'totalscore4', 'gfxnew', 'level3', 'gpulevel3', 'gb6per']],
  ['影像参数', ['dxomark', 'dxophoto', 'dxovideo', 'dxozoom', 'aztech', 'aztecn',
    'dmwlu', 'dmwlue', 'cpupower', 'gpupower']],
  ['内存和存储规格', ['storeage', 'ramfadsf', 'romagbcz', 'socperform']],
  ['来源', ['official', 'saledate', 'updateTime']],
];

const GROUPED_KEYS = new Set(DETAIL_GROUPS.flatMap(([, keys]) => keys));
const PSEUDO_KEYS = new Set(['buy', 'vendor', 'body', 'price']);

// Multi-item text fields render one item per line, like the app's parameter rows.
const LIST_FIELDS = new Set(['feature', 'screencolor', 'sensor', 'location', 'wifi',
  'bluetooth', 'charge', 'material', 'emit']);
const CAMERA_FIELDS = new Set(['backcameradaffbz', 'frontcameraewqer']);
const LINK_FIELDS = {official: '打开官网参数页'};

// Links and internal codes stay in the raw record instead of the main sections.
const HIDDEN_FROM_GROUPS = new Set([
  'imgurl', 'jdurl', 'tburl', 'gblink', 'gfxlink', 'jd_id', 'screenfac', 'screensize',
  'typename', 'type', 'updatehistory', 'remark2', 'storetime', 'storetype',
  'powersrc', 'pricefeature', 'dmplat', 'socid', 'deliverytype',
]);

const VENDOR_PATTERN = /(三星|京东方|华星光电|华星|天马|维信诺|LG|索尼|夏普|东芝|JDI|深天马|和辉)/;

// Brand aliases so searches like "苹果14" or "红米 k100" behave like the app.
const BRAND_ALIASES = [
  [/苹果|apple|iphone/i, '苹果 apple iphone'],
  [/华为|huawei/i, '华为 huawei'],
  [/荣耀|honor/i, '荣耀 honor'],
  [/小米|xiaomi|redmi|红米/i, '小米 xiaomi redmi 红米'],
  [/oppo|一加|oneplus|realme|真我/i, 'oppo 一加 oneplus realme 真我'],
  [/vivo|iqoo/i, 'vivo iqoo'],
  [/三星|samsung/i, '三星 samsung galaxy'],
  [/努比亚|nubia|红魔|redmagic/i, '努比亚 nubia 红魔 redmagic'],
  [/摩托罗拉|motorola|moto/i, '摩托罗拉 motorola moto'],
  [/中兴|zte|努比亚/i, '中兴 zte'],
  [/索尼|sony|xperia/i, '索尼 sony xperia'],
  [/谷歌|google|pixel/i, '谷歌 google pixel'],
  [/华硕|asus|rog/i, '华硕 asus rog'],
  [/联想|lenovo/i, '联想 lenovo 拯救者 legion'],
  [/微软|microsoft|surface/i, '微软 microsoft surface'],
  [/魅族|meizu/i, '魅族 meizu'],
  [/黑鲨|blackshark/i, '黑鲨 blackshark'],
  [/小新|联想/i, '联想 lenovo 小新'],
  [/台电|teclast/i, '台电 teclast'],
  [/酷比魔方|cubot/i, '酷比魔方 cubot'],
];

const state = {
  meta: null,
  index: [],
  updates: [],
  brands: [],
  images: {},
  catalog: null,
  catalogPromise: null,
  query: '',
  sort: 'update',
  page: 1,
  pageSize: 60,
};

const views = {
  updates: document.getElementById('updatesView'),
  catalog: document.getElementById('catalogView'),
  brands: document.getElementById('brandsView'),
  rankings: document.getElementById('rankingsView'),
  detail: document.getElementById('detailView'),
};
const phoneList = document.getElementById('updatesList');
const catalogList = document.getElementById('catalogList');

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[character]));
}

// Zero means "not measured" for essentially every field in this backend, so the
// main sections only show values that actually carry information.
function isBlank(value) {
  const text = String(value ?? '').trim();
  if (text === '' || text === 'null') return true;
  return /^-?\d+(\.\d+)?$/.test(text) && Number(text) === 0;
}

function formatUpdateTime(value) {
  const text = String(value ?? '');
  if (!text || text === '0') return '—';
  if (/^\d{8}$/.test(text)) {
    return `20${text.slice(0, 2)}-${text.slice(2, 4)}-${text.slice(4, 6)}`;
  }
  return text;
}

function saleDateText(value) {
  const text = String(value ?? '');
  if (!text || text === '0') return '未公布';
  if (/^\d{8}$/.test(text) && Number(text.slice(0, 4)) >= 1990
      && Number(text.slice(0, 4)) <= 2099) {
    return `${text.slice(0, 4)} 年 ${Number(text.slice(4, 6))} 月 ${Number(text.slice(6, 8))} 日`;
  }
  if (/^\d{8}$/.test(text)) {
    return `20${text.slice(0, 2)} 年 ${Number(text.slice(2, 4))} 月 ${Number(text.slice(4, 6))} 日`;
  }
  return text;
}

function isRecent(value) {
  const text = String(value ?? '');
  if (!/^\d{8}$/.test(text)) return false;
  const stamp = Date.UTC(2000 + Number(text.slice(0, 2)), Number(text.slice(2, 4)) - 1,
    Number(text.slice(4, 6)));
  return Date.now() - stamp < 45 * 24 * 3600 * 1000;
}

function cardImage(item) {
  // Cached copies are produced by the image grabber (they use the app's own
  // signed requests); remote URLs are session-bound and fail in a browser.
  if (state.images[String(item.id)]) return `data/images/${item.id}.jpg`;
  return FALLBACK_IMAGE;
}

function cardHtml(item, rich = false) {
  const name = String(item.phonename ?? '').trim() || `未命名记录 #${item.id}`;
  const parts = [];
  if (item.socname) parts.push(`<span>处理器：</span>${escapeHtml(item.socname)}`);
  if (item.battery) parts.push(`<span>电池：</span>${escapeHtml(item.battery)}mAh`);
  const screen = item.screen ? `<p><span>屏幕：</span>${escapeHtml(item.screen)}</p>` : '';
  const brand = item.company ? `${escapeHtml(item.company)} · ` : '';
  const score = (value) => (value && Number(value) > 0 ? String(value) : '—');
  const scores = rich
    ? `<div class="result-scores"><span>单核 <b>${escapeHtml(score(item.gb6s))}</b></span>
        <span>多核 <b>${escapeHtml(score(item.gb6m))}</b></span>
        <span>GPU <b>${escapeHtml(score(item.graphscore))}</b></span></div>
       <div class="card-buy">${buyHtml(item)}</div>`
    : '';
  return `<article class="phone-card" data-id="${item.id}" tabindex="0" role="button">
    <div class="phone-thumb"><img src="${escapeHtml(cardImage(item))}" alt="${escapeHtml(name)}"
      onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"></div>
    <div><h3>${escapeHtml(name)}${isRecent(item.updateTime) ? '<span class="new-tag">新</span>' : ''}</h3>
      <p>${parts.join('')}</p>${screen}${scores}
      <p class="card-meta">${brand}${item.updateTime ? '更新 ' + formatUpdateTime(item.updateTime) : ''}</p></div>
    <div class="chevron">›</div></article>`;
}

function bindCards(container) {
  container.querySelectorAll('.phone-card').forEach((card) => {
    const open = () => openDetail(Number(card.dataset.id));
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });
}

function renderUpdates() {
  document.getElementById('updatesCount').textContent = state.updates.length;
  phoneList.innerHTML = state.updates.length
    ? state.updates.map(cardHtml).join('')
    : '<p class="empty-hint">暂无更新数据，请先运行同步脚本。</p>';
  bindCards(phoneList);
}

function searchText(item) {
  if (item.__search) return item.__search;
  const base = [item.phonename, item.company, item.socname, item.cpu, item.osui]
    .map((field) => String(field ?? '')).join(' ');
  const extra = BRAND_ALIASES
    .filter(([pattern]) => pattern.test(base))
    .map(([, alias]) => alias).join(' ');
  item.__search = `${base} ${extra}`.toLowerCase();
  return item.__search;
}

function tokenize(query) {
  return String(query || '').toLowerCase().match(/[a-z0-9]+|[\u4e00-\u9fa5]+/g) || [];
}

function sortRows(rows) {
  const copy = rows.slice();
  const number = (value) => Number(value) || 0;
  switch (state.sort) {
    case 'priceAsc':
      return copy.sort((a, b) => (number(a.price) || Infinity) - (number(b.price) || Infinity));
    case 'priceDesc':
      return copy.sort((a, b) => number(b.price) - number(a.price));
    case 'score':
      return copy.sort((a, b) => number(b.gb6m) - number(a.gb6m));
    case 'sale':
      return copy.sort((a, b) => String(b.saledate ?? '').localeCompare(String(a.saledate ?? '')));
    default:
      return copy.sort((a, b) => number(b.updateTime) - number(a.updateTime));
  }
}

function filteredCatalog() {
  const tokens = tokenize(state.query);
  const rows = tokens.length
    ? state.index.filter((item) => {
      const haystack = searchText(item);
      return tokens.every((token) => haystack.includes(token));
    })
    : state.index;
  return sortRows(rows);
}

function renderCatalog({reset = false} = {}) {
  if (reset) state.page = 1;
  const rows = filteredCatalog();
  const totalPages = Math.max(1, Math.ceil(rows.length / state.pageSize));
  state.page = Math.min(Math.max(1, state.page), totalPages);
  const start = (state.page - 1) * state.pageSize;
  const visible = rows.slice(start, start + state.pageSize);
  document.getElementById('catalogCount').textContent = rows.length;
  catalogList.innerHTML = visible.length
    ? visible.map((item) => cardHtml(item, true)).join('')
    : '<p class="empty-hint">没有匹配的机型。</p>';
  bindCards(catalogList);
  document.getElementById('prevPageBtn').disabled = state.page <= 1;
  document.getElementById('nextPageBtn').disabled = state.page >= totalPages;
  document.getElementById('pagerInfo').textContent =
    `第 ${state.page} / ${totalPages} 页 · 共 ${rows.length} 款`;
}

function renderBrands() {
  const counts = new Map();
  state.index.forEach((item) => {
    const brand = String(item.company ?? '').trim();
    if (!brand) return;
    counts.set(brand, (counts.get(brand) || 0) + 1);
  });
  let rows;
  if (state.brands.length) {
    rows = state.brands.map((brand) => {
      const label = String(brand.brand ?? brand.name ?? '').trim();
      let count = counts.get(label) || 0;
      if (!count && label) {
        const lower = label.toLowerCase();
        count = state.index.filter((item) => searchText(item).includes(lower)).length;
      }
      const logo = /^https?:\/\//.test(String(brand.imgurl ?? '')) ? String(brand.imgurl) : '';
      return {label, logo, count};
    }).filter((row) => row.label);
  } else {
    rows = [...counts.entries()].sort((a, b) => b[1] - a[1])
      .map(([label, count]) => ({label, logo: '', count}));
  }
  document.getElementById('brandCountLabel').textContent = `${rows.length} 个品牌`;
  document.getElementById('brandGrid').innerHTML = rows.map((row) =>
    `<button class="brand-card" data-brand="${escapeHtml(row.label)}">
      ${row.logo
        ? `<img class="brand-logo" src="${escapeHtml(row.logo)}" alt="${escapeHtml(row.label)}"
             loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),
             {className:'brand-symbol',textContent:'${escapeHtml(row.label.slice(0, 2))}'}))">`
        : `<span class="brand-symbol">${escapeHtml(row.label.slice(0, 2))}</span>`}
      <strong>${escapeHtml(row.label)}</strong><span>${row.count} 款</span></button>`).join('');
  document.querySelectorAll('#brandGrid .brand-card').forEach((button) => {
    button.addEventListener('click', () => {
      state.query = button.dataset.brand;
      document.getElementById('catalogSearch').value = state.query;
      renderCatalog({reset: true});
      showView('catalog');
    });
  });
}

function renderRankings() {
  const rows = state.index
    .filter((item) => item.socname && Number(item.gb6m) > 0)
    .sort((a, b) => Number(b.gb6m) - Number(a.gb6m))
    .slice(0, 120);
  document.getElementById('rankCountLabel').textContent = `${rows.length} 款`;
  document.getElementById('rankingRows').innerHTML = rows.map((item, index) => {
    const single = item.gb6s && Number(item.gb6s) > 0 ? item.gb6s : '—';
    const multi = item.gb6m && Number(item.gb6m) > 0 ? item.gb6m : '—';
    return `<div class="rank-row"><div class="cpu-name">${escapeHtml(item.socname)}
      <small>${escapeHtml(String(item.phonename ?? '').trim() || '—')}</small></div>
      <span class="score">${escapeHtml(single)}</span>
      <span class="score">${escapeHtml(multi)}</span>
      <span class="score">${escapeHtml(item.company ?? '—')}</span>
      <span class="score total">#${index + 1}</span></div>`;
  }).join('');
}

async function catalogData() {
  if (state.catalog) return state.catalog;
  if (!state.catalogPromise) {
    state.catalogPromise = fetch(`data/catalog.json?v=${Date.now()}`, {cache: 'no-store'})
      .then((response) => response.json())
      .then((payload) => {
        state.catalog = payload.items || [];
        return state.catalog;
      });
  }
  return state.catalogPromise;
}

function screenVendor(item) {
  const haystack = `${item.screencolor ?? ''} ${item.screen ?? ''} ${item.material ?? ''}`;
  const match = haystack.match(VENDOR_PATTERN);
  return match ? match[1] : '无数据';
}

function listHtml(value) {
  const items = String(value).split(/[，,、；;]/).map((part) => part.trim()).filter(Boolean);
  if (items.length <= 1) return escapeHtml(String(value));
  return `<ul class="value-list">${items.map((part) => `<li>${escapeHtml(part)}</li>`).join('')}</ul>`;
}

function cameraHtml(value) {
  const items = String(value).split(' + ').map((part) => part.trim()).filter(Boolean);
  if (items.length <= 1) return escapeHtml(String(value));
  return `<ul class="value-list">${items.map((part) => `<li>${escapeHtml(part)}</li>`).join('')}</ul>`;
}

function buyHtml(item) {
  const buttons = [];
  if (/^https?:\/\//i.test(String(item.jdurl ?? ''))) {
    buttons.push(`<a class="buy-btn jd" href="${escapeHtml(item.jdurl)}" target="_blank"
      rel="noreferrer">京东</a>`);
  }
  if (/^https?:\/\//i.test(String(item.tburl ?? '')) || /^https?:\/\//i.test(String(item.tmallurl ?? ''))) {
    const url = /^https?:\/\//i.test(String(item.tburl ?? '')) ? item.tburl : item.tmallurl;
    buttons.push(`<a class="buy-btn tb" href="${escapeHtml(url)}" target="_blank"
      rel="noreferrer">淘宝</a>`);
  }
  return buttons.length ? `<div class="buy-row">${buttons.join('')}</div>` : '无数据';
}

function specRow(label, valueHtml) {
  return `<div class="spec-row"><span>${escapeHtml(label)}</span><b>${valueHtml}</b></div>`;
}

function renderSpecValue(key, item) {
  if (key === 'buy') return buyHtml(item);
  if (key === 'vendor') return escapeHtml(screenVendor(item));
  if (key === 'price') {
    if (isBlank(item.price)) return '无数据';
    const storage = String(item.storeage ?? '').trim();
    return escapeHtml(`${storage ? storage + ' ' : ''}${item.price} 元`);
  }
  if (key === 'body') {
    const size = String(item.sizef11vz ?? '').trim();
    const weight = String(item.weight9jf1fv ?? item.weight9 ?? '').trim();
    if (!size && !weight) return null;
    return escapeHtml([size, weight ? weight + 'g' : ''].filter(Boolean).join(' · '));
  }
  if (isBlank(item[key])) return null;
  if (LINK_FIELDS[key]) {
    const value = String(item[key]).trim();
    return /^https?:\/\//i.test(value)
      ? `<a class="spec-link" href="${escapeHtml(value)}" target="_blank"
          rel="noreferrer">${escapeHtml(LINK_FIELDS[key])} ↗</a>`
      : escapeHtml(value);
  }
  if (key === 'saledate') return escapeHtml(saleDateText(item[key]));
  if (key === 'updateTime') return escapeHtml(formatUpdateTime(item[key]));
  if (CAMERA_FIELDS.has(key)) return cameraHtml(item[key]);
  if (LIST_FIELDS.has(key)) return listHtml(item[key]);
  return escapeHtml(String(item[key]).trim());
}

async function renderDetail(id) {
  const item = (state.updates.find((row) => row.id === id))
    || (state.catalog || []).find((row) => row.id === id)
    || (await catalogData()).find((row) => row.id === id)
    || (state.index.find((row) => row.id === id));
  if (!item) {
    views.detail.innerHTML = '<p class="empty-hint">未找到该机型记录。</p>';
    return;
  }
  const name = String(item.phonename ?? '').trim() || `未命名记录 #${item.id}`;
  const battery = item.battery ? `${item.battery}mAh` : '无数据';
  const screen = String(item.screen ?? '').trim() || '无数据';
  const soc = String(item.socname ?? '').trim() || '无数据';
  const brand = String(item.company ?? '').trim();

  const extraKeys = Object.keys(item)
    .filter((key) => !GROUPED_KEYS.has(key) || HIDDEN_FROM_GROUPS.has(key) || PSEUDO_KEYS.has(key));
  const groups = DETAIL_GROUPS.map(([title, keys]) => {
    const rows = keys.map((key) => {
      const value = renderSpecValue(key, item);
      return value === null ? '' : specRow(rawFieldLabels[key] || key, value);
    }).join('');
    return rows ? `<div class="detail-section"><h2>${title}</h2>${rows}</div>` : '';
  }).join('');
  const rawRows = extraKeys.map((key) =>
    `<div class="spec-row"><span>${escapeHtml(rawFieldLabels[key] || `原始字段 · ${key}`)}</span>
     <b>${escapeHtml(String(item[key] ?? '（空）').trim() || '（空）')}</b></div>`).join('');

  views.detail.innerHTML = `
    <button class="back-btn" id="detailBackBtn">← 返回列表</button>
    <div class="detail-hero">
      <div class="detail-device"><div class="device-glow"></div>
        <img src="${escapeHtml(cardImage(item))}" alt="${escapeHtml(name)}"
          onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"></div>
      <div class="detail-copy">
        <span class="eyebrow">${escapeHtml(brand ? brand.toUpperCase() : 'DEVICE')} · 官方接口数据</span>
        <h1>${escapeHtml(name)}</h1>
        <p class="detail-lead">${escapeHtml(soc)} · ${escapeHtml(battery)} · ${escapeHtml(screen)}</p>
        <div class="quick-specs">
          <div><b>${escapeHtml(soc)}</b><span>处理器</span></div>
          <div><b>${escapeHtml(battery)}</b><span>电池容量</span></div>
          <div><b>${escapeHtml(screen.split(' 像素')[0])}</b><span>屏幕</span></div>
        </div>
        <div class="hero-actions">
          <button class="ghost-btn" data-hero-action="favorite">☆ 加入收藏</button>
          <button class="ghost-btn" data-hero-action="compare">＋ 加入对比</button>
          <button class="ghost-btn" data-hero-action="enter-compare">⇄ 进入对比</button>
        </div>
        <div class="detail-actions">
          <span class="record-note">开售：${escapeHtml(saleDateText(item.saledate))} ·
            更新：${escapeHtml(formatUpdateTime(item.updateTime))}</span>
        </div>
      </div>
    </div>
    <div class="detail-toolbar"><span>完整参数</span>
      <span class="muted">官方接口 · ${Object.keys(item).length} 个字段</span></div>
    <div class="detail-sections full-specs">${groups}
      <details class="detail-section raw-record">
        <summary>完整原始记录 · ${extraKeys.length} 个字段</summary>
        <p class="record-note">以下为同步到的全部剩余字段，空值与 0 均按原样保留。</p>
        ${rawRows || '<p class="record-note">没有额外字段。</p>'}
      </details>
    </div>`;
  document.getElementById('detailBackBtn').addEventListener('click', () => history.back());
  views.detail.querySelectorAll('[data-hero-action]').forEach((button) => {
    button.addEventListener('click', () => showToast('该功能与 App 保持一致，稍后开放'));
  });
}

function showView(name, {replace = false, detailId = null} = {}) {
  Object.values(views).forEach((view) => view.classList.remove('active'));
  (views[name] || views.updates).classList.add('active');
  document.querySelectorAll('[data-view]').forEach((button) => {
    button.classList.toggle('active', button.dataset.view === name);
  });
  window.scrollTo({top: 0});
  closeDrawer();
  const route = name === 'detail' && detailId !== null ? `#detail-${detailId}` : `#${name}`;
  if (replace) history.replaceState(null, '', route);
  else history.pushState(null, '', route);
}

async function openDetail(id) {
  await renderDetail(id);
  showView('detail', {detailId: id});
}

function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('scrim').classList.remove('open');
}

let toastTimer = null;
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('open');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('open'), 2600);
}

function updateSyncMeta() {
  if (!state.meta) return;
  const stamp = state.meta.syncedAtText || '';
  document.getElementById('syncMeta').textContent = `数据更新于 ${stamp.slice(5, 16)}`;
  document.getElementById('drawerSync').textContent =
    `已同步 ${state.meta.catalogCount} 款机型 · ${stamp}`;
  const panel = document.getElementById('syncStatus');
  if (panel) {
    panel.textContent = `上次同步：${stamp} · 共 ${state.meta.catalogCount} 款 · ` +
      `耗时 ${state.meta.elapsedSeconds}s`;
  }
}

async function loadData() {
  const bust = Date.now();
  const [meta, index, updates, images, brands] = await Promise.all([
    fetch(`data/meta.json?v=${bust}`, {cache: 'no-store'}).then((r) => r.json()).catch(() => null),
    fetch(`data/index.json?v=${bust}`, {cache: 'no-store'}).then((r) => r.json())
      .catch(() => ({items: []})),
    fetch(`data/updates.json?v=${bust}`, {cache: 'no-store'}).then((r) => r.json())
      .catch(() => ({items: []})),
    fetch(`data/images.json?v=${bust}`, {cache: 'no-store'}).then((r) => r.json())
      .catch(() => ({})),
    fetch(`data/brands.json?v=${bust}`, {cache: 'no-store'}).then((r) => r.json())
      .catch(() => ({items: []})),
  ]);
  state.meta = meta;
  state.index = index.items || [];
  state.updates = updates.items || [];
  state.brands = brands.items || [];
  state.images = images && typeof images === 'object' ? images : {};
  state.catalog = null;
  state.catalogPromise = null;
  updateSyncMeta();
  renderUpdates();
  renderCatalog({reset: true});
  renderBrands();
  renderRankings();
}

async function refreshData(showFeedback = false) {
  await loadData();
  const route = location.hash.slice(1) || 'updates';
  const match = route.match(/^detail-(\d+)$/);
  if (match) await renderDetail(Number(match[1]));
  if (showFeedback) {
    const button = document.getElementById('refreshBtn');
    const original = button.innerHTML;
    button.innerHTML = '<span>✓</span> 已刷新';
    setTimeout(() => { button.innerHTML = original; }, 1600);
  }
}

function applyRoute({replace = true} = {}) {
  const route = location.hash.slice(1) || 'updates';
  const match = route.match(/^detail-(\d+)$/);
  if (match) {
    renderDetail(Number(match[1]))
      .then(() => showView('detail', {replace, detailId: Number(match[1])}));
    return;
  }
  if (views[route]) showView(route, {replace});
  else showView('updates', {replace});
}

/* ---------- theme ---------- */

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const button = document.getElementById('themeBtn');
  if (button) button.textContent = theme === 'light' ? '☾' : '☀';
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme || 'dark';
  applyTheme(current === 'light' ? 'dark' : 'light');
}

/* ---------- hidden settings (5 clicks on the logo) ---------- */

let logoClicks = 0;
let logoClickTimer = null;

function openSettings() {
  document.getElementById('settingsPanel').classList.add('open');
  fetch(`${CONTROL_API}/status`).then((r) => r.json()).then((status) => {
    document.getElementById('syncStatus').textContent =
      `上次同步：${status.lastSyncText || '未知'} · 间隔 ${Math.round(status.intervalSeconds / 3600)} 小时`;
    document.getElementById('intervalInput').value = Math.round(status.intervalSeconds / 3600);
  }).catch(() => {
    document.getElementById('syncStatus').textContent =
      '同步服务未运行（先执行 .tools\\start_stack.ps1）';
  });
}

function closeSettings() {
  document.getElementById('settingsPanel').classList.remove('open');
}

async function triggerSync() {
  const status = document.getElementById('settingsStatus');
  const setStatus = (text) => { if (status) status.textContent = text; };
  setStatus('已请求同步，正在拉取最新数据…');
  showToast('开始同步，完成后会自动刷新');
  try {
    await fetch(`${CONTROL_API}/sync`, {method: 'POST'});
  } catch (error) {
    setStatus('无法连接同步服务（先运行 .tools\\start_stack.ps1）');
    showToast('无法连接同步服务');
    return;
  }
  const startedAt = Date.now();
  while (Date.now() - startedAt < 20 * 60 * 1000) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    let info = null;
    try {
      info = await fetch(`${CONTROL_API}/status`).then((response) => response.json());
    } catch (error) {
      continue;
    }
    if (info.syncing) {
      setStatus(`同步进行中… 已等待 ${Math.round((Date.now() - startedAt) / 1000)} 秒`);
      continue;
    }
    if (info.error) {
      setStatus(`同步失败：${info.error}`);
      showToast('同步失败，请稍后重试');
      return;
    }
    setStatus(`同步完成：${info.lastSyncText} · 共 ${info.count} 款机型`);
    showToast('同步完成，已自动刷新');
    await refreshData();
    return;
  }
  setStatus('同步仍在进行，完成后可手动刷新');
}

async function saveInterval() {
  const hours = Number(document.getElementById('intervalInput').value) || 24;
  const status = document.getElementById('settingsStatus');
  try {
    await fetch(`${CONTROL_API}/interval`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({seconds: Math.max(1, hours) * 3600}),
    });
    status.textContent = `同步间隔已设为 ${Math.max(1, hours)} 小时。`;
  } catch (error) {
    status.textContent = '无法连接同步服务。';
  }
}

function bindEvents() {
  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', () => showView(button.dataset.view));
  });
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('drawer').classList.add('open');
    document.getElementById('scrim').classList.add('open');
  });
  document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
  document.getElementById('scrim').addEventListener('click', closeDrawer);
  document.getElementById('refreshBtn').addEventListener('click', () => refreshData(true));
  document.getElementById('themeBtn').addEventListener('click', toggleTheme);
  document.getElementById('prevPageBtn').addEventListener('click', () => {
    state.page -= 1;
    renderCatalog();
    window.scrollTo({top: 0});
  });
  document.getElementById('nextPageBtn').addEventListener('click', () => {
    state.page += 1;
    renderCatalog();
    window.scrollTo({top: 0});
  });
  document.getElementById('settingsClose').addEventListener('click', closeSettings);
  document.getElementById('saveIntervalBtn').addEventListener('click', saveInterval);
  document.getElementById('sortSelect').addEventListener('change', (event) => {
    state.sort = event.currentTarget.value;
    renderCatalog({reset: true});
  });
  document.querySelector('.brand-mark').addEventListener('click', () => {
    logoClicks += 1;
    clearTimeout(logoClickTimer);
    logoClickTimer = setTimeout(() => { logoClicks = 0; }, 1200);
    if (logoClicks >= 5) {
      logoClicks = 0;
      openSettings();
      return;
    }
    showView('updates');
  });

  document.getElementById('searchInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') submitSearch(event.currentTarget.value);
  });
  document.getElementById('searchBtn').addEventListener('click', () => {
    submitSearch(document.getElementById('searchInput').value);
  });
  document.getElementById('catalogSearch').addEventListener('input', (event) => {
    state.query = event.currentTarget.value;
    renderCatalog({reset: true});
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && document.activeElement.tagName !== 'INPUT') {
      event.preventDefault();
      document.getElementById('searchInput').focus();
    }
  });
  window.addEventListener('popstate', () => applyRoute({replace: true}));
  window.addEventListener('hashchange', () => applyRoute({replace: true}));
}

function submitSearch(value) {
  state.query = value;
  document.getElementById('catalogSearch').value = value;
  renderCatalog({reset: true});
  showView('catalog');
}

applyTheme(localStorage.getItem(THEME_KEY) || 'dark');
bindEvents();
loadData().then(() => applyRoute()).catch((error) => {
  console.error(error);
  phoneList.innerHTML = '<p class="empty-hint">数据加载失败，请确认已运行同步脚本。</p>';
});

// Light meta check: pick up server-side syncs quickly and refresh automatically.
setInterval(async () => {
  try {
    const meta = await fetch(`data/meta.json?v=${Date.now()}`, {cache: 'no-store'})
      .then((r) => r.json());
    if (state.meta && meta.syncedAt !== state.meta.syncedAt) {
      await refreshData();
      showToast('检测到新数据，已自动刷新');
    } else {
      state.meta = meta;
      updateSyncMeta();
    }
  } catch (error) { /* keep the last good data */ }
}, 60 * 1000);

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') refreshData();
});
