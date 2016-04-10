module.exports = function(Message) {

  //Message.disableRemoteMethod("create", true);
  Message.disableRemoteMethod("upsert", true);
  Message.disableRemoteMethod("updateAll", true);
  //Message.disableRemoteMethod("updateAttributes", false);

  Message.disableRemoteMethod("find", true);
  //Message.disableRemoteMethod("findById", true);
  Message.disableRemoteMethod("findOne", true);

  //Message.disableRemoteMethod("deleteById", true);

  Message.disableRemoteMethod("count", true);
  Message.disableRemoteMethod("exists", true);

  Message.disableRemoteMethod('createChangeStream', true);

  //Message.disableRemoteMethod("__find__list", true);
  Message.disableRemoteMethod("__updateAttributes__list", true);
  Message.disableRemoteMethod("__create__list", true);
  Message.disableRemoteMethod("__delete__list", true);
  Message.disableRemoteMethod("__count__list", true);

};
