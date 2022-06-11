import { ExternalProvider } from '@ethersproject/providers';
import { IWalletConnectProviderOptions } from '@walletconnect/types';
import WalletConnectProvider from '@walletconnect/web3-provider';
export declare const createWalletConnectProvider: (walletConnectOptions: IWalletConnectProviderOptions) => Promise<ExternalProvider>;
export declare const createWalletConnectProviderWithProvider: (walletConnectOptions: IWalletConnectProviderOptions, walletConnectProvider: WalletConnectProvider) => Promise<ExternalProvider>;
export declare class WalletProviderError extends Error {
    constructor(message: any);
}
