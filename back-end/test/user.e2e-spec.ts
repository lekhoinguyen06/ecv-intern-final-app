import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { UserService } from '../src/user/user.service';
import { CreateUserDto } from '../src/user/dto/user.dto';
import { LogService } from 'src/log/log.service';

describe('User (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let loggerService: LogService;
  const mockUser: CreateUserDto = {
    email: 'john.smith@example.com',
    name: 'John Smith Jr.',
    age: 29,
    sex: 'Male',
    description: 'Backend developer with a passion for cloud architecture',
    jobTitle: 'Software Engineer',
    studies: ['Computer Science', 'Cloud Computing'],
    interests: ['AWS', 'NestJS', 'Distributed Systems'],
    notes: 'Interested in leadership roles',
  };
  const persistant = {
    id: '',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    userService = moduleRef.get<UserService>(UserService);
    loggerService = moduleRef.get<LogService>(LogService);
    await app.init();

    // Clear previous tests if any
    try {
      const user = await userService.checkEmail(mockUser.email);
      if (!user?.isAvailable) await userService.remove(mockUser.email);
    } catch {
      // Do nothing
    }
  });

  // My tests
  test('Create mock user', async () => {
    await userService.create(mockUser);
  });

  test('Find one mock user', async () => {
    const user = await userService.findOne(mockUser.email);
    if (user) {
      const { id, ...rest } = user;
      expect(id).toBeDefined();
      persistant.id = id;
      expect(rest).toStrictEqual(mockUser);
    }
  });

  test('Update mock user', async () => {
    const changedUser = mockUser;
    changedUser.age = 90;
    const user = await userService.update(changedUser);
    if (user) {
      const { id, ...rest } = user;
      expect(id).toBeDefined();
      expect(persistant.id).toEqual(id);
      expect(rest).toStrictEqual(changedUser);
    }
  });

  test('Remove mock user', async () => {
    await userService.remove(mockUser.email);
  });

  afterAll(async () => {
    loggerService.close();
    await app.close();
  });
});
