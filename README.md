# tt-mapcontrol

## Description

Cette librairie permet d'ajouter des cartes dans des pages web de manière simple.  
L'affichage et la configuration sont basés sur un fichier de configuration hébergé hors de la librairie.

## Initialisation

### ES6

- Installer le package:
```sh
npm install tt-mapcontrol
```

- Importer la classe `MapControl`:
```sh
import MapControl from 'tt-mapcontrol';
```

- Créer un instance de `MapControl`:
```sh
const mapControl = new MapControl({
    configUrl: 'http://localhost:5500/config/config.json',
    container: 'viewDiv'
});
```

Les deux paramètres obligatoires sont `configUrl` et `container`.

### AMD

- Ajouter un tag script pour charger l'API JavaScript Esri:
```sh
<script src="https://js.arcgis.com/4.22/"></script>
```

- Faire un `require` pour charger la librairie:
```sh
require(['http://localhost:5500/node_modules/tt-mapcontrol/dist/umd/main.js'], function (MapControl) {
    // initialisation de la carte
});
```

- Créer un instance de `MapControl`:
```sh
const mapControl = new MapControl({
    configUrl: 'http://localhost:5500/config/config.json',
    container: 'viewDiv'
});
```

Les deux paramètres obligatoires sont `configUrl` et `container`.

## Paramètres du constructeur de MapControl

Le constructeur accepte les paramètres suivants:
- **configUrl**: (`string`) Url du fichier de configuration.
- **container**: (`string`) Identifiant de l'élément HTML div qui doit contenir la carte.
- **basemaps**: (`string[]`) Liste des fonds de plan de la carte. Les noms sont définis dans le fichier de configuration. Si la liste contient plus d'un élément, un contrôle de sélection du fond de plan est affiché sur la carte. Le premier élément de la liste est affiché au chargement.
- **center**: (`number[]`) Coordonnées du centre de la carte. Format [x, y]
- **layers**: (`string[]`) Liste des couches vecteur ajoutées au-dessus du fond de plan. Les noms sont définis dans le fichier de configuration. L'ordre des couches est déterminé dans le service cartographique et ne peut pas être modifié depuis ce paramètre.
- **layerList**: (`string`) Affiche le contrôle permettant d'afficher/masquer les couches vecteur. Les valeurs possibles sont `collapsed` et `expanded`. Si le paramètre n'est pas défini, le contrôle ne s'affiche pas.
- **miniMap**: (`string`) Affiche une carte avec la vue d'ensemble. Les valeurs possibles sont `collapsed` et `expanded`. Si le paramètre n'est pas défini, le contrôle ne s'affiche pas.
- **scale**: (`number`) Echelle de la carte.
- **showCoords**: (`string`) Affiche le contrôle permettant de suivre les coordonnées du curseur. Les valeurs possibles sont `collapsed` et `expanded`. Si le paramètre n'est pas défini, le contrôle ne s'affiche pas.

## Fonctions de MapControl

La classe MapControl possède les méthodes suivantes pouvant être appelées une fois l'instance de la classe créée:
- **center**: (`position: number[], scale?: number`) Change la position de la carte. Le paramètre `position` contient les coordonnées du nouveau centre. Le paramètre `scale` permet de définir une nouvelle échelle. Si ce paramètre n'est pas défini, l'échelle courante est conservée.
- **centerOnObject**: (`layer: string, ids: string[], highlight: boolean`) Zoom sur un objet. Le paramètre `layer` permet d'indiquer la couche contenant le ou les objets sur lesquels il faut se localiser. Les valeurs de ce paramètre sont définies dans le fichier de configuration. Le paramètre `ids` indique les identifiants des objets (le champ utilisé est défini dans le fichier de configuration). Le paramètre `highlight` indique s'il faut mettre l'objet en évidence sur la carte.
- **addGpxLayer**: (`name: string, url: string, zoom: boolean`) Permet d'ajouter une couche basée sur un fichier GPX accessible par une `url`. Le paramètre `name` correspond au nom de la couche apparaissant dans le contrôle permettant d'afficher/masquer les couches. Le paramètre `zoom` indique s'il faut zoomer sur les objets de la couche.
- **addTextLayer**: (`name: string, url: string, zoom: boolean`) Permet d'ajouter une couche basée sur un fichier texte accessible par une `url`. Le paramètre `name` correspond au nom de la couche apparaissant dans le contrôle permettant d'afficher/masquer les couches. Le paramètre `zoom` indique s'il faut zoomer sur les objets de la couche. Le fichier texte doit contenir les informations point, title, description, icon et iconSize séparées par des tabulations. Chaque ligne correspond à un objet.
- **addMarker**: (`params?: MarkerParams`) Permet d'ajouter un marqueur sur la carte. Sans paramètre, le marqueur par défaut (défini dans le fichier de configuration) est ajouté au centre de la carte. Il est également possible de passer en paramètre l'objet avec les propriétés suivantes:
    - **position**: (`number[]`) Coordonnées du marqueur. Format [x, y]
    - **size**: (`number[]`) Taille du marqueur en pixels.  Format [width, height]
    - **icon**: (`string`) Url de l'image utilisée pour le marqueur.
