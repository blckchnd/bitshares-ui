import {Apis} from "bitsharesjs-ws";
import {ChainStore, FetchChain} from "bitsharesjs";
import BigNumber from "bignumber.js";

const bitsharesApi = "wss://eu.nodes.bitshares.ws";

const voteToken = "RUDEX.VOTE";

const accountBalance = async function(account, asset) {
    let balanceId = null;
    let balances = account.get("balances");
    if (balances.has(asset.get("id"))) {
        balanceId = balances.get(asset.get("id"));
    }
    if (!balanceId) return BigNumber(0);

    let balanceObj = await FetchChain("getObject", balanceId);
    let balance = new BigNumber(balanceObj.get("balance"));
    balance = balance.shiftedBy(-asset.get("precision"));

    return balance;
};

export const getCoinVotes = async function(accountName) {
    await Apis.instance(bitsharesApi, true).init_promise;
    await ChainStore.init(0);

    let voteAsset = await FetchChain("getAsset", voteToken);
    let account = await FetchChain("getAccount", accountName);
    let balance = await accountBalance(account, voteAsset);

    return Number(balance.toString());
};
