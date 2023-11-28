import B from "@arcgis/core/config";
import L from "@arcgis/core/geometry/Extent";
import d from "@arcgis/core/geometry/Point";
import T from "@arcgis/core/geometry/SpatialReference";
import f from "@arcgis/core/Graphic";
import G from "@arcgis/core/layers/GraphicsLayer";
import x from "@arcgis/core/layers/support/TileInfo";
import C from "@arcgis/core/Map";
import $ from "@arcgis/core/views/MapView";
import k from "@arcgis/core/widgets/ScaleBar";
import P from "@arcgis/core/geometry/Polyline";
import * as E from "@arcgis/core/geometry/projection";
import b from "@arcgis/core/request";
import O from "@arcgis/core/Basemap";
import F from "@arcgis/core/identity/IdentityManager";
import R from "@arcgis/core/layers/FeatureLayer";
import D from "@arcgis/core/layers/ImageryLayer";
import V from "@arcgis/core/layers/MapImageLayer";
import A from "@arcgis/core/layers/TileLayer";
import q from "@arcgis/core/layers/VectorTileLayer";
import _ from "@arcgis/core/layers/WMTSLayer";
import { property as j } from "@arcgis/core/core/accessorSupport/decorators/property";
import { subclass as N } from "@arcgis/core/core/accessorSupport/decorators/subclass";
import z from "@arcgis/core/layers/BaseTileLayer";
import * as W from "@arcgis/core/rest/query";
import J from "@arcgis/core/symbols/PictureMarkerSymbol";
import K from "@arcgis/core/widgets/BasemapGallery";
import H from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource";
import X from "@arcgis/core/widgets/CoordinateConversion";
import Y from "@arcgis/core/widgets/CoordinateConversion/support/Conversion";
import Z from "@arcgis/core/widgets/CoordinateConversion/support/Format";
import y from "@arcgis/core/widgets/Expand";
import Q from "@arcgis/core/widgets/LayerList";
import { property as ee, subclass as te } from "@arcgis/core/core/accessorSupport/decorators";
import * as ie from "@arcgis/core/core/reactiveUtils";
import { tsx as se } from "@arcgis/core/widgets/support/widget";
import oe from "@arcgis/core/widgets/Widget";
let re = () => ({
  emit(c, ...e) {
    let t = this.events[c] || [];
    for (let s = 0, i = t.length; s < i; s++)
      t[s](...e);
  },
  events: {},
  on(c, e) {
    var t;
    return (t = this.events[c]) != null && t.push(e) || (this.events[c] = [e]), () => {
      var s;
      this.events[c] = (s = this.events[c]) == null ? void 0 : s.filter((i) => e !== i);
    };
  }
});
class ne {
  static gpxToFeatures(e, t) {
    return new Promise((s) => {
      b(e, {
        responseType: "xml"
      }).then((i) => {
        const o = i.data;
        E.load().then(() => {
          const r = {
            waypoints: [],
            tracks: []
          };
          o.querySelectorAll("wpt").forEach((n, a) => {
            const l = new d({ latitude: n.attributes.lat.value, longitude: n.attributes.lon.value }), p = this.getGraphic(l, n, `waypoint ${a + 1}`, t);
            r.waypoints.push(p);
          }), o.querySelectorAll("trk").forEach((n, a) => {
            const l = new P({ paths: [], spatialReference: { wkid: 4326 } });
            n.querySelectorAll("trkseg").forEach((h) => {
              const m = [];
              h.querySelectorAll("trkpt").forEach((S) => {
                const M = new d({ latitude: S.attributes.lat.value, longitude: S.attributes.lon.value });
                m.push(M);
              }), l.addPath(m);
            });
            const p = this.getGraphic(l, n, `track ${a + 1}`, t);
            r.tracks.push(p);
          }), o.querySelectorAll("rte").forEach((n, a) => {
            const l = new P({ paths: [], spatialReference: { wkid: 4326 } }), p = [];
            n.querySelectorAll("rtept").forEach((m) => {
              const u = new d({ latitude: m.attributes.lat.value, longitude: m.attributes.lon.value });
              p.push(u);
            }), l.addPath(p);
            const h = this.getGraphic(l, n, `route ${a + 1}`, t);
            r.tracks.push(h);
          }), s(r);
        });
      });
    });
  }
  static getGraphic(e, t, s, i) {
    const o = t.querySelector("name");
    let r = s;
    o && (r = o.textContent);
    const n = t.querySelector("desc");
    let a = "";
    n && (a = n.textContent);
    const l = {
      title: r,
      content: a
    };
    return new f({
      geometry: E.project(e, i),
      popupTemplate: l
    });
  }
}
var ae = Object.defineProperty, le = Object.getOwnPropertyDescriptor, U = (c, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? le(e, t) : e, o = c.length - 1, r; o >= 0; o--)
    (r = c[o]) && (i = (s ? r(e, t, i) : r(i)) || i);
  return s && i && ae(e, t, i), i;
};
let w = class extends z {
  constructor(c) {
    super();
    const e = new T({
      wkid: 2056
    }), t = x.create({
      spatialReference: e,
      numLODs: c.scales.length,
      scales: c.scales
    });
    t.origin = new d({
      x: 242e4,
      y: 135e4,
      spatialReference: e
    }), this.title = c.title, this.urlTemplate = c.urlTemplate, this.spatialReference = e, this.tileInfo = t;
  }
  getTileUrl(c, e, t) {
    return this.urlTemplate.replace("{level}", c.toString()).replace("{col}", t.toString()).replace("{row}", e.toString());
  }
};
U([
  j()
], w.prototype, "urlTemplate", 2);
w = U([
  N("esri.layers.SwissTileLayer")
], w);
class ce {
  constructor(e) {
    this.serviceDescription = null, this.config = e, this.serviceUrl = e.vectorServiceUrl;
    const t = e.vectorServiceToken;
    F.registerToken({
      token: t,
      server: `${this.serviceUrl.split("/rest/services")[0]}/rest/services`
    });
  }
  getFeatureLayers(e) {
    return new Promise((t) => {
      this.getServiceDescription().then((s) => {
        const i = [];
        s.layers.forEach((o) => {
          if (e.includes(o.name)) {
            const r = new R({
              url: `${this.serviceUrl}/${o.id}`,
              title: o.name
            });
            r.on("layerview-create", (n) => {
              const a = n.layerView.layer;
              a.popupTemplate = a.createPopupTemplate();
            }), i.push(r);
          }
        }), t(i);
      });
    });
  }
  async getMapImageLayers(e) {
    const t = [];
    return (await this.getServiceDescription()).layers.forEach((i) => {
      if (e.includes(i.name)) {
        const o = new V({
          title: i.name,
          url: this.serviceUrl,
          listMode: "hide-children",
          sublayers: [{
            id: i.id,
            visible: !0
          }]
        }), r = o.sublayers.at(0);
        r.load().then(() => {
          r.popupEnabled = !0, r.popupTemplate = r.createPopupTemplate(), r.popupTemplate.title = `${i.name}: {${r.sourceJSON.displayField}}`;
        }), t.push(o);
      }
    }), t;
  }
  queryLayer(e, t) {
    return new Promise((s) => {
      this.getServiceDescription().then((i) => {
        const o = i.layers.filter((a) => a.name === e.layer)[0];
        if (!o) {
          console.warn(`Invalid layer name in config file: ${e.layer}`), s([]);
          return;
        }
        const r = o.fields.filter((a) => a.name === e.field)[0];
        if (!r) {
          console.warn(`Invalid field name in config file: ${e.field}`), s([]);
          return;
        }
        let n;
        this.isNumericField(r.type) ? n = `${e.field} in (${t.join(",")})` : n = `${e.field} in ('${t.join("','")}')`, W.executeQueryJSON(`${this.serviceUrl}/${o.id}`, {
          where: n,
          returnGeometry: !0
        }).then((a) => {
          s(a.features.map((l) => l.geometry));
        });
      });
    });
  }
  getBasemaps(e) {
    const t = [];
    return e.forEach((s) => {
      const i = this.getLayer(s);
      i && t.push(new O({
        baseLayers: [i],
        title: s.alias,
        thumbnailUrl: s.thumbnailUrl
      }));
    }), t;
  }
  getServiceDescription() {
    return new Promise((e) => {
      this.serviceDescription === null ? b(`${this.serviceUrl}/layers`, {
        query: {
          f: "json"
        },
        responseType: "json"
      }).then((t) => {
        this.serviceDescription = t.data, e(this.serviceDescription);
      }) : e(this.serviceDescription);
    });
  }
  getLayer(e) {
    switch (e.type) {
      case "tile":
        return new w({
          title: e.alias,
          urlTemplate: e.urlTemplate,
          scales: this.config.scales
        });
      case "wmts":
        return new _({
          url: e.url,
          activeLayer: {
            id: e.layerId
          },
          copyright: e.copyright
        });
      case "mapservice":
        return new A({
          url: e.url,
          copyright: e.copyright
        });
      case "imageservice":
        return new D({
          url: e.url,
          copyright: e.copyright
        });
      case "vectortile":
        return new q({
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
class pe {
  static txtToFeatures(e, t) {
    return new Promise((s) => {
      b(e, {
        responseType: "text"
      }).then((i) => {
        const o = [];
        i.data.split(`
`).forEach((r, n) => {
          if (n) {
            const a = r.split("	");
            if (a.length >= 5) {
              const l = a[0].split(","), p = new d({ x: parseFloat(l[1]), y: parseFloat(l[0]), spatialReference: t }), h = {
                title: a[1],
                content: a[2]
              }, m = a[4].split(","), u = new J({
                url: a[3],
                width: `${m[0]}px`,
                height: `${m[1]}px`
              });
              o.push(new f({
                geometry: p,
                symbol: u,
                popupTemplate: h
              }));
            }
          }
        }), s(o);
      });
    });
  }
}
var he = Object.defineProperty, me = Object.getOwnPropertyDescriptor, I = (c, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? me(e, t) : e, o = c.length - 1, r; o >= 0; o--)
    (r = c[o]) && (i = (s ? r(e, t, i) : r(i)) || i);
  return s && i && he(e, t, i), i;
};
let v = class extends oe {
  constructor(c) {
    super(c);
  }
  postInitialize() {
    ie.watch(() => [this.mainView.center, this.mainView.interacting, this.mainView.scale], () => {
      this.onViewChange();
    });
  }
  render() {
    return setTimeout(() => {
      this.expand.expanded && this.onViewChange();
    }, 10), /* @__PURE__ */ se("div", { id: `${this.id}_cont`, style: "width:250px;height:150px;background:#fff" });
  }
  onViewChange() {
    this.expand.expanded && (!this.overview && document.getElementById(`${this.id}_cont`) && (this.createMap(), this.createExtentGraphic()), this.overview && (this.overview.center = this.mainView.center, this.overview.scale = this.mainView.scale * this.factor, this.extentGraphic.geometry = this.mainView.extent));
  }
  createMap() {
    const c = new C({
      basemap: this.basemap
    }), e = x.create({
      spatialReference: this.mainView.spatialReference,
      numLODs: this.scales.length,
      scales: this.scales
    });
    this.overview = new $({
      container: `${this.id}_cont`,
      map: c,
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
      const t = (s) => {
        s.stopPropagation();
      };
      this.overview.on("mouse-wheel", t), this.overview.on("double-click", t), this.overview.on("double-click", ["Control"], t), this.overview.on("drag", t), this.overview.on("drag", ["Shift"], t), this.overview.on("drag", ["Shift", "Control"], t), this.overview.on("key-down", (s) => {
        const i = [
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
        i.indexOf(o) !== -1 && s.stopPropagation();
      });
    });
  }
  createExtentGraphic() {
    const c = {
      type: "simple-fill",
      color: [0, 0, 0, 0.5],
      outline: null
    };
    this.extentGraphic = new f({
      symbol: c
    }), this.overview.graphics.add(this.extentGraphic);
  }
};
I([
  ee()
], v.prototype, "expand", 2);
v = I([
  te("esri.widgets.Overview")
], v);
class g {
  static addOverview(e, t, s, i, o) {
    const r = new v({
      basemap: e,
      mainView: t,
      scales: s,
      factor: i
    }), n = new y({
      expandIconClass: "esri-icon-maps",
      view: t,
      content: r,
      expanded: o === "expanded",
      mode: "floating",
      autoCollapse: !1,
      group: "api"
    });
    r.expand = n, t.ui.add(n, {
      position: "bottom-right"
    });
  }
  static addLayerList(e, t) {
    const s = new Q({
      view: e
    }), i = new y({
      expandIconClass: "esri-icon-layers",
      view: e,
      content: s,
      expanded: t === "expanded",
      mode: "floating",
      autoCollapse: !1,
      group: "api"
    });
    e.ui.add(i, {
      position: "top-right"
    });
  }
  static addBasemapGallery(e, t) {
    const s = new K({
      source: new H({
        basemaps: e
      }),
      view: t
    });
    s.viewModel.basemapEquals = (o, r) => o.id === r.id;
    const i = new y({
      expandIconClass: "esri-icon-basemap",
      view: t,
      content: s,
      mode: "floating",
      autoCollapse: !0,
      group: "api"
    });
    t.ui.add(i, {
      position: "top-right"
    });
  }
  static addCoordinates(e, t) {
    const s = new X({
      view: e
    });
    s.visibleElements = {
      expandButton: !1
    }, s.when(() => {
      const o = setInterval(() => {
        const l = document.getElementsByClassName("esri-coordinate-conversion")[0];
        l && (clearInterval(o), l.style.width = "300px");
      }, 50), r = s.formats.find((l) => l.name === "basemap"), n = new Z({
        name: "mn95",
        coordinateSegments: r.coordinateSegments,
        spatialReference: r.spatialReference
      });
      s.formats = s.formats.filter((l) => l.name === "dd"), s.formats.add(n, 0), s.conversions.removeAll();
      const a = new Y({
        format: n
      });
      s.conversions.add(a);
    });
    const i = new y({
      expandIconClass: "esri-icon-locate",
      view: e,
      content: s,
      expanded: t === "expanded",
      mode: "floating",
      autoCollapse: !1,
      group: "api"
    });
    e.ui.add(i, {
      position: "bottom-right"
    });
  }
}
class de {
  constructor(e) {
    this.config = e, this.layerUtils = new ce(e);
  }
  init(e) {
    const t = this.layerUtils.getBasemaps(this.config.basemaps), s = new C({
      basemap: t[0]
    }), i = new T({
      wkid: this.config.spatialReference
    }), o = new d({
      x: this.config.center[0],
      y: this.config.center[1],
      spatialReference: i
    }), r = x.create({
      spatialReference: i,
      numLODs: this.config.scales.length,
      scales: this.config.scales
    }), n = new L({
      xmin: this.config.globalExtent.xmin,
      ymin: this.config.globalExtent.ymin,
      xmax: this.config.globalExtent.xmax,
      ymax: this.config.globalExtent.ymax,
      spatialReference: i
    });
    this.view = new $({
      container: this.config.container,
      map: s,
      scale: this.config.scale,
      center: o,
      spatialReference: i,
      constraints: {
        rotationEnabled: !1,
        lods: r.lods,
        minScale: this.config.minScale,
        maxScale: this.config.maxScale,
        geometry: n
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
    const a = new k({
      view: this.view,
      unit: "metric"
    });
    if (this.view.ui.add(a, {
      position: "bottom-left"
    }), this.config.layers && this.layerUtils.getMapImageLayers(this.config.layers).then((l) => {
      this.view.map.addMany(l.reverse());
    }), t.length > 1 && g.addBasemapGallery(t, this.view), this.config.layerList && g.addLayerList(this.view, this.config.layerList), this.config.overviewDisplay && this.config.overviewBasemap) {
      const l = this.layerUtils.getBasemaps([this.config.overviewBasemap])[0];
      g.addOverview(l, this.view, this.config.scales, this.config.overviewFactor, this.config.overviewDisplay);
    }
    this.config.showCoords && g.addCoordinates(this.view, this.config.showCoords), this.view.on("click", (l) => {
      l.native.ctrlKey && (l.stopPropagation(), e.emit("ctrlClick", [l.mapPoint.x, l.mapPoint.y]));
    });
  }
  center(e, t) {
    this.view.center = new d({
      x: e[0],
      y: e[1],
      spatialReference: this.view.spatialReference
    }), t !== void 0 && (this.view.scale = t);
  }
  centerOnObject(e, t, s) {
    this.view.graphics.removeAll();
    const i = this.config.vectorLayerQueries.filter((o) => o.layer === e)[0];
    if (!i) {
      console.warn(`Invalid layer name: ${e}`);
      return;
    }
    this.layerUtils.queryLayer(i, t).then((o) => {
      if (!o.length) {
        console.warn("No object found with this query.");
        return;
      }
      const r = this.getGlobalExtent(o, 1.5);
      if (this.view.extent = r, s) {
        const n = {
          point: this.config.selectionPointSymbol,
          multipoint: this.config.selectionPointSymbol,
          polyline: this.config.selectionPolylineSymbol,
          polygon: this.config.selectionPolygonSymbol
        };
        o.forEach((a) => {
          const l = new f({
            geometry: a,
            symbol: n[a.type]
          });
          this.view.graphics.add(l);
        });
      }
    });
  }
  getCenterCoordinates() {
    return [this.view.center.x, this.view.center.y];
  }
  showPopup(e, t) {
    this.view.openPopup({
      title: e,
      content: t
    });
  }
  addMarker(e) {
    const t = this.config.markerSymbol;
    e !== void 0 && e.icon && e.size && (t.url = e.icon, t.width = `${e.size[0]}px`, t.height = `${e.size[1]}px`);
    const s = e !== void 0 && e.position ? e.position : this.getCenterCoordinates(), i = new d({
      x: s[0],
      y: s[1],
      spatialReference: this.view.spatialReference
    }), o = new f({
      geometry: i,
      symbol: t
    });
    this.view.graphics.add(o);
  }
  addGpxLayer(e, t, s) {
    this.isValidLayerName(e) && ne.gpxToFeatures(t, this.view.spatialReference).then((i) => {
      const o = {
        point: this.config.gpxPointSymbol,
        polyline: this.config.gpxPolylineSymbol,
        polygon: this.config.gpxPolygonSymbol
      }, r = [];
      i.tracks.forEach((n) => {
        n.symbol = o[n.geometry.type], r.push(n);
      }), i.waypoints.forEach((n) => {
        n.symbol = o[n.geometry.type], r.push(n);
      }), this.addGraphicsLayer(r, e, s);
    });
  }
  addTextLayer(e, t, s) {
    this.isValidLayerName(e) && pe.txtToFeatures(t, this.view.spatialReference).then((i) => {
      this.addGraphicsLayer(i, e, s);
    });
  }
  getGlobalExtent(e, t) {
    const s = (o) => {
      const r = o.extent;
      if (r && r.width && r.height)
        return r.expand(t);
      const n = o.type === "point" ? [o.x, o.y] : o.points[0], a = 50;
      return new L({
        xmin: n[0] - a,
        ymin: n[1] - a,
        xmax: n[0] + a,
        ymax: n[1] + a,
        spatialReference: this.view.spatialReference
      });
    };
    let i;
    return e.forEach((o) => {
      i ? i.union(s(o)) : i = s(o.clone());
    }), i.expand(t);
  }
  isValidLayerName(e) {
    return this.view.map.layers.some((t) => t.title === e) ? (console.warn(`Map already contains a layer called '${e}'.`), !1) : !0;
  }
  addGraphicsLayer(e, t, s) {
    const i = new G({
      title: t
    });
    if (this.view.map.add(i), i.graphics.addMany(e), s) {
      const o = e.map((n) => n.geometry), r = this.getGlobalExtent(o, 1.5);
      this.view.extent = r;
    }
  }
}
class fe {
  static getConfig(e) {
    return new Promise((t, s) => {
      b(e.configUrl, {
        responseType: "json"
      }).then((i) => {
        const o = i.data;
        let r, n, a;
        if (e.miniMap !== void 0) {
          a = e.miniMap;
          const h = this.getBasemap(o.basemaps, o.overviewBasemap);
          h && (r = h), n = o.overviewFactor;
        }
        let l;
        e.layerList !== void 0 && e.layers && e.layers.length && (l = e.layerList);
        let p = o.vectorServiceUrl;
        p.substring(p.length - 1) === "/" && (p = p.substring(0, p.length - 1)), t({
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
          overviewDisplay: a,
          overviewFactor: n,
          scale: e.scale || o.scale,
          scales: o.scales,
          selectionPointSymbol: o.selectionPointSymbol,
          selectionPolylineSymbol: o.selectionPolylineSymbol,
          selectionPolygonSymbol: o.selectionPolygonSymbol,
          spatialReference: o.spatialReference,
          showCoords: e.showCoords,
          vectorLayerQueries: o.vectorLayerQueries,
          vectorServiceUrl: p,
          vectorServiceToken: o.vectorServiceToken
        });
      }).catch((i) => {
        s(i);
      });
    });
  }
  static getBasemaps(e, t) {
    const s = [];
    if (t.basemaps === void 0) {
      const i = this.getBasemap(e.basemaps, e.defaultBasemap, e.copyright);
      i && s.push(i);
    } else
      t.basemaps.forEach((i) => {
        const o = this.getBasemap(e.basemaps, i, e.copyright);
        o && s.push(o);
      });
    return s;
  }
  static getBasemap(e, t, s) {
    const i = e[t];
    return i ? {
      alias: i.alias,
      copyright: s,
      layerId: i.layerId,
      name: t,
      thumbnailUrl: i.thumbnailUrl,
      type: i.type,
      url: i.url,
      urlTemplate: i.urlTemplate
    } : (console.warn(`Invalid basemap name: ${t}`), null);
  }
}
class He {
  /**
   * MapControl constructor
   * @param params Map parameters
   */
  constructor(e) {
    this.emitter = re(), fe.getConfig(e).then((t) => {
      let s = t.apiUrl;
      s.charAt(s.length - 1) !== "/" && (s += "/"), B.assetsPath = `${s}@arcgis/core/assets`;
      const i = document.createElement("link");
      i.setAttribute("rel", "stylesheet"), i.setAttribute("type", "text/css"), i.setAttribute("href", `${s}@arcgis/core/assets/esri/themes/light/main.css`), document.getElementsByTagName("head")[0].appendChild(i), this.map = new de(t), this.map.init(this.emitter);
    }).catch((t) => {
      console.error(t);
    });
  }
  /**
   * Listen on events
   * @param event Event name
   * @param callback Callback function
   */
  on(e, t) {
    return this.emitter.on(e, t);
  }
  /**
   * Center the map on a new location
   * @param position Coordinates of the center
   * @param scale Scale
   */
  center(e, t) {
    this.callMapFunction(() => this.map.center(e, t));
  }
  /**
   * Center the map on one or more objects
   * @param layer Layer name
   * @param ids Ids of the objects
   * @param highlight Highlight the object or not
   */
  centerOnObject(e, t, s) {
    this.callMapFunction(() => this.map.centerOnObject(e, t, s));
  }
  /**
   * Add a GPX layer on the map
   * @param name Name of the layer visible in the layer list control
   * @param url Url of the gpx file
   */
  addGpxLayer(e, t, s) {
    this.callMapFunction(() => this.map.addGpxLayer(e, t, s));
  }
  /**
   * Add a layer from a text file on the map
   * @param name Name of the layer visible in the layer list control
   * @param url Url of the text file
   */
  addTextLayer(e, t, s) {
    this.callMapFunction(() => this.map.addTextLayer(e, t, s));
  }
  /**
   * Add a marker on the map
   * @param params Marker parameters
   */
  addMarker(e) {
    this.callMapFunction(() => this.map.addMarker(e));
  }
  /**
   * Display a popup on the map
   * @param title Title of the popup
   * @param content Content of the popup
   */
  showPopup(e, t) {
    this.map.showPopup(e, t);
  }
  callMapFunction(e) {
    this.map ? e() : this.emitter.on("map-created", () => e());
  }
}
export {
  He as default
};
//# sourceMappingURL=main.js.map
