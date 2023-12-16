
/**
 * @classdesc
 *   Class designed for better handling of ScreenDistance class creation
 * 
 * @constructor
 *   Takes start X and Y positions
 */
export class ScreenPosition {
    readonly position: {readonly x: number, readonly y: number};
    constructor(positionX: number, positionY: number) {this.position = {x: positionX, y: positionY}}
}

/**
 * @classdesc
 *   Class designed to calculate and store distance between two screen positions
 * 
 * @constructor
 *   Takes start position in ScreenPosition class form
 *   Sets end positions with the same coordintaes
 * 
 * @param start: ScreenPosition
 *    Start position of a screen distance (Set by constructor)
 * @param end: ScreenPosition
 *    End position of a screen distance. (Set and get)
 *    Distance calculation happens here
 * @param distance: {x: number, y: number}
 *    Distance between the start and the end positions. (Get only)
 */
export class ScreenDistance {
    constructor(startPosition: ScreenPosition) {
        this.start = startPosition;
        this._end = new ScreenPosition(startPosition.position.x, startPosition.position.y);
        this._distance = {x: 0, y: 0};
    }

    readonly start: ScreenPosition;

    private _end: ScreenPosition;
    get end() { return this._end }
    set end(endPosition: ScreenPosition) {
        this._end = endPosition;
        this._distance = {
            x: this._end.position.x - this.start.position.x,
            y: this._end.position.y - this.start.position.y
        }
    }

    private _distance: {readonly x: number, readonly y: number}
    get distance() {
        return this._distance;
    }
}