import { AxiosInstance } from "axios";


function configureAxios(instance: AxiosInstance, baseURL:string)
{
    instance.defaults.baseURL = baseURL;
    // instance.interceptors.request.use(createAxiosJwtInterceptor(AxiosBuilder.stores[AuthStore.key]));
    // instance.interceptors.response.use(undefined, createErrorInterceptor(AxiosBuilder.stores[UiStore.key]))
    return instance;
}

export {configureAxios};