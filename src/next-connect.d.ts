// next-connect.d.ts
declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse } from 'next';
  
    interface NextConnect {
      (options?: { onError?: (err: Error, req: NextApiRequest, res: NextApiResponse, next: () => void) => void, onNoMatch?: (req: NextApiRequest, res: NextApiResponse) => void }): NextConnectInstance;
  
      use(...handlers: Array<(req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void>): this;
      post(...handlers: Array<(req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void>): this;
      get(...handlers: Array<(req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void>): this;
      put(...handlers: Array<(req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void>): this;
      delete(...handlers: Array<(req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void>): this;
      patch(...handlers: Array<(req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void>): this;
    }
  
    interface NextConnectInstance extends NextConnect {
      handler(req: NextApiRequest, res: NextApiResponse): void;
    }
  
    const nextConnect: NextConnect;
    export default nextConnect;
  }
  