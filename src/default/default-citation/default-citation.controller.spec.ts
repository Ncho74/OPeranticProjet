import { Test, TestingModule } from '@nestjs/testing';
import { DefaultCitationController } from './default-citation.controller';

describe('DefaultCitationController', () => {
  let controller: DefaultCitationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultCitationController],
    }).compile();

    controller = module.get<DefaultCitationController>(DefaultCitationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
