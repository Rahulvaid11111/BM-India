import { NextRequest, NextResponse } from 'next/server';
import { addNewsletterSubscriber } from '@/lib/supabase/queries';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const { name = '', email = '' } = await request.json();

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();

    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please enter a valid email address.',
        },
        { status: 400 }
      );
    }

    const { data, error } = await addNewsletterSubscriber(trimmedName, trimmedEmail);

    if (error) {
      console.error('[Newsletter] Failed to add subscriber:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'We were unable to subscribe you at this time. Please try again later.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      subscriber: data,
    });
  } catch (error) {
    console.error('[Newsletter] Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Unexpected error occurred.',
      },
      { status: 500 }
    );
  }
}
