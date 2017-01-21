import { Mongo } from 'meteor/mongo';
import secureRandom from 'secure-random';
import crypto from 'crypto';
import base64url from 'base64url';

Meteor.methods({

  'profiles.insert': function(name, url) {

    //TODO: generate proxy email

    let email = "";

    // generating password

    let generated_password = base64url(crypto.randomBytes(12));

    console.log(this.userId);

    // encrypting email and password using AES256

    let cipher = crypto.createCipher('aes-256-ctr', 'ieatass');

    let password = cipher.update(generated_password, 'utf8', 'hex');
    password += cipher.final('hex');

    // inserting new account into database

    return Profiles.insert({
      name,
      url,
      email,
      password,
      owner: this.userId
    });

  },

  'profiles.remove': function(account) {

    return Profiles.remove(account);

  },

  'profiles.update': function(account, name, url, email, password) {

    // encrypting email and password using AES256

    let cipher = crypto.createCipher('aes-256-ctr', this._id);

    let encrypted_password = cipher.update(generated_password, 'utf8', 'hex');
    encrypted_password += cipher.final('hex');

    return Profiles.update(account, {$set: {
      password: encrypted_password,
      email,
      name,
      url
    }});

  }

});

export const Profiles = new Mongo.Collection('profiles');