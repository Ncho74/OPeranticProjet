import { Test, TestingModule } from '@nestjs/testing';
import { LikerService } from './liker.service';

describe('LikerService', () => {
  let service: LikerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikerService],
    }).compile();

    service = module.get<LikerService>(LikerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
