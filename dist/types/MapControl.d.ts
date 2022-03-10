import { MapControlParams } from './MapControlParams';
export type { MapControlParams } from './MapControlParams';
export declare class MapControl {
    private view;
    /**
     * @param  {MapControlParams} params
     */
    constructor(params: MapControlParams);
    /**
     * Centre la carte sur un nouvel emplacement
     * @param x Coordonnée X du nouveau centre
     * @param y Coordonnée Y du nouveau centre
     * @param scale Echelle
     * @returns void
     */
    center(x: number, y: number, scale?: number): void;
    private build;
}
