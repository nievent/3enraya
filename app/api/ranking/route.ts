import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export async function GET() {
try {
    const client = await clientPromise;
    const db = client.db('3enraya');
    const collection = db.collection('partidas');

    const pipeline = [
    {
        $group: {
        _id: '$jugador',
        victorias: {
            $sum: {
            $cond: [{ $eq: ['$resultado', 'victoria'] }, 1, 0],
            },
        },
        empates: {
            $sum: {
            $cond: [{ $eq: ['$resultado', 'empate'] }, 1, 0],
            },
        },
        derrotas: {
            $sum: {
            $cond: [{ $eq: ['$resultado', 'derrota'] }, 1, 0],
            },
        },
        },
    },
    {
        $project: {
        nombre: '$_id',
        victorias: 1,
        empates: 1,
        derrotas: 1,
        _id: 0,
        },
    },
    { $sort: { victorias: -1 } },
    ];

    const ranking = await collection.aggregate(pipeline).toArray();

    return NextResponse.json({ ranking });
} catch (error) {
    console.error(error);
    return NextResponse.json(
    { status: 'error', message: 'Error al consultar el ranking' },
    { status: 500 }
    );
}
}
