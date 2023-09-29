import { ApolloClient, ApolloQueryResult, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { client } from "./ApploClient";




export const useAppoloFetch = <T>(literals: string) => {
    const [data, setData] = useState<ApolloQueryResult<T> | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    async function fetch () {
            setIsLoading(true)
            const queryData = await client.query({
                query: gql(literals),
            })
            setData(queryData)
            setIsLoading(false)
        }
    useEffect(() => {
        fetch()
    }, [])

    return { data, isLoading , refetch:fetch }
}

export { client };
