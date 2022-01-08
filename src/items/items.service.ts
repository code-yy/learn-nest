import { CreateItemDto } from './dto/create-item.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { ItemRepository } from './item.repository';
import { Item } from 'src/entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemRepository) {}

  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(CreateItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsRepository.createItem(CreateItemDto);
  }

  async updateStatus(id: string): Promise<Item> {
    const item = await this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    item.updatedAt = new Date().toISOString();
    await this.itemsRepository.save(item);
    return item;
  }

  async delete(id: string): Promise<void> {
    await this.itemsRepository.delete({ id });
  }
}
