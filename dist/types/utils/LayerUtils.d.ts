import Basemap from '@arcgis/core/Basemap';
import Geometry from '@arcgis/core/geometry/Geometry';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { BasemapItem, ConfigItem, LayerQueryItem } from '../types/ConfigItem';
export default class LayerUtils {
    private serviceDescription;
    private config;
    private serviceUrl;
    constructor(config: ConfigItem);
    getFeatureLayers(layers: string[]): Promise<FeatureLayer[]>;
    queryLayer(layerQuery: LayerQueryItem, ids: string[]): Promise<Geometry[]>;
    getBasemaps(basemapItems: BasemapItem[]): Basemap[];
    private getServiceDescription;
    private getLayer;
}
