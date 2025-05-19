import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export async function POST(req: Request) {
  const {
    ganador,
    jugador,
    resultado,
  }: { ganador: 'X' | 'O' | null; jugador: string; resultado: 'victoria' | 'derrota' | 'empate' } = await req.json();

  const partida = {
    jugador,
    resultado,
    ganador,
    fecha: new Date(),
  };

  try {
    const client = await clientPromise;
    const db = client.db('3enraya');
    const collection = db.collection('partidas');

    await collection.insertOne(partida);

    return NextResponse.json({ status: 'ok', partida });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 'error', message: 'Error al guardar la partida' }, { status: 500 });
  }
}
