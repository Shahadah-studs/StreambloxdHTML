import { kv } from '@vercel/kv';

export default async function handler(request, response) {
    try {
        let currentLinks = await kv.get('streambloxd_master_feed') || [];
        if (!Array.isArray(currentLinks)) currentLinks = [];
        
        if (request.method === 'POST') {
            const { creator, title, url } = request.body;
            currentLinks.push({ creator, title, url });
            await kv.set('streambloxd_master_feed', currentLinks);
            return response.status(200).json(currentLinks);
        }
        return response.status(200).json(currentLinks);
    } catch (error) {
        return response.status(500).json([]);
    }
}
