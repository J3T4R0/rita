import {Term} from "./Term"

/**
 * A atom that gets it value from the data
 */
export class Atom extends Term{
    /**
     * The path of the value in the data
     */
    public path: string;

    constructor(path: string) {
        super();
        this.path = path;
    }

    /**
     * Get the value of an object property or array by a path that is passed as string
     * @param o object
     * @param s path
     * @private
     */
    private static getPropertyByString(o: any, s: string): boolean {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        const a = s.split('.');
        for (let i = 0, n = a.length; i < n; ++i) {
            const k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                throw new Error("Undefinded path in data: "+s)
            }
        }
        return o;
    }
    evaluate(data: Record<string, any>): boolean {
        return Atom.getPropertyByString(data, this.path);
    }

    validate(): boolean {
        return !!this.path;
    }

    toJsonReady(): Record<string, any> {
        return {
            type: 'atom',
            path: this.path
        };
    }

}