- **showPopup**: (`title: string, content: string`) Permet d'afficher une popup sur la carte. 

## Événement de MapControl

La classe MapControl possède un événement sur le ctrl + clic sur la carte qui retourne les coordonnées du clic:
Exemple pour afficher les coordonnées à l'aide de la méthode `showPopup`:
```sh
mapControl.on('ctrlClick', position => {
    mapControl.showPopup('Coordonnées', `${Math.round(position[0])} / ${Math.round(position[1])}`);
});
```

## Fichier de configuration

Le fichier de configuration doit être accessible par une url qui est passée en paramètre lors de l'initialisation de l'objet MapControl.
Le fichier de configuration est au format json et possède les propriétés décrites ci-dessous de manière succincte.
- **apiUrl**: Url de l'API JavaScript Esri. Il peut s'agir du CDN Esri ou d'une installation sur un autre serveur.
- **spatialReference**: Wkid de la référence spatiale de la carte.
- **center**:  Coordonnées du centre par défaut s'il n'est pas défini dans le constructeur de MapControl.
- **scale**: Echelle par défaut si elle n'est pas définie dans le constructeur de MapControl.
- **globalExtent**: Etendue maximale de la carte sur laquelle il est possible de se déplacer.
- **minScale**: Echelle minimale de la carte. 0 pour ne pas fixer de limite.
- **maxScale**: Echelle maximale de la carte. 0 pour ne pas fixer de limite.
- **basemaps**: Liste des fonds de plan disponibles. Les formats supportés sont `tile` (service tuilé dans projection 2056 avec urlTemplate), `wmts`, `mapservice` (tuilé), `imageservice` et `vectortile`.
- **defaultBasemap**: Fond de plan utilisé si le constructeur de MapControl ne possède pas la propriété `basemaps`.
- **vectorServiceUrl**: Url du service ArcGIS Server contenant les couches vectorielles.
- **vectorServiceToken**: Token permettant d'accéder au service défini sous `vectorServiceUrl` si celui-ci est sécurisé. 
- **vectorLayerQueries**: Définition des couches pouvant être requétées par la méthode `centerOnObject`.
- **overviewBasemap**: Nom du fond de plan utilisé pour la carte avec la vue d'ensemble.
- **overviewFactor**: Facteur de zoom pour la carte avec la vue d'ensemble.
- **copyright**: Texte de copyright apparaissant au bas de la carte.
- **markerSymbol**: Définition du symbole par défaut pour la méthode `addMarker`.
- **selectionPointSymbol**: Définition du symbole point pour la méthode `centerOnObject` si `highlight` est `true`.
- **selectionPolylineSymbol**: Définition du symbole ligne pour la méthode `centerOnObject` si `highlight` est `true`.
- **selectionPolygonSymbol**: Définition du symbole polygone pour la méthode `centerOnObject` si `highlight` est `true`.
- **gpxPointSymbol**: Définition du symbole point pour les couches GPX ajoutées avec la méthode `addGpxLayer`.
- **gpxPolylineSymbol**: Définition du symbole ligne pour les couches GPX ajoutées avec la méthode `addGpxLayer`.
- **gpxPolygonSymbol**: Définition du symbole polygone pour les couches GPX ajoutées avec la méthode `addGpxLayer`.
