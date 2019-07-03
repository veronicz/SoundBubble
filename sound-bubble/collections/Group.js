import SimpleSchema from 'simpl-schema';

Groups = new Meteor.Collection('groups');
GroupSchema = new SimpleSchema({
  name: { type: String },
  userIds: { type: Array },
  'userIds.$': { type: String }
});

Groups.attachSchema(GroupSchema);
export default Groups;
