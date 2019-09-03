import { Vector3 } from "babylonjs";

export interface IOctreeEntity {
    position: Vector3;
}

/**
 * TODO: Performance enhancements here:
 *      https://www.gamedev.net/resources/_/technical/game-programming/introduction-to-octrees-r3529
 */
export class Octree<T extends IOctreeEntity> {
    public static MAX_LEVEL: number = 8;
    public accuracy = 0;
    private maxDistance: number;
    private root: Cell<T>;

    constructor(position: Vector3, size: Vector3, accuracy: number) {
        this.maxDistance = Math.max(size.x, Math.max(size.y, size.z));
        this.accuracy = 0;
        this.root = new Cell<T>(this, position, size, 0);
    }

    public reset(position: Vector3, size: Vector3, accuracy: number) {
        this.maxDistance = Math.max(size.x, Math.max(size.y, size.z));
        this.accuracy = 0;
        this.root = new Cell<T>(this, position, size, 0);
    }

    public add(p: T) {
        this.root.add(p);
    }
    public has(p: T) {
        return this.root.has(p);
    }
    public findNearestPoint(p: Vector3, options: IOctreeOptions): T {
        options.maxDist = options.maxDist ? options.maxDist : Infinity;
        options.notSelf = options.notSelf ? options.notSelf : false;

        const result = this.root.findNearestPoint(p, options);
        if (result) {
            return result;
        } else {
            return (null as unknown) as T;
        }
    }
    public findNearbyPoints(
        p: Vector3,
        r: number,
        options: IOctreeOptions
    ): T[] {
        options = options || {};
        const result: T[] = [];
        this.root.findNearbyPoints(p, r, result, options);
        return result;
    }
    public getAllCellsAtLevel(
        cell: Cell<T>,
        level: Cell<T>,
        result: Array<Cell<T>>
    ) {
        if (typeof level === "undefined") {
            level = cell;
            cell = this.root;
        }
        result = result || [];
        if (cell.level === level.level) {
            if (cell.points.length > 0) {
                result.push(cell);
            }
            return result;
        } else {
            cell.children.forEach(child => {
                this.getAllCellsAtLevel(child, level, result);
            });
            return result;
        }
    }
}

export interface IOctreeOptions {
    maxDist: number;
    notSelf?: boolean;
}

export class Cell<T extends IOctreeEntity> {
    public level: number;
    public points: T[];
    public children: Array<Cell<T>>;

    private position: Vector3;
    private tree: Octree<T>;
    private size: Vector3;

