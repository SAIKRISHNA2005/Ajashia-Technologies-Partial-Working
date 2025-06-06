import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("product_id")

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 })
    }

    const { data: reviews, error } = await supabase
      .from("reviews")
      .select(`
        *,
        users (
          name
        )
      `)
      .eq("product_id", productId)
      .eq("is_approved", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching reviews:", error)
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
    }

    return NextResponse.json(reviews || [])
  } catch (error) {
    console.error("Error in reviews API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabaseClient = createMiddlewareClient({ req: request, res: NextResponse.next() })
    const {
      data: { session },
    } = await supabaseClient.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const reviewData = await request.json()

    const { data: review, error } = await supabase
      .from("reviews")
      .insert({
        ...reviewData,
        user_id: session.user.id,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating review:", error)
      return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
    }

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error("Error in reviews POST API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
