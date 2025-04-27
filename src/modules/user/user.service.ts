import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name) // Le da el nombre "UserService"

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(PaginationDto: PaginationDto) {
    this.logger.log('service findAll', PaginationDto);

    const page = PaginationDto.page ?? 1;
    const limit = PaginationDto.limit ?? 10;

    const [data, total] = await this.userRepository.findAndCount({
      where: { isActive: true },
      order: { id: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
      withDeleted: PaginationDto.withDeleted,
    })

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { id: __, ...data } = updateUserDto;
    const user = await this.findOne(id);

    Object.assign(user, data);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.softRemove(user);
  }

}
