import React from 'react'
import type {Request,Response} from 'express';
import prisma from '../db/db';

export const SendRequests = async(req: Request,res: Response) => {
    const senderId = req.user.userId;
    console.log("Sender Id",senderId);
    const { receiverId } = req.body;
    console.log("receiver",receiverId);

    // Check if receiverId is provided
    if (!receiverId) {
        res.status(400).json({ error: 'Receiver ID is missing' });
        return;
    }

    try {
        // Check if the friend request already exists
        const existingRequest = await prisma.friendRequest.findFirst({
            where: {
                senderId,
                receiverId,
            },
        });

        if (existingRequest) {
             res.status(400).json({ error: 'Friend request already sent' });
             return;
        }

        // Create the friend request
        const sendRequest = await prisma.friendRequest.create({
            data: {
                senderId,
                receiverId,
                status: 'PENDING',
            },
        });

        res.status(201).json({ message: 'Friend request sent successfully', sendRequest });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while sending the friend request' });
        return;
    }
}   

export const RespondToFriendRequest = async (req: Request, res: Response) => {
    const { requestId, action } = req.body; // action can be "accept" or "reject"
    const userId = req.user.userId; // Assuming req.user contains the logged-in user's information

    // Validate the input
    if (!requestId || !action) {
         res.status(400).json({ error: 'Request ID and action are required' });
         return;
    }

    if (action !== 'accept' && action !== 'reject') {
         res.status(400).json({ error: 'Action must be either "accept" or "reject"' });
         return;
    }

    try {
        // Find the friend request
        const friendRequest = await prisma.friendRequest.findUnique({
            where: { id: requestId },
        });

        if (!friendRequest) {
            res.status(404).json({ error: 'Friend request not found' });
            return;
        }

        // Check if the logged-in user is the receiver of the friend request
        if (friendRequest.receiverId !== userId) {
            res.status(403).json({ error: 'You are not authorized to respond to this request' });
            return;
        }

        // Update the friend request status based on the action
        const updatedRequest = await prisma.friendRequest.update({
            where: { id: requestId },
            data: {
                status: action === 'accept' ? 'ACCEPTED' : 'REJECTED',
            },
        });

        // If accepted, also create a friendship
        if (action === 'accept') {
            await prisma.friendship.create({
                data: {
                    userId: friendRequest.senderId,
                    friendId: friendRequest.receiverId,
                },
            });
        }

        res.status(200).json({ message: `Friend request ${action}ed successfully`, updatedRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while responding to the friend request' });
        return;
    }
};

export const DeleteRequest = async () => {
    
}