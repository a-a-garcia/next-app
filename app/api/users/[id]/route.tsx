import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

// we need to access the route parameter (id) so we need to define Props
// interface Props {
//     params: { id: number }
// }

//GET

export function GET(
    request: NextRequest,
    //destructuring params, then defining the shape of the object inline. removes the need for interface Props
    { params }: { params: { id: number }}) {
        //fetch data from db
        //if not found, return 404
        //otherwise return actual data

        if (params.id > 10) {
            return NextResponse.json({error: 'User not found'}, {status: 404})
        }

        return NextResponse.json({ id: 1, name: 'Mosh'})
}


//PUT for replacing an object
//PATCH for updating one or more properties

export async function PUT(
    //request object
    request: NextRequest,
    //object that contains route parameters 
    { params }: { params: { id: number }}) {
    
        //1st - validate request body
        const body = await request.json();
        // if invalid, return 400
        // returns a validation result, so store it in a variable
        const validation = schema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json
            //return the array of errors
            (validation.error.errors, {status: 400})
        }
        //else fetch the user with given id 
        //simulation
        // if doesn't exist, return 404
        if (params.id > 10) {
            return NextResponse.json({error:'user not found'}, {status: 404})
        }
        // Update user
        // Return updated user

        return NextResponse.json({ id: 1, name: body.name })

} 


//DELETE

export function DELETE(
    request: NextRequest,
    { params }: { params: { id: number }}) {
        //Fetch user from db
        // if not found, return 404
        if (params.id > 10) {
            return NextResponse.json({error:'user not found'}, {status: 404})
        }
        // else delete user
        // return 200
        return NextResponse.json({});
        //you can return the deleted object, null, or an empty object
}