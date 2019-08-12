/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
import User from '../model/user';

class UserController {
  getUsers() {
    return new Promise((resolve, reject) => {
      User.find()
        .then((users) => {
          resolve(users);
        })
        .catch((err) => {
          reject('Could not fetch users', err);
        });
    });
  }

  getUser(_id) {
    return new Promise((resolve, reject) => {
      if (_id == null) {
        reject('ID cannot be empty');
      } else {
        User.find({ _id })
          .then((user) => {
            resolve(user);
          })
          .catch((err) => {
            reject('Could not get user', err);
          });
      }
    });
  }

  createUser(user) {
    return new Promise((resolve, reject) => {
      if (user == null) {
        reject('You did not provide a user to create');
      } else {
        User.create(user)
          .then((created) => {
            resolve(created);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      if (id == null) {
        reject('Id cannot be empty');
      } else {
        User.findByIdAndDelete(id)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  updateUser(_id, newUser) {
    return new Promise((resolve, reject) => {
      if (_id == null) {
        reject('Id cannot be empty');
      } else {
        User.findByIdAndUpdate(_id, newUser, { new: true })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
}

export default new UserController();
