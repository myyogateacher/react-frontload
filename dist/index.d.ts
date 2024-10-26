/// <reference types="react" />
declare type FrontloadMeta = {
    serverRendered: boolean;
    pending: boolean;
    done: boolean;
    error: any;
};
export declare type FrontloadProps<T> = {
    data: T;
    frontloadMeta: FrontloadMeta;
    setData: (fn: (data: T) => T) => void;
    reload: () => void;
};
declare type FrontloadServerRenderFunction<T> = (args: {
    isFinalRender?: boolean;
}) => T;
declare type FrontloadFunction = (context: any) => Promise<any>;
declare type FrontloadData = {
    key: string;
    fn: FrontloadFunction;
};
export declare const createFrontloadState: {
    server: (args: {
        context: any;
        logging?: boolean;
    }) => FrontloadState;
    client: (args: {
        serverRenderedData: any;
        context: any;
        logging?: boolean;
    }) => FrontloadState;
};
export declare type FrontloadState = InstanceType<typeof FrontloadStatePrivate>;
declare class FrontloadStatePrivate {
    private serverRender;
    private clientRender;
    context: any;
    constructor({ serverRenderedData, context, logging, }: {
        serverRenderedData?: object;
        context: any;
        logging?: boolean;
    });
    setFirstRenderDoneOnClient(): void;
    isFirstRender(): boolean;
    isClientLoggingEnabled(): boolean;
    prepareServerRenderPass(): void;
    collectServerRenderFrontload(frontload: FrontloadData): void;
    hasFrontloadRunOnServer(key: string): boolean;
    getFrontloadServerRenderedData(key: string): any;
    getServerRenderMeta(): {
        numPasses: number;
        frontloads: string[];
    };
    getServerRenderCache(): {
        [x: string]: any;
    };
    runFrontloadsForThisServerRenderPass(): Promise<{
        pass: number;
        allFrontloads: FrontloadData[];
        newFrontloads: FrontloadData[];
        duplicateFrontloads: {
            [key: string]: number;
        };
        cachedFrontloads: {
            [key: string]: boolean;
        };
        errorCachedFrontloads: {
            [key: string]: boolean;
        };
        errors: {
            [key: string]: any;
        };
    }>;
}
export declare const FrontloadProvider: ({ initialState: frontloadState, children, }: {
    initialState: FrontloadState;
    children: any;
}) => JSX.Element;
export declare function frontloadServerRender<T>({ render, frontloadState, }: {
    render: FrontloadServerRenderFunction<T>;
    frontloadState: FrontloadState;
}): Promise<{
    rendered: T;
    data: {
        [key: string]: any;
    };
}>;
export declare function useFrontload<T>(key: string, fn: (context: any) => Promise<T>): FrontloadProps<T>;
export {};
