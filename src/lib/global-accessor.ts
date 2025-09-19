class GlobalAccessor {

    map: Map<string, any> = new Map();

    public set (key: string, value: any) {
        this.map.set(key, value);
    }

    public get (key: string): any {
        return this.map.get(key);
    }
}

export let GlobalVars = new GlobalAccessor();