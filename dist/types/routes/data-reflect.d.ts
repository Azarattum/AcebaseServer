import { IReflectionChildrenInfo, IReflectionNodeInfo } from 'acebase-core';
import { RouteInitEnvironment, RouteRequest } from '../shared/env';
export declare type RequestQuery = {
    type: 'info' | 'children';
    impersonate?: string;
};
export declare type RequestBody = null;
export declare type ResponseBody = IReflectionNodeInfo & IReflectionChildrenInfo & {
    impersonation: {
        uid: string;
        read: {
            allow: boolean;
            error?: {
                code: string;
                message: string;
            };
        };
        write: {
            allow: boolean;
            error?: {
                code: string;
                message: string;
            };
        };
    };
};
export declare type Request = RouteRequest<RequestQuery, RequestBody, ResponseBody>;
export declare const addRoute: (env: RouteInitEnvironment) => void;
export default addRoute;
//# sourceMappingURL=data-reflect.d.ts.map