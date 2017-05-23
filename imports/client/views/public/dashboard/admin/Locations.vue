<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row center-xs" style="padding-top: 12px;">
                <div class="col-md-fluid-24">
                    <div class="pull-right">
                        <raised-button @click="showAdd = true" class="primary"><icon name="map-marker-plus"></icon> Add Location</raised-button>
                    </div>
                    
                    <cards v-for="location in locations" :key="location._id">
                        <cards-content>
                            Location Name: <span class="font-light">{{location.name}}</span>
                        </cards-content>
                        <divider></divider>
                        <cards-action>
                            <div class="pull-right">
                                <color-button class="primary"  v-ripple @click="locationSelect(location._id)">
                                    Update
                                </color-button>
                            </div>
                        </cards-action>
                    </cards>
                    
                    <cards v-else style="margin-top: 20px;">
                        <cards-content>
                            <div class="font-center color-grey-700 font-subhead no-margin">No Data to display</div>
                        </cards-content>
                        
                    </cards>
                </div>
            </div>
        </page-container>

        <reveal v-model="showUpdate">
            <div class="col-md-fluid-10">
                <cards v-if="selectedLocation">
                    <form @submit.prevent="updateLocation(selectedLocation)">
                        <cards-content-scrollbar>
                            <textfield type="text" v-model="selectedLocation.name" placeholder="Name"></textfield>
                        </cards-content-scrollbar>
                        <divider></divider>
                        <cards-action>
                            <div class="pull-right">
                                <flat-button type="submit" v-ripple class="primary">Update</flat-button>
                            </div>
                        </cards-action>
                    </form>
                </cards>
            </div>
        </reveal>

        <reveal v-model="showAdd">
            <div class="col-md-fluid-10">
                <cards>
                    <form @submit.prevent="addLocation">
                        <cards-content-scrollbar>
                            <textfield type="text" v-model="name" placeholder="Name"></textfield>
                        </cards-content-scrollbar>
                        <divider></divider>
                        <cards-action>
                            <div class="pull-right">
                                <flat-button type="submit" v-ripple class="primary">Add</flat-button>
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
    import {Location} from '/imports/model/Location.js';                        
    export default {
        data() {
            return {
                selectedLocation: null,
                showUpdate: false,
                showAdd: false,
                name: "",
            }
        },
        methods: {
            updateLocation(location) {
                if(location.name === "") {
                    return this.$snackbar.run("Name cannot empty", ()=> {}, "OK", "error");
                }
                location.callMethod("createOrUpdate", location.name, (err, reason) => {
                    if (err) {
                        return this.$snackbar.run("Error when trying to update the location", ()=> {}, "OK", "error");
                    }   
                    
                    this.showUpdate = false;
                    return this.$snackbar.run("Successfully Update Location Name");
                });
            },
            addLocation() {
                if(this.name === "") {
                    return this.$snackbar.run("Name cannot empty", ()=> {}, "OK", "error");
                }
                let loc = new Location();

                loc.callMethod("createOrUpdate", this.name, (err, reason) => {
                    if (err) {
                        return this.$snackbar.run("Error when trying to update the location", ()=> {}, "OK", "error");
                    }   
                    
                    this.showAdd = false;
                    this.name = "";
                    return this.$snackbar.run("Successfully Update Location Name");
                });
            },
            locationSelect(id) {
                this.selectedLocation = Location.findOne(id);
                this.showUpdate = true;
            },
        },
        meteor: {
            subscribe: {
                locations: [],
            },
            locations() {
                return Location.find();
            }
        }
    }
</script>