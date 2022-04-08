export enum ORDER_STATUS {
  PREPARED,
}

export enum DISPATCH_STRATEGY {
  MATCHED,
  FIFO,
}


export namespace DISPATCH_STRATEGY {
  export function toString(dir: DISPATCH_STRATEGY): string {
      return DISPATCH_STRATEGY[dir];
  }

  export function fromString(dir: string): DISPATCH_STRATEGY {
      return (DISPATCH_STRATEGY as any)[dir];
  }
}