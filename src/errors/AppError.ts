export class AppError extends Error {
  statusCode: number
  message: string

  constructor(message: string, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
    this.message = message
    console.log(this.message);
    
    Object.setPrototypeOf(this, AppError.prototype)
  }
}
