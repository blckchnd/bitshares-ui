import React from "react";
import XbtsxGatewayDepositRequest from "./XbtsxGatewayDepositRequest";
import Translate from "react-translate-component";
import {connect} from "alt-react";
import SettingsStore from "stores/SettingsStore";
import SettingsActions from "actions/SettingsActions";
import AssetImage from "../../Utility/AssetImage";
import {
    RecentTransactions,
    TransactionWrapper
} from "components/Account/RecentTransactions";
import Immutable from "immutable";
import cnames from "classnames";
import LoadingIndicator from "../../LoadingIndicator";
import Select from "react-select";
import "react-select/dist/react-select.css";

class XbtsxGateway extends React.Component {
    constructor(props) {
        super();

        let action = props.viewSettings.get("xbtsxAction", "deposit");
        this.state = {
            activeCoin: this._getActiveCoin(props, {action: action}),
            action: action
        };
    }

    _findCoinByName(props, name) {
        for (let i = 0; i < props.coins.length; i++) {
            let coin = props.coins[i];
            if (coin.backingCoin.toUpperCase() === name) return coin;
        }
        return props.coins[0];
    }

    _findCoinBySymbol(props, name) {
        for (let i = 0; i < props.coins.length; i++) {
            let coin = props.coins[i];
            if (coin.symbol.toUpperCase() === name) return coin;
        }
        return null;
    }

