import React from "react";

class StateForm extends React.Component {
    componentWillMount() {
        this.setState(
            Object.assign({validate: []}, this.props.bot.storage.read())
        );
    }

    handleChange = event => {
        let name = event.target.name,
            value = event.target.value,
            base,
            quote;

        switch (name) {
            case "baseAmount":
                base = this.state.base;
                base.amount = value;
                this.setState({base});
                break;
            case "baseBalance":
                base = this.state.base;
                base.balance = value;
                this.setState({base});
                break;
            case "baseSpread":
                base = this.state.base;
                base.spread = value;
                this.setState({base});
                break;
            case "quoteAmount":
                quote = this.state.quote;
                quote.amount = value;
                this.setState({quote});
                break;
            case "quoteBalance":
                quote = this.state.quote;
                quote.balance = value;
                this.setState({quote});
                break;
            case "quoteSpread":
                quote = this.state.quote;
                quote.spread = value;
                this.setState({quote});
                break;
            case "defaultPrice":
                this.setState({defaultPrice: value});
                break;
            case "fromMarket":
                this.setState({fromMarket: event.target.checked});
                break;
        }

        //this.setState({[name]: value}, () => this.validate(name, value));
    };

    handleUpdateBot = () => {
        let stateNow = this.props.bot.storage.read();
        this.state.base.order = stateNow.base.order;
        this.state.quote.order = stateNow.quote.order;

        this.props.bot.storage.write(this.state);
    };

    render() {
        return (
            <div>
                <div className="grid-block horizontal">
                    <div
                        className="content-block"
                        style={{
                            marginLeft: 50,
                            marginTop: 30
                        }}
                    >
                        <label style={{textAlign: "center"}}>Base</label>
                        <label className="left-label">Asset</label>
                        <input
                            name="baseAsset"
                            type="text"
                            ref="input"
                            value={this.state.base.asset}
                            disabled
                            style={{
                                marginBottom: 30
                            }}
                        />
                        <label className="left-label">Balance</label>
                        <input
                            name="baseBalance"
                            type="text"
                            ref="input"
                            value={this.state.base.balance}
                            onChange={this.handleChange}
                            disabled={this.props.bot.run}
                            style={{
                                marginBottom: 30,
                                border: this.state.validate.includes(
                                    "baseBalance"
                                )
                                    ? "1px solid red"
                                    : "none"
                            }}
                        />
                        <label className="left-label">Amount</label>
                        <input
                            name="baseAmount"
                            type="text"
                            ref="input"
                            value={this.state.base.amount}
                            onChange={this.handleChange}
                            disabled={this.props.bot.run}
                            style={{
                                marginBottom: 30,
                                border: this.state.validate.includes(
                                    "baseAmount"
                                )
                                    ? "1px solid red"
                                    : "none"
                            }}
                        />
                        <label className="left-label">Spread</label>
                        <input
                            name="baseSpread"
                            type="text"
                            ref="input"
                            value={this.state.base.spread}
                            onChange={this.handleChange}
                            disabled={this.props.bot.run}
                            style={{
                                marginBottom: 30,
                                border: this.state.validate.includes(
                                    "baseSpread"
                                )
                                    ? "1px solid red"
                                    : "none"
                            }}
                        />
                    </div>
                    <div
                        className="content-block"
                        style={{
                            marginLeft: 50,
                            marginTop: 30
                        }}
                    >
                        <label style={{textAlign: "center"}}>Quote</label>
                        <label className="left-label">Asset</label>
                        <input
                            name="quoteAsset"
                            type="text"
                            ref="input"
                            value={this.state.quote.asset}
                            disabled
                            style={{
                                marginBottom: 30
                            }}
                        />
                        <label className="left-label">Balance</label>
                        <input
                            name="quoteBalance"
                            type="text"
                            ref="input"
                            value={this.state.quote.balance}
                            onChange={this.handleChange}
                            disabled={this.props.bot.run}
                            style={{
                                marginBottom: 30,
                                border: this.state.validate.includes(
                                    "quoteBalance"
                                )
                                    ? "1px solid red"
                                    : "none"
                            }}
                        />
                        <label className="left-label">Amount</label>
                        <input
                            name="quoteAmount"
                            type="text"
                            ref="input"
                            value={this.state.quote.amount}
                            onChange={this.handleChange}
                            disabled={this.props.bot.run}
                            style={{
                                marginBottom: 30,
                                border: this.state.validate.includes(
                                    "quoteAmount"
                                )
                                    ? "1px solid red"
                                    : "none"
                            }}
                        />
                        <label className="left-label">Spread</label>
                        <input
                            name="quoteSpread"
                            type="text"
                            ref="input"
                            value={this.state.quote.spread}
                            onChange={this.handleChange}
                            disabled={this.props.bot.run}
                            style={{
                                marginBottom: 30,
                                border: this.state.validate.includes(
                                    "quoteSpread"
                                )
                                    ? "1px solid red"
                                    : "none"
                            }}
                        />
                    </div>
                </div>
                <div className="content-block">
                    <label className="left-label">Default Price</label>
                    <input
                        name="defaultPrice"
                        type="text"
                        ref="input"
                        value={this.state.defaultPrice}
                        onChange={this.handleChange}
                        disabled={this.props.bot.run}
                        style={{
                            border: this.state.validate.includes("defaultPrice")
                                ? "1px solid red"
                                : "none"
                        }}
                    />
                </div>
                <div className="content-block">
                    <label>
                        <input
                            type="checkbox"
                            name="fromMarket"
                            onChange={this.handleChange}
                            checked={this.state.fromMarket}
                            disabled={this.props.bot.run}
                        />
                        Get price from market
                    </label>
                </div>
                <button
                    className="button"
                    onClick={this.handleUpdateBot}
                    disabled={this.props.bot.run}
                    style={{marginLeft: 50, marginBottom: 30}}
                >
                    Update
                </button>
            </div>
        );
    }
}

export default StateForm;