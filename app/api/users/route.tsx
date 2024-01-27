//HTTP Methods review
//GET - get data
// this is how we can create an endpoint to return a collection of objects

import { NextRequest, NextResponse } from "next/server";

import schema from "./schema";

import prisma from "@/prisma/client";

//Side note: you can remove request but it will cause next.js to cache the page. 
export async function GET(request: NextRequest) {
    //fetch users from a db (in future lesson)
    // prisma.user.findMany({
    //     //optional - provide an object to filter
    //     where: {
    //         email: ''
    //     }
    // })
    //returns a promise
    const users = await prisma.user.findMany();

    // NextResponse.json() takes in an object (or an array of objects) and returns a response with the object as JSON
    return NextResponse.json(users);
}

//giving it a request parameter of type NextRwequest...
//Note: 
// it might seem like "parsing it out of JSON twice," but in reality, it's parsing the incoming JSON data once to extract the information, and then using that information to create a new JSON response. The first parsing is extracting the payload from the incoming request, and the second is using that payload to create a response. The two parsing operations serve different purposes in this context.

export async function POST(request: NextRequest) {
    //returns a promise so must make it async await
    const body = await request.json();
    //Validate
    const validation = schema.safeParse(body);
    // if invalid, return 400
    // else return data
    if (!validation.success) {
        return NextResponse.json(
            validation.error.errors, {status: 400}
        )
    };
    return NextResponse.json(
        {
            id: 1, 
            name: body.name
        }, 
            {status: 201});
    //201 is a more common status code for object creation than 200
}