    _getActiveCoin(props, state) {
        let cachedCoin = props.viewSettings.get("activeCoin_xbtsx", null);
        let firstTimeCoin = "PPY";
        let activeCoin = cachedCoin ? cachedCoin : firstTimeCoin;

        if (state.action === "withdraw") {
            activeCoin = this._findCoinByName(props, activeCoin).symbol;
        }

        return activeCoin;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.provider !== this.props.provider) {
            this.setState({
                activeCoin: this._getActiveCoin(nextProps, this.state.action)
            });
        }
    }

    onSelectCoin(e) {
        this.setState({
            activeCoin: e.value
        });

        let setting = {};
        let coinName = e.value;
        if (this.state.action === "withdraw") {
            coinName = this._findCoinBySymbol(this.props, coinName).backingCoin;
        }
        setting["activeCoin_xbtsx"] = coinName;
        SettingsActions.changeViewSetting(setting);
    }

    changeAction(type) {
        let activeCoin = this._getActiveCoin(this.props, {action: type});

        this.setState({
            action: type,
            activeCoin: activeCoin
        });

        SettingsActions.changeViewSetting({[`xbtsxAction`]: type});
    }

    render() {
        let {coins, account} = this.props;
        let {activeCoin, action} = this.state;

        if (!coins.length) {
            return <LoadingIndicator />;
        }

        let filteredCoins = coins.filter(a => {
            if (!a || !a.symbol) {
                return false;
            } else {
                return action === "deposit"
                    ? a.depositAllowed
                    : a.withdrawalAllowed;
            }
        });

        let coinOptions = filteredCoins
            .map(coin => {
                let option =
                    action === "deposit"
                        ? coin.backingCoin.toUpperCase()
                        : coin.symbol;
                // Work around to get symbol name
                let name = option.replace("XBTSX.", "");
                let prefix = "XBTSX.";

                return {
                    value: option,
                    label: (
                        <div>
                            <AssetImage
                                replaceNoneToBts={false}
                                maxWidth={20}
                                name={prefix + name}
                            />
                            {option.replace("XBTSX.", "")}
                        </div>
                    )
                };
            })
            .filter(a => {
                return a !== null;
            });

        let coin = filteredCoins.filter(coin => {
            return action === "deposit"
                ? coin.backingCoin.toUpperCase() === activeCoin
                : coin.symbol === activeCoin;
        })[0];

        if (!coin) coin = filteredCoins[0];

        let isDeposit = this.state.action === "deposit";

        let supportUrl = "https://t.me/xbtsio";

        return (
            <div style={this.props.style}>
                <div className="grid-block no-margin vertical medium-horizontal no-padding">
                    <div className="medium-4">
                        <div>
                            <label
                                style={{minHeight: "2rem"}}
                                className="left-label"
                            >
                                <Translate
                                    content={"gateway.choose_" + action}
                                />:{" "}
                            </label>
                            <Select
                                //className="external-coin-types bts-select"
                                //onChange={this.onSelectCoin.bind(this)}
                                onChange={this.onSelectCoin.bind(this)}
                                clearable={false}
                                searchable={false}
                                value={activeCoin}
                                options={coinOptions}
                            />

                            {/*</Select>*/}
                        </div>
                    </div>

                    <div className="medium-6 medium-offset-1">
                        <label
                            style={{minHeight: "2rem"}}
                            className="left-label"
                        >
                            <Translate content="gateway.gateway_text" />:
                        </label>
                        <div style={{paddingBottom: 15}}>
                            <ul className="button-group segmented no-margin">
                                <li
                                    className={
                                        action === "deposit" ? "is-active" : ""
                                    }
                                >
                                    <a
                                        onClick={this.changeAction.bind(
                                            this,
                                            "deposit"
                                        )}
                                    >
                                        <Translate content="gateway.deposit" />
                                    </a>
                                </li>
                                <li
                                    className={
                                        action === "withdraw" ? "is-active" : ""
                                    }
                                >
                                    <a
                                        onClick={this.changeAction.bind(
                                            this,
                                            "withdraw"
                                        )}
                                    >
                                        <Translate content="gateway.withdraw" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {!coin ? null : (
                    <div>
                        <div style={{marginBottom: 15}}>
                            <XbtsxGatewayDepositRequest
                                key={`${coin.symbol}`}
                                gateway={coin.gatewayWallet}
                                issuer_account={coin.issuer}
                                account={account}
                                deposit_asset={coin.backingCoin.toUpperCase()}
                                deposit_asset_name={coin.name}
                                deposit_coin_type={coin.backingCoin.toLowerCase()}
                                deposit_account={coin.gatewayWallet}
                                deposit_wallet_type={coin.walletType}
                                receive_asset={coin.symbol}
                                receive_coin_type={coin.symbol.toLowerCase()}
                                supports_output_memos={coin.memoSupport}
                                min_amount={coin.minAmount}
                                withdraw_fee={coin.withdrawFee}
                                deposit_fee={coin.depositFee}
                                asset_precision={coin.precision}
                                action={this.state.action}
                            />
                            <label className="left-label">Support</label>
                            <div>
                                <Translate content="gateway.xbtsx.support_block" />
                                <br />
                                <br />
                                <a
                                    href={supportUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {supportUrl}
                                </a>
                            </div>
                        </div>

                        {coin && coin.symbol ? (
                            <TransactionWrapper
                                asset={coin.symbol}
                                fromAccount={
                                    isDeposit
                                        ? coin.issuerId
                                        : this.props.account.get("id")
                                }
                                to={
                                    isDeposit
                                        ? this.props.account.get("id")
                                        : coin.issuerId
                                }
                            >
                                {({asset, to, fromAccount}) => {
                                    return (
                                        <RecentTransactions
                                            accountsList={Immutable.List([
                                                this.props.account.get("id")
                                            ])}
                                            limit={10}
                                            compactView={true}
                                            fullHeight={true}
                                            filter="transfer"
                                            title={
                                                <Translate
                                                    content={
                                                        "gateway.recent_" +
                                                        this.state.action
                                                    }
                                                />
                                            }
                                            customFilter={{
                                                fields: [
                                                    "to",
                                                    "from",
                                                    "asset_id"
                                                ],
                                                values: {
                                                    to: to.get("id"),
                                                    from: fromAccount.get("id"),
                                                    asset_id: asset.get("id")
                                                }
                                            }}
                                        />
                                    );
                                }}
                            </TransactionWrapper>
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
}

export default connect(
    XbtsxGateway,
    {
        listenTo() {
            return [SettingsStore];
        },
        getProps() {
            return {
                viewSettings: SettingsStore.getState().viewSettings
            };
        }
    }
);
