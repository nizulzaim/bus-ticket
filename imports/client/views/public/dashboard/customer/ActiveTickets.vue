<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row has-gutter" v-if="firstTransaction">
                <div class="col-md-fluid-6">
                    <cards v-depth="4" style="z-index: 4" v-if="firstTransaction && firstTransaction.trip()">
                        <cards-content  v-depth="2" style="z-index: 4" class="background-pink-700 cards-content">
                            <icon class="icon color-pink-50" name="ticket" v-ripple></icon>
                        </cards-content>
                        <cards-content class="background-pink-800" v-depth="1" style="z-index: 3">
                            <div class="color-pink-50 font-subhead no-margin font-light" v-if="firstTransaction.trip().busNo"><span class="font-normal">Bus Number:</span> {{firstTransaction.trip().busNo}}</div>
                            <div class="color-pink-50 font-subhead no-margin font-light"><span class="font-normal">No. Tickets:</span> {{firstTransaction.transactionItems().count()}}</div>
                            <div class="color-pink-50 font-subhead no-margin font-light"><span class="font-normal">Departure Date:</span> {{firstTransaction.trip().departTime | moment("DD MMMM YYYY")}}</div>
                            <div class="color-pink-50 font-subhead no-margin font-light"><span class="font-normal">Departure Time:</span> {{firstTransaction.trip().departTime | moment("hh:mm A")}}</div>
                        </cards-content>
                        <cards-action class="background-pink-600 cards-content">
                            <div class="pull-right" >
                                <color-button class="background-pink-800 primary" v-ripple>View Details</color-button>
                            </div>
                        </cards-action>
                    </cards>
                </div>
                <div class="col-md-fluid-6" v-for="t in nextTransactions">
                    <cards v-depth="1">
                        <cards-content  v-depth="1" style="z-index: 4" class="background-blue-grey-700 cards-content">
                            <icon class="icon color-blue-grey-50" name="ticket-account" v-ripple></icon>
                        </cards-content>
                        <cards-content class="background-blue-grey-800">
                            <div class="color-blue-grey-50 font-subhead no-margin font-light" v-if="t.trip().busNo"><span class="font-normal">Bus Number:</span> {{t.trip().busNo}}</div>
                            <div class="color-blue-grey-50 font-subhead no-margin font-light"><span class="font-normal">No. Tickets:</span> {{t.transactionItems().count()}}</div>
                            <div class="color-blue-grey-50 font-subhead no-margin font-light"><span class="font-normal">Departure Date:</span> {{t.trip().departTime | moment("DD MMMM YYYY")}}</div>
                            <div class="color-blue-grey-50 font-subhead no-margin font-light"><span class="font-normal">Departure Time:</span> {{t.trip().departTime | moment("hh:mm A")}}</div>
                        </cards-content>
                        <cards-action class="background-blue-grey-600 cards-content">
                            <div class="pull-right" >
                                <color-button class="background-blue-grey-800 primary" v-ripple>View Details</color-button>
                            </div>
                        </cards-action>
                    </cards>
                </div>
            </div>
            <cards v-else style="margin-top: 10px;" v-ripple>
                <cards-content style="padding-top: 20px; padding-bottom: 20px;">
                    <div class="font-center color-grey-700 font-title font-light no-margin">No Active Tickets</div>
                </cards-content>
            </cards>
            
        </page-container>
    </div>
</template>

<style scoped lang="scss">
    .icon {
        font-size: 120px;
        line-height: 140px;
        text-align: center;
        height: 140px;
        width: 100%;
        margin: 0 auto;
        display: block;
    }

    .cards-content {
        padding: 0;
    }
</style>

<script>
    import {Transaction} from '/imports/model/Transaction.js';
    export default {
        meteor: {
            subscribe: {
                "transactionsByUser": [],
            },
            firstTransaction() {
                return Transaction.findOne({},{sort: {departTime: -1, createdAt: 1}});
            },
            nextTransactions() {
                return Transaction.find({},{sort: {departTime: -1, createdAt: 1}, skip: 1});
            }
        }
    }
</script>