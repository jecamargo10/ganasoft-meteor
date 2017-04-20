import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Farms = new Mongo.Collection('fincas');

if (Meteor.isServer) {
  Meteor.publish('fincas', function farmsPublication() {
    return Farms.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'fincas.insert'(name) {
    check(name, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Farms.insert({
      name,
      createdAt: new Date(),
      owner: this.userId,
    });
  },
  // Que sucede si hay un problema con el metodo ? el usuario no se enteraria ? no tienes contigencia de errores ya en ejecucion, estan los test pero si llegase a fallar el usuario no se enteraria
  'fincas.remove'(farmId) {
    console.log(farmId);

    const farm = Farms.findOne(farmId);
    if (farm.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Farms.remove(farmId);
  },
});
