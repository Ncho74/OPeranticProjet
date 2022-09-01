import { Test, TestingModule } from '@nestjs/testing';
import { DefaultAutorController } from './default-autor.controller';

describe('DefaultAutorController', () => {
  let controller: DefaultAutorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultAutorController],
    }).compile();

    controller = module.get<DefaultAutorController>(DefaultAutorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
