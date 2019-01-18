export type NonNullableObjOrLit<T> = T extends object
  ? { [K in keyof T]: Idx<T[K]> }
  : NonNullable<T> // to support literals in arrays

export type NonNullableArray<T> = T extends Array<infer E>
  ? Array<NonNullableObjOrLit<E>>
  : never

/*
 * Recurively makes nullable graphql response non-nullable
 */
export type Idx<T> = T extends any[]
  ? NonNullableArray<T>
  : T extends object
  ? NonNullableObjOrLit<T>
  : NonNullable<T>

export interface IdxData<T extends object> {
  data: Idx<T>
}