import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams, origin } = new URL(request.url)
    const code = url.searchParams.get('code')
    const next = searchParams.get('next')

    if (code) {
        const supabase = createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            return NextResponse.redirect(url.origin)
        }
    }

}