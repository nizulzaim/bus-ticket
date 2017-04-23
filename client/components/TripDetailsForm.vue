<template>
    <div>
        <divider></divider>
        <cards-content class="background-deep-purple-50">
            <div class="color-grey-800 font-subhead no-margin">Arrival {{number}} Information</div>
        </cards-content>
        <divider></divider>
        <cards-content>
            <div class="row has-gutter">
                <div class="col-md-fluid-7">
                    <dropdown-select v-model="value.arrivalLocation" label="Arrival Location">
                        <menu-option v-for="location in locations" :value="location._id">{{location.name}}</menu-option>
                    </dropdown-select>
                </div>
                <div class="col-md-fluid-6">
                    <textfield v-model="value.adult" placeholder="Adult Price (RM)"></textfield>
                </div>
                <div class="col-md-fluid-6">
                    <textfield v-model="value.children" placeholder="Children Price (RM)"></textfield>
                </div>
            </div>
        </cards-content>
    </div>
</template>

<script>
    import {Location} from "/imports/model/Location.js";
    export default {
        props: {
            value: Object,
            number: Number,
        },
        meteor: {
            subscribe: {
                'locations': [],
            },
            locations() {
                return Location.find();            
            }
        }
    }
</script>