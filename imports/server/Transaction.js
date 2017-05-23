import { Transaction } from '/imports/model/Transaction';
import { Trip } from '/imports/model/Trip';
import { TransactionItem } from '/imports/model/TransactionItem';
import { User } from '/imports/model/User';

Transaction.extend({
    meteorMethods: {
        createOrUpdate(id,location = "", price = 0, arr = [], ) {
            this.status = 0;
            this.owner = Meteor.userId();
            this.tripId = id;
            this.totalPrice = parseFloat(price);

            let trip = Trip.findOne(id);
            this.departTime = trip.departTime;
            this.destination = location ;
            if (arr.length) {
                this.status = 3;
            }
            let sv = this.save();
            arr.forEach(function(e) {
                let tI = new TransactionItem();
                tI.type = e.type;
                tI.seat = e.seat;
                tI.transactionId = sv;
                tI.tripId = id;
                tI.save();
            });

            return sv;
        },
    }
});

Meteor.publishComposite('transactionByTripId', function(id) {
    return {
        find: function() {
            return Transaction.find({tripId: id, status: {$ne: 0}});
        },
        children: [
            {
                find(transaction) {
                    return TransactionItem.find({transactionId: transaction._id});
                },
            },
            {
                find(transaction) {
                    return User.find(transaction.owner);
                },
            },
        ]
    };
});

Meteor.publishComposite('transactionsByUser', function(id) {
    return {
        find: function() {
            return Transaction.find({status: 3, owner: Meteor.userId()});
        },
        children: [
            {
                find(transaction) {
                    return TransactionItem.find({transactionId: transaction._id});
                },
            },
            {
                find(transaction) {
                    return Trip.find({_id: transaction.tripId});
                },
            },
        ]
    };
});

Meteor.publishComposite('transactions', function(id) {
    return {
        find: function() {
            return Transaction.find();
        },
        children: [
            {
                find(transaction) {
                    return TransactionItem.find({transactionId: transaction._id});
                },
            },
            {
                find(transaction) {
                    return Trip.find({_id: transaction.tripId});
                },
            },
        ]
    };
});

// Meteor.publishComposite('tripsByDateAndLocation', function(departLocation = "", arrivalLocation = "", departTime = "") {
//     return {
//         find: function() {
//             let endTime = "";

//             function addDays(date, days) {
//                 var result = new Date(date);
//                 result.setDate(result.getDate() + days);
//                 return result;
//             }
//             if (departTime !== "") {
//                 endTime = addDays(departTime, 1);
//             }

//             return Trip.find({$and:[{departLocation}, {"price.arrivalLocation": arrivalLocation}, { 'departTime' : { $gte : departTime, $lt: endTime }}]});
//         },
//         children: [
//             {
//                 find(trip) {
//                     return Location.find(trip.departLocation);
//                 },
//             },
//             {
//                 find(trip) {
//                     let allLocationId = [];
                    
//                     trip.price.forEach((item) => {
//                         allLocationId.push(item.arrivalLocation);
//                     });
//                     return Location.find({_id: {"$in": allLocationId}});
//                 },
//             }
//         ]
//     };
// });