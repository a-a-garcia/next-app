import { NextRequest, NextResponse } from "next/server";
//need zod to validate the incoming data
import z from "zod";
//prisma to check if user already exists
import prisma from "@/prisma/client";
//bcrypt to hash their password if the pass above
import bcrypt from "bcrypt";



//create a schema by calling z.object
//define the rules you want to enforce for the input
const schema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
});

//exporting a function for handling POST
export async function POST(request: NextRequest) {
    const body = await request.json();

    //this returns a validation object
    const validation = schema.safeParse(body);

    //user didn't pass validation
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    //user passed validation, need to check if they are already in the database - for that we need prisma client

    const user = await prisma.user.findUnique({ where: { email: body.email }})

    if (user) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    //otherwise, create the user
    //first we need to hash their password
    //the second argument is a salt or the number of rounds
    // must await 
    const hashedPassword = await bcrypt.hash(body.password, 10);

    //create the user
    //also need to await
    const newUser = await prisma.user.create({
        data: {
            email: body.email, hashedPassword
        }
    })

    //return a basic response to the client
    return NextResponse.json({ email: newUser.email})
}

export async function PUT(request: NextRequest) {
    const body = await request.json();

    const validation = schema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }

    const newHashedPassword = await bcrypt.hash(body.password, 10)

    const userWithNewPw = await prisma.user.update({
        where: { email: body.email },
        data: { hashedPassword: newHashedPassword}
    });

    return NextResponse.json({ email: userWithNewPw.email})
}