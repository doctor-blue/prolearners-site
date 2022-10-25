export default interface StateCallback<T, M> {
    onSuccess(data: T): any
    onFailure(code: number, message: M): any
}