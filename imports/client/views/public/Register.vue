<template>
    <register-login-wrapper>
        <div class="row center-xs middle-md" style="min-height: 100vh;">
            <div class="col-md-fluid-7 col-lg-14">
                <cards v-depth="3" style="margin-top: 24px; margin-bottom 24px;">
                    <form @submit.prevent="registerSubmit">
                        <div style="max-width: 200px; margin: 20px auto;">
                            <img class="img-responsive" src="/img/logo.png" alt="">
                        </div>
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
                                                <dropdown-select v-model="user.nationality" label="Nationality">
                                                    <menu-option :value="0">Malaysian</menu-option>
                                                    <menu-option :value="1">Non-Malaysian</menu-option>
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
                                    <icon name="account"></icon>Register
                                </color-button>
                            </div>
                        </cards-action>
                    </form>
                </cards>
                <div class="button-center-container">
                    <div class="color-grey-200 font-center no-margin">Have Account?</div>
                    <router-link to="/">
                        <flat-button class="white no-margin" v-ripple>
                            Sign In
                        </flat-button>
                    </router-link>
                </div>
    
            </div>
        </div>
    </register-login-wrapper>
</template>

<script>
    import {
        User
    } from "/imports/model/User.js";
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
                    nationality: "",
                    email: "",
                }
            }
        },
        mounted() {
            if (Meteor.userId()) {
                this.$router.push("/dashboard/")
            }
        },
        methods: {
            capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            objectWithoutKey(object, key) {
                const {[key]: deletedKey, ...otherKeys} = object;
                return otherKeys;
            },
            isString (obj) {
                return (Object.prototype.toString.call(obj) === '[object String]');
            },
            registerSubmit() {
                let userKeys = Object.keys(this.user);
                let allOK = true;
                let problemKey = "";
                userKeys.forEach((key)=> {
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
                let uObj = {username: this.user.username, password: this.user.password};

                let pObj = Object.assign({}, this.user);
                pObj = this.objectWithoutKey(pObj, "username");
                pObj = this.objectWithoutKey(pObj, "password");
                pObj = this.objectWithoutKey(pObj, "cpassword");
                user.callMethod("create", uObj, pObj, (err, result) => {
                    if (err) {
                        return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                    }
                    Meteor.loginWithPassword(this.user.username, this.user.password, (err) => {
                        if (err) {
                            return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                        }
                        this.$snackbar.run("Welcome to Nice Ticketing System");
                        this.$router.replace("/dashboard/");
                    })
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .__background-wrap {
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        .__background {
            background: url(/img/back.jpg) center;
            background-size: cover;
            filter: blur(3px);
            position: absolute;
            top: -10px;
            left: -10px;
            width: calc(100% + 20px);
            height: calc(100% + 20px);
        }
    }
</style>