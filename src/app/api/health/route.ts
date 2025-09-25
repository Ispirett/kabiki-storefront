import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test backend connection
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000'
    
    const response = await fetch(`${backendUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.text()
      return NextResponse.json({
        status: 'ok',
        frontend: 'healthy',
        backend: 'healthy',
        backendUrl,
        backendResponse: data,
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json({
        status: 'error',
        frontend: 'healthy',
        backend: 'unhealthy',
        backendUrl,
        backendStatus: response.status,
        backendStatusText: response.statusText,
        timestamp: new Date().toISOString(),
      }, { status: 500 })
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      frontend: 'healthy',
      backend: 'unreachable',
      backendUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}