import React from "react";

import {DonutChart} from "./DonutChart";

export const CoinCard = props => {
    return (
        <div className="listingTable__row">
            <div className="listingAsset">
                <div className="listingAssetCard">
                    <div className="listingTable__cell listingTableRank align-center">
                        {props.rank}
                    </div>
                    <div className="listingTable__cell listingTableLogo">
                        <img
                            className="align-center"
                            style={{maxWidth: 40}}
                            src={`${__BASE_URL__}coins-logo/${
                                props.ticker
                            }.png`}
                            alt=""
                        />
                    </div>
                    <div className="listingTable__cell listingTableAssetName align-left nowrap">
                        {props.name} ({props.ticker})
                    </div>
                </div>

                <div className="listingAssetInfo">
                    <div className="listingAssetInfoData">
                        <div className="listingTable__cell listingTableVotes">
                            <div className="listingAssetInfoBlock">
                                Votes:&nbsp;
                            </div>
                            {props.votes}
                        </div>
                        <div className="listingTable__cell listingTableGoal">
                            <div className="listingAssetInfoBlock">
                                Goal:&nbsp;{" "}
                            </div>
                            {props.goal}
                        </div>
                        <div className="listingTable__cell listingTableStatus">
                            <div className="listingAssetInfoBlock">
                                Status:&nbsp;{" "}
                            </div>
                            {props.status}
                        </div>
                    </div>

                    <div className="listingTable__cell listingTableProgress">
                        <DonutChart votes={props.votes} goal={props.goal} />
                    </div>
                </div>
            </div>
        </div>
    );
};
