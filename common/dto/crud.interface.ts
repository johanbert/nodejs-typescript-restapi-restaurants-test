export interface CRUD {
    // list: (lat: number, lon: number, radio: number) => Promise<any>;
    // list: (lat: number, lon: number, radio: number) => Promise<any>;
    create: (resource: any) => Promise<any>;
    readById: (id: string) => Promise<any>;
    updateById: (id: string, resource: any) => Promise<string>;
    deleteById: (id: string) => Promise<any>;
    // patchById: (id: string, resource: any) => Promise<string>;
}
