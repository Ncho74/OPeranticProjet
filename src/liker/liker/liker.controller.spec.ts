import { Test, TestingModule } from '@nestjs/testing';
import { LikerController } from './liker.controller';

describe('LikerController', () => {
  let controller: LikerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikerController],
    }).compile();

    controller = module.get<LikerController>(LikerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
