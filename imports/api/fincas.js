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
//Por que dejas el meteor method por fuera de servidor ? eso no es seguro, pon todo dentro de la verificacion del servidor, no debe ser accesible tales tareas para el cliente por mas que verifiques la indentidad
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
