import { Class } from 'meteor/jagi:astronomy';
import {Meteor} from "meteor/meteor";
import {Trip} from '/imports/model/Trip.js';
import {TransactionItem} from '/imports/model/TransactionItem.js';
import {User} from '/imports/model/User.js';

export const Transaction = Class.create({
    name: "Transaction",
    collection: new Mongo.Collection('transactions'),
    fields: {
        totalPrice: Number,
        status: Number, // 0 - available, 1- locked, 2 -pending payment, 3- paid
        owner: String,
        tripId: String,
        departTime: Date,
        destination: String,
    },
    helpers: {
        trip() {
            let t = Trip.findOne(this.tripId);
            return t;
        },
        user() {
            return User.findOne(this.owner);
        },
        transactionItems() {
            return TransactionItem.find({transactionId: this._id});
        },
        statusString() {
            if (this.status === 0) return "Available";
            if (this.status === 1) return "Locked";
            if (this.status === 2) return "Pending Payment";
            if (this.status === 3) return "Paid";
            if (this.status === 4) return "Used";
        }
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
    }
});