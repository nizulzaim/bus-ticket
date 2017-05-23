import { Trip } from '/imports/model/Trip';
import { Location } from '/imports/model/Location';
import { TransactionItem } from '/imports/model/TransactionItem';
import { Transaction } from '/imports/model/Transaction';

Trip.extend({
    events: {
        afterInit(e) {
            const doc = e.currentTarget;
            let allTransaction = [];

            Transaction.find({tripId: doc._id, status: 3}).forEach((item) => {
                allTransaction.push(item._id);
            });

            let tItem = TransactionItem.find({transactionId: {"$in": allTransaction}});
            doc.availableSeat = doc.seat - tItem.count();
        }
    },
    meteorMethods: {
        create(obj) {
            this.set({
                departLocation: obj.departLocation,
                price: obj.price,
                departTime: obj.departDate,
            });
            this.save();
        },
        editPrice(index, obj) {
            this.price[index] = obj;
            this.save();
        }
    }
});

let getLocation = [
    {
        find(trip) {
            return Location.find(trip.departLocation);
        },
    },
    {
        find(trip) {
            let allLocationId = [];
            
            trip.price.forEach((item) => {
                allLocationId.push(item.arrivalLocation);
            });
            return Location.find({_id: {"$in": allLocationId}});
        },
    },
];

Meteor.publishComposite('trips', function(page = 1, count = 100, sortBy = 0) {
    return {
        find: function() {
            let skip = (page - 1) * count;
            let sort;
            if (sortBy === 0) {
                sort = {departTime: -1};
            }
            return Trip.find({},{ skip, limit: count, sort});
        },
        children: getLocation,
    };
});

Meteor.publishComposite('tripById', function(id = "") {
    return {
        find: function() {
            return Trip.find(id);
        },
        children: getLocation,
    };
});

Meteor.publishComposite('tripsByDateAndLocation', function(departLocation = "", arrivalLocation = "", departTime = "") {
    return {
        find: function() {
            let endTime = "";

            function addDays(date, days) {
                var result = new Date(date);
                result.setDate(result.getDate() + days);
                return result;
            }
            if (departTime !== "") {
                endTime = addDays(departTime, 1);
            }
            console.log(endTime)
            console.log(Trip.findOne({departLocation, "price.arrivalLocation": arrivalLocation, 'departTime' : { $gte : departTime }}).departTime);
            return Trip.find({departLocation, "price.arrivalLocation": arrivalLocation, 'departTime' : { $gte : departTime, $lte: endTime }});
        },
        children: getLocation,
    };
});

Meteor.publishComposite('tripsByStaffCounter', function(departLocation = "") {
    return {
        find: function() {
            return Trip.find({departLocation: departLocation});
        },
        children: getLocation,
    };
});