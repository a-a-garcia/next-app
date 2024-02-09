import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

// we need to access the route parameter (id) so we need to define Props
// interface Props {
//     params: { id: number }
// }

//GET

export async function GET(
    request: NextRequest,
    //destructuring params, then defining the shape of the object inline. removes the need for interface Props
    // here, the id type MUST be a string, because URL parameters are always strings
    { params }: { params: { id: string }}) {
        //fetch data from db
        const user = await prisma.user.findUnique({
            where: {
                //parse the params.id to a number
                id: params.id
            }
        })
        //if not found, return 404
        //otherwise return actual data

        if (!user) {
            return NextResponse.json({error: 'User not found'}, {status: 404})
        }

        return NextResponse.json(user)
}


//PUT for replacing an object
//PATCH for updating one or more properties

export async function PUT(
    //request object
    request: NextRequest,
    //object that contains route parameters 
    { params }: { params: { id: string }}) {
    
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
        //check if user exists
        const user = await prisma.user.findUnique({
            where: {
                id: params.id
            }
        })

        // if doesn't exist, return 404
        if (!user) {
            return NextResponse.json({error:'user not found'}, {status: 404})
        }
        // Update user
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: body.name,
                email: body.email
                //remember we only want to update the properties that don't have default values
            }
        })
        // Return updated user

        return NextResponse.json(updatedUser)

} 


//DELETE

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string }}) {
        //Fetch user from db
        const userToDelete = await prisma.user.findUnique({
            where: { 
                // parseInt removed because nextAuth documentation defines id as a string. in our own implementation we had id as a number
                id: params.id
            }
        })
        // if not found, return 404
        if (!userToDelete) {
            return NextResponse.json({error:'user not found'}, {status: 404})
        }
        // else delete user

        await prisma.user.delete({
            where: {
                id: userToDelete.id
            }
        })
        // return 200
        return NextResponse.json({});
        //you can return the deleted object, null, or an empty object
}