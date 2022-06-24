import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer';
export default class SwissTileLayer extends BaseTileLayer {
    urlTemplate: string;
    constructor(params: any);
    getTileUrl(level: number, row: number, col: number): string;
}
