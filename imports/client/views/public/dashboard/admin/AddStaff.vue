<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row center-xs">
                <div class="col-md-fluid-7 col-lg-14 has-gutter">
                    <cards style="margin-top: 24px; margin-bottom 24px;">
                        <form @submit.prevent="registerSubmit">
                            <cards-content>
                                <div class="row has-gutter">
                                    <div class="col-md-fluid-12" style="border-right: 1px solid #eee">
                                        <textfield placeholder="Username" v-model="user.username"></textfield>
                                        <textfield type="password" placeholder="Password" v-model="user.password"></textfield>
                                        <textfield type="password" placeholder="Confirm Password" v-model="user.cpassword"></textfield>
                                        <textfield placeholder="Full Name" v-model="user.name"></textfield>
                                        <textfield placeholder="Identification Card (IC)" v-model="user.ic"></textfield>
                                        <textfield placeholder="Phone Number" v-model="user.telNo"></textfield>
                                    </div>
                                    <div class="col-md-fluid-12">
                                        <textfield placeholder="Address Line 1" v-model="user.address1"></textfield>
                                        <textfield placeholder="Address Line 2" v-model="user.address2"></textfield>
                                        <textfield placeholder="City" v-model="user.city"></textfield>
                                        <div>
                                            <div class="row">
                                                <div class="col-xs">
                                                    <textfield placeholder="Zip Code" v-model="user.zipCode"></textfield>
                                                </div>
                                                <div class="col-xs-fluid-12 col-md-4">
                                                    <dropdown-select v-model="user.state" label="State">
                                                        <menu-option value="01">Johor</menu-option>
                                                        <menu-option value="02">Kedah</menu-option>
                                                        <menu-option value="03">Kelantan</menu-option>
                                                        <menu-option value="04">Melaka</menu-option>
                                                        <menu-option value="05">Negeri Sembilan</menu-option>
                                                        <menu-option value="06">Pahang</menu-option>
                                                        <menu-option value="07">Pulau Pinang</menu-option>
                                                        <menu-option value="08">Perak</menu-option>
                                                        <menu-option value="09">Perlis</menu-option>
                                                        <menu-option value="10">Selangor</menu-option>
                                                        <menu-option value="11">Terengganu</menu-option>
                                                        <menu-option value="12">Sabah</menu-option>
                                                        <menu-option value="13">Sarawak</menu-option>
                                                        <menu-option value="14">Kuala Lumpur</menu-option>
                                                        <menu-option value="15">Labuan</menu-option>
                                                        <menu-option value="16">Putrajaya</menu-option>
                                                    </dropdown-select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs">
                                                    <dropdown-select v-model="user.sex" label="Sex">
                                                        <menu-option :value="0">Male</menu-option>
                                                        <menu-option :value="1">Female</menu-option>
                                                    </dropdown-select>
                                                </div>
                                                <div class="col-xs">
                                                    <dropdown-select v-model="user.counter" label="Counter Location">
                                                        <menu-option v-for="location in locations" :value="location._id">{{location.name}}</menu-option>
                                                    </dropdown-select>
                                                </div>
                                                <div class="col-xs-fluid-24">
                                                    <textfield placeholder="Email" v-model="user.email"></textfield>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </cards-content>
                            <divider></divider>
                            <cards-action>
                                <div class="pull-right">
                                    <color-button v-ripple class="background-deep-purple" type="submit">
                                        <icon name="account"></icon>Create Staff
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
        User
    } from "/imports/model/User.js";
    import {
        Location
    } from "/imports/model/Location.js";
    import {
        Meteor
    } from 'meteor/meteor';
    
    export default {
        data() {
            return {
                user: {
                    username: "",
                    password: "",
                    cpassword: "",
                    name: "",
                    ic: "",
                    telNo: "",
                    address1: "",
                    address2: "",
                    zipCode: "",
                    city: "",
                    state: "",
                    sex: "",
                    nationality: 0,
                    counter: "",
                    email: "",
                }
            }
        },
        mounted() {},
        methods: {
            capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            objectWithoutKey(object, key) {
                const {
                    [key]: deletedKey, ...otherKeys
                } = object;
                return otherKeys;
            },
            isString(obj) {
                return (Object.prototype.toString.call(obj) === '[object String]');
            },
            registerSubmit() {
                let userKeys = Object.keys(this.user);
                let allOK = true;
                let problemKey = "";
                userKeys.forEach((key) => {
                    if (this.isString(this.user[key]))
                        this.user[key] = this.user[key].trim();
    
                    if (this.user[key] === "" && allOK) {
                        allOK = false;
                        problemKey = this.capitalizeFirstLetter(key);
                    }
                });
    
                if (!allOK) {
                    return this.$snackbar.run("Please enter following input: " + problemKey, () => {}, "OK", "error");
                }
    
                if (this.user.password !== this.user.cpassword) {
                    return this.$snackbar.run("Please confirm your password with correct password", () => {}, "OK", "error");
                }
    
                if (isNaN(this.user.zipCode) || this.user.zipCode.length !== 5) {
                    return this.$snackbar.run("Zip Code should be in 5 length numbers", () => {}, "OK", "error");
                }
    
                if (isNaN(this.user.ic) || this.user.ic.length !== 12) {
                    return this.$snackbar.run("Identification card should be 12 length numbers", () => {}, "OK", "error");
                }
    
                let user = new User();
                let uObj = {
                    username: this.user.username,
                    password: this.user.password
                };
    
                let pObj = Object.assign({}, this.user);
                pObj = this.objectWithoutKey(pObj, "username");
                pObj = this.objectWithoutKey(pObj, "password");
                pObj = this.objectWithoutKey(pObj, "cpassword");
    
                user.callMethod("createStaff", uObj, pObj, (err, result) => {
                    if (err) {
                        return this.$snackbar.run(err, () => {}, "OK", "error");
                    }
                    this.$snackbar.run("Successfully add new staff");
                    this.$router.push("/dashboard/staffs/");
                });
            }
        },
        meteor: {
            subscribe: {
                "locations": [],
            },
            locations() {
                return Location.find();
            }
        }
    }
</script>
