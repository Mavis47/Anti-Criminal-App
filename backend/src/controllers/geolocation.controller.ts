import type {Request,Response} from 'express';
import prisma from '../db/db';

export const AddLocation = async(req: Request,res: Response) => {
    const {latitude,longitude} = req.body;
    const userId = req.user.userId;

    if(!latitude || !longitude){
        res.status(400).json({error: "Latitude And Longitude Are Required"});
        return;
    }

    try {
        const post = await prisma.post.create({
            data: {
                userId,
                latitude,
                longitude,
                createdAt: new Date(),
            }
        })
        res.status(201).json({ message: 'Location posted successfully', post });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while posting the location' });
    }
}

export const getLocation = async(req: Request,res: Response) => {
    const userId = req.user.userId; 

    try {
        const posts = await prisma.post.findMany({
            where: {
                userId: userId
            },
            select: {
                latitude: true,
                longitude: true,
                createdAt: true 
            }
        });

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No locations found for this user' });
        }

        res.status(200).json({ message: 'Locations retrieved successfully', locations: posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the location' });
    }
}

