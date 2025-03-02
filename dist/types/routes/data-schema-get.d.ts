import { RouteInitEnvironment, RouteRequest } from '../shared/env';
export declare type RequestQuery = null;
export declare type RequestBody = null;
export declare type ResponseBody = {
    path: string;
    schema: string;
    text: string;
} | 'Not Found';
export declare type Request = RouteRequest<RequestQuery, RequestBody, ResponseBody>;
export declare const addRoute: (env: RouteInitEnvironment) => void;
export default addRoute;
//# sourceMappingURL=data-schema-get.d.ts.map