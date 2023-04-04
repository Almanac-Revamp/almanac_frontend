import getConfig from "next/config";
import { UseQueryOptions } from "@tanstack/react-query";
import { HeroInterface } from "@src/domain/hero.domain";
import { QueryKeyT, useFetch } from "@src/data/common/react_query";

const { publicRuntimeConfig } = getConfig();

//---------------------
// FETCH
//---------------------
export function useFetchClasses(
  options?: UseQueryOptions<any[], Error, any[], QueryKeyT>
) {
  return useFetch<any[]>(
    `${publicRuntimeConfig.NEXT_PUBLIC_BE_HOST}/classnames/getAll`,
    undefined,
    options
  );
}
