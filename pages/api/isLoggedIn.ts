import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method !== "GET") {
        res.status(401).json({message: "Method not allowed"})
        return
    }
}