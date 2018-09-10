import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

export interface ServerResponse {
    status: number;
    data: any;
    msg: string;
}

// 后端返回的状态码
enum rCodeMap {
    SUCCESS = 0,
    NO_LOGIN = 2,
    POLLING= 4,
}

export function DefaultInterceptor() {
    this.interceptors.request.use((config: AxiosRequestConfig) => {
        const { url } = config;
        if (
            !url.startsWith('https://') &&
            !url.startsWith('http://') &&
            !url.startsWith('//') &&
            process.env.SERVER_URL &&
            typeof location === 'undefined'
        ) {      
            config.url = process.env.SERVER_URL + url;
        }
        return config;
    });
    this.interceptors.response.use(
        ({ data: response }: AxiosResponse<ServerResponse>) => {
            const { status, msg } = response;
            if (status === rCodeMap.SUCCESS || status === rCodeMap.POLLING) {
                return Promise.resolve(response); // 避免每次都要写res.data.xxx
            }
            return Promise.reject(msg);
        },
        (error: AxiosError) => Promise.reject(error)
    );
}

export default DefaultInterceptor;
