import { Routes } from 'mockit-express';

declare function mockit(options: mockit.Options): (app: any) => void;

declare namespace mockit {
    interface BaseOptions {
        baseUrl?: string;
        template?: string | Template;
    }
    interface FileOptions extends BaseOptions {
        routes?: string;
        watch?: boolean;
    }
    interface ObjectOptions {
        routes?: Routes;
    }
    export interface Template {
        methods: string[];
        codes: Record<string, string>;
        mime: string[];
    }
    export type Options = FileOptions | ObjectOptions;
}

export = mockit;
