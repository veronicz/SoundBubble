import SimpleSchema from 'simpl-schema';

Groups = new Mongo.Collection('groups');
GroupSchema = new SimpleSchema({
  name: String,
  adminId: String,
  userIds: Array,
  'userIds.$': String
});

Groups.attachSchema(GroupSchema);
export default Groups;
