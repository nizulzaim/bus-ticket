<template>
    <scroll-bar class="flex-fill-height">
        <router-link to="/dashboard" exact>
            <nav-list class="nav-item">
                <icon name="home"></icon> Dashboard
            </nav-list>
        </router-link>
        <span>
            <router-link to="/dashboard/booking" v-if="loginUser && loginUser.isCustomer()">
                <nav-list class="nav-item">
                    <icon name="bus"></icon> New Booking
                </nav-list>
            </router-link>
            <router-link to="/dashboard/active-tickets" v-if="loginUser && loginUser.isCustomer()">
                <nav-list class="nav-item">
                    <icon name="ticket"></icon> Active Tickets
                </nav-list>
            </router-link>
            <router-link to="/dashboard/trips" v-if="loginUser && (loginUser.isAdmin() || loginUser.isStaff())">
                <nav-list class="nav-item">
                    <icon name="bus"></icon> View Schedules
                </nav-list>
            </router-link>
            <router-link to="/dashboard/staffs" v-if="loginUser && loginUser.isAdmin()">
                <nav-list class="nav-item">
                    <icon name="account-circle"></icon> Manage Staff
                </nav-list>
            </router-link>
        </span>
        <divider></divider>
        <router-link to="/dashboard/my-account">
            <nav-list class="nav-item">
                <icon name="account"></icon> My Account
            </nav-list>
        </router-link>
        <nav-list class="nav-item" @click="signout">
            <icon name="logout"></icon> Sign Out
        </nav-list>
    </scroll-bar>
</template>

<script>
    import {User} from '/imports/model/User.js';
    export default {
        methods: {
            signout() {
                Meteor.logout(()=> {
                    this.$router.push("/");
                })
            }
        },
        meteor: {
            subscribe: {
                "loginUser": [],
            },
            loginUser() {
                return User.findOne(Meteor.userId());
            }
        }
    }
</script>

