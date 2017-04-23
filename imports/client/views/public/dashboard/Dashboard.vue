<template>
    <div class="appbar-padding">
        <page-container>
            <dashboard-admin v-if="loginUser && loginUser.isAdmin()"></dashboard-admin>
            <dashboard-staff v-if="loginUser && loginUser.isStaff()"></dashboard-staff>
            <dashboard-customer v-if="loginUser && loginUser.isCustomer()"></dashboard-customer>
        </page-container>
    </div>
</template>

<script>
    import DashboardAdmin from "./admin/DashboardAdmin.vue";
    import DashboardStaff from "./staff/DashboardStaff.vue";
    import DashboardCustomer from "./customer/DashboardCustomer.vue";
    import {
        User
    } from "/imports/model/User.js";

    export default {
        components: {
            DashboardAdmin,
            DashboardStaff,
            DashboardCustomer,
        },
        meteor: {
            loginUser() {                
                return User.findOne(Meteor.userId());
            }
        }
    }
</script>