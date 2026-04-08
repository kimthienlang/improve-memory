import { type Request, type Response, type NextFunction } from 'express';
import Collection from '../models/Collection';
import Card from '../models/Card';

export const createCollection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, cards } = req.body;
    const userId = (req as any).user.userId;

    const collection = await Collection.create({
      userId,
      title
    });

    if (cards && Array.isArray(cards) && cards.length > 0) {
      const cardsData = cards.map((c: any, index: number) => ({
        collectionId: collection._id,
        front: c.front,
        back: c.back,
        orderIndex: index
      }));
      await Card.insertMany(cardsData);
    }

    res.status(201).json({
      success: true,
      message: 'Collection created successfully',
      data: collection
    });
  } catch (error) {
    next(error);
  }
};

export const getCollections = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    // Lấy toàn bộ collections của user này
    const collections = await Collection.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: collections
    });
  } catch (error) {
    next(error);
  }
};

export const getCollectionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;

    // Lấy thông tin Collection dựa trên ID
    const collection = await Collection.findOne({ _id: id, userId });
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }

    // Lấy tất cả card của collection_id này trong 1 câu query duy nhất (Index đã được tạo giúp việc này cực nhanh)
    const cards = await Card.find({ collectionId: id }).sort({ orderIndex: 1 });

    res.status(200).json({
      success: true,
      data: {
        ...collection.toObject(),
        cards
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: collectionId } = req.params;
    const { front, back, orderIndex } = req.body;
    const userId = (req as any).user.userId;

    // Verify user ownership
    const collection = await Collection.findOne({ _id: collectionId, userId });
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found or access denied' });
    }

    let resolvedOrderIndex = orderIndex;
    if (resolvedOrderIndex === undefined) {
      // Find the current max orderIndex in this collection
      const lastCard = await Card.findOne({ collectionId: collectionId as any }).sort({ orderIndex: -1 });
      resolvedOrderIndex = lastCard ? lastCard.orderIndex + 1 : 0;
    }

    const card = await Card.create({
      collectionId: collectionId as any,
      front,
      back,
      orderIndex: resolvedOrderIndex
    });

    res.status(201).json({
      success: true,
      message: 'Card created successfully',
      data: card
    });
  } catch (error) {
    next(error);
  }
};
