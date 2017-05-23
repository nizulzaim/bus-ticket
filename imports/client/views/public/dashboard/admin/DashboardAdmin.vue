<template>
    <div class="row has-gutter">
        <div class="col-xs-fluid-24 col-md-5">
            <cards>
                <cards-content class="background-deep-purple-500 cards-content">
                    <router-link to="/dashboard/trips"><icon class="icon color-deep-purple-50" name="bus" v-ripple></icon></router-link>
                </cards-content>
                <cards-action class="background-deep-purple-400 cards-content">
                    <div class="pull-right" >
                        <router-link to="/dashboard/trips"><raised-button class="background-deep-purple-500 primary" v-ripple>Manage Trips</raised-button></router-link>
                    </div>
                </cards-action>
            </cards>
        </div>
        <div class="col-xs-fluid-24 col-md-5">
            <cards>
                <cards-content class="background-theme-500 cards-content">
                    <router-link to="/dashboard/staffs"><icon class="icon color-blue-50" name="account-circle" v-ripple></icon></router-link>
                </cards-content>
                <cards-action class="background-theme-400 cards-content">
                    <div class="pull-right">
                        <router-link to="/dashboard/staffs"><raised-button class="background-theme-primary-500 primary" v-ripple>Manage Staffs</raised-button></router-link>
                    </div>
                </cards-action>
            </cards>
        </div>
        <div class="col-xs-fluid-24 col-md-5">
            <cards>
                <cards-content class="background-theme-500 cards-content">
                    <router-link to="/dashboard/trips"><icon class="icon color-blue-50" name="map-marker" v-ripple></icon></router-link>
                </cards-content>
                <cards-action class="background-theme-400 cards-content">
                    <div class="pull-right">
                        <router-link to="/dashboard/trips"><raised-button class="background-theme-primary-500 primary" v-ripple>Manage Location</raised-button></router-link>
                    </div>
                </cards-action>
            </cards>
        </div>
        <div class="col-xs-fluid-24 col-md-5">
            <cards>
                <cards-content class="background-theme-500 cards-content">
                    <router-link to="/dashboard/my-account"><icon class="icon color-blue-50" name="account" v-ripple></icon></router-link>
                </cards-content>
                <cards-action class="background-theme-400 cards-content">
                    <div class="pull-right">
                        <router-link to="/dashboard/my-account"><raised-button class="background-theme-primary-500 primary" v-ripple>My Account</raised-button></router-link>
                    </div>
                </cards-action>
            </cards>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .icon {
        font-size: 140px;
        line-height: 180px;
        text-align: center;
        height: 180px;
        width: 100%;
        margin: 0 auto;
        display: block;
    }

    .cards-content {
        padding: 0;
    }
</style>