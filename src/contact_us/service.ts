import { Request } from "express";
import { Types } from "mongoose";
import Item from "./entity";
import SavedItems from "../saved_items/entity";
import { slugify } from "../utils";

class ItemService {
  public async createItem(shopId: string, userId: string, req: Request) {
    const {
      name,
      images,
      category,
      categoryName,
      condition,
      description,
      price,
    } = req.body;

   const slug = slugify(description);

    const objUserId = new Types.ObjectId(String(userId));

    const newItem = new Item({
      name: name,
      slug,
      images: images,
      shopId: shopId,
      category: category,
      condition: condition,
      description: description ?? "",
      price: price,
      categoryName: categoryName,
      itemPosterUserId: objUserId,
    });

    await newItem.save();

    return newItem;
  }

  public async editItem(userId: string, req: Request) {
    const {
      name,
      images,
      category,
      categoryName,
      condition,
      description,
      price,
    } = req.body;

    const objUserId = new Types.ObjectId(String(userId));

    let existingItem = await Item.findOne({ itemPosterUserId: objUserId });

    if (existingItem) {
      existingItem.name = name;

      existingItem.images = images;

      existingItem.category = category;

      existingItem.condition = condition;

      existingItem.description = description ?? "";

      existingItem.price = price;

      existingItem.categoryName = categoryName;

      existingItem = await existingItem.save();
    }

    return existingItem;
  }

  public async findAndDeleteItem(userId: string, req: Request) {
    const { id } = req.params;

    const objUserId = new Types.ObjectId(String(userId));
    const objId = new Types.ObjectId(String(id));

    const userItem = await Item.findOneAndDelete({
      itemPosterUserId: objUserId,
      _id: id,
    });
    await SavedItems.findOneAndDelete({
      userId: objUserId,
      "favItem.job": objId,
    });

    return userItem;
  }

  public async fetchAllItems() {
    const items = await Item.find({ outOfStock: "no", sold: "no" }).populate(
      "shopId",
      "shopOwnerUserId name"
    );
    return items;
  }

  public async fetchAllFeaturedItems() {
    const items = await Item.find({
      featured: true,
      outOfStock: "no",
      sold: "no",
    }).populate("shopId", "shopOwnerUserId name");
    return items;
  }

  public async fetchItemDetails(id: string) {
    const items = await Item.findOne({
      _id: id,
      outOfStock: "no",
      sold: "no",
    }).populate({
      //this is the name of field used for referncing the model
      path: "shopId",
      select: "shopOwnerUserId name",
      //this is possibe because of the relation btween Items scheme, which is referencing Shop Scheme that refernced User Schema
      populate: {
        path: "shopOwnerUserId",
        model: "User",
        select: "firstName lastName region profileImageUrl phoneNumber",
      },
    });
    return items;
  }

  public async fetchItemDetailsBySlug(slug: string) {
    const items = await Item.findOne({
      slug,
      outOfStock: "no",
      sold: "no",
    }).populate({
      //this is the name of field used for referncing the model
      path: "shopId",
      select: "shopOwnerUserId name",
      //this is possibe because of the relation btween Items scheme, which is referencing Shop Scheme that refernced User Schema
      populate: {
        path: "shopOwnerUserId",
        model: "User",
        select: "firstName lastName region profileImageUrl phoneNumber",
      },
    });
    return items;
  }

  // public async fetchSimilarItems(category: string, id: string) {
  //   const items = await Item.find({
  //     category: category,
  //     //where _id is not equal to the id passed
  //     _id: { $ne: id },
  //   }).populate("shopId", "shopOwnerUserId name");
  //   return items;
  // }

  public async fetchSimilarItems(category: string, id: string) {
    const items = await Item.find({
      category: category,
      outOfStock: "no",
      sold: "no",
      //Item where the id does not match
      _id: { $ne: new Types.ObjectId(id) },
    }).populate({
      //this is the name of field used for referncing the model
      path: "shopId",
      select: "shopOwnerUserId name",
      //this is possibe because of the relation btween Items scheme, which is referencing Shop Scheme that refernced User Schema
      populate: {
        path: "shopOwnerUserId",
        model: "User",
        select: "firstName lastName",
      },
    });

    return items;
  }

  public async fetchFeaturedItemDetails(id: string) {
    const items = await Item.findOne({
      featured: true,
      _id: id,
      outOfStock: "no",
      sold: "no",
    }).populate({
      //this is the name of field used for referncing the model
      path: "shopId",
      //this is possibe because of the relation between Items scheme, which is referencing Shop Scheme that refernced User Schema
      populate: {
        path: "shopOwnerUserId",
        model: "User",
        select: "firstName lastName region profileImageUrl phoneNumber",
      },
    });
    return items;
  }

  public async fetchFeaturedItemDetailsBySlug(slug: string) {
    const items = await Item.findOne({
      featured: true,
      slug,
      outOfStock: "no",
      sold: "no",
    }).populate({
      //this is the name of field used for referncing the model
      path: "shopId",
      //this is possibe because of the relation between Items scheme, which is referencing Shop Scheme that refernced User Schema
      populate: {
        path: "shopOwnerUserId",
        model: "User",
        select: "firstName lastName region profileImageUrl phoneNumber",
      },
    });
    return items;
  }

  public async markUserItemAsSold(userId: string, req: Request) {
    const { id } = req.params;

    const objUserId = new Types.ObjectId(String(userId));

    const userItem = await Item.findOne({
      itemPosterUserId: objUserId,
      _id: id,
    });

    if (userItem) {
      userItem.sold = "yes";

      await userItem.save();
    }

    return userItem;
  }

  public async markUserItemAsOutOfStock(userId: string, req: Request) {
    const { id } = req.params;

    const objUserId = new Types.ObjectId(String(userId));

    const userItem = await Item.findOne({
      itemPosterUserId: objUserId,
      _id: id,
    });

    if (userItem) {
      userItem.outOfStock = "yes";

      await userItem.save();
    }

    return userItem;
  }

  public async findUserItemDetails(userId: string, req: Request) {
    const { id } = req.params;

    const objUserId = new Types.ObjectId(String(userId));

    const userItemDetails = await Item.findOne({
      itemPosterUserId: objUserId,
      _id: id,
    }).populate({
      //this is the name of field used for referncing the model
      path: "shopId",
      select: "shopOwnerUserId name",
      //this is possibe because of the relation btween Items scheme, which is referencing Shop Scheme that refernced User Schema
      populate: {
        path: "shopOwnerUserId",
        model: "User",
        select: "firstName lastName region profileImageUrl phoneNumber",
      },
    });

    return userItemDetails;
  }
}

export const itemService = new ItemService();
