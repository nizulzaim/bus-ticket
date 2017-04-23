import { Class } from 'meteor/jagi:astronomy';
import { User } from '/imports/model/User';

User.extend({
    meteorMethods: {
        create(userObj, profileObj = {}) {
            userObj.profile = profileObj;
            Accounts.createUser(userObj);
        },
        createStaff(userObj, profileObj = {}) {
            userObj.profile = profileObj;
            userObj.profile.userType = [1];
            Accounts.createUser(userObj);
        },
        update(profileObj) {
            this.set({
                profile: profileObj,
            }, { merge: true });
            console.log(this.save());
        }
    }
});

Meteor.publishComposite('loginUser', function(refresh = 0) {
    return {
        find: function() {
            return User.find(this.userId);
        },
    };
});

Meteor.publishComposite('staffs', function(refresh = 0) {
    return {
        find: function() {
            return User.find({}, { "profile.userType.$": 1});
        },
    };
});

if (!User.findOne()) {
    let user = new User();
    user.create({
        username: "admin",
        password: "n",
    }, {
        name: "Admin",
        userType: [0],
        email: "mnizulzaim@gmail.com",
    });
}
