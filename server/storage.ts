import { type User, type InsertUser, type InsertContactMessage, type ContactMessageResponse } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessageResponse>;
  getContactMessages(): Promise<ContactMessageResponse[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessageResponse>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessageResponse> {
    const id = randomUUID();
    const message: ContactMessageResponse = { 
      id,
      name: insertMessage.name,
      email: insertMessage.email,
      telegramUsername: insertMessage.telegramUsername ?? null,
      subject: insertMessage.subject,
      message: insertMessage.message,
      createdAt: new Date().toISOString(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessageResponse[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      }
    );
  }
}

export const storage = new MemStorage();
