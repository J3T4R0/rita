import Term from "./Term";

export default class Atom extends Term{
    public path: string;

    constructor(path: string) {
        super();
        this.path = path;
    }

    evaluate(data: Record<string, any>): boolean {
        //TODO implement path deeper than immediate access
        return data[this.path];
    }

    validate(): boolean {
        return !!this.path;
    }

    static parseAtom(jsonRuleset: Record<string, any>): Atom {
        return new Atom(jsonRuleset["path"]);
    }

};