    constructor(
        tree: Octree<T>,
        position: Vector3,
        size: Vector3,
        level: number
    ) {
        this.tree = tree;
        this.position = position;
        this.size = size;
        this.level = level;
        this.points = [];
        this.children = [];
    }
    public has(p: T): boolean {
        if (!this.contains(p)) {
            return false;
        }
        if (this.children.length > 0) {
            for (let i = 0; i < this.children.length; i++) {
                const duplicate = this.children[i].has(p);
                if (duplicate) {
                    return duplicate;
                }
            }
            return false;
        } else {
            const minDistSqrt = this.tree.accuracy * this.tree.accuracy;
            for (let i = 0; i < this.points.length; i++) {
                const o = this.points[i];
                const distSq = Vector3.DistanceSquared(o.position, p.position);
                if (distSq <= minDistSqrt) {
                    return !!o;
                }
            }
            return false;
        }
    }
    public add(p: T) {
        this.points.push(p);
        if (this.children.length > 0) {
            this.addToChildren(p);
        } else {
            if (this.points.length > 1 && this.level < Octree.MAX_LEVEL) {
                this.split();
            }
        }
    }
    public addToChildren(p: T) {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].contains(p)) {
                this.children[i].add(p);
                break;
            }
        }
    }
    public contains(p: T) {
        return (
            p.position.x >= this.position.x - this.tree.accuracy &&
            p.position.y >= this.position.y - this.tree.accuracy &&
            p.position.z >= this.position.z - this.tree.accuracy &&
            p.position.x < this.position.x + this.size.x + this.tree.accuracy &&
            p.position.y < this.position.y + this.size.y + this.tree.accuracy &&
            p.position.z < this.position.z + this.size.z + this.tree.accuracy
        );
    }
    public split() {
        const x = this.position.x;
        const y = this.position.y;
        const z = this.position.z;
        const w2 = this.size.x / 2;
        const h2 = this.size.y / 2;
        const d2 = this.size.z / 2;
        this.children.push(
            new Cell<T>(
                this.tree,
                new Vector3(x, y, z),
                new Vector3(w2, h2, d2),
                this.level + 1
            )
        );
        this.children.push(
            new Cell<T>(
                this.tree,
                new Vector3(x + w2, y, z),
                new Vector3(w2, h2, d2),
                this.level + 1
            )
        );
        this.children.push(
            new Cell<T>(
                this.tree,
                new Vector3(x, y, z + d2),
                new Vector3(w2, h2, d2),
                this.level + 1
            )
        );
        this.children.push(
            new Cell<T>(
                this.tree,
                new Vector3(x + w2, y, z + d2),
                new Vector3(w2, h2, d2),
                this.level + 1
            )
        );
        this.children.push(
            new Cell<T>(
                this.tree,
                new Vector3(x, y + h2, z),
                new Vector3(w2, h2, d2),
                this.level + 1
            )
        );
        this.children.push(
            new Cell<T>(
                this.tree,
                new Vector3(x + w2, y + h2, z),
                new Vector3(w2, h2, d2),
                this.level + 1
            )
        );
        this.children.push(
            new Cell<T>(
                this.tree,
                new Vector3(x, y + h2, z + d2),
                new Vector3(w2, h2, d2),
                this.level + 1
            )
        );
        this.children.push(
            new Cell<T>(
                this.tree,
                new Vector3(x + w2, y + h2, z + d2),
                new Vector3(w2, h2, d2),
                this.level + 1
            )
        );
        for (let i = 0; i < this.points.length; i++) {
            this.addToChildren(this.points[i]);
        }
    }

    public squareDistanceToCenter(p: Vector3) {
        const dx = p.x - (this.position.x + this.size.x / 2);
        const dy = p.y - (this.position.y + this.size.y / 2);
        const dz = p.z - (this.position.z + this.size.z / 2);
        return dx * dx + dy * dy + dz * dz;
    }

    public findNearestPoint(p: Vector3, options: IOctreeOptions): T | null {
        let nearest = null;
        let bestDist = options.maxDist;

        if (this.points.length > 0 && this.children.length === 0) {
            for (let i = 0; i < this.points.length; i++) {
                const dist = Vector3.Distance(p, this.points[i].position); // TESTING: Might need to flip this.
                if (dist <= bestDist) {
                    if (dist === 0 && options.notSelf) {
                        continue;
                    }
                    bestDist = dist;
                    nearest = this.points[i];
                }
            }
        }

        const children = this.children
            .map(child => {
                return { child, dist: child.squareDistanceToCenter(p) };
            })
            .sort((a, b) => {
                return a.dist - b.dist;
            })
            .map(c => {
                return c.child;
            });

        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child.points.length > 0) {
                    if (
                        p.x < child.position.x - bestDist ||
                        p.x > child.position.x + child.size.x + bestDist ||
                        p.y < child.position.y - bestDist ||
                        p.y > child.position.y + child.size.y + bestDist ||
                        p.z < child.position.z - bestDist ||
                        p.z > child.position.z + child.size.z + bestDist
                    ) {
                        continue;
                    }
                    const childNearest = child.findNearestPoint(p, options);
                    if (!childNearest || !childNearest) {
                        continue;
                    }
                    const childNearestDist = Vector3.Distance(
                        childNearest.position,
                        p
                    );
                    if (childNearestDist < bestDist) {
                        nearest = childNearest;
                        bestDist = childNearestDist;
                    }
                }
            }
        }
        return nearest;
    }

    public findNearbyPoints(
        p: Vector3,
        r: number,
        result: T[],
        options: IOctreeOptions
    ) {
        if (this.points.length > 0 && this.children.length === 0) {
            for (let i = 0; i < this.points.length; i++) {
                const dist = Vector3.Distance(p, this.points[i].position); // TESTING: Might need to flip this
                if (dist <= r) {
                    if (dist === 0 && options.notSelf) {
                        continue;
                    }
                    result.push(this.points[i]);
                }
            }
        }
        const children = this.children;

        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child.points.length > 0) {
                    if (
                        p.x < child.position.x - r ||
                        p.x > child.position.x + child.size.x + r ||
                        p.y < child.position.y - r ||
                        p.y > child.position.y + child.size.y + r ||
                        p.z < child.position.z - r ||
                        p.z > child.position.z + child.size.z + r
                    ) {
                        continue;
                    }
                    child.findNearbyPoints(p, r, result, options);
                }
            }
        }
    }
}
