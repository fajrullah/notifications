// src/tests/user.test.ts
import sinon from 'sinon';
import User from '../models/User';
import UserService from '../services/UserService';


// Mock the mongoose.Model
jest.mock('../models/User');

describe('UserService', () => {
  beforeEach(() => {
    sinon.restore(); 
  });

  it('should retrieve all users', async () => {
    const findStub = sinon.stub(User, 'find');
    findStub.resolves([{ _id: '1', firstName: 'John', lastName: 'Doe' }]);
    const users = await UserService.getAllUsers();
    expect(users).toHaveLength(1);
    expect(users[0]).toHaveProperty('firstName', 'John');
  });

  // it('should create a new user', async () => {
  //   const createStub = sinon.stub(User, 'create');
  //   createStub.resolves({ _id: new Types.ObjectId() } as IUser & Document<any, any, IUser>);

  //   const userData = {
  //     firstName: 'Jane',
  //     lastName: 'Doe',
  //     birthday: new Date('1995-05-05'),
  //     location: {
  //       city: 'London',
  //       country: 'UK',
  //       timezone: 'Europe/London',
  //     },
  //   };

  //   const newUser = await UserService.createUser(userData);
  //   expect(newUser).toHaveProperty('firstName', 'Jane');
  // });

  it('should delete a user', async () => {
    const findByIdAndDeleteStub = sinon.stub(User, 'findByIdAndDelete');
    findByIdAndDeleteStub.resolves({ _id: '3', firstName: 'Jim', lastName: 'Doe' });

    const deletedUser = await UserService.deleteUser('3');
    expect(deletedUser).toHaveProperty('_id', '3');
    expect(deletedUser?.firstName).toBe('Jim');
  });

});
