import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

// GET - Listar todos os inscritos
export async function GET() {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: 'desc' }
    })
    
    return NextResponse.json({ 
      success: true, 
      subscribers,
      total: subscribers.length 
    })
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar inscritos' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar status de um inscrito
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID é obrigatório' },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    const { status } = body
    
    const updateData: Record<string, unknown> = { status }
    
    if (status === 'UNSUBSCRIBED') {
      updateData.unsubscribedAt = new Date()
    }
    
    const updated = await prisma.newsletterSubscriber.update({
      where: { id },
      data: updateData
    })
    
    return NextResponse.json({ success: true, subscriber: updated })
  } catch (error) {
    console.error('Error updating subscriber:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar inscrito' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar um inscrito
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID é obrigatório' },
        { status: 400 }
      )
    }
    
    await prisma.newsletterSubscriber.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true, message: 'Inscrito deletado' })
  } catch (error) {
    console.error('Error deleting subscriber:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar inscrito' },
      { status: 500 }
    )
  }
}
