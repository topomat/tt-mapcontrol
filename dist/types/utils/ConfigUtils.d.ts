import { ConfigItem } from '../types/ConfigItem';
import { MapControlParams } from '../types/MapControlParams';
export declare class ConfigUtils {
    static getConfig(params: MapControlParams): Promise<ConfigItem>;
    private static getBasemaps;
    private static getBasemap;
}
