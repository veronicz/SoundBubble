import SimpleSchema from 'simpl-schema';

Groups = new Mongo.Collection('groups');
GroupSchema = new SimpleSchema({
  name: { type: String, max: 30 },
  adminId: String,
  userIds: Array,
  'userIds.$': String
});

Groups.attachSchema(GroupSchema);
export default Groups;
