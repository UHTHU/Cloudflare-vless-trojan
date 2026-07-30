var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js
import { connect } from "cloudflare:sockets";
var userID = "45e48cc4-162f-4376-bd1b-e09a5ad25386";
var proxyIPs = ["pyip.ygkkk.dpdns.org"];
var cn_hostnames = [""];
var CDNIP = "www.visa.com.sg";
var IP1 = "www.visa.com";
var IP2 = "cis.visa.com";
var IP3 = "africa.visa.com";
var IP4 = "www.visa.com.sg";
var IP5 = "www.visaeurope.at";
var IP6 = "www.visa.com.mt";
var IP7 = "qa.visamiddleeast.com";
var IP8 = "usa.visa.com";
var IP9 = "myanmar.visa.com";
var IP10 = "www.visa.com.tw";
var IP11 = "www.visaeurope.ch";
var IP12 = "www.visa.com.br";
var IP13 = "www.visasoutheasteurope.com";
var PT1 = "80";
var PT2 = "8080";
var PT3 = "8880";
var PT4 = "2052";
var PT5 = "2082";
var PT6 = "2086";
var PT7 = "2095";
var PT8 = "443";
var PT9 = "8443";
var PT10 = "2053";
var PT11 = "2083";
var PT12 = "2087";
var PT13 = "2096";
var proxyIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
var proxyPort = proxyIP.match(/:(\d+)$/) ? proxyIP.match(/:(\d+)$/)[1] : "443";
var dohURL = "https://cloudflare-dns.com/dns-query";
if (!isValidUUID(userID)) throw new Error("uuid is not valid");
var worker_default = { async fetch(t, n, e) {
  try {
    const { proxyip: e2 } = n;
    if (userID = n.uuid || userID, e2) if (e2.includes("]:")) {
      let t2 = e2.lastIndexOf(":");
      proxyPort = e2.slice(t2 + 1), proxyIP = e2.slice(0, t2);
    } else e2.includes("]:") || e2.includes("]") ? (proxyPort = "443", proxyIP = e2) : [proxyIP, proxyPort = "443"] = e2.split(":");
    else if (proxyIP.includes("]:")) {
      let t2 = proxyIP.lastIndexOf(":");
      proxyPort = proxyIP.slice(t2 + 1), proxyIP = proxyIP.slice(0, t2);
    } else {
      const t2 = proxyIP.match(/^(.*?)(?::(\d+))?$/);
      proxyIP = t2[1];
      let n2 = t2[2] || "443";
      console.log("IP:", proxyIP, "Port:", n2);
    }
    console.log("ProxyIP:", proxyIP), console.log("ProxyPort:", proxyPort), CDNIP = n.cdnip || CDNIP, IP1 = n.ip1 || IP1, IP2 = n.ip2 || IP2, IP3 = n.ip3 || IP3, IP4 = n.ip4 || IP4, IP5 = n.ip5 || IP5, IP6 = n.ip6 || IP6, IP7 = n.ip7 || IP7, IP8 = n.ip8 || IP8, IP9 = n.ip9 || IP9, IP10 = n.ip10 || IP10, IP11 = n.ip11 || IP11, IP12 = n.ip12 || IP12, IP13 = n.ip13 || IP13, PT1 = n.pt1 || PT1, PT2 = n.pt2 || PT2, PT3 = n.pt3 || PT3, PT4 = n.pt4 || PT4, PT5 = n.pt5 || PT5, PT6 = n.pt6 || PT6, PT7 = n.pt7 || PT7, PT8 = n.pt8 || PT8, PT9 = n.pt9 || PT9, PT10 = n.pt10 || PT10, PT11 = n.pt11 || PT11, PT12 = n.pt12 || PT12, PT13 = n.pt13 || PT13;
    const s = t.headers.get("Upgrade"), r = new URL(t.url);
    if (s && "websocket" === s) {
      if (r.pathname.includes("/pyip=")) {
        const t2 = r.pathname.split("=")[1];
        if (isValidIP(t2)) if (proxyIP = t2, proxyIP.includes("]:")) {
          let t3 = proxyIP.lastIndexOf(":");
          proxyPort = proxyIP.slice(t3 + 1), proxyIP = proxyIP.slice(0, t3);
        } else proxyIP.includes("]:") || proxyIP.includes("]") ? proxyPort = "443" : [proxyIP, proxyPort = "443"] = proxyIP.split(":");
      }
      return await vlessOverWSHandler(t);
    }
    {
      const n2 = new URL(t.url);
      switch (n2.pathname) {
        case `/${userID}`: {
          const n3 = getvlessConfig(userID, t.headers.get("Host"));
          return new Response(`${n3}`, { status: 200, headers: { "Content-Type": "text/html;charset=utf-8" } });
        }
        case `/${userID}/ty`: {
          const n3 = gettyConfig(userID, t.headers.get("Host"));
          return new Response(`${n3}`, { status: 200, headers: { "Content-Type": "text/plain;charset=utf-8" } });
        }
        case `/${userID}/cl`: {
          const n3 = getclConfig(userID, t.headers.get("Host"));
          return new Response(`${n3}`, { status: 200, headers: { "Content-Type": "text/plain;charset=utf-8" } });
        }
        case `/${userID}/sb`: {
          const n3 = getsbConfig(userID, t.headers.get("Host"));
          return new Response(`${n3}`, { status: 200, headers: { "Content-Type": "application/json;charset=utf-8" } });
        }
        case `/${userID}/pty`: {
          const n3 = getptyConfig(userID, t.headers.get("Host"));
          return new Response(`${n3}`, { status: 200, headers: { "Content-Type": "text/plain;charset=utf-8" } });
        }
        case `/${userID}/pcl`: {
          const n3 = getpclConfig(userID, t.headers.get("Host"));
          return new Response(`${n3}`, { status: 200, headers: { "Content-Type": "text/plain;charset=utf-8" } });
        }
        case `/${userID}/psb`: {
          const n3 = getpsbConfig(userID, t.headers.get("Host"));
          return new Response(`${n3}`, { status: 200, headers: { "Content-Type": "application/json;charset=utf-8" } });
        }
        default:
          if (cn_hostnames.includes("")) return new Response(JSON.stringify(t.cf, null, 4), { status: 200, headers: { "Content-Type": "application/json;charset=utf-8" } });
          const e3 = cn_hostnames[Math.floor(Math.random() * cn_hostnames.length)], s2 = new Headers(t.headers);
          s2.set("cf-connecting-ip", "1.2.3.4"), s2.set("x-forwarded-for", "1.2.3.4"), s2.set("x-real-ip", "1.2.3.4"), s2.set("referer", "https://www.google.com/search?q=edtunnel");
          const r2 = "https://" + e3 + n2.pathname + n2.search;
          let o = new Request(r2, { method: t.method, headers: s2, body: t.body, redirect: "manual" });
          const a = await fetch(o, { redirect: "manual" });
          return [301, 302].includes(a.status) ? new Response(`Redirects to ${e3} are not allowed.`, { status: 403, statusText: "Forbidden" }) : a;
      }
    }
  } catch (t2) {
    return new Response(t2.toString());
  }
} };
function isValidIP(t) {
  return /^[\s\S]*$/.test(t);
}
__name(isValidIP, "isValidIP");
async function vlessOverWSHandler(t) {
  const n = new WebSocketPair(), [e, s] = Object.values(n);
  s.accept();
  let r = "", o = "";
  const a = /* @__PURE__ */ __name((t2, n2) => {
    console.log(`[${r}:${o}] ${t2}`, n2 || "");
  }, "a"), i = t.headers.get("sec-websocket-protocol") || "", d = makeReadableWebSocketStream(s, i, a);
  let l = { value: null }, p = null, c = false;
  return d.pipeTo(new WritableStream({ async write(t2, n2) {
    if (c && p) return p(t2);
    if (l.value) {
      const n3 = l.value.writable.getWriter();
      return await n3.write(t2), void n3.releaseLock();
    }
    const { hasError: e2, message: i2, portRemote: d2 = 443, addressRemote: $ = "", rawDataIndex: u, cloudflareVersion: _ = new Uint8Array([0, 0]), isUDP: P } = await processcloudflareHeader(t2, userID);
    if (r = $, o = `${d2}--${Math.random()} ${P ? "udp " : "tcp "} `, e2) throw new Error(i2);
    if (P) {
      if (53 !== d2) throw new Error("UDP proxy only enable for DNS which is port 53");
      c = true;
    }
    const h = new Uint8Array([_[0], 0]), y = t2.slice(u);
    if (c) {
      const { write: t3 } = await handleUDPOutBound(s, h, a);
      return p = t3, void p(y);
    }
    handleTCPOutBound(l, $, d2, y, s, h, a);
  }, close() {
    a("readableWebSocketStream is close");
  }, abort(t2) {
    a("readableWebSocketStream is abort", JSON.stringify(t2));
  } })).catch((t2) => {
    a("readableWebSocketStream pipeTo error", t2);
  }), new Response(null, { status: 101, webSocket: e });
}
__name(vlessOverWSHandler, "vlessOverWSHandler");
async function checkUuidInApiResponse(t) {
  try {
    const n = await getApiResponse();
    if (!n) return false;
    return n.users.some((n2) => n2.uuid === t);
  } catch (t2) {
    return console.error("Error:", t2), false;
  }
}
__name(checkUuidInApiResponse, "checkUuidInApiResponse");
async function getApiResponse() {
  return { users: [] };
}
__name(getApiResponse, "getApiResponse");
async function handleTCPOutBound(t, n, e, s, r, o, a) {
  async function i(n2, e2) {
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(n2) && (n2 = `${atob("d3d3Lg==")}${n2}${atob("LnNzbGlwLmlv")}`);
    const r2 = connect({ hostname: n2, port: e2 });
    t.value = r2, a(`connected to ${n2}:${e2}`);
    const o2 = r2.writable.getWriter();
    return await o2.write(s), o2.releaseLock(), r2;
  }
  __name(i, "i");
  remoteSocketToWS(await i(n, e), r, o, async function() {
    const t2 = await i(proxyIP || n, proxyPort || e);
    t2.closed.catch((t3) => {
      console.log("retry tcpSocket closed error", t3);
    }).finally(() => {
      safeCloseWebSocket(r);
    }), remoteSocketToWS(t2, r, o, null, a);
  }, a);
}
__name(handleTCPOutBound, "handleTCPOutBound");
function makeReadableWebSocketStream(t, n, e) {
  let s = false;
  return new ReadableStream({ start(r) {
    t.addEventListener("message", (t2) => {
      if (s) return;
      const n2 = t2.data;
      r.enqueue(n2);
    }), t.addEventListener("close", () => {
      safeCloseWebSocket(t), s || r.close();
    }), t.addEventListener("error", (t2) => {
      e("webSocketServer has error"), r.error(t2);
    });
    const { earlyData: o, error: a } = base64ToArrayBuffer(n);
    a ? r.error(a) : o && r.enqueue(o);
  }, pull(t2) {
  }, cancel(n2) {
    s || (e(`ReadableStream was canceled, due to ${n2}`), s = true, safeCloseWebSocket(t));
  } });
}
__name(makeReadableWebSocketStream, "makeReadableWebSocketStream");
async function processcloudflareHeader(t, n) {
  if (t.byteLength < 24) return { hasError: true, message: "invalid data" };
  const e = new Uint8Array(t.slice(0, 1));
  let s = false, r = false;
  const o = stringify(new Uint8Array(t.slice(1, 17))), a = n.includes(",") ? n.split(",") : [n], i = await checkUuidInApiResponse(o);
  if (s = a.some((t2) => i || o === t2.trim()), console.log(`checkUuidInApi: ${await checkUuidInApiResponse(o)}, userID: ${o}`), !s) return { hasError: true, message: "invalid user" };
  const d = new Uint8Array(t.slice(17, 18))[0], l = new Uint8Array(t.slice(18 + d, 18 + d + 1))[0];
  if (1 === l) ;
  else {
    if (2 !== l) return { hasError: true, message: `command ${l} is not support, command 01-tcp,02-udp,03-mux` };
    r = true;
  }
  const p = 18 + d + 1, c = t.slice(p, p + 2), $ = new DataView(c).getUint16(0);
  let u = p + 2;
  const _ = new Uint8Array(t.slice(u, u + 1))[0];
  let P = 0, h = u + 1, y = "";
  switch (_) {
    case 1:
      P = 4, y = new Uint8Array(t.slice(h, h + P)).join(".");
      break;
    case 2:
      P = new Uint8Array(t.slice(h, h + 1))[0], h += 1, y = new TextDecoder().decode(t.slice(h, h + P));
      break;
    case 3:
      P = 16;
      const n2 = new DataView(t.slice(h, h + P)), e2 = [];
      for (let t2 = 0; t2 < 8; t2++) e2.push(n2.getUint16(2 * t2).toString(16));
      y = e2.join(":");
      break;
    default:
      return { hasError: true, message: `invild  addressType is ${_}` };
  }
  return y ? { hasError: false, addressRemote: y, addressType: _, portRemote: $, rawDataIndex: h + P, cloudflareVersion: e, isUDP: r } : { hasError: true, message: `addressValue is empty, addressType is ${_}` };
}
__name(processcloudflareHeader, "processcloudflareHeader");
async function remoteSocketToWS(t, n, e, s, r) {
  let o = e, a = false;
  await t.readable.pipeTo(new WritableStream({ start() {
  }, async write(t2, e2) {
    a = true, n.readyState !== WS_READY_STATE_OPEN && e2.error("webSocket.readyState is not open, maybe close"), o ? (n.send(await new Blob([o, t2]).arrayBuffer()), o = null) : n.send(t2);
  }, close() {
    r(`remoteConnection!.readable is close with hasIncomingData is ${a}`);
  }, abort(t2) {
    console.error("remoteConnection!.readable abort", t2);
  } })).catch((t2) => {
    console.error("remoteSocketToWS has exception ", t2.stack || t2), safeCloseWebSocket(n);
  }), false === a && s && (r("retry"), s());
}
__name(remoteSocketToWS, "remoteSocketToWS");
function base64ToArrayBuffer(t) {
  if (!t) return { error: null };
  try {
    t = t.replace(/-/g, "+").replace(/_/g, "/");
    const n = atob(t);
    return { earlyData: Uint8Array.from(n, (t2) => t2.charCodeAt(0)).buffer, error: null };
  } catch (t2) {
    return { error: t2 };
  }
}
__name(base64ToArrayBuffer, "base64ToArrayBuffer");
function isValidUUID(t) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t);
}
__name(isValidUUID, "isValidUUID");
var WS_READY_STATE_OPEN = 1;
var WS_READY_STATE_CLOSING = 2;
function safeCloseWebSocket(t) {
  try {
    t.readyState !== WS_READY_STATE_OPEN && t.readyState !== WS_READY_STATE_CLOSING || t.close();
  } catch (t2) {
    console.error("safeCloseWebSocket error", t2);
  }
}
__name(safeCloseWebSocket, "safeCloseWebSocket");
var byteToHex = [];
for (let t = 0; t < 256; ++t) byteToHex.push((t + 256).toString(16).slice(1));
function unsafeStringify(t, n = 0) {
  return (byteToHex[t[n + 0]] + byteToHex[t[n + 1]] + byteToHex[t[n + 2]] + byteToHex[t[n + 3]] + "-" + byteToHex[t[n + 4]] + byteToHex[t[n + 5]] + "-" + byteToHex[t[n + 6]] + byteToHex[t[n + 7]] + "-" + byteToHex[t[n + 8]] + byteToHex[t[n + 9]] + "-" + byteToHex[t[n + 10]] + byteToHex[t[n + 11]] + byteToHex[t[n + 12]] + byteToHex[t[n + 13]] + byteToHex[t[n + 14]] + byteToHex[t[n + 15]]).toLowerCase();
}
__name(unsafeStringify, "unsafeStringify");
function stringify(t, n = 0) {
  const e = unsafeStringify(t, n);
  if (!isValidUUID(e)) throw TypeError("Stringified UUID is invalid");
  return e;
}
__name(stringify, "stringify");
async function handleUDPOutBound(t, n, e) {
  let s = false;
  const r = new TransformStream({ start(t2) {
  }, transform(t2, n2) {
    for (let e2 = 0; e2 < t2.byteLength; ) {
      const s2 = t2.slice(e2, e2 + 2), r2 = new DataView(s2).getUint16(0), o2 = new Uint8Array(t2.slice(e2 + 2, e2 + 2 + r2));
      e2 = e2 + 2 + r2, n2.enqueue(o2);
    }
  }, flush(t2) {
  } });
  r.readable.pipeTo(new WritableStream({ async write(r2) {
    const o2 = await fetch(dohURL, { method: "POST", headers: { "content-type": "application/dns-message" }, body: r2 }), a = await o2.arrayBuffer(), i = a.byteLength, d = new Uint8Array([i >> 8 & 255, 255 & i]);
    t.readyState === WS_READY_STATE_OPEN && (e(`doh success and dns message length is ${i}`), s ? t.send(await new Blob([d, a]).arrayBuffer()) : (t.send(await new Blob([n, d, a]).arrayBuffer()), s = true));
  } })).catch((t2) => {
    e("dns udp has error" + t2);
  });
  const o = r.writable.getWriter();
  return { write(t2) {
    o.write(t2);
  } };
}
__name(handleUDPOutBound, "handleUDPOutBound");
function getvlessConfig(t, n) {
  const e = `vless://${t}@${CDNIP}:8880?encryption=none&security=none&type=ws&host=${n}&path=%2F%3Fed%3D2560#${n}`, s = `vless://${t}@${CDNIP}:8443?encryption=none&security=tls&type=ws&host=${n}&sni=${n}&fp=random&path=%2F%3Fed%3D2560#${n}`, r = `\u752C\u54E5\u535A\u5BA2\u5730\u5740\uFF1Ahttps://ygkkk.blogspot.com
\u752C\u54E5YouTube\u9891\u9053\uFF1Ahttps://www.youtube.com/@ygkkk
\u752C\u54E5TG\u7535\u62A5\u7FA4\u7EC4\uFF1Ahttps://t.me/ygkkktg
\u752C\u54E5TG\u7535\u62A5\u9891\u9053\uFF1Ahttps://t.me/ygkkktgpd

ProxyIP\u5168\u5C40\u8FD0\u884C\u4E2D\uFF1A${proxyIP}:${proxyPort}`, o = `https://${n}/${t}/ty`, a = `https://${n}/${t}/cl`, i = `https://${n}/${t}/sb`, d = `https://${n}/${t}/pty`, l = `https://${n}/${t}/pcl`, p = `https://${n}/${t}/psb`, c = btoa(`vless://${t}@${IP1}:${PT1}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V1_${IP1}_${PT1}
vless://${t}@${IP2}:${PT2}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V2_${IP2}_${PT2}
vless://${t}@${IP3}:${PT3}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V3_${IP3}_${PT3}
vless://${t}@${IP4}:${PT4}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V4_${IP4}_${PT4}
vless://${t}@${IP5}:${PT5}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V5_${IP5}_${PT5}
vless://${t}@${IP6}:${PT6}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V6_${IP6}_${PT6}
vless://${t}@${IP7}:${PT7}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V7_${IP7}_${PT7}
vless://${t}@${IP8}:${PT8}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V8_${IP8}_${PT8}
vless://${t}@${IP9}:${PT9}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V9_${IP9}_${PT9}
vless://${t}@${IP10}:${PT10}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V10_${IP10}_${PT10}
vless://${t}@${IP11}:${PT11}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V11_${IP11}_${PT11}
vless://${t}@${IP12}:${PT12}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V12_${IP12}_${PT12}
vless://${t}@${IP13}:${PT13}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V13_${IP13}_${PT13}`), $ = btoa(`vless://${t}@${IP8}:${PT8}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V8_${IP8}_${PT8}
vless://${t}@${IP9}:${PT9}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V9_${IP9}_${PT9}
vless://${t}@${IP10}:${PT10}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V10_${IP10}_${PT10}
vless://${t}@${IP11}:${PT11}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V11_${IP11}_${PT11}
vless://${t}@${IP12}:${PT12}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V12_${IP12}_${PT12}
vless://${t}@${IP13}:${PT13}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V13_${IP13}_${PT13}`), u = r.replace(/\n/g, "<br>"), _ = `
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"><\/script>
<style>
.limited-width {
    max-width: 200px;
    overflow: auto;
    word-wrap: break-word;
}
</style>
</head>
<script>
function copyToClipboard(text) {
  const input = document.createElement('textarea');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
  alert('\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F');
}
<\/script>
`;
  return n.includes("workers.dev") ? `
<br>
<br>
${_}
<body>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1>Cloudflare-workers/pages-vless\u4EE3\u7406\u811A\u672C V25.5.4</h1>
	    <hr>
            <p>${u}</p>
            <hr>
	    <hr>
	    <hr>
            <br>
            <br>
            <h3>1\uFF1ACF-workers-vless+ws\u8282\u70B9</h3>
			<table class="table">
				<thead>
					<tr>
						<th>\u8282\u70B9\u7279\u8272\uFF1A</th>
						<th>\u5355\u8282\u70B9\u94FE\u63A5\u5982\u4E0B\uFF1A</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="limited-width">\u5173\u95ED\u4E86TLS\u52A0\u5BC6\uFF0C\u65E0\u89C6\u57DF\u540D\u963B\u65AD</td>
						<td class="limited-width">${e}</td>
						<td><button class="btn btn-primary" onclick="copyToClipboard('${e}')">\u70B9\u51FB\u590D\u5236\u94FE\u63A5</button></td>
					</tr>
				</tbody>
			</table>
            <h5>\u5BA2\u6237\u7AEF\u53C2\u6570\u5982\u4E0B\uFF1A</h5>
            <ul>
                <li>\u5BA2\u6237\u7AEF\u5730\u5740(address)\uFF1A\u81EA\u5B9A\u4E49\u7684\u57DF\u540D \u6216\u8005 \u4F18\u9009\u57DF\u540D \u6216\u8005 \u4F18\u9009IP \u6216\u8005 \u53CD\u4EE3IP</li>
                <li>\u7AEF\u53E3(port)\uFF1A7\u4E2Ahttp\u7AEF\u53E3\u53EF\u4EFB\u610F\u9009\u62E9(80\u30018080\u30018880\u30012052\u30012082\u30012086\u30012095)\uFF0C\u6216\u53CD\u4EE3IP\u5BF9\u5E94\u7AEF\u53E3</li>
                <li>\u7528\u6237ID(uuid)\uFF1A${t}</li>
                <li>\u4F20\u8F93\u534F\u8BAE(network)\uFF1Aws \u6216\u8005 websocket</li>
                <li>\u4F2A\u88C5\u57DF\u540D(host)\uFF1A${n}</li>
                <li>\u8DEF\u5F84(path)\uFF1A/?ed=2560</li>
		<li>\u4F20\u8F93\u5B89\u5168(TLS)\uFF1A\u5173\u95ED</li>
            </ul>
            <hr>
			<hr>
			<hr>
            <br>
            <br>
            <h3>2\uFF1ACF-workers-vless+ws+tls\u8282\u70B9</h3>
			<table class="table">
				<thead>
					<tr>
						<th>\u8282\u70B9\u7279\u8272\uFF1A</th>
						<th>\u5355\u8282\u70B9\u94FE\u63A5\u5982\u4E0B\uFF1A</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="limited-width">\u542F\u7528\u4E86TLS\u52A0\u5BC6\uFF0C<br>\u5982\u679C\u5BA2\u6237\u7AEF\u652F\u6301\u5206\u7247(Fragment)\u529F\u80FD\uFF0C\u5EFA\u8BAE\u5F00\u542F\uFF0C\u9632\u6B62\u57DF\u540D\u963B\u65AD</td>
						<td class="limited-width">${s}</td>	
						<td><button class="btn btn-primary" onclick="copyToClipboard('${s}')">\u70B9\u51FB\u590D\u5236\u94FE\u63A5</button></td>
					</tr>
				</tbody>
			</table>
            <h5>\u5BA2\u6237\u7AEF\u53C2\u6570\u5982\u4E0B\uFF1A</h5>
            <ul>
                <li>\u5BA2\u6237\u7AEF\u5730\u5740(address)\uFF1A\u81EA\u5B9A\u4E49\u7684\u57DF\u540D \u6216\u8005 \u4F18\u9009\u57DF\u540D \u6216\u8005 \u4F18\u9009IP \u6216\u8005 \u53CD\u4EE3IP</li>
                <li>\u7AEF\u53E3(port)\uFF1A6\u4E2Ahttps\u7AEF\u53E3\u53EF\u4EFB\u610F\u9009\u62E9(443\u30018443\u30012053\u30012083\u30012087\u30012096)\uFF0C\u6216\u53CD\u4EE3IP\u5BF9\u5E94\u7AEF\u53E3</li>
                <li>\u7528\u6237ID(uuid)\uFF1A${t}</li>
                <li>\u4F20\u8F93\u534F\u8BAE(network)\uFF1Aws \u6216\u8005 websocket</li>
                <li>\u4F2A\u88C5\u57DF\u540D(host)\uFF1A${n}</li>
                <li>\u8DEF\u5F84(path)\uFF1A/?ed=2560</li>
                <li>\u4F20\u8F93\u5B89\u5168(TLS)\uFF1A\u5F00\u542F</li>
                <li>\u8DF3\u8FC7\u8BC1\u4E66\u9A8C\u8BC1(allowlnsecure)\uFF1Afalse</li>
			</ul>
			<hr>
			<hr>
			<hr>
			<br>	
			<br>
			<h3>3\uFF1A\u805A\u5408\u901A\u7528\u3001Clash-meta\u3001Sing-box\u8BA2\u9605\u94FE\u63A5\u5982\u4E0B\uFF1A</h3>
			<hr>
			<p>\u6CE8\u610F\uFF1A<br>1\u3001\u9ED8\u8BA4\u6BCF\u4E2A\u8BA2\u9605\u94FE\u63A5\u5305\u542BTLS+\u975ETLS\u517113\u4E2A\u7AEF\u53E3\u8282\u70B9<br>2\u3001\u5F53\u524Dworkers\u57DF\u540D\u4F5C\u4E3A\u8BA2\u9605\u94FE\u63A5\uFF0C\u9700\u901A\u8FC7\u4EE3\u7406\u8FDB\u884C\u8BA2\u9605\u66F4\u65B0<br>3\u3001\u5982\u4F7F\u7528\u7684\u5BA2\u6237\u7AEF\u4E0D\u652F\u6301\u5206\u7247\u529F\u80FD\uFF0C\u5219TLS\u8282\u70B9\u4E0D\u53EF\u7528</p>
			<hr>


			<table class="table">
					<thead>
						<tr>
							<th>\u805A\u5408\u901A\u7528\u5206\u4EAB\u94FE\u63A5 (\u53EF\u76F4\u63A5\u5BFC\u5165\u5BA2\u6237\u7AEF)\uFF1A</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><button class="btn btn-primary" onclick="copyToClipboard('${c}')">\u70B9\u51FB\u590D\u5236\u94FE\u63A5</button></td>
						</tr>
					</tbody>
				</table>


   
			<table class="table">
					<thead>
						<tr>
							<th>\u805A\u5408\u901A\u7528\u8BA2\u9605\u94FE\u63A5\uFF1A</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="limited-width">${o}</td>	
							<td><button class="btn btn-primary" onclick="copyToClipboard('${o}')">\u70B9\u51FB\u590D\u5236\u94FE\u63A5</button></td>
						</tr>
					</tbody>
				</table>	

				<table class="table">
						<thead>
							<tr>
								<th>Clash-meta\u8BA2\u9605\u94FE\u63A5\uFF1A</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="limited-width">${a}</td>	
								<td><button class="btn btn-primary" onclick="copyToClipboard('${a}')">\u70B9\u51FB\u590D\u5236\u94FE\u63A5</button></td>
							</tr>
						</tbody>
					</table>

					<table class="table">
					<thead>
						<tr>
							<th>Sing-box\u8BA2\u9605\u94FE\u63A5\uFF1A</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="limited-width">${i}</td>	
							<td><button class="btn btn-primary" onclick="copyToClipboard('${i}')">\u70B9\u51FB\u590D\u5236\u94FE\u63A5</button></td>
						</tr>
					</tbody>
				</table>
				<br>
				<br>
        </div>
    </div>
</div>
</body>
` : `
<br>
<br>
${_}
<body>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1>Cloudflare-workers/pages-vless\u4EE3\u7406\u811A\u672C V25.5.4</h1>
			<hr>
            <p>${u}</p>
            <hr>
			<hr>
			<hr>
            <br>
            <br>
            <h3>1\uFF1ACF-pages/workers/\u81EA\u5B9A\u4E49\u57DF-vless+ws+tls\u8282\u70B9</h3>
			<table class="table">
				<thead>
					<tr>
						<th>\u8282\u70B9\u7279\u8272\uFF1A</th>
						<th>\u5355\u8282\u70B9\u94FE\u63A5\u5982\u4E0B\uFF1A</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="limited-width">\u542F\u7528\u4E86TLS\u52A0\u5BC6\uFF0C<br>\u5982\u679C\u5BA2\u6237\u7AEF\u652F\u6301\u5206\u7247(Fragment)\u529F\u80FD\uFF0C\u53EF\u5F00\u542F\uFF0C\u9632\u6B62\u57DF\u540D\u963B\u65AD</td>
						<td class="limited-width">${s}</td>
						<td><button class="btn btn-primary" onclick="copyToClipboard('${s}')">\u70B9\u51FB\u590D\u5236\u94FE\u63A5</button></td>
					</tr>
				</tbody>
			</table>
            <h5>\u5BA2\u6237\u7AEF\u53C2\u6570\u5982\u4E0B\uFF1A</h5>
            <ul>
                <li>\u5BA2\u6237\u7AEF\u5730\u5740(address)\uFF1A\u81EA\u5B9A\u4E49\u7684\u57DF\u540D \u6216\u8005 \u4F18\u9009\u57DF\u540D \u6216\u8005 \u4F18\u9009IP \u6216\u8005 \u53CD\u4EE3IP</li>
                <li>\u7AEF\u53E3(port)\uFF1A6\u4E2Ahttps\u7AEF\u53E3\u53EF\u4EFB\u610F\u9009\u62E9(443\u30018443\u30012053\u30012083\u30012087\u30012096)\uFF0C\u6216\u53CD\u4EE3IP\u5BF9\u5E94\u7AEF\u53E3</li>
                <li>\u7528\u6237ID(uuid)\uFF1A${t}</li>
                <li>\u4F20\u8F93\u534F\u8BAE(network)\uFF1Aws \u6216\u8005 websocket</li>
                <li>\u4F2A\u88C5\u57DF\u540D(host)\uFF1A${n}</li>
                <li>\u8DEF\u5F84(path)\uFF1A/?ed=2560</li>
                <li>\u4F20\u8F93\u5B89\u5168(TLS)\uFF1A\u5F00\u542F</li>
                <li>\u8DF3\u8FC7\u8BC1\u4E66\u9A8C\u8BC1(allowlnsecure)\uFF1Afalse</li>
			</ul>
            <hr>
			<hr>
			<hr>
            <br>
            <br>
			<h3>2\uFF1A\u805A\u5408\u901A\u7528\u3001Clash-meta\u3001Sing-box\u8BA2\u9605\u94FE\u63A5\u5982\u4E0B\uFF1A</h3>
			<hr>
			<p>\u6CE8\u610F\uFF1A\u4EE5\u4E0B\u8BA2\u9605\u94FE\u63A5\u4EC56\u4E2ATLS\u7AEF\u53E3\u8282\u70B9</p>
			<hr>


			<table class="table">
					<thead>
						<tr>
							<th>\u805A\u5408\u901A\u7528\u5206\u4EAB\u94FE\u63A5 (\u53EF\u76F4\u63A5\u5BFC\u5165\u5BA2\u6237\u7AEF)\uFF1A</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><button class="btn btn-primary" onclick="copyToClipboard('${$}')">\u70B9\u51FB\u590D\u5236\u94FE\u63A5</button></td>
						</tr>
					</tbody>
				</table>



			<table class="table">
					<thead>
						<tr>
							<th>\u805A\u5408\u901A\u7528\u8BA2\u9605\u94FE\u63A5\uFF1A</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="limited-width">${d}</td>	
							<td><button class="btn btn-primary" onclick="copyToClipboard('${d}')">\u70B9\u51FB\u590D\u5236\u94FE\u63A5</button></td>
						</tr>
					</tbody>
				</table>	

				<table class="table">
						<thead>
							<tr>
								<th>Clash-meta\u8BA2\u9605\u94FE\u63A5\uFF1A</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="limited-width">${l}</td>	
								<td><button class="btn btn-primary" onclick="copyToClipboard('${l}')">\u70B9\u51FB\u590D\u5236\u94FE\u63A5</button></td>
							</tr>
						</tbody>
					</table>

					<table class="table">
					<thead>
						<tr>
							<th>Sing-box\u8BA2\u9605\u94FE\u63A5\uFF1A</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="limited-width">${p}</td>	
							<td><button class="btn btn-primary" onclick="copyToClipboard('${p}')">\u70B9\u51FB\u590D\u5236\u94FE\u63A5</button></td>
						</tr>
					</tbody>
				</table>
				<br>
				<br>
        </div>
    </div>
</div>
</body>
`;
}
__name(getvlessConfig, "getvlessConfig");
function gettyConfig(t, n) {
  return `${btoa(`vless://${t}@${IP1}:${PT1}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V1_${IP1}_${PT1}
vless://${t}@${IP2}:${PT2}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V2_${IP2}_${PT2}
vless://${t}@${IP3}:${PT3}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V3_${IP3}_${PT3}
vless://${t}@${IP4}:${PT4}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V4_${IP4}_${PT4}
vless://${t}@${IP5}:${PT5}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V5_${IP5}_${PT5}
vless://${t}@${IP6}:${PT6}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V6_${IP6}_${PT6}
vless://${t}@${IP7}:${PT7}?encryption=none&security=none&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V7_${IP7}_${PT7}
vless://${t}@${IP8}:${PT8}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V8_${IP8}_${PT8}
vless://${t}@${IP9}:${PT9}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V9_${IP9}_${PT9}
vless://${t}@${IP10}:${PT10}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V10_${IP10}_${PT10}
vless://${t}@${IP11}:${PT11}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V11_${IP11}_${PT11}
vless://${t}@${IP12}:${PT12}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V12_${IP12}_${PT12}
vless://${t}@${IP13}:${PT13}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_V13_${IP13}_${PT13}`)}`;
}
__name(gettyConfig, "gettyConfig");
function getclConfig(t, n) {
  return `
port: 7890
allow-lan: true
mode: rule
log-level: info
unified-delay: true
global-client-fingerprint: chrome
dns:
  enable: false
  listen: :53
  ipv6: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  default-nameserver: 
    - 223.5.5.5
    - 114.114.114.114
    - 8.8.8.8
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  fallback:
    - https://1.0.0.1/dns-query
    - tls://dns.google
  fallback-filter:
    geoip: true
    geoip-code: CN
    ipcidr:
      - 240.0.0.0/4

proxies:
- name: CF_V1_${IP1}_${PT1}
  type: vless
  server: ${IP1.replace(/[\[\]]/g, "")}
  port: ${PT1}
  uuid: ${t}
  udp: false
  tls: false
  network: ws
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

- name: CF_V2_${IP2}_${PT2}
  type: vless
  server: ${IP2.replace(/[\[\]]/g, "")}
  port: ${PT2}
  uuid: ${t}
  udp: false
  tls: false
  network: ws
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

- name: CF_V3_${IP3}_${PT3}
  type: vless
  server: ${IP3.replace(/[\[\]]/g, "")}
  port: ${PT3}
  uuid: ${t}
  udp: false
  tls: false
  network: ws
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

- name: CF_V4_${IP4}_${PT4}
  type: vless
  server: ${IP4.replace(/[\[\]]/g, "")}
  port: ${PT4}
  uuid: ${t}
  udp: false
  tls: false
  network: ws
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

- name: CF_V5_${IP5}_${PT5}
  type: vless
  server: ${IP5.replace(/[\[\]]/g, "")}
  port: ${PT5}
  uuid: ${t}
  udp: false
  tls: false
  network: ws
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

- name: CF_V6_${IP6}_${PT6}
  type: vless
  server: ${IP6.replace(/[\[\]]/g, "")}
  port: ${PT6}
  uuid: ${t}
  udp: false
  tls: false
  network: ws
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

- name: CF_V7_${IP7}_${PT7}
  type: vless
  server: ${IP7.replace(/[\[\]]/g, "")}
  port: ${PT7}
  uuid: ${t}
  udp: false
  tls: false
  network: ws
  servername: ${n}
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

- name: CF_V8_${IP8}_${PT8}
  type: vless
  server: ${IP8.replace(/[\[\]]/g, "")}
  port: ${PT8}
  uuid: ${t}
  udp: false
  tls: true
  network: ws
  servername: ${n}
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

- name: CF_V9_${IP9}_${PT9}
  type: vless
  server: ${IP9.replace(/[\[\]]/g, "")}
  port: ${PT9}
  uuid: ${t}
  udp: false
  tls: true
  network: ws
  servername: ${n}
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

- name: CF_V10_${IP10}_${PT10}
  type: vless
  server: ${IP10.replace(/[\[\]]/g, "")}
  port: ${PT10}
  uuid: ${t}
  udp: false
  tls: true
  network: ws
  servername: ${n}
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

- name: CF_V11_${IP11}_${PT11}
  type: vless
  server: ${IP11.replace(/[\[\]]/g, "")}
  port: ${PT11}
  uuid: ${t}
  udp: false
  tls: true
  network: ws
  servername: ${n}
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

- name: CF_V12_${IP12}_${PT12}
  type: vless
  server: ${IP12.replace(/[\[\]]/g, "")}
  port: ${PT12}
  uuid: ${t}
  udp: false
  tls: true
  network: ws
  servername: ${n}
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

- name: CF_V13_${IP13}_${PT13}
  type: vless
  server: ${IP13.replace(/[\[\]]/g, "")}
  port: ${PT13}
  uuid: ${t}
  udp: false
  tls: true
  network: ws
  servername: ${n}
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}

proxy-groups:
- name: \u8D1F\u8F7D\u5747\u8861
  type: load-balance
  url: http://www.gstatic.com/generate_204
  interval: 300
  proxies:
    - CF_V1_${IP1}_${PT1}
    - CF_V2_${IP2}_${PT2}
    - CF_V3_${IP3}_${PT3}
    - CF_V4_${IP4}_${PT4}
    - CF_V5_${IP5}_${PT5}
    - CF_V6_${IP6}_${PT6}
    - CF_V7_${IP7}_${PT7}
    - CF_V8_${IP8}_${PT8}
    - CF_V9_${IP9}_${PT9}
    - CF_V10_${IP10}_${PT10}
    - CF_V11_${IP11}_${PT11}
    - CF_V12_${IP12}_${PT12}
    - CF_V13_${IP13}_${PT13}

- name: \u81EA\u52A8\u9009\u62E9
  type: url-test
  url: http://www.gstatic.com/generate_204
  interval: 300
  tolerance: 50
  proxies:
    - CF_V1_${IP1}_${PT1}
    - CF_V2_${IP2}_${PT2}
    - CF_V3_${IP3}_${PT3}
    - CF_V4_${IP4}_${PT4}
    - CF_V5_${IP5}_${PT5}
    - CF_V6_${IP6}_${PT6}
    - CF_V7_${IP7}_${PT7}
    - CF_V8_${IP8}_${PT8}
    - CF_V9_${IP9}_${PT9}
    - CF_V10_${IP10}_${PT10}
    - CF_V11_${IP11}_${PT11}
    - CF_V12_${IP12}_${PT12}
    - CF_V13_${IP13}_${PT13}

- name: \u{1F30D}\u9009\u62E9\u4EE3\u7406
  type: select
  proxies:
    - \u8D1F\u8F7D\u5747\u8861
    - \u81EA\u52A8\u9009\u62E9
    - DIRECT
    - CF_V1_${IP1}_${PT1}
    - CF_V2_${IP2}_${PT2}
    - CF_V3_${IP3}_${PT3}
    - CF_V4_${IP4}_${PT4}
    - CF_V5_${IP5}_${PT5}
    - CF_V6_${IP6}_${PT6}
    - CF_V7_${IP7}_${PT7}
    - CF_V8_${IP8}_${PT8}
    - CF_V9_${IP9}_${PT9}
    - CF_V10_${IP10}_${PT10}
    - CF_V11_${IP11}_${PT11}
    - CF_V12_${IP12}_${PT12}
    - CF_V13_${IP13}_${PT13}

rules:
  - GEOIP,LAN,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,\u{1F30D}\u9009\u62E9\u4EE3\u7406`;
}
__name(getclConfig, "getclConfig");
function getsbConfig(t, n) {
  return `{
	  "log": {
		"disabled": false,
		"level": "info",
		"timestamp": true
	  },
	  "experimental": {
		"clash_api": {
		  "external_controller": "127.0.0.1:9090",
		  "external_ui": "ui",
		  "external_ui_download_url": "",
		  "external_ui_download_detour": "",
		  "secret": "",
		  "default_mode": "Rule"
		},
		"cache_file": {
		  "enabled": true,
		  "path": "cache.db",
		  "store_fakeip": true
		}
	  },
	  "dns": {
		"servers": [
		  {
			"tag": "proxydns",
			"address": "tls://8.8.8.8/dns-query",
			"detour": "select"
		  },
		  {
			"tag": "localdns",
			"address": "h3://223.5.5.5/dns-query",
			"detour": "direct"
		  },
		  {
			"tag": "dns_fakeip",
			"address": "fakeip"
		  }
		],
		"rules": [
		  {
			"outbound": "any",
			"server": "localdns",
			"disable_cache": true
		  },
		  {
			"clash_mode": "Global",
			"server": "proxydns"
		  },
		  {
			"clash_mode": "Direct",
			"server": "localdns"
		  },
		  {
			"rule_set": "geosite-cn",
			"server": "localdns"
		  },
		  {
			"rule_set": "geosite-geolocation-!cn",
			"server": "proxydns"
		  },
		  {
			"rule_set": "geosite-geolocation-!cn",
			"query_type": [
			  "A",
			  "AAAA"
			],
			"server": "dns_fakeip"
		  }
		],
		"fakeip": {
		  "enabled": true,
		  "inet4_range": "198.18.0.0/15",
		  "inet6_range": "fc00::/18"
		},
		"independent_cache": true,
		"final": "proxydns"
	  },
	  "inbounds": [
		{
		  "type": "tun",
                  "tag": "tun-in",
		  "address": [
                    "172.19.0.1/30",
		    "fd00::1/126"
      ],
		  "auto_route": true,
		  "strict_route": true,
		  "sniff": true,
		  "sniff_override_destination": true,
		  "domain_strategy": "prefer_ipv4"
		}
	  ],
	  "outbounds": [
		{
		  "tag": "select",
		  "type": "selector",
		  "default": "auto",
		  "outbounds": [
			"auto",
			"CF_V1_${IP1}_${PT1}",
			"CF_V2_${IP2}_${PT2}",
			"CF_V3_${IP3}_${PT3}",
			"CF_V4_${IP4}_${PT4}",
			"CF_V5_${IP5}_${PT5}",
			"CF_V6_${IP6}_${PT6}",
			"CF_V7_${IP7}_${PT7}",
			"CF_V8_${IP8}_${PT8}",
			"CF_V9_${IP9}_${PT9}",
			"CF_V10_${IP10}_${PT10}",
			"CF_V11_${IP11}_${PT11}",
			"CF_V12_${IP12}_${PT12}",
			"CF_V13_${IP13}_${PT13}"
		  ]
		},
		{
		  "server": "${IP1}",
		  "server_port": ${PT1},
		  "tag": "CF_V1_${IP1}_${PT1}",
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{
		  "server": "${IP2}",
		  "server_port": ${PT2},
		  "tag": "CF_V2_${IP2}_${PT2}",
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{
		  "server": "${IP3}",
		  "server_port": ${PT3},
		  "tag": "CF_V3_${IP3}_${PT3}",
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{
		  "server": "${IP4}",
		  "server_port": ${PT4},
		  "tag": "CF_V4_${IP4}_${PT4}",
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{
		  "server": "${IP5}",
		  "server_port": ${PT5},
		  "tag": "CF_V5_${IP5}_${PT5}",
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{
		  "server": "${IP6}",
		  "server_port": ${PT6},
		  "tag": "CF_V6_${IP6}_${PT6}",
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{
		  "server": "${IP7}",
		  "server_port": ${PT7},
		  "tag": "CF_V7_${IP7}_${PT7}",
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{     
		  "server": "${IP8}",
		  "server_port": ${PT8},
		  "tag": "CF_V8_${IP8}_${PT8}",
		  "tls": {
			"enabled": true,
			"server_name": "${n}",
			"insecure": false,
			"utls": {
			  "enabled": true,
			  "fingerprint": "chrome"
			}
		  },
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{
		  "server": "${IP9}",
		  "server_port": ${PT9},
		  "tag": "CF_V9_${IP9}_${PT9}",
		  "tls": {
			"enabled": true,
			"server_name": "${n}",
			"insecure": false,
			"utls": {
			  "enabled": true,
			  "fingerprint": "chrome"
			}
		  },
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{
		  "server": "${IP10}",
		  "server_port": ${PT10},
		  "tag": "CF_V10_${IP10}_${PT10}",
		  "tls": {
			"enabled": true,
			"server_name": "${n}",
			"insecure": false,
			"utls": {
			  "enabled": true,
			  "fingerprint": "chrome"
			}
		  },
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{
		  "server": "${IP11}",
		  "server_port": ${PT11},
		  "tag": "CF_V11_${IP11}_${PT11}",
		  "tls": {
			"enabled": true,
			"server_name": "${n}",
			"insecure": false,
			"utls": {
			  "enabled": true,
			  "fingerprint": "chrome"
			}
		  },
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{
		  "server": "${IP12}",
		  "server_port": ${PT12},
		  "tag": "CF_V12_${IP12}_${PT12}",
		  "tls": {
			"enabled": true,
			"server_name": "${n}",
			"insecure": false,
			"utls": {
			  "enabled": true,
			  "fingerprint": "chrome"
			}
		  },
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{
		  "server": "${IP13}",
		  "server_port": ${PT13},
		  "tag": "CF_V13_${IP13}_${PT13}",
		  "tls": {
			"enabled": true,
			"server_name": "${n}",
			"insecure": false,
			"utls": {
			  "enabled": true,
			  "fingerprint": "chrome"
			}
		  },
		  "packet_encoding": "packetaddr",
		  "transport": {
			"headers": {
			  "Host": [
				"${n}"
			  ]
			},
			"path": "/?ed=2560",
			"type": "ws"
		  },
		  "type": "vless",
		  "uuid": "${t}"
		},
		{
		  "tag": "direct",
		  "type": "direct"
		},
		{
		  "tag": "auto",
		  "type": "urltest",
		  "outbounds": [
			"CF_V1_${IP1}_${PT1}",
			"CF_V2_${IP2}_${PT2}",
			"CF_V3_${IP3}_${PT3}",
			"CF_V4_${IP4}_${PT4}",
			"CF_V5_${IP5}_${PT5}",
			"CF_V6_${IP6}_${PT6}",
			"CF_V7_${IP7}_${PT7}",
			"CF_V8_${IP8}_${PT8}",
			"CF_V9_${IP9}_${PT9}",
			"CF_V10_${IP10}_${PT10}",
			"CF_V11_${IP11}_${PT11}",
			"CF_V12_${IP12}_${PT12}",
			"CF_V13_${IP13}_${PT13}"
		  ],
		  "url": "https://www.gstatic.com/generate_204",
		  "interval": "1m",
		  "tolerance": 50,
		  "interrupt_exist_connections": false
		}
	  ],
	  "route": {
		"rule_set": [
		  {
			"tag": "geosite-geolocation-!cn",
			"type": "remote",
			"format": "binary",
			"url": "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@sing/geo/geosite/geolocation-!cn.srs",
			"download_detour": "select",
			"update_interval": "1d"
		  },
		  {
			"tag": "geosite-cn",
			"type": "remote",
			"format": "binary",
			"url": "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@sing/geo/geosite/geolocation-cn.srs",
			"download_detour": "select",
			"update_interval": "1d"
		  },
		  {
			"tag": "geoip-cn",
			"type": "remote",
			"format": "binary",
			"url": "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@sing/geo/geoip/cn.srs",
			"download_detour": "select",
			"update_interval": "1d"
		  }
		],
		"auto_detect_interface": true,
		"final": "select",
		"rules": [
                         {
                        "inbound": "tun-in",
                        "action": "sniff"
                         },
                          {
                        "protocol": "dns",
                           "action": "hijack-dns"
                         },
                        {
                        "port": 443,
                        "network": "udp",
                        "action": "reject"
                         },
		  {
			"clash_mode": "Direct",
			"outbound": "direct"
		  },
		  {
			"clash_mode": "Global",
			"outbound": "select"
		  },
		  {
			"rule_set": "geoip-cn",
			"outbound": "direct"
		  },
		  {
			"rule_set": "geosite-cn",
			"outbound": "direct"
		  },
		  {
			"ip_is_private": true,
			"outbound": "direct"
		  },
		  {
			"rule_set": "geosite-geolocation-!cn",
			"outbound": "select"
		  }
		]
	  },
	  "ntp": {
		"enabled": true,
		"server": "time.apple.com",
		"server_port": 123,
		"interval": "30m",
		"detour": "direct"
	  }
	}`;
}
__name(getsbConfig, "getsbConfig");
function getptyConfig(t, n) {
  const e = [];
  for (let s = 1; s <= 13; s++) for (const r of [443, 8443]) e.push(`vless://${t}@yg${s}.ygkkk.dpdns.org:${r}?encryption=none&security=tls&sni=${n}&fp=randomized&type=ws&host=${n}&path=%2F%3Fed%3D2560#CF_yg${s}.ygkkk.dpdns.org_${r}`);
  return btoa(e.join("\n"));
}
__name(getptyConfig, "getptyConfig");
function getpclConfig(t, n) {
  let e = "";
  const s = [];
  for (let r2 = 1; r2 <= 13; r2++) for (const o of [443, 8443]) {
    const a = `CF_yg${r2}.ygkkk.dpdns.org_${o}`;
    s.push(a), e += `
- name: ${a}
  type: vless
  server: yg${r2}.ygkkk.dpdns.org
  port: ${o}
  uuid: ${t}
  udp: false
  tls: true
  network: ws
  servername: ${n}
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${n}`;
  }
  const r = s.map((t2) => `    - ${t2}`).join("\n");
  return `
port: 7890
allow-lan: true
mode: rule
log-level: info
unified-delay: true
global-client-fingerprint: chrome
dns:
  enable: false
  listen: :53
  ipv6: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  default-nameserver: 
    - 223.5.5.5
    - 114.114.114.114
    - 8.8.8.8
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  fallback:
    - https://1.0.0.1/dns-query
    - tls://dns.google
  fallback-filter:
    geoip: true
    geoip-code: CN
    ipcidr:
      - 240.0.0.0/4
${e}

proxy-groups:
- name: \u8D1F\u8F7D\u5747\u8861
  type: load-balance
  url: http://www.gstatic.com/generate_204
  interval: 300
  proxies:
${r}

- name: \u81EA\u52A8\u9009\u62E9
  type: url-test
  url: http://www.gstatic.com/generate_204
  interval: 300
  tolerance: 50
  proxies:
${r}

- name: \u{1F30D}\u9009\u62E9\u4EE3\u7406
  type: select
  proxies:
    - \u8D1F\u8F7D\u5747\u8861
    - \u81EA\u52A8\u9009\u62E9
    - DIRECT
${r}

rules:
  - GEOIP,LAN,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,\u{1F30D}\u9009\u62E9\u4EE3\u7406`;
}
__name(getpclConfig, "getpclConfig");
function getpsbConfig(t, n) {
  const e = ['"auto"'], s = [];
  for (let r = 1; r <= 13; r++) for (const o of [443, 8443]) {
    const a = `CF_yg${r}.ygkkk.dpdns.org_${o}`;
    e.push(`"${a}"`), s.push(`{
			"server": "yg${r}.ygkkk.dpdns.org",
			"server_port": ${o},
			"tag": "${a}",
			"tls": {
				"enabled": true,
				"server_name": "${n}",
				"insecure": false,
				"utls": {
					"enabled": true,
					"fingerprint": "chrome"
				}
			},
			"packet_encoding": "packetaddr",
			"transport": {
				"headers": {
					"Host": [
						"${n}"
					]
				},
				"path": "/?ed=2560",
				"type": "ws"
			},
			"type": "vless",
			"uuid": "${t}"
		}`);
  }
  return `{
	  "log": {
		"disabled": false,
		"level": "info",
		"timestamp": true
	  },
	  "experimental": {
		"clash_api": {
		  "external_controller": "127.0.0.1:9090",
		  "external_ui": "ui",
		  "external_ui_download_url": "",
		  "external_ui_download_detour": "",
		  "secret": "",
		  "default_mode": "Rule"
		},
		"cache_file": {
		  "enabled": true,
		  "path": "cache.db",
		  "store_fakeip": true
		}
	  },
	  "dns": {
		"servers": [
		  {
			"tag": "proxydns",
			"address": "tls://8.8.8.8/dns-query",
			"detour": "select"
		  },
		  {
			"tag": "localdns",
			"address": "h3://223.5.5.5/dns-query",
			"detour": "direct"
		  },
		  {
			"tag": "dns_fakeip",
			"address": "fakeip"
		  }
		],
		"rules": [
		  {
			"outbound": "any",
			"server": "localdns",
			"disable_cache": true
		  },
		  {
			"clash_mode": "Global",
			"server": "proxydns"
		  },
		  {
			"clash_mode": "Direct",
			"server": "localdns"
		  },
		  {
			"rule_set": "geosite-cn",
			"server": "localdns"
		  },
		  {
			"rule_set": "geosite-geolocation-!cn",
			"server": "proxydns"
		  },
		  {
			"rule_set": "geosite-geolocation-!cn",
			"query_type": [
			  "A",
			  "AAAA"
			],
			"server": "dns_fakeip"
		  }
		],
		"fakeip": {
		  "enabled": true,
		  "inet4_range": "198.18.0.0/15",
		  "inet6_range": "fc00::/18"
		},
		"independent_cache": true,
		"final": "proxydns"
	  },
	  "inbounds": [
		{
		  "type": "tun",
                  "tag": "tun-in",
		  "address": [
                    "172.19.0.1/30",
		    "fd00::1/126"
      ],
		  "auto_route": true,
		  "strict_route": true,
		  "sniff": true,
		  "sniff_override_destination": true,
		  "domain_strategy": "prefer_ipv4"
		}
	  ],
	  "outbounds": [
		{
		  "tag": "select",
		  "type": "selector",
		  "default": "auto",
		  "outbounds": [
			${e.join(",\n			")}
		  ]
		},
		${s.join(",\n			")},
		{
		  "tag": "direct",
		  "type": "direct"
		},
		{
		  "tag": "auto",
		  "type": "urltest",
		  "outbounds": [
			${e.slice(1).join(",\n			")}
		  ],
		  "url": "https://www.gstatic.com/generate_204",
		  "interval": "1m",
		  "tolerance": 50,
		  "interrupt_exist_connections": false
		}
	  ],
	  "route": {
		"rule_set": [
		  {
			"tag": "geosite-geolocation-!cn",
			"type": "remote",
			"format": "binary",
			"url": "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@sing/geo/geosite/geolocation-!cn.srs",
			"download_detour": "select",
			"update_interval": "1d"
		  },
		  {
			"tag": "geosite-cn",
			"type": "remote",
			"format": "binary",
			"url": "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@sing/geo/geosite/geolocation-cn.srs",
			"download_detour": "select",
			"update_interval": "1d"
		  },
		  {
			"tag": "geoip-cn",
			"type": "remote",
			"format": "binary",
			"url": "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@sing/geo/geoip/cn.srs",
			"download_detour": "select",
			"update_interval": "1d"
		  }
		],
		"auto_detect_interface": true,
		"final": "select",
		"rules": [
                         {
                        "inbound": "tun-in",
                         "action": "sniff"
                          },
                          {
                          "protocol": "dns",
                             "action": "hijack-dns"
                           },
                          {
                           "port": 443,
                          "network": "udp",
                          "action": "reject"
                          },
		  {
			"clash_mode": "Direct",
			"outbound": "direct"
		  },
		  {
			"clash_mode": "Global",
			"outbound": "select"
		  },
		  {
			"rule_set": "geoip-cn",
			"outbound": "direct"
		  },
		  {
			"rule_set": "geosite-cn",
			"outbound": "direct"
		  },
		  {
			"ip_is_private": true,
			"outbound": "direct"
		  },
		  {
			"rule_set": "geosite-geolocation-!cn",
			"outbound": "select"
		  }
		]
	  },
	  "ntp": {
		"enabled": true,
		"server": "time.apple.com",
		"server_port": 123,
		"interval": "30m",
		"detour": "direct"
	  }
	}`;
}
__name(getpsbConfig, "getpsbConfig");
export {
  worker_default as default
};
/*! uuid: 自定义你的uuid */
/*! proxyip: 填写proxyip，留空将无法访问CF网站 */
//# sourceMappingURL=_worker.js.map
