export const CONTRACT_NAME = process.env.NEXT_PUBLIC_CONTRACT_NAME;

export enum NEAR_ENV {
  PRODUCTION = "production",
  MAINNET = "mainnet",
  DEVELOPMENT = "development",
  TESTNET = "testnet",
  BETANET = "betanet",
  LOCAL = "local",
  TEST = "test",
  CI = "ci",
  CI_BETANET = "ci-betanet",
}

export function getNearConfig(env: NEAR_ENV) {
  switch (env) {
    case NEAR_ENV.PRODUCTION:
    case NEAR_ENV.MAINNET:
      return {
        networkId: "mainnet",
        nodeUrl: "https://rpc.mainnet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
      };
    case NEAR_ENV.DEVELOPMENT:
    case NEAR_ENV.TESTNET:
      return {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
    case NEAR_ENV.BETANET:
      return {
        networkId: "betanet",
        nodeUrl: "https://rpc.betanet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.betanet.near.org",
        helperUrl: "https://helper.betanet.near.org",
        explorerUrl: "https://explorer.betanet.near.org",
      };
    case NEAR_ENV.LOCAL:
      return {
        networkId: "local",
        nodeUrl: "http://localhost:3030",
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: "http://localhost:4000/wallet",
        contractName: CONTRACT_NAME,
      };
    case NEAR_ENV.TEST:
    case NEAR_ENV.CI:
      return {
        networkId: "shared-test",
        nodeUrl: "https://rpc.ci-testnet.near.org",
        contractName: CONTRACT_NAME,
        masterAccount: "test.near",
      };
    case NEAR_ENV.CI_BETANET:
      return {
        networkId: "shared-test-staging",
        nodeUrl: "https://rpc.ci-betanet.near.org",
        contractName: CONTRACT_NAME,
        masterAccount: "test.near",
      };
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in src/config.js.`
      );
  }
}
