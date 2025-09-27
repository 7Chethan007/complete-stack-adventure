import { users } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request,par) {
//    console.log(par.params.id)
    const singleData = users.filter((item) => item.id == par.params.id)
    // If api tries to access a user id which is not present in db
    if(singleData.length==0){
        return NextResponse.json({"message":"No user found"}, 
            {status:404})
    }
    return NextResponse.json(singleData)
}