import { GobSystemError, GobSystemErrorFile } from "../../app/com/cnr/gob/sv/admusweb/interfaces/system.error";


/**
 * Lanza un error personalizado para ser capturado por el ErrorHandler global.
 * @param file Objeto con información del archivo/contexto donde ocurre el error.
 * @param message Mensaje descriptivo del error.
 * @param error Error original (opcional).
 */
export function useError(
  file: GobSystemErrorFile | null,
  message: string | null,
  error: Error | null = null
): never {
  const systemError: GobSystemError = {
    file,
    message,
    error
  };
  throw systemError;
}

// Builder para crear errores personalizados de forma fluida
export class UseErrorBuilder {
  private file: GobSystemErrorFile = {};
  private message: string | null = null;
  private error: Error | null = null;

  setFile(file: GobSystemErrorFile): this {
    this.file = file;
    return this;
  }

  setFileName(name: string): this {
    this.file.name = name;
    return this;
  }

  setFileMethod(method: string): this {
    this.file.method = method;
    return this;
  }

  setFileLine(line: number): this {
    this.file.line = line;
    return this;
  }

  setFileExtra(extra: string): this {
    this.file.extra = extra;
    return this;
  }

  setMessage(message: string): this {
    this.message = message;
    return this;
  }

  setError(error: Error): this {
    this.error = error;
    return this;
  }

  throw(): never {
    return useError(this.file, this.message, this.error);
  }
} 