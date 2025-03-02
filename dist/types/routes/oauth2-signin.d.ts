import { RouteInitEnvironment, RouteRequest } from '../shared/env';
export declare type RequestQuery = {
    state: string;
    code?: string;
    error?: string;
    error_reason?: string;
    error_description?: string;
};
export declare type RequestBody = null;
export declare type ResponseBody = string | {
    code: 'admin_only';
    message: string;
};
export declare type Request = RouteRequest<RequestQuery, RequestBody, ResponseBody>;
export declare const addRoute: (env: RouteInitEnvironment) => void;
//# sourceMappingURL=oauth2-signin.d.ts.map