import { getExchangeRateApi } from '@/api/exchange-rate/get-exchange-rate';
import { useQuery } from '@tanstack/react-query';

export function useExchangeRate() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['exchange-rate'],
    queryFn: getExchangeRateApi,
  });

  const exchangeRate: number = data?.data?.exchange?.rate;

  return { isLoading, error, exchangeRate };
}
