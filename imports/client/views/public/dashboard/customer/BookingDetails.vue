<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row center-xs has-gutter">
                <div class="col-md-6">
                    <cards>
                        <cards-content>
                            <div class="no-margin font-subhead">Select Seat</div>
                        </cards-content>
                        <divider></divider>
                        <cards-content class="cards-content">
                            <div class="row center-xs">
                                <div class="col-xs">
                                </div>
                                <div class="col-xs">
                                    <div class="color-grey-700" style="text-align:center">A</div>
                                </div>
                                <div class="col-xs">
                                </div>
                                <div class="col-xs">
                                    <div class="color-grey-700" style="text-align:center">B</div>
                                </div>
                                <div class="col-xs">
                                    <div class="color-grey-700" style="text-align:center">C</div>
                                </div>
                            </div>
                            <div class="row center-xs" v-for="r in row">
                                <div class="col-xs">
                                    <div class="color-grey-700" style="line-height: 48px;">{{r.row}}</div>
                                </div>
                                <div class="col-xs">
                                    <icon-button name="account" v-ripple="" :class="{'color-primary-600': true, 'sold': r.statusA === 3}" @click="selectSeat(r.row, 'A')"></icon-button>
                                </div>
                                <div class="col-xs">
                                </div>
                                <div class="col-xs">
                                    <icon-button name="account" v-ripple="" :class="{'color-primary-600': true, 'sold': r.statusB === 3}" @click="selectSeat(r.row, 'B')"></icon-button>
                                </div>
                                <div class="col-xs">
                                    <icon-button name="account" v-ripple="" :class="{'color-primary-600': true, 'sold': r.statusC === 3}" @click="selectSeat(r.row, 'C')"></icon-button>
                                </div>
                            </div>
                        </cards-content>
                        <divider></divider>
                        <div>
                            <list class="hover">
                                <list-item>
                                    <span slot="left">
                                        <icon name="solid" class="color-primary-600"></icon>
                                    </span> Available
                                </list-item>
                                <list-item>
                                    <span slot="left">
                                        <icon name="solid" class="color-green-600"></icon>
                                    </span> Selected
                                </list-item>
                                <list-item>
                                    <span slot="left">
                                        <icon name="solid" class="color-grey"></icon>
                                    </span> Sold
                                </list-item>
                            </list>
                        </div>
                        <divider></divider>
                        <cards-action class="cards-content">
                            <div class="pull-right">
                                <raised-button @click="showDialog=true" :disabled="isNoData" class="primary" v-ripple>Next</raised-button>
                            </div>
                        </cards-action>
                    </cards>
                </div>
            </div>
        </page-container>
        <reveal v-model="showDialog">
            <div class="col-md-fluid-10">
                <cards>
                    <cards-content-scrollbar>
                        <div v-for="(seat, index) in selectedSeat">
                            <dropdown-select v-model="selectedSeat[index].type" :label="seat.seat + ' Seat Type'" @valueChange="selectedSeat = selectedSeat.slice(0)">
                                <menu-option :value="0">Adult</menu-option>
                                <menu-option :value="1">Children</menu-option>
                            </dropdown-select>
                        </div>
                    </cards-content-scrollbar>
                    <divider></divider>
                    <cards-content v-if="targetLocation">
                        <div class="no-margin font-title">Departure: <span class="font-light">{{trip.locationDeparture().name}}</span></div>
                        <div class="no-margin font-title">Destination: <span class="font-light">{{trip.locationArrival(targetLocation.arrivalLocation).name}}</span></div>
                        <div class="no-margin font-title">Total Price: <span class="font-light">RM {{totalPrice}}</span></div>
                    </cards-content>
                    <divider></divider>
                    <cards-action class="cards-content">
                        <div class="pull-right">
                            <flat-button @click="showDialog=false" class="primary" v-ripple>Back</flat-button>
                            <color-button @click="confirmPayment" class="primary" :disabled="isNoData" v-ripple>Confirm</color-button>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </reveal>
        <reveal v-model="paymentModal">
            <div class="col-md-fluid-10" v-if="paymentModal">
                <cards>
                    <cards-content>
                        <div class="row has-gutter">
                            <div class="col-xs-fluid-24">
                                <textfield v-model="payment.cardsNumber" placeholder="Cards Number"></textfield>
                            </div>
                            <div class="col-xs-fluid-24">
                                <textfield v-model="payment.name" placeholder="Name on Cards"></textfield>
                            </div>
                            <div class="col-xs-fluid-6">
                                <textfield v-model="payment.cvv" placeholder="CVV"></textfield>
                            </div>
                            <div class="col-xs-fluid-6">
                                <dropdown-select v-model="payment.month" label="Month">
                                    <menu-option v-for="(m, index) in month" :value="index">{{m}}</menu-option>
                                </dropdown-select>
                            </div>
                            <div class="col-xs-fluid-6">
                                <dropdown-select v-model="payment.year" label="Year">
                                    <menu-option v-for="(m, index) in year" :value="index">{{m}}</menu-option>
                                </dropdown-select>
                            </div>
                            <!--<div class="col-xs-fluid-6">
                                <dropdown-select v-model="payment.year" label="Year">
                                    <menu-option v-for="m in year" :key="m" :value="m">{{m}}</menu-option>
                                </dropdown-select>
                            </div>-->
                        </div>
                    </cards-content>
                    <cards-action class="cards-content">
                        <div class="pull-right">
                            <flat-button @click="paymentModal=false" class="primary" v-ripple>Back</flat-button>
                            <color-button @click="confirmAfterConfirm" class="primary" v-ripple>Confirm</color-button>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </reveal>
    </div>
</template>

