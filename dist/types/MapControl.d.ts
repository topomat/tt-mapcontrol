import { MapControlParams } from './types/MapControlParams';
import { MarkerParams } from './types/MarkerParams';
interface Events {
    ctrlClick: (position: number[]) => void;
}
export default class MapControl {
    private map;
    private emitter;
    /**
     * MapControl constructor
     * @param params Map parameters
     */
    constructor(params: MapControlParams);
    /**
     * Listen on events
     * @param event Event name
     * @param callback Callback function
     */
    on<E extends keyof Events>(event: E, callback: Events[E]): import("nanoevents").Unsubscribe;
    /**
     * Center the map on a new location
     * @param position Coordinates of the center
     * @param scale Scale
     */
    center(position: number[], scale?: number): void;
    /**
     * Center the map on one or more objects
     * @param layer Layer name
     * @param ids Ids of the objects
     * @param highlight Highlight the object or not
     */
    centerOnObject(layer: string, ids: string[], highlight: boolean): void;
    /**
     * Add a GPX layer on the map
     * @param name Name of the layer visible in the layer list control
     * @param url Url of the gpx file
     */
    addGpxLayer(name: string, url: string, zoom: boolean): void;
    /**
     * Add a layer from a text file on the map
     * @param name Name of the layer visible in the layer list control
     * @param url Url of the text file
     */
    addTextLayer(name: string, url: string, zoom: boolean): void;
    /**
     * Add a marker on the map
     * @param params Marker parameters
     */
    addMarker(params?: MarkerParams): void;
    /**
     * Add multiple markers on the map
     * @param params Marker parameters
     */
    addMarkers(params: MarkerParams[]): void;
    /**
     * Clear all markers on the map
     */
    clearMarkers(): void;
    /**
     * Display a popup on the map
     * @param title Title of the popup
     * @param content Content of the popup
     */
    showPopup(title: string, content: string): void;
    private callMapFunction;
}
export {};
