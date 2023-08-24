import axios from 'axios';
import { Request, Response } from "express";
import { getTokenMetadataWithTaquito } from "../utils/taquito";

const EXPLORER = 'https://api.tzkt.io'

export async function handleMetadata(request: Request, response: Response) {
    const { originalUrl } = request

    const query = `${EXPLORER}${originalUrl}`

    try {
        const { data } = await axios.get(query)
        const promises: any[] = []

        for (const item of data) {
            const { contract, tokenId } = item

            if (!contract || !tokenId) {
                continue
            }

            const { address } = contract
            promises.push(getTokenMetadataWithTaquito(address, tokenId))
        }

        const metadata = await Promise.all(promises)

        response.send(data.map((o: any, index: number) => ({
            ...o,
            metadata: metadata[index]
        })))
    } catch (e) {
        response.status(400).send('Something went wrong')
    }
}