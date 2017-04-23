<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row has-gutter center-xs">
                <div class="col-md-fluid-6">
                    <cards>
                        <form @submit.prevent="selectionControl">
                            <cards-content>
                                <dropdown-select v-model="trip.departLocation" label="Departure Location">
                                    <menu-option v-for="location in locations" :value="location._id">{{location.name}}</menu-option>
                                </dropdown-select>
                                <dropdown-select v-model="trip.arrivalLocation" label="Arrival Location">
                                    <menu-option v-for="location in locations" :value="location._id">{{location.name}}</menu-option>
                                </dropdown-select>
                                <dropdown-select v-model="trip.month" label="Month" @valueChange="setDay">
                                    <menu-option v-for="(month, index) in possibleDMonth" :value="index">{{month}}</menu-option>
                                </dropdown-select>
                                <dropdown-select v-model="trip.year" label="Year" @valueChange="setDay">
                                    <menu-option v-for="year in possibleDYear" :value="year">{{year}}</menu-option>
                                </dropdown-select>
                                <dropdown-select v-model="trip.day" label="Day" :disabled="isDayDisabled">
                                    <menu-option v-for="day in possibleDDay" :value="day">{{day}}</menu-option>
                                </dropdown-select>
                            </cards-content>
                            <divider></divider>
                            <cards-action>
                                <div class="pull-right">
                                    <raised-button type="submit" class="primary" v-ripple>Search</raised-button>
                                </div>
                            </cards-action>
                        </form>
                    </cards>
                </div>
                <div class="col-md-fluid-18">
                    <data-table class="sortable">
                        <table>
                            <thead>
                                <tr>
                                    <th class="">Departure Time</th>
                                    <th class="th-number">Available Seat</th>
                                    <th class="th-action unsortable"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="t in trips">
                                    <td>{{t.departTime | moment("hh:mm A")}}</td>
                                    <td class="td-number" v-text="t.seat"></td>
                                    <td class="td-action">
                                        <tooltip text="View">
                                            <router-link :to="{name: 'BookingDetails', params: {id: t._id}, query: {arrival: trip.arrivalLocation}}"><icon-button name="arrow-right" v-ripple trigger-tooltip class="color-green-900"></icon-button></router-link>
                                        </tooltip>
                                    </td>
                                </tr>
                                <tr v-if="!trips.length">
                                    <td colspan="100" style="text-align:center">No Data</td>
                                </tr>
                            </tbody>
                        </table>
                    </data-table>
                </div>
            </div>
        </page-container>
    </div>
</template>

<script>
    import {
        Location
    } from "/imports/model/Location.js";
    import {
        Trip
    } from "/imports/model/Trip.js";
    export default {
        data() {
            return {
                trip: {
                    departLocation: "",
                    arrivalLocation: "",
                    month: "",
                    year: "",
                    day: "",
                },
                possibleDMonth: ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"],
                possibleDYear: [2017, 2018],
                possibleDDay: [],
                departLocation: "",
                arrivalLocation: "",
                date: "",
                trips: null,
            }
        },
        computed: {
            isDayDisabled() {
                if (this.possibleDDay.length > 0) {
                    return false;
                }
                return true;
            },
        },
        methods: {
            getDayInMonth(month, year) {
                var d = new Date(year, month + 1, 0);
                return d.getDate();
            },
            getMonthFromString(mon) {
                return new Date(Date.parse(mon + " 1, 2012")).getMonth();
            },
            setDay() {
                if (this.trip.month !== "" && this.trip.year !== "") {
                    let count = this.getDayInMonth(this.trip.month, this.trip.year);
                    let arr = [];
                    for (let i = 0; i < count; i++) {
                        arr.push(i + 1);
                    }
                    this.possibleDDay = arr;
                }
            },
            addTrip() {
                let trip = new Trip();
                console.log("hello");
                trip.callMethod("create", this.trip, (err, result) => {
                    if (err) {
                        return this.$snackbar.run(err, () => {}, "OK", "error");
                    }
                    this.$snackbar.run("Welcome to Nice Ticketing System", () => {});
                });
            },
            getLocation(_id) {
                return Location.findOne(_id);
            },
            selectionControl() {
                this.departLocation = this.trip.departLocation;
                this.arrivalLocation = this.trip.arrivalLocation;
                this.date = new Date(this.trip.year, this.trip.month, this.trip.day);
                this.$snackbar.run("Search successs");
            }
        },
        meteor: {
            subscribe: {
                'locations': [],
                'tripsByDateAndLocation'() {
                    return [this.departLocation, this.arrivalLocation, this.date];
                },
            },
            locations() {
                return Location.find();
            },
            trips() {
                return Trip.find();
            }
        }
    }
</script>