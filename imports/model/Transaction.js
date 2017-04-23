import { Class } from 'meteor/jagi:astronomy';
import {Meteor} from "meteor/meteor";
import {Trip} from '/imports/model/Trip.js';
import {TransactionItem} from '/imports/model/TransactionItem.js';

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
        transactionItems() {
            return TransactionItem.find({transactionId: this._id});
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