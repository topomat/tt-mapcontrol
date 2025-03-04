export type MarkerParams = {
    /** Coordinates of the marker */
    position?: number[];
    /** Size in pixel of the marker */
    size?: number[];
    /** Url of the marker */
    icon?: string;
    /** Popup content */
    popup?: Popup;
};
export type Popup = {
    /** Title of the popup */
    title?: string;
    /** Content of the popup */
    content?: string;
};
