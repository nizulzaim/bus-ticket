<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row center-xs" style="padding-top: 12px;">
                <div class="col-md-fluid-24">
                    <div class="pull-right">
                        <router-link to="/dashboard/add-staff" class="pull-right">
                            <raised-button class="primary"><icon name="account-plus"></icon> Add Staff</raised-button>
                        </router-link>
                    </div>
                    
                    <data-table class="sortable" v-if="staffs.length">
                        <table>
                            <thead>
                                <tr>
                                    <th class="unsortable">ID</th>
                                    <th class="">Staff Username</th>
                                    <th>Name</th>
                                    <th>Counter Location</th>
                                    <th>Created At</th>
                                    <th class="th-action unsortable"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="staff in staffs">
                                    <td></td>
                                    <td>{{staff.username}}</td>
                                    <td>{{staff.profile.name}}</td>
                                    <td v-if="staff.profile.counter">{{getLocation(staff.profile.counter).name}}</td>
                                    <td v-else>No data</td>
                                    <td>{{staff.createdAt | moment("dddd, Do MMMM YYYY, HH:mm")}}</td>
                                    <td class="td-action">
                                        <!--<tooltip text="View Trip">
                                            <icon-button @click="showArrivalPlacesModal(staff._id)" name="bus" v-ripple trigger-tooltip class="color-green-900"></icon-button>
                                        </tooltip>-->
                                        <tooltip text="View">
                                            <icon-button @click="showDetailsForm(staff._id)"  name="eye" v-ripple trigger-tooltip class="color-primary-900"></icon-button>
                                        </tooltip>
                                        <tooltip text="Edit">
                                            <icon-button @click="showUpdateForm(staff._id)"  name="pencil" v-ripple trigger-tooltip class="color-primary-900"></icon-button>
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
        <reveal v-model="showDetails">
            <div class="col-md-fluid-10">
                <cards v-if="selectedStaff">
                    <cards-content-scrollbar>
                        <textfield type="text" v-model="selectedStaff.profile.name" :is-info="true" placeholder="Name"></textfield>
                        <textfield type="text" v-model="selectedStaff.username" :is-info="true" placeholder="Username"></textfield>
                        <textfield type="text" v-model="selectedStaff.profile.email" :is-info="true" placeholder="Email"></textfield>
                        <textfield type="text" v-model="selectedStaff.profile.ic" :is-info="true" placeholder="IC"></textfield>
                        <textfield type="text" v-model="selectedStaff.profile.address1" :is-info="true" placeholder="Address 1"></textfield>
                        <textfield type="text" v-model="selectedStaff.profile.address2" :is-info="true" placeholder="Address 2"></textfield>
                        <div class="row has-gutter">
                            <div class="col-xs">
                                <textfield type="text" v-model="selectedStaff.profile.zipCode" :is-info="true" placeholder="Zip"></textfield>
                            </div>
                            <div class="col-xs">
                                <textfield type="text" v-model="selectedStaff.profile.city" :is-info="true" placeholder="City"></textfield>
                            </div>
                        </div>
                        <div class="row has-gutter">
                            <div class="col-xs" v-if="selectedStaff.profile.counter">
                                <textfield type="text" v-model="getLocation(selectedStaff.profile.counter).name" :is-info="true" placeholder="Counter Location"></textfield>
                            </div>
                        </div>
                    </cards-content-scrollbar>
                    <divider></divider>
                    <cards-action>
                        <div class="pull-right">
                            <flat-button @click="showDetails = false" v-ripple class="primary">OK</flat-button>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </reveal>

        <reveal v-model="showUpdate">
            <div class="col-md-fluid-10">
                <cards v-if="selectedStaff">
                    <form @submit.prevent="updateDetails">
                        <cards-content-scrollbar>
                            <textfield type="text" v-model="selectedStaff.profile.name" placeholder="Name"></textfield>
                            <textfield type="text" v-model="selectedStaff.profile.email" placeholder="Email"></textfield>
                            <textfield type="text" v-model="selectedStaff.profile.ic" placeholder="IC"></textfield>
                            <textfield type="text" v-model="selectedStaff.profile.address1" placeholder="Address 1"></textfield>
                            <textfield type="text" v-model="selectedStaff.profile.address2" placeholder="Address 2"></textfield>
                            <div class="row has-gutter">
                                <div class="col-xs">
                                    <textfield type="text" v-model="selectedStaff.profile.zipCode" placeholder="Zip"></textfield>
                                </div>
                                <div class="col-xs">
                                    <textfield type="text" v-model="selectedStaff.profile.city" placeholder="City"></textfield>
                                </div>
                            </div>
                            <div class="row has-gutter">
                                <div class="col-xs">
                                    <dropdown-select v-model="selectedStaff.profile.state" label="State">
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
                            <div class="row has-gutter">
                                <div class="col-xs">
                                    <dropdown-select v-model="selectedStaff.profile.sex" label="Sex">
                                        <menu-option :value="0">Male</menu-option>
                                        <menu-option :value="1">Female</menu-option>
                                    </dropdown-select>
                                </div>
                            </div>
                        </cards-content-scrollbar>
                        <divider></divider>
                        <cards-action>
                            <div class="pull-right">
                                <flat-button  @click="showUpdate = false" v-ripple class="primary">Cancel</flat-button>
                                <color-button type="submit" v-ripple class="primary">OK</color-button>
                            </div>
                        </cards-action>
                    </form>
                </cards>
            </div>
        </reveal>
    </div>
</template>                                                                                                                                                                                                                                  

<script>
    import {Meteor} from 'meteor/meteor';
    import {User} from '/imports/model/User.js';
    import {Location} from '/imports/model/Location.js';                        
    export default {
        data() {
            return {
                selectedStaffId: null,
                selectedStaff: null,
                showDetails: false,
                showUpdate : false,
            }
        },
        methods: {
            getLocation(_id) {
                return Location.findOne(_id);
            },
            showDetailsForm(_id) {
                this.selectedStaffId = _id;
                this.showDetails = true;
            },     
            showUpdateForm(_id) {
                this.selectedStaffId = _id;
                this.showUpdate = true;
            },    
            updateDetails() {
                let obj = {
                    name: this.selectedStaff.profile.name,
                    email: this.selectedStaff.profile.email,
                    ic: this.selectedStaff.profile.ic,
                    address1: this.selectedStaff.profile.address1,
                    address2: this.selectedStaff.profile.address2,
                    zipCode: this.selectedStaff.profile.zipCode,
                    city: this.selectedStaff.profile.city,
                    state: this.selectedStaff.profile.state,
                    sex: this.selectedStaff.profile.sex,
                    nationality: this.selectedStaff.profile.nationality,
                }
                this.selectedStaff.callMethod("update", obj, (err, reason) => {
                    if (err) {
                        return this.$snackbar.run("Error when trying to update the staff", ()=> {}, "OK", "error");
                    }   
                    
                    this.showUpdate = false;
                    return this.$snackbar.run("Successfully Update staff");
                });
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        },
        meteor: {
            subscribe: {
                staffs: [],
                locations: [],
            },
            staffs() {
                return User.find({"profile.userType": 1});
            },
            selectedStaff: {
                params () {
                    return {
                        id: this.selectedStaffId
                    };
                },
                deep: true,
                update ({id}) {
                    return User.findOne(id);
                },
            },
        }
    }
</script>