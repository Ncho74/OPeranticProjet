import { Test, TestingModule } from '@nestjs/testing';
import { DefaultAutorService } from './default-autor.service';

describe('DefaultAutorService', () => {
  let service: DefaultAutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultAutorService],
    }).compile();

    service = module.get<DefaultAutorService>(DefaultAutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
