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
        },
        transaction() {
            return Transaction.findOne(this.transactionId);
        },
        typeString() {
            if (this.type === 0) {
                return "Adult";
            }

            return "Children";
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