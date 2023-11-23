'use server'

import { cookies } from 'next/headers'

export async function DeleteCookies(cookieName:string){
    console.log('deletando cookie', cookieName)
    return cookies().delete(cookieName)
}