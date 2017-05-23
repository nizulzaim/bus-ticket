import { Class } from 'meteor/jagi:astronomy';
import {Meteor} from "meteor/meteor";
import { Location } from '/imports/model/Location';
import { TransactionItem } from '/imports/model/TransactionItem';

export const TripPrice = Class.create({
    name: 'TripPrice',
    fields: {
        adult: String,
        children: String,
        arrivalLocation: String,
    }
});

export const Trip = Class.create({
    name: "Trip",
    collection: new Mongo.Collection('trips'),
    fields: {
        busNo: {
            type: String,
            optional: true,
        },
        departLocation: String,
        departTime: Date,
        seat: {
            type: Number,
            default: 30,
        },
        price: [TripPrice],
        availableSeat: {
            type: Number,
            transient: true,
        },
    },
    helpers: {
        locationArrival(_id){
            if (_id) {
                let index = this.price.map(e => e.arrivalLocation).indexOf(_id);
                let loc = Location.findOne(this.price[index].arrivalLocation);

                if (loc) {
                    return loc;
                }

                return null;
            }
            return null;
        },
        locationDeparture() {
            if (this) {
                return Location.findOne(this.departLocation);
            }
            return null;
        },
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