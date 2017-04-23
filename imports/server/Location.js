import { Location } from '/imports/model/Location';

if (!Location.findOne()) {
    let loc = new Location();
    loc.name = "Johor Bharu";
    loc.save();

    loc = new Location();
    loc.name = "Skudai";
    loc.save();

    loc = new Location();
    loc.name = "Penang";
    loc.save();

    loc = new Location();
    loc.name = "Butterworth";
    loc.save();
}

Meteor.publishComposite('locations', function() {
    return {
        find: function() {
            return Location.find();
        },
    };
});