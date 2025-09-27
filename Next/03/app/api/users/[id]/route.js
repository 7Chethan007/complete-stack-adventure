import { users } from "@/lib/db";

export const GET = async (req) => {
    try{
        const id = req.url.split("users/")[1];
        console.log(id);
        console.log(users);

        const singleData = users.filer((users) => users.id.toString() === id);
        console.log(singleData);

        if(singleData.length === 0){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        return NextResponse.json({message:"OK",singleData});
    }
    catch(error){
        return NextResponse.json({message: "Internal Server Error"}, 
            {status: 500});
    }
}

// Delete

export const DELETE = async (req) => {
    try{
        const id = req.url.split("users/")[1];
        const userIndex = users.findIndex((users) => users.id.toString() === id);

        if(userIndex === -1){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        // Remove user from array
        users.splice(userIndex, 1);
        console.log(users);
        return NextResponse.json({message: "User deleted successfully", users});
    } catch(error){
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}

// Update

export const PUT = async (req) => {
    try{
        const id = req.url.split("users/")[1];
        const {name} = await req.json();
        const userIndex = users.findIndex((users) => users.id.toString() === id);

        if(userIndex === -1){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        userIndex.name = name;
        console.log(users);
        return NextResponse.json({message: "User updated successfully", users});
    } catch(error){
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}