import { Emitter } from 'nanoevents';
import { ConfigItem } from './types/ConfigItem';
import { MarkerParams } from './types/MarkerParams';
export default class MapClass {
    config: ConfigItem;
    private view;
    private layerUtils;
    constructor(config: ConfigItem);
    init(emitter: Emitter): void;
    center(position: number[], scale?: number): void;
    centerOnObject(layer: string, ids: string[], highlight: boolean): void;
    getCenterCoordinates(): number[];
    showPopup(title: string, content: string): void;
    addMarker(params?: MarkerParams): void;
    addGpxLayer(name: string, url: string, zoom: boolean): void;
    addTextLayer(name: string, url: string, zoom: boolean): void;
    private getGlobalExtent;
    private isValidLayerName;
    private addGraphicsLayer;
}
