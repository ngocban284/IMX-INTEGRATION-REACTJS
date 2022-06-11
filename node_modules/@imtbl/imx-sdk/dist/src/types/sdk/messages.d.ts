export declare const LINK_MESSAGE_TYPE = "imx-link";
export declare const LINK_SYNC_STATE_MESSAGE = "imx-link/syncState";
export declare const messageTypes: {
    inProgress: string;
    success: string;
    fail: string;
    result: string;
    close: string;
    ready: string;
    transfer: string;
    batchNftTransfer: string;
    sign: string;
    getPublicKey: string;
};
export declare const syncStateMessageTypes: {
    walletConnected: string;
    walletDisconnected: string;
    walletChanged: string;
    networkChanged: string;
};
export declare type Message = {
    type: string;
    message: string;
    payload?: any;
    version?: number;
};
