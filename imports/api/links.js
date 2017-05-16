import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor.publish('linksPub', function () {
        let userId = this.userId;
        return Links.find({ userId });
    });
}

Meteor.methods({
    'links.insert'(url) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            url: {
                label: 'Your link',
                type: String,
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });

        Links.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        })
    },

    'links.trackVisit'(_id) {
        new SimpleSchema({
            _id: {
                label: 'ID',
                type: String,
                min: 1
            }
        }).validate({ _id });

        Links.update({ _id }, {
            $set: {
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        })
    },

    'links.setVisibility'(_id, visible) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                label: 'ID',
                type: String,
                min: 1
            },
            visible: {
                label: 'Visibility',
                type: Boolean
            }
        }).validate({ _id, visible });

        Links.update({
            _id,
            userId: this.userId
        }, {
                $set: { visible }
            })
    }
});