import React from "react";
import "./ListingPage.css";

import {CoinCard} from "./CoinCard";
import {getListingGoal, getListingCoins} from "../../branding";
import {getCoinVotes} from "../../lib/common/getListingCoinVotes";
import {asyncForEach} from "../../lib/common/asyncForEach";

class ListingPage extends React.Component {
    coins = [];

    render() {
        return (
            <div className="grid-block vertical">
                <div className="grid-container" style={{padding: "2rem 8px"}}>
                    <div
                        className="block-content-header"
                        style={{marginBottom: 15, paddingTop: 0}}
                    >
                        RuDEX Listing
                    </div>
                    <div style={{marginBottom: 20}}>
                        <a
                            style={{margin: 20, fontSize: "1.2rem"}}
                            href="https://market.rudex.org/#/market/RUDEX.VOTE_RUDEX.BTC"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Market
                        </a>
                        <a
                            style={{margin: 20, fontSize: "1.2rem"}}
                            href="https://goo.gl/forms/RZlCAvbtBJ077G762"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Add coin
                        </a>
                    </div>
                    <div className="grid-block small-up-1 medium-up-1 large-up-1 no-overflow">
                        {this.coins.length === 0 ? (
                            <div style={{margin: "10px"}}>Loading...</div>
                        ) : (
                            this.getContent()
                        )}
                    </div>
                </div>
            </div>
        );
    }

    async componentDidMount() {
        const coins = getListingCoins();
        await asyncForEach(coins, async coin => {
            coin.votes = await getCoinVotes(coin.account);
        });

        this.coins = coins;
    }

    getContent = () => {
        return (
            <div className="listingTable">
                <div className="listingTable__header">
                    <div className="listingAssetCard">
                        <div className="listingTable__cell listingTableRank">
                            Rank
                        </div>
                        <div className="listingTable__cell listingTableLogo" />
                        <div className="listingTable__cell listingTableAssetName align-left">
                            Asset name
                        </div>
                    </div>
                    <div className="listingAssetInfo">
                        <div className="listingAssetInfoData">
                            <div className="listingTable__cell listingTableVotes">
                                Votes
                            </div>
                            <div className="listingTable__cell listingTableGoal">
                                Goal
                            </div>
                            <div className="listingTable__cell listingTableStatus">
                                Status
                            </div>
                        </div>
                        <div className="listingTable__cell listingTableProgress">
                            Progress
                        </div>
                    </div>
                </div>
                {this.getCoinsList()}
            </div>
        );
    };

    getCoinsList = () => {
        const sortedCoins = this.coins.sort((a, b) => {
            return b.votes - a.votes;
        });

        return sortedCoins.map((coin, i) => {
            const goal = getListingGoal();
            const status = coin.votes < goal ? "voting" : "";
            const votes = coin.votes < goal ? coin.votes : goal;

            return (
                <CoinCard
                    key={i}
                    name={coin.name}
                    ticker={coin.ticker}
                    rank={i + 1}
                    votes={votes}
                    goal={goal}
                    status={status}
                />
            );
        });
    };
}

export default ListingPage;
