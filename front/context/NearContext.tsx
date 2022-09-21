import {getNearConfig, NEAR_ENV} from "@config/near";
import {
    connect,
    Contract,
    keyStores,
    Near,
    WalletConnection,
} from "near-api-js";
import {NearConfig} from "near-api-js/lib/near";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";

interface Context {
    near: Near | undefined;
    walletConnection: WalletConnection | undefined;
    accountId: any;
    contract: Partial<ContractInterface> | undefined;
    config: any;
    loading: boolean;

    reset(): void;
}

export interface Risiko {
    blue: Team;
    red: Team;
    response: Response;
}

export interface Team{
    army: number;
    dead: boolean;
}
export interface Response{
    battle_end: boolean;
    message: string;
}

export const NearContext = createContext<Context | undefined>(undefined);

export default function useNearContext(): Context {
    return useContext(NearContext) ?? ({} as Context);
}

interface ChangeMethodOptions {
    callbackUrl?: string;
    meta?: string;
    args: Record<string, string | number>;
    gas?: string;
    amount?: string | null;
}

type ViewMethodOptions = Record<string, string | number>;

export interface ContractInterface extends Contract {
    info(opts?: ViewMethodOptions): Promise<Risiko>;
    reset(opts?: ChangeMethodOptions): Promise<void>;
    battle(opts?: ChangeMethodOptions): Promise<Risiko>;
}

export function NearProvider({children}: PropsWithChildren<unknown>) {
    const [near, setNear] = useState<Near>();
    const [loading, setLoading] = useState(true);
    const [config, setConfig] = useState<NearConfig>();
    const [walletConnection, setWalletConnection] = useState<WalletConnection>();
    const [accountId, setAccountId] = useState();
    const [contract, setContract] = useState<Partial<ContractInterface>>();

    const viewMethods: string[] = [
        "info"
    ];
    const changeMethods: string[] = [
        "reset",
        "battle"
    ];

    useEffect(() => {
        async function main() {
            const config = {
                ...getNearConfig(NEAR_ENV.DEVELOPMENT),
                deps: {keyStore: new keyStores.BrowserLocalStorageKeyStore()},
                headers: {},
            };

            if (!config.contractName) {
                throw Error("[NearContext]: No contract provided!");
            }

            const near = await connect(config);

            const walletConnection = new WalletConnection(near, config.contractName);

            const contract = await new Contract(
                walletConnection.account(),
                config.contractName,
                {
                    viewMethods,
                    changeMethods,
                }
            );


            setNear(near);
            setConfig(config);
            setWalletConnection(walletConnection);
            setAccountId(walletConnection.getAccountId());
            setContract(contract);
            setLoading(false);
        }

        main();
    }, []);

    function reset() {
        setNear(undefined);
        setConfig(undefined);
        setWalletConnection(undefined);
        setAccountId(undefined);
        setContract(undefined);
    }

    const value = {
        near,
        walletConnection,
        accountId,
        contract,
        config,
        loading,
        reset,
    };

    return <NearContext.Provider value={value}>{children}</NearContext.Provider>;
}
