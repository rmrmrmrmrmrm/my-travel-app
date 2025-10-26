// src/components/DestinationCard.tsx
import { Link } from "react-router-dom";

type Destination = {
    id: number;
    name: string;
    description: string;
    image: string;
};

type Props = {
    destination: Destination;
    onDelete: (id: number) => void;//削除
    onEdit: (destination: Destination) => void;//編集
};

export default function DestinationCard({ destination, onDelete, onEdit }: Props) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48">
                {/* 画像があるときだけ描画 */}
                {destination.image && (
                    <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-48 object-cover"
                    />
                )}
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold">{destination.name}</h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {destination.description}
                </p>
                <div className="mt-2 flex gap-2">
                    <button
                        onClick={() => onDelete(destination.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                        削除
                    </button>
                    <button
                        onClick={() => onEdit(destination)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                        編集
                    </button>
                </div>
                <Link
                    to={`/destination/${destination.id}`}
                    className="inline-block mt-3 text-blue-600 hover:text-blue-800 font-medium"
                >
                    詳細を見る →
                </Link>
            </div>
        </div>
    );
}
