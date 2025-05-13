import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promises as fsPromises } from 'fs';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  log(message: unknown, context?: unknown): void {
    const entry = `${context ?? ''}\t${message ?? ''}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  error(message: unknown, stackOrContext?: string): void {
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);
    super.log(message, stackOrContext);
  }

  async logToFile(entry: string): Promise<void> {
    const formattedEntry = `${new Date().toISOString()}\t${entry}`;
    const logFilePath = path.join(__dirname, '..','logs', 'app.log');

    try {
      await fsPromises.mkdir(path.dirname(logFilePath), { recursive: true });
      await fsPromises.appendFile(logFilePath, `${formattedEntry}\n`);
    } catch (error) {
      super.error('Error writing to log file', error);
    }
  }
}
