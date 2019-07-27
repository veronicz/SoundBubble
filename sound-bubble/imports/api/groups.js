import SimpleSchema from 'simpl-schema';

Groups = new Mongo.Collection('groups');
GroupSchema = new SimpleSchema({
  name: { type: String },
  adminId: {type: String},
  userIds: { type: Array },
  'userIds.$': { type: String }
});

Groups.attachSchema(GroupSchema);
export default Groups;