<script>
    import {Transaction} from '/imports/model/Transaction.js';
    import {TransactionItem} from '/imports/model/TransactionItem.js';
    import {Location} from '/imports/model/Location.js';
    import {Trip} from '/imports/model/Trip.js';
    export default {
        data() {
            return {
                row: [],
                selectedSeat: [],
                showDialog: false,
                paymentModal: false,
                payment: {
                    cardsNumber: "",
                    name: "",
                    cvv: "",
                    month: "",
                    year: "",
                },
                month: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
                year: ["17", "18", "19", "20", "21", "22", "23", "24"]
            }
        },
        mounted() {
            for (let i = 0; i < 10; i++) {
                this.row.push({row: i + 1, statusA: 0, statusB: 0, statusC: 0});
            }
            this.originalTitle = "Booking";
            this.$transaction = new Transaction();
            this.$transaction.callMethod("createOrUpdate", this.$route.params.id, this.$route.query.arrival, (err, result) => {
                if (err) {
                    return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                }
                console.log(result);
            });
        },
        computed: {
            isNoData() {
                if (this.selectedSeat.length) {
                    return false;
                }

                return true;
            },
            totalPrice() {
                let total = 0;
                for (let i = 0; i< this.selectedSeat.length; i++) {
                    let s = this.selectedSeat[i];
                    if (s.type=== 0) {
                        total += parseFloat(this.targetLocation.adult);
                    }
                    else {
                        total += parseFloat(this.targetLocation.children);
                    }
                }
                return total.toFixed(2);
            }
        },
        methods: {
            validateCardNumber(number) {
                var regex = new RegExp("^[0-9]{16}$");
                if (!regex.test(number))
                    return false;

                return this.luhnCheck(number);
            },
            luhnCheck(val) {
                var sum = 0;
                for (var i = 0; i < val.length; i++) {
                    var intVal = parseInt(val.substr(i, 1));
                    if (i % 2 == 0) {
                        intVal *= 2;
                        if (intVal > 9) {
                            intVal = 1 + (intVal % 10);
                        }
                    }
                    sum += intVal;
                }
                return (sum % 10) == 0;
            },
            selectSeat(r,c) {
                event.srcElement.classList.toggle("selected");

                let index = this.selectedSeat.map(e => e.seat).indexOf(r+c);
                if (index < 0) {
                    this.selectedSeat.push({seat: r+c, type: 0})
                } else {
                    this.selectedSeat.splice(index, 1);
                }

                this.selectedSeat.map(e => e.seat).sort();

                let numSelected = this.selectedSeat;
                if (numSelected.length) {
                    this.$route.meta.pageTitle = numSelected.length + " selected";
                    Session.set("titleChangeHappen",this.$route.meta.pageTitle);
                } else {
                    this.$route.meta.pageTitle = this.originalTitle;
                    Session.set("titleChangeHappen",this.$route.meta.pageTitle);
                }
            },
            confirmPayment() {
                this.showDialog = false;
                this.$confirmation.run("Are you sure want to proceed to payment", ()=>{
                    this.paymentModal = true;
                    
                });
            },
            confirmAfterConfirm() {
                let next = true;

                Object.getOwnPropertyNames(this.payment).forEach(item => {
                    if (this.payment[item] === "") {
                        next = false;
                    }
                })

                if (!this.validateCardNumber(this.payment.cardsNumber)) {
                    return this.$snackbar.run("Failed to validate card", ()=>{}, "Ok", "error");
                }

                if (this.payment.cvv.length !== 3) {
                    return this.$snackbar.run("Failed to validate CVV number", ()=>{}, "Ok", "error");
                }

                if (!next) {
                    return this.$snackbar.run("Please complete input", ()=>{}, "Ok", "error");
                }

                this.$transaction.callMethod("createOrUpdate", this.$route.params.id, this.$route.query.arrival, this.totalPrice, this.selectedSeat, (err, result) => {
                    if (err) {
                        return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                    }

                    this.paymentModal = false;
                    this.$snackbar.run("Payment Complete");
                    return this.$router.replace("/dashboard/active-tickets");
                });

                
            }
        },
        meteor: {
            subscribe: {
                "tripById"() {
                    return [this.$route.params.id];
                },
                "transactionByTripId"() {
                    return [this.$route.params.id];
                }
            },
            trip() {
                return Trip.findOne();
            },
            targetLocation() {
                let trip = Trip.findOne(this.$route.params.id);
                if (trip && trip.price.length) {
                    let index = trip.price.map(e => e.arrivalLocation).indexOf(this.$route.query.arrival)
                    return trip.price[index];
                }
                return null;
            },
            transactionItem() {
                let tIs = TransactionItem.find();
                this.row.forEach(item => {
                    let map = tIs.map(e => e.seat);
                    let indexA = map.indexOf(item.row + 'A');
                    let indexB = map.indexOf(item.row + 'B');
                    let indexC = map.indexOf(item.row + 'C');
                    item.statusA = indexA >= 0 ? tIs.fetch()[indexA].getStatus() : 0;
                    item.statusB = indexB >= 0 ? tIs.fetch()[indexB].getStatus() : 0;
                    item.statusC = indexC >= 0 ? tIs.fetch()[indexC].getStatus() : 0;
                })
                return tIs;
            }
        }
    }
</script>

<style lang="scss">
    .viu-icon-button {
        .mdi.selected, &.selected {
            color: #43a047 !important;
            background: transparent;
        }

        .mdi.locked, &.locked {
            color: #e53935 !important;
            background: transparent;
            pointer-events: none;
        }

        .mdi.sold, &.sold {
            color: #9e9e9e !important;
            background: transparent;
            pointer-events: none;
        }
    }
</style>