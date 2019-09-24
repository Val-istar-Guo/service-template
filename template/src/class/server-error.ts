import { CustomError } from 'ts-custom-error'

export type ErrorMessage = Readonly<string>

export class ServerError extends CustomError {
  expose: boolean

  status: number

  constructor(status: number, message: ErrorMessage = '') {
    super(message)
    this.status = status
    this.expose = true

    Object.defineProperty(this, 'name', { value: 'ServerError' })
  }
}
