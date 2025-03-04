import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import Graphic from '@arcgis/core/Graphic';
export default class TextUtils {
    static txtToFeatures(url: string, spatialReference: SpatialReference): Promise<Graphic[]>;
}
