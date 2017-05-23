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
                                <color-button class="background-pink-800 primary" @click="selection(firstTransaction._id)" v-ripple>View Details</color-button>
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
                                <color-button class="background-blue-grey-800 primary" @click="selection(firstTransaction._id)" v-ripple>View Details</color-button>
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
         <reveal  v-model="showReveal" >
            <div class="col-md-fluid-10">
                <data-table class="sortable">
                    <cards-content  v-if="selectedTransaction">
                        <div class="no-margin font-subhead font-light" v-if="selectedTransaction.trip().busNo"><span class="font-normal">Bus Number:</span> {{selectedTransaction.trip().busNo}}</div>
                        <div class="no-margin font-subhead font-light"><span class="font-normal">No. of Tickets:</span> {{selectedTransaction.transactionItems().count()}}</div>
                        <div class="font-subhead no-margin font-light"><span class="font-normal">Departure Date:</span> {{selectedTransaction.trip().departTime | moment("DD MMMM YYYY")}}</div>
                        <div class="font-subhead no-margin font-light"><span class="font-normal">Departure Time:</span> {{selectedTransaction.trip().departTime | moment("hh:mm A")}}</div>
                        <div class="font-subhead no-margin font-light"><span class="font-normal">Total Paid:</span> {{selectedTransaction.statusString()}}</div>
                        <div class="font-subhead no-margin font-light"><span class="font-normal">Status:</span> MYR {{selectedTransaction.totalPrice.toFixed(2)}}</div>
                    </cards-content>
                    <divider></divider>
                    <cards-content-scrollbar v-if="selectedTransaction && selectedTransactionItems.count()">
                        <table>
                            <thead>
                                <tr>
                                    <th class="unsortable">ID</th>
                                    <th class="">Seat</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr v-for="(t, index) in selectedTransactionItems">
                                    <td></td>
                                    <td>{{t.seat}}</td>
                                    <td>{{t.typeString()}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </cards-content-scrollbar>
                    <divider></divider>
                    <cards-action>
                        <div class="pull-right">
                            <flat-button v-ripple class="primary" @click="showReveal= false">OK</flat-button>
                        </div>
                    </cards-action>
                </data-table>
            </div>
        </reveal>
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
    import {TransactionItem} from '/imports/model/TransactionItem.js';
    export default {
        data() {
            return {
                selectionId: null,
                showReveal: false,
            }
        },
        methods: {
            selection(id) {
                this.selectionId = id;
                this.showReveal= true;
            }
        },
        computed: {
            selectedTransaction() {
                return Transaction.findOne(this.selectionId);
            },
            selectedTransactionItems() {
                let items = TransactionItem.find({transactionId: this.selectionId}).fetch();

                return items;
            }
        },
        meteor: {
            subscribe: {
                "transactionsByUser": [],
            },
            firstTransaction() {
                return Transaction.findOne({},{sort: {departTime: -1, createdAt: 1}});
            },
            nextTransactions() {
                return Transaction.find({},{sort: {departTime: -1, createdAt: 1}, skip: 1});
            },
        }
    }
</script>