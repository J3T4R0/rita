import {Term} from "./Term"

export class Atom extends Term{
    public path: string;

    constructor(path: string) {
        super();
        this.path = path;
    }

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
