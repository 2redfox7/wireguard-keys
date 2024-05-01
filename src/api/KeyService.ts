import axios from 'axios';
import { IPeer } from '@/interface/IPeer';

const API_BASE_URL = 'localhost:3000'; // Замените на URL вашего сервера

export class KeyService {
  // Получить список всех ключей
  static async getAllKeys(username: string): Promise<IPeer[]> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/${username}/peers`,
      );
      return response.data;
    } catch (error) {
      console.error('Error while fetching peers:', error);
      return [];
    }
  }

  static async getCode(username: string): Promise<string> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/${username}/code`,
      );
      return response.data;
    } catch (error) {
      console.error('Error while fetching code:', error);
      return '';
    }
  }

  static async getUser(username: string): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error while fetching users:', error);
      return false;
    }
  }

  // Создать новый ключ
  static async createKey(username: string): Promise<IPeer | null> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/${username}/peers`,
        {},
      );
      return response.data;
    } catch (error) {
      console.error('Error while creating peer:', error);
      return null;
    }
  }

  // Удалить ключ по его ID
  static async deleteKey(username: string, name: string): Promise<boolean> {
    try {
      await axios.delete(`${API_BASE_URL}/users/${username}/peers/:${name}`);
      return true;
    } catch (error) {
      console.error('Error while deleting key:', error);
      return false;
    }
  }
}
