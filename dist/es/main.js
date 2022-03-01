var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import WMTSLayer from "@arcgis/core/layers/WMTSLayer";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import TileInfo from "@arcgis/core/layers/support/TileInfo";
import Extent from "@arcgis/core/geometry/Extent";
import esriConfig from "@arcgis/core/config";
import "@arcgis/core/assets/esri/themes/light/main.css";
esriConfig.assetsPath = "https://js.arcgis.com/4.22/@arcgis/core/assets";
class MapControl {
  constructor(params) {
    __publicField(this, "view");
    this.build(params);
  }
  center(x, y, scale) {
    this.view.center = new Point({
      x,
      y,
      spatialReference: this.view.spatialReference
    });
    if (scale !== void 0) {
      this.view.scale = scale;
    }
  }
  build(params) {
    const wmts = new WMTSLayer({
      url: "https://wmts.asit-asso.ch/wmts/1.0.0/",
      activeLayer: {
        id: "asitvd.fond_couleur"
      }
    });
    const map = new Map({
      layers: [wmts]
    });
    const spatialReference = new SpatialReference({
      wkid: 2056
    });
    let center;
    if (params.center === void 0) {
      center = new Point({
        x: 253e4,
        y: 116e4,
        spatialReference
      });
    } else {
      center = new Point({
        x: params.center[0],
        y: params.center[1],
        spatialReference
      });
    }
    const scales = [15118110236220477e-9, 14173228346456695e-9, 13228346456692917e-9, 12283464566929135e-9, 11338582677165356e-9, 10393700787401576e-9, 9448818897637796e-9, 8503937007874018e-9, 7559055118110239e-9, 6614173228346459e-9, 5669291338582678e-9, 4724409448818898e-9, 3.7795275590551193e6, 2834645669291339e-9, 2.4566929133858276e6, 1.8897637795275596e6, 944881.8897637798, 377952.7559055118, 188976.3779527559, 75590.55118110238, 37795.27559055119, 18897.637795275594, 9448.818897637797, 7559.055118110236, 5669.291338582678, 3779.527559055118, 1889.763779527559, 944.8818897637796, 377.9527559055119, 188.97637795275594];
    const tileInfo = TileInfo.create({
      spatialReference,
      numLODs: scales.length,
      scales
    });
    const extent = new Extent({
      xmin: 248e4,
      ymin: 111e4,
      xmax: 2595e3,
      ymax: 1208e3,
      spatialReference
    });
    this.view = new MapView({
      container: params.container,
      map,
      scale: params.scale === void 0 ? 3e5 : params.scale,
      center,
      spatialReference,
      constraints: {
        rotationEnabled: false,
        lods: tileInfo.lods,
        minScale: 1e6,
        geometry: extent
      }
    });
  }
}
export { MapControl };
//# sourceMappingURL=main.js.map
