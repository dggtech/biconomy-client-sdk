export const JsonRpcVersion = '2.0'

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface JsonRpcRequest {
  jsonrpc?: string
  id?: number
  method: string
  params?: any[]
}

export interface JsonRpcResponse {
  jsonrpc: string
  id: number
  result: any
  error?: ProviderRpcError
}

export interface ProviderRpcError extends Error {
  message: string
  code?: number
  data?: {
    [key: string]: any
  }
}

export type JsonRpcResponseCallback = (error?: ProviderRpcError, response?: JsonRpcResponse) => void

export type JsonRpcHandlerFunc = (
  request: JsonRpcRequest,
  callback: JsonRpcResponseCallback,
  chainId?: number
) => void

export interface JsonRpcHandler {
  sendAsync: JsonRpcHandlerFunc
}

export type JsonRpcFetchFunc = (method: string, params?: any[], chainId?: number) => Promise<any>

// EIP-1193 function signature
export type JsonRpcRequestFunc = (
  request: { method: string; params?: any[] },
  chainId?: number
) => Promise<any>

export type JsonRpcMiddleware = (next: JsonRpcHandlerFunc) => JsonRpcHandlerFunc

export interface JsonRpcMiddlewareHandler {
  sendAsyncMiddleware: JsonRpcMiddleware
}
