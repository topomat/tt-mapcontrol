import Basemap from '@arcgis/core/Basemap';
import MapView from '@arcgis/core/views/MapView';
export default class WidgetUtils {
    static addOverview(basemap: Basemap, view: MapView, scales: number[], factor: number, display: 'collapsed' | 'expanded'): void;
    static addLayerList(view: MapView, display: 'collapsed' | 'expanded'): void;
    static addBasemapGallery(items: Basemap[], view: MapView): void;
    static addCoordinates(view: MapView, display: 'collapsed' | 'expanded'): void;
}
