import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')

  if (token !== process.env.SANITY_API_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    revalidatePath('/blog', 'layout')
    revalidatePath('/', 'layout')

    return NextResponse.json({ revalidated: true, date: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}
