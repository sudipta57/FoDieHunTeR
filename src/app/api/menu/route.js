import dbConnect from "@/utils/connection";
import { NextResponse } from "next/server";
import foodData from "../../../../models/fooddataschema";
export async function GET() {
  const connectToDB = await dbConnect();

  if (!connectToDB) {
    return NextResponse.json(
      { error: "Error connecting to database" },
      { status: 400 }
    );
  }
  const fooddata = await foodData.find({});
  const updatedFoodData = fooddata.map((food) => ({
    ...food.toObject(),
    imgpath: `${food.img}`,
  }));
  return NextResponse.json({ updatedFoodData }, { status: 200 });
}
