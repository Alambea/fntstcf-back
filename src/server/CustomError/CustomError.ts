class CustomError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly publicMessage?: string,
  ) {
    super(message);
  }
}

export default CustomError;
