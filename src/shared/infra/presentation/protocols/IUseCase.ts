export interface IUseCase<T = any, S = any> {
  execute(data?: T): Promise<S>;
}