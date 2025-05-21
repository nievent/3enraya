import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

const validResultados = ['victoria', 'derrota', 'empate'];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ganador, jugador, resultado } = body;

    const ganadorValido = ['X', 'O', null].includes(ganador);
    const resultadoValido = validResultados.includes(resultado);
    const jugadorValido = typeof jugador === 'string' && jugador.trim().length > 0;

    if (!ganadorValido || !resultadoValido || !jugadorValido) {
      return NextResponse.json(
        {
          error: 'Datos inválidos. Se espera: { ganador: "X" | "O" | null, jugador: string, resultado: "victoria" | "derrota" | "empate" }',
        },
        { status: 400 }
      );
    }

    const partida = {
      jugador: jugador.trim(),
      resultado,
      ganador,
      fecha: new Date(),
    };

    const client = await clientPromise;
    const db = client.db('3enraya');
    await db.collection('partidas').insertOne(partida);

    return NextResponse.json({ status: 'ok', partida });
  } catch (error) {
    console.error('Error en /api/save-result:', error);
    return NextResponse.json(
      { status: 'error', message: 'Error interno al guardar la partida' },
      { status: 500 }
    );
  }
}
