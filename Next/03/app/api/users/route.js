import { users } from "@/lib/db";
import { NextResponse } from "next/server";

// Read
export const GET = async (req,res) => {
    try{
        return NextResponse.json(users);
    }
    catch(error){
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}

// Create
export const POST = async (req,res) => {
    const {name} = await req.json();
    try{
        const newData = {name};
        newData.id = users.length + 1;
        users.push(newData);
        return NextResponse.json(users);
        console.log(newData);
    }
    catch(error){
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}

