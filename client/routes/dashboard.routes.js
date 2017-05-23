import {Navigation, Toolbar, AddTripToolbar} from "/imports/client/template";
import Dashboard from '/imports/client/views/public/dashboard/Dashboard.vue';
import AddTrip from '/imports/client/views/public/dashboard/admin/AddTrip.vue';
import Trips from '/imports/client/views/public/dashboard/admin/Trips.vue';
import AddStaff from '/imports/client/views/public/dashboard/admin/AddStaff.vue';
import Staffs from '/imports/client/views/public/dashboard/admin/Staffs.vue';
import Locations from '/imports/client/views/public/dashboard/admin/Locations.vue';
import Booking from '/imports/client/views/public/dashboard/customer/Booking.vue';
import BookingDetails from '/imports/client/views/public/dashboard/customer/BookingDetails.vue';
import MyAccount from '/imports/client/views/public/dashboard/MyAccount.vue';
import ActiveTickets from '/imports/client/views/public/dashboard/customer/ActiveTickets.vue';

let routesParent = "/dashboard";
export default [{
    path: `${routesParent}/`,
    name: "Dashboard",
    meta: { fixToolbar: true, pageTitle: "Dashboard" },
    components: {
        default: Dashboard,
        toolbar: Toolbar,
        navigation: Navigation,
    }
}, {
    path: `${routesParent}/add-trip`,
    name: "AddTrip",
    meta: { fixToolbar: true, pageTitle: "Add Schedule" },
    components: {
        default: AddTrip,
        toolbar: AddTripToolbar,
        navigation: Navigation,
    }
}, {
    path: `${routesParent}/trips/:id?`,
    name: "Trips",
    meta: { fixToolbar: true, pageTitle: "View Schedules" },
    components: {
        default: Trips,
        toolbar: Toolbar,
        navigation: Navigation,
    }
}, {
    path: `${routesParent}/add-staff`,
    name: "AddStaff",
    meta: { fixToolbar: true, pageTitle: "Add Staff" },
    components: {
        default: AddStaff,
        toolbar: AddTripToolbar,
        navigation: Navigation,
    }
},{
    path: `${routesParent}/staffs`,
    name: "ManageStaff",
    meta: { fixToolbar: true, pageTitle: "Manage Staffs" },
    components: {
        default: Staffs,
        toolbar: Toolbar,
        navigation: Navigation,
    }
},{
    path: `${routesParent}/booking`,
    name: "BookingList",
    meta: { fixToolbar: true, pageTitle: "Booking" },
    components: {
        default: Booking,
        toolbar: Toolbar,
        navigation: Navigation,
    }
},{
    path: `${routesParent}/booking/:id`,
    name: "BookingDetails",
    meta: { fixToolbar: true, pageTitle: "Booking" },
    components: {
        default: BookingDetails,
        toolbar: AddTripToolbar,
        navigation: Navigation,
    }
}, {
    path: `${routesParent}/my-account`,
    name: 'MyAccount',
    meta: { fixToolbar: true, pageTitle: 'My Account' },
    components: {
        default: MyAccount,
        toolbar: Toolbar,
        navigation: Navigation,
    }
}, {
    path: `${routesParent}/active-tickets`,
    name: 'ActiveTickets',
    meta: { fixToolbar: true, pageTitle: 'Active Tickets' },
    components: {
        default: ActiveTickets,
        toolbar: Toolbar,
        navigation: Navigation,
    }
},{
    path: `${routesParent}/locations`,
    name: 'Locations',
    meta: { fixToolbar: true, pageTitle: 'Locations' },
    components: {
        default: Locations,
        toolbar: Toolbar,
        navigation: Navigation,
    }
},];
