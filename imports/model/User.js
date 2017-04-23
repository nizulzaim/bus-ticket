import {
    Class
} from 'meteor/jagi:astronomy';
import {
    Meteor
} from "meteor/meteor";

export const UserProfile = Class.create({
    name: 'UserProfile',
    fields: {
        name: String,
        ic: String,
        address1: String,
        address2: {
            type: String,
            optional: true,
        },
        zipCode: String,
        state: String,
        city: String,
        telNo: String,
        dob: {
            type: Date,
            optional: true,
        },
        sex: Number,
        nationality: Number,
        email: String,
        counter: {
            type: Number,
            optional: true,
        },
        userType: {
            type: [Number],
            immutable: true,
            default: [2],
        },
    }
});

export const User = Class.create({
    name: "User",
    collection: Meteor.users,
    fields: {
        username: String,
        profile: UserProfile,
    },
    behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        },
        softremove: {
            removedFieldName: 'removed',
            hasRemovedAtField: true,
            removedAtFieldName: 'removedAt'
        }
    },
    helpers: {
        isAdmin() {
            return this.profile.userType.indexOf(0) > -1;
        },
        isStaff() {
            return this.profile.userType.indexOf(1) > -1;
        },
        isCustomer() {
            return this.profile.userType.indexOf(2) > -1;
        }
    }
});