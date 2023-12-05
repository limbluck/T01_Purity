export class ScreenPosition {
    constructor(positionX: number, positionY: number) {
        this.position = {x: positionX, y: positionY}
    }
    
    readonly position: {readonly x: number, readonly y: number};
}

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