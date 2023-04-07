import getConfig from 'next/config'
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { QueryKeyT, useFetch, usePut } from '../common/react_query'
import { HeroInterface } from '@src/domain/hero.domain'

const { publicRuntimeConfig } = getConfig()

//---------------------
// FETCH
//---------------------
export function useFetchHeroes(options?: UseQueryOptions<HeroInterface[], Error, HeroInterface[], QueryKeyT>) {
  return useFetch<HeroInterface[]>(`${publicRuntimeConfig.NEXT_PUBLIC_BE_HOST}/heroes/getAll`, undefined, options)
}

export function useFetchHeroById(id: string, options?: UseQueryOptions<HeroInterface, Error, HeroInterface, QueryKeyT>) {
  return useFetch<HeroInterface>(`${publicRuntimeConfig.NEXT_PUBLIC_BE_HOST}/heroes/get/${id}`, undefined, options)
}

//---------------------
// PUT
//---------------------
export function usePutHeroes(id: string, options?: UseQueryOptions<unknown, Error, unknown, QueryKeyT>) {
  return usePut(`${publicRuntimeConfig.NEXT_PUBLIC_BE_HOST}/heroes/edit/${id}`, options)
}
