import {QueryClient} from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            //refetchOnWindowFocus:false,
            //refetchInterval:2000
            refetchOnWindowFocus: false,
            //enabled: false, // (!) handle refetchs manually
            refetchOnMount:false,//no se carga al montar componente
            refetchInterval:false,//cada cuanto
            retry:1,
            cacheTime:6000
        }
    }
})