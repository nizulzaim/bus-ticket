<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row center-xs">
                <div class="col-md-fluid-12 col-lg-14">
                    <cards v-if="loginUser">
                        <form @submit.prevent="updateSubmit">
                            <cards-content>
                                <div class="row has-gutter">
                                    <div class="col-md-fluid-12" style="border-right: 1px solid #eee">
                                        <textfield placeholder="Username" v-model="loginUser.username" :is-info="true"></textfield>
                                        <textfield placeholder="Full Name" v-model="loginUser.profile.name"></textfield>
                                        <textfield placeholder="Identification Card (IC)" v-model="loginUser.profile.ic"></textfield>
                                        <textfield placeholder="Phone Number" v-model="loginUser.profile.telNo"></textfield>
                                        <textfield placeholder="Address Line 1" v-model="loginUser.profile.address1"></textfield>
                                        <textfield placeholder="Address Line 2" v-model="loginUser.profile.address2"></textfield>
                                    </div>
                                    <div class="col-md-fluid-12">
                                        <textfield placeholder="City" v-model="loginUser.profile.city"></textfield>
                                        <div>
                                            <div class="row">
                                                <div class="col-xs">
                                                    <textfield placeholder="Zip Code" v-model="loginUser.profile.zipCode"></textfield>
                                                </div>
                                                <div class="col-xs-fluid-12 col-md-4">
                                                    <dropdown-select v-model="loginUser.profile.state" label="State">
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
                                                    <dropdown-select v-model="loginUser.profile.sex" label="Sex">
                                                        <menu-option :value="0">Male</menu-option>
                                                        <menu-option :value="1">Female</menu-option>
                                                    </dropdown-select>
                                                </div>
                                                <div class="col-xs">
                                                    <dropdown-select v-model="loginUser.profile.nationality" label="Nationality">
                                                        <menu-option :value="0">Malaysian</menu-option>
                                                        <menu-option :value="1">Non-Malaysian</menu-option>
                                                    </dropdown-select>
                                                </div>
                                                <div class="col-xs-fluid-24">
                                                    <textfield placeholder="Email" v-model="loginUser.profile.email"></textfield>
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
                                        <icon name="account"></icon>Update Details
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
    export default {
        meteor: {
            loginUser() {                
                return User.findOne(Meteor.userId());
            }
        },
        methods: {
            updateSubmit() {
                

                if (isNaN(this.loginUser.profile.zipCode) || this.loginUser.profile.zipCode.length !== 5) {
                    return this.$snackbar.run("Zip Code should be in 5 length numbers", () => {}, "OK", "error");
                }

                if (isNaN(this.loginUser.profile.ic) || this.loginUser.profile.ic.length !== 12) {
                    return this.$snackbar.run("Identification card should be 12 length numbers", () => {}, "OK", "error");
                }
                console.log(this.loginUser);
                
                let pObj = {
                    name : this.loginUser.profile.name,
                    ic : this.loginUser.profile.ic,
                    telNo : this.loginUser.profile.telNo,
                    address1: this.loginUser.profile.address1,
                    address2 : this.loginUser.profile.address2,
                    zipCode : this.loginUser.profile.zipCode,
                    state : this.loginUser.profile.state,
                    city : this.loginUser.profile.city,
                    sex : this.loginUser.profile.sex,
                    nationality : this.loginUser.profile.nationality,
                    email : this.loginUser.profile.email,
                }

                this.loginUser.callMethod("update", pObj, (err, result) => {
                    if (err) {
                        console.log(err);
                        return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                    }
                    this.$snackbar.run("Successfully Update Account", () => {});
                });
            }
        }
    }
</script>