import esriConfig from "@arcgis/core/config";
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import TileInfo from "@arcgis/core/layers/support/TileInfo";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import Polyline from "@arcgis/core/geometry/Polyline";
import * as projection from "@arcgis/core/geometry/projection";
import esriRequest from "@arcgis/core/request";
import Basemap from "@arcgis/core/Basemap";
import esriId from "@arcgis/core/identity/IdentityManager";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ImageryLayer from "@arcgis/core/layers/ImageryLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import WMTSLayer from "@arcgis/core/layers/WMTSLayer";
import { property } from "@arcgis/core/core/accessorSupport/decorators/property";
import { subclass } from "@arcgis/core/core/accessorSupport/decorators/subclass";
import BaseTileLayer from "@arcgis/core/layers/BaseTileLayer";
import * as query from "@arcgis/core/rest/query";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import LocalBasemapsSource from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource";
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion";
import Conversion from "@arcgis/core/widgets/CoordinateConversion/support/Conversion";
import Format from "@arcgis/core/widgets/CoordinateConversion/support/Format";
import Expand from "@arcgis/core/widgets/Expand";
import LayerList from "@arcgis/core/widgets/LayerList";
import { property as property$1, subclass as subclass$1 } from "@arcgis/core/core/accessorSupport/decorators";
import { init } from "@arcgis/core/core/watchUtils";
import { tsx } from "@arcgis/core/widgets/support/widget";
import Widget from "@arcgis/core/widgets/Widget";
let createNanoEvents = () => ({
  events: {},
  emit(event, ...args) {
    (this.events[event] || []).forEach((i) => i(...args));
  },
  on(event, cb) {
    (this.events[event] = this.events[event] || []).push(cb);
    return () => this.events[event] = (this.events[event] || []).filter((i) => i !== cb);
  }
});
class GpxUtils {
  static gpxToFeatures(url, spatialReference) {
    return new Promise((resolve) => {
      esriRequest(url, {
        responseType: "xml"
      }).then((r) => {
        const xml = r.data;
        projection.load().then(() => {
          const result = {
            waypoints: [],
            tracks: []
          };
          xml.querySelectorAll("wpt").forEach((waypoint, i) => {
            const wPt = new Point({ latitude: waypoint.attributes.lat.value, longitude: waypoint.attributes.lon.value });
            const gr = this.getGraphic(wPt, waypoint, `waypoint ${i + 1}`, spatialReference);
            result.waypoints.push(gr);
          });
          xml.querySelectorAll("trk").forEach((track, i) => {
            const polyline = new Polyline({ paths: [], spatialReference: { wkid: 4326 } });
            track.querySelectorAll("trkseg").forEach((segment) => {
              const path = [];
              const points = segment.querySelectorAll("trkpt");
              points.forEach((point) => {
                const pt = new Point({ latitude: point.attributes.lat.value, longitude: point.attributes.lon.value });
                path.push(pt);
              });
              polyline.addPath(path);
            });
            const gr = this.getGraphic(polyline, track, `track ${i + 1}`, spatialReference);
            result.tracks.push(gr);
          });
          xml.querySelectorAll("rte").forEach((route, i) => {
            const polyline = new Polyline({ paths: [], spatialReference: { wkid: 4326 } });
            const path = [];
            route.querySelectorAll("rtept").forEach((point) => {
              const pt = new Point({ latitude: point.attributes.lat.value, longitude: point.attributes.lon.value });
              path.push(pt);
            });
            polyline.addPath(path);
            const gr = this.getGraphic(polyline, route, `route ${i + 1}`, spatialReference);
            result.tracks.push(gr);
          });
          resolve(result);
        });
      });
    });
  }
  static getGraphic(geom, node, defaultName, spatialReference) {
    const n = node.querySelector("name");
    let name = defaultName;
    if (n) {
      name = n.textContent;
    }
    const d = node.querySelector("desc");
    let description = "";
    if (d) {
      description = d.textContent;
    }
    const popupTemplate = {
      title: name,
      content: description
    };
    return new Graphic({
      geometry: projection.project(geom, spatialReference),
      popupTemplate
    });
  }
}
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
let SwissTileLayer = class extends BaseTileLayer {
  constructor(params) {
    super();
    const spatialReference = new SpatialReference({
      wkid: 2056
    });
    const tileInfo = TileInfo.create({
      spatialReference,
      numLODs: params.scales.length,
      scales: params.scales
    });
    tileInfo.origin = new Point({
      x: 242e4,
      y: 135e4,
      spatialReference
    });
    this.title = params.title;
    this.urlTemplate = params.urlTemplate;
    this.spatialReference = spatialReference;
    this.tileInfo = tileInfo;
  }
  getTileUrl(level, row, col) {
    return this.urlTemplate.replace("{level}", level.toString()).replace("{col}", col.toString()).replace("{row}", row.toString());
  }
};
__decorateClass$1([
  property()
], SwissTileLayer.prototype, "urlTemplate", 2);
SwissTileLayer = __decorateClass$1([
  subclass("esri.layers.SwissTileLayer")
], SwissTileLayer);
class LayerUtils {
  constructor(config) {
    this.serviceDescription = null;
    this.config = config;
    this.serviceUrl = config.vectorServiceUrl;
    const token = config.vectorServiceToken;
    esriId.registerToken({
      token,
      server: `${this.serviceUrl.split("/rest/services")[0]}/rest/services`
    });
  }
  getFeatureLayers(layers) {
    return new Promise((resolve) => {
      this.getServiceDescription().then((r) => {
        const featureLayers = [];
        r.layers.forEach((l) => {
          if (layers.includes(l.name)) {
            const featureLayer = new FeatureLayer({
              url: `${this.serviceUrl}/${l.id}`,
              title: l.name
            });
            featureLayer.on("layerview-create", (e) => {
              const fLayer = e.layerView.layer;
              fLayer.popupTemplate = fLayer.createPopupTemplate();
            });
            featureLayers.push(featureLayer);
          }
        });
        resolve(featureLayers);
      });
    });
  }
  queryLayer(layerQuery, ids) {
    return new Promise((resolve) => {
      this.getServiceDescription().then((r) => {
        const layerInfo = r.layers.filter((l) => l.name === layerQuery.layer)[0];
        if (!layerInfo) {
          console.warn(`Invalid layer name in config file: ${layerQuery.layer}`);
          resolve([]);
          return;
        }
        query.executeQueryJSON(`${this.serviceUrl}/${layerInfo.id}`, {
          where: `${layerQuery.field} in ('${ids.join("','")}')`,
          returnGeometry: true
        }).then((r2) => {
          resolve(r2.features.map((f) => f.geometry));
        });
      });
    });
  }
  getBasemaps(basemapItems) {
    const result = [];
    basemapItems.forEach((item) => {
      const layer = this.getLayer(item);
      if (layer) {
        result.push(new Basemap({
          baseLayers: [layer],
          title: item.alias,
          thumbnailUrl: item.thumbnailUrl
        }));
      }
    });
    return result;
  }
  getServiceDescription() {
    return new Promise((resolve) => {
      if (this.serviceDescription === null) {
        esriRequest(this.serviceUrl, {
          query: {
            f: "json"
          },
          responseType: "json"
        }).then((r) => {
          this.serviceDescription = r.data;
          resolve(this.serviceDescription);
        });
      } else {
        resolve(this.serviceDescription);
      }
    });
  }
  getLayer(params) {
    switch (params.type) {
      case "tile":
        return new SwissTileLayer({
          title: params.alias,
          urlTemplate: params.urlTemplate,
          scales: this.config.scales
        });
      case "wmts":
        return new WMTSLayer({
          url: params.url,
          activeLayer: {
            id: params.layerId
          },
          copyright: params.copyright
        });
      case "mapservice":
        return new TileLayer({
          url: params.url,
          copyright: params.copyright
        });
      case "imageservice":
        return new ImageryLayer({
          url: params.url,
          copyright: params.copyright
        });
      case "vectortile":
        return new VectorTileLayer({
          url: params.url
        });
      default:
        console.warn(`Unsupported basemap type: ${params.type}`);
        return null;
    }
  }
}
class TextUtils {
  static txtToFeatures(url, spatialReference) {
    return new Promise((resolve) => {
      esriRequest(url, {
        responseType: "text"
      }).then((r) => {
        const graphics = [];
        r.data.split("\n").forEach((row, index) => {
          if (index) {
            const parts = row.split("	");
            if (parts.length >= 5) {
              const coords = parts[0].split(",");
              const geometry = new Point({ x: parseFloat(coords[1]), y: parseFloat(coords[0]), spatialReference });
              const popupTemplate = {
                title: parts[1],
                content: parts[2]
              };
              const symbolSize = parts[4].split(",");
              const symbol = new PictureMarkerSymbol({
                url: parts[3],
                width: `${symbolSize[0]}px`,
                height: `${symbolSize[1]}px`
              });
              graphics.push(new Graphic({
                geometry,
                symbol,
                popupTemplate
              }));
            }
          }
        });
        resolve(graphics);
      });
    });
  }
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let Overview = class extends Widget {
  constructor(params) {
    super(params);
  }
  postInitialize() {
    init(this.mainView, "center, interacting, scale", () => {
      this.onViewChange();
    });
  }
  render() {
    setTimeout(() => {
      if (this.expand.expanded) {
        this.onViewChange();
      }
    }, 10);
    return /* @__PURE__ */ tsx("div", {
      id: `${this.id}_cont`,
      style: "width:250px;height:150px;background:#fff"
    });
  }
  onViewChange() {
    if (this.expand.expanded) {
      if (!this.overview && document.getElementById(`${this.id}_cont`)) {
        this.createMap();
        this.createExtentGraphic();
      }
      if (this.overview) {
        this.overview.center = this.mainView.center;
        this.overview.scale = this.mainView.scale * this.factor;
        this.extentGraphic.geometry = this.mainView.extent;
      }
    }
  }
  createMap() {
    const map = new Map({
      basemap: this.basemap
    });
    const tileInfo = TileInfo.create({
      spatialReference: this.mainView.spatialReference,
      numLODs: this.scales.length,
      scales: this.scales
    });
    this.overview = new MapView({
      container: `${this.id}_cont`,
      map,
      scale: this.mainView.scale,
      center: this.mainView.center,
      spatialReference: this.mainView.spatialReference,
      constraints: {
        rotationEnabled: false,
        lods: tileInfo.lods
      },
      ui: {
        components: []
      }
    });
    this.overview.when(() => {
      const stopEvtPropagation = (event) => {
        event.stopPropagation();
      };
      this.overview.on("mouse-wheel", stopEvtPropagation);
      this.overview.on("double-click", stopEvtPropagation);
      this.overview.on("double-click", ["Control"], stopEvtPropagation);
      this.overview.on("drag", stopEvtPropagation);
      this.overview.on("drag", ["Shift"], stopEvtPropagation);
      this.overview.on("drag", ["Shift", "Control"], stopEvtPropagation);
      this.overview.on("key-down", (event) => {
        const prohibitedKeys = [
          "+",
          "-",
          "Shift",
          "_",
          "=",
          "ArrowUp",
          "ArrowDown",
          "ArrowRight",
          "ArrowLeft"
        ];
        const keyPressed = event.key;
        if (prohibitedKeys.indexOf(keyPressed) !== -1) {
          event.stopPropagation();
        }
      });
    });
  }
  createExtentGraphic() {
    const symbol = {
      type: "simple-fill",
      color: [0, 0, 0, 0.5],
      outline: null
    };
    this.extentGraphic = new Graphic({
      symbol
    });
    this.overview.graphics.add(this.extentGraphic);
  }
};
__decorateClass([
  property$1()
], Overview.prototype, "expand", 2);
Overview = __decorateClass([
  subclass$1("esri.widgets.Overview")
], Overview);
class WidgetUtils {
  static addOverview(basemap, view, scales, factor, display) {
    const overview = new Overview({
      basemap,
      mainView: view,
      scales,
      factor
    });
    const overviewExpand = new Expand({
      expandIconClass: "esri-icon-maps",
      view,
      content: overview,
      expanded: display === "expanded",
      mode: "floating",
      autoCollapse: false,
      group: "api"
    });
    overview.expand = overviewExpand;
    view.ui.add(overviewExpand, {
      position: "bottom-right"
    });
  }
  static addLayerList(view, display) {
    const layerList = new LayerList({
      view
    });
    const layerListExpand = new Expand({
      expandIconClass: "esri-icon-layers",
      view,
      content: layerList,
      expanded: display === "expanded",
      mode: "floating",
      autoCollapse: false,
      group: "api"
    });
    view.ui.add(layerListExpand, {
      position: "top-right"
    });
  }
  static addBasemapGallery(items, view) {
    const basemapGallery = new BasemapGallery({
      source: new LocalBasemapsSource({
        basemaps: items
      }),
      view
    });
    basemapGallery.viewModel.basemapEquals = (a, b) => a.id === b.id;
    const basemapGalleryExpand = new Expand({
      expandIconClass: "esri-icon-basemap",
      view,
      content: basemapGallery,
      mode: "floating",
      autoCollapse: true,
      group: "api"
    });
    view.ui.add(basemapGalleryExpand, {
      position: "top-right"
    });
  }
  static addCoordinates(view, display) {
    const coords = new CoordinateConversion({
      view
    });
    coords.visibleElements = {
      expandButton: false
    };
    coords.when(() => {
      const div = document.getElementsByClassName("esri-coordinate-conversion")[0];
      div.style.width = "300px";
      const basemap = coords.formats.find((f) => f.name === "basemap");
      const mn95 = new Format({
        name: "mn95",
        coordinateSegments: basemap.coordinateSegments,
        spatialReference: basemap.spatialReference
      });
      coords.formats = coords.formats.filter((f) => f.name === "dd");
      coords.formats.add(mn95, 0);
      coords.conversions.removeAll();
      const conversion = new Conversion({
        format: mn95
      });
      coords.conversions.add(conversion);
    });
    const coordsExpand = new Expand({
      expandIconClass: "esri-icon-locate",
      view,
      content: coords,
      expanded: display === "expanded",
      mode: "floating",
      autoCollapse: false,
      group: "api"
    });
    view.ui.add(coordsExpand, {
      position: "bottom-right"
    });
  }
}
class MapClass {
  constructor(config) {
    this.config = config;
    this.layerUtils = new LayerUtils(config);
  }
  init(emitter) {
    const basemaps = this.layerUtils.getBasemaps(this.config.basemaps);
    const map = new Map({
      basemap: basemaps[0]
    });
    const spatialReference = new SpatialReference({
      wkid: this.config.spatialReference
    });
    const center = new Point({
      x: this.config.center[0],
      y: this.config.center[1],
      spatialReference
    });
    const tileInfo = TileInfo.create({
      spatialReference,
      numLODs: this.config.scales.length,
      scales: this.config.scales
    });
    const extent = new Extent({
      xmin: this.config.globalExtent.xmin,
      ymin: this.config.globalExtent.ymin,
      xmax: this.config.globalExtent.xmax,
      ymax: this.config.globalExtent.ymax,
      spatialReference
    });
    this.view = new MapView({
      container: this.config.container,
      map,
      scale: this.config.scale,
      center,
      spatialReference,
      constraints: {
        rotationEnabled: false,
        lods: tileInfo.lods,
        minScale: this.config.minScale,
        maxScale: this.config.maxScale,
        geometry: extent
      },
      popup: {
        dockEnabled: true,
        dockOptions: {
          buttonEnabled: false,
          breakpoint: false
        },
        viewModel: {
          includeDefaultActions: false
        }
      }
    });
    this.view.when(() => {
      emitter.emit("map-created");
    });
    const scaleBar = new ScaleBar({
      view: this.view,
      unit: "metric"
    });
    this.view.ui.add(scaleBar, {
      position: "bottom-left"
    });
    if (this.config.layers) {
      this.layerUtils.getFeatureLayers(this.config.layers).then((layers) => {
        this.view.map.addMany(layers);
      });
    }
    if (basemaps.length > 1) {
      WidgetUtils.addBasemapGallery(basemaps, this.view);
    }
    if (this.config.layerList) {
      WidgetUtils.addLayerList(this.view, this.config.layerList);
    }
    if (this.config.overviewDisplay && this.config.overviewBasemap) {
      const overviewBasemap = this.layerUtils.getBasemaps([this.config.overviewBasemap])[0];
      WidgetUtils.addOverview(overviewBasemap, this.view, this.config.scales, this.config.overviewFactor, this.config.overviewDisplay);
    }
    if (this.config.showCoords) {
      WidgetUtils.addCoordinates(this.view, this.config.showCoords);
    }
    this.view.on("click", (e) => {
      if (e.native.ctrlKey) {
        e.stopPropagation();
        emitter.emit("ctrlClick", [e.mapPoint.x, e.mapPoint.y]);
      }
    });
  }
  center(position, scale) {
    this.view.center = new Point({
      x: position[0],
      y: position[1],
      spatialReference: this.view.spatialReference
    });
    if (scale !== void 0) {
      this.view.scale = scale;
    }
  }
  centerOnObject(layer, ids, highlight) {
    this.view.graphics.removeAll();
    const queryConfig = this.config.vectorLayerQueries.filter((item) => item.layer === layer)[0];
    if (!queryConfig) {
      console.warn(`Invalid layer name: ${layer}`);
      return;
    }
    this.layerUtils.queryLayer(queryConfig, ids).then((geometries) => {
      if (!geometries.length) {
        console.warn("No object found with this query.");
        return;
      }
      const globalExtent = this.getGlobalExtent(geometries, 1.5);
      this.view.extent = globalExtent;
      if (highlight) {
        const symbols = {
          point: this.config.selectionPointSymbol,
          multipoint: this.config.selectionPointSymbol,
          polyline: this.config.selectionPolylineSymbol,
          polygon: this.config.selectionPolygonSymbol
        };
        geometries.forEach((geom) => {
          const gr = new Graphic({
            geometry: geom,
            symbol: symbols[geom.type]
          });
          this.view.graphics.add(gr);
        });
      }
    });
  }
  getCenterCoordinates() {
    return [this.view.center.x, this.view.center.y];
  }
  showPopup(title, content) {
    this.view.popup.open({
      title,
      content
    });
    this.view.popup.collapsed = false;
  }
  addMarker(params) {
    const symbol = this.config.markerSymbol;
    if (params !== void 0 && params.icon && params.size) {
      symbol.url = params.icon;
      symbol.width = `${params.size[0]}px`;
      symbol.height = `${params.size[1]}px`;
    }
    const coords = params !== void 0 && params.position ? params.position : this.getCenterCoordinates();
    const geometry = new Point({
      x: coords[0],
      y: coords[1],
      spatialReference: this.view.spatialReference
    });
    const gr = new Graphic({
      geometry,
      symbol
    });
    this.view.graphics.add(gr);
  }
  addGpxLayer(name, url, zoom) {
    if (!this.isValidLayerName(name)) {
      return;
    }
    GpxUtils.gpxToFeatures(url, this.view.spatialReference).then((r) => {
      const symbols = {
        point: this.config.gpxPointSymbol,
        polyline: this.config.gpxPolylineSymbol,
        polygon: this.config.gpxPolygonSymbol
      };
      const graphics = [];
      r.tracks.forEach((gr) => {
        gr.symbol = symbols[gr.geometry.type];
        graphics.push(gr);
      });
      r.waypoints.forEach((gr) => {
        gr.symbol = symbols[gr.geometry.type];
        graphics.push(gr);
      });
      this.addGraphicsLayer(graphics, name, zoom);
    });
  }
  addTextLayer(name, url, zoom) {
    if (!this.isValidLayerName(name)) {
      return;
    }
    TextUtils.txtToFeatures(url, this.view.spatialReference).then((features) => {
      this.addGraphicsLayer(features, name, zoom);
    });
  }
  getGlobalExtent(geometries, expandFactor) {
    const getExtent = (geom) => {
      const extent = geom.extent;
      if (extent && extent.width && extent.height) {
        return extent.expand(expandFactor);
      }
      const pt = geom.type === "point" ? [geom.x, geom.y] : geom.points[0];
      const size = 50;
      return new Extent({
        xmin: pt[0] - size,
        ymin: pt[1] - size,
        xmax: pt[0] + size,
        ymax: pt[1] + size,
        spatialReference: this.view.spatialReference
      });
    };
    let result;
    geometries.forEach((geom) => {
      if (result) {
        result.union(getExtent(geom));
      } else {
        result = getExtent(geom.clone());
      }
    });
    return result.expand(expandFactor);
  }
  isValidLayerName(name) {
    if (this.view.map.layers.some((l) => l.title === name)) {
      console.warn(`Map already contains a layer called '${name}'.`);
      return false;
    }
    return true;
  }
  addGraphicsLayer(graphics, name, zoom) {
    const layer = new GraphicsLayer({
      title: name
    });
    this.view.map.add(layer);
    layer.graphics.addMany(graphics);
    if (zoom) {
      const geometries = graphics.map((f) => f.geometry);
      const extent = this.getGlobalExtent(geometries, 1.5);
      this.view.extent = extent;
    }
  }
}
class ConfigUtils {
  static getConfig(params) {
    return new Promise((resolve, reject) => {
      esriRequest(params.configUrl, {
        responseType: "json"
      }).then((r) => {
        const config = r.data;
        let overviewBasemap = void 0;
        let overviewFactor = void 0;
        let overviewDisplay;
        if (params.miniMap !== void 0) {
          overviewDisplay = params.miniMap;
          const basemap = this.getBasemap(config.basemaps, config.overviewBasemap);
          if (basemap) {
            overviewBasemap = basemap;
          }
          overviewFactor = config.overviewFactor;
        }
        let layerList;
        if (params.layerList !== void 0 && params.layers && params.layers.length) {
          layerList = params.layerList;
        }
        let vectorServiceUrl = config.vectorServiceUrl;
        if (vectorServiceUrl.substring(vectorServiceUrl.length - 1) === "/") {
          vectorServiceUrl = vectorServiceUrl.substring(0, vectorServiceUrl.length - 1);
        }
        resolve({
          apiUrl: config.apiUrl,
          basemaps: this.getBasemaps(config, params),
          center: params.center || config.center,
          container: params.container,
          globalExtent: config.globalExtent,
          gpxPointSymbol: config.gpxPointSymbol,
          gpxPolylineSymbol: config.gpxPolylineSymbol,
          gpxPolygonSymbol: config.gpxPolygonSymbol,
          layers: params.layers,
          layerList,
          markerSymbol: config.markerSymbol,
          maxScale: config.maxScale,
          minScale: config.minScale,
          overviewBasemap,
          overviewDisplay,
          overviewFactor,
          scale: params.scale || config.scale,
          scales: config.scales,
          selectionPointSymbol: config.selectionPointSymbol,
          selectionPolylineSymbol: config.selectionPolylineSymbol,
          selectionPolygonSymbol: config.selectionPolygonSymbol,
          spatialReference: config.spatialReference,
          showCoords: params.showCoords,
          vectorLayerQueries: config.vectorLayerQueries,
          vectorServiceUrl,
          vectorServiceToken: config.vectorServiceToken
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
  static getBasemaps(config, params) {
    const result = [];
    if (params.basemaps === void 0) {
      const basemap = this.getBasemap(config.basemaps, config.defaultBasemap, config.copyright);
      if (basemap) {
        result.push(basemap);
      }
    } else {
      params.basemaps.forEach((bm) => {
        const basemap = this.getBasemap(config.basemaps, bm, config.copyright);
        if (basemap) {
          result.push(basemap);
        }
      });
    }
    return result;
  }
  static getBasemap(basemaps, name, copyright) {
    const basemap = basemaps[name];
    if (!basemap) {
      console.warn(`Invalid basemap name: ${name}`);
      return null;
    }
    return {
      alias: basemap.alias,
      copyright,
      layerId: basemap.layerId,
      name,
      thumbnailUrl: basemap.thumbnailUrl,
      type: basemap.type,
      url: basemap.url,
      urlTemplate: basemap.urlTemplate
    };
  }
}
class MapControl {
  constructor(params) {
    this.emitter = createNanoEvents();
    ConfigUtils.getConfig(params).then((config) => {
      let apiUrl = config.apiUrl;
      if (apiUrl.charAt(apiUrl.length - 1) !== "/") {
        apiUrl += "/";
      }
      esriConfig.assetsPath = `${apiUrl}@arcgis/core/assets`;
      const css = document.createElement("link");
      css.setAttribute("rel", "stylesheet");
      css.setAttribute("type", "text/css");
      css.setAttribute("href", `${apiUrl}@arcgis/core/assets/esri/themes/light/main.css`);
      document.getElementsByTagName("head")[0].appendChild(css);
      this.map = new MapClass(config);
      this.map.init(this.emitter);
    }).catch((error) => {
      console.error(error);
    });
  }
  on(event, callback) {
    return this.emitter.on(event, callback);
  }
  center(position, scale) {
    this.callMapFunction(() => this.map.center(position, scale));
  }
  centerOnObject(layer, ids, highlight) {
    this.callMapFunction(() => this.map.centerOnObject(layer, ids, highlight));
  }
  addGpxLayer(name, url, zoom) {
    this.callMapFunction(() => this.map.addGpxLayer(name, url, zoom));
  }
  addTextLayer(name, url, zoom) {
    this.callMapFunction(() => this.map.addTextLayer(name, url, zoom));
  }
  addMarker(params) {
    this.callMapFunction(() => this.map.addMarker(params));
  }
  showPopup(title, content) {
    this.map.showPopup(title, content);
  }
  callMapFunction(fct) {
    if (this.map) {
      fct();
    } else {
      this.emitter.on("map-created", () => fct());
    }
  }
}
export { MapControl as default };
//# sourceMappingURL=main.js.map
