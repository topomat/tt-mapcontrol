import cs from "@arcgis/core/config";
import Mt from "@arcgis/core/geometry/Extent";
import U from "@arcgis/core/geometry/Point";
import mi from "@arcgis/core/geometry/SpatialReference";
import fe from "@arcgis/core/Graphic";
import Rt from "@arcgis/core/layers/GraphicsLayer";
import bt from "@arcgis/core/layers/support/TileInfo";
import fi from "@arcgis/core/Map";
import ls from "@arcgis/core/PopupTemplate";
import gi from "@arcgis/core/views/MapView";
import { getDefaultUnitForView as hs } from "@arcgis/core/applications/Components/getDefaultUnits.js";
import * as ds from "@arcgis/core/core/reactiveUtils.js";
import { watch as De, when as ps } from "@arcgis/core/core/reactiveUtils.js";
import { formatNumber as us } from "@arcgis/core/intl.js";
import ms from "@arcgis/core/widgets/ScaleBar/ScaleBarViewModel.js";
import { signal as fs } from "@arcgis/core/applications/Components/reactiveUtils.js";
import { importCoreReactiveUtils as gs } from "@arcgis/core-adapter";
import It from "@arcgis/core/geometry/Polyline";
import * as jt from "@arcgis/core/geometry/operators/projectOperator.js";
import Fe from "@arcgis/core/request";
import vs from "@arcgis/core/Basemap";
import ys from "@arcgis/core/identity/IdentityManager";
import bs from "@arcgis/core/layers/FeatureLayer";
import $s from "@arcgis/core/layers/ImageryLayer";
import ws from "@arcgis/core/layers/MapImageLayer";
import _s from "@arcgis/core/layers/TileLayer";
import xs from "@arcgis/core/layers/VectorTileLayer";
import Es from "@arcgis/core/layers/WMTSLayer";
import { property as Cs } from "@arcgis/core/core/accessorSupport/decorators/property";
import { subclass as Ls } from "@arcgis/core/core/accessorSupport/decorators/subclass";
import ks from "@arcgis/core/layers/BaseTileLayer";
import * as Ss from "@arcgis/core/rest/query";
import As from "@arcgis/core/symbols/PictureMarkerSymbol";
import Os from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource";
import Ps from "@arcgis/core/widgets/CoordinateConversion";
import Ds from "@arcgis/core/widgets/CoordinateConversion/support/Conversion";
import zs from "@arcgis/core/widgets/CoordinateConversion/support/Format";
import xe from "@arcgis/core/widgets/Expand";
import Ts from "@arcgis/core/widgets/LayerList";
import Us from "@arcgis/core/widgets/BasemapGallery/BasemapGalleryViewModel.js";
import { property as Ns, subclass as Ms } from "@arcgis/core/core/accessorSupport/decorators";
import * as Rs from "@arcgis/core/core/reactiveUtils";
import { tsx as Is } from "@arcgis/core/widgets/support/widget";
import js from "@arcgis/core/widgets/Widget";
let Vs = () => ({
  emit(t, ...e) {
    for (let i = this.events[t] || [], s = 0, n = i.length; s < n; s++)
      i[s](...e);
  },
  events: {},
  on(t, e) {
    var i;
    return ((i = this.events)[t] || (i[t] = [])).push(e), () => {
      var s;
      this.events[t] = (s = this.events[t]) == null ? void 0 : s.filter((n) => e !== n);
    };
  }
});
var Bs = ":";
function A(...t) {
  const e = [];
  for (let s = 0; s < t.length; s++) {
    const n = t[s];
    if (typeof n == "string")
      e.push(n);
    else if (Array.isArray(n))
      e.push.apply(e, n);
    else if (typeof n == "object")
      for (const o in n)
        n[o] && e.push(o);
  }
  const i = e.join(" ");
  return e.length = 0, i;
}
var J = class {
  /**
   * Resolves the promise.
   * @param value The value to resolve the promise with.
   */
  resolve(t) {
  }
  /**
   * Rejects the promise.
   */
  reject(t) {
  }
  /**
   * Creates a new deferred promise.
   */
  constructor() {
    this.promise = new Promise((t, e) => {
      this.resolve = t, this.reject = e;
    });
  }
};
function Hs(t, e) {
  let i = t;
  for (; i; ) {
    if (i === e)
      return !0;
    if (!i.parentNode)
      return !1;
    i.parentNode instanceof ShadowRoot ? i = i.parentNode.host : i = i.parentNode;
  }
  return !1;
}
function Fs(t, e, i) {
  const { subscribe: s } = Ws(e);
  return s((n) => {
    n.some((r) => Hs(t, r.target)) && i();
  });
}
var Ke = {};
function Ws(t) {
  const e = t.join(","), i = Ke[e];
  if (i !== void 0)
    return i;
  const s = /* @__PURE__ */ new Set(), n = new MutationObserver((r) => s.forEach((a) => a(r)));
  globalThis.document && n.observe(document.documentElement, {
    attributes: !0,
    attributeFilter: t,
    subtree: !0
  });
  const o = {
    subscribe(r) {
      return s.add(r), () => {
        s.delete(r), s.size === 0 && (n.disconnect(), Ke[e] = void 0);
      };
    }
  };
  return Ke[e] = o, o;
}
function Gs(t, e) {
  var s, n;
  let i = t;
  for (; i; ) {
    const o = (s = i.closest) == null ? void 0 : s.call(i, e);
    if (o)
      return o;
    const r = (n = i.getRootNode) == null ? void 0 : n.call(i);
    if (r === globalThis.document)
      return null;
    i = r.host;
  }
  return null;
}
function qs(t, e, i) {
  const s = Gs(t, `[${e}]`);
  return (s == null ? void 0 : s.getAttribute(e)) ?? i;
}
function u() {
  return typeof globalThis.process == "object" && !!process.env.ESRI_INTERNAL;
}
function y(t, e, ...i) {
  try {
    return t == null ? void 0 : t.call(e, ...i);
  } catch (s) {
    console.error(s, t);
  }
}
async function pt(t, e, ...i) {
  try {
    const s = t == null ? void 0 : t.call(e, ...i);
    return s instanceof Promise ? await s : s;
  } catch (s) {
    console.error(s, t);
  }
}
var Ys = [
  "ar",
  "bg",
  "bs",
  "ca",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "es",
  "et",
  "fi",
  "fr",
  "he",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "lt",
  "lv",
  "nl",
  "nb",
  "no",
  "pl",
  "pt-BR",
  "pt-PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-HK",
  "zh-TW"
], Ks = /* @__PURE__ */ new Set(Ys), ze = "en", Js = {
  // We use `pt-PT` as it will have the same translations as `pt`, which has no corresponding bundle
  pt: "pt-PT",
  // We support both 'nb' and 'no' (BCP 47) for Norwegian but only `no` has corresponding bundle
  nb: "no",
  // We use `zh-CN` as base translation for chinese locales which has no corresponding bundle.
  zh: "zh-CN"
};
async function Zs(t, e, i = "") {
  const s = `${e}/${i}`, n = `${s}${t}.json`;
  return Je[n] ?? (Je[n] = vi(t, s)), await Je[n];
}
var Je = {};
async function vi(t, e) {
  const i = `${e}${t}.json`;
  try {
    const s = await fetch(i);
    if (s.ok)
      return await s.json();
  } catch (s) {
    return process.env.NODE_ENV !== "production" ? String(s).includes(`Unexpected token '<', "<!doctype "... is not valid JSON`) ? console.error(`[404] Localization strings not found at ${i}`) : console.error(`Error fetching localization strings at ${i}`, s) : console.error(s), {};
  }
  return t === ze ? {} : await vi(ze, e);
}
function yi(t) {
  var i;
  const e = qs(t, "lang", ((i = globalThis.navigator) == null ? void 0 : i.language) || ze);
  return { lang: e, t9nLocale: bi(e) };
}
function bi(t) {
  const [e, i] = t.split("-"), s = e.toLowerCase();
  let n = s;
  return i && (n = `${s}-${i.toUpperCase()}`), n = Js[n] ?? n, Ks.has(n) ? n : i ? bi(s) : ze;
}
function Xs(t, e, i, s) {
  let n;
  const o = () => void Qs(t, e(), s).then((r) => {
    ((n == null ? void 0 : n.lang) !== r.lang || n.t9nLocale !== r.t9nLocale || n.t9nStrings !== r.t9nStrings) && i(r), n = r;
  }).catch(console.error);
  return queueMicrotask(o), Fs(t, ["lang"], o);
}
async function Qs(t, e, i = t.tagName.toLowerCase().split("-").slice(1).join("-")) {
  const { lang: s, t9nLocale: n } = yi(t), o = `${e}/${i}/t9n`, a = (
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    i === null ? {} : await Zs(n, o, "messages.")
  );
  return { lang: s, t9nLocale: n, t9nStrings: a };
}
var $t = (t) => t.replace(en, (e, i) => `${i === 0 ? "" : "-"}${e.toLowerCase()}`), en = /[A-Z]+(?![a-z])|[A-Z]/gu;
function tn(t, e) {
  const i = e / sn;
  let s = 0;
  const n = setInterval(() => {
    s += i, s >= e && (clearInterval(n), t());
  }, i);
  return n;
}
var sn = 4;
function $i(t) {
  return t !== void 0;
}
function nn(t) {
  const e = t.prototype, i = Object.getOwnPropertyDescriptor(e, "innerText");
  if (i !== void 0 && i.get === i.set)
    return;
  const s = /* @__PURE__ */ new Set([
    // We shouldn't be overwriting this property
    "constructor",
    // Called by Lit - we proxy it to this.el in ProxyComponent
    "setAttribute",
    // Called by Lit SSR - we proxy it to this.el in ProxyComponent
    "removeAttribute",
    // Called by Lit - we proxy it to this.el in ProxyComponent
    "isConnected",
    // Called by Lit, but only in dev mode for warnings, so we don't have to proxy.
    "localName",
    // Called by Lit Context - we proxy it to this.el in ProxyComponent.
    // Interestingly, they never call removeEventListener.
    "addEventListener"
  ]), n = {
    addEventListener: "use this.listen() or this.el.addEventListener()"
  };
  Object.entries({
    ...Object.getOwnPropertyDescriptors(HTMLElement.prototype),
    ...Object.getOwnPropertyDescriptors(Element.prototype),
    ...Object.getOwnPropertyDescriptors(Node.prototype),
    ...Object.getOwnPropertyDescriptors(EventTarget.prototype)
  }).forEach(([o, r]) => {
    if (s.has(o))
      return;
    const a = (...c) => {
      if (o === "hasAttribute" && c[0] === "defer-hydration")
        return !1;
      throw new Error(
        `You should not be trying to access this.${o} directly as it won't work correctly in lazy-builds. Instead, ${n[o] ?? `use this.el.${o}`}`
      );
    };
    typeof r.value == "function" ? e[o] = a : Object.defineProperty(e, o, { get: a, set: a });
  });
}
function wi(t) {
  var i, s;
  let e = t;
  for (; e = e.parentNode ?? e.host; )
    if ((i = e == null ? void 0 : e.constructor) != null && i.lumina) {
      const n = e;
      return (s = n.manager) != null && s.loadedCalled || n._offspring.push(t), n._postLoad.promise;
    }
  return !1;
}
var Ae = Object.defineProperty;
function on(t) {
  const e = t.split(Bs);
  return e.length === 1 ? [e[0], $t(e[0])] : e;
}
var rn = globalThis.HTMLElement ?? on, re;
re = class extends rn {
  constructor() {
    super(), this._store = {}, this._pendingAttributes = [], this._postLoad = new J(), this._postLoaded = new J(), this._offspring = [], process.env.NODE_ENV !== "production" && u() && (this._hmrSetProps = /* @__PURE__ */ new Set(), this._hmrSetAttributes = /* @__PURE__ */ new Set(), globalThis.devOnly$createdElements ?? (globalThis.devOnly$createdElements = []), globalThis.devOnly$createdElements.push(new WeakRef(this))), this._saveInstanceProperties();
    const e = this.constructor;
    e._LitConstructor ? this._initializeComponent({ a: e._LitConstructor }) : e._loadPromise.then(this._initializeComponent.bind(this)).catch((i) => {
      this._postLoaded.reject(i), setTimeout(() => {
        throw i;
      });
    }), process.env.NODE_ENV !== "production" && u() && (e._hmrInstances ?? (e._hmrInstances = []), e._hmrInstances.push(new WeakRef(this)), Object.defineProperty(this, "_store", {
      value: this._store,
      enumerable: !1,
      configurable: !0
    }));
  }
  /** @internal */
  static _initializePrototype() {
    var e, i, s;
    (e = this._properties) == null || e.forEach(this._bindProp, this), (i = this._asyncMethods) == null || i.forEach(this._bindAsync, this), (s = this._syncMethods) == null || s.forEach(this._bindSync, this);
  }
  static _bindProp(e) {
    Ae(this.prototype, e, {
      configurable: !0,
      enumerable: !0,
      get() {
        return this._store[e];
      },
      set(i) {
        this._store[e] = i, process.env.NODE_ENV !== "production" && u() && this._hmrSetProps.add(e);
      }
    });
  }
  static _bindAsync(e) {
    Ae(this.prototype, e, {
      async value(...i) {
        return this._litElement || await this._postLoaded.promise, await this._litElement[e](...i);
      },
      configurable: !0
    });
  }
  static _bindSync(e) {
    Ae(this.prototype, e, {
      value(...i) {
        if (process.env.NODE_ENV !== "production" && !this._litElement) {
          const n = this.constructor;
          throw new Error(
            `Tried to call method ${e}() on <${n._name}> component before it's fully loaded. Please do 'await component.componentOnReady();' before calling this method.`
          );
        }
        return this._litElement[e](...i);
      },
      configurable: !0
    });
  }
  get manager() {
    var e;
    return (e = this._litElement) == null ? void 0 : e.manager;
  }
  /**
   * Until the custom element is registered on the page, an instance of that
   * element can be constructed and some properties on that instance set.
   *
   * These properties are set before the element prototype is set to this proxy
   * class and thus none of our getters/setters are yet registered - such
   * properties will be set by JavaScript on the instance directly.
   *
   * Once element is registered, the properties set in the meanwhile will shadow
   * the getter/setters, and thus break reactivity. The fix is to delete these
   * properties from the instance, and re-apply them once accessors are set.
   *
   * @example
   * ```ts
   * import { defineCustomElements } from '@arcgis/map-components';
   * const map = document.createElement('arcgis-map');
   * // This will shadow the getter/setters
   * map.itemId = '...';
   * // This finally defines the custom elements and sets the property accessors
   * defineCustomElements();
   * ```
   *
   * @remarks
   * This is an equivalent of the __saveInstanceProperties method in Lit's
   * ReactiveElement. Lit takes care of this on LitElement, but we have to take
   * care of this on the lazy proxy
   */
  _saveInstanceProperties() {
    var s;
    const e = this.constructor, i = this;
    (s = e._properties) == null || s.forEach((n) => {
      Object.hasOwn(this, n) && (this._store[n] = i[n], delete i[n]);
    });
  }
  /*
   * This method must be statically present rather than added later, or else,
   * browsers won't call it. Same for connected and disconnected callbacks.
   */
  attributeChangedCallback(e, i, s) {
    var n;
    (n = this._litElement) == null || n.attributeChangedCallback(e, i, s), this._litElement || this._pendingAttributes.push(e), process.env.NODE_ENV !== "production" && u() && this._hmrSetAttributes.add(e);
  }
  connectedCallback() {
    var e, i;
    this._litElement ? (i = (e = this._litElement).connectedCallback) == null || i.call(e) : queueMicrotask(() => {
      this._ancestorLoad = wi(this);
    });
  }
  disconnectedCallback() {
    var e, i;
    (i = (e = this._litElement) == null ? void 0 : e.disconnectedCallback) == null || i.call(e);
  }
  /**
   * Create a promise that resolves once component is fully loaded
   */
  async componentOnReady() {
    return await this._postLoaded.promise, this;
  }
  /** @internal */
  _initializeComponent(e) {
    var d;
    const i = this.constructor, s = i._name, n = this._store, o = Object.values(e).find(
      (p) => p.tagName === s
    );
    if (process.env.NODE_ENV !== "production" && u() && !o)
      throw new Error(
        `Unable to find the LitElement class for the "${s}" custom element in the lazy-loaded module`
      );
    const r = process.env.NODE_ENV !== "production" && u() ? (i._hmrIndex ?? 0) === 0 ? `${s}--lazy` : `${s}--lazy-${i._hmrIndex}` : `${s}--lazy`;
    let a = o;
    for (; a && !Object.hasOwn(a, "lumina"); )
      a = Object.getPrototypeOf(a);
    cn(a), !i._LitConstructor && (i._LitConstructor = o, customElements.define(r, o)), o.lazy = this;
    const l = document.createElement(r);
    if (o.lazy = void 0, process.env.NODE_ENV !== "production" && u() ? Object.defineProperty(this, "_litElement", {
      value: l,
      configurable: !0,
      enumerable: !1
    }) : this._litElement = l, this._store = l, this._pendingAttributes.forEach((p) => {
      const g = this.getAttribute(p);
      l.attributeChangedCallback(
        p,
        // Lit doesn't look at this value, thus even if attribute already exists, that's ok
        null,
        g
      );
    }), Object.entries(n).forEach(an, l), process.env.NODE_ENV !== "production" && u()) {
      const p = o.observedAttributes ?? [], g = i.observedAttributes ?? [], $ = p.filter((_) => !g.includes(_)), w = g.filter((_) => !p.includes(_));
      $.length > 0 && console.warn(
        `The following attributes on <${i._name}> are present on the Lit element, but are missing from the lazy proxy component: ${$.join(", ")}. This either indicates a bug in Lumina, or you are creating the attribute dynamically in a way that compiler cannot infer statically. For these attributes, lazy-loading version of your component won't work correctly, thus this must be resolved`
      ), w.length > 0 && console.warn(
        `The following attributes on <${i._name}> are defined on the lazy proxy component, but not on the actual Lit element: ${w.join(", ")}. This either indicates a bug in Lumina, or you are creating the attribute dynamically in a way that compiler cannot infer statically. This is a non-critical issue, but does indicate that something is going wrong and should be fixed`
      );
    }
    const h = this.isConnected;
    (h || this._ancestorLoad) && ((d = l.connectedCallback) == null || d.call(l), h || l.disconnectedCallback());
  }
  /**
   * Implemented on the proxy for compatibility with Lit Context.
   */
  addController() {
  }
  /**
   * Implemented on the proxy for compatibility with Lit Context.
   */
  requestUpdate() {
    var e;
    (e = this._litElement) == null || e.requestUpdate();
  }
}, re.lumina = !0;
function an([t, e]) {
  this[t] = e;
}
function cn(t) {
  const e = t.prototype, i = Element.prototype;
  Object.hasOwn(e, "isConnected") || (e.setAttribute = function(n, o) {
    i.setAttribute.call(this.el, n, o);
  }, e.removeAttribute = function(n) {
    i.removeAttribute.call(this.el, n);
  }, Ae(e, "isConnected", {
    get() {
      return Reflect.get(i, "isConnected", this.el);
    }
  })), process.env.NODE_ENV !== "production" && u() && nn(t);
}
var ge = {};
function ln(t, e) {
  var i;
  if (e) {
    const s = t.constructor.elementProperties;
    t.manager.internals.members = Object.fromEntries(
      Array.from(
        s,
        ([n, o]) => o.noAccessor ? void 0 : [
          n,
          [
            (o.readOnly ? 2048 : 0) | (o.state ? 32 : 16)
          ]
        ]
      ).filter($i)
    );
  } else {
    const s = t.constructor, n = ((i = s.__registerControllers) == null ? void 0 : i.call(s, t)) ?? void 0;
    if (s.__registerControllers = void 0, typeof n != "object")
      throw new Error(
        process.env.NODE_ENV !== "production" && u() ? "Failed to retrieve internal component meta. Make sure you have the useComponentsControllers() Rollup Plugin for Stencil Controllers configured in your Stencil config." : "Failed to retrieve component meta"
      );
    t.manager.internals.members = Object.fromEntries(
      Object.entries(n).filter(([o, [r]]) => (r & 63) !== 0)
    );
  }
}
function hn(t, e = 8) {
  return t == null || typeof t == "object" || typeof t == "function" ? t : (e & 4) !== 0 ? t === "false" ? !1 : t === "" || !!t : (e & 2) !== 0 ? Number.parseFloat(t) : (e & 1) !== 0 ? String(t) : t;
}
var _i = (t, e) => {
  var i, s;
  return (s = (i = t.manager.internals.members) == null ? void 0 : i[e]) == null ? void 0 : s[0];
}, wt = Symbol.for("controller"), _t = "@arcgis/components-controllers", dn = (t) => typeof t == "object" && t !== null && (wt in t || "hostConnected" in t || "hostDisconnected" in t || "hostUpdate" in t || "hostUpdated" in t), oe = process.env.NODE_ENV !== "production" && u() ? (t, e) => {
  const i = t.component.manager, s = "_controllers" in i ? i._controllers : void 0;
  if (s === void 0)
    return;
  const n = Array.from(s).indexOf(t);
  if (n === -1)
    return;
  const o = Symbol.for(`${_t}: devOnlyControllerData`), r = t.component.el;
  r[o] ?? (r[o] = {}), r[o][n] = e;
} : void 0, Ze = process.env.NODE_ENV !== "production" && u() ? (t) => {
  var r;
  const e = t.component.manager, i = "_controllers" in e ? e._controllers : void 0;
  if (i === void 0)
    return;
  const s = Array.from(i).indexOf(t), n = Symbol.for(`${_t}: devOnlyControllerData`);
  return (r = t.component.el[n]) == null ? void 0 : r[s];
} : void 0, ie;
function se(t) {
  ie !== t && (ie = t, queueMicrotask(() => {
    ie === t && (ie = void 0);
  }));
}
function $e(t) {
  if (process.env.NODE_ENV !== "production" && ie === void 0)
    throw new Error(
      [
        `Unable to find out which component ${t || "this"} controller `,
        `belongs to. Possible causes:
`,
        "- You might also have multiple versions of ",
        `@arcgis/components-controllers package installed
`,
        ...u() ? [
          "- You tried to create controller outside the component. If so, ",
          "please wrap your controller definition in an arrow function (like",
          "`const myController = ()=>makeController(...);`) and call that",
          "function inside the component (`my = myController();`), or ",
          "define your controller using makeGenericController/GenericController ",
          `instead.
`,
          "- You tried to create a controller inside an async function. ",
          "This is allowed without calling controller.use(). Make sure you ",
          "use it like `await controller.use(useController())`."
        ] : []
      ].join("")
    );
  return ie;
}
var j = [];
function xi(t) {
  if (t === void 0) {
    j = [];
    return;
  }
  const e = j.indexOf(t);
  j = e === -1 ? [...j, t] : j.slice(0, e + 1), queueMicrotask(() => {
    j = [];
  });
}
function Ei() {
  return j;
}
var ne;
function pn(t) {
  ne !== t && (ne = t, queueMicrotask(() => {
    ne === t && (ne = void 0);
  }));
}
function un() {
  const t = ne;
  return ne = void 0, t;
}
var mn = async (t, e) => {
  const i = xt(t);
  if (i === void 0) {
    if (process.env.NODE_ENV !== "production" && u() && typeof e == "function")
      throw new Error(
        "Unable to resolve a controller from the provided value, so can't watch it's exports. The value you passed is not a controller and not a controller exports. If your controller exports a literal value, try making your controller export an object instead"
      );
    return t;
  }
  if (await i.ready, typeof e == "function") {
    if (process.env.NODE_ENV !== "production" && u() && i.watchExports === void 0)
      throw new Error("The controller must implement watchExports method to support watching exports");
    const s = i.watchExports(
      (n) => e(n, s)
    );
  }
  return i.exports;
}, fn = async (t) => {
  const e = xt(t);
  if (process.env.NODE_ENV !== "production" && u() && e === void 0)
    throw new Error(
      "Unable to resolve a controller from the provided value. The value you passed is not a controller and not a controller exports. If your controller exports a literal value, try making your controller export an object instead"
    );
  return await e.ready, e;
}, xt = (t) => {
  const i = $e().manager.internals.resolveExports(t);
  if (i !== void 0)
    return i;
  if (dn(t))
    return t;
  const s = un();
  if (s !== void 0)
    return s;
}, P = {
  setter: !1,
  getter: !1,
  readOnly: !1
}, Te = /* @__PURE__ */ new WeakMap(), Ci;
Ci = wt;
var Li = class {
  constructor(t) {
    var n, o;
    this._callbacks = {
      hostConnected: [],
      hostDisconnected: [],
      hostLoad: [],
      hostLoaded: [],
      hostUpdate: [],
      hostUpdated: [],
      hostDestroy: [],
      hostLifecycle: []
    }, this._ready = new J(), this._lifecycleCleanups = [], this.connectedCalled = !1, this._loadCalled = !1, this.loadedCalled = !1, this[Ci] = !0, this.ready = this._ready.promise, this._exports = Bt(this), this._exportWatchers = /* @__PURE__ */ new Set();
    const e = vn(t ?? $e(new.target.name));
    process.env.NODE_ENV !== "production" ? (Object.defineProperty(this, "component", {
      writable: !1,
      enumerable: !1,
      configurable: !0,
      value: e
    }), "hostDestroy" in this && ((o = (n = this.component.manager).ensureHasDestroy) == null || o.call(n))) : this.component = e, this.component.addController(this), this.component.manager === void 0 || (xi(this), queueMicrotask(() => this.catchUpLifecycle()));
  }
  /**
   * If controller is being added dynamically, after the component
   * construction, then trigger connected and load right away
   */
  catchUpLifecycle() {
    const { manager: t } = this.component;
    t.connectedCalled && !this.connectedCalled && this.triggerConnected(), t._loadCalled && this.triggerLoad().then(() => {
      t.loadedCalled && this.triggerLoaded();
    }).catch(console.error);
  }
  get exports() {
    return this._exports;
  }
  /**
   * Set controller's exports property (for usage with proxyExports()) and mark
   * controller as ready (for usage in other controllers). Also, triggers
   * re-render of the component
   */
  set exports(t) {
    const e = this._exports;
    e !== t && (this._exports = t, this._exportWatchers.forEach(y), this.connectedCalled && this.assignedProperty !== !1 && this.component.requestUpdate(this.assignedProperty, e)), this._ready.resolve(t);
  }
  setProvisionalExports(t, e = !0) {
    this._exports = e ? Bt(t) : t, this._exportWatchers.forEach(y);
  }
  watchExports(t) {
    const e = () => t(this._exports);
    return this._exportWatchers.add(e), () => void this._exportWatchers.delete(e);
  }
  /**
   * A flexible utility for making sure a controller is loaded before it's used,
   * regardless of how or where a controller was defined:
   *
   * @example
   * makeGenericController(async (component, controller) => {
   *   // Await some controller from the component:
   *   await controller.use(component.someController);
   *   // Initialize new controllers
   *   await controller.use(load(importCoreReactiveUtils));
   *   await controller.use(new ViewModelController(component,newWidgetsHomeHomeViewModel));
   *   await controller.use(someController(component));
   * });
   *
   * @remarks
   * If your controller is not async, and you are not creating it async, then
   * you are not required to use controller.use - you can use it directly.
   * Similarly, accessing controllers after componentWillLoad callback does not
   * require awaiting them as they are guaranteed to be loaded by then.
   */
  get use() {
    return se(this.component), mn;
  }
  /**
   * Just like controller.use, but returns the controller itself, rather than it's
   * exports
   *
   * Use cases:
   * - You have a controller and you want to make sure it's loaded before you
   *   try to use it
   * - Your controller is not using exports, so you wish to access some props on
   *   it directly
   * - You have a controller exports only, and you want to retrieve the
   *   controller itself. This is useful if you wish to call .watchExports() or
   *   some other method on the controller
   */
  get useRef() {
    return se(this.component), fn;
  }
  /**
   * Like useRef, but doesn't wait for the controller to get ready
   *
   * @internal
   */
  get useRefSync() {
    return se(this.component), xt;
  }
  controllerRemoved() {
    this.component.el.isConnected && this.triggerDisconnected(), this.triggerDestroy();
  }
  // Register a lifecycle callback
  onConnected(t) {
    this._callbacks.hostConnected.push(t);
  }
  onDisconnected(t) {
    this._callbacks.hostDisconnected.push(t);
  }
  onLoad(t) {
    this._callbacks.hostLoad.push(t);
  }
  onLoaded(t) {
    this._callbacks.hostLoaded.push(t);
  }
  onUpdate(t) {
    this._callbacks.hostUpdate.push(t);
  }
  onUpdated(t) {
    this._callbacks.hostUpdated.push(t);
  }
  onDestroy(t) {
    var e, i;
    process.env.NODE_ENV !== "production" && u() && ((i = (e = this.component.manager).ensureHasDestroy) == null || i.call(e)), this._callbacks.hostDestroy.push(t);
  }
  onLifecycle(t) {
    this._callbacks.hostLifecycle.push(t), this.connectedCalled && this.component.el.isConnected && this._callLifecycle(t);
  }
  // Call each lifecycle hook
  /** @internal */
  triggerConnected() {
    const t = this;
    t.hostConnected && y(t.hostConnected, t), this._callbacks.hostConnected.forEach(y), this.triggerLifecycle(), this.connectedCalled = !0;
  }
  /** @internal */
  triggerDisconnected() {
    const t = this;
    t.hostDisconnected && y(t.hostDisconnected, t), this._callbacks.hostDisconnected.forEach(y), this._lifecycleCleanups.forEach(y), this._lifecycleCleanups = [];
  }
  /** @internal */
  async triggerLoad() {
    if (this._loadCalled)
      return;
    this._loadCalled = !0;
    const t = this;
    t.hostLoad && await pt(t.hostLoad, t), this._callbacks.hostLoad.length > 0 && await Promise.allSettled(this._callbacks.hostLoad.map(pt)), this._ready.resolve(this._exports);
  }
  /** @internal */
  triggerLoaded() {
    if (this.loadedCalled)
      return;
    const t = this;
    t.hostLoaded && y(t.hostLoaded, t), this._callbacks.hostLoaded.forEach(y), this.loadedCalled = !0;
  }
  /** @internal */
  triggerUpdate(t) {
    const e = this;
    e.hostUpdate && y(e.hostUpdate, e, t), this._callbacks.hostUpdate.forEach(Vt, t);
  }
  /** @internal */
  triggerUpdated(t) {
    const e = this;
    e.hostUpdated && y(e.hostUpdated, e, t), this._callbacks.hostUpdated.forEach(Vt, t);
  }
  /** @internal */
  triggerDestroy() {
    const t = this;
    t.hostDestroy && y(t.hostDestroy, t), this._callbacks.hostDestroy.forEach(y);
  }
  /** @internal */
  triggerLifecycle() {
    const t = this;
    t.hostLifecycle && this._callLifecycle(() => t.hostLifecycle()), this._callbacks.hostLifecycle.forEach(this._callLifecycle, this);
  }
  _callLifecycle(t) {
    se(this.component);
    const e = y(t);
    (Array.isArray(e) ? e : [e]).forEach((s) => {
      typeof s == "function" ? this._lifecycleCleanups.push(s) : typeof s == "object" && typeof s.remove == "function" && this._lifecycleCleanups.push(s.remove);
    });
  }
};
function Vt(t) {
  y(t, void 0, this);
}
var Et = Li;
function Bt(t) {
  if (typeof t != "object" && typeof t != "function" || t === null)
    return t;
  const e = new Proxy(t, {
    get(i, s, n) {
      if (!(gn.has(s) && s in i && i[s] === e)) {
        if (s in i || s in Promise.prototype || typeof s == "symbol")
          return typeof i == "function" ? i[s] : Reflect.get(i, s, n);
        if (process.env.NODE_ENV !== "production" && u()) {
          if (process.env.NODE_ENV === "test" && (s.startsWith("$$") || s.startsWith("@@") || s === "nodeType" || s === "tagName" || s === "toJSON" || s === "hasAttribute"))
            return;
          console.error(
            `Trying to access "${s.toString()}" on the controller before it's loaded. ${Ht}`
          );
        }
      }
    },
    set: (i, s, n, o) => (process.env.NODE_ENV !== "production" && u() && console.error(`Trying to set "${s.toString()}" on the controller before it's loaded. ${Ht}`), Reflect.set(i, s, n, o))
  });
  return e;
}
var gn = /* @__PURE__ */ new Set(["exports", "_exports"]), Ht = process.env.NODE_ENV !== "production" && u() ? [
  "This might be the case if you are trying to access an async controller in ",
  "connectedCallback(). Or, if you are using it inside of ",
  "componentWillLoad()/another controller without controller.use. Example correct ",
  `usage:
`,
  "makeController(async (component, controller)=>{ await controller.use(someOtherController); });"
].join("") : void 0;
function vn(t) {
  if (process.env.NODE_ENV !== "production" && u()) {
    if ("addController" in t)
      return t;
    throw new Error(
      "Component does not implement ControllerHost. This might be because you forgot to add 'manager: Controller<this> = useControllerManager(this);' in your component, or you tried to use some controller before that line"
    );
  } else
    return t;
}
function yn(t, e, i) {
  const s = Object.keys(t), n = s.length;
  O === void 0 && queueMicrotask(Ct), O ?? (O = /* @__PURE__ */ new Map());
  let o = O.get(t);
  return o === void 0 && (o = { callbacks: [], keyCount: n }, O.set(t, o)), o.keyCount !== n && (o.callbacks.forEach((r) => r(s)), o.callbacks = [], o.keyCount = n), o.callbacks.push((r) => {
    const a = (l) => y(e, null, l), c = r[n];
    c === void 0 ? a(void 0) : t[c] === i ? a(c) : a(void 0);
  }), i;
}
var O = void 0;
function Ct() {
  Array.from((O == null ? void 0 : O.entries()) ?? []).forEach(([t, { callbacks: e }]) => {
    const i = Object.keys(t);
    e.forEach((s) => s(i));
  }), O = void 0;
}
function ae(t, e, i) {
  var s;
  const n = e;
  if (process.env.NODE_ENV !== "production" && u() && _i(t, n) === void 0)
    throw new Error(
      t.manager.isLit ? `Trying to watch a non-@property, non-@state property "${n}". Either convert it into a @state() to be able to use watch() on it, or use the get/set syntax` : `Trying to watch a non-@Prop, non-@State property "${n}". Convert it into a @State() or @Prop property if you need to use watch() on it`
    );
  const o = t.manager.internals;
  (s = o.allWatchers)[n] ?? (s[n] = []);
  const r = o.allWatchers[n], a = i, c = (l, h, d) => y(a, null, l, h, d);
  return r.push(c), () => {
    const l = r.indexOf(c);
    l !== -1 && r.splice(l, 1);
  };
}
var bn = class {
  constructor(t) {
    this.enabledWatchers = {}, this.allWatchers = {}, this.enableReadonly = () => {
      if (this.enableReadonly = void 0, !this.component.manager.isLit)
        return;
      const e = this.component.manager.internals;
      Object.entries(e.members).forEach(([i, [s]]) => {
        var n;
        s & 2048 && ((n = e.setters)[i] ?? (n[i] = []), e.setters[i].push(e.readonlySetter));
      });
    }, this.trackedValue = ut, this.keyTrackers = [], this.getters = {}, this.setters = {}, this.accessorGetter = {}, this.accessorSetter = {}, this._exports = /* @__PURE__ */ new WeakMap(), this.readonlySetter = (e, i, s) => {
      if (P.readOnly)
        return e;
      throw new Error(
        `Cannot assign to read-only property "${s}" of ${this.component.el.tagName.toLowerCase()}. Trying to assign "${String(
          e
        )}"`
      );
    }, process.env.NODE_ENV !== "production" ? Object.defineProperty(this, "component", {
      writable: !1,
      enumerable: !1,
      configurable: !0,
      value: t
    }) : this.component = t;
  }
  firePropTrackers(t, e) {
    const i = this.keyTrackers;
    this.trackedValue = ut, this.keyTrackers = [], i.forEach((s) => s(t, e));
  }
  // REFACTOR: once Stencil is no longer supported, simplify this with Lit's getPropertyDescriptor(), or https://github.com/shoelace-style/shoelace/issues/1990
  /**
   * Configure a getter or setter for a given \@Prop/\@State
   *
   * Since props are defined on the prototype, they are shared between all
   * instances of a component. Thus, instead of passing a reference to the
   * getter/setter function, you should update the
   * ComponentInternals.getters/setters properties, and then call getSetProxy
   * to apply the changes to the prototype
   */
  getSetProxy(t) {
    const e = this.component, i = e.constructor.prototype;
    if (this._getSetProxy(i, t, "class"), e.manager.isLit)
      return;
    const s = e.el.constructor.prototype;
    i !== s && this._getSetProxy(s, t, "html");
  }
  _getSetProxy(t, e, i) {
    const s = this.component, n = _i(s, e);
    let o;
    do
      o = Object.getOwnPropertyDescriptor(t, e);
    while (!o && (t = Object.getPrototypeOf(t)));
    if (process.env.NODE_ENV !== "production" && u()) {
      const $ = i === "html";
      if ((o == null ? void 0 : o.set) === void 0 || o.get === void 0) {
        if (o !== void 0 && "value" in o)
          throw new Error(
            `getSet() should only be used on @Prop/@property/@State/@state properties. For internal component properties, use regular get/set syntax. Tried to use it on "${e}" in ${s.el.tagName}`
          );
        if ($)
          return;
        throw new Error(`Unable to find "${e}" property on the ${s.el.tagName} component`);
      }
      if (n === void 0)
        throw new Error("Unable to retrieve prop type");
    } else if (!o)
      return;
    const r = o.get, a = o.set, c = Ee in r, l = Ee in a;
    if (c && l)
      return;
    const h = !c, d = !l, p = h ? function() {
      let w = r.call(this);
      const _ = Te.get(this);
      if (P.getter || _ === void 0)
        return w;
      const X = _.manager.internals;
      w = X.accessorGetter[e](w, e);
      const C = X.getters[e] ?? Xe;
      for (let S = 0; S < C.length; S++)
        w = C[S](w, e);
      return w;
    } : r, g = d ? function(w) {
      var Ut;
      const _ = r.call(this), X = Te.get(this);
      if (X === void 0) {
        a.call(this, w);
        return;
      }
      let C = X.manager.isLit ? (
        /*
         * Cast `null` to `undefined`.
         * See https://devtopia.esri.com/WebGIS/arcgis-web-components/discussions/1299
         */
        w ?? void 0
      ) : hn(w, n);
      const S = X.manager.internals;
      if (C === _)
        a.call(this, C);
      else {
        const Nt = P.setter ? Xe : S.setters[e] ?? Xe;
        for (let le = 0; le < Nt.length && (C = Nt[le](C, _, e), C !== _); le++)
          ;
        C = S.accessorSetter[e](C, _, e), a.call(this, C), C !== _ && ((Ut = S.enabledWatchers[e]) == null || Ut.forEach((le) => le(C, _, e)));
      }
      S.keyTrackers.length > 0 && (S == null || S.firePropTrackers(e, w));
    } : a;
    h && (p[Ee] = !0), d && (g[Ee] = !0), Object.defineProperty(t, e, {
      ...o,
      get: p,
      set: g
    });
  }
  /**
   * Associate an exports object with a controller for reverse lookup in
   * controller.use
   */
  markExports(t, e) {
    (typeof e == "object" && e !== null || typeof e == "function") && this._exports.set(e, t);
  }
  resolveExports(t) {
    if (typeof t == "object" && t !== null || typeof t == "function")
      return this._exports.get(t);
  }
}, Xe = [], Ee = Symbol(), ut = process.env.NODE_ENV !== "production" ? Symbol.for(
  // Use Symbol.for in dev mode to make it easier to maintain state when doing HMR.
  `${_t}: nothing`
) : (
  // eslint-disable-next-line symbol-description
  Symbol()
);
function ki(t, e, i) {
  const s = t.manager.internals;
  return s.trackedValue !== ut && s.trackedValue !== i && s.firePropTrackers(void 0, void 0), s.keyTrackers.length === 0 && queueMicrotask(() => s.firePropTrackers(void 0, void 0)), s.trackedValue = i, s.keyTrackers.push((n, o) => y(e, void 0, i === o ? n : void 0)), i;
}
function We(t = [
  $e(),
  ...Ei()
], e, i) {
  const s = Array.isArray(t) ? t : [t];
  let n = s.length + 1;
  const o = (a) => {
    n -= 1, a !== void 0 && (n = Math.min(n, 0)), n === 0 && e(a);
  };
  s.forEach(
    (a) => yn(
      a,
      (c) => o(
        c === void 0 ? void 0 : {
          key: c,
          host: a,
          isReactive: !1
        }
      ),
      i
    )
  );
  const r = s.find(
    (a) => "manager" in a && typeof a.manager == "object" && a.manager.component === a
  );
  return r && ki(
    r,
    (a) => o(
      a === void 0 ? void 0 : {
        key: a,
        host: r,
        isReactive: !0
      }
    ),
    i
  ), i;
}
function $n(t) {
  P.setter = !0;
  try {
    return t();
  } finally {
    P.setter = !1;
  }
}
function wn(t) {
  P.getter = !0;
  try {
    return t();
  } finally {
    P.getter = !1;
  }
}
function _n(t) {
  P.readOnly = !0;
  try {
    return t();
  } finally {
    P.readOnly = !1;
  }
}
var Si = (t) => (...e) => {
  const i = Ei(), s = new t(...e), n = s.exports;
  xi(i.at(-1));
  const o = s.component.manager.internals;
  o.markExports(s, n), s.watchExports((a) => o.markExports(s, a)), pn(s);
  const r = [s.component, ...i].reverse();
  return We(
    r,
    (a) => a === void 0 ? void 0 : xn(s, a, n),
    n
  );
};
function xn(t, { host: e, key: i, isReactive: s }, n) {
  const o = e, r = o[i] !== t.exports, a = o[i] !== n, c = n !== t.exports;
  if (r && !a && c && (o[i] = t.exports), e === t.component) {
    if (s) {
      const h = t.component.manager.internals;
      a && h.markExports(t, o[i]), ae(t.component, i, (d) => {
        d !== t.exports && h.markExports(t, d);
      });
    }
    t.assignedProperty = s ? void 0 : i;
  }
  t.watchExports(() => {
    var p;
    if (o[i] === t.exports)
      return;
    const h = t.component.manager;
    ((p = h.internals.setters[i]) == null ? void 0 : p.includes(h.internals.readonlySetter)) ? _n(() => {
      o[i] = t.exports;
    }) : o[i] = t.exports;
  });
}
var En = (t, e) => new Ai(t, e), Ai = class extends Et {
  constructor(t, e) {
    const i = "addController" in t;
    process.env.NODE_ENV !== "production" && u() && !i && Object.defineProperty(t.el, "__component", {
      value: t
    });
    const s = /* @__PURE__ */ new Set();
    function n(c) {
      var l;
      s.add(c), !(wt in c) && t.renderRoot && t.el.isConnected && ((l = c.hostConnected) == null || l.call(c));
    }
    function o(c) {
      var l;
      s.delete(c), (l = c.controllerRemoved) == null || l.call(c);
    }
    const r = t;
    if (r.addController = n, r.removeController = o, !i) {
      const c = e ?? t.constructor.__forceUpdate;
      r.requestUpdate = () => c(t);
    }
    if (process.env.NODE_ENV !== "production" && u() && (Object.entries({
      componentDidLoad: "loaded",
      componentDidRender: "updated",
      componentDidUpdate: "updated",
      componentShouldUpdate: "shouldUpdate",
      componentWillLoad: "load",
      componentWillRender: "willUpdate",
      componentWillUpdate: "willUpdate"
    }).forEach(([l, h]) => {
      if (i && l in t)
        throw new Error(
          `Unexpected ${l}() in a Lit component ${t.el.tagName.toLowerCase()}. In Lit, you should use ${h}() instead`
        );
      if (!i && h in t)
        throw new Error(
          `Unexpected ${h}() in a Stencil component ${t.el.tagName.toLowerCase()}. In Stencil, you should use ${h}() instead`
        );
    }), i)) {
      let l = 0, h = !1;
      for (let d = t; !h; l++) {
        if (d === null)
          throw new Error("Expected controllers to be used in a LitElement class");
        if (Object.hasOwn(d, "_load")) {
          h = !0;
          break;
        }
        d = Object.getPrototypeOf(d);
      }
      if (l < 1)
        throw new Error(
          "It looks like you are trying to call useControllerManager in a component that uses LitElement imported from 'lit'. useControllerManager should only be used in the LitElement coming from `@arcgis/lumina`"
        );
    }
    super(t), this.internals = new bn(this.component), this.destroyed = !1, this._updatePromise = new J(), this._originalLifecycles = {}, this.isLit = i, this.component.manager = this, ln(t, i), this._controllers = s, this.exports = void 0, this.hasDestroy = Oe in this.component && typeof this.component.destroy == "function", this._bindLifecycleMethods();
    const a = this.internals;
    Object.keys(a.members).forEach((c) => {
      a.accessorGetter[c] = Wt, a.accessorSetter[c] = Wt, a.getSetProxy(c);
    }), i ? this.internals.enabledWatchers = this.internals.allWatchers : Object.defineProperty(t, "updateComplete", {
      get: async () => await this._updatePromise.promise
    }), queueMicrotask(a.enableReadonly), se(t), Te.set(t.el, t), Te.set(t, t);
  }
  _bindLifecycleMethods() {
    const t = this.component, e = this.isLit, i = t.el === t;
    this._originalLifecycles = {
      // These component's callbacks will be called by Lit, so we don't have to
      _connectedCallback: e || i ? void 0 : t.connectedCallback,
      _disconnectedCallback: e || i ? void 0 : t.disconnectedCallback,
      _load: e ? t.load : t.componentWillLoad,
      _loaded: e ? t.loaded : t.componentDidLoad,
      _willUpdate: e ? void 0 : t.componentWillUpdate,
      _updated: e ? void 0 : t.componentDidUpdate,
      _destroy: t.destroy
    };
    const s = this._connectedCallback.bind(this), n = this._disconnectedCallback.bind(this), o = this._update.bind(this), r = this._updated.bind(this);
    e ? t.constructor.prototype.addController.call(t, {
      // Lit will call these callbacks
      hostConnected: s,
      hostDisconnected: n,
      hostUpdate: o,
      hostUpdated: r
    }) : (t.connectedCallback = s, t.disconnectedCallback = n, t.componentWillLoad = this._load.bind(this), t.componentDidLoad = this._loaded.bind(this), t.componentWillUpdate = o, t.componentDidUpdate = r), this.hasDestroy && (t.destroy = this.destroy.bind(this));
  }
  /**
   * Private because this is not supposed to be called by Component directly.
   * Instead, _bindLifecycleMethods will take care of that. Otherwise, you risk
   * calling lifecycle methods twice.
   *
   * @internal
   */
  _connectedCallback() {
    var e, i;
    if (this.destroyed) {
      const s = this.component.el.tagName.toLowerCase();
      throw this.component.el.remove(), new Error(
        `The ${s} component has already been destroyed. It cannot be used again. If you meant to disconnect and reconnect a component without automatic destroy, set the ${Oe} prop.`
      );
    }
    this._autoDestroyTimeout !== void 0 && clearTimeout(this._autoDestroyTimeout);
    const t = this.internals;
    t.enabledWatchers = t.allWatchers, Ct(), (e = t.enableReadonly) == null || e.call(t), this._controllers.forEach(Cn), (i = this._originalLifecycles._connectedCallback) == null || i.call(this.component), process.env.NODE_ENV !== "production" && u() && (oe == null || oe(this, !0));
  }
  /** @internal */
  _disconnectedCallback() {
    var t;
    this.destroyed || (this._controllers.forEach(Ln), (t = this._originalLifecycles._disconnectedCallback) == null || t.call(this.component), this.hasDestroy && this._setAutoDestroyTimeout());
  }
  /** @internal */
  async _load() {
    var t;
    await Promise.allSettled(Array.from(this._controllers, kn)), await ((t = this._originalLifecycles._load) == null ? void 0 : t.call(this.component)), this.hasDestroy && ae(this.component, Oe, () => this._setAutoDestroyTimeout());
  }
  /** @internal */
  _loaded() {
    var t;
    this._controllers.forEach(Sn), (t = this._originalLifecycles._loaded) == null || t.call(this.component);
  }
  _update() {
    var e;
    const t = this.component;
    return this._controllers.forEach(An, t.$changes), (e = this._originalLifecycles._willUpdate) == null ? void 0 : e.call(this.component);
  }
  _updated() {
    var e;
    const t = this.component;
    if (this._controllers.forEach(On, t.$changes), (e = this._originalLifecycles._updated) == null || e.call(this.component), this.isLit)
      t.$changes = /* @__PURE__ */ new Map();
    else {
      const i = this._updatePromise;
      this._updatePromise = new J(), i.resolve(!0);
    }
  }
  async destroy() {
    var t, e;
    if (process.env.NODE_ENV !== "production" && u() && ((t = this.ensureHasDestroy) == null || t.call(this)), !this.destroyed) {
      if (this.component.el.isConnected) {
        this.hasDestroy = !1;
        try {
          this.component.el.remove();
        } finally {
          this.hasDestroy = !0;
        }
      }
      this._autoDestroyTimeout = void 0, this.destroyed = !0, this._controllers.forEach(Pn), this._controllers.clear(), await ((e = this._originalLifecycles._destroy) == null ? void 0 : e.call(this.component));
    }
  }
  _setAutoDestroyTimeout() {
    if (this._autoDestroyTimeout !== void 0 && clearTimeout(this._autoDestroyTimeout), !this.component.el.isConnected && !this.component.autoDestroyDisabled) {
      const t = () => void this.destroy().catch(console.error);
      process.env.NODE_ENV !== "production" && u() && Ft === 0 || (this._autoDestroyTimeout = tn(t, Ft));
    }
  }
};
process.env.NODE_ENV !== "production" && u() && (Ai.prototype.ensureHasDestroy = function() {
  if (!this.hasDestroy)
    throw new Error(
      `
          If the component uses a controller that uses destroy() method, then the
          component must have the following properties:
          /**
           * If true, the component will not be destroyed automatically when it is
           * disconnected from the document. This is useful when you want to move the
           * component to a different place on the page, or temporarily hide it. If this
           * is set, make sure to call the \`destroy\` method when you are done to prevent
           * memory leaks.
           */
          @${this.isLit ? "property" : "Prop"}() ${Oe} = false;
          
          /** Permanently destroy the component */
          @${this.isLit ? "method" : "Method"}()
          async destroy(): Promise<void> {
            await this.manager.destroy();
          }
          `.trim().split(`
`).map((e) => e.trim()).join(`
`)
    );
});
var Oe = "autoDestroyDisabled", Ft = 1e3;
process.env.NODE_ENV !== "production" && u();
var Wt = (t) => t;
function Cn(t) {
  "triggerConnected" in t ? t.triggerConnected() : y(t.hostConnected, t);
}
function Ln(t) {
  "triggerDisconnected" in t ? t.triggerDisconnected() : y(t.hostDisconnected, t);
}
async function kn(t) {
  "triggerLoad" in t ? await t.triggerLoad() : await pt(t.hostLoad, t);
}
function Sn(t) {
  "triggerLoaded" in t ? t.triggerLoaded() : y(t.hostLoaded, t);
}
function An(t) {
  "triggerUpdate" in t ? t.triggerUpdate(this) : y(t.hostUpdate, t, this);
}
function On(t) {
  "triggerUpdated" in t ? t.triggerUpdated(this) : y(t.hostUpdated, t, this);
}
function Pn(t) {
  "triggerDestroy" in t ? t.triggerDestroy() : y(t.hostDestroy, t);
}
var Dn = (t) => Tn(void 0, t), zn = class extends Li {
  constructor(t, e) {
    super(t);
    const i = this.exports;
    try {
      se(this.component);
      const s = e(this.component, this), n = this.exports !== i;
      if (s instanceof Promise) {
        n || this.setProvisionalExports(s);
        const o = s.then((r) => {
          this.exports = r, super.catchUpLifecycle();
        }).catch((r) => {
          this._ready.reject(r), console.error(r);
        });
        this.onLoad(async () => await o);
      } else
        (!n || s !== void 0) && (this.exports = s), queueMicrotask(() => super.catchUpLifecycle());
    } catch (s) {
      this._ready.reject(s), console.error(s);
    }
  }
  /** Noop - will be called in the constructor instead */
  catchUpLifecycle() {
  }
}, Tn = Si(zn), Oi = (t) => (e = {}) => (
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  Dn((i, s) => {
    const n = yi(i.el), o = {
      _lang: n.lang,
      _t9nLocale: n.t9nLocale,
      _loading: !0
    }, r = i;
    s.onLifecycle(
      () => Xs(
        i.el,
        () => t("./assets"),
        ({ t9nLocale: c, t9nStrings: l, lang: h }) => {
          const d = {
            ...l,
            _lang: h,
            _t9nLocale: c,
            _loading: !1
          };
          s.exports = d;
          const p = l.componentLabel;
          typeof p == "string" && "label" in i && i.label == null && (i.label ?? (i.label = p)), a(r.messageOverrides);
        },
        e.name
      )
    );
    function a(c) {
      const l = s.exports, h = l._original ?? l, d = Pi(h, c);
      c && (d._original = h), s.exports = d;
    }
    return "messageOverrides" in r && s.onLifecycle(() => ae(r, "messageOverrides", a)), e.blocking ? (s.setProvisionalExports(o, !1), s.ready) : o;
  })
);
function Pi(t, e) {
  if (!e)
    return t;
  const i = { ...t };
  return Object.entries(e).forEach(([s, n]) => {
    typeof n == "object" ? i[s] = Pi(t[s], n) : i[s] = n ?? t[s];
  }), i;
}
var Un = (t) => Nn, Qe = "arcgisPropertyChange";
function Nn(...t) {
  const e = $e();
  let s = e[Qe];
  if (e.manager.isLit && (s = e.constructor.$createEvent(Qe, void 0, e), process.env.NODE_ENV !== "production" && u() && (typeof s != "object" || s === null || !("emit" in s) || typeof s.emit != "function")))
    throw new Error(`Expected to find $createEvent static property on Lumina's LitElement"`);
  if (process.env.NODE_ENV !== "production" && u()) {
    if (typeof s != "object" || s === null || !("emit" in s) || typeof s.emit != "function")
      throw new Error(
        "For consistency, usePropertyChange must be assigned to an arcgisPropertyChange property that has an @Event() decorator"
      );
    const n = new Set(
      Object.entries(e.manager.internals.members).filter(([o, [r]]) => (r & 31) !== 0).map(([o]) => o)
    );
    t.forEach((o) => {
      if (!n.has(o))
        throw new Error(
          o in e ? `For usePropertyChange to emit event on "${o}" property change, you should add @${e.manager.isLit ? "property" : "Prop"}() to ${o} in ${e.el.tagName.toLowerCase()}` : `usePropertyChange can't emit event on "${o}" property change as such property does not exist in ${e.el.tagName.toLowerCase()}`
        );
    });
  }
  return e.manager.onLoad(
    () => e.manager.onLifecycle(
      () => t.map(
        (n) => (
          // Casting to 'el' to simplify dynamic prop name typing
          ae(e, n, () => s.emit({ name: n }))
        )
      )
    )
  ), process.env.NODE_ENV !== "production" && u() && e.manager.isLit && We(
    e,
    (n) => {
      if (n === void 0 || n.isReactive || n.key !== Qe)
        throw new Error(
          'For consistency, usePropertyChange must be assigned to an arcgisPropertyChange property and that property should not have @property() or @state() decorators: arcgisPropertyChange = usePropertyChange<this>()("prop1", "prop2");'
        );
    },
    s
  ), s;
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pe = globalThis, Lt = Pe.ShadowRoot && (Pe.ShadyCSS === void 0 || Pe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, kt = Symbol(), Gt = /* @__PURE__ */ new WeakMap();
let Di = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== kt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Lt && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = Gt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Gt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Mn = (t) => new Di(typeof t == "string" ? t : t + "", void 0, kt), we = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[o + 1], t[0]);
  return new Di(i, t, kt);
}, Rn = (t, e) => {
  if (Lt) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), n = Pe.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, t.appendChild(s);
  }
}, qt = Lt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return Mn(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: In, defineProperty: jn, getOwnPropertyDescriptor: Vn, getOwnPropertyNames: Bn, getOwnPropertySymbols: Hn, getPrototypeOf: Fn } = Object, N = globalThis, Yt = N.trustedTypes, Wn = Yt ? Yt.emptyScript : "", et = N.reactiveElementPolyfillSupport, de = (t, e) => t, mt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Wn : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, zi = (t, e) => !In(t, e), Kt = { attribute: !0, type: String, converter: mt, reflect: !1, hasChanged: zi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), N.litPropertyMetadata ?? (N.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ee = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Kt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(e, s, i);
      n !== void 0 && jn(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: n, set: o } = Vn(this.prototype, e) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get() {
      return n == null ? void 0 : n.call(this);
    }, set(r) {
      const a = n == null ? void 0 : n.call(this);
      o.call(this, r), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Kt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(de("elementProperties"))) return;
    const e = Fn(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(de("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(de("properties"))) {
      const i = this.properties, s = [...Bn(i), ...Hn(i)];
      for (const n of s) this.createProperty(n, i[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, n] of i) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const n = this._$Eu(i, s);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const n of s) i.unshift(qt(n));
    } else e !== void 0 && i.push(qt(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((i) => i(this));
  }
  addController(e) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) == null || i.call(e));
  }
  removeController(e) {
    var i;
    (i = this._$EO) == null || i.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Rn(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostDisconnected) == null ? void 0 : s.call(i);
    });
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$EC(e, i) {
    var o;
    const s = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, s);
    if (n !== void 0 && s.reflect === !0) {
      const r = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : mt).toAttribute(i, s.type);
      this._$Em = e, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var o;
    const s = this.constructor, n = s._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const r = s.getPropertyOptions(n), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : mt;
      this._$Em = n, this[n] = a.fromAttribute(i, r.type), this._$Em = null;
    }
  }
  requestUpdate(e, i, s) {
    if (e !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(e)), !(s.hasChanged ?? zi)(this[e], i)) return;
      this.P(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(e, i, s) {
    this._$AL.has(e) || this._$AL.set(e, i), s.reflect === !0 && this._$Em !== e && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(e);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, r] of n) r.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], r);
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(i)) : this._$EU();
    } catch (n) {
      throw e = !1, this._$EU(), n;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach((s) => {
      var n;
      return (n = s.hostUpdated) == null ? void 0 : n.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((i) => this._$EC(i, this[i]))), this._$EU();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
ee.elementStyles = [], ee.shadowRootOptions = { mode: "open" }, ee[de("elementProperties")] = /* @__PURE__ */ new Map(), ee[de("finalized")] = /* @__PURE__ */ new Map(), et == null || et({ ReactiveElement: ee }), (N.reactiveElementVersions ?? (N.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = globalThis, Ue = pe.trustedTypes, Jt = Ue ? Ue.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ti = "$lit$", z = `lit$${Math.random().toFixed(9).slice(2)}$`, Ui = "?" + z, Gn = `<${Ui}>`, Z = document, ve = () => Z.createComment(""), ye = (t) => t === null || typeof t != "object" && typeof t != "function", St = Array.isArray, qn = (t) => St(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", tt = `[ 	
\f\r]`, he = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Zt = /-->/g, Xt = />/g, I = RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Qt = /'/g, ei = /"/g, Ni = /^(?:script|style|textarea|title)$/i, Mi = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), f = Mi(1), ft = Mi(2), M = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), ti = /* @__PURE__ */ new WeakMap(), H = Z.createTreeWalker(Z, 129);
function Ri(t, e) {
  if (!St(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Jt !== void 0 ? Jt.createHTML(e) : e;
}
const Yn = (t, e) => {
  const i = t.length - 1, s = [];
  let n, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = he;
  for (let a = 0; a < i; a++) {
    const c = t[a];
    let l, h, d = -1, p = 0;
    for (; p < c.length && (r.lastIndex = p, h = r.exec(c), h !== null); ) p = r.lastIndex, r === he ? h[1] === "!--" ? r = Zt : h[1] !== void 0 ? r = Xt : h[2] !== void 0 ? (Ni.test(h[2]) && (n = RegExp("</" + h[2], "g")), r = I) : h[3] !== void 0 && (r = I) : r === I ? h[0] === ">" ? (r = n ?? he, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, l = h[1], r = h[3] === void 0 ? I : h[3] === '"' ? ei : Qt) : r === ei || r === Qt ? r = I : r === Zt || r === Xt ? r = he : (r = I, n = void 0);
    const g = r === I && t[a + 1].startsWith("/>") ? " " : "";
    o += r === he ? c + Gn : d >= 0 ? (s.push(l), c.slice(0, d) + Ti + c.slice(d) + z + g) : c + z + (d === -2 ? a : g);
  }
  return [Ri(t, o + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class be {
  constructor({ strings: e, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = e.length - 1, c = this.parts, [l, h] = Yn(e, i);
    if (this.el = be.createElement(l, s), H.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = H.nextNode()) !== null && c.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(Ti)) {
          const p = h[r++], g = n.getAttribute(d).split(z), $ = /([.?@])?(.*)/.exec(p);
          c.push({ type: 1, index: o, name: $[2], strings: g, ctor: $[1] === "." ? Jn : $[1] === "?" ? Zn : $[1] === "@" ? Xn : Ge }), n.removeAttribute(d);
        } else d.startsWith(z) && (c.push({ type: 6, index: o }), n.removeAttribute(d));
        if (Ni.test(n.tagName)) {
          const d = n.textContent.split(z), p = d.length - 1;
          if (p > 0) {
            n.textContent = Ue ? Ue.emptyScript : "";
            for (let g = 0; g < p; g++) n.append(d[g], ve()), H.nextNode(), c.push({ type: 2, index: ++o });
            n.append(d[p], ve());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ui) c.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(z, d + 1)) !== -1; ) c.push({ type: 7, index: o }), d += z.length - 1;
      }
      o++;
    }
  }
  static createElement(e, i) {
    const s = Z.createElement("template");
    return s.innerHTML = e, s;
  }
}
function ce(t, e, i = t, s) {
  var r, a;
  if (e === M) return e;
  let n = s !== void 0 ? (r = i._$Co) == null ? void 0 : r[s] : i._$Cl;
  const o = ye(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((a = n == null ? void 0 : n._$AO) == null || a.call(n, !1), o === void 0 ? n = void 0 : (n = new o(t), n._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (e = ce(t, n._$AS(t, e.values), n, s)), e;
}
class Kn {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: s } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? Z).importNode(i, !0);
    H.currentNode = n;
    let o = H.nextNode(), r = 0, a = 0, c = s[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let l;
        c.type === 2 ? l = new At(o, o.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(o, c.name, c.strings, this, e) : c.type === 6 && (l = new Qn(o, this, e)), this._$AV.push(l), c = s[++a];
      }
      r !== (c == null ? void 0 : c.index) && (o = H.nextNode(), r++);
    }
    return H.currentNode = Z, n;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
let At = class Ii {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, s, n) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = ce(this, e, i), ye(e) ? e === v || e == null || e === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : e !== this._$AH && e !== M && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : qn(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== v && ye(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Z.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: i, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = be.createElement(Ri(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(i);
    else {
      const r = new Kn(n, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = ti.get(e.strings);
    return i === void 0 && ti.set(e.strings, i = new be(e)), i;
  }
  k(e) {
    St(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of e) n === i.length ? i.push(s = new Ii(this.O(ve()), this.O(ve()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); e && e !== this._$AB; ) {
      const n = e.nextSibling;
      e.remove(), e = n;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}, Ge = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, n, o) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = v;
  }
  _$AI(e, i = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = ce(this, e, i, 0), r = !ye(e) || e !== this._$AH && e !== M, r && (this._$AH = e);
    else {
      const a = e;
      let c, l;
      for (e = o[0], c = 0; c < o.length - 1; c++) l = ce(this, a[s + c], i, c), l === M && (l = this._$AH[c]), r || (r = !ye(l) || l !== this._$AH[c]), l === v ? e = v : e !== v && (e += (l ?? "") + o[c + 1]), this._$AH[c] = l;
    }
    r && !n && this.j(e);
  }
  j(e) {
    e === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
class Jn extends Ge {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === v ? void 0 : e;
  }
}
let Zn = class extends Ge {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== v);
  }
}, Xn = class extends Ge {
  constructor(e, i, s, n, o) {
    super(e, i, s, n, o), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = ce(this, e, i, 0) ?? v) === M) return;
    const s = this._$AH, n = e === v && s !== v || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== v && (s === v || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}, Qn = class {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ce(this, e);
  }
};
const it = pe.litHtmlPolyfillSupport;
it == null || it(be, At), (pe.litHtmlVersions ?? (pe.litHtmlVersions = [])).push("3.2.1");
const eo = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = n = new At(e.insertBefore(ve(), o), o, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let F = class extends ee {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = eo(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return M;
  }
};
var ui;
F._$litElement$ = !0, F.finalized = !0, (ui = globalThis.litElementHydrateSupport) == null || ui.call(globalThis, { LitElement: F });
const st = globalThis.litElementPolyfillSupport;
st == null || st({ LitElement: F });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = { ATTRIBUTE: 1, CHILD: 2 }, Pt = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Dt = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, s) {
    this._$Ct = e, this._$AM = i, this._$Ci = s;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const to = Pt(class extends Dt {
  constructor(t) {
    var e;
    if (super(t), t.type !== Ot.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    var s, n;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((o) => o !== "")));
      for (const o in e) e[o] && !((s = this.nt) != null && s.has(o)) && this.st.add(o);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const o of this.st) o in e || (i.remove(o), this.st.delete(o));
    for (const o in e) {
      const r = !!e[o];
      r === this.st.has(o) || (n = this.nt) != null && n.has(o) || (r ? (i.add(o), this.st.add(o)) : (i.remove(o), this.st.delete(o)));
    }
    return M;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ji = "important", io = " !" + ji, so = Pt(class extends Dt {
  constructor(t) {
    var e;
    if (super(t), t.type !== Ot.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, i) => {
      const s = t[i];
      return s == null ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(t, [e]) {
    const { style: i } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const s of this.ft) e[s] == null && (this.ft.delete(s), s.includes("-") ? i.removeProperty(s) : i[s] = null);
    for (const s in e) {
      const n = e[s];
      if (n != null) {
        this.ft.add(s);
        const o = typeof n == "string" && n.endsWith(io);
        s.includes("-") || o ? i.setProperty(s, o ? n.slice(0, -11) : n, o ? ji : "") : i[s] = n;
      }
    }
    return M;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const no = (t) => t.strings === void 0;
var Vi = (t = "", e = {}, i = $e()) => {
  const s = {
    emit: (n) => {
      if (process.env.NODE_ENV !== "production" && u() && !i.el.isConnected && console.warn(
        `Trying to emit an ${t} event on a disconnected element ${i.el.tagName.toLowerCase()}`
      ), t === "" && (Ct(), process.env.NODE_ENV !== "production" && u() && t === ""))
        throw new Error("Unable to resolve event name from property name");
      const o = new CustomEvent(t, {
        detail: n,
        cancelable: !0,
        bubbles: !0,
        composed: !0,
        ...e
      });
      return i.el.dispatchEvent(o), o;
    }
  };
  return t === "" && We(
    void 0,
    (n) => {
      if (process.env.NODE_ENV !== "production" && u() && n === void 0)
        throw new Error("createEvent must be called in property default value only");
      t = n.key;
    },
    s
  ), s;
}, V = Vi.bind(null, ""), oo = () => {
}, W, R = (W = class extends F {
  constructor() {
    var i, s, n, o, r, a;
    super(), this.el = this.constructor.lazy ?? this, this.manager = En(this), this._postLoad = ((i = this.constructor.lazy) == null ? void 0 : i._postLoad) ?? new J(), this._offspring = ((s = this.constructor.lazy) == null ? void 0 : s._offspring) ?? [], this._postLoaded = ((n = this.constructor.lazy) == null ? void 0 : n._postLoaded) ?? new J(), this._enableUpdating = this.enableUpdating, this.enableUpdating = oo;
    const e = W.prototype.shouldUpdate;
    if (this.shouldUpdate !== e && (this._originalShouldUpdate = this.shouldUpdate, this.shouldUpdate = e), process.env.NODE_ENV !== "production") {
      const c = (o = globalThis.devOnly$ownTagNames) == null ? void 0 : o.has(
        this.el.tagName.toLowerCase()
      ), l = this.constructor, h = l.enabledWarnings !== F.enabledWarnings;
      !c && !h && ((r = l.disableWarning) == null || r.call(l, "change-in-update")), u() && ((a = globalThis.devOnly$luminaComponentRefCallback) == null || a.call(globalThis, this));
    }
  }
  /**
   * Customize Lit's default style handling to support non-shadow-root styles
   */
  static finalizeStyles(e) {
    var n;
    process.env.NODE_ENV === "test" && Array.isArray(e) && (e = e.filter(Boolean));
    const i = super.finalizeStyles(e), s = this.shadowRootOptions === ge;
    return ((n = this.runtime) == null ? void 0 : n.commonStyles) === void 0 || s ? i : [this.runtime.commonStyles, ...i];
  }
  static createProperty(e, i) {
    const s = typeof i == "number" ? i : Array.isArray(i) ? i[0] : 0, n = Array.isArray(i) ? i[1] : void 0;
    super.createProperty(e, {
      /**
       * By default to infer attribute name from property name, Lit just
       * converts property name to lowercase. That is consistent with
       * native DOM attributes.
       *
       * However, that is not consistent with Stencil and would be a
       * breaking change for us. Also, kebab-case is more common among the
       * web components. But the most important reason is that we have
       * some pretty long attribute names, which would be utterly
       * unreadable in lowercase.
       *
       * Also, if browsers add new attributes, that may cause a conflict
       * with our attributes.
       *
       * Thus, overwriting Lit's default behavior to use kebab-case:
       */
      attribute: s & 1 && typeof e == "string" ? $t(e) : !1,
      reflect: !!(s & 2),
      type: s & 4 ? Boolean : s & 8 ? Number : void 0,
      /**
       * At the moment in Lit, state:true just means attribute:false, so this
       * line is technically redundant, but let's keep it here just in case Lit
       * will add more meaning to state:true in the future.
       */
      state: !!(s & 16),
      // Controllers add this option to Lit
      readOnly: !!(s & 32),
      noAccessor: !!(s & 64),
      ...n
    });
  }
  connectedCallback() {
    if (this.el.hasAttribute("defer-hydration"))
      return;
    const e = !this.manager.connectedCalled;
    super.connectedCallback(), e && queueMicrotask(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/promise-function-async
      () => this._load().catch((i) => {
        this._postLoaded.reject(i), setTimeout(() => {
          throw i;
        });
      })
    );
  }
  /**
   * Overwrite Lit's default behavior of attaching shadow root to the lit
   * element, and instead use this.el to support lazy builds.
   *
   * Also, support the case when component asked to not use shadow root
   */
  createRenderRoot() {
    const e = this.el.shadowRoot, i = this.constructor, s = i.shadowRootOptions, o = e ?? (s === ge ? this.el : this.el.attachShadow(s));
    if (Object.defineProperty(this, "shadowRoot", {
      // Create shadow root on the proxy instance, to make Lit render content there
      value: o
    }), e)
      return process.env.NODE_ENV === "production" && F.prototype.createRenderRoot.call(this), e;
    if (this.isConnected) {
      const r = o.getRootNode();
      process.env.NODE_ENV === "test" && (r.adoptedStyleSheets ?? (r.adoptedStyleSheets = [])), r.adoptedStyleSheets = [
        ...r.adoptedStyleSheets,
        ...i.elementStyles.map((a) => "styleSheet" in a ? a.styleSheet : a)
      ];
    }
    return o;
  }
  /** Do asynchronous component load */
  async _load() {
    const e = this.el._ancestorLoad ?? wi(this.el);
    e && await e, await this.manager._load(), this._enableUpdating(!0), this.performUpdate(), this._postLoad.resolve(), await Promise.resolve();
    const i = this._offspring.filter((s) => {
      var n;
      return !((n = s.manager) != null && n.loadedCalled);
    });
    i.length && await Promise.allSettled(i.map(async (s) => await s.componentOnReady())), this._offspring.length = 0, this.el.setAttribute(this.constructor.runtime.hydratedAttribute, ""), this.manager._loaded(), this._postLoaded.resolve();
  }
  /**
   * Overwriting default shouldUpdate simply to get access to
   * "changedProperties" so that we can later provide it to ControllerManager
   */
  shouldUpdate(e) {
    var i;
    return this.$changes = e, ((i = this._originalShouldUpdate) == null ? void 0 : i.call(this, e)) ?? !0;
  }
  listen(e, i, s) {
    const n = (i == null ? void 0 : i.bind(this)) ?? i;
    this.manager.onLifecycle(() => (this.el.addEventListener(e, n, s), () => this.el.removeEventListener(e, n, s)));
  }
  listenOn(e, i, s, n) {
    const o = (s == null ? void 0 : s.bind(this)) ?? s;
    this.manager.onLifecycle(() => (e.addEventListener(i, o, n), () => e.removeEventListener(i, o, n)));
  }
  /**
   * Create a promise that resolves once component is fully loaded.
   *
   * @example
   * const map = document.createElement('arcgis-map');
   * document.body.append(map);
   * map.componentOnReady().then(() => {
   *   console.log('Map is ready to go!');
   * });
   */
  async componentOnReady() {
    return await this._postLoaded.promise, this;
  }
}, W.lumina = !0, W);
R.$createEvent = Vi;
if (process.env.NODE_ENV !== "production" && u()) {
  const t = globalThis;
  t.litIssuedWarnings ?? (t.litIssuedWarnings = /* @__PURE__ */ new Set()), t.litIssuedWarnings.add(
    "Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators See https://lit.dev/msg/no-override-create-property for more information."
  );
}
function Bi(t) {
  let e;
  const i = (n) => {
    var o, r, a;
    e = new URL(
      n,
      /**
       * setAssetPath() is called in global scope whenever Lumina runtime is
       * imported. Thus we need to carefully handle different environments.
       *
       * Need `|| undefined` because Stencil's unit tests mock-dock defines
       * `location.href` as empty string, which crashes `new URL()`. Stencil's
       * test environment does not define `NODE_ENV` by default, so we have to
       * add a few bytes to production.
       *
       * For happy-dom and jsdom, we are assuming that `NODE_ENV` is set.
       * Depending on configuration, `location?.href` is either undefined (not
       * an exception) or `about:blank` (an exception - thus handling that case
       * explicitly).
       *
       * For Node.js without a DOM environment, `location?.href` is undefined so
       * all is good.
       */
      process.env.NODE_ENV === "test" ? ((o = globalThis.location) == null ? void 0 : o.href) === "about:blank" ? void 0 : ((r = globalThis.location) == null ? void 0 : r.href) || void 0 : ((a = globalThis.location) == null ? void 0 : a.href) || void 0
    ).href;
  }, s = {
    ...t,
    // FEATURE: research https://vitejs.dev/guide/build.html#advanced-base-options
    getAssetPath(n) {
      var r;
      const o = new URL(n, e);
      return o.origin !== ((r = globalThis.location) == null ? void 0 : r.origin) ? o.href : o.pathname;
    },
    setAssetPath: i,
    customElement(n, o) {
      o.runtime = s, o.tagName = n, customElements.get(n) || customElements.define(n, o);
    }
  };
  return i(t.defaultAssetPath), process.env.NODE_ENV !== "production" && u() && (globalThis.devOnly$luminaRuntime = s), s;
}
var m = (t) => typeof t == "object" && t != null ? to(t) : t, Ne = (t) => typeof t == "object" && t != null ? so(t) : t, B = v;
function ro(t, e, i) {
  i == null ? t.removeAttribute(e) : t.setAttribute(e, i);
}
/*! All material copyright Esri, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.32/esri/copyright.txt for details.
v4.32.7 */
const ao = Bi({ defaultAssetPath: "https://js.arcgis.com/map-components/4.32/", hydratedAttribute: "hydrated" }), { customElement: zt, getAssetPath: Hi, setAssetPath: Ra } = ao;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = (t, e) => {
  var s;
  const i = t._$AN;
  if (i === void 0) return !1;
  for (const n of i) (s = n._$AO) == null || s.call(n, e, !1), ue(n, e);
  return !0;
}, Me = (t) => {
  let e, i;
  do {
    if ((e = t._$AM) === void 0) break;
    i = e._$AN, i.delete(t), t = e;
  } while ((i == null ? void 0 : i.size) === 0);
}, Fi = (t) => {
  for (let e; e = t._$AM; t = e) {
    let i = e._$AN;
    if (i === void 0) e._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(t)) break;
    i.add(t), ho(e);
  }
};
function co(t) {
  this._$AN !== void 0 ? (Me(this), this._$AM = t, Fi(this)) : this._$AM = t;
}
function lo(t, e = !1, i = 0) {
  const s = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (e) if (Array.isArray(s)) for (let o = i; o < s.length; o++) ue(s[o], !1), Me(s[o]);
  else s != null && (ue(s, !1), Me(s));
  else ue(this, t);
}
const ho = (t) => {
  t.type == Ot.CHILD && (t._$AP ?? (t._$AP = lo), t._$AQ ?? (t._$AQ = co));
};
let po = class extends Dt {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, i, s) {
    super._$AT(e, i, s), Fi(this), this.isConnected = e._$AU;
  }
  _$AO(e, i = !0) {
    var s, n;
    e !== this.isConnected && (this.isConnected = e, e ? (s = this.reconnected) == null || s.call(this) : (n = this.disconnected) == null || n.call(this)), i && (ue(this, e), Me(this));
  }
  setValue(e) {
    if (no(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const i = [...this._$Ct._$AH];
      i[this._$Ci] = e, this._$Ct._$AI(i, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ii = () => new uo();
let uo = class {
};
const nt = /* @__PURE__ */ new WeakMap(), Re = Pt(class extends po {
  render(t) {
    return v;
  }
  update(t, [e]) {
    var s;
    const i = e !== this.Y;
    return i && this.Y !== void 0 && this.rt(void 0), (i || this.lt !== this.ct) && (this.Y = e, this.ht = (s = t.options) == null ? void 0 : s.host, this.rt(this.ct = t.element)), v;
  }
  rt(t) {
    if (this.isConnected || (t = void 0), typeof this.Y == "function") {
      const e = this.ht ?? globalThis;
      let i = nt.get(e);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), nt.set(e, i)), i.get(this.Y) !== void 0 && this.Y.call(this.ht, void 0), i.set(this.Y, t), t !== void 0 && this.Y.call(this.ht, t);
    } else this.Y.value = t;
  }
  get lt() {
    var t, e;
    return typeof this.Y == "function" ? (t = nt.get(this.ht ?? globalThis)) == null ? void 0 : t.get(this.Y) : (e = this.Y) == null ? void 0 : e.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
/*! All material copyright Esri, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.32/esri/copyright.txt for details.
v4.32.7 */
function Ce(t) {
  t.el.childElem && (t.el.childElem.ownedBy = t.el);
  const e = mo(t);
  if (!e) {
    const i = bo(t.referenceElement);
    if (!i) {
      Wi(t);
      return;
    }
    return ni(i, t, !0), i;
  }
  return fo(e, t.el.parent) || (t.el.parent = e, e.tagName.toLowerCase() === "arcgis-expand" ? go(e, t) : e.tagName.toLowerCase() === "arcgis-placement" ? vo(e, t) : ni(e, t, !1)), e;
}
function mo({ el: t }) {
  for (let e = t.parentElement; e; e = (e == null ? void 0 : e.parentElement) ?? null) {
    if (si.has(e.tagName.toLowerCase()))
      return e;
    if ("ownedBy" in e && e.ownedBy instanceof HTMLElement && si.has(e.ownedBy.tagName.toLowerCase()))
      return e.ownedBy;
  }
}
const si = /* @__PURE__ */ new Set([
  "arcgis-map",
  "arcgis-scene",
  "arcgis-link-chart",
  "arcgis-expand",
  "arcgis-placement"
]);
function fo(t, e) {
  if (t !== e)
    return !1;
  const i = t.tagName.toLowerCase();
  return i === "arcgis-expand" || i === "arcgis-placement";
}
function qe(t, e, i = "arcgisReady") {
  var n;
  const s = t;
  if (typeof ((n = s.view) == null ? void 0 : n.ready) == "boolean")
    e(s.view);
  else {
    let o = function(r) {
      r.target === t && (qe(t, e, i), t.removeEventListener(i, o));
    };
    t.addEventListener(i, o);
  }
}
const go = (t, e) => qe(t, (i) => {
  var s;
  e.el.childElem && t.content != null && t.content.append(e.el.childElem), t.expandIcon = e.icon || ((s = e.widget) == null ? void 0 : s.icon) || t.expandIcon, e.position = t.position, e.el.view = i;
}), vo = (t, e) => qe(t, (i) => {
  e.el.childElem && e.el.append(e.el.childElem), e.position = t.position, e.el.view = i;
}), ni = (t, e, i) => qe(
  t,
  (s) => {
    i ? Wi(e) : e.el.childElem && yo(t, e), e.el.view = s;
  },
  "arcgisViewReadyChange"
);
function yo(t, e) {
  var a;
  const i = e.el.childElem ?? e.el, s = [...t.children], n = {};
  for (const c of s) {
    const l = c.getAttribute("position") ?? "manual";
    n[l] ?? (n[l] = []), n[l].push({ child: c, position: l, index: s.indexOf(c) });
  }
  const o = (a = n[e.position ?? "manual"]) == null ? void 0 : a.findIndex(({ child: c }) => c === e.el), r = t.view.ui;
  r.remove(i), r.add(i, { position: e.position, index: o });
}
function Wi(t) {
  t.el.childElem && (t.el.shadowRoot ?? t.el).append(t.el.childElem);
}
function bo(t) {
  return typeof t != "string" ? t ?? void 0 : (t.includes("#") || t.includes(".") || t.includes("[") ? void 0 : document.querySelector(`#${t}`)) ?? document.querySelector(t) ?? void 0;
}
/*! All material copyright Esri, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.32/esri/copyright.txt for details.
v4.32.7 */
const Gi = Oi(Hi);
let $o = class extends Et {
  constructor(e) {
    super(e), this._view$ = fs(void 0), this._viewDestroyHandle = void 0, this._arcgisReadyEmitted = !1;
    const { el: i } = e, s = i.view;
    this.setProvisionalExports(void 0), Object.defineProperty(i, "view", {
      get: () => this._view$.value,
      set: (n) => {
        if (this.exports === n)
          return;
        const o = i.view;
        this._view$.value = n, this.exports = n, this.component.requestUpdate("view", o), !this._arcgisReadyEmitted && n != null && (this._arcgisReadyEmitted = !0, this.component.arcgisReady.emit());
      },
      configurable: !0,
      enumerable: !0
    }), e !== i && Object.defineProperty(e, "view", {
      get: () => i.view,
      set: (n) => {
        i.view = n;
      }
    }), queueMicrotask(() => {
      s && (i.view = s);
    });
  }
  hostConnected() {
    this._viewDestroyHandle ?? (this._viewDestroyHandle = ds.when(
      () => {
        var e;
        return (e = this._view$.value) == null ? void 0 : e.destroyed;
      },
      () => {
        var e, i;
        return void ((i = (e = this.component).destroy) == null ? void 0 : i.call(e).catch(console.error));
      },
      { sync: !0 }
    )), this.component.manager.loadedCalled && Ce(this.component);
  }
  hostLoad() {
    this.component.manager.destroyed || this._watchMetaProperties();
  }
  hostLoaded() {
    var s;
    const { el: e } = this.component, i = ((s = e.shadowRoot) == null ? void 0 : s.firstElementChild) ?? e.firstElementChild ?? void 0;
    e.childElem = i ?? e.childElem, e.isConnected && Ce(this.component);
  }
  hostDisconnected() {
    var e, i;
    typeof this.component.el.childElem == "object" && ((i = (e = this._view$.value) == null ? void 0 : e.ui) == null || i.remove(this.component.el.childElem));
  }
  hostDestroy() {
    var e;
    (e = this._viewDestroyHandle) == null || e.remove();
  }
  _watchMetaProperties() {
    ae(this.component, "position", (e) => {
      this.component.el.childElem != null && typeof e == "string" && Ce(this.component);
    }), ae(this.component, "referenceElement", () => Ce(this.component));
  }
};
var ot;
async function wo() {
  return ot ?? (ot = gs()), await ot;
}
var _o = class extends Et {
  constructor(t, e, i) {
    super(t), this._loadAccessor = e, this._options = i, this._watchedProperties = /* @__PURE__ */ new Map(), this._isBinding = { value: !0 }, this.setProvisionalExports(
      rt.makeGetterProxy(
        t,
        this._watchedProperties,
        this._isBinding,
        this.constructor.allowedPropNameMismatches
      )
    ), ki(
      t,
      (s) => {
        s && (this._instancePropName = s);
      },
      this.exports
    );
  }
  hostConnected() {
    this._isBinding.value = !1;
  }
  async hostLoad() {
    var a, c;
    this.reactiveUtils = await wo();
    const t = this.component, e = this._gatherParameters(), i = ((c = (a = this._options) == null ? void 0 : a.editConstructorProperties) == null ? void 0 : c.call(t, e)) ?? e, s = i instanceof Promise ? await i : i, n = t, o = typeof this._instancePropName == "string" ? n[this._instancePropName] : void 0;
    o != null && o !== this.exports ? (this._instance = o, o.set(s)) : this._instance = await this._createInstance(s), !t.manager.destroyed && (rt.watchComponentUpdates(this, this._instance, this._watchedProperties), rt.watchAccessorUpdates(this, this._instance, this._watchedProperties), this.exports = this._instance);
  }
  _gatherParameters() {
    const t = Object.fromEntries(
      Array.from(
        this._watchedProperties,
        ([i, s]) => [s, this.component[i]]
      ).filter(([, i]) => i !== void 0)
    );
    return process.env.NODE_ENV !== "production" && u() ? (ct == null ? void 0 : ct(this, t)) ?? t : t;
  }
  async _createInstance(t) {
    return this._isAccessorConstructor(this._loadAccessor) ? new this._loadAccessor(t) : await this._loadAccessor(t);
  }
  _isAccessorConstructor(t) {
    return "prototype" in t && "declaredClass" in t.prototype;
  }
  hostDestroy() {
    this._instance && this._instance.destroy();
  }
  async reCreate() {
    this.hostDestroy(), await this.hostLoad();
  }
}, rt = {
  makeGetterProxy: (t, e, i, s) => new Proxy(
    {},
    {
      /*
       * Without this, makeProvisionalValue() will throw on accessing
       * non-existent prop
       */
      has: (n, o) => typeof o == "string" || o in n,
      get: (n, o) => {
        const r = Reflect.get(n, o);
        if (typeof o == "symbol" || o in Promise.prototype)
          return r;
        const a = o in n, c = (i == null ? void 0 : i.value) ?? !0;
        if (a || !c)
          return r;
        if (e.has(o)) {
          if (process.env.NODE_ENV !== "production" && u() && !t.manager.isLit)
            throw new Error(
              `Tried to bind "${o.toString()}" prop twice. This might also happen if you are trying to access the accessor instance before ${t.manager.isLit ? "load" : "componentWillLoad"}()`
            );
          return;
        }
        return We(
          t,
          (l) => {
            if (process.env.NODE_ENV !== "production" && u()) {
              if (l === void 0) {
                if (t.manager.isLit)
                  return;
                throw new Error(
                  `Unable to resolve what property is "${o.toString()}" being bound too. Check documentation for useAccessor to ensure proper usage. Make sure you are not trying to access the accessor instance before ${t.manager.isLit ? "load" : "componentWillLoad"}()`
                );
              }
              const h = l.key.toLowerCase().includes("disable"), d = o in HTMLElement.prototype, p = (s == null ? void 0 : s.has(o)) === !0;
              if (l.key !== o && !d && !p && !h)
                throw new Error(
                  `Tried to bind "${l == null ? void 0 : l.key}" property to "${o.toString()}" - property names must match`
                );
              if (!l.isReactive)
                throw new Error(
                  t.manager.isLit ? `For two-way binding with Accessor to work, the property on your component must have @property() or @state() decorator. "${o.toString()}" has neither` : `For two-way binding with Accessor to work, the property on your component must have @Prop() or @State() decorator. "${o.toString()}" has neither`
                );
            }
            l !== void 0 && e.set(l.key, o);
          },
          r
        );
      }
    }
  ),
  // Update Accessor on component prop change
  watchComponentUpdates(t, e, i) {
    function s(a, c) {
      const l = i.get(c), h = e[l];
      return typeof h == "boolean" && l !== c && c.toLowerCase().includes("disable") ? !h : h;
    }
    const n = (a, c, l) => {
      const h = i.get(l), d = e[h], p = typeof d == "boolean" && h !== l && l.toLowerCase().includes("disable");
      if ((p ? !d : o.manager.isLit ? d ?? void 0 : d) === a)
        return a;
      e[h] = p ? !a : a;
      const $ = e[h];
      return p ? !$ : $;
    }, o = t.component, r = o.manager.internals;
    i.forEach((a, c) => {
      r.accessorGetter[c] = s, r.accessorSetter[c] = n;
    });
  },
  // Update component on Accessor prop change
  watchAccessorUpdates(t, e, i) {
    const { component: s } = t, n = s, o = e, r = xo(e);
    process.env.NODE_ENV !== "production" && u() && (at == null || at(t, r)), wn(
      () => (
        // Careful: Map's forEach callback arguments are (value, key), not (key, value)
        i.forEach((a, c) => {
          if (process.env.NODE_ENV !== "production" && u() && !(a in e))
            throw new Error(`"${a}" does not exist on the accessor instance`);
          if (r.has(a))
            return;
          const l = n[c];
          let h = o[a];
          s.manager.isLit && (h ?? (h = void 0));
          const p = typeof l == "boolean" && a !== c && c.toLowerCase().includes("disable") ? !l : l;
          p != null && h !== p && (o[a] = p);
        })
      )
    ), t.onLifecycle(() => {
      if (!e.destroyed)
        return Array.from(
          i,
          ([a, c]) => t.reactiveUtils.watch(
            () => o[c],
            () => {
              const l = o[c], d = typeof l == "boolean" && c !== a && a.toLowerCase().includes("disable") ? !l : l;
              $n(() => {
                n[a] = d;
              });
            },
            { initial: !0 }
          )
        );
    });
  },
  // REFACTOR: remove this once Stencil is no longer supported
  reEmitAccessorEvents(t, e, i, s) {
    if (!("on" in e && typeof e.on == "function"))
      return;
    const o = Object.entries(t.component).map(([c, l]) => {
      const h = l;
      if (!c.startsWith(s) || c === s || typeof h != "object" || h === null || !("emit" in h) || typeof h.emit != "function")
        return;
      const d = h.emit, p = c.slice(s.length);
      return [$t(p).toLowerCase(), d];
    }).filter($i);
    if (o.length === 0)
      return;
    const r = e, a = () => r;
    t.onLifecycle(() => {
      if (!e.destroyed)
        return o.map(([c, l]) => i.on(a, c, l));
    });
  },
  async reCreate(t, e) {
    const i = e.manager.useRefSync(t);
    if (i === void 0) {
      process.env.NODE_ENV !== "production" && console.error("Unable to resolve the useAccessor controller from the provided value");
      return;
    }
    await i.reCreate();
  }
};
function xo(t) {
  var s;
  const i = Object.entries(((s = t.__accessor__) == null ? void 0 : s.metadata) ?? {});
  return new Set(
    i.filter(([n, o]) => (o == null ? void 0 : o.readOnly) === !0).map(([n]) => n)
  );
}
var at = process.env.NODE_ENV !== "production" && u() ? (t, e) => {
  oe == null || oe(t, e);
} : void 0, ct = process.env.NODE_ENV !== "production" && u() ? (t, e) => {
  const i = Ze == null ? void 0 : Ze(t);
  return i instanceof Set ? Object.fromEntries(Object.entries(e).filter(([s]) => !i.has(s))) : e;
} : void 0;
/*! All material copyright Esri, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.32/esri/copyright.txt for details.
v4.32.7 */
const qi = (t, e) => (i, s) => Co(i, t, s);
let Eo = class extends _o {
  constructor() {
    super(...arguments), this.viewController = new $o(this.component), this._viewWatchHandle = void 0;
  }
  async hostLoad() {
    await super.hostLoad(), this._viewWatchHandle = this.reactiveUtils.watch(
      () => this.component.el.view,
      (e) => {
        this._instance.view = e, this._instance.map = e == null ? void 0 : e.map;
      },
      { sync: !0, initial: !0 }
    );
  }
  hostDestroy() {
    var e;
    (e = this._viewWatchHandle) == null || e.remove(), super.hostDestroy();
  }
};
const Co = Si(Eo);
/*! All material copyright Esri, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.32/esri/copyright.txt for details.
v4.32.7 */
const T = {
  disabled: "esri-disabled",
  empty: "esri-widget__content--empty",
  heading: "esri-widget__heading",
  loaderAnimation: "esri-widget__loader-animation",
  panel: "esri-widget--panel",
  widget: "esri-widget esri-component"
};
/*! All material copyright Esri, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.32/esri/copyright.txt for details.
v4.32.7 */
function oi(t = 0, e = 0) {
  return { x: t, y: e };
}
const E = "esri-scale-bar", b = {
  base: E,
  labelContainer: `${E}__label-container`,
  rulerLabelContainer: `${E}__label-container--ruler`,
  lineLabelContainer: `${E}__label-container--line`,
  topLabelContainer: `${E}__label-container--top`,
  bottomLabelContainer: `${E}__label-container--bottom`,
  label: `${E}__label`,
  line: `${E}__line`,
  topLine: `${E}__line--top`,
  bottomLine: `${E}__line--bottom`,
  ruler: `${E}__ruler`,
  rulerBlock: `${E}__ruler-block`,
  barContainer: `${E}__bar-container`,
  rulerBarContainer: `${E}__bar-container--ruler`,
  lineBarContainer: `${E}__bar-container--line`
}, Lo = qi(ms);
var G;
let ko = (G = class extends R {
  constructor() {
    super(...arguments), this._defaultUnit = "metric", this.messages = Gi(), this._scaleComputedFrom = oi(), this.viewModel = Lo(this), this.autoDestroyDisabled = !1, this.barStyle = "line", this.icon = "actual-size", this.position = "top-left", this.arcgisReady = V();
  }
  /**
   * Units to use for the scale bar.
   * When using `dual`, the scale bar displays both metric and imperial units.
   * When metric, distances will be shown in either kilometers, meters, centimeters, or millimeters depending on the scale. Similarly, imperial
   * units will be shown in either miles, feet, or inches.
   */
  get unit() {
    return this._unit ?? this._defaultUnit;
  }
  set unit(e) {
    this._unit = e;
  }
  // #endregion
  // #region Public Methods
  /** Permanently destroy the component */
  async destroy() {
    await this.manager.destroy();
  }
  // #endregion
  // #region Lifecycle
  updated() {
    this._handleRootCreateOrUpdate();
  }
  loaded() {
    this.manager.onLifecycle(() => De(() => {
      const e = this.viewModel.view;
      return {
        defaultUnit: e ? hs(e) : void 0,
        stationary: e == null ? void 0 : e.stationary,
        center: e == null ? void 0 : e.center,
        scale: e == null ? void 0 : e.scale,
        zoom: e == null ? void 0 : e.zoom
      };
    }, ({ defaultUnit: e, stationary: i }) => {
      this._defaultUnit = e ?? "metric", i && this.requestUpdate();
    }));
  }
  // #endregion
  // #region Private Methods
  _handleContainerRef(e) {
    e !== void 0 && this._handleRootCreateOrUpdate();
  }
  _handleRootCreateOrUpdate() {
    if (!this.viewModel)
      return;
    const e = this._scaleComputedFrom, i = this.el.getBoundingClientRect(), s = i.left + window.pageXOffset, n = i.top + window.pageYOffset, o = oi(s, n);
    (o.x !== e.x || o.y !== e.y) && (this._scaleComputedFrom = o);
  }
  _formatDistance(e, i) {
    return us(e, {
      style: "unit",
      unit: i,
      unitDisplay: "short"
    });
  }
  // #endregion
  // #region Rendering
  render() {
    const e = this.viewModel.state === "disabled", i = {
      [T.disabled]: e
    };
    let s, n;
    if (!e) {
      const { unit: o, barStyle: r } = this, a = o === "imperial" || o === "dual", c = o === "metric" || o === "dual", l = 100, h = o === "dual" ? "line" : r;
      if (a) {
        const d = this.viewModel.getScaleBarProperties(l, "imperial");
        d && (n = h === "ruler" ? this._renderRuler(d) : this._renderLine(d, "bottom"));
      }
      if (c) {
        const d = this.viewModel.getScaleBarProperties(l, "metric");
        d && (s = h === "ruler" ? this._renderRuler(d) : this._renderLine(d, "top"));
      }
    }
    return f`<div class=${m(A(b.base, T.widget, i))} ${Re(this._handleContainerRef)}>${s}${n}</div>`;
  }
  _renderRuler(e) {
    const { length: i, unit: s, value: n } = e, o = Math.round(i), r = this._formatDistance(n, s);
    return f`<div class=${m(A(b.barContainer, b.rulerBarContainer))}><div class=${m(b.ruler)} style=${Ne({ width: `${o}px` })}><div class=${m(b.rulerBlock)}></div><div class=${m(b.rulerBlock)}></div><div class=${m(b.rulerBlock)}></div><div class=${m(b.rulerBlock)}></div></div><div class=${m(A(b.labelContainer, b.rulerLabelContainer))}><div class=${m(b.label)}>0</div><div class=${m(b.label)}>${r}</div></div></div>`;
  }
  _renderLine(e, i) {
    const { length: s, unit: n, value: o } = e, r = Math.round(s), a = this._formatDistance(o, n), c = {
      [b.topLabelContainer]: i === "top",
      [b.bottomLabelContainer]: i === "bottom"
    }, l = f`<div class=${m(A(b.labelContainer, b.lineLabelContainer, c))}><div class=${m(b.label)}>${a}</div></div>`, h = {
      [b.topLine]: i === "top",
      [b.bottomLine]: i === "bottom"
    }, d = f`<div class=${m(A(b.line, h))} style=${Ne({ width: `${r}px` })}></div>`;
    return f`<div class=${m(A(b.barContainer, b.lineBarContainer))}>${[d, l]}</div>`;
  }
}, G.properties = { autoDestroyDisabled: 5, barStyle: 1, icon: 3, label: 1, messageOverrides: 0, position: 3, referenceElement: 1, unit: 1 }, G.shadowRootOptions = ge, G);
zt("arcgis-scale-bar", ko);
class So {
  static gpxToFeatures(e, i) {
    return new Promise((s) => {
      Fe(e, {
        responseType: "xml"
      }).then((n) => {
        const o = n.data;
        jt.load().then(() => {
          const r = {
            waypoints: [],
            tracks: []
          };
          o.querySelectorAll("wpt").forEach((a, c) => {
            const l = new U({ latitude: a.attributes.lat.value, longitude: a.attributes.lon.value }), h = this.getGraphic(l, a, `waypoint ${c + 1}`, i);
            r.waypoints.push(h);
          }), o.querySelectorAll("trk").forEach((a, c) => {
            const l = new It({ paths: [], spatialReference: { wkid: 4326 } });
            a.querySelectorAll("trkseg").forEach((d) => {
              const p = [];
              d.querySelectorAll("trkpt").forEach(($) => {
                const w = new U({ latitude: $.attributes.lat.value, longitude: $.attributes.lon.value });
                p.push(w);
              }), l.addPath(p);
            });
            const h = this.getGraphic(l, a, `track ${c + 1}`, i);
            r.tracks.push(h);
          }), o.querySelectorAll("rte").forEach((a, c) => {
            const l = new It({ paths: [], spatialReference: { wkid: 4326 } }), h = [];
            a.querySelectorAll("rtept").forEach((p) => {
              const g = new U({ latitude: p.attributes.lat.value, longitude: p.attributes.lon.value });
              h.push(g);
            }), l.addPath(h);
            const d = this.getGraphic(l, a, `route ${c + 1}`, i);
            r.tracks.push(d);
          }), s(r);
        });
      });
    });
  }
  static getGraphic(e, i, s, n) {
    const o = i.querySelector("name");
    let r = s;
    o && (r = o.textContent);
    const a = i.querySelector("desc");
    let c = "";
    a && (c = a.textContent);
    const l = {
      title: r,
      content: c
    };
    return new fe({
      geometry: jt.execute(e, n),
      popupTemplate: l
    });
  }
}
var Ao = Object.defineProperty, Oo = Object.getOwnPropertyDescriptor, Yi = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Oo(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && Ao(e, i, n), n;
};
let Ie = class extends ks {
  constructor(t) {
    super();
    const e = new mi({
      wkid: 2056
    }), i = bt.create({
      spatialReference: e,
      numLODs: t.scales.length,
      scales: t.scales
    });
    i.origin = new U({
      x: 242e4,
      y: 135e4,
      spatialReference: e
    }), this.title = t.title, this.urlTemplate = t.urlTemplate, this.spatialReference = e, this.tileInfo = i;
  }
  getTileUrl(t, e, i) {
    return this.urlTemplate.replace("{level}", t.toString()).replace("{col}", i.toString()).replace("{row}", e.toString());
  }
};
Yi([
  Cs()
], Ie.prototype, "urlTemplate", 2);
Ie = Yi([
  Ls("esri.layers.SwissTileLayer")
], Ie);
class Po {
  constructor(e) {
    this.serviceDescription = null, this.config = e, this.serviceUrl = e.vectorServiceUrl;
    const i = e.vectorServiceToken;
    i && ys.registerToken({
      token: i,
      server: `${this.serviceUrl.split("/rest/services")[0]}/rest/services`
    });
  }
  getFeatureLayers(e) {
    return new Promise((i) => {
      this.getServiceDescription().then((s) => {
        const n = [];
        s.layers.forEach((o) => {
          if (e.includes(o.name)) {
            const r = new bs({
              url: `${this.serviceUrl}/${o.id}`,
              title: o.name
            });
            r.on("layerview-create", (a) => {
              const c = a.layerView.layer;
              c.popupTemplate = c.createPopupTemplate();
            }), n.push(r);
          }
        }), i(n);
      });
    });
  }
  async getMapImageLayers(e) {
    const i = [];
    return (await this.getServiceDescription()).layers.forEach((n) => {
      if (e.includes(n.name)) {
        const o = new ws({
          title: n.name,
          url: this.serviceUrl,
          listMode: "hide-children",
          sublayers: [{
            id: n.id,
            visible: !0
          }]
        }), r = o.sublayers.at(0);
        r.load().then(() => {
          r.popupEnabled = !0, r.popupTemplate = r.createPopupTemplate(), r.popupTemplate.title = `${n.name}: {${r.sourceJSON.displayField}}`;
        }), i.push(o);
      }
    }), i;
  }
  queryLayer(e, i) {
    return new Promise((s) => {
      this.getServiceDescription().then((n) => {
        const o = n.layers.filter((c) => c.name === e.layer)[0];
        if (!o) {
          console.warn(`Invalid layer name in config file: ${e.layer}`), s([]);
          return;
        }
        const r = o.fields.filter((c) => c.name === e.field)[0];
        if (!r) {
          console.warn(`Invalid field name in config file: ${e.field}`), s([]);
          return;
        }
        let a;
        this.isNumericField(r.type) ? a = `${e.field} in (${i.join(",")})` : a = `${e.field} in ('${i.join("','")}')`, Ss.executeQueryJSON(`${this.serviceUrl}/${o.id}`, {
          where: a,
          returnGeometry: !0
        }).then((c) => {
          s(c.features.map((l) => l.geometry));
        });
      });
    });
  }
  getBasemaps(e) {
    const i = [];
    return e.forEach((s) => {
      const n = this.getLayer(s);
      n && i.push(new vs({
        baseLayers: [n],
        title: s.alias,
        thumbnailUrl: s.thumbnailUrl
      }));
    }), i;
  }
  getServiceDescription() {
    return new Promise((e) => {
      this.serviceDescription === null ? Fe(`${this.serviceUrl}/layers`, {
        query: {
          f: "json"
        },
        responseType: "json"
      }).then((i) => {
        this.serviceDescription = i.data, e(this.serviceDescription);
      }) : e(this.serviceDescription);
    });
  }
  getLayer(e) {
    switch (e.type) {
      case "tile":
        return new Ie({
          title: e.alias,
          urlTemplate: e.urlTemplate,
          scales: this.config.scales
        });
      case "wmts":
        return new Es({
          url: e.url,
          activeLayer: {
            id: e.layerId
          },
          copyright: e.copyright
        });
      case "mapservice":
        return new _s({
          url: e.url,
          copyright: e.copyright
        });
      case "imageservice":
        return new $s({
          url: e.url,
          copyright: e.copyright
        });
      case "vectortile":
        return new xs({
          url: e.url
        });
      default:
        return console.warn(`Unsupported basemap type: ${e.type}`), null;
    }
  }
  isNumericField(e) {
    return e === "esriFieldTypeSmallInteger" || e === "esriFieldTypeInteger" || e === "esriFieldTypeSingle" || e === "esriFieldTypeDouble";
  }
}
class Do {
  static txtToFeatures(e, i) {
    return new Promise((s) => {
      Fe(e, {
        responseType: "text"
      }).then((n) => {
        const o = [];
        n.data.split(`
`).forEach((r, a) => {
          if (a) {
            const c = r.split("	");
            if (c.length >= 5) {
              const l = c[0].split(","), h = new U({ x: parseFloat(l[1]), y: parseFloat(l[0]), spatialReference: i }), d = {
                title: c[1],
                content: c[2]
              }, p = c[4].split(","), g = new As({
                url: c[3],
                width: `${p[0]}px`,
                height: `${p[1]}px`
              });
              o.push(new fe({
                geometry: h,
                symbol: g,
                popupTemplate: d
              }));
            }
          }
        }), s(o);
      });
    });
  }
}
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.0.3 */
const zo = "calcite-mode-auto", To = "calcite-mode-dark";
function ri() {
  const { classList: t } = document.body, e = window.matchMedia("(prefers-color-scheme: dark)").matches, i = () => t.contains(To) || t.contains(zo) && e ? "dark" : "light", s = (r) => document.body.dispatchEvent(new CustomEvent("calciteModeChange", { bubbles: !0, detail: { mode: r } })), n = (r) => {
    o !== r && s(r), o = r;
  };
  let o = i();
  s(o), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (r) => n(r.matches ? "dark" : "light")), new MutationObserver(() => n(i())).observe(document.body, {
    attributes: !0,
    attributeFilter: ["class"]
  });
}
const D = globalThis.calciteConfig;
D != null && D.focusTrapStack;
const Uo = (D == null ? void 0 : D.logLevel) || "info", ai = "3.0.3", No = "2025-02-19", Mo = "0b0b89f59";
function Ro() {
  if (D && D.version)
    return;
  console.info(`Using Calcite Components ${ai} [Date: ${No}, Revision: ${Mo}]`);
  const t = D || globalThis.calciteConfig || {};
  Object.defineProperty(t, "version", {
    value: ai,
    writable: !1
  }), globalThis.calciteConfig = t;
}
const _e = () => typeof navigator < "u" && typeof window < "u" && typeof location < "u" && typeof document < "u" && window.location === location && window.document === document;
function Io() {
  _e() && (document.readyState === "interactive" ? ri() : document.addEventListener("DOMContentLoaded", () => ri(), { once: !0 })), Ro();
}
Io();
const jo = Bi({ defaultAssetPath: "https://js.arcgis.com/calcite-components/3.0.3/", hydratedAttribute: "calcite-hydrated" }), { customElement: Ye, getAssetPath: Ki, setAssetPath: Ha } = jo;
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.0.3 */
function Vo(t) {
  return t.map((e) => {
    let i = "";
    for (let s = 0; s < e; s++)
      i += ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    return i;
  }).join("-");
}
const Bo = () => Vo([2, 1, 1, 1, 3]);
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.0.3 */
const Tt = Oi(Ki);
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.0.3 */
const Q = {
  percentage: "percentage",
  progressRing: "ring--progress",
  ring: "ring",
  rings: "rings",
  text: "text",
  trackRing: "ring--track"
}, Ho = we`:host{position:relative;margin-inline:auto;display:flex;align-items:center;justify-content:center;opacity:1;flex-direction:column;min-block-size:var(--calcite-loader-size);font-size:var(--calcite-loader-font-size);stroke-width:var(--calcite-internal-stroke-width);fill:none;transform:scale(1);padding-block:var(--calcite-loader-spacing, 4rem)}:host([scale=s]){--calcite-internal-stroke-width: 3;--calcite-internal-text-offset: var(--calcite-spacing-xxs);--calcite-internal-loader-font-size: var(--calcite-font-size--3);--calcite-internal-loader-size: 2rem;--calcite-internal-loader-size-inline: .75rem;--calcite-internal-loader-value-line-height: .625rem}:host([scale=m]){--calcite-internal-stroke-width: 6;--calcite-internal-text-offset: var(--calcite-spacing-sm);--calcite-internal-loader-font-size: var(--calcite-font-size-0);--calcite-internal-loader-size: 4rem;--calcite-internal-loader-size-inline: 1rem;--calcite-internal-loader-value-line-height: 1.375rem}:host([scale=l]){--calcite-internal-stroke-width: 8;--calcite-internal-text-offset: var(--calcite-spacing-md);--calcite-internal-loader-font-size: var(--calcite-font-size-2);--calcite-internal-loader-size: 6rem;--calcite-internal-loader-size-inline: 1.5rem;--calcite-internal-loader-value-line-height: 1.71875rem}.text{display:block;text-align:center;font-size:var(--calcite-font-size--2);line-height:1rem;margin-block-start:var(--calcite-loader-text-spacing, var(--calcite-internal-text-offset));font-weight:var(--calcite-loader-text-weight, var(--calcite-font-weight-normal));color:var(--calcite-loader-text-color, var(--calcite-color-text-1))}.percentage{display:block;text-align:center;font-size:var(--calcite-loader-font-size);inline-size:var(--calcite-loader-size, var(--calcite-internal-loader-size));line-height:var(--calcite-internal-loader-value-line-height);align-self:center;color:var(--calcite-loader-text-color, var(--calcite-color-text-1))}.rings{position:relative;display:flex;overflow:visible;opacity:1;inline-size:var(--calcite-loader-size, var(--calcite-internal-loader-size));block-size:var(--calcite-loader-size, var(--calcite-internal-loader-size))}.ring{position:absolute;inset-block-start:0px;transform-origin:center;overflow:visible;inset-inline-start:0;inline-size:var(--calcite-loader-size, var(--calcite-internal-loader-size));block-size:var(--calcite-loader-size, var(--calcite-internal-loader-size))}.ring--track{stroke:var(--calcite-loader-track-color, var(--calcite-color-transparent-press))}.ring--progress{stroke:var(--calcite-loader-progress-color, var(--calcite-color-brand));transform:rotate(-90deg);transition:all var(--calcite-internal-animation-timing-fast) linear}:host([type=indeterminate]) .ring--progress{animation:loader-clockwise calc(var(--calcite-internal-animation-timing-slow) / var(--calcite-internal-duration-factor) * 2 / var(--calcite-internal-duration-factor)) linear infinite}:host([inline]){--calcite-internal-stroke-width: 2;position:relative;margin:0;stroke:currentColor;stroke-width:2;padding-block:0px;block-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));min-block-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));inline-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));vertical-align:calc(var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline))) * -1 * .2)}:host([inline]) .rings{inset-block-start:0px;margin:0;inset-inline-start:0;inline-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));block-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)))}:host([inline]) .ring{inline-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));block-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)))}:host([inline]) .ring--progress{stroke:var(--calcite-loader-progress-color-inline, currentColor)}:host([complete]){opacity:0;transform:scale(.75);transform-origin:center;transition:opacity var(--calcite-internal-animation-timing-medium) linear 1s,transform var(--calcite-internal-animation-timing-medium) linear 1s}:host([complete]) .rings{opacity:0;transform:scale(.75);transform-origin:center;transition:opacity calc(.18s * var(--calcite-internal-duration-factor)) linear .8s,transform calc(.18s * var(--calcite-internal-duration-factor)) linear .8s}:host([complete]) .percentage{color:var(--calcite-color-brand);transform:scale(1.05);transform-origin:center;transition:color var(--calcite-internal-animation-timing-medium) linear,transform var(--calcite-internal-animation-timing-medium) linear}@keyframes loader-clockwise{0%{transform:rotate(0)}to{transform:rotate(360deg)}}:host([hidden]){display:none}[hidden]{display:none}`, Be = class Be extends R {
  constructor() {
    super(...arguments), this.messages = Tt({ name: null }), this.complete = !1, this.inline = !1, this.scale = "m", this.text = "", this.type = "indeterminate", this.value = 0;
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback(), this.updateFormatter();
  }
  load() {
    requestAnimationFrame(() => this.valueChangeHandler());
  }
  willUpdate(e) {
    e.has("value") && (this.hasUpdated || this.value !== 0) && this.valueChangeHandler(), (e.has("type") && (this.hasUpdated || this.type !== "indeterminate") || e.has("messages")) && this.updateFormatter();
  }
  // #endregion
  // #region Private Methods
  valueChangeHandler() {
    this.complete = this.type.startsWith("determinate") && this.value === 100;
  }
  formatValue() {
    return this.type !== "determinate-value" ? `${this.value}` : this.formatter.format(this.value / 100);
  }
  /**
   * Return the proper sizes based on the scale property
   *
   * @param scale
   */
  getSize(e) {
    return {
      s: 32,
      m: 64,
      l: 96
    }[e];
  }
  getInlineSize(e) {
    return {
      s: 12,
      m: 16,
      l: 24
    }[e];
  }
  updateFormatter() {
    var e;
    this.type !== "determinate-value" || ((e = this.formatter) == null ? void 0 : e.resolvedOptions().locale) === this.messages._lang || (this.formatter = new Intl.NumberFormat(this.messages._lang, {
      style: "percent"
    }));
  }
  // #endregion
  // #region Rendering
  render() {
    const { el: e, inline: i, label: s, text: n, type: o, value: r } = this, a = e.id || Bo(), c = o !== "indeterminate", l = Math.floor(r);
    return this.el.ariaLabel = s, this.el.ariaValueMax = c ? "100" : void 0, this.el.ariaValueMin = c ? "0" : void 0, this.el.ariaValueNow = c ? l.toString() : void 0, ro(this.el, "id", a), this.el.role = "progressbar", f`<div class=${m(Q.rings)}>${this.renderRing("track")}${this.renderRing("progress")}${!i && c && f`<div class=${m(Q.percentage)}>${this.formatValue()}</div>` || ""}</div>${!i && n && f`<div class=${m(Q.text)}>${n}</div>` || ""}`;
  }
  renderRing(e) {
    const { inline: i, scale: s, value: n } = this, o = i ? this.getInlineSize(s) : this.getSize(s), r = o * 0.45;
    let a;
    if (e === "progress") {
      const c = 2 * r * Math.PI, l = (this.type.startsWith("determinate") ? n : 24) / 100 * c, h = c - l;
      a = { "stroke-dasharray": `${l} ${h}` };
    }
    return f`<svg aria-hidden=true class=${m({
      [Q.ring]: !0,
      [Q.trackRing]: e === "track",
      [Q.progressRing]: e === "progress"
    })} style=${Ne(a)} viewBox=${`0 0 ${o} ${o}`}>${ft`<circle cx=${o / 2} cy=${o / 2} r=${r ?? v} />`}</svg>`;
  }
};
Be.properties = { complete: 7, inline: 7, label: 1, scale: 3, text: 1, type: 3, value: 9 }, Be.styles = Ho;
let gt = Be;
Ye("calcite-loader", gt);
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.0.3 */
function Ji(t, e, i) {
  if (!_e())
    return;
  const s = Fo(t);
  return new s(e, i);
}
function Fo(t) {
  class e extends window.MutationObserver {
    constructor(s) {
      super(s), this.observedEntry = [], this.callback = s;
    }
    observe(s, n) {
      return this.observedEntry.push({ target: s, options: n }), super.observe(s, n);
    }
    unobserve(s) {
      const n = this.observedEntry.filter((o) => o.target !== s);
      this.observedEntry = [], this.callback(super.takeRecords(), this), this.disconnect(), n.forEach((o) => this.observe(o.target, o.options));
    }
  }
  return function() {
    return t === "intersection" ? window.IntersectionObserver : t === "mutation" ? e : window.ResizeObserver;
  }();
}
function Wo(t) {
  const e = "dir", i = `[${e}]`, s = Zi(t, i);
  return s ? s.getAttribute(e) : "ltr";
}
function Go(t) {
  return t.getRootNode();
}
function qo(t) {
  return t.host || null;
}
function Zi(t, e) {
  return t ? t.closest(e) || Zi(qo(Go(t)), e) : null;
}
function Yo(t, e) {
  return t.filter((i) => i.matches(e));
}
function Ko(t) {
  return (!!t).toString();
}
function Jo(t) {
  return Xi(t) || Xo(t);
}
function Zo(t) {
  return Qo(t).filter((e) => e.nodeType === Node.TEXT_NODE).map((e) => e.textContent).join("").trim();
}
function Xo(t) {
  return !!Zo(t);
}
function Qo(t) {
  return t.currentTarget.assignedNodes({
    flatten: !0
  });
}
function Xi(t) {
  return !!er(t).length;
}
function er(t, e) {
  return tr(t.target, e);
}
function tr(t, e) {
  const i = t.assignedElements({
    flatten: !0
  });
  return e ? Yo(i, e) : i;
}
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.0.3 */
const ci = {
  scrim: "scrim",
  content: "content"
}, li = {
  s: 72,
  // Less than 72px.
  // medium is assumed default.
  l: 480
  // Greater than or equal to 480px.
}, ir = we`:host{position:absolute;inset:0;z-index:var(--calcite-z-index-overlay);display:flex;block-size:100%;inline-size:100%;flex-direction:column;align-items:stretch}@keyframes calcite-scrim-fade-in{0%{--tw-bg-opacity: 0 }to{--tw-text-opacity: 1 }}.scrim{position:absolute;inset:0;display:flex;flex-direction:column;align-content:center;align-items:center;justify-content:center;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-scrim-background, var(--calcite-color-transparent-scrim))}.content{padding:1rem}:host([hidden]){display:none}[hidden]{display:none}`;
var q;
let sr = (q = class extends R {
  constructor() {
    super(...arguments), this.resizeObserver = Ji("resize", () => this.handleResize()), this.hasContent = !1, this.loading = !1, this.messages = Tt();
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this.resizeObserver) == null || e.observe(this.el);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.resizeObserver) == null || e.disconnect();
  }
  // #endregion
  // #region Private Methods
  handleDefaultSlotChange(e) {
    this.hasContent = Jo(e);
  }
  storeLoaderEl(e) {
    this.loaderEl = e, this.handleResize();
  }
  getScale(e) {
    return e < li.s ? "s" : e >= li.l ? "l" : "m";
  }
  handleResize() {
    const { loaderEl: e, el: i } = this;
    e && (this.loaderScale = this.getScale(Math.min(i.clientHeight, i.clientWidth) ?? 0));
  }
  // #endregion
  // #region Rendering
  render() {
    const { hasContent: e, loading: i, messages: s } = this;
    return f`<div class=${m(ci.scrim)}>${i ? f`<calcite-loader .label=${s.loading} .scale=${this.loaderScale} ${Re(this.storeLoaderEl)}></calcite-loader>` : null}<div class=${m(ci.content)} .hidden=${!e}><slot @slotchange=${this.handleDefaultSlotChange}></slot></div></div>`;
  }
}, q.properties = { hasContent: 16, loaderScale: 16, loading: 7, messageOverrides: 0 }, q.styles = ir, q);
Ye("calcite-scrim", sr);
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.0.3 */
const hi = /* @__PURE__ */ new Set(), di = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 4,
  error: 8,
  off: 10
};
function nr(t) {
  return di[t] >= di[Uo];
}
function te(t, ...e) {
  nr(t) && console[t].call(this, "%ccalcite", "background: #007AC2; color: #fff; border-radius: 4px; padding: 2px 4px;", ...e);
}
let lt;
const or = {
  debug: (t) => te("debug", t),
  info: (t) => te("info", t),
  warn: (t) => te("warn", t),
  error: (t) => te("error", t),
  trace: (t) => te("trace", t),
  deprecated: rr
};
function rr(t, { component: e, name: i, suggested: s, removalVersion: n }) {
  const o = `${t}:${t === "component" ? "" : e}${i}`;
  if (hi.has(o))
    return;
  hi.add(o);
  const r = Array.isArray(s);
  r && !lt && (lt = new Intl.ListFormat("en", { style: "long", type: "disjunction" }));
  const a = `[${i}] ${t} is deprecated and will be removed in ${n === "future" ? "a future version" : `v${n}`}.${s ? ` Use ${r ? lt.format(s.map((c) => `"${c}"`)) : `"${s}"`} instead.` : ""}`;
  te("warn", a);
}
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.0.3 */
const ar = {
  flipRtl: "flip-rtl"
}, Qi = {}, ht = {}, es = {
  s: 16,
  m: 24,
  l: 32
};
function ts({ icon: t, scale: e }) {
  const i = es[e], s = hr(t), n = s.charAt(s.length - 1) === "F";
  return `${n ? s.substring(0, s.length - 1) : s}${i}${n ? "F" : ""}`;
}
async function cr(t) {
  const e = ts(t), i = is(e);
  if (i)
    return i;
  ht[e] || (ht[e] = fetch(Ki(`./assets/icon/${e}.json`)).then((n) => n.json()).catch(() => (or.error(`${t.icon} (${t.scale}) icon failed to load`), "")));
  const s = await ht[e];
  return Qi[e] = s, s;
}
function lr(t) {
  return is(ts(t));
}
function is(t) {
  return Qi[t];
}
function hr(t) {
  const e = !isNaN(Number(t.charAt(0))), i = t.split("-");
  if (i.length > 0) {
    const s = /[a-z]/i;
    t = i.map((n, o) => n.replace(s, function(r, a) {
      return o === 0 && a === 0 ? r : r.toUpperCase();
    })).join("");
  }
  return e ? `i${t}` : t;
}
const dr = we`:host{display:inline-flex;color:var(--calcite-icon-color, var(--calcite-ui-icon-color, currentColor))}:host([scale=s]){inline-size:16px;block-size:16px;min-inline-size:16px;min-block-size:16px}:host([scale=m]){inline-size:24px;block-size:24px;min-inline-size:24px;min-block-size:24px}:host([scale=l]){inline-size:32px;block-size:32px;min-inline-size:32px;min-block-size:32px}.flip-rtl{transform:scaleX(-1)}.svg{display:block}:host([hidden]){display:none}[hidden]{display:none}`, He = class He extends R {
  constructor() {
    super(...arguments), this.visible = !1, this.flipRtl = !1, this.icon = null, this.preload = !1, this.scale = "m";
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    if (super.connectedCallback(), this.preload) {
      this.visible = !0, this.loadIconPathData();
      return;
    }
    this.visible || this.waitUntilVisible(() => {
      this.visible = !0, this.loadIconPathData();
    });
  }
  willUpdate(e) {
    (e.has("icon") && (this.hasUpdated || this.icon !== null) || e.has("scale") && (this.hasUpdated || this.scale !== "m")) && this.loadIconPathData();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.intersectionObserver) == null || e.disconnect(), this.intersectionObserver = null;
  }
  // #endregion
  // #region Private Methods
  async loadIconPathData() {
    const { icon: e, scale: i, visible: s } = this;
    if (!_e() || !e || !s)
      return;
    const n = { icon: e, scale: i }, o = lr(n) || await cr(n);
    e === this.icon && (this.pathData = o);
  }
  waitUntilVisible(e) {
    if (this.intersectionObserver = Ji("intersection", (i) => {
      i.forEach((s) => {
        s.isIntersecting && (this.intersectionObserver.disconnect(), this.intersectionObserver = null, e());
      });
    }, { rootMargin: "50px" }), !this.intersectionObserver) {
      e();
      return;
    }
    this.intersectionObserver.observe(this.el);
  }
  // #endregion
  // #region Rendering
  render() {
    const { el: e, flipRtl: i, pathData: s, scale: n, textLabel: o } = this, r = Wo(e), a = es[n], c = !!o, l = [].concat(s || "");
    return this.el.ariaHidden = Ko(!c), this.el.ariaLabel = c ? o : null, this.el.role = c ? "img" : null, f`<svg aria-hidden=true class=${m({
      [ar.flipRtl]: r === "rtl" && i,
      svg: !0
    })} fill=currentColor height=100% viewBox=${`0 0 ${a} ${a}`} width=100% xmlns=http://www.w3.org/2000/svg>${l.map((h) => typeof h == "string" ? ft`<path d=${h ?? v} />` : ft`<path d=${h.d ?? v} opacity=${("opacity" in h ? h.opacity : 1) ?? v} />`)}</svg>`;
  }
};
He.properties = { pathData: 16, visible: 16, flipRtl: 7, icon: 3, preload: 7, scale: 3, textLabel: 1 }, He.styles = dr;
let vt = He;
Ye("calcite-icon", vt);
async function pr(t) {
  if (await t.componentOnReady(), !!_e())
    return t.requestUpdate(), new Promise((e) => requestAnimationFrame(() => e()));
}
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.0.3 */
function ur() {
  const { disabled: t } = this;
  t || HTMLElement.prototype.click.call(this);
}
function ss(t) {
  t.target.disabled && t.preventDefault();
}
const ns = ["mousedown", "mouseup", "click"];
function os(t) {
  t.target.disabled && (t.stopImmediatePropagation(), t.preventDefault());
}
const je = { capture: !0 };
function mr(t) {
  if (t.disabled) {
    t.el.setAttribute("aria-disabled", "true"), t.el.contains(document.activeElement) && document.activeElement.blur(), fr(t);
    return;
  }
  vr(t), t.el.removeAttribute("aria-disabled");
}
function fr(t) {
  t.el.click = ur, gr(t.el);
}
function gr(t) {
  t.addEventListener("pointerdown", ss, je), ns.forEach((e) => t.addEventListener(e, os, je));
}
function vr(t) {
  delete t.el.click, yr(t.el);
}
function yr(t) {
  t.removeEventListener("pointerdown", ss, je), ns.forEach((e) => t.removeEventListener(e, os, je));
}
const br = {
  container: "interaction-container"
}, $r = ({ children: t, disabled: e }) => f`<div class=${m(br.container)} .inert=${e}>${t}</div>`;
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.0.3 */
function wr(t) {
  return t === "Enter" || t === " ";
}
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.0.3 */
function dt(t) {
  return t === "l" ? "m" : "s";
}
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.0.3 */
const x = {
  title: "title",
  close: "close",
  imageContainer: "image-container",
  chipIcon: "chip-icon",
  textSlotted: "text--slotted",
  container: "container",
  imageSlotted: "image--slotted",
  closable: "closable",
  multiple: "multiple",
  single: "single",
  selectable: "selectable",
  selectIcon: "select-icon",
  selectIconActive: "select-icon--active",
  nonInteractive: "non-interactive",
  isCircle: "is-circle",
  selected: "selected"
}, _r = {
  image: "image"
}, Le = {
  close: "x",
  checkedSingle: "circle-f",
  uncheckedMultiple: "square",
  checkedMultiple: "check-square-f"
}, xr = we`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-flex;cursor:default;border-radius:var(--calcite-chip-corner-radius, 9999px)}:host([closed]){display:none}:host([appearance=outline]) .container,:host([appearance=outline-fill]) .container{color:var(--calcite-chip-text-color, var(--calcite-color-text-1))}:host([appearance=outline]) .close,:host([appearance=outline-fill]) .close{color:var(--calcite-chip-close-icon-color, var(--calcite-close-icon-color, var(--calcite-color-text-3)))}:host([appearance=outline]):host([kind=brand]) .container,:host([appearance=outline-fill]):host([kind=brand]) .container{border-color:var(--calcite-chip-border-color, var(--calcite-color-brand))}:host([appearance=outline]):host([kind=inverse]) .container,:host([appearance=outline-fill]):host([kind=inverse]) .container{border-color:var(--calcite-chip-border-color, var(--calcite-color-border-inverse))}:host([appearance=outline]):host([kind=neutral]) .container,:host([appearance=outline-fill]):host([kind=neutral]) .container{border-color:var(--calcite-chip-border-color, var(--calcite-color-border-1))}:host([appearance=outline]) .container{background-color:transparent}:host([appearance=outline-fill]) .container{background-color:var(--calcite-chip-background-color, var(--calcite-color-foreground-1))}:host([appearance=solid]) .container{border-color:transparent}:host([appearance=solid]):host([kind=brand]) .container,:host([appearance=solid]):host([kind=inverse]) .container{color:var(--calcite-chip-text-color, var(--calcite-color-text-inverse))}:host([appearance=solid]):host([kind=brand]) .close,:host([appearance=solid]):host([kind=inverse]) .close{outline-color:var(--calcite-color-text-inverse)}:host([appearance=solid]):host([kind=brand]) .container{background-color:var(--calcite-chip-background-color, var(--calcite-color-brand))}:host([appearance=solid]):host([kind=inverse]) .container{background-color:var(--calcite-chip-background-color, var(--calcite-color-inverse))}:host([appearance=solid]):host([kind=inverse]) .close:hover{background-color:var(--calcite-color-inverse-hover)}:host([appearance=solid]):host([kind=inverse]) .close:active{background-color:var(--calcite-color-inverse-press)}:host([appearance=solid]):host([kind=neutral]) .container{background-color:var(--calcite-chip-background-color, var(--calcite-color-foreground-2))}:host([kind=neutral]) .container{color:var(--calcite-chip-text-color, var(--calcite-color-text-1))}:host([kind=neutral]) .close{color:var(--calcite-chip-close-icon-color, var(--calcite-close-icon-color, var(--calcite-color-text-3)))}:host([selected]) .select-icon{opacity:1}:host([scale=s]) .container{--calcite-internal-chip-block-size: var(--calcite-size-sm, 1.5rem) ;--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-font-size: var(--calcite-font-size--2);--calcite-internal-chip-icon-size: var(--calcite-size-xs, 1rem) ;--calcite-internal-chip-icon-space: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-image-size: var(--calcite-spacing-xl, 1.25rem) ;--calcite-internal-chip-title-space: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-close-size: var(--calcite-size-xs, 1rem) }:host([scale=s]) .container:not(.closable).is-circle{--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px);--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-px)}:host([scale=s]) .container.image--slotted:has(.chip-icon),:host([scale=s]) .container.image--slotted.text--slotted,:host([scale=s]) .container.image--slotted.closable{--calcite-internal-chip-image-space-x-end: var(--calcite-spacing-xxs, .25rem) }:host([scale=s]) .container.image--slotted:not(.text--slotted,:has(.chip-icon)),:host([scale=s]) .container.image--slotted:not(.selectable){--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px)}:host([scale=s]) .container.selectable.single:not(.is-circle).image--slotted{--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px)}:host([scale=s]) .container.selectable.single:not(.is-circle).selected{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-none, 0)}:host([scale=s]) .container.selectable.single:not(.is-circle).selected.image--slotted{--calcite-internal-chip-select-space-x-end: .5rem ;--calcite-internal-chip-select-space-x-start: .125rem }:host([scale=s]) .container.multiple:not(.is-circle){--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=s]) .container.multiple:not(.is-circle).image--slotted{--calcite-internal-chip-select-space-x-end: .5rem ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px)}:host([scale=s]) .container.multiple:not(.is-circle).image--slotted:not(.text--slotted){--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xs, .375rem) }:host([scale=m]) .container{--calcite-internal-chip-block-size: var(--calcite-size-md, 2rem) ;--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-font-size: var(--calcite-font-size--1);--calcite-internal-chip-icon-size: var(--calcite-size-sm, 1.5rem) ;--calcite-internal-chip-icon-space: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-image-size: var(--calcite-size-sm, 1.5rem) ;--calcite-internal-chip-title-space: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-close-size: var(--calcite-size-sm, 1.5rem) }:host([scale=m]) .container:not(.closable).is-circle{--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-px);--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px)}:host([scale=m]) .container.image--slotted:not(.is-circle){--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=m]) .container.image--slotted:has(.chip-icon),:host([scale=m]) .container.image--slotted.text--slotted,:host([scale=m]) .container.image--slotted.closable{--calcite-internal-chip-image-space-x-end: var(--calcite-spacing-xs, .375rem) }:host([scale=m]) .container.selectable.single:not(.is-circle).image--slotted{--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=m]) .container.selectable.single:not(.is-circle).selected{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-px);--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-none, 0)}:host([scale=m]) .container.selectable.single:not(.is-circle).selected.image--slotted{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xs, .375rem) }:host([scale=m]) .container.multiple:not(.is-circle){--calcite-internal-chip-select-space-x-end: .125rem ;--calcite-internal-chip-select-space-x-start: .125rem }:host([scale=m]) .container.multiple:not(.is-circle).image--slotted{--calcite-internal-chip-select-space-x-end: .5rem ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=m]) .container.closable:not(.is-circle){--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xxs, .25rem) }:host([scale=l]) .container{--calcite-internal-chip-block-size: 2.75rem ;--calcite-internal-chip-container-space-x-end: .5rem ;--calcite-internal-chip-container-space-x-start: .5rem ;--calcite-internal-chip-font-size: var(--calcite-font-size-0);--calcite-internal-chip-icon-size: var(--calcite-size-md, 2rem) ;--calcite-internal-chip-icon-space: .5rem ;--calcite-internal-chip-image-size: var(--calcite-size-md, 2rem) ;--calcite-internal-chip-title-space: .5rem ;--calcite-internal-close-size: var(--calcite-size-md, 2rem) }:host([scale=l]) .container:not(.closable).is-circle{--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=l]) .container.image--slotted:not(.is-circle){--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xs, .375rem) }:host([scale=l]) .container.image--slotted:has(.chip-icon),:host([scale=l]) .container.image--slotted.text--slotted,:host([scale=l]) .container.image--slotted.closable{--calcite-internal-chip-image-space-x-end: .5rem }:host([scale=l]) .container.selectable.single:not(.is-circle).image--slotted{--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xs, .375rem) }:host([scale=l]) .container.selectable.single:not(.is-circle).selected{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-none, 0)}:host([scale=l]) .container.selectable.single:not(.is-circle).selected.image--slotted{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-select-space-x-start: .5rem }:host([scale=l]) .container.multiple:not(.is-circle){--calcite-internal-chip-container-space-x-start: .5rem ;--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=l]) .container.multiple:not(.is-circle).image--slotted{--calcite-internal-chip-select-space-x-end: .75rem }:host([scale=l]) .container.closable:not(.is-circle){--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xs, .375rem) }.container{box-sizing:border-box;display:inline-flex;block-size:100%;max-inline-size:100%;align-items:center;justify-content:center;font-weight:var(--calcite-font-weight-medium);outline-color:transparent;border-radius:var(--calcite-chip-corner-radius, 9999px);border-width:var(--calcite-border-width-sm);border-style:solid;font-size:var(--calcite-internal-chip-font-size, var(--calcite-font-size));padding-inline-start:var(--calcite-internal-chip-container-space-x-start);padding-inline-end:var(--calcite-internal-chip-container-space-x-end);block-size:var(--calcite-internal-chip-block-size, auto);inline-size:var(--calcite-internal-chip-inline-size, auto);min-inline-size:var(--calcite-internal-chip-block-size, auto)}.container:hover .select-icon--active{opacity:var(--calcite-opacity-full, 1)}.container.selectable{cursor:pointer}.container:not(.non-interactive):focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.container.text--slotted .title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.container:not(.text--slotted) .title,.container:not(.image--slotted) .image-container{display:none}.container.is-circle .chip-icon,.container.is-circle .image-container{padding:var(--calcite-spacing-none, 0)}.title{padding-inline:var(--calcite-internal-chip-title-space)}.image-container{display:inline-flex;overflow:hidden;align-items:center;justify-content:center;pointer-events:none;block-size:var(--calcite-internal-chip-image-size, var(--calcite-spacing-xxl, 1.5rem));inline-size:var(--calcite-internal-chip-image-size, var(--calcite-spacing-xxl, 1.5rem));padding-inline-start:var(--calcite-spacing-none, 0);padding-inline-end:var(--calcite-internal-chip-image-space-x-end, 0)}.chip-icon{position:relative;margin-block:0px;display:inline-flex;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);color:var(--calcite-chip-icon-color, var(--calcite-chip-text-color, var(--calcite-icon-color, currentColor)));padding-inline:var(--calcite-internal-chip-icon-space, var(--calcite-spacing-xs, .375rem))}.select-icon{align-self:center;justify-content:center;align-items:center;display:flex;inset-block-start:-1px;position:absolute;visibility:hidden;inline-size:auto;opacity:0;transition:opacity .15s ease-in-out,inline-size .15s ease-in-out;color:var(--calcite-chip-select-icon-color, currentColor)}.select-icon.select-icon--active{position:relative;visibility:visible;opacity:var(--calcite-opacity-half, .5);color:var(--calcite-chip-select-icon-color-pressed, var(--calcite-chip-select-icon-color, currentColor))}.multiple .select-icon{display:flex;align-items:center;justify-content:center}.multiple .select-icon,.single .select-icon--active{padding-inline-start:var(--calcite-internal-chip-select-space-x-start);padding-inline-end:var(--calcite-internal-chip-select-space-x-end);block-size:var(--calcite-internal-chip-icon-size, var(--calcite-spacing-xxl, 1.5rem));inline-size:var(--calcite-internal-chip-icon-size, var(--calcite-spacing-xxl, 1.5rem))}slot[name=image]::slotted(*){display:flex;block-size:100%;inline-size:100%;overflow:hidden;border-radius:50%}.close{margin:0;cursor:pointer;align-items:center;border-radius:50%;border-style:none;outline-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-close-background-color, var(--calcite-color-transparent));-webkit-appearance:none;display:flex;align-content:center;justify-content:center;color:var(--calcite-chip-close-icon-color, var(--calcite-close-icon-color, currentColor));block-size:var(--calcite-internal-close-size, var(--calcite-spacing-xxl, 1.5rem));inline-size:var(--calcite-internal-close-size, var(--calcite-spacing-xxl, 1.5rem));padding:0}.close:hover,.close:focus{background-color:var(--calcite-close-background-color-hover, var(--calcite-color-transparent-hover))}.close:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.close:active{background-color:var(--calcite-close-background-color-press, var(--calcite-color-transparent-press))}.close calcite-icon{color:inherit}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
var Y;
let Er = (Y = class extends R {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.closeButtonEl = ii(), this.containerEl = ii(), this.hasImage = !1, this.hasText = !1, this.appearance = "solid", this.closable = !1, this.closed = !1, this.closeOnDelete = !1, this.disabled = !1, this.iconFlipRtl = !1, this.interactive = !1, this.kind = "neutral", this.messages = Tt(), this.scale = "m", this.selected = !1, this.selectionMode = "none", this.calciteChipClose = V({ cancelable: !1 }), this.calciteChipSelect = V({ cancelable: !1 }), this.calciteInternalChipKeyEvent = V({ cancelable: !1 }), this.calciteInternalChipSelect = V({ cancelable: !1 }), this.calciteInternalSyncSelectedChips = V({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler), this.listen("click", this.clickHandler);
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    var e, i;
    await pr(this), !this.disabled && this.interactive ? (e = this.containerEl.value) == null || e.focus() : !this.disabled && this.closable && ((i = this.closeButtonEl.value) == null || i.focus());
  }
  async load() {
    _e() && this.updateHasText();
  }
  willUpdate(e) {
    e.has("selected") && this.hasUpdated && this.watchSelected(this.selected);
  }
  updated() {
    mr(this);
  }
  loaded() {
    this.selectionMode !== "none" && this.interactive && this.selected && this.handleSelectionPropertyChange(this.selected);
  }
  // #endregion
  // #region Private Methods
  watchSelected(e) {
    this.selectionMode !== "none" && this.handleSelectionPropertyChange(e);
  }
  keyDownHandler(e) {
    if (e.target === this.el)
      switch (e.key) {
        case " ":
        case "Enter":
          this.handleEmittingEvent(), e.preventDefault();
          break;
        case "Backspace":
        case "Delete":
          this.closable && !this.closed && this.closeOnDelete && (e.preventDefault(), this.close());
          break;
        case "ArrowRight":
        case "ArrowLeft":
        case "Home":
        case "End":
          this.calciteInternalChipKeyEvent.emit(e), e.preventDefault();
          break;
      }
  }
  clickHandler() {
    !this.interactive && this.closable && this.closeButtonEl.value.focus();
  }
  handleDefaultSlotChange() {
    this.updateHasText();
  }
  close() {
    this.calciteChipClose.emit(), this.selected = !1, this.closed = !0;
  }
  closeButtonKeyDownHandler(e) {
    wr(e.key) && (e.preventDefault(), this.close());
  }
  updateHasText() {
    this.hasText = this.el.textContent.trim().length > 0;
  }
  handleSlotImageChange(e) {
    this.hasImage = Xi(e);
  }
  handleEmittingEvent() {
    this.interactive && this.calciteChipSelect.emit();
  }
  handleSelectionPropertyChange(e) {
    this.selectionMode === "single" && this.calciteInternalSyncSelectedChips.emit(), !this.parentChipGroup.selectedItems.includes(this.el) && e && this.selectionMode !== "multiple" && this.calciteInternalChipSelect.emit(), this.selectionMode !== "single" && this.calciteInternalSyncSelectedChips.emit();
  }
  // #endregion
  // #region Rendering
  renderChipImage() {
    return f`<div class=${m(x.imageContainer)}><slot name=${_r.image} @slotchange=${this.handleSlotImageChange}></slot></div>`;
  }
  renderSelectionIcon() {
    const e = this.selectionMode === "multiple" ? this.selected ? Le.checkedMultiple : Le.uncheckedMultiple : this.selected ? Le.checkedSingle : void 0;
    return f`<div class=${m({
      [x.selectIcon]: !0,
      [x.selectIconActive]: this.selectionMode === "multiple" || this.selected
    })}>${e ? f`<calcite-icon .icon=${e} .scale=${dt(this.scale)}></calcite-icon>` : null}</div>`;
  }
  renderCloseButton() {
    return f`<button .ariaLabel=${this.messages.dismissLabel} class=${m(x.close)} @click=${this.close} @keydown=${this.closeButtonKeyDownHandler} .tabIndex=${this.disabled ? -1 : 0} ${Re(this.closeButtonEl)}><calcite-icon .icon=${Le.close} .scale=${dt(this.scale)}></calcite-icon></button>`;
  }
  renderIcon() {
    return f`<calcite-icon class=${m(x.chipIcon)} .flipRtl=${this.iconFlipRtl} .icon=${this.icon} .scale=${dt(this.scale)}></calcite-icon>`;
  }
  render() {
    const { disabled: e } = this, i = e || !e && !this.interactive, s = this.selectionMode === "multiple" && this.interactive ? "checkbox" : this.selectionMode !== "none" && this.interactive ? "radio" : this.interactive ? "button" : "img";
    return $r({ disabled: e, children: f`<div .ariaChecked=${this.selectionMode !== "none" && this.interactive ? this.selected : void 0} .ariaLabel=${this.label} class=${m({
      [x.container]: !0,
      [x.textSlotted]: this.hasText,
      [x.imageSlotted]: this.hasImage,
      [x.selectable]: this.selectionMode !== "none",
      [x.multiple]: this.selectionMode === "multiple",
      [x.single]: this.selectionMode === "single" || this.selectionMode === "single-persist",
      [x.selected]: this.selected,
      [x.closable]: this.closable,
      [x.nonInteractive]: !this.interactive,
      [x.isCircle]: !this.closable && !this.hasText && (!this.icon || !this.hasImage) && (this.selectionMode === "none" || !!this.selectionMode && this.selectionMode !== "multiple" && !this.selected)
    })} @click=${this.handleEmittingEvent} .role=${s} .tabIndex=${i ? -1 : 0} ${Re(this.containerEl)}>${this.selectionMode !== "none" && this.renderSelectionIcon() || ""}${this.renderChipImage()}${this.icon && this.renderIcon() || ""}<span class=${m(x.title)}><slot @slotchange=${this.handleDefaultSlotChange}></slot></span>${this.closable && this.renderCloseButton() || ""}</div>` });
  }
}, Y.properties = { hasImage: 16, hasText: 16, appearance: 3, closable: 7, closed: 7, closeOnDelete: 7, disabled: 7, icon: 3, iconFlipRtl: 7, interactive: 5, kind: 3, label: 1, messageOverrides: 0, parentChipGroup: 0, scale: 3, selected: 7, selectionMode: 1, value: 1 }, Y.styles = xr, Y);
Ye("calcite-chip", Er);
/*! All material copyright Esri, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.32/esri/copyright.txt for details.
v4.32.7 */
const L = "esri-basemap-gallery", k = {
  base: L,
  sourceLoading: `${L}--source-loading`,
  // When set, the items are be displayed in a grid instead of stacked vertically.
  layoutGrid: `${L}--grid`,
  // When set, the thumbnail of each item is narrower, to allow the title to be wider.
  narrowItems: `${L}--narrow-items`,
  loader: `${L}__loader`,
  item: `${L}__item`,
  itemContainer: `${L}__item-container`,
  itemContent: `${L}__item-content`,
  itemTitle: `${L}__item-title`,
  itemTagsContainer: `${L}__item-tags-container`,
  itemThumbnail: `${L}__item-thumbnail`,
  selectedItem: `${L}__item--selected`,
  itemError: `${L}__item--error`
};
/*! All material copyright Esri, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.32/esri/copyright.txt for details.
v4.32.7 */
function Cr(t) {
  var e;
  return ((e = t.portalItem) == null ? void 0 : e.type) === "Web Scene" || t.referenceLayers.some((i) => i.type === "scene");
}
function Lr(t) {
  var e, i;
  return !!((i = (e = t == null ? void 0 : t.portalItem) == null ? void 0 : e.tags) != null && i.some((s) => s.toLowerCase() === "beta"));
}
var K;
let kr = (K = class extends R {
  constructor() {
    super(...arguments), this._itemState = "loading", this._isActive = !1;
  }
  //#endregion
  //#region Lifecycle
  loaded() {
    this.manager.onLifecycle(() => [
      De(() => this.item.state, (e) => {
        this._itemState = e;
      }, { sync: !0 }),
      De(() => this.viewModel.activeBasemap, (e) => {
        var i;
        this._isActive = this.item.basemap.id === (e == null ? void 0 : e.id), this._isActive && ((i = this.el.childElem) == null || i.focus(), this.el.scrollIntoView({ block: "nearest" }));
      }, { initial: !0, sync: !0 })
    ]);
  }
  //#endregion
  //#region Rendering
  render() {
    var w, _;
    const { disabled: e, item: i, itemIndex: s, viewModel: n, messages: o } = this, r = i.basemap.thumbnailUrl || Hi("assets/basemap-gallery/images/basemap-toggle-64.svg"), a = i.basemap.title, c = (w = i.basemap.portalItem) == null ? void 0 : w.snippet, l = ((_ = i.error) == null ? void 0 : _.message) || c || a, { activeBasemapIndex: h } = n, d = h === s, p = d || h === -1 && s === 0 ? 0 : -1, g = {
      [k.selectedItem]: d,
      [k.itemError]: i.state === "error"
    }, $ = `basemapgallery-item-${i.uid}`;
    return f`<div .ariaChecked=${d} .ariaDisabled=${e} aria-labelledby=${$ ?? B} class=${m(A(k.item, g))} role=radio tabindex=${p ?? B} title=${l ?? B} @click=${() => {
      i.state === "ready" && (n.activeBasemap = i.basemap);
    }}><img alt class=${m(k.itemThumbnail)} src=${r ?? B}><div class=${m(k.itemContent)}><div class=${m(k.itemTitle)}><span id=${$ ?? B}>${a}</span></div>${Cr(i.basemap) ? Sr(i.basemap, o) : null}</div>${i.state !== "loading" ? null : f`<calcite-scrim><span aria-hidden=true class=${m(T.loaderAnimation)} role=presentation></span></calcite-scrim>`}</div>`;
  }
}, K.properties = { _itemState: 16, _isActive: 16, disabled: 5, item: 0, itemIndex: 9, viewModel: 0, messages: 0 }, K.shadowRootOptions = ge, K);
function Sr(t, e) {
  return f`<div class=${m(k.itemTagsContainer)}>${Ar(e)}${Lr(t) ? Or(e) : null}</div>`;
}
function Ar(t) {
  return f`<calcite-chip scale=s .label=${t.tag3D}>${t.tag3D}</calcite-chip>`;
}
function Or(t) {
  return f`<calcite-chip appearance=outline-fill scale=s .label=${t.tagBeta}>${t.tagBeta}</calcite-chip>`;
}
zt("arcgis-basemap-gallery-item", kr);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rs = Symbol.for(""), Pr = (t) => {
  if ((t == null ? void 0 : t.r) === rs) return t == null ? void 0 : t._$litStatic$;
}, Dr = (t) => ({ _$litStatic$: t, r: rs }), pi = /* @__PURE__ */ new Map(), zr = (t) => (e, ...i) => {
  const s = i.length;
  let n, o;
  const r = [], a = [];
  let c, l = 0, h = !1;
  for (; l < s; ) {
    for (c = e[l]; l < s && (o = i[l], (n = Pr(o)) !== void 0); ) c += n + e[++l], h = !0;
    l !== s && a.push(o), r.push(c), l++;
  }
  if (l === s && r.push(e[s]), h) {
    const d = r.join("$$lit$$");
    (e = pi.get(d)) === void 0 && (r.raw = r, pi.set(d, e = r)), i = a;
  }
  return t(e, ...i);
}, Tr = zr(f);
/*! All material copyright Esri, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.32/esri/copyright.txt for details.
v4.32.7 */
function Ur({ level: t, class: e, children: i }) {
  const s = Mr(t), n = `h${s}`, o = Dr(n);
  return Tr`<${o} .ariaLevel=${String(s)} class=${m(A(T.heading, e))} role=heading>${i}</${o}>`;
}
function Nr(t, e, i) {
  return Math.min(Math.max(t, e), i);
}
function Mr(t) {
  return Nr(Math.ceil(t), 1, 6);
}
const Rr = we`@layer{arcgis-basemap-gallery{display:block}}`, Ir = qi(Us), ke = {
  // Below this width, items are displayed as a single column and the thumbnail is placed above the title.
  small: 200,
  // Below this width, items are displayed as a single column but with the thumbnail side-by-side
  // with the title. The title is square.
  default: 280,
  // Below this width, items are displayed as in `default`, but the thumbnail has an aspect ratio of 1.5
  // Above this width, items are displayed in a grid.
  wide: 420
}, me = class me extends R {
  constructor() {
    super(...arguments), this.messages = Gi({}), this.viewModel = Ir(this), this._width = 0, this._state = "", this.activeBasemap = this.viewModel.activeBasemap, this.autoDestroyDisabled = !1, this.disabled = !1, this.headingLevel = 2, this.icon = "basemap", this.label = "", this.position = "bottom-left", this.source = this.viewModel.source, this.state = this.viewModel.state, this.arcgisPropertyChange = Un()("activeBasemap", "state"), this.arcgisReady = V();
  }
  //#endregion
  //#region Public Methods
  /** Permanently destroy the component */
  async destroy() {
    await this.manager.destroy();
  }
  //#endregion
  //#region Lifecycle
  loaded() {
    this.manager.onLifecycle(() => [
      ps(() => this.source, () => {
        this.viewModel.loadSource();
      }, { sync: !0, initial: !0 }),
      De(() => this.source.state, () => {
        this._state = this.source.state;
      }, { sync: !0 })
    ]);
    const e = new ResizeObserver((s) => {
      for (const n of s)
        this._width = n.contentRect.width;
    }), i = this.el.childElem;
    i && e.observe(i);
  }
  //#endregion
  //#region Private Methods
  _getRoundRobinIndex(e, i) {
    return (e + i) % i;
  }
  _handleKeyDown(e) {
    const { key: i } = e;
    if (!["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(i))
      return;
    e.preventDefault();
    const { items: s, activeBasemapIndex: n } = this.viewModel, o = i === "ArrowUp" || i === "ArrowLeft" ? this._getRoundRobinIndex(Math.max(n - 1, -1), s.length) : this._getRoundRobinIndex(n + 1, s.length), r = s.at(o);
    (r == null ? void 0 : r.state) === "ready" && (this.viewModel.activeBasemap = r.basemap);
  }
  //#endregion
  //#region Rendering
  render() {
    const e = this.source.state === "loading", i = this.disabled || this.state === "disabled", s = this.viewModel.items, n = {
      [k.sourceLoading]: e,
      [T.disabled]: i,
      "esri-component": !0
      // For compatibility with Esri View UI
    }, o = this._width;
    o <= ke.small || o >= ke.wide ? n[k.layoutGrid] = !0 : o < ke.default && (n[k.narrowItems] = !0);
    const r = e ? f`<div class=${m(k.loader)}></div>` : null, a = e ? null : s.length > 0 ? f`<div aria-disabled=${this.disabled ?? B} aria-label=${this.label ?? B} class=${m(k.itemContainer)} @keydown=${this._handleKeyDown} role=radiogroup>${s.map((c, l) => f`<arcgis-basemap-gallery-item .disabled=${i} .item=${c} .itemIndex=${l} .viewModel=${this.viewModel} .messages=${this.messages}></arcgis-basemap-gallery-item>`)}</div>` : f`<div class=${m(T.empty)}>${Ur({ level: this.headingLevel, children: this.messages.noBasemaps })}</div>`;
    return f`<div class=${m(A(k.base, T.widget, T.panel, n))} style=${Ne({
      "--esri-basemap-gallery-small": `${ke.small}px`
    })}>${[r, a]}</div>`;
  }
};
me.properties = { _width: 16, _state: 16, activeBasemap: 0, autoDestroyDisabled: 5, disabled: 7, headingLevel: 9, icon: 1, label: 1, position: 1, referenceElement: 1, source: 0, state: 3 }, me.shadowRootOptions = ge, me.styles = Rr;
let yt = me;
zt("arcgis-basemap-gallery", yt);
var jr = Object.defineProperty, Vr = Object.getOwnPropertyDescriptor, as = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Vr(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && jr(e, i, n), n;
};
let Ve = class extends js {
  constructor(t) {
    super(t);
  }
  postInitialize() {
    Rs.watch(() => [this.mainView.center, this.mainView.interacting, this.mainView.scale], () => {
      this.onViewChange();
    });
  }
  render() {
    return setTimeout(() => {
      this.expand.expanded && this.onViewChange();
    }, 10), /* @__PURE__ */ Is("div", { id: `${this.id}_cont`, style: "width:250px;height:150px;background:#fff" });
  }
  onViewChange() {
    this.expand.expanded && (!this.overview && document.getElementById(`${this.id}_cont`) && (this.createMap(), this.createExtentGraphic()), this.overview && (this.overview.center = this.mainView.center, this.overview.scale = this.mainView.scale * this.factor, this.extentGraphic.geometry = this.mainView.extent));
  }
  createMap() {
    const t = new fi({
      basemap: this.basemap
    }), e = bt.create({
      spatialReference: this.mainView.spatialReference,
      numLODs: this.scales.length,
      scales: this.scales
    });
    this.overview = new gi({
      container: `${this.id}_cont`,
      map: t,
      scale: this.mainView.scale,
      center: this.mainView.center,
      spatialReference: this.mainView.spatialReference,
      constraints: {
        rotationEnabled: !1,
        lods: e.lods
      },
      ui: {
        components: []
      }
    }), this.overview.when(() => {
      const i = (s) => {
        s.stopPropagation();
      };
      this.overview.on("mouse-wheel", i), this.overview.on("double-click", i), this.overview.on("double-click", ["Control"], i), this.overview.on("drag", i), this.overview.on("drag", ["Shift"], i), this.overview.on("drag", ["Shift", "Control"], i), this.overview.on("key-down", (s) => {
        const n = [
          "+",
          "-",
          "Shift",
          "_",
          "=",
          "ArrowUp",
          "ArrowDown",
          "ArrowRight",
          "ArrowLeft"
        ], o = s.key;
        n.indexOf(o) !== -1 && s.stopPropagation();
      });
    });
  }
  createExtentGraphic() {
    const t = {
      type: "simple-fill",
      color: [0, 0, 0, 0.5],
      outline: null
    };
    this.extentGraphic = new fe({
      symbol: t
    }), this.overview.graphics.add(this.extentGraphic);
  }
};
as([
  Ns()
], Ve.prototype, "expand", 2);
Ve = as([
  Ms("esri.widgets.Overview")
], Ve);
class Se {
  static addOverview(e, i, s, n, o) {
    const r = new Ve({
      basemap: e,
      mainView: i,
      scales: s,
      factor: n
    }), a = new xe({
      expandIcon: "map",
      view: i,
      content: r,
      expanded: o === "expanded",
      mode: "floating",
      autoCollapse: !1,
      group: "api"
    });
    r.expand = a, i.ui.add(a, {
      position: "bottom-right"
    });
  }
  static addLayerList(e, i) {
    const s = new Ts({
      view: e
    }), n = new xe({
      expandIcon: "layers",
      view: e,
      content: s,
      expanded: i === "expanded",
      mode: "floating",
      autoCollapse: !1,
      group: "api"
    });
    e.ui.add(n, {
      position: "top-right"
    });
  }
  static addBasemapGallery(e, i) {
    const s = document.createElement("arcgis-basemap-gallery");
    s.source = new Os({
      basemaps: e
    }), s.view = i;
    const n = document.createElement("div");
    n.appendChild(s);
    const o = new xe({
      expandIcon: "basemap",
      view: i,
      content: n,
      mode: "floating",
      autoCollapse: !0,
      group: "api"
    });
    i.ui.add(o, {
      position: "top-right"
    });
  }
  static addCoordinates(e, i) {
    const s = new Ps({
      view: e
    });
    s.visibleElements = {
      expandButton: !1
    }, s.when(() => {
      const o = setInterval(() => {
        const l = document.getElementsByClassName("esri-coordinate-conversion")[0];
        l && (clearInterval(o), l.style.width = "300px");
      }, 50), r = s.formats.find((l) => l.name === "basemap"), a = new zs({
        name: "mn95",
        coordinateSegments: r.coordinateSegments,
        spatialReference: r.spatialReference
      });
      s.formats = s.formats.filter((l) => l.name === "dd"), s.formats.add(a, 0), s.conversions.removeAll();
      const c = new Ds({
        format: a
      });
      s.conversions.add(c);
    });
    const n = new xe({
      expandIcon: "gps-on",
      view: e,
      content: s,
      expanded: i === "expanded",
      mode: "floating",
      autoCollapse: !1,
      group: "api"
    });
    e.ui.add(n, {
      position: "bottom-right"
    });
  }
}
class Br {
  constructor(e) {
    this.config = e, this.markerLayerName = "markerLayer", this.layerUtils = new Po(e);
  }
  init(e) {
    const i = this.layerUtils.getBasemaps(this.config.basemaps), s = new fi({
      basemap: i[0]
    }), n = new mi({
      wkid: this.config.spatialReference
    }), o = new U({
      x: this.config.center[0],
      y: this.config.center[1],
      spatialReference: n
    }), r = bt.create({
      spatialReference: n,
      numLODs: this.config.scales.length,
      scales: this.config.scales
    }), a = new Mt({
      xmin: this.config.globalExtent.xmin,
      ymin: this.config.globalExtent.ymin,
      xmax: this.config.globalExtent.xmax,
      ymax: this.config.globalExtent.ymax,
      spatialReference: n
    });
    this.view = new gi({
      container: this.config.container,
      map: s,
      scale: this.config.scale,
      center: o,
      spatialReference: n,
      constraints: {
        rotationEnabled: !1,
        lods: r.lods,
        minScale: this.config.minScale,
        maxScale: this.config.maxScale,
        geometry: a
      },
      popup: {
        dockEnabled: !0,
        dockOptions: {
          buttonEnabled: !1,
          breakpoint: !1
        },
        viewModel: {
          includeDefaultActions: !1
        }
      }
    }), this.view.when(() => {
      e.emit("map-created");
    });
    const c = document.createElement("arcgis-scale-bar");
    if (c.setAttribute("bar-style", "line"), c.setAttribute("unit", "metric"), c.view = this.view, this.view.ui.add(c, "bottom-left"), this.config.layers && this.config.vectorServiceUrl && this.layerUtils.getMapImageLayers(this.config.layers).then((l) => {
      this.view.map.addMany(l.reverse());
    }), i.length > 1 && Se.addBasemapGallery(i, this.view), this.config.layerList && Se.addLayerList(this.view, this.config.layerList), this.config.overviewDisplay && this.config.overviewBasemap) {
      const l = this.layerUtils.getBasemaps([this.config.overviewBasemap])[0];
      Se.addOverview(l, this.view, this.config.scales, this.config.overviewFactor, this.config.overviewDisplay);
    }
    this.config.showCoords && Se.addCoordinates(this.view, this.config.showCoords), this.view.on("click", (l) => {
      l.native.ctrlKey && (l.stopPropagation(), e.emit("ctrlClick", [l.mapPoint.x, l.mapPoint.y]));
    });
  }
  center(e, i) {
    this.view.center = new U({
      x: e[0],
      y: e[1],
      spatialReference: this.view.spatialReference
    }), i !== void 0 && (this.view.scale = i);
  }
  centerOnObject(e, i, s) {
    this.view.graphics.removeAll();
    const n = this.config.vectorLayerQueries.filter((o) => o.layer === e)[0];
    if (!n) {
      console.warn(`Invalid layer name: ${e}`);
      return;
    }
    this.layerUtils.queryLayer(n, i).then((o) => {
      if (!o.length) {
        console.warn("No object found with this query.");
        return;
      }
      const r = this.getGlobalExtent(o, 1.5);
      if (this.view.extent = r, s) {
        const a = {
          point: this.config.selectionPointSymbol,
          multipoint: this.config.selectionPointSymbol,
          polyline: this.config.selectionPolylineSymbol,
          polygon: this.config.selectionPolygonSymbol
        };
        o.forEach((c) => {
          const l = new fe({
            geometry: c,
            symbol: a[c.type]
          });
          this.view.graphics.add(l);
        });
      }
    });
  }
  getCenterCoordinates() {
    return [this.view.center.x, this.view.center.y];
  }
  showPopup(e, i) {
    this.view.openPopup({
      title: e,
      content: i
    });
  }
  addMarker(e) {
    e || (e = {}), this.addMarkers([e]);
  }
  addMarkers(e) {
    const i = [];
    e.forEach((n) => {
      var l, h;
      const o = Object.assign({}, this.config.markerSymbol);
      n.icon && n.size && (o.url = n.icon, o.width = `${n.size[0]}px`, o.height = `${n.size[1]}px`);
      const r = n.position ? n.position : this.getCenterCoordinates(), a = new U({
        x: r[0],
        y: r[1],
        spatialReference: this.view.spatialReference
      }), c = new fe({
        geometry: a,
        symbol: o
      });
      ((l = n.popup) != null && l.title || (h = n.popup) != null && h.content) && (c.popupTemplate = new ls({
        title: n.popup.title,
        content: n.popup.content
      })), i.push(c);
    });
    let s = this.view.map.allLayers.find((n) => n.id === this.markerLayerName);
    s || (s = new Rt({
      id: this.markerLayerName,
      listMode: "hide"
    }), this.view.map.add(s)), s.graphics.addMany(i);
  }
  clearMarkers() {
    const e = this.view.map.allLayers.find((i) => i.id === this.markerLayerName);
    e && e.destroy();
  }
  addGpxLayer(e, i, s) {
    this.isValidLayerName(e) && So.gpxToFeatures(i, this.view.spatialReference).then((n) => {
      const o = {
        point: this.config.gpxPointSymbol,
        polyline: this.config.gpxPolylineSymbol,
        polygon: this.config.gpxPolygonSymbol
      }, r = [];
      n.tracks.forEach((a) => {
        a.symbol = o[a.geometry.type], r.push(a);
      }), n.waypoints.forEach((a) => {
        a.symbol = o[a.geometry.type], r.push(a);
      }), this.addGraphicsLayer(r, e, s);
    });
  }
  addTextLayer(e, i, s) {
    this.isValidLayerName(e) && Do.txtToFeatures(i, this.view.spatialReference).then((n) => {
      this.addGraphicsLayer(n, e, s);
    });
  }
  getGlobalExtent(e, i) {
    const s = (o) => {
      const r = o.extent;
      if (r && r.width && r.height)
        return r.expand(i);
      const a = o.type === "point" ? [o.x, o.y] : o.points[0], c = 50;
      return new Mt({
        xmin: a[0] - c,
        ymin: a[1] - c,
        xmax: a[0] + c,
        ymax: a[1] + c,
        spatialReference: this.view.spatialReference
      });
    };
    let n;
    return e.forEach((o) => {
      n ? n.union(s(o)) : n = s(o.clone());
    }), n.expand(i);
  }
  isValidLayerName(e) {
    return this.view.map.layers.some((i) => i.title === e) ? (console.warn(`Map already contains a layer called '${e}'.`), !1) : !0;
  }
  addGraphicsLayer(e, i, s) {
    const n = new Rt({
      title: i
    });
    if (this.view.map.add(n), n.graphics.addMany(e), s) {
      const o = e.map((a) => a.geometry), r = this.getGlobalExtent(o, 1.5);
      this.view.extent = r;
    }
  }
}
class Hr {
  static getConfig(e) {
    return new Promise((i, s) => {
      Fe(e.configUrl, {
        responseType: "json"
      }).then((n) => {
        const o = n.data;
        let r, a, c;
        if (e.miniMap !== void 0) {
          c = e.miniMap;
          const d = this.getBasemap(o.basemaps, o.overviewBasemap);
          d && (r = d), a = o.overviewFactor;
        }
        let l;
        e.layerList !== void 0 && e.layers && e.layers.length && (l = e.layerList);
        let h = o.vectorServiceUrl;
        (h == null ? void 0 : h.substring(h.length - 1)) === "/" && (h = h.substring(0, h.length - 1)), i({
          apiUrl: o.apiUrl,
          basemaps: this.getBasemaps(o, e),
          center: e.center || o.center,
          container: e.container,
          globalExtent: o.globalExtent,
          gpxPointSymbol: o.gpxPointSymbol,
          gpxPolylineSymbol: o.gpxPolylineSymbol,
          gpxPolygonSymbol: o.gpxPolygonSymbol,
          layers: e.layers,
          layerList: l,
          markerSymbol: o.markerSymbol,
          maxScale: o.maxScale,
          minScale: o.minScale,
          overviewBasemap: r,
          overviewDisplay: c,
          overviewFactor: a,
          scale: e.scale || o.scale,
          scales: o.scales,
          selectionPointSymbol: o.selectionPointSymbol,
          selectionPolylineSymbol: o.selectionPolylineSymbol,
          selectionPolygonSymbol: o.selectionPolygonSymbol,
          spatialReference: o.spatialReference,
          showCoords: e.showCoords,
          vectorLayerQueries: o.vectorLayerQueries,
          vectorServiceUrl: h,
          vectorServiceToken: o.vectorServiceToken
        });
      }).catch((n) => {
        s(n);
      });
    });
  }
  static getBasemaps(e, i) {
    const s = [];
    if (i.basemaps === void 0) {
      const n = this.getBasemap(e.basemaps, e.defaultBasemap, e.copyright);
      n && s.push(n);
    } else
      i.basemaps.forEach((n) => {
        const o = this.getBasemap(e.basemaps, n, e.copyright);
        o && s.push(o);
      });
    return s;
  }
  static getBasemap(e, i, s) {
    const n = e[i];
    return n ? {
      alias: n.alias,
      copyright: s,
      layerId: n.layerId,
      name: i,
      thumbnailUrl: n.thumbnailUrl,
      type: n.type,
      url: n.url,
      urlTemplate: n.urlTemplate
    } : (console.warn(`Invalid basemap name: ${i}`), null);
  }
}
class Fa {
  /**
   * MapControl constructor
   * @param params Map parameters
   */
  constructor(e) {
    this.emitter = Vs(), Hr.getConfig(e).then((i) => {
      let s = i.apiUrl;
      s.charAt(s.length - 1) !== "/" && (s += "/"), cs.assetsPath = `${s}@arcgis/core/assets`;
      const n = document.createElement("link");
      n.setAttribute("rel", "stylesheet"), n.setAttribute("type", "text/css"), n.setAttribute("href", `${s}@arcgis/core/assets/esri/themes/light/main.css`), document.getElementsByTagName("head")[0].appendChild(n), this.map = new Br(i), this.map.init(this.emitter);
    }).catch((i) => {
      console.error(i);
    });
  }
  /**
   * Listen on events
   * @param event Event name
   * @param callback Callback function
   */
  on(e, i) {
    return this.emitter.on(e, i);
  }
  /**
   * Center the map on a new location
   * @param position Coordinates of the center
   * @param scale Scale
   */
  center(e, i) {
    this.callMapFunction(() => this.map.center(e, i));
  }
  /**
   * Center the map on one or more objects
   * @param layer Layer name
   * @param ids Ids of the objects
   * @param highlight Highlight the object or not
   */
  centerOnObject(e, i, s) {
    this.callMapFunction(() => this.map.centerOnObject(e, i, s));
  }
  /**
   * Add a GPX layer on the map
   * @param name Name of the layer visible in the layer list control
   * @param url Url of the gpx file
   */
  addGpxLayer(e, i, s) {
    this.callMapFunction(() => this.map.addGpxLayer(e, i, s));
  }
  /**
   * Add a layer from a text file on the map
   * @param name Name of the layer visible in the layer list control
   * @param url Url of the text file
   */
  addTextLayer(e, i, s) {
    this.callMapFunction(() => this.map.addTextLayer(e, i, s));
  }
  /**
   * Add a marker on the map
   * @param params Marker parameters
   */
  addMarker(e) {
    this.callMapFunction(() => this.map.addMarker(e));
  }
  /**
   * Add multiple markers on the map
   * @param params Marker parameters
   */
  addMarkers(e) {
    this.callMapFunction(() => this.map.addMarkers(e));
  }
  /**
   * Clear all markers on the map
   */
  clearMarkers() {
    this.callMapFunction(() => this.map.clearMarkers());
  }
  /**
   * Display a popup on the map
   * @param title Title of the popup
   * @param content Content of the popup
   */
  showPopup(e, i) {
    this.map.showPopup(e, i);
  }
  callMapFunction(e) {
    this.map ? e() : this.emitter.on("map-created", () => e());
  }
}
export {
  Fa as default
};
//# sourceMappingURL=mapcontrol.mjs.map
