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

  it('should delete a user', async () => {
    const findByIdAndDeleteStub = sinon.stub(User, 'findByIdAndDelete');
    findByIdAndDeleteStub.resolves({ _id: '3', firstName: 'Jim', lastName: 'Doe' });

    const deletedUser = await UserService.deleteUser('3');
    expect(deletedUser).toHaveProperty('_id', '3');
    expect(deletedUser?.firstName).toBe('Jim');
  });

});
