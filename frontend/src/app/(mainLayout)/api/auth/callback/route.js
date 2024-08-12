import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


export async function GET(request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        if(exchangeError) {
            console.error("Error exchanging code for session", exchangeError);
            return NextResponse.redirect(`${origin}/auth/auth-code-error`)
        }

        console.log("Session data:", data)

        if(data && data.session && data.session.user) {

            const redirectUrl = new URL(next, origin);
            redirectUrl.searchParams.append("userid", data.session.user.id);
            redirectUrl.searchParams.append("username", data.session.user.email);

            return NextResponse.redirect(redirectUrl.toString());

            // const forwardedHost = request.headers.get('x-forwarded-host')
            // const isLocalEnv = process.env.NODE_ENV === 'development'
            // if(isLocalEnv) {
            //     return NextResponse.redirect(`${origin}${next}`)
            // } else if(forwardedHost) {
            //     return NextResponse.redirect(`https://${forwardedHost}${next}`)
            // } else {
            //     return NextResponse.redirect(`${origin}${next}`)
            // }
        } else {
            console.error("User session not found muchacho")
            NextResponse.redirect(`${origin}/auth/auth-code-error`)
        }
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}






































// import { createClient } from "@supabase/supabase-js";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//     const { searchParams, origin } = new URL(request.url)
//     const code = url.searchParams.get('code')
//     const next = searchParams.get('next')

//     if (code) {
//         const supabase = createClient()
//         const { error } = await supabase.auth.exchangeCodeForSession(code)

//         if (!error) {
//             return NextResponse.redirect(url.origin)
//         }
//     }

// }