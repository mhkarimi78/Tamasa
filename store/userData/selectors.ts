import { IAppCurrency } from '@/models/AppCurrency';
import ISelectCurrency from '@/models/interfaces/SelectCurrency';
import { SupportedCurrency } from '@/models/types/SupportedCurrency';
import { RootState } from '..';

export const currenciesSelector = (store: RootState): IAppCurrency[] => {
  return Object.values(store.Dictionary.supportedCurrencies).filter(el =>
    store.UserPrefs.selectedCurrencies.includes(el.clientId),
  );
};

export const selectCurrenciesSelector = (store: RootState): ISelectCurrency[] => {
  const currencies = store.Dictionary.supportedCurrencies;
  const selectedCurrencies = Object.values(store.UserPrefs.selectedCurrencies);
  const selectCurrencies: ISelectCurrency[] = [];
  Object.values(currencies).forEach(currency => {
    selectCurrencies.push({
      currency,
      isSelected: selectedCurrencies.includes(currency.clientId),
    });
  });
  return selectCurrencies;
};

export const selectedCurrenciesSelector = (store: RootState): IAppCurrency[] => {
  const currencies = store.Dictionary.supportedCurrencies;
  const selectedCurrencies = Object.values(store.UserPrefs.selectedCurrencies);
  return Object.values(currencies).filter(el => selectedCurrencies.includes(el.clientId));
};

export const pkImportCurrenciesSelector = (store: RootState): IAppCurrency[] => {
  const currencies = Object.values(store.Dictionary.supportedCurrencies);
  return currencies.filter(
    el =>
      (el.supportedCurrency === SupportedCurrency.ETH && el.network === 'ERC20') ||
      (el.supportedCurrency === SupportedCurrency.BTC && el.network === 'BTC') ||
      (el.supportedCurrency === SupportedCurrency.TRX && el.network === 'TRC20') ||
      (el.supportedCurrency === SupportedCurrency.ETH && el.network === 'ERC20') ||
      (el.supportedCurrency === SupportedCurrency.BNB && el.network === 'BEP2'),
  );
};
