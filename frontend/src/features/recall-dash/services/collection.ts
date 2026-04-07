import api from "@/lib/api";
import type { Collection, CollectionItem } from "../types";

export const getCollections = async (): Promise<Collection[]> => {
  const response = await api.get("/collections");
  return response.data.data;
};

export const getCollectionCards = async (collectionId: string): Promise<CollectionItem[]> => {
  const response = await api.get(`/collections/${collectionId}`);
  return response.data.data.cards;
};

export const createCollection = async (data: { title: string; cards?: any[] }) => {
  const response = await api.post("/collections", data);
  return response.data.data;
};

export const createCard = async (collectionId: string, data: { front: string; back: string; orderIndex?: number }) => {
  const response = await api.post(`/collections/${collectionId}/cards`, data);
  return response.data.data;
};
