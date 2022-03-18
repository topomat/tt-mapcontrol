import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import Graphic from '@arcgis/core/Graphic';
declare type GpxContent = {
    waypoints: Graphic[];
    tracks: Graphic[];
};
export default class GpxUtils {
    static gpxToFeatures(url: string, spatialReference: SpatialReference): Promise<GpxContent>;
    private static getGraphic;
}
export {};
