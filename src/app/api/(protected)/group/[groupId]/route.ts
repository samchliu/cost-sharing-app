import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function DELETE(request: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const group = await prisma.group.findUnique({ where: { id: params.groupId } });
    if (!group) return new NextResponse('Group does not exist', { status: 404 });

    await prisma.group.delete({ where: { id: params.groupId } });
    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
