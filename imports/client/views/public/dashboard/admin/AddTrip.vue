<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row center-xs" style="padding-top: 12px;">
                <div class="col-md-fluid-20">
                    <cards>
                        <form @submit.prevent="addTrip">
                            <cards-content class="background-deep-purple-50">
                                <div class="color-grey-800 font-subhead no-margin">Departure Information</div>
                            </cards-content>
                            <divider></divider>
                            <cards-content>
                                <div class="row has-gutter">
                                    <div class="col-md-fluid-7">
                                        <dropdown-select v-model="trip.departLocation" label="Departure Location">
                                            <menu-option v-for="location in locations" :value="location._id">{{location.name}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                    <div class="col-md-fluid-4">
                                        <dropdown-select v-model="trip.month" label="Month" @valueChange="setDay">
                                            <menu-option v-for="(month, index) in possibleDMonth" :value="index">{{month}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                    <div class="col-md-fluid-4">
                                        <dropdown-select v-model="trip.year" label="Year" @valueChange="setDay">
                                            <menu-option v-for="year in possibleDYear" :value="year">{{year}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                    <div class="col-md-fluid-3">
                                        <dropdown-select v-model="trip.day" label="Day" :disabled="isDayDisabled">
                                            <menu-option v-for="day in possibleDDay" :value="day">{{day}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                    <div class="col-md-fluid-3">
                                        <dropdown-select v-model="trip.hour" label="Hour">
                                            <menu-option v-for="p in possibleHour" :value="p">{{p}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                    <div class="col-md-fluid-3">
                                        <dropdown-select v-model="trip.minute" label="Minute">
                                            <menu-option v-for="p in possibleMinute" :value="p">{{p}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                </div>
                            </cards-content>
                            <div v-for="(t, index) in trip.price">
                                <trip-details-form v-model="trip.price[index]" :number="index + 1"></trip-details-form>
                            </div>
                            <divider></divider>
                            <cards-action>
                                <div class="pull-right">
                                    <flat-button v-ripple class="color-deep-purple" @click="addPrice">
                                        Add Arrival Location
                                    </flat-button>
                                    <color-button v-ripple class="background-deep-purple" type="submit">
                                        <icon name="plus"></icon>Add Trip
                                    </color-button>
                                </div>
                            </cards-action>
                        </form>
                    </cards>
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
                    platNumber: "",
                    month: "",
                    year: "",
                    day: "",
                    hour: "",
                    minute: "",
                    departDate: "",
                    price: [],
                },
                possibleDMonth: ["January", "February", "March", "April",'May', "June", "July", "August", "September", "October", "November", "December"],
                possibleDYear: [2017, 2018],
                possibleDDay: [],
                possibleHour: ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
                possibleMinute: ["00", "15", "30", "45"]
            }
        },
        computed: {
            isDayDisabled() {
                if (this.possibleDDay.length > 0) {
                    return false;
                }
                return true;
            }
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
            addPrice() {
                this.trip.price.push({
                    arrivalLocation: "",
                    adult: "",
                    children: "",
                })
            },
            addTrip() {
                let trip = new Trip();
                let hasError = false;
                this.trip.price.forEach(item => {
                    if (item.adult === "" || item.children === "" || item.arrivalLocation === "") {
                        hasError = true;
                    }
                })
                this.trip.departDate = new Date(this.trip.year, this.trip.month, parseInt(this.trip.day), parseInt(this.trip.hour), parseInt(this.trip.minute));
                if (hasError) {
                    return this.$snackbar.run("Please enter value for each arrival/destination locations", () => {}, "OK", "error");
                }
                trip.callMethod("create", this.trip, (err, result) => {
                    if (err) {
                        return this.$snackbar.run(err, () => {}, "OK", "error");
                    }
                    this.$snackbar.run("Successfully add new trip", () => {});

                    return this.$router.replace("/dashboard/trips");
                });
            }
        },
        created() {
            this.addPrice();
        },
        meteor: {
            subscribe: {
                'locations': [],
            },
            locations() {
                return Location.find();
            },
            
        }
    }
</script>