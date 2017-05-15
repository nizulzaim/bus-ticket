<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row center-xs" style="padding-top: 12px;">
                <div class="col-md-fluid-24">
                    <div class="pull-right">
                        <router-link to="/dashboard/add-trip" class="pull-right" v-if="loginUser && loginUser.isAdmin()">
                            <raised-button class="primary"><icon name="plus"></icon> Add Schedule</raised-button>
                        </router-link>
                    </div>
                    <data-table class="sortable" v-if="trips.count() && locations.count()">
                        <table>
                            <thead>
                                <tr>
                                    <th class="unsortable">ID</th>
                                    <th class="">Departure Date</th>
                                    <th>Departure Location</th>
                                    <th>Final Location</th>
                                    <th>Created At</th>
                                    <th class="th-number">Available Seat</th>
                                    <th class="th-action unsortable"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="trip in trips">
                                    <td></td>
                                    <td>{{trip.departTime | moment("dddd, Do MMMM YYYY, HH:mm")}}</td>
                                    <td v-text="getLocation(trip.departLocation).name"></td>
                                    <td v-text="getLocation(trip.price[trip.price.length - 1].arrivalLocation).name"></td>
                                    <td>{{trip.createdAt | moment("Do MMMM YYYY, HH:mm")}}</td>
                                    <td class="td-number" v-text="trip.availableSeat"></td>
                                    <td class="td-action">
                                        <tooltip text="View Trip">
                                            <icon-button @click="showArrivalPlacesModal(trip._id)" name="bus" v-ripple trigger-tooltip class="color-green-900"></icon-button>
                                        </tooltip>
                                        <tooltip text="View Tickets">
                                            <icon-button  name="ticket-confirmation" v-ripple trigger-tooltip class="color-primary-900"></icon-button>
                                        </tooltip>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </data-table>
                    <cards v-else style="margin-top: 20px;">
                        <cards-content>
                            <div class="font-center color-grey-700 font-subhead no-margin">No Data to display</div>
                        </cards-content>
                    </cards>
                </div>
            </div>
        </page-container>
        <reveal id="hello" v-model="showArrivalPlaces">
            <div class="col-md-fluid-10">
                <data-table class="sortable">
                    <scroll-bar>
                        <table>
                            <thead>
                                <tr>
                                    <th class="unsortable">ID</th>
                                    <th class="">Arrival Location</th>
                                    <th>Adult Price</th>
                                    <th>Children Price</th>
                                    <th class="th-action unsortable"></th>
                                </tr>
                            </thead>
                            <tbody v-if="selectedTrip">
                                <tr v-for="(price, index) in selectedTrip.price">
                                    <td></td>
                                    <td>{{getLocation(price.arrivalLocation).name }}</td>
                                    <td>RM {{price.adult }}</td>
                                    <td>RM {{price.children }}</td>
                                    <td class="td-action">
                                        <tooltip text="Edit" v-if="loginUser && loginUser.isAdmin()">
                                            <icon-button @click="showEditPriceModal(index)" name="pencil" v-ripple trigger-tooltip></icon-button>
                                        </tooltip>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </scroll-bar>
                    <divider></divider>
                    <cards-action>
                        <div class="pull-right">
                            <flat-button v-ripple class="primary" @click="hideArrivalPlacesModal">OK</flat-button>
                        </div>
                    </cards-action>
                </data-table>
            </div>
        </reveal>
        <reveal id="hello" v-model="showEditPrice" >
            <div class="col-md-fluid-10" v-if="loginUser && loginUser.isAdmin()">
                <cards>
                    <form @submit.prevent="editPriceSubmit">
                        <cards-content-scrollbar>
                            <dropdown-select v-model="price.arrivalLocation" label="Arrival Location">
                                <menu-option v-for="location in locations" :value="location._id">{{location.name}}</menu-option>
                            </dropdown-select>
                            <textfield type="text" v-model="price.adult" placeholder="Adult Price (RM)"></textfield>
                            <textfield type="text" v-model="price.children" placeholder="Children Price (RM)"></textfield>
                        </cards-content-scrollbar>
                        <divider></divider>
                        <cards-action>
                            <div class="pull-right">
                                <flat-button v-ripple @click="hideEditPriceModal">Cancel</flat-button>
                                <flat-button type="submit" v-ripple class="primary">Edit</flat-button>
                            </div>
                        </cards-action>
                    </form>
                </cards>
            </div>
        </reveal>
    </div>
</template>

<script>
    import {
        Trip
    } from "/imports/model/Trip.js";
    import {
        Location
    } from "/imports/model/Location.js";
    import {
        User
    } from "/imports/model/User.js";
    export default {
        data() {
            return {
                showArrivalPlaces: false,
                showEditPrice: false,
                selectedTrip: null,
                price: {
                    arrivalLocation: "",
                    adult: "",
                    chidlren: "",
                }
            }
        },
        meteor: {
            subscribe: {
                "trips": [],
                "locations": [],
                "loginUser": [],
            },
            trips() {
                if (Trip.find()) console.log(Trip.find().count());
                return Trip.find();
            },
            locations() {
                return Location.find();
            },
            loginUser() {
                return User.findOne(Meteor.userId());
            }
        },
        methods: {
            getLocation(_id) {
                return Location.findOne(_id);
            },
            showArrivalPlacesModal(_id) {
                this.showArrivalPlaces = true;
                this.selectedTrip = Trip.findOne(_id);
            },
            hideArrivalPlacesModal() {
                this.showArrivalPlaces = false;
            },
            showEditPriceModal(index) {
                this.index = index;
                this.hideArrivalPlacesModal();
                this.showEditPrice = true;
                this.price = this.selectedTrip.price[index];
            },
            hideEditPriceModal() {
                this.showEditPrice = false;
                this.showArrivalPlacesModal(this.selectedTrip._id);
            },
            editPriceSubmit() {
                let trip = this.selectedTrip;
                trip.callMethod("editPrice", this.index, this.price, (err, result) => {
                    if (err) {
                        return this.$snackbar.run(err, () => {}, "OK", "error");
                    }
                    this.$snackbar.run("Successfully Edit price", () => {});
                    this.hideEditPriceModal();
                });
            }
        }
    }
</script>