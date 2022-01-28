import useSWR from "swr";

const customFetcher = (url: string) => fetch(url).then((r) => r.json());

const useCustomSWR = (
  input: string,
  fetcher?: (args_0: string) => any,
) => {
  return useSWR(input, fetcher || customFetcher);
};
export default useCustomSWR;
