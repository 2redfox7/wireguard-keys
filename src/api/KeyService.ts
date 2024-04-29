import axios from 'axios';

const API_BASE_URL = 'localhost:727'; // Замените на URL вашего сервера

export class KeyService {
  // Получить список всех ключей
  static async getAllKeys(chatId: string): Promise<[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${chatId}/keys`);
      return response.data;
    } catch (error) {
      console.error('Error while fetching keys:', error);
      return [];
    }
  }

  // Создать новый ключ
  static async createKey(chatId: string): Promise<{ id: string, name: string, file: string, url: string, data: string } | null> {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/${chatId}/keys`, {});
      return response.data;
    } catch (error) {
      console.error('Error while creating key:', error);
      return null;
    }
  }

  // Удалить ключ по его ID
  static async deleteKey(chatId: string, name: string): Promise<boolean> {
    try {
      await axios.delete(`${API_BASE_URL}/users/${chatId}/keys/:${name}`);
      return true;
    } catch (error) {
      console.error('Error while deleting key:', error);
      return false;
    }
  }
}
