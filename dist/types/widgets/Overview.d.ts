import Basemap from '@arcgis/core/Basemap';
import MapView from '@arcgis/core/views/MapView';
import Expand from '@arcgis/core/widgets/Expand';
import { tsx } from '@arcgis/core/widgets/support/widget';
import Widget from '@arcgis/core/widgets/Widget';
interface OverviewParams extends __esri.WidgetProperties {
    basemap: Basemap;
    mainView: MapView;
    scales: number[];
    factor: number;
}
export default class Overview extends Widget {
    private overview;
    private extentGraphic;
    private mainView;
    private basemap;
    private scales;
    private factor;
    constructor(params?: OverviewParams);
    postInitialize(): void;
    expand: Expand;
    render(): tsx.JSX.Element;
    private onViewChange;
    private createMap;
    private createExtentGraphic;
}
export {};
