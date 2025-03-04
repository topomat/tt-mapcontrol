export type MapControlParams = {
    /** Background layers. First item is displayed at startup. If there are multiple items, a selector control is added on the map. */
    basemaps?: string[];
    /** Map center coordinates */
    center?: number[];
    /** Config file url */
    configUrl: string;
    /** Map container id */
    container: string;
    /** Visible layers */
    layers?: string[];
    /** Show the layer list control. Possible values are "collapsed" and "expanded". */
    layerList?: 'collapsed' | 'expanded';
    /** Show the mini map. Possible values are "collapsed" and "expanded". */
    miniMap?: 'collapsed' | 'expanded';
    /** Map scale */
    scale?: number;
    /** Display the mouse coordinates. Possible values are "collapsed" and "expanded". */
    showCoords?: 'collapsed' | 'expanded';
};
