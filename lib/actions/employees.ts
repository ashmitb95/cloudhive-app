import { Employee } from '@/types/employee';
import fs from 'fs/promises';
import path from 'path';

const EMPLOYEES_FILE_PATH = path.join(process.cwd(), 'data/employees.json');

export async function getEmployees(): Promise<Employee[]> {
  try {
    const data = await fs.readFile(EMPLOYEES_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read employees:', error);
    return [];
  }
} 