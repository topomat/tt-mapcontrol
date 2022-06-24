export declare type ExtentItem = {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
};
export declare type BasemapItem = {
    alias: string;
    copyright?: string;
    layerId: string;
    name: string;
    thumbnailUrl: string;
    type: string;
    url?: string;
    urlTemplate?: string;
};
export declare type LayerQueryItem = {
    layer: string;
    field: string;
};
export declare type ConfigItem = {
    apiUrl: string;
    basemaps: BasemapItem[];
    center: number[];
    container: string;
    globalExtent: ExtentItem;
    gpxPointSymbol: any;
    gpxPolylineSymbol: any;
    gpxPolygonSymbol: any;
    layers?: string[];
    layerList?: 'collapsed' | 'expanded';
    markerSymbol: any;
    maxScale: number;
    minScale: number;
    overviewBasemap?: BasemapItem;
    overviewDisplay?: 'collapsed' | 'expanded';
    overviewFactor?: number;
    scale: number;
    scales: number[];
    selectionPointSymbol: any;
    selectionPolylineSymbol: any;
    selectionPolygonSymbol: any;
    showCoords?: 'collapsed' | 'expanded';
    spatialReference: number;
    vectorServiceUrl: string;
    vectorServiceToken: string;
    vectorLayerQueries: LayerQueryItem[];
};
