import { TezosToolkit } from '@taquito/taquito';
import { tzip12 } from '@taquito/tzip12';

const NETWORK = 'https://mainnet.kukai.network'

const TaquitoProvider = new TezosToolkit(NETWORK)

export async function getTokenMetadataWithTaquito(contractAddress: string, id: string) {
    try {
        const contract = await TaquitoProvider.contract.at(contractAddress, tzip12)
        const metadata = await contract.tzip12().getTokenMetadata(Number(id))

        return metadata
    } catch (e) {
        console.warn(e)
    }
}