import { Test, TestingModule } from '@nestjs/testing';
import { DefaultCitationService } from './default-citation.service';

describe('DefaultCitationService', () => {
  let service: DefaultCitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultCitationService],
    }).compile();

    service = module.get<DefaultCitationService>(DefaultCitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
