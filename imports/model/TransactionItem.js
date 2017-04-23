import { Class } from 'meteor/jagi:astronomy';
import {Meteor} from "meteor/meteor";
import {Transaction} from '/imports/model/Transaction.js';

export const TransactionItem = Class.create({
    name: "TransactionItem",
    collection: new Mongo.Collection('transactionItems'),
    fields: {
        type: Number,
        seat: String,
        transactionId: String,
        tripId: String,
    },
    helpers: {
        getStatus() {
            return Transaction.findOne(this.transactionId).status;
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